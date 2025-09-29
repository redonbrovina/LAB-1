import { useState, useEffect } from "react";
import {createApiClient} from "../utils/simpleApi";

export default function Planet() {

    const [planets, setPlanets] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        Name: "",
        Type: ""
    });

    const fetchPlanets = async () => {
        try {
            const planets = await createApiClient("planet").getAll();
            setPlanets(planets);
        } catch (error) {
            console.error("Error fetching planets:", error);
        }
    }

    useEffect(() => {
        fetchPlanets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAddForm(false);

        try {
            const response = await createApiClient("planet").create(formData);
            if (response) {
                alert("Planet added successfully");
            } else {
                alert("Failed to add Planet");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        setFormData({
            Name: "",
            Type: ""
        })
        await fetchPlanets();
    }

    const handleEditClick = (planet) => {
        setShowEditForm(true);
        setFormData({ ...planet });
    }

    const handleDeleteClick = async (planet) => {
        if (window.confirm("Are you sure you want to delete this planet?")) {
            const deletePlanet = async () => {
                try {
                    const response = await createApiClient("planet").deleteS(planet.PlanetId);
                    alert("Planet deleted successfully");
                    fetchPlanets();
                } catch (error) {
                    console.error("Error deleting planet:", error);
                    fetchPlanets();
                }
            }
            deletePlanet();
        }

        fetchPlanets();
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const { PlanetId, Name, Type } = formData;

        try {
            const response = await createApiClient("planet").update(PlanetId, {
                Name: Name,
                Type: Type
            });
            if (response) {
                alert("Planet updated successfully");
            } else {
                alert("Failed to update Planet");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        fetchPlanets()
        setFormData({
            Name: "",
            Type: ""
        })
        setShowEditForm(false);
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">Planet Management</h1>

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Add Planet
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Planet</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {planets.map((planet) => (
                                <tr key={planet.PlanetId} className="hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-4 text-center">{planet.PlanetId}</td>
                                    <td className="px-6 py-4 text-center">{planet.Name}</td>
                                    <td className="px-6 py-4 text-center">{planet.Type}</td>
                                    <td className="px-6 py-4 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleEditClick(planet)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(planet)}
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
                        <h2 className="text-xl font-bold mb-6 text-blue-700 text-center">Add Planet</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Planet Name"
                                value={formData.Name}
                                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                                type="text"
                                placeholder="Planet Type"
                                value={formData.Type}
                                onChange={(e) => setFormData({ ...formData, Type: e.target.value })}
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
                                    Add Planet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-6 text-blue-700 text-center">Edit Planet</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleEditSubmit}>
                            <label className="font-semibold text-gray-700">Planet Name</label>
                            <input
                                type="text"
                                placeholder="Planet Name"
                                value={formData.Name}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                            />

                            <input
                                type="text"
                                placeholder="Planet Type"
                                value={formData.Type}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setFormData({ ...formData, Type: e.target.value })}
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