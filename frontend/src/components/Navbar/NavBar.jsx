import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faComputerMouse,
    faRightFromBracket,
    faUser,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Profile from "../../assets/Avatar.png";
import AuthContext from "../../context/Auth";
import { Menu, MenuItem, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material";

const Header = () => {
    const { user } = useContext(AuthContext);
    const [showLinks, setShowLinks] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

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
                        <img 
                            src={Profile} 
                            alt=""
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        />
                    ):(
                        <Link 
                            to='/signup' 
                            className={styles.login}
                            id = 'resources-button'
                        >
                            SignUp
                        </Link>
                    )}
                    <Menu
                        id="resources-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                        MenuListProps={{
                            'aria-labelledby': 'resources-button',
                        }}
                    >
                        <MenuItem>
                            <Link 
                                to='/profile'
                                style={{
                                    textDecoration: 'none',
                                    color: '#262626',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    fontFamily: 'Poppins',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faUser}
                                    style={{
                                        marginRight: '0.5rem',
                                    }}
                                />
                                My Profile
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link 
                                to='/bootcamps'
                                style={{
                                    textDecoration: 'none',
                                    color: '#262626',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    fontFamily: 'Poppins',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    style={{
                                        marginRight: '0.5rem',
                                    }}
                                />
                                Browse All Bootcamps
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                to='/login'
                                onClick={() => {
                                    window.localStorage.removeItem("token");
                                }}
                                style={{
                                    textDecoration: 'none',
                                    color: '#5A5A5A',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    fontFamily: 'Poppins',
                                }}
                            >
                                <FontAwesomeIcon 
                                    icon={faRightFromBracket} 
                                    style={{
                                        marginRight: '0.5rem',
                                    }}
                                />
                                Logout
                            </Link>
                        </MenuItem>
                    </Menu>
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