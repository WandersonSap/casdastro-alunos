sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/Core"
], function (Controller, MessageToast, Core) {
	"use strict";

	return Controller.extend("ovly.fiori_28.cadastro_de_alunos.controller.Inserir", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ovly.fiori_28.cadastro_de_alunos.view.Inserir
		 */
		onInit: function () {

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
			var oFormModel = this.getView().getModel("Form"); // JSONModel
			//limpando as informações do Modelo JSON auxiliar
			oFormModel.setProperty("/nome", "");
			oFormModel.setProperty("/sobrenome", "");
			oFormModel.setProperty("/username", "");
			oFormModel.setProperty("/dtnasc", "");
		},

		onSave: function (oEvent) {
			var oFormModel = this.getView().getModel("Form"); // JSONModel

			var oData = {
				FirstName: oFormModel.getProperty("/nome"),
				LastName: oFormModel.getProperty("/sobrenome"),
				UserName: oFormModel.getProperty("/username"),
				BirthDate: oFormModel.getProperty("/dtnasc")
			};
			debugger;
			var aCompetencias = [];
			var oMultiComboBox = this.byId("competencias");
			var aItensSelecionados = oMultiComboBox.getSelectedItems();
			for (var i = 0; i < aItensSelecionados.length; i++) {
				var oItem = aItensSelecionados[i];
				var oItemContext = oItem.getBindingContext();
				aCompetencias.push({
					Id: oItemContext.getProperty("Id")
				});
			}
			
			oData.ToKnownSkills = aCompetencias;
			
			var oDataModel = this.getView().getModel();
			oDataModel.create("/Students", oData, {
				success: this._onInsertSuccess.bind(this),
				error: this._onInsertFail.bind(this)
			});
		},

		onPressAtualizar: function (oEvent) {
			debugger;
			var oFormModel = this.getView().getModel("Form"); // JSONModel
			// Dados que serão enviados ao back end
			var oAluno = {
				FirstName: oFormModel.getProperty("/nome"),
				LastName: oFormModel.getProperty("/sobrenome"),
				UserName: oFormModel.getProperty("/username"),
				BirthDate: oFormModel.getProperty("/dtnasc")
			};

			// callback de sucesso
			function onSuccess() {
				var sMensagem = "Aluno atualizado com sucesso";
				MessageToast.show(sMensagem);
			}

			// callback de erro
			function onError(oErro) {
				var sMensagem = JSON.parse(oErro.responseText).error.message.value;
				MessageToast.show(sMensagem);
			}
			// parametro de configuracao da chamada
			var mParameters = {
				success: onSuccess,
				error: onError
			};

			// @type sap.ui.model.odata.v2.ODataModel
			var oDataModel = this.getView().getModel();

			// URL para o update /Students('1234')
			var sPath = oDataModel.createKey("Students", {
				Id: oFormModel.getProperty("/id")
			});

			// chama o back end
			oDataModel.update("/" + sPath, oAluno, mParameters);
		},

		onBack: function (oEvent) {
			this.getOwnerComponent().getRouter().navTo("listagem");
		}

	});

});