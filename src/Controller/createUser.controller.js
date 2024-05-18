
const UserModel = require("../Models/UserSchema");

const createUser = async (req, res) => {
    try {
        const userData = req.body
        const user = new UserModel({
            username: userData.username,
            email: userData.email,
            age: userData.age
        })
        await user.save()

        res.json({
            message: 'add ok',
            user: user
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = { createUser };