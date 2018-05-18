<template>
  <div class="ChatView-main">
    <div class="ChatView-mainView Card">
      <div class="ChatView-posterHead">博主（汪酱）</div>
      <div class="ChatView-chatContent"></div>
      <div class="ChatView-inputCon">
        <textarea rows="5" v-model="msg"></textarea>
        <button class="sendMsgBtn">发送(S)</button>
      </div>
    </div>
    <today-word></today-word>
  </div>
</template>
<script>
  import TodayWord from "../components/TodayWord"
  export default {
    name: 'ChatVisitor',
    data(){
      return {
        id: '',
        msg: '',
        unread: 0,
        dataList: {
          user_id: 'admin',
          chatWith: 'loading...',
          message: []
        }
      }
    },
    mounted () {
    },
    methods: {

    },
    components: {
      TodayWord
    }
  }
</script>
<style>
  .ChatView-mainView{
    width: 70%;
    max-width: 580px;
    height:600px;
    margin: 30px auto;
  }
  .ChatView-posterHead{
    padding: 15px;
    border-bottom: 1px solid #dedede;
    color: #a1a1a1;
  }
  .ChatView-chatContent{
    height: 400px;
    border-bottom: 1px solid #dedede;
    padding:15px;
  }
  .ChatView-inputCon{
    padding: 15px;
  }
  .ChatView-inputCon textarea{
    width: 100%;
    resize: none;
    border: none;
    outline: none;
    font-family: 'Trebuchet MS', Arial, 'Lucida Grande', Verdana, Lucida, Helvetica, sans-serif;
    font-size: 15px;
  }
  .sendMsgBtn{
    border: 1px solid #dedede;
    padding: 5px;
    background: #f0f0f0;
    float: right;
    outline: none;
  }
  .sendMsgBtn:hover{
    color: #ffffff;
    background: #0f88eb;
    border-color: #0f88eb;
  }
</style>