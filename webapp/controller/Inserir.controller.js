sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("ovly.fiori_28.cadastro_de_alunos.controller.Inserir", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ovly.fiori_28.cadastro_de_alunos.view.Inserir
		 */
		onInit: function () {
			this.getView().getModel("Form");
		},

		_onInsertSuccess: function (oData, response) {
			MessageToast.show("Aluno Inserido como Sucesso", {
				onclose: this.onBack(),
				animationDuration: 10000
			});

		},

		_onInsertFail: function () {
			MessageToast.show("Aluno não foi inserido !!!!");
		},

		OnCancel: function (oEvent) {
			this.getView().byId("FirstName").setValue("");
			this.getView().byId("LastName").setValue("");
			this.getView().byId("UserName").setValue("");
			this.getView().byId("DtNasc").setValue("");
		},

		onSave: function (oEvent) {
			var sFisrtName = this.getView().byId("FirstName").getValue();
			var sLastName = this.getView().byId("LastName").getValue();
			var sUserName = this.getView().byId("UserName").getValue();
			var sDtNasc = new Date(this.getView().byId("DtNasc").getValue());

			var oData = {
				FirstName: sFisrtName,
				LastName: sLastName,
				UserName: sUserName,
				BirthDate: sDtNasc
			};

			var oDataModel = this.getView().getModel();
			oDataModel.create("/Students", oData, {
				success: this._onInsertSuccess.bind(this),
				error: this._onInsertFail.bind(this)
			});
		},

		onBack: function (oEvent) {
			this.getOwnerComponent().getRouter().navTo("listagem");
		}

	});

});