import Nav from '@/component/nav'
import styles from '@/styles/Product.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export interface Product{
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: [string]
}

interface Props{
    products: [Product]
}

interface Category {
    category: string
}

export default function Products({products}:Props){
const router = useRouter();
const [selectedValue, setSelectedValue] = useState<string>('All Products');
const renderData = (productData:Product) => {   
    return(
        <div key={productData.id} className={styles.productCart} onClick={()=>handleClick(productData.id)}>
            <Image
                src={productData.images[0]}
                width={200}
                height={150}
                alt={productData.brand}
                className={styles.productCartImage}
            />
            <p>{productData.brand} / {productData.category}</p>
            <p>Rps: {productData.price}/-</p>
        </div>
    )
}
const handleClick = (productId:number) => {
    router.replace(`/products/${productId}`)
}
    let categories:any = {};
    products.forEach( ( product ) => {
    if ( categories.hasOwnProperty( product.category ) ) {
        categories[product.category]++;
    } else {
        categories[product.category] = 1;
    }
    } );
    categories = Object.keys( categories ).map( ( key ) => { 
        return { 'category': key }
    } );

    return(
        <div>
            <Nav headerName='Users Profile'/>
            <div className={styles.filterBy}>
                <div className={styles.selectedValue}>
                    {selectedValue}
                </div>
                <div>
                    <label>FilterBy : </label>
                    <select onChange={(event)=>setSelectedValue(event.target.value)}>
                        <option value='All Products'>All Products</option>
                        {
                            categories && categories?.map((data:Category)=>{
                                return(
                                    <option key={data.category} value={data.category}>{data.category}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <section className={styles.productConatiner}>
            <>
                {
                    selectedValue==='All Products' && products && products.map((productData)=>{
                        return renderData(productData)
                    })
                }
                {
                    selectedValue !== 'All Products' && products.map((productData:Product)=>{
                        return productData.category===selectedValue && (
                            renderData(productData)
                        )
                    })
                }
            </>
            </section>
        </div>
    )
}

export async function getStaticProps(){
    const response = await (await fetch('http://localhost:4000/products')).json();
    return {
        props: {
            // Comment out if fallback is true, blocking
            products: response

            //else comment out this
            // users: response
        }
    }
}