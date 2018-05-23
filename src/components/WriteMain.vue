<template>
	<div class="write-main">
		<header class="header is-fixed">
			<div class="header-inner">
				<a href="/" aria-label="汪世界" class="header-title">汪</a>
				<div class="header-littleTitle">写文章</div>
				<div class="header-pub">
					<button class="Button Button--blue" :class="{'Button-disabled': disabled}" :disabled="disabled" @click="publish">发布</button>
				</div>
			</div>
		</header>
		<div class="write-view Card">
			<div class="write-title">
				<input type="text" class="Input" placeholder="输入标题" v-model="title"/>
				<div>
					<a href="javaxcript:;" title="插入图片" @click="toggleUpload">图片</a>
					<span @click="toggleShow">{{showText}}</span>
					<router-link to="/cateChoose">标签</router-link>
				</div>
			</div>
			<hr />
			<div class="write-content">
				<textarea v-model="content" rows="25" class="Input" :class="{'markContainerShow': markedShow}" placeholder="输入正文"></textarea>
				<div class="compiledMarkdown" v-html="compiledMarkdown" v-show="markedShow"></div>
				<!-- <textarea rows="50" class="Input" placeholder="输入正文" v-model="content"></textarea> -->
			</div>
		</div>
		<upload-img :show-msg="upBtn" v-show="upBtn" @closeUp="closeUp" @addImgLink="addImgLink"></upload-img>
	</div>
</template>

<script>
import MyHeader from "../components/MyHeader";
import UploadImg from "../components/UploadImg";
import bus from '../lib/event';
export default {
  name: "write",
  data() {
    return {
      title: "",
      content: "",
      markedShow: false,
      showText: "预览",
      upBtn: false,
      category: null
    };
  },
  mounted: function (s) {
    this.category = this.$route.params.id;
    bus.$on('cateToWrite', data => {
      if(data){
        this.$toast({
          message: `选择标签：${data.name}`
        });
      }      
    })
  },
  computed: {
    compiledMarkdown: function() {
      return this.global.markedContent(this.content, { sanitize: true });
    },
    disabled: function() {
      if (this.content != "" && this.title != "") {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    toggleShow() {
      this.markedShow = !this.markedShow;
      this.showText = this.showText === "预览" ? "关闭预览" : "预览";
    },
    toggleUpload() {
      this.upBtn = true;
    },
    closeUp(showMsg) {
      this.upBtn = showMsg;
    },
    publish() {
      var _newNote = {
        title: this.title,
        content: this.content,
        time: new Date().getTime(),
        category: this.category || this.$store.getters.currentCate._id
      };
      this.$store.dispatch("addNote", _newNote).then(res => {
        if (res.msg == "success") {
          this.title = "";
          this.content = "";
          this.$toast({
            message: '发布成功'
          });
        } else {
          this.$toast({
            message: '发布失败'
          });
        }
      });
    },
    addImgLink(msg) {
      console.log(msg);
      this.content += "![添加图片说明](" + msg + ")\n";
    }
  },
  components: {
    UploadImg
  }
};
</script>

<style>

</style>