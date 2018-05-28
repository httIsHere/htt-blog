<template>
	<div class="write-main">
		<header class="header is-fixed">
			<div class="header-inner">
				<a href="/" aria-label="汪世界" class="header-title">汪</a>
				<div class="header-littleTitle">写文章</div>
				<div class="header-pub">
					<button class="Button Button--blue" :class="{'Button-disabled': disabled}" :disabled="disabled" @click="publish" v-if="!isEdit">发布</button>
					<button class="Button Button--blue" :class="{'Button-disabled': disabled}" :disabled="disabled" @click="edit" v-if="isEdit">修改</button>
				</div>
			</div>
		</header>
    <section class="Card isOriginal_box">
      <span class="radio_box">
        <input type="radio" name="isOriginal" id="original" value="original" v-model="isLink" checked>
        <label for="original"></label>
        <em>原创</em>
      </span>
      <span class="radio_box">
        <input type="radio" name="isOriginal" id="reprint" value="reprint" v-model="isLink">
        <label for="reprint"></label>
        <em>转载</em>
      </span>
      <div class="link_box" v-show="isLink==='reprint'">
        <em>转载链接：</em>
        <input type="text" placeholder="请输入转载链接..." v-model="linkUrl">
        <label for="linkUrl" v-show="!hasLink">转载链接不能为空</label>
      </div>
    </section>
		<div class="write-view Card">
			<div class="write-title">
				<input type="text" class="Input" placeholder="输入标题" v-model="title"/>
				<div>
					<a href="javaxcript:;" title="插入图片" @click="toggleUpload">图片</a>
					<span @click="toggleShow">{{showText}}</span>
					<router-link :to="'/cateChoose/'+(isEdit?(article._id?article._id:''):'')">标签</router-link>
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
      category: null,
      isLink: 'original',
      hasLink: true,
      linkUrl: '',
      isEdit: false,
      editId: '',
      article: {
        _id: '',
        title: '',
        islinked: false,
        link: ''
      }
    };
  },
  mounted: function () {
    // 判断是写文章还是编辑文章
    const _path = this.$route.path
    if(_path.indexOf('edit') > -1){
      //编辑文章
      this.isEdit = true
      this.editId = this.$route.params.id
      let loading = this.$loading("加载中")
      this.$store.dispatch("getArticleDetail", this.editId).then(res => {
        loading.close()
        this.article = res
        this.title = res.title
        this.content = res.content
        this.isLink = res.islinked ? 'reprint' : 'original'
        this.hasLink = res.islinked
        this.linkUrl = res.link
      });
      this.category = this.$route.params.cate;
      bus.$on('cateToWrite', data => {
        if(data){
          this.$toast({
            message: `选择标签：${data.name}`
          });
        }      
      })
    } else {
      this.category = this.$route.params.id;
      bus.$on('cateToWrite', data => {
        if(data){
          this.$toast({
            message: `选择标签：${data.name}`
          });
        }      
      })
    }
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
      if(this.isLink === 'reprint'){
        if(this.linkUrl === ''){
          this.hasLink = false
          return
        }
      }
      const _isLinked = (this.isLink === 'original')?false:true
      
      var _newNote = {
        title: this.title,
        content: this.content,
        time: new Date().getTime(),
        category: this.category || this.$store.getters.currentCate._id,
        islinked: _isLinked,
        link: this.linkUrl
      };
      this.$store.dispatch("addNote", _newNote).then(res => {
        if (res.msg == "success") {
          this.title = "";
          this.content = "";
          this.linkUrl = ""
          this.hasLink = true
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
    edit(){
       if(this.isLink === 'reprint'){
        if(this.linkUrl === ''){
          this.hasLink = false
          return
        }
      }
      const _isLinked = (this.isLink === 'original')?false:true
      
      var _newNote = {
        _id: this.editId,
        title: this.title,
        content: this.content,
        time: new Date().getTime(),
        category: this.category || this.$store.getters.currentCate._id,
        islinked: _isLinked,
        link: this.linkUrl
      };
      this.$store.dispatch("addNote", _newNote).then(res => {
        if (res.msg == "success") {
          this.title = "";
          this.content = "";
          this.linkUrl = ""
          this.hasLink = true
          this.$toast({
            message: '修改成功'
          });
        } else {
          this.$toast({
            message: '修改失败'
          });
        }
      });
    },
    addImgLink(msg) {
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