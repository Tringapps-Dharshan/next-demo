import GoBack from "@/component/goBack";
import Nav from "@/component/nav";
import { Product } from "..";

interface Props {
    product: Product
}

export default function productDetails({product}:Props){
  
    return(
        <div>
            <Nav headerName="Products"/>
            <section>
                <GoBack page='products'/>
                <p>{product.brand}</p>
                <p>{product.description}</p>
                <p>{product.title}</p>
                <p>{product.discountPercentage}</p>
                <p>{product.price}</p>
                <p>{product.stock}</p>
                <p>{product.rating}</p>
            </section>
        </div>
    )  
}

export async function getStaticPaths(){
    const productsData = await (await fetch('http://localhost:4000/products')).json();
    const paths = productsData.map((product:any)=>{
        return {
            params: {
                productId: `${product.id}`
            }
        }
    })
    return {
        // Check if the fallback is false
        paths,
        fallback: false

        // Check if the fallback is true
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
        // fallback: true


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
    const product = await (await fetch(`http://localhost:4000/products/${params.productId}`)).json();
    //Below if statement is enable when the fallback is true, blocking in getStaticProps and the user with the id is not matched 
    if(!product.id){
        return {
            notFound: true
        }
    }
    return {
        props: {
            product: product
        },
        revalidate: 10,
    }
}