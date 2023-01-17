import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faComputerMouse
} from "@fortawesome/free-solid-svg-icons";
import Profile from "../../assets/Avatar.png";
import AuthContext from "../../context/Auth";
import { Drawer, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material";

const Btn = styled(Button)`
    font-size: 1rem;
    font-weight: 600;
    font-family: Poppins;
    margin-bottom: 0.5rem;
    background-color: #262626;
    color: white;
    &:hover{
        background-color: #000;
    }

    a{
        text-decoration: none;
        color: white;
    }
`

const Section = styled(Box)`
    margin-bottom: 0.5rem;

    a{
        text-decoration: none;
        color: #262626;
        text-decoration: underline;
        font-size: 1.2rem;
        font-weight: 600;
        font-family: Poppins;
    }
`

const Header = () => {
    const { user } = useContext(AuthContext);
    const [showLinks, setShowLinks] = useState(false);
    const [isDrawer, setIsDrawer] = useState(false);
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
                        <img src={Profile} alt="" onClick={() => setIsDrawer(true)}/>
                    ):(
                        <Link to='/signup' className={styles.login}>SignUp</Link>
                    )}
                    <Drawer
                        anchor="top"
                        open={isDrawer}
                        onClose={() => setIsDrawer(false)}
                    >
                        <Box p={2} height='160px' textAlign='center' role='presentation'>
                            <Typography variant="h6" component='div' className={styles.drawer}>
                                <Section className={styles.items}>
                                    <Link to='/profile'>My Profile</Link>
                                </Section>
                                <Section className={styles.items}>
                                    <Link to='/bootcamps'>Browse All Bootcamps</Link>
                                </Section>
                                <Btn 
                                    variant="contained" 
                                    type="submit"
                                >
                                    <Link 
                                        to='/login' 
                                        onClick={() => {
                                            window.localStorage.removeItem("token");
                                        }}
                                    >   
                                        Logout
                                    </Link>
                                </Btn>
                            </Typography>
                        </Box>
                    </Drawer>
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