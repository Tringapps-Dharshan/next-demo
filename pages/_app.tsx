import Footer from '@/component/footer'
import Nav from '@/component/nav'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { wrapper } from '@/Redux/Store'
export default function App({ Component, pageProps, ...rest }: AppProps) {
    // if(Component?.getLayout){
    //       return Component.getLayout(<Component {...pageProps} />); 
    // }
    const {store, props} = wrapper.useWrappedStore(rest)
    return(
    <Provider store={store}>
        <Component {...pageProps} />
        <Footer/>
    </Provider>
    )
}
