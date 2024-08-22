import axios from "axios";
import { IndexData } from "../../../enum";

export const getWeather = async () => {
  try {
    const response = await axios.get(
      "https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/188802?apikey=258od518cXWa0GcSX1ShgFL6EpY3DTUt"
    );

    // Check if response status is not OK
    if (response.status !== 200) {
      throw new Error("Failed to fetch weather data");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
export const getNIFTY = async () => {
  try {
    const response = await axios.get("https://www.nseindia.com/api/allIndices");

    // Check if response status is not OK
    if (response.status !== 200) {
      throw new Error("Failed to fetch weather data");
    }
    const data = response.data;
    // Find the first entry with the key "BROAD MARKET INDICES"
    const broadMarketIndex = data.find(
      (item: IndexData) => item.key === "BROAD MARKET INDICES"
    );

    return broadMarketIndex;
  } catch (error) {
    console.error("Error fetching NIFTY data:", error);
    throw error;
  }
};
export const getNews = async () => {
  try {
    const response = await axios.get(
      "https://api.thenewsapi.com/v1/news/top?api_token=BRCQ1LJMRgGiDf1I9XOlsYOTGJTzwniSyiwFe1y2&locale=in&limit=3&categories=business,sports,tech,general&exclude_domains=dnaindia.com"
    );

    // Check if response status is not OK
    if (response.status !== 200) {
      throw new Error("Failed to fetch news data");
    }
    const data = response.data;
    // Find the first entry with the key "BROAD MARKET INDICES"

    return data;
  } catch (error) {
    console.error("Error fetching News data:", error);
    throw error;
  }
};
