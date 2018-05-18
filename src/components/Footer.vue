<template>
  <div class="footer">
      <span>{{year}} @</span>
      <a href="/#/email">我的邮箱 | </a>
      <a href="/#/email">微信公众号 | </a>
      <a href="https://github.com/httIsHere">GitHub</a>
  </div>
</template>

<script>
export default {
    name: 'Footer',
    computed: {
        year: function(){
            const newDate = new Date()
            return newDate.getFullYear()
        }
    }
}
</script>

<style>
.footer{
    text-align: center;
    color: #aaaaaa;
}
</style>
