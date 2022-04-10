import React from 'react';
import Image from "next/image";

// Styles
import styles from '../../styles/Loader.module.css'

export default function Loader() {
    return(
        <div  className={ styles.loadingWrapper }>
            <div className={styles.ldsDualRing}/>
            <p>It will be sunny unless it rains</p>
        </div>
    )
}
