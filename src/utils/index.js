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

export {
  getToken,
  query,
  request,
  urlToObj,
};
