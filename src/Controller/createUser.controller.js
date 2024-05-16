
const UserModel = require("../Models/UserSchema");

let counter = 1
const createUser = async (req, res) => {
    try {
        const userData = req.body
        const user = new UserModel({
            id: counter,
            username: userData.username,
            email: userData.email,
            age: userData.age
        })
        await user.save()
        counter+=1

        res.json({
            message: 'add ok',
            user: user
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = { createUser };