import Nav from '@/component/nav'
import styles from '@/styles/Events.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSwr from 'swr'

interface Props {
    events : [{
        id: number,
        title: string,
        description: string,
        category: string
    }]
}

export default function Events({ events }:Props){

    const [eventsData, setEventsData] = useState(events);
    const router= useRouter();

    const fetcher = async () => {
        const response = await (await fetch('http://localhost:4000/dashboard')).json()
        return response
    }

    const fetcherSports = async (filterText:string) => {
        const response = await (await fetch(`http://localhost:4000/events?category=${filterText}`)).json()
        setEventsData(response)  
        router.push(`/events?category=${filterText}`, undefined, { shallow: true })     
    }

    const {data, error, isLoading} = useSwr('dashboard', fetcher)
    if(isLoading){
        return (<h1>Loading</h1>)
    }
    if(error){
        return error.message
    }
    return(
      <div>
        <Nav headerName='Events'/>
         {
        data && 
            <div className={styles.userSide}>
                <p>Posts : {data.posts}</p>
                <p>Likes : {data.likes}</p>
                <p>Followers : {data.followers}</p>
                <p>Following : {data.following}</p>
                <div>
                    <label>Filter by : </label>
                    <select onChange={(event)=>fetcherSports(event.target.value)}>
                        <option value='food'>Food</option>
                        <option value='movie'>Movie</option>
                        <option value='sports'>Sports</option>
                    </select>
                </div>
            </div>
       }
        <section>
            <div className={styles.eventContainer}>
                <h1><em>Events:</em></h1>
                {
                    eventsData && eventsData.map((event)=>{
                        return(
                            <div key={event.id} className={styles.eventContent}>
                                <h1>{event.title} ({event.category})</h1>
                                <p>{event.description}</p>
                            </div>
                        )
                    })
                }
            </div>
      </section>
      </div>
    )
}

export async function getServerSideProps(context:any){
    const { query } = context;
    const { category } = query;
    if(category)
    {
    const response = await (await fetch(`http://localhost:4000/events?category=${category}`)).json();
    return {
        props: {
            events: response
        }
    }
    }
    const response = await (await fetch(`http://localhost:4000/events`)).json();
    return {
        props: {
            events: response
        }
    }
}