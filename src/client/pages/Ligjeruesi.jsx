import { useState, useEffect } from "react";
import {createApiClient} from "../utils/simpleApi";

export default function Ligjeruesi() {

    const [ligjeruesi, setLigjeruesi] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        LecturerName: "",
        Email: "",
        Department: ""
    });

    const fetchLigjeruesi = async () => {
        try {
            const ligjeruesi = await createApiClient("ligjeruesi").getAll();
            setLigjeruesi(ligjeruesi);
        } catch (error) {
            console.error("Error fetching ligjeruesi:", error);
        }
    }

    useEffect(() => {
        fetchLigjeruesi();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAddForm(false);

        try{
            const response = await createApiClient("ligjeruesi").create(formData);
            if(response){
                alert("Lecturer added successfully");
            }else{
                alert("Failed to add lecturer");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        fetchLigjeruesi();
    }


    const handleEditClick = (ligjeruesi) => {
        setShowEditForm(true);
        setFormData({ ...ligjeruesi });
    }

    const handleDeleteClick = async (ligjeruesi) => {
        if(window.confirm("Are you sure you want to delete this lecturer?")) {
            const deleteLecturer = async () => {
                try {
                    const response = await createApiClient("ligjeruesi").delete(ligjeruesi.LecturerID);
                    alert("Lecturer deleted successfully");
                    fetchLigjeruesi();
                }catch(error){
                    console.error("Error deleting lecturer:", error);
                    fetchLigjeruesi();
                }
            }
            deleteLecturer();
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const {LecturerID, LecturerName, Email, Department} = formData;
        try {
            const response = await createApiClient("ligjeruesi").update(LecturerID, {
                LecturerName: LecturerName,
                Email: Email,
                Department: Department
            });
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        fetchLigjeruesi();

        setShowEditForm(false);
    }


    return (
        <div>
            <h1>Ligjeruesi Management</h1>

            <button className="px-4 py-2 bg-blue-500 text-white rounded-md my-10 hover:bg-blue-600 transition-colors" onClick={() => setShowAddForm(true)}>Add Lecturer</button>

            <table>
                <thead>
                    <th className="px-6">ID</th>
                    <th className="px-6">Lecturer Name</th>
                    <th className="px-6">Email</th>
                    <th className="px-6">Department</th>
                    <th className="px-6">Actions</th>
                </thead>
                <tbody>
                    {ligjeruesi.map((ligjeruesi) => (
                        <tr key={ligjeruesi.LecturerID}>
                            <td className="px-6">{ligjeruesi.LecturerID}</td>
                            <td className="px-6">{ligjeruesi.LecturerName}</td>
                            <td className="px-6">{ligjeruesi.Email}</td>
                            <td className="px-6">{ligjeruesi.Department}</td>
                            <td className="px-6">{ligjeruesi.Actions}</td>
                            <td>
                                <button onClick={() => handleEditClick(ligjeruesi)} className="px-6 bg-blue-500 text-white rounded-md">Edit</button>
                                <button onClick={() => handleDeleteClick(ligjeruesi)} className="px-6 bg-red-500 text-white rounded-md">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h1 className="text-2xl font-bold mb-4">Add Lecturer</h1>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Lecturer Name"
                                value={formData.LecturerName}
                                onChange={(e) => setFormData({ ...formData, LecturerName: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.Email}
                                onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Department"
                                value={formData.Department}
                                onChange={(e) => setFormData({ ...formData, Department: e.target.value })}
                            />
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Add Lecturer</button>
                        </form>
                    </div>
                </div>
            )}

            {showEditForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h1 className="text-2xl font-bold mb-4">Edit Lecturer</h1>
                        <form onSubmit={handleEditSubmit}>
                            <input className="px-4 py-2 border border-gray-300 rounded-md" type="text" placeholder="Lecturer Name" value={formData.LecturerName} onChange={(e) => setFormData({ ...formData, LecturerName: e.target.value })} />
                            <input className="px-4 py-2 border border-gray-300 rounded-md" type="email" placeholder="Email" value={formData.Email} onChange={(e) => setFormData({ ...formData, Email: e.target.value })} />
                            <input className="px-4 py-2 border border-gray-300 rounded-md" type="text" placeholder="Department" value={formData.Department} onChange={(e) => setFormData({ ...formData, Department: e.target.value })} />
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Submit Edit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}