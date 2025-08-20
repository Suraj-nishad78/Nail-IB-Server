import {MongoClient}  from 'mongodb'
import mongoose from 'mongoose';
import dotenv  from 'dotenv'
dotenv.config()

const mongoServer = process.env.MONGOSERVER;
const client = new MongoClient(mongoServer);
const dbName = "Nail_IB"

export const connectDatabase = async () =>{
    try{
        await mongoose.connect(mongoServer)
        console.log('Database connected ✅')
    } catch (err){
        console.log('Error while connecting database: ', err)
    }
}

