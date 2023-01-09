import React,{useState} from "react";
import styles from './Home.module.scss';
import {Box, TextField, MenuItem,Button} from '@mui/material';
import Layout from "../../components/Layout/Layout"

const btnStyle = {
    width: "100%",
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginBottom: "1rem",
    marginTop: "1rem",
    backgroundColor: "#262626",
    color: "white",
    "&:hover": {
        backgroundColor: "#262626",
    }
}

const Home = () => {
    const[city, setCity] = useState('');
    const[career, setCareer] = useState('');
    console.log(career);

    return (
        <>
        <Layout>
            <div className={styles.text}>
                <h1>Search for bootcamps in your city</h1>
                <p>Learn each and every thing that require to get a job in top companies</p>
            </div>
            <form>
                <Box width='250px'>
                    <TextField 
                        label='Select City'
                        className={styles.items} 
                        select
                        value={city}
                        onChange={(event)=>{
                            setCity(event.target.value);
                        }}
                        fullWidth
                        color="secondary"
                        helperText="Please select your city"
                        required
                    >
                        <MenuItem value='Dehli'>Dehli</MenuItem>
                        <MenuItem value='Mumbai'>Mumbai</MenuItem>
                        <MenuItem value='Bangalore'>Bangalore</MenuItem>
                    </TextField>
                </Box>
                <Box width='250px'>
                    <TextField 
                        label='Select Career' 
                        className={styles.items}
                        select
                        value={career}
                        onChange={(event)=>{
                            setCareer(event.target.value);
                        }}
                        fullWidth
                        color="secondary"
                        helperText="Please select your career"
                        required
                    >
                        <MenuItem value='Web Development'>Web Development</MenuItem>
                        <MenuItem value='UI/UX Design'>UI/UX Design</MenuItem>
                        <MenuItem value='Marketing'>Marketing</MenuItem>
                        <MenuItem value='Data Science'>Data Science</MenuItem>
                    </TextField>
                    <Button 
                        variant="contained" 
                        type="submit"
                        sx={btnStyle}
                    >
                        Search
                    </Button>
                </Box>
            </form>
        </Layout>
        </>
    );
}

export default Home;