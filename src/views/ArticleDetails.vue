<template>
  <div class="artcleDetails">
    <my-header></my-header>
    <div class="Card DetailMain">
        <div class="DetailMain-title">
            <h2>{{article.title}}</h2>
        </div>
        <div class="DetailMain-meta">
          <span>作者：{{article.author ? article.author : '汪卷卷'}}</span>
          <span>日期：{{article.time}}</span>
          <span>字数：{{article.content ? article.content.match(reg).length : 0}}</span>
          <!-- <span class="editBtn" v-if="user.isAdmin">编辑文章</span> -->
        </div>
        <div class="DetailMain-content" v-html="article.content"></div>   
        <hr>
        <div class="DetailMain-comments">
          <textarea rows="5" placeholder="写下你的评论..." v-model="comment.content"></textarea>
          <a href="javascript:;" class="subComment" @click="subComment">发送</a>
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
          <a href="javascript:;" v-if="user.isAdmin">编辑</a>
          <a href="javascript:;" @click="deleteArticle" v-if="user.isAdmin">删除</a>
          <a href="javascript:;">分享</a>
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
      }
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
      this.$store.dispatch("deleteArticle", this.id).then(res => {
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
    }
  },
  components: {
    MyHeader
  }
};
</script>
<style>
.DetailMain-comments textarea {
  display: block;
  width: 600px;
  padding: 10px 15px;
  font-size: 13px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background-color: hsla(0, 0%, 71%, 0.1);
  resize: none;
  vertical-align: top;
  outline-style: none;
  margin: 20px auto;
}
.DetailMain-comments .subComment {
  display: block;
  background: #0f88eb;
  padding: 5px 10px;
  width: 100px;
  text-align: center;
  color: #ffffff;
  border-radius: 15px;
  float: right;
  margin-right: 70px;
}
.DetailMain-commentsList {
  margin-top: 50px;
  padding: 0 50px;
}
.DetailMain-commentsList ul {
  padding: 0;
}
.commentsItem {
  border-top: 1px solid #eee;
  padding: 10px 0;
}
.comment-meta {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
}
.comment-meta span:nth-child(1) {
  color: #0f88eb;
}
.comment-meta span:nth-child(2) {
  color: #aaaaaa;
  font-size: 12px;
}
.comment-content {
  line-height: 30px;
}
.noComments img {
  display: block;
  width: 226px;
  height: 92px;
  margin: 40px auto 10px;
}
.noComments p {
  text-align: center;
  color: #bbbbbb;
  font-size: 12px;
}
</style>

