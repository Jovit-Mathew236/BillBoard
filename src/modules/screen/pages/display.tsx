import { useEffect, useState } from "react";
import { getWeather } from "../services/api";
import styles from "./display.module.css";

type WeatherData = {
  Temperature: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationProbability: number;
  IsDayTime: boolean;
  EpochDateTime: number;
  Link: string;
  MobileLink: string;
  IconPhrase: string;
  IsDaylight: boolean;
};

const Display = () => {
  const [weatherData, setWeatherData] = useState([] as WeatherData[]);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const timerId = setInterval(() => {
      const today = new Date();
      let h: number | string = today.getHours();
      let m: number | string = today.getMinutes();
      const ampm: string = h >= 12 ? "PM" : "AM";

      h = h % 12 || 12; // Ensure 12-hour format
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;

      const time = h + ":" + m + " " + ampm;
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

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
      {weatherData.length === 0 && <p>API IS NOT WORKING</p>}
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
          <p id="time">{currentTime}</p>
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
                <h4>Soya Treesa Jose</h4>
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
