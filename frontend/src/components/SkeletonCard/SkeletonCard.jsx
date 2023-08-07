import React from "react";
import styles from "./SkeletonCard.module.scss";
import { Skeleton } from "@mui/material";

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.imageSkeleton}>
        <Skeleton
          variant="rectangular"
          width={360}
          height={220}
          animation="wave"
        />
      </div>
      <div className={styles.textSkeleton}>
        <Skeleton animation="wave" width={250} height={50} />
        <Skeleton animation="wave" height={30} />
        <Skeleton animation="wave" height={30} />
        <Skeleton animation="wave" height={30} />
      </div>
    </div>
  );
}

export default SkeletonCard;
