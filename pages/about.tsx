import Nav from '../component/nav'
import styles from '@/styles/AboutUs.module.css'
// import { NextComponentType } from 'next'
export default function AboutUs(){
    return(
        <div>
            <Nav headerName='About Us'/>
            <section>
                <div className={styles.stanza}>
                    <h1>What is Lorem Ipsum?</h1><br/>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <div className={styles.stanza}>
                <h1>Why do we use it?</h1><br/>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </div>
            </section>
    </div>)
}
// AboutUs.getLayout = function PageLayout(page:any){
//     return(page);
// }