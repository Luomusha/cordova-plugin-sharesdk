/**
 * Created by lossa on 2017/6/21.
 *
 * 插件在ios中，会屏蔽其他插件的callback方法。
 * sharesdk官方文档中说：
 * 在iOS9或以上，则必须要实现以下两个方法，并在其中进行自己的代码处理
 * (有部分开发者仅仅实现了第一个，所以可能会导致他自己的处理回调的方法没有执行)
 *
 * - (BOOL)application:(UIApplication *)application
 * openURL:(NSURL *)url
 * sourceApplication:(NSString *)sourceApplication
 * annotation:(id)annotation
 * {
 *   return [XXX handleOpenURL:url];
 * }
 *
 * - (BOOL)application:(UIApplication *)app
 * openURL:(NSURL *)url
 * options:(NSDictionary<NSString *,id> *)options
 * {
 *   return [XXX handleOpenURL:url];
 * }
 *
 * 而在cordova中没有实现这个方法。这个脚本就是为了修复这个问题
 */
module.exports = function (context) {

    var fs = context.requireCordovaModule('fs');
    var cdvAppDelegateFilePath = context.opts.projectRoot + '/platforms/ios/CordovaLib/Classes/Public/';
    var fileName = 'CDVAppDelegate.m';
    var before = '// only valid if 40x-Info.plist specifies a protocol to handle';
    var after = '//only valid if 40x-Info.plist specifies a protocol to handle         \n'
        + '- (BOOL)application:(UIApplication *)application                            \n'
        + 'openURL:(NSURL *)url                                                        \n'
        + 'options:(NSDictionary<NSString *,id> *)options                              \n'
        + '{                                                                           \n'
        + '  if (!url) {                                                               \n'
        + '    return NO;                                                              \n'
        + '  }                                                                         \n'
        + '                                                                            \n'
        + '  // all plugins will get the notification, and their handlers will be called\n'
        + '  [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];'
        + '                                                                            \n'
        + '  return YES;                                                               \n'
        + '}                                                                           \n';

    fs.readFile(cdvAppDelegateFilePath + fileName, 'utf-8', function (err, data) {
        if (err) throw err;

        //替换方法
        var result = data.replace(before, after);

        fs.exists(cdvAppDelegateFilePath, function (exists) {
            if (!exists) fs.mkdir(cdvAppDelegateFilePath);

            fs.exists(cdvAppDelegateFilePath, function (fexists) {
                if (fexists) {
                    console.warn(cdvAppDelegateFilePath + ' is exists, WILL be replaced.');
                }
                fs.writeFile(cdvAppDelegateFilePath + fileName, result, 'utf8', function (err) {
                    if (err) throw err;
                });
            });
        });
    })
};
