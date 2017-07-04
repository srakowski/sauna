(function () {

    var fs = require('fs');
    var path = require('path');
    var rootDir = path.dirname(require.main.filename) + path.sep;

    var Navigator = function (element) {
        var self = this;
        var _element = element;
        var _v = null;
        var _cb = null;

        self.navigate = function (view, callback) {
            _cb = callback;
            if ((view !=null) && (view.length > 0)) {
                location.hash = "#" + view;
            }

        };

        window.addEventListener("hashchange", function () {
            var hash = location.hash;
            var viewName = hash.slice(1, hash.length);
            _navigate(viewName);
        }, false);

        var _navigate = function (view) {
            if ((view !=null) && (view.length > 0)) {
                fs.readFile(rootDir + path.sep + view + ".html", "utf-8", function (err, data) {
                    console.log(rootDir + path.sep + view + ".html");
                    if (_v != null) {
                        ko.removeNode(_v);
                        _v = null;
                    }
                    element.innerHTML = data;
                    _v = document.getElementById(view)
                    console.log(view);
                    if (_v != null) {
                        var vmModule = _v.getAttribute("data-vm");
                        VM = require(rootDir + vmModule);
                        VM = new VM();
                        ko.applyBindings(VM, _v);
                        if (typeof _cb == 'function') {
                            _cb(VM);
                            _cb = null;
                        }
                    }
                });
            }

        }
    };

    module.exports = function (element) {
        var navigator = new Navigator(element);
        return {
            n: navigator
        };
    };

})();
