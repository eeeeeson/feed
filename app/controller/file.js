'use strict';

const moment = require('moment');
const crypto = require('crypto');
const Controller = require('egg').Controller;

class FileController extends Controller {
  async transfer() {
    const { qiniu } = this.app;
    const { from, filename } = this.ctx.request.body;
    const md5 = crypto.createHash('md5').update(filename + +new Date()).digest('hex');
    const ext = filename.split('.').pop();
    const key = `${from}/${moment().format('YYYYMMDD')}/${md5}.${ext}`;

    const { bucket } = this.app.config.client;
    const options = {
      scope: `${bucket}:${key}`,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const token = putPolicy.uploadToken(qiniu.mac);
    this.ctx.body = { token };
  }
}

module.exports = FileController;