import { mount, createLocalVue } from "@vue/test-utils";
import VueMaterial from 'vue-material'
import Vuelidate from "vuelidate";
import Vue from 'vue'
import Vuex from 'vuex'
import FlightDetails from '@/components/flightDetails.vue'
const localVue = createLocalVue();
const flights = require('./flights.json')
const locationDetails = require('./locationDetails.json')
localVue.use(VueMaterial)
localVue.use(Vuelidate)
localVue.use(Vuex)

describe('Get Flight details', () => {
    const mountFunction = options => {
        return mount(FlightDetails, {
            localVue,
            ...options
        })
    }
    let getters, actions

    beforeEach(() => {
        let getFlights = flights
        let getSelectedDate = '24/10/2020'
        actions = {
            fetchWeather: jest.fn(),
            updateCity: jest.fn(),
            updateSelectedFlight: jest.fn()
        }
        getters = {
            getFlights: () => getFlights,
            getWoiedDetails: () => locationDetails,
            getSelectedDate: () => getSelectedDate
        }
    })
    test('Load available flight details', () => {
        let mockStore = new Vuex.Store({
            getters,
            actions
        })

        const wrapper = mountFunction({
            store: mockStore
        })

        const byClass = wrapper.findAll('.office-flightDetails')
        expect(byClass).toHaveLength(2)
        wrapper.destroy()
    })
    test('highlight the selected item', async () => {
        let mockStore = new Vuex.Store({
            getters,
            actions
        })

        const wrapper = mountFunction({
            store: mockStore
        })

        wrapper.findAll('.office-flightDetails').at(0).trigger('click')

        await Vue.nextTick()

        const flightCard = wrapper.findAll('.office-flightDetails').at(0).classes()
        expect(actions.fetchWeather.mock.calls).toHaveLength(1)
        expect(actions.updateCity.mock.calls).toHaveLength(1)
        expect(flightCard).toContain('selected')
    })

    test('Confirm the selection', async () => {
        let mockStore = new Vuex.Store({
            getters,
            actions
        })

        const $route = {
            path: '/confirmation'
        }

        const $router = {
            push: jest.fn(),
        }

        const wrapper = mountFunction({
            store: mockStore,
            mocks: {
                $route,
                $router
            }
        })

        wrapper.findAll('.office-flightDetails').at(0).trigger('click')

        await Vue.nextTick()

        wrapper.findAll('.confirmOption').at(0).trigger('click')
        expect(wrapper.vm.$route.path).toBe($route.path)
    })
})