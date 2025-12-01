import dotenv from "dotenv";
dotenv.config();
export default {
    port : process.env.PORT ,
    db_url:process.env.DB_URL ,
    access_token: process.env.ACCESS_TOKEN_SECRET,
    refresh_token: process.env.REFRESH_TOKEN_SECRET
}