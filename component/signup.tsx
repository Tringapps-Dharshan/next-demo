import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import SimpleDialog from "./SimpleDialog"
import { useState } from "react";
import SnackBar from "./SnackBar";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUsers } from "@/Redux/Slices/createUserSlice";

interface Props{
    open: boolean,
    setOpen: (args:boolean) => void
}

export interface FormData {
    firstName: string,
    lastName: string,
    emailId: string,
    mobileNo: string,
    password: string,
    confirm: string
}

export default function SignUp({open, setOpen}: Props){
    // console.log(useSelector(selectUsers));
    
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormData>();
    const router = useRouter();
    const [message, setMessage] = useState<string>('');
    const [type, setType] = useState<'SUCCESS'|'ERROR'>('ERROR');
    const [openMessage, setOpenMessage] = useState<boolean>(false);    
    const onSubmit = async (userData:FormData) => {
        const response = (await (await fetch('/api/signup', {
            method: "POST",
            body: JSON.stringify({user: userData}),
            headers: {
                'Context-Type': 'application/json',
            }
        })).json())
        if(response.status===201){
            setOpen(false);
            reset();
            setOpenMessage(true);
            setType('SUCCESS');
            setMessage('User added successfully');
            router.push('/Home');
            sessionStorage.setItem('currentUser',JSON.stringify({
                'userName': `${userData.firstName} ${userData.lastName}`,
                'emailId': `${userData.emailId}`
            }))
        }else{
            setOpenMessage(true);
            setType('ERROR');
            setMessage('User already exist');
        }     
    }
    const validatePassword = () => {
        if(watch("confirm").localeCompare(watch("password"))){
            return false
        }else{
            return true
        }
    }
    const handleOnClose = () => {
        setOpen(false)
        reset();
    }
    const title="Create your Shoppy Account";
    const content = () => {
        return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='twoField'>
                    <div className='inputField'>
                        <TextField
                            variant='outlined'
                            label='Firstname'
                            size='small'
                            color={errors.firstName ? "error" : "primary"}
                            {...register("firstName",{
                                required:{
                                    value: true,
                                    message: 'Enter Firstname'
                                },
                                pattern:{
                                    value: /[a-zA-z]/,
                                    message: 'Enter valid firstname'
                                }
                            })}
                        />
                        {errors.firstName && <small>{errors.firstName.message}</small>}
                    </div>
                    <div className='inputField'>
                    <TextField
                        variant='outlined'
                        label='Lastname'
                        size='small'
                        color={errors.lastName ? "error" : "primary"}
                        {...register("lastName",{
                            required:{
                                value: true,
                                message: 'Enter Lastname'
                            },
                            pattern:{
                                value: /[a-zA-z]/,
                                message: 'Enter valid lastname'
                            }
                        })}
                    />
                    {errors.lastName && <small>{errors.lastName.message}</small>}
                    </div>
                </div>
                <div className='twoField'>
                    <div className='inputField'>
                    <TextField
                        variant='outlined'
                        label='Email Id'
                        size='small'
                        color={errors.emailId ? "error" : "primary"}
                        {...register("emailId",{
                            required:{
                                value: true,
                                message: 'Enter Email ID'
                            },
                            pattern:{
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: 'Enter valid email id'
                            }
                        })}
                    />
                    {errors.emailId && <small>{errors.emailId.message}</small>}
                    </div>
                    <div className='inputField'>
                    <TextField
                        variant='outlined'
                        label='Mobile number'
                        size='small'
                        color={errors.mobileNo ? "error" : "primary"}
                        {...register("mobileNo",{
                            required:{
                                value: true,
                                message: 'Enter mobile number'
                            },
                            pattern:{
                                value: /[789][0-9]{9}/,
                                message: 'Enter valid mobile number'
                            }
                        })}
                    />
                    {errors.mobileNo && <small>{errors.mobileNo.message}</small>}
                    </div>
                </div>
                <div className='twoField'>
                    <div className='inputField'>
                        <TextField
                            variant='outlined'
                            label='Password'
                            size='small'
                            color={errors.password ? "error" : "primary"}
                            {...register("password",{
                                required:{
                                    value: true,
                                    message: 'Enter password'
                                },
                                pattern:{
                                    value: /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                                    message: 'Enter valid password'
                                }
                            })}
                        />
                        {errors.password && <small>{errors.password.message}</small>}
                    </div>
                    <div className='inputField'>
                        <TextField
                            variant='outlined'
                            label='Confirm'
                            size='small'
                            color={errors.confirm ? "error" : "primary"}
                            {...register("confirm",{
                                required:{
                                    value: true,
                                    message: 'Enter password'
                                },
                                validate: () => validatePassword()
                            })}
                        />
                        {errors.confirm && <small>{errors.confirm.type==='validate' ? 'Confirm password mismatched' : errors.confirm.message} </small>}
                    </div>
                </div>
                <div className='formActions'>
                    <Button type='submit' variant='contained'>Submit</Button>        
                </div>
            </form>
        )
    }
    return(
        <>
            {openMessage && <SnackBar type={type} message={message} openMessage={openMessage} setOpenMessage={setOpenMessage} />}
            {<SimpleDialog open={open} title={title} content={content} handleClose={handleOnClose}/>}
        </>
    )
}