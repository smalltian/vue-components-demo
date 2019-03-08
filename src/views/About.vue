<template>
<div class="about">
    <h1>This is an about page</h1>
    <HelloWorld msg="子组件" />
</div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import {
    requestLoginByName,
    requestAccountTrade
} from "@/service/getData";
import {
    mapGetters
} from "vuex";
export default {
    name: "about",
    components: {
        HelloWorld
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["appName"])
    },
    mounted() {
        this.$nextTick(function () {
            this.$toast("哈哈哈哈");
            this.login();
        });
    },

    methods: {
        login() {
            requestLoginByName("admin", "1").then(res => {});
        }
    }
};
</script>

<style lang="scss" scoped>
h1 {
    font-size: 30px;
    color: red;
}
</style>
