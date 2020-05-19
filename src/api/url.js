const baseURL = process.env.url

const version = '20200326001'

const login = '/user/login'
const verify = '/verify/bobi'

const banner = '/index/bannerList'
const hotCourse = '/index/hotCourse'
const hotNews = '/index/hotNews'
const hotCase = '/index/hotCases'
const guide = '/guide'

const roiCase = '/index/roiCase'

const userInfo = '/user/getUserInfo'
const userInfoUpdate = '/user/updateInfo'
const userMobileUpdate = '/user/getUserPhone'



const updateAddress = '/userAddress/store'
const address = '/userAddress/show'

const qrPoster = '/user/getQrPoster'
const shareCode = '/user/generateQRCode'

// 升级会员
const roleUpgrade = '/user/setPresident'

// 改变用户身份
const identityChange = '/user/setMember'

const courseCate = '/course/cate'

const myCourse = '/course/myCourses'

const courseList = '/course/list'
const courseDetail = '/course/deatil'
const courseSearch = '/course/query'

const caseList = '/case/list'
const caseDetail = 'cases/detail'


const newsSearch = '/news/query'
const newsList = '/news/list'
const newsDetail = '/news/detail'


const buy = '/payment/pay'

// 下级
const childrenList = '/invite/invalidChildList'
const validChildrenList = '/invite/validChildList'

// 会长
const chairmanList = '/invite/presidentChildList'
const chairmanChildrenList = '/user/getChild'


// 绑定上级
const bindParent = '/invite/bindParent'

// 余额
const balance = '/invite/getBalance'

// 邀请人信息
const invitePeopleInfo = '/invite/getInviteDetail'
// 商品
const goods = '/payment/getGoods'

const taskPlatform = '/task/platform'
const taskType = '/task/type'
const taskList = '/task/index'



export {
  baseURL,
  version,
  login,
  verify,
  banner,
  hotCourse,
  hotNews,
  hotCase,
  guide,
  roiCase,
  userInfo,
  userInfoUpdate,
  userMobileUpdate,
  updateAddress,
  address,
  qrPoster,
  shareCode,
  roleUpgrade,
  identityChange,
  courseCate,
  myCourse,
  courseList,
  courseDetail,
  courseSearch,
  caseList,
  caseDetail,
  newsSearch,
  newsList,
  newsDetail,
  buy,
  childrenList,
  validChildrenList,
  chairmanList,
  chairmanChildrenList,
  bindParent,
  balance,
  invitePeopleInfo,
  goods,
  taskPlatform,
  taskType,
  taskList
}