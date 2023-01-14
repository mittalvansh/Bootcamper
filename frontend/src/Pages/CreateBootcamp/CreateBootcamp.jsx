import React, {useState} from "react";
import Layout from "../../components/Layout/Layout";
import { Box, TextField, Button, MenuItem } from '@mui/material';
import styles from './CreateBootcamp.module.scss';

const TextFieldStyle = {
    width: "100%",
};

const CreateBootcamp = () => {
    const[city, setCity] = useState('');
    const[career, setCareer] = useState('');
    const[housing, setHousing] = useState(null);
    const[jobAssistance, setJobAssistance] = useState(null);
    const[jobGuarantee, setJobGuarantee] = useState(null);
    const[acceptGi, setAcceptGi] = useState(null);

    return (
        <>
            <Layout>
                <div className={styles.wrapper}>
                    <div>
                        <p className={styles.header}>Create a bootcamp</p>
                    </div>
                    <form className={styles.details}>
                        <div className={styles.bootcamp}>
                            <p className={styles.text}>Bootcamp Details</p>
                            <div className={styles.items}>
                                <label>Bootcamp Name</label>
                                <TextField 
                                    type="text"
                                    label="Enter Bootcamp's name"
                                    name="name"
                                    sx={TextFieldStyle}
                                /> 
                            </div>
                            <div className={styles.items}>
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    spellcheck="false"
                                    placeholder="Enter a description for your bootcamp"
                                    className={styles.description}
                                />   
                            </div>
                            <Box width='250px' className={styles.items}>
                                <label>Career</label>
                                <TextField
                                    name="careers" 
                                    label='Select Career' 
                                    select
                                    value={career}
                                    onChange={(event)=>{
                                        setCareer(event.target.value);
                                    }}
                                    fullWidth
                                    sx={TextFieldStyle}
                                    color="secondary"
                                    helperText="Please select your career"

                                >
                                    <MenuItem value='Web Development'>Web Development</MenuItem>
                                    <MenuItem value='UI/UX Design'>UI/UX Design</MenuItem>
                                    <MenuItem value='Marketing'>Marketing</MenuItem>
                                    <MenuItem value='Data Science'>Data Science</MenuItem>
                                </TextField>
                            </Box>
                            <div className={styles.items}>
                                <label>Email</label>
                                <TextField 
                                    type="email"
                                    label="Enter email address"
                                    name="email"
                                    sx={TextFieldStyle}
                                />
                            </div>
                            <div className={styles.items}>
                                <label>Website Url</label>
                                <TextField 
                                    type="url"
                                    label="Enter website url"
                                    name="website"
                                    sx={TextFieldStyle}
                                />
                            </div>
                            <div className={styles.items}>
                                <label>Contact Number</label>
                                <TextField 
                                    type="tel"
                                    label="Enter contact number"
                                    name="phone"
                                    sx={TextFieldStyle}
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
                                    sx={TextFieldStyle}
                                />
                            </div>
                            <Box width='250px' className={styles.items}>
                                <label>Choose City</label>
                                <TextField 
                                    name="city"
                                    label='Select City' 
                                    select
                                    value={city}
                                    onChange={(event)=>{
                                        setCity(event.target.value);
                                    }}
                                    fullWidth
                                    color="secondary"
                                    helperText="Please select your city"
                                >

                                    <MenuItem value='Dehli'>Dehli</MenuItem>
                                    <MenuItem value='Mumbai'>Mumbai</MenuItem>
                                    <MenuItem value='Bangalore'>Bangalore</MenuItem>
                                </TextField>
                            </Box>
                            <Box width='250px' className={styles.items}>
                                <label>Housing</label>
                                <TextField 
                                    name="housing"
                                    label='Select Housing' 
                                    select
                                    value={housing}
                                    onChange={(event)=>{
                                        setHousing(event.target.value);
                                    }}
                                    fullWidth
                                    color="secondary"
                                >
                                    <MenuItem value='true'>Yes</MenuItem>
                                    <MenuItem value='false'>No</MenuItem>
                                </TextField>
                            </Box>
                            <Box width='250px' className={styles.items}>
                                <label>Job Assistance</label>
                                <TextField 
                                    name="jobAssistance"
                                    label='Select Job Assistance' 
                                    select
                                    value={jobAssistance}
                                    onChange={(event)=>{
                                        setJobAssistance(event.target.value);
                                    }}
                                    fullWidth
                                    color="secondary"
                                >
                                    <MenuItem value='true'>Yes</MenuItem>
                                    <MenuItem value='false'>No</MenuItem>
                                </TextField>
                            </Box>
                            <Box width='250px' className={styles.items}>
                                <label>Job Guarantee</label>
                                <TextField 
                                    name="jobguarantee"
                                    label='Select Job Guarantee' 
                                    select
                                    value={jobGuarantee}
                                    onChange={(event)=>{
                                        setJobGuarantee(event.target.value);
                                    }}
                                    fullWidth
                                    color="secondary"
                                >
                                    <MenuItem value='true'>Yes</MenuItem>
                                    <MenuItem value='false'>No</MenuItem>
                                </TextField>
                            </Box>
                            <Box width='250px' className={styles.items}>
                                <label>AcceptGi</label>
                                <TextField 
                                    name="acceptGi"
                                    label='AcceptGi Available' 
                                    select
                                    value={acceptGi}
                                    onChange={(event)=>{
                                        setAcceptGi(event.target.value);
                                    }}
                                    fullWidth
                                    color="secondary"
                                >
                                    <MenuItem value='true'>Yes</MenuItem>
                                    <MenuItem value='false'>No</MenuItem>
                                </TextField>
                            </Box>
                        </div>
                    </form>
                </div>
            </Layout>
        </>    
    );
};

export default CreateBootcamp;