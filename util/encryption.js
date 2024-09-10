import md5 from '@/util/js-md5/build/md5.min.js'
import Jsencrypt from '@/util/rsa/jsencrypt.min.js'

const publicKeyRSAStr =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCRvwjHWR9//EFI+sPDxa16HQweGA8iuStD0Ek1oBfv1pyO5j9hTdmNRu++VU5iZJMQRrEIz5pr6j5C81WOpCvTuLcwoFjjNwJ/+aCVfip6vZusuZ/uXiD8Wx+Z3uZougIAevLV5omz8Jx5olRO2mg0V8YLtgANwmtgjanI0EiYtwIDAQAB'



let encryption = {
    getRandomNumber(length) {
        let num = ''
        for (var i = 0; i < length; i++) {
            num += Math.floor(Math.random() * 10)
        }
        return num
    },
    sortData(obj) {

        let newKey = Object.keys(obj).sort()
        let newObj = {}
        let jsonStr = ''
        for (var i = 0; i < newKey.length; i++) {


            newObj[newKey[i]] = obj[newKey[i]]
            jsonStr += newKey[i] + '=' + newObj[newKey[i]] + '&'
            //current=1&size=10&type=1&
        }
        /* 截取最后一个字符 */
        let jsonNewData = jsonStr.slice(0, jsonStr.length - 1)
        let randomNumber = this.getRandomNumber(8)

        return jsonNewData
    },
    md5data() {
        // console.log('md5===', this.sortData);
    },

    getSignKey(obj) {

        let salt = this.getRandomNumber(8) //随机数
        let times = new Date().getTime() //时间戳
        const jsRsa = new Jsencrypt() //RSA公钥
        jsRsa.setPublicKey(publicKeyRSAStr)


        let jsonStr = ''
        let key = ''
        let jsonNewData = ''
        let sign = ''

        /* 先判断是否对象 */
        if (typeof obj == 'object') {
            /* 是对象 */
            /* 再判断是否为空对象 */
            if (JSON.stringify(obj) === '{}') {
                /* 空对象，没有数据 */
                sign = md5(salt)

            } else {
                /* 非空对象 */

                /* 过滤掉空字段 */
                for (let key in obj) {
                    if (obj[key] == '' || obj[key] == undefined || obj[key] == null) {
                        delete obj[key]
                    }
                }
                if (JSON.stringify(obj) === '{}') {
                    // console.log('处理过的对象为空对象');
                    sign = md5(salt)
                } else {
                    // console.log('处理过的对象不是空对象');
                    /* 非空对象，有数据集 */
                    let newKey = Object.keys(obj).sort()
                    let newObj = {}


                    for (var i = 0; i < newKey.length; i++) {
                        
                        newObj[newKey[i]] = obj[newKey[i]]
                        jsonStr += newKey[i] + '=' + newObj[newKey[i]] + '&'

                    }
                    /* 截取最后一个字符 */
                    jsonNewData = jsonStr.slice(0, jsonStr.length - 1)

                    // console.warn('md5转码前的字符串====', jsonNewData + '&' + salt);
                    // console.warn('RSA加密前的KEY====', salt + '@' + times);
                    sign = md5(jsonNewData + '&' + salt)
                }



            }
        } else {
            /* 不是对象 */
        }
        key = jsRsa.encrypt(salt + '@' + times)

        return {
            sign: sign,
            key: key
        }
    },
    getKey(value) {

    }



}
export default encryption
