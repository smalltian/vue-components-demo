<template>
<div class="hj-main">
    <div class="hj-value"><span>{{selectValue}}</span><span>{{unit}}</span></div>
    <div class="hj-ruler">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in rangs" :key="index">
                    <div class="ruler-mutil">
                        <div class="line">
                            <div :class="[item.status?'crude-line':'fine-line']"></div>
                        </div>
                        <div class="num" :style="{top:-item.top + 'rem'}">
                            <span v-show="item.status">{{item.value}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="online"></div>
    </div>
</div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';
import {
    isTenMutiple,
    getSLen,
    delArr
} from '../utils';
export default {
    props: {
        /**
         * 接受父组件参数
         */
        rulerOptions: {
            type: Object
        }
    },
    data() {
        return {
            rangs: [], //尺子范围值
            unit: '', //选中基础单位
            totalHeat: 0, //总热量
            unitValue: 0, //选中基础单位对应的值
            selectValue: 160, //当前选中的值
            extensionUnits: ["克", "个"], //单位列表
        };
    },
    mounted() {
        this.unit = this.rulerOptions.unit;
        this.rangs = this._initRangs();
        this.$nextTick(function () {
            this._initSwiper();
        });

    },
    computed: {

    },
    methods: {
        /**
         * 初始化尺子
         */
        _initSwiper() {
            const _this = this;
            _this.swiper = new Swiper('.swiper-container', {
                direction: 'vertical',
                slidesPerView: 36,
                spaceBetween: 0,
                initialSlide: 88,
                on: {
                    init: function () {
                        //在初始化时触发一次transitionEnd事件
                        this.emit('transitionEnd');
                        let index;
                        let minCount = _this.rulerOptions.minCount;
                        _this.rangs.forEach((e, i) => {
                            if (e.value == minCount) {
                                index = i;
                            }
                        });
                        console.log(index);
                        _this.selectValue = _this.rangs[index].value;
                        this.slideTo(index - 18, 1000, false); //切换到第5个slide，速度为1秒
                        console.log("初始化值: " + _this.selectValue);
                    },
                    slideChange: function () {
                        let index;
                        index = this.activeIndex + 18;
                        _this.selectValue = _this.rangs[index].value;
                        console.log("activeIndex：" + this.activeIndex, "滑动之后选中的值：" + _this.selectValue);
                    }
                }
            });

        },
        /**
         * 初始化数据
         */
        _initRangs() {
            const reg = /^[0-9]+$/;
            let defaultRanges = [], //100整
                b = [],
                result;
            //补位数组
            for (let i = 0; i < 18; i++) {
                b.push({
                    "value": "",
                    "status": false
                })
            }

            //基础单位 克 毫升 分钟等 都是以 1递增
            for (let i = 250; i >= 100; i--) {
                let length = getSLen(i);
                defaultRanges.push({
                    "value": i,
                    "status": true,
                    "top": length / 3
                });
            }

            defaultRanges.map((item) => {
                if (isTenMutiple(item.value)) {
                    item.status = true;
                } else {
                    item.status = false;
                }
            });

            result = b.concat(defaultRanges).concat(delArr(b));
            // result = defaultRanges;

            // console.log(JSON.stringify(result));
            return result;
        }

    }
};
</script>

<style lang="scss" scoped>
.hj-main {
    width: 10rem;
    height: 25rem;
    position: relative;
    position: fixed;
    right: 0;
    top: 3.5rem;
    background: #ffffff;
    display: flex;
    align-items: center;

    .hj-value {
        width: 4.5rem;
    }

    .hj-ruler {
        background: #f7f7f7;
        width: 5rem;
        height: 100%;
        position: relative;

        .swiper-container {
            height: 100%;
            width: 100%;
            position: relative;
            border-left: 1px solid #dddddd;

            .swiper-slide {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;

                .ruler-mutil {
                    display: flex;
                    height: 100%;
                    position: relative;

                    .line {
                        width: 1.25rem;

                        .crude-line {
                            width: 1.25rem;
                            border-top: 1px solid #dddddd;
                        }

                        .fine-line {
                            width: 0.625rem;
                            border-top: 1px solid #dddddd;
                        }
                    }

                    .num {
                        height: 100%;
                        width: 1.25rem;
                        position: absolute;
                        // top: 0;
                        left: 1.5rem;
                        z-index: 999999999999;

                        span {
                            width: 100%;
                            height: 1rem;
                            line-height: 1rem;
                            font-size: .65rem;
                            text-align: center;
                            color: #999999;
                        }
                    }

                }
            }
        }

        .online {
            position: absolute;
            top: 50%;
            left: 1px;
            width: 1.25rem;
            height: 2px;
            background: #ec9503;
            z-index: 999999;
            margin-left: -1px;
        }
    }

}
</style>
