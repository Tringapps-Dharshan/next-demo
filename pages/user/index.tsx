import styles from '@/styles/User.module.css'
import Nav from '../../component/nav'
import UserDetails from '@/component/userDetails'

interface Props{
    users: [{
        id: number,
        name: string,
        email: string,
        address: {
            street: string,
            city: string,
            zipcode: string,
        },
        phone: string,
        website: string,
        company: {
            name: string
        }
    }]
}
export default function User({users}:Props){
    return (
        <div>
            <Nav headerName='Users Profile'/>
            <section className={styles.section}>
                <div className={styles.displayUser}>
                {
                users && users.map(userData=>{
                    return(
                        <UserDetails key={userData.id} userData={userData}/>
                    )
                })
                }
                </div>
            </section>
        </div>
    )
}

export async function getStaticProps(){
    const response = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
    return {
        props: {
            // Comment out if fallback is true, blocking
            users: response.slice(0, 5)

            //else comment out this
            // users: response
        }
    }
}