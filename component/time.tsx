export default function Time(){
    const date = new Date();
    return <p>&#169; Copyrights reserved ({date.getFullYear()-1} - {date.getFullYear()})</p>;
}