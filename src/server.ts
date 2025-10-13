import app from "./app"
import mongoose from "mongoose";
import {error} from "console" 
import config from "./app/config";


async function main() {
    await mongoose.connect(config.db_url as string);
    
    app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`)
      })
  
}

main().then(() => console.log("Mongodb is connected successfully!"))
.catch(error => console.log(error));