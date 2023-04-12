import router from "next/router"

interface Props{
    page: string
}

export default function GoBack(props:Props){
    return(
        <div className={'goBackButtonContainer'}>
            <button 
                className={'goBackButton'}
                title="Go Back"
                onClick={()=>{
                router.push(`/${props.page}`)
            }}>&#8592;</button>
        </div>
    )
}