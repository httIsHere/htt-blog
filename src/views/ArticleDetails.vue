<template>
  <div class="artcleDetails">
    <my-header></my-header>
    <div class="Card DetailMain">
        <div class="DetailMain-title">
            <h2><span class="Feed-meta-itemBox" v-show="article.islinked">转载</span>{{article.title}}</h2>
        </div>
        <div class="DetailMain-meta">
          <span>作者：{{article.author ? article.author : '汪卷卷'}}</span>
          <span>日期：{{article.time}}</span>
          <span>字数：{{article.content ? article.content.match(reg).length : 0}}</span>
          <!-- <span class="editBtn" v-if="user.isAdmin">编辑文章</span> -->
        </div>
        <p class="DetailMain-link" v-if="article.islinked"><span>原文链接：</span><a :href="article.link">{{article.link}}</a></p>
        <div class="DetailMain-content" v-html="article.content"></div>   
        <hr>
        <div class="DetailMain-comments">
          <textarea rows="5" placeholder="写下你的评论..." v-model="comment.content" v-if="!article.isDelete&&!article.public"></textarea>
          <a href="javascript:;" class="subComment" @click="subComment" v-if="!article.isDelete&&!article.public">发送</a>
          <div class="DetailMain-commentsList">
            <h6>{{article.comments.length}}条评论</h6>
            <ul v-if="article.comments.length">
              <li class="commentsItem" v-for="(comment,index) in article.comments">
                <p class="comment-meta"><span>{{formatUsername(comment.name)}}</span><span>第{{index+1}}楼 · {{formatTime(comment.date)}}</span></p>
                <p class="comment-content">{{comment.comment}}</p>
              </li>
            </ul>
            <div class="noComments" v-if="!article.comments.length">
              <hr>
              <img src="../assets/images/icon_comment_no.png" alt="">
              <p>智慧如你，不想发表一点想法咩~</p>
            </div>
          </div>
        </div>     
        <div class="DetailMain-operateBtn">
          <a href="javascript:;" v-if="user.isAdmin"><router-link :to="'/write/edit/'+article._id">编辑</router-link></a>
          <a href="javascript:;" @click="deleteArticle" v-if="user.isAdmin&&!article.isDelete">删除</a>
          <a href="javascript:;" @click="pulishArticle" v-if="user.isAdmin&&article.isDelete">恢复</a>
          <a href="javascript:;" @click="shareArticle" :data-clipboard-text="shareLink" class="shareArticle">分享</a>
        </div>
    </div>
  </div>
</template>
<script>
import MyHeader from "../components/MyHeader";
export default {
  name: "details",
  data() {
    return {
      id: "",
      article: {
        title: "",
        content: "",
        time: "",
        category: {},
        author: "",
        comments: []
      },
      user: {
        username: sessionStorage.username,
        isAdmin: sessionStorage.isAdmin === "true" ? true : false
      },
      reg: /[\u4e00-\u9fa5]/g,
      comment: {
        article: null,
        content: ""
      },
      shareLink: ''
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.id = id;
    this.comment.article = this.id;
      let loading = this.$loading("加载中")
      this.$store.dispatch("getArticleDetail", id).then(res => {
        loading.close();
        this.article = res;
        this.article.time = this.global.formatTime(this.article.time);
        this.article.content = this.global.markedContent(
          this.article.content || "",
          {
            sanitize: true
          }
        );
      });
      this.shareLink = window.location.href
  },
  methods: {
    formatUsername(ip) {
      return this.global.ipToName(ip);
    },
    formatTime(time) {
      return this.global.normalTimeShow(time);
    },
    deleteArticle() {
      //加一个确认弹框
      const _item = {
        id: this.id,
        op: '0'
      }
      this.$store.dispatch("opArticle", _item).then(res => {
        if (res.msg === "success") {
          this.$toast({
            message: "删除成功"
          });
          this.$router.push("/");
        } else {
          this.$toast({
            message: "失败"
          });
        }
      });
    },
    subComment() {
      if (this.comment.content == "") {
        this.$toast({
          message: "请输入你的评论..."
        });
      } else {
        this.$store.dispatch("submitComment", this.comment).then(res => {
          if (res.msg == "success") {
            this.comment.content = "";
            this.$toast({
              message: "评论成功"
            });
            this.$store.dispatch("getArticleDetail", this.id).then(res => {
              this.article = res;
              this.article.time = this.global.formatTime(this.article.time);
              this.article.content = this.global.markedContent(this.article.content || "", {
                sanitize: true
              });
            });
          } else {
            this.$toast({
              message: "评论失败"
            });
          }
        });
      }
    },
    pulishArticle(){
      const _item = {
        id: this.id,
        op: '1'
      }
      this.$store.dispatch("opArticle", _item).then(res => {
        if (res.msg === "success") {
          this.$toast({
            message: "恢复成功"
          });
          this.$router.push("/");
        } else {
          this.$toast({
            message: "恢复失败"
          });
        }
      });
    },
    shareArticle(){
      const clipboard = new this.$copy('.shareArticle')
      clipboard.on('success', e => {
        this.$toast({
          message: '本文章链接复制成功'
        })
        clipboard.destroy()       
      })  
      clipboard.on('error', e => {
        this.$toast({
          message: '本浏览器不支持自动复制'
        })
        clipboard.destroy()       
      })
    }
  },
  components: {
    MyHeader
  }
};
</script>

