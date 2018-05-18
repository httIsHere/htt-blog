<template>
  <div class="uploadImg">
      <div class="UploadImg-bk" @click="toggleShow"></div>
      <div class="UploadImg-main Card">
          <h5>插入图片</h5>
          <div class="UploadImg-uploadBtn" v-show="!inlineShow">
            <input type="file" name="file" class="upload__input" @change="uploadChange" accept="image/png,image/gif">  
            <p class="UploadImg-uploadText">点击上传</p>
          </div>
          <div class="UploadImg-uploadInline" v-show="inlineShow">
              <input type="text" class="inlineImgLink" v-model="inlineImgLink" placeholder="请输入网络图片链接">
          </div>
          <p class="toggleInlineShow" @click="toggleInlineShow">{{inlineShowText}}</p>
          <div class="operateBtn">
              <a href="javascript:;" @click="toggleShow">取 消</a>
              <a href="javascript:;" class="okBtn" v-show="inlineShow" @click="inlineImgSub">确 定</a>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "uploadImg",
  props: {
    showMsg: Boolean
  },
  data() {
    return {
      inlineShow: true,
      inlineImgLink: "",
      files: null
    };
  },
  computed: {
    inlineShowText() {
      return this.inlineShow ? "或上传本地图片" : "或选择网络图片";
    }
  },
  methods: {
    toggleShow: function() {
      this.$emit("closeUp", false);
    },
    toggleInlineShow: function() {
      this.inlineShow = !this.inlineShow;
    },
    uploadChange(event) {
    //   if (event.target.files.length > 0) {
    //     this.files = event.target.files[0]; //提交的图片
    //     this.$conf.getBase64(event.target, url => {
    //       this.imgDataUrl = "data:image/png;base64," + url; //显示的图片
    //     });
    //   }
    },
    inlineImgSub: function(){
        console.log('this.inlineImgLink: '+this.inlineImgLink)
        if(this.inlineImgLink !== ''){
            this.$emit("addImgLink", this.inlineImgLink);
            this.$emit("closeUp", false);
            this.inlineImgLink = ''
        }
        return;
    }
  }
};
</script>
