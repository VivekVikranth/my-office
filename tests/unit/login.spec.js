import { mount, createLocalVue } from "@vue/test-utils";
import VueMaterial from 'vue-material'
import Vuelidate from "vuelidate";
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
const localVue = createLocalVue();
localVue.use(VueMaterial)
localVue.use(Vuelidate)
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Validate login', () => {
  const router = new VueRouter()
  const mountFunction = options => {
    return mount(Login, {
      localVue,
      router,
      ...options
    })
  }

  it('Validate emppty input feilds', () => {
    const wrapper = mountFunction()

    wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.$v.form.email.$error).toBe(true);
    expect(wrapper.vm.$v.form.password.$error).toBe(true);
    wrapper.destroy();
  });

  it('Redirect to Register, if register selected', () => {
    const wrapper = mountFunction()

    wrapper.find('.js-register').trigger('click')
    expect(wrapper.vm.$route.path).toBe('/register')
  });

  it('Submit user credentials, if user input added', () => {
    let actions = {
      login: jest.fn(() => {
        
        return new Promise((res) => {
          res({auth: true});
        })
      })
    }
    
    let store = new Vuex.Store({
      actions
    })

    const wrapper = mountFunction({
      store,
      data: () => ({
        form: {
          email: 'test@vue.com',
          password: 'test123'
        }
      })
    })

    wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.$v.form.email.$error).toBe(false);
    expect(wrapper.vm.$v.form.password.$error).toBe(false);
    expect(actions.login.mock.calls).toHaveLength(1)
  });

  it('Catch error if login details are incorrect', () => {
    let actions = {
      login: jest.fn(() => {
        
        return new Promise((res, reject) => {
           reject({auth: false});
        })
      })
    }
    
    let store = new Vuex.Store({
      actions
    })

    const wrapper = mountFunction({
      store,
      data: () => ({
        form: {
          email: 'test@vue.com',
          password: 'test123'
        }
      })
    })

    wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.$v.form.email.$error).toBe(false);
    expect(wrapper.vm.$v.form.password.$error).toBe(false);
    expect(actions.login.mock.calls).toHaveLength(1)
  });
})
