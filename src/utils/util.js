const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(string) {
  // string = 2020-02-06 20:57:42
  if (typeof string !== 'string') return ''
  const [date, time] = string.split(' ')
  const [year, month, day] = date.split('-')
  const [h, m, s] = time.split(':')
  const formatTime = []
  const formatDate = []

  formatDate.push(month, day)
  // formatTime.push(h, m)
  const result = `${formatDate.join('-')} ${formatTime.join(':')}`
  return result

  // const date = new Date(string)
  // const month = ('0' + date.getMonth()).slice(-2)
  // const day = ('0' + date.getDate()).slice(-2)

  // const hours = ('0' + date.getHours()).slice(-2)
  // const minutes = ('0' + date.getMinutes()).slice(-2)
  // console.log(hours, minutes)
  // const result = `${month}-${day} ${hours}:${minutes}`
  // return result
}

function pathResponseArray(data) {
  return data.map(item => {
    return Object.assign({}, item, {
      created_at: formatDate(item.created_at)
    })
  })
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatGender(type) {
  switch (type) {
    case 1:
      return '男'
    case 2:
      return '女'
    default:
      return '未知'
  }
}


// 跳转前先判断有没有在登录页，判断依据是在 globalData 里维护了一个状态
// 如果在登录就禁止重复
// 为什么要这么做 请求失败，因为权限问题会自动发起跳转 但是请求会有多个所以会对跳转次数进行限制
// 那为什么要重新封装一个函数来做这件事，使用 async await 来维护这件事发现始终在外面维护 globalData 还会重复提交多次，猜测原因是 async await 被 babel 转译导致执行顺序未按照设想执行

// 返回 true 登录操作在此之前已经被发起，所以丢弃掉了此次操作

function openLoginPage() {
  new Promise((resolve, reject) => {
    wx.navigateTo({
      url: '/pages/login/login',
      events: {
        logged(token) {
          resolve(token)
        },
        err(err) {
          reject(err)
        }
      }
    })
  })
}
openLoginPage = mergeRequest(openLoginPage)

function mergeRequest(fun) {
  let cacheTokenPromise, ing
  return async (...rest) => {
    if (!ing) {
      cacheTokenPromise = fun.apply(null, rest)
      ing = true
    }
    try {
      return await cacheTokenPromise
    } catch (err) {
      throw err
    } finally {
      ing = false
    }
  }
}

export {
  mergeRequest,
  openLoginPage,
  formatGender,
  pathResponseArray,
  formatDate
}
