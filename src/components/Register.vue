<template>
<div>
    <form novalidate class="md-layout md-alignment-center-center office-register" @submit.prevent="validateInline">
        <md-card class="md-layout-item md-size-25 md-small-size-100 elevation-0">
            <md-card-header>
                <div class="md-title">Register</div>
            </md-card-header>

            <md-card-content>
                <md-field :class="getValidationClass('name')">
                    <label for="name">Name</label>
                    <md-input type="text" name="name" id="name" v-model="form.name" required />
                </md-field>

                <md-field :class="getValidationClass('email')">
                    <label for="email">Email</label>
                    <md-input type="email" name="email" id="email" v-model="form.email" required />
                </md-field>

                <md-field :md-toggle-password="true" :class="getValidationClass('password')">
                    <label>Password</label>
                    <md-input type="password" v-model="form.password" required></md-input>
                </md-field>

                <md-field :md-toggle-password="false" :class="getValidationClass('password_confirmation')">
                    <label>Confirm Password</label>
                    <md-input type="password" v-model="form.password_confirmation" required></md-input>
                </md-field>
            </md-card-content>
            <md-card-actions>
                <md-button type="submit" class="md-raised md-primary">Register</md-button>
            </md-card-actions>
            <md-snackbar md-position="center" :md-duration="duration" :md-active.sync="showSnackbar" md-persistent>
                <span>Problem with creating user/user already created</span>
            </md-snackbar>
        </md-card>
    </form>
</div>
</template>

<style scoped>
.office-register {
    height: 100vh;
}

.md-card {
    padding: 24px 0;
}
</style>

<script>
import {
    required,
    email
} from 'vuelidate/lib/validators'
export default {
    data: () => ({
        form: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        is_admin: null,
        showSnackbar: false,
        duration: 4000
    }),
    validations: {
        form: {
            name: {
                required
            },
            email: {
                required,
                email
            },
            password: {
                required
            },
            password_confirmation: {
                required
            }
        }
    },
    methods: {
        // @vuese
        // Updates Invalid field
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        // @vuese
        // Fires on Form submit event
        validateInline() {
            this.$v.$touch()

            if (!this.$v.$invalid) {
                this.register()
            }
        },
        register() {
            let data = {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password,
                is_admin: this.is_admin
            }
            this.$store.dispatch('register', data)
                .then(() => this.$router.push('/'))
                .catch(err => {
                    if (!err.auth) {
                        this.showSnackbar = true;
                    }
                })
        }
    }
}
</script>
