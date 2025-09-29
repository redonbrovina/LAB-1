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

        setFormData({
            LecturerName: "",
            Email: "",
            Department: ""
        })
        setShowEditForm(false);
    }


    return (
        <div>
            <h1>Ligjeruesi Management</h1>

            <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>Add Lecturer</button>

            <table className="table table-container">
                <thead className="table-head">
                    <th className="table-head-cell">ID</th>
                    <th className="table-head-cell">Lecturer Name</th>
                    <th className="table-head-cell">Email</th>
                    <th className="table-head-cell">Department</th>
                    <th className="table-head-cell">Actions</th>
                </thead>
                <tbody>
                    {ligjeruesi.map((ligjeruesi) => (
                        <tr className="table-row" key={ligjeruesi.LecturerID}>
                            <td className="table-cell">{ligjeruesi.LecturerID}</td>
                            <td className="table-cell">{ligjeruesi.LecturerName}</td>
                            <td className="table-cell">{ligjeruesi.Email}</td>
                            <td className="table-cell">{ligjeruesi.Department}</td>
                            <td className="table-actions">
                                <button onClick={() => handleEditClick(ligjeruesi)} className="btn btn-secondary">Edit</button>
                                <button onClick={() => handleDeleteClick(ligjeruesi)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <button className="btn btn-danger" onClick={()=>setShowAddForm(false)}>Close</button>
                        <h1 className="text-2xl font-bold mb-4">Add Lecturer</h1>
                        <form className="form" onSubmit={handleSubmit}>
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
                            <button type="submit" className="btn btn-primary">Add Lecturer</button>
                        </form>
                    </div>
                </div>
            )}

            {showEditForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <button onClick={()=>setShowEditForm(false)} className="btn btn-danger">Close</button>
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