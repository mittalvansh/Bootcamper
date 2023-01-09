import React,{useState} from "react";
import styles from './Bootcamps.module.scss';
import BootcampCard from "../../components/BootcampCard/BootcampCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {Box, TextField, MenuItem,Button} from '@mui/material';
import Layout from "../../components/Layout/Layout";

const btnStyle = {
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "Poppins",
    margin:"1rem 0",
    backgroundColor: "#262626",
    color: "white",
    "&:hover": {
        backgroundColor: "#262626",
    }
}

const Bootcamps = () => {
    const[city, setCity] = useState('');
    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <span>
                        <FontAwesomeIcon icon={faFilter} /> Filter By
                    </span>
                    <Box width='250px' row>
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
                    <Button 
                        variant="contained" 
                        type="submit"
                        sx={btnStyle}
                    >
                        Search
                    </Button>
                </div>
                <div className={styles.rightSide}>
                    <BootcampCard/>
                </div>
            </div>
        </Layout>
    );
};

export default Bootcamps;