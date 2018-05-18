<template>
	<div class="Corner">
		<div class="CornerButtons">
			<div class="CornerAnimayedFlex">
				<button class="Button CornerButton Button--plain" @click="toto=true">〼</button>
			</div>
			<div class="CornerAnimayedFlex">
				<button class="Button CornerButton Button--plain">△</button>
			</div>
		</div>
		<div class="Card todos" v-show="toto">
			<!--<h3 class="todos-title">Todos</h3>-->
			<p @click="toto=false">×</p>
			<div class="Input-wrapper Input-wrapper--spread Input-wrapper--multiline Input-wrapper--large">
				<input class="Input" type="text" v-model="todo" @keydown.13="addTodo"/>
			</div>
			<div class="todos-content">
				<ul class="todos-list" v-for="(item,index) in Todos">
					<li v-show="item.show">
						<input type="checkbox" :checked="item.finished" @click="toggleFinish(index)"/>
						<span :class="{'finished': item.finished}">{{item.content}}</span>
					</li>
				</ul>
			</div>
			<div class="todos-action">
				<span class="todos-actionItem" @click="all">All</span>
				<span class="todos-actionItem" @click="unfinished">unfinished</span>
				<span class="todos-actionItem" @click="finished">finished</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'corner',
		data () {
			return {
				toto: false,
				todo: '',
				todos: this.getCookie("todos") || []
			}
		},
		methods: {
			addTodo () {
				if(this.todo != ''){
					var todo = {
						content: this.todo,
						finished: false,
						show: true
					}
					this.todos.push(todo);
					this.todo = '';
					this.setCookie(JSON.stringify(this.todos));
				}
			},
			toggleFinish (index){
				this.todos[index].finished = !this.todos[index].finished;
//				this.todos[index].show = !this.todos[index].show;
				this.setCookie(JSON.stringify(this.todos));
			},
			all () {
				this.todos.forEach(function(element){
					element.show = true;
				});
			},
			unfinished () {
				this.todos.forEach(function(element){
					if(element.finished == false){
						element.show = true;
					} else {
						element.show = false;
					}
				});
			},
			finished () {
				this.todos.forEach(function(element){
					if(element.finished == true){
						element.show = true;
					} else {
						element.show = false;
					}
				});
			},
			setCookie (todos) {
				document.cookie = "todos=" + todos;
			},
			getCookie (todos) {
				var arr,reg=new RegExp("(^| )"+todos+"=([^;]*)(;|$)");
				if(arr = document.cookie.match(reg)){
					if(arr[2] != null && arr[2].length != 0 && arr[2] != ''){
						return JSON.parse(unescape(arr[2]));
					}
					else{
						return null;
					}
				}
				else{
					return null;
				}
			}
		},
		computed: {
			Todos: function () {
				return this.todos.reverse();
			}
		}
	}
</script>