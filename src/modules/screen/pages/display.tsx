import React, { useEffect, useState } from "react";
import { getNews, getWeather } from "../services/api";
import styles from "./display.module.css";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Marquee from "react-fast-marquee";

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

type NewsData = {
  meta: {
    found: number;
    returned: number;
    limit: number;
    page: number;
  };
  data: Array<{
    uuid: string;
    title: string;
    description: string;
    keywords: string;
    snippet: string;
    url: string;
    image_url: string;
    language: string;
    published_at: string;
    source: string;
    categories: string[];
    relevance_score: number | null;
    locale: string;
  }>;
};

type UserData = {
  id: string;
  name: string;
  specializedIn: string;
};
type ImageData = {
  id: string;
  imageUrl: string;
};
type PositionData = {
  id: string;
  position: string;
  count: string;
};

const Display: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [newsData, setNewsData] = useState<NewsData["data"]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [userData, setUserData] = useState<UserData[]>([]);
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [positionData, setPositionData] = useState<PositionData[]>([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageData.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(intervalId);
  }, [imageData.length]);
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

    const fetchImageData = async () => {
      try {
        const userCollectionRef = collection(db, "images");

        const q = query(userCollectionRef);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const newData: ImageData[] = [];
          querySnapshot.docs
            .sort((a, b) => a.id.localeCompare(b.id)) // Sort documents by ID
            .forEach((doc) => {
              newData.push({
                id: doc.id,
                imageUrl: doc.data().imageUrl,
              });
            });
          setImageData(newData);
        });

        return () => unsubscribe(); // Unsubscribe from the snapshot listener when component unmounts
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    fetchImageData();
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
  // console.log(positionData);

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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setNewsData(data.data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    fetchNews();
    // console.log(newsData);
  }, []);

  const fahrenheitToCelsius = (fahrenheit: number): number => {
    return ((fahrenheit - 32) * 5) / 9;
  };
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeState("fade-out");

      setTimeout(() => {
        setCurrentGroupIndex(
          (prevIndex) => (prevIndex + 1) % Math.ceil(userData.length / 5)
        );
        setFadeState("fade-in");
      }, 1000); // Duration of the fade-out animation
    }, 5000); // Change every 5 seconds

    return () => clearInterval(intervalId);
  }, [userData.length]);

  const getCurrentGroup = () => {
    const startIndex = currentGroupIndex * 5;
    return userData.slice(startIndex, startIndex + 5);
  };

  const currentGroup = getCurrentGroup();
  return (
    <div className={styles.displayScreen}>
      {/* {weatherData.length === 0 ? (
        <p className={styles.error}>API IS NOT WORKING</p>
      ) : ( */}
      <>
        <p>Department of</p>
        <h3 className={styles.title}>
          ELECTRONICS &
          <br />
          COMPUTER ENGINEERING
        </h3>
        <div className={styles.components}>
          <div className={styles.container1}>
            <p
              style={{
                fontSize: "15px",
                lineHeight: "50px",
                position: "absolute",
              }}
            >
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
            <p style={{ fontSize: "15px", lineHeight: "50px" }}>
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
            <p
              style={{ fontSize: "15px", lineHeight: "50px" }}
              className={styles.status}
            >
              {weatherData.length > 0 && <>{weatherData[0].IconPhrase}</>}
            </p>
          </div>
          <div className={styles.container4}>
            <p style={{ fontSize: "15px", lineHeight: "50px" }} id="time">
              {currentTime}
            </p>
          </div>
          <div className={styles.container5}>
            {imageData.length > 0 && (
              <img
                src={imageData[currentImageIndex].imageUrl}
                alt=""
                width={"10%"}
                height={"200px"}
              />
            )}
          </div>
          <div className={styles.container6}>
            <div
              style={{ fontSize: "10px", lineHeight: "40px" }}
              className={styles.details}
            >
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
              <div
                style={{ fontSize: "12px", lineHeight: "50px" }}
                className={styles.faculties}
              >
                {currentGroup.map((user) => (
                  <div
                    key={user.id}
                    className={`${styles.faculty} ${fadeState}`}
                  >
                    <h4>{user.name}</h4>
                    <p>{user.specializedIn}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Marquee speed={0.5} style={{ color: "#fff" }}>
          {newsData.map((news, index) => (
            <span key={news.uuid} className={styles.marquee__item}>
              {news.title}
              {index < newsData.length - 1
                ? "\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0"
                : ""}{" "}
            </span>
          ))}
        </Marquee>
      </>
      {/* )} */}
    </div>
  );
};

export default Display;
