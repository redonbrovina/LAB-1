import { useState, useEffect } from "react";
import {createApiClient} from "../utils/simpleApi";

export default function Satellite() {

    const [satellites, setSatellites] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        Name: "",
        PlanetId: ""
    });
    const [showForPlanet, setShowForPlanet] = useState(false)

    const fetchSatellites = async () => {
        try {
            const satellite = await createApiClient("satellite").getAll();
            setSatellites(satellite);
        } catch (error) {
            console.error("Error fetching satellite:", error);
        }
    }

    const fetchPlanets = async () => {
        try {
            const planets = await createApiClient("planet").getAll();
            setPlanets(planets);
        } catch (error) {
            console.error("Error fetching planets:", error);
        }
    }

    useEffect(() => {
        fetchSatellites();
        fetchPlanets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAddForm(false);

        try {
            const response = await createApiClient("satellite").create(formData);
            if (response) {
                alert("Satellite added successfully");
            } else {
                alert("Failed to add Satellite");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        setFormData({
            Name: "",
            PlanetId: ""
        })
        await fetchSatellites();
    }

    const handleEditClick = (satellite) => {
        setShowEditForm(true);
        setFormData({ ...satellite });
    }

    const handleDeleteClick = async (satellite) => {
        if (window.confirm("Are you sure you want to delete this satellite?")) {
            const deleteSatellite = async () => {
                try {
                    const response = await createApiClient("satellite").deleteS(satellite.SatelliteId);
                    alert("satellite deleted successfully");
                    fetchSatellites();
                } catch (error) {
                    console.error("Error deleting satellite:", error);
                    fetchSatellites();
                }
            }
            deleteSatellite();
        }

        fetchSatellites();
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const { SatelliteId, Name, PlanetId } = formData;

        try {
            const response = await createApiClient("satellite").update(SatelliteId, {
                Name: Name,
                PlanetId: PlanetId
            });
            if (response) {
                alert("Satellite updated successfully");
            } else {
                alert("Failed to update Satellite");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        fetchSatellites()
        setFormData({
            Name: "",
            PlanetId: ""
        })
        setShowEditForm(false);
    }

    const handleShowPlanets = async (e) => {
        e.preventDefault();

        const {PlanetId} = formData
        try{

            const response = await createApiClient("satellite").getById(PlanetId);
            if (response) {
                alert("Satellites of planets shown successfully");
            } else {
                alert("Failed to show Satellites");
            }
            console.log(response)
            setSatellites(response)
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        setShowForPlanet(false)
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">Satellite Management</h1>

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Add Satellite
                    </button>
                </div>

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => fetchSatellites()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Revert Satellites
                    </button>
                </div>

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowForPlanet(true)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Select Planet for Satellites
                    </button>
                </div>
                

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Satellite</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Planet</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {satellites.map((satellite) => (
                                <tr key={satellite.SatelliteId} className="hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-4 text-center">{satellite.SatelliteId}</td>
                                    <td className="px-6 py-4 text-center">{satellite.Name}</td>
                                    <td className="px-6 py-4 text-center">{satellite.Planet.Name}</td>
                                    <td className="px-6 py-4 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleEditClick(satellite)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(satellite)}
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
                        <h2 className="text-xl font-bold mb-6 text-blue-700 text-center">Add Satellite</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Satellite Name"
                                value={formData.Name}
                                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <select
                                value={formData.PlanetId}
                                onChange={(e) => setFormData({ ...formData, PlanetId: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select Planet</option>
                                {planets.map((planet) => (
                                    <option key={planet.PlanetId} value={planet.PlanetId}>{planet.Name}</option>
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
                                    Add Satellite
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-6 text-blue-700 text-center">Edit Satellite</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleEditSubmit}>
                            <label className="font-semibold text-gray-700">Satellite Name</label>
                            <input
                                type="text"
                                placeholder="Satellite Name"
                                value={formData.Name}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                            />

                            <label className="font-semibold text-gray-700">Planet Name</label>
                            <select
                                value={formData.PlanetId}
                                onChange={(e) => setFormData({ ...formData, PlanetId: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select Planet</option>
                                {planets.map((planet) => (
                                    <option key={planet.PlanetId} value={planet.PlanetId}>{planet.Name}</option>
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

            {showForPlanet && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-6 text-blue-700 text-center">Edit Satellite</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleShowPlanets}>
                            
                            <select
                                value={formData.PlanetId}
                                onChange={(e) => setFormData({ ...formData, PlanetId: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select Planet</option>
                                {planets.map((planet) => (
                                    <option key={planet.PlanetId} value={planet.PlanetId}>{planet.Name}</option>
                                ))}
                            </select>
                            <div className="flex gap-2 justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForPlanet(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Show Satellites of Chosen Planet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}