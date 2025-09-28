import { useState, useEffect } from "react";
import { Database, Plus, Edit3, Trash2, Save, X, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/api";

export default function ReferenceData() {
    const [activeTab, setActiveTab] = useState('doza');
    const [doza, setDoza] = useState([]);
    const [shteti, setShteti] = useState([]);
    const [kategoria, setKategoria] = useState([]);
    const [aplikimiStatus, setAplikimiStatus] = useState([]);
    const [pagesaStatus, setPagesaStatus] = useState([]);
    const [porosiaStatus, setPorosiaStatus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");
    
    // Pagination state for countries
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCountries, setTotalCountries] = useState(0);
    const itemsPerPage = 10;

    // Fetch data for all tables
    const fetchData = async () => {
        setLoading(true);
        try {
            const [dozaData, shtetiData, kategoriaData, aplikimiStatusData, pagesaStatusData, porosiaStatusData] = await Promise.all([
                apiGet('/doza/'),
                apiGet(`/shteti/?page=${currentPage}&limit=${itemsPerPage}`),
                apiGet('/kategorite/'),
                apiGet('/aplikimi-status/'),
                apiGet('/pagesa-status/'),
                apiGet('/porosia-status/')
            ]);
            setDoza(dozaData);
            setShteti(shtetiData.data || shtetiData);
            setKategoria(kategoriaData);
            setAplikimiStatus(aplikimiStatusData);
            setPagesaStatus(pagesaStatusData);
            setPorosiaStatus(porosiaStatusData);
            
            // Set pagination info for countries
            if (shtetiData.total) {
                setTotalCountries(shtetiData.total);
                setTotalPages(Math.ceil(shtetiData.total / itemsPerPage));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    // Reset pagination when switching tabs
    useEffect(() => {
        if (activeTab !== 'shteti') {
            setCurrentPage(1);
        }
    }, [activeTab]);

    const getCurrentData = () => {
        switch (activeTab) {
            case 'doza': return doza;
            case 'shteti': return shteti;
            case 'kategoria': return kategoria;
            case 'aplikimi-status': return aplikimiStatus;
            case 'pagesa-status': return pagesaStatus;
            case 'porosia-status': return porosiaStatus;
            default: return [];
        }
    };

    const getTableHeaders = () => {
        switch (activeTab) {
            case 'doza':
                return ['ID', 'Dose (ml)', 'Actions'];
            case 'shteti':
                return ['ID', 'Country Name', 'ISO Code', 'Actions'];
            case 'kategoria':
                return ['ID', 'Category Name', 'Actions'];
            case 'aplikimi-status':
                return ['ID', 'Status Name', 'Actions'];
            case 'pagesa-status':
                return ['ID', 'Status Name', 'Actions'];
            case 'porosia-status':
                return ['ID', 'Status Name', 'Actions'];
            default:
                return [];
        }
    };

    const getFormFields = () => {
        switch (activeTab) {
            case 'doza':
                return [
                    { name: 'doza', label: 'Dose (ml)', type: 'number', step: '0.01', required: true }
                ];
            case 'shteti':
                return [
                    { name: 'emri_shtetit', label: 'Country Name', type: 'text', required: true },
                    { name: 'iso_kodi', label: 'ISO Code', type: 'text', required: true, maxLength: 10 }
                ];
            case 'kategoria':
                return [
                    { name: 'emri', label: 'Category Name', type: 'text', required: true }
                ];
            case 'aplikimi-status':
                return [
                    { name: 'statusi', label: 'Status Name', type: 'text', required: true, maxLength: 50 }
                ];
            case 'pagesa-status':
                return [
                    { name: 'statusi', label: 'Status Name', type: 'text', required: true, maxLength: 50 }
                ];
            case 'porosia-status':
                return [
                    { name: 'statusi', label: 'Status Name', type: 'text', required: true, maxLength: 50 }
                ];
            default:
                return [];
        }
    };

    const getApiEndpoint = () => {
        switch (activeTab) {
            case 'doza':
                return 'doza';
            case 'shteti':
                return 'shteti';
            case 'kategoria':
                return 'kategorite';
            case 'aplikimi-status':
                return 'aplikimi-status';
            case 'pagesa-status':
                return 'pagesa-status';
            case 'porosia-status':
                return 'porosia-status';
            default:
                return activeTab;
        }
    };

    const handleAdd = () => {
        setEditingItem(null);
        setFormData({});
        setShowModal(true);
        setError("");
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ ...item });
        setShowModal(true);
        setError("");
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) {
            return;
        }

        try {
            await apiDelete(`/${getApiEndpoint()}/${id}`);
            await fetchData();
        } catch (error) {
            console.error('Error deleting item:', error);
            setError('Failed to delete item');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (editingItem) {
                const itemId = editingItem[`${activeTab}ID`] || editingItem[`${activeTab.replace('-', '_')}ID`];
                await apiPut(`/${getApiEndpoint()}/${itemId}`, formData);
            } else {
                await apiPost(`/${getApiEndpoint()}/`, formData);
            }
            setShowModal(false);
            await fetchData();
        } catch (error) {
            console.error('Error saving item:', error);
            setError('Failed to save item');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const renderPagination = () => {
        if (activeTab !== 'shteti' || totalPages <= 1) return null;

        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="text-sm text-gray-700">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCountries)} of {totalCountries} countries
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    
                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 rounded-lg border transition-colors ${
                                currentPage === page
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'border-gray-300 hover:bg-gray-100'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        );
    };

    const renderTable = () => {
        const data = getCurrentData();
        const headers = getTableHeaders();

        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                            {activeTab} Management
                        </h3>
                        <button
                            onClick={handleAdd}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            <Plus size={18} />
                            Add New
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((item, index) => (
                                <tr key={item[`${activeTab}ID`] || item[`${activeTab.replace('-', '_')}ID`]} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item[`${activeTab}ID`] || item[`${activeTab.replace('-', '_')}ID`]}
                                    </td>
                                    {activeTab === 'doza' && (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.doza} ml
                                        </td>
                                    )}
                                    {activeTab === 'shteti' && (
                                        <>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.emri_shtetit}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.iso_kodi}
                                            </td>
                                        </>
                                    )}
                                    {activeTab === 'kategoria' && (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.emri}
                                        </td>
                                    )}
                                    {activeTab === 'aplikimi-status' && (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.statusi}
                                        </td>
                                    )}
                                    {activeTab === 'pagesa-status' && (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.statusi}
                                        </td>
                                    )}
                                    {activeTab === 'porosia-status' && (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.statusi}
                                        </td>
                                    )}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-blue-600 hover:text-blue-900 transition-colors"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item[`${activeTab}ID`] || item[`${activeTab.replace('-', '_')}ID`])}
                                                className="text-red-600 hover:text-red-900 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination for countries */}
                {renderPagination()}
            </div>
        );
    };

    const renderModal = () => {
        if (!showModal) return null;

        const fields = getFormFields();
        const title = editingItem ? `Edit ${activeTab}` : `Add New ${activeTab}`;

        return (
            <div className="fixed inset-0 backdrop-blur bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md border border-gray-200 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <button
                            onClick={() => setShowModal(false)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {field.label} {field.required && '*'}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleInputChange}
                                    step={field.step}
                                    maxLength={field.maxLength}
                                    required={field.required}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            </div>
                        ))}

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                <Save size={18} />
                                {editingItem ? 'Update' : 'Create'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white shadow-sm rounded-lg">
                <div className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Database className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Reference Data Management</h1>
                            <p className="text-gray-600 mt-1">Manage system reference data and lookup tables</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {[
                            { id: 'doza', label: 'Dosage' },
                            { id: 'shteti', label: 'Country' },
                            { id: 'kategoria', label: 'Category' },
                            { id: 'aplikimi-status', label: 'Application Status' },
                            { id: 'pagesa-status', label: 'Payment Status' },
                            { id: 'porosia-status', label: 'Order Status' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="text-gray-500">Loading...</div>
                </div>
            ) : (
                renderTable()
            )}

            {/* Modal */}
            {renderModal()}
        </div>
    );
}