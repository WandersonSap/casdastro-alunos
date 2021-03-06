sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"
], function (Controller, Filter, FilterOperator, JSONModel) {
	"use strict";

	return Controller.extend("ovly.fiori_28.cadastro_de_alunos.controller.Lista", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ovly.fiori_28.cadastro_de_alunos.view.Lista
		 */
		onInit: function () {

		},

		onSearch: function (oEvent) {
			// add filter for search

			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("FirstName", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			// update list binding
			var oList = this.byId("list");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},

		onAdd: function (oEvent) {
			var oFormModel = this.getView().getModel("Form"); // JSONModel
			var titulo = this.getView().getModel("i18n").getResourceBundle().getText("PageCadastro");
			//limpar o modelo auxiliar
			oFormModel.setProperty("/isUpdate", false);
			oFormModel.setProperty("/titulo", titulo );
			oFormModel.setProperty("/id", "");
			oFormModel.setProperty("/nome", "");
			oFormModel.setProperty("/sobrenome", "");
			oFormModel.setProperty("/username", "");
			oFormModel.setProperty("/dtnasc", "");
			this.getOwnerComponent().getRouter().navTo("cadastrar");
		},

		onModify: function (oEvent) {
			debugger;
			// item que foi clicado
			var oItem = oEvent.getSource();
			
			// Contexto do item clicado (armazena os dados do back end)
			var oAlunoContext = oItem.getBindingContext();
			
			var oFormModel = this.getView().getModel("Form"); // JSONModel
		    var titulo = this.getView().getModel("i18n").getResourceBundle().getText("PageAtualizar"); 
			oFormModel.setProperty("/isUpdate", true);
			oFormModel.setProperty("/titulo", titulo );
			oFormModel.setProperty("/id", oAlunoContext.getProperty("Id"));
			oFormModel.setProperty("/nome", oAlunoContext.getProperty("FirstName"));
			oFormModel.setProperty("/sobrenome", oAlunoContext.getProperty("LastName"));
			oFormModel.setProperty("/username", oAlunoContext.getProperty("UserName"));
			oFormModel.setProperty("/dtnasc", oAlunoContext.getProperty("BirthDate"));
			this.getOwnerComponent().getRouter().navTo("cadastrar");
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