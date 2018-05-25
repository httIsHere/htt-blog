<template>
  <header class="header is-fixed">
  	<div class="header-inner">
  		<a href="/" aria-label="汪世界" class="header-title">汪卷</a>
  		<nav role="navigation" class="header-nav">
  			<router-link class="header-navItem" :class="{'is-active': currentModule===0}" to="/">首页</router-link>
  			<router-link class="header-navItem" :class="{'is-active': currentModule===1}" to="/questions">专题</router-link>
  			<router-link class="header-navItem" :class="{'is-active': currentModule===2}" to="/interesting">发现</router-link>
  		</nav>
  		<div class="SearchBar" role="search">
  			<div class="SearchBar-toolWrapper">
  				<form class="SearchBar-tool">
  					<div>
  						<div class="Popover">
  							<div class="SearchBar-input Input-wrapper Input-wrapper--grey" :class="{'SearchBar-focusedInput': focused, 'is-focus': focused}">
  								<input type="text" class="Input" id="" value="" placeholder="搜索你感兴趣的内容..." @focus="inputFocused(1)" @focusout="inputFocused(2)"/>
  								<div class="Input-after">
  									<button class="Button SearchBar-searchIcon Button--primary">
  										Go
  									</button>
  								</div>
  							</div>
  						</div>
  					</div>
  				</form>
  			</div>
  			<button class="Button QuestionAskButton SearchBar-askButton Button--primary Button--blue" :class="{'SearchBar-hiddenAskButton': focused}">提问</button>
  		</div>
  		<div class="header-userInfo">
  			<div class="Popover PushNotifications header-notifications">
  				<button class="Button PushNotifications-icon Button--plain"  v-show="user.isAdmin">消息</button>
  			</div>
  			<div class="Popover Messages header-messages">
  				<router-link to="imChat"><button class="Button Messages-icon Button--plain">私信</button></router-link>
  			</div>
  			<div class="header-profile">
  				<div class="Popover header-menu">
						<span class="">{{user.username}}</span>
  					<button class="Button header-profileEntry Button--plain">
  						<img class="Avatar header-profileAvatar" src="../assets/head.png"/>
  					</button>
  				</div>
  			</div>
  		</div>
  	</div>
  </header>
</template>
<script>
export default {
  name: 'myHeader',
  data () {
    return {
      userhead: '../assets/head.png',
			focused: false,
			user: {
			  username: sessionStorage.username,
			  isAdmin: sessionStorage.isAdmin === 'true' ? true : false
		  }
    }
	},
	props: {
			currentModule: Number
	},
  methods: {
    inputFocused (num) {
      if (num === 1) {
        this.focused = true
      } else {
        this.focused = false
      }
    }
  }
}
</script>
