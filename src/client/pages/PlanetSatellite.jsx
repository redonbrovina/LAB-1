import { useState, useEffect } from 'react';

/**
 * ===========================================
 * PLANET & SATELLITE MANAGEMENT PAGE
 * ===========================================
 * 
 * KY ËSHTË FRONTEND PAGE për menaxhimin e Planet & Satellite
 * 
 * STRUKTURA:
 * - Planet (Parent) - ka shumë Satellite (Children)
 * - Soft Delete për Satellite (IsDeleted = true/false)
 * - Full CRUD për të dy entitetet
 */

function PlanetSatellite() {
    // ===========================================
    // 1. STATE MANAGEMENT (useState)
    // ===========================================
    
    // STATE për të ruajtur të dhënat nga API
    const [planetet, setPlanetet] = useState([]);           // Lista e të gjithë planetëve
    const [satelitet, setSatelitet] = useState([]);         // Lista e të gjithë satelitëve (jo të fshirë)
    const [satelitetDeleted, setSatelitetDeleted] = useState([]); // Lista e satelitëve të fshirë (IsDeleted = true)
    
    // STATE për formularët e krijimit
    const [planetForm, setPlanetForm] = useState({ Name: '', Type: '' });     // Form për të shtuar planet të ri
    const [satelitForm, setSatelitForm] = useState({ Name: '', PlanetID: '' }); // Form për të shtuar satelit të ri
    
    // STATE për editim (kur klikon "Edit" button)
    const [editingPlanet, setEditingPlanet] = useState(null);   // Planet që po editohet (null = nuk po editohet)
    const [editingSatelit, setEditingSatelit] = useState(null); // Satelit që po editohet (null = nuk po editohet)

    // ===========================================
    // 2. useEffect - LOAD DATA KUR HAPET FAQJA
    // ===========================================
    
    useEffect(() => {
        // Kur hapet faqja, merr të gjitha të dhënat
        fetchPlanetet();        // Merr planetët
        fetchSatelitet();       // Merr satelitët (jo të fshirë)
        fetchSatelitetDeleted(); // Merr satelitët e fshirë
    }, []); // [] = ekzekutohet vetëm një herë kur hapet faqja

    // ===========================================
    // 3. API FUNCTIONS - KOMUNIKIMI ME BACKEND
    // ===========================================

    /**
     * FETCH PLANETËT - Merr të gjithë planetët nga API
     * KY ËSHTË PËR: Kur kërkon "shfaq të gjithë planetët"
     */
    const fetchPlanetet = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/planetet'); // GET request
            const data = await res.json(); // Konverto response në JSON
            setPlanetet(data); // Ruaj në state
        } catch (err) {
            console.error(err); // Nëse ka gabim, shkruaj në console
        }
    };

    /**
     * FETCH SATELITËT - Merr satelitët që NUK janë të fshirë
     * KY ËSHTË PËR: Tabela normale e satelitëve
     */
    const fetchSatelitet = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/satelitet'); // GET request
            const data = await res.json();
            setSatelitet(data);
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * FETCH SATELITËT E FSHIRË - Merr vetëm ato me IsDeleted = true
     * KY ËSHTË PËR: Seksioni i veçantë "Deleted Satellites Only"
     */
    const fetchSatelitetDeleted = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/satelitet/deleted'); // Special endpoint
            const data = await res.json();
            setSatelitetDeleted(data);
        } catch (err) {
            console.error(err);
        }
    };

    // ===========================================
    // 4. CRUD OPERATIONS - CREATE, READ, UPDATE, DELETE
    // ===========================================

    /**
     * CREATE PLANET - Shto planet të ri
     * KY ËSHTË PËR: Kur kërkon "realizoni kodin për të insertuar planet"
     */
    const createPlanet = async (e) => {
        e.preventDefault(); // Ndalon refresh të faqes kur submit form
        try {
            // POST request për të krijuar planet të ri
            await fetch('http://localhost:5000/api/planetet', {
                method: 'POST', // HTTP method
                headers: { 'Content-Type': 'application/json' }, // Header për JSON
                body: JSON.stringify(planetForm) // Të dhënat si JSON string
            });
            
            // Pas suksesit:
            setPlanetForm({ Name: '', Type: '' }); // Pastro formin
            fetchPlanetet(); // Merr të dhënat e reja nga server
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * UPDATE PLANET - Përditëso planet ekzistues
     * KY ËSHTË PËR: Kur kërkon "përditëso planetin"
     */
    const updatePlanet = async (e) => {
        e.preventDefault();
        try {
            // PUT request për të përditësuar planet
            await fetch(`http://localhost:5000/api/planetet/${editingPlanet.PlanetID}`, {
                method: 'PUT', // HTTP method për update
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingPlanet) // Të dhënat e reja
            });
            
            // Pas suksesit:
            setEditingPlanet(null); // Mbyll edit formin
            fetchPlanetet(); // Merr të dhënat e përditësuara
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * DELETE PLANET - Fshi planet
     * KY ËSHTË PËR: Kur kërkon "fshi planetin"
     */
    const deletePlanet = async (id) => {
        // Konfirmim para fshirjes
        if (window.confirm('Are you sure you want to delete this planet?')) {
            try {
                // DELETE request
                await fetch(`http://localhost:5000/api/planetet/${id}`, {
                    method: 'DELETE'
                });
                fetchPlanetet(); // Merr listën e përditësuar
            } catch (err) {
                console.error(err);
            }
        }
    };

    /**
     * CREATE SATELLITE - Shto satelit të ri
     * KY ËSHTË PËR: Kur kërkon "realizoni kodin për të insertuar satelit"
     * VINI RE: Duhet dropdown për zgjedhjen e Planet (si kërkohet në detyrë)
     */
    const createSatelit = async (e) => {
        e.preventDefault();
        try {
            // POST request për të krijuar satelit të ri
            await fetch('http://localhost:5000/api/satelitet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(satelitForm)
            });
            
            // Pas suksesit:
            setSatelitForm({ Name: '', PlanetID: '' }); // Pastro formin
            fetchSatelitet(); // Merr satelitët e rinj
            fetchSatelitetDeleted(); // Merr edhe të fshirët (nëse ka ndryshime)
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * UPDATE SATELLITE - Përditëso satelit ekzistues
     * KY ËSHTË PËR: Kur kërkon "përditëso satelitin"
     */
    const updateSatelit = async (e) => {
        e.preventDefault();
        try {
            // PUT request për të përditësuar satelit
            await fetch(`http://localhost:5000/api/satelitet/${editingSatelit.SatelliteID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingSatelit)
            });
            
            // Pas suksesit:
            setEditingSatelit(null); // Mbyll edit formin
            fetchSatelitet(); // Merr satelitët e përditësuar
            fetchSatelitetDeleted(); // Merr edhe të fshirët
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * DELETE SATELLITE - Fshi satelit (SOFT DELETE)
     * KY ËSHTË PËR: Kur kërkon "fshi satelitin"
     * VINI RE: Kjo është SOFT DELETE - vetëm e markon IsDeleted = true
     */
    const deleteSatelit = async (id) => {
        if (window.confirm('Are you sure you want to delete this satellite?')) {
            try {
                // DELETE request (por në backend është soft delete)
                await fetch(`http://localhost:5000/api/satelitet/${id}`, {
                    method: 'DELETE'
                });
                
                // Merr të dhënat e përditësuara
                fetchSatelitet(); // Merr satelitët aktivë
                fetchSatelitetDeleted(); // Merr satelitët e fshirë
            } catch (err) {
                console.error(err);
            }
        }
    };

    // ===========================================
    // 5. RENDER - SHFAQJA E FAQES
    // ===========================================

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <h1>Planet & Satellite Management</h1>

            {/* ===========================================
                SEKSIONI 1: CREATE PLANET
                ===========================================
                KY ËSHTË PËR: "Realizoni kodin për të insertuar planet"
                - Form për të shtuar planet të ri
                - Fushat: Name, Type (sipas detyrës)
            */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>Create Planet</h2>
                <form onSubmit={createPlanet}>
                    {/* INPUT për emrin e planetit */}
                    <input
                        type="text"
                        placeholder="Name"
                        value={planetForm.Name} // Vlera nga state
                        onChange={(e) => setPlanetForm({ ...planetForm, Name: e.target.value })} // Update state kur shkruan
                        required // E detyrueshme
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    />
                    
                    {/* INPUT për tipin e planetit */}
                    <input
                        type="text"
                        placeholder="Type"
                        value={planetForm.Type}
                        onChange={(e) => setPlanetForm({ ...planetForm, Type: e.target.value })}
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    />
                    
                    {/* BUTTON për të submituar formin */}
                    <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Add Planet</button>
                </form>
            </div>

            {/* ===========================================
                SEKSIONI 2: VIEW ALL PLANETS (READ)
                ===========================================
                KY ËSHTË PËR: "Shfaq të gjithë planetët"
                - Tabela që tregon të gjithë planetët
                - Butona Edit dhe Delete për çdo planet
            */}
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
                        {/* MAP për të shfaqur çdo planet në tabelë */}
                        {planetet.map(p => (
                            <tr key={p.PlanetID}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{p.PlanetID}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{p.Name}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{p.Type}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {/* EDIT BUTTON - Hap formin e editimit */}
                                    <button 
                                        onClick={() => setEditingPlanet(p)} // Vendos planetin që po editohet
                                        style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                    
                                    {/* DELETE BUTTON - Fshi planetin */}
                                    <button 
                                        onClick={() => deletePlanet(p.PlanetID)} // Thirr funksionin e fshirjes
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

            {/* ===========================================
                SEKSIONI 3: EDIT PLANET (UPDATE)
                ===========================================
                KY ËSHTË PËR: "Përditëso planetin"
                - Shfaqet vetëm kur editingPlanet nuk është null
                - Form për të përditësuar planetin e zgjedhur
            */}
            {editingPlanet && (
                <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #007bff', borderRadius: '5px', backgroundColor: '#f0f8ff' }}>
                    <h2>Edit Planet</h2>
                    <form onSubmit={updatePlanet}>
                        {/* INPUT për emrin e planetit (me vlerën aktuale) */}
                        <input
                            type="text"
                            placeholder="Name"
                            value={editingPlanet.Name} // Vlera aktuale e planetit
                            onChange={(e) => setEditingPlanet({ ...editingPlanet, Name: e.target.value })} // Update vetëm Name
                            required
                            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                        />
                        
                        {/* INPUT për tipin e planetit (me vlerën aktuale) */}
                        <input
                            type="text"
                            placeholder="Type"
                            value={editingPlanet.Type} // Vlera aktuale e planetit
                            onChange={(e) => setEditingPlanet({ ...editingPlanet, Type: e.target.value })} // Update vetëm Type
                            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                        />
                        
                        {/* SAVE BUTTON - Ruaj ndryshimet */}
                        <button type="submit" style={{ padding: '8px 20px', marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Save</button>
                        
                        {/* CANCEL BUTTON - Anulo editimin */}
                        <button 
                            type="button" 
                            onClick={() => setEditingPlanet(null)} // Mbyll edit formin
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
