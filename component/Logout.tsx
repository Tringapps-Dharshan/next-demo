import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';


export default function Logout(){
    const router = useRouter();
    return(
        <IconButton color='primary' onClick={()=>{
            sessionStorage.removeItem('currentUser');
            router.push('/')
        }}>
            <LogoutIcon color='primary' fontSize='medium'/>
        </IconButton>
    )
}