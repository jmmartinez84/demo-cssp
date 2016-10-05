'use strict';
var path = require('path')
var fs = require('fs'),
    error = require('@microsoft/gulp-core-build').error,
    log = require('@microsoft/gulp-core-build').log;
// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {

  if( dir[dir.length-1] != '/') dir=dir.concat('/')

  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      if(path.extname(file)===".js"){
        filelist.push(dir + file );
      }
    }
  });
  return filelist;
};
var SetBaseUrl = {
  execute: (config) => {
    return new Promise((resolve, reject) => {
      var writeManifestsTask = undefined;
      for (var i = 0; i < config.uniqueTasks.length; i++) {
        if (config.uniqueTasks[i].name === 'writemanifests') {
          writeManifestsTask = config.uniqueTasks[i];
          break;
        }
      }

      if (!writeManifestsTask) {
        var errorMsg = 'Couldn\'t retrieve the WriteManifests task.';
        error(errorMsg);
        reject(errorMsg);
        return;
      }

      var url = config.production ? `${writeManifestsTask.taskConfig.cdnBasePath}` : `${writeManifestsTask.taskConfig.debugBasePath}dist/`;

      var webPartCodePaths = walkSync(`${config.libFolder}/webparts/linksModule/`);
      webPartCodePaths.forEach(function(webPartCodePath){
        var webPartCode = fs.readFileSync(webPartCodePath, 'utf-8');
        webPartCode = webPartCode.replace('$BASEURL$', url);
        fs.writeFile(webPartCodePath, webPartCode, (err) => {
            if (err) {
              error(err);
              reject(err);
              return;
            }
          log(`Base URL successfully set to ${url}`);
          resolve();
        });
      });
    });
  },
  name: 'setbaseurl'
};
exports.default = SetBaseUrl;