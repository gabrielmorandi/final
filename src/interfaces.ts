export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface Doctor {
    id: number;
    crm: string;
    specialty_name: string;
    user: User;
}

export interface Patient {
    id: number;
    date_of_birth: string;
    gender: string;
    user: User;
}

export interface Appointment {
    id: number;
    patient_name: string;
    doctor_name: string;
    status: string;
    created_at: string;
}

export interface AvailableSlot {
    id: number;
    doctor_name: string;
    start_time: string;
    end_time: string;
    is_available: boolean;
}
