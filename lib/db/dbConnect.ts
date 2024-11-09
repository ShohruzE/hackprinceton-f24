import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { Patient } from "./schemas/Patient";
import { Nurse } from "./schemas/Nurse";

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri!)
const connected =  false

export async function dbConnect() {
    if (!connected) {
        try {
            await client.connect()
            console.log("Connected to DB")
            return NextResponse.json({ message: "successful"})
        } catch(error){
            console.log("Error connecting to database")
            return NextResponse.json(error)
        }
    } {
        return 
    }
}

export const hospitalDB = client.db("hospital")
export const patientCollection = hospitalDB.collection<Patient>("patients")
export const nurseCollection = hospitalDB.collection<Nurse>("nurses")