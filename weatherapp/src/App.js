import { useState } from 'react'
import './App.css'
import { WEATHER_API_KEY, WEATHER_API_URL } from './api'
import CurrentWeather from './components/current_weather/current_weather'
import Search from './components/search/search'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = searchData => {
    const [lat, lon] = searchData.value.split(' ')
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    )

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    )

    //https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async response => {
        const weatherResponse = await response[0].json()
        const forecastResponse = await response[1].json()

        setCurrentWeather({ city: searchData.label, ...weatherResponse })
        setForecast({ city: searchData.label, ...forecastResponse })
      })

      .catch(err => console.log(err))
  }

  console.log(currentWeather)
  console.log(forecast)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather />
    </div>
  )
}

export default App
