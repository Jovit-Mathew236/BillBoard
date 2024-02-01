import { useEffect, useState } from "react";
import { getWeather } from "../services/api";
import styles from "./display.module.css";

const Display = () => {
  const [weatherData, setWeatherData] = useState([
    {
      Temperature: {
        Value: 0,
        Unit: "",
        UnitType: 0,
      },
      WeatherIcon: 0,
      HasPrecipitation: false,
      PrecipitationProbability: 0,
      IsDayTime: false,
      EpochDateTime: 0,
      Link: "",
      MobileLink: "",
      IconPhrase: "",
      IsDaylight: false,
    },
  ]);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather();
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };

    fetchWeather();
  }, []);
  const fahrenheitToCelsius = (fahrenheit: number): number => {
    return ((fahrenheit - 32) * 5) / 9;
  };
  return (
    <div className={styles.displayScreen}>
      {weatherData.length < 0 && <p>API IS NOT WORKING</p>}
      <p>Department of</p>
      <h3 className={styles.title}>
        ELECTRONICS &
        <br />
        COMPUTER
      </h3>
      <div className={styles.components}>
        <div className={styles.container1}>
          <p>
            {weatherData.length > 0 && (
              <>
                {new Date(weatherData[0].EpochDateTime * 1000).toLocaleString(
                  "default",
                  {
                    day: "2-digit",
                  }
                )}
              </>
            )}
            <br />
            {/* month */}
            {weatherData.length > 0 && (
              <>
                {new Date(weatherData[0].EpochDateTime * 1000).toLocaleString(
                  "default",
                  {
                    month: "short",
                  }
                )}
              </>
            )}
          </p>
        </div>
        <div className={styles.container2}>
          <p>
            {weatherData.length > 0 && (
              <>
                {fahrenheitToCelsius(weatherData[0].Temperature.Value).toFixed(
                  0
                )}
                &#176;C
              </>
            )}
          </p>
        </div>
        <div className={styles.container3}>
          <p className={styles.img}></p>
          <p className={styles.status}>
            {
              // status
              weatherData.length > 0 && <>{weatherData[0].IconPhrase}</>
            }
          </p>
        </div>
        <div className={styles.container4}>
          <p>
            {
              // // time
              // weatherData.length > 0 && (
              //   <>
              //     {new Date(weatherData[0].EpochDateTime * 1000).toLocaleString(
              //       "default",
              //       {
              //         hour: "2-digit",
              //         minute: "2-digit",
              //       }
              //     )}
              //   </>
              // )
              new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }
          </p>
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
