// ==UserScript==
// @name         百度去广告
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       73
// @match        *://*.baidu.com/*
// @icon         https://www.baidu.com/favicon.ico
// @grant        none
// @run-at       document-start
// ==/UserScript==

/**
 * 百度去广告
 */

(function () {
  'use strict';
  /**datas */
  const datas = {
    advertise: [
      { funcName: 'advertise', name: 'baidu', match: /^https?:\/\/[a-z]+\.baidu\.com/ }
    ],
  }
  var { advertise } = datas;
  const businessLogic = new BusinessLogic()
  /**功能判断 */
  ([...advertise]).forEach(item => {
    if (location.href.match(item.match)) {
      switch (item.funcName) {
        case 'advertise':
          businessLogic.advertiseFun(item.name)
          break;

        default:
          break;
      }
    }
  })

  /**
   * 业务判断
   */
  class BusinessLogic extends OperateDOM {
    /**
     * @param { string } name
     * @return { 去广告样式表判断 }
     */
    advertiseFun(name) {
      let setStyle;
      switch (name) {
        case 'baidu':
          setStyle = `
            #content_left > :not(.xpath-log, .hit-toptip) {
              display: none !important;
            }
            #content_right {
              display: none !important;
            }
          `
          break;
  
        default:
          break;
      }
      this.CSSinsert(setStyle)
    }
  }

  /**
   * DOM操作
   */
  class OperateDOM {
    /**
     * @param {string} setStyle
     * @return { 页面插入css样式 }
     */
    CSSinsert(setStyle) {
      const domStyle = document.createElement('style')
      domStyle.appendChild(document.createTextNode(setStyle));
      document.querySelector('html').appendChild(domStyle);
    }
  }
})();

