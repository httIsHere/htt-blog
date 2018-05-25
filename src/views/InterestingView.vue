<template>
    <div class="InterView">
        <my-header :current-module="2"></my-header>
        <idle></idle>
    </div>
</template>
<script>
import MyHeader from "../components/MyHeader";
import Idle from "../components/IdleItems";
export default{
    name: 'IterestingView',
    data(){
        return {

        }
    },
    components: {
        MyHeader,
        Idle
    }
}
</script>