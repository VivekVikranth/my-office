<template>
<div>
    <h4>Register</h4>
    <form novalidate class="md-layout md-alignment-center-center" @submit.prevent="register">
        <md-card class="md-layout-item md-size-25 md-small-size-100">
            <md-card-header>
                <div class="md-title">Welcome Back!</div>
            </md-card-header>

            <md-card-content>
                <md-field>
                    <label for="name">Name</label>
                    <md-input type="text" name="name" id="name" v-model="name" required />
                </md-field>

                <md-field>
                    <label for="email">Email</label>
                    <md-input type="email" name="email" id="email" v-model="email" required />
                </md-field>

                <md-field :md-toggle-password="true">
                    <label>Password</label>
                    <md-input type="password" v-model="password" required></md-input>
                </md-field>

                <md-field :md-toggle-password="false">
                    <label>Confirm Password</label>
                    <md-input type="password" v-model="password_confirmation" required></md-input>
                </md-field>
            </md-card-content>
            <md-card-actions>
                <md-button type="submit" class="md-raised md-primary">Register</md-button>
            </md-card-actions>
        </md-card>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            is_admin: null
        }
    },
    methods: {
        register: function () {
            let data = {
                name: this.name,
                email: this.email,
                password: this.password,
                is_admin: this.is_admin
            }
            this.$store.dispatch('register', data)
                .then(() => this.$router.push('/'))
                .catch(err => console.log(err))
        }
    }
}
</script>
