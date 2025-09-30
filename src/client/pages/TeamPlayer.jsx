import { useState, useEffect } from 'react';

/**
 * ===========================================
 * TEAM & PLAYER MANAGEMENT PAGE
 * ===========================================
 * 
 * KY ËSHTË FRONTEND PAGE për menaxhimin e Team & Player
 * 
 * STRUKTURA:
 * - Team (Parent) - ka shumë Player (Children)
 * - Hard Delete (fshi përfundimisht nga databaza)
 * - Full CRUD për të dy entitetet
 * - Sample data: FC Barcelona, PSG me lojtarët e tyre
 */

function TeamPlayer() {
    // ===========================================
    // 1. STATE MANAGEMENT (useState)
    // ===========================================
    
    // STATE për të ruajtur të dhënat nga API
    const [teams, setTeams] = useState([]);           // Lista e të gjithë ekipeve
    const [players, setPlayers] = useState([]);       // Lista e të gjithë lojtarëve
    
    // STATE për formularët e krijimit
    const [teamForm, setTeamForm] = useState({ Name: '' });     // Form për të shtuar team të ri
    const [playerForm, setPlayerForm] = useState({ Name: '', Number: '', BirthYear: '', TeamId: '' }); // Form për të shtuar player të ri
    
    // STATE për editim (kur klikon "Edit" button)
    const [editingTeam, setEditingTeam] = useState(null);   // Team që po editohet
    const [editingPlayer, setEditingPlayer] = useState(null); // Player që po editohet

    // ===========================================
    // 2. useEffect - LOAD DATA KUR HAPET FAQJA
    // ===========================================
    
    useEffect(() => {
        // Kur hapet faqja, merr të gjitha të dhënat
        fetchTeams();        // Merr ekipet
        fetchPlayers();      // Merr lojtarët
    }, []); // [] = ekzekutohet vetëm një herë kur hapet faqja

    // ===========================================
    // 3. API FUNCTIONS - KOMUNIKIMI ME BACKEND
    // ===========================================

    /**
     * FETCH TEAMS - Merr të gjithë ekipet nga API
     * KY ËSHTË PËR: Kur kërkon "shfaq të gjithë ekipet"
     */
    const fetchTeams = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/teams'); // GET request
            const data = await res.json(); // Konverto response në JSON
            setTeams(data); // Ruaj në state
        } catch (err) {
            console.error(err); // Nëse ka gabim, shkruaj në console
        }
    };

    /**
     * FETCH PLAYERS - Merr të gjithë lojtarët nga API
     * KY ËSHTË PËR: Kur kërkon "shfaq të gjithë lojtarët"
     */
    const fetchPlayers = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/players'); // GET request
            const data = await res.json();
            setPlayers(data);
        } catch (err) {
            console.error(err);
        }
    };

    // ===========================================
    // 4. CRUD OPERATIONS - CREATE, READ, UPDATE, DELETE
    // ===========================================

    /**
     * CREATE TEAM - Shto team të ri
     * KY ËSHTË PËR: Kur kërkon "realizoni kodin për të insertuar team"
     */
    const createTeam = async (e) => {
        e.preventDefault(); // Ndalon refresh të faqes kur submit form
        try {
            // POST request për të krijuar team të ri
            await fetch('http://localhost:5000/api/teams', {
                method: 'POST', // HTTP method
                headers: { 'Content-Type': 'application/json' }, // Header për JSON
                body: JSON.stringify(teamForm) // Të dhënat si JSON string
            });
            
            // Pas suksesit:
            setTeamForm({ Name: '' }); // Pastro formin
            fetchTeams(); // Merr të dhënat e reja nga server
        } catch (err) {
            console.error(err);
        }
    };

    const updateTeam = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/api/teams/${editingTeam.TeamId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingTeam)
            });
            setEditingTeam(null);
            fetchTeams();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTeam = async (id) => {
        if (window.confirm('Are you sure you want to delete this team?')) {
            try {
                await fetch(`http://localhost:5000/api/teams/${id}`, {
                    method: 'DELETE'
                });
                fetchTeams();
            } catch (err) {
                console.error(err);
            }
        }
    };

    /**
     * CREATE PLAYER - Shto player të ri
     * KY ËSHTË PËR: Kur kërkon "realizoni kodin për të insertuar player"
     * VINI RE: Duhet dropdown për zgjedhjen e Team (si kërkohet në detyrë)
     * VINI RE: Number dhe BirthYear duhen konvertuar në INTEGER
     */
    const createPlayer = async (e) => {
        e.preventDefault();
        try {
            // POST request për të krijuar player të ri
            await fetch('http://localhost:5000/api/players', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...playerForm,
                    Number: parseInt(playerForm.Number),     // Konverto në integer
                    BirthYear: parseInt(playerForm.BirthYear) // Konverto në integer
                })
            });
            
            // Pas suksesit:
            setPlayerForm({ Name: '', Number: '', BirthYear: '', TeamId: '' }); // Pastro formin
            fetchPlayers(); // Merr lojtarët e rinj
        } catch (err) {
            console.error(err);
        }
    };

    const updatePlayer = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/api/players/${editingPlayer.PlayerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...editingPlayer,
                    Number: parseInt(editingPlayer.Number),
                    BirthYear: parseInt(editingPlayer.BirthYear)
                })
            });
            setEditingPlayer(null);
            fetchPlayers();
        } catch (err) {
            console.error(err);
        }
    };

    const deletePlayer = async (id) => {
        if (window.confirm('Are you sure you want to delete this player?')) {
            try {
                await fetch(`http://localhost:5000/api/players/${id}`, {
                    method: 'DELETE'
                });
                fetchPlayers();
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
            <h1>Team & Player Management</h1>

            {/* ===========================================
                SEKSIONI 1: CREATE TEAM
                ===========================================
                KY ËSHTË PËR: "Realizoni kodin për të insertuar team"
                - Form për të shtuar team të ri
                - Fushat: Name (sipas detyrës)
                - Sample: FC Barcelona, Paris Saint-Germain
            */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>Create Team</h2>
                <form onSubmit={createTeam}>
                    {/* INPUT për emrin e ekipit */}
                    <input
                        type="text"
                        placeholder="Team Name"
                        value={teamForm.Name} // Vlera nga state
                        onChange={(e) => setTeamForm({ ...teamForm, Name: e.target.value })} // Update state kur shkruan
                        required // E detyrueshme
                        style={{ padding: '8px', marginRight: '10px', width: '300px' }}
                    />
                    
                    {/* BUTTON për të submituar formin */}
                    <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Add Team</button>
                </form>
            </div>

            {/* VIEW ALL TEAMS */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>All Teams</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map(t => (
                            <tr key={t.TeamId}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{t.TeamId}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{t.Name}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    <button 
                                        onClick={() => setEditingTeam(t)}
                                        style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteTeam(t.TeamId)}
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

            {/* EDIT TEAM */}
            {editingTeam && (
                <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #007bff', borderRadius: '5px', backgroundColor: '#f0f8ff' }}>
                    <h2>Edit Team</h2>
                    <form onSubmit={updateTeam}>
                        <input
                            type="text"
                            placeholder="Team Name"
                            value={editingTeam.Name}
                            onChange={(e) => setEditingTeam({ ...editingTeam, Name: e.target.value })}
                            required
                            style={{ padding: '8px', marginRight: '10px', width: '300px' }}
                        />
                        <button type="submit" style={{ padding: '8px 20px', marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Save</button>
                        <button 
                            type="button" 
                            onClick={() => setEditingTeam(null)}
                            style={{ padding: '8px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {/* CREATE PLAYER */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>Create Player</h2>
                <form onSubmit={createPlayer}>
                    <input
                        type="text"
                        placeholder="Player Name"
                        value={playerForm.Name}
                        onChange={(e) => setPlayerForm({ ...playerForm, Name: e.target.value })}
                        required
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    />
                    <input
                        type="number"
                        placeholder="Number"
                        value={playerForm.Number}
                        onChange={(e) => setPlayerForm({ ...playerForm, Number: e.target.value })}
                        required
                        style={{ padding: '8px', marginRight: '10px', width: '100px' }}
                    />
                    <input
                        type="number"
                        placeholder="Birth Year"
                        value={playerForm.BirthYear}
                        onChange={(e) => setPlayerForm({ ...playerForm, BirthYear: e.target.value })}
                        required
                        style={{ padding: '8px', marginRight: '10px', width: '120px' }}
                    />
                    <select
                        value={playerForm.TeamId}
                        onChange={(e) => setPlayerForm({ ...playerForm, TeamId: e.target.value })}
                        required
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    >
                        <option value="">Select Team</option>
                        {teams.map(t => (
                            <option key={t.TeamId} value={t.TeamId}>
                                {t.Name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Add Player</button>
                </form>
            </div>

            {/* VIEW ALL PLAYERS */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>All Players</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Number</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Birth Year</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Team</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(p => (
                            <tr key={p.PlayerId}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{p.PlayerId}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{p.Name}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{p.Number}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{p.BirthYear}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {p.team?.Name || 'N/A'}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    <button 
                                        onClick={() => setEditingPlayer(p)}
                                        style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deletePlayer(p.PlayerId)}
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

            {/* EDIT PLAYER */}
            {editingPlayer && (
                <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #007bff', borderRadius: '5px', backgroundColor: '#f0f8ff' }}>
                    <h2>Edit Player</h2>
                    <form onSubmit={updatePlayer}>
                        <input
                            type="text"
                            placeholder="Player Name"
                            value={editingPlayer.Name}
                            onChange={(e) => setEditingPlayer({ ...editingPlayer, Name: e.target.value })}
                            required
                            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                        />
                        <input
                            type="number"
                            placeholder="Number"
                            value={editingPlayer.Number}
                            onChange={(e) => setEditingPlayer({ ...editingPlayer, Number: e.target.value })}
                            required
                            style={{ padding: '8px', marginRight: '10px', width: '100px' }}
                        />
                        <input
                            type="number"
                            placeholder="Birth Year"
                            value={editingPlayer.BirthYear}
                            onChange={(e) => setEditingPlayer({ ...editingPlayer, BirthYear: e.target.value })}
                            required
                            style={{ padding: '8px', marginRight: '10px', width: '120px' }}
                        />
                        <select
                            value={editingPlayer.TeamId}
                            onChange={(e) => setEditingPlayer({ ...editingPlayer, TeamId: e.target.value })}
                            required
                            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                        >
                            <option value="">Select Team</option>
                            {teams.map(t => (
                                <option key={t.TeamId} value={t.TeamId}>
                                    {t.Name}
                                </option>
                            ))}
                        </select>
                        <button type="submit" style={{ padding: '8px 20px', marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Save</button>
                        <button 
                            type="button" 
                            onClick={() => setEditingPlayer(null)}
                            style={{ padding: '8px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default TeamPlayer;
