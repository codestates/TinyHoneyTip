import axios from 'axios';
import { useState } from 'react';
import styles from '../../styles/Weather.module.css';

export default function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState({});

    async function search(e) {
        const url = 'https://api.openweathermap.org/data/2.5/';
        console.log(e.key);
        if (e.key === 'Enter') {
            await axios.get(`${url}weather?q=${city}&appid=${process.env.WEATHER_KEY}`).then((res) => {
                setWeatherData(res.data);
                setCity('');
                console.log(res.data);
            });
        }
    }

    const dateBuilder = (d) => {
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    };

    return (
        <div className={styles.weather_container}>
            오늘의 날씨 꿀팁
            <div
                className={
                    typeof weatherData?.main !== 'undefined'
                        ? weatherData?.main.temp - 273 > 16
                            ? 'app warm'
                            : 'app'
                        : 'app'
                }>
                <div className={styles.main}>
                    <div className={styles.search_container}>
                        <input
                            type="text"
                            className={styles.search_input}
                            placeholder="도시를 검색하세요"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            onKeyPress={search}
                        />
                    </div>
                    {typeof weatherData.main !== 'undefined' ? (
                        <div>
                            <div>
                                <div>
                                    {weatherData.name}, {weatherData.sys.country}
                                </div>
                                <div>{dateBuilder(new Date())}</div>
                            </div>
                            <div>
                                <div>{Math.round(weatherData.main.temp - 273)}°C</div>
                                <div>{weatherData.weather[0].main} </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            {/* <div>{weatherData?.main?.temp - 273}</div> */}
            {/* <div>{weatherData?.main?.humidity}</div> */}
            {/* <div>{weatherData?.weather[0]?.main}</div> */}
            {/* <div>{weatherData?.weather[0]?.description}</div> */}
            {/* <div><Image src={iconUrl} /></div> */}
            {/* <div>{weatherData?.wind?.speed}</div> */}
            {/* <div>{weatherData?.sys?.country}</div> */}
            {/* <div>{weatherData?.name}</div> */}
            {/* <div>{weatherData?.clouds?.all + '%'}</div> */}
        </div>
    );
}
