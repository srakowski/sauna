(function () {

	var fs = require('fs');
	var path = require('path');
	var rootDir = path.dirname(require.main.filename) + "\\";

	var Navigator = function (element) {
		var self = this;
		var _element = element;
		var _v = null;
		var _cb = null;

		self.navigate = function (view, callback) {
			_cb = callback;
			location.hash = "#" + view;
		};

		window.addEventListener("hashchange", function () {
			var hash = location.hash;
			var viewName = hash.slice(1, hash.length);
			_navigate(viewName); 
		}, false);

		var _navigate = function (view) {
			fs.readFile(rootDir + view + ".html", "utf-8", function (err, data) {
				if (_v != null) {
					ko.removeNode(_v);
					_v = null;
				}
				element.innerHTML = data;
				_v = document.getElementById(view)
				var vmModule = _v.getAttribute("data-vm");
				VM = require(rootDir + vmModule);
				VM = new VM();
				ko.applyBindings(VM, _v);
				if (typeof _cb == 'function') {
					_cb(VM);
					_cb = null;
				}
			});
		}
	};

	module.exports = function (element) {
		var navigator = new Navigator(element);
		return {
			n: navigator
		};
	};

})();
