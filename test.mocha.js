const puppeteer = require('puppeteer');
const { expect } = require('chai');
const global = {};
const path = require('path');

let page;

const opts = {
  headless: true,
  slowMo: 100,
  timeout: 10000,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
};

// expose variables
before (async function () {
  global.expect = expect;
  global.browser = await puppeteer.launch(opts);
  global.page = await global.browser.newPage();

  await global.page.goto('file://' + path.dirname(__filename) + '/SpecRunner.html');
});

// close browser and reset global variables
after (async function () {
  await global.page.close();
  global.browser.close();
});

describe('n-queens', async function () {

  before(async function () {
    var cases = await global.page.evaluate(() => {
      return Array.from(document.querySelectorAll('.test h2')).map(elT => elT.childNodes[0].nodeValue);
    });

    var passed = await global.page.evaluate(() => {
      return Array.from(document.querySelectorAll('.test')).map(elT => elT.classList.contains('pass'));
    });

    var failed = await global.page.evaluate(() => {
      return Array.from(document.querySelectorAll('.test')).map(elT => {
        if(elT.classList.contains('fail')) {
          return elT.querySelector('pre.error').childNodes[0].nodeValue;
        } else {
          return null;
        }
      })
    });

    describe('here are some dynamic It() tests', function () {
      cases.forEach(function (test, i) {
        it(test, function() {
          if(!passed[i]) {
            console.log('\t' + '-'.repeat(failed[i].length));
            console.log('\t' + failed[i]);
            console.log('\t' + '-'.repeat(failed[i].length))
          }
          expect(passed[i]).to.eql(true);
        })
      });
    });

  });

  describe('', async function() {
    it('trigger', async function() { });
  });

});
