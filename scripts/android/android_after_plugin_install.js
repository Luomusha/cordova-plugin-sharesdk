module.exports = function(context) {

    var cordova_util = context.requireCordovaModule("cordova-lib/src/cordova/util"),
        ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser,
        fs = context.requireCordovaModule('fs');

    var xml = cordova_util.projectConfig(context.opts.projectRoot);
    var cfg = new ConfigParser(xml);

    var packageName = cfg.packageName();

    var wxapiPath = context.opts.projectRoot + '/platforms/android/src/' + packageName.replace(/\./g, '/') + '/wxapi';
    var WXEntryActivityPath = wxapiPath + '/WXEntryActivity.java';

    fs.readFile(context.opts.projectRoot + '/plugins/cordova-plugin-sharesdk/src/android/target/package/wxapi/WXEntryActivity.java', 'utf8', function(err, data) {
        if (err) throw err;
        var result = data.replace(/PACKAGENAME/g, packageName);
        fs.stat(wxapiPath, (err, stats) => {
            if(err) {
                fs.mkdirSync(wxapiPath);
            }

            fs.stat(WXEntryActivityPath, (err, stats) => {
                if(!err) {
                    console.log(WXEntryActivityPath + ' is exists, Not be replaced.');
                } else {
                    fs.writeFile(WXEntryActivityPath, result, 'utf8', function(err) {
                        console.log('write file error: ' + err);
                        if (err) throw err;
                    });
                }
            })
        });
    });
}