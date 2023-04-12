import { useRouter } from "next/router";
import Nav from "../../../component/nav";
import styles from '@/styles/User.module.css'
import Loader from "@/component/loading";
import GoBack from "@/component/goBack";

export default function UserDetails({user}:any){
    const router = useRouter();
    // comment-out if the fallback is true
    if(router.isFallback){
        return <Loader loader={router.isFallback}/>
    }
    return(
        <div>
            <Nav headerName={user.name}/>
            <section>
                <GoBack page='user'/>
                <div className={styles.userContainer}>
                    <h1 className={styles.userContainerHead}>{user.name}</h1>
                    <div className={styles.userContainerContent}>
                        <table>
                            <tr>
                                <td>Email ID </td>
                                <td>: {user.email.toLowerCase()}</td>
                            </tr>
                            <tr>
                                <td>Phone No </td>
                                <td>: {user.phone}</td>
                            </tr>
                            <tr>
                                <td>Address </td>
                                <td>: {user.address.street},<br/>{user.address.city},<br/>{user.address.zipcode}</td>
                            </tr>
                            <tr>
                                <td>Company </td>
                                <td>: {user.company?.name}</td>
                            </tr>
                            <tr>
                                <td>Website </td>
                                <td>
                                    : <a 
                                        href={user.website} 
                                        style={{
                                            color: 'papayawhip'
                                        }} 
                                        target={'_blank'}
                                        >
                                            {user.website}
                                        </a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                </section>
        </div>
    )
}

export async function getStaticPaths(){
    const usersData = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
    const paths = usersData.map((user:any)=>{
        return {
            params: {
                userId: `${user.id}`
            }
        }
    })
    return {
        // Check if the fallback is false
        // paths,
        // fallback: false

        // Check if the fallback is true
        paths:[
            {
                params: { userId: '1'},
            },
            {
                params: { userId: '2'},
            },
            {
                params: { userId: '3'},
            }
        ],
        fallback: true


        //Check if fallback is blocking
        // paths:[
        //     {
        //         params: { userId: '1'},
        //     },
        //     {
        //         params: { userId: '2'},
        //     },
        //     {
        //         params: { userId: '3'},
        //     }
        // ],
        // fallback: 'blocking',
    }
}

export async function getStaticProps(context:any){
    const {params} = context;
    const user = await (await fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`)).json();
    //Below if statement is enable when the fallback is true, blocking in getStaticProps and the user with the id is not matched 
    if(!user.id){
        return {
            notFound: true
        }
    }
    return {
        props: {
            user: user
        }
    }
}