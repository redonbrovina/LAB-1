import ApplicationEditModal from "../admin/ApplicationEditModal";
import { apiGet, apiDelete } from "../utils/api";
import { useEffect, useState } from "react";

// Status styling dictionary
const statusStyles = {
    'pending': {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        label: 'Pending'
    },
    'pranuar': {
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        label: 'Approved'
    },
    'refuzuar': {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        label: 'Rejected'
    }
};

export default function Applications() {
    const [applications, setApplications] = useState([]);
    const [allApplications, setAllApplications] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingApplication, setEditingApplication] = useState(null);
    const [status, setStatus] = useState('pending');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchApplications = async () => {
        try {
            const response = await apiGet("/aplikimi");
            
            const allApps = Array.isArray(response) ? response : [];
            setAllApplications(allApps);
            
            // Apply filters
            const filteredApplications = allApps.filter((application) => {
                // Status filter
                let statusMatch = false;
                if (status === 'all') {
                    statusMatch = true;
                } else if (status === 'pending') {
                    statusMatch = !application.statusi || application.statusi?.statusi === 'pending';
                } else {
                    statusMatch = application.statusi?.statusi === status;
                }
                
                // Search filter (only company name and city)
                let searchMatch = true;
                if (searchTerm.trim()) {
                    const searchLower = searchTerm.toLowerCase();
                    searchMatch = 
                        application.emri_kompanise?.toLowerCase().includes(searchLower) ||
                        application.qyteti?.toLowerCase().includes(searchLower);
                }
                
                return statusMatch && searchMatch;
            });
            
            console.log('Filtered applications:', filteredApplications);
            setApplications(filteredApplications);
        } catch (error) {
            console.error('Error fetching applications:', error);
            setApplications([]);
            setAllApplications([]);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [status, searchTerm]);

    const handleEditApplication = (application) => {
        setEditingApplication(application);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setEditingApplication(null);
    };

    const handleApplicationUpdated = () => {
        fetchApplications();
        setShowEditModal(false);
        setEditingApplication(null);
    }

    const handleDeleteApplication = async (application) => {
        if (!window.confirm(`Are you sure you want to delete the application for ${application.emri_kompanise}? This action cannot be undone.`)) {
            return;
        }

        try {
            await apiDelete(`/aplikimi/${application.aplikimiID}`);
            // Refresh the applications list
            fetchApplications();
        } catch (error) {
            console.error('Error deleting application:', error);
            alert('Failed to delete application. Please try again.');
        }
    };

    return (
        <div className="p-4 lg:p-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
                <div className="flex-1">
                    <h1 className="text-xl lg:text-2xl font-bold" style={{ color: "#808080" }}>
                        Applications Management
                    </h1>
                    <p className="text-gray-600 mt-1">Manage client applications in the system</p>
                    
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-3">
                        <select 
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)} 
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                        >
                            <option value='all'>All Applications</option>
                            <option value='pending'>Pending</option>
                            <option value='pranuar'>Approved</option>
                            <option value='refuzuar'>Rejected</option>
                        </select>
                        
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search by company name or city..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <button 
                    onClick={fetchApplications}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                    🔄 Refresh
                </button>
            </div>

            {/* Results Counter */}
            <div className="mb-4">
                <p className="text-gray-600">
                    Showing {applications.length} application{applications.length !== 1 ? 's' : ''}
                    {searchTerm && ` matching "${searchTerm}"`}
                    {status !== 'all' && ` with status "${status}"`}
                </p>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Application
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Application Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {applications.length > 0 ? (
                                applications.map((application) => (
                                    <tr key={application.aplikimiID} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-red-600">
                                                            {application.emri_kompanise ? application.emri_kompanise.split(' ').map(n => n[0]).join('') : 'AP'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{application.emri_kompanise}</div>
                                                    <div className="text-sm text-gray-500">ID: {application.aplikimiID}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{application.email}</div>
                                            <div className="text-sm text-gray-500">{application.adresa}</div>
                                            <div className="text-sm text-blue-600 font-medium">{application.qyteti}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {application.koha_aplikimit ? new Date(application.koha_aplikimit).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[application.statusi?.statusi]?.bgColor || 'bg-gray-100'} ${statusStyles[application.statusi?.statusi]?.textColor || 'text-gray-800'}`}>
                                                {statusStyles[application.statusi?.statusi]?.label || application.statusi?.statusi || 'Unknown'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditApplication(application)}
                                                    className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md transition-colors duration-200 flex items-center gap-1"
                                                >
                                                    Review
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteApplication(application)}
                                                    className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition-colors duration-200 flex items-center gap-1"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        No {status} applications found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden">
                    {applications.length > 0 ? (
                        <div className="space-y-4 p-4">
                            {applications.map((application) => (
                                <div key={application.aplikimiID} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                                <span className="text-sm font-medium text-red-600">
                                                    {application.emri_kompanise ? application.emri_kompanise.split(' ').map(n => n[0]).join('') : 'AP'}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{application.emri_kompanise}</div>
                                                <div className="text-sm text-gray-500">ID: {application.aplikimiID}</div>
                                            </div>
                                        </div>
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[application.statusi?.statusi]?.bgColor || 'bg-gray-100'} ${statusStyles[application.statusi?.statusi]?.textColor || 'text-gray-800'}`}>
                                            {statusStyles[application.statusi?.statusi]?.label || application.statusi?.statusi || 'Unknown'}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-2 mb-4">
                                        <div className="text-sm">
                                            <span className="font-medium text-gray-700">Email:</span>
                                            <span className="text-gray-900 ml-1">{application.email}</span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-medium text-gray-700">Address:</span>
                                            <span className="text-gray-900 ml-1">{application.adresa}</span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-medium text-gray-700">City:</span>
                                            <span className="text-blue-600 font-medium ml-1">{application.qyteti}</span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-medium text-gray-700">Date:</span>
                                            <span className="text-gray-900 ml-1">
                                                {application.koha_aplikimit ? new Date(application.koha_aplikimit).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditApplication(application)}
                                            className="flex-1 text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-md transition-colors duration-200 flex items-center justify-center gap-1"
                                        >
                                            Review
                                        </button>
                                        <button
                                            onClick={() => handleDeleteApplication(application)}
                                            className="flex-1 text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-2 rounded-md transition-colors duration-200 flex items-center justify-center gap-1"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-6 text-center text-gray-500">
                            No {status} applications found
                        </div>
                    )}
                </div>
            </div>


            {/* Application Edit Modal */}
            <ApplicationEditModal
                isOpen={showEditModal}
                onClose={handleCloseModal}
                application={editingApplication}
                onApplicationUpdated={handleApplicationUpdated}
            />
        </div>
    );
}