import React from "react";
import styles from "./ReviewCard.module.scss";

const ReviewCard = ({ review }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.review}>
        <p className={styles.title}>{review.title}</p>
      </div>
      <div className={styles.details}>
        <div className={styles.rating}>
          <span className={styles.text}>Rating : </span>
          <span className={styles.count}>{review.rating}</span>
        </div>
        <p className={styles.description}>{review.text}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
