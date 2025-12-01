import express, { Request, Response } from 'express' ;
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser());
import userRoutes from './app/modules/users/user.route'
import propertyRoutes from './app/modules/Tolet_Property/property.route'
import favoriteRoutes from './app/modules/Favorite/favorite.route'
app.use("/api/users" ,userRoutes) 
app.use("/api/properties" ,propertyRoutes)

app.use("/api/favorites", favoriteRoutes);


app.get('/api', (req:Request, res:Response) => {
  res.send('Hello World!')
}) 



export default app 