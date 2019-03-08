<template>
<div class="taost">
    <div v-if="show" class="wrap" @touchmove.prevent>
        <div class="main" :class="animateClass">
            <span>{{msg}}</span>
            <div class="line"></div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);

    .main {
        width: 100%;
        height: 2.7rem;
        background: #666666;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        span {
            font-size: 0.7rem;
            color: #ffffff;
        }

        .line {
            position: absolute;
            bottom: .25rem;
            width: .75rem;
            height: .075rem;
            background: #FFFFFF;
            border-radius: 1.5px;
        }
    }

    .fadeInDown {
        -webkit-animation-name: fadeInDown;
        animation-name: fadeInDown;
        animation-duration: 1s;
    }

    .fadeOutDown {
        -webkit-animation-name: fadeOutDown;
        animation-name: fadeOutDown;
        animation-duration: 1s;
    }

    @keyframes fadeInDown {
        from {
            opacity: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }

    @keyframes fadeOutDown {
        from {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }

        to {
            opacity: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }
    }
}
</style>
