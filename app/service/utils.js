'use strict';
const Service = require('egg').Service;

class utilsService extends Service {
  async cookie() {
    // 生成随机字符串
    const randomString = function() {
      // 默认位数为64位
      const len = 64;
      const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      const maxPos = $chars.length;
      let pwd = '';
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    };

    let feedCookie = this.ctx.cookies.get('feedCookie');
    console.log('浏览器中的cookie:', feedCookie);
    if (!feedCookie) {
      feedCookie = randomString();
      this.ctx.cookies.set('feedCookie', feedCookie, { maxAge: 1000 * 60 * 60 * 24 * 30 });
      console.log('新设置的cookie:', feedCookie);
    }
    return feedCookie;
  }
}

module.exports = utilsService;