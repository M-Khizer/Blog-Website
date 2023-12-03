const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user')


const getUser = (req,res)=>{
    res.json({success:true})
}

const generateToken = (user)=>{
    return jwt.sign({userID:user._id},process.env.SECRET_KEY,{expiresIn:'1h'})
}

const userSignup = async(req,res)=>{
    try{
        const {username,password} = req.body

        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User alreay exist'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);
        
        const newUser = new User({username, password:hashedPassword})
        await newUser.save();
    
        const token = generateToken(newUser)

        res.cookie('token',token,{httpOnly:true, secure:true, sameSite:'strict'})

        res.json({
            success:true,
            message:'User registered successfully',
            newUser,
            token
        })
        
    }
    catch(err){
        console.log(err)
        res.status(500).json({
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

            res.cookie('token',token,{httpOnly:true,sameSite:'strict'})

            res.status(200).json({
                success:true,
                message:"Login successfull",
                token
            })
        }
        catch(err){
            console.log(err)
            res.status(400).json({
                success:false,
                message:"Error logging in user"
            })
        }
    } 

module.exports ={getUser,userSignup,userLogIn}

