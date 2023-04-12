import { Button, TextField } from "@mui/material";
import SimpleDialog from "./SimpleDialog";
import { useForm } from "react-hook-form";

interface Props{
    open: boolean,
    setOpen: (args: boolean) => void
}

interface FormData{
    emailId: string,
    password: string
}

export default function Login({open, setOpen}:Props){
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const onSubmit = async (userData:FormData) => {
        console.log(userData);
        reset();
        const response = (await (await fetch('/api/login', {
            method: "POST",
            body: JSON.stringify({user: userData}),
            headers: {
                'Context-Type': 'application/json',
            }
        })).json())
        console.log(response);
        
        // if(response.status===201){
        //     setOpen(false);
        //     reset();
        //     // setOpenMessage(true);
        //     // setType('SUCCESS');
        //     // setMessage('User added successfully');
        //     router.push('/Home');
        //     sessionStorage.setItem('currentUser',JSON.stringify({
        //         'userName': `${userData.firstName} ${userData.lastName}`,
        //         'emailId': `${userData.emailId}`
        //     }))
        // }else{
            // setOpenMessage(true);
            // setType('ERROR');
            // setMessage('User already exist');
        // } 
    }
    const handleClose = () => {
        setOpen(false);
        reset();
    }
    const title='Login to your Shoppy Account'
    const content = () => {
        return(
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <TextField
                        variant="outlined"
                        label="Email ID"
                        size="small"
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
                    <TextField
                        variant="outlined"
                        label="Password"
                        size="small"
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
                    <div className='formActions'>
                    <Button type='submit' variant='contained'>Login</Button>        
                </div>
                </form>
        )
    }

    return(
        <SimpleDialog open={open} handleClose={handleClose} title={title} content={content} />
    )
}