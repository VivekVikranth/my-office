<template>
<div class="page-container">
    <Toolbar />
    <div>
        <md-empty-state md-icon="construction" md-label="Site under construction" md-description="It's not ready"></md-empty-state>
    </div>
</div>
</template>

<style lang="scss" scoped>
.md-content {
    background: transparent;
    margin: 0;
    padding: 24px;

    .md-card {
        background: #fff;
        margin: 4px;
        padding: 0;

        .md-icon {
            color: rgba(91, 140, 232, 0.65);
        }
    }
}
</style>

<script>
import Toolbar from '../components/toolbar.vue';

export default {
    name: 'Profile',
    components: {
        Toolbar
    }
}
</script>
