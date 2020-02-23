

const isEmail = (email) => {
    const regEx= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regEx)) return true;
    else return false;
    }
const isEmpty =(string)=>{
    if(string.trim() ==='') return true;
    else return false
}
const isLength =(str,n)=>{
    if(str.length <= n) return true;
    else return false
}


exports.valAddUser = (data) => { 
    let errors ={};
    if(isEmpty(data.name)){
       errors.name = 'Nama Tidak Boleh Kosong'
   }
   if(isEmpty(data.password)){
       errors.password = 'Password Tidak Boleh Kosong'
   }
   if(data.password !== data.confirmPassword){
       errors.confirmPassword= 'Password Tidak Sama'
   }
   if(isEmpty(data.username)){
    errors.username = 'Username Tidak Boleh Kosong'
}else if(isLength(data.username,6)){
    errors.username= 'Username kurang dari 6 huruf'
}
   return {
    errors,
    valid : Object.keys(errors).length === 0 ? true :false
}
}

//Login
exports.valLogin = (data) =>{
    let errors ={};
    if(isEmpty(data.username)){
        errors.username = 'Username Tidak Boleh Kosong'
    }
    if(isEmpty(data.password)){
        errors.password = 'Password Tidak Boleh Kosong'
    }
    return {
        errors,
        valid : Object.keys(errors).length === 0 ? true :false
    }
}

exports.reduceUserDetails = (data)=>{
    let userDetails = {};
    if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    if(!isEmpty(data.website.trim())) {
        //https://website.com
        if(data.website.trim().substring(0, 4) !=='http'){
            userDetails.website = `http://${data.website.trim()}`
    }
    else userDetails.website= data.website;
    
}
if(!isEmpty(data.location.trim())) userDetails.location = data.location;
return userDetails
}

