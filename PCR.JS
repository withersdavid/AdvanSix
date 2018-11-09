DateValidationOnChange = function (executionContext){
debugger;
	var formContext = executionContext.getFormContext();

	var FromDate = formContext.getAttribute("po_validfrom").getValue();
	var ToDate = formContext.getAttribute("po_validto").getValue();

	if (formContext != null && FromDate != null & ToDate != null){
		var diff =  Math.floor(( Date.parse(ToDate) - Date.parse(FromDate) ) / 86400000); 
		if(diff >365 ||diff < 0){
			formContext.ui.setFormNotification("The Valid From/To dates cannot exceed 1 year. Please update the field(s) and try again","ERROR", "PCR_Date_Notification");
		}
		else formContext.ui.clearFormNotification("PCR_Date_Notification");
	}
	else formContext.ui.clearFormNotification("PCR_Date_Notification");
};

DateValidationOnSave = function (executionContext){
debugger;
	var formContext = executionContext.getFormContext();
	var saveEvent = executionContext.getEventArgs();

	var FromDate = formContext.getAttribute("po_validfrom").getValue();
	var ToDate = formContext.getAttribute("po_validto").getValue();

	if (formContext != null && FromDate != null & ToDate != null){
		var diff =  Math.floor(( Date.parse(ToDate) - Date.parse(FromDate) ) / 86400000); 
		if(diff >365 ||diff < 0){
			saveEvent.preventDefault();
		}

	}
};