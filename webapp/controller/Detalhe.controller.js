sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast"], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("ovly.fiori_28.cadastro_de_alunos.controller.Detalhe", {

		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			var oRotaExibir = oRouter.getRoute("exibir");
			oRotaExibir.attachPatternMatched(this.onPatternMatched, this);
		},

		onPatternMatched: function (oEvent) {
			//sempre que um novo estudante for selecionado
			var oArguments = oEvent.getParameters().arguments;
			var oDataModel = this.getView().getModel();
			var sPath = oDataModel.createKey("Students", {
				Id: oArguments.codigo
			});
			this.getView().bindElement("/" + sPath);

		},

		toUpper: function (s) {
			if (s) {
				return s.toUpperCase();
			}
		},

		onDelete: function (oEvent) {
			//buscar o id que foi seleccionado	
			var sPath = oEvent.getSource().getBindingContext().getPath();
			var oDataModel = this.getView().getModel();
			oDataModel.remove(sPath, {
				context: sPath,
				success: this._onDelSuccess.bind(this),
				error: this._onDelFail.bind(this)
			});
		},

		onBack: function (oEvent) {
			this.getOwnerComponent().getRouter().navTo("listagem");
		},

		_onDelSuccess: function (oData, response) {
			MessageToast.show("Aluno deletado como Sucesso", {
				onclose: this.onBack(),
				animationDuration: 10000
			});

		},

		_onDelFail: function () {
			MessageToast.show("Aluno não foi deletado");
		}
	});
});