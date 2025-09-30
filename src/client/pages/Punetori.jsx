import { useState, useEffect } from "react";
import {createApiClient} from "../utils/simpleApi";

export default function Punetori() {

    const [punetoret, setPunetoret] = useState([]);
    const [fabrikat, setFabrikat] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        Emri: "",
        Mbiemri: "",
        Pozita: "",
        ID_Fabrika: ""
    });

    const fetchPunetoret = async () => {
        try {
            const punetori = await createApiClient("punetori").getAll();
            setPunetoret(punetori);
        } catch (error) {
            console.error("Error fetching punetori:", error);
        }
    }

    const fetchFabrikat = async () => {
        try {
            const fabrika = await createApiClient("fabrika").getAll();
            setFabrikat(fabrika);
        } catch (error) {
            console.error("Error fetching fabrikat:", error);
        }
    }

    useEffect(() => {
        fetchPunetoret();
        fetchFabrikat();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAddForm(false);

        try {
            const response = await createApiClient("punetori").create(formData);
            if (response) {
                alert("Punetori added successfully");
            } else {
                alert("Failed to add Punetori");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        setFormData({
            Emri: "",
            Mbiemri: "",
            Pozita: "",
            ID_Fabrika: ""
        })
        await fetchPunetoret();
    }

    const handleEditClick = (punetori) => {
        setShowEditForm(true);
        setFormData({ ...punetori });
    }

    const handleDeleteClick = async (punetori) => {
        if (window.confirm("Are you sure you want to delete this punetor?")) {
            const deletePunetor = async () => {
                try {
                    const response = await createApiClient("punetori").delete(punetori.ID);
                    alert("punetori deleted successfully");
                    fetchPunetoret();
                } catch (error) {
                    console.error("Error deleting punetori:", error);
                    fetchPunetoret();
                }
            }
            deletePunetor();
        }

        fetchPunetoret();
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const { ID, Emri, Mbiemri, Pozita, ID_Fabrika } = formData;

        try {
            const response = await createApiClient("punetori").update(ID, {
                Emri: Emri,
                Mbiemri: Mbiemri,
                Pozita: Pozita,
                ID_Fabrika: ID_Fabrika
            });
            if (response) {
                alert("punetori updated successfully");
            } else {
                alert("Failed to update punetori");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        fetchPunetoret()
        setFormData({
            Emri: "",
            Mbiemri: "",
            Pozita: "",
            ID_Fabrika: ""
        })
        setShowEditForm(false);
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">Punetori Management</h1>

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Add Punetori
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Emri</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Mbiemri</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Pozita</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Fabrika</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {punetoret.map((punetori) => (
                                <tr key={punetori.ID} className="hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-4 text-center">{punetori.ID}</td>
                                    <td className="px-6 py-4 text-center">{punetori.Emri}</td>
                                    <td className="px-6 py-4 text-center">{punetori.Mbiemri}</td>
                                    <td className="px-6 py-4 text-center">{punetori.Pozita}</td>
                                    <td className="px-6 py-4 text-center">{punetori.Fabrika.EmriFabrikes}</td>
                                    <td className="px-6 py-4 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleEditClick(punetori)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(punetori)}
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
                        <h2 className="text-xl font-bold mb-6 text-blue-700 text-center">Add Punetori</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Punetori Name"
                                value={formData.Emri}
                                onChange={(e) => setFormData({ ...formData, Emri: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                                type="text"
                                placeholder="Punetori Surname"
                                value={formData.Mbiemri}
                                onChange={(e) => setFormData({ ...formData, Mbiemri: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                                type="text"
                                placeholder="Punetori Pozita"
                                value={formData.Pozita}
                                onChange={(e) => setFormData({ ...formData, Pozita: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <select
                                value={formData.ID_Fabrika}
                                onChange={(e) => setFormData({ ...formData, ID_Fabrika: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select Fabrika</option>
                                {fabrikat.map((fabrika) => (
                                    <option key={fabrika.ID} value={fabrika.ID}>{fabrika.EmriFabrikes}</option>
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
                                    Add Punetori
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-6 text-blue-700 text-center">Edit Punetori</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleEditSubmit}>
                            <label className="font-semibold text-gray-700">Punetori Name</label>
                            <input
                                type="text"
                                placeholder="Punetori Name"
                                value={formData.Emri}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setFormData({ ...formData, Emri: e.target.value })}
                            />

                            <input
                                type="text"
                                placeholder="Punetori Surname"
                                value={formData.Mbiemri}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setFormData({ ...formData, Mbiemri: e.target.value })}
                            />

                            <input
                                type="text"
                                placeholder="Punetori Pozita"
                                value={formData.Pozita}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setFormData({ ...formData, Pozita: e.target.value })}
                            />


                            <label className="font-semibold text-gray-700">Fabrika Name</label>
                            <select
                                value={formData.ID_Fabrika}
                                onChange={(e) => setFormData({ ...formData, ID_Fabrika: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select Fabrika</option>
                                {fabrikat.map((fabrika) => (
                                    <option key={fabrika.ID} value={fabrika.ID}>{fabrika.EmriFabrikes}</option>
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