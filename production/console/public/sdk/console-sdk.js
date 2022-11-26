/*!
 * @app-fe/console-sdk - v0.0.0
 * @app-fe/console-sdk is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var AppFeConsoleSdk = (function (exports) {
    'use strict';

    (function() {
        const env = {};
        try {
            if (process) {
                process.env = Object.assign({}, process.env);
                Object.assign(process.env, env);
                return;
            }
        } catch (e) {} // avoid ReferenceError: process is not defined
        globalThis.process = { env:env };
    })();

    /** 退出登录 */
    var logout = function () {
        window.ConsoleJsBridge.logout();
    };
    /** 获取当前使用语言 */
    var getLang = function () {
        return window.ConsoleJsBridge.getLang();
    };
    /** 设置语言 */
    var setLang = function (lng) {
        window.ConsoleJsBridge.setLang(lng);
    };
    /** 监听语言变化 */
    var onLangChange = function (fn) {
        window.ConsoleJsBridge.onLangChange(fn);
    };
    /** 监听语言变化 */
    var offLangChange = function (fn) {
        window.ConsoleJsBridge.offLangChange(fn);
    };
    /** 获取路由结构 */
    var getRoutes = function () {
        return window.ConsoleJsBridge.getRoutes();
    };
    /** 打开新标签 */
    var navigateTo = function (path) {
        window.ConsoleJsBridge.navigateTo(path);
    };
    var consoleSDK = Object.assign(new Object(null), {
        logout: logout,
        getLang: getLang,
        setLang: setLang,
        onLangChange: onLangChange,
        offLangChange: offLangChange,
        getRoutes: getRoutes,
        navigateTo: navigateTo,
    });
    /* TODO: Proxy */
    window.consoleSDK = consoleSDK;

    exports.consoleSDK = consoleSDK;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
