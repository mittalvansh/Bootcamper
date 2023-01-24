import React, {useContext, useEffect, useState} from "react";
import Layout from "../../components/Layout/Layout";
import styles from './Profile.module.scss';
import Background from '../../assets/Background.jpg';
import Avatar from '../../assets/Avatar.png';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth";
import ProtectedRoute from "../../components/ProtectedRoute"

const btnStyle = {
    fontSize: "0.8rem",
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginBottom: "0.5rem",
}

const Profile = () => {
    const { user } = useContext(AuthContext);
    const data = user.userData;

    return (
        <ProtectedRoute>
            <Layout>
                <div className={styles.wrapper}>
                    <img 
                        src={Background} 
                        alt=""
                    />
                    <p className={styles.role}>
                        {data && data.role}
                    </p>
                    <div className={styles.details}>
                        <img src={Avatar} alt="" />
                        <p className={styles.name}>
                            {data && data.name}
                        </p>
                        <div className={styles.items}>
                            <span className={styles.text}>Email : </span>
                            <span>
                                {data && data.email}
                            </span>
                        </div>
                        <div className={styles.items}>
                            <span className={styles.text}>Member Since : </span>
                            <span>
                                {data && data.createdAt.slice(0, 10)}
                            </span>
                        </div>
                        {data && data.role === "publisher" &&
                            <div className={styles.btn}>
                                <Button 
                                    variant="contained" 
                                    type="submit"
                                    className={styles.bootcamp}
                                    sx={btnStyle}
                                >
                                    <Link to='/createbootcamp'>Create BootCamp</Link>
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </Layout>
        </ProtectedRoute>
    );
}

export default Profile;