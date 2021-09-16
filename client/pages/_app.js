import '../styles/globals.css';
import '../styles/Landing.css';
import '../styles/SinglePost.css';
import '../styles/Content.css';
import '../styles/NewPost.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
