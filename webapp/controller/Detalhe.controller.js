sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("ovly.fiori_28.cadastro_de_alunos.controller.Detalhe", {

		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			var oRotaExibir = oRouter.getRoute("exibir");
			oRotaExibir.attachPatternMatched(this.onPatternMatched, this);

		},
		
		toUpper: function (s){
			if(s){
				return s.toUpperCase();
			}
		},
		
		onPatternMatched: function (oEvent) {
			var oArguments = oEvent.getParameters().arguments;
			var oDataModel = this.getView().getModel();
			var sPath = oDataModel.createKey("Students", {
				Id: oArguments.codigo
			});
			this.getView().bindElement("/" + sPath);

		},

		onBack: function (oEvent) {
			this.getOwnerComponent().getRouter().navTo("listagem");
		}
	});
});