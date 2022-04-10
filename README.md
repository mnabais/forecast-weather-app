
<h1>Forecast Weather App</h1>


This web app will display the current weather as well as the forecast for the next 10 days, using the OpenWeatherMap API. 
If you allow the browser to get your location, it will show the weather of your current city, if not, Lisbon will be displayed by default. 
The user can add new locations/cities or remove them, and this will persist as they left it.

Technologies used: NextJS, Typescript, CSS, NodeJS and Yarn. 
And for the persisted information I used local storage.

## How To Use

To run this application, you'll need [Git](https://git-scm.com), [Node.js v12.21.0](https://nodejs.org/en/) or higher and [Yarn v1.19.1](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) or higher installed on your computer. 
From your command line:

```bash
# Get your api key and rename .env.sample to .env and replace yourapikey with your key
$ Create your api key in: https://openweathermap.org/api

# Clone this repository
$ git clone https://github.com/mnabais/forecast-weather-app.git

# Go into the repository
$ cd weather-app

# Install dependencies
$ yarn install

# Run the app
$ yarn dev

```

## Project Structure

```bash
forecast-weather-app
├── public
├── src
│   ├── components
│   │   └── current-weather
│   │       ├── CurrentWeather.tsx
│   ├── context
│   ├── models
│   ├── pages
│   ├── services
│   │   ├── OpenWeatherApi.tsx
│   ├── styles
│   │   ├── CurrentWeather.module.css
│   │   └── global.css
```