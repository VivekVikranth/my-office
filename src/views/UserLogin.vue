<template>
<div class="office-login">
    <Login />
</div>
</template>

<style lang="scss" scoped>
.md-card {
    width: 420px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;

    .md-card-actions {
        padding-bottom: 24px;
    }
}
</style>

<script>
import Login from '../components/Login.vue';

export default {
    name: 'UserLogin',
    components: {
        Login
    }
}
</script>
