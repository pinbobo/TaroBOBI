import { UPDATE, LOGIN, LOGING } from '../constants/user'

const INITIAL_STATE = {
  isNull: true,
  loading: false,
  id: '',
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODg5NjI0MzMsIm5iZiI6MTU4ODk2MjQzMywiZXhwIjoxNTkwMjU4NDMzLCJkYXRhIjp7InVpZCI6M319.GKhv6F1E23stRGMyIUqIrDGSaKgOGWegoxtU5EgJc3c',
  role: null,
  roleLabel: '',
  nickName: '',
  name: '',
  avatar: '',
  sex: '',
  birthday: '',
  mobile: ''
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        id: action.id,
        nickName: action.nickName,
        name: action.name,
        avatar: action.avatar,
        role: action.role,
        roleLabel: action.roleLabel,
        birthday: action.birthday,
        mobile: action.mobile,
        isNull: false,
        loading: false
      }
    case LOGIN:
      return {
        ...state,
        token: action.token
      }
    case LOGING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
