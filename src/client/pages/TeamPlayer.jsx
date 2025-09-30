import { useState, useEffect } from 'react';

function TeamPlayer() {
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [teamForm, setTeamForm] = useState({ Name: '' });
    const [playerForm, setPlayerForm] = useState({ Name: '', Number: '', BirthYear: '', TeamId: '' });
    const [editingTeam, setEditingTeam] = useState(null);
    const [editingPlayer, setEditingPlayer] = useState(null);

    useEffect(() => {
        fetchTeams();
        fetchPlayers();
    }, []);

    const fetchTeams = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/teams');
            const data = await res.json();
            setTeams(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchPlayers = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/players');
            const data = await res.json();
            setPlayers(data);
        } catch (err) {
            console.error(err);
        }
    };

    const createTeam = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/api/teams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teamForm)
            });
            setTeamForm({ Name: '' });
            fetchTeams();
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

    const createPlayer = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/api/players', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...playerForm,
                    Number: parseInt(playerForm.Number),
                    BirthYear: parseInt(playerForm.BirthYear)
                })
            });
            setPlayerForm({ Name: '', Number: '', BirthYear: '', TeamId: '' });
            fetchPlayers();
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

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <h1>Team & Player Management</h1>

            {/* CREATE TEAM */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>Create Team</h2>
                <form onSubmit={createTeam}>
                    <input
                        type="text"
                        placeholder="Team Name"
                        value={teamForm.Name}
                        onChange={(e) => setTeamForm({ ...teamForm, Name: e.target.value })}
                        required
                        style={{ padding: '8px', marginRight: '10px', width: '300px' }}
                    />
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
