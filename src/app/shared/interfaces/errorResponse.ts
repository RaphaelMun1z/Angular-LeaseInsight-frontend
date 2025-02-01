export interface ErrorResponse {
    timestamp: string,
    status: number,
    errors: {
        error: string
    },
    message: string,
    path: string
}