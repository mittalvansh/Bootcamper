import React, { useState } from "react";
import styles from "./Home.module.scss";
import Layout from "../../components/Layout/Layout";

const Home = () => {
  return (
    <>
      <Layout>
        <div className={styles.text}>
          <h1>Search for bootcamps in your city</h1>
          <p>
            Learn each and every thing that require to get a job in top
            companies
          </p>
        </div>
        <div className={styles.info}>
          <p>
            Whether you're looking to pick up a new skill or share your
            expertise, Bootcamper has something for everyone. Join now to start
            learning and growing with the community.The platform offers a
            user-friendly interface and high-quality educational content to help
            users achieve their goals and stay up-to-date with the latest trends
            and technologies.
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Home;
