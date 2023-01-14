import React from "react";
import styles from './BootcampCard.module.scss';
import Img from '../../assets/Demo.png';

const BootcampCard = ({ bootcamp }) => {
    return (
        <div className={styles.card}>
            <img 
                src={Img}  
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
                        <span>John Doe</span>
                    </div>
                </div>
                <div className={styles.links}>
                    <a className={styles.profile}>
                        <span className={styles.txt}>View Profile</span>
                    </a>
                </div>
            </div>
        </div>
    )
};

export default BootcampCard;