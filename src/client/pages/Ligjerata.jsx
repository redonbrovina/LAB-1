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

        try {
            const response = await createApiClient("ligjerata").create(formData);
            if (response) {
                alert("Lecture added successfully");
            } else {
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
        if (window.confirm("Are you sure you want to delete this lecture?")) {
            const deleteLecture = async () => {
                try {
                    const response = await createApiClient("ligjerata").delete(ligjerata.LectureID);
                    alert("Lecture deleted successfully");
                    fetchLigjerata();
                } catch (error) {
                    console.error("Error deleting lecture:", error);
                    fetchLigjerata();
                }
            }
            deleteLecture();
        }

        fetchLigjerata();
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const { LectureID, LectureName, LecturerID } = formData;

        try {
            const response = await createApiClient("ligjerata").update(LectureID, {
                LectureName: LectureName,
                LecturerID: LecturerID
            });
            if (response) {
                alert("Lecture updated successfully");
            } else {
                alert("Failed to update lecture");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        fetchLigjerata()

        setShowEditForm(false);
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">Ligjerata Management</h1>

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Add Lecture
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Lecture</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Lecturer Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {ligjerata.map((ligjerata) => (
                                <tr key={ligjerata.LectureID} className="hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-4 text-center">{ligjerata.LectureID}</td>
                                    <td className="px-6 py-4 text-center">{ligjerata.LectureName}</td>
                                    <td className="px-6 py-4 text-center">{ligjerata.Ligjeruesi.LecturerName}</td>
                                    <td className="px-6 py-4 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleEditClick(ligjerata)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(ligjerata)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-6 text-blue-700 text-center">Add Lecture</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Lecture Name"
                                value={formData.LectureName}
                                onChange={(e) => setFormData({ ...formData, LectureName: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <select
                                value={formData.LecturerID}
                                onChange={(e) => setFormData({ ...formData, LecturerID: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select Lecturer</option>
                                {ligjeruesi.map((ligjeruesi) => (
                                    <option key={ligjeruesi.LecturerID} value={ligjeruesi.LecturerID}>{ligjeruesi.LecturerName}</option>
                                ))}
                            </select>

                            <div className="flex gap-2 justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Add Lecture
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-6 text-blue-700 text-center">Edit Lecture</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleEditSubmit}>
                            <label className="font-semibold text-gray-700">Lecture Name</label>
                            <input
                                type="text"
                                placeholder="Lecture Name"
                                value={formData.LectureName}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setFormData({ ...formData, LectureName: e.target.value })}
                            />

                            <label className="font-semibold text-gray-700">Lecturer Name</label>
                            <select
                                value={formData.LecturerID}
                                onChange={(e) => setFormData({ ...formData, LecturerID: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select Lecturer</option>
                                {ligjeruesi.map((ligjeruesi) => (
                                    <option key={ligjeruesi.LecturerID} value={ligjeruesi.LecturerID}>{ligjeruesi.LecturerName}</option>
                                ))}
                            </select>
                            <div className="flex gap-2 justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEditForm(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Submit Edit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}