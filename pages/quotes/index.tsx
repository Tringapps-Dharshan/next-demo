import Nav from "@/component/nav"
import styles from '@/styles/Quotes.module.css'

export interface QuotesType{
    id: number,
    quote: string,
    author: string
}

export interface Props {
    quotesData: [QuotesType]
}

export default function Quotes({quotesData}:Props){
    return(
        <div>
            <Nav headerName="Quotes"/>
            <section className={styles.quotesContainerDiv}>
                {
                    quotesData && quotesData.map((quotes:QuotesType)=>{
                        return(
                            <div key={quotes.id} className={styles.quotesContainer}>
                                <div className={styles.author}>{quotes.author}</div>
                                <div className={styles.quote}>{quotes.quote}</div>
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
}

export async function getServerSideProps(){
    const quotesData = await (await fetch('http://localhost:3000/api/quotes')).json();
    return{
        props: {
            quotesData: quotesData.data
        }
    }
}