const {db} = require('../utils/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req,res) =>{
    db.doc(`/users/${req.body.username}`).get()
    .then(doc=>{
        if(!doc.exists){
            return res.status(404).json({username: 'Username tidak ditemukan'})
        }
        bcrypt.compare(req.body.password, doc.data().password, (err, result) => {
            if(result){
                jwt.sign({
                    username : doc.data().username,
                    role : doc.data().role
                },'secret_key',(err,token)=>{
                    return res.status(200).json({
                      token : token,
                    })
                })
            }
            else return res.status(403).json({error: 'Password dan Username salah'})
        });
    }).catch(err=>{
        console.log(err)
        return res.status(500).json({error: err.code})
    })
    }

    exports.me = (req,res)=>{
        db.collection('users').doc(req.auth.username).get()
        .then(data=>{
            let users = [];
            users.push({
                username : data.id,
                name: data.data().name,
                role : data.data().role
            })
            return res.status(200).json(users)
       })
        .catch(err=>{
            console.log(err)
            return res.status(500).json({error :err.code})
        })
    }