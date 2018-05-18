<template>
  <div class="Firstpage">
  	 <!--<router-link :to="/login">Login</router-link>-->
     <my-header :current-module="0"></my-header>
     <my-main></my-main>
     <corner></corner>
  </div>
</template>

<script>
import MyHeader from '../components/MyHeader'
import MyMain from '../components/MyMain'
import Corner from '../components/Corner'
export default {
  name: 'firstpage',
  data () {
    return {
      msg: 'htt is here',
      count: this.$store.getters.count
    }
  },
  components: {
    MyHeader,
    MyMain,
    Corner
  },
  methods:{
  	cnt () {
			this.$store.commit('updateDate', this.count)
			console.log(this.$store.state.count)
  	}
  }
}
</script>