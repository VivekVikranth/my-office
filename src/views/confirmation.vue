<template>
<div class="page-container">
    <Toolbar />
    <div class="office-confirmation md-layout md-alignment-center-center">
        <ul class="office-confirmation__timeLine md-layout-item md-small-size-100">
            <li class="office-confirmation__timeLineItem">
                <div class="office-confirmation__timeStep">
                    <md-icon>flight_takeoff</md-icon>
                </div>
                <div class="office-confirmation__travelTime">
                    <span>{{getSelectedFlight.departureTime}}</span>
                    <span> - </span>
                    <span>{{getSelectedFlight.cityFrom}}({{getSelectedFlight.cityCodeFrom}}) </span>
                </div>
            </li>
            <li class="office-confirmation__timeLineItem">
                <div class="office-confirmation__timeStep">
                    <md-icon>access_time</md-icon>
                </div>
                <div class="office-confirmation__travelTime">
                    {{getSelectedFlight.fly_duration}}
                </div>
            </li>
            <li class="office-confirmation__timeLineItem">
                <div class="office-confirmation__timeStep">
                    <md-icon>flight_land</md-icon>
                </div>
                <div class="office-confirmation__travelTime">
                    <span>{{getSelectedFlight.arrivalTime}}</span>
                    <span> - </span>
                    <span>{{getSelectedFlight.cityTo}}({{getSelectedFlight.cityCodeTo}}) </span>
                </div>
            </li>
        </ul>
        <div class="md-layout-item md-small-size-100">
            <div class="office-confrimation__success">
                <md-icon>flight_takeoff</md-icon>
            </div>
            <p>
                You office selection has been successfully submitted, confirmation will be received via mail soon
            </p>
            <md-button @click="logout" class="md-accent md-raised">Logout</md-button>
        </div>
    </div>
    <!-- <md-empty-state md-icon="flight_takeoff" md-label="Success" md-description="You office selection has been successfully submitted, confirmation will be received via mail soon">
        <md-button @click="logout" class="md-accent md-raised">Logout</md-button>
    </md-empty-state> -->
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

.office-confirmation {
    margin: auto;
    max-width: 768px;

    .office-confirmation__timeLine {
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 0;
        list-style: none;

        &:before {
            position: absolute;
            top: 0;
            z-index: -1;
            height: 100%;
            padding-right: 16px;
            border-right: 2px solid #c5c6c7;
            content: "";
        }

        .office-confirmation__timeLineItem {
            display: flex;
            align-items: stretch;
            padding: 32px 0;

            .office-confirmation__timeStep {
                position: relative;
                z-index: 200;
                padding: 4px;
                margin-right: 32px;
                border: 1px solid #c5c6c7;
                border-radius: 100%;
                background: #fff;
            }

            .office-confirmation__travelTime {
                padding-right: 32px;
                font-size: 16px;
                font-weight: 700;
                font-style: italic;
            }
        }
    }

    .office-confrimation__success {
        line-height: 120px;

        .md-icon {
            color: #9ca5b6;
            font-size: 120px !important;
        }
    }
}
</style>

<script>
import Toolbar from "../components/toolbar.vue";
import {
    mapGetters
} from 'vuex'

export default {
    name: "Confirmation",
    components: {
        Toolbar,
    },
    created() {
        if (!this.isSelectionConfrimed) this.$router.push("/selectyouroffice");
    },
    computed: {
        ...mapGetters([
            'getSelectedDate',
            'getSelectedFlight',
            'isSelectionConfrimed'
        ])
    },
    methods: {
        logout: function () {
            this.$store.dispatch("logout").then(() => {
                this.$router.push("/");
            });
        },
    },
};
</script>
