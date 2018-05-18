<template>
<div>
	<div class="main">
		<div class="Topstory">
			<div class="Topstory-container">
				<div class="Topstory-mainColumn">
					<div class="Card Topstory-header">
						<div class="Topstory-header-nav">
							<button class="Button QuestionAskButton Topstory-header-navItem Button--plain" @click="ask=true">提问</button>
							<a href="/#/questions" class="Topstory-header-navItem" v-show="user.isAdmin">回答</a>
							<a href="/#/write" class="Topstory-header-navItem" v-show="user.isAdmin">写文章</a>
						</div>
						<a href="/#/draft" class="Topstory-header-rightItem" v-show="user.isAdmin">草稿</a>
					</div>
					<div class="Topstory-main noArticle" v-show="!articles.length">
						<div>
							<div class="Card Topstory-item">
								<span>汪 卷</span>
								<p>暂无文章</p>
							</div>
						</div>
					</div>
					<div class="Topstory-main" v-for="(article, index) in articles">
						<div>
							<div class="Card Topstory-item">
								<button class="Button Topstory-item-rightButton Button--plain" @click="article.show=false">×</button>
								<div class="Feed">
									<div class="Feed-title">
										<div class="Feed-meta">
											<span class="Feed-meta-item" v-show="article.category"># {{article.category ? article.category.name: ''}} #</span>
										</div>
									</div>
									<div class="Content-item Answer-item">
										<a href="javascript:;" @click="getDetails(article._id)"><h5 class="Content-item-title">{{article.title}}</h5></a>
										<div class="Content-item-meta"></div>
										<div class="RichContent is-collapsed">
											<div class="RichContent-inner">
												<span class="RichText CopyrightRichText-richText">{{article.content}}</span>
												<button class="Button Content-item-more Button--plain">阅读全文▼</button>
											</div>
											<div class="Content-item-actions">
												<span>
													<button class="Button VoteButton VoteButton--up">▲ {{article.liked}}</button>
													<button class="Button Content-item-action Button--plain" @click="currentComment=currentComment===index?-1:index">☀ {{article.comments.length}}条评论</button>
													<button class="Button Content-item-action Button--plain">※ 分享</button>
												</span>
											</div>
										</div>
										<div class="Comments-container" v-show="index===currentComment">
											<div class="Comments Comments--withEditor Comments-withPagination">
												<div class="Topbar CommentTopbar">
													<div class="Topbar-title">
														<h2 class="CommentTopbar-title">{{article.comments.length}}条评论</h2>
													</div>
												</div>
												<div>
													<div class="CommentList">
														<div class="CommentItem" v-for="comment in article.comments">
															<div>
																<div class="CommentItem-meta" v-if="!comment.personalWebsite">{{formatUsername(comment.name)}}</div>
																<div class="CommentItem-meta" v-if="comment.personalWebsite"><a :href="comment.personalWebsite">{{formatUsername(comment.name)}}</a></div>
																<div class="CommentItem-content">{{comment.comment}}</div>
															</div>
															<p class="CommentItem-date">{{formatTime(comment.date)}}</p>
														</div>
													</div>
												</div>
												<div class="Comments-footer CommentEditor--normal">
													<div class="CommentEditor-input Input-wrapper">
														<input type="text" class="Input" placeholder="写下你的评论..." v-model="comment.content">
													</div>
													<button class="Button Button--primary Button--blue" @click="submitComment(article._id)">评论</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="Topstory-slideBar">
					<div>
						<div class="Sticky">
							<div class="Card">
								<ul class="Topstory-slideBar-categoryList">
									<li class="Topstory-slideBar-categoryItem">
										<a href="/lives" class="Button Button--plain">
											<span class="Topstory-slideBar-categoryIcon">*</span>
											<span class="Topstory-slideBar-categoryLabel">Live</span>
										</a>
									</li>
									<li class="Topstory-slideBar-categoryItem">
										<a href="/pub" class="Button Button--plain">
											<span class="Topstory-slideBar-categoryIcon">*</span>
											<span class="Topstory-slideBar-categoryLabel">Pub</span>
										</a>
									</li>
									<li class="Topstory-slideBar-categoryItem">
										<a href="/circle" class="Button Button--plain">
											<span class="Topstory-slideBar-categoryIcon">*</span>
											<span class="Topstory-slideBar-categoryLabel">Circle</span>
										</a>
									</li>
								</ul>
							</div>
							<div class="Card">
								<ul class="Topstory-slideBar-navList">
									<li class="Topstory-slideBar-navTitle">个人分类</li>
									<li class="Topstory-slideBar-navItem" v-for="cate in categories">
										<a href="javascript:;" class="Button Button--plain" @click="getCateArticle(cate._id)">
											<span class="Topstory-slideBar-navIcon">+</span>
											<em class="Topstory-slideBar-navLink">{{cate.name}}</em>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<my-footer></my-footer>
	</div>
	<div class="Modal-Wrapper" v-if="ask">
		<div class="Modal-backdrop" @click="ask=false"></div>
		<div class="Modal Modal--large QuestionAsk-Modal">
			<div class="Modal-inner">
				<h3 class="Modal-title">Your question</h3>
				<div class="Modal-content">
					<div class="QuestionAsk">						
						<div class="QuestionAsk-section">
							<div class="QuestionAsk-title">
								<div class="Input-wrapper Input-wrapper--spread Input-wrapper--multiline Input-wrapper--large">
									<textarea class="Input" rows="1" placeholder="用户名" v-model="username"></textarea>
								</div>
							</div>
						</div>
						<div class="QuestionAsk-section" v-if="error">
							<div class="QuestionAsk-sectionHeader">
								<div class="QuestionAsk-sectionHeaderRight">
									<span class="QuestionAsk-error">用户名不能为空</span>
								</div>
							</div>
						</div>
						<div class="QuestionAsk-section">
							<div class="QuestionAsk-title">
								<div class="Input-wrapper Input-wrapper--spread Input-wrapper--multiline Input-wrapper--large">
									<textarea class="Input" rows="2" placeholder="问题标题" v-model="title"></textarea>
								</div>
							</div>
						</div>
						<div class="QuestionAsk-section" v-if="error">
							<div class="QuestionAsk-sectionHeader">
								<div class="QuestionAsk-sectionHeaderRight">
									<span class="QuestionAsk-error">问题标题不能为空</span>
								</div>
							</div>
						</div>
						<div class="QuestionAsk-section QuestionAsk-DetailSection">
							<div class="QuestionAsk-sectionHeader">
								<span class="QuestionAsk-label">问题描述（可选）：</span>
								<div class="QuestionAsk-sectionHeaderRight">
									<button class="Button Editable-control Button--plain"><strong>B</strong></button>
									<button class="Button Editable-control Button--plain"><strong>♫</strong></button>
								</div>
							</div>
							<div class="QuestionAsk-title">
								<div class="Input-wrapper Input-wrapper--spread Input-wrapper--multiline Input-wrapper--large">
									<textarea class="Input" rows="3" placeholder="问题背景、条件等详情信息" v-model="desp"></textarea>
								</div>
							</div>
						</div>
						<div class="ModalButtonGroup QuestionAsk-buttonGroup ModalButtonGroup--vertical">
							<button class="Button Button--primary Button--blue" @click="commit">提交问题</button>
						</div>
					</div>
				</div>
			</div>
			<button class="Button Modal-closeButton Button--plain"></button>
		</div>
	</div>
</div>
</template>

<script>
import myFooter from '../components/Footer'
export default {
  name: "mymain",
  data() {
    return {
      ask: false,
      error: false,
      articles: [],
      title: "",
			desp: "",
			username: '',
      user: {
        username: sessionStorage.username,
        isAdmin: sessionStorage.isAdmin === "true" ? true : false
      },
      categories: [],
      comment: {
        article: null,
        content: ""
      },
      currentComment: -1
    };
  },
  created: function() {
    this.$store.dispatch("getRecentArticles").then(res => {
      this.articles = this.$store.getters.articles;
    });
    this.$store.dispatch("getCategories").then(res => {
      this.categories = this.$store.getters.categories;
      this.$store.dispatch("setCurrentCate", this.categories[0]);
    });
  },
  methods: {
    getDetails(id) {
      this.$router.push({
        path: `/details/${id}`
      });
    },
    commit() {
      if (this.title == "") {
        this.error = true;
      } else {
				// var tags = this.tag.split(" ");
				const q = {
					title: this.title,
					content: this.desp,
					username: this.username
				}
        this.$store.dispatch('subQuestion', q).then(res => {
					if(res.msg === 'success'){
						alert('提问成功')
						this.ask = false
					} else{
						alert('提问失败')
						this.ask = false
					}
				})
      }
    },
    submitComment(_id) {
      if (this.comment.content == "") {
        alert("请输入你的评论...");
      } else {
        this.comment.article = _id;
        this.$store.dispatch("submitComment", this.comment).then(res => {
          if (res.msg == "success") {
            this.comment.content = "";
            this.$store.dispatch("getRecentArticles").then(res => {
              this.articles = this.$store.getters.articles;
            });
						alert("评论成功");
          } else {
            alert("评论失败");
          }
        });
      }
		},
		getCateArticle(_id){
			this.$store.dispatch("getCateArticle", _id).then(res => {
				this.articles = this.$store.getters.articles
			})
		},
		formatUsername(ip) {
      return this.global.ipToName(ip);
		},
		formatTime(time) {
      return this.global.normalTimeShow(time);
    }
	},
	components: {
		myFooter
	}
};
</script>