/* ========================================================================
 * StorageAPI: storage_test.js v0.0.1
 * Author: Mike Grabowski (@grabbou)
 * Created at: 16/08/2014
 * ========================================================================
 */

'use strict';

/* jshint expr:true */

var expect = require('chai').expect,
	stub = require('sinon').stub,
	spy = require('sinon').spy;

describe('Storage', function () {

	var Storage = require('../lib');

	beforeEach(function () {
		Storage.init({});
		Storage._cache = {};
	});

	describe('#init', function () {

		it('it must set up correctly variables', function () {
			Storage.init('config');
			expect(Storage._config).to.equal('config');
		});

		it('should return this to allow method chaining', function () {
			expect(Storage.init('config')).to.equal(Storage);
		});

	});

	describe('#add', function () {

		it('it must set up correctly variables', function () {
			Storage.add('amazon', 'config');
			expect(Storage._config.amazon).to.equal('config');
		});

		it('should return this to allow method chaining', function () {
			expect(Storage.add('amazon', '')).to.equal(Storage);
		});

	});

	describe('#get', function () {

		it('should return an error when no instance specified', function () {
			Storage.get(function (err) {
				expect(err).to.match(/forgot to specify instance/);
			});
		});

		it('should return an error when no config specified for an instance', function () {
			Storage.get('amazon', function (err) {
				expect(err).to.match(/you forgot to declare it/);
			});
		});

		it('should return an error when no provider specified for an instance', function () {
			Storage.init({
				amazon: {}
			});
			Storage.get('amazon', function (err) {
				expect(err).to.match(/is not specified/);
			});
		});

	});

	describe('#_cache', function () {

		it('should cache module instance instead of recreating', function () {
			var constructor = spy(Storage.Providers, 'AmazonS3');
			stub(Storage.Providers.AmazonS3.prototype, '_init').callsArgWith(0, null);

			Storage.init({
				amazon: {
					provider: Storage.Providers.AmazonS3,
					key: '',
					keyId: '',
					container: ''
				}
			});

			Storage.get('amazon', function () {});
			Storage.get('amazon', function () {});

			expect(constructor.calledOnce).to.be.true;
		});

	});

});