


const WEATHER_API_KEY = '8ed29dbf8c394b74a8b99ecbe6fcf215';

export const GetWeather = (lat = -37.91081377950439, lon = 145.26193064417538) => {

    return fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${WEATHER_API_KEY}&units=metric`
    )
        .then(
            (res) => {
                return res.json();
            }
        )

};
