(function(graph){
            function require(module){
                function localRequire(relativePath){
                    return require(graph[module].yilai[relativePath])
                }
                var exports = {};
                (function(require,exports,code){
                    eval(code)
                })(localRequire,exports,graph[module].code)
                return exports;
            }
            require('./src/index.js')
        })({"./src/index.js":{"yilai":{"./a.js":"src/a.js","./b.js":"src/b.js"},"code":"\"use strict\";\n\nvar _a = _interopRequireDefault(require(\"./a.js\"));\n\nvar _b = _interopRequireDefault(require(\"./b.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(\"hello \".concat(_a[\"default\"], \" \").concat(_b[\"default\"]));"},"src/a.js":{"yilai":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar aa = console.log('world');\nvar _default = aa;\nexports[\"default\"] = _default;"},"src/b.js":{"yilai":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar bb = console.log('!!!');\nvar _default = bb;\nexports[\"default\"] = _default;"}})