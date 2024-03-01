import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index2.ejs", { data: null, error: null });
});

app.post("/submit", async (req, res) => { 
  try {
    const { city, state } = req.body;

    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state}&limit=5&appid=${apikey}`
    );  

    const result = response.data[0];
    // console.log(result)  
    const lat=result.lat;
    const lon=result.lon;
    const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`);
    const weatherResult = weatherRes.data.main;
    const wind=weatherRes.data.wind;
    console.log(wind)
    // console.log(weatherResult);
    // console.log(weatherRes.data)
    res.render("index.ejs", { data: weatherResult ,wind:wind ,city:city,state:state });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      data: null,
      error: "Failed to fetch weather information.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});