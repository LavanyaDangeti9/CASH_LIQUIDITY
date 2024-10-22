
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
 
    return Controller.extend("cashliquidity.controller.Liquidity", {
        onInit: function () {
            var oModel = new JSONModel({
                years: [
                    { year: 1 },
                    { year: 2 },
                    { year: 3 },
                    { year: 5 }
                ],
                forecastData: []
            });
            this.getView().setModel(oModel);
        },
 
        onFilter: function () {
            var that=this;
            var selectedYear = that.getView().byId("forecastyears").getSelectedItem().getText();
            if (!selectedYear) {
                sap.m.MessageToast.show("Please select a number of forecast years.");
                return;
            }
 
            $.ajax({
                url: "model/data.json",
                dataType: "json",
                success: function (data) {
                    
                    var forecastData = [];
                    var currentYear = new Date().getFullYear();
                    var selectedYears = parseInt(selectedYear, 10);
 
                    for (var i = 0; i < selectedYears; i++) {
                        for (var j = 1; j <= 4; j++) {
                            forecastData.push({
                                Year: currentYear + i,
                                quarter: "Q" + j,
                                CM_Account1: data[i].CM1[j - 1],
                                CM_Account2: data[i].CM2[j - 1],
                                CM_Account3: data[i].CM3[j - 1],
                                CM_Account4: data[i].CM4[j - 1],
                                CM_Account5: data[i].CM5[j - 1]
                            });
                        }
                    }
 
                    var oModel = new sap.ui.model.json.JSONModel();
                    oModel.setData(forecastData);

                    that.getView().byId("forecastTable").setModel(oModel,"forecastData");
                },
                error: function () {
                    sap.m.MessageToast.show("Failed to load forecast data.");
                }
            });
        }
    });
});
