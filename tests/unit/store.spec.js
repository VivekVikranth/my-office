import Vue from 'vue'
import Vuex from 'vuex'
import flushPromises from "flush-promises";
import { actions, mutations, getters } from '../../src/store'
import axios from 'axios'
import mockData from './loginmock.json'
import mockError from './mockAuthError.json'
import weatherData from './fetchWeather.json'
import flightsData from './fetchFlights.json'

Vue.use(Vuex)

jest.mock('axios');

describe('actions, mutations, state', () => {
    let store

    beforeEach(() => {

        store = new Vuex.Store({
            state: {
                status: '',
                token: '',
                user: {},
                username: '',
                authenticationDetails: {
                    auth: true,
                    message: ''
                }
            },
            mutations: mutations,
            actions: actions,
            getters: getters
        })
    })

    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });
    test('mocks successful login action', async () => {
        axios.post.mockResolvedValue(mockData)

        await flushPromises();
        return store.dispatch('login')
            .then(() => {
                expect(store.getters.user)
                    .toEqual(store.state.username)
                expect(store.getters.isLoggedIn)
                    .toBeTruthy()
            })
    })

    test('mocks failed login action', async () => {
        axios.post.mockRejectedValue(mockError)


        await flushPromises();
        return store.dispatch('login')
            .catch(() =>
                expect(store.state.status)
                    .toEqual('Authentication failed')
            )
    })

    test('mocks successful register action', async () => {
        axios.post.mockResolvedValue(mockData)

        await flushPromises();
        return store.dispatch('register')
            .then(() =>
                expect(store.state.token)
                    .toEqual('1234ab123')
            )
    })

    test('mocks failed register action', async () => {
        axios.post.mockRejectedValue(mockError)


        await flushPromises();
        return store.dispatch('register')
            .catch(() =>
                expect(store.state.status)
                    .toEqual('Authentication failed')
            )
    })

    test('mocks logut action', async () => {
        axios.post.mockResolvedValue(mockData)

        await flushPromises();
        return store.dispatch('logout')
            .then(() =>
                expect(store.state.status)
                    .toEqual('')
            )
    })

    test('mocks successful fetch weather', async () => {
        axios.post.mockResolvedValue(weatherData)

        await flushPromises();
        return store.dispatch('fetchWeather')
            .then(() => {
                expect(store.state.status)
                    .toEqual('success')
                expect(store.getters.weather)
                    .toEqual(store.state.weather)
            })
    })

    test('mocks failed fetch weather action', async () => {
        axios.post.mockRejectedValue(mockError)

        await flushPromises();
        return store.dispatch('fetchWeather')
            .catch(() =>
                expect(store.state.status)
                    .toEqual('Result not found')
            )
    })

    test('mocks successful fetch available fights', async () => {
        axios.post.mockResolvedValue(flightsData)

        await flushPromises();
        return store.dispatch('searchFlights')
            .then(() => {
                expect(store.state.status)
                    .toEqual('Success')
                expect(store.getters.getFlights)
                    .toEqual(store.state.flightDetails.data)
                expect(store.getters.getWoiedDetails)
                    .toEqual(store.state.woidDetails)
            })
    })

    test('mocks failed fetch flights action', async () => {
        axios.post.mockRejectedValue(mockError)

        await flushPromises();
        return store.dispatch('searchFlights')
            .catch(() =>
                expect(store.state.status)
                    .toEqual('Result not found')
            )
    })

    test('mocks update city action', async () => {

        await flushPromises();
        return store.dispatch('updateCity', 'Amsterdam')
            .then(() => {
                expect(store.state.preferredOffice)
                    .toEqual('Amsterdam')
                expect(store.getters.preferredOffice)
                    .toEqual('Amsterdam')
            })
    })

    test('mocks update date action', async () => {

        await flushPromises();
        return store.dispatch('updateDate', '24/10/2020')
            .then(() => {
                expect(store.state.selectedDate)
                    .toEqual('24/10/2020')
                expect(store.getters.getSelectedDate)
                    .toEqual('24/10/2020')
            })
    })

    test('mocks update date action', async () => {
        const flightDetail = {
            departureTime: '9:00 PM',
            arrivalTime: '10.30 PM'
        }
        await flushPromises();
        return store.dispatch('updateSelectedFlight', flightDetail)
            .then(() => {
                expect(store.getters.isSelectionConfrimed)
                    .toBeTruthy()
                expect(store.getters.getSelectedFlight)
                    .toEqual(flightDetail)
            })
    })

})