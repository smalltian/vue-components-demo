<template>
<div class="home">
    <div class="tit">功能组件</div>
    <div class="nav">
        <router-link to="/cropperimg"><span>图片裁剪</span><i class="icon icon-more"></i></router-link>
        <router-link to="/calendar"><span>日历</span><i class="icon icon-more"></i></router-link>
        <router-link to="/rule"><span>刻度尺横板</span><i class="icon icon-more"></i></router-link>
        <router-link to="/ruler2"><span>刻度尺竖板</span><i class="icon icon-more"></i></router-link>
        <router-link to="/scroll/index"><span>上拉加载，下拉刷新</span><i class="icon icon-more"></i></router-link>
        <router-link to="/scroll/category"><span>分类scroll</span><i class="icon icon-more"></i></router-link>
    </div>
</div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {

        }
    },
    mounted() {
        this.$nextTick(function () {
            this.$toast("cuowu")
        })
    },

    methods: {

    }
}
</script>

<style lang="scss" scoped>
.home {
    position: relative;

    .tit {
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        background: #ffffff;
        font-size: 1.25rem;
        color: #333333;
        text-align: center;
        font-weight: bold;
        box-shadow: 0px 1px 10px 10px #eeeeee;
    }

    .nav {
        margin-top: .8rem;
        background: #ffffff;
        display: flex;
        flex-direction: column;

        a {
            text-align: left;
            border-bottom: 1px solid #eeeeee;
            padding: .75rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            span {
                font-size: .75rem;
            }

            i.icon {
                width: .5rem;
                height: .5rem;
            }

            .icon-more {
                background: url("../assets/icon-more.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }

            &:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>
