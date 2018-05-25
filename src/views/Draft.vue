<template>
  <div class="draftView">
    <my-header></my-header>
    <ul class="draftList">
      <li class="Card draftItem" v-for="(item,index) in articles" @click="toDetail(index)" @touchstart="showTipAlert(index)" @touchend="clearLoop(index)">
        <p class="draftItem-meta">
          <span>{{item.isDelete?'已删文章':(item.isPublic?'':'未公开')}}</span>
          <span>最近更新：{{item.editTime?formatTime(item.editTime):formatTime(item.time)}}</span>
        </p>
        <p>{{item.title}}</p>
      </li>
    </ul>

    <!-- 确认模态框 -->
    <div v-show="isShowModal">
      <div class="modal_bk"></div>
      <div class="modal_content">
        <h5>确定恢复该文章吗？</h5>
        <div class="toast-btns">
          <span class="toast-cancle" @click="closeToast">取消</span>
          <span class="toast-comfir" @click="notify">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
export default {
  name: 'Draft',
  data(){
    return {
      articles: null,
      currentIndex: -1,
      Loop: null,
      isShowModal: false
    }
  },
  mounted: function () {
    this.$store.dispatch('getDraft').then(data => {
      this.articles = data
    })
  },
  methods: {
    formatTime(time) {
      return this.global.normalTimeShow(time);
    },
    toDetail(index){
      const id = this.articles[index]._id
      this.$router.push({
        path: `/details/${id}`
      });
    },
    showTipAlert(index){
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器  
      this.Loop = setTimeout(() => {
        this.currentIndex = index
        this.isShowModal = true
      }, 1000);
    },
    clearLoop(index){
      clearInterval(this.Loop);
    },
    closeToast(){
      this.isShowModal = false
    },
    notify(){      
      const id = this.articles[this.currentIndex]._id
      const _item = {
        id: id,
        op: '1'
      }
      this.$store.dispatch("opArticle", _item).then(res => {
        if (res.msg === "success") {
          this.$toast({message: "恢复成功"});
          this.isShowModal = false
          this.$store.dispatch('getDraft').then(data => {
            this.articles = data
          })
        } else {
          this.$toast({message: "恢复失败"});
        }
      });
    }
  },
  components: {
    MyHeader
  }
}
</script>
