export const getWeather = async () => {
    try {
      const response = await fetch(
        "http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/188802?apikey=258od518cXWa0GcSX1ShgFL6EpY3DTUt",
        {
          method: "GET"
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
  
      const result = await response.json();
    //   console.log(result);
      return result;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };
  