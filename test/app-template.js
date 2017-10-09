'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var mockery = require('mockery');
var os = require('os');

describe('Alfresco component generator', function () {
  before(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });
  });

  after(function () {
    mockery.disable();
  });

  it('Can be imported without blowing up', function () {
    var app = require('../app');
    assert(app !== undefined);
  });

  describe('Not include component', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp'))
        .withPrompts({
          projectName: 'app-fake',
          description: 'A awesome alfresco APP',
          githubAccount: 'componentCreatorAccount',
          authorName: 'Alfresco Team',
          authorEmail: 'Sonikku.Hejjihoggu@alfresco.com',
          authorUrl: 'http://Hejjihoggu.io',
          keywords: ['app-keyword', 'angular2-keyword'],
          alfrescoServerHost: 'http://servertTest:8080/share',
          features: [],
          license: 'MIT'
        })
        .on('error', function (error) {
          console.log(error);
        })
        .on('end', done);
    });

    it('creates files', function () {
      var expected = [
        'app/components/activiti/activiti-demo.component.html',
        'app/components/activiti/activiti-demo.component.scss',
        'app/components/activiti/activiti-demo.component.ts',
        'app/components/activiti/form-node-viewer.component.html',
        'app/components/activiti/form-node-viewer.component.css',
        'app/components/activiti/form-node-viewer.component.ts',
        'app/components/activiti/form-viewer.component.html',
        'app/components/activiti/form-viewer.component.css',
        'app/components/activiti/form-viewer.component.ts',
        'app/components/files/files.component.html',
        'app/components/files/files.component.ts'
      ];
      assert.noFile(expected);
    });

    it('notfill the app.component.html with the navigation bar', function () {
      assert.noFileContent('app/app.component.html', 'id="navigation-bar"');
    });

    it('not fill the app.routes.ts with the UploadButtonComponent', function () {
      assert.noFileContent('app/app.routes.ts', 'UploadButtonComponent');
    });

    it('not fill the app.main.ts with the UploadService', function () {
      assert.noFileContent('app/main.ts', 'UploadService');
      assert.noFileContent('app/main.ts', 'ng2-alfresco-upload');
    });

    it('not fill the app.component.ts with the TasksDemoComponent', function () {
      assert.noFileContent('app/app.component.ts', '/components/tasks/tasks-demo.component');
      assert.noFileContent('app/app.component.ts', 'component: TasksDemoComponent');
    });
  });

  describe('Include all optional component', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp'))
        .withPrompts({
          projectName: 'app-fake',
          description: 'A awesome alfresco APP',
          githubAccount: 'componentCreatorAccount',
          authorName: 'Alfresco Team',
          authorEmail: 'Sonikku.Hejjihoggu@alfresco.com',
          authorUrl: 'http://Hejjihoggu.io',
          keywords: ['app-keyword', 'angular2-keyword'],
          alfrescoServerHost: 'http://servertTest:8080/share',
          activitiServerHost: 'http://servertTest:9999/share',
          features: [
            'userInfo',
            'searchBar',
            'contentPage',
            'bpmTaskPage'
          ],
          license: 'MIT'
        })
        .on('error', function (error) {
          console.log(error);
        })
        .on('end', done);
    });

    it('created and CD into a folder named like the component', function () {
      assert.equal(path.basename(process.cwd()), 'app-fake');
    });

    it('creates files', function () {
      var expected = [
        'favicon-96x96.png',
        'tslint.json',
        'README.md',
        'index.html',
        '.gitignore',
        '.editorconfig',
        'app.config-dev.json',
        'app.config-prod.json',
        'app/theme.scss',
        'app/main.ts',
        'app/material.module.ts',
        'app/components/index.ts',
        'app/app.routes.ts',
        'app/app.component.ts',
        'app/app.component.html',
        'app/components/setting/settings.component.ts',
        'app/components/setting/settings.component.html',
        'app/components/setting/settings.component.scss',
        'app/components/activiti/activiti-demo.component.html',
        'app/components/activiti/activiti-demo.component.scss',
        'app/components/activiti/activiti-demo.component.ts',
        'app/components/activiti/form-node-viewer.component.html',
        'app/components/activiti/form-node-viewer.component.css',
        'app/components/activiti/form-node-viewer.component.ts',
        'app/components/activiti/form-viewer.component.html',
        'app/components/activiti/form-viewer.component.css',
        'app/components/activiti/form-viewer.component.ts',
        'app/components/activiti/apps.view.ts',
        'app/components/activiti/demo-field-validator.ts',
        'app/components/activiti/custom-editor/custom-editor.component.ts',
        'app/components/activiti/activiti-show-diagram.component.css',
        'app/components/activiti/activiti-show-diagram.component.html',
        'app/components/activiti/activiti-show-diagram.component.ts',
        'app/components/activiti/activiti-task-attachments.component.html',
        'app/components/activiti/activiti-task-attachments.component.css',
        'app/components/activiti/activiti-task-attachments.component.ts',
        'app/components/activiti/activiti-process-attachments.component.html',
        'app/components/activiti/activiti-process-attachments.component.css',
        'app/components/activiti/activiti-process-attachments.component.ts',
        'app/services/debug-app-config.service.ts',
        'app/services/in-memory-form.service.ts',
        'app/components/files/files.component.html',
        'app/components/files/files.component.ts',
        'app/components/search/search.component.html',
        'app/components/search/search.component.ts',
        'app/components/search/search.component.scss',
        'app/components/search/search-bar.component.html',
        'app/components/search/search-bar.component.ts',
        'app/components/login/login-demo.component.ts',
        'app/components/login/login-demo.component.html',
        'app/components/home/home.component.html',
        'app/components/home/home.component.scss',
        'app/components/home/home.component.ts',
        'app/components/home/home.component.spec.ts',
        'app/components/about',
        'app/components/about/about.component.ts',
        'app/components/form/demo-form.ts',
        'app/components/form/form-demo.component.css',
        'app/components/form/form-demo.component.html',
        'app/components/form/form-demo.component.ts',
        'app/components/theme-picker/theme-picker.ts',
        'app/components/theme-picker/theme-picker.css',
        'app/components/theme-picker/theme-picker.html',
        'app/vendor.ts',
        'app/polyfills.ts',
        'config/karma-test-shim.js',
        'config/karma.conf.js',
        'config/helpers.js',
        'config/webpack.common.js',
        'config/webpack.dev.js',
        'config/webpack.prod.js',
        'config/webpack.test.js',
        'config/loaders/debug.js',
        'config/loaders/license-check.js',
        'config/loaders/system.js',
        'resources/i18n/en.json',
        'resources/i18n/it.json',
        'tsconfig.json',
        'tsconfig.dev.json',
        'karma.conf.js',
        'webpack.config.js',
        'public/css/muli-font.css',
        'public/fonts/Muli-Italic.ttf',
        'public/fonts/Muli-Light.ttf',
        'public/fonts/Muli-LightItalic.ttf',
        'public/fonts/Muli-Regular.ttf',
        'public/js/Blob.js',
        'public/js/formdata.js',
        'public/js/promisePolyfill.js',
        'public/js/typedarray.js'
      ];
      assert.file(expected);
    });

    it('fill the README with project data', function () {
      assert.fileContent('README.md', 'app-fake');
      assert.fileContent('README.md', 'A awesome alfresco APP');
      assert.fileContent('README.md', 'https://github.com/componentCreatorAccount/app-fake/releases');
    });

    it('fill the app.config-prod with the server selected', function () {
      assert.fileContent('app.config-prod.json', 'http://servertTest:8080/share');
      assert.fileContent('app.config-prod.json', 'http://servertTest:9999/share');
    });

    it('fill the app.component.html with project data', function () {
      assert.fileContent('index.html', 'app-fake');
    });

    it('fill the package.json with project data', function () {
      assert.fileContent('package.json', '"name": "app-fake"');
      assert.fileContent('package.json', '"author": "Alfresco Team <Sonikku.Hejjihoggu@alfresco.com>"');
      assert.fileContent('package.json', '"description": "A awesome alfresco APP"');
      assert.fileContent('package.json', '"url": "https://github.com/componentCreatorAccount/app-fake/issues"');
    });

    it('fill the app.routes.ts with the files component', function () {
      assert.fileContent('app/app.routes.ts', 'FilesComponent');
    });

    it('fill the routes with the ActivitiDemoComponent', function () {
      assert.fileContent('app/app.routes.ts', 'component: ActivitiDemoComponent');
    });

    it('fill the index.html with pdf library', function () {
      assert.fileContent('app/vendor.ts', 'pdfjs-dist');
      assert.fileContent('app/vendor.ts', 'pdf.worker.js');
      assert.fileContent('app/vendor.ts', 'pdf_viewer.js');
    });
  });

  describe('Include only process service component', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp'))
        .withPrompts({
          projectName: 'app-fake',
          description: 'A awesome alfresco APP',
          githubAccount: 'componentCreatorAccount',
          authorName: 'Alfresco Team',
          authorEmail: 'Sonikku.Hejjihoggu@alfresco.com',
          authorUrl: 'http://Hejjihoggu.io',
          keywords: ['app-keyword', 'angular2-keyword'],
          alfrescoServerHost: 'http://servertTest:8080/share',
          activitiServerHost: 'http://servertTest:9999/share',
          features: [
            'bpmTaskPage'
          ],
          license: 'MIT'
        })
        .on('error', function (error) {
          console.log(error);
        })
        .on('end', done);
    });

    it('created and CD into a folder named like the component', function () {
      assert.equal(path.basename(process.cwd()), 'app-fake');
    });

    it('creates files', function () {
      var expected = [
        'favicon-96x96.png',
        'tslint.json',
        'README.md',
        'index.html',
        '.gitignore',
        '.editorconfig',
        'app/main.ts',
        'app/components/index.ts',
        'app/app.routes.ts',
        'app/app.component.ts',
        'app/app.component.html',
        'app/components/setting/settings.component.ts',
        'app/components/setting/settings.component.html',
        'app/components/setting/settings.component.scss',
        'app/components/activiti/activiti-demo.component.html',
        'app/components/activiti/activiti-demo.component.scss',
        'app/components/activiti/activiti-demo.component.ts',
        'app/components/activiti/form-node-viewer.component.html',
        'app/components/activiti/form-node-viewer.component.css',
        'app/components/activiti/form-node-viewer.component.ts',
        'app/components/activiti/form-viewer.component.html',
        'app/components/activiti/form-viewer.component.css',
        'app/components/activiti/form-viewer.component.ts',
        'app/components/activiti/apps.view.ts',
        'app/components/activiti/demo-field-validator.ts',
        'app/components/activiti/custom-editor/custom-editor.component.ts',
        'app/components/home/home.component.html',
        'app/components/home/home.component.scss',
        'app/components/home/home.component.ts',
        'app/components/home/home.component.spec.ts',
        'app/components/about',
        'app/components/about/about.component.ts',
        'app/components/about/about.component.html',
        'app/components/about/about.component.css',
        'app/components/login/login-demo.component.ts',
        'app/components/login/login-demo.component.html',
        'app/components/theme-picker/theme-picker.ts',
        'app/components/theme-picker/theme-picker.css',
        'app/components/theme-picker/theme-picker.html',
        'app/vendor.ts',
        'app/polyfills.ts',
        'config/karma-test-shim.js',
        'config/karma.conf.js',
        'config/helpers.js',
        'config/webpack.common.js',
        'config/webpack.dev.js',
        'config/webpack.prod.js',
        'config/webpack.test.js',
        'config/loaders/debug.js',
        'config/loaders/license-check.js',
        'config/loaders/system.js',
        'karma.conf.js',
        'webpack.config.js',
        'public/css/muli-font.css',
        'public/fonts/Muli-Italic.ttf',
        'public/fonts/Muli-Light.ttf',
        'public/fonts/Muli-LightItalic.ttf',
        'public/fonts/Muli-Regular.ttf',
        'public/js/Blob.js',
        'public/js/formdata.js',
        'public/js/promisePolyfill.js',
        'public/js/typedarray.js'
      ];
      assert.file(expected);

      var notExpected = [
        'app/components/files/files.component.html',
        'app/components/files/files.component.ts'
      ];
      assert.noFile(notExpected);
    });
  });

});


