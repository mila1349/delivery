import axios from 'axios'

const alamat = 'https://delivery-package.herokuapp.com'

export const getPackage = (id) => axios.post(`${alamat}/${id}`)
export const fetchPackages = () => axios.get(`${alamat}/admin`)
export const createPackage = (newPackage) => axios.post(`${alamat}/kirim`, newPackage)
export const updatePackage = (id, updatePackage) => axios.patch(`${alamat}/admin/${id}`, updatePackage)

export const fetchPackagesUser = (id) => axios.post(`${alamat}/riwayat/${id}`)