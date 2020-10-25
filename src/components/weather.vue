<template>
<div class="office-weather">
    <md-card class="md-elevation-0">
        <!-- <md-card-area md-inset>
            <md-card-media md-ratio="16:9">
                <img :src="cityImage" alt="Coffee House">
            </md-card-media>

            <md-card-header>
                <h2 class="md-title">{{city}} office</h2>
            </md-card-header>

            <md-card-content>
                <address>
                    Dummy Address
                    Lorem Ipsum Sit Amet
                    Dummy Pin
                    Dummy place
                    Telephone : 1-800-123-4567
                    Email : info@dummy.com
                </address>
            </md-card-content>
        </md-card-area> -->

        <md-card-content>
            <h3 class="md-subheading">Weather</h3>
            <div class="office-weather__container">
                <div v-for="weather in weatherList" :key="weather.id">
                    <p class="office-weather__cityArea">
                        <span>{{city}}</span>
                        <span> {{date}} </span>
                    </p>
                    <md-content class="md-elevation-0 office-weather__tiles -tiles">
                        <img class="office__weatherType" :src="weatherLogo + weather.weather_state_abbr + logoType" alt="weather" />
                        <div class="office__tempratureDetails">
                            <span class="md-body-1 office__temprature">
                                <span class="md-caption office__maxTemp">{{Math.trunc(weather.max_temp)}}<sup>°C</sup></span> /
                                <span class="md-caption">{{Math.trunc(weather.min_temp)}}<sup>°C</sup></span>
                            </span>
                            <span class="md-subheading office_weatherType">{{weather.weather_state_name}}</span>
                        </div>
                    </md-content>
                </div>
                <div class="md-body-2">
                    {{weatherNotLoadedMessage}}
                </div>
            </div>
        </md-card-content>
    </md-card>
</div>
</template>

<style lang="scss" scoped>
.office-weather {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;

    .office-weather__container {
        display: flex;
        flex-flow: row;
        text-align: left;
        justify-content: center;
        padding: 12px 0;
    }

    .office__tempratureDetails {
        display: flex;
        flex-flow: column;
    }

    .md-content {
        padding: 12px;
    }

    .md-card {
        width: 320px;
        border-radius: 4px;
        display: inline-block;
        vertical-align: top;
    }

    .md-caption {
        font-size: 24px;
    }

    .office__temprature,
    .office_weatherType {
        padding: 4px 20px;
        font-size: 20px;

        sup {
            font-size: 14px;
        }
    }

    .office__maxTemp {
        color: #333;
    }

    .office-weather__tiles {
        &.-tiles {
            display: flex;
            justify-content: space-evenly;
            align-items: flex-start;
        }
    }

    .office__weatherList {
        list-style: none;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }

    .office__weatherType {
        width: 80px;
        margin: 8px 0;
    }

    .office-weather__cityArea {
        margin: 0;
        font-style: italic;
        font-size: 16px;
    }

    @media screen and (min-width: 768px) {
        justify-content: flex-start;
    }
}
</style>

<script>
export default {
    name: 'Weather',
    data: () => ({
        weatherLogo: 'https://www.metaweather.com/static/img/weather/',
        logoType: '.svg',
        maxTemp: '',
        minTemp: '',
        cityImage: '',
        weatherNotLoadedMessage: '',
    }),
    computed:{
        city() {
            return this.$store.getters.preferredOffice
        },
        date() {
            return this.$store.getters.getSelectedDate;
        },
        weatherList() {
            return this.$store.getters.weather.filter((date, idx) => idx < 1)
        }
    },
    created() {
        this.weatherNotLoadedMessage = this.weatherList.length === 0 ? 'Most location have data from 5-10 days in the future' : ' '
    }
}
</script>
