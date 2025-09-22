import EditUserModal from "../admin/EditUserModal";
import { useState, useEffect } from "react";
import { apiGet, apiDelete } from "../utils/api";
import { Search, Plus, Edit, Trash2, Eye, Mail, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async(page = pagination.currentPage) => {
    setLoading(true);
    try {
      if(search !== "") {
        const response = await apiGet(`/klienti/search?q=${encodeURIComponent(search)}`);
        setUsers(Array.isArray(response) ? response : [response]);

        setPagination(prev => ({
          ...prev,
          currentPage: 1,
          totalPages: 1,
          totalItems: Array.isArray(response) ? response.length : 1,
          hasNextPage: false,
          hasPrevPage: false
        }));
      } else {
        const response = await apiGet(`/klienti/paginated?page=${page}&limit=${pagination.itemsPerPage}`);
        setUsers(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      fetchUsers(1); // Reset to page 1 when searching
    }, 300); // 300ms delay
    
    setSearchTimeout(timeout);
    
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [search]);


  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  }

  const handleDeleteClick = (user) => {
    if(window.confirm("Are you sure you want to delete this user?")) {
      const deleteUser = async () => {
        await apiDelete(`/klienti/${user.klientiID}`);
        setUsers(users.filter((u) => u.klientiID !== user.klientiID));
        fetchUsers()
      }
      deleteUser();
    }
  }

  const handleUserUpdated = (updatedUser) => {
    console.log('User updated callback received:', updatedUser);
    fetchUsers();
  }

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
  }

  // Pagination handlers
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchUsers(newPage);
    }
  }

  return (
    <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#808080" }}>
              User Management
            </h1>
            <p className="text-gray-600 mt-1">Manage the clients in the system</p>
          </div>
          <Link 
            to="/admin/users/create"
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Plus size={18} />
            Add User
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="search"
                value={search}
                onChange={handleSearch}
                placeholder="Search by company name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-500">Loading users...</div>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
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
                    {users.map((user) => (
                      <tr key={user.klientiID} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                                <span className="text-red-600 font-medium text-sm">
                                  {user.emri_kompanise.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.emri_kompanise}</div>
                              <div className="text-sm text-gray-500">ID: {user.klientiID}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Mail size={14} className="text-gray-400" />
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone size={14} className="text-gray-400" />
                            {user.adresa}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Customer
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center gap-1">
                          <div size={14} className="text-gray-400" />
                          {user.shteti.emri_shtetit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEditClick(user)}
                              className="text-green-600 hover:text-green-900 p-1 rounded"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                                onClick={() => handleDeleteClick(user)} 
                                className="text-red-600 hover:text-red-900 p-1 rounded">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden">
                {users.length > 0 ? (
                  <div className="space-y-4 p-4">
                    {users.map((user) => (
                      <div key={user.klientiID} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        {/* First Row - Avatar, Name, and Actions */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex-shrink-0 h-12 w-12">
                            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                              <span className="text-red-600 font-medium text-sm">
                                {user.emri_kompanise.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">{user.emri_kompanise}</div>
                            <div className="text-sm text-gray-500">ID: {user.klientiID}</div>
                            <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Customer
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEditClick(user)}
                              className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(user)} 
                              className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Second Row - Contact and Country */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-900 truncate">{user.email}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-500 truncate">{user.adresa}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{user.shteti.emri_shtetit}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No users found
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{((pagination.currentPage - 1) * pagination.itemsPerPage) + 1}</span> to <span className="font-medium">{Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}</span> of <span className="font-medium">{pagination.totalItems}</span> results
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {/* Page numbers */}
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const pageNum = Math.max(1, pagination.currentPage - 2) + i;
              if (pageNum > pagination.totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 text-sm rounded ${
                    pageNum === pagination.currentPage
                      ? 'bg-red-500 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={showEditModal}
        onClose={handleCloseModal}
        user={editingUser}
        onUserUpdated={handleUserUpdated}
      />
    </div>
  );
}
