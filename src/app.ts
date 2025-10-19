import express, { Request, Response } from 'express' ;
import cors from 'cors' ;
const app = express()
app.use(express.json())
app.use(cors())
import userRoutes from './app/modules/users/user.route'
import propertyRoutes from './app/modules/Tolet_Property/property.route'
app.use("/api/users" ,userRoutes) 
app.use("/api/properties" ,propertyRoutes)


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
}) 



export default app 