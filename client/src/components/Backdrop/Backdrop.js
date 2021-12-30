import React from 'react';
import styles from './Backdrop.module.css'


const Backdrop =(props)=>{
    
    const CloseBackdrop = ()=>{
        props.setShowBackdrop(false)
    }
    
    return (
        <div>
            {props.show ? <div className={styles.Backdrop} onClick={CloseBackdrop}></div> : null}
        </div>
        )
}

export default Backdrop;