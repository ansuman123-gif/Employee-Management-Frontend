import React, { useEffect, useState } from 'react'
import { listDepartments, deleteDepartment } from '../services/DepartmentService'
import { useNavigate } from 'react-router-dom'

const ListDepartmentComponent = () => {

    const [departments, setDepartments] = useState([])
    const navigator = useNavigate()

    useEffect(() => {
        getAllDepartments()
    }, [])

    const getAllDepartments = () => {
        listDepartments()
            .then(response => {
                setDepartments(response.data)
            })
            .catch(error => {
                console.error('Error fetching departments:', error)
            })
    }

    const addNewDepartment = () => {
        navigator('/add-department')
    }

    const updateDepartment = (id) => {
        navigator(`/edit-department/${id}`)
    }

    const removeDepartment = (id) => {
        deleteDepartment(id)
            .then(() => {
                getAllDepartments()
            })
            .catch(error => {
                console.error('Error deleting department:', error)
            })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Departments</h2>
            <button
                className='btn btn-primary mb-2'
                onClick={addNewDepartment}
            >
                Add Department
            </button>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Department Name</th>
                        <th>Department Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.map(department =>
                            <tr key={department.id}>
                                <td>{department.id}</td>
                                <td>{department.departmentName}</td>
                                <td>{department.departmentDescription}</td>
                                <td>
                                    <button
                                        className='btn btn-info'
                                        onClick={() => updateDepartment(department.id)}
                                    >
                                        Update
                                    </button>
                                    &nbsp;
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => removeDepartment(department.id)}
                                    >
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

export default ListDepartmentComponent