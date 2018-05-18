<template>
  <div class="cateList">
      <div class="cate-list Card">
          <a href="javascript:;" class="newBtn" @click="showNewInput">+ 新建标签</a>
          <div class="newInput" :class="{'showNewInput': isShow}">
              <input type="text" placeholder="请输入标签名称" v-model="newCate">
              <div class="btnPanel">
                  <a href="javascript:;" class="submit" @click="addNewCate">提交</a>
                  <a href="javascript:;" class="cancle" @click="hideNewInput">取消</a>
              </div>
          </div>
          <ul class="categoriesList">
              <li v-for="(cate, index) in categories" :class="{'activeCate': index===currentIndex}" @click="chooseCate(index)">{{cate.name}}</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    name: 'categories',
    data () {
        return {
            categories: [],
            newCate: '',
            isShow: false,
            currentIndex: 0
        }
    },
    created: function () {
      this.$store.dispatch('getCategories').then(res => {
        this.categories = this.$store.getters.categories
        this.$store.dispatch('setCurrentCate', this.categories[0])
      })
    },
    computed: {
    },
    methods: {
        showNewInput: function() {
          this.isShow = true
          console.log(this.isShow)
        },
        hideNewInput: function() {
          this.isShow = false
        },
        chooseCate (_index, _id) {
            // const _index = e.currentTarget.getAttribute("id").split('_')[1]
            this.currentIndex = _index
            this.$store.dispatch('setCurrentCate', this.categories[_index])
        },
        addNewCate () {
            if(this.newCate == '') {
                alert('标签名不能为空')
                return
            }
            this.$store.dispatch('addCategory', this.newCate).then(res => {
                if(res.msg == 'success'){
                        this.newCate = ''
                        this.isShow = false
                        this.$store.dispatch('getCategories').then(res => {
                          this.categories = this.$store.getters.categories
                        })
						alert('添加成功')
					} else {
						alert('添加失败')
					}
            })
        }
    }
}
</script>
