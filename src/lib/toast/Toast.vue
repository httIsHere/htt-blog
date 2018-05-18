<template>
  <transition name="fade">
    <div class="toast" id="el_toast" v-if="isShow">
      <div class="toast-msg" v-show="!htmlVisible">{{message}}</div>
      <div class="toast-html" v-show="htmlVisible"></div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      messageHtml: "",
      time: 3000,
      isShow: true,
      htmlVisible: false,
      callback: function() {}
    };
  },
  methods: {
    notify() {
      this.callback()
    }
  }
};
</script>
<style>
.toast-msg {
  background-color: rgba(0, 0, 0, 0.7);
  width: 150px;
  padding: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  text-align: center;
  border-radius: 5px;
}
</style>

