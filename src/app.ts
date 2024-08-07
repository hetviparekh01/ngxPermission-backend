import 'reflect-metadata'
import express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import container from './inversify.config'
import cors from 'cors'
// import config from 'config'
import { connectDB } from './db'
import './controllers'
const server=new InversifyExpressServer(container);
server.setConfig((app)=>{
    app.use(express.json())
    app.use(cors())
})

const app=server.build();
app.listen(3000, () => {
    console.log(`Server is running on Port 3000`);
    connectDB()
        .then(() => {
            console.log(`DB Connected!!`);
        })
        .catch((error) => {
            console.log(`Error in Connecting DB!!`);
            console.log(error.message);
        })
})
