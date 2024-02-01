// import React from 'react'
import styles from "./Display.module.css";

const Display = () => {
  return (
    <div className={styles.displayScreen}>
      <p>Department of</p>
      <h3 className={styles.title}>
        ELECTRONICS &
        <br />
        COMPUTER
      </h3>
      <div className={styles.components}>
        <div className={styles.container1}>
          <p>
            31st
            <br />
            Jan
          </p>
        </div>
        <div className={styles.container2}>
          <p>32°C</p>
        </div>
        <div className={styles.container3}>
          <p className={styles.img}></p>
          <p className={styles.status}>Rain</p>
        </div>
        <div className={styles.container4}>
          <p>10:30</p>
        </div>
        <div className={styles.container5}></div>
        <div className={styles.container6}></div>
        <div className={styles.container7}>
          <div className={styles.details}>
            <h3>Faculty</h3>
            <div className={styles.faculties}>
              <div className={styles.faculty}>
                <h4>Dr. Giby Jose</h4>
                <p>Btech,M.E,Phd</p>
              </div>
              <div className={styles.faculty}>
                <h4>Shilpa Lizbeth George</h4>
                <p>Btech,MTech</p>
              </div>
              <div className={styles.faculty}>
                <h4>Soya Treesa Joseph</h4>
                <p>Btech,MTech</p>
              </div>
              <div className={styles.faculty}>
                <h4>Ashitha Jose</h4>
                <p>Btech,MTech</p>
              </div>
              <div className={styles.faculty}>
                <h4>Ancy Mathew</h4>
                <p>Btech,M.E,Phd</p>
              </div>
              <div className={styles.faculty}>
                <h4>Tinu Thomas</h4>
                <p>Btech,M.E,Phd</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
