<template>
    <div class="login">
        <h4>Login</h4>
        <div class="form">
            <input type="text" placeholder="username" name="username" v-model="username">
            <input type="password" placeholder="password" name="password" v-model="password">
            <input type="button" value="login" @click="login">
            <input type="button" value="add" @click="addUser">
            <label>{{result}}</label>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      result: ''
    }
  },
  methods: {
    login () {
      const _user = {
        username: this.username,
        password: this.password
      }
	    this.$store.dispatch('login', _user).then(res => {
        if(res.code === '200'){
          sessionStorage.username = res.user.username
          sessionStorage.isAdmin = res.user.isAdmin
          this.$router.push('/');
        } else {
          this.result = '登录失败'
        }
      })
    },
    addUser () {
       const _user = {
        username: this.username,
        pwd: this.password
      }
	    this.$store.dispatch('addUser', _user).then(res => {
        if(res.code === '200'){
          this.result = '添加成功'
        } else {
          this.result = '添加失败'
        }
      })
    }
  }
}
</script>

