<template>
<md-toolbar class="md-primary md-layout md-alignment-center-space-between office-toolbar" md-elevation="0">
    <h3 class="md-title office-toolbar__home" @click="redirectToHome">My Office</h3>
    <div>
        <md-menu md-direction="bottom-start" md-align-trigger md-size="auto">
            <md-button md-menu-trigger class="md-primary">Welcome {{user}}</md-button>
            <md-menu-content ref="menu">
                <md-menu-item>Profile</md-menu-item>
                <md-menu-item @click="logout">Logout</md-menu-item>
            </md-menu-content>
        </md-menu>
    </div>
</md-toolbar>
</template>

<style lang="scss" scoped>
.office-toolbar {
    .office-toolbar__home {
        cursor: pointer;
    }
}
.md-toolbar {
    margin-bottom: 24px;
}
</style>

<script>
import {
    mapGetters
} from 'vuex'

export default {
    name: 'Toolbar',
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    methods: {
        logout: function () {
            this.$store.dispatch('logout')
                .then(() => {
                    this.$router.push('/')
                })
        },
        redirectToHome: function() {
            this.$router.push('/home');
        }
    }
}
</script>
