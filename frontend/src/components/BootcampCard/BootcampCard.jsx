import React from "react";
import styles from './BootcampCard.module.scss';
import {Link} from 'react-router-dom';

const BootcampCard = ({ bootcamp }) => {
    return (
        <div className={styles.card}>
            <img 
                src={bootcamp.photo}  
                alt=""
                width="360px"
                height="220px" 
            />
            <div className={styles.details}>
                <div className={styles.info}>
                    <div className={styles.name}>
                        <p>{bootcamp.name}</p>
                    </div>
                    <p className={styles.city}>
                        {bootcamp.location.city}
                    </p>
                    <p className={styles.career}>
                        {bootcamp.careers[0]}
                    </p>
                    <div>
                        <span className={styles.text}>Publisher : </span>
                        <span>{bootcamp.user.name}</span>
                    </div>
                </div>
                <div 
                    className={styles.link}
                    style={{
                        margin: "0.5rem 0",
                    }}
                >
                    <Link 
                        to={`/bootcamp-profile/${bootcamp._id}`}
                        style={{
                            "textDecoration":"none",
                            "color":"gray",
                            "fontSize":"1.2rem",
                        }}
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default BootcampCard;