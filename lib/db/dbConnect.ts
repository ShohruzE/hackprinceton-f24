import { NextResponse } from "next/server";
import { MongoClient, GridFSBucket } from "mongodb";
import { Patient } from "./schemas/Patient";
import { Nurse } from "./schemas/Nurse";
import { ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri!);
const connected = false;

export async function dbConnect() {
  if (!connected) {
    try {
      await client.connect();
      console.log("Connected to DB");
      return NextResponse.json({ message: "successful" });
    } catch (error) {
      console.log("Error connecting to database");
      return NextResponse.json(error);
    }
  }
  {
    return;
  }
}

export const hospitalDB = client.db("hospital");
export const patientCollection = hospitalDB.collection<Patient>("patients");
export const nurseCollection = hospitalDB.collection<Nurse>("nurses");

export async function gridFSBucketConnect() {
  const bucket = new GridFSBucket(hospitalDB);
  return bucket;
}

export async function getFile(fileId: string) {
  const bucket = await gridFSBucketConnect();
  const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
}
