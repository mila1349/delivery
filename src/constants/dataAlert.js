export const noPackagesHistory = {
    type:'error',
    display:'flex',
    img:'x.png',
    title:'Gagal',
    desc:'Belum ada paket yang telah anda buat',
    btnText:'TUTUP'
}

export const successCreate = {
    type:'success',
    display:'flex',
    img:'check.png',
    title:'Berhasil',
    desc:'Paket anda berhasil didaftarkan',
    btnText:'OK'
}

export const errorConfirm = {
    type:'error',
    display:'flex',
    img:'x.png',
    title:'Gagal',
    desc:'Maaf, password harus sama dengan confirm password',
    btnText:'TUTUP'
}

export const noImageUpdate = {
    type:'error',
    display:'flex',
    img:'x.png',
    title:'Gagal',
    desc:'Harap masukkan bukti foto pengiriman',
    btnText:'TUTUP'
}

export const updatePackageSuccess = {
    type:'success',
    display:'flex',
    img:'check.png',
    title:'Berhasil',
    desc:'Paket berhasil diubah',
    btnText:'OK'
}

export const updateUserSuccess = {
    type:'success',
    display:'flex',
    img:'check.png',
    title:'Berhasil',
    desc:'User berhasil diubah',
    btnText:'OK'
}

export const findPackageError = {
    type:'error',
    display:'flex',
    img:'x.png',
    title:'Gagal',
    desc:'Tidak ada paket dengan resi tersebut',
    btnText:'TUTUP'
}

export function errorCustom(desc){
    return {
        type:'error',
        display:'flex',
        img:'x.png',
        title:'Gagal',
        desc:desc,
        btnText:'TUTUP'
    }
}