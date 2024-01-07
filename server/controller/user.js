const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());


const generateToken = (user)=>{
    return jwt.sign({userID:user._id},process.env.SECRET_KEY,{expiresIn:'1h'})
}

const userSignup = async(req,res)=>{

    try{

        const {name,username,password} = req.body

        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User alreay exist'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);
        
        const newUser = new User({name,username, password:hashedPassword})
        await newUser.save();
    
        const token = generateToken(newUser)

        try {
        
            const decoded = jwt.verify(token, process.env.SECRET_KEY); // Replace with your actual secret key

            res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'Lax' });

            res.status(200).json({
                success: true,
                message: 'User registered successfully',
                newUser,
                token,
                decoded
            });
        } catch (decodeError) {
            // Handle the case where decoding fails
            console.error(decodeError);
            res.status(400).json({
                success: false,
                message: 'Token decoding failed',
            });
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            message:'Error registering user',
            success:false
        })
    }
    
}

    const userLogIn = async(req,res)=>{
        
        try
        {

            const {username,password} = req.body;
        
            const user = await User.findOne({username})
    
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:"User does not exist"
                })
            }
    
            const matchPassword = await bcrypt.compare(password,user.password)
        
            if(!matchPassword){
                return res.status(400).json({
                    success:false,
                    message:"Invalid Password"
                })
            }
    
            const token = generateToken(user);            
            
           try{
                
                const decoded = jwt.verify(token, process.env.SECRET_KEY); // Replace with your actual secret key
    
                res.cookie('token', token, { httpOnly: false, sameSite: 'Lax' });

                res.status(200).json({
                    success:true,
                    message:"Login successfull",
                    token,
                    decoded
                })
            }
            catch(decodeError){
                console.log(decodeError)
                res.status(400).json({
                    success:false,
                    message:"Token decoding failed",
                    
                })
            }
            
        }
        catch(err){
            console.log(err)
            res.status(400).json({
                success:false,
                message:"Error logging in user"
            })
        }
    } 

    const userLogOut = (req,res)=>{
        res.clearCookie('token',{httpOnly:false, sameSite:false,secure:false})
        res.status(200).json({
            success:true,
            message:"User logged out"
        })
    }

    const getUser = (req,res)=>{
        const cookieToken = req.cookies.token;
        console.log(cookieToken)
        res.json({success:true,cookieToken})
    }
    

module.exports ={getUser,userSignup,userLogIn,userLogOut}

