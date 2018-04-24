
export function getRedirectPath({type, avatar}) {
  // 根据用户信息跳转
  let url = (type === 'boss') ? '/boss' : '/genius'

  // 完善信息
  if (!avatar) {
    url += 'info'
  }
  return url
}

export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_')
}