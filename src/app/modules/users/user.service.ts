import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import { User } from "./user.model";
const createUser =  async(data:Partial<TUser>)=>{
    if(data.password){
        data.password = await bcrypt.hash(data.password,10) ;
    }
    const user = await User.create(data) ;
    return user ;
}

const findUserByEmail = async(email:string)=>{
    return User.findOne({email: email} ) ;
}
 const findUserByIdentifier = async (identifier: string) => {
  return await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  }).select("+password");
};

const findUserByGoogleId = async (googleId: string) => {
  return await User.findOne({ googleId });
};

export const userServices =  {
    createUser ,
    findUserByEmail ,
    findUserByGoogleId ,
    findUserByIdentifier


}