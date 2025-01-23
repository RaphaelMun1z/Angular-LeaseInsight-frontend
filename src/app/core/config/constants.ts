const apiUrl = "http://localhost:8080/api"

export const ApiEndpoint = {
    Auth: {
        Login: `${apiUrl}/auth/login`,
        Me: `${apiUrl}/auth/me`
    }
}

export const LocalStorage = {
    token: 'USER_TOKEN',
}