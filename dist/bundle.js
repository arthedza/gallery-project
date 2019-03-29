/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_imageCard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/imageCard.js */ \"./modules/imageCard.js\");\n\ncustomElements.define('image-card', _modules_imageCard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\nfunction addElement(tagName, container) {\n    return (container ? container : document.body).appendChild(document.createElement(tagName));\n}\n\nfunction getDate() {\n    return new Date().toLocaleString()\n}\n\nfunction testFile(file) {\n    //TODO: new func\n    return new Promise(() => {\n        //TODO: resolve + reject //TODO: IF?\n        return /jpeg|png|gif/gi.test(file.type) ?\n            (addElement('img').src = URL.createObjectURL(file)) : //TODO: separete function to insert image into the DOM\n            (addElement('p').innerText = 'Выбранный файл не является изображением'); //TODO: add img into web-component\n    });\n}\n\n//TODO: JSDOC /** */\n// const formData = new FormData();\n\nvar selector = document.getElementById('image_selector');\nselector.onchange = function (event) {\n    for (var file of event.target.files) {\n        testFile(file).then(transport(file));\n    }\n};\n//TODO: rename funcs (function naming)\nasync function transport(file) {\n    fetch('http://localhost:3000/Images/', {\n            method: 'POST',\n            headers: {\n                'Content-Type': 'application/json'\n            },\n            body: JSON.stringify({\n                created: getDate(),\n                content: await encode(file)\n            })\n        })\n        .then((response) => response.json())\n        .then((response) => console.log(response));\n}\n//TODO: reject\nfunction encode(file) {\n    return new Promise((resolve, reject) => {\n        let reader = new FileReader();\n        reader.readAsBinaryString(file);\n        reader.onload = (event) => resolve(window.btoa(event.target.result));\n    });\n}\n//TODO: headers and src (add to params) in a separate variables;\n//TODO: define quantity of loaded src\nfunction getImg(params) {\n    // let loadedData = {}\n    return fetch('http://localhost:3000/Images/').then(response => response.json()); //.then(response => console.log(response));\n    // return loadedData\n    // console.log()\n}\n\nfunction showImg(img) {\n    return img.content ? addElement('image-card').setAttribute('src', `data:image/png;base64,${img.content}`) : null //= `data:image/png;base64,${img.content}` : null; //TODO: file types\n}\n\nwindow.onload = function (event) {\n    getImg().then(response => response.forEach(responseEntity => showImg(responseEntity))); //TODO: mb create custom response iterator\n};\n\n//TODO:\nArray.from(document.getElementsByTagName('image-card')).forEach(element => element.addEventListener('mouseover', function (event) {\n    event.target.style = `\n        background-color: green;\n    `\n}))\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./modules/imageCard.js":
/*!******************************!*\
  !*** ./modules/imageCard.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass imageCard extends HTMLElement {\n    constructor() {\n        super();\n        let wrapper = document.createElement('div');\n        wrapper.className = \"wrapper\";\n        this.picture = document.createElement('img');\n        this.picture.className = \"image\";\n        wrapper.appendChild(this.picture);\n        this.date = document.createElement('span');\n        this.date.className = \"date\";\n        wrapper.appendChild(this.date);\n\n        let style = document.createElement('style');\n        style.textContent = `\n            .wrapper {\n                display: inline-block;\n                margin: 20px;\n            }\n            .wrapper:hover {\n                // z-index: 3;\n                background-color: red;\n            }\n            .image {\n                max-width: 400px;\n                max-height: 400px;\n                border: dotted 1px #555;\n                transition: all 1s;\n            }\n        `;\n        this.shadow = this.attachShadow({\n            mode: 'open'\n        });\n        this.shadow.appendChild(style);\n        this.shadow.appendChild(wrapper);\n    }\n    static get observedAttributes() {\n        return [\"src\"];\n    }\n    attributeChangedCallback(attrName, oldVal, newVal) {\n        this.picture.src = this.getAttribute('src');\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (imageCard);\n\n//# sourceURL=webpack:///./modules/imageCard.js?");

/***/ })

/******/ });