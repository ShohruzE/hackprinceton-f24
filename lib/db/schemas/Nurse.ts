import { ObjectId } from "mongodb"
import { Patient } from './Patient'

import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth";

const user_id = null

onAuthStateChanged(auth, (user) => {
    if (user) {
        const user_id = user.uid;
        console.log(user_id)
    }
});

export interface Nurse {
    first_name: string;
    last_name: string;
    nurse_id: string;
    patients: Array<ObjectId>;
    tasks: Array<string>;
}