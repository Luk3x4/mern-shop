const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const path = require('path')

const generateToken = (email) => {
    return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'})
}

const register = async (req, res) => {
    try{

        const { username, email, password } = req.body;
        const avatar = req.files?.avatar
        const userExists = await User.findOne({email});
        if(userExists) return res.status(404).json({err: 'მომხმარებელი ასეთი მეილით უკვე დარეგისტრირებულია!'})
        const hash = await bcrypt.hash(password, 10)
        const avatar_url = avatar? path.join(__dirname, '../public', 'images', avatar.name): ''
        avatar? await avatar.mv(avatar_url): null
        const user = await User.create({username, email, password: hash, avatar: avatar? `/images/${avatar.name}`: ''})
        const accessToken = generateToken({ email: user.email});
        res.status(200).json({
            user: {
                username: user.username,
                email: user.email,
                client_id: user._id,
                avatar: user.avatar,
            },
            accessToken
        })
    }catch(e){
        res.status(400).json({
            err: e
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email});
    if(!user || !await bcrypt.compare(password, user.password)) return res.status(400).json({err: 'მეილი ან პაროლი არასწორია!'})
    const accessToken = generateToken({email: user.email});
    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            client_id: user._id,
            avatar: user.avatar,
        },
        accessToken
    })
}

const getUserInfo = async (req, res) => {
    const user = await User.find(req.user).select('-password');
    res.status(200).json({
        user
    })
}

module.exports = {
    register,
    login,
    getUserInfo
}