// urls
const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx' //insert the open weather api
const aqiUrl = 'https://api.openweathermap.org/data/2.5/air_pollution?'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric'

// var
const loaderDiv = document.getElementById('loaderDiv')
const loaderText = document.getElementById('loaderText')
const loaderMsg = document.getElementById('loaderMsg')
const loaderErr = document.getElementById('loaderErr')
const loadingScreen = document.getElementById('loadingScreen')
// permission
const getPermission = () => {
    try {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (loc) => {
                // console.log(loc)
                try {
                    const cityRes = await fetch(apiUrl + `&lat=${loc.coords.latitude}` + `&lon=${loc.coords.longitude}` + `&appid=${apiKey}`)
                    if (cityRes.status == 200) {
                        const cityData = await cityRes.json()
                        const city = cityData.name
                        const loc = {
                            loc: city,
                            permission: 'allowed',
                        }
                        localStorage.setItem('location', JSON.stringify(loc))
                        loaderText.style.display = 'none';
                        loaderMsg.style.display = 'block'
                        const day = new Date().getDate() + 1
                        fetchWeather(city)
                        fetchForecast(city)
                        fetchFullForecast(day, city)
                        fetchAir(city)
                        setTimeout(() => {
                            loaderDiv.style.display = 'none'
                        }, 1000)
                    }
                } catch (err) {
                    console.log(err)
                }
            })
        } else {
            alert('Permission denied')
        }
    } catch (err) {
        console.log(err)
    }

}

// permission cancel
const permCancel = () => {
    loaderText.style.display = 'none'
    loaderErr.style.display = 'block'
    const loc = {
        loc: '',
        permission: 'denied',
    }
    localStorage.setItem('location', JSON.stringify(loc))

    setTimeout(() => {
        loaderDiv.style.display = 'none'
    }, 2000)

}

// on load functions
const themeChange = document.getElementById('themeChange')
const homeLink = document.getElementById('homeLink')
const forecastLink = document.getElementById('forecastLink')
const aqiLink = document.getElementById('aqiLink')
const mobHome = document.getElementById('mobHome')
const mobForecast = document.getElementById('mobForecast')
const mobAqi = document.getElementById('mobAqi')
const links = document.querySelectorAll('.link')
const mobLinks = document.querySelectorAll('.mobLinks')

window.addEventListener("load", () => {
    // console.log(location.href)
    const href = location.href
    const splitHref = href.split('/')

    const loc = localStorage.getItem('location')
    if (loc) {
        const _loc = JSON.parse(loc)
        if (_loc.permission == 'allowed') {
            loaderDiv.style.display = 'none'
            loadingScreen.style.display = 'flex'
            // console.log(loc)
            try {
                navigator.geolocation.getCurrentPosition(async (loc) => {
                    // console.log(loc)
                    try {
                        const cityRes = await fetch(apiUrl + `&lat=${loc.coords.latitude}` + `&lon=${loc.coords.longitude}` + `&appid=${apiKey}`)
                        if (cityRes.status == 200) {
                            const cityData = await cityRes.json()
                            const city = cityData.name
                            const loc = {
                                loc: city,
                                permission: 'allowed',
                            }
                            localStorage.setItem('location', JSON.stringify(loc))
                            loaderText.style.display = 'none';
                            loaderMsg.style.display = 'block'
                            const day = new Date().getDate() + 1
                            fetchWeather(city)
                            fetchForecast(city)
                            fetchFullForecast(day, city)
                            fetchAir(city)
                            setTimeout(() => {
                                loadingScreen.style.display = 'none'
                            }, 1000)
                        }
                    } catch (err) {
                        console.log(err)
                    }
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            loaderText.style.display = 'none',
                loaderErr.style.display = 'block',
                setTimeout(() => {
                    loaderDiv.style.display = 'none'
                }, 2000)
        }

    } else {
        loaderDiv.style.display = 'flex'
        loadingScreen.style.display = 'none'
    }

    // console.log(splitHref)
    if (splitHref[3] == '') {
        links.forEach((elem) => {
            // console.log(elem)
            elem.classList.remove('linkActive')
        })
        homeLink.classList.add('linkActive')

        mobLinks.forEach((elem) => {
            elem.classList.remove('mobActive')
        })
        mobHome.classList.add('mobActive')
    } else if (splitHref[3] == 'forecast') {
        links.forEach((elem) => {
            // console.log(elem)
            elem.classList.remove('linkActive')
        })
        forecastLink.classList.add('linkActive')

        mobLinks.forEach((elem) => {
            elem.classList.remove('mobActive')
        })
        mobForecast.classList.add('mobActive')
    } else if (splitHref[3] == 'aqi') {
        links.forEach((elem) => {
            // console.log(elem)
            elem.classList.remove('linkActive')
        })
        aqiLink.classList.add('linkActive')

        mobLinks.forEach((elem) => {
            elem.classList.remove('mobActive')
        })
        mobAqi.classList.add('mobActive')
    }
    const hour = new Date().getHours()

    if (hour > 6 && hour < 19) {
        themeChange.setAttribute('href', 'css/styles.css')
    } else {
        themeChange.setAttribute('href', 'css/dark.css')
    }
})


// scroll function

function scrollRight(divName) {
    const scroll = document.getElementById(divName).scrollLeft
    // console.log(scroll)
    document.getElementById(divName).scroll({
        top: 0,
        left: scroll + 200,
        behavior: "smooth"
    })
}
function leftScroll(divName) {
    const scroll = document.getElementById(divName).scrollLeft
    // console.log(scroll)
    document.getElementById(divName).scroll({
        top: 0,
        left: scroll - 200,
        behavior: "smooth"
    })
}

// all var
const loc = document.getElementById("location")
const mainImg = document.getElementById("mainImg")
const mainTemp = document.getElementById("mainTemp")
const mainCardDiv = document.getElementById("mainCardDiv")
const mainClimate = document.getElementById("mainClimate")
const searchInput = document.getElementById("searchInput")
const aqiData = document.getElementById("aqiData")
const aqiContent = document.getElementById("aqiContent")
const sunRise = document.getElementById("sunRise")
const sunSet = document.getElementById("sunSet")
const forecastCardDiv = document.getElementById("forecastCardDiv")
const forecastDiv = document.getElementById("forecastDiv")
const forecastDetailsDiv = document.getElementById("forecastDetailsDiv")
const aqiCardDiv = document.getElementById("aqiCardDiv")
const errMsgDiv = document.getElementById("errMsgDiv")

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];


// images
const newdate = new Date();
const hour = newdate.getHours();

const sun = hour > 6 && hour < 19 ? 'images/sun.png' : 'images/moon.png'
const few_clouds = hour > 6 && hour < 19 ? 'images/clouds-day.png' : 'images/clouds-night-1.png'
const clouds = hour > 6 && hour < 19 ? 'images/clouds.png' : 'images/clouds-night.png'
const rain = hour > 6 && hour < 19 ? 'images/rain.png' : 'images/rainy-night.png'
const heavy_rain = 'images/heavy-rain.png'
const thunderstorm = 'images/thunder.png'
const snow = 'images/snowing.png'
const mist = hour > 6 && hour < 19 ? 'images/fog-day.png' : 'images/fog-night.png'

// image function
const image = (climate) => {
    if (climate == "clear sky") {
        return sun
    } else if (climate == "few clouds") {
        return few_clouds
    } else if (climate == "scattered clouds" || climate == "broken clouds" || climate == "overcast clouds") {
        return clouds
    } else if (climate == "shower rain" || climate == "rain" || climate == "light rain" || climate == "moderate rain") {
        return rain
    } else if (climate == "heavy rain" || climate == "heavy intensity rain") {
        return heavy_rain
    } else if (climate == "thunderstorm") {
        return thunderstorm
    } else if (climate == "snow") {
        return snow
    } else if (climate == "mist" || climate == "haze") {
        return mist
    } else {
        return few_clouds
    }
}

// fetch aqi

const fetchAqi = async (cityname) => {
    try {
        const cityRes = await fetch('https://api.openweathermap.org/data/2.5/weather?' + `q=${cityname}` + `&appid=${apiKey}`)
        if (cityRes.status == 200) {
            errMsgDiv.style.display='none'
            const cityData = await cityRes.json()
            const lat = cityData.coord.lat
            const lon = cityData.coord.lon
            const city = cityData.name
            const country = cityData.sys.country

            // console.log('lat : ',lat,' lon : ',lon)
            try {
                const res = await fetch(aqiUrl + `lat=${lat}` + `&lon=${lon}` + `&appid=${apiKey}`)
                if (res.status == 200) {
                    const data = await res.json()
                    const airData = {
                        city: city,
                        country: country,
                        co: data.list[0].components.co,
                        nh3: data.list[0].components.nh3,
                        no: data.list[0].components.no,
                        no2: data.list[0].components.no2,
                        o3: data.list[0].components.o3,
                        pm2_5: data.list[0].components.pm2_5,
                        pm10: data.list[0].components.pm10,
                        so2: data.list[0].components.so2,
                        mainAqi: data.list[0].main.aqi
                    }
                    // console.log('data : ',airData);
                    return airData;
                }
            } catch (error) {
                console.log(error);
            }
        }else{
            errMsgDiv.style.display='flex'
        }
    } catch (err) {
        console.log(err)
    }
}

// fetch current weather
const fetchWeather = async (cityname) => {
    try {
        const res = await fetch(apiUrl + `&q=${cityname}` + `&appid=${apiKey}`)
        if (res.status == 200) {
            errMsgDiv.style.display='none'
            const data = await res.json()
            console.log(data)
            loc.innerHTML = `${data.name} , ${data.sys.country}`
            const img = image(data.weather[0].description)
            mainImg.setAttribute('src', img)
            mainTemp.innerHTML = data.main.temp + `&deg;C`
            mainClimate.innerHTML = data.weather[0].description

            const details = [
                {
                    id: 1,
                    icon: "<i class='bx bxs-thermometer'></i>",
                    title: 'Feels Like',
                    text: `${data.main.feels_like} &deg;C`
                },
                {
                    id: 2,
                    icon: "<i class='bx bx-wind'></i>",
                    title: 'Wind Speed',
                    text: `${data.wind.speed} m/s`
                },
                {
                    id: 3,
                    icon: "<i class='bx bx-droplet' ></i>",
                    title: 'Humidity',
                    text: `${data.main.humidity} %`
                },
                {
                    id: 4,
                    icon: "<i class='bx bx-tachometer' ></i>",
                    title: 'Pressure',
                    text: `${data.main.pressure} hPa`
                }
            ]

            const detailsMap = details.map((elm) => {
                return (
                    `<div class="card">
                        ${elm.icon}
                        <p>${elm.title}</p>
                        <p class="text">${elm.text}</p>
                    </div>`
                )
            })
            // console.log(detailsMap)
            let _details = "";

            for (let i = 0; i < detailsMap.length; i++) {
                _details += detailsMap[i]
            }

            mainCardDiv.innerHTML = _details
            const sunrise = data === null ? '1688947559' : data.sys.sunrise
            const sunset = data === null ? '1688997317' : data.sys.sunset

            const sunrise_date = new Date(sunrise * 1000)
            const _sunrise = sunrise_date.toLocaleTimeString()

            const sunset_date = new Date(sunset * 1000)
            const _sunset = sunset_date.toLocaleTimeString()

            sunRise.innerHTML = _sunrise
            sunSet.innerHTML = _sunset

            const airData = await fetchAqi(cityname)
            // console.log(airData)
            let cond;
            let color;

            if (airData == null) {
                cond = 'Good'
                color = '#69B34C'
            } else {
                if (airData.mainAqi <= 1) {
                    cond = 'Good';
                    // color = '#63FF00';
                    color = '#69B34C'
                } else if (airData.mainAqi <= 2) {
                    cond = 'Fair';
                    color = '#ACB334';
                } else if (airData.mainAqi <= 3) {
                    cond = 'Moderate';
                    color = '#FAB733';
                } else if (airData.mainAqi <= 4) {
                    cond = 'Poor';
                    color = '#FF8E15';
                } else if (airData.mainAqi > 4) {
                    cond = 'Very Poor';
                    color = '#FF4E11';
                }
            }

            aqiData.innerHTML = `${cond} (${airData.mainAqi})`
            aqiData.style.color = color

            aqiContent.innerHTML = `'${cond}'`
            aqiContent.style.color = color
        }else{
            errMsgDiv.style.display='flex'
        }
    } catch (err) {
        console.log(err)
    }
}

// fetch forecast
const fetchForecastData = async (cityname) => {
    try {
        const res = await fetch(forecastUrl + `&q=${cityname}` + `&appid=${apiKey}`)
        if (res.status == 200) {
            errMsgDiv.style.display='none'
            const data = await res.json()
            console.log(data)
            const day = new Date().getDate()
            const month = new Date().getMonth()

            const day1 = day + 1 < lastDay[month] ? day + 1 : 1
            const day2 = day + 2 < lastDay[month] ? day + 2 : 2
            const day3 = day + 3 < lastDay[month] ? day + 3 : 3
            const day4 = day + 4 < lastDay[month] ? day + 4 : 4
            const day5 = day + 5 < lastDay[month] ? day + 5 : 5

            const array1 = [], array2 = [], array3 = [], array4 = [], array5 = [];

            for (let i = 0; i < 40; i++) {
                const newdate = data.list[i].dt_txt;
                const splitDate = newdate.split('-');
                const currentdate = splitDate[2].split(' ')
                // console.log("current date:", currentdate);

                // if (currentdate[0] == day) {
                //     array1.push(data.list[i])
                // }
                if (currentdate[0] == day1) {
                    array1.push(data.list[i])
                }
                if (currentdate[0] == day2) {
                    array2.push(data.list[i])
                }
                if (currentdate[0] == day3) {
                    array3.push(data.list[i])
                }
                if (currentdate[0] == day4) {
                    array4.push(data.list[i])
                }
                if (currentdate[0] == day5) {
                    array5.push(data.list[i])
                }
            }
            const forecastData = {
                city: data.city.name,
                country: data.city.country,
                day_1: array1,
                day_2: array2,
                day_3: array3,
                day_4: array4,
                day_5: array5,
            }

            return forecastData
        }else{
            errMsgDiv.style.display='flex'
        }
    } catch (err) {
        console.log(err)
    }
}

const fetchForecast = async (cityname) => {
    try {
        const data = await fetchForecastData(cityname)
        console.log(data)
        const day = new Date().getDate()
        const month = new Date().getMonth()
        const weekDay = new Date().getDay()

        const day1 = day + 1 < lastDay[month] ? day + 1 : 1
        const day2 = day + 2 < lastDay[month] ? day + 2 : 2
        const day3 = day + 3 < lastDay[month] ? day + 3 : 3
        const day4 = day + 4 < lastDay[month] ? day + 4 : 4
        const day5 = day + 5 < lastDay[month] ? day + 5 : 5

        const details = [
            {
                day: day1,
                month: day + 1 > lastDay[month] ? month + 1 > 11 ? months[0] : months[month + 1] : months[month],
                weekDay: weekDay + 1 > 6 ? weekDays[0 + (weekDay + 1) - 7] : weekDays[weekDay + 1],
                data: data.day_1[0]
            },
            {
                day: day2,
                month: day + 2 > lastDay[month] ? month + 1 > 11 ? months[0] : months[month + 1] : months[month],
                weekDay: weekDay + 2 > 6 ? weekDays[0 + (weekDay + 2) - 7] : weekDays[weekDay + 2],
                data: data.day_2[0]
            },
            {
                day: day3,
                month: day + 3 > lastDay[month] ? month + 1 > 11 ? months[0] : months[month + 1] : months[month],
                weekDay: weekDay + 3 > 6 ? weekDays[0 + (weekDay + 3) - 7] : weekDays[weekDay + 3],
                data: data.day_3[0]
            },
            {
                day: day4,
                month: day + 4 > lastDay[month] ? month + 1 > 11 ? months[0] : months[month + 1] : months[month],
                weekDay: weekDay + 4 > 6 ? weekDays[0 + (weekDay + 4) - 7] : weekDays[weekDay + 4],
                data: data.day_4[0]
            },
            {
                day: day5,
                month: day + 5 > lastDay[month] ? month + 1 > 11 ? months[0] : months[month + 1] : months[month],
                weekDay: weekDay + 5 > 6 ? weekDays[0 + (weekDay + 5) - 7] : weekDays[weekDay + 5],
                data: data.day_5 == [] ? null : data.day_5[0]
            },
        ]

        const detailsMap = details.map((elm) => {
            if (elm.data != null) {
                return (
                    `
                    <div class="card">
                    <div class="dateDiv">
                        <p>${elm.weekDay}</p>
                        <p>${elm.day} ${elm.month}</p>
                    </div>
                    <div class="detailsDiv">
                        <img src="${image(elm.data.weather[0].description)}" alt="img">
                        <div class="tempDiv">
                            <h2>${elm.data.main.temp} &deg;C</h2>
                            <p>${elm.data.weather[0].description}</p>
                        </div>
                    </div>
                    <div class="cardDiv">
                        <div class="card">
                            <i class='bx bxs-thermometer'></i>
                            <div class="detail">
                                <p class="text">${elm.data.main.feels_like} &deg;C</p>
                                <p>Feels Like</p>
                            </div>
                        </div>
                        <div class="card">
                            <i class='bx bx-wind'></i>
                            <div class="detail">
                                <p class="text">${elm.data.wind.speed} m/s</p>
                                <p>wind Speed</p>
                            </div>
                        </div>
                        <div class="card">
                            <i class='bx bx-droplet' ></i>
                            <div class="detail">
                                <p class="text">${elm.data.main.humidity} %</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div class="card">
                            <i class='bx bx-tachometer' ></i>
                            <div class="detail">
                                <p class="text">${elm.data.main.pressure} hPa</p>
                                <p>Air Pressure</p>
                            </div>
                        </div>
                    </div>
                </div>
                    `
                )
            }

        })

        let _details = ''

        for (let i = 0; i < 5; i++) {
            _details += detailsMap[i]
        }

        forecastCardDiv.innerHTML = _details

    } catch (err) {
        console.log(err)
    }
}

const fetchFullForecast = async (date, cityname) => {
    try {
        const data = await fetchForecastData(cityname)
        const day = new Date().getDate()
        const month = new Date().getMonth()
        const weekDay = new Date().getDay()

        loc.innerHTML = `${data.city} , ${data.country}`

        const day1 = day + 1 < lastDay[month] ? day + 1 : 1
        const day2 = day + 2 < lastDay[month] ? day + 2 : 2
        const day3 = day + 3 < lastDay[month] ? day + 3 : 3
        const day4 = day + 4 < lastDay[month] ? day + 4 : 4
        const day5 = day + 5 < lastDay[month] ? day + 5 : 5

        const details = [
            {
                day: day1,
                month: day + 1 > lastDay[month] ? month + 1 > 11 ? months[0] : months[month + 1] : months[month],
                weekDay: weekDay + 1 > 6 ? weekDays[0 + (weekDay + 1) - 7] : weekDays[weekDay + 1],
                data: data.day_1[0],
                arg: data.day_1,
            },
            {
                day: day2,
                month: day + 2 > lastDay[month] ? month + 1 > 11 ? months[0] : months[month + 1] : months[month],
                weekDay: weekDay + 2 > 6 ? weekDays[0 + (weekDay + 2) - 7] : weekDays[weekDay + 2],
                data: data.day_2[0],
                arg: data.day_2,
            },
            {
                day: day3,
                month: day + 3 > lastDay[month] ? month + 1 > 11 ? months[0] : months[month + 1] : months[month],
                weekDay: weekDay + 3 > 6 ? weekDays[0 + (weekDay + 3) - 7] : weekDays[weekDay + 3],
                data: data.day_3[0],
                arg: data.day_3,
            },
            {
                day: day4,
                month: day + 4 > lastDay[month] ? month + 1 > 11 ? months[0] : months[month + 1] : months[month],
                weekDay: weekDay + 4 > 6 ? weekDays[0 + (weekDay + 4) - 7] : weekDays[weekDay + 4],
                data: data.day_4[0],
                arg: data.day_4,
            },
            {
                day: day5,
                month: day + 5 > lastDay[month] ? month + 1 > 11 ? months[0] : months[month + 1] : months[month],
                weekDay: weekDay + 5 > 6 ? weekDays[0 + (weekDay + 5) - 7] : weekDays[weekDay + 5],
                data: data.day_5 == [] ? null : data.day_5[0],
                arg: data.day_5,
            },
        ]

        const detailsMap = details.map((elm) => {
            if (elm.data != null) {
                return (
                    `
                    <div class="card">
                    <div class="dateDiv">
                        <p>${elm.weekDay}</p>
                        <p>${elm.day} ${elm.month}</p>
                    </div>
                    <div class="detailsDiv">
                        <img src="${image(elm.data.weather[0].description)}" alt="img">
                        <div class="tempDiv">
                            <h2>${elm.data.main.temp} &deg;C</h2>
                            <p>${elm.data.weather[0].description}</p>
                        </div>
                    </div>
                    <div class="cardDiv">
                        <div class="card">
                            <i class='bx bxs-thermometer'></i>
                            <div class="detail">
                                <p class="text">${elm.data.main.feels_like} &deg;C</p>
                                <p>Feels Like</p>
                            </div>
                        </div>
                        <div class="card">
                            <i class='bx bx-wind'></i>
                            <div class="detail">
                                <p class="text">${elm.data.wind.speed} m/s</p>
                                <p>wind Speed</p>
                            </div>
                        </div>
                        <div class="card">
                            <i class='bx bx-droplet' ></i>
                            <div class="detail">
                                <p class="text">${elm.data.main.humidity} %</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div class="card">
                            <i class='bx bx-tachometer' ></i>
                            <div class="detail">
                                <p class="text">${elm.data.main.pressure} hPa</p>
                                <p>Air Pressure</p>
                            </div>
                        </div>
                    </div>
                    <div class="btn" onclick={fetchFullForecast(${elm.day},'${cityname}')}>
                    <p>See full details</p>
                </div>
                </div>
                    `
                )
            }
            data.day_1
        })

        let _details = ''

        for (let i = 0; i < 5; i++) {
            _details += detailsMap[i]
        }

        forecastDiv.innerHTML = _details

        let _date
        if (date == day1) {
            _date = data.day_1
        } else if (date == day2) {
            _date = data.day_2
        } else if (date == day3) {
            _date = data.day_3
        } else if (date == day4) {
            _date = data.day_4
        } else if (date == day5) {
            _date = data.day_5
        }

        const fullDetails = _date.map((elm) => {

            return (
                `<div class="card">
                <div class="dateDiv" style="justify-content:center;">
                    <p>${elm.dt_txt}</p>
                </div>
                <div class="detailsDiv">
                    <img src="${image(elm.weather[0].description)}" alt="img">
                    <div class="tempDiv">
                        <h2>${elm.main.temp} &deg;C</h2>
                        <p>${elm.weather[0].description}</p>
                    </div>
                </div>
                <div class="cardDiv">
                    <div class="card">
                        <i class='bx bxs-thermometer'></i>
                        <div class="detail">
                            <p class="text">${elm.main.feels_like} &deg;C</p>
                            <p>Feels Like</p>
                        </div>
                    </div>
                    <div class="card">
                        <i class='bx bx-wind'></i>
                        <div class="detail">
                            <p class="text">${elm.wind.speed} m/s</p>
                            <p>wind Speed</p>
                        </div>
                    </div>
                    <div class="card">
                        <i class='bx bx-droplet' ></i>
                        <div class="detail">
                            <p class="text">${elm.main.humidity} %</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div class="card">
                        <i class='bx bx-tachometer' ></i>
                        <div class="detail">
                            <p class="text">${elm.main.pressure} hPa</p>
                            <p>Air Pressure</p>
                        </div>
                    </div>
                </div>
            </div>`
            )
        })

        let _fullDetails = ''

        for (let i = 0; i < fullDetails.length; i++) {
            _fullDetails += fullDetails[i]
        }

        forecastDetailsDiv.innerHTML = _fullDetails



    } catch (err) {
        console.log(err)
    }
}

// fetch aqi

const fetchAir = async (cityname) => {
    try {
        const airData = await fetchAqi(cityname)
        console.log(airData)
        let cond;
        let color;

        if (airData == null) {
            cond = 'Good'
            color = '#69B34C'
        } else {
            if (airData.mainAqi <= 1) {
                cond = 'Good';
                // color = '#63FF00';
                color = '#69B34C'
            } else if (airData.mainAqi <= 2) {
                cond = 'Fair';
                color = '#ACB334';
            } else if (airData.mainAqi <= 3) {
                cond = 'Moderate';
                color = '#FAB733';
            } else if (airData.mainAqi <= 4) {
                cond = 'Poor';
                color = '#FF8E15';
            } else if (airData.mainAqi > 4) {
                cond = 'Very Poor';
                color = '#FF4E11';
            }
        }

        aqiData.innerHTML = `${cond} (${airData.mainAqi})`
        aqiData.style.color = color

        aqiContent.innerHTML = `'${cond}'`
        aqiContent.style.color = color

        const data = [
            {
                id: '1',
                gas: 'CO',
                data: airData == null ? '340' : Math.round(airData.co)
            },
            {
                id: '2',
                gas: 'PM2.5',
                data: airData == null ? '200' : Math.round(airData.pm2_5)
            },
            {
                id: '3',
                gas: 'NO2',
                data: airData == null ? '200' : Math.round(airData.no2)
            },
            {
                id: '4',
                gas: 'O3',
                data: airData == null ? '340' : Math.round(airData.o3)
            },
            {
                id: '5',
                gas: 'PM10',
                data: airData == null ? '340' : Math.round(airData.pm10)
            },
            {
                id: '6',
                gas: 'SO2',
                data: airData == null ? '340' : Math.round(airData.so2)
            },
        ]

        const details = data.map((elem) => {
            let cond;
            let color;
            const gasName = elem.gas
            const gasData = elem.data

            if (gasName == 'CO') {
                if (0 < gasData && gasData <= 4400) {
                    cond = 'Good';
                    // color = '#63FF00';
                    color = '#69B34C'
                } else if (4400 < gasData && gasData <= 9400) {
                    cond = 'Fair';
                    color = '#ACB334';
                } else if (9400 < gasData && gasData <= 12400) {
                    cond = 'Moderate';
                    color = '#FAB733';
                } else if (12400 < gasData && gasData <= 15400) {
                    cond = 'Poor';
                    color = '#FF8E15';
                } else if (gasData > 15400) {
                    cond = 'Very Poor';
                    color = '#FF4E11';
                }

            } else if (gasName == 'O3') {
                if (0 < gasData && gasData <= 60) {
                    cond = 'Good';
                    // color = '#63FF00';
                    color = '#69B34C'
                } else if (60 < gasData && gasData <= 100) {
                    cond = 'Fair';
                    color = '#ACB334';
                } else if (100 < gasData && gasData <= 140) {
                    cond = 'Moderate';
                    color = '#FAB733';
                } else if (140 < gasData && gasData <= 180) {
                    cond = 'Poor';
                    color = '#FF8E15';
                } else if (gasData > 180) {
                    cond = 'Very Poor';
                    color = '#FF4E11';
                }
            } else if (gasName == 'NO2') {
                if (0 < gasData && gasData <= 40) {
                    cond = 'Good';
                    // color = '#63FF00';
                    color = '#69B34C'
                } else if (40 < gasData && gasData <= 70) {
                    cond = 'Fair';
                    color = '#ACB334';
                } else if (70 < gasData && gasData <= 150) {
                    cond = 'Moderate';
                    color = '#FAB733';
                } else if (150 < gasData && gasData <= 200) {
                    cond = 'Poor';
                    color = '#FF8E15';
                } else if (gasData > 200) {
                    cond = 'Very Poor';
                    color = '#FF4E11';
                }
            } else if (gasName == 'SO2') {
                if (0 < gasData && gasData <= 20) {
                    cond = 'Good';
                    // color = '#63FF00';
                    color = '#69B34C'
                } else if (20 < gasData && gasData <= 80) {
                    cond = 'Fair';
                    color = '#ACB334';
                } else if (80 < gasData && gasData <= 250) {
                    cond = 'Moderate';
                    color = '#FAB733';
                } else if (250 < gasData && gasData <= 350) {
                    cond = 'Poor';
                    color = '#FF8E15';
                } else if (gasData > 350) {
                    cond = 'Very Poor';
                    color = '#FF4E11';
                }
            }
            else if (gasName == 'PM2.5') {
                if (0 < gasData && gasData <= 10) {
                    cond = 'Good';
                    // color = '#63FF00';
                    color = '#69B34C'
                } else if (10 < gasData && gasData <= 20) {
                    cond = 'Fair';
                    color = '#ACB334';
                } else if (20 < gasData && gasData <= 50) {
                    cond = 'Moderate';
                    color = '#FAB733';
                } else if (50 < gasData && gasData <= 75) {
                    cond = 'Poor';
                    color = '#FF8E15';
                } else if (gasData > 75) {
                    cond = 'Very Poor';
                    color = '#FF4E11';
                }
            }
            else if (gasName == 'PM10') {
                if (0 < gasData && gasData <= 20) {
                    cond = 'Good';
                    // color = '#63FF00';
                    color = '#69B34C'
                } else if (20 < gasData && gasData <= 50) {
                    cond = 'Fair';
                    color = '#ACB334';
                } else if (50 < gasData && gasData <= 100) {
                    cond = 'Moderate';
                    color = '#FAB733';
                } else if (100 < gasData && gasData <= 200) {
                    cond = 'Poor';
                    color = '#FF8E15';
                } else if (gasData > 200) {
                    cond = 'Very Poor';
                    color = '#FF4E11';
                }
            }
            return (
                `<div class="card">
                <div class="title">
                    <i class='bx bx-wind' style="margin-right: 5px;"></i>
                    <p style="margin-right: 5px;">${elem.gas}</p>
                    <p style="color: ${color};"> (${cond})</p>
                </div>
                <div class="data">
                    <p>Concentration</p>
                    <p>${elem.data} μg/m3</p>
                </div>
            </div>`
            )
        })

        let _details = ''
        for (let i = 0; i < details.length; i++) {
            _details += details[i]
        }

        aqiCardDiv.innerHTML = _details

    } catch (err) {
        console.log(err)
    }
}



// search input
searchInput.addEventListener('keypress', (e) => {
    const day = new Date().getDate() + 1;
    if (e.key == 'Enter') {
        fetchWeather(searchInput.value)
        fetchForecast(searchInput.value)
        fetchFullForecast(day, searchInput.value)
        fetchAir(searchInput.value)
        // console.log(data)
    }
})
