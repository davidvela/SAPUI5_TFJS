sap.ui.define([
	"sap/ui/core/mvc/Controller", 
	'sap/m/MessageToast'
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("test.tensorflowjs.controller.View1", {
		onInit: function () {
			this.getView().byId("idLabel").setText("Predictions \n new line \t\t tab");
		}, 
		
		
		handleUploadComplete: function(oEvent) {
			// set image 
				var f = oEvent.oSource.oFileUpload.files[0]; 
				var path = URL.createObjectURL(f);   
				//var img = sap.ui.getCore().byId("img");
				var img = this.getView().byId("iImageTicket");
				img.setSrc(path);  
			
			// handle response
			var sResponse = oEvent.getParameter("response");
			if (sResponse) {
				var sMsg = "";
				var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
				if (m[1] == "200") {
					sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Success)";
					oEvent.getSource().setValue("");
				} else {
					sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Error)";
				}

				MessageToast.show(sMsg);
			}
		},

		handleUploadPress: function(oEvent) {
			
			var oFileUploader = this.byId("fileUploader");
			if (!oFileUploader.getValue()) {
				MessageToast.show("Choose a file first");
				return;
			}
			// this.byId("iImageTicket").setSrc("/sap/opu/odata/sap/Z...._SRV/TicketPhotoSet('" + vTicket + "')/$value?" + new Date().getTime());
				
			// this.byId("iImageTicket").setSrc("../assets/cat.jpg"); 
			// oFileUploader.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "slug", value: oFileUploader.getValue() }));
			oFileUploader.upload();
		}, 
		handlePredictPress: function(oEvent){
			var label = this.getView().byId("idLabel");

			MessageToast.show("Predict");
			//var img = this.byId("iImageTicket").getSrc();
			const img = document.getElementById("container-tensorflowjs---View1--iImageTicket");
			mobilenet.load().then(model => {
			    model.classify(img).then(predictions => {
    				console.log('Predictions: ');
    				console.log(predictions);
			    	var txt = "";
			    	for(var i in predictions){
			    		txt = txt + "className;" + predictions[i].className +
			    		"____________probability:  " + predictions[i].probability + "\n";
			    	}
    				//document.getElementById("p1").innerHTML = txt; 
    				label.setText(txt);
    			});
  });

		}
		
	});
});