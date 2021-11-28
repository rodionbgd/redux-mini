!function(){"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function t(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var r=function(){function r(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),this.reduce=e,this.state=e(t,{}),this.subscribers=[]}var n,c;return n=r,(c=[{key:"getState",value:function(){return this.state}},{key:"dispatch",value:function(e){var t=this;this.state=this.reduce(this.state,e),this.subscribers.forEach((function(e){return e(t.state)}))}},{key:"replaceReducer",value:function(e){this.reduce=e}},{key:"subscribe",value:function(t){var r,n=this;return this.subscribers=[].concat(function(t){if(Array.isArray(t))return e(t)}(r=this.subscribers)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(r)||function(t,r){if(t){if("string"==typeof t)return e(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,r):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[t]),t(this.state),function(){n.subscribers=n.subscribers.filter((function(e){return e!==t}))}}}])&&t(n.prototype,c),r}();function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var u={count:function(e,t){var r=0;switch(t.type){case"INCREMENT":return r=Number(e.counter)+1,c(c({},e),{},{counter:r});case"DECREMENT":return r=Number(e.counter)-1,c(c({},e),{},{counter:r});case"INPUT":return r=Number(e.counter)+t.payload,c(c({},e),{},{counter:r});default:return e}},paint:function(e,t){return"COLOR_CHANGE"===t.type?c(c({},e),{},{color:t.payload}):e}},i={count:{counter:0},paint:{color:0}};window.addEventListener("load",(function(){var e=new r(function(e){return function(t,r){var n={};return Object.keys(e).forEach((function(c){n[c]=e[c](t[c],r)})),n}}(u),i),t=document.querySelector(".inc"),n=document.querySelector(".dec"),c=document.querySelector(".add"),o=document.querySelector('input[type="number"]'),a=document.querySelector('input[type="color"]'),s=document.getElementById("color"),l=document.querySelector("h1");t.addEventListener("click",(function(){return e.dispatch({type:"INCREMENT"})})),n.addEventListener("click",(function(){return e.dispatch({type:"DECREMENT"})})),c.addEventListener("click",(function(){return e.dispatch({type:"INPUT",payload:Number(o.value)})})),a.addEventListener("input",(function(){return e.dispatch({type:"COLOR_CHANGE",payload:a.value})})),e.subscribe((function(){l.innerHTML="Counter: ".concat(e.getState().count.counter)})),e.subscribe((function(){s.style.color="".concat(e.getState().paint.color)}))}))}();