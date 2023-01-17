import React, {useState, useContext} from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { 
    Box, 
    TextField, 
    MenuItem, 
    Button, 
    Radio, RadioGroup, FormLabel, FormControlLabel } from '@mui/material';
import styles from './CreateBootcamp.module.scss';
import ProtectedRoute from "../../components/ProtectedRoute"
import { useForm } from "react-hook-form";
import AuthContext from "../../context/Auth";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const TextFieldStyle = {
    width: "100%",
};

const CreateBootcamp = () => {
    const { user } = useContext(AuthContext);
    const[careers, setCareers] = useState([]);
    const[data, setData] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    const navigate = useNavigate();
    function notify(message) {
        toast(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            progress: undefined,
        });
    }

    const onSubmit = async (data, e) => {
        e.preventDefault();
        data.careers = careers;
        try{
            const response = await axios.post(
                "https://bootcamper-6rl5.onrender.com/api/v1/bootcamps",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: user.token,
                    },
                }
            );
            console.log(response);
            if(response.status === 201){
                notify("Bootcamp Created!");
                setTimeout(() => {
                    navigate("/bootcamps");
                }, 3500);
            }
        } catch (error) {
            notify(error.response.data.error);
        }
    }

    return (
        <ProtectedRoute>
            <Layout>
                <div className={styles.wrapper}>
                    <div>
                        <p className={styles.header}>Create a bootcamp</p>
                    </div>
                    <form className={styles.details} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.bootcamp}>
                            <p className={styles.text}>Bootcamp Details</p>
                            <div className={styles.items}>
                                <label>Bootcamp Name</label>
                                <TextField 
                                    type="text"
                                    label="Enter Bootcamp's name"
                                    name="name"
                                    color="secondary"
                                    sx={TextFieldStyle}
                                    {...register("name")}
                                    required
                                /> 
                            </div>
                            <div className={styles.items}>
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    spellCheck="false"
                                    placeholder="Enter a description for your bootcamp"
                                    className={styles.description}
                                    {...register("description")}
                                    required
                                />   
                            </div>
                            <Box width='250px' className={styles.items}>
                                <label>Career</label>
                                <TextField
                                    name="careers" 
                                    label='Select Career' 
                                    select
                                    value={careers}
                                    onChange={(event)=>{
                                        const value = event.target.value;
                                        setCareers(value);
                                    }}
                                    fullWidth
                                    sx={TextFieldStyle}
                                    color="secondary"
                                    helperText="Please select your career"
                                    SelectProps={{
                                        multiple: true,
                                    }}
                                    required
                                >
                                    <MenuItem value='Web Development'>Web Development</MenuItem>
                                    <MenuItem value='Mobile Development'>Mobile Development</MenuItem>
                                    <MenuItem value='UI/UX'>UI/UX</MenuItem>
                                    <MenuItem value='Data Science'>Data Science</MenuItem>
                                    <MenuItem value='Business'>Business</MenuItem>
                                    <MenuItem value='Other'>Other</MenuItem>
                                </TextField>
                            </Box>
                            <div className={styles.items}>
                                <label>Email</label>
                                <TextField 
                                    type="email"
                                    label="Enter email address"
                                    name="email"
                                    color="secondary"
                                    sx={TextFieldStyle}
                                    {...register("email")}
                                    required
                                />
                            </div>
                            <div className={styles.items}>
                                <label>Website Url</label>
                                <TextField 
                                    type="url"
                                    label="Enter website url"
                                    name="website"
                                    color="secondary"
                                    sx={TextFieldStyle}
                                    {...register("website")}
                                    required
                                />
                            </div>
                            <div className={styles.items}>
                                <label>Contact Number</label>
                                <TextField 
                                    type="tel"
                                    label="Enter contact number"
                                    name="phone"
                                    color="secondary"
                                    sx={TextFieldStyle}
                                    {...register("phone")}
                                    required
                                />      
                            </div>                           
                        </div>
                        <div className={styles.location}>
                            <p className={styles.text}>Location Details</p>
                            <div className={styles.items}>
                                <label>Address</label>
                                <TextField
                                    type="text"
                                    label="Enter address"
                                    name="address"
                                    color="secondary"
                                    sx={TextFieldStyle}
                                    {...register("address")}
                                    required
                                />
                            </div>
                            <div className={styles.items}>
                                <FormLabel 
                                    className={styles.radio}
                                >
                                    Select Housing
                                </FormLabel>
                                <RadioGroup row>
                                    <FormControlLabel
                                        {...register("housing")}
                                        value="true"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        {...register("housing")}
                                        value="false"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                            </div>
                            <div className={styles.items}>
                                <FormLabel 
                                    className={styles.radio}
                                >
                                    Select Job Assistance
                                </FormLabel>
                                <RadioGroup row>
                                    <FormControlLabel
                                        {...register("jobAssistance")}
                                        value="true"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        {...register("jobAssistance")}
                                        value="false"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                            </div>
                            <div className={styles.items}>
                                <FormLabel
                                    className={styles.radio}
                                >
                                    Select Job Guarantee
                                </FormLabel>
                                <RadioGroup row>
                                    <FormControlLabel
                                        {...register("jobGuarantee")}
                                        value="true"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        {...register("jobGuarantee")}
                                        value="false"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                            </div>  
                            <div className={styles.items}>
                                <FormLabel
                                    className={styles.radio}
                                >
                                    Select Accept Gi Bill
                                </FormLabel>
                                <RadioGroup row>
                                    <FormControlLabel
                                        {...register("acceptGi")}
                                        value="true"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        {...register("acceptGi")}
                                        value="false"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                            </div>
                            <div className={styles.btn}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        width: "100%",
                                        height: "50px",
                                        backgroundColor: "#262626",
                                        borderRadius: "5px",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        marginTop: "20px",
                                    }}
                                >
                                    Submit
                                </Button>
                            </div>    
                        </div>
                    </form>
                </div>
            </Layout>
        </ProtectedRoute>    
    );
};

export default CreateBootcamp;