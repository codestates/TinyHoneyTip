import '../styles/globals.css'
import '../styles/landing.css'
import '../styles/singlePost.css'


function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
