import { dbConnect } from "@/lib/db/dbConnect";
import { hospitalDB } from "@/lib/db/dbConnect";
import { nurseCollection } from "@/lib/db/dbConnect";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect()
        const nurses = nurseCollection.find()
        return NextResponse.json(nurses)
    } catch(error) {
        return NextResponse.json({ error: "error getting nurses" })
    }
}

export async function POST(request: NextResponse) {
    try {
        await dbConnect()
        const response = await request.json()
        nurseCollection.insertOne(response)
        return NextResponse.json({ message: "successful post request" })
    } catch(error) {
        return NextResponse.json({ error: "error posting new nurse" })
    }
}