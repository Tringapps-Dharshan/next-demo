import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
// import Script from 'next/script'
import { useState } from 'react';
import SignUp from '@/component/signup';
import { Button } from '@mui/material';
import Login from '@/component/login';

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const handleLogin = () => {
    setOpen(true)
}
  return (
    <>
      <Head>
        <title>Dharshan.co</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Script
        //loadinng thirpartyscripts
      /> */}
      <main className={styles.main}>
        <header>
          <div>Shoppy.com</div>
          <div>
            <Button 
                onClick={handleLogin} 
                color='info'
                variant='outlined'
                style={{
                    textTransform: 'capitalize'
                }}>
                    SignUp
            </Button>
          </div>
        </header>
        <section>
          <h1>Welcome to <span className='shoppify'>Shoppy.com</span></h1>
          <div>
          <SignUp open={open} setOpen={setOpen}/>
          <div>
            If Already an User click,
            <span onClick={()=>setLogin(true)}> Login</span>
            <Login open={login} setOpen={setLogin} />
          </div>
          </div>
        </section>
      </main>
    </>
  )
}
