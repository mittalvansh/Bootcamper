import React, { useState, useEffect, useContext } from "react";
import styles from "./BootcampProfile.module.scss";
import Layout from "../../components/Layout/Layout";
import CourseCard from "../../components/CourseCard/CourseCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faPen,
  faComments,
  faGlobe,
  faCheck,
  faClose,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import AuthContext from "../../context/Auth";
import FileUpload from "../../components/FileUpload/FileUpload";

const btnStyle = {
  width: "100%",
  fontSize: "1rem",
  fontWeight: "bold",
  fontFamily: "Poppins",
  backgroundColor: "#262626",
  color: "white",
  "&:hover": {
    backgroundColor: "#262626",
  },
};

const BootcampProfile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [bootcamp, setBootcamp] = useState({});
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isOpen, setIsOpen] = useState({
    readReview: false,
    writeReview: false,
    addCourse: false,
  });
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState({
    addCourse: "",
    writeReview: "",
  });
  const [description, setDescription] = useState({
    addCourse: "",
    writeReview: "",
  });
  const [weeks, setWeeks] = useState("");
  const [price, setPrice] = useState("");
  const [minimumSkill, setMinimumSkill] = useState("");
  const [scholarshipAvailable, setScholarshipAvailable] = useState(null);
  const [isLoading, setIsLoading] = useState({
    page: false,
    review: false,
    delete: false,
    addCourse: false,
    addfile: false,
  });
  const [file, setFile] = useState(null);
  const [enroll, setEnroll] = useState(false);
  const navigate = useNavigate();

  const getBootcamp = () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${id}`)
      .then((res) => {
        setIsLoading({ ...isLoading, page: false });
        setBootcamp(res.data.data);
      })
      .catch((err) => {
        setIsLoading({ ...isLoading, page: false });
        console.log(err);
      });
  };

  const getCourses = () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${id}/courses`)
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReviews = () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${id}/reviews`)
      .then((response) => {
        setReviews(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function notify(message) {
    toast(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      progress: undefined,
    });
  }

  const handleDelete = async () => {
    setIsLoading({
      ...isLoading,
      delete: true,
    });
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        }
      );
      if (response.status === 200) {
        setIsLoading({
          ...isLoading,
          delete: false,
        });
        notify("Bootcamp deleted successfully");
      }
      setTimeout(() => {
        navigate("/bootcamps");
      }, 3000);
    } catch (error) {
      setIsLoading({
        ...isLoading,
        delete: false,
      });
      notify("Something went wrong");
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    setIsLoading({
      ...isLoading,
      review: true,
    });

    const data = {
      title: title.writeReview,
      text: description.writeReview,
      rating: rating,
    };

    if (!rating || !title || !description.writeReview) {
      setIsLoading({ ...isLoading, review: false });
      toast.error("Please fill all the fields");
      return;
    } else if (user.userData.role !== "user") {
      setIsLoading({ ...isLoading, review: false });
      toast.error("Only users can add reviews");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${id}/reviews`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        }
      );
      if (response.status === 201) {
        setIsLoading({
          ...isLoading,
          review: false,
        });
        notify("Review added successfully");
      }
      setTimeout(() => {
        navigate("/bootcamps");
      }, 3000);
    } catch (error) {
      setIsLoading({
        ...isLoading,
        review: false,
      });
      notify("Something went wrong");
    }
  };

  const handleCourse = async (e) => {
    e.preventDefault();
    setIsLoading({
      ...isLoading,
      addCourse: true,
    });

    const data = {
      title: title.addCourse,
      description: description.addCourse,
      weeks: weeks,
      tuition: price,
      minimumSkill: minimumSkill,
      scholarshipAvailable: scholarshipAvailable,
    };

    if (
      !title.addCourse ||
      !description.addCourse ||
      !weeks ||
      !price ||
      !minimumSkill ||
      !scholarshipAvailable
    ) {
      setIsLoading({ ...isLoading, addCourse: false });
      toast.error("Please fill all the fields");
      return;
    }

    if (user.userData && bootcamp.user !== user.userData._id) {
      setIsLoading({ ...isLoading, addCourse: false });
      toast.error("You are not authorized to add courses to this bootcamp");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${id}/courses`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        }
      );
      if (response.status === 201) {
        setIsLoading({
          ...isLoading,
          addCourse: false,
        });
        notify("Course added successfully");
      }
      setTimeout(() => {
        navigate("/bootcamps");
      }, 3000);
    } catch (error) {
      setIsLoading({
        ...isLoading,
        addCourse: false,
      });
      notify("Something went wrong");
    }
  };

  const handleFile = async () => {
    setIsLoading({
      ...isLoading,
      addfile: true,
    });

    const formData = new FormData();
    formData.append("file", file);

    if (!file) {
      setIsLoading({ ...isLoading, addfile: false });
      toast.error("Please select a file");
      return;
    }

    if (user.userData && bootcamp.user !== user.userData._id) {
      setIsLoading({ ...isLoading, addfile: false });
      toast.error("You are not authorized to add files to this bootcamp");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${id}/photo`,
        formData,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      if (response.status === 200) {
        setIsLoading({
          ...isLoading,
          addfile: false,
        });
        notify("File uploaded successfully");
      }
      setTimeout(() => {
        navigate("/bootcamps");
      }, 3000);
    } catch (error) {
      setIsLoading({
        ...isLoading,
        addfile: false,
      });
      notify("Something went wrong");
    }
  };

  const handleEnroll = async () => {
    if (user.userData.role !== "user") {
      setIsLoading({ ...isLoading, enroll: false });
      toast.error("Only users can enroll in courses");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${id}/enroll`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          notify("Enrolled successfully");
          setEnroll(true);
        }
      });
  };

  const checkEnroll = async () => {
    axios
      .get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${id}/checkenroll`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      )
      .then((response) => {
        if (response.data.data === true) {
          setEnroll(true);
        }
      });
  };

  useEffect(() => {
    setIsLoading({
      ...isLoading,
      page: true,
    });
    getBootcamp();
    getCourses();
    getReviews();
  }, []);

  useEffect(() => {
    checkEnroll();
  }, [user]);

  return (
    <>
      <ToastContainer
        toastStyle={{ backgroundColor: "#262626", color: "#fff" }}
      />
      <Layout>
        {isLoading.page ? (
          <div className={styles.spinner}>
            <FontAwesomeIcon icon={faSpinner} spin className={styles.loader} />
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.bootcampDetails}>
              <p>{bootcamp.name}</p>
              <p className={styles.description}>{bootcamp.description}</p>
              {courses.length === 0 ? (
                <div className={styles.noCourses}>
                  <p>No courses available</p>
                </div>
              ) : (
                <>
                  <div className={styles.averageCost}>
                    <span className={styles.text}>Average Course Cost : </span>
                    <span className={styles.cost}>{bootcamp.averageCost}</span>
                  </div>
                  <div
                    className={styles.averageRating}
                    {...(user.userData &&
                      user.userData.role !== "user" && {
                        style: {
                          marginBottom: "4rem",
                        },
                      })}
                  >
                    <span className={styles.ratingText}>Rating : </span>
                    <span className={styles.ratingValue}>
                      {bootcamp.averageRating}
                    </span>
                  </div>
                  {user.userData && user.userData.role === "user" && (
                    <Button
                      variant="outlined"
                      style={{
                        margin: "1rem 0",
                      }}
                      onClick={handleEnroll}
                      {...(enroll && { disabled: true })}
                    >
                      {enroll ? "Enrolled" : "Enroll"}
                    </Button>
                  )}
                  {courses.map((course) => {
                    return (
                      <CourseCard
                        course={course}
                        bootcamp={bootcamp}
                        key={course._id}
                      />
                    );
                  })}
                </>
              )}
              {user.userData && user.userData._id === bootcamp.user && (
                <div>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={btnStyle}
                    style={{
                      margin: "1rem 0",
                    }}
                    onClick={() => {
                      setIsOpen({
                        ...isOpen,
                        addCourse: true,
                      });
                    }}
                  >
                    <span className={styles.icon}>
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span>Add Course</span>
                  </Button>
                </div>
              )}
              <Dialog
                open={isOpen.addCourse}
                onClose={() => {
                  setIsOpen({
                    ...isOpen,
                    addCourse: false,
                  });
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Add Course"}
                </DialogTitle>
                <DialogContent>
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "1rem",
                      gap: "1rem",
                    }}
                    onSubmit={handleCourse}
                  >
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <input
                        value={title.addCourse}
                        onChange={(e) => {
                          setTitle({
                            ...title,
                            addCourse: e.target.value,
                          });
                        }}
                        type="text"
                        name="title"
                        placeholder="Title"
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          padding: "0.5rem",
                        }}
                      />
                    </div>
                    <div>
                      <textarea
                        value={description.addCourse}
                        onChange={(e) => {
                          setDescription({
                            ...description,
                            addCourse: e.target.value,
                          });
                        }}
                        name="description"
                        spellCheck="false"
                        cols="40"
                        rows="10"
                        placeholder="Description"
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          padding: "0.5rem",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <input
                        value={weeks}
                        onChange={(e) => {
                          setWeeks(e.target.value);
                        }}
                        type="text"
                        name="weeks"
                        placeholder="Weeks"
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          padding: "0.5rem",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <input
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        type="text"
                        name="tuition"
                        placeholder="Tuition"
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          padding: "0.5rem",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <FormLabel>Scholarship Available</FormLabel>
                      <RadioGroup
                        value={scholarshipAvailable}
                        onChange={(e) => {
                          setScholarshipAvailable(e.target.value);
                        }}
                        row
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <div
                        style={{
                          width: "100%",
                        }}
                      >
                        <FormLabel>Minimum Skill</FormLabel>
                        <RadioGroup
                          value={minimumSkill}
                          onChange={(e) => {
                            setMinimumSkill(e.target.value);
                          }}
                          row
                        >
                          <FormControlLabel
                            value="beginner"
                            control={<Radio />}
                            label="Beginner"
                          />
                          <FormControlLabel
                            value="intermediate"
                            control={<Radio />}
                            label="Intermediate"
                          />
                          <FormControlLabel
                            value="advanced"
                            control={<Radio />}
                            label="Advanced"
                          />
                        </RadioGroup>
                      </div>
                    </div>
                    <Button variant="contained" sx={btnStyle} type="submit">
                      {isLoading.addCourse ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          spin
                          style={{
                            fontSize: "1.5rem",
                          }}
                        />
                      ) : (
                        "Add Course"
                      )}
                    </Button>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setIsOpen({
                        ...isOpen,
                        addCourse: false,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className={styles.otherDetails}>
              <div className={styles.bootcampImage}>
                {bootcamp.photo ? (
                  <img src={bootcamp.photo} alt="" />
                ) : (
                  <FileUpload file={file} setFile={setFile} />
                )}
              </div>
              {!bootcamp.photo && (
                <Button
                  variant="contained"
                  style={{
                    margin: "1rem 0 0.5rem 0",
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #000",
                    width: "45%",
                    height: "auto",
                  }}
                  onClick={() => {
                    handleFile();
                  }}
                >
                  {isLoading.addfile ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      style={{
                        fontSize: "1.5rem",
                      }}
                      spin
                    />
                  ) : (
                    "Upload Photo"
                  )}
                </Button>
              )}
              {reviews.length !== 0 && (
                <>
                  <Button
                    variant="contained"
                    sx={btnStyle}
                    onClick={() => {
                      setIsOpen({
                        ...isOpen,
                        readReview: true,
                      });
                    }}
                    style={{
                      margin: "1rem 0 0.5rem 0",
                    }}
                  >
                    <span>
                      <FontAwesomeIcon
                        icon={faComments}
                        style={{
                          marginRight: "0.5rem",
                        }}
                      />
                    </span>
                    <span>Read Reviews</span>
                  </Button>
                  <Dialog
                    open={isOpen.readReview}
                    onClose={() => {
                      setIsOpen({
                        ...isOpen,
                        readReview: false,
                      });
                    }}
                    aria-labelledby="dialog-title"
                    aria-describedby="dialog-description"
                  >
                    <DialogTitle id="dialog-title">
                      Bootcamp Reviews
                    </DialogTitle>
                    <DialogContent>
                      {reviews.map((review) => {
                        return <ReviewCard review={review} key={review._id} />;
                      })}
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => {
                          setIsOpen({
                            ...isOpen,
                            readReview: false,
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )}
              {user.userData && user.userData.role === "user" && (
                <div
                  className={styles.review}
                  onClick={() => {
                    setIsOpen({
                      ...isOpen,
                      writeReview: true,
                    });
                  }}
                >
                  <span className={styles.icon}>
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{
                        marginRight: "0.5rem",
                      }}
                    />
                  </span>
                  <span className={styles.text}>Write a Review</span>
                </div>
              )}
              <Dialog
                open={isOpen.writeReview}
                onClose={() => {
                  setIsOpen({
                    ...isOpen,
                    writeReview: false,
                  });
                }}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
              >
                <DialogTitle id="dialog-title">Write a Review</DialogTitle>
                <DialogContent>
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "1rem",
                      gap: "1rem",
                    }}
                    onSubmit={handleReview}
                  >
                    <div
                      className={styles.rating}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        width: "100%",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                          }}
                        >
                          Rating :{" "}
                        </span>
                        <span
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "#5A5A5A",
                          }}
                        >
                          {rating}
                        </span>
                      </div>
                      <input
                        value={rating}
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                        type="range"
                        name="rating"
                        min="1"
                        max="10"
                        step="1"
                      />
                    </div>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <input
                        value={title.writeReview}
                        onChange={(e) => {
                          setTitle({
                            ...title,
                            writeReview: e.target.value,
                          });
                        }}
                        type="text"
                        name="title"
                        placeholder="Review Title"
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          padding: "0.5rem",
                        }}
                      />
                    </div>
                    <div>
                      <textarea
                        value={description.writeReview}
                        onChange={(e) => {
                          setDescription({
                            ...description,
                            writeReview: e.target.value,
                          });
                        }}
                        name="review"
                        spellCheck="false"
                        cols="40"
                        rows="10"
                        placeholder="Your Review"
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          padding: "0.5rem",
                        }}
                      />
                    </div>
                    <Button variant="contained" sx={btnStyle} type="submit">
                      {isLoading.review ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      ) : (
                        "Submit Review"
                      )}
                    </Button>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setIsOpen({
                        ...isOpen,
                        writeReview: false,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              <div className={styles.website}>
                <a
                  href={bootcamp.website}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faGlobe}
                    style={{
                      marginRight: "0.5rem",
                      color: "#fff",
                    }}
                  />
                  <span className={styles.text}>View Website</span>
                </a>
              </div>
              <div className={styles.otherdetails}>
                <div className={styles.detail}>
                  <span className={styles.text}>Housing : </span>
                  {bootcamp.housing ? (
                    <span>
                      <FontAwesomeIcon icon={faCheck} color="green" />
                    </span>
                  ) : (
                    <span>
                      <FontAwesomeIcon icon={faClose} color="red" />
                    </span>
                  )}
                </div>
                <div className={styles.detail}>
                  <span>Job Assistance : </span>
                  {bootcamp.jobAssistance ? (
                    <span>
                      <FontAwesomeIcon icon={faCheck} color="green" />
                    </span>
                  ) : (
                    <span>
                      <FontAwesomeIcon icon={faClose} color="red" />
                    </span>
                  )}
                </div>
                <div className={styles.detail}>
                  <span>Job Guarantee : </span>
                  {bootcamp.jobGuarantee ? (
                    <span>
                      <FontAwesomeIcon icon={faCheck} color="green" />
                    </span>
                  ) : (
                    <span>
                      <FontAwesomeIcon icon={faClose} color="red" />
                    </span>
                  )}
                </div>
                <div className={styles.detail}>
                  <span>Accepts Gi Bill : </span>
                  {bootcamp.acceptGi ? (
                    <span>
                      <FontAwesomeIcon icon={faCheck} color="green" />
                    </span>
                  ) : (
                    <span>
                      <FontAwesomeIcon icon={faClose} color="red" />
                    </span>
                  )}
                </div>
              </div>
              {user.userData && bootcamp.user === user.userData._id && (
                <Button
                  variant="contained"
                  sx={btnStyle}
                  type="submit"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  {isLoading.delete ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      style={{
                        fontSize: "1.5rem",
                      }}
                      spin
                    />
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          marginRight: "0.5rem",
                        }}
                      />
                      <span>Delete Bootcamp</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default BootcampProfile;
