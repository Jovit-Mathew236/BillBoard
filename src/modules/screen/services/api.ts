import axios from 'axios';

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
