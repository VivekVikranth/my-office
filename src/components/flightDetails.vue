<template>
<div>
    <div tabindex="0" class="office-flightDetails" v-for="(flight, i) in flightDetails" :key="flight.id" :class="{ selected: i === selectedFlight}" v-on:keyup.space="selectItem(flight.flyTo, i)" @click="selectItem(flight.flyTo, i)">
        <md-card class="md-elevation-0 office-flightDetails__card">
            <md-card-content>
                <div class="md-layout md-alignment-center-space-between">
                    <div class="md-layout-item">
                        <div class="office-flightDetails__flightTime">
                            <span>
                                {{flight.departureTime}}
                            </span>
                            <span>
                                -
                            </span>
                            <span>
                                {{flight.arrivalTime}}
                            </span>
                        </div>
                        <div>
                            <span> {{flight.cityFrom}} ({{flight.flyFrom}})</span>
                            <span> - {{flight.cityTo}} ({{flight.flyTo}})</span>
                        </div>
                        <div class="office-flightDetails__airlinesArea">
                            <span v-for="airline in flight.airlines" :key="airline" class="office-flightDetails__airlines">
                                <img :src="airLinesLogoSrc + airline + '.png'" :alt="airline" />
                            </span>
                        </div>
                    </div>

                    <div class="md-layout-item office-flightDetails__textCenter">
                        <span>{{flight.fly_duration}}</span>
                        <div class="md-caption" v-if="flight.route.length === 1">(Non Stop)</div>
                        <div class="md-caption" v-if="flight.route.length > 1">(More than 1 stop)</div>
                    </div>
                    <div class="md-layout-item office-flightDetails__textRight">
                        <div class="office-flightDetails__priceArea">
                            <span> {{flight.price.toLocaleString('nl-nl', { style: 'currency', currency: 'eur' })}} </span>
                        </div>
                        <!-- <md-button class="md-primary md-raised selectOption" v-if="i !== selectedFlight" @click="selectItem(flight.flyTo, i)">Select</md-button> -->
                        <md-button class="md-accent md-raised confirmOption" v-if="i === selectedFlight" @click="confirmSelection(flight, i)">Confirm</md-button>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</div>
</template>

<style lang="scss" scoped>
.office-flightDetails {
    .md-card {
        width: 100%;
        border-radius: 4px;
        margin-bottom: 12px;
        border: 2px solid #fff;
    }

    .office-flightDetails__card {
        cursor: pointer;
    }

    .office-flightDetails__flightTime {
        font-size: 14px;
        font-weight: 700
    }

    .office-flightDetails__textRight {
        text-align: right;
    }

    .office-flightDetails__textCenter {
        text-align: center;
    }

    .office-flightDetails__airlinesArea {
        margin-top: 8px;

        .office-flightDetails__airlines {
            margin-right: 12px;
        }
    }

    .office-flightDetails__priceArea {
        padding-right: 8px;
    }

    &.selected {
        .md-card {
            border-color: #333;
        }
    }
}
</style>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    name: 'FlightDetails',
    data: () => ({
        flightDetails: [],
        isHovering: false,
        isSelected: false,
        selectedFlight: null,
        selectedRoute: false,
        airLinesLogoSrc: 'https://images.kiwi.com/airlines/32x32/'
    }),
    created() {
        this.flightDetails = this.getFlights;
    },
    computed: {
        ...mapGetters([
            'getWoiedDetails',
            'getFlights',
            'getSelectedDate',
            'getSelectedFlight'
        ])
    },
    methods: {
        // @vuese
        // Selects the flight option from the list and updates the weather for the destinated city.
        selectItem(cityCode, index) {
            this.selectedFlight = index;
            let defaultDate = this.getSelectedDate;
            let woeid = this.getWoiedDetails.find((city) => cityCode === city.code);
            let weatherPayload = {};

            this.$emit('enableWeatherLoader', true);
            this.$store.dispatch('updateCity', woeid.city)
            weatherPayload['woeid'] = woeid.woeid
            weatherPayload['date'] = defaultDate

            this.$store
                .dispatch("fetchWeather", weatherPayload)
                .then(() => {
                    this.isWeatherLoaded = true;
                    this.$emit('enableWeatherLoader', false);
                })
        },
        confirmSelection(flightDetails) {
            this.$store
                .dispatch('updateSelectedFlight', flightDetails)
                .then(() => {
                    this.$router.push('/confirmation')
                })
        }
    }
}
</script>
