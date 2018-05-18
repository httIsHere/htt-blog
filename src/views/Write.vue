<template>
	<div class="write">
		<div class="left-bar">
			<cate-list></cate-list>
		</div>
		<div class="main-bar">
			<write-main></write-main>
		</div>
	</div>
</template>

<script>
	import cateList from '../components/LeftCateList'
	import writeMain from '../components/WriteMain'
	export default {
		name: 'write',
		data() {
			return {
			}
		},
		components: {
			cateList,
			writeMain
		}
	}
</script>

<style>

</style>