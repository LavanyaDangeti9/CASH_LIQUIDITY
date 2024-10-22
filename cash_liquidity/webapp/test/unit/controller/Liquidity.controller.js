/*global QUnit*/

sap.ui.define([
	"cash_liquidity/controller/Liquidity.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Liquidity Controller");

	QUnit.test("I should test the Liquidity controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
