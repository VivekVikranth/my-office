<template>
<div class="page-container">
    <Toolbar />
    <md-content class="md-layout md-gutter md-alignment-top-left">
        <md-card class="md-primary md-layout-item md-size-15 md-small-size-100" md-theme="purple-card" md-with-hover>
            <div @click="selectCard">
                <md-ripple>
                    <md-card-header>
                        <div class="md-title">Office selector</div>
                    </md-card-header>

                    <md-card-content>
                        <md-icon class="md-size-3x">build</md-icon>
                    </md-card-content>
                </md-ripple>
            </div>
        </md-card>

        <md-card class="md-primary md-layout-item md-size-15 md-small-size-100" md-theme="purple-card" md-with-hover>
            <md-ripple>
                <md-card-header>
                    <div class="md-title">Record my work</div>
                </md-card-header>

                <md-card-content>
                    <md-icon class="md-size-3x">access_time</md-icon>
                </md-card-content>
            </md-ripple>
        </md-card>

        <md-card class="md-primary md-layout-item md-size-15 md-small-size-100" md-theme="purple-card" md-with-hover>
            <md-ripple>
                <md-card-header>
                    <div class="md-title">My Documents</div>
                </md-card-header>

                <md-card-content>
                    <md-icon class="md-size-3x">picture_as_pdf</md-icon>
                </md-card-content>
            </md-ripple>
        </md-card>
    </md-content>
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
    name: 'Home',
    components: {
        Toolbar
    },
    methods: {
        selectCard() {
            this.$router.push('/selectyouroffice')
        }
    }
}
</script>
