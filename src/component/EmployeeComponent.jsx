import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService'
import { listDepartments } from '../services/DepartmentService'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [departmentId, setDepartmentId] = useState('')

    const [departments, setDepartments] = useState([])

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        departmentId: ''
    })

    const navigator = useNavigate()
    const { id } = useParams()

    // Load all departments for dropdown
    useEffect(() => {
        listDepartments()
            .then(response => {
                setDepartments(response.data)
            })
            .catch(error => {
                console.error('Error fetching departments:', error)
            })
    }, [])

    // Load employee data if editing
    useEffect(() => {
        if (id) {
            getEmployeeById(id)
                .then(response => {
                    setFirstName(response.data.firstName)
                    setLastName(response.data.lastName)
                    setEmail(response.data.email)
                    setDepartmentId(response.data.departmentId)
                })
                .catch(error => {
                    console.error('Error fetching employee:', error)
                })
        }
    }, [id])

    const validateForm = () => {
        let valid = true
        const errorsCopy = { ...errors }

        if (firstName.trim()) {
            errorsCopy.firstName = ''
        } else {
            errorsCopy.firstName = 'First Name is required'
            valid = false
        }

        if (lastName.trim()) {
            errorsCopy.lastName = ''
        } else {
            errorsCopy.lastName = 'Last Name is required'
            valid = false
        }

        if (email.trim()) {
            errorsCopy.email = ''
        } else {
            errorsCopy.email = 'Email is required'
            valid = false
        }

        if (departmentId) {
            errorsCopy.departmentId = ''
        } else {
            errorsCopy.departmentId = 'Department is required'
            valid = false
        }

        setErrors(errorsCopy)
        return valid
    }

    const saveEmployee = (e) => {
        e.preventDefault()

        if (!validateForm()) return

        const employee = { firstName, lastName, email, departmentId }

        if (id) {
            updateEmployee(id, employee)
                .then(() => navigator('/employees'))
                .catch(error => console.error('Error updating employee:', error))
        } else {
            createEmployee(employee)
                .then(() => navigator('/employees'))
                .catch(error => console.error('Error creating employee:', error))
        }
    }

    const pageTitle = () => {
        return id
            ? <h2 className='text-center'>Update Employee</h2>
            : <h2 className='text-center'>Add Employee</h2>
    }

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    placeholder='Enter First Name'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName &&
                                    <div className='invalid-feedback'>{errors.firstName}</div>
                                }
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    placeholder='Enter Last Name'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName &&
                                    <div className='invalid-feedback'>{errors.lastName}</div>
                                }
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='email'
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email &&
                                    <div className='invalid-feedback'>{errors.email}</div>
                                }
                            </div>

                            {/* Department Dropdown */}
                            <div className='form-group mb-2'>
                                <label className='form-label'>Department:</label>
                                <select
                                    className={`form-control ${errors.departmentId ? 'is-invalid' : ''}`}
                                    value={departmentId}
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                >
                                    <option value=''>-- Select Department --</option>
                                    {
                                        departments.map(department =>
                                            <option key={department.id} value={department.id}>
                                                {department.departmentName}
                                            </option>
                                        )
                                    }
                                </select>
                                {errors.departmentId &&
                                    <div className='invalid-feedback'>{errors.departmentId}</div>
                                }
                            </div>

                            <button
                                type='button'
                                className='btn btn-success'
                                onClick={saveEmployee}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent