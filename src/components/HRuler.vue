<template>
<div class="hj-main">
    <div class="hj-ruler">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in rangs" :key="index">
                    <div v-show="rulerType =='1'" class="ruler-single">
                        <div class="num">
                            <span v-show="item.status">{{item.value}}</span>
                        </div>
                        <div class="line">
                            <div :class="[item.status?'fine-line':'crude-line']"></div>
                        </div>
                    </div>
                    <div v-show="rulerType =='2'" class="ruler-mutil">
                        <div class="num" :style="{left:-item.left + 'rem'}">
                            <span v-show="item.status">{{item.value}}</span>
                        </div>
                        <div class="line">
                            <div :class="[item.status?'crude-line':'fine-line']"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="online"></div>
    </div>
    <div class="hj-value">{{selectValue}}</div>
    <div class="hj-extensions">
        <ul>
            <li v-for="(item,index) in extensionUnits" :key="index" :class="{'isActive':item == unit}" @click="selectUnit(item)">{{item}}</li>
        </ul>
    </div>
    <button @click="add">向父组件传值</button>
</div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';
import {
    isTenMutiple,
    getSLen,
    isEmpty
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
            rulerType: '1', //刻度类型
            rangs: [], //尺子范围值
            unit: '', //选中基础单位
            totalHeat: 0, //总热量
            unitValue: 0, //选中基础单位对应的值
            selectValue: 0, //当前选中的值
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
            let slidesPerView, initialSlide;
            console.log(_this.unit);
            if (_this.unit === "克" || _this.unit === "毫升") {
                slidesPerView = 40;
                initialSlide = 19;
                this.rulerType = "2";
            } else {
                slidesPerView = 8;
                initialSlide = 1;
                this.rulerType = "1";
            }
            this.swiper = new Swiper('.swiper-container', {
                slidesPerView: slidesPerView,
                spaceBetween: 0,
                initialSlide: initialSlide,
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
                        if(!isEmpty(index)){
                            index = index;
                        }else{
                            index = 8;
                        }
                        _this.selectValue = _this.rangs[index].value;
                        this.slideTo(_this.selectValue - 1, 1000, false);
                        console.log("初始化值: " + _this.selectValue);
                    },
                    slideChange: function () {
                        let index;
                        if (_this.unit == "克") {
                            index = this.activeIndex + 20;
                        } else {
                            index = this.activeIndex + 4;
                        }

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
            let othersRanges = [], //带0.5小数点
                defaultRanges = [], //100整
                a = [{
                    "value": "",
                    "status": false
                }, {
                    "value": "",
                    "status": true
                }, {
                    "value": "",
                    "status": false
                }],
                b = [],
                result;
            //补位数组
            for (let i = 0; i < 19; i++) {
                b.push({
                    "value": "",
                    "status": false
                })
            }

            //个等其他单位级
            for (let i = 0; i <= 10; i += 0.5) {
                othersRanges.push({
                    "value": i,
                    "status": true
                });
            }
            othersRanges.map((item) => {
                if (reg.test(item.value)) {
                    item.status = true;
                } else {
                    item.status = false;
                }
            });

            //基础单位 克 毫升 分钟等 都是以 1递增
            for (let i = 0; i <= 1000; i++) {
                let length = getSLen(i);
                defaultRanges.push({
                    "value": i,
                    "status": true,
                    "left": length / 5
                });
            }

            defaultRanges.map((item) => {
                if (isTenMutiple(item.value)) {
                    item.status = true;
                } else {
                    item.status = false;
                }
            });

            if (this.unit === "克") {
                result = b.concat(defaultRanges).concat(b);
            } else {
                result = a.concat(othersRanges).concat(a);
            }

            // console.log(JSON.stringify(result));
            return result;
        },
        /**
         * 选择单位
         */
        selectUnit(unit) {
            //销毁swiper对象
            this.swiper.destroy();
            this.unit = unit;
            this.rangs = this._initRangs();
            this.$nextTick(function () {
                this._initSwiper();
            })
        },
        /**
         * 确定
         */
        add() {
            this.$emit('eventruler', {
                'selectValue': this.selectValue
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.hj-ruler {
    position: relative;

    .swiper-container {
        height: 3rem;
        margin-top: 50px;
        background: #f7f7f7;

        .swiper-slide {
            height: 100%;

            .ruler-single {
                width: 100%;
                height: 2.5rem;
                background: #eeeeee;
                margin-top: .25rem;
                display: flex;
                flex-direction: column;

                .num {
                    height: 1.25rem;
                    position: relative;

                    span {
                        position: absolute;
                        bottom: 0;
                        left: -1.17rem;
                        width: 100%;
                        height: 1rem;
                        line-height: 1rem;
                        text-align: center;
                        font-size: .65rem;
                        color: #999999;
                    }
                }

                .line {
                    border-top: 1px solid #dddddd;
                    height: 1rem;

                    .crude-line {
                        height: 1.25rem;
                        border-right: 1px solid #dddddd;
                    }

                    .fine-line {
                        height: 0.625rem;
                        border-right: 1px solid #dddddd;
                    }
                }

            }

            .ruler-mutil {
                width: 100%;
                height: 2.5rem;
                background: #eeeeee;
                margin-top: .25rem;
                display: flex;
                flex-direction: column;
                position: relative;

                .num {
                    height: 1.25rem;
                    width: 2.5rem;
                    position: absolute;
                    top: 0;
                    // left: -0.25rem;
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

                .line {
                    border-top: 1px solid #dddddd;
                    height: 1rem;
                    margin-top: 1.25rem;

                    .crude-line {
                        height: 1.25rem;
                        border-left: 1px solid #dddddd;
                    }

                    .fine-line {
                        height: 0.625rem;
                        border-left: 1px solid #dddddd;
                    }
                }
            }
        }
    }

    .online {
        position: absolute;
        bottom: 0.25rem;
        left: 50%;
        width: 2px;
        height: 1.25rem;
        background: #ec9503;
        z-index: 999999;
        margin-left: -1px;
    }
}

.hj-extensions {
    ul {
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;

        li {
            width: 2.5rem;
            height: 100%;
            font-size: .8rem;
            color: #666;
        }

        .isActive {
            color: #ec9503;
        }
    }
}
</style>
