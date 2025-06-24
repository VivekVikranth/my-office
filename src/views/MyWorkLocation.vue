<template>
<div class="office-workLocation">
    <Toolbar />
    <div class="md-layout md-alignment-center">
        <form @submit.prevent="validateInline" novalidate="novalidate" class="md-layout-item md-size-75 md-small-size-100">
            <md-card class="md-elevation-0">
                <md-card-header>
                    <span class="md-headline">Work Location Selector</span>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-alignment-center-space-between">
                        <div class="md-layout-item md-size-25 md-small-size-100">
                            <span class="md-body-2">Current location</span>
                            <md-field>
                                <md-select v-model="defaultOffice" name="country" id="country" placeholder="Country" md-dense disabled>
                                    <md-option value="LHR">London</md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-25 md-small-size-100">
                            <span class="md-body-2">Select your preferred office location</span>
                            <md-field :class="getValidationClass('officelocation')">
                                <md-select v-model="form.office" name="officelocation" id="officelocation" placeholder="Office Location" md-dense required multiple>
                                    <md-option value="AMS">Amsterdam</md-option>
                                    <md-option value="BUD">Budapest</md-option>
                                    <md-option value="MAD">Madrid</md-option>
                                </md-select>
                                <span class="md-error" v-if="!$v.form.office.required">The email is required</span>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-25 md-small-size-100">
                            <span class="md-body-2">Select your preferred start date</span>

                            <md-datepicker v-model="form.selectedDate" name="selectedDate" required :md-model-type="String" :class="getValidationClass('selectedDate')" />

                        </div>
                        <div class="md-layout-tem md-size-25 md-small-size-100">
                            <md-button type="submit" class="md-raised md-primary">Search</md-button>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <div class="md-layout md-alignment-top-space-between office-workLocation__selectionArea">
                <div class="md-layout-item md-size-25 md-small-size-100">
                    <div v-if="!isWeatherLoaded">
                        <PlaceholderLoader :class="{noTopMargin: !isWeatherLoaded}" />
                    </div>
                    <div v-if="isWeatherLoaded">
                        <Weather />
                    </div>
                </div>
                <div class="md-layout-item md-size-75 md-small-size-100">
                    <div v-if="enableLoader">
                        <PlaceholderLoader :class="{noTopMargin: enableLoader}" />
                        <PlaceholderLoader />
                    </div>
                    <div v-if="isFlightsLoaded">
                        <FlightDetails @enableWeatherLoader="setLoader" />
                    </div>
                </div>
            </div>

        </form>
    </div>
</div>
</template>

<style lang="scss" scoped>
.office-workLocation {
    text-align: left;

    .office-workLocation__selectionArea {
        margin-top: 12px;
    }

    .md-progress-bar {
        margin: 24px;
    }

    .myoffice__weatherList {
        list-style: none;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }

    .myoffice__weatherType {
        width: 30px;
        height: 30px;
    }
}
</style>

<script>
import Toolbar from "../components/toolbar.vue";
import Weather from "../components/weather.vue";
import PlaceholderLoader from '../components/contentLoader.vue'
import FlightDetails from '../components/flightDetails.vue';
import {
    mapGetters
} from 'vuex'

import {
    required
} from 'vuelidate/lib/validators'
export default {
    name: "MyWorkLocation",
    components: {
        Toolbar,
        PlaceholderLoader,
        FlightDetails,
        Weather
    },
    data() {
        this.$material.locale.dateFormat = 'dd/MM/yyyy'
        return {
            defaultOffice: "LHR",
            isWeatherLoaded: false,
            enableLoader: false,
            isFlightsLoaded: false,
            gettingLocation: false,
            selectedDate: '',
            weatherNotLoadedMessage: '',
            form: {
                office: null,
                selectedDate: null
            }
        }
    },
    validations: {
        form: {
            office: {
                required
            },
            selectedDate: {
                required
            }
        }
    },
    computed: {
        ...mapGetters([
            'getWoiedDetails',
        ])
    },
    created() {
        let weatherPayload = {}
        const list = this.getWoiedDetails
        let defaultDate
        let woeid = list.find((cityCode) => this.defaultOffice === cityCode.code)
        this.$store.dispatch('updateCity', woeid.city)

        if (!this.form.selectedDate) {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();

            today = yyyy + '/' + mm + '/' + dd;

            defaultDate = today;
        } else {
            defaultDate = this.form.selectedDate;
        }

        weatherPayload['woeid'] = woeid.woeid
        weatherPayload['date'] = defaultDate

        this.$store
            .dispatch("fetchWeather", weatherPayload)
            .then(() => {
                this.isWeatherLoaded = true;
            })
            .catch(err => {
                if (err.response) {
                    this.loading = false;
                    this.loaded = true;
                }
            });
    },
    methods: {
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        validateInline() {
            this.$v.$touch()

            if (!this.$v.$invalid) {
                this.loadOptions()
            }
        },
        loadOptions() {
            let selectedCities = this.form.office.toString();

            let flightOptions = {
                fly_from: this.defaultOffice,
                fly_to: '',
                date_from: ''
            }

            flightOptions['fly_to'] = selectedCities;
            flightOptions.date_from = this.form.selectedDate;

            let newdate = this.form.selectedDate.split("/").reverse().join("/");
            this.$store.dispatch('updateDate', newdate)
            this.enableLoader = true;
            this.isFlightsLoaded = false;
            this.$store.dispatch('searchFlights', flightOptions)
                .then(() => {
                    this.enableLoader = false;
                    this.isFlightsLoaded = true;
                })
        },
        setLoader(msg) {
            this.isWeatherLoaded = !msg;
        }
    }
};
</script>
