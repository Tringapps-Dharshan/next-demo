import styles from '@/styles/User.module.css'
import { useRouter } from 'next/router'

export default function UserDetails({userData}:any){
    const router = useRouter();
    const handleClick = (id:string) => {
        // router.push(`/user/${id}`)
        router.replace(`/user/${id}`)
    }
    return(
            <div className={styles.users} onClick={()=>handleClick(userData.id)}>
                <h1>{userData.name},</h1>
                <p>{userData.email}</p>
            </div>
    )
}