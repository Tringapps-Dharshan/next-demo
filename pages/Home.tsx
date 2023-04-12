import Nav from "@/component/nav";

interface User{
    emailId: string,
    userName: string
}

export default function Home(){
        
    return(
        <>
        <Nav headerName={'data'}/>
        <h1>Welcome to <span>Shoppy</span></h1>
        </>
    )
}