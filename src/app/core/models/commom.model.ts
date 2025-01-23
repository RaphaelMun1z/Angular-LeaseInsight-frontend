export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface ApiResponse<T> {
    status?: boolean;
    message?: string;
    error?: string;
    token?: string;
    data: T;
}