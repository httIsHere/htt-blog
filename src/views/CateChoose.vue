<template>
    <div class="cateChoose">
        <header>
            <span>选择标签</span>
        </header>
        <ul class="cateList">
            <li class="cateItem" v-for="(item, index) in categories" :class="{'activeCate': index===currentIndex}"  @click="chooseCate(index)">
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import bus from '../lib/event';
export default{
    name: 'CateChoose',
    data() {
        return{
            categories: [],
            currentIndex: 0
        }
    },
    created: function () {
      this.$store.dispatch('getCategories').then(res => {
        this.categories = this.$store.getters.categories
        this.$store.dispatch('setCurrentCate', this.categories[0])
      })
    },
    methods: {
        chooseCate (_index, _id) {
            this.currentIndex = _index
            this.$store.dispatch('setCurrentCate', this.categories[_index])
            const _currentC = {
              cate: this.categories[_index]._id, 
              name: this.categories[_index].name
            }
            bus.$emit('cateToWrite', _currentC);
            const _cate = JSON.stringify(this.categories[_index])
            this.$router.push({
              path: `/Write/${this.categories[_index]._id}`
            });
        }
    }
}
</script>
<style>
body{background: #FFF;}
.cateChoose{margin-top: -2.4866667rem;background: #FFF;}
.cateChoose header{padding: .5rem;border-bottom: 1px solid #e0e0e0;}
.cateChoose .cateList{padding: 0;margin:0;}
.cateChoose .cateList .cateItem{padding: .5rem;border-bottom: 1px solid #e0e0e0;}
</style>