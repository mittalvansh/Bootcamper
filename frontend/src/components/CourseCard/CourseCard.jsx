import React, { useContext, useState } from "react";
import axios from "axios";
import styles from "./CourseCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faSpinner } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const CourseCard = ({ course, bootcamp }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function notify(message) {
    toast(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      progress: undefined,
    });
  }

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(
        `https://bootcamper-6rl5.onrender.com/api/v1/courses/${course._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        }
      );
      notify("Course Deleted Successfully!");
      setIsLoading(false);

      setTimeout(() => {
        navigate("/bootcamps");
      }, 3500);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

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
                <FontAwesomeIcon icon={faCheck} color="green" />
              </span>
            )}
            {course.scholarshipAvailable == false && (
              <span>
                <FontAwesomeIcon icon={faClose} color="red" />
              </span>
            )}
          </div>
          {user.userData && user.userData._id == bootcamp.user && (
            <div>
              <Button
                color="secondary"
                variant="outlined"
                sx={{
                  marginTop: "1rem",
                  minWidth: "10rem",
                }}
              >
                {isLoading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    style={{
                      fontSize: "1.5rem",
                    }}
                    spin
                  />
                ) : (
                  <span onClick={handleDelete}>Delete Course</span>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
