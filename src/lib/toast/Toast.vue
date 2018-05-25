<template>
  <transition name="fade">
    <div class="toast" id="el_toast" v-if="isShow">
      <div class="toast-msg" v-show="!htmlVisible">{{message}}</div>
      <div class="toast-bk" v-if="htmlVisible" @click="closeToast"></div>
      <div class="toast-html" v-if="htmlVisible">
        <h5>{{messageHtml.title}}</h5>
        <p>{{messageHtml.content}}</p>
        <div class="toast-btns" v-if="messageHtml.btnText.length>=2">
          <span class="toast-cancle" @click="closeToast">{{messageHtml.btnText[0]}}</span>
          <span class="toast-comfir" @click="notify">{{messageHtml.btnText[1]}}</span>
        </div>
        <div class="toast-btn" v-if="messageHtml.btnText.length===1">
          <span class="toast-comfir" @click="notify">{{messageHtml.btnText[0]}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      message: null,
      messageHtml: {
        title: '',
        content: '',
        btnText: []
      },
      time: 3000,
      isShow: true,
      htmlVisible: false,
      callback: function() {}
    };
  },
  methods: {
    notify() {
      this.callback()
      this.isShow = false
    },
    closeToast(){
      this.isShow = false
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
.toast-bk{
  background-color: rgba(0,0,0,.3);
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
}
.toast-html{
  background-color: rgb(255,255,255);
  border: 1px solid #f0f0f0;
  width:60%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* padding: .5rem; */
  border-radius: .2rem;
}
.toast-html h5{
  margin: .5rem auto;
  text-align: center;
  font-size: .7rem;
  font-weight: normal;
}
.toast-html .toast-btns,.toast-html .toast-btn{
  border-top: 1px solid #ddd;
}
.toast-btns span{  
  /* padding: 0 .5rem; */
  display: inline-block;
  width: 48%;
  text-align: center;
  line-height: 1.5rem;
  margin: 0 auto;
}
.toast-btns span:nth-child(2){
  border-left: 1px solid #ddd;
  color: #2d84cc;
}
.toast-btn span{  
  display: inline-block;
  width: 100%;
  text-align: center;
  line-height: 1.5rem;
  margin: 0 auto;
}
</style>

