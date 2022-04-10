import type { AppProps } from 'next/app'

// Context
import { AppsProvider } from '../context/weatherContext';

// Styles
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppsProvider>
            <Component {...pageProps} />
        </AppsProvider>
    );
}

export default MyApp
