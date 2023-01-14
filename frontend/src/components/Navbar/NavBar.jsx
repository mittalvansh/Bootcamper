import React, {useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faComputerMouse
} from "@fortawesome/free-solid-svg-icons";
import Profile from "../../assets/Avatar.png";
import AuthContext from "../../context/Auth";

const Header = () => {
    const { user } = useContext(AuthContext);
    const [showLinks, setShowLinks] = useState(false);
    return (
        <div className={styles.header}>
            <div className={styles.leftSide}>
                <span>
                    <Link to='/'>
                        <FontAwesomeIcon icon={faComputerMouse} />
                    </Link>
                </span>
                <h1>BootCamper</h1>
            </div>
            <div className={styles.rightSide}>
                <div 
                className={styles.links} 
                id={
                    showLinks ? styles.hidden : styles.show
                }>
                    <Link to='/bootcamps' className={styles.bootcamps}>Browse All Bootcamps</Link>
                    {user.isAuthenticated ? (
                        <img src={Profile} alt="" />
                    ):(
                        <Link to='/signup' className={styles.login}>SignUp</Link>
                    )}
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