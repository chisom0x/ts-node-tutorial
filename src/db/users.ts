import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    authentication: {
        password: {type: String, select: false},
        salt: {type: String},
        sessionToken: {type: String, select: false}
    }
})

export const userModel = mongoose.model('User', userSchema)
export const getUsers = () => userModel.find()
export const getUserByEmail = (email: string) => userModel.findOne({email})
export const getUserBySessionToken = (sessionToken: string) => userModel.findOne({
    'authentication.sessionToken': sessionToken
})
export const getUserById = (id: string) => userModel.findById(id)
export const createUser = (values: Record<string, any>) => new userModel(values)
 .save().then((user) => user.toObject())
export const deleteUserById = (id: string) => userModel.findOneAndDelete({_id: id})
export const updateUserById = (id: string, values: Record<string, any>) => userModel.findByIdAndUpdate(id, values)