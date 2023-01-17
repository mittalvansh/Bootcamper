import React,{useState} from "react";
import styles from './Home.module.scss';
import {Box, TextField, MenuItem, Button} from '@mui/material';
import Layout from "../../components/Layout/Layout"

const btnStyle = {
    width: "30%",
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "Poppins",
    padding: "0.5rem 0",
    margin: "1rem 0",
    backgroundColor: "#262626",
    color: "white",
    "&:hover": {
        backgroundColor: "#262626",
    }
}

const Home = () => {
    const[distance, setDistance] = useState('');
    const[zipcode, setZipcode] = useState('');

    return (
        <>
        <Layout>
            <div className={styles.text}>
                <h1>Search for bootcamps in your city</h1>
                <p>Learn each and every thing that require to get a job in top companies</p>
            </div>
            <form>
                <div className={styles.searchBars}>
                    <Box width='250px' className={styles.items}>
                        <TextField
                            type='text'
                            label='Miles From'
                            name="distance"
                            value={distance}
                            onChange={(event)=>{
                                setDistance(event.target.value);
                            }}
                            required
                        />
                    </Box>
                    <Box width='250px' className={styles.items}>
                        <TextField
                            type='text'
                            label='Zipcode'
                            name="zipcode"
                            value={zipcode}
                            onChange={(event)=>{
                                setZipcode(event.target.value);
                            }}
                            required
                        />
                    </Box>
                    <Button 
                        variant="contained" 
                        type="submit"
                        sx={btnStyle}
                    >
                        Search
                    </Button>
                </div>
            </form>
        </Layout>
        </>
    );
}

export default Home;