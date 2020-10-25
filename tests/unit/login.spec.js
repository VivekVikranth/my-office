import { mount, createLocalVue } from "@vue/test-utils";
import VueMaterial from 'vue-material'
import Vuelidate from "vuelidate";
import Vuex from 'vuex'
import Login from '@/components/Login.vue'
const localVue = createLocalVue();
localVue.use(VueMaterial)
localVue.use(Vuelidate)
localVue.use(Vuex)

describe('Validate login', () => {
  const mountFunction = options => {
    return mount(Login, {
      localVue,
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

  it('Submit user credentials, if user input added', () => {
    let actions = {
      login: jest.fn()
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
