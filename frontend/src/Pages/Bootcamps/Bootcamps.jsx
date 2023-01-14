import React,{useState, useEffect} from "react";
import styles from './Bootcamps.module.scss';
import axios from 'axios';
import BootcampCard from "../../components/BootcampCard/BootcampCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { TextField, Button } from '@mui/material';
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
    const[averageCost, setAverageCost] = useState('');
    const[distance, setDistance] = useState('');
    const[zipcode, setZipcode] = useState('');
    const[bootcamps, setBootcamps] = useState([]);

    const getBootcamps = () => {
        const URL = 'https://bootcamper-6rl5.onrender.com/api/v1/bootcamps'
        let QUERY = '';
        if(averageCost){ 
            QUERY = QUERY + '?averageCost[lte]=' + averageCost.toString();
        }
        axios
            .get(URL + QUERY)
            .then((response) => {
                setBootcamps(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getBootcampsByDistance = () => {
        axios
            .get(
                `https://bootcamper-6rl5.onrender.com/api/v1/bootcamps/radius/${zipcode}/${distance}`
            )
            .then((response) => {
                setBootcamps(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    } 

    useEffect(() => {
        getBootcamps();
    }, []);

    const handlefieldsSubmit = (e) => {
        e.preventDefault();
        getBootcamps();
    }

    const handleLocationSubmit = (e) => {
        e.preventDefault();
        getBootcampsByDistance();
    }

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <form className={styles.location} onSubmit={handleLocationSubmit}>
                        <label>By Location</label>
                        <div className={styles.fields}>
                            <TextField
                                type='text'
                                label='Miles From'
                                name="distance"
                                className={styles.items}
                                value={distance}
                                onChange={(event)=>{
                                    setDistance(event.target.value);
                                }}
                                required
                            />
                            <TextField
                                type='text'
                                label='Zipcode'
                                name="zipcode"
                                className={styles.items}
                                value={zipcode}
                                onChange={(event)=>{
                                    setZipcode(event.target.value);
                                }}
                                required
                            />
                        </div>
                        <Button 
                            variant="contained" 
                            type="submit"
                            sx={btnStyle}
                        >
                            Search
                        </Button>
                    </form>
                    <form className={styles.basicFields} onSubmit={handlefieldsSubmit}>
                        <span>
                            <FontAwesomeIcon icon={faFilter} /> Filter By
                        </span>
                        <div className={styles.items}>
                            <label>Budget</label>
                            <TextField
                                type='number'
                                label='Average Cost'
                                name="averageCost"
                                value={averageCost}
                                onChange={(event)=>{
                                    setAverageCost(event.target.value);
                                }}
                                required
                            />
                        </div>
                        <Button 
                            variant="contained" 
                            type="submit"
                            sx={btnStyle}
                        >
                            Search
                        </Button>
                    </form>
                </div>
                <div className={styles.rightSide}>
                    {bootcamps.map((bootcamp) => {
                        return <BootcampCard bootcamp={bootcamp} key={bootcamp._id} />;
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Bootcamps;