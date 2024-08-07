import { injectable } from "inversify";
import { IUser } from "../interfaces";
import { User } from "../models";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
@injectable()
export class AuthService{
    async signup(userData:IUser){
        try {
            await User.create(userData)
        } catch (error) {
            throw(error)
        }
    }

    async login(userData:IUser){
        try {
            const user=await User.findOne({email:userData.email})
            if(!user){
                throw new Error("User does not exists")
            }
            const isValidPassword=await bcrypt.compare(userData.password,user.password)
            if(!isValidPassword){
                throw new Error("Inavalid Crendentials")
            }
            const payload={
                userId:user._id,
                roleId:user.roleId
            }
            const token=jwt.sign(payload,"HETVIPAREKH",{expiresIn:'2d'})
            return {token:token,data:user}
        } catch (error) {
            throw(error)
        }
    }
}