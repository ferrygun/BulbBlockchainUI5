sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"sap/ui/core/library",
	"sap/ui/unified/ColorPickerPopover",
	"sap/m/MessageToast"
], function (Controller, jQuery, coreLibrary, ColorPickerPopover, MessageToast) {
	"use strict";

	return Controller.extend("BulbBlockchain.BulbBlockchain.controller.View1", {
		onInit: function () {
			// the input id from which the ColorPickerPopover was opened
			this.inputId = "";
		},
		onExit: function () {
			// Destroy popovers if any
			if (this.oColorPickerSimplifiedPopover) {
				this.oColorPickerSimplifiedPopover.destroy();
			}
		},
		/**
		 * Opens a Large <code>ColorPicker</code> in a <code>sap.m.ResponsivePopover</code>
		 * @param oEvent
		 */
		openSimplifiedModeSample: function (oEvent) {
			this.inputId = oEvent.getSource().getId();
			if (!this.oColorPickerSimplifiedPopover) {
				this.oColorPickerSimplifiedPopover = new ColorPickerPopover("oColorPickerSimpplifiedPopover", {
					colorString: "pink",
					displayMode: sap.ui.unified.ColorPickerDisplayMode.Simplified,
					mode: sap.ui.unified.ColorPickerMode.HSL,
					change: this.handleChange.bind(this)
				});
			}
			this.oColorPickerSimplifiedPopover.openBy(oEvent.getSource());
		},

		handleChange: function (oEvent) {
			var oView = this.getView(),
				oInput = oView.byId(this.inputId);

			oInput.setValue(oEvent.getParameter("colorString"));
			oInput.setValueState("None");
			this.inputId = "";
			MessageToast.show("Chosen color string: " + oEvent.getParameter("colorString"));
		},

		handleInputChange: function (oEvent) {
			var oInput = oEvent.getSource(),
				bValid = coreLibrary.CSSColor.isValid(oEvent.getParameter("value")),
				sState = bValid ? "None" : "Error";

			oInput.setValueState(sState);
		},

		onButtonPress: function(oEvent) {
			var light_status = this.getView().byId("onofflight").getSelectedIndex();
			light_status = Boolean(Number(light_status));

			var RGB = this.getView().byId("colorS").getValue();
			if(RGB !== "") {
				RGB = RGB.substring(4, RGB.length-1);
			}
			var data = '{"light_status": "' + light_status + '", "RGB": "' + RGB + '"}';
			console.log(data);


			jQuery.ajax({
				url: "https://hyperledger-fabric.cfapps.eu10.hana.ondemand.com/api/v1/chaincodes/4f0155ae-ba78-44df-93fa-56b705d7de78-com-sap-icn-blockchain-example-helloWorld-events/51/1",
				cache: false,
				type: "POST",
				headers: {
			        'Authorization':'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vcDUyODAzNHRyaWFsLmF1dGhlbnRpY2F0aW9uLmV1MTAuaGFuYS5vbmRlbWFuZC5jb20vdG9rZW5fa2V5cyIsImtpZCI6ImtleS1pZC0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJhMDFhMjgzYWY2YzY0Nzk4OTdiYzJhZWNkNDdhMzUzMiIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJ6ZG4iOiJwNTI4MDM0dHJpYWwiLCJzZXJ2aWNlaW5zdGFuY2VpZCI6ImJiYzcxNzZhLTVkOWItNDlmOC04Njg0LWExYjQ5NTExM2JjMiJ9LCJzdWIiOiJzYi1iYmM3MTc2YS01ZDliLTQ5ZjgtODY4NC1hMWI0OTUxMTNiYzIhYjEwMjYyfG5hLTQyMGFkZmM5LWY5NmUtNDA5MC1hNjUwLTAzODY5ODhiNjdlMCFiMTgzNiIsImF1dGhvcml0aWVzIjpbInVhYS5yZXNvdXJjZSJdLCJzY29wZSI6WyJ1YWEucmVzb3VyY2UiXSwiY2xpZW50X2lkIjoic2ItYmJjNzE3NmEtNWQ5Yi00OWY4LTg2ODQtYTFiNDk1MTEzYmMyIWIxMDI2MnxuYS00MjBhZGZjOS1mOTZlLTQwOTAtYTY1MC0wMzg2OTg4YjY3ZTAhYjE4MzYiLCJjaWQiOiJzYi1iYmM3MTc2YS01ZDliLTQ5ZjgtODY4NC1hMWI0OTUxMTNiYzIhYjEwMjYyfG5hLTQyMGFkZmM5LWY5NmUtNDA5MC1hNjUwLTAzODY5ODhiNjdlMCFiMTgzNiIsImF6cCI6InNiLWJiYzcxNzZhLTVkOWItNDlmOC04Njg0LWExYjQ5NTExM2JjMiFiMTAyNjJ8bmEtNDIwYWRmYzktZjk2ZS00MDkwLWE2NTAtMDM4Njk4OGI2N2UwIWIxODM2IiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInJldl9zaWciOiJjNzJmMDkwOCIsImlhdCI6MTU1MzU5Mjc5NiwiZXhwIjoxNTUzNjM1OTk2LCJpc3MiOiJodHRwOi8vcDUyODAzNHRyaWFsLmxvY2FsaG9zdDo4MDgwL3VhYS9vYXV0aC90b2tlbiIsInppZCI6ImQ4MGY5YTYzLWFjZmItNDhhMC04ODkxLWI0MTA5YTEwMzkxMiIsImF1ZCI6WyJzYi1iYmM3MTc2YS01ZDliLTQ5ZjgtODY4NC1hMWI0OTUxMTNiYzIhYjEwMjYyfG5hLTQyMGFkZmM5LWY5NmUtNDA5MC1hNjUwLTAzODY5ODhiNjdlMCFiMTgzNiIsInVhYSJdfQ.dgv0pRJWjXZ2hN2E8aw6sEiKWPk8Zy8zMN1M6NnzwsTd8zgqWLu06mjBl9bEmH-YjLaYJwo63ksuDCKaj-hUwcAUpDUFJJIKA5lBaD3-CCwAG-LamQcUcfASX5CKDiOs21sPzPAlU2H3ENkU5t03US9XQwf6Hh-iKH7KwesYewEQTKGQFTAWr8I8GPea-Ax5kJebBkzXSM4lIb7xQtY3DjO1LDZiGYVBopxfqBTnD550BKLK1r_MzpkC3olTX5RbrpsUrW8SaeVq-4SAw02uIwXZ_h8hOktrB6LUrpsU15mQ5SKWYcrDGn-b50fL3iwdGE-_cKNJlPU_Kmm8a-rcIOB7aLufXwjm2uzn5gXnP4YAMFmgCfVDQq5iDJxL7vPgH6hiHajGKVdksh3damrU9_RInFKHmdTe2fOOcsQLMiId3JZoFcyWjvkj4YYHTktcoGHQVyCCHzUhh5LYhxKe-MWaV2rX3Fcun1agTc1tT5jvkUtWOa9_-eEORTxTABVHuYTiCInK8iME5TnU8k3BmRYtklTV_CPkOdiTI4UbAkiABIelMQFwRjdt6FPe4BCZOHA_Vv8M4-EdsUx709dmroBmWlRN8UZpiXhsLY0eSeDu4GbU4x58SJBLxCWEPEdeuFG6goWNHRW5szUQ_wb8vosNc018Ae2F45PQ6VuOuJM',
			        'Content-Type':'application/json'
			    },
				data: data,
				async: true,
				success: function(sData) {
					console.log('[POST] /discover-dialog', sData);

					
				},
				error: function(sError) {					
					console.log("Something error!");      
				}
			});
		}
	});
});