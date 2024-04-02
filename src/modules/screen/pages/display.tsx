import React, { useEffect, useState } from "react";
import { getWeather } from "../services/api";
import styles from "./display.module.css";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase/config";

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

type UserData = {
  id: string;
  name: string;
  specializedIn: string;
};
type PositionData = {
  id: string;
  position: string;
  count: string;
};

const Display: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [userData, setUserData] = useState<UserData[]>([]);
  const [positionData, setPositionData] = useState<PositionData[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userCollectionRef = collection(db, "fields");

        const q = query(userCollectionRef);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const newData: UserData[] = [];
          querySnapshot.docs
            .sort((a, b) => a.id.localeCompare(b.id)) // Sort documents by ID
            .forEach((doc) => {
              newData.push({
                id: doc.id,
                name: doc.data().name,
                specializedIn: doc.data().specializedIn,
              });
            });
          setUserData(newData);
        });

        return () => unsubscribe(); // Unsubscribe from the snapshot listener when component unmounts
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPositionData = async () => {
      try {
        const positionCollectionRef = collection(db, "position");
        const q = query(positionCollectionRef);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const newData: PositionData[] = [];
          querySnapshot.docs
            .sort((a, b) => a.id.localeCompare(b.id)) // Sort documents by ID
            .forEach((doc) => {
              newData.push({
                id: doc.id,
                position: doc.data().position,
                count: doc.data().count,
              });
            });
          setPositionData(newData);
        });

        return () => unsubscribe(); // Unsubscribe from the snapshot listener when component unmounts
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchPositionData();
  }, []);
  console.log(positionData);

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
      {weatherData.length === 0 ? (
        <p className={styles.error}>API IS NOT WORKING</p>
      ) : (
        <>
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
                    {new Date(
                      weatherData[0].EpochDateTime * 1000
                    ).toLocaleString("default", {
                      day: "2-digit",
                    })}
                  </>
                )}
                <br />
                {weatherData.length > 0 && (
                  <>
                    {new Date(
                      weatherData[0].EpochDateTime * 1000
                    ).toLocaleString("default", {
                      month: "short",
                    })}
                  </>
                )}
              </p>
            </div>
            <div className={styles.container2}>
              <p>
                {weatherData.length > 0 && (
                  <>
                    {fahrenheitToCelsius(
                      weatherData[0].Temperature.Value
                    ).toFixed(0)}
                    &#176;C
                  </>
                )}
              </p>
            </div>
            <div className={styles.container3}>
              <p className={styles.img}></p>
              <p className={styles.status}>
                {weatherData.length > 0 && <>{weatherData[0].IconPhrase}</>}
              </p>
            </div>
            <div className={styles.container4}>
              <p id="time">{currentTime}</p>
            </div>
            <div className={styles.container5}></div>
            <div className={styles.container6}>
              <div className={styles.details}>
                <h3>Staff Positions</h3>
                <div>
                  {positionData.map((position) => {
                    return (
                      <p>
                        {position.position}: {position.count}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.container7}>
              <div className={styles.details}>
                <h3>Faculty</h3>
                <div className={styles.faculties}>
                  {userData.map((user) => (
                    <div key={user.id} className={styles.faculty}>
                      <h4>{user.name}</h4>
                      <p>{user.specializedIn}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Display;
