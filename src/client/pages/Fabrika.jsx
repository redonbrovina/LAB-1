import { useState, useEffect } from "react";
import {createApiClient} from "../utils/simpleApi";

export default function Fabrika() {
    const [fabrikat, setFabrikat] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        EmriFabrikes: "",
        Lokacioni: "",
    });

    const fetchFabrikat = async () => {
        try {
            const fabrika = await createApiClient("fabrika").getAll();
            setFabrikat(fabrika);
        } catch (error) {
            console.error("Error fetching fabrikat:", error);
        }
    }

    useEffect(() => {
        fetchFabrikat();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAddForm(false);

        try {
            const response = await createApiClient("fabrika").create(formData);
            if (response) {
                alert("fabrika added successfully");
            } else {
                alert("Failed to add fabrika");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        setFormData({
            EmriFabrikes: "",
            Lokacioni: ""
        })
        await fetchFabrikat();
    }

    const handleEditClick = (fabrika) => {
        setShowEditForm(true);
        setFormData({ ...fabrika });
    }

    const handleDeleteClick = async (fabrika) => {
        if (window.confirm("Are you sure you want to delete this fabrika?")) {
            const deleteFabrika = async () => {
                try {
                    const response = await createApiClient("fabrika").delete(fabrika.ID);
                    alert("fabrika deleted successfully");
                    fetchFabrikat();
                } catch (error) {
                    console.error("Error deleting fabrika:", error);
                    fetchFabrikat();
                }
            }
            deleteFabrika();
        }

        fetchFabrikat();
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const { ID, EmriFabrikes, Lokacioni } = formData;

        try {
            const response = await createApiClient("fabrika").update(ID, {
                EmriFabrikes: EmriFabrikes,
                Lokacioni: Lokacioni
            });
            if (response) {
                alert("fabrika updated successfully");
            } else {
                alert("Failed to update fabrika");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        fetchFabrikat()
        setFormData({
            EmriFabrikes: "",
            Lokacioni: ""
        })
        setShowEditForm(false);
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">Fabrika
                     Management</h1>

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Add Fabrika
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Emri i Fabrikes</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Lokacioni</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {fabrikat.map((fabrika) => (
                                <tr key={fabrika.ID} className="hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-4 text-center">{fabrika.ID}</td>
                                    <td className="px-6 py-4 text-center">{fabrika.EmriFabrikes}</td>
                                    <td className="px-6 py-4 text-center">{fabrika.Lokacioni}</td>
                                    <td className="px-6 py-4 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleEditClick(fabrika)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(fabrika)}
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
                        <h2 className="text-xl font-bold mb-6 text-blue-700 text-center">Add Fabrika</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Fabrika Name"
                                value={formData.EmriFabrikes}
                                onChange={(e) => setFormData({ ...formData, EmriFabrikes: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                                type="text"
                                placeholder="Fabrika Lokacioni"
                                value={formData.Lokacioni}
                                onChange={(e) => setFormData({ ...formData, Lokacioni: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

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
                                    Add Fabrika
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-6 text-blue-700 text-center">Edit Fabrika</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleEditSubmit}>
                            <label className="font-semibold text-gray-700">Fabrika Name</label>
                            <input
                                type="text"
                                placeholder="Fabrika Name"
                                value={formData.EmriFabrikes}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setFormData({ ...formData, EmriFabrikes: e.target.value })}
                            />

                            <input
                                type="text"
                                placeholder="Fabrika Lokacioni"
                                value={formData.Lokacioni}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setFormData({ ...formData, Lokacioni: e.target.value })}
                            />
                            
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