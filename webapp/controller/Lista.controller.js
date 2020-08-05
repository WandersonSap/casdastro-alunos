sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function (Controller, Filter, FilterOperator) {
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

		onAdd: function () {
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