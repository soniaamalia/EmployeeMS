import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/auth/employee')
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.Result);
                    setFilteredEmployees(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/auth/deleteEmployee/' + id)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload();
                } else {
                    alert(result.data.Error);
                }
            });
    };

    const handleSearch = () => {
        const filteredEmployees = employee.filter(e => 
            e.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmployees(filteredEmployees);
    };

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h4>Employee List</h4>
            </div>
            <div className='d-flex justify-content-between mb-3 mt-3'>
                <div className='d-flex'>
                    <input
                        type="text"
                        className='form-control w-auto'
                        placeholder='Search by Name'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className='btn btn-primary ms-2' onClick={handleSearch}>Search</button>
                </div>
                <Link to="/dashboard/addEmployee" className='btn btn-success'>Add Employee</Link>
            </div>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Email</th>
                            <th>Salary</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredEmployees.map((e) => (
                                <tr>
                                    <td>{e.name}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:3000/images/` + e.image}
                                            className="employee_image"
                                        />
                                    </td>
                                    <td>{e.category_id}</td>
                                    <td>{e.email}</td>
                                    <td>{e.salary}</td>
                                    <td>{e.address}</td>
                                    <td>
                                        <Link 
                                            to={"/dashboard/editEmployee/"+e.id} 
                                            className='btn btn-warning btn-sm me-2'>
                                            Edit
                                        </Link>
                                        <button 
                                            className='btn btn-danger btn-sm' 
                                            onClick={() => handleDelete(e.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employee;