"use strict";
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var stable = require('stable');
function unique(arr) {
    var keys = {}, out = [];
    for (var i = 0, l = arr.length; i < l; ++i) {
        if (keys.hasOwnProperty(arr[i])) {
            continue;
        }
        out.push(arr[i]);
        keys[arr[i]] = true;
    }
    return out;
}
function sort(a, b) {
    var aTsd = a.indexOf('tsd.d.ts') > -1, bTsd = b.indexOf('tsd.d.ts') > -1, aD = a.indexOf('.d.ts') > -1, bD = b.indexOf('.d.ts') > -1;
    if (aTsd) {
        return -1;
    }
    if (bTsd) {
        return 1;
    }
    if (aD && bD) {
        return 0;
    }
    if (aD) {
        return -1;
    }
    if (bD) {
        return 1;
    }
    return 0;
}
function getFiles(options, configFile) {
    var root = options.cwd || process.cwd(), configDir = path.resolve(root, options.configPath || '.'), filesGlob = configFile.filesGlob || [], files = [];
    files = unique(files.concat(filesGlob));
    var include = files.filter(function (file) {
        return file[0] !== '!';
    }), ignore = files.filter(function (file) {
        return file[0] === '!';
    }), sortedFiles = [];
    for (var _i = 0, include_1 = include; _i < include_1.length; _i++) {
        var pattern = include_1[_i];
        sortedFiles.push(glob.sync(pattern, {
            cwd: configDir,
            ignore: ignore.map(function (file) { return file.slice(1); })
        }));
    }
    sortedFiles = sortedFiles.map(function (files) {
        return stable(files);
    });
    files = unique(sortedFiles.reduce(function (files, current) {
        return files.concat(current);
    }, []));
    return stable(files, sort);
}
function eol(str) {
    var cr = '\r', lf = '\n', r = /\r/.test(str), n = /\n/.test(str);
    if (r && n) {
        return cr + lf;
    }
    return lf;
}
function bomCheck1(str) {
    return typeof str === 'string' && str.charCodeAt(0) === 0xFEFF;
}
function bomCheck2(str) {
    return typeof str === 'string' && str[0] === 0xEF && str[1] === 0xBB && str[2] === 0xBF;
}
function getBom(str) {
    if (bomCheck1(str)) {
        return str[0];
    }
    if (bomCheck2(str)) {
        return str.slice(0, 3);
    }
    return '';
}
function stripBom(str) {
    if (bomCheck1(str)) {
        return str.slice(1);
    }
    if (bomCheck2(str)) {
        return str.slice(3);
    }
    return str;
}
function filesArrayHandler(options, configFile) {
    if (!configFile.filesGlob) {
        return;
    }
    if (options.empty) {
        configFile.files = [];
    }
    else {
        configFile.files = getFiles(options, configFile);
    }
}
module.exports = function (options, done) {
    if (options === void 0) { options = {}; }
    if (done === void 0) { done = function () { }; }
    var root = options.cwd || process.cwd(), configName = options.configFileName || 'tsconfig.json', configDir = path.resolve(root, options.configPath || '.'), filePath = path.resolve(configDir, configName), fileStr = fs.readFileSync(filePath, 'utf8');
    var bom = getBom(fileStr);
    fileStr = stripBom(fileStr);
    var configFile = JSON.parse(fileStr), async = (options.async != null) ? options.async : true, EOL = eol(fileStr);
    filesArrayHandler(options, configFile);
    if (!options.indent || Number(options.indent) === 0) {
        options.indent = 4;
    }
    var newLineRegex = /\n\r|\r\n|\n|\r/g, outputStr = JSON.stringify(configFile, null, options.indent), outputCompare = outputStr.replace(newLineRegex, ''), fileCompare = fileStr.replace(newLineRegex, '');
    if (outputCompare === fileCompare) {
        if (async) {
            setImmediate(done);
        }
        else {
            done();
        }
    }
    else {
        outputStr = outputStr.replace(newLineRegex, EOL) + EOL;
        outputStr = bom.concat(outputStr);
        if (async) {
            fs.writeFile(filePath, outputStr, done);
        }
        else {
            try {
                fs.writeFileSync(filePath, outputStr);
                done();
            }
            catch (error) {
                done(error);
            }
        }
    }
    return configFile;
};
