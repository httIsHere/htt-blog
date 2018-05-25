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
                  <li class="answerItem" v-for="re in questions[currentQ].reply" :class="{'adminAnswer': re.isAdmin=='1'}">
                      <p v-html="markContent(re.content)"></p>
                      <p class="reply-meta">
                          <span v-if="!re.isAdmin||re.isAdmin=='0'">{{formatUsername(re.from)}}</span>
                          <span v-if="re.isAdmin=='1'">博主</span>
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

</style>
