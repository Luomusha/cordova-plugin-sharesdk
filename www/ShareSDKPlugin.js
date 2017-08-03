var pluginName = "ShareSDKPlugin";
var ShareSDKPlugin = {
};
ShareSDKPlugin.logout = function (successCallback, errorCallback, params) {
    cordova.exec(successCallback, errorCallback, pluginName, "logout", [params]);
};
ShareSDKPlugin.share = function (successCallback,errorCallback,params) {
    var result = undefined;
    if(Array.isArray(params)){
        result = params;
    }else{
        result = [params]
    }
    cordova.exec(successCallback, errorCallback, pluginName, "share", result);
};
//获取用户信息
ShareSDKPlugin.login = function (successCallback, errorCallback, params) {
    cordova.exec(successCallback, errorCallback, pluginName, "login", [params]);
};
//用户授权
ShareSDKPlugin.auth = function (successCallback, errorCallback, params) {
    cordova.exec(successCallback, errorCallback, pluginName, "auth", [params]);
};
module.exports = ShareSDKPlugin;

