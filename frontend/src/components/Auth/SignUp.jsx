import React from "react";
import styles from './SignUp.module.scss';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Stack, TextField, Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { ToastContainer, toast } from "react-toastify";

const TextFieldStyle = {
    width: "100%",
};

const btnStyle = {
    width: "100%",
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginBottom: "0.5rem",
    backgroundColor: "#6741C7",

    color: "white",
    "&:hover": {
        backgroundColor: "#6741C7",
    }
}

const SignUp = () => {
    const schema = yup
        .object({
            name: yup
                .string()
                .required("Username is required"),
            email: yup
                .string()
                .required("Email is required"),
            password: yup
                .string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters"),
            role: yup.string().required(),
        })
        .required();

    const { register, handleSubmit, formState: { errors },reset } = useForm({
        resolver: yupResolver(schema),
    });

    function notify(message) {
        toast(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            progress: undefined,
        });
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <ToastContainer toastStyle={{ backgroundColor: "#262626", color: "#fff" }}/>
            <div className={styles.container}>
                <div className={styles.image}></div>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Bootcamper</h1>
                        <Stack spacing={4}>
                            <Stack direction='column' spacing={2}>
                                <TextField 
                                    type="text"
                                    label="Username"
                                    name="name"
                                    sx = {TextFieldStyle}
                                    {...register("name")}
                                />
                                <TextField
                                    type="email"
                                    label="Email"
                                    name="email"
                                    sx = {TextFieldStyle}
                                    {...register("email")}
                                />
                                <TextField
                                    type="password"
                                    label="Password"
                                    name="password"
                                    sx = {TextFieldStyle}
                                    {...register("password")}
                                />
                                <div className={styles.roles}>
                                    <FormLabel 
                                        className={styles.radio}
                                    >
                                        Select Role
                                    </FormLabel>
                                    <RadioGroup row>
                                        <FormControlLabel
                                            {...register("role")}
                                            value="user"
                                            control={<Radio />}
                                            label="Student"
                                        />
                                        <FormControlLabel
                                            {...register("role")}
                                            value="publisher"
                                            control={<Radio />}
                                            label="Publisher"
                                        />
                                    </RadioGroup>
                                </div>
                            </Stack>
                        </Stack>
                        <Button 
                            variant="contained" 
                            type="submit"
                            sx={btnStyle}
                        >
                            Sign Up
                        </Button>

                        <div className={styles.link}>
                            <p>
                                Already have an account? <Link to="/login">Sign In</Link>
                            </p>
                        </div>

                        {((errors.name?.message) 
                            || (errors.email?.message) 
                            || (errors.password?.message) 
                            || (errors.role?.message)) ? (
                            <p className={styles.error}>Please fill all the fields.</p>
                        ) : (
                            null
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
