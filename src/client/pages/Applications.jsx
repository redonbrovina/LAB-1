import AdminNavbar from "../admin/AdminNavbar";
import ApplicationEditModal from "../admin/ApplicationEditModal";
import { apiGet } from "../utils/api";
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
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingApplication, setEditingApplication] = useState(null);
    const [status, setStatus] = useState('pending');

    const fetchApplications = async () => {
        try {
            const data = await apiGet("/aplikimi");
            
            const apps = data.filter((application) => {
                const applicationStatus = application.statusi?.statusi;
                return applicationStatus === status;
            });
            
            setApplications(apps);
        } catch (error) {
            console.error('Error fetching applications:', error);
            setApplications([]);
        }
    }
    
    useEffect(() => {
        fetchApplications();
    }, [status]);

    const handleEditClick = (application) => {
        setEditingApplication(application);
        setShowEditModal(true);
    }

    const handleApplicationUpdated = (updatedApplication) => {
        fetchApplications();
    }

    const handleCloseModal = () => {
        setShowEditModal(false);
        setEditingApplication(null);
    }


    return (
        <div className="min-h-screen" style={{ backgroundColor: "#FEF2F2" }}>
            <AdminNavbar />
            
            <div className="ml-64 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold" style={{ color: "#808080" }}>
                            Applications Management
                        </h1>
                        <p className="text-gray-600 mt-1">Manage client applications in the system</p>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-4 py-2 mt-2 border border-gray-300 rounded-lg hover:border-gray-500">
                            <option value='pending'>Pending</option>
                            <option value='pranuar'>Approved</option>
                            <option value='refuzuar'>Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Applications Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
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
                                        Country
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {applications.map((application) => (
                                    <tr key={application.aplikimiID} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="text-blue-600 font-medium text-sm">
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
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {application.koha_aplikimit ? new Date(application.koha_aplikimit).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {(() => {
                                                const status = application.statusi?.statusi || 'pending';
                                                const style = statusStyles[status] || statusStyles['pending'];
                                                return (
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bgColor} ${style.textColor}`}>
                                                        {style.label}
                                                    </span>
                                                );
                                            })()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {application.shteti?.emri_shtetit || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleEditClick(application)}
                                                    className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                                >
                                                    Review
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))} 

                                {applications.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                            No applications found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{applications.length}</span> of <span className="font-medium">{applications.length}</span> results
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded">
                            1
                        </button>
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                            Next
                        </button>
                    </div>
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

