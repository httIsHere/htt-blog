<template>
  <div class="question">
      <my-header :current-module="1"></my-header>
      <div class="Card QuestionView-main" v-show="!detailShow">
          <ul class="QuestionView-questionList">
              <li class="QuestionView-questionItem" v-for="(q, index) in questions">
                  <div class="questionItem-reply" :class="{'haveReply': q.reply.length}">{{q.reply.length}}<br>回答</div>
                  <div class="questionItem-msg">
                    <div class="questionItem-title" @click="showDetail(index)">
                      <p>{{q.title}}</p>
                    </div>
                    <div class="questionItem-meta">
                      <span>{{q.username ? q.username : formatUsername(q.from)}}</span>
                      <span>{{formatTime(q.time)}}</span>
                    </div>
                  </div>
              </li>
          </ul>
      </div>
      <div class="Card QuestionView-detail" v-if="detailShow">
          <span class="closeBtn" @click="detailShow=false">×</span>
          <div class="questionDetail">
              <h6>{{questions[currentQ].title}}</h6>
              <p class="user-meta">{{questions[currentQ].username ? questions[currentQ].username : formatUsername(questions[currentQ].from)}}-------{{formatTime(questions[currentQ].time)}}提问</p>
              <div class="details" v-html="markContent(questions[currentQ].content)"></div>
              <span>{{questions[currentQ].reply.length}}个回答</span>
              <hr>
              <ul class="answersList">
                  <li class="answerItem" v-for="re in questions[currentQ].reply" :class="{'adminAnswer': re.isAdmin}">
                      <p v-html="markContent(re.content)"></p>
                      <p class="reply-meta">
                          <span v-if="!re.isAdmin">{{formatUsername(re.from)}}</span>
                          <span v-if="re.isAdmin">博主</span>
                          &nbsp;&nbsp;
                          <span>{{formatTime(re.time)}}回答</span>
                      </p>
                      <hr>
                  </li>
              </ul>
              <div class="writeAnswer">
                  <!-- <p>撰写答案</p> -->
                  <textarea id="answer" rows="10" v-model="answer" placeholder="撰写答案"></textarea>
                  <a href="javascript:;" class="subAnswer" @click="subAnswer">提交答案</a>
              </div>
          </div>          
      </div>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
export default {
  name: "Questions",
  data() {
    return {
      questions: [],
      currentQ: -1,
      detailShow: false,
      answer: "",
      user: {
        username: sessionStorage.username,
        isAdmin: sessionStorage.isAdmin === "true" ? true : false
      }
    };
  },
  mounted() {
    let loading = this.$loading("加载中")
    this.$store.dispatch("getQuestions").then(res => {
      this.questions = res;
      loading.close();  
    });
  },
  methods: {
    formatUsername(ip) {
      return this.global.ipToName(ip);
    },
    formatTime(time) {
      return this.global.normalTimeShow(time);
    },
    showDetail(index) {
      this.currentQ = index;
      this.detailShow = true;
    },
    markContent(content) {
      return this.global.markedContent(content || "", { sanitize: true });
    },
    subAnswer() {
      const subMsg = {
        answer: this.answer,
        to: this.questions[this.currentQ]._id,
        isAdmin: this.user.isAdmin?1:0
      };
      this.$store.dispatch("subAnswer", subMsg).then(res => {
        if (res.msg == "success") {
          this.$toast({
            message: "提交成功"
          });
          this.$store.dispatch("getQuestions").then(res => {
            this.questions = res;
          });
          this.answer = ''
        } else {
          this.$toast({
            message: "提交失败"
          });
        }
      });
    },
    arraySort(arr, prop){
      return arr.sort(this.global.arrCompare(prop))
    }
  },
  components: {
    MyHeader
  }
};
</script>

<style>
.QuestionView-main,
.QuestionView-detail {
  width: 780px;
  margin: 0 auto;
  padding: 20px 40px;
}
.QuestionView-main .QuestionView-questionList {
  padding: 0;
}
.QuestionView-questionItem {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 15px;
}
.questionItem-reply {
  width: 50px;
  /* height: 50px; */
  background: #f0f0f0;
  text-align: center;
  padding: 3px 10px;
  color: #aaaaaa;
  margin-right: 20px;
}
.questionItem-msg {
  width: 550px;
  overflow: hidden;
}
.questionItem-title p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 550;
  cursor: pointer;
}
.questionItem-meta {
  font-size: 12px;
  color: #999;
}
.questionItem-meta span + span {
  margin-left: 10px;
}
.haveReply {
  background: #b0d3f0;
  color: #0d79d1;
}
.closeBtn {
  float: right;
  cursor: pointer;
  font-size: 18px;
}
.questionDetail h6 {
  width: 600px;
  margin: 20px auto;
  font-weight: bold;
  text-align: center;
}
.questionDetail .user-meta {
  text-align: center;
  font-size: 13px;
  color: #aaaaaa;
}
.details {
  width: 550px;
  margin: 20px auto;
}
.reply-meta {
  color: #aaaaaa;
  font-size: 14px;
}
#answer {
  width: 500px;
  margin: 10px auto;
  display: block;
  resize: none;
  border-color: #aaaaaa;
  border-radius: 5px;
  padding: 10px;
}
.subAnswer {
  display: block;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  width: 200px;
  line-height: 35px;
  text-align: center;
  margin: 10px auto;
  background: #f0f0f0;
}
.answersList{
  padding:0;
}
.answersList li{
  padding: 5px 0 0 10px;
}
.adminAnswer::before{
  content: '博主';
  padding: 2px 5px;
  background: #6aa96a;
  color: #fff;
  position: relative;
}
</style>
