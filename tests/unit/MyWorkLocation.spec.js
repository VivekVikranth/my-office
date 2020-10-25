import { mount, createLocalVue } from "@vue/test-utils";
import VueMaterial from 'vue-material'
import Vuelidate from "vuelidate";
import Vuex from 'vuex'
import MyWorkLocation from '@/views/MyWorkLocation.vue'
const localVue = createLocalVue();
localVue.use(VueMaterial)
localVue.use(Vuelidate)
localVue.use(Vuex)
const flights = require('./flights.json')
const locationDetails = require('./locationDetails.json')
const weatherDetails = require('./weatherDetail.json')

describe('Search action', () => {
    const mountFunction = options => {
        return mount(MyWorkLocation, {
            localVue,
            ...options
        })
    }
    let getters, actions
    beforeEach(() => {
        let getSelectedDate = '24/10/2020'
        actions = {
            fetchWeather: jest.fn(),
            updateCity: jest.fn(),
            updateDate: jest.fn(),
            searchFlights: jest.fn()
        }
        getters = {
            getFlights: () => flights,
            getWoiedDetails: () => locationDetails,
            getSelectedDate: () => getSelectedDate,
            weather: () => weatherDetails
        }
    })
    test('Search the available options on selected date and cities', () => {
        let mockStore = new Vuex.Store({
            actions,
            getters
        })

        const wrapper = mountFunction({
            store: mockStore,
            data: () => ({
                defaultOffice: "LHR",
                isWeatherLoaded: false,
                enableLoader: false,
                isFlightsLoaded: false,
                gettingLocation: false,
                selectedDate: '',
                weatherNotLoadedMessage: '',
                form: {
                    office: ['BUD', 'MAD'],
                    selectedDate: "24/10/2020"
                }
            })
        })

        wrapper.find('form').trigger('submit.prevent')
        expect(actions.fetchWeather.mock.calls).toHaveLength(1)
        expect(actions.searchFlights.mock.calls).toHaveLength(1)
    })
    test('Do not search if cities are not selected', () => {
        let mockStore = new Vuex.Store({
            actions,
            getters
        })

        const wrapper = mountFunction({
            store: mockStore,
            data: () => ({
                defaultOffice: "LHR",
                isWeatherLoaded: false,
                enableLoader: false,
                isFlightsLoaded: false,
                gettingLocation: false,
                selectedDate: '',
                weatherNotLoadedMessage: '',
                form: {
                    office: [],
                    selectedDate: ""
                }
            })
        })

        wrapper.find('form').trigger('submit.prevent')
        expect(actions.searchFlights.mock.calls).toHaveLength(0)
    })
})