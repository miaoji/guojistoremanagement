import { getToken } from './authority';
import { request as query } from './query';
import { request } from './request';

function urlToObj(url) {
  const urlStr = url.split('?')[1];
  if (urlStr) {
    const urlArr = urlStr.split('&');
    const urlObj = {};
    urlArr.forEach((item) => {
      const [key, val] = item.split('=');
      urlObj[key] = val;
    });
    return urlObj;
  } else {
    return {};
  }
}

/**
 * [format description]
 * @param  {[String]} fmt  [输出的日期格式 'yyyy-MM-dd hh:mm:ss']
 * @param  {[Date]} date [new Date()]
 * @return {[String]}      [格式化后的时间]
 */
function formatDate(fmt, date) {
  if (typeof date !== 'object') {
    return '未知时间';
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    /* eslint-disable no-param-reassign */
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    /* eslint-disable no-param-reassign */
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  }
  return fmt;
}

/**
 * [handleScanval description]
 * @param  {[String]} val  [扫描出的值]
 * @return {[Object]} { orderNo: '' }      [返回的值]
 */
function handleScanval(val) {
  // 单号
  if (val.substr(0, 3) === 'orderNo') {
    return { orderNo: val };
  }
  // 客户编号
  if (val.substr(0, 3) === 'MZA') {
    return { customerNo: val };
  }
  // 快递代码
  if (val.substr(0, 3) === 'KD_') {
    return { expressCompanyCode: val.replace('KD_', '') };
  }
  // 货架号
  if (val.substr(0, 3) === 'SL_') {
    return { shelfNo: val };
  }
  return {};
}

export {
  getToken,
  query,
  request,
  urlToObj,
  formatDate,
  handleScanval,
};
