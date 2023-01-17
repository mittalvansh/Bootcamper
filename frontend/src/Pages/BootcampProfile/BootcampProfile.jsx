import React,{useState, useEffect} from "react";
import styles from './BootcampProfile.module.scss';
import Layout from "../../components/Layout/Layout";
import Image from "../../assets/Demo.png";
import CourseCard from "../../components/CourseCard/CourseCard";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner,faPen } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Button } from '@mui/material';

const btnStyle = {
    width: "100%",
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginBottom: "0.5rem",
    marginTop: "1.5rem",
    backgroundColor: "#262626",

    color: "white",
    "&:hover": {
        backgroundColor: "#000",
    }
}


const BootcampProfile = () => {
    const { id } = useParams();
    const[bootcamp, setBootcamp] = useState({});
    const[courses, setCourses] = useState([]);
    const[isLoading, setIsLoading] = useState(false);

    const getBootcamp = () => {
        axios
            .get(
                `https://bootcamper-6rl5.onrender.com/api/v1/bootcamps/${id}`
            )
            .then((res) => {
                setIsLoading(false);
                setBootcamp(res.data.data);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    }

    const getCourses = () => {
        axios
            .get(
                `https://bootcamper-6rl5.onrender.com/api/v1/bootcamps/${id}/courses`
            )
            .then((res) => {
                setCourses(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        setIsLoading(true);
        getBootcamp();
        getCourses();
    },[]);

    return (
        <>
        <Layout>
            {isLoading ? (
                <div className={styles.spinner}>
                    <FontAwesomeIcon icon={faSpinner} spin className={styles.loader}/>
                </div>
            ):(
                <div className={styles.container}>
                    <div className={styles.bootcampDetails}>
                        <p>{bootcamp.name}</p>
                        <p className={styles.description}>{bootcamp.description}</p>
                        <div className={styles.averageCost}>
                            <span className={styles.text}>Average Course Cost : </span>
                            <span className={styles.cost}>{bootcamp.averageCost}</span>
                        </div>
                        <div className={styles.averageRating}>
                            <span className={styles.ratingText}>Rating : </span>
                            <span className={styles.ratingValue}>{bootcamp.averageRating}</span>
                        </div>
                        {courses.map((course) => {
                            return <CourseCard course={course} key={course._id}/>;
                        })}
                    </div>
                    <div className={styles.otherDetails}>
                        <div className={styles.bootcampImage}>
                            <img src={Image} alt="" />
                        </div>
                        <Button 
                            variant="contained" 
                            type="submit"
                            sx={btnStyle}
                        >
                            Read Reviews
                        </Button>
                        <div className={styles.review}>
                            <span className={styles.icom}>
                                <FontAwesomeIcon icon={faPen} />
                            </span>
                            <span className={styles.text}>Write a Review</span>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
        </>
    )
}

export default BootcampProfile;