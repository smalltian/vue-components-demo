<template>
<div>
    <h1>竖屏刻度尺--身高实例</h1>
    <div>父组件接收数据：{{unitValue}}</div>
    <ruler :rulerOptions="rulerOptions" @eventruler="eventHandlerRuler"></ruler>
    <br>
</div>


</template>

<script>
import Ruler from '@/components/VRuler'
export default {
    name:'rule2',
    data(){
        return{
            unitValue:'',
            rulerOptions:{
                unit:'厘米',
                unitValue: 1,
                minCount: 180,
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
