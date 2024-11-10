interface BloodPressure {
    systolic: number,
    diastolic: number,
    timestamp: Date;
}

interface Temperature {
    value: number;
    timestamp: Date;
}

interface OxygenSaturation {
    value: number;
    timestamp: Date;
}

interface ConversationSummary {
    summary: string;
    timestamp: Date
}

export interface Patient {
    first_name: string;
    last_name: string
    age: number;
    date_of_birth: string,
    blood_type: string;
    allergies: Array<string>;
    blood_pressure: BloodPressure[];
    heart_rate: number;
    temperature: Temperature[]
    oxygen_saturation: OxygenSaturation[]
    room_bed_number: string;
    preferences: Array<string>;
    nurse_notes: string,
    required_tasks: Array<string>;
    conversation_summary: ConversationSummary[],
    //recordings
}
