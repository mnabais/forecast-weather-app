// Components
import Link from 'next/link'

// Styles
import styles from '../styles/404.module.css'

export default function Custom404() {
    return (
        <div className={ styles.notFoundWrapper }>
            <h1 className={ styles.label } >404</h1>
            <p className={ styles.message }>We’re sorry - looks like that page is under the weather</p>
            <Link href="/">
                <a className={ styles.link }>Back to Home</a>
            </Link>
        </div>
    )
}
