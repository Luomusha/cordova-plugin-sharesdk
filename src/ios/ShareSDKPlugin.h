#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

#import <ShareSDK/ShareSDK.h>
#import <ShareSDKUI/ShareSDK+SSUI.h>

//继承CDVPlugin类
@interface ShareSDKPlugin : CDVPlugin

//接口方法， command.arguments[0]获取前端传递的参数
- (void)share:(CDVInvokedUrlCommand *)command;
- (void)login:(CDVInvokedUrlCommand *)command;
- (void)auth:(CDVInvokedUrlCommand *)command;
- (void)logout:(CDVInvokedUrlCommand *)command;

@end