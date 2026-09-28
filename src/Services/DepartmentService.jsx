import axios from 'axios'

const REST_API_BASE_URL = 'http://localhost:8082/api/departments'

export const listDepartments = () => axios.get(REST_API_BASE_URL)

export const getDepartmentById = (departmentId) =>
    axios.get(`${REST_API_BASE_URL}/${departmentId}`)

export const createDepartment = (department) =>
    axios.post(`${REST_API_BASE_URL}/Create`, department)

export const updateDepartment = (departmentId, department) =>
    axios.put(`${REST_API_BASE_URL}/${departmentId}`, department)

export const deleteDepartment = (departmentId) =>
    axios.delete(`${REST_API_BASE_URL}/${departmentId}`)