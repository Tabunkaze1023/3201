const USER_KEY = 'local_user_info'

export const user = {
  isLoggedIn() {
    return !!uni.getStorageSync(USER_KEY)
  },

  getInfo() {
    const userStr = uni.getStorageSync(USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  },

  login(userInfo) {
    const defaultUser = {
      _id: 'local_user',
      nickname: '本地用户',
      avatar: '/static/default-avatar.png',
      username: 'local'
    }
    const userData = { ...defaultUser, ...userInfo }
    uni.setStorageSync(USER_KEY, JSON.stringify(userData))
    return userData
  },

  logout() {
    uni.removeStorageSync(USER_KEY)
  },

  updateInfo(params) {
    const userStr = uni.getStorageSync(USER_KEY)
    if (userStr) {
      const userData = JSON.parse(userStr)
      Object.assign(userData, params)
      uni.setStorageSync(USER_KEY, JSON.stringify(userData))
      return userData
    }
    return null
  }
}
