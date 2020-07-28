sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ovly.fiori_28.cadastro_de_alunos.controller.Lista", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ovly.fiori_28.cadastro_de_alunos.view.Lista
		 */
		onInit: function () {

		},

		onSearch: function (oControlEvent) {
			var oSearchField = oControlEvent.getSource();
			var sValue = oSearchField.getValue();
			sap.m.MessageToast.show(sValue);
		},

		onAdd: function () {
			sap.m.MessageToast.show("apertou");
		},

		onItemPress: function (oEvent) {
			var oItem = oEvent.getParameters().listItem;
			var oContext = oItem.getBindingContext();
			var oAluno = oContext.getObject();
			var sId = oAluno.Id;
			this.getOwnerComponent().getRouter().navTo("exibir", {
				codigo: sId
			});
		},

	});

});