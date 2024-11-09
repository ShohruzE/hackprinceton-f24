import { ObjectId } from "mongodb"
import { Patient } from './Patient'

export interface Nurse {
    first_name: string;
    last_name: string;
    patients: Array<ObjectId>;
    tasks: Array<string>;
}