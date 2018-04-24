import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9999')

const MSG_LIST = 'MSG_LIST' // 聊天列表
const MSG_RECV = 'MSG_RECV' // 读取信息
const MSG_READ = 'MSG_READ' // 是否读过

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}


export function chat(state=initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read).length}
    case MSG_RECV:
      return {...state, chatmsg: [...state.chatmsg,action.payload]}
    // case MSG_READ:
    default: 
      return state
  }
}

function msgList(msgs, users) {
  return {type: MSG_LIST, payload: {msgs, users}}
}

function msgRecv(msg) {
  return {type: MSG_RECV, payload: msg}
}


export function recvMsg() {
  return dispatch => {
    socket.on('recivemsg', (data) => {
      dispatch(msgRecv(data))
    })
  }
}
export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg})
  }
}
export function getMsgList() {
  return dispatch => {
    axios.get('/user/getmsglist')
    .then(res => {
      if (res.status == 200 && res.data.code == 0) {
        dispatch(msgList(res.data.msgs, res.data.users))
      }
    })
  }
}