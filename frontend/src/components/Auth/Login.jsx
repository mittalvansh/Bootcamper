import React, { useState, useContext } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Stack, TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "../../context/Auth";
import { motion } from "framer-motion";

const TextFieldStyle = {
  width: "100%",
};

const btnStyle = {
  width: "100%",
  fontSize: "1rem",
  fontWeight: "bold",
  fontFamily: "Poppins",
  marginBottom: "0.5rem",
  marginTop: "1.5rem",
  backgroundColor: "#6741C7",

  color: "white",
  "&:hover": {
    backgroundColor: "#6741C7",
  },
};

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup
    .object({
      email: yup.string().required("Email is required"),
      password: yup.string().required("Password is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  function notify(message) {
    toast(message, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      progress: undefined,
    });
  }

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      notify("Logged in successfully!");
      setUser({
        isAuthenticated: true,
        token: `Bearer ${response.data.token}`,
        userData: response.data.data,
      });
      await window.localStorage.setItem(
        "token",
        `Bearer ${response.data.token}`
      );
      setTimeout(() => {
        setIsLoading(false);
        navigate("/bootcamps");
      }, 3500);
    } catch (error) {
      setIsLoading(false);
      notify(error.response.data.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100, transtion: { duration: 0.3 } }}
    >
      <ToastContainer
        toastStyle={{ backgroundColor: "#262626", color: "#fff" }}
      />
      <div className={styles.container}>
        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Bootcamper</h1>
            <Stack spacing={4}>
              <Stack direction="column" spacing={2}>
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  sx={TextFieldStyle}
                  {...register("email")}
                />
                <TextField
                  type="password"
                  label="Password"
                  name="password"
                  sx={TextFieldStyle}
                  {...register("password")}
                />
              </Stack>
            </Stack>
            <Button variant="contained" type="submit" sx={btnStyle}>
              {isLoading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  style={{
                    fontSize: "1.5rem",
                  }}
                  spin
                />
              ) : (
                "Login"
              )}
            </Button>
            <div className={styles.link}>
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
            {errors.email?.message || errors.password?.message ? (
              <p className={styles.error}>Please fill all the fields.</p>
            ) : null}
          </form>
        </div>
        <div className={styles.image}></div>
      </div>
    </motion.div>
  );
};

export default Login;
