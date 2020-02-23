const {db} = require('../utils/Admin');


exports.getBalita = (req,res) =>{
    db.collection('balita').get()
    .then(data =>{
        let balita=[];
        data.forEach(doc =>{
            balita.push({
                id_user:doc.data().id_user,
                id_balita :doc.data.id,
                name: doc.data().name,
                createdAt : doc.data().createdAt
            })
       });
       return res.status(200).json(balita);
    }).catch(err=>{
        console.log(err)
        return res.status(500).json({error : error.code})
    })
}

exports.searchBalita = (req,res) =>{
db.collection('balita').isEqual(req.params.id,true).get()
    .then(data =>{
        let balita=[];
        data.forEach(doc =>{
            balita.push({
                id_user:doc.data().id_user,
                id_balita : data.id,
                name: doc.data().name,
                createdAt : doc.data().createdAt
            })
       });
       return res.status(200).json(balita);
    }).catch(err=>{
        console.log(err)
        return res.status(500).json({error : error.code})
    })
}

exports.addBalita = (req,res) =>{
    const date = new Date();
    const id = req.body.name.toLowerCase().substring(0,5).replace(' ','')+date.getHours()+date.getMinutes()
    const newBalita = {
        name: req.body.name,
        userHandle: req.auth.username,
        createdAt: new Date().toISOString(),
        id_user : req.body.id_user
    }
  
    db.collection('balita').doc(id).set(newBalita)
        .then(()=>{
            return res.status(201).json({success : 'Balita berhasil ditambahkan'})
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).json({error: err.code})
        })
    
}

exports.delBalita = (req,res)=>{
    db.collection('balita').doc(req.params.id).get()
    .then(doc=>{
        if(!doc.exists){
            return res.status(404).json({error : 'Data balita tidak ada'})
        }
        db.collection('balita').doc(req.params.id).delete()
        .then(()=>{
            return res.status(200).json({success: 'data berhasil di hapus'})
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).json({error: err.code})
        })
    })
}

