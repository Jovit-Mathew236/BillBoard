// import React from 'react'
import styles from "./Display.module.css";

const Display = () => {
  return (
    <div className={styles.displayScreen}>
      <h1>ECS</h1>
      <div className={styles.components}>
        <div className={styles.container1}></div>
        <div className={styles.container2}></div>
        <div className={styles.container3}></div>
        <div className={styles.container4}></div>
        <div className={styles.container5}></div>
        <div className={styles.container6}></div>
        <div className={styles.container7}></div>
      </div>
    </div>
  );
};

export default Display;
