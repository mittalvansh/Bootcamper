import React,{useState} from "react";
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faComputerMouse
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [showLinks, setShowLinks] = useState(false);
    return (
        <div className={styles.header}>
            <div className={styles.leftSide}>
                <span>
                    <FontAwesomeIcon icon={faComputerMouse} />
                </span>
                <h1>BootCamper</h1>
            </div>
            <div className={styles.rightSide}>
                <div 
                className={styles.links} 
                id={
                    showLinks ? styles.hidden : styles.show
                }>
                    <a className={styles.bootcamps}>Browse All Bootcamps</a>
                    <a className={styles.login}>SignUp</a>
                </div>
                <button onClick={
                    () => setShowLinks(!showLinks)
                }>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
        </div>
    );
};

export default Header;