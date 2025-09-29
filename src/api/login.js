// 存放登录相关接口请求
import request from '@/utils/request'
// 图形验证码
const getPicCode = () => {
  return request.get('/captcha/image')
}

const getMsgCode = (capchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      capchaCode,
      captchaKey,
      mobile
    }
  })
}

const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}

export default { getPicCode, getMsgCode, codeLogin }
