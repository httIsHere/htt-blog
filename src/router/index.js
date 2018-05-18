import Vue from 'vue'
import Router from 'vue-router'

// 网志页面
import Firstpage from '@/views/Firstpage'
import Ask from '@/components/Ask'
import Login from '@/views/Login'
import Write from '@/views/Write'
import Details from '@/views/ArticleDetails'
import Draft from '@//views/Draft'
import Email from '@//views/Email'
import Questions from '@/views/Questions'
import Chat from '@/views/Chat'
// 控制台页面

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Firstpage',
      component: Firstpage,
      children: [
        {
          path: 'ask',
          component: Ask
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/write',
      name: 'Write',
      component: Write
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details
    },
    {
      path: '/draft',
      name: 'Draft',
      component: Draft
    },
    {
      path: '/email',
      name: 'Email',
      component: Email
    },
    {
      path: '/questions',
      name: 'Questions',
      component: Questions
    },
    {
      path: '/imChat',
      name: 'Chat',
      component: Chat
    }
  ]
})
