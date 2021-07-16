const User = require("../model/User").User;
const client = require('../redisdb')

const {getRepository} = require('typeorm')

const userCtrl = {}

userCtrl.getUser = async (req, res) => {
    const {username, password } = req.body
    
    const repositories = await getRepository(User).find()
    const find_user = await getRepository(User).findOne(
        { where:
            { username: username }
    })

    if (!find_user){
        return res.status(401).json({error: "error"})
    }

    if (find_user.password == password){
        const hashuser = {
            username: find_user.username,
            id: find_user.id
        }
        return res.json({ok: hashuser})
    }else{
        return res.status(401).json({error: "error"})
    }

    
}

userCtrl.createUser = async (req, res) => {
    const {username, password } = req.body

    const huser = {
        username: username,
        password: password
    }

    const newUser = getRepository(User).create(req.body)
    try {
        const user = await getRepository(User).save(newUser)
        client.set(`user_${user.id}`,JSON.stringify(user))
        return res.status(201).json(user)
    } catch(err) {
        return res.status(404).json({error:"error"})
    }


}

module.exports = userCtrl;