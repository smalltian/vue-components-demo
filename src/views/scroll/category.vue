<template>
<section class="box">
    <div class="head">
        分类
    </div>
    <div class="content">
        <div class="left" ref="left">
            <ul>
                <li v-for="(item,index) in categoryList" :key="index" :class="{'active':currentIndex == index}" @click="selectCategory(index,$event)">
                    <span class="left-item">{{item}}</span>
                </li>
            </ul>
        </div>
        <div class="right" ref="right">
            <ul>
                <li v-for="item in classificationList" :key="item.id" class="right-item right-item-hook">
                    <h2>{{item.name}}</h2>
                    <ul>
                        <li v-for="sItem in item.ificationList" :key="sItem">
                            <div>{{item.name+sItem}}</div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</section>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    'name': 'scrollcategory',
    data() {
        return {
            'categoryList': ['数学', '语文', '英语', '物理', '化学', '生物', '政治', '其他'],
            'classificationList': [{
                    "name": "数学",
                    "ificationList": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                },
                {
                    "name": "语文",
                    "ificationList": [1, 2, 3, 4, 7, 8, 9, 10]
                },
                {
                    "name": "英语",
                    "ificationList": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                },
                {
                    "name": "物理",
                    "ificationList": [6, 7, 8, 9, 10]
                },

                {
                    "name": "化学",
                    "ificationList": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                },

                {
                    "name": "生物",
                    "ificationList": [1, 2, 3, 4, 56, 7, 8, 9, 10]
                },

                {
                    "name": "政治",
                    "ificationList": [1, 2, 3]
                },

                {
                    "name": "其他",
                    "ificationList": [1, 2, 3, 4, 5, 8, 9, 10]
                }
            ],
            listHeight: [],
            scrollY: 0, //试试获取y轴的高度
            clickEvent: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            this._initScroll();
            this._getHeight();
        });
    },
    computed: {
        //计算左侧第几个
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                //如果没有height2 或者再height和height2之间直接返回当年的索引
                if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
                    if (this.clickEvent) {
                        return i;
                    } else {
                        return i;
                    }
                }
            }
            //如果没有list返回0
            return 0;
        }
    },
    methods: {
        /**
         * 初始化scroll
         */
        _initScroll() {
            this.lefts = new BScroll(this.$refs.left, {
                click: true
            });
            this.rights = new BScroll(this.$refs.right, {
                probeType: 3
            });
            // 监听左边事件
            this.rights.on('scroll', (pos) => {
                console.log("pos:" + pos.y);
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        _getHeight() {
            let rightItems = this.$refs.right.getElementsByClassName('right-item-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < rightItems.length; i++) {
                let item = rightItems[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
            console.log(JSON.stringify(this.listHeight));
        },
        selectCategory(index,event){
            console.log(JSON.stringify(event),index);
            this.clickEvent = true;
            if(!event._constructed){
                return;
            }else{
                let rightItems = this.$refs.right.getElementsByClassName('right-item-hook');
                let el = rightItems[index];
                console.log(el);
                this.rights.scrollToElement(el,300);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    .head {
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        font-size: 1rem;
        color: #333333;
        font-weight: bold;
        border-bottom: 1px solid #333333;
    }

    .content {
        display: flex;
        position: absolute;
        top: 2.5rem;
        bottom: 2.5rem;
        width: 100%;
        overflow: hidden;
        background: #eeeeee;

        .left {
            flex: 0 0 2.5rem;
            width: 2.5rem;
            background: #f3f5f7;

            li {
                width: 100%;
                height: 100%;

                &.active {
                    background: #ffffff;

                    .left-item {
                        color: #333333;
                        font-weight: bold;
                        border-left: 2px solid #e4941e;
                    }

                }

                .left-item {
                    display: block;
                    width: 100%;
                    height: 2.5rem;
                    line-height: 50px;
                    text-align: center;
                    font-size: .75rem;
                    color: #666666;
                }
            }
        }

        .right {
            flex: 1;
            margin-left: .25rem;

            .right-item {
                width: 100%;
                // height: 2.5rem;
                // line-height: 2.5rem;
                // text-align: center;
                margin-top: .25rem;
                background: #ffffff;
            }
        }
    }
}
</style>
