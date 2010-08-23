var Web20Alert = function(argName) {

	var box = new Array();
	$extend(box, SqueezeBox);

	var name = argName;

	if (!Web20Alert.instance) {
		Web20Alert.instance = new Array();
	}
	if (!Web20Alert.count >= 0) {
		Web20Alert.count = 0;
	}
	if (!name || name == '') {
		name = Web20Alert.count++;
	}
	Web20Alert.instance[name] = this;

	var status = {
		open : false
	};
	var params = {
		zIndex : 60000,
		handler : 'string',
		size : {
			x : 400,
			y : 120
		},
		onShow : function() {
			status.open = true;
		},
		divMainStyle : "text-align: center; width: 100%; height: 100%;",
		titleStyle : "font-size: 110%; text-align: center; width: 100%; height: 70%;"

	};
	Web20Alert.prototype.show = function(argHtml, options) {
		params = $merge(params, options);
		box.initialize(params);
		html = "<div id='Web20AlertDivMain' style='" + params.divMainStyle
				+ "'>";
		html += "<div id='divTitle' style'" + params.titleStyle
				+ "'><spam id='title' >" + argHtml + "</spam></div>";
		html += "<div id='divForm' style='" + params.divFormStyle + "'><form>";
		html += "<input id='botaoFechar' onClick='Web20Alert.instance[" + '"'
				+ name + '"' + "].close()' type='button' value='Fechar' />";
		html += "<form></div>";
		html += "</div>";
		box.setContent('string', html);
		status.open = true;
	};
	Web20Alert.prototype.close = function() {
		status.open = false;
		box.close();
		delete Web20Alert.instance[name];
	};
};

var Web20Confirm = function(argName) {

	var box = new Array();
	$extend(box, SqueezeBox);

	var name = argName;

	if (!Web20Confirm.instance) {
		Web20Confirm.instance = new Array();
	}
	if (!Web20Confirm.count >= 0) {
		Web20Confirm.count = 0;
	}
	if (!name || name == '') {
		name = Web20Confirm.count++;
	}
	Web20Confirm.instance[name] = this;

	var status = {
		open : false
	};
	var params = {
		zIndex : 60000,
		handler : 'string',
		size : {
			x : 400,
			y : 120
		},
		onShow : function() {
			status.open = true;
		},
		divMainStyle : "font-size: 110%; text-align: center; width: 100%; height: 100%;",
		titleStyle : "font-size: 110%; text-align: center; width: 100%; height: 70%;",
		divFormStyle : "font-size: 100%; text-align: center; width: 100%; height: 30%;"
	};

	Web20Confirm.prototype.show = function(argHtml, options) {
		params = $merge(params, options);
		box.initialize(params);

		var html = "";
		html += "<div id='Web20ConfirmDivMain' style='" + params.divMainStyle
				+ "'>";
		html += "<div id='divTitle' style='" + params.titleStyle
				+ "'><spam id='title' >" + argHtml + "</spam></div>";
		html += "<div id='divForm' style='" + params.divFormStyle + "'><form>";
		html += "<input id='buttonConfirm' onClick='Web20Confirm.instance["
				+ '"' + name + '"'
				+ "].close(this)' type='button' value='Confirma' style="
				+ params.buttonConfirmStyle + "/>";
		html += "<input id='buttonCancel' onClick='Web20Confirm.instance["
				+ '"' + name + '"'
				+ "].close(this)' type='button' value='Cancela' style="
				+ params.buttonCancelStyle + "/>";
		html += "<form></div>";
		html += "</div>";
		box.setContent('string', html);
		status.open = true;
	};
	Web20Confirm.prototype.close = function(elm) {
		if (elm.id == 'buttonConfirm') {
			this.result = true;
		} else if (elm.id == 'buttonCancel') {
			this.result = false;
		}

		status.open = false;
		box.close();

		delete Web20Confirm.instance[name];
	};
	Web20Confirm.prototype.result = false;
}