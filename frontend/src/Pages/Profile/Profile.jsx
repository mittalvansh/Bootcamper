import React from "react";
import Layout from "../../components/Layout/Layout";
import styles from './Profile.module.scss';
import Background from '../../assets/Background.jpg';
import Avatar from '../../assets/Avatar.png';
import { Button } from "@mui/material";

const btnStyle = {
    fontSize: "0.8rem",
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginBottom: "0.5rem",
}

const Profile = () => {
    return (
        <>
            <Layout>
                <div className={styles.wrapper}>
                    <img 
                        src={Background} 
                        alt=""
                    />
                    <p className={styles.role}>
                        Publisher
                    </p>
                    <div className={styles.details}>
                        <img src={Avatar} alt="" />
                        <p className={styles.name}>Vansh Mittal</p>

                        <div className={styles.items}>
                            <span className={styles.text}>Email : </span>
                            <span>mittalvansh69@gmail.com</span>
                        </div>
                        <div className={styles.items}>
                            <span className={styles.text}>Member Since : </span>
                            <span>Tue Jan 10 2023</span>
                        </div>
                        <div className={styles.btn}>
                            <Button 
                                variant="contained" 
                                type="submit"
                                className={styles.bootcamp}
                                sx={btnStyle}
                            >
                                Create BootCamp
                            </Button>
                            <Button 
                                variant="contained" 
                                type="submit"
                                sx={btnStyle}
                                className={styles.profile}
                            >
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Profile;