import { mount, createLocalVue } from "@vue/test-utils";
import Vue from 'vue'
import VueMaterial from 'vue-material'
import Vuelidate from "vuelidate"
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Toolbar from '@/components/toolbar.vue'
const localVue = createLocalVue();
localVue.use(VueMaterial)
localVue.use(Vuelidate)
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Load top nav bar', () => {
const router = new VueRouter()
  const mountFunction = options => {
    return mount(Toolbar, {
      localVue,
      router,
      ...options
    })
  }

  it('Clear the sessiona and redirect to login page', async () => {
    let actions = {
        logout: jest.fn()
      }

      let store = new Vuex.Store({
        actions
      })
  
      const wrapper = mountFunction({
        store
      })

    wrapper.find('button').trigger('click')

    await Vue.nextTick()

    await wrapper.find('.md-list-item-button').at(0).trigger('click')
    
    expect(actions.logout.mock.calls).toHaveLength(1)
    expect(wrapper.vm.$route.path).toBe('/')
    wrapper.destroy();
  });
})
