import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../styles/Weather.module.css';
import Image from 'next/image';

export default function Weather({ weatherData }) {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(weatherData);

    async function search(e) {
        const url = 'https://api.openweathermap.org/data/2.5/';
        if (e.key === 'Enter') {
            await axios
                .get(`${url}weather?q=${city.toLowerCase()}&appid=${process.env.WEATHER_KEY}`)
                .then((res) => {
                    setWeather(res.data);
                    setCity('');
                })
                .catch((err) => window.alert('도시 이름이 없습니다.'));
        }
    }
    const weatherIcon = 'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png';

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
        return `${day} ${date} ${month} ${year}`;
    };

    return (
        <div className={styles.weather_container}>
            <div className={styles.weather_title}>
                <p className={styles.weatherIcon}>
                    <Image src={weatherIcon} width="50px" height="50px" />
                </p>
                오늘의 날씨 꿀팁
            </div>
            <div
                className={
                    typeof weather?.main !== 'undefined'
                        ? weather?.main.temp - 273 > 25
                            ? 'app summer'
                            : weather?.main.temp - 273 > 15
                            ? 'app lSummer'
                            : weather?.main.temp - 273 > 10
                            ? 'app fall'
                            : weather?.main.temp - 273 > 5
                            ? 'app lFall'
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
                    {typeof weather.main !== 'undefined' ? (
                        <div>
                            <div className={styles.location}>
                                <div className={styles.location_container}>
                                    {weather.name}, {weather.sys.country}
                                </div>
                                <div className={styles.date}>{dateBuilder(new Date())}</div>
                            </div>
                            <div className={styles.weather_box}>
                                <div className={styles.temp}>{Math.round(weather.main.temp - 273)}°C</div>
                                <div className={styles.weather}>{weather.weather[0].main}</div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>

            {/* <div>{weatherData?.main?.temp - 273}</div> */}
            {/* <div>{weatherData?.weather[0]?.main}</div> */}
            {/* <div><Image src={iconUrl} /></div> */}
            {/* <div>{weatherData?.wind?.speed}</div> */}
            {/* <div>{weatherData?.sys?.country}</div> */}
            {/* <div>{weatherData?.name}</div> */}
            {/* <div>{weatherData?.clouds?.all + '%'}</div> */}
        </div>
    );
}