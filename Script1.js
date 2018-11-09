DateValidationOnChange = function (executionContext){

	var formContext = executionContext.getFormContext();

	var FromDate = formContext.getAttribute("po_validfrom").getValue();
	var ToDate = formContext.getAttribute("po_validto").getValue();

	if (formContext != null && FromDate != null && ToDate != null){
		var diff =  Math.floor(( Date.parse(ToDate) - Date.parse(FromDate) ) / 86400000); 
		if(diff >365 || diff < 0){
			formContext.ui.setFormNotification("The Valid From/To dates cannot exceed 1 year. Please update the field(s) and try again","ERROR", "PCR_Date_Notification");
		}
		else {
			formContext.ui.clearFormNotification("PCR_Date_Notification");
			}
	}
	else {
		formContext.ui.clearFormNotification("PCR_Date_Notification");
	}
};

DateValidationOnSave = function (executionContext){

	var formContext = executionContext.getFormContext();
	var saveEvent = executionContext.getEventArgs();

	var FromDate = formContext.getAttribute("po_validfrom").getValue();
	var ToDate = formContext.getAttribute("po_validto").getValue();

	if (formContext != null && FromDate != null && ToDate != null) {
		var diff =  Math.floor(( Date.parse(ToDate) - Date.parse(FromDate) ) / 86400000); 
		if(diff >365 ||diff < 0){
			saveEvent.preventDefault();
		}

	}
	
};

 SoldTo = function (executionContext){

	 var formContext = executionContext.getFormContext();
	 var SoldToDCId = formContext.getAttribute("po_soldtodcid").getValue();
	 if(SoldToDCId != null){
	 
	 var DCRId = SoldToDCId[0].id;
		Xrm.WebApi.online.retrieveRecord("po_distributionchannelrelationship", DCRId, "?$expand=po_AccountId($select=accountid,accountnumber,name),po_DistributionChannelId($select=po_distributionchannelid,po_name)").then(
			function success(result) {
			debugger;
				var po_distributionchannelrelationshipid = result["po_distributionchannelrelationshipid"];
				if (result.hasOwnProperty("po_AccountId")) {
					var po_AccountId_accountid = result["po_AccountId"]["accountid"];
					var po_AccountId_accountnumber = result["po_AccountId"]["accountnumber"];
					var po_AccountId_accountname = result["po_AccountId"]["name"];
					formContext.getAttribute("po_soldtonumber").setValue(po_AccountId_accountnumber);
					var lookupValue = new Array();
						lookupValue[0] = new Object();
						lookupValue[0].id = po_AccountId_accountid;
						lookupValue[0].name = po_AccountId_accountname;
						lookupValue[0].entityType = "account";
					formContext.getAttribute("po_soldtoaccountid").setValue(lookupValue);
					//dcnumber
					var po_DistributionChannelId_po_distributionchannelid = result["po_DistributionChannelId"]["po_distributionchannelid"];
					var po_DistributionChannelId_po_name = result["po_DistributionChannelId"]["po_name"];
           			var lookupValue2 = new Array();
						lookupValue2[0] = new Object();
						lookupValue2[0].id = po_DistributionChannelId_po_distributionchannelid;
						lookupValue2[0].name = po_DistributionChannelId_po_name;
						lookupValue2[0].entityType = "po_distributionchannel";
					formContext.getAttribute("po_distributionchannelid").setValue(lookupValue2);
				}
			},
			function(error) {
				Xrm.Utility.alertDialog(error.message);
			}
		)
	
	}
	else{
		formContext.getAttribute("po_distributionchannelid").setValue("");
		formContext.getAttribute("po_soldtoaccountid").setValue("");
		formContext.getAttribute("po_soldtonumber").setValue("");
	}
};

ShipTo = function (executionContext){
	 debugger;
	 var formContext = executionContext.getFormContext();
	 var ShipToDCId = formContext.getAttribute("po_shiptodcid").getValue();
	 if(ShipToDCId != null){
	 
	 var DCRId = ShipToDCId[0].id;
		Xrm.WebApi.online.retrieveRecord("po_distributionchannelrelationship", DCRId, "?$expand=po_AccountId($select=accountid,accountnumber,name),po_DistributionChannelId($select=po_distributionchannelid,po_name)").then(
			function success(result) {
			debugger;
				var po_distributionchannelrelationshipid = result["po_distributionchannelrelationshipid"];
				if (result.hasOwnProperty("po_AccountId")) {
					var po_AccountId_accountid = result["po_AccountId"]["accountid"];
					var po_AccountId_accountnumber = result["po_AccountId"]["accountnumber"];
					var po_AccountId_accountname = result["po_AccountId"]["name"];
					formContext.getAttribute("po_shiptonumber").setValue(po_AccountId_accountnumber);
					var lookupValue = new Array();
						lookupValue[0] = new Object();
						lookupValue[0].id = po_AccountId_accountid;
						lookupValue[0].name = po_AccountId_accountname;
						lookupValue[0].entityType = "account";
					formContext.getAttribute("po_shiptoaccountid").setValue(lookupValue);
					//dcnumber
					var po_DistributionChannelId_po_distributionchannelid = result["po_DistributionChannelId"]["po_distributionchannelid"];
					var po_DistributionChannelId_po_name = result["po_DistributionChannelId"]["po_name"];
           			var lookupValue2 = new Array();
						lookupValue2[0] = new Object();
						lookupValue2[0].id = po_DistributionChannelId_po_distributionchannelid;
						lookupValue2[0].name = po_DistributionChannelId_po_name;
						lookupValue2[0].entityType = "po_distributionchannel";
					formContext.getAttribute("po_distributionchannelid").setValue(lookupValue2);
				}
			},
			function(error) {
				Xrm.Utility.alertDialog(error.message);
			}
		)
	
	}
	else{
		var SoldTOID = formContext.getAttribute("po_soldtodcid").getValue()
		if (!SoldTOID || SoldTOID.length ==0){
			formContext.getAttribute("po_distributionchannelid").setValue("");
		}
		
		formContext.getAttribute("po_shiptoaccountid").setValue("");
		formContext.getAttribute("po_shiptonumber").setValue("");
	}
};

PricingPartner = function (executionContext){
	 debugger;
	 var formContext = executionContext.getFormContext();
	 var PricingPartnerDCId = formContext.getAttribute("po_pricingpartnerdcid").getValue();
	 if(PricingPartnerDCId != null){
	 
	 var DCRId = PricingPartnerDCId[0].id;
		Xrm.WebApi.online.retrieveRecord("po_distributionchannelrelationship", DCRId, "?$expand=po_AccountId($select=accountid,accountnumber,name),po_DistributionChannelId($select=po_distributionchannelid,po_name)").then(
			function success(result) {
			debugger;
				var po_distributionchannelrelationshipid = result["po_distributionchannelrelationshipid"];
				if (result.hasOwnProperty("po_AccountId")) {
					var po_AccountId_accountid = result["po_AccountId"]["accountid"];
					var po_AccountId_accountnumber = result["po_AccountId"]["accountnumber"];
					var po_AccountId_accountname = result["po_AccountId"]["name"];
					formContext.getAttribute("po_pricingpartnernumber").setValue(po_AccountId_accountnumber);
					var lookupValue = new Array();
						lookupValue[0] = new Object();
						lookupValue[0].id = po_AccountId_accountid;
						lookupValue[0].name = po_AccountId_accountname;
						lookupValue[0].entityType = "account";
					formContext.getAttribute("po_pricingpartneraccountid").setValue(lookupValue);
					//dcnumber
					var po_DistributionChannelId_po_distributionchannelid = result["po_DistributionChannelId"]["po_distributionchannelid"];
					var po_DistributionChannelId_po_name = result["po_DistributionChannelId"]["po_name"];
           			var lookupValue2 = new Array();
						lookupValue2[0] = new Object();
						lookupValue2[0].id = po_DistributionChannelId_po_distributionchannelid;
						lookupValue2[0].name = po_DistributionChannelId_po_name;
						lookupValue2[0].entityType = "po_distributionchannel";
					formContext.getAttribute("po_distributionchannelid").setValue(lookupValue2);
				}
			},
			function(error) {
				Xrm.Utility.alertDialog(error.message);
			}
		)
	
	}
	else{
		formContext.getAttribute("po_distributionchannelid").setValue("");
		formContext.getAttribute("po_pricingpartneraccountid").setValue("");
		formContext.getAttribute("po_pricingpartnernumber").setValue("");
	}
};

AttachmentShowHide = function (executionContext){
debugger;
	var formContext = executionContext.getFormContext();
	var AttachmentField = formContext.getAttribute("po_sapkeycombination").getValue();
	if (AttachmentField != null && AttachmentField == "936710015"){
		var _tab = formContext.ui.tabs.get("productinformation")
		_tab.setVisible(false);
		formContext.ui.setFormNotification("Cannot submit request without attaching a file in the Notes section","INFO", "AtachmentNotification");
		var _AttachmentDirty = formContext.data.entity.getIsDirty();
		if(_AttachmentDirty == true){
			formContext.data.entity.save();	
		}
	}
	else {
		var _tab = formContext.ui.tabs.get("productinformation")
		_tab.setVisible(true);
		formContext.ui.clearFormNotification("AtachmentNotification");
	}
};