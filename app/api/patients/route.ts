import { dbConnect } from "@/lib/db/dbConnect";
import { patientCollection } from "@/lib/db/dbConnect";
import { Patient } from "@/lib/db/schemas/Patient";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest){
    try { 
        await dbConnect()
        const url_object = new URL(request.url)
        const id = url_object.searchParams.get("patient_id");
        const patient = { ...(await patientCollection.findOne({  _id: new ObjectId(id!) })) };
        console.log(patient)
        return NextResponse.json({ ...patient })
    } catch(error) {
        return NextResponse.json({ error: "error getting the patient" })
    }
}

export async function POST(request: NextRequest){
    try {
        await dbConnect()
        const response = await request.json()
        const data = { ...response }
        console.log(data.blood_pressure[0].value)
        const patient: Patient = {
            first_name: data.first_name,
            last_name: data.last_name,
            age: data.age,
            date_of_birth: data.date_of_birth,
            blood_type: data.blood_type,
            allergies: data.allergies,
            blood_pressure: [{
                systolic: data.systolic,
                diastolic: data.diastolic,
                timestamp: new Date()
                }],
            heart_rate: data.heart_rate,
            temperature: [{
                value: data.temperature,
                timestamp: new Date()
                }],
            oxygen_saturation: [{
                value: data.oxygen_saturation,
                timestamp: new Date()
                }],
            room_bed_number: data.room_bed_number,
            preferences: data.preferences,
            nurse_notes: data.nurse_notes,
            required_tasks: data.required_tasks,
            conversation_summary: data.conversation_summary
        }

        patientCollection.insertOne(patient)
        return NextResponse.json({ message: "Possibly worked" })
    } catch (error) {
        return NextResponse.json({ error: error })
    }
}

export async function PUT(request: NextRequest) {
    
}