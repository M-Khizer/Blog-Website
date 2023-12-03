const jwt = require('jsonwebtoken')

exports.checkToken = (req,res,next)=>{

    const token = req.cookies.token;   
    
    if(!token){
        return res.status(400).json({
            success:false,
            message:'No token provided'
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user = decoded;
        next();
    }

    catch(err){
        console.error(error);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}