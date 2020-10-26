<template>
<div>
    <form novalidate="novalidate" class="md-layout md-alignment-center-center office-login" @submit.prevent="validateInline">
        <md-card class="md-layout-item md-size-25 md-small-size-100 md-elevation-0">
            <md-card-header>
                <div class="md-title">Welcome Back!</div>
            </md-card-header>

            <md-card-content>
                <md-field :class="getValidationClass('email')">
                    <label for="email">Email</label>
                    <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" required />
                    <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                    <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                </md-field>

                <md-field :md-toggle-password="true" :class="getValidationClass('password')">
                    <label>Password</label>
                    <md-input type="password" v-model="form.password" required></md-input>
                    <span class="md-error" v-if="!$v.form.password.required">Please enter your password</span>
                </md-field>
            </md-card-content>
            <md-card-actions>
                <md-button type="submit" class="md-raised md-primary">Login</md-button>
                <md-button class="md-accent js-register" @click="redirectToRegister">Register</md-button>
            </md-card-actions>
        </md-card>
        <md-snackbar md-position="center" :md-duration="duration" :md-active.sync="showSnackbar" md-persistent>
            <span>Something went wrong, try different credentials</span>
        </md-snackbar>
    </form>
</div>
</template>

<style lang="scss" scoped>
.office-login {
    min-height: 100vh;
}

.md-card {
    width: 420px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    border-radius: 4px;

    .md-card-actions {
        padding-bottom: 24px;
    }
}
</style>

<script>
import {
    required,
    email
} from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    data: () => ({
        form: {
            email: null,
            password: null
        },
        isIncorrectPassword: false,
        showSnackbar: false,
        duration: 4000
    }),
    validations: {
        form: {
            email: {
                required,
                email
            },
            password: {
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
                this.handleSubmit()
            }
        },
        // @vuese
        // Fires after successful inline validation
        // Validate login details in server
         handleSubmit() {
            let email = this.form.email
            let password = this.form.password

            this.$store.dispatch('login', {
                    email,
                    password
                }).then(() => this.$router.push('/selectyouroffice'))
                .catch(err => {
                    if (!err.auth) {
                        this.showSnackbar = true;
                    }
                })
        },
        // @vuese
        // Redirect to user registration page on register button click
        redirectToRegister() {
            this.$router.push('/register')
        }
    }
}
</script>
