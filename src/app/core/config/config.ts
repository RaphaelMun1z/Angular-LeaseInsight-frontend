import {config as conf} from 'dotenv';

conf();

const config = {
    hostUrl: process.env['HOST_URL'],
    production: process.env['PRODUCTION'],
    jwtSecret: process.env['JWT_SECRET']
}

export default config;