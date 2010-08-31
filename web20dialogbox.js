/**
 * This work is initialy used on CSAT - Centro de Apoio e Solidariedade ao
 * Trabalhador de Minas Gerais/Brazil and is based on SqueezeBox create by
 * Harald Kirschner <mail [at] digitarald.de> version 1.0Rc and Mootools Version
 * 1.12.
 * 
 * This work is made with in mind compatibilized with Joomla 1.5. For this I use
 * a old version of Squeezebox and Mootools
 * 
 * In the future I want compatibilize the code with other dialog box frameworks
 * like SexyAlertBox 1.2 with Mootools, and more in future use a own DialogBox
 * code too, where you can change with only parameter with help from
 * Web20DialogboxHelper object
 */
var Web20DialogsBoxVersion = {
	version : 0.1,
	build : 000022,
	authors : {
		creator : {
			name : "Carlos Delfino",
			email : "consultoria@carlosdelfino.eti.br"
		},
		colaborators : {
			1 : {
				name : "Carlos Magno Guerra",
				email : "correio@carlosguerra.com.br"
			}
		}
	},
	Sponsor : {
		1 : {
			name : "CSAT",
			site : "http://www.csat.com.br"
		},
		2 : {
			name : "Full Service",
			site : "http://www.full.srv.br",
			email : "admin@full.srv.br"
		}
	},
	requires : {
		1 : {
			name : "mootools",
			version : "1.12",
			noticie : "Used for Joomla 1.5 compatibility"
		},
		2 : {
			name : "SqueezeBox",
			version : "1.0rc",
			noticie : "Used for Joomla 1.5 compatibility"
		}
	}
};

/**
 * Usado para auxiliar a guardar propriedades entre chamadas de caixa de dialogo.
 * 
 * @returns
 */
var Web20DialogBoxHelper = {

	dialogs : new Hash(),

	getDialog : function(dialogName) {
		var dialog = this.dialogs.get(dialogName);
		return dialog;
	},

	setDialog : function(dialogName, dialog) {
		this.dialogs.set(dialogName,dialog); 
	},
	
	getProperty : function(dialogName, key) {
		var dialogs = this.getDialog(dialogName);
		var value;
		if ($chk(dialogs))
			value = dialogs.get(key);

		return value;
	},

	setProperty : function(dialogName, key, value) {
		var dialog = this.getDialog(dialogName);
		if (!$chk(dialog)) {
			dialog = new Hash();
			this.setDialog(dialogName, dialog);
		}
		var result = dialog.set(key, value);
		dialog.set(key, value);
		return result;
	}
};

var WDBH = Web20DialogBoxHelper;
/**
 * This class of object create a Dialog Box with user. without butons to close,
 * only default button on right up corner.
 * 
 * On create this object you can give a name to identificate this instance on
 * code and use static helpers to close and get data.
 * 
 * Tho objective os this object is permit the programer create a dialog box for
 * show information with customized buttons and not need close the window with a
 * callback. but you can.
 * 
 * @param argName
 */
var Web20Dialog = function(argName) {
	var that = this;
	var name;
	var box = $extend( {}, SqueezeBox);

	if (!$chk(Web20Dialog.instances)) {
		Web20Dialog.instances = new Hash();
	}
	if (!$chk(Web20Dialog.count)) {
		Web20Dialog.count = 0;
	}

	if (!argName || argName == '') {
		name = "instance-" + Web20Dialog.count;
	} else {
		name = argName;
	}
	Web20Dialog.count++;

	/**
	 * Put the object on hash of instances with the name informed.
	 * 
	 * This is a static method for help control the instances of dialog, and
	 * show and hide the correct instance where was need.
	 * 
	 * NOTICE: This function is for internal use, not use it in you code.
	 * 
	 * @param name
	 * @param obj
	 * @returns
	 */
	Web20Dialog.set = function(name, obj) {
		Web20Dialog.instances.set(name, obj);
	};

	/**
	 * Remove a instance for give name.
	 * 
	 * NOTICE: This function is for internal use, not use it in you code.
	 * 
	 * @param name
	 * @returns
	 */
	Web20Dialog.remove = function(name) {
		Web20Dialog.instances.remove(name);
	};
	/**
	 * Returne a instance of object for give name.
	 * 
	 * You can use this method for get a instance for a give name in you code in
	 * javascript or html event.
	 * 
	 * NOTICE: This function is for internal use, not use it in you code.
	 * 
	 * @param name
	 * @returns
	 */
	Web20Dialog.get = function(name) {
		return Web20Dialog.instances.get(name);
	};
	/**
	 * 
	 * @param name
	 * @returns
	 */
	Web20Dialog.close = function(name) {
		Web20Dialog.get(name).close();
	};

	Web20Dialog.set(name, this);

	var status = {
		open : false
	};
	var params = {
		zIndex : 60000,
		handler : 'string',
		size : {
			x : 400,
			y : 300
		},
		onShow : function() {
			status.open = true;
		},
		divMainStyle : "text-align: center; width: 100%; height: 100%;",
		textStyle : "font-size: 110%; text-align: center; width: 100%; height: 70%;"

	};

	/**
	 * Use this function for initialize the object with you parameters. You can
	 * too use second paramenter on {@link Web20Dialog#show}
	 * 
	 * options can inform this param: { size: {x:, y:}, onClose:, divMainStyle:
	 * textStyle }
	 * 
	 * <ul>
	 * <li>size have as default: x: 400, y: 300
	 * <li>onClose not have a default
	 * <li>divMainSytle have as default: "text-align: center; width: 100%;
	 * height: 100%;"
	 * <li>textStyle have as default: "font-size: 110%; text-align: center;
	 * width: 100%; height: 70%;"
	 * </ul>
	 * <ul>
	 * <li>divMainStyle option is used for format the principal div, where is
	 * put all html for exibtion.
	 * <li>textStyle is used for text passed on show argument
	 * </ul>
	 * 
	 * @param options
	 * @see Web20Dialog#show
	 */
	Web20Dialog.prototype.initialize = function(options) {
		params = $merge(params, options);
	};

	Web20Dialog.prototype.show = function(argHtml, options) {
		that.initialize(options);

		box.initialize(params);
		html = "<div id='Web20DialogDivMain' style='" + params.divMainStyle
				+ "'>";
		html += "<div id='divText' style'" + params.textStyle
				+ "'><spam id='text' >" + argHtml + "</spam></div>";
		html += "</div>";
		box.setContent('string', html);
		status.open = true;
	};
	Web20Dialog.prototype.close = function() {
		status.open = false;
		box.close();
		Web20Dialog.remove(name);
	};

};

var Web20Alert = function(argName) {
	var that = this;
	var name;
	var box = $extend( {}, SqueezeBox);

	if (!$chk(Web20Alert.instances)) {
		Web20Alert.instances = new Hash();
	}
	if (!$chk(Web20Alert.count)) {
		Web20Alert.count = 0;
	}

	if (!argName || argName == '') {
		name = "instance-" + Web20Alert.count;
	} else {
		name = argName;
	}
	Web20Alert.count++;

	/**
	 * 
	 * @param name
	 * @param obj
	 * @returns
	 */
	Web20Alert.set = function(name, obj) {
		Web20Alert.instances.set(name, obj);
	};
	/**
	 * 
	 * @param name
	 * @returns
	 */
	Web20Alert.remove = function(name) {
		Web20Alert.instances.remove(name);
	};
	/**
	 * 
	 * @param name
	 * @returns
	 */
	Web20Alert.get = function(name) {
		return Web20Alert.instances.get(name);
	};
	/**
	 * 
	 * @param name
	 * @returns
	 */
	Web20Alert.close = function(name) {
		var instance = Web20Alert.get(name);
		instance.close();
	};

	Web20Alert.set(name, this);

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

	/**
	 * Return the name of Instance;
	 * 
	 * @return String
	 */
	Web20Alert.prototype.getName = function() {
		return name;
	}
	Web20Alert.prototype.initialize = function(options) {
		var newOnClose;
		if (options && options.onClose) {
			newOnClose = options.onClose;
		}
		params = $merge(params, options);

		params.onClose = function() {
			if (newOnClose)
				newOnClose();
			that.close();
		};
	};

	Web20Alert.prototype.show = function(argHtml, options) {
		that.initialize(options);

		box.initialize(params);
		html = "<div id='Web20AlertDivMain' style='" + params.divMainStyle
				+ "'>";
		html += "<div id='divTitle' style'" + params.titleStyle
				+ "'><spam id='title' >" + argHtml + "</spam></div>";
		html += "<div id='divForm' style='" + params.divFormStyle + "'><form>";
		html += "<input id='botaoFechar' onClick='Web20Alert.close(" + '"'
				+ name + '"' + ")' type='button' value='Fechar' />";
		html += "<form></div>";
		html += "</div>";
		box.setContent('string', html);
		status.open = true;
	};
	Web20Alert.prototype.close = function() {
		status.open = false;
		box.close();
		Web20Alert.remove(name);
	};
};

var Web20Confirm = function(argName) {
	var that = this;
	var name;
	var box = $extend( {}, SqueezeBox);

	if (!Web20Confirm.instances) {
		Web20Confirm.instances = new Hash();
	}
	if (!$chk(Web20Confirm.count)) {
		Web20Confirm.count = 0;
	}

	if (!argName || argName == '') {
		name = "instance-" + Web20Confirm.count;
	} else {
		name = argName;
	}
	Web20Confirm.count++;

	/**
	 * 
	 * @param name
	 * @param obj
	 * @returns
	 */
	Web20Confirm.set = function(name, obj) {
		Web20Confirm.instances.set(name, obj);
	};
	/**
	 * 
	 * @param name
	 * @returns
	 */
	Web20Confirm.remove = function(name) {
		Web20Confirm.instances.remove(name);
	};
	/**
	 * 
	 * @param name
	 * @returns
	 */
	Web20Confirm.get = function(name) {
		return Web20Confirm.instances.get(name);
	};
	/**
	 * 
	 * @param name
	 * @returns
	 */
	Web20Confirm.close = function(name, elm) {
		Web20Confirm.get(name).close(elm);
	};

	Web20Confirm.set(name, this);

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

	Web20Confirm.prototype.initialize = function(options) {
		var newOnClose;
		if (options && options.onClose) {
			newOnClose = options.onClose;
		}
		params = $merge(params, options);

		params.onClose = function() {
			if (newOnClose)
				newOnClose();
		};
	};
	Web20Confirm.prototype.show = function(argHtml, options) {
		that.initialize(options);
		box.initialize(params);

		var html = "";
		html += "<div id='Web20ConfirmDivMain' style='" + params.divMainStyle
				+ "'>";
		html += "<div id='divTitle' style='" + params.titleStyle
				+ "'><spam id='title' >" + argHtml + "</spam></div>";
		html += "<div id='divForm' style='" + params.divFormStyle + "'><form>";
		html += "<input id='buttonConfirm' onClick='Web20Confirm.close(" + '"'
				+ name + '"' + ", this)' type='button' value='Confirma' style="
				+ params.buttonConfirmStyle + "/>";
		html += "<input id='buttonCancel' onClick='Web20Confirm.close(" + '"'
				+ name + '"' + ", this)' type='button' value='Cancela' style="
				+ params.buttonCancelStyle + "/>";
		html += "<form></div>";
		html += "</div>";
		box.setContent('string', html);
		status.open = true;
	};
	/**
	 * @param elm
	 */
	Web20Confirm.prototype.close = function(elm) {
		if (elm && elm.id == 'buttonConfirm') {
			that.result = true;
			// } else if (elm.id == 'buttonCancel') {
			// this.result = false;
		} else {// se fechar de qualquer outra forma considera desistência.
			that.result = false;
		}

		status.open = false;

		box.close();// fechar depois de obter os dados do box.

		Web20Confirm.remove(name);
	};

	Web20Confirm.prototype.result = false;
};