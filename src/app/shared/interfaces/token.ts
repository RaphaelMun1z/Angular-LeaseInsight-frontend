export interface Token{
    token: {
        username: string,
        created: string,
        expiration: string,
        accessToken: string
    };
}

export interface DecodedToken{
    role: string,
    iat: string,
    exp: string,
    iss: string,
    sub: string
}