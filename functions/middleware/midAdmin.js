
module.exports =  (req,res,next) =>{
    try{
        if(req.auth.role == 'admin') {
            return next()
        }
        else {
            return res.status(401).json({
                message:'Maaf, Tidak ada akses'
            });
        }
    }
    catch(error){
        return res.status(500).json({
            error: error.code
        });
    }
}