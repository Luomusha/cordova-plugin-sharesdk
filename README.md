# cordova-plugin-sharesdk
A cordova for share with wechat,QQ,QQZONE,sinaWeibo

# 此库已停止维护。

#说明
十分感谢，[赵新](https://github.com/raistlinzx)。这个插件仿照[赵新](https://github.com/raistlinzx/cordova-plugin-sharesdk)的插件写的。
在基础上增加了第三方登陆功能。使用了更新的SDK

ShareSDK For Android v2.8.0 (2016-12-27)
ShareSDK For iOS Simple v3.6.1 (2017-02-15)
```
ionic plugin add https://github.com/Luomusha/cordova-plugin-sharesdk.git 
--variable SHARESDK_IOS_APPKEY=<ShareSDK iOS App Key> 
--variable SHARESDK_ANDROID_APPKEY=<ShareSDK Android App Key> 
--variable QQAPPID=<QQ App Id> 
--variable QQAPPKEY=<QQ App Key> 
--variable WECHATAPPID=<WeChat App Id> 
--variable WECHATAPPSECRET=<WeChat App Secret> 
--variable QQURLSCHEME=<QQ Url Scheme For iOS Only> 
--variable WBAPPKEY=<SinaWeibo App Key> 
--variable WBAPPSECRET=<SinaWeibo App Secret> 
--variable WBREDIRECTURL=<SinaWeibo Redirect Url>
```

|参数                         |说明                                 |
|-----------------------------|-------------------------------------|
|SHARESDK_IOS_APPKEY          |ShareSDK注册(IOS)                    |
|SHARESDK_ANDROID_APPKEY      |ShareSDK注册(ANDROID)                |
|QQAPPID_ANDROID              |QQ开放平台注册                       |
|QQAPPKEY_ANDROID             |QQ开放平台注册                       |
|QQAPPID_IOS                  |QQ开放平台注册                       |
|QQAPPKEY_IOS                 |QQ开放平台注册                                          |
|QQURLSCHEME                  |QQ回调Scheme。例如:`QQ41DF25B4`,QQ加上appid的16进制     |
|WECHATAPPID                  |微信开放平台注册                     |
|WECHATAPPSECRET              |微信开放平台注册                     |
|WBAPPKEY                     |新浪微博                             |
|WBAPPSECRET                  |新浪微博                             |
|WBREDIRECTURL                |新浪微博回调地址。必须与注册时一致   |

## 卸载重新安装

```sh
ionic plugin remove cordova-plugin-sharesdk
```


# JS调用
### JS分享
```js
function share() {
        var param = [
            '测试分享标题',
            '你们好啊这里是测试分享',
            'http://cdn.qiyestore.com/openapi/upload/2015/12/25/EYZZ17L785.png',
            'http://www.qiyestore.com'
        ];
        var success = function(result){
            console.log('share success!!',JSON.stringify(result))
        };
        var error = function(result){
            console.log('share error!!',JSON.stringify(result))
        };
	    ShareSDKPlugin.share(success,error,param);
}
```
|参数|说明|
|---|---|
|success|成功回调|
|error|失败回调|
|param-参数1|标题|
|param-参数2|文字内容|
|param-参数3|图片URL|
|param-参数4|分享查看URL|

目前分享成功后应用会提示A回到应用，B留在微信/QQ/微博.如果选择回到应用，则调用success回调函数。
如果点击留在微信/QQ/微博，则调用error回调函数。


### JS授权
授权功能为像第三方平台请求授权。有安装应用的拉起第三方应用，没应用的开启网页版授权，用户同意后返回用户信息。
```js
function auth() {
        function success(result){
            console.log('auth success!!',JSON.stringify(result));
        }
        function error(result){
            console.log('auth error!!',JSON.stringify(result))
        }
        var platform  = 'QQ'//QQ/Sina/Wechat
        ShareSDKPlugin.auth(success,error,platform );
}

```
|参数|说明|
|---|---|
|参数1|成功回调|
|参数2|失败回调|
|参数3|平台，不区分大小写qq/sina/wechat|
### JS登陆

授权功能为像第三方平台请求授权。有安装应用的拉起第三方应用，没应用的开启网页版授权，用户同意后返回用户信息。
与auth不同的是login如果用户授权过了，就不弹出授权页面。而auth每次都弹出授权页面，即使授权过了
```js
function login() {
        function success(result){
            console.log('login success',JSON.stringify(result));
        }
        function error(result){
            console.log('login error',JSON.stringify(result));
        }
        var platform  = 'QQ'//QQ/Sina/Wechat
        ShareSDKPlugin.login(success,error,platform );
}
```
|参数|说明|
|---|---|
|参数1|成功回调|
|参数2|失败回调|
|参数3|平台，不区分大小写qq/sina/wechat|



### JS清除用户授权

```js
function logout() {
        var platform  = 'QQ'//QQ/Sina/Wechat
        ShareSDKPlugin.logout(platform );
}
```



### TIPS：
 - 在没有签名的情况下，QQ平台可以分享。但是微博和微信平台会分享失败。
 - Android中，如果有使用微信支付插件，会起冲突。需要在manifest.xml注释掉相关Activity注册。

### 改动
 - 2017-2-24 发布0.1版本。基本功能可用。

### IOS中回调插件冲突问题解决
在cordova项目中的CordovaLib／Public／CDVAppDelegate.m里面加入下面这个方法。

- (BOOL)application:(UIApplication *)application
openURL:(NSURL *)url
options:(NSDictionary<NSString *,id> *)options
{
  if (!url) {
    return NO;
  }

  // all plugins will get the notification, and their handlers will be called
  [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];

  return YES;
}

欢迎pull request。
