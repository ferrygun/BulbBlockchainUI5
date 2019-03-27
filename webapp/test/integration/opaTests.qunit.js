/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"BulbBlockchain/BulbBlockchain/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});