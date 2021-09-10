import '../styles/globals.css';
import '../styles/landing.css';
import '../styles/Content.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
