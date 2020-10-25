<template>
<div id="app" md-theme="selection-black">
    <!-- <div id="nav">
        <router-link to="/">Login</router-link> |
        <router-link to="/home">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
</div>
</template>

<style lang="scss">
@import "~vue-material/dist/theme/engine";
@include md-register-theme("default", (primary: #2c3e50,
        accent: #FFC312
    ));
@import "~vue-material/dist/theme/all"; // Apply the theme    

body {
    background: rgba(91, 140, 232, 0.25);
}

#app {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
