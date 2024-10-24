import React, { useEffect, useState } from "react";
import { getNews, getNIFTY, getWeather } from "../services/api";
import styles from "./display.module.css";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase/config";
// import Marquee from "react-fast-marquee";

import { IndexData } from "../../../enum";

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

const Display2: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [newsData, setNewsData] = useState<NewsData["data"]>([]);
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);
  const [displayFadeState, setDisplayFadeState] = useState(true);
  const [isShowingNews, setIsShowingNews] = useState(true);
  const [NIFTYDATA, setNIFTYDATA] = useState<IndexData>();
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
    const fetchNIFTY = async () => {
      try {
        const data = await getNIFTY();
        setNIFTYDATA(data);
        console.log(NIFTYDATA);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };

    fetchNIFTY();
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
  }, []);

  useEffect(() => {
    if (newsData.length === 0 || weatherData.length === 0) return;

    const intervalId = setInterval(() => {
      setDisplayFadeState(false);

      setTimeout(() => {
        setIsShowingNews((prev) => !prev);
        setCurrentDisplayIndex((prevIndex) => {
          return (prevIndex + 1) % 3; // Loop through 3 news items
        });
        setDisplayFadeState(true);
      }, 1000); // Duration of the fade-out animation
    }, 7500); // Change every 5 seconds

    return () => clearInterval(intervalId);
  }, [newsData.length, weatherData.length, isShowingNews]);

  const fahrenheitToCelsius = (fahrenheit: number): number => {
    return ((fahrenheit - 32) * 5) / 9;
  };
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [fadeState, setFadeState] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeState(false);

      setTimeout(() => {
        setCurrentGroupIndex(
          (prevIndex) => (prevIndex + 1) % Math.ceil(userData.length / 5)
        );
        setFadeState(true);
      }, 1000); // Duration of the fade-out animation
    }, 10000); // Change every 10 seconds

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
        <p style={{ fontSize: "30px", color: "#fff" }}>Department of</p>
        <h3
          style={{ fontSize: "50px", color: "#fff" }}
          className={styles.title}
        >
          Electronics &
          <br />
          Computer Engineering
        </h3>
        <div
          className={styles.components}
          style={{
            gridTemplateAreas: `
      'box6 box6 box7 box7'
      'box6 box6 box7 box7'
      'box5 box5 box7 box7'
      'box5 box5 box7 box7'
      'box1 box1 box1 box1'
      'box2 box2 box4 box4'
    `,
          }}
        >
          <div
            style={{
              justifyContent: "space-around",
              backgroundColor: "#fff",
            }}
            className={styles.container1}
          >
            {isShowingNews && newsData.length > 0 ? (
              <section
                className={` ${
                  displayFadeState ? styles.fade_in : styles.fade_out
                }`}
              >
                <h4>{newsData[currentDisplayIndex].title}</h4>
                {/* <p>{newsData[currentDisplayIndex].description}</p> */}
              </section>
            ) : weatherData.length > 0 ? (
              <section
                className={` ${
                  displayFadeState ? styles.fade_in : styles.fade_out
                }`}
              >
                <p style={{ color: "#000" }}>
                  {new Date(weatherData[0].EpochDateTime * 1000).toLocaleString(
                    "default",
                    { weekday: "long" }
                  )}
                </p>
                <p style={{ color: "#000" }}>
                  {fahrenheitToCelsius(
                    weatherData[0].Temperature.Value
                  ).toFixed(0)}
                  &#176;C
                </p>
                <p style={{ color: "#000" }}>
                  {new Date(weatherData[0].EpochDateTime * 1000).toLocaleString(
                    "default",
                    { month: "short" }
                  )}{" "}
                  {new Date(weatherData[0].EpochDateTime * 1000).toLocaleString(
                    "default",
                    { day: "2-digit" }
                  )}
                </p>
              </section>
            ) : null}
          </div>
          <div
            style={{ backgroundColor: "#000" }}
            className={styles.container2}
          >
            <p style={{ color: "#fff" }}>
              NIFTY50{" "}
              <span style={{ fontSize: "30px", color: "limegreen" }}>
                +21.70
              </span>
            </p>
          </div>
          {/* <div className={styles.container3}>
              <p className={styles.img}></p>
              <p className={styles.status}>
                {weatherData.length > 0 && <>{weatherData[0].IconPhrase}</>}
              </p>
            </div> */}
          <div style={{ borderRadius: "20px" }} className={styles.container4}>
            <p id="time">{currentTime}</p>
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
            <div style={{ backgroundColor: "#fff" }} className={styles.details}>
              <h3
                style={{
                  fontSize: "35px",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                Faculty
              </h3>
              <div
                style={{ backgroundColor: "#fff" }}
                className={styles.faculties}
              >
                {currentGroup.map((user) => (
                  <div
                    style={{
                      fontSize: "25px",
                      backgroundColor: "#fff",
                      color: "#000",
                    }}
                    key={user.id}
                    className={` ${
                      fadeState ? styles.fade_in : styles.fade_out
                    }`}
                  >
                    <h4>{user.name}</h4>
                    <p
                      style={{
                        padding: "0",
                        color: "#7D92E1",
                      }}
                    >
                      {user.specializedIn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <Marquee speed={10} style={{ color: "#fff" }}>
          {newsData.map((news, index) => (
            <span key={news.uuid} className={styles.marquee__item}>
              {news.title}
              {index < newsData.length - 1
                ? "\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0"
                : ""}{" "}
            </span>
          ))}
        </Marquee> */}
      </>
      {/* )} */}
    </div>
  );
};

export default Display2;
