const User = require('../models/user-model')
const bcrypt = require('bcryptjs');
const home = async (req, res) => {
    try {
        res.status(200).send("welcome to home using controller")
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ message: "email already exist" })
        }

        //hash the password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound)

        const userCreated = await User.create({ username, email, phone, password})

        res.status(201).json({ msg: "registration successfull",
            token:await userCreated.generateToken(),
            userId:userCreated._id.toString()
        })
    } catch (error) {
        // res.status(500).send({ msg: "internal server error" })
        next(error)
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;

        const userExist=await User.findOne({email})

        if(!userExist){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const user=await userExist.comparePassword(password);
        if(user){
            res.status(201).json({ msg: "login successfull",
                token:await userExist.generateToken(),
                userId:userExist._id.toString()
            })
        }
        else{
            res.status(401).json({message:"Invalid email or password"})
        }

    } catch (error) {
        res.status(500).send({ msg: "internal server error" })
    }
}

//to send user data

const user=async(req,res)=>{
    try {
        const userData=req.user;
        console.log(userData);
        return res.status(200).json({userData})

    } catch (error) {
        console.log(`error from the user route${error}`);
    }
}

module.exports = { home, register,login ,user}