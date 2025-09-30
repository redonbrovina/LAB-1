import { useState, useEffect } from 'react';

function EmployeeContract() {
    const [employees, setEmployees] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [employeeForm, setEmployeeForm] = useState({ Name: '', Surname: '' });
    const [contractForm, setContractForm] = useState({ Title: '', Description: '', Employee: '' });
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [editingContract, setEditingContract] = useState(null);

    useEffect(() => {
        fetchEmployees();
        fetchContracts();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/employees');
            const data = await res.json();
            setEmployees(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchContracts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/contracts');
            const data = await res.json();
            setContracts(data);
        } catch (err) {
            console.error(err);
        }
    };

    const createEmployee = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeForm)
            });
            setEmployeeForm({ Name: '', Surname: '' });
            fetchEmployees();
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

    const deleteEmployee = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee? This will also delete all their contracts.')) {
            try {
                await fetch(`http://localhost:5000/api/employees/${id}`, {
                    method: 'DELETE'
                });
                fetchEmployees();
                fetchContracts();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const createContract = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/api/contracts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...contractForm,
                    Employee: parseInt(contractForm.Employee)
                })
            });
            setContractForm({ Title: '', Description: '', Employee: '' });
            fetchContracts();
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

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <h1>Employee & Contract Management</h1>

            {/* CREATE EMPLOYEE */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>Create Employee</h2>
                <form onSubmit={createEmployee}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={employeeForm.Name}
                        onChange={(e) => setEmployeeForm({ ...employeeForm, Name: e.target.value })}
                        required
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    />
                    <input
                        type="text"
                        placeholder="Surname"
                        value={employeeForm.Surname}
                        onChange={(e) => setEmployeeForm({ ...employeeForm, Surname: e.target.value })}
                        required
                        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                    />
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
