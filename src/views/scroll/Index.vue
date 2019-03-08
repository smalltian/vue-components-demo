<template>
<div>
    <div class="bscroll">
        <p class="drop-down" v-if="dropDown">松手刷新数据...</p>
        <div class="bscroll-container" ref="bscroll">
            <div class="bscroll-content">
                <ul>
                    <li v-for="item in list" :key="item">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import BScroll from "better-scroll";
export default {
    name: "scroll",
    data() {
        return {
            dropDown: false,
            list: []
        };
    },
    created() {
        window.onscroll = function () {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if (scrollTop + windowHeight > scrollHeight - 50) {
                console.log("bottom");
                return;
            }
        }
    },
    mounted() {
        for (let i = 0; i < 10; i++) {
            this.list.push(i);
        }
        // this._scrollFn();
    },
    methods: {
        _scrollFn() {
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.bscroll, {
                        click: true,
                        scrollY: true,
                        probeType: 3
                    });
                } else {
                    this.scroll.refresh();
                }
                this.scroll.on("scroll", pos => {
                    console.log(pos.y, this.dropDown);
                    //如果下拉超过50px 就显示下拉刷新的文字
                    if (pos.y > 50) {
                        this.dropDown = true;
                    } else {
                        this.dropDown = false;
                    }
                });
                //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                // this.scroll.on("touchEnd", pos => {
                //     // 下拉动作
                //     if (pos.y > 50) {
                //         console.log("下拉刷新成功");
                //         this.dropDown = false;
                //     }
                //     //上拉加载 总高度>下拉的高度+10 触发加载更多
                //     if (this.scroll.maxScrollY > pos.y + 10) {
                //         console.log("加载更多");
                //         //使用refresh 方法 来更新scroll  解决无法滚动的问题
                //         this.scroll.refresh()
                //     }
                //     console.log(this.scroll.maxScrollY + "总距离----下拉的距离" + pos.y)
                // });
                // console.log(this.scroll.maxScrollY)
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.bscroll {
    width: 100%;
    height: 100%;
    // overflow: hidden;
    // position: absolute;
    // top: 0;
    // left: 0;
    // bottom: 0;
    // width: 100%;
    // height: 100%;

    .bscroll-container {
        width: 100%;
        height: 100%;

        .bscroll-content {
            background: #ffffff;

            ul {
                li {
                    height: 100px;
                }
            }
        }
    }
}

.drop-down {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 0.8rem;
    color: #ccc;
}
</style>
