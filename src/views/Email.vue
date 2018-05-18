<template>
  <div class="email">
      <my-header></my-header>
      <div class="Card EmailView-main">
          <h5>联系邮箱</h5>
          <hr>
          <div class="EmailView-emailList">
              <p>
                  <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=467004335,2089292182&fm=27&gp=0.jpg" alt="">
                  <span>httishere0728@gmail.com</span>
              </p>
              <p>
                  <img src="../assets/images/163logo.gif" alt="">
                  <span>xxxxxiaohaoba@163.com</span>
              </p>
              <p>
                  <img src="../assets/images/QQMaillogo.gif" alt="">
                  <span>httishere@qq.com</span>
              </p>
          </div>
          <h5>微信公众号</h5>
          <hr>
          <div class="EmailView-wechatQrcode">
              <img src="../assets/images/qrcode_for_httishere.jpg" alt="">
              <p>follow me~</p>
          </div>
      </div>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
export default {
  name: "email",
  components: {
    MyHeader
  }
};
</script>

<style>
.EmailView-main {
  width: 780px;
  margin: 0 auto;
  padding: 20px;
}
.EmailView-emailList {
  width: 550px;
  border: 2px solid #eeeeee;
  margin: 20px auto;
  padding: 15px;
  border-radius: 10px;
  font-family: Consolas, Monaco, "Andale Mono", monospace;
}
.EmailView-emailList p + p {
  margin-top: 15px;
}
.EmailView-emailList img {
  width: 50px;
  height: 25px;
  margin-right: 25px;
}
.EmailView-wechatQrcode {
  width: 550px;
  border: 2px solid #eeeeee;
  margin: 20px auto;
  padding: 15px;
  border-radius: 10px;
  font-family: Consolas, Monaco, "Andale Mono", monospace;
  text-align: center;
}
.EmailView-wechatQrcode img{
    display: block;
    width: 300px;
    height: 300px;
    margin: 0 auto;
}
</style>
