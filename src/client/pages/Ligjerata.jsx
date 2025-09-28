import { useState, useEffect } from "react";
import {createApiClient} from "../utils/simpleApi";

export default function Ligjerata() {

    const [ligjerata, setLigjerata] = useState([]);
    const [ligjeruesi, setLigjeruesi] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        LectureName: "",
        LecturerID: ""
    });
    

    const fetchLigjerata = async () => {
        try {
            const ligjerata = await createApiClient("ligjerata").getAll();
            setLigjerata(ligjerata);
        } catch (error) {
            console.error("Error fetching ligjerata:", error);
        }
    }
    

    const fetchLigjeruesi = async () => {
        try {
            const ligjeruesi = await createApiClient("ligjeruesi").getAll();
            setLigjeruesi(ligjeruesi);
        } catch (error) {
            console.error("Error fetching ligjeruesi:", error);
        }
    }

    useEffect(() => {
        fetchLigjerata();
        fetchLigjeruesi();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAddForm(false);
        
        try{
            const response = await createApiClient("ligjerata").create(formData);
            if(response){
                alert("Lecture added successfully");
            }else{
                alert("Failed to add lecture");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        await fetchLigjerata();
    }

    const handleEditClick = (ligjerata) => {
        setShowEditForm(true);
        setFormData({ ...ligjerata });
    }

    const handleDeleteClick = async (ligjerata) => {
        if(window.confirm("Are you sure you want to delete this lecture?")) { 
            const deleteLecture = async () => {
                try{
                    const response = await createApiClient("ligjerata").delete(ligjerata.LectureID);
                    alert("Lecture deleted successfully");
                    fetchLigjerata();
                }catch(error){
                    console.error("Error deleting lecture:", error);
                    fetchLigjerata();
                }
            }
            deleteLecture();
        }
        
        fetchLigjerata();
    }

    const handleEditSubmit = async(e) => {
        e.preventDefault();

        const {LectureID, LectureName, LecturerID} = formData;

        try{
            const response = await createApiClient("ligjerata").update(LectureID, {
                LectureName: LectureName,
                LecturerID: LecturerID
            });
            if(response){
                alert("Lecture updated successfully");
            }else{
                alert("Failed to update lecture");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        fetchLigjerata()

        setShowEditForm(false);
    }


    return (
        <div>
            <h1>Ligjerata Management</h1>

            <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md my-10 hover:bg-blue-600 transition-colors">Add Lecture</button>

            <table>
                <thead className="bg-gray-50 border-b">
                    <th className="px-6">ID</th>
                    <th className="px-6">Lecture</th>
                    <th className="px-6">Lecturer Name</th>
                    <th className="px-6">Actions</th>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    {ligjerata.map((ligjerata) => (
                        <tr key={ligjerata.LectureID}>
                            <td className="px-6 text-center">{ligjerata.LectureID}</td>
                            <td className="px-6 text-center">{ligjerata.LectureName}</td>
                            <td className="px-6 text-center">{ligjerata.Ligjeruesi.LecturerName}</td>
                            <td>
                                <button onClick={() => handleEditClick(ligjerata)} className="px-2 bg-blue-500 text-white rounded-md">Edit</button>
                                <button onClick={() => handleDeleteClick(ligjerata)} className="px-2 bg-red-500 text-white rounded-md">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h1>Add Lecture</h1>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                            type="text"
                            placeholder="Lecture Name"
                            value={formData.LectureName}
                            onChange={(e) => setFormData({ ...formData, LectureName: e.target.value })}
                            />

                            <select
                                value={formData.LecturerID}
                                onChange={(e) => setFormData({ ...formData, LecturerID: e.target.value })}
                            >
                                <option value="">Select Lecturer</option>
                                {ligjeruesi.map((ligjeruesi) => (
                                    <option key={ligjeruesi.LecturerID} value={ligjeruesi.LecturerID}>{ligjeruesi.LecturerName}</option>
                                ))}
                            </select>
                            
                            <button type="submit">Add Lecture</button>
                        </form>
                    </div>
                </div>
            )}

            {showEditForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h1 className="text-2xl font-bold mb-4">Edit Lecture</h1>
                        <form className="flex flex-col gap-4" onSubmit={handleEditSubmit}>
                            <label>Lecture Name</label>
                            <input
                            type="text"
                            placeholder="Lecture Name"
                            value={formData.LectureName}
                            className="bg-gray-100 p-2 rounded-md"
                            onChange={(e) => setFormData({ ...formData, LectureName: e.target.value })}
                            />

                            <label>Lecturer Name</label>
                            <select
                                value={formData.LecturerID}
                                onChange={(e) => setFormData({ ...formData, LecturerID: e.target.value })}
                            >
                                <option value="">Select Lecturer</option>
                                {ligjeruesi.map((ligjeruesi) => (
                                    <option key={ligjeruesi.LecturerID} value={ligjeruesi.LecturerID}>{ligjeruesi.LecturerName}</option>
                                ))}
                            </select>
                            <button type="submit">Submit Edit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}