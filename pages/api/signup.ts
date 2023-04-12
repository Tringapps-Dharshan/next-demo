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
import {v4 as id} from 'uuid'
import { Credentials } from '../Data/data';
export default function LoginValidation(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const isUserData = (UserData:[Input], newData:Input) => {
    return (UserData.find((user)=>{
      return user.emailId === newData.emailId
    }))
  }
  if(req.method==="POST"){
    const data = JSON.parse(req.body);
    const newData:Input = {...data.createUser,'id': id()}
    if(!isUserData(Credentials, newData)){
      res.status(201).json({ 
        status: 201,
        data: newData
      })
    } else{
        res.status(500).json({
          status: 500,
          message: 'User already exist'
        })
    }
}
}