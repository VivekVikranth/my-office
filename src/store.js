import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || {},
    username: localStorage.getItem('username') || 'John, Doe',
    authenticationDetails: {
        auth: true,
        message: ''
    },
    selectedDate: '',
    authenticationError: '',
    weather: '',
    preferredOffice: '',
    errorMessage: '',
    flightDetails: {},
    selectionConfirmed: false,
    selectedFlight: {},
    woidDetails: [{
        woeid: 727232,
        country: 'nl',
        city: 'Amsterdam',
        code: 'AMS'
    }, {
        woeid: 804365,
        country: 'hu',
        city: 'Budapest',
        code: 'BUD'
    }, {
        woeid: 766273,
        country: 'es',
        city: 'Madrid',
        code: 'MAD'
    }, {
        woeid: 44418,
        code: 'LHR',
        city: 'London'
    }]
}

export const mutations = {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, loginDetails) {
        state.status = 'success'
        state.token = loginDetails.token
        state.user = loginDetails.user
        state.username = loginDetails.user.name
        state.authenticationDetails['auth'] = true
    },
    auth_error(state, errDetails) {
        state.status = 'Authentication failed'
        state.authenticationError = errDetails.message
        state.authenticationDetails['auth'] = false
        state.authenticationDetails['message'] = errDetails.message
    },
    logout(state) {
        state.status = ''
        state.token = ''
    },
    fetch_succes(state, res) {
        state.status = 'success'
        state.weather = res
    },
    weather_notfound(state, res) {
        state.status = 'Result not found',
            state.errorMessage = res.message
    },
    search_flight_success(state, res) {
        state.status = 'Success',
            state.flightDetails = res
    },
    flights_not_found(state, res) {
        state.status = 'Result not found',
            state.errorMessage = res.message
    },
    update_office(state, office) {
        state.preferredOffice = office
    },
    update_date(state, date) {
        state.selectedDate = date
    },
    update_selectedFlight(state, flightDetail) {
        state.selectionConfirmed = true
        state.selectedFlight = flightDetail
    }
}

export const actions = {
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios.post('login', user)
                .then(resp => {
                    const token = resp.data.token
                    const user = resp.data.user
                    const loginDetails = {
                        token: token,
                        user: user
                    }
                    localStorage.setItem('token', token)
                    localStorage.setItem('username', user.name)
                    axios.defaults.headers.common['Authorization'] = token

                    commit('auth_success', loginDetails)
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error', err.response.data)
                    localStorage.removeItem('token')
                    reject(err.response.data)
                })
        })
    },
    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios.post('register', user)
                .then(resp => {
                    const token = resp.data.token
                    const user = resp.data.user
                    const userDetails = {
                        token: token,
                        user: user
                    }
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', userDetails)
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error', err.response.data)
                    reject(err)
                })
        })
    },
    logout({ commit }) {
        return new Promise((resolve) => {
            commit('logout')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    },
    fetchWeather({ commit }, woeid) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios.post('fetchWeather', woeid)
                .then(resp => {
                    commit('fetch_succes', resp.data.json)
                    resolve(resp)
                })
                .catch(err => {
                    commit('weather_notfound', err.response.data)
                    reject(err)
                })
        })
    },
    searchFlights({ commit }, flightDetails) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios.post('searchFlights', flightDetails)
                .then(resp => {
                    commit('search_flight_success', resp.data.result)
                    resolve(resp)
                })
                .catch(err => {
                    commit('flights_not_found', err.response.data)
                    reject(err)
                })
        })
    },
    updateCity({ commit }, cityName) {
        return new Promise((resolve) => {
            commit('update_office', cityName)
            resolve()
        })
    },
    updateDate({ commit }, date) {
        return new Promise((resolve) => {
            commit('update_date', date)
            resolve()
        })
    },
    updateSelectedFlight({ commit }, selectedFlightDetail) {
        return new Promise((resolve) => {
            commit('update_selectedFlight', selectedFlightDetail)
            resolve()
        })
    }
}

export const getters = {
    isLoggedIn: state => !!state.token,
    user: state => state.username,
    weather: state => state.weather,
    preferredOffice: state => state.preferredOffice,
    getFlights: state => state.flightDetails.data,
    getWoiedDetails: state => state.woidDetails,
    getSelectedDate: state => state.selectedDate,
    isSelectionConfrimed: state => state.selectionConfirmed,
    getSelectedFlight: state => state.selectedFlight
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
