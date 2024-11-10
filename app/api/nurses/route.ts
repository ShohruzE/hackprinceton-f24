import { dbConnect } from "@/lib/db/dbConnect";
import { nurseCollection } from "@/lib/db/dbConnect";
import { patientCollection } from "@/lib/db/dbConnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

interface PatientInfo {
  first_name: string;
  last_name: string;
  age: number;
  date_of_birth: string;
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const url_object = new URL(request.url);
    const id = url_object.searchParams.get("nurse_id");
    const nurse = { ...(await nurseCollection.findOne({ nurse_id: id! })) };

    const patientList: PatientInfo[] = [];
    if (nurse.patients?.length != null) {
      for (let i = 0; i < nurse.patients?.length; i++) {
        const patient = await patientCollection.findOne({
          _id: new ObjectId(nurse.patients[i]),
        });
        if (patient) {
          patientList.push({
            first_name: patient?.first_name,
            last_name: patient?.last_name,
            age: patient?.age,
            date_of_birth: patient?.date_of_birth,
          });
        }
      }
    }
    console.log(patientList);

    return NextResponse.json({ patients: patientList });
  } catch (errorMessage) {
    return NextResponse.json({ error: "error getting nurses", errorMessage });
  }
}

export async function POST(request: NextResponse) {
  try {
    await dbConnect();
    const response = await request.json();
    nurseCollection.insertOne(response);
    return NextResponse.json({ message: "successful post request" });
  } catch (error) {
    return NextResponse.json({ error: "error posting new nurse" });
  }
}
