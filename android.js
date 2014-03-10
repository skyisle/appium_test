"use strict";

/*
You need to install Chrome first on your emulator (last tested against v30).
(Look for a apk and use 'adb install', or install from Google play. Try first
with an ARM emulator.) 

Then run:
  node local-android-wd-chrome.js
*/

var wd = require("wd");

require('colors');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var desired = {
    device: 'Android',
    //version: "4.4.2", // Android version last tested against
    "app": "/Users/skyisle/workspace/tmap4_3.2/build/apk/tmap_android-phone-debug-unaligned.apk",
    "app-package": "com.skt.skaf.l001mtm091", // built-in contact app
    "app-activity": "com.skt.tmap.activity.TmapIntroActivity",
};

// Instantiate a new browser session
var browser = wd.promiseChainRemote("localhost" , 4723);

// See whats going on
browser.on('status', function(info) {
  console.log(info.cyan);
});
browser.on('command', function(meth, path, data) {
  console.log(' > ' + meth.yellow, path.grey, data || '');
});

var bc = function(t) { return "//button[contains(@text, '" + t + "')]"; };
var ec = function(t) { return "//editText[contains(@text, '" + t + "')]"; };
var tc = function(t) { return "//text[contains(@text, '" + t + "')]"; };

// Run the tests
browser
  .init(desired).then(function() {
    browser
      .waitForElementByXPath(tc("집으로"), 100000).click()
      .fin(function() { return browser.quit(); });
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  })
  .done();
