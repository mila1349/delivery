import axios from 'axios'

const alamat = 'https://delivery-package.herokuapp.com'

export const createUser = (newUser) => axios.post(`${alamat}/signup`, newUser)
export const createUserGoogle = (newUser) => axios.post(`${alamat}/signupGoogle`, newUser)
export const checkUser = (checkUser) => axios.post(`${alamat}/signin`, checkUser)
export const updateUser = (id, updateUser) => axios.patch(`${alamat}/account/${id}`, updateUser)
export const loginAdmin = (password) => axios.post(`${alamat}/admin`, password)

