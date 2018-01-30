// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],

  multiCapabilities: [
    {
      "browserName": "chrome",
      chromeOptions: {
        args: ["--window-size=800,600"]
      }
    },
    {
      "browserName": "chrome",
      chromeOptions: {
        mobileEmulation: {
          deviceName: 'Nexus 7'
        }
      }
    },
    {
      "browserName": "chrome",
      chromeOptions: {
        mobileEmulation: {
          deviceName: 'Galaxy S5'
        }
      }
    },
    {
      "browserName": "chrome",
      chromeOptions: {
        mobileEmulation: {
          deviceName: 'iPhone X'
        }
      }
    },
    {
      "browserName": "chrome",
      chromeOptions: {
        mobileEmulation: {
          deviceName: 'iPad'
        }
      }
    }
  ],
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }

};
