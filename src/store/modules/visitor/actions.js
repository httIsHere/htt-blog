import qs from 'qs'
import axios from 'axios'

export default{
  submitComment: ({commit, state}, comment) => {
    return axios.post('/server/submitComment', qs.stringify(comment)).then(res => {
      return res.data
    })
  },
  subQuestion: ({commit, state}, question) => {
    return axios.post('/server/subQuestion', qs.stringify(question)).then(res => {
      return res.data
    })
  },
  getQuestions: ({commit, state}) => {
    return axios.get('/server/getQuestions').then(res => {
      return res.data
    })
  },
  subAnswer: ({commit, state}, answer) => {
    return axios.post('/server/subAnswer', qs.stringify(answer)).then(res => {
      return res.data
    })
  }
}
