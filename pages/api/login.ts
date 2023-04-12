// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Input{
  id: string,
  firstName: string,
  lastName: string,
  emailId: string,
  mobileNo: string,
  password: string,
  confirm: string
}

interface NewData{
  emailId: string,
  password: string,
}

import { Credentials } from '../Data/data';
export default function LoginValidation(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log(Credentials);
  
  const isUserExist = (UserData:[Input], newData:NewData) => {
    return (UserData.find((user)=>{
      return user.emailId === newData.emailId
    }))
  } 
  if(req.method==="POST"){
    const data = JSON.parse(req.body);
    
    if(isUserExist(Credentials, data.user)){
      res.status(201).json({ 
        status: 201,
        message: 'Success'
      })
    } else{
        res.status(500).json({
          status: 500,
          message: 'User not exist'
        })
    }
}
}