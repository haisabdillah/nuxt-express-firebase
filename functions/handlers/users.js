const {db} = require('../utils/Admin');
const config = require('../utils/Config');
const {valAddUser} = require('../utils/Validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// hash password dengan salt 


exports.addUser = (req, res) => {

    //Get Data
    const newUser = {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    };

    //Validate Data
    const {
        errors,
        valid
    } = valAddUser(newUser);
    if (!valid)
        return res.status(400).json(errors);

    const noImg = 'download.png'
    //Store Data
    db.doc(`/users/${newUser.username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(403).json({
                    username: 'Username sudah di pakai'
                })
            } 
            else {
                bcrypt.hash(newUser.password, saltRounds, (err, hash)=> {
                    const userCredentials = {
                        username: newUser.username,
                        password: hash,
                        name: newUser.name,
                        role: 'admin',
                        createdAt: new Date().toISOString(),
                        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
                    };
                    db.doc(`/users/${newUser.username}`).set(userCredentials)
                    .then(()=>{
                        return res.status(201).json({success :'Users Berhasil di tambahkan'})
                    })
                })
            }
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({error: err.message})
        })

}

exports.getUsers = (req,res) =>{
   db.collection('users')
   .orderBy('createdAt','desc')
   .get()
   .then(data=>{
       let users = [];
       data.forEach(doc =>{
            users.push({
                id_user : doc.id,
                name: doc.data().name,
                role: doc.data().role,
                createdAt : doc.data().createdAt
            })
       });
       return res.json(users)
   })
}




