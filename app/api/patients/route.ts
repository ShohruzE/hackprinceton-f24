import { dbConnect } from "@/lib/db/dbConnect";
import { patientCollection } from "@/lib/db/dbConnect";
import { Patient } from "@/lib/db/schemas/Patient";
import { NextResponse, NextRequest } from "next/server";

export async function GET(){
    try {
        await dbConnect()
        const patients = patientCollection.find().toArray()
        console.log(patients)
        return NextResponse.json({ message: "Retrieved all patients"})
    } catch(error){
        return NextResponse.json({ error: error })
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