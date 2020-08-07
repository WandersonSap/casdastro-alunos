sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ovly/fiori_28/cadastro_de_alunos/model/models",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("ovly.fiori_28.cadastro_de_alunos.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// criando modelo auxiliar global
			this._oViewModel = new JSONModel({
				isUpdate: true,
				titulo: "",
				id: "",
				nome: "",
				sobrenome: "",
				username: "",
				dtnasc: ""
			});
		  this.setModel(this._oViewModel, "Form");			
		}
	});
});