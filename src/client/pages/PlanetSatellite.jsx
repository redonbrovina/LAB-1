import { useState, useEffect } from 'react';

function PlanetSatellite() {
    const [planetet, setPlanetet] = useState([]);
    const [satelitet, setSatelitet] = useState([]);
    const [satelitetDeleted, setSatelitetDeleted] = useState([]);
    const [planetForm, setPlanetForm] = useState({ Name: '', Type: '' });
    const [satelitForm, setSatelitForm] = useState({ Name: '', PlanetID: '' });
    const [editingPlanet, setEditingPlanet] = useState(null);
    const [editingSatelit, setEditingSatelit] = useState(null);

    useEffect(() => {
        fetchPlanetet();
        fetchSatelitet();
        fetchSatelitetDeleted();
    }, []);

    const fetchPlanetet = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/planetet');
            const data = await res.json();
            setPlanetet(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchSatelitet = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/satelitet');
            const data = await res.json();
            setSatelitet(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchSatelitetDeleted = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/satelitet/deleted');
            const data = await res.json();
            setSatelitetDeleted(data);
        } catch (err) {
            console.error(err);
        }
    };

    const createPlanet = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/api/planetet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(planetForm)
            });
            setPlanetForm({ Name: '', Type: '' });
            fetchPlanetet();
        } catch (err) {
            console.error(err);
        }
    };

    const updatePlanet = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/api/planetet/${editingPlanet.PlanetID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingPlanet)
            });
            setEditingPlanet(null);
            fetchPlanetet();
        } catch (err) {
            console.error(err);
        }
    };

    const deletePlanet = async (id) => {
        if (window.confirm('Are you sure you want to delete this planet?')) {
            try {
                await fetch(`http://localhost:5000/api/planetet/${id}`, {
                    method: 'DELETE'
                });
                fetchPlanetet();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const createSatelit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/api/satelitet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(satelitForm)
            });
            setSatelitForm({ Name: '', PlanetID: '' });
            fetchSatelitet();
            fetchSatelitetDeleted();
        } catch (err) {
            console.error(err);
        }
    };

    const updateSatelit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/api/satelitet/${editingSatelit.SatelliteID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingSatelit)
            });
            setEditingSatelit(null);
            fetchSatelitet();
            fetchSatelitetDeleted();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteSatelit = async (id) => {
        if (window.confirm('Are you sure you want to delete this satellite?')) {
            try {
                await fetch(`http://localhost:5000/api/satelitet/${id}`, {
                    method: 'DELETE'
                });
                fetchSatelitet();
                fetchSatelitetDeleted();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <h1>Planet & Satellite Management</h1>

            {/* CREATE PLANET */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>Create Planet</h2>
                <form onSubmit={createPlanet}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={planetForm.Name}
                        onChange={(e) => setPlanetForm({ ...planetForm, Name: e.target.value })}
                        required
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    />
                    <input
                        type="text"
                        placeholder="Type"
                        value={planetForm.Type}
                        onChange={(e) => setPlanetForm({ ...planetForm, Type: e.target.value })}
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    />
                    <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Add Planet</button>
                </form>
            </div>

            {/* VIEW ALL PLANETS */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>All Planets</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Type</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planetet.map(p => (
                            <tr key={p.PlanetID}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{p.PlanetID}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{p.Name}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{p.Type}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    <button 
                                        onClick={() => setEditingPlanet(p)}
                                        style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deletePlanet(p.PlanetID)}
                                        style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* EDIT PLANET */}
            {editingPlanet && (
                <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #007bff', borderRadius: '5px', backgroundColor: '#f0f8ff' }}>
                    <h2>Edit Planet</h2>
                    <form onSubmit={updatePlanet}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={editingPlanet.Name}
                            onChange={(e) => setEditingPlanet({ ...editingPlanet, Name: e.target.value })}
                            required
                            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                        />
                        <input
                            type="text"
                            placeholder="Type"
                            value={editingPlanet.Type}
                            onChange={(e) => setEditingPlanet({ ...editingPlanet, Type: e.target.value })}
                            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                        />
                        <button type="submit" style={{ padding: '8px 20px', marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Save</button>
                        <button 
                            type="button" 
                            onClick={() => setEditingPlanet(null)}
                            style={{ padding: '8px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {/* CREATE SATELLITE */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>Create Satellite</h2>
                <form onSubmit={createSatelit}>
                    <input
                        type="text"
                        placeholder="Satellite Name"
                        value={satelitForm.Name}
                        onChange={(e) => setSatelitForm({ ...satelitForm, Name: e.target.value })}
                        required
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    />
                    <select
                        value={satelitForm.PlanetID}
                        onChange={(e) => setSatelitForm({ ...satelitForm, PlanetID: e.target.value })}
                        required
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    >
                        <option value="">Select Planet</option>
                        {planetet.map(p => (
                            <option key={p.PlanetID} value={p.PlanetID}>
                                {p.Name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Add Satellite</button>
                </form>
            </div>

            {/* VIEW ALL SATELLITES */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>All Satellites</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Planet</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {satelitet.map(s => (
                            <tr key={s.SatelliteID}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{s.SatelliteID}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{s.Name}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {s.planeti?.Name || 'N/A'}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    <button 
                                        onClick={() => setEditingSatelit(s)}
                                        style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteSatelit(s.SatelliteID)}
                                        style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* EDIT SATELLITE */}
            {editingSatelit && (
                <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #007bff', borderRadius: '5px', backgroundColor: '#f0f8ff' }}>
                    <h2>Edit Satellite</h2>
                    <form onSubmit={updateSatelit}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={editingSatelit.Name}
                            onChange={(e) => setEditingSatelit({ ...editingSatelit, Name: e.target.value })}
                            required
                            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                        />
                        <select
                            value={editingSatelit.PlanetID}
                            onChange={(e) => setEditingSatelit({ ...editingSatelit, PlanetID: e.target.value })}
                            required
                            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                        >
                            <option value="">Select Planet</option>
                            {planetet.map(p => (
                                <option key={p.PlanetID} value={p.PlanetID}>
                                    {p.Name}
                                </option>
                            ))}
                        </select>
                        <button type="submit" style={{ padding: '8px 20px', marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Save</button>
                        <button 
                            type="button" 
                            onClick={() => setEditingSatelit(null)}
                            style={{ padding: '8px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {/* VIEW DELETED SATELLITES (special requirement) */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ffc107', borderRadius: '5px', backgroundColor: '#fffbf0' }}>
                <h2>Deleted Satellites Only (IsDeleted = true)</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#ffe69c' }}>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Planet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {satelitetDeleted.map(s => (
                            <tr key={s.SatelliteID}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{s.SatelliteID}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{s.Name}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {s.planeti?.Name || 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PlanetSatellite;
