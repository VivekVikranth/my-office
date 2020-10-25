<script>
export default {
    name: 'PlaceholderLoader'
}
</script>

<style lang="scss" scoped>
.office-contentLoader {
    $ph-bg: rgba(91, 140, 232, 0.25) !default;
    $ph-color: #ced4da !default;
    $ph-border-radius: 2px !default;
    $ph-card-bg: #fff !default;

    $ph-card-gutter: 20px !default;
    $ph-card-spacer: 16px !default;
    $ph-item-gutter: 8px !default;
    $ph-item-spacer: 12px !default;

    $ph-animation-duration: .8s !default;

    .office-contentLoader__card {
        background: $ph-card-bg;
        padding: $ph-card-gutter;
        border-radius: 4px;
        margin: $ph-card-spacer;
    }

    .office-contentLoader__phItem {

        &,
        *,
        ::after,
        ::before {
            box-sizing: border-box;
        }

        direction: ltr;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        width: 45%;
        padding: $ph-item-gutter ($ph-item-gutter / 2) $ph-item-gutter ($ph-item-gutter / 2);
        overflow: hidden;
        margin-bottom: $ph-item-spacer;
        background-color: $ph-bg;
        border-radius: $ph-border-radius;

        &::before {
            content: " ";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 50%;
            z-index: 1;
            width: 500%;
            margin-left: -250%;
            animation: phAnimation $ph-animation-duration linear infinite;
            background: linear-gradient(to right, rgba($ph-bg, 0) 46%, rgba($ph-bg, .35) 50%, rgba($ph-bg, 0) 54%) 50% 50%;
        }

        >* {
            flex: 1 1 auto;
            display: flex;
            flex-flow: column;
            padding-right: ($ph-item-gutter / 2);
            padding-left: ($ph-item-gutter / 2);
        }

        &.-short {
            width: 25%
        }
    }

    @keyframes phAnimation {
        0% {
            transform: translate3d(-30%, 0, 0);
        }

        100% {
            transform: translate3d(30%, 0, 0);
        }
    }

    &.noTopMargin {
        .office-contentLoader__card {
            margin-top: 0
        }
    }
}
</style>
<template>
<div class="office-contentLoader">
    <md-card class="md-elevation-0 office-contentLoader__card">
        <div class="office-contentLoader__phItem"></div>
        <div class="office-contentLoader__phItem -short"></div>
    </md-card>
</div>
</template>
