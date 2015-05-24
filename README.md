# sauna
A micro framework for doing SPA in Electron with Knockout.

Depends on knockout https://github.com/knockout/knockout.

Usage from example:
		var sauna = require("./libs/sauna");			
		spa = sauna.init(document.getElementById("app"));
		spa.n.navigate("views/homeView");			
	
