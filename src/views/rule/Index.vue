<template>
<div>
    <h1>横屏刻度尺</h1>
    <div>父组件接收数据：{{unitValue}}</div>
    <ruler :rulerOptions="rulerOptions" @eventruler="eventHandlerRuler"></ruler>
    <br>
</div>


</template>

<script>
import Ruler from '@/components/HRuler'
export default {
    name:'rule',
    data(){
        return{
            unitValue:'',
            rulerOptions:{
                unit:'个',
                unitValue: 1,
                minCount:100,
            }
        }
    },
    components:{
        Ruler
    },
    methods:{
        eventHandlerRuler(e){
            console.log("相应ruler子组件："+JSON.stringify(e));
            this.unitValue =  e.selectValue;
        }
    }
}
</script>

<style lang="scss" scoped>
    h1{
        font-size: 1rem;
    }
</style>
