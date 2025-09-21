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

  const fetchUsers = async() => {
    if(search != "") {
      const response = await apiGet(`/klienti/search/${search}`);
      setUsers(Array.isArray(response) ? response : [response]);
    } else {
      const response = await apiGet("/klienti/");
      setUsers(response);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [users]);

  useEffect(() => {
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      fetchUsers();
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
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
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
