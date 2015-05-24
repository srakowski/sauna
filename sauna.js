(function () {
	
	var fs = require('fs');
	var path = require('path');
	var rootDir = path.dirname(require.main.filename) + "\\";
	
	var Navigator = function (element) {
		var self = this;		
		var _element = element;
		var _v = null;							
		
		self.navigate = function (view) {
			location.hash = "#" + view;										
		};		
		
		window.addEventListener("hashchange", function () {
			var hash = location.hash;			
			var viewName = hash.slice(1, hash.length);
			_navigate(viewName); 
		}, false);
		
		var _navigate = function name(view) {
			fs.readFile(rootDir + view + ".html", "utf-8", function (err, data) {
				if (_v != null) {
					ko.removeNode(_v);
					_v = null;
				}												
				element.innerHTML = data;
				_v = document.getElementById(view)
				var vmModule = _v.getAttribute("data-vm");
				VM = require(rootDir + vmModule);				
				ko.applyBindings(new VM(), _v);																										
			});					
		}			
	};
	
	exports.init = function (element) {				
		var navigator = new Navigator(element);
		return {
			n: navigator
		};					
	};
				
})();