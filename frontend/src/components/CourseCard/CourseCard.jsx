import React from "react";
import styles from "./CourseCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";

const CourseCard = ({ course }) => {
    return (
        <div className={styles.card}>
            <div className={styles.course}>
                <p className={styles.name}>{course.title}</p>
            </div>
            <div className={styles.details}>
                <div className={styles.duration}>
                    <span className={styles.text}>Duration : </span>
                    <span className={styles.time}>{course.weeks} weeks</span>
                </div>
                <p className={styles.description}>{course.description}</p>
                <div className={styles.otherDetails}>
                    <div className={styles.detail}>
                        <span>Cost : </span>
                        <span>${course.tuition} USD</span>
                    </div>
                    <div className={styles.detail}>
                        <span>Skills Required : </span>
                        <span>{course.minimumSkill}</span>
                    </div>
                    <div className={styles.detail}>
                        <span>Scholarship Available : </span>
                        
                        {course.scholarshipAvailable == true && (
                            <span>
                                <FontAwesomeIcon icon={faCheck} color='green'/>
                            </span>
                        )}
                        {course.scholarshipAvailable == false && (
                            <span>
                                <FontAwesomeIcon icon={faClose} color='red'/>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;