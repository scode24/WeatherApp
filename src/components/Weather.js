import React, { useState } from 'react'
import '../styles/Weather.css'
import cloudyIcon from '../icons/cloudy.png'
import partlyCloudyIcon from '../icons/partly-cloudy.png'
import rainyIcon from '../icons/rainy.png'
import sunnyIcon from '../icons/sunny.png'
import temperatureIcon from '../icons/temperature.png'
import windIcon from '../icons/wind.png'
import humidityIcon from '../icons/humidity.png'

export const Weather = () => {

    const [responseData, setResponseData] = useState(null)

    const [weatherIcon, setWeatherIcon] = useState(null)

    const [weatherDesc, setWeatherDesc] = useState(null)

    const [isLoadingVisible, setIsLoadingVisible] = useState(false)


    const fetchData = async () => {

        setIsLoadingVisible(true)
        let location = document.getElementById("location-input").value
        if (location === "") {
            alert("Please enter a location")
        } else {
            console.log("Working...")
            console.log(location)

            const response = await fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=" + location + "&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "7c59843141msh3e5f03f624311e6p12cc40jsnf2b1119d94cd",
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
                }
            })

            const data = await response.json();
            setResponseData(data)
            setIsLoadingVisible(false)
            setIconBasedOnWeather(data.weather[0].description)
        }
    }

    const setIconBasedOnWeather = (data) => {

        var weather = data.toLowerCase()

        if (weather.indexOf("overcast") >= 0) {
            setWeatherDesc("Overcast")
            setWeatherIcon(partlyCloudyIcon)
        } else if (weather.indexOf("cloud") >= 0 && weather.indexOf("overcast") < 0) {
            setWeatherDesc("Cloudy")
            setWeatherIcon(cloudyIcon)
        } else if (weather.indexOf("sun") >= 0) {
            setWeatherDesc("Sunny")
            setWeatherIcon(sunnyIcon)
        } else if (weather.indexOf("rain") >= 0) {
            setWeatherDesc("Rainy")
            setWeatherIcon(rainyIcon)
        }
    }

    return (

        <div className="card-container">
            <div className="card-view">
                <div className="card-view-header">
                    <strong>Weather Check</strong>
                </div>

                <div className="search-conatiner">
                    <input id="location-input" placeholder="Search location" required></input>
                    <button onClick={() => fetchData()}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 0 24 24" width="17px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                    </button>
                </div>

                <div className="card-view-content">

                    {
                        isLoadingVisible ? <span>Loading data...</span>
                            :
                            <span></span>
                    }


                    {responseData ?
                        <>
                            <div className="info-display-card">
                                <div className="icon-space">
                                    <img src={weatherIcon} alt="temp-icon"></img>
                                </div>
                                <div className="info-space">
                                    <small>Weather</small>
                                    <span className="info-value">{weatherDesc}</span>
                                </div>
                            </div>

                            <div className="info-display-card">
                                <div className="icon-space">
                                    <img src={temperatureIcon} alt="temp-icon"></img>
                                </div>
                                <div className="info-space">
                                    <small>Temperature</small>
                                    <span className="info-value">{responseData.main.temp}&#8451;</span>
                                </div>
                            </div>

                            <div className="info-display-card">
                                <div className="icon-space">
                                    <img src={humidityIcon} alt="temp-icon"></img>
                                </div>
                                <div className="info-space">
                                    <small>Humidity</small>
                                    <span className="info-value">{responseData.main.humidity}unit;</span>
                                </div>
                            </div>

                            <div className="info-display-card">
                                <div className="icon-space">
                                    <img src={windIcon} alt="temp-icon"></img>
                                </div>
                                <div className="info-space">
                                    <small>Wind Speed</small>
                                    <span className="info-value">{responseData.wind.speed}km/hr</span>
                                </div>
                            </div>

                        </>

                        :
                        <>

                        </>
                    }
                </div>

            </div>
        </div>
    )

}
