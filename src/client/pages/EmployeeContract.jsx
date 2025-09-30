import { useState, useEffect } from 'react';

/**
 * ===========================================
 * EMPLOYEE & CONTRACT MANAGEMENT PAGE
 * ===========================================
 * 
 * KY ËSHTË FRONTEND PAGE për menaxhimin e Employee & Contract
 * 
 * STRUKTURA:
 * - Employee (Parent) - ka shumë Contract (Children)
 * - Hard Delete me CASCADE (kur fshijmë Employee, fshihen edhe Contracts)
 * - Full CRUD për të dy entitetet
 * - Dropdown për zgjedhjen e Employee kur krijohet Contract
 */

function EmployeeContract() {
    // ===========================================
    // 1. STATE MANAGEMENT (useState)
    // ===========================================
    
    // STATE për të ruajtur të dhënat nga API
    const [employees, setEmployees] = useState([]);           // Lista e të gjithë punonjësve
    const [contracts, setContracts] = useState([]);           // Lista e të gjithë kontratave
    
    // STATE për formularët e krijimit
    const [employeeForm, setEmployeeForm] = useState({ Name: '', Surname: '' });     // Form për të shtuar employee të ri
    const [contractForm, setContractForm] = useState({ Title: '', Description: '', Employee: '' }); // Form për të shtuar contract të ri
    
    // STATE për editim (kur klikon "Edit" button)
    const [editingEmployee, setEditingEmployee] = useState(null);   // Employee që po editohet
    const [editingContract, setEditingContract] = useState(null);   // Contract që po editohet

    // ===========================================
    // 2. useEffect - LOAD DATA KUR HAPET FAQJA
    // ===========================================
    
    useEffect(() => {
        // Kur hapet faqja, merr të gjitha të dhënat
        fetchEmployees();        // Merr punonjësit
        fetchContracts();        // Merr kontratat
    }, []); // [] = ekzekutohet vetëm një herë kur hapet faqja

    // ===========================================
    // 3. API FUNCTIONS - KOMUNIKIMI ME BACKEND
    // ===========================================

    /**
     * FETCH EMPLOYEES - Merr të gjithë punonjësit nga API
     * KY ËSHTË PËR: Kur kërkon "shfaq të gjithë punonjësit"
     */
    const fetchEmployees = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/employees'); // GET request
            const data = await res.json(); // Konverto response në JSON
            setEmployees(data); // Ruaj në state
        } catch (err) {
            console.error(err); // Nëse ka gabim, shkruaj në console
        }
    };

    /**
     * FETCH CONTRACTS - Merr të gjitha kontratat nga API
     * KY ËSHTË PËR: Kur kërkon "shfaq të gjitha kontratat"
     */
    const fetchContracts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/contracts'); // GET request
            const data = await res.json();
            setContracts(data);
        } catch (err) {
            console.error(err);
        }
    };

    // ===========================================
    // 4. CRUD OPERATIONS - CREATE, READ, UPDATE, DELETE
    // ===========================================

    /**
     * CREATE EMPLOYEE - Shto punonjës të ri
     * KY ËSHTË PËR: Kur kërkon "realizoni kodin për të insertuar employee"
     */
    const createEmployee = async (e) => {
        e.preventDefault(); // Ndalon refresh të faqes kur submit form
        try {
            // POST request për të krijuar employee të ri
            await fetch('http://localhost:5000/api/employees', {
                method: 'POST', // HTTP method
                headers: { 'Content-Type': 'application/json' }, // Header për JSON
                body: JSON.stringify(employeeForm) // Të dhënat si JSON string
            });
            
            // Pas suksesit:
            setEmployeeForm({ Name: '', Surname: '' }); // Pastro formin
            fetchEmployees(); // Merr të dhënat e reja nga server
        } catch (err) {
            console.error(err);
        }
    };

    const updateEmployee = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/api/employees/${editingEmployee.ID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingEmployee)
            });
            setEditingEmployee(null);
            fetchEmployees();
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * DELETE EMPLOYEE - Fshi punonjës (CASCADE DELETE)
     * KY ËSHTË PËR: Kur kërkon "fshi punonjësin"
     * VINI RE: CASCADE - kur fshijmë Employee, fshihen edhe të gjitha Contracts e tij
     */
    const deleteEmployee = async (id) => {
        // Konfirmim para fshirjes (me paralajmërim për CASCADE)
        if (window.confirm('Are you sure you want to delete this employee? This will also delete all their contracts.')) {
            try {
                // DELETE request (CASCADE në backend)
                await fetch(`http://localhost:5000/api/employees/${id}`, {
                    method: 'DELETE'
                });
                
                // Merr të dhënat e përditësuara
                fetchEmployees(); // Merr punonjësit
                fetchContracts(); // Merr kontratat (pasi mund të jenë fshirë disa)
            } catch (err) {
                console.error(err);
            }
        }
    };

    /**
     * CREATE CONTRACT - Shto kontratë të re
     * KY ËSHTË PËR: Kur kërkon "realizoni kodin për të insertuar contract"
     * VINI RE: Duhet dropdown për zgjedhjen e Employee (si kërkohet në detyrë)
     * VINI RE: Employee duhet konvertuar në INTEGER
     */
    const createContract = async (e) => {
        e.preventDefault();
        try {
            // POST request për të krijuar contract të ri
            await fetch('http://localhost:5000/api/contracts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...contractForm,
                    Employee: parseInt(contractForm.Employee) // Konverto në integer
                })
            });
            
            // Pas suksesit:
            setContractForm({ Title: '', Description: '', Employee: '' }); // Pastro formin
            fetchContracts(); // Merr kontratat e reja
        } catch (err) {
            console.error(err);
        }
    };

    const updateContract = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/api/contracts/${editingContract.ID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...editingContract,
                    Employee: parseInt(editingContract.Employee)
                })
            });
            setEditingContract(null);
            fetchContracts();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteContract = async (id) => {
        if (window.confirm('Are you sure you want to delete this contract?')) {
            try {
                await fetch(`http://localhost:5000/api/contracts/${id}`, {
                    method: 'DELETE'
                });
                fetchContracts();
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
            <h1>Employee & Contract Management</h1>

            {/* ===========================================
                SEKSIONI 1: CREATE EMPLOYEE
                ===========================================
                KY ËSHTË PËR: "Realizoni kodin për të insertuar employee"
                - Form për të shtuar punonjës të ri
                - Fushat: Name, Surname (sipas detyrës)
            */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>Create Employee</h2>
                <form onSubmit={createEmployee}>
                    {/* INPUT për emrin e punonjësit */}
                    <input
                        type="text"
                        placeholder="Name"
                        value={employeeForm.Name} // Vlera nga state
                        onChange={(e) => setEmployeeForm({ ...employeeForm, Name: e.target.value })} // Update state kur shkruan
                        required // E detyrueshme
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    />
                    
                    {/* INPUT për mbiemrin e punonjësit */}
                    <input
                        type="text"
                        placeholder="Surname"
                        value={employeeForm.Surname}
                        onChange={(e) => setEmployeeForm({ ...employeeForm, Surname: e.target.value })}
                        required // E detyrueshme
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    />
                    
                    {/* BUTTON për të submituar formin */}
                    <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Add Employee</button>
                </form>
            </div>

            {/* VIEW ALL EMPLOYEES */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>All Employees</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Surname</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(e => (
                            <tr key={e.ID}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.ID}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.Name}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.Surname}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    <button 
                                        onClick={() => setEditingEmployee(e)}
                                        style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteEmployee(e.ID)}
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

            {/* EDIT EMPLOYEE */}
            {editingEmployee && (
                <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #007bff', borderRadius: '5px', backgroundColor: '#f0f8ff' }}>
                    <h2>Edit Employee</h2>
                    <form onSubmit={updateEmployee}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={editingEmployee.Name}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, Name: e.target.value })}
                            required
                            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                        />
                        <input
                            type="text"
                            placeholder="Surname"
                            value={editingEmployee.Surname}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, Surname: e.target.value })}
                            required
                            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                        />
                        <button type="submit" style={{ padding: '8px 20px', marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Save</button>
                        <button 
                            type="button" 
                            onClick={() => setEditingEmployee(null)}
                            style={{ padding: '8px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {/* CREATE CONTRACT */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>Create Contract</h2>
                <form onSubmit={createContract}>
                    <select
                        value={contractForm.Employee}
                        onChange={(e) => setContractForm({ ...contractForm, Employee: e.target.value })}
                        required
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    >
                        <option value="">Select Employee</option>
                        {employees.map(e => (
                            <option key={e.ID} value={e.ID}>
                                {e.Name} {e.Surname}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Title"
                        value={contractForm.Title}
                        onChange={(e) => setContractForm({ ...contractForm, Title: e.target.value })}
                        required
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={contractForm.Description}
                        onChange={(e) => setContractForm({ ...contractForm, Description: e.target.value })}
                        style={{ padding: '8px', marginRight: '10px', width: '300px' }}
                    />
                    <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Add Contract</button>
                </form>
            </div>

            {/* VIEW ALL CONTRACTS */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>All Contracts</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Employee</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Description</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map(c => (
                            <tr key={c.ID}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{c.ID}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {c.employee ? `${c.employee.Name} ${c.employee.Surname}` : 'N/A'}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{c.Title}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{c.Description}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    <button 
                                        onClick={() => setEditingContract(c)}
                                        style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteContract(c.ID)}
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

            {/* EDIT CONTRACT */}
            {editingContract && (
                <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #007bff', borderRadius: '5px', backgroundColor: '#f0f8ff' }}>
                    <h2>Edit Contract</h2>
                    <form onSubmit={updateContract}>
                        <select
                            value={editingContract.Employee}
                            onChange={(e) => setEditingContract({ ...editingContract, Employee: e.target.value })}
                            required
                            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                        >
                            <option value="">Select Employee</option>
                            {employees.map(e => (
                                <option key={e.ID} value={e.ID}>
                                    {e.Name} {e.Surname}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Title"
                            value={editingContract.Title}
                            onChange={(e) => setEditingContract({ ...editingContract, Title: e.target.value })}
                            required
                            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={editingContract.Description}
                            onChange={(e) => setEditingContract({ ...editingContract, Description: e.target.value })}
                            style={{ padding: '8px', marginRight: '10px', width: '300px' }}
                        />
                        <button type="submit" style={{ padding: '8px 20px', marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Save</button>
                        <button 
                            type="button" 
                            onClick={() => setEditingContract(null)}
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

export default EmployeeContract;
