interface Props{
    loader: boolean
}

export default function Loader({loader}:Props){
    return(
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    )
}