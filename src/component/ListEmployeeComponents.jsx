import React, { useEffect, useState } from 'react'
import { listEmployees, deleteEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponents = () => {

    const [employees, setEmployees] = useState([])
    const navigator = useNavigate()

    useEffect(() => {
        getAllEmployees()
    }, [])

    const getAllEmployees = () => {
        listEmployees()
            .then(response => {
                setEmployees(response.data)
            })
            .catch(error => {
                console.error('Error fetching employees:', error)
            })
    }

    const addNewEmployee = () => {
        navigator('/add-employee')
    }

    const updateEmployee = (id) => {
        navigator(`/edit-employee/${id}`)
    }

    const removeEmployee = (id) => {
        deleteEmployee(id)
            .then(() => getAllEmployees())
            .catch(error => console.error('Error deleting employee:', error))
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>
                Add Employee
            </button>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.departmentId}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>
                                        Update
                                    </button>
                                    &nbsp;
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponents