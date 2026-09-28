import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService'

const DepartmentComponent = () => {

    const [departmentName, setDepartmentName] = useState('')
    const [departmentDescription, setDepartmentDescription] = useState('')

    const [errors, setErrors] = useState({
        departmentName: '',
        departmentDescription: ''
    })

    const navigator = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            getDepartmentById(id)
                .then(response => {
                    setDepartmentName(response.data.departmentName)
                    setDepartmentDescription(response.data.departmentDescription)
                })
                .catch(error => {
                    console.error('Error fetching department:', error)
                })
        }
    }, [id])

    const validateForm = () => {
        let valid = true
        const errorsCopy = { ...errors }

        if (departmentName.trim()) {
            errorsCopy.departmentName = ''
        } else {
            errorsCopy.departmentName = 'Department Name is required'
            valid = false
        }

        if (departmentDescription.trim()) {
            errorsCopy.departmentDescription = ''
        } else {
            errorsCopy.departmentDescription = 'Department Description is required'
            valid = false
        }

        setErrors(errorsCopy)
        return valid
    }

   const saveOrUpdateDepartment = (e) => {
    e.preventDefault()
    console.log('1. Button clicked')

    if (!validateForm()) {
        console.log('2. Validation FAILED', errors)
        return
    }

    console.log('3. Validation PASSED')

    const department = { departmentName, departmentDescription }
    console.log('4. Sending data:', department)

    if (id) {
        console.log('5. Calling UPDATE')
        updateDepartment(id, department)
            .then(() => navigator('/departments'))
            .catch(error => console.error('Error updating department:', error))
    } else {
        console.log('5. Calling CREATE')
        createDepartment(department)
            .then((response) => {
                console.log('6. SUCCESS:', response.data)
                navigator('/departments')
            })
            .catch(error => {
                console.error('6. ERROR creating department:', error)
                console.error('Error details:', error.response)
            })
    }
}
    const pageTitle = () => {
        return id
            ? <h2 className='text-center'>Update Department</h2>
            : <h2 className='text-center'>Add Department</h2>
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
                                <label className='form-label'>Department Name:</label>
                                <input
                                    type='text'
                                    className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`}
                                    placeholder='Enter Department Name'
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                />
                                {errors.departmentName &&
                                    <div className='invalid-feedback'>{errors.departmentName}</div>
                                }
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Department Description:</label>
                                <input
                                    type='text'
                                    className={`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}
                                    placeholder='Enter Department Description'
                                    value={departmentDescription}
                                    onChange={(e) => setDepartmentDescription(e.target.value)}
                                />
                                {errors.departmentDescription &&
                                    <div className='invalid-feedback'>{errors.departmentDescription}</div>
                                }
                            </div>

                            <button
                                type='button'
                             className='btn btn-success'
                            onClick={saveOrUpdateDepartment}
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

export default DepartmentComponent