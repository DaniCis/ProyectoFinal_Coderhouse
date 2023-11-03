import dotenv from "dotenv"

const environment = "PRODUCTION"

dotenv.config()

const CONFIG ={
    ENVIRONMENT: environment,
    MONGO_URI: process.env.MONGO_URI || '',
    PORT: process.env.PORT || 3000,
    DATASOURCE: process.env.PERSISTENCE || 'MONGO',
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASS: process.env.ADMIN_PASS,
    GIT_CLIENT_ID: process.env.GIT_CLIENT_ID,
    GIT_CLIENT_SECRET:process.env.GIT_CLIENT_SECRET,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD
}
export default CONFIG;