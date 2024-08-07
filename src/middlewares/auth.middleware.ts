import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import jwt, { JwtPayload } from "jsonwebtoken"
export class AuthMiddleware extends BaseMiddleware{
    handler(req: Request, res: Response, next: NextFunction): void {
       try {
            const token=req.headers.authorization?.split(" ")[1];
            if(!token){
                throw new Error("User not logged in")
            }
            const decoded=jwt.verify(token,"HETVIPAREKH") as JwtPayload
            if(!decoded){
                throw new Error("Invalid Token")
            }
            req.headers.userId=decoded.userId
            req.headers.roleId=decoded.roleId
            next()
       } catch (error) {
            res.status(403).json({status:false,message:error.message})
       }
    }

}