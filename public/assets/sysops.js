/**
 * math.js
 * https://github.com/josdejong/mathjs
 *
 * Math.js is an extensive math library for JavaScript and Node.js,
 * It features real and complex numbers, units, matrices, a large set of
 * mathematical functions, and a flexible expression parser.
 *
 * @version 3.2.0
 * @date    2016-04-16
 *
 * @license
 * Copyright (C) 2013-2016 Jos de Jong <wjosdejong@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.math=t():e.math=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){function n(e){var t=i.create(e);return t.create=n,t["import"](r(13)),t}var i=r(1);e.exports=n()},function(e,t,r){e.exports=r(2)},function(e,t,r){var n=r(3).isFactory,i=(r(3).deepExtend,r(4)),a=r(8),o=r(10),s=r(12);t.create=function(e){function t(e){if(!n(e))throw new Error("Factory object with properties `type`, `name`, and `factory` expected");var i,a=r.indexOf(e);return-1===a?(i=e.math===!0?e.factory(c.type,f,t,c.typed,c):e.factory(c.type,f,t,c.typed),r.push(e),u.push(i)):i=u[a],i}if("function"!=typeof Object.create)throw new Error("ES5 not supported by this JavaScript engine. Please load the es5-shim and es5-sham library for compatibility.");var r=[],u=[],c=a.mixin({});c.type={},c.expression={transform:Object.create(c)},c.typed=i.create(c.type);var f={epsilon:1e-12,matrix:"Matrix",number:"number",precision:64,predictable:!1};return c["import"]=t(o),c.config=t(s),e&&c.config(e),c}},function(e,t){"use strict";t.clone=function r(e){var t=typeof e;if("number"===t||"string"===t||"boolean"===t||null===e||void 0===e)return e;if("function"==typeof e.clone)return e.clone();if(Array.isArray(e))return e.map(function(e){return r(e)});if(e instanceof Number)return new Number(e.valueOf());if(e instanceof String)return new String(e.valueOf());if(e instanceof Boolean)return new Boolean(e.valueOf());if(e instanceof Date)return new Date(e.valueOf());if(e&&e.isBigNumber===!0)return e;if(e instanceof RegExp)throw new TypeError("Cannot clone "+e);var n={};for(var i in e)e.hasOwnProperty(i)&&(n[i]=r(e[i]));return n},t.extend=function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e},t.deepExtend=function n(e,t){if(Array.isArray(t))throw new TypeError("Arrays are not supported by deepExtend");for(var r in t)if(t.hasOwnProperty(r))if(t[r]&&t[r].constructor===Object)void 0===e[r]&&(e[r]={}),e[r].constructor===Object?n(e[r],t[r]):e[r]=t[r];else{if(Array.isArray(t[r]))throw new TypeError("Arrays are not supported by deepExtend");e[r]=t[r]}return e},t.deepEqual=function(e,r){var n,i,a;if(Array.isArray(e)){if(!Array.isArray(r))return!1;if(e.length!=r.length)return!1;for(i=0,a=e.length;a>i;i++)if(!t.deepEqual(e[i],r[i]))return!1;return!0}if(e instanceof Object){if(Array.isArray(r)||!(r instanceof Object))return!1;for(n in e)if(!t.deepEqual(e[n],r[n]))return!1;for(n in r)if(!t.deepEqual(e[n],r[n]))return!1;return!0}return typeof e==typeof r&&e==r},t.canDefineProperty=function(){try{if(Object.defineProperty)return Object.defineProperty({},"x",{get:function(){}}),!0}catch(e){}return!1},t.lazy=function(e,r,n){if(t.canDefineProperty()){var i,a=!0;Object.defineProperty(e,r,{get:function(){return a&&(i=n(),a=!1),i},set:function(e){i=e,a=!1},configurable:!0,enumerable:!0})}else e[r]=n()},t.traverse=function(e,t){var r=e;if(t)for(var n=t.split("."),i=0;i<n.length;i++){var a=n[i];a in r||(r[a]={}),r=r[a]}return r},t.isFactory=function(e){return e&&"function"==typeof e.factory}},function(e,t,r){var n=r(5),i=r(6).digits,a=function(){return a=n.create,n};t.create=function(e){var t=a();return t.types=[{name:"number",test:function(e){return"number"==typeof e}},{name:"Complex",test:function(e){return e&&e.isComplex}},{name:"BigNumber",test:function(e){return e&&e.isBigNumber}},{name:"Fraction",test:function(e){return e&&e.isFraction}},{name:"Unit",test:function(e){return e&&e.isUnit}},{name:"string",test:function(e){return"string"==typeof e}},{name:"Array",test:Array.isArray},{name:"Matrix",test:function(e){return e&&e.isMatrix}},{name:"DenseMatrix",test:function(e){return e&&e.isDenseMatrix}},{name:"SparseMatrix",test:function(e){return e&&e.isSparseMatrix}},{name:"ImmutableDenseMatrix",test:function(e){return e&&e.isImmutableDenseMatrix}},{name:"Range",test:function(e){return e&&e.isRange}},{name:"Index",test:function(e){return e&&e.isIndex}},{name:"boolean",test:function(e){return"boolean"==typeof e}},{name:"ResultSet",test:function(e){return e&&e.isResultSet}},{name:"Help",test:function(e){return e&&e.isHelp}},{name:"function",test:function(e){return"function"==typeof e}},{name:"Date",test:function(e){return e instanceof Date}},{name:"RegExp",test:function(e){return e instanceof RegExp}},{name:"Object",test:function(e){return"object"==typeof e}},{name:"null",test:function(e){return null===e}},{name:"undefined",test:function(e){return void 0===e}}],t.conversions=[{from:"number",to:"BigNumber",convert:function(t){if(i(t)>15)throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: "+t+"). Use function bignumber(x) to convert to BigNumber.");return new e.BigNumber(t)}},{from:"number",to:"Complex",convert:function(t){return new e.Complex(t,0)}},{from:"number",to:"string",convert:function(e){return e+""}},{from:"BigNumber",to:"Complex",convert:function(t){return new e.Complex(t.toNumber(),0)}},{from:"Fraction",to:"Complex",convert:function(t){return new e.Complex(t.valueOf(),0)}},{from:"number",to:"Fraction",convert:function(t){if(i(t)>15)throw new TypeError("Cannot implicitly convert a number with >15 significant digits to Fraction (value: "+t+"). Use function fraction(x) to convert to Fraction.");return new e.Fraction(t)}},{from:"string",to:"number",convert:function(e){var t=Number(e);if(isNaN(t))throw new Error('Cannot convert "'+e+'" to a number');return t}},{from:"boolean",to:"number",convert:function(e){return+e}},{from:"boolean",to:"BigNumber",convert:function(t){return new e.BigNumber(+t)}},{from:"boolean",to:"Fraction",convert:function(t){return new e.Fraction(+t)}},{from:"boolean",to:"string",convert:function(e){return+e}},{from:"null",to:"number",convert:function(){return 0}},{from:"null",to:"string",convert:function(){return"null"}},{from:"null",to:"BigNumber",convert:function(){return new e.BigNumber(0)}},{from:"null",to:"Fraction",convert:function(){return new e.Fraction(0)}},{from:"Array",to:"Matrix",convert:function(t){return new e.DenseMatrix(t)}},{from:"Matrix",to:"Array",convert:function(e){return e.valueOf()}}],t}},function(e,t,r){var n,i,a;!function(r,o){i=[],n=o,a="function"==typeof n?n.apply(t,i):n,!(void 0!==a&&(e.exports=a))}(this,function(){function e(){function t(e){for(var t,r=0;r<N.types.length;r++){var n=N.types[r];if(n.name===e){t=n.test;break}}if(!t){var i;for(r=0;r<N.types.length;r++)if(n=N.types[r],n.name.toLowerCase()==e.toLowerCase()){i=n.name;break}throw new Error('Unknown type "'+e+'"'+(i?'. Did you mean "'+i+'"?':""))}return t}function r(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(n.signatures&&""!=n.name)if(""==t)t=n.name;else if(t!=n.name){var i=new Error("Function names do not match (expected: "+t+", actual: "+n.name+")");throw i.data={actual:n.name,expected:t},i}}return t}function n(e,t,r,n,i){var a,o=m(n),s=i?i.split(","):null,u=e||"unnamed",c=s&&d(s,"any"),f={fn:e,index:r,actual:n,expected:s};a=s?t>r&&!c?"Unexpected type of argument in function "+u+" (expected: "+s.join(" or ")+", actual: "+o+", index: "+r+")":"Too few arguments in function "+u+" (expected: "+s.join(" or ")+", index: "+r+")":"Too many arguments in function "+u+" (expected: "+r+", actual: "+t+")";var l=new TypeError(a);return l.data=f,l}function i(e){this.name=e||"refs",this.categories={}}function a(e,t){if("string"==typeof e){var r=e.trim(),n="..."===r.substr(0,3);if(n&&(r=r.substr(3)),""===r)this.types=["any"];else{this.types=r.split("|");for(var i=0;i<this.types.length;i++)this.types[i]=this.types[i].trim()}}else{if(!Array.isArray(e)){if(e instanceof a)return e.clone();throw new Error("String or Array expected")}this.types=e}this.conversions=[],this.varArgs=n||t||!1,this.anyType=-1!==this.types.indexOf("any")}function o(e,t){var r;if("string"==typeof e)r=""!==e?e.split(","):[];else{if(!Array.isArray(e))throw new Error("string or Array expected");r=e}this.params=new Array(r.length);for(var n=0;n<r.length;n++){var i=new a(r[n]);if(this.params[n]=i,n===r.length-1)this.varArgs=i.varArgs;else if(i.varArgs)throw new SyntaxError('Unexpected variable arguments operator "..."')}this.fn=t}function s(e,t,r){this.path=e||[],this.param=e[e.length-1]||null,this.signature=t||null,this.childs=r||[]}function u(e){var t,r,n={},i=[];for(var a in e)if(e.hasOwnProperty(a)){var s=e[a];if(t=new o(a,s),t.ignore())continue;var u=t.expand();for(r=0;r<u.length;r++){var c=u[r],f=c.toString(),l=n[f];if(l){var p=o.compare(c,l);if(0>p)n[f]=c;else if(0===p)throw new Error('Signature "'+f+'" is defined twice')}else n[f]=c}}for(f in n)n.hasOwnProperty(f)&&i.push(n[f]);for(i.sort(function(e,t){return o.compare(e,t)}),r=0;r<i.length;r++)if(t=i[r],t.varArgs)for(var h=t.params.length-1,m=t.params[h],g=0;g<m.types.length;){if(m.conversions[g])for(var v=m.types[g],y=0;y<i.length;y++){var x=i[y],b=x.params[h];if(x!==t&&b&&d(b.types,v)&&!b.conversions[h]){m.types.splice(g,1),m.conversions.splice(g,1),g--;break}}g++}return i}function c(e){for(var t={},r=0;r<e.length;r++){var n=e[r];if(n.fn&&!n.hasConversions()){var i=n.params.join(",");t[i]=n.fn}}return t}function f(e,t){var r,n,i,o=t.length,u=[];for(r=0;r<e.length;r++)n=e[r],n.params.length!==o||i||(i=n),void 0!=n.params[o]&&u.push(n);u.sort(function(e,t){return a.compare(e.params[o],t.params[o])});var c=[];for(r=0;r<u.length;r++){n=u[r];var l=n.params[o],p=c.filter(function(e){return e.param.overlapping(l)})[0];if(p){if(p.param.varArgs)throw new Error('Conflicting types "'+p.param+'" and "'+l+'"');p.signatures.push(n)}else c.push({param:l,signatures:[n]})}var h=new Array(c.length);for(r=0;r<c.length;r++){var m=c[r];h[r]=f(m.signatures,t.concat(m.param))}return new s(t,i,h)}function l(e){for(var t=[],r=0;e>r;r++)t[r]="arg"+r;return t}function p(e,t){var r=new i,a=u(t);if(0==a.length)throw new Error("No signatures provided");var o=f(a,[]),s=[],p=e||"",m=l(h(a));s.push("function "+p+"("+m.join(", ")+") {"),s.push('  "use strict";'),s.push("  var name = '"+p+"';"),s.push(o.toCode(r,"  ")),s.push("}");var d=[r.toCode(),"return "+s.join("\n")].join("\n"),g=new Function(r.name,"createError",d),v=g(r,n);return v.signatures=c(a),v}function h(e){for(var t=0,r=0;r<e.length;r++){var n=e[r].params.length;n>t&&(t=n)}return t}function m(e){for(var t,r=0;r<N.types.length;r++){var n=N.types[r];if("Object"===n.name)t=n;else if(n.test(e))return n.name}return t&&t.test(e)?t.name:"unknown"}function d(e,t){return-1!==e.indexOf(t)}function g(e,t){if(!e.signatures)throw new TypeError("Function is no typed-function");var r;if("string"==typeof t){r=t.split(",");for(var n=0;n<r.length;n++)r[n]=r[n].trim()}else{if(!Array.isArray(t))throw new TypeError("String array or a comma separated string expected");r=t}var i=r.join(","),a=e.signatures[i];if(a)return a;throw new TypeError("Signature not found (signature: "+(e.name||"unnamed")+"("+r.join(", ")+"))")}function v(e,t){var r=m(e);if(t===r)return e;for(var n=0;n<N.conversions.length;n++){var i=N.conversions[n];if(i.from===r&&i.to===t)return i.convert(e)}throw new Error("Cannot convert from "+r+" to "+t)}i.prototype.add=function(e,t){var r=t||"fn";this.categories[r]||(this.categories[r]=[]);var n=this.categories[r].indexOf(e);return-1==n&&(n=this.categories[r].length,this.categories[r].push(e)),r+n},i.prototype.toCode=function(){var e=[],t=this.name+".categories",r=this.categories;for(var n in r)if(r.hasOwnProperty(n))for(var i=r[n],a=0;a<i.length;a++)e.push("var "+n+a+" = "+t+"['"+n+"']["+a+"];");return e.join("\n")},a.compare=function(e,t){if(e.anyType)return 1;if(t.anyType)return-1;if(d(e.types,"Object"))return 1;if(d(t.types,"Object"))return-1;if(e.hasConversions()){if(t.hasConversions()){var r,n,i;for(r=0;r<e.conversions.length;r++)if(void 0!==e.conversions[r]){n=e.conversions[r];break}for(r=0;r<t.conversions.length;r++)if(void 0!==t.conversions[r]){i=t.conversions[r];break}return N.conversions.indexOf(n)-N.conversions.indexOf(i)}return 1}if(t.hasConversions())return-1;var a,o;for(r=0;r<N.types.length;r++)if(N.types[r].name===e.types[0]){a=r;break}for(r=0;r<N.types.length;r++)if(N.types[r].name===t.types[0]){o=r;break}return a-o},a.prototype.overlapping=function(e){for(var t=0;t<this.types.length;t++)if(d(e.types,this.types[t]))return!0;return!1},a.prototype.clone=function(){var e=new a(this.types.slice(),this.varArgs);return e.conversions=this.conversions.slice(),e},a.prototype.hasConversions=function(){return this.conversions.length>0},a.prototype.contains=function(e){for(var t=0;t<this.types.length;t++)if(e[this.types[t]])return!0;return!1},a.prototype.toString=function(e){for(var t=[],r={},n=0;n<this.types.length;n++){var i=this.conversions[n],a=e&&i?i.to:this.types[n];a in r||(r[a]=!0,t.push(a))}return(this.varArgs?"...":"")+t.join("|")},o.prototype.clone=function(){return new o(this.params.slice(),this.fn)},o.prototype.expand=function(){function e(r,n){if(n.length<r.params.length){var i,s,u,c=r.params[n.length];if(c.varArgs){for(s=c.clone(),i=0;i<N.conversions.length;i++)if(u=N.conversions[i],!d(c.types,u.from)&&d(c.types,u.to)){var f=s.types.length;s.types[f]=u.from,s.conversions[f]=u}e(r,n.concat(s))}else{for(i=0;i<c.types.length;i++)e(r,n.concat(new a(c.types[i])));for(i=0;i<N.conversions.length;i++)u=N.conversions[i],!d(c.types,u.from)&&d(c.types,u.to)&&(s=new a(u.from),s.conversions[0]=u,e(r,n.concat(s)))}}else t.push(new o(n,r.fn))}var t=[];return e(this,[]),t},o.compare=function(e,t){if(e.params.length>t.params.length)return 1;if(e.params.length<t.params.length)return-1;var r,n=e.params.length,i=0,o=0;for(r=0;n>r;r++)e.params[r].hasConversions()&&i++,t.params[r].hasConversions()&&o++;if(i>o)return 1;if(o>i)return-1;for(r=0;r<e.params.length;r++){var s=a.compare(e.params[r],t.params[r]);if(0!==s)return s}return 0},o.prototype.hasConversions=function(){for(var e=0;e<this.params.length;e++)if(this.params[e].hasConversions())return!0;return!1},o.prototype.ignore=function(){for(var e={},t=0;t<N.ignore.length;t++)e[N.ignore[t]]=!0;for(t=0;t<this.params.length;t++)if(this.params[t].contains(e))return!0;return!1},o.prototype.toCode=function(e,t){for(var r=[],n=new Array(this.params.length),i=0;i<this.params.length;i++){var a=this.params[i],o=a.conversions[0];a.varArgs?n[i]="varArgs":o?n[i]=e.add(o.convert,"convert")+"(arg"+i+")":n[i]="arg"+i}var s=this.fn?e.add(this.fn,"signature"):void 0;return s?t+"return "+s+"("+n.join(", ")+"); // signature: "+this.params.join(", "):r.join("\n")},o.prototype.toString=function(){return this.params.join(", ")},s.prototype.toCode=function(e,r,n){var i=[];if(this.param){var a=this.path.length-1,o=this.param.conversions[0],s="// type: "+(o?o.from+" (convert to "+o.to+")":this.param);if(this.param.varArgs)if(this.param.anyType)i.push(r+"if (arguments.length > "+a+") {"),i.push(r+"  var varArgs = [];"),i.push(r+"  for (var i = "+a+"; i < arguments.length; i++) {"),i.push(r+"    varArgs.push(arguments[i]);"),i.push(r+"  }"),i.push(this.signature.toCode(e,r+"  ")),i.push(r+"}");else{for(var u=function(r,n){for(var i=[],a=0;a<r.length;a++)i[a]=e.add(t(r[a]),"test")+"("+n+")";return i.join(" || ")}.bind(this),c=this.param.types,f=[],l=0;l<c.length;l++)void 0===this.param.conversions[l]&&f.push(c[l]);i.push(r+"if ("+u(c,"arg"+a)+") { "+s),i.push(r+"  var varArgs = [arg"+a+"];"),i.push(r+"  for (var i = "+(a+1)+"; i < arguments.length; i++) {"),i.push(r+"    if ("+u(f,"arguments[i]")+") {"),i.push(r+"      varArgs.push(arguments[i]);");for(var l=0;l<c.length;l++){var p=this.param.conversions[l];if(p){var h=e.add(t(c[l]),"test"),m=e.add(p.convert,"convert");i.push(r+"    }"),i.push(r+"    else if ("+h+"(arguments[i])) {"),i.push(r+"      varArgs.push("+m+"(arguments[i]));")}}i.push(r+"    } else {"),i.push(r+"      throw createError(name, arguments.length, i, arguments[i], '"+f.join(",")+"');"),i.push(r+"    }"),i.push(r+"  }"),i.push(this.signature.toCode(e,r+"  ")),i.push(r+"}")}else if(this.param.anyType)i.push(r+"// type: any"),i.push(this._innerCode(e,r,n));else{var d=this.param.types[0],h="any"!==d?e.add(t(d),"test"):null;i.push(r+"if ("+h+"(arg"+a+")) { "+s),i.push(this._innerCode(e,r+"  ",n)),i.push(r+"}")}}else i.push(this._innerCode(e,r,n));return i.join("\n")},s.prototype._innerCode=function(e,t,r){var n,i=[];this.signature&&(i.push(t+"if (arguments.length === "+this.path.length+") {"),i.push(this.signature.toCode(e,t+"  ")),i.push(t+"}"));var a;for(n=0;n<this.childs.length;n++)if(this.childs[n].param.anyType){a=this.childs[n];break}for(n=0;n<this.childs.length;n++)i.push(this.childs[n].toCode(e,t,a));r&&!this.param.anyType&&i.push(r.toCode(e,t,a));var o=this._exceptions(e,t);return o&&i.push(o),i.join("\n")},s.prototype._exceptions=function(e,t){var r=this.path.length;if(0===this.childs.length)return[t+"if (arguments.length > "+r+") {",t+"  throw createError(name, arguments.length, "+r+", arguments["+r+"]);",t+"}"].join("\n");for(var n={},i=[],a=0;a<this.childs.length;a++){var o=this.childs[a];if(o.param)for(var s=0;s<o.param.types.length;s++){var u=o.param.types[s];u in n||o.param.conversions[s]||(n[u]=!0,i.push(u))}}return t+"throw createError(name, arguments.length, "+r+", arguments["+r+"], '"+i.join(",")+"');"};var y=[{name:"number",test:function(e){return"number"==typeof e}},{name:"string",test:function(e){return"string"==typeof e}},{name:"boolean",test:function(e){return"boolean"==typeof e}},{name:"Function",test:function(e){return"function"==typeof e}},{name:"Array",test:Array.isArray},{name:"Date",test:function(e){return e instanceof Date}},{name:"RegExp",test:function(e){return e instanceof RegExp}},{name:"Object",test:function(e){return"object"==typeof e}},{name:"null",test:function(e){return null===e}},{name:"undefined",test:function(e){return void 0===e}}],x={},b=[],w=[],N={config:x,types:y,conversions:b,ignore:w};return N=p("typed",{Object:function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(e[n]);var i=r(t);return p(i,e)},"string, Object":p,"...Function":function(e){for(var t,n=r(e),i={},a=0;a<e.length;a++){var o=e[a];if("object"!=typeof o.signatures)throw t=new TypeError("Function is no typed-function (index: "+a+")"),t.data={index:a},t;for(var s in o.signatures)if(o.signatures.hasOwnProperty(s))if(i.hasOwnProperty(s)){if(o.signatures[s]!==i[s])throw t=new Error('Signature "'+s+'" is defined twice'),t.data={signature:s},t}else i[s]=o.signatures[s]}return p(n,i)}}),N.config=x,N.types=y,N.conversions=b,N.ignore=w,N.create=e,N.find=g,N.convert=v,N.addType=function(e){if(!e||"string"!=typeof e.name||"function"!=typeof e.test)throw new TypeError("Object with properties {name: string, test: function} expected");N.types.push(e)},N.addConversion=function(e){if(!e||"string"!=typeof e.from||"string"!=typeof e.to||"function"!=typeof e.convert)throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");N.conversions.push(e)},N}return e()})},function(e,t,r){"use strict";var n=r(7);t.isNumber=function(e){return"number"==typeof e},t.isInteger=function(e){return isFinite(e)?e==Math.round(e):!1},t.sign=Math.sign||function(e){return e>0?1:0>e?-1:0},t.format=function(e,r){if("function"==typeof r)return r(e);if(e===1/0)return"Infinity";if(e===-(1/0))return"-Infinity";if(isNaN(e))return"NaN";var n="auto",i=void 0;switch(r&&(r.notation&&(n=r.notation),t.isNumber(r)?i=r:r.precision&&(i=r.precision)),n){case"fixed":return t.toFixed(e,i);case"exponential":return t.toExponential(e,i);case"engineering":return t.toEngineering(e,i);case"auto":return t.toPrecision(e,i,r&&r.exponential).replace(/((\.\d*?)(0+))($|e)/,function(){var e=arguments[2],t=arguments[4];return"."!==e?e+t:t});default:throw new Error('Unknown notation "'+n+'". Choose "auto", "exponential", or "fixed".')}},t.toExponential=function(e,t){return new n(e).toExponential(t)},t.toEngineering=function(e,t){return new n(e).toEngineering(t)},t.toFixed=function(e,t){return new n(e).toFixed(t)},t.toPrecision=function(e,t,r){return new n(e).toPrecision(t,r)},t.digits=function(e){return e.toExponential().replace(/e.*$/,"").replace(/^0\.?0*|\./,"").length},t.DBL_EPSILON=Number.EPSILON||2.220446049250313e-16,t.nearlyEqual=function(e,r,n){if(null==n)return e==r;if(e==r)return!0;if(isNaN(e)||isNaN(r))return!1;if(isFinite(e)&&isFinite(r)){var i=Math.abs(e-r);return i<t.DBL_EPSILON?!0:i<=Math.max(Math.abs(e),Math.abs(r))*n}return!1}},function(e,t){"use strict";function r(e){var t=String(e).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);if(!t)throw new SyntaxError("Invalid number");var r=t[1],n=t[2],i=parseFloat(t[4]||"0"),a=n.indexOf(".");i+=-1!==a?a-1:n.length-1,this.sign=r,this.coefficients=n.replace(".","").replace(/^0*/,function(e){return i-=e.length,""}).replace(/0*$/,"").split("").map(function(e){return parseInt(e)}),0===this.coefficients.length&&(this.coefficients.push(0),i++),this.exponent=i}function n(e){for(var t=[],r=0;e>r;r++)t.push(0);return t}r.prototype.toEngineering=function(e){var t=this.roundDigits(e),r=t.exponent,i=t.coefficients,a=r%3===0?r:0>r?r-3-r%3:r-r%3,o=r>=0?r:Math.abs(a);i.length-1<o&&(i=i.concat(n(o-(i.length-1))));for(var s=Math.abs(r-a),u=1,c="";--s>=0;)u++;var f=i.slice(u).join(""),l=f.match(/[1-9]/)?"."+f:"";return c=i.slice(0,u).join("")+l,c+="e"+(r>=0?"+":"")+a.toString(),t.sign+c},r.prototype.toFixed=function(e){var t=this.roundDigits(this.exponent+1+(e||0)),r=t.coefficients,i=t.exponent+1,a=i+(e||0);return r.length<a&&(r=r.concat(n(a-r.length))),0>i&&(r=n(-i+1).concat(r),i=1),e&&r.splice(i,0,0===i?"0.":"."),this.sign+r.join("")},r.prototype.toExponential=function(e){var t=e?this.roundDigits(e):this.clone(),r=t.coefficients,i=t.exponent;r.length<e&&(r=r.concat(n(e-r.length)));var a=r.shift();return this.sign+a+(r.length>0?"."+r.join(""):"")+"e"+(i>=0?"+":"")+i},r.prototype.toPrecision=function(e,t){var r=t&&void 0!==t.lower?t.lower:.001,i=t&&void 0!==t.upper?t.upper:1e5,a=Math.abs(Math.pow(10,this.exponent));if(r>a||a>=i)return this.toExponential(e);var o=e?this.roundDigits(e):this.clone(),s=o.coefficients,u=o.exponent;s.length<e&&(s=s.concat(n(e-s.length))),s=s.concat(n(u-s.length+1+(s.length<e?e-s.length:0))),s=n(-u).concat(s);var c=u>0?u:0;return c<s.length-1&&s.splice(c+1,0,"."),this.sign+s.join("")},r.prototype.clone=function(){var e=new r("0");return e.sign=this.sign,e.coefficients=this.coefficients.slice(0),e.exponent=this.exponent,e},r.prototype.roundDigits=function(e){for(var t=this.clone(),r=t.coefficients;0>=e;)r.unshift(0),t.exponent++,e++;if(r.length>e){var n=r.splice(e,r.length-e);if(n[0]>=5){var i=e-1;for(r[i]++;10===r[i];)r.pop(),0===i&&(r.unshift(0),t.exponent++,i++),i--,r[i]++}}return t},e.exports=r},function(e,t,r){var n=r(9);t.mixin=function(e){var t=new n;return e.on=t.on.bind(t),e.off=t.off.bind(t),e.once=t.once.bind(t),e.emit=t.emit.bind(t),e}},function(e,t){function r(){}r.prototype={on:function(e,t,r){var n=this.e||(this.e={});return(n[e]||(n[e]=[])).push({fn:t,ctx:r}),this},once:function(e,t,r){function n(){i.off(e,n),t.apply(r,arguments)}var i=this;return n._=t,this.on(e,n,r)},emit:function(e){var t=[].slice.call(arguments,1),r=((this.e||(this.e={}))[e]||[]).slice(),n=0,i=r.length;for(n;i>n;n++)r[n].fn.apply(r[n].ctx,t);return this},off:function(e,t){var r=this.e||(this.e={}),n=r[e],i=[];if(n&&t)for(var a=0,o=n.length;o>a;a++)n[a].fn!==t&&n[a].fn._!==t&&i.push(n[a]);return i.length?r[e]=i:delete r[e],this}},e.exports=r},function(e,t,r){"use strict";function n(e,t,r,n,u){function c(e,t){var r=arguments.length;if(1!=r&&2!=r)throw new s("import",r,1,2);if(t||(t={}),a(e))h(e,t);else if(Array.isArray(e))e.forEach(function(e){c(e,t)});else if("object"==typeof e){for(var n in e)if(e.hasOwnProperty(n)){var i=e[n];m(i)?f(n,i,t):a(e)?h(e,t):c(i,t)}}else if(!t.silent)throw new TypeError("Factory, Object, or Array expected")}function f(e,t,r){if(r.wrap&&"function"==typeof t&&(t=p(t)),d(u[e])&&d(t))return t=r.override?n(e,t.signatures):n(u[e],t),u[e]=t,l(e,t),void u.emit("import",e,function(){return t});if(void 0===u[e]||r.override)return u[e]=t,l(e,t),void u.emit("import",e,function(){return t});if(!r.silent)throw new Error('Cannot import "'+e+'": already exists')}function l(e,t){t&&"function"==typeof t.transform&&(u.expression.transform[e]=t.transform)}function p(e){var t=function(){for(var t=[],r=0,n=arguments.length;n>r;r++){var i=arguments[r];t[r]=i&&i.valueOf()}return e.apply(u,t)};return e.transform&&(t.transform=e.transform),t}function h(e,t){if("string"==typeof e.name){var a=e.name,s=e.path?o(u,e.path):u,c=s.hasOwnProperty(a)?s[a]:void 0,f=function(){var i=r(e);if(d(c)&&d(i))return t.override||(i=n(c,i)),i;if(void 0===c||t.override)return i;if(!t.silent)throw new Error('Cannot import "'+a+'": already exists')};e.lazy!==!1?i(s,a,f):s[a]=f(),u.emit("import",a,f,e.path)}else r(e)}function m(e){return"function"==typeof e||"number"==typeof e||"string"==typeof e||"boolean"==typeof e||null===e||e&&e.isUnit===!0||e&&e.isComplex===!0||e&&e.isBigNumber===!0||e&&e.isFraction===!0||e&&e.isMatrix===!0||e&&Array.isArray(e)===!0}function d(e){return"function"==typeof e&&"object"==typeof e.signatures}return c}var i=r(3).lazy,a=r(3).isFactory,o=r(3).traverse,s=(r(3).extend,r(11));t.math=!0,t.name="import",t.factory=n,t.lazy=!0},function(e,t){"use strict";function r(e,t,n,i){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this.fn=e,this.count=t,this.min=n,this.max=i,this.message="Wrong number of arguments in function "+e+" ("+t+" provided, "+n+(void 0!=i?"-"+i:"")+" expected)",this.stack=(new Error).stack}r.prototype=new Error,r.prototype.constructor=Error,r.prototype.name="ArgumentsError",r.prototype.isArgumentsError=!0,e.exports=r},function(e,t,r){"use strict";function n(e,t,r,n,i){function a(e){if(e){var r=s.clone(t);o(e,"matrix",u),o(e,"number",c),s.deepExtend(t,e);var n=s.clone(t);return i.emit("config",n,r),n}return s.clone(t)}var u=["Matrix","Array"],c=["number","BigNumber","Fraction"];return a.MATRIX=u,a.NUMBER=c,a}function i(e,t){return-1!==e.indexOf(t)}function a(e,t){return e.map(function(e){return e.toLowerCase()}).indexOf(t.toLowerCase())}function o(e,t,r){if(void 0!==e[t]&&!i(r,e[t])){var n=a(r,e[t]);-1!==n?(console.warn('Warning: Wrong casing for configuration option "'+t+'", should be "'+r[n]+'" instead of "'+e[t]+'".'),e[t]=r[n]):console.warn('Warning: Unknown value "'+e[t]+'" for configuration option "'+t+'". Available options: '+r.map(JSON.stringify).join(", ")+".")}}var s=r(3);t.name="config",t.math=!0,t.factory=n},function(e,t,r){e.exports=[r(14),r(93),r(95),r(326),r(489),r(491)]},function(e,t,r){e.exports=[r(15),r(20),r(21),r(26),r(33),r(37),r(70),r(71),r(73),r(74)]},function(e,t,r){e.exports=[r(16),r(18)]},function(e,t,r){function n(e,t,r,n,a){var o=i.clone({precision:t.precision});return o.prototype.type="BigNumber",o.prototype.isBigNumber=!0,o.prototype.toJSON=function(){return{mathjs:"BigNumber",value:this.toString()}},o.fromJSON=function(e){return new o(e.value)},a.on("config",function(e,t){e.precision!==t.precision&&o.config({precision:e.precision})}),o}var i=r(17);t.name="BigNumber",t.path="type",t.factory=n,t.math=!0},function(e,t,r){var n;!function(i){"use strict";function a(e){var t,r,n,i=e.length-1,a="",o=e[0];if(i>0){for(a+=o,t=1;i>t;t++)n=e[t]+"",r=Re-n.length,r&&(a+=g(r)),a+=n;o=e[t],n=o+"",r=Re-n.length,r&&(a+=g(r))}else if(0===o)return"0";for(;o%10===0;)o/=10;return a+o}function o(e,t,r){if(e!==~~e||t>e||e>r)throw Error(_e+e)}function s(e,t,r,n){var i,a,o,s;for(a=e[0];a>=10;a/=10)--t;return--t<0?(t+=Re,i=0):(i=Math.ceil((t+1)/Re),t%=Re),a=Ce(10,Re-t),s=e[i]%a|0,null==n?3>t?(0==t?s=s/100|0:1==t&&(s=s/10|0),o=4>r&&99999==s||r>3&&49999==s||5e4==s||0==s):o=(4>r&&s+1==a||r>3&&s+1==a/2)&&(e[i+1]/a/100|0)==Ce(10,t-2)-1||(s==a/2||0==s)&&0==(e[i+1]/a/100|0):4>t?(0==t?s=s/1e3|0:1==t?s=s/100|0:2==t&&(s=s/10|0),o=(n||4>r)&&9999==s||!n&&r>3&&4999==s):o=((n||4>r)&&s+1==a||!n&&r>3&&s+1==a/2)&&(e[i+1]/a/1e3|0)==Ce(10,t-3)-1,o}function u(e,t,r){for(var n,i,a=[0],o=0,s=e.length;s>o;){for(i=a.length;i--;)a[i]*=t;for(a[0]+=xe.indexOf(e.charAt(o++)),n=0;n<a.length;n++)a[n]>r-1&&(void 0===a[n+1]&&(a[n+1]=0),a[n+1]+=a[n]/r|0,a[n]%=r)}return a.reverse()}function c(e,t){var r,n,i=t.d.length;32>i?(r=Math.ceil(i/3),n=Math.pow(4,-r).toString()):(r=16,n="2.3283064365386962890625e-10"),e.precision+=r,t=_(e,1,t.times(n),new e(1));for(var a=r;a--;){var o=t.times(t);t=o.times(o).minus(o).times(8).plus(1)}return e.precision-=r,t}function f(e,t,r,n){var i,a,o,s,u,c,f,l,p,h=e.constructor;e:if(null!=t){if(l=e.d,!l)return e;for(i=1,s=l[0];s>=10;s/=10)i++;if(a=t-i,0>a)a+=Re,o=t,f=l[p=0],u=f/Ce(10,i-o-1)%10|0;else if(p=Math.ceil((a+1)/Re),s=l.length,p>=s){if(!n)break e;for(;s++<=p;)l.push(0);f=u=0,i=1,a%=Re,o=a-Re+1}else{for(f=s=l[p],i=1;s>=10;s/=10)i++;a%=Re,o=a-Re+i,u=0>o?0:f/Ce(10,i-o-1)%10|0}if(n=n||0>t||void 0!==l[p+1]||(0>o?f:f%Ce(10,i-o-1)),c=4>r?(u||n)&&(0==r||r==(e.s<0?3:2)):u>5||5==u&&(4==r||n||6==r&&(a>0?o>0?f/Ce(10,i-o):0:l[p-1])%10&1||r==(e.s<0?8:7)),1>t||!l[0])return l.length=0,c?(t-=e.e+1,l[0]=Ce(10,(Re-t%Re)%Re),e.e=-t||0):l[0]=e.e=0,e;if(0==a?(l.length=p,s=1,p--):(l.length=p+1,s=Ce(10,Re-a),l[p]=o>0?(f/Ce(10,i-o)%Ce(10,o)|0)*s:0),c)for(;;){if(0==p){for(a=1,o=l[0];o>=10;o/=10)a++;for(o=l[0]+=s,s=1;o>=10;o/=10)s++;a!=s&&(e.e++,l[0]==Ie&&(l[0]=1));break}if(l[p]+=s,l[p]!=Ie)break;l[p--]=0,s=1}for(a=l.length;0===l[--a];)l.pop()}return Me&&(e.e>h.maxE?(e.d=null,e.e=NaN):e.e<h.minE&&(e.e=0,e.d=[0])),e}function l(e,t,r){if(!e.isFinite())return N(e);var n,i=e.e,o=a(e.d),s=o.length;return t?(r&&(n=r-s)>0?o=o.charAt(0)+"."+o.slice(1)+g(n):s>1&&(o=o.charAt(0)+"."+o.slice(1)),o=o+(e.e<0?"e":"e+")+e.e):0>i?(o="0."+g(-i-1)+o,r&&(n=r-s)>0&&(o+=g(n))):i>=s?(o+=g(i+1-s),r&&(n=r-i-1)>0&&(o=o+"."+g(n))):((n=i+1)<s&&(o=o.slice(0,n)+"."+o.slice(n)),r&&(n=r-s)>0&&(i+1===s&&(o+="."),o+=g(n))),o}function p(e,t){for(var r=1,n=e[0];n>=10;n/=10)r++;return r+t*Re-1}function h(e,t,r){if(t>Ue)throw Me=!0,r&&(e.precision=r),Error(Oe);return f(new e(be),t,1,!0)}function m(e,t,r){if(t>qe)throw Error(Oe);return f(new e(we),t,r,!0)}function d(e){var t=e.length-1,r=t*Re+1;if(t=e[t]){for(;t%10==0;t/=10)r--;for(t=e[0];t>=10;t/=10)r++}return r}function g(e){for(var t="";e--;)t+="0";return t}function v(e,t,r,n){var i,a=new e(1),o=Math.ceil(n/Re+4);for(Me=!1;;){if(r%2&&(a=a.times(t),C(a.d,o)&&(i=!0)),r=Te(r/2),0===r){r=a.d.length-1,i&&0===a.d[r]&&++a.d[r];break}t=t.times(t),C(t.d,o)}return Me=!0,a}function y(e){return 1&e.d[e.d.length-1]}function x(e,t,r){for(var n,i=new e(t[0]),a=0;++a<t.length;){if(n=new e(t[a]),!n.s){i=n;break}i[r](n)&&(i=n)}return i}function b(e,t){var r,n,i,o,u,c,l,p=0,h=0,m=0,d=e.constructor,g=d.rounding,v=d.precision;if(!e.d||!e.d[0]||e.e>17)return new d(e.d?e.d[0]?e.s<0?0:1/0:1:e.s?e.s<0?0:e:NaN);for(null==t?(Me=!1,l=v):l=t,c=new d(.03125);e.e>-2;)e=e.times(c),m+=5;for(n=Math.log(Ce(2,m))/Math.LN10*2+5|0,l+=n,r=o=u=new d(1),d.precision=l;;){if(o=f(o.times(e),l,1),r=r.times(++h),c=u.plus(je(o,r,l,1)),a(c.d).slice(0,l)===a(u.d).slice(0,l)){for(i=m;i--;)u=f(u.times(u),l,1);if(null!=t)return d.precision=v,u;if(!(3>p&&s(u.d,l-n,g,p)))return f(u,d.precision=v,g,Me=!0);d.precision=l+=10,r=o=c=new d(1),h=0,p++}u=c}}function w(e,t){var r,n,i,o,u,c,l,p,m,d,g,v=1,y=10,x=e,b=x.d,N=x.constructor,E=N.rounding,M=N.precision;if(x.s<0||!b||!b[0]||!x.e&&1==b[0]&&1==b.length)return new N(b&&!b[0]?-1/0:1!=x.s?NaN:b?0:x);if(null==t?(Me=!1,m=M):m=t,N.precision=m+=y,r=a(b),n=r.charAt(0),!(Math.abs(o=x.e)<15e14))return p=h(N,m+2,M).times(o+""),x=w(new N(n+"."+r.slice(1)),m-y).plus(p),N.precision=M,null==t?f(x,M,E,Me=!0):x;for(;7>n&&1!=n||1==n&&r.charAt(1)>3;)x=x.times(e),r=a(x.d),n=r.charAt(0),v++;for(o=x.e,n>1?(x=new N("0."+r),o++):x=new N(n+"."+r.slice(1)),d=x,l=u=x=je(x.minus(1),x.plus(1),m,1),g=f(x.times(x),m,1),i=3;;){if(u=f(u.times(g),m,1),p=l.plus(je(u,new N(i),m,1)),a(p.d).slice(0,m)===a(l.d).slice(0,m)){
if(l=l.times(2),0!==o&&(l=l.plus(h(N,m+2,M).times(o+""))),l=je(l,new N(v),m,1),null!=t)return N.precision=M,l;if(!s(l.d,m-y,E,c))return f(l,N.precision=M,E,Me=!0);N.precision=m+=y,p=u=x=je(d.minus(1),d.plus(1),m,1),g=f(x.times(x),m,1),i=c=1}l=p,i+=2}}function N(e){return String(e.s*e.s/0)}function E(e,t){var r,n,i;for((r=t.indexOf("."))>-1&&(t=t.replace(".","")),(n=t.search(/e/i))>0?(0>r&&(r=n),r+=+t.slice(n+1),t=t.substring(0,n)):0>r&&(r=t.length),n=0;48===t.charCodeAt(n);n++);for(i=t.length;48===t.charCodeAt(i-1);--i);if(t=t.slice(n,i)){if(i-=n,e.e=r=r-n-1,e.d=[],n=(r+1)%Re,0>r&&(n+=Re),i>n){for(n&&e.d.push(+t.slice(0,n)),i-=Re;i>n;)e.d.push(+t.slice(n,n+=Re));t=t.slice(n),n=Re-t.length}else n-=i;for(;n--;)t+="0";e.d.push(+t),Me&&(e.e>e.constructor.maxE?(e.d=null,e.e=NaN):e.e<e.constructor.minE&&(e.e=0,e.d=[0]))}else e.e=0,e.d=[0];return e}function M(e,t){var r,n,i,a,o,s,c,f,l;if("Infinity"===t||"NaN"===t)return+t||(e.s=NaN),e.e=NaN,e.d=null,e;if(ze.test(t))r=16,t=t.toLowerCase();else if(Se.test(t))r=2;else{if(!Be.test(t))throw Error(_e+t);r=8}for(a=t.search(/p/i),a>0?(c=+t.slice(a+1),t=t.substring(2,a)):t=t.slice(2),a=t.indexOf("."),o=a>=0,n=e.constructor,o&&(t=t.replace(".",""),s=t.length,a=s-a,i=v(n,new n(r),a,2*a)),f=u(t,r,Ie),l=f.length-1,a=l;0===f[a];--a)f.pop();return 0>a?new n(0*e.s):(e.e=p(f,l),e.d=f,Me=!1,o&&(e=je(e,i,4*s)),c&&(e=e.times(Math.abs(c)<54?Math.pow(2,c):Ne.pow(2,c))),Me=!0,e)}function A(e,t){var r,n=t.d.length;if(3>n)return _(e,2,t,t);r=1.4*Math.sqrt(n),r=r>16?16:0|r,t=t.times(Math.pow(5,-r)),t=_(e,2,t,t);for(var i,a=new e(5),o=new e(16),s=new e(20);r--;)i=t.times(t),t=t.times(a.plus(i.times(o.times(i).minus(s))));return t}function _(e,t,r,n,i){var a,o,s,u,c=1,f=e.precision,l=Math.ceil(f/Re);for(Me=!1,u=r.times(r),s=new e(n);;){if(o=je(s.times(u),new e(t++*t++),f,1),s=i?n.plus(o):n.minus(o),n=je(o.times(u),new e(t++*t++),f,1),o=s.plus(n),void 0!==o.d[l]){for(a=l;o.d[a]===s.d[a]&&a--;);if(-1==a)break}a=s,s=n,n=o,o=a,c++}return Me=!0,o.d.length=l+1,o}function O(e,t){var r,n=t.s<0,i=m(e,e.precision,1),a=i.times(.5);if(t=t.abs(),t.lte(a))return ge=n?4:1,t;if(r=t.divToInt(i),r.isZero())ge=n?3:2;else{if(t=t.minus(r.times(i)),t.lte(a))return ge=y(r)?n?2:3:n?4:1,t;ge=y(r)?n?1:4:n?3:2}return t.minus(i).abs()}function T(e,t,r,n){var i,a,s,c,f,p,h,m,d,g=e.constructor,v=void 0!==r;if(v?(o(r,1,ye),void 0===n?n=g.rounding:o(n,0,8)):(r=g.precision,n=g.rounding),e.isFinite()){for(h=l(e),s=h.indexOf("."),v?(i=2,16==t?r=4*r-3:8==t&&(r=3*r-2)):i=t,s>=0&&(h=h.replace(".",""),d=new g(1),d.e=h.length-s,d.d=u(l(d),10,i),d.e=d.d.length),m=u(h,10,i),a=f=m.length;0==m[--f];)m.pop();if(m[0]){if(0>s?a--:(e=new g(e),e.d=m,e.e=a,e=je(e,d,r,n,0,i),m=e.d,a=e.e,p=de),s=m[r],c=i/2,p=p||void 0!==m[r+1],p=4>n?(void 0!==s||p)&&(0===n||n===(e.s<0?3:2)):s>c||s===c&&(4===n||p||6===n&&1&m[r-1]||n===(e.s<0?8:7)),m.length=r,p)for(;++m[--r]>i-1;)m[r]=0,r||(++a,m.unshift(1));for(f=m.length;!m[f-1];--f);for(s=0,h="";f>s;s++)h+=xe.charAt(m[s]);if(v){if(f>1)if(16==t||8==t){for(s=16==t?4:3,--f;f%s;f++)h+="0";for(m=u(h,i,t),f=m.length;!m[f-1];--f);for(s=1,h="1.";f>s;s++)h+=xe.charAt(m[s])}else h=h.charAt(0)+"."+h.slice(1);h=h+(0>a?"p":"p+")+a}else if(0>a){for(;++a;)h="0"+h;h="0."+h}else if(++a>f)for(a-=f;a--;)h+="0";else f>a&&(h=h.slice(0,a)+"."+h.slice(a))}else h=v?"0p+0":"0";h=(16==t?"0x":2==t?"0b":8==t?"0o":"")+h}else h=N(e);return e.s<0?"-"+h:h}function C(e,t){return e.length>t?(e.length=t,!0):void 0}function S(e){return new this(e).abs()}function z(e){return new this(e).acos()}function B(e){return new this(e).acosh()}function k(e,t){return new this(e).plus(t)}function I(e){return new this(e).asin()}function R(e){return new this(e).asinh()}function P(e){return new this(e).atan()}function U(e){return new this(e).atanh()}function q(e,t){e=new this(e),t=new this(t);var r,n=this.precision,i=this.rounding,a=n+4;return e.s&&t.s?e.d||t.d?!t.d||e.isZero()?(r=t.s<0?m(this,n,i):new this(0),r.s=e.s):!e.d||t.isZero()?(r=m(this,a,1).times(.5),r.s=e.s):t.s<0?(this.precision=a,this.rounding=1,r=this.atan(je(e,t,a,1)),t=m(this,a,1),this.precision=n,this.rounding=i,r=e.s<0?r.minus(t):r.plus(t)):r=this.atan(je(e,t,a,1)):(r=m(this,a,1).times(t.s>0?.25:.75),r.s=e.s):r=new this(NaN),r}function L(e){return new this(e).cbrt()}function j(e){return f(e=new this(e),e.e+1,2)}function F(e){if(!e||"object"!=typeof e)throw Error(Ae+"Object expected");var t,r,n,i=["precision",1,ye,"rounding",0,8,"toExpNeg",-ve,0,"toExpPos",0,ve,"maxE",0,ve,"minE",-ve,0,"modulo",0,9];for(t=0;t<i.length;t+=3)if(void 0!==(n=e[r=i[t]])){if(!(Te(n)===n&&n>=i[t+1]&&n<=i[t+2]))throw Error(_e+r+": "+n);this[r]=n}if(e.hasOwnProperty(r="crypto"))if(void 0===(n=e[r]))this[r]=n;else{if(n!==!0&&n!==!1&&0!==n&&1!==n)throw Error(_e+r+": "+n);this[r]=!(!n||!Ee||!Ee.getRandomValues&&!Ee.randomBytes)}return this}function D(e){return new this(e).cos()}function $(e){return new this(e).cosh()}function G(e){function t(e){var r,n,i,a=this;if(!(a instanceof t))return new t(e);if(a.constructor=t,e instanceof t)return a.s=e.s,a.e=e.e,void(a.d=(e=e.d)?e.slice():e);if(i=typeof e,"number"===i){if(0===e)return a.s=0>1/e?-1:1,a.e=0,void(a.d=[0]);if(0>e?(e=-e,a.s=-1):a.s=1,e===~~e&&1e7>e){for(r=0,n=e;n>=10;n/=10)r++;return a.e=r,void(a.d=[e])}return 0*e!==0?(e||(a.s=NaN),a.e=NaN,void(a.d=null)):E(a,e.toString())}if("string"!==i)throw Error(_e+e);return 45===e.charCodeAt(0)?(e=e.slice(1),a.s=-1):a.s=1,ke.test(e)?E(a,e):M(a,e)}var r,n,i;if(t.prototype=Le,t.ROUND_UP=0,t.ROUND_DOWN=1,t.ROUND_CEIL=2,t.ROUND_FLOOR=3,t.ROUND_HALF_UP=4,t.ROUND_HALF_DOWN=5,t.ROUND_HALF_EVEN=6,t.ROUND_HALF_CEIL=7,t.ROUND_HALF_FLOOR=8,t.EUCLID=9,t.config=F,t.clone=G,t.abs=S,t.acos=z,t.acosh=B,t.add=k,t.asin=I,t.asinh=R,t.atan=P,t.atanh=U,t.atan2=q,t.cbrt=L,t.ceil=j,t.cos=D,t.cosh=$,t.div=H,t.exp=V,t.floor=Z,t.fromJSON=W,t.hypot=Y,t.ln=X,t.log=J,t.log10=K,t.log2=Q,t.max=ee,t.min=te,t.mod=re,t.mul=ne,t.pow=ie,t.random=ae,t.round=oe,t.sign=se,t.sin=ue,t.sinh=ce,t.sqrt=fe,t.sub=le,t.tan=pe,t.tanh=he,t.trunc=me,void 0===e&&(e={}),e)for(i=["precision","rounding","toExpNeg","toExpPos","maxE","minE","modulo","crypto"],r=0;r<i.length;)e.hasOwnProperty(n=i[r++])||(e[n]=this[n]);return t.config(e),t}function H(e,t){return new this(e).div(t)}function V(e){return new this(e).exp()}function Z(e){return f(e=new this(e),e.e+1,3)}function W(e){var t,r,n,i;if("string"!=typeof e||!e)throw Error(_e+e);if(n=e.length,i=xe.indexOf(e.charAt(0)),1===n)return new this(i>81?[-1/0,1/0,NaN][i-82]:i>40?-(i-41):i);if(64&i)r=16&i,t=r?(7&i)-3:(15&i)-7,n=1;else{if(2===n)return i=88*i+xe.indexOf(e.charAt(1)),new this(i>=2816?-(i-2816)-41:i+41);if(r=32&i,!(31&i))return e=u(e.slice(1),88,10).join(""),new this(r?"-"+e:e);t=15&i,n=t+1,t=1===t?xe.indexOf(e.charAt(1)):2===t?88*xe.indexOf(e.charAt(1))+xe.indexOf(e.charAt(2)):+u(e.slice(1,n),88,10).join(""),16&i&&(t=-t)}return e=u(e.slice(n),88,10).join(""),t=t-e.length+1,e=e+"e"+t,new this(r?"-"+e:e)}function Y(){var e,t,r=new this(0);for(Me=!1,e=0;e<arguments.length;)if(t=new this(arguments[e++]),t.d)r.d&&(r=r.plus(t.times(t)));else{if(t.s)return Me=!0,new this(1/0);r=t}return Me=!0,r.sqrt()}function X(e){return new this(e).ln()}function J(e,t){return new this(e).log(t)}function Q(e){return new this(e).log(2)}function K(e){return new this(e).log(10)}function ee(){return x(this,arguments,"lt")}function te(){return x(this,arguments,"gt")}function re(e,t){return new this(e).mod(t)}function ne(e,t){return new this(e).mul(t)}function ie(e,t){return new this(e).pow(t)}function ae(e){var t,r,n,i,a=0,s=new this(1),u=[];if(void 0===e?e=this.precision:o(e,1,ye),n=Math.ceil(e/Re),this.crypto===!1)for(;n>a;)u[a++]=1e7*Math.random()|0;else if(Ee&&Ee.getRandomValues)for(t=Ee.getRandomValues(new Uint32Array(n));n>a;)i=t[a],i>=429e7?t[a]=Ee.getRandomValues(new Uint32Array(1))[0]:u[a++]=i%1e7;else if(Ee&&Ee.randomBytes){for(t=Ee.randomBytes(n*=4);n>a;)i=t[a]+(t[a+1]<<8)+(t[a+2]<<16)+((127&t[a+3])<<24),i>=214e7?Ee.randomBytes(4).copy(t,a):(u.push(i%1e7),a+=4);a=n/4}else{if(this.crypto)throw Error(Ae+"crypto unavailable");for(;n>a;)u[a++]=1e7*Math.random()|0}for(n=u[--a],e%=Re,n&&e&&(i=Ce(10,Re-e),u[a]=(n/i|0)*i);0===u[a];a--)u.pop();if(0>a)r=0,u=[0];else{for(r=-1;0===u[0];r-=Re)u.shift();for(n=1,i=u[0];i>=10;i/=10)n++;Re>n&&(r-=Re-n)}return s.e=r,s.d=u,s}function oe(e){return f(e=new this(e),e.e+1,this.rounding)}function se(e){return e=new this(e),e.d?e.d[0]?e.s:0*e.s:e.s||NaN}function ue(e){return new this(e).sin()}function ce(e){return new this(e).sinh()}function fe(e){return new this(e).sqrt()}function le(e,t){return new this(e).sub(t)}function pe(e){return new this(e).tan()}function he(e){return new this(e).tanh()}function me(e){return f(e=new this(e),e.e+1,1)}var de,ge,ve=9e15,ye=1e9,xe="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%()*+,-./:;=?@[]^_`{|}~",be="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",we="3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",Ne={precision:20,rounding:4,modulo:1,toExpNeg:-7,toExpPos:21,minE:-ve,maxE:ve,crypto:void 0},Ee="undefined"!=typeof crypto?crypto:null,Me=!0,Ae="[DecimalError] ",_e=Ae+"Invalid argument: ",Oe=Ae+"Precision limit exceeded",Te=Math.floor,Ce=Math.pow,Se=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,ze=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,Be=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,ke=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,Ie=1e7,Re=7,Pe=9007199254740991,Ue=be.length-1,qe=we.length-1,Le={};Le.absoluteValue=Le.abs=function(){var e=new this.constructor(this);return e.s<0&&(e.s=1),f(e)},Le.ceil=function(){return f(new this.constructor(this),this.e+1,2)},Le.comparedTo=Le.cmp=function(e){var t,r,n,i,a=this,o=a.d,s=(e=new a.constructor(e)).d,u=a.s,c=e.s;if(!o||!s)return u&&c?u!==c?u:o===s?0:!o^0>u?1:-1:NaN;if(!o[0]||!s[0])return o[0]?u:s[0]?-c:0;if(u!==c)return u;if(a.e!==e.e)return a.e>e.e^0>u?1:-1;for(n=o.length,i=s.length,t=0,r=i>n?n:i;r>t;++t)if(o[t]!==s[t])return o[t]>s[t]^0>u?1:-1;return n===i?0:n>i^0>u?1:-1},Le.cosine=Le.cos=function(){var e,t,r=this,n=r.constructor;return r.d?r.d[0]?(e=n.precision,t=n.rounding,n.precision=e+Math.max(r.e,r.sd())+Re,n.rounding=1,r=c(n,O(n,r)),n.precision=e,n.rounding=t,f(2==ge||3==ge?r.neg():r,e,t,!0)):new n(1):new n(NaN)},Le.cubeRoot=Le.cbrt=function(){var e,t,r,n,i,o,s,u,c,l,p=this,h=p.constructor;if(!p.isFinite()||p.isZero())return new h(p);for(Me=!1,o=p.s*Math.pow(p.s*p,1/3),o&&Math.abs(o)!=1/0?n=new h(o.toString()):(r=a(p.d),e=p.e,(o=(e-r.length+1)%3)&&(r+=1==o||-2==o?"0":"00"),o=Math.pow(r,1/3),e=Te((e+1)/3)-(e%3==(0>e?-1:2)),o==1/0?r="5e"+e:(r=o.toExponential(),r=r.slice(0,r.indexOf("e")+1)+e),n=new h(r),n.s=p.s),s=(e=h.precision)+3;;)if(u=n,c=u.times(u).times(u),l=c.plus(p),n=je(l.plus(p).times(u),l.plus(c),s+2,1),a(u.d).slice(0,s)===(r=a(n.d)).slice(0,s)){if(r=r.slice(s-3,s+1),"9999"!=r&&(i||"4999"!=r)){+r&&(+r.slice(1)||"5"!=r.charAt(0))||(f(n,e+1,1),t=!n.times(n).times(n).eq(p));break}if(!i&&(f(u,e+1,0),u.times(u).times(u).eq(p))){n=u;break}s+=4,i=1}return Me=!0,f(n,e,h.rounding,t)},Le.decimalPlaces=Le.dp=function(){var e,t=this.d,r=NaN;if(t){if(e=t.length-1,r=(e-Te(this.e/Re))*Re,e=t[e])for(;e%10==0;e/=10)r--;0>r&&(r=0)}return r},Le.dividedBy=Le.div=function(e){return je(this,new this.constructor(e))},Le.dividedToIntegerBy=Le.divToInt=function(e){var t=this,r=t.constructor;return f(je(t,new r(e),0,1,1),r.precision,r.rounding)},Le.equals=Le.eq=function(e){return 0===this.cmp(e)},Le.floor=function(){return f(new this.constructor(this),this.e+1,3)},Le.greaterThan=Le.gt=function(e){return this.cmp(e)>0},Le.greaterThanOrEqualTo=Le.gte=function(e){var t=this.cmp(e);return 1==t||0===t},Le.hyperbolicCosine=Le.cosh=function(){var e,t,r,n,i,a=this,o=a.constructor,s=new o(1);if(!a.isFinite())return new o(a.s?1/0:NaN);if(a.isZero())return s;r=o.precision,n=o.rounding,o.precision=r+Math.max(a.e,a.sd())+4,o.rounding=1,i=a.d.length,32>i?(e=Math.ceil(i/3),t=Math.pow(4,-e).toString()):(e=16,t="2.3283064365386962890625e-10"),a=_(o,1,a.times(t),new o(1),!0);for(var u,c=e,l=new o(8);c--;)u=a.times(a),a=s.minus(u.times(l.minus(u.times(l))));return f(a,o.precision=r,o.rounding=n,!0)},Le.hyperbolicSine=Le.sinh=function(){var e,t,r,n,i=this,a=i.constructor;if(!i.isFinite()||i.isZero())return new a(i);if(t=a.precision,r=a.rounding,a.precision=t+Math.max(i.e,i.sd())+4,a.rounding=1,n=i.d.length,3>n)i=_(a,2,i,i,!0);else{e=1.4*Math.sqrt(n),e=e>16?16:0|e,i=i.times(Math.pow(5,-e)),i=_(a,2,i,i,!0);for(var o,s=new a(5),u=new a(16),c=new a(20);e--;)o=i.times(i),i=i.times(s.plus(o.times(u.times(o).plus(c))))}return a.precision=t,a.rounding=r,f(i,t,r,!0)},Le.hyperbolicTangent=Le.tanh=function(){var e,t,r=this,n=r.constructor;return r.isFinite()?r.isZero()?new n(r):(e=n.precision,t=n.rounding,n.precision=e+7,n.rounding=1,je(r.sinh(),r.cosh(),n.precision=e,n.rounding=t)):new n(r.s)},Le.inverseCosine=Le.acos=function(){var e,t=this,r=t.constructor,n=t.abs().cmp(1),i=r.precision,a=r.rounding;return-1!==n?0===n?t.isNeg()?m(r,i,a):new r(0):new r(NaN):t.isZero()?m(r,i+4,a).times(.5):(r.precision=i+6,r.rounding=1,t=t.asin(),e=m(r,i+4,a).times(.5),r.precision=i,r.rounding=a,e.minus(t))},Le.inverseHyperbolicCosine=Le.acosh=function(){var e,t,r=this,n=r.constructor;return r.lte(1)?new n(r.eq(1)?0:NaN):r.isFinite()?(e=n.precision,t=n.rounding,n.precision=e+Math.max(Math.abs(r.e),r.sd())+4,n.rounding=1,Me=!1,r=r.times(r).minus(1).sqrt().plus(r),Me=!0,n.precision=e,n.rounding=t,r.ln()):new n(r)},Le.inverseHyperbolicSine=Le.asinh=function(){var e,t,r=this,n=r.constructor;return!r.isFinite()||r.isZero()?new n(r):(e=n.precision,t=n.rounding,n.precision=e+2*Math.max(Math.abs(r.e),r.sd())+6,n.rounding=1,Me=!1,r=r.times(r).plus(1).sqrt().plus(r),Me=!0,n.precision=e,n.rounding=t,r.ln())},Le.inverseHyperbolicTangent=Le.atanh=function(){var e,t,r,n,i=this,a=i.constructor;return i.isFinite()?i.e>=0?new a(i.abs().eq(1)?i.s/0:i.isZero()?i:NaN):(e=a.precision,t=a.rounding,n=i.sd(),Math.max(n,e)<2*-i.e-1?f(new a(i),e,t,!0):(a.precision=r=n-i.e,i=je(i.plus(1),new a(1).minus(i),r+e,1),a.precision=e+4,a.rounding=1,i=i.ln(),a.precision=e,a.rounding=t,i.times(.5))):new a(NaN)},Le.inverseSine=Le.asin=function(){var e,t,r,n,i=this,a=i.constructor;return i.isZero()?new a(i):(t=i.abs().cmp(1),r=a.precision,n=a.rounding,-1!==t?0===t?(e=m(a,r+4,n).times(.5),e.s=i.s,e):new a(NaN):(a.precision=r+6,a.rounding=1,i=i.div(new a(1).minus(i.times(i)).sqrt().plus(1)).atan(),a.precision=r,a.rounding=n,i.times(2)))},Le.inverseTangent=Le.atan=function(){var e,t,r,n,i,a,o,s,u,c=this,l=c.constructor,p=l.precision,h=l.rounding;if(c.isFinite()){if(c.isZero())return new l(c);if(c.abs().eq(1)&&qe>=p+4)return o=m(l,p+4,h).times(.25),o.s=c.s,o}else{if(!c.s)return new l(NaN);if(qe>=p+4)return o=m(l,p+4,h).times(.5),o.s=c.s,o}for(l.precision=s=p+10,l.rounding=1,r=Math.min(28,s/Re+2|0),e=r;e;--e)c=c.div(c.times(c).plus(1).sqrt().plus(1));for(Me=!1,t=Math.ceil(s/Re),n=1,u=c.times(c),o=new l(c),i=c;-1!==e;)if(i=i.times(u),a=o.minus(i.div(n+=2)),i=i.times(u),o=a.plus(i.div(n+=2)),void 0!==o.d[t])for(e=t;o.d[e]===a.d[e]&&e--;);return r&&(o=o.times(2<<r-1)),Me=!0,f(o,l.precision=p,l.rounding=h,!0)},Le.isFinite=function(){return!!this.d},Le.isInteger=Le.isInt=function(){return!!this.d&&Te(this.e/Re)>this.d.length-2},Le.isNaN=function(){return!this.s},Le.isNegative=Le.isNeg=function(){return this.s<0},Le.isPositive=Le.isPos=function(){return this.s>0},Le.isZero=function(){return!!this.d&&0===this.d[0]},Le.lessThan=Le.lt=function(e){return this.cmp(e)<0},Le.lessThanOrEqualTo=Le.lte=function(e){return this.cmp(e)<1},Le.logarithm=Le.log=function(e){var t,r,n,i,o,u,c,l,p=this,m=p.constructor,d=m.precision,g=m.rounding,v=5;if(null==e)e=new m(10),t=!0;else{if(e=new m(e),r=e.d,e.s<0||!r||!r[0]||e.eq(1))return new m(NaN);t=e.eq(10)}if(r=p.d,p.s<0||!r||!r[0]||p.eq(1))return new m(r&&!r[0]?-1/0:1!=p.s?NaN:r?0:1/0);if(t)if(r.length>1)o=!0;else{for(i=r[0];i%10===0;)i/=10;o=1!==i}if(Me=!1,c=d+v,u=w(p,c),n=t?h(m,c+10):w(e,c),l=je(u,n,c,1),s(l.d,i=d,g))do if(c+=10,u=w(p,c),n=t?h(m,c+10):w(e,c),l=je(u,n,c,1),!o){+a(l.d).slice(i+1,i+15)+1==1e14&&(l=f(l,d+1,0));break}while(s(l.d,i+=10,g));return Me=!0,f(l,d,g)},Le.minus=Le.sub=function(e){var t,r,n,i,a,o,s,u,c,l,h,m,d=this,g=d.constructor;if(e=new g(e),!d.d||!e.d)return d.s&&e.s?d.d?e.s=-e.s:e=new g(e.d||d.s!==e.s?d:NaN):e=new g(NaN),e;if(d.s!=e.s)return e.s=-e.s,d.plus(e);if(c=d.d,m=e.d,s=g.precision,u=g.rounding,!c[0]||!m[0]){if(m[0])e.s=-e.s;else{if(!c[0])return new g(3===u?-0:0);e=new g(d)}return Me?f(e,s,u):e}if(r=Te(e.e/Re),l=Te(d.e/Re),c=c.slice(),a=l-r){for(h=0>a,h?(t=c,a=-a,o=m.length):(t=m,r=l,o=c.length),n=Math.max(Math.ceil(s/Re),o)+2,a>n&&(a=n,t.length=1),t.reverse(),n=a;n--;)t.push(0);t.reverse()}else{for(n=c.length,o=m.length,h=o>n,h&&(o=n),n=0;o>n;n++)if(c[n]!=m[n]){h=c[n]<m[n];break}a=0}for(h&&(t=c,c=m,m=t,e.s=-e.s),o=c.length,n=m.length-o;n>0;--n)c[o++]=0;for(n=m.length;n>a;){if(c[--n]<m[n]){for(i=n;i&&0===c[--i];)c[i]=Ie-1;--c[i],c[n]+=Ie}c[n]-=m[n]}for(;0===c[--o];)c.pop();for(;0===c[0];c.shift())--r;return c[0]?(e.d=c,e.e=p(c,r),Me?f(e,s,u):e):new g(3===u?-0:0)},Le.modulo=Le.mod=function(e){var t,r=this,n=r.constructor;return e=new n(e),!r.d||!e.s||e.d&&!e.d[0]?new n(NaN):!e.d||r.d&&!r.d[0]?f(new n(r),n.precision,n.rounding):(Me=!1,9==n.modulo?(t=je(r,e.abs(),0,3,1),t.s*=e.s):t=je(r,e,0,n.modulo,1),t=t.times(e),Me=!0,r.minus(t))},Le.naturalExponential=Le.exp=function(){return b(this)},Le.naturalLogarithm=Le.ln=function(){return w(this)},Le.negated=Le.neg=function(){var e=new this.constructor(this);return e.s=-e.s,f(e)},Le.plus=Le.add=function(e){var t,r,n,i,a,o,s,u,c,l,h=this,m=h.constructor;if(e=new m(e),!h.d||!e.d)return h.s&&e.s?h.d||(e=new m(e.d||h.s===e.s?h:NaN)):e=new m(NaN),e;if(h.s!=e.s)return e.s=-e.s,h.minus(e);if(c=h.d,l=e.d,s=m.precision,u=m.rounding,!c[0]||!l[0])return l[0]||(e=new m(h)),Me?f(e,s,u):e;if(a=Te(h.e/Re),n=Te(e.e/Re),c=c.slice(),i=a-n){for(0>i?(r=c,i=-i,o=l.length):(r=l,n=a,o=c.length),a=Math.ceil(s/Re),o=a>o?a+1:o+1,i>o&&(i=o,r.length=1),r.reverse();i--;)r.push(0);r.reverse()}for(o=c.length,i=l.length,0>o-i&&(i=o,r=l,l=c,c=r),t=0;i;)t=(c[--i]=c[i]+l[i]+t)/Ie|0,c[i]%=Ie;for(t&&(c.unshift(t),++n),o=c.length;0==c[--o];)c.pop();return e.d=c,e.e=p(c,n),Me?f(e,s,u):e},Le.precision=Le.sd=function(e){var t,r=this;if(void 0!==e&&e!==!!e&&1!==e&&0!==e)throw Error(_e+e);return r.d?(t=d(r.d),e&&r.e+1>t&&(t=r.e+1)):t=NaN,t},Le.round=function(){var e=this,t=e.constructor;return f(new t(e),e.e+1,t.rounding)},Le.sine=Le.sin=function(){var e,t,r=this,n=r.constructor;return r.isFinite()?r.isZero()?new n(r):(e=n.precision,t=n.rounding,n.precision=e+Math.max(r.e,r.sd())+Re,n.rounding=1,r=A(n,O(n,r)),n.precision=e,n.rounding=t,f(ge>2?r.neg():r,e,t,!0)):new n(NaN)},Le.squareRoot=Le.sqrt=function(){var e,t,r,n,i,o,s=this,u=s.d,c=s.e,l=s.s,p=s.constructor;if(1!==l||!u||!u[0])return new p(!l||0>l&&(!u||u[0])?NaN:u?s:1/0);for(Me=!1,l=Math.sqrt(+s),0==l||l==1/0?(t=a(u),(t.length+c)%2==0&&(t+="0"),l=Math.sqrt(t),c=Te((c+1)/2)-(0>c||c%2),l==1/0?t="1e"+c:(t=l.toExponential(),t=t.slice(0,t.indexOf("e")+1)+c),n=new p(t)):n=new p(l.toString()),r=(c=p.precision)+3;;)if(o=n,n=o.plus(je(s,o,r+2,1)).times(.5),a(o.d).slice(0,r)===(t=a(n.d)).slice(0,r)){if(t=t.slice(r-3,r+1),"9999"!=t&&(i||"4999"!=t)){+t&&(+t.slice(1)||"5"!=t.charAt(0))||(f(n,c+1,1),e=!n.times(n).eq(s));break}if(!i&&(f(o,c+1,0),o.times(o).eq(s))){n=o;break}r+=4,i=1}return Me=!0,f(n,c,p.rounding,e)},Le.tangent=Le.tan=function(){var e,t,r=this,n=r.constructor;return r.isFinite()?r.isZero()?new n(r):(e=n.precision,t=n.rounding,n.precision=e+10,n.rounding=1,r=r.sin(),r.s=1,r=je(r,new n(1).minus(r.times(r)).sqrt(),e+10,0),n.precision=e,n.rounding=t,f(2==ge||4==ge?r.neg():r,e,t,!0)):new n(NaN)},Le.times=Le.mul=function(e){var t,r,n,i,a,o,s,u,c,l=this,h=l.constructor,m=l.d,d=(e=new h(e)).d;if(e.s*=l.s,!(m&&m[0]&&d&&d[0]))return new h(!e.s||m&&!m[0]&&!d||d&&!d[0]&&!m?NaN:m&&d?0*e.s:e.s/0);for(r=Te(l.e/Re)+Te(e.e/Re),u=m.length,c=d.length,c>u&&(a=m,m=d,d=a,o=u,u=c,c=o),a=[],o=u+c,n=o;n--;)a.push(0);for(n=c;--n>=0;){for(t=0,i=u+n;i>n;)s=a[i]+d[n]*m[i-n-1]+t,a[i--]=s%Ie|0,t=s/Ie|0;a[i]=(a[i]+t)%Ie|0}for(;!a[--o];)a.pop();for(t?++r:a.shift(),n=a.length;!a[--n];)a.pop();return e.d=a,e.e=p(a,r),Me?f(e,h.precision,h.rounding):e},Le.toBinary=function(e,t){return T(this,2,e,t)},Le.toDecimalPlaces=Le.toDP=function(e,t){var r=this,n=r.constructor;return r=new n(r),void 0===e?r:(o(e,0,ye),void 0===t?t=n.rounding:o(t,0,8),f(r,e+r.e+1,t))},Le.toExponential=function(e,t){var r,n=this,i=n.constructor;return void 0===e?r=l(n,!0):(o(e,0,ye),void 0===t?t=i.rounding:o(t,0,8),n=f(new i(n),e+1,t),r=l(n,!0,e+1)),n.isNeg()&&!n.isZero()?"-"+r:r},Le.toFixed=function(e,t){var r,n,i=this,a=i.constructor;return void 0===e?r=l(i):(o(e,0,ye),void 0===t?t=a.rounding:o(t,0,8),n=f(new a(i),e+i.e+1,t),r=l(n,!1,e+n.e+1)),i.isNeg()&&!i.isZero()?"-"+r:r},Le.toFraction=function(e){var t,r,n,i,o,s,u,c,f,l,p,h,m=this,g=m.d,v=m.constructor;if(!g)return new v(m);if(f=r=new v(1),n=c=new v(0),t=new v(n),o=t.e=d(g)-m.e-1,s=o%Re,t.d[0]=Ce(10,0>s?Re+s:s),null==e)e=o>0?t:f;else{if(u=new v(e),!u.isInt()||u.lt(f))throw Error(_e+u);e=u.gt(t)?o>0?t:f:u}for(Me=!1,u=new v(a(g)),l=v.precision,v.precision=o=g.length*Re*2;p=je(u,t,0,1,1),i=r.plus(p.times(n)),1!=i.cmp(e);)r=n,n=i,i=f,f=c.plus(p.times(i)),c=i,i=t,t=u.minus(p.times(i)),u=i;return i=je(e.minus(r),n,0,1,1),c=c.plus(i.times(f)),r=r.plus(i.times(n)),c.s=f.s=m.s,h=je(f,n,o,1).minus(m).abs().cmp(je(c,r,o,1).minus(m).abs())<1?[f,n]:[c,r],v.precision=l,Me=!0,h},Le.toHexadecimal=Le.toHex=function(e,t){return T(this,16,e,t)},Le.toJSON=function(){var e,t,r,n,i,o,s,c,f=this,l=f.s<0;if(!f.d)return xe.charAt(f.s?l?82:83:84);if(t=f.e,1===f.d.length&&4>t&&t>=0&&(o=f.d[0],2857>o))return 41>o?xe.charAt(l?o+41:o):(o-=41,l&&(o+=2816),n=o/88|0,xe.charAt(n)+xe.charAt(o-88*n));if(c=a(f.d),s="",!l&&8>=t&&t>=-7)n=64+t+7;else if(l&&4>=t&&t>=-3)n=80+t+3;else if(c.length===t+1)n=32*l;else if(n=32*l+16*(0>t),t=Math.abs(t),88>t)n+=1,s=xe.charAt(t);else if(7744>t)n+=2,o=t/88|0,s=xe.charAt(o)+xe.charAt(t-88*o);else for(e=u(String(t),10,88),i=e.length,n+=i,r=0;i>r;r++)s+=xe.charAt(e[r]);for(s=xe.charAt(n)+s,e=u(c,10,88),i=e.length,r=0;i>r;r++)s+=xe.charAt(e[r]);return s},Le.toNearest=function(e,t){var r=this,n=r.constructor;if(r=new n(r),null==e){if(!r.d)return r;e=new n(1),t=n.rounding}else{if(e=new n(e),void 0!==t&&o(t,0,8),!r.d)return e.s?r:e;if(!e.d)return e.s&&(e.s=r.s),e}return e.d[0]?(Me=!1,4>t&&(t=[4,5,7,8][t]),r=je(r,e,0,t,1).times(e),Me=!0,f(r)):(e.s=r.s,r=e),r},Le.toNumber=function(){return+this},Le.toOctal=function(e,t){return T(this,8,e,t)},Le.toPower=Le.pow=function(e){var t,r,n,i,o,u,c,l=this,p=l.constructor,h=+(e=new p(e));if(!(l.d&&e.d&&l.d[0]&&e.d[0]))return new p(Ce(+l,h));if(l=new p(l),l.eq(1))return l;if(n=p.precision,o=p.rounding,e.eq(1))return f(l,n,o);if(t=Te(e.e/Re),r=e.d.length-1,c=t>=r,u=l.s,c){if((r=0>h?-h:h)<=Pe)return i=v(p,l,r,n),e.s<0?new p(1).div(i):f(i,n,o)}else if(0>u)return new p(NaN);return u=0>u&&1&e.d[Math.max(t,r)]?-1:1,r=Ce(+l,h),t=0!=r&&isFinite(r)?new p(r+"").e:Te(h*(Math.log("0."+a(l.d))/Math.LN10+l.e+1)),t>p.maxE+1||t<p.minE-1?new p(t>0?u/0:0):(Me=!1,p.rounding=l.s=1,r=Math.min(12,(t+"").length),i=b(e.times(w(l,n+r)),n),i=f(i,n+5,1),s(i.d,n,o)&&(t=n+10,i=f(b(e.times(w(l,t+r)),t),t+5,1),+a(i.d).slice(n+1,n+15)+1==1e14&&(i=f(i,n+1,0))),i.s=u,Me=!0,p.rounding=o,f(i,n,o))},Le.toPrecision=function(e,t){var r,n=this,i=n.constructor;return void 0===e?r=l(n,n.e<=i.toExpNeg||n.e>=i.toExpPos):(o(e,1,ye),void 0===t?t=i.rounding:o(t,0,8),n=f(new i(n),e,t),r=l(n,e<=n.e||n.e<=i.toExpNeg,e)),n.isNeg()&&!n.isZero()?"-"+r:r},Le.toSignificantDigits=Le.toSD=function(e,t){var r=this,n=r.constructor;return void 0===e?(e=n.precision,t=n.rounding):(o(e,1,ye),void 0===t?t=n.rounding:o(t,0,8)),f(new n(r),e,t)},Le.toString=function(){var e=this,t=e.constructor,r=l(e,e.e<=t.toExpNeg||e.e>=t.toExpPos);return e.isNeg()&&!e.isZero()?"-"+r:r},Le.truncated=Le.trunc=function(){return f(new this.constructor(this),this.e+1,1)},Le.valueOf=function(){var e=this,t=e.constructor,r=l(e,e.e<=t.toExpNeg||e.e>=t.toExpPos);return e.isNeg()?"-"+r:r};var je=function(){function e(e,t,r){var n,i=0,a=e.length;for(e=e.slice();a--;)n=e[a]*t+i,e[a]=n%r|0,i=n/r|0;return i&&e.unshift(i),e}function t(e,t,r,n){var i,a;if(r!=n)a=r>n?1:-1;else for(i=a=0;r>i;i++)if(e[i]!=t[i]){a=e[i]>t[i]?1:-1;break}return a}function r(e,t,r,n){for(var i=0;r--;)e[r]-=i,i=e[r]<t[r]?1:0,e[r]=i*n+e[r]-t[r];for(;!e[0]&&e.length>1;)e.shift()}return function(n,i,a,o,s,u){var c,l,p,h,m,d,g,v,y,x,b,w,N,E,M,A,_,O,T,C,S=n.constructor,z=n.s==i.s?1:-1,B=n.d,k=i.d;if(!(B&&B[0]&&k&&k[0]))return new S(n.s&&i.s&&(B?!k||B[0]!=k[0]:k)?B&&0==B[0]||!k?0*z:z/0:NaN);for(u?(m=1,l=n.e-i.e):(u=Ie,m=Re,l=Te(n.e/m)-Te(i.e/m)),T=k.length,_=B.length,y=new S(z),x=y.d=[],p=0;k[p]==(B[p]||0);p++);if(k[p]>(B[p]||0)&&l--,null==a?(E=a=S.precision,o=S.rounding):E=s?a+(n.e-i.e)+1:a,0>E)x.push(1),d=!0;else{if(E=E/m+2|0,p=0,1==T){for(h=0,k=k[0],E++;(_>p||h)&&E--;p++)M=h*u+(B[p]||0),x[p]=M/k|0,h=M%k|0;d=h||_>p}else{for(h=u/(k[0]+1)|0,h>1&&(k=e(k,h,u),B=e(B,h,u),T=k.length,_=B.length),A=T,b=B.slice(0,T),w=b.length;T>w;)b[w++]=0;C=k.slice(),C.unshift(0),O=k[0],k[1]>=u/2&&++O;do h=0,c=t(k,b,T,w),0>c?(N=b[0],T!=w&&(N=N*u+(b[1]||0)),h=N/O|0,h>1?(h>=u&&(h=u-1),g=e(k,h,u),v=g.length,w=b.length,c=t(g,b,v,w),1==c&&(h--,r(g,v>T?C:k,v,u))):(0==h&&(c=h=1),g=k.slice()),v=g.length,w>v&&g.unshift(0),r(b,g,w,u),-1==c&&(w=b.length,c=t(k,b,T,w),1>c&&(h++,r(b,w>T?C:k,w,u))),w=b.length):0===c&&(h++,b=[0]),x[p++]=h,c&&b[0]?b[w++]=B[A]||0:(b=[B[A]],w=1);while((A++<_||void 0!==b[0])&&E--);d=void 0!==b[0]}x[0]||x.shift()}if(1==m)y.e=l,de=d;else{for(p=1,h=x[0];h>=10;h/=10)p++;y.e=p+l*m-1,f(y,s?a+y.e+1:a,o,d)}return y}}();Ne=G(Ne),be=new Ne(be),we=new Ne(we),n=function(){return Ne}.call(t,r,t,e),!(void 0!==n&&(e.exports=n))}(this)},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("bignumber",{"":function(){return new e.BigNumber(0)},number:function(t){return new e.BigNumber(t+"")},string:function(t){return new e.BigNumber(t)},BigNumber:function(e){return e},Fraction:function(t){return new e.BigNumber(t.n).div(t.d)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={0:"0",1:"\\left(${args[0]}\\right)"},a}var i=r(19);t.name="bignumber",t.factory=n},function(e,t){"use strict";e.exports=function r(e,t,n){return e&&"function"==typeof e.map?e.map(function(e){return r(e,t,n)}):t(e)}},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("bool",{"":function(){return!1},"boolean":function(e){return e},number:function(e){return!!e},BigNumber:function(e){return!e.isZero()},string:function(e){var t=e.toLowerCase();if("true"===t)return!0;if("false"===t)return!1;var r=Number(e);if(""!=e&&!isNaN(r))return!!r;throw new Error('Cannot convert "'+e+'" to a boolean')},"Array | Matrix":function(e){return i(e,a)}});return a}var i=r(19);t.name="boolean",t.factory=n},function(e,t,r){e.exports=[r(22),r(25)]},function(e,t,r){"use strict";function n(e,t,r,n,o){function s(e){if(!(this instanceof s))throw new SyntaxError("Constructor must be called with the new operator");e&&e.isChain?this.value=e.value:this.value=e}function u(e,t){"function"==typeof t&&(s.prototype[e]=f(t))}function c(e,t){a(s.prototype,e,function(){var e=t();return"function"==typeof e?f(e):void 0})}function f(e){return function(){for(var t=[this.value],r=0;r<arguments.length;r++)t[r+1]=arguments[r];return new s(e.apply(e,t))}}return s.prototype.type="Chain",s.prototype.isChain=!0,s.prototype.done=function(){return this.value},s.prototype.valueOf=function(){return this.value},s.prototype.toString=function(){return i(this.value)},s.createProxy=function(e,t){if("string"==typeof e)u(e,t);else for(var r in e)e.hasOwnProperty(r)&&u(r,e[r])},s.createProxy(o),o.on("import",function(e,t,r){void 0===r&&c(e,t)}),s}var i=r(23).format,a=r(3).lazy;t.name="Chain",t.path="type",t.factory=n,t.math=!0,t.lazy=!1},function(e,t,r){"use strict";function n(e,r){if(Array.isArray(e)){for(var i="[",a=e.length,o=0;a>o;o++)0!=o&&(i+=", "),i+=n(e[o],r);return i+="]"}return t.format(e,r)}var i=r(6).format,a=r(24).format;t.isString=function(e){return"string"==typeof e},t.endsWith=function(e,t){var r=e.length-t.length,n=e.length;return e.substring(r,n)===t},t.format=function(e,r){if("number"==typeof e)return i(e,r);if(e&&e.isBigNumber===!0)return a(e,r);if(e&&e.isFraction===!0)return r&&"decimal"===r.fraction?e.toString():e.s*e.n+"/"+e.d;if(Array.isArray(e))return n(e,r);if(t.isString(e))return'"'+e+'"';if("function"==typeof e)return e.syntax?String(e.syntax):"function";if(e&&"object"==typeof e){if("function"==typeof e.format)return e.format(r);if(e&&e.toString()!=={}.toString())return e.toString();var o=[];for(var s in e)e.hasOwnProperty(s)&&o.push('"'+s+'": '+t.format(e[s],r));return"{"+o.join(", ")+"}"}return String(e)}},function(e,t){t.format=function(e,r){if("function"==typeof r)return r(e);if(!e.isFinite())return e.isNaN()?"NaN":e.gt(0)?"Infinity":"-Infinity";var n="auto",i=void 0;switch(void 0!==r&&(r.notation&&(n=r.notation),"number"==typeof r?i=r:r.precision&&(i=r.precision)),n){case"fixed":return t.toFixed(e,i);case"exponential":return t.toExponential(e,i);case"auto":var a=.001,o=1e5;r&&r.exponential&&(void 0!==r.exponential.lower&&(a=r.exponential.lower),void 0!==r.exponential.upper&&(o=r.exponential.upper));({toExpNeg:e.constructor.toExpNeg,toExpPos:e.constructor.toExpPos});if(e.constructor.config({toExpNeg:Math.round(Math.log(a)/Math.LN10),toExpPos:Math.round(Math.log(o)/Math.LN10)}),e.isZero())return"0";var s,u=e.abs();return s=u.gte(a)&&u.lt(o)?e.toSignificantDigits(i).toFixed():t.toExponential(e,i),s.replace(/((\.\d*?)(0+))($|e)/,function(){var e=arguments[2],t=arguments[4];return"."!==e?e+t:t});default:throw new Error('Unknown notation "'+n+'". Choose "auto", "exponential", or "fixed".')}},t.toExponential=function(e,t){return void 0!==t?e.toExponential(t-1):e.toExponential()},t.toFixed=function(e,t){return e.toFixed(t||0)}},function(e,t){"use strict";function r(e,t,r,n){return n("chain",{"":function(){return new e.Chain},any:function(t){
return new e.Chain(t)}})}t.name="chain",t.factory=r},function(e,t,r){e.exports=[r(27),r(31)]},function(e,t,r){function n(e,t,r,n,s){return i.prototype.type="Complex",i.prototype.isComplex=!0,i.prototype.toJSON=function(){return{mathjs:"Complex",re:this.re,im:this.im}},i.prototype.toPolar=function(){return{r:this.abs(),phi:this.arg()}},i.prototype.format=function(e){var t="",r=this.im,n=this.re,i=a(this.re,e),s=a(this.im,e),u=o(e)?e:e?e.precision:null;if(null!==u){var c=Math.pow(10,-u);Math.abs(n/r)<c&&(n=0),Math.abs(r/n)<c&&(r=0)}return t=0==r?i:0==n?1==r?"i":-1==r?"-i":s+"i":r>0?1==r?i+" + i":i+" + "+s+"i":-1==r?i+" - i":i+" - "+s.substring(1)+"i"},i.fromPolar=function(e){switch(arguments.length){case 1:var t=arguments[0];if("object"==typeof t)return i(t);throw new TypeError("Input has to be an object with r and phi keys.");case 2:var r=arguments[0],n=arguments[1];if(o(r)){if(n&&n.isUnit&&n.hasBase("ANGLE")&&(n=n.toNumber("rad")),o(n))return new i({r:r,phi:n});throw new TypeError("Phi is not a number nor an angle unit.")}throw new TypeError("Radius r is not a number.");default:throw new SyntaxError("Wrong number of arguments in function fromPolar")}},i.prototype.valueOf=i.prototype.toString,i.fromJSON=function(e){return new i(e)},i.EPSILON=t.epsilon,s.on("config",function(e,t){e.epsilon!==t.epsilon&&(i.EPSILON=e.epsilon)}),i}var i=r(28),a=r(6).format,o=r(6).isNumber;t.name="Complex",t.path="type",t.factory=n,t.math=!0},function(e,t,r){var n,i;(function(e){/**
	 * @license Complex.js v2.0.1 11/02/2016
	 *
	 * Copyright (c) 2016, Robert Eisele (robert@xarg.org)
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 **/
!function(a){"use strict";function o(e,t){var r=Math.abs(e),n=Math.abs(t);return 0===e?Math.log(n):0===t?Math.log(r):3e3>r&&3e3>n?.5*Math.log(e*e+t*t):Math.log(e/Math.cos(Math.atan2(t,e)))}function s(e,t){return this instanceof s?(f(e,t),this.re=u.re,void(this.im=u.im)):new s(e,t)}var u={re:0,im:0};Math.cosh=Math.cosh||function(e){return.5*(Math.exp(e)+Math.exp(-e))},Math.sinh=Math.sinh||function(e){return.5*(Math.exp(e)-Math.exp(-e))};var c=function(){throw SyntaxError("Invalid Param")},f=function(e,t){if(void 0===e||null===e)u.re=u.im=0;else if(void 0!==t)u.re=e,u.im=t;else switch(typeof e){case"object":"im"in e&&"re"in e?(u.re=e.re,u.im=e.im):"abs"in e&&"arg"in e?(u.re=e.abs*Math.cos(e.arg),u.im=e.abs*Math.sin(e.arg)):"r"in e&&"phi"in e?(u.re=e.r*Math.cos(e.phi),u.im=e.r*Math.sin(e.phi)):c();break;case"string":u.im=u.re=0;var r=e.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g),n=1,i=0;null===r&&c();for(var a=0;a<r.length;a++){var o=r[a];" "===o||"	"===o||"\n"===o||("+"===o?n++:"-"===o?i++:"i"===o||"I"===o?(n+i===0&&c()," "===r[a+1]||isNaN(r[a+1])?u.im+=parseFloat((i%2?"-":"")+"1"):(u.im+=parseFloat((i%2?"-":"")+r[a+1]),a++),n=i=0):((n+i===0||isNaN(o))&&c(),"i"===r[a+1]||"I"===r[a+1]?(u.im+=parseFloat((i%2?"-":"")+o),a++):u.re+=parseFloat((i%2?"-":"")+o),n=i=0))}n+i>0&&c();break;case"number":u.im=0,u.re=e;break;default:c()}isNaN(u.re)||isNaN(u.im)};s.prototype={re:0,im:0,sign:function(){var e=this.abs();return new s(this.re/e,this.im/e)},add:function(e,t){return f(e,t),new s(this.re+u.re,this.im+u.im)},sub:function(e,t){return f(e,t),new s(this.re-u.re,this.im-u.im)},mul:function(e,t){return f(e,t),0===u.im&&0===this.im?new s(this.re*u.re,0):new s(this.re*u.re-this.im*u.im,this.re*u.im+this.im*u.re)},div:function(e,t){f(e,t),e=this.re,t=this.im;var r,n,i=u.re,a=u.im;return 0===i&&0===a?new s(0!==e?e/0:0,0!==t?t/0:0):0===a?new s(e/i,t/i):Math.abs(i)<Math.abs(a)?(n=i/a,r=i*n+a,new s((e*n+t)/r,(t*n-e)/r)):(n=a/i,r=a*n+i,new s((e+t*n)/r,(t-e*n)/r))},pow:function(e,t){if(f(e,t),e=this.re,t=this.im,0===e&&0===t)return new s(0,0);var r=Math.atan2(t,e),n=o(e,t);if(0===u.im){if(0===t&&e>=0)return new s(Math.pow(e,u.re),0);if(0===e)switch(u.re%4){case 0:return new s(Math.pow(t,u.re),0);case 1:return new s(0,Math.pow(t,u.re));case 2:return new s(-Math.pow(t,u.re),0);case 3:return new s(0,-Math.pow(t,u.re))}}return e=Math.exp(u.re*n-u.im*r),t=u.im*n+u.re*r,new s(e*Math.cos(t),e*Math.sin(t))},sqrt:function(){var e,t,r=this.re,n=this.im,i=this.abs();return r>=0&&0===n?new s(Math.sqrt(r),0):(e=r>=0?.5*Math.sqrt(2*(i+r)):Math.abs(n)/Math.sqrt(2*(i-r)),t=0>=r?.5*Math.sqrt(2*(i-r)):Math.abs(n)/Math.sqrt(2*(i+r)),new s(e,n>=0?t:-t))},exp:function(){var e=Math.exp(this.re);return 0===this.im,new s(e*Math.cos(this.im),e*Math.sin(this.im))},log:function(){var e=this.re,t=this.im;return new s(o(e,t),Math.atan2(t,e))},abs:function(){var e=Math.abs(this.re),t=Math.abs(this.im);return 3e3>e&&3e3>t?Math.sqrt(e*e+t*t):(t>e?(e=t,t=this.re/this.im):t=this.im/this.re,e*Math.sqrt(1+t*t))},arg:function(){return Math.atan2(this.im,this.re)},sin:function(){var e=this.re,t=this.im;return new s(Math.sin(e)*Math.cosh(t),Math.cos(e)*Math.sinh(t))},cos:function(){var e=this.re,t=this.im;return new s(Math.cos(e)*Math.cosh(t),-Math.sin(e)*Math.sinh(t))},tan:function(){var e=2*this.re,t=2*this.im,r=Math.cos(e)+Math.cosh(t);return new s(Math.sin(e)/r,Math.sinh(t)/r)},cot:function(){var e=2*this.re,t=2*this.im,r=Math.cos(e)-Math.cosh(t);return new s(-Math.sin(e)/r,Math.sinh(t)/r)},sec:function(){var e=this.re,t=this.im,r=.5*Math.cosh(2*t)+.5*Math.cos(2*e);return new s(Math.cos(e)*Math.cosh(t)/r,Math.sin(e)*Math.sinh(t)/r)},csc:function(){var e=this.re,t=this.im,r=.5*Math.cosh(2*t)-.5*Math.cos(2*e);return new s(Math.sin(e)*Math.cosh(t)/r,-Math.cos(e)*Math.sinh(t)/r)},asin:function(){var e=this.re,t=this.im,r=new s(t*t-e*e+1,-2*e*t).sqrt(),n=new s(r.re-t,r.im+e).log();return new s(n.im,-n.re)},acos:function(){var e=this.re,t=this.im,r=new s(t*t-e*e+1,-2*e*t).sqrt(),n=new s(r.re-t,r.im+e).log();return new s(Math.PI/2-n.im,n.re)},atan:function(){var e=this.re,t=this.im;if(0===e){if(1===t)return new s(0,1/0);if(-1===t)return new s(0,-(1/0))}var r=e*e+(1-t)*(1-t),n=new s((1-t*t-e*e)/r,-2*e/r).log();return new s(-.5*n.im,.5*n.re)},acot:function(){var e=this.re,t=this.im;if(0===t)return new s(Math.atan2(1,e),0);var r=e*e+t*t;return 0!==r?new s(e/r,-t/r).atan():new s(0!==e?e/0:0,0!==t?-t/0:0).atan()},asec:function(){var e=this.re,t=this.im;if(0===e&&0===t)return new s(0,1/0);var r=e*e+t*t;return 0!==r?new s(e/r,-t/r).acos():new s(0!==e?e/0:0,0!==t?-t/0:0).acos()},acsc:function(){var e=this.re,t=this.im;if(0===e&&0===t)return new s(Math.PI/2,1/0);var r=e*e+t*t;return 0!==r?new s(e/r,-t/r).asin():new s(0!==e?e/0:0,0!==t?-t/0:0).asin()},sinh:function(){var e=this.re,t=this.im;return new s(Math.sinh(e)*Math.cos(t),Math.cosh(e)*Math.sin(t))},cosh:function(){var e=this.re,t=this.im;return new s(Math.cosh(e)*Math.cos(t),Math.sinh(e)*Math.sin(t))},tanh:function(){var e=2*this.re,t=2*this.im,r=Math.cosh(e)+Math.cos(t);return new s(Math.sinh(e)/r,Math.sin(t)/r)},coth:function(){var e=2*this.re,t=2*this.im,r=Math.cosh(e)-Math.cos(t);return new s(Math.sinh(e)/r,-Math.sin(t)/r)},csch:function(){var e=this.re,t=this.im,r=Math.cos(2*t)-Math.cosh(2*e);return new s(-2*Math.sinh(e)*Math.cos(t)/r,2*Math.cosh(e)*Math.sin(t)/r)},sech:function(){var e=this.re,t=this.im,r=Math.cos(2*t)+Math.cosh(2*e);return new s(2*Math.cosh(e)*Math.cos(t)/r,-2*Math.sinh(e)*Math.sin(t)/r)},asinh:function(){var e=this.im;this.im=-this.re,this.re=e;var t=this.asin();return this.re=-this.im,this.im=e,e=t.re,t.re=-t.im,t.im=e,t},acosh:function(){var e,t=this.acos();return t.im<=0?(e=t.re,t.re=-t.im,t.im=e):(e=t.im,t.im=-t.re,t.re=e),t},atanh:function(){var e=this.re,t=this.im,r=e>1&&0===t,n=1-e,i=1+e,a=n*n+t*t,u=0!==a?new s((i*n-t*t)/a,(t*n+i*t)/a):new s(-1!==e?e/0:0,0!==t?t/0:0),c=u.re;return u.re=o(u.re,u.im)/2,u.im=Math.atan2(u.im,c)/2,r&&(u.im=-u.im),u},acoth:function(){var e=this.re,t=this.im;if(0===e&&0===t)return new s(0,Math.PI/2);var r=e*e+t*t;return 0!==r?new s(e/r,-t/r).atanh():new s(0!==e?e/0:0,0!==t?-t/0:0).atanh()},acsch:function(){var e=this.re,t=this.im;if(0===t)return new s(0!==e?Math.log(e+Math.sqrt(e*e+1)):1/0,0);var r=e*e+t*t;return 0!==r?new s(e/r,-t/r).asinh():new s(0!==e?e/0:0,0!==t?-t/0:0).asinh()},asech:function(){var e=this.re,t=this.im;if(0===e&&0===t)return new s(1/0,0);var r=e*e+t*t;return 0!==r?new s(e/r,-t/r).acosh():new s(0!==e?e/0:0,0!==t?-t/0:0).acosh()},inverse:function(){var e=this.re,t=this.im,r=e*e+t*t;return new s(0!==e?e/r:0,0!==t?-t/r:0)},conjugate:function(){return new s(this.re,-this.im)},neg:function(){return new s(-this.re,-this.im)},ceil:function(e){return e=Math.pow(10,e||0),new s(Math.ceil(this.re*e)/e,Math.ceil(this.im*e)/e)},floor:function(e){return e=Math.pow(10,e||0),new s(Math.floor(this.re*e)/e,Math.floor(this.im*e)/e)},round:function(e){return e=Math.pow(10,e||0),new s(Math.round(this.re*e)/e,Math.round(this.im*e)/e)},equals:function(e,t){return f(e,t),Math.abs(u.re-this.re)<=s.EPSILON&&Math.abs(u.im-this.im)<=s.EPSILON},clone:function(){return new s(this.re,this.im)},toString:function(){var e=this.re,t=this.im,r="";return isNaN(e)||isNaN(t)?"NaN":(0!==e&&(r+=e),0!==t&&(0!==e?r+=0>t?" - ":" + ":0>t&&(r+="-"),t=Math.abs(t),1!==t&&(r+=t),r+="i"),r?r:"0")},toVector:function(){return[this.re,this.im]},valueOf:function(){return 0===this.im?this.re:null},isNaN:function(){return isNaN(this.re)||isNaN(this.im)}},s.ZERO=new s(0,0),s.ONE=new s(1,0),s.I=new s(0,1),s.PI=new s(Math.PI,0),s.E=new s(Math.E,0),s.EPSILON=1e-16,r(30).amd?(n=[],i=function(){return s}.apply(t,n),!(void 0!==i&&(e.exports=i))):e.exports=s}(this)}).call(t,r(29)(e))},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},function(e,t,r){"use strict";function n(e,t,n,a){var o=r(32),s=a("complex",{"":function(){return e.Complex.ZERO},number:function(t){return new e.Complex(t,0)},"number, number":function(t,r){return new e.Complex(t,r)},"BigNumber, BigNumber":function(t,r){return new e.Complex(t.toNumber(),r.toNumber())},Complex:function(e){return e.clone()},string:function(t){return e.Complex(t)},Object:function(t){if("re"in t&&"im"in t)return new e.Complex(t.re,t.im);if("r"in t&&"phi"in t)return new e.Complex(t);throw new Error("Expected object with either properties re and im, or properties r and phi.")},"Array | Matrix":function(e){return i(e,s)}});return s.toTex={0:"0",1:"\\left(${args[0]}\\right)",2:"\\left(\\left(${args[0]}\\right)+"+o.symbols.i+"\\cdot\\left(${args[1]}\\right)\\right)"},s}var i=r(19);t.name="complex",t.factory=n},function(e,t){"use strict";t.symbols={Alpha:"A",alpha:"\\alpha",Beta:"B",beta:"\\beta",Gamma:"\\Gamma",gamma:"\\gamma",Delta:"\\Delta",delta:"\\delta",Epsilon:"E",epsilon:"\\epsilon",varepsilon:"\\varepsilon",Zeta:"Z",zeta:"\\zeta",Eta:"H",eta:"\\eta",Theta:"\\Theta",theta:"\\theta",vartheta:"\\vartheta",Iota:"I",iota:"\\iota",Kappa:"K",kappa:"\\kappa",varkappa:"\\varkappa",Lambda:"\\Lambda",lambda:"\\lambda",Mu:"M",mu:"\\mu",Nu:"N",nu:"\\nu",Xi:"\\Xi",xi:"\\xi",Omicron:"O",omicron:"o",Pi:"\\Pi",pi:"\\pi",varpi:"\\varpi",Rho:"P",rho:"\\rho",varrho:"\\varrho",Sigma:"\\Sigma",sigma:"\\sigma",varsigma:"\\varsigma",Tau:"T",tau:"\\tau",Upsilon:"\\Upsilon",upsilon:"\\upsilon",Phi:"\\Phi",phi:"\\phi",varphi:"\\varphi",Chi:"X",chi:"\\chi",Psi:"\\Psi",psi:"\\psi",Omega:"\\Omega",omega:"\\omega","true":"\\mathrm{True}","false":"\\mathrm{False}",i:"i",inf:"\\infty",Inf:"\\infty",infinity:"\\infty",Infinity:"\\infty",oo:"\\infty",lim:"\\lim",undefined:"\\mathbf{?}"},t.operators={transpose:"^\\top",factorial:"!",pow:"^",dotPow:".^\\wedge",unaryPlus:"+",unaryMinus:"-",bitNot:"~",not:"\\neg",multiply:"\\cdot",divide:"\\frac",dotMultiply:".\\cdot",dotDivide:".:",mod:"\\mod",add:"+",subtract:"-",to:"\\rightarrow",leftShift:"<<",rightArithShift:">>",rightLogShift:">>>",equal:"=",unequal:"\\neq",smaller:"<",larger:">",smallerEq:"\\leq",largerEq:"\\geq",bitAnd:"\\&",bitXor:"\\underline{|}",bitOr:"|",and:"\\wedge",xor:"\\veebar",or:"\\vee"},t.defaultTemplate="\\mathrm{${name}}\\left(${args}\\right)";var r={deg:"^\\circ"};t.toSymbol=function(e,n){if(n="undefined"==typeof n?!1:n)return r.hasOwnProperty(e)?r[e]:"\\mathrm{"+e+"}";if(t.symbols.hasOwnProperty(e))return t.symbols[e];if(-1!==e.indexOf("_")){var i=e.indexOf("_");return t.toSymbol(e.substring(0,i))+"_{"+t.toSymbol(e.substring(i+1))+"}"}return e}},function(e,t,r){e.exports=[r(34),r(36)]},function(e,t,r){function n(e,t,r,n){return i}var i=r(35);i.prototype.type="Fraction",i.prototype.isFraction=!0,i.prototype.toJSON=function(){return{mathjs:"Fraction",n:this.s*this.n,d:this.d}},i.fromJSON=function(e){return new i(e)},t.name="Fraction",t.path="type",t.factory=n},function(e,t,r){var n,i;(function(e){/**
	 * @license Fraction.js v3.3.1 09/09/2015
	 * http://www.xarg.org/2014/03/precise-calculations-in-javascript/
	 *
	 * Copyright (c) 2015, Robert Eisele (robert@xarg.org)
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 **/
!function(a){"use strict";function o(e,t){return isNaN(e=parseInt(e,10))&&s(),e*t}function s(){throw"Invalid Param"}function u(e,t){return this instanceof u?(l(e,t),e=u.REDUCE?d(f.d,f.n):1,this.s=f.s,this.n=f.n/e,void(this.d=f.d/e)):new u(e,t)}var c=2e3,f={s:1,n:0,d:1},l=function(e,t){var r,n=0,i=1,a=1,u=0,c=0,l=0,p=1,h=1,m=0,d=1,g=1,v=1,y=1e7;if(void 0===e||null===e);else if(void 0!==t)n=e,i=t,a=n*i;else switch(typeof e){case"object":"d"in e&&"n"in e?(n=e.n,i=e.d,"s"in e&&(n*=e.s)):0 in e?(n=e[0],1 in e&&(i=e[1])):s(),a=n*i;break;case"number":if(0>e&&(a=e,e=-e),e%1===0)n=e;else if(e>0){for(e>=1&&(h=Math.pow(10,Math.floor(1+Math.log(e)/Math.LN10)),e/=h);y>=d&&y>=v;){if(r=(m+g)/(d+v),e===r){y>=d+v?(n=m+g,i=d+v):v>d?(n=g,i=v):(n=m,i=d);break}e>r?(m+=g,d+=v):(g+=m,v+=d),d>y?(n=g,i=v):(n=m,i=d)}n*=h}else(isNaN(e)||isNaN(t))&&(i=n=NaN);break;case"string":if(d=e.match(/\d+|./g),"-"===d[m]?(a=-1,m++):"+"===d[m]&&m++,d.length===m+1?c=o(d[m++],a):"."===d[m+1]||"."===d[m]?("."!==d[m]&&(u=o(d[m++],a)),m++,(m+1===d.length||"("===d[m+1]&&")"===d[m+3]||"'"===d[m+1]&&"'"===d[m+3])&&(c=o(d[m],a),p=Math.pow(10,d[m].length),m++),("("===d[m]&&")"===d[m+2]||"'"===d[m]&&"'"===d[m+2])&&(l=o(d[m+1],a),h=Math.pow(10,d[m+1].length)-1,m+=3)):"/"===d[m+1]||":"===d[m+1]?(c=o(d[m],a),p=o(d[m+2],1),m+=3):"/"===d[m+3]&&" "===d[m+1]&&(u=o(d[m],a),c=o(d[m+2],a),p=o(d[m+4],1),m+=5),d.length<=m){i=p*h,a=n=l+i*u+h*c;break}default:s()}if(0===i)throw"DIV/0";f.s=0>a?-1:1,f.n=Math.abs(n),f.d=Math.abs(i)},p=function(e,t,r){for(var n=1;t>0;e=e*e%r,t>>=1)1&t&&(n=n*e%r);return n},h=function(e,t){for(;t%2===0;t/=2);for(;t%5===0;t/=5);if(1===t)return 0;for(var r=10%t,n=1;1!==r;n++)if(r=10*r%t,n>c)return 0;return n},m=function(e,t,r){for(var n=1,i=p(10,r,t),a=0;300>a;a++){if(n===i)return a;n=10*n%t,i=10*i%t}return 0},d=function(e,t){if(!e)return t;if(!t)return e;for(;;){if(e%=t,!e)return t;if(t%=e,!t)return e}};u.REDUCE=1,u.prototype={s:1,n:0,d:1,abs:function(){return new u(this.n,this.d)},neg:function(){return new u(-this.s*this.n,this.d)},add:function(e,t){return l(e,t),new u(this.s*this.n*f.d+f.s*this.d*f.n,this.d*f.d)},sub:function(e,t){return l(e,t),new u(this.s*this.n*f.d-f.s*this.d*f.n,this.d*f.d)},mul:function(e,t){return l(e,t),new u(this.s*f.s*this.n*f.n,this.d*f.d)},div:function(e,t){return l(e,t),new u(this.s*f.s*this.n*f.d,this.d*f.n)},clone:function(){return new u(this)},mod:function(e,t){return isNaN(this.n)||isNaN(this.d)?new u(NaN):void 0===e?new u(this.s*this.n%this.d,1):(l(e,t),0===f.n&&0===this.d&&u(0,0),new u(this.s*f.d*this.n%(f.n*this.d),f.d*this.d))},gcd:function(e,t){return l(e,t),new u(d(f.n,this.n),f.d*this.d/d(f.d,this.d))},lcm:function(e,t){return l(e,t),0===f.n&&0===this.n?new u:new u(f.n*this.n/d(f.n,this.n),d(f.d,this.d))},ceil:function(e){return e=Math.pow(10,e||0),isNaN(this.n)||isNaN(this.d)?new u(NaN):new u(Math.ceil(e*this.s*this.n/this.d),e)},floor:function(e){return e=Math.pow(10,e||0),isNaN(this.n)||isNaN(this.d)?new u(NaN):new u(Math.floor(e*this.s*this.n/this.d),e)},round:function(e){return e=Math.pow(10,e||0),isNaN(this.n)||isNaN(this.d)?new u(NaN):new u(Math.round(e*this.s*this.n/this.d),e)},inverse:function(){return new u(this.s*this.d,this.n)},pow:function(e){return 0>e?new u(Math.pow(this.s*this.d,-e),Math.pow(this.n,-e)):new u(Math.pow(this.s*this.n,e),Math.pow(this.d,e))},equals:function(e,t){return l(e,t),this.s*this.n*f.d===f.s*f.n*this.d},compare:function(e,t){l(e,t);var r=this.s*this.n*f.d-f.s*f.n*this.d;return(r>0)-(0>r)},divisible:function(e,t){return l(e,t),!(!(f.n*this.d)||this.n*f.d%(f.n*this.d))},valueOf:function(){return this.s*this.n/this.d},toFraction:function(e){var t,r="",n=this.n,i=this.d;return this.s<0&&(r+="-"),1===i?r+=n:(e&&(t=Math.floor(n/i))>0&&(r+=t,r+=" ",n%=i),r+=n,r+="/",r+=i),r},toLatex:function(e){var t,r="",n=this.n,i=this.d;return this.s<0&&(r+="-"),1===i?r+=n:(e&&(t=Math.floor(n/i))>0&&(r+=t,n%=i),r+="\\frac{",r+=n,r+="}{",r+=i,r+="}"),r},toContinued:function(){var e,t=this.n,r=this.d,n=[];do n.push(Math.floor(t/r)),e=t%r,t=r,r=e;while(1!==t);return n},toString:function(){var e,t=this.n,r=this.d;if(isNaN(t)||isNaN(r))return"NaN";u.REDUCE||(e=d(t,r),t/=e,r/=e);for(var n=String(t).split(""),i=0,a=[~this.s?"":"-","",""],o="",s=h(t,r),c=m(t,r,s),f=-1,l=1,p=15+s+c+n.length,g=0;p>g;g++,i*=10){if(g<n.length?i+=Number(n[g]):(l=2,f++),s>0)if(f===c)a[l]+=o+"(",o="";else if(f===s+c){a[l]+=o+")";break}i>=r?(a[l]+=o+(i/r|0),o="",i%=r):l>1?o+="0":a[l]&&(a[l]+="0")}return a[0]+=a[1]||"0",a[2]?a[0]+"."+a[2]:a[0]}},r(30).amd?(n=[],i=function(){return u}.apply(t,n),!(void 0!==i&&(e.exports=i))):e.exports=u}(this)}).call(t,r(29)(e))},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("fraction",{number:function(t){if(!isFinite(t)||isNaN(t))throw new Error(t+" cannot be represented as a fraction");return new e.Fraction(t)},string:function(t){return new e.Fraction(t)},"number, number":function(t,r){return new e.Fraction(t,r)},BigNumber:function(t){return new e.Fraction(t.toString())},Fraction:function(e){return e},Object:function(t){return new e.Fraction(t)},"Array | Matrix":function(e){return i(e,a)}});return a}var i=r(19);t.name="fraction",t.factory=n},function(e,t,r){e.exports=[r(38),r(46),r(47),r(50),r(59),r(65),r(66),r(67),r(68),r(52),r(69)]},function(e,t,r){"use strict";function n(e,t,r,n){function i(){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator")}return i.prototype.type="Matrix",i.prototype.isMatrix=!0,i.storage=function(e){if(!o(e))throw new TypeError("format must be a string value");var t=i._storage[e];if(!t)throw new SyntaxError("Unsupported matrix storage format: "+e);return t},i._storage={},i.prototype.storage=function(){throw new Error("Cannot invoke storage on a Matrix interface")},i.prototype.datatype=function(){throw new Error("Cannot invoke datatype on a Matrix interface")},i.prototype.create=function(e,t){throw new Error("Cannot invoke create on a Matrix interface")},i.prototype.subset=function(e,t,r){throw new Error("Cannot invoke subset on a Matrix interface")},i.prototype.get=function(e){throw new Error("Cannot invoke get on a Matrix interface")},i.prototype.set=function(e,t,r){throw new Error("Cannot invoke set on a Matrix interface")},i.prototype.resize=function(e,t){throw new Error("Cannot invoke resize on a Matrix interface")},i.prototype.clone=function(){throw new Error("Cannot invoke clone on a Matrix interface")},i.prototype.size=function(){throw new Error("Cannot invoke size on a Matrix interface")},i.prototype.map=function(e,t){throw new Error("Cannot invoke map on a Matrix interface")},i.prototype.forEach=function(e){throw new Error("Cannot invoke forEach on a Matrix interface")},i.prototype.toArray=function(){throw new Error("Cannot invoke toArray on a Matrix interface")},i.prototype.valueOf=function(){throw new Error("Cannot invoke valueOf on a Matrix interface")},i.prototype.format=function(e){throw new Error("Cannot invoke format on a Matrix interface")},i.prototype.toString=function(){throw new Error("Cannot invoke toString on a Matrix interface")},i}var i=r(39),a=i.string,o=a.isString;t.name="Matrix",t.path="type",t.factory=n},function(e,t,r){"use strict";t.array=r(40),t["boolean"]=r(44),t["function"]=r(45),t.number=r(6),t.object=r(3),t.string=r(23),t.types=r(41),t.emitter=r(8)},function(e,t,r){"use strict";function n(e,t,r){var i,a=e.length;if(a!=t[r])throw new c(a,t[r]);if(r<t.length-1){var o=r+1;for(i=0;a>i;i++){var s=e[i];if(!Array.isArray(s))throw new c(t.length-1,t.length,"<");n(e[i],t,o)}}else for(i=0;a>i;i++)if(Array.isArray(e[i]))throw new c(t.length+1,t.length,">")}function i(e,r,n,a){var o,s,u=e.length,c=r[n],f=Math.min(u,c);if(e.length=c,n<r.length-1){var l=n+1;for(o=0;f>o;o++)s=e[o],Array.isArray(s)||(s=[s],e[o]=s),i(s,r,l,a);for(o=f;c>o;o++)s=[],e[o]=s,i(s,r,l,a)}else{for(o=0;f>o;o++)for(;Array.isArray(e[o]);)e[o]=e[o][0];if(a!==t.UNINITIALIZED)for(o=f;c>o;o++)e[o]=a}}function a(e,t,r){var n,i;if(t>r){var o=r+1;for(n=0,i=e.length;i>n;n++)e[n]=a(e[n],t,o)}else for(;Array.isArray(e);)e=e[0];return e}function o(e,t,r){var n,i;if(Array.isArray(e)){var a=r+1;for(n=0,i=e.length;i>n;n++)e[n]=o(e[n],t,a)}else for(var s=r;t>s;s++)e=[e];return e}var s=r(6),u=r(23),c=(r(3),r(41),r(42)),f=r(43);t.size=function(e){for(var t=[];Array.isArray(e);)t.push(e.length),e=e[0];return t},t.validate=function(e,t){var r=0==t.length;if(r){if(Array.isArray(e))throw new c(e.length,0)}else n(e,t,0)},t.validateIndex=function(e,t){if(!s.isNumber(e)||!s.isInteger(e))throw new TypeError("Index must be an integer (value: "+e+")");if(0>e||"number"==typeof t&&e>=t)throw new f(e,t)},t.UNINITIALIZED={},t.resize=function(e,t,r){if(!Array.isArray(e)||!Array.isArray(t))throw new TypeError("Array expected");if(0===t.length)throw new Error("Resizing to scalar is not supported");t.forEach(function(e){if(!s.isNumber(e)||!s.isInteger(e)||0>e)throw new TypeError("Invalid size, must contain positive integers (size: "+u.format(t)+")")});var n=void 0!==r?r:0;return i(e,t,0,n),e},t.squeeze=function(e,r){for(var n=r||t.size(e);Array.isArray(e)&&1===e.length;)e=e[0],n.shift();for(var i=n.length;1===n[i-1];)i--;return i<n.length&&(e=a(e,i,0),n.length=i),e},t.unsqueeze=function(e,r,n,i){var a=i||t.size(e);if(n)for(var s=0;n>s;s++)e=[e],a.unshift(1);for(e=o(e,r,0);a.length<r;)a.push(1);return e},t.flatten=function(e){if(!Array.isArray(e))return e;var t=[];return e.forEach(function r(e){Array.isArray(e)?e.forEach(r):t.push(e)}),t},t.isArray=Array.isArray},function(e,t){"use strict";t.type=function(e){var t=typeof e;return"object"===t?null===e?"null":e instanceof Boolean?"boolean":e instanceof Number?"number":e instanceof String?"string":Array.isArray(e)?"Array":e instanceof Date?"Date":e instanceof RegExp?"RegExp":"Object":"function"===t?"Function":t},t.isScalar=function(e){return!(e&&e.isMatrix||Array.isArray(e))}},function(e,t){"use strict";function r(e,t,n){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this.actual=e,this.expected=t,this.relation=n,this.message="Dimension mismatch ("+(Array.isArray(e)?"["+e.join(", ")+"]":e)+" "+(this.relation||"!=")+" "+(Array.isArray(t)?"["+t.join(", ")+"]":t)+")",this.stack=(new Error).stack}r.prototype=new RangeError,r.prototype.constructor=RangeError,r.prototype.name="DimensionError",r.prototype.isDimensionError=!0,e.exports=r},function(e,t){"use strict";function r(e,t,n){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this.index=e,arguments.length<3?(this.min=0,this.max=t):(this.min=t,this.max=n),void 0!==this.min&&this.index<this.min?this.message="Index out of range ("+this.index+" < "+this.min+")":void 0!==this.max&&this.index>=this.max?this.message="Index out of range ("+this.index+" > "+(this.max-1)+")":this.message="Index out of range ("+this.index+")",this.stack=(new Error).stack}r.prototype=new RangeError,r.prototype.constructor=RangeError,r.prototype.name="IndexError",r.prototype.isIndexError=!0,e.exports=r},function(e,t){"use strict";t.isBoolean=function(e){return"boolean"==typeof e}},function(e,t){t.memoize=function(e,t){return function r(){"object"!=typeof r.cache&&(r.cache={});for(var n=[],i=0;i<arguments.length;i++)n[i]=arguments[i];var a=t?t(n):JSON.stringify(n);return a in r.cache?r.cache[a]:r.cache[a]=e.apply(e,n)}}},function(e,t,r){"use strict";function n(e,t,n,c){function d(e,t){if(!(this instanceof d))throw new SyntaxError("Constructor must be called with the new operator");if(t&&!h(t))throw new Error("Invalid datatype: "+t);if(e&&e.isMatrix===!0)"DenseMatrix"===e.type?(this._data=u.clone(e._data),this._size=u.clone(e._size),this._datatype=t||e._datatype):(this._data=e.toArray(),this._size=e.size(),this._datatype=t||e._datatype);else if(e&&f(e.data)&&f(e.size))this._data=e.data,this._size=e.size,this._datatype=t||e.datatype;else if(f(e))this._data=w(e),this._size=s.size(this._data),s.validate(this._data,this._size),this._datatype=t;else{if(e)throw new TypeError("Unsupported type of data ("+i.types.type(e)+")");this._data=[],this._size=[0],this._datatype=t}}function g(e,t){if(!t||t.isIndex!==!0)throw new TypeError("Invalid index");var r=t.isScalar();if(r)return e.get(t.min());var n=t.size();if(n.length!=e._size.length)throw new a(n.length,e._size.length);for(var i=t.min(),o=t.max(),s=0,u=e._size.length;u>s;s++)m(i[s],e._size[s]),m(o[s],e._size[s]);return new d(v(e._data,t,n.length,0),e._datatype)}function v(e,t,r,n){var i=n==r-1,a=t.dimension(n);return i?a.map(function(t){return e[t]}).valueOf():a.map(function(i){var a=e[i];return v(a,t,r,n+1)}).valueOf()}function y(e,t,r,n){if(!t||t.isIndex!==!0)throw new TypeError("Invalid index");var i,o=t.size(),c=t.isScalar();if(r&&r.isMatrix===!0?(i=r.size(),r=r.valueOf()):i=s.size(r),c){if(0!==i.length)throw new TypeError("Scalar expected");e.set(t.min(),r,n)}else{if(o.length<e._size.length)throw new a(o.length,e._size.length,"<");if(i.length<o.length){for(var f=0,l=0;1===o[f]&&1===i[f];)f++;for(;1===o[f];)l++,f++;r=s.unsqueeze(r,o.length,l,i)}if(!u.deepEqual(o,i))throw new a(o,i,">");var p=t.max().map(function(e){return e+1});b(e,p,n);var h=o.length,m=0;x(e._data,t,r,h,m)}return e}function x(e,t,r,n,i){var a=i==n-1,o=t.dimension(i);a?o.forEach(function(t,n){m(t),e[t]=r[n[0]]}):o.forEach(function(a,o){m(a),x(e[a],t,r[o[0]],n,i+1)})}function b(e,t,r){for(var n=e._size.slice(0),i=!1;n.length<t.length;)n.push(0),i=!0;for(var a=0,o=t.length;o>a;a++)t[a]>n[a]&&(n[a]=t[a],i=!0);i&&E(e,n,r)}function w(e){for(var t=0,r=e.length;r>t;t++){var n=e[t];f(n)?e[t]=w(n):n&&n.isMatrix===!0&&(e[t]=w(n.valueOf()))}return e}var N=n(r(38));d.prototype=new N,d.prototype.type="DenseMatrix",d.prototype.isDenseMatrix=!0,d.prototype.storage=function(){return"dense"},d.prototype.datatype=function(){return this._datatype},d.prototype.create=function(e,t){return new d(e,t)},d.prototype.subset=function(e,t,r){switch(arguments.length){case 1:return g(this,e);case 2:case 3:return y(this,e,t,r);default:throw new SyntaxError("Wrong number of arguments")}},d.prototype.get=function(e){if(!f(e))throw new TypeError("Array expected");if(e.length!=this._size.length)throw new a(e.length,this._size.length);for(var t=0;t<e.length;t++)m(e[t],this._size[t]);for(var r=this._data,n=0,i=e.length;i>n;n++){var o=e[n];m(o,r.length),r=r[o]}return r},d.prototype.set=function(e,t,r){if(!f(e))throw new TypeError("Array expected");if(e.length<this._size.length)throw new a(e.length,this._size.length,"<");var n,i,o,s=e.map(function(e){return e+1});b(this,s,r);var u=this._data;for(n=0,i=e.length-1;i>n;n++)o=e[n],m(o,u.length),u=u[o];return o=e[e.length-1],m(o,u.length),u[o]=t,this},d.prototype.resize=function(e,t,r){if(!f(e))throw new TypeError("Array expected");var n=r?this.clone():this;return E(n,e,t)};var E=function(e,t,r){if(0===t.length){for(var n=e._data;f(n);)n=n[0];return n}return e._size=t.slice(0),e._data=s.resize(e._data,e._size,r),e};return d.prototype.clone=function(){var e=new d({data:u.clone(this._data),size:u.clone(this._size),datatype:this._datatype});return e},d.prototype.size=function(){return this._size},d.prototype.map=function(e){var t=this,r=function(n,i){return f(n)?n.map(function(e,t){return r(e,i.concat(t))}):e(n,i,t)};return new d({data:r(this._data,[]),size:u.clone(this._size),datatype:this._datatype})},d.prototype.forEach=function(e){var t=this,r=function(n,i){f(n)?n.forEach(function(e,t){r(e,i.concat(t))}):e(n,i,t)};r(this._data,[])},d.prototype.toArray=function(){return u.clone(this._data)},d.prototype.valueOf=function(){return this._data},d.prototype.format=function(e){return o.format(this._data,e)},d.prototype.toString=function(){return o.format(this._data)},d.prototype.toJSON=function(){return{mathjs:"DenseMatrix",data:this._data,size:this._size,datatype:this._datatype}},d.prototype.diagonal=function(e){if(e){if(e.isBigNumber===!0&&(e=e.toNumber()),!l(e)||!p(e))throw new TypeError("The parameter k must be an integer number")}else e=0;for(var t=e>0?e:0,r=0>e?-e:0,n=this._size[0],i=this._size[1],a=Math.min(n-r,i-t),o=[],s=0;a>s;s++)o[s]=this._data[s+r][s+t];return new d({data:o,size:[a],datatype:this._datatype})},d.diagonal=function(t,r,n,i,a){if(!f(t))throw new TypeError("Array expected, size parameter");if(2!==t.length)throw new Error("Only two dimensions matrix are supported");if(t=t.map(function(e){if(e&&e.isBigNumber===!0&&(e=e.toNumber()),!l(e)||!p(e)||1>e)throw new Error("Size values must be positive integers");return e}),n){if(n&&n.isBigNumber===!0&&(n=n.toNumber()),!l(n)||!p(n))throw new TypeError("The parameter k must be an integer number")}else n=0;i&&h(a)&&(i=c.convert(i,a));var o,u=n>0?n:0,m=0>n?-n:0,g=t[0],v=t[1],y=Math.min(g-m,v-u);if(f(r)){if(r.length!==y)throw new Error("Invalid value array length");o=function(e){return r[e]}}else if(r&&r.isMatrix===!0){var x=r.size();if(1!==x.length||x[0]!==y)throw new Error("Invalid matrix length");o=function(e){return r.get([e])}}else o=function(){return r};i||(i=o(0)&&o(0).isBigNumber===!0?new e.BigNumber(0):0);var b=[];if(t.length>0){b=s.resize(b,t,i);for(var w=0;y>w;w++)b[w+m][w+u]=o(w)}return new d({data:b,size:[g,v]})},d.fromJSON=function(e){return new d(e)},d.prototype.swapRows=function(e,t){if(!(l(e)&&p(e)&&l(t)&&p(t)))throw new Error("Row index must be positive integers");if(2!==this._size.length)throw new Error("Only two dimensional matrix is supported");return m(e,this._size[0]),m(t,this._size[0]),d._swapRows(e,t,this._data),this},d._swapRows=function(e,t,r){var n=r[e];r[e]=r[t],r[t]=n},e.Matrix._storage.dense=d,e.Matrix._storage["default"]=d,d}var i=r(39),a=r(42),o=i.string,s=i.array,u=i.object,c=i.number,f=Array.isArray,l=c.isNumber,p=c.isInteger,h=o.isString,m=s.validateIndex;t.name="DenseMatrix",t.path="type",t.factory=n,t.lazy=!1},function(e,t,r){"use strict";function n(e,t,n,d){function g(e,t){if(!(this instanceof g))throw new SyntaxError("Constructor must be called with the new operator");if(t&&!h(t))throw new Error("Invalid datatype: "+t);if(e&&e.isMatrix===!0)x(this,e,t);else if(e&&f(e.index)&&f(e.ptr)&&f(e.size))this._values=e.values,this._index=e.index,this._ptr=e.ptr,this._size=e.size,this._datatype=t||e.datatype;else if(f(e))b(this,e,t);else{if(e)throw new TypeError("Unsupported type of data ("+i.types.type(e)+")");this._values=[],this._index=[],this._ptr=[0],this._size=[0,0],this._datatype=t}}var v=n(r(38)),y=n(r(48)),x=function(e,t,r){"SparseMatrix"===t.type?(e._values=t._values?s.clone(t._values):void 0,e._index=s.clone(t._index),e._ptr=s.clone(t._ptr),e._size=s.clone(t._size),e._datatype=r||t._datatype):b(e,t.valueOf(),r||t._datatype)},b=function(e,t,r){e._values=[],e._index=[],e._ptr=[],e._datatype=r;var n=t.length,i=0,a=y,o=0;if(h(r)&&(a=d.find(y,[r,r])||y,o=d.convert(0,r)),n>0){var s=0;do{e._ptr.push(e._index.length);for(var u=0;n>u;u++){var c=t[u];if(f(c)){if(0===s&&i<c.length&&(i=c.length),s<c.length){var l=c[s];a(l,o)||(e._values.push(l),e._index.push(u))}}else 0===s&&1>i&&(i=1),a(c,o)||(e._values.push(c),e._index.push(u))}s++}while(i>s)}e._ptr.push(e._index.length),e._size=[n,i]};g.prototype=new v,g.prototype.type="SparseMatrix",g.prototype.isSparseMatrix=!0,g.prototype.storage=function(){return"sparse"},g.prototype.datatype=function(){return this._datatype},g.prototype.create=function(e,t){return new g(e,t)},g.prototype.density=function(){var e=this._size[0],t=this._size[1];return 0!==e&&0!==t?this._index.length/(e*t):0},g.prototype.subset=function(e,t,r){if(!this._values)throw new Error("Cannot invoke subset on a Pattern only matrix");switch(arguments.length){case 1:return w(this,e);case 2:case 3:return N(this,e,t,r);default:throw new SyntaxError("Wrong number of arguments")}};var w=function(e,t){if(!t||t.isIndex!==!0)throw new TypeError("Invalid index");var r=t.isScalar();if(r)return e.get(t.min());var n=t.size();if(n.length!=e._size.length)throw new a(n.length,e._size.length);var i,o,s,u,c=t.min(),f=t.max();for(i=0,o=e._size.length;o>i;i++)m(c[i],e._size[i]),m(f[i],e._size[i]);var l=e._values,p=e._index,h=e._ptr,d=t.dimension(0),v=t.dimension(1),y=[],x=[];d.forEach(function(e,t){x[e]=t[0],y[e]=!0});var b=l?[]:void 0,w=[],N=[];return v.forEach(function(e){for(N.push(w.length),s=h[e],u=h[e+1];u>s;s++)i=p[s],y[i]===!0&&(w.push(x[i]),b&&b.push(l[s]))}),N.push(w.length),new g({values:b,index:w,ptr:N,size:n,datatype:e._datatype})},N=function(e,t,r,n){if(!t||t.isIndex!==!0)throw new TypeError("Invalid index");var i,u=t.size(),c=t.isScalar();if(r&&r.isMatrix===!0?(i=r.size(),r=r.toArray()):i=o.size(r),c){if(0!==i.length)throw new TypeError("Scalar expected");e.set(t.min(),r,n)}else{if(1!==u.length&&2!==u.length)throw new a(u.length,e._size.length,"<");if(i.length<u.length){for(var f=0,l=0;1===u[f]&&1===i[f];)f++;for(;1===u[f];)l++,f++;r=o.unsqueeze(r,u.length,l,i)}if(!s.deepEqual(u,i))throw new a(u,i,">");for(var p=t.min()[0],h=t.min()[1],m=i[0],d=i[1],g=0;m>g;g++)for(var v=0;d>v;v++){var y=r[g][v];e.set([g+p,v+h],y,n)}}return e};g.prototype.get=function(e){if(!f(e))throw new TypeError("Array expected");if(e.length!=this._size.length)throw new a(e.length,this._size.length);if(!this._values)throw new Error("Cannot invoke get on a Pattern only matrix");var t=e[0],r=e[1];m(t,this._size[0]),m(r,this._size[1]);var n=E(t,this._ptr[r],this._ptr[r+1],this._index);return n<this._ptr[r+1]&&this._index[n]===t?this._values[n]:0},g.prototype.set=function(e,t,r){if(!f(e))throw new TypeError("Array expected");if(e.length!=this._size.length)throw new a(e.length,this._size.length);if(!this._values)throw new Error("Cannot invoke set on a Pattern only matrix");var n=e[0],i=e[1],o=this._size[0],s=this._size[1],u=y,c=0;h(this._datatype)&&(u=d.find(y,[this._datatype,this._datatype])||y,c=d.convert(0,this._datatype)),(n>o-1||i>s-1)&&(_(this,Math.max(n+1,o),Math.max(i+1,s),r),o=this._size[0],s=this._size[1]),m(n,o),m(i,s);var l=E(n,this._ptr[i],this._ptr[i+1],this._index);return l<this._ptr[i+1]&&this._index[l]===n?u(t,c)?M(l,i,this._values,this._index,this._ptr):this._values[l]=t:A(l,n,i,t,this._values,this._index,this._ptr),this};var E=function(e,t,r,n){if(r-t===0)return r;for(var i=t;r>i;i++)if(n[i]===e)return i;return t},M=function(e,t,r,n,i){r.splice(e,1),n.splice(e,1);for(var a=t+1;a<i.length;a++)i[a]--},A=function(e,t,r,n,i,a,o){i.splice(e,0,n),a.splice(e,0,t);for(var s=r+1;s<o.length;s++)o[s]++};g.prototype.resize=function(e,t,r){if(!f(e))throw new TypeError("Array expected");if(2!==e.length)throw new Error("Only two dimensions matrix are supported");e.forEach(function(t){if(!c.isNumber(t)||!c.isInteger(t)||0>t)throw new TypeError("Invalid size, must contain positive integers (size: "+u.format(e)+")")});var n=r?this.clone():this;return _(n,e[0],e[1],t)};var _=function(e,t,r,n){var i=n||0,a=y,o=0;h(e._datatype)&&(a=d.find(y,[e._datatype,e._datatype])||y,o=d.convert(0,e._datatype),i=d.convert(i,e._datatype));var s,u,c,f=!a(i,o),l=e._size[0],p=e._size[1];if(r>p){for(u=p;r>u;u++)if(e._ptr[u]=e._values.length,f)for(s=0;l>s;s++)e._values.push(i),e._index.push(s);e._ptr[r]=e._values.length}else p>r&&(e._ptr.splice(r+1,p-r),e._values.splice(e._ptr[r],e._values.length),e._index.splice(e._ptr[r],e._index.length));if(p=r,t>l){if(f){var m=0;for(u=0;p>u;u++){e._ptr[u]=e._ptr[u]+m,c=e._ptr[u+1]+m;var g=0;for(s=l;t>s;s++,g++)e._values.splice(c+g,0,i),e._index.splice(c+g,0,s),m++}e._ptr[p]=e._values.length}}else if(l>t){var v=0;for(u=0;p>u;u++){e._ptr[u]=e._ptr[u]-v;var x=e._ptr[u],b=e._ptr[u+1]-v;for(c=x;b>c;c++)s=e._index[c],s>t-1&&(e._values.splice(c,1),e._index.splice(c,1),v++)}e._ptr[u]=e._values.length}return e._size[0]=t,e._size[1]=r,e};g.prototype.clone=function(){var e=new g({values:this._values?s.clone(this._values):void 0,index:s.clone(this._index),ptr:s.clone(this._ptr),size:s.clone(this._size),datatype:this._datatype});return e},g.prototype.size=function(){return this._size.slice(0)},g.prototype.map=function(e,t){if(!this._values)throw new Error("Cannot invoke map on a Pattern only matrix");var r=this,n=this._size[0],i=this._size[1],a=function(t,n,i){return e(t,[n,i],r)};return O(this,0,n-1,0,i-1,a,t)};var O=function(e,t,r,n,i,a,o){var s=[],u=[],c=[],f=y,l=0;h(e._datatype)&&(f=d.find(y,[e._datatype,e._datatype])||y,l=d.convert(0,e._datatype));for(var p=function(e,t,r){e=a(e,t,r),f(e,l)||(s.push(e),u.push(t))},m=n;i>=m;m++){c.push(s.length);for(var v=e._ptr[m],x=e._ptr[m+1],b=t,w=v;x>w;w++){var N=e._index[w];if(N>=t&&r>=N){if(!o)for(var E=b;N>E;E++)p(0,E-t,m-n);p(e._values[w],N-t,m-n)}b=N+1}if(!o)for(var M=b;r>=M;M++)p(0,M-t,m-n)}return c.push(s.length),new g({values:s,index:u,ptr:c,size:[r-t+1,i-n+1]})};g.prototype.forEach=function(e,t){if(!this._values)throw new Error("Cannot invoke forEach on a Pattern only matrix");for(var r=this,n=this._size[0],i=this._size[1],a=0;i>a;a++){for(var o=this._ptr[a],s=this._ptr[a+1],u=0,c=o;s>c;c++){var f=this._index[c];if(!t)for(var l=u;f>l;l++)e(0,[l,a],r);e(this._values[c],[f,a],r),u=f+1}if(!t)for(var p=u;n>p;p++)e(0,[p,a],r)}},g.prototype.toArray=function(){return T(this._values,this._index,this._ptr,this._size,!0)},g.prototype.valueOf=function(){return T(this._values,this._index,this._ptr,this._size,!1)};var T=function(e,t,r,n,i){var a,o,u=n[0],c=n[1],f=[];for(a=0;u>a;a++)for(f[a]=[],o=0;c>o;o++)f[a][o]=0;for(o=0;c>o;o++)for(var l=r[o],p=r[o+1],h=l;p>h;h++)a=t[h],f[a][o]=e?i?s.clone(e[h]):e[h]:1;return f};return g.prototype.format=function(e){for(var t=this._size[0],r=this._size[1],n=this.density(),i="Sparse Matrix ["+u.format(t,e)+" x "+u.format(r,e)+"] density: "+u.format(n,e)+"\n",a=0;r>a;a++)for(var o=this._ptr[a],s=this._ptr[a+1],c=o;s>c;c++){var f=this._index[c];i+="\n    ("+u.format(f,e)+", "+u.format(a,e)+") ==> "+(this._values?u.format(this._values[c],e):"X")}return i},g.prototype.toString=function(){return u.format(this.toArray())},g.prototype.toJSON=function(){return{mathjs:"SparseMatrix",values:this._values,index:this._index,ptr:this._ptr,size:this._size,datatype:this._datatype}},g.prototype.diagonal=function(e){if(e){if(e.isBigNumber===!0&&(e=e.toNumber()),!l(e)||!p(e))throw new TypeError("The parameter k must be an integer number")}else e=0;var t=e>0?e:0,r=0>e?-e:0,n=this._size[0],i=this._size[1],a=Math.min(n-r,i-t),o=[],s=[],u=[];u[0]=0;for(var c=t;i>c&&o.length<a;c++)for(var f=this._ptr[c],h=this._ptr[c+1],m=f;h>m;m++){var d=this._index[m];if(d===c-t+r){o.push(this._values[m]),s[o.length-1]=d-r;break}}return u.push(o.length),new g({values:o,index:s,ptr:u,size:[a,1]})},g.fromJSON=function(e){return new g(e)},g.diagonal=function(e,t,r,n,i){if(!f(e))throw new TypeError("Array expected, size parameter");if(2!==e.length)throw new Error("Only two dimensions matrix are supported");if(e=e.map(function(e){if(e&&e.isBigNumber===!0&&(e=e.toNumber()),!l(e)||!p(e)||1>e)throw new Error("Size values must be positive integers");return e}),r){if(r.isBigNumber===!0&&(r=r.toNumber()),!l(r)||!p(r))throw new TypeError("The parameter k must be an integer number")}else r=0;var a=y,o=0;h(i)&&(a=d.find(y,[i,i])||y,o=d.convert(0,i));var s,u=r>0?r:0,c=0>r?-r:0,m=e[0],v=e[1],x=Math.min(m-c,v-u);if(f(t)){if(t.length!==x)throw new Error("Invalid value array length");s=function(e){return t[e]}}else if(t&&t.isMatrix===!0){var b=t.size();if(1!==b.length||b[0]!==x)throw new Error("Invalid matrix length");s=function(e){return t.get([e])}}else s=function(){return t};for(var w=[],N=[],E=[],M=0;v>M;M++){E.push(w.length);var A=M-u;if(A>=0&&x>A){var _=s(A);a(_,o)||(N.push(A+c),w.push(_))}}return E.push(w.length),new g({values:w,index:N,ptr:E,size:[m,v]})},g.prototype.swapRows=function(e,t){if(!(l(e)&&p(e)&&l(t)&&p(t)))throw new Error("Row index must be positive integers");if(2!==this._size.length)throw new Error("Only two dimensional matrix is supported");return m(e,this._size[0]),m(t,this._size[0]),g._swapRows(e,t,this._size[1],this._values,this._index,this._ptr),this},g._forEachRow=function(e,t,r,n,i){for(var a=n[e],o=n[e+1],s=a;o>s;s++)i(r[s],t[s])},g._swapRows=function(e,t,r,n,i,a){for(var o=0;r>o;o++){var s=a[o],u=a[o+1],c=E(e,s,u,i),f=E(t,s,u,i);if(u>c&&u>f&&i[c]===e&&i[f]===t){if(n){var l=n[c];n[c]=n[f],n[f]=l}}else if(u>c&&i[c]===e&&(f>=u||i[f]!==t)){var p=n?n[c]:void 0;i.splice(f,0,t),n&&n.splice(f,0,p),i.splice(c>=f?c+1:c,1),n&&n.splice(c>=f?c+1:c,1)}else if(u>f&&i[f]===t&&(c>=u||i[c]!==e)){var h=n?n[f]:void 0;i.splice(c,0,e),n&&n.splice(c,0,h),i.splice(f>=c?f+1:f,1),n&&n.splice(f>=c?f+1:f,1)}}},e.Matrix._storage.sparse=g,g}var i=r(39),a=r(42),o=i.array,s=i.object,u=i.string,c=i.number,f=Array.isArray,l=c.isNumber,p=c.isInteger,h=u.isString,m=o.validateIndex;t.name="SparseMatrix",t.path="type",t.factory=n,t.lazy=!1},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("equalScalar",{"boolean, boolean":function(e,t){return e===t},"number, number":function(e,r){return e===r||i(e,r,t.epsilon)},"BigNumber, BigNumber":function(e,r){return e.eq(r)||a(e,r,t.epsilon)},"Fraction, Fraction":function(e,t){return e.equals(t)},"Complex, Complex":function(e,t){return e.equals(t)},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return o(e.value,t.value)},"string, string":function(e,t){return e===t}});return o}var i=r(6).nearlyEqual,a=r(49);t.factory=n},function(e,t){"use strict";e.exports=function(e,t,r){if(null==r)return e.eq(t);if(e.eq(t))return!0;if(e.isNaN()||t.isNaN())return!1;if(e.isFinite()&&t.isFinite()){var n=e.minus(t).abs();if(n.isZero())return!0;var i=e.constructor.max(e.abs(),t.abs());return n.lte(i.times(r))}return!1}},function(e,t,r){"use strict";function n(e,t,n){function i(){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");this._values=[],this._heap=new e.FibonacciHeap}var a=n(r(51)),o=n(r(48));return i.prototype.type="Spa",i.prototype.isSpa=!0,i.prototype.set=function(e,t){if(this._values[e])this._values[e].value=t;else{var r=this._heap.insert(e,t);this._values[e]=r}},i.prototype.get=function(e){var t=this._values[e];return t?t.value:0},i.prototype.accumulate=function(e,t){var r=this._values[e];r?r.value=a(r.value,t):(r=this._heap.insert(e,t),this._values[e]=r)},i.prototype.forEach=function(e,t,r){var n=this._heap,i=this._values,a=[],s=n.extractMinimum();for(s&&a.push(s);s&&s.key<=t;)s.key>=e&&(o(s.value,0)||r(s.key,s.value,this)),s=n.extractMinimum(),s&&a.push(s);for(var u=0;u<a.length;u++){var c=a[u];s=n.insert(c.key,c.value),i[s.key]=s}},i.prototype.swap=function(e,t){var r=this._values[e],n=this._values[t];if(!r&&n)r=this._heap.insert(e,n.value),this._heap.remove(n),this._values[e]=r,this._values[t]=void 0;else if(r&&!n)n=this._heap.insert(t,r.value),this._heap.remove(r),this._values[t]=n,this._values[e]=void 0;else if(r&&n){var i=r.value;r.value=n.value,n.value=i}},i}t.name="Spa",t.path="type",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(52)),s=n(r(53)),u=r(32),c=n(r(54)),f=n(r(55)),l=n(r(56)),p=n(r(57)),h=n(r(58)),m=a("add",i({"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,s);break;default:r=c(t,e,s,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,s,!1);break;default:r=p(e,t,s)}}return r},"Array, Array":function(e,t){return m(o(e),o(t)).valueOf()},"Array, Matrix":function(e,t){return m(o(e),t)},"Matrix, Array":function(e,t){return m(e,o(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=l(e,t,s,!1);break;default:r=h(e,t,s,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=l(t,e,s,!0);break;default:r=h(t,e,s,!0)}return r},"Array, any":function(e,t){return h(o(e),t,s,!1).valueOf()},"any, Array":function(e,t){return h(o(t),e,s,!0).valueOf()}},s.signatures));return m.toTex={2:"\\left(${args[0]}"+u.operators.add+"${args[1]}\\right)"},m}var i=r(3).extend;t.name="add",t.factory=n},function(e,t){"use strict";function r(e,t,r,n){function i(t,r,n){var i=e.Matrix.storage(r||"default");return new i(t,n)}var a=n("matrix",{"":function(){return i([])},string:function(e){return i([],e)},"string, string":function(e,t){
return i([],e,t)},Array:function(e){return i(e)},Matrix:function(e){return i(e,e.storage())},"Array | Matrix, string":i,"Array | Matrix, string, string":i});return a.toTex={0:"\\begin{bmatrix}\\end{bmatrix}",1:"\\left(${args[0]}\\right)",2:"\\left(${args[0]}\\right)"},a}t.name="matrix",t.factory=r},function(e,t){"use strict";function r(e,t,r,n){var i=n("add",{"number, number":function(e,t){return e+t},"Complex, Complex":function(e,t){return e.add(t)},"BigNumber, BigNumber":function(e,t){return e.plus(t)},"Fraction, Fraction":function(e,t){return e.add(t)},"Unit, Unit":function(e,t){if(null==e.value)throw new Error("Parameter x contains a unit with undefined value");if(null==t.value)throw new Error("Parameter y contains a unit with undefined value");if(!e.equalBase(t))throw new Error("Units do not match");var r=e.clone();return r.value=i(r.value,t.value),r.fixPrefix=!1,r}});return i}t.factory=r},function(e,t,r){"use strict";function n(e,t,r,n){var a=e.DenseMatrix,o=function(e,t,r,o){var s=e._data,u=e._size,c=e._datatype,f=t._values,l=t._index,p=t._ptr,h=t._size,m=t._datatype;if(u.length!==h.length)throw new i(u.length,h.length);if(u[0]!==h[0]||u[1]!==h[1])throw new RangeError("Dimension mismatch. Matrix A ("+u+") must match Matrix B ("+h+")");if(!f)throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var d,g,v=u[0],y=u[1],x="string"==typeof c&&c===m?c:void 0,b=x?n.find(r,[x,x]):r,w=[];for(d=0;v>d;d++)w[d]=[];var N=[],E=[];for(g=0;y>g;g++){for(var M=g+1,A=p[g],_=p[g+1],O=A;_>O;O++)d=l[O],N[d]=o?b(f[O],s[d][g]):b(s[d][g],f[O]),E[d]=M;for(d=0;v>d;d++)E[d]===M?w[d][g]=N[d]:w[d][g]=s[d][g]}return new a({data:w,size:[v,y],datatype:x})};return o}var i=r(42);t.name="algorithm01",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(48)),s=e.SparseMatrix,u=function(e,t,r){var n=e._values,u=e._index,c=e._ptr,f=e._size,l=e._datatype,p=t._values,h=t._index,m=t._ptr,d=t._size,g=t._datatype;if(f.length!==d.length)throw new i(f.length,d.length);if(f[0]!==d[0]||f[1]!==d[1])throw new RangeError("Dimension mismatch. Matrix A ("+f+") must match Matrix B ("+d+")");var v,y=f[0],x=f[1],b=o,w=0,N=r;"string"==typeof l&&l===g&&(v=l,b=a.find(o,[v,v]),w=a.convert(0,v),N=a.find(r,[v,v]));var E,M,A,_,O,T=n&&p?[]:void 0,C=[],S=[],z=new s({values:T,index:C,ptr:S,size:[y,x],datatype:v}),B=n&&p?[]:void 0,k=n&&p?[]:void 0,I=[],R=[];for(M=0;x>M;M++){S[M]=C.length;var P=M+1;for(_=c[M],O=c[M+1],A=_;O>A;A++)E=u[A],C.push(E),I[E]=P,B&&(B[E]=n[A]);for(_=m[M],O=m[M+1],A=_;O>A;A++)if(E=h[A],I[E]===P){if(B){var U=N(B[E],p[A]);b(U,w)?I[E]=null:B[E]=U}}else C.push(E),R[E]=P,k&&(k[E]=p[A]);if(B&&k)for(A=S[M];A<C.length;)E=C[A],I[E]===P?(T[A]=B[E],A++):R[E]===P?(T[A]=k[E],A++):C.splice(A,1)}return S[x]=C.length,z};return u}var i=r(42);t.name="algorithm04",t.factory=n},function(e,t){"use strict";function r(e,t,r,n){var i=e.DenseMatrix,a=function(e,t,r,a){var o=e._values,s=e._index,u=e._ptr,c=e._size,f=e._datatype;if(!o)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var l,p=c[0],h=c[1],m=r;"string"==typeof f&&(l=f,t=n.convert(t,l),m=n.find(r,[l,l]));for(var d=[],g=new i({data:d,size:[p,h],datatype:l}),v=[],y=[],x=0;h>x;x++){for(var b=x+1,w=u[x],N=u[x+1],E=w;N>E;E++){var M=s[E];v[M]=o[E],y[M]=b}for(var A=0;p>A;A++)0===x&&(d[A]=[]),y[A]===b?d[A][x]=a?m(t,v[A]):m(v[A],t):d[A][x]=t}return g};return a}t.name="algorithm10",t.factory=r},function(e,t,r){"use strict";function n(e,t,r,n){var i=e.DenseMatrix,o=function(e,t,r){var o=e._data,u=e._size,c=e._datatype,f=t._data,l=t._size,p=t._datatype,h=[];if(u.length!==l.length)throw new a(u.length,l.length);for(var m=0;m<u.length;m++){if(u[m]!==l[m])throw new RangeError("Dimension mismatch. Matrix A ("+u+") must match Matrix B ("+l+")");h[m]=u[m]}var d,g=r;"string"==typeof c&&c===p&&(d=c,t=n.convert(t,d),g=n.find(r,[d,d]));var v=h.length>0?s(g,0,h,h[0],o,f):[];return new i({data:v,size:h,datatype:d})},s=function(e,t,r,n,i,a){var o=[];if(t===r.length-1)for(var u=0;n>u;u++)o[u]=e(i[u],a[u]);else for(var c=0;n>c;c++)o[c]=s(e,t+1,r,r[t+1],i[c],a[c]);return o};return o}var i=r(39),a=r(42),o=i.string;o.isString;t.name="algorithm13",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=e.DenseMatrix,o=function(e,t,r,o){var u,c=e._data,f=e._size,l=e._datatype,p=r;"string"==typeof l&&(u=l,t=n.convert(t,u),p=n.find(r,[u,u]));var h=f.length>0?s(p,0,f,f[0],c,t,o):[];return new a({data:h,size:i(f),datatype:u})},s=function(e,t,r,n,i,a,o){var u=[];if(t===r.length-1)for(var c=0;n>c;c++)u[c]=o?e(a,i[c]):e(i[c],a);else for(var f=0;n>f;f++)u[f]=s(e,t+1,r,r[t+1],i[f],a,o);return u};return o}var i=r(3).clone;t.name="algorithm14",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");this._minimum=null,this._size=0}var o=n(r(60)),s=n(r(64)),u=1/Math.log((1+Math.sqrt(5))/2);a.prototype.type="FibonacciHeap",a.prototype.isFibonacciHeap=!0,a.prototype.insert=function(e,t){var r={key:e,value:t,degree:0};if(this._minimum){var n=this._minimum;r.left=n,r.right=n.right,n.right=r,r.right.left=r,o(e,n.key)&&(this._minimum=r)}else r.left=r,r.right=r,this._minimum=r;return this._size++,r},a.prototype.size=function(){return this._size},a.prototype.clear=function(){this._minimum=null,this._size=0},a.prototype.isEmpty=function(){return!!this._minimum},a.prototype.extractMinimum=function(){var e=this._minimum;if(null===e)return e;for(var t=this._minimum,r=e.degree,n=e.child;r>0;){var i=n.right;n.left.right=n.right,n.right.left=n.left,n.left=t,n.right=t.right,t.right=n,n.right.left=n,n.parent=null,n=i,r--}return e.left.right=e.right,e.right.left=e.left,e==e.right?t=null:(t=e.right,t=h(t,this._size)),this._size--,this._minimum=t,e},a.prototype.remove=function(e){this._minimum=c(this._minimum,e,-1),this.extractMinimum()};var c=function(e,t,r){t.key=r;var n=t.parent;return n&&o(t.key,n.key)&&(f(e,t,n),l(e,n)),o(t.key,e.key)&&(e=t),e},f=function(e,t,r){t.left.right=t.right,t.right.left=t.left,r.degree--,r.child==t&&(r.child=t.right),0===r.degree&&(r.child=null),t.left=e,t.right=e.right,e.right=t,t.right.left=t,t.parent=null,t.mark=!1},l=function(e,t){var r=t.parent;r&&(t.mark?(f(e,t,r),l(r)):t.mark=!0)},p=function(e,t){e.left.right=e.right,e.right.left=e.left,e.parent=t,t.child?(e.left=t.child,e.right=t.child.right,t.child.right=e,e.right.left=e):(t.child=e,e.right=e,e.left=e),t.degree++,e.mark=!1},h=function(e,t){var r=Math.floor(Math.log(t)*u)+1,n=new Array(r),i=0,a=e;if(a)for(i++,a=a.right;a!==e;)i++,a=a.right;for(var c;i>0;){for(var f=a.degree,l=a.right;;){if(c=n[f],!c)break;if(s(a.key,c.key)){var h=c;c=a,a=h}p(c,a),n[f]=null,f++}n[f]=a,a=l,i--}e=null;for(var m=0;r>m;m++)c=n[m],c&&(e?(c.left.right=c.right,c.right.left=c.left,c.left=e,c.right=e.right,e.right=c,c.right.left=c,o(c.key,e.key)&&(e=c)):e=c);return e};return a}t.name="FibonacciHeap",t.path="type",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(61)),c=n(r(62)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=r(32),m=o("smaller",{"boolean, boolean":function(e,t){return t>e},"number, number":function(e,r){return r>e&&!i(e,r,t.epsilon)},"BigNumber, BigNumber":function(e,r){return e.lt(r)&&!a(e,r,t.epsilon)},"Fraction, Fraction":function(e,t){return-1===e.compare(t)},"Complex, Complex":function(e,t){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return m(e.value,t.value)},"string, string":function(e,t){return t>e},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,m);break;default:r=u(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,m,!1);break;default:r=l(e,t,m)}}return r},"Array, Array":function(e,t){return m(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return m(s(e),t)},"Matrix, Array":function(e,t){return m(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=p(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,m,!0);break;default:r=p(t,e,m,!0)}return r},"Array, any":function(e,t){return p(s(e),t,m,!1).valueOf()},"any, Array":function(e,t){return p(s(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+h.operators.smaller+"${args[1]}\\right)"},m}var i=r(6).nearlyEqual,a=r(49);t.name="smaller",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=e.DenseMatrix,o=function(e,t,r,o){var s=e._data,u=e._size,c=e._datatype,f=t._values,l=t._index,p=t._ptr,h=t._size,m=t._datatype;if(u.length!==h.length)throw new i(u.length,h.length);if(u[0]!==h[0]||u[1]!==h[1])throw new RangeError("Dimension mismatch. Matrix A ("+u+") must match Matrix B ("+h+")");if(!f)throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var d,g=u[0],v=u[1],y=0,x=r;"string"==typeof c&&c===m&&(d=c,y=n.convert(0,d),x=n.find(r,[d,d]));for(var b=[],w=0;g>w;w++)b[w]=[];for(var N=[],E=[],M=0;v>M;M++){for(var A=M+1,_=p[M],O=p[M+1],T=_;O>T;T++){var C=l[T];N[C]=o?x(f[T],s[C][M]):x(s[C][M],f[T]),E[C]=A}for(var S=0;g>S;S++)E[S]===A?b[S][M]=N[S]:b[S][M]=o?x(y,s[S][M]):x(s[S][M],y)}return new a({data:b,size:[g,v],datatype:d})};return o}var i=r(42);t.name="algorithm03",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=e.DenseMatrix,o=function(e,t,r){var o=e._size,u=e._datatype,c=t._size,f=t._datatype;if(o.length!==c.length)throw new i(o.length,c.length);if(o[0]!==c[0]||o[1]!==c[1])throw new RangeError("Dimension mismatch. Matrix A ("+o+") must match Matrix B ("+c+")");var l,p=o[0],h=o[1],m=0,d=r;"string"==typeof u&&u===f&&(l=u,m=n.convert(0,l),d=n.find(r,[l,l]));var g,v,y=[];for(g=0;p>g;g++)y[g]=[];var x=new a({data:y,size:[p,h],datatype:l}),b=[],w=[],N=[],E=[];for(v=0;h>v;v++){var M=v+1;for(s(e,v,N,b,M),s(t,v,E,w,M),g=0;p>g;g++){var A=N[g]===M?b[g]:m,_=E[g]===M?w[g]:m;y[g][v]=d(A,_)}}return x},s=function(e,t,r,n,i){for(var a=e._values,o=e._index,s=e._ptr,u=s[t],c=s[t+1];c>u;u++){var f=o[u];r[f]=i,n[f]=a[u]}};return o}var i=r(42);t.name="algorithm07",t.factory=n},function(e,t){"use strict";function r(e,t,r,n){var i=e.DenseMatrix,a=function(e,t,r,a){var o=e._values,s=e._index,u=e._ptr,c=e._size,f=e._datatype;if(!o)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var l,p=c[0],h=c[1],m=r;"string"==typeof f&&(l=f,t=n.convert(t,l),m=n.find(r,[l,l]));for(var d=[],g=new i({data:d,size:[p,h],datatype:l}),v=[],y=[],x=0;h>x;x++){for(var b=x+1,w=u[x],N=u[x+1],E=w;N>E;E++){var M=s[E];v[M]=o[E],y[M]=b}for(var A=0;p>A;A++)0===x&&(d[A]=[]),y[A]===b?d[A][x]=a?m(t,v[A]):m(v[A],t):d[A][x]=a?m(t,0):m(0,t)}return g};return a}t.name="algorithm12",t.factory=r},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(61)),c=n(r(62)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=r(32),m=o("larger",{"boolean, boolean":function(e,t){return e>t},"number, number":function(e,r){return e>r&&!i(e,r,t.epsilon)},"BigNumber, BigNumber":function(e,r){return e.gt(r)&&!a(e,r,t.epsilon)},"Fraction, Fraction":function(e,t){return 1===e.compare(t)},"Complex, Complex":function(){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return m(e.value,t.value)},"string, string":function(e,t){return e>t},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,m);break;default:r=u(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,m,!1);break;default:r=l(e,t,m)}}return r},"Array, Array":function(e,t){return m(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return m(s(e),t)},"Matrix, Array":function(e,t){return m(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=p(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,m,!0);break;default:r=p(t,e,m,!0)}return r},"Array, any":function(e,t){return p(s(e),t,m,!1).valueOf()},"any, Array":function(e,t){return p(s(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+h.operators.larger+"${args[1]}\\right)"},m}var i=r(6).nearlyEqual,a=r(49);t.name="larger",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){function a(e,t){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(t&&!u(t))throw new Error("Invalid datatype: "+t);if(e&&e.isMatrix===!0||s(e)){var r=new c(e,t);this._data=r._data,this._size=r._size,this._datatype=r._datatype,this._min=null,this._max=null}else if(e&&s(e.data)&&s(e.size))this._data=e.data,this._size=e.size,this._datatype=e.datatype,this._min="undefined"!=typeof e.min?e.min:null,this._max="undefined"!=typeof e.max?e.max:null;else{if(e)throw new TypeError("Unsupported type of data ("+i.types.type(e)+")");this._data=[],this._size=[0],this._datatype=t,this._min=null,this._max=null}}var c=n(r(46)),f=n(r(60));return a.prototype=new c,a.prototype.type="ImmutableDenseMatrix",a.prototype.isImmutableDenseMatrix=!0,a.prototype.subset=function(e){switch(arguments.length){case 1:var t=c.prototype.subset.call(this,e);return t.isMatrix?new a({data:t._data,size:t._size,datatype:t._datatype}):t;case 2:case 3:throw new Error("Cannot invoke set subset on an Immutable Matrix instance");default:throw new SyntaxError("Wrong number of arguments")}},a.prototype.set=function(){throw new Error("Cannot invoke set on an Immutable Matrix instance")},a.prototype.resize=function(){throw new Error("Cannot invoke resize on an Immutable Matrix instance")},a.prototype.clone=function(){var e=new a({data:o.clone(this._data),size:o.clone(this._size),datatype:this._datatype});return e},a.prototype.toJSON=function(){return{mathjs:"ImmutableDenseMatrix",data:this._data,size:this._size,datatype:this._datatype}},a.fromJSON=function(e){return new a(e)},a.prototype.swapRows=function(){throw new Error("Cannot invoke swapRows on an Immutable Matrix instance")},a.prototype.min=function(){if(null===this._min){var e=null;this.forEach(function(t){(null===e||f(t,e))&&(e=t)}),this._min=null!==e?e:void 0}return this._min},a.prototype.max=function(){if(null===this._max){var e=null;this.forEach(function(t){(null===e||f(e,t))&&(e=t)}),this._max=null!==e?e:void 0}return this._max},a}var i=r(39),a=i.string,o=i.object,s=Array.isArray,u=a.isString;t.name="ImmutableDenseMatrix",t.path="type",t.factory=n},function(e,t,r){"use strict";function n(e){function t(e){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");this._dimensions=[],this._isScalar=!0;for(var n=0,i=arguments.length;i>n;n++){var a=arguments[n];if(a&&a.isRange===!0)this._dimensions.push(a),this._isScalar=!1;else if(a&&(Array.isArray(a)||a.isMatrix===!0)){var o=r(a.valueOf());this._dimensions.push(o);var s=o.size();1===s.length&&1===s[0]||(this._isScalar=!1)}else if("number"==typeof a)this._dimensions.push(r([a]));else{if("string"!=typeof a)throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");this._dimensions.push(a)}}}function r(t){for(var r=0,n=t.length;n>r;r++)if("number"!=typeof t[r]||!a(t[r]))throw new TypeError("Index parameters must be positive integer numbers");return new e.ImmutableDenseMatrix(t)}return t.prototype.type="Index",t.prototype.isIndex=!0,t.prototype.clone=function(){var e=new t;return e._dimensions=i(this._dimensions),e._isScalar=this._isScalar,e},t.create=function(e){var r=new t;return t.apply(r,e),r},t.prototype.size=function(){for(var e=[],t=0,r=this._dimensions.length;r>t;t++){var n=this._dimensions[t];e[t]="string"==typeof n?1:n.size()[0]}return e},t.prototype.max=function(){for(var e=[],t=0,r=this._dimensions.length;r>t;t++){var n=this._dimensions[t];e[t]="string"==typeof n?n:n.max()}return e},t.prototype.min=function(){for(var e=[],t=0,r=this._dimensions.length;r>t;t++){var n=this._dimensions[t];e[t]="string"==typeof n?n:n.min()}return e},t.prototype.forEach=function(e){for(var t=0,r=this._dimensions.length;r>t;t++)e(this._dimensions[t],t,this)},t.prototype.dimension=function(e){return this._dimensions[e]||null},t.prototype.isObjectProperty=function(){return 1===this._dimensions.length&&"string"==typeof this._dimensions[0]},t.prototype.getObjectProperty=function(){return this.isObjectProperty()?this._dimensions[0]:null},t.prototype.isScalar=function(){return this._isScalar},t.prototype.toArray=function(){for(var e=[],t=0,r=this._dimensions.length;r>t;t++){var n=this._dimensions[t];e.push("string"==typeof n?n:n.toArray())}return e},t.prototype.valueOf=t.prototype.toArray,t.prototype.toString=function(){for(var e=[],t=0,r=this._dimensions.length;r>t;t++){var n=this._dimensions[t];"string"==typeof n?e.push(JSON.stringify(n)):e.push(n.toString())}return"["+e.join(", ")+"]"},t.prototype.toJSON=function(){return{mathjs:"Index",dimensions:this._dimensions}},t.fromJSON=function(e){return t.create(e.dimensions)},t}var i=r(3).clone,a=r(6).isInteger;t.name="Index",t.path="type",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){function a(e,t,r){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(null!=e)if(e.isBigNumber===!0)e=e.toNumber();else if("number"!=typeof e)throw new TypeError("Parameter start must be a number");if(null!=t)if(t.isBigNumber===!0)t=t.toNumber();else if("number"!=typeof t)throw new TypeError("Parameter end must be a number");if(null!=r)if(r.isBigNumber===!0)r=r.toNumber();else if("number"!=typeof r)throw new TypeError("Parameter step must be a number");this.start=null!=e?parseFloat(e):0,this.end=null!=t?parseFloat(t):0,this.step=null!=r?parseFloat(r):1}return a.prototype.type="Range",a.prototype.isRange=!0,a.parse=function(e){if("string"!=typeof e)return null;var t=e.split(":"),r=t.map(function(e){return parseFloat(e)}),n=r.some(function(e){return isNaN(e)});if(n)return null;switch(r.length){case 2:return new a(r[0],r[1]);case 3:return new a(r[0],r[2],r[1]);default:return null}},a.prototype.clone=function(){return new a(this.start,this.end,this.step)},a.prototype.size=function(){var e=0,t=this.start,r=this.step,n=this.end,a=n-t;return i.sign(r)==i.sign(a)?e=Math.ceil(a/r):0==a&&(e=0),isNaN(e)&&(e=0),[e]},a.prototype.min=function(){var e=this.size()[0];return e>0?this.step>0?this.start:this.start+(e-1)*this.step:void 0},a.prototype.max=function(){var e=this.size()[0];return e>0?this.step>0?this.start+(e-1)*this.step:this.start:void 0},a.prototype.forEach=function(e){var t=this.start,r=this.step,n=this.end,i=0;if(r>0)for(;n>t;)e(t,[i],this),t+=r,i++;else if(0>r)for(;t>n;)e(t,[i],this),t+=r,i++},a.prototype.map=function(e){var t=[];return this.forEach(function(r,n,i){t[n[0]]=e(r,n,i)}),t},a.prototype.toArray=function(){var e=[];return this.forEach(function(t,r){e[r[0]]=t}),e},a.prototype.valueOf=function(){return this.toArray()},a.prototype.format=function(e){var t=i.format(this.start,e);return 1!=this.step&&(t+=":"+i.format(this.step,e)),t+=":"+i.format(this.end,e)},a.prototype.toString=function(){return this.format()},a.prototype.toJSON=function(){return{mathjs:"Range",start:this.start,end:this.end,step:this.step}},a.fromJSON=function(e){return new a(e.start,e.end,e.step)},a}var i=r(6);t.name="Range",t.path="type",t.factory=n},function(e,t){"use strict";function r(e,t,r,n){return n("index",{"...number | string | BigNumber | Range | Array | Matrix":function(t){var r=t.map(function(e){return e&&e.isBigNumber===!0?e.toNumber():e&&(Array.isArray(e)||e.isMatrix===!0)?e.map(function(e){return e&&e.isBigNumber===!0?e.toNumber():e}):e}),n=new e.Index;return e.Index.apply(n,r),n}})}t.name="index",t.factory=r},function(e,t){"use strict";function r(e,t,r,n){var i=e.SparseMatrix,a=n("sparse",{"":function(){return new i([])},string:function(e){return new i([],e)},"Array | Matrix":function(e){return new i(e)},"Array | Matrix, string":function(e,t){return new i(e,t)}});return a.toTex={0:"\\begin{bsparse}\\end{bsparse}",1:"\\left(${args[0]}\\right)"},a}t.name="sparse",t.factory=r},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("number",{"":function(){return 0},number:function(e){return e},string:function(e){var t=Number(e);if(isNaN(t))throw new SyntaxError('String "'+e+'" is no valid number');return t},BigNumber:function(e){return e.toNumber()},Fraction:function(e){return e.valueOf()},Unit:function(e){throw new Error("Second argument with valueless unit expected")},"Unit, string | Unit":function(e,t){return e.toNumber(t)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={0:"0",1:"\\left(${args[0]}\\right)",2:"\\left(\\left(${args[0]}\\right)${args[1]}\\right)"},a}var i=r(19);t.name="number",t.factory=n},function(e,t,r){e.exports=[r(72)]},function(e,t){"use strict";function r(e,t,r,n){function i(e){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");this.entries=e||[]}return i.prototype.type="ResultSet",i.prototype.isResultSet=!0,i.prototype.valueOf=function(){return this.entries},i.prototype.toString=function(){return"["+this.entries.join(", ")+"]"},i.prototype.toJSON=function(){return{mathjs:"ResultSet",entries:this.entries}},i.fromJSON=function(e){return new i(e.entries)},i}t.name="ResultSet",t.path="type",t.factory=r},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("string",{"":function(){return""},number:a.format,"null":function(e){return"null"},"boolean":function(e){return e+""},string:function(e){return e},"Array | Matrix":function(e){return i(e,o)},any:function(e){return String(e)}});return o.toTex={0:'\\mathtt{""}',1:"\\mathrm{string}\\left(${args[0]}\\right)"},o}var i=r(19),a=r(6);t.name="string",t.factory=n},function(e,t,r){e.exports=[r(75),r(91),r(92)]},function(e,t,r){"use strict";function n(e,t,n,s,u){function c(e,t){if(!(this instanceof c))throw new Error("Constructor must be called with the new operator");if(void 0!==e&&!O(e)&&!e.isComplex)throw new TypeError("First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined");if(void 0!=t&&("string"!=typeof t||""==t))throw new TypeError("Second parameter in Unit constructor must be a string");if(void 0!=t){var r=c.parse(t);this.units=r.units,this.dimensions=r.dimensions}else this.units=[{unit:j,prefix:R.NONE,power:0}],this.dimensions=[0,0,0,0,0,0,0,0,0];this.value=void 0!=e?this._normalize(e):null,this.fixPrefix=!1,this.isUnitListSimplified=!0}function f(){for(;" "==I||"	"==I;)h()}function l(e){return e>="0"&&"9">=e||"."==e}function p(e){return e>="0"&&"9">=e}function h(){k++,I=B.charAt(k)}function m(e){k=e,I=B.charAt(k)}function d(){var e,t="";if(e=k,"+"==I?h():"-"==I&&(t+=I,h()),!l(I))return m(e),null;if("."==I){if(t+=I,h(),!p(I))return m(e),null}else{for(;p(I);)t+=I,h();"."==I&&(t+=I,h())}for(;p(I);)t+=I,h();if("E"==I||"e"==I){var r="",n=k;if(r+=I,h(),"+"!=I&&"-"!=I||(r+=I,h()),!p(I))return m(n),t;for(t+=r;p(I);)t+=I,h()}return t}function g(){for(var e="",t=B.charCodeAt(k);t>=48&&57>=t||t>=65&&90>=t||t>=97&&122>=t;)e+=I,h(),t=B.charCodeAt(k);return t=e.charCodeAt(0),t>=65&&90>=t||t>=97&&122>=t?e||null:null}function v(e){return I===e?(h(),e):null}function y(e){for(var t in F)if(F.hasOwnProperty(t)&&i(e,t)){var r=F[t],n=e.length-t.length,a=e.substring(0,n),o=r.prefixes[a];if(void 0!==o)return{unit:r,prefix:o}}return null}function x(t){if("BigNumber"===t.number){var r=o.pi(e.BigNumber);F.rad.value=new e.BigNumber(1),F.deg.value=r.div(180),F.grad.value=r.div(200),F.cycle.value=r.times(2),F.arcsec.value=r.div(648e3),F.arcmin.value=r.div(10800)}else F.rad.value=1,F.deg.value=Math.PI/180,F.grad.value=Math.PI/200,F.cycle.value=2*Math.PI,F.arcsec.value=Math.PI/648e3,F.arcmin.value=Math.PI/10800}var b=n(r(53)),w=n(r(77)),N=n(r(80)),E=n(r(81)),M=n(r(82)),A=n(r(86)),_=n(r(87)),O=n(r(88)),T=n(r(89)),C=n(r(90)),S=n(r(70)),z=n(r(27));c.prototype.type="Unit",c.prototype.isUnit=!0;var B,k,I;c.parse=function(r){if(B=r,k=-1,I="","string"!=typeof B)throw new TypeError("Invalid argument in Unit.parse, string expected");var n=new c;n.units=[],h(),f();var i=d(),a=null;i&&(a="BigNumber"===t.number?new e.BigNumber(i):"Fraction"===t.number?new e.Fraction(i):parseFloat(i)),f();for(var o=1,s=!1,u=[],l=1;;){for(f();"("===I;)u.push(o),l*=o,o=1,h(),f();if(!I)break;var p=I,m=g();if(null==m)throw new SyntaxError('Unexpected "'+p+'" in "'+B+'" at index '+k.toString());var x=y(m);if(null==x)throw new SyntaxError('Unit "'+m+'" not found.');var b=o*l;if(f(),v("^")){f();var w=d();if(null==w)throw new SyntaxError('In "'+r+'", "^" must be followed by a floating-point number');b*=w}n.units.push({unit:x.unit,prefix:x.prefix,power:b});for(var N=0;N<U.length;N++)n.dimensions[N]+=x.unit.dimensions[N]*b;for(f();")"===I;){if(0===u.length)throw new SyntaxError('Unmatched ")" in "'+B+'" at index '+k.toString());l/=u.pop(),h(),f()}s=!1,v("*")?(o=1,s=!0):v("/")?(o=-1,s=!0):o=1;var E=x.unit.base.key;$.auto[E]={unit:x.unit,prefix:x.prefix}}if(f(),I)throw new SyntaxError('Could not parse: "'+r+'"');if(s)throw new SyntaxError('Trailing characters: "'+r+'"');if(0!==u.length)throw new SyntaxError('Unmatched "(" in "'+B+'"');if(0==n.units.length)throw new SyntaxError('"'+r+'" contains no units');return n.value=void 0!=a?n._normalize(a):null,n},c.prototype.clone=function(){var e=new c;e.fixPrefix=this.fixPrefix,e.isUnitListSimplified=this.isUnitListSimplified,e.value=a(this.value),e.dimensions=this.dimensions.slice(0),e.units=[];for(var t=0;t<this.units.length;t++){e.units[t]={};for(var r in this.units[t])this.units[t].hasOwnProperty(r)&&(e.units[t][r]=this.units[t][r])}return e},c.prototype._isDerived=function(){return 0===this.units.length?!1:this.units.length>1||Math.abs(this.units[0].power-1)>1e-15},c.prototype._normalize=function(e){var t,r,n,i,a;if(null==e||0===this.units.length)return e;if(this._isDerived()){var o=e;a=c._getNumberConverter(C(e));for(var s=0;s<this.units.length;s++)t=a(this.units[s].unit.value),i=a(this.units[s].prefix.value),n=a(this.units[s].power),o=N(o,M(N(t,i),n));return o}return a=c._getNumberConverter(C(e)),t=a(this.units[0].unit.value),r=a(this.units[0].unit.offset),i=a(this.units[0].prefix.value),N(b(e,r),N(t,i))},c.prototype._denormalize=function(e,t){var r,n,i,a,o;if(null==e||0===this.units.length)return e;if(this._isDerived()){var s=e;o=c._getNumberConverter(C(e));for(var u=0;u<this.units.length;u++)r=o(this.units[u].unit.value),a=o(this.units[u].prefix.value),i=o(this.units[u].power),s=E(s,M(N(r,a),i));return s}return o=c._getNumberConverter(C(e)),r=o(this.units[0].unit.value),a=o(this.units[0].prefix.value),n=o(this.units[0].unit.offset),void 0==t?w(E(E(e,r),a),n):w(E(E(e,r),t),n)},c.isValuelessUnit=function(e){return null!=y(e)},c.prototype.hasBase=function(e){if("string"==typeof e&&(e=q[e]),!e)return!1;for(var t=0;t<U.length;t++)if(Math.abs(this.dimensions[t]-e.dimensions[t])>1e-12)return!1;return!0},c.prototype.equalBase=function(e){for(var t=0;t<U.length;t++)if(Math.abs(this.dimensions[t]-e.dimensions[t])>1e-12)return!1;return!0},c.prototype.equals=function(e){return this.equalBase(e)&&_(this.value,e.value)},c.prototype.multiply=function(e){for(var t=this.clone(),r=0;r<U.length;r++)t.dimensions[r]=this.dimensions[r]+e.dimensions[r];for(var r=0;r<e.units.length;r++){var n=JSON.parse(JSON.stringify(e.units[r]));t.units.push(n)}if(null!=this.value||null!=e.value){var i=null==this.value?this._normalize(1):this.value,a=null==e.value?e._normalize(1):e.value;t.value=N(i,a)}else t.value=null;return t.isUnitListSimplified=!1,t},c.prototype.divide=function(e){for(var t=this.clone(),r=0;r<U.length;r++)t.dimensions[r]=this.dimensions[r]-e.dimensions[r];for(var r=0;r<e.units.length;r++){var n=JSON.parse(JSON.stringify(e.units[r]));n.power=-n.power,t.units.push(n)}if(null!=this.value||null!=e.value){var i=null==this.value?this._normalize(1):this.value,a=null==e.value?e._normalize(1):e.value;t.value=E(i,a)}else t.value=null;return t.isUnitListSimplified=!1,t},c.prototype.pow=function(e){for(var t=this.clone(),r=0;r<U.length;r++)t.dimensions[r]=this.dimensions[r]*e;for(var r=0;r<t.units.length;r++)t.units[r].power*=e;return null!=t.value?t.value=M(t.value,e):t.value=null,t.isUnitListSimplified=!1,t},c.prototype.abs=function(){var e=this.clone();e.value=A(e.value);for(var t in e.units)"VA"!==e.units[t].unit.name&&"VAR"!==e.units[t].unit.name||(e.units[t].unit=F.W);return e},c.prototype.to=function(e){var t,r=null==this.value?this._normalize(1):this.value;if("string"==typeof e){if(t=c.parse(e),!this.equalBase(t))throw new Error("Units do not match");if(null!==t.value)throw new Error("Cannot convert to a unit with a value");return t.value=a(r),t.fixPrefix=!0,t.isUnitListSimplified=!0,t}if(e&&e.isUnit){if(!this.equalBase(e))throw new Error("Units do not match");if(null!==e.value)throw new Error("Cannot convert to a unit with a value");return t=e.clone(),t.value=a(r),t.fixPrefix=!0,t.isUnitListSimplified=!0,t}throw new Error("String or Unit expected as parameter")},c.prototype.toNumber=function(e){return S(this.toNumeric(e))},c.prototype.toNumeric=function(e){var t=this.to(e);return t._isDerived()?t._denormalize(t.value):t._denormalize(t.value,t.units[0].prefix.value)},c.prototype.toString=function(){return this.format()},c.prototype.toJSON=function(){return{mathjs:"Unit",value:this._denormalize(this.value),unit:this.formatUnits(),fixPrefix:this.fixPrefix}},c.fromJSON=function(e){var t=new c(e.value,e.unit);return t.fixPrefix=e.fixPrefix||!1,t},c.prototype.valueOf=c.prototype.toString,c.prototype.simplifyUnitListLazy=function(){if(!this.isUnitListSimplified&&null!=this.value){var e,t=[];for(var r in G)if(this.hasBase(q[r])){e=r;break}if("NONE"===e)this.units=[];else{var n;e&&G.hasOwnProperty(e)&&(n=G[e]);if(n)this.units=[{unit:n.unit,prefix:n.prefix,power:1}];else{for(var i=0;i<U.length;i++){var a=U[i];Math.abs(this.dimensions[i])>1e-12&&t.push({unit:G[a].unit,prefix:G[a].prefix,power:this.dimensions[i]})}t.length<this.units.length&&(this.units=t)}}this.isUnitListSimplified=!0}},c.prototype.formatUnits=function(){this.simplifyUnitListLazy();for(var e="",t="",r=0,n=0,i=0;i<this.units.length;i++)this.units[i].power>0?(r++,e+=" "+this.units[i].prefix.name+this.units[i].unit.name,Math.abs(this.units[i].power-1)>1e-15&&(e+="^"+this.units[i].power)):this.units[i].power<0&&n++;if(n>0)for(var i=0;i<this.units.length;i++)this.units[i].power<0&&(r>0?(t+=" "+this.units[i].prefix.name+this.units[i].unit.name,Math.abs(this.units[i].power+1)>1e-15&&(t+="^"+-this.units[i].power)):(t+=" "+this.units[i].prefix.name+this.units[i].unit.name,t+="^"+this.units[i].power));e=e.substr(1),t=t.substr(1),r>1&&n>0&&(e="("+e+")"),n>1&&r>0&&(t="("+t+")");var a=e;return r>0&&n>0&&(a+=" / "),a+=t},c.prototype.format=function(e){this.simplifyUnitListLazy();var t=!1,r=!0;"undefined"!=typeof this.value&&null!==this.value&&this.value.isComplex&&(t=Math.abs(this.value.re)<1e-14,r=Math.abs(this.value.im)<1e-14);for(var n in this.units)this.units[n].unit&&("VA"===this.units[n].unit.name&&t?this.units[n].unit=F.VAR:"VAR"!==this.units[n].unit.name||t||(this.units[n].unit=F.VA));1!==this.units.length||this.fixPrefix||Math.abs(this.units[0].power-Math.round(this.units[0].power))<1e-14&&(this.units[0].prefix=this._bestPrefix());var i=this._denormalize(this.value),a=null!==this.value?T(i,e||{}):"",o=this.formatUnits();return this.value&&this.value.isComplex&&(a="("+a+")"),o.length>0&&a.length>0&&(a+=" "),a+=o},c.prototype._bestPrefix=function(){if(1!==this.units.length)throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");if(Math.abs(this.units[0].power-Math.round(this.units[0].power))>=1e-14)throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");var e=A(this.value),t=A(this.units[0].unit.value),r=this.units[0].prefix;
if(0===e)return r;var n=this.units[0].power,i=Math.abs(Math.log(e/Math.pow(r.value*t,n))/Math.LN10-1.2),a=this.units[0].unit.prefixes;for(var o in a)if(a.hasOwnProperty(o)){var s=a[o];if(s.scientific){var u=Math.abs(Math.log(e/Math.pow(s.value*t,n))/Math.LN10-1.2);(i>u||u===i&&s.name.length<r.name.length)&&(r=s,i=u)}}return r};var R={NONE:{"":{name:"",value:1,scientific:!0}},SHORT:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:10,scientific:!1},h:{name:"h",value:100,scientific:!1},k:{name:"k",value:1e3,scientific:!0},M:{name:"M",value:1e6,scientific:!0},G:{name:"G",value:1e9,scientific:!0},T:{name:"T",value:1e12,scientific:!0},P:{name:"P",value:1e15,scientific:!0},E:{name:"E",value:1e18,scientific:!0},Z:{name:"Z",value:1e21,scientific:!0},Y:{name:"Y",value:1e24,scientific:!0},d:{name:"d",value:.1,scientific:!1},c:{name:"c",value:.01,scientific:!1},m:{name:"m",value:.001,scientific:!0},u:{name:"u",value:1e-6,scientific:!0},n:{name:"n",value:1e-9,scientific:!0},p:{name:"p",value:1e-12,scientific:!0},f:{name:"f",value:1e-15,scientific:!0},a:{name:"a",value:1e-18,scientific:!0},z:{name:"z",value:1e-21,scientific:!0},y:{name:"y",value:1e-24,scientific:!0}},LONG:{"":{name:"",value:1,scientific:!0},deca:{name:"deca",value:10,scientific:!1},hecto:{name:"hecto",value:100,scientific:!1},kilo:{name:"kilo",value:1e3,scientific:!0},mega:{name:"mega",value:1e6,scientific:!0},giga:{name:"giga",value:1e9,scientific:!0},tera:{name:"tera",value:1e12,scientific:!0},peta:{name:"peta",value:1e15,scientific:!0},exa:{name:"exa",value:1e18,scientific:!0},zetta:{name:"zetta",value:1e21,scientific:!0},yotta:{name:"yotta",value:1e24,scientific:!0},deci:{name:"deci",value:.1,scientific:!1},centi:{name:"centi",value:.01,scientific:!1},milli:{name:"milli",value:.001,scientific:!0},micro:{name:"micro",value:1e-6,scientific:!0},nano:{name:"nano",value:1e-9,scientific:!0},pico:{name:"pico",value:1e-12,scientific:!0},femto:{name:"femto",value:1e-15,scientific:!0},atto:{name:"atto",value:1e-18,scientific:!0},zepto:{name:"zepto",value:1e-21,scientific:!0},yocto:{name:"yocto",value:1e-24,scientific:!0}},SQUARED:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:100,scientific:!1},h:{name:"h",value:1e4,scientific:!1},k:{name:"k",value:1e6,scientific:!0},M:{name:"M",value:1e12,scientific:!0},G:{name:"G",value:1e18,scientific:!0},T:{name:"T",value:1e24,scientific:!0},P:{name:"P",value:1e30,scientific:!0},E:{name:"E",value:1e36,scientific:!0},Z:{name:"Z",value:1e42,scientific:!0},Y:{name:"Y",value:1e48,scientific:!0},d:{name:"d",value:.01,scientific:!1},c:{name:"c",value:1e-4,scientific:!1},m:{name:"m",value:1e-6,scientific:!0},u:{name:"u",value:1e-12,scientific:!0},n:{name:"n",value:1e-18,scientific:!0},p:{name:"p",value:1e-24,scientific:!0},f:{name:"f",value:1e-30,scientific:!0},a:{name:"a",value:1e-36,scientific:!0},z:{name:"z",value:1e-42,scientific:!0},y:{name:"y",value:1e-48,scientific:!0}},CUBIC:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:1e3,scientific:!1},h:{name:"h",value:1e6,scientific:!1},k:{name:"k",value:1e9,scientific:!0},M:{name:"M",value:1e18,scientific:!0},G:{name:"G",value:1e27,scientific:!0},T:{name:"T",value:1e36,scientific:!0},P:{name:"P",value:1e45,scientific:!0},E:{name:"E",value:1e54,scientific:!0},Z:{name:"Z",value:1e63,scientific:!0},Y:{name:"Y",value:1e72,scientific:!0},d:{name:"d",value:.001,scientific:!1},c:{name:"c",value:1e-6,scientific:!1},m:{name:"m",value:1e-9,scientific:!0},u:{name:"u",value:1e-18,scientific:!0},n:{name:"n",value:1e-27,scientific:!0},p:{name:"p",value:1e-36,scientific:!0},f:{name:"f",value:1e-45,scientific:!0},a:{name:"a",value:1e-54,scientific:!0},z:{name:"z",value:1e-63,scientific:!0},y:{name:"y",value:1e-72,scientific:!0}},BINARY_SHORT:{"":{name:"",value:1,scientific:!0},k:{name:"k",value:1e3,scientific:!0},M:{name:"M",value:1e6,scientific:!0},G:{name:"G",value:1e9,scientific:!0},T:{name:"T",value:1e12,scientific:!0},P:{name:"P",value:1e15,scientific:!0},E:{name:"E",value:1e18,scientific:!0},Z:{name:"Z",value:1e21,scientific:!0},Y:{name:"Y",value:1e24,scientific:!0},Ki:{name:"Ki",value:1024,scientific:!0},Mi:{name:"Mi",value:Math.pow(1024,2),scientific:!0},Gi:{name:"Gi",value:Math.pow(1024,3),scientific:!0},Ti:{name:"Ti",value:Math.pow(1024,4),scientific:!0},Pi:{name:"Pi",value:Math.pow(1024,5),scientific:!0},Ei:{name:"Ei",value:Math.pow(1024,6),scientific:!0},Zi:{name:"Zi",value:Math.pow(1024,7),scientific:!0},Yi:{name:"Yi",value:Math.pow(1024,8),scientific:!0}},BINARY_LONG:{"":{name:"",value:1,scientific:!0},kilo:{name:"kilo",value:1e3,scientific:!0},mega:{name:"mega",value:1e6,scientific:!0},giga:{name:"giga",value:1e9,scientific:!0},tera:{name:"tera",value:1e12,scientific:!0},peta:{name:"peta",value:1e15,scientific:!0},exa:{name:"exa",value:1e18,scientific:!0},zetta:{name:"zetta",value:1e21,scientific:!0},yotta:{name:"yotta",value:1e24,scientific:!0},kibi:{name:"kibi",value:1024,scientific:!0},mebi:{name:"mebi",value:Math.pow(1024,2),scientific:!0},gibi:{name:"gibi",value:Math.pow(1024,3),scientific:!0},tebi:{name:"tebi",value:Math.pow(1024,4),scientific:!0},pebi:{name:"pebi",value:Math.pow(1024,5),scientific:!0},exi:{name:"exi",value:Math.pow(1024,6),scientific:!0},zebi:{name:"zebi",value:Math.pow(1024,7),scientific:!0},yobi:{name:"yobi",value:Math.pow(1024,8),scientific:!0}},BTU:{"":{name:"",value:1,scientific:!0},MM:{name:"MM",value:1e6,scientific:!0}}};R.SHORTLONG={};for(var P in R.SHORT)R.SHORT.hasOwnProperty(P)&&(R.SHORTLONG[P]=R.SHORT[P]);for(var P in R.LONG)R.LONG.hasOwnProperty(P)&&(R.SHORTLONG[P]=R.LONG[P]);var U=["MASS","LENGTH","TIME","CURRENT","TEMPERATURE","LUMINOUS_INTENSITY","AMOUNT_OF_SUBSTANCE","ANGLE","BIT"],q={NONE:{dimensions:[0,0,0,0,0,0,0,0,0]},MASS:{dimensions:[1,0,0,0,0,0,0,0,0]},LENGTH:{dimensions:[0,1,0,0,0,0,0,0,0]},TIME:{dimensions:[0,0,1,0,0,0,0,0,0]},CURRENT:{dimensions:[0,0,0,1,0,0,0,0,0]},TEMPERATURE:{dimensions:[0,0,0,0,1,0,0,0,0]},LUMINOUS_INTENSITY:{dimensions:[0,0,0,0,0,1,0,0,0]},AMOUNT_OF_SUBSTANCE:{dimensions:[0,0,0,0,0,0,1,0,0]},FORCE:{dimensions:[1,1,-2,0,0,0,0,0,0]},SURFACE:{dimensions:[0,2,0,0,0,0,0,0,0]},VOLUME:{dimensions:[0,3,0,0,0,0,0,0,0]},ENERGY:{dimensions:[1,2,-2,0,0,0,0,0,0]},POWER:{dimensions:[1,2,-3,0,0,0,0,0,0]},PRESSURE:{dimensions:[1,-1,-2,0,0,0,0,0,0]},ELECTRIC_CHARGE:{dimensions:[0,0,1,1,0,0,0,0,0]},ELECTRIC_CAPACITANCE:{dimensions:[-1,-2,4,2,0,0,0,0,0]},ELECTRIC_POTENTIAL:{dimensions:[1,2,-3,-1,0,0,0,0,0]},ELECTRIC_RESISTANCE:{dimensions:[1,2,-3,-2,0,0,0,0,0]},ELECTRIC_INDUCTANCE:{dimensions:[1,2,-2,-2,0,0,0,0,0]},ELECTRIC_CONDUCTANCE:{dimensions:[-1,-2,3,2,0,0,0,0,0]},MAGNETIC_FLUX:{dimensions:[1,2,-2,-1,0,0,0,0,0]},MAGNETIC_FLUX_DENSITY:{dimensions:[1,0,-2,-1,0,0,0,0,0]},FREQUENCY:{dimensions:[0,0,-1,0,0,0,0,0,0]},ANGLE:{dimensions:[0,0,0,0,0,0,0,1,0]},BIT:{dimensions:[0,0,0,0,0,0,0,0,1]}};for(var P in q)q[P].key=P;var L={},j={name:"",base:L,value:1,offset:0,dimensions:[0,0,0,0,0,0,0,0,0]},F={meter:{name:"meter",base:q.LENGTH,prefixes:R.LONG,value:1,offset:0},inch:{name:"inch",base:q.LENGTH,prefixes:R.NONE,value:.0254,offset:0},foot:{name:"foot",base:q.LENGTH,prefixes:R.NONE,value:.3048,offset:0},yard:{name:"yard",base:q.LENGTH,prefixes:R.NONE,value:.9144,offset:0},mile:{name:"mile",base:q.LENGTH,prefixes:R.NONE,value:1609.344,offset:0},link:{name:"link",base:q.LENGTH,prefixes:R.NONE,value:.201168,offset:0},rod:{name:"rod",base:q.LENGTH,prefixes:R.NONE,value:5.02921,offset:0},chain:{name:"chain",base:q.LENGTH,prefixes:R.NONE,value:20.1168,offset:0},angstrom:{name:"angstrom",base:q.LENGTH,prefixes:R.NONE,value:1e-10,offset:0},m:{name:"m",base:q.LENGTH,prefixes:R.SHORT,value:1,offset:0},"in":{name:"in",base:q.LENGTH,prefixes:R.NONE,value:.0254,offset:0},ft:{name:"ft",base:q.LENGTH,prefixes:R.NONE,value:.3048,offset:0},yd:{name:"yd",base:q.LENGTH,prefixes:R.NONE,value:.9144,offset:0},mi:{name:"mi",base:q.LENGTH,prefixes:R.NONE,value:1609.344,offset:0},li:{name:"li",base:q.LENGTH,prefixes:R.NONE,value:.201168,offset:0},rd:{name:"rd",base:q.LENGTH,prefixes:R.NONE,value:5.02921,offset:0},ch:{name:"ch",base:q.LENGTH,prefixes:R.NONE,value:20.1168,offset:0},mil:{name:"mil",base:q.LENGTH,prefixes:R.NONE,value:254e-7,offset:0},m2:{name:"m2",base:q.SURFACE,prefixes:R.SQUARED,value:1,offset:0},sqin:{name:"sqin",base:q.SURFACE,prefixes:R.NONE,value:64516e-8,offset:0},sqft:{name:"sqft",base:q.SURFACE,prefixes:R.NONE,value:.09290304,offset:0},sqyd:{name:"sqyd",base:q.SURFACE,prefixes:R.NONE,value:.83612736,offset:0},sqmi:{name:"sqmi",base:q.SURFACE,prefixes:R.NONE,value:2589988.110336,offset:0},sqrd:{name:"sqrd",base:q.SURFACE,prefixes:R.NONE,value:25.29295,offset:0},sqch:{name:"sqch",base:q.SURFACE,prefixes:R.NONE,value:404.6873,offset:0},sqmil:{name:"sqmil",base:q.SURFACE,prefixes:R.NONE,value:6.4516e-10,offset:0},acre:{name:"acre",base:q.SURFACE,prefixes:R.NONE,value:4046.86,offset:0},hectare:{name:"hectare",base:q.SURFACE,prefixes:R.NONE,value:1e4,offset:0},m3:{name:"m3",base:q.VOLUME,prefixes:R.CUBIC,value:1,offset:0},L:{name:"L",base:q.VOLUME,prefixes:R.SHORT,value:.001,offset:0},l:{name:"l",base:q.VOLUME,prefixes:R.SHORT,value:.001,offset:0},litre:{name:"litre",base:q.VOLUME,prefixes:R.LONG,value:.001,offset:0},cuin:{name:"cuin",base:q.VOLUME,prefixes:R.NONE,value:16387064e-12,offset:0},cuft:{name:"cuft",base:q.VOLUME,prefixes:R.NONE,value:.028316846592,offset:0},cuyd:{name:"cuyd",base:q.VOLUME,prefixes:R.NONE,value:.764554857984,offset:0},teaspoon:{name:"teaspoon",base:q.VOLUME,prefixes:R.NONE,value:5e-6,offset:0},tablespoon:{name:"tablespoon",base:q.VOLUME,prefixes:R.NONE,value:15e-6,offset:0},drop:{name:"drop",base:q.VOLUME,prefixes:R.NONE,value:5e-8,offset:0},gtt:{name:"gtt",base:q.VOLUME,prefixes:R.NONE,value:5e-8,offset:0},minim:{name:"minim",base:q.VOLUME,prefixes:R.NONE,value:6.161152e-8,offset:0},fluiddram:{name:"fluiddram",base:q.VOLUME,prefixes:R.NONE,value:36966911e-13,offset:0},fluidounce:{name:"fluidounce",base:q.VOLUME,prefixes:R.NONE,value:2957353e-11,offset:0},gill:{name:"gill",base:q.VOLUME,prefixes:R.NONE,value:.0001182941,offset:0},cc:{name:"cc",base:q.VOLUME,prefixes:R.NONE,value:1e-6,offset:0},cup:{name:"cup",base:q.VOLUME,prefixes:R.NONE,value:.0002365882,offset:0},pint:{name:"pint",base:q.VOLUME,prefixes:R.NONE,value:.0004731765,offset:0},quart:{name:"quart",base:q.VOLUME,prefixes:R.NONE,value:.0009463529,offset:0},gallon:{name:"gallon",base:q.VOLUME,prefixes:R.NONE,value:.003785412,offset:0},beerbarrel:{name:"beerbarrel",base:q.VOLUME,prefixes:R.NONE,value:.1173478,offset:0},oilbarrel:{name:"oilbarrel",base:q.VOLUME,prefixes:R.NONE,value:.1589873,offset:0},hogshead:{name:"hogshead",base:q.VOLUME,prefixes:R.NONE,value:.238481,offset:0},fldr:{name:"fldr",base:q.VOLUME,prefixes:R.NONE,value:36966911e-13,offset:0},floz:{name:"floz",base:q.VOLUME,prefixes:R.NONE,value:2957353e-11,offset:0},gi:{name:"gi",base:q.VOLUME,prefixes:R.NONE,value:.0001182941,offset:0},cp:{name:"cp",base:q.VOLUME,prefixes:R.NONE,value:.0002365882,offset:0},pt:{name:"pt",base:q.VOLUME,prefixes:R.NONE,value:.0004731765,offset:0},qt:{name:"qt",base:q.VOLUME,prefixes:R.NONE,value:.0009463529,offset:0},gal:{name:"gal",base:q.VOLUME,prefixes:R.NONE,value:.003785412,offset:0},bbl:{name:"bbl",base:q.VOLUME,prefixes:R.NONE,value:.1173478,offset:0},obl:{name:"obl",base:q.VOLUME,prefixes:R.NONE,value:.1589873,offset:0},g:{name:"g",base:q.MASS,prefixes:R.SHORT,value:.001,offset:0},gram:{name:"gram",base:q.MASS,prefixes:R.LONG,value:.001,offset:0},ton:{name:"ton",base:q.MASS,prefixes:R.SHORT,value:907.18474,offset:0},tonne:{name:"tonne",base:q.MASS,prefixes:R.SHORT,value:1e3,offset:0},grain:{name:"grain",base:q.MASS,prefixes:R.NONE,value:6479891e-11,offset:0},dram:{name:"dram",base:q.MASS,prefixes:R.NONE,value:.0017718451953125,offset:0},ounce:{name:"ounce",base:q.MASS,prefixes:R.NONE,value:.028349523125,offset:0},poundmass:{name:"poundmass",base:q.MASS,prefixes:R.NONE,value:.45359237,offset:0},hundredweight:{name:"hundredweight",base:q.MASS,prefixes:R.NONE,value:45.359237,offset:0},stick:{name:"stick",base:q.MASS,prefixes:R.NONE,value:.115,offset:0},stone:{name:"stone",base:q.MASS,prefixes:R.NONE,value:6.35029318,offset:0},gr:{name:"gr",base:q.MASS,prefixes:R.NONE,value:6479891e-11,offset:0},dr:{name:"dr",base:q.MASS,prefixes:R.NONE,value:.0017718451953125,offset:0},oz:{name:"oz",base:q.MASS,prefixes:R.NONE,value:.028349523125,offset:0},lbm:{name:"lbm",base:q.MASS,prefixes:R.NONE,value:.45359237,offset:0},cwt:{name:"cwt",base:q.MASS,prefixes:R.NONE,value:45.359237,offset:0},s:{name:"s",base:q.TIME,prefixes:R.SHORT,value:1,offset:0},min:{name:"min",base:q.TIME,prefixes:R.NONE,value:60,offset:0},h:{name:"h",base:q.TIME,prefixes:R.NONE,value:3600,offset:0},second:{name:"second",base:q.TIME,prefixes:R.LONG,value:1,offset:0},sec:{name:"sec",base:q.TIME,prefixes:R.LONG,value:1,offset:0},minute:{name:"minute",base:q.TIME,prefixes:R.NONE,value:60,offset:0},hour:{name:"hour",base:q.TIME,prefixes:R.NONE,value:3600,offset:0},day:{name:"day",base:q.TIME,prefixes:R.NONE,value:86400,offset:0},week:{name:"week",base:q.TIME,prefixes:R.NONE,value:604800,offset:0},month:{name:"month",base:q.TIME,prefixes:R.NONE,value:2629800,offset:0},year:{name:"year",base:q.TIME,prefixes:R.NONE,value:31557600,offset:0},decade:{name:"year",base:q.TIME,prefixes:R.NONE,value:315576e3,offset:0},century:{name:"century",base:q.TIME,prefixes:R.NONE,value:315576e4,offset:0},millennium:{name:"millennium",base:q.TIME,prefixes:R.NONE,value:315576e5,offset:0},hertz:{name:"Hertz",base:q.FREQUENCY,prefixes:R.LONG,value:1,offset:0,reciprocal:!0},Hz:{name:"Hz",base:q.FREQUENCY,prefixes:R.SHORT,value:1,offset:0,reciprocal:!0},rad:{name:"rad",base:q.ANGLE,prefixes:R.NONE,value:1,offset:0},deg:{name:"deg",base:q.ANGLE,prefixes:R.NONE,value:null,offset:0},grad:{name:"grad",base:q.ANGLE,prefixes:R.NONE,value:null,offset:0},cycle:{name:"cycle",base:q.ANGLE,prefixes:R.NONE,value:null,offset:0},arcsec:{name:"arcsec",base:q.ANGLE,prefixes:R.NONE,value:null,offset:0},arcmin:{name:"arcmin",base:q.ANGLE,prefixes:R.NONE,value:null,offset:0},A:{name:"A",base:q.CURRENT,prefixes:R.SHORT,value:1,offset:0},ampere:{name:"ampere",base:q.CURRENT,prefixes:R.LONG,value:1,offset:0},K:{name:"K",base:q.TEMPERATURE,prefixes:R.NONE,value:1,offset:0},degC:{name:"degC",base:q.TEMPERATURE,prefixes:R.NONE,value:1,offset:273.15},degF:{name:"degF",base:q.TEMPERATURE,prefixes:R.NONE,value:1/1.8,offset:459.67},degR:{name:"degR",base:q.TEMPERATURE,prefixes:R.NONE,value:1/1.8,offset:0},kelvin:{name:"kelvin",base:q.TEMPERATURE,prefixes:R.NONE,value:1,offset:0},celsius:{name:"celsius",base:q.TEMPERATURE,prefixes:R.NONE,value:1,offset:273.15},fahrenheit:{name:"fahrenheit",base:q.TEMPERATURE,prefixes:R.NONE,value:1/1.8,offset:459.67},rankine:{name:"rankine",base:q.TEMPERATURE,prefixes:R.NONE,value:1/1.8,offset:0},mol:{name:"mol",base:q.AMOUNT_OF_SUBSTANCE,prefixes:R.SHORT,value:1,offset:0},mole:{name:"mole",base:q.AMOUNT_OF_SUBSTANCE,prefixes:R.LONG,value:1,offset:0},cd:{name:"cd",base:q.LUMINOUS_INTENSITY,prefixes:R.NONE,value:1,offset:0},candela:{name:"candela",base:q.LUMINOUS_INTENSITY,prefixes:R.NONE,value:1,offset:0},N:{name:"N",base:q.FORCE,prefixes:R.SHORT,value:1,offset:0},newton:{name:"newton",base:q.FORCE,prefixes:R.LONG,value:1,offset:0},dyn:{name:"dyn",base:q.FORCE,prefixes:R.SHORT,value:1e-5,offset:0},dyne:{name:"dyne",base:q.FORCE,prefixes:R.LONG,value:1e-5,offset:0},lbf:{name:"lbf",base:q.FORCE,prefixes:R.NONE,value:4.4482216152605,offset:0},poundforce:{name:"poundforce",base:q.FORCE,prefixes:R.NONE,value:4.4482216152605,offset:0},kip:{name:"kip",base:q.FORCE,prefixes:R.LONG,value:4448.2216,offset:0},J:{name:"J",base:q.ENERGY,prefixes:R.SHORT,value:1,offset:0},joule:{name:"joule",base:q.ENERGY,prefixes:R.SHORT,value:1,offset:0},erg:{name:"erg",base:q.ENERGY,prefixes:R.NONE,value:1e-5,offset:0},Wh:{name:"Wh",base:q.ENERGY,prefixes:R.SHORT,value:3600,offset:0},BTU:{name:"BTU",base:q.ENERGY,prefixes:R.BTU,value:1055.05585262,offset:0},eV:{name:"eV",base:q.ENERGY,prefixes:R.SHORT,value:1.602176565e-19,offset:0},electronvolt:{name:"electronvolt",base:q.ENERGY,prefixes:R.LONG,value:1.602176565e-19,offset:0},W:{name:"W",base:q.POWER,prefixes:R.SHORT,value:1,offset:0},watt:{name:"W",base:q.POWER,prefixes:R.LONG,value:1,offset:0},hp:{name:"hp",base:q.POWER,prefixes:R.NONE,value:745.6998715386,offset:0},VAR:{name:"VAR",base:q.POWER,prefixes:R.SHORT,value:z.I,offset:0},VA:{name:"VA",base:q.POWER,prefixes:R.SHORT,value:1,offset:0},Pa:{name:"Pa",base:q.PRESSURE,prefixes:R.SHORT,value:1,offset:0},psi:{name:"psi",base:q.PRESSURE,prefixes:R.NONE,value:6894.75729276459,offset:0},atm:{name:"atm",base:q.PRESSURE,prefixes:R.NONE,value:101325,offset:0},bar:{name:"bar",base:q.PRESSURE,prefixes:R.NONE,value:1e5,offset:0},torr:{name:"torr",base:q.PRESSURE,prefixes:R.NONE,value:133.322,offset:0},mmHg:{name:"mmHg",base:q.PRESSURE,prefixes:R.NONE,value:133.322,offset:0},mmH2O:{name:"mmH2O",base:q.PRESSURE,prefixes:R.NONE,value:9.80665,offset:0},cmH2O:{name:"cmH2O",base:q.PRESSURE,prefixes:R.NONE,value:98.0665,offset:0},coulomb:{name:"coulomb",base:q.ELECTRIC_CHARGE,prefixes:R.LONG,value:1,offset:0},C:{name:"C",base:q.ELECTRIC_CHARGE,prefixes:R.SHORT,value:1,offset:0},farad:{name:"farad",base:q.ELECTRIC_CAPACITANCE,prefixes:R.LONG,value:1,offset:0},F:{name:"F",base:q.ELECTRIC_CAPACITANCE,prefixes:R.SHORT,value:1,offset:0},volt:{name:"volt",base:q.ELECTRIC_POTENTIAL,prefixes:R.LONG,value:1,offset:0},V:{name:"V",base:q.ELECTRIC_POTENTIAL,prefixes:R.SHORT,value:1,offset:0},ohm:{name:"ohm",base:q.ELECTRIC_RESISTANCE,prefixes:R.SHORTLONG,value:1,offset:0},henry:{name:"henry",base:q.ELECTRIC_INDUCTANCE,prefixes:R.LONG,value:1,offset:0},H:{name:"H",base:q.ELECTRIC_INDUCTANCE,prefixes:R.SHORT,value:1,offset:0},siemens:{name:"siemens",base:q.ELECTRIC_CONDUCTANCE,prefixes:R.LONG,value:1,offset:0},S:{name:"S",base:q.ELECTRIC_CONDUCTANCE,prefixes:R.SHORT,value:1,offset:0},weber:{name:"weber",base:q.MAGNETIC_FLUX,prefixes:R.LONG,value:1,offset:0},Wb:{name:"Wb",base:q.MAGNETIC_FLUX,prefixes:R.SHORT,value:1,offset:0},tesla:{name:"tesla",base:q.MAGNETIC_FLUX_DENSITY,prefixes:R.LONG,value:1,offset:0},T:{name:"T",base:q.MAGNETIC_FLUX_DENSITY,prefixes:R.SHORT,value:1,offset:0},b:{name:"b",base:q.BIT,prefixes:R.BINARY_SHORT,value:1,offset:0},bits:{name:"bits",base:q.BIT,prefixes:R.BINARY_LONG,value:1,offset:0},B:{name:"B",base:q.BIT,prefixes:R.BINARY_SHORT,value:8,offset:0},bytes:{name:"bytes",base:q.BIT,prefixes:R.BINARY_LONG,value:8,offset:0}},D={meters:"meter",inches:"inch",feet:"foot",yards:"yard",miles:"mile",links:"link",rods:"rod",chains:"chain",angstroms:"angstrom",lt:"l",litres:"litre",liter:"litre",liters:"litre",teaspoons:"teaspoon",tablespoons:"tablespoon",minims:"minim",fluiddrams:"fluiddram",fluidounces:"fluidounce",gills:"gill",cups:"cup",pints:"pint",quarts:"quart",gallons:"gallon",beerbarrels:"beerbarrel",oilbarrels:"oilbarrel",hogsheads:"hogshead",gtts:"gtt",grams:"gram",tons:"ton",tonnes:"tonne",grains:"grain",drams:"dram",ounces:"ounce",poundmasses:"poundmass",hundredweights:"hundredweight",sticks:"stick",lb:"lbm",lbs:"lbm",kips:"kip",acres:"acre",hectares:"hectare",sqfeet:"sqft",sqyard:"sqyd",sqmile:"sqmi",sqmiles:"sqmi",mmhg:"mmHg",mmh2o:"mmH2O",cmh2o:"cmH2O",seconds:"second",secs:"second",minutes:"minute",mins:"minute",hours:"hour",hr:"hour",hrs:"hour",days:"day",weeks:"week",months:"month",years:"year",hertz:"hertz",radians:"rad",degree:"deg",degrees:"deg",gradian:"grad",gradians:"grad",cycles:"cycle",arcsecond:"arcsec",arcseconds:"arcsec",arcminute:"arcmin",arcminutes:"arcmin",BTUs:"BTU",watts:"watt",joules:"joule",amperes:"ampere",coulombs:"coulomb",volts:"volt",ohms:"ohm",farads:"farad",webers:"weber",teslas:"tesla",electronvolts:"electronvolt",moles:"mole"};x(t),u.on("config",function(e,t){e.number!==t.number&&x(e)});var $={si:{NONE:{unit:j,prefix:R.NONE[""]},LENGTH:{unit:F.m,prefix:R.SHORT[""]},MASS:{unit:F.g,prefix:R.SHORT.k},TIME:{unit:F.s,prefix:R.SHORT[""]},CURRENT:{unit:F.A,prefix:R.SHORT[""]},TEMPERATURE:{unit:F.K,prefix:R.SHORT[""]},LUMINOUS_INTENSITY:{unit:F.cd,prefix:R.SHORT[""]},AMOUNT_OF_SUBSTANCE:{unit:F.mol,prefix:R.SHORT[""]},ANGLE:{unit:F.rad,prefix:R.SHORT[""]},BIT:{unit:F.bit,prefix:R.SHORT[""]},FORCE:{unit:F.N,prefix:R.SHORT[""]},ENERGY:{unit:F.J,prefix:R.SHORT[""]},POWER:{unit:F.W,prefix:R.SHORT[""]},PRESSURE:{unit:F.Pa,prefix:R.SHORT[""]},ELECTRIC_CHARGE:{unit:F.C,prefix:R.SHORT[""]},ELECTRIC_CAPACITANCE:{unit:F.F,prefix:R.SHORT[""]},ELECTRIC_POTENTIAL:{unit:F.V,prefix:R.SHORT[""]},ELECTRIC_RESISTANCE:{unit:F.ohm,prefix:R.SHORT[""]},ELECTRIC_INDUCTANCE:{unit:F.H,prefix:R.SHORT[""]},ELECTRIC_CONDUCTANCE:{unit:F.S,prefix:R.SHORT[""]},MAGNETIC_FLUX:{unit:F.Wb,prefix:R.SHORT[""]},MAGNETIC_FLUX_DENSITY:{unit:F.T,prefix:R.SHORT[""]},FREQUENCY:{unit:F.Hz,prefix:R.SHORT[""]}}};$.cgs=JSON.parse(JSON.stringify($.si)),$.cgs.LENGTH={unit:F.m,prefix:R.SHORT.c},$.cgs.MASS={unit:F.g,prefix:R.SHORT[""]},$.cgs.FORCE={unit:F.dyn,prefix:R.SHORT[""]},$.cgs.ENERGY={unit:F.erg,prefix:R.NONE[""]},$.us=JSON.parse(JSON.stringify($.si)),$.us.LENGTH={unit:F.ft,prefix:R.NONE[""]},$.us.MASS={unit:F.lbm,prefix:R.NONE[""]},$.us.TEMPERATURE={unit:F.degF,prefix:R.NONE[""]},$.us.FORCE={unit:F.lbf,prefix:R.NONE[""]},$.us.ENERGY={unit:F.BTU,prefix:R.BTU[""]},$.us.POWER={unit:F.hp,prefix:R.NONE[""]},$.us.PRESSURE={unit:F.psi,prefix:R.NONE[""]},$.auto=JSON.parse(JSON.stringify($.si));var G=$.auto;c.setUnitSystem=function(e){if(!$.hasOwnProperty(e))throw new Error("Unit system "+e+" does not exist. Choices are: "+Object.keys($).join(", "));G=$[e]},c.getUnitSystem=function(){for(var e in $)if($[e]===G)return e},c.typeConverters={BigNumber:function(t){return new e.BigNumber(t+"")},Fraction:function(t){return new e.Fraction(t)},Complex:function(e){return e},number:function(e){return e}},c._getNumberConverter=function(e){if(!c.typeConverters[e])throw new TypeError('Unsupported type "'+e+'"');return c.typeConverters[e]};for(var P in F){var H=F[P];H.dimensions=H.base.dimensions}for(var V in D)if(D.hasOwnProperty(V)){var H=F[D[V]],Z=Object.create(H);Z.name=V,F[V]=Z}return c.PREFIXES=R,c.BASE_UNITS=q,c.UNITS=F,c.UNIT_SYSTEMS=$,c}var i=r(23).endsWith,a=r(3).clone,o=r(76);t.name="Unit",t.path="type",t.factory=n,t.math=!0},function(e,t,r){function n(e){return e[0].precision}var i=r(45).memoize;t.e=i(function(e){return new e(1).exp()},n),t.phi=i(function(e){return new e(1).plus(new e(5).sqrt()).div(2)},n),t.pi=i(function(e){return pi=e.acos(-1)},n),t.tau=i(function(e){return t.pi(e).times(2)},n)},function(e,t,r){"use strict";function n(e,t,n,a){var o=r(32),s=n(r(52)),u=n(r(53)),c=n(r(78)),f=n(r(54)),l=n(r(61)),p=n(r(79)),h=n(r(56)),m=n(r(57)),d=n(r(58)),g=a("subtract",{"number, number":function(e,t){return e-t},"Complex, Complex":function(e,t){return e.sub(t)},"BigNumber, BigNumber":function(e,t){return e.minus(t)},"Fraction, Fraction":function(e,t){return e.sub(t)},"Unit, Unit":function(e,t){if(null==e.value)throw new Error("Parameter x contains a unit with undefined value");if(null==t.value)throw new Error("Parameter y contains a unit with undefined value");if(!e.equalBase(t))throw new Error("Units do not match");var r=e.clone();return r.value=g(r.value,t.value),r.fixPrefix=!1,r},"Matrix, Matrix":function(e,t){var r=e.size(),n=t.size();if(r.length!==n.length)throw new i(r.length,n.length);var a;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":a=p(e,t,g);break;default:a=l(t,e,g,!0)}break;default:switch(t.storage()){case"sparse":a=f(e,t,g,!1);break;default:a=m(e,t,g)}}return a},"Array, Array":function(e,t){return g(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return g(s(e),t)},"Matrix, Array":function(e,t){return g(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=h(e,c(t),u);break;default:r=d(e,t,g)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=h(t,e,g,!0);break;default:r=d(t,e,g,!0)}return r},"Array, any":function(e,t){return d(s(e),t,g,!1).valueOf()},"any, Array":function(e,t){return d(s(t),e,g,!0).valueOf()}});return g.toTex={2:"\\left(${args[0]}"+o.operators.subtract+"${args[1]}\\right)"},g}var i=r(42);t.name="subtract",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=r(32),s=a("unaryMinus",{number:function(e){return-e},Complex:function(e){return e.neg()},BigNumber:function(e){return e.neg()},Fraction:function(e){return e.neg()},Unit:function(e){var t=e.clone();return t.value=s(e.value),t},"Array | Matrix":function(e){return i(e,s,!0)}});return s.toTex={1:o.operators.unaryMinus+"\\left(${args[0]}\\right)"},s}var i=r(19);t.name="unaryMinus",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(48)),s=e.SparseMatrix,u=function(e,t,r){var n=e._values,u=e._index,c=e._ptr,f=e._size,l=e._datatype,p=t._values,h=t._index,m=t._ptr,d=t._size,g=t._datatype;if(f.length!==d.length)throw new i(f.length,d.length);if(f[0]!==d[0]||f[1]!==d[1])throw new RangeError("Dimension mismatch. Matrix A ("+f+") must match Matrix B ("+d+")");var v,y=f[0],x=f[1],b=o,w=0,N=r;"string"==typeof l&&l===g&&(v=l,b=a.find(o,[v,v]),w=a.convert(0,v),N=a.find(r,[v,v]));var E,M,A,_,O=n&&p?[]:void 0,T=[],C=[],S=new s({values:O,index:T,ptr:C,size:[y,x],datatype:v}),z=O?[]:void 0,B=O?[]:void 0,k=[],I=[];for(M=0;x>M;M++){C[M]=T.length;var R=M+1;for(A=c[M],_=c[M+1];_>A;A++)E=u[A],T.push(E),k[E]=R,z&&(z[E]=n[A]);for(A=m[M],_=m[M+1];_>A;A++)E=h[A],k[E]!==R&&T.push(E),I[E]=R,B&&(B[E]=p[A]);if(O)for(A=C[M];A<T.length;){E=T[A];var P=k[E],U=I[E];if(P===R||U===R){var q=P===R?z[E]:w,L=U===R?B[E]:w,j=N(q,L);b(j,w)?T.splice(A,1):(O.push(j),A++)}}}return C[x]=T.length,S};return u}var i=r(42);t.name="algorithm05",t.factory=n},function(e,t){"use strict";function r(e,t,r,n){var i=n("multiplyScalar",{"number, number":function(e,t){return e*t},"Complex, Complex":function(e,t){return e.mul(t)},"BigNumber, BigNumber":function(e,t){return e.times(t)},"Fraction, Fraction":function(e,t){return e.mul(t)},"number | Fraction | BigNumber | Complex, Unit":function(e,t){var r=t.clone();return r.value=null===r.value?r._normalize(e):i(r.value,e),r},"Unit, number | Fraction | BigNumber | Complex":function(e,t){var r=e.clone();return r.value=null===r.value?r._normalize(t):i(r.value,t),r},"Unit, Unit":function(e,t){return e.multiply(t)}});return i}t.factory=r},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(80)),o=i("divide",{"number, number":function(e,t){return e/t},"Complex, Complex":function(e,t){return e.div(t)},"BigNumber, BigNumber":function(e,t){return e.div(t)},"Fraction, Fraction":function(e,t){return e.div(t)},"Unit, number | Fraction | BigNumber":function(e,t){var r=e.clone();return r.value=o(null===r.value?r._normalize(1):r.value,t),r},"number | Fraction | BigNumber, Unit":function(e,t){var r=t.pow(-1);return r.value=a(null===r.value?r._normalize(1):r.value,e),r},"Unit, Unit":function(e,t){return e.divide(t)}});return o}t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(r,n){if(t.predictable&&!i(n)&&0>r)try{var a=m(n),o=d(a);if((n===o||Math.abs((n-o)/n)<1e-14)&&a.d%2===1)return(a.n%2===0?1:-1)*Math.pow(-r,n)}catch(s){}return i(n)||r>=0||t.predictable?Math.pow(r,n):new e.Complex(r,0).pow(n,0)}function u(e,t){if(!i(t)||0>t)throw new TypeError("For A^b, b must be a positive integer (value is "+t+")");var r=a(e);if(2!=r.length)throw new Error("For A^b, A must be 2 dimensional (A has "+r.length+" dimensions)");if(r[0]!=r[1])throw new Error("For A^b, A must be square (size is "+r[0]+"x"+r[1]+")");for(var n=l(r[0]).valueOf(),o=e;t>=1;)1==(1&t)&&(n=p(o,n)),t>>=1,o=p(o,o);return n}function c(e,t){return h(u(e.valueOf(),t))}var f=r(32),l=n(r(83)),p=n(r(84)),h=n(r(52)),m=n(r(36)),d=n(r(70)),g=o("pow",{"number, number":s,"Complex, Complex":function(e,t){return e.pow(t)},"BigNumber, BigNumber":function(r,n){return n.isInteger()||r>=0||t.predictable?r.pow(n):new e.Complex(r.toNumber(),0).pow(n.toNumber(),0)},"Fraction, Fraction":function(e,r){if(1!==r.d){if(t.predictable)throw new Error("Function pow does not support non-integer exponents for fractions.");return s(e.valueOf(),r.valueOf())}return e.pow(r)},"Array, number":u,"Array, BigNumber":function(e,t){return u(e,t.toNumber())},"Matrix, number":c,"Matrix, BigNumber":function(e,t){return c(e,t.toNumber())},"Unit, number":function(e,t){return e.pow(t)}});return g.toTex={2:"\\left(${args[0]}\\right)"+f.operators.pow+"{${args[1]}}"},g}var i=r(6).isInteger,a=r(40).size;t.name="pow",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(e,t){switch(e.length){case 0:return t?c(t):[];case 1:return u(e[0],e[0],t);case 2:return u(e[0],e[1],t);default:throw new Error("Vector containing two values expected")}}function u(t,r,n){var o=t&&t.isBigNumber===!0?e.BigNumber:r&&r.isBigNumber===!0?e.BigNumber:null;if(t&&t.isBigNumber===!0&&(t=t.toNumber()),r&&r.isBigNumber===!0&&(r=r.toNumber()),!a(t)||1>t)throw new Error("Parameters in function eye must be positive integers");if(!a(r)||1>r)throw new Error("Parameters in function eye must be positive integers");var s=o?new e.BigNumber(1):1,u=o?new o(0):0,c=[t,r];if(n){var f=e.Matrix.storage(n);return f.diagonal(c,s,0,u)}for(var l=i.resize([],c,u),p=r>t?t:r,h=0;p>h;h++)l[h][h]=s;return l}var c=n(r(52)),f=o("eye",{"":function(){return"Matrix"===t.matrix?c([]):[]},string:function(e){return c(e)},"number | BigNumber":function(e){return u(e,e,"Matrix"===t.matrix?"default":void 0)},"number | BigNumber, string":function(e,t){return u(e,e,t)},"number | BigNumber, number | BigNumber":function(e,r){return u(e,r,"Matrix"===t.matrix?"default":void 0)},"number | BigNumber, number | BigNumber, string":function(e,t,r){return u(e,t,r)},Array:function(e){return s(e)},"Array, string":function(e,t){return s(e,t)},Matrix:function(e){return s(e.valueOf(),e.storage())},"Matrix, string":function(e,t){return s(e.valueOf(),t)}});return f.toTex=void 0,f}var i=r(40),a=r(6).isInteger;t.name="eye",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=n(r(53)),f=n(r(80)),l=n(r(48)),p=n(r(85)),h=n(r(58)),m=e.DenseMatrix,d=e.SparseMatrix,g=o("multiply",i({"Array, Array":function(e,t){v(a.size(e),a.size(t));var r=g(u(e),u(t));return r&&r.isMatrix===!0?r.valueOf():r},"Matrix, Matrix":function(e,t){var r=e.size(),n=t.size();return v(r,n),1===r.length?1===n.length?y(e,t,r[0]):x(e,t):1===n.length?w(e,t):N(e,t)},"Matrix, Array":function(e,t){return g(e,u(t))},"Array, Matrix":function(e,t){return g(u(e,t.storage()),t)},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=p(e,t,f,!1);break;case"dense":r=h(e,t,f,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=p(t,e,f,!0);break;case"dense":r=h(t,e,f,!0)}return r},"Array, any":function(e,t){return h(u(e),t,f,!1).valueOf()},"any, Array":function(e,t){return h(u(t),e,f,!0).valueOf()}},f.signatures)),v=function(e,t){switch(e.length){case 1:switch(t.length){case 1:if(e[0]!==t[0])throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");break;case 2:if(e[0]!==t[0])throw new RangeError("Dimension mismatch in multiplication. Vector length ("+e[0]+") must match Matrix rows ("+t[0]+")");break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has "+t.length+" dimensions)")}break;case 2:switch(t.length){case 1:if(e[1]!==t[0])throw new RangeError("Dimension mismatch in multiplication. Matrix columns ("+e[1]+") must match Vector length ("+t[0]+")");break;case 2:if(e[1]!==t[0])throw new RangeError("Dimension mismatch in multiplication. Matrix A columns ("+e[1]+") must match Matrix B rows ("+t[0]+")");break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has "+t.length+" dimensions)")}break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has "+e.length+" dimensions)")}},y=function(e,t,r){if(0===r)throw new Error("Cannot multiply two empty vectors");var n,i=e._data,a=e._datatype,s=t._data,u=t._datatype,l=c,p=f;a&&u&&a===u&&"string"==typeof a&&(n=a,
l=o.find(c,[n,n]),p=o.find(f,[n,n]));for(var h=p(i[0],s[0]),m=1;r>m;m++)h=l(h,p(i[m],s[m]));return h},x=function(e,t){switch(t.storage()){case"dense":return b(e,t)}throw new Error("Not implemented")},b=function(e,t){var r,n=e._data,i=e._size,a=e._datatype,s=t._data,u=t._size,l=t._datatype,p=i[0],h=u[1],d=c,g=f;a&&l&&a===l&&"string"==typeof a&&(r=a,d=o.find(c,[r,r]),g=o.find(f,[r,r]));for(var v=[],y=0;h>y;y++){for(var x=g(n[0],s[0][y]),b=1;p>b;b++)x=d(x,g(n[b],s[b][y]));v[y]=x}return new m({data:v,size:[h],datatype:r})},w=function(e,t){switch(e.storage()){case"dense":return E(e,t);case"sparse":return _(e,t)}},N=function(e,t){switch(e.storage()){case"dense":switch(t.storage()){case"dense":return M(e,t);case"sparse":return A(e,t)}break;case"sparse":switch(t.storage()){case"dense":return O(e,t);case"sparse":return T(e,t)}}},E=function(e,t){var r,n=e._data,i=e._size,a=e._datatype,s=t._data,u=t._datatype,l=i[0],p=i[1],h=c,d=f;a&&u&&a===u&&"string"==typeof a&&(r=a,h=o.find(c,[r,r]),d=o.find(f,[r,r]));for(var g=[],v=0;l>v;v++){for(var y=n[v],x=d(y[0],s[0]),b=1;p>b;b++)x=h(x,d(y[b],s[b]));g[v]=x}return new m({data:g,size:[l],datatype:r})},M=function(e,t){var r,n=e._data,i=e._size,a=e._datatype,s=t._data,u=t._size,l=t._datatype,p=i[0],h=i[1],d=u[1],g=c,v=f;a&&l&&a===l&&"string"==typeof a&&(r=a,g=o.find(c,[r,r]),v=o.find(f,[r,r]));for(var y=[],x=0;p>x;x++){var b=n[x];y[x]=[];for(var w=0;d>w;w++){for(var N=v(b[0],s[0][w]),E=1;h>E;E++)N=g(N,v(b[E],s[E][w]));y[x][w]=N}}return new m({data:y,size:[p,d],datatype:r})},A=function(e,t){var r=e._data,n=e._size,i=e._datatype,a=t._values,s=t._index,u=t._ptr,p=t._size,h=t._datatype;if(!a)throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");var m,g=n[0],v=p[1],y=c,x=f,b=l,w=0;i&&h&&i===h&&"string"==typeof i&&(m=i,y=o.find(c,[m,m]),x=o.find(f,[m,m]),b=o.find(l,[m,m]),w=o.convert(0,m));for(var N=[],E=[],M=[],A=new d({values:N,index:E,ptr:M,size:[g,v],datatype:m}),_=0;v>_;_++){M[_]=E.length;var O=u[_],T=u[_+1];if(T>O)for(var C=0,S=0;g>S;S++){for(var z,B=S+1,k=O;T>k;k++){var I=s[k];C!==B?(z=x(r[S][I],a[k]),C=B):z=y(z,x(r[S][I],a[k]))}C!==B||b(z,w)||(E.push(S),N.push(z))}}return M[v]=E.length,A},_=function(e,t){var r=e._values,n=e._index,i=e._ptr,a=e._datatype;if(!r)throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var s,u=t._data,p=t._datatype,h=e._size[0],m=t._size[0],g=[],v=[],y=[],x=c,b=f,w=l,N=0;a&&p&&a===p&&"string"==typeof a&&(s=a,x=o.find(c,[s,s]),b=o.find(f,[s,s]),w=o.find(l,[s,s]),N=o.convert(0,s));var E=[],M=[];y[0]=0;for(var A=0;m>A;A++){var _=u[A];if(!w(_,N))for(var O=i[A],T=i[A+1],C=O;T>C;C++){var S=n[C];M[S]?E[S]=x(E[S],b(_,r[C])):(M[S]=!0,v.push(S),E[S]=b(_,r[C]))}}for(var z=v.length,B=0;z>B;B++){var k=v[B];g[B]=E[k]}return y[1]=v.length,new d({values:g,index:v,ptr:y,size:[h,1],datatype:s})},O=function(e,t){var r=e._values,n=e._index,i=e._ptr,a=e._datatype;if(!r)throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var s,u=t._data,p=t._datatype,h=e._size[0],m=t._size[0],g=t._size[1],v=c,y=f,x=l,b=0;a&&p&&a===p&&"string"==typeof a&&(s=a,v=o.find(c,[s,s]),y=o.find(f,[s,s]),x=o.find(l,[s,s]),b=o.convert(0,s));for(var w=[],N=[],E=[],M=new d({values:w,index:N,ptr:E,size:[h,g],datatype:s}),A=[],_=[],O=0;g>O;O++){E[O]=N.length;for(var T=O+1,C=0;m>C;C++){var S=u[C][O];if(!x(S,b))for(var z=i[C],B=i[C+1],k=z;B>k;k++){var I=n[k];_[I]!==T?(_[I]=T,N.push(I),A[I]=y(S,r[k])):A[I]=v(A[I],y(S,r[k]))}}for(var R=E[O],P=N.length,U=R;P>U;U++){var q=N[U];w[U]=A[q]}}return E[g]=N.length,M},T=function(e,t){var r,n=e._values,i=e._index,a=e._ptr,s=e._datatype,u=t._values,l=t._index,p=t._ptr,h=t._datatype,m=e._size[0],g=t._size[1],v=n&&u,y=c,x=f;s&&h&&s===h&&"string"==typeof s&&(r=s,y=o.find(c,[r,r]),x=o.find(f,[r,r]));for(var b,w,N,E,M,A,_,O,T=v?[]:void 0,C=[],S=[],z=new d({values:T,index:C,ptr:S,size:[m,g],datatype:r}),B=v?[]:void 0,k=[],I=0;g>I;I++){S[I]=C.length;var R=I+1;for(M=p[I],A=p[I+1],E=M;A>E;E++)if(O=l[E],v)for(w=a[O],N=a[O+1],b=w;N>b;b++)_=i[b],k[_]!==R?(k[_]=R,C.push(_),B[_]=x(u[E],n[b])):B[_]=y(B[_],x(u[E],n[b]));else for(w=a[O],N=a[O+1],b=w;N>b;b++)_=i[b],k[_]!==R&&(k[_]=R,C.push(_));if(v)for(var P=S[I],U=C.length,q=P;U>q;q++){var L=C[q];T[q]=B[L]}}return S[g]=C.length,z};return g.toTex={2:"\\left(${args[0]}"+s.operators.multiply+"${args[1]}\\right)"},g}var i=r(3).extend,a=r(40);t.name="multiply",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(48)),o=e.SparseMatrix,s=function(e,t,r,n){var s=e._values,u=e._index,c=e._ptr,f=e._size,l=e._datatype;if(!s)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var p,h=f[0],m=f[1],d=a,g=0,v=r;"string"==typeof l&&(p=l,d=i.find(a,[p,p]),g=i.convert(0,p),t=i.convert(t,p),v=i.find(r,[p,p]));for(var y=[],x=[],b=[],w=new o({values:y,index:x,ptr:b,size:[h,m],datatype:p}),N=0;m>N;N++){b[N]=x.length;for(var E=c[N],M=c[N+1],A=E;M>A;A++){var _=u[A],O=n?v(t,s[A]):v(s[A],t);d(O,g)||(x.push(_),y.push(O))}}return b[m]=x.length,w};return s}t.name="algorithm11",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("abs",{number:Math.abs,Complex:function(e){return e.abs()},BigNumber:function(e){return e.abs()},Fraction:function(e){return e.abs()},"Array | Matrix":function(e){return i(e,a,!0)},Unit:function(e){return e.abs()}});return a.toTex={1:"\\left|${args[0]}\\right|"},a}var i=r(19);t.name="abs",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(48)),s=n(r(61)),u=n(r(62)),c=n(r(63)),f=n(r(57)),l=n(r(58)),p=r(32),h=i("equal",{"any, any":function(e,t){return null===e?null===t:null===t?null===e:void 0===e?void 0===t:void 0===t?void 0===e:o(e,t)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=u(e,t,o);break;default:r=s(t,e,o,!0)}break;default:switch(t.storage()){case"sparse":r=s(e,t,o,!1);break;default:r=f(e,t,o)}}return r},"Array, Array":function(e,t){return h(a(e),a(t)).valueOf()},"Array, Matrix":function(e,t){return h(a(e),t)},"Matrix, Array":function(e,t){return h(e,a(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=c(e,t,o,!1);break;default:r=l(e,t,o,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=c(t,e,o,!0);break;default:r=l(t,e,o,!0)}return r},"Array, any":function(e,t){return l(a(e),t,o,!1).valueOf()},"any, Array":function(e,t){return l(a(t),e,o,!0).valueOf()}});return h.toTex={2:"\\left(${args[0]}"+p.operators.equal+"${args[1]}\\right)"},h}t.name="equal",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("isNumeric",{"number | BigNumber | Fraction | boolean":function(){return!0},"Complex | Unit | string":function(){return!1},"Array | Matrix":function(e){return i(e,a)}});return a}var i=r(19);r(6);t.name="isNumeric",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("format",{any:i.format,"any, Object | function | number":i.format});return a.toTex=void 0,a}var i=r(23);t.name="format",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("_typeof",{any:function(e){var t=i.type(e);if("Object"===t){if(e.isBigNumber===!0)return"BigNumber";if(e.isComplex===!0)return"Complex";if(e.isFraction===!0)return"Fraction";if(e.isMatrix===!0)return"Matrix";if(e.isUnit===!0)return"Unit";if(e.isIndex===!0)return"Index";if(e.isRange===!0)return"Range";if(e.isChain===!0)return"Chain";if(e.isHelp===!0)return"Help"}return t}});return a.toTex=void 0,a}var i=r(41);t.name="typeof",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("unit",{Unit:function(e){return e.clone()},string:function(t){return e.Unit.isValuelessUnit(t)?new e.Unit(null,t):e.Unit.parse(t)},"number | BigNumber | Fraction | Complex, string":function(t,r){return new e.Unit(t,r)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\left(${args[0]}\\right)",2:"\\left(\\left(${args[0]}\\right)${args[1]}\\right)"},a}var i=r(19);t.name="unit",t.factory=n},function(e,t,r){function n(e,t,r,n,a){function o(t){var r=e.Unit.parse(t);return r.fixPrefix=!0,r}i(a,"speedOfLight",function(){return o("299792458 m s^-1")}),i(a,"gravitationConstant",function(){return o("6.6738480e-11 m^3 kg^-1 s^-2")}),i(a,"planckConstant",function(){return o("6.626069311e-34 J s")}),i(a,"reducedPlanckConstant",function(){return o("1.05457172647e-34 J s")}),i(a,"magneticConstant",function(){return o("1.2566370614e-6 N A^-2")}),i(a,"electricConstant",function(){return o("8.854187817e-12 F m^-1")}),i(a,"vacuumImpedance",function(){return o("376.730313461 ohm")}),i(a,"coulomb",function(){return o("8.9875517873681764e9 N m^2 C^-2")}),i(a,"elementaryCharge",function(){return o("1.60217656535e-19 C")}),i(a,"bohrMagneton",function(){return o("9.2740096820e-24 J T^-1")}),i(a,"conductanceQuantum",function(){return o("7.748091734625e-5 S")}),i(a,"inverseConductanceQuantum",function(){return o("12906.403721742 ohm")}),i(a,"magneticFluxQuantum",function(){return o("2.06783375846e-15 Wb")}),i(a,"nuclearMagneton",function(){return o("5.0507835311e-27 J T^-1")}),i(a,"klitzing",function(){return o("25812.807443484 ohm")}),i(a,"bohrRadius",function(){return o("5.291772109217e-11 m")}),i(a,"classicalElectronRadius",function(){return o("2.817940326727e-15 m")}),i(a,"electronMass",function(){return o("9.1093829140e-31 kg")}),i(a,"fermiCoupling",function(){return o("1.1663645e-5 GeV^-2")}),i(a,"fineStructure",function(){return.007297352569824}),i(a,"hartreeEnergy",function(){return o("4.3597443419e-18 J")}),i(a,"protonMass",function(){return o("1.67262177774e-27 kg")}),i(a,"deuteronMass",function(){return o("3.3435830926e-27 kg")}),i(a,"neutronMass",function(){return o("1.6749271613e-27 kg")}),i(a,"quantumOfCirculation",function(){return o("3.636947552024e-4 m^2 s^-1")}),i(a,"rydberg",function(){return o("10973731.56853955 m^-1")}),i(a,"thomsonCrossSection",function(){return o("6.65245873413e-29 m^2")}),i(a,"weakMixingAngle",function(){return.222321}),i(a,"efimovFactor",function(){return 22.7}),i(a,"atomicMass",function(){return o("1.66053892173e-27 kg")}),i(a,"avogadro",function(){return o("6.0221412927e23 mol^-1")}),i(a,"boltzmann",function(){return o("1.380648813e-23 J K^-1")}),i(a,"faraday",function(){return o("96485.336521 C mol^-1")}),i(a,"firstRadiation",function(){return o("3.7417715317e-16 W m^2")}),i(a,"loschmidt",function(){return o("2.686780524e25 m^-3")}),i(a,"gasConstant",function(){return o("8.314462175 J K^-1 mol^-1")}),i(a,"molarPlanckConstant",function(){return o("3.990312717628e-10 J s mol^-1")}),i(a,"molarVolume",function(){return o("2.241396820e-10 m^3 mol^-1")}),i(a,"sackurTetrode",function(){return-1.164870823}),i(a,"secondRadiation",function(){return o("1.438777013e-2 m K")}),i(a,"stefanBoltzmann",function(){return o("5.67037321e-8 W m^-2 K^-4")}),i(a,"wienDisplacement",function(){return o("2.897772126e-3 m K")}),i(a,"molarMass",function(){return o("1e-3 kg mol^-1")}),i(a,"molarMassC12",function(){return o("1.2e-2 kg mol^-1")}),i(a,"gravity",function(){return o("9.80665 m s^-2")}),i(a,"planckLength",function(){return o("1.61619997e-35 m")}),i(a,"planckMass",function(){return o("2.1765113e-8 kg")}),i(a,"planckTime",function(){return o("5.3910632e-44 s")}),i(a,"planckCharge",function(){return o("1.87554595641e-18 C")}),i(a,"planckTemperature",function(){return o("1.41683385e+32 K")})}var i=r(3).lazy;t.factory=n,t.lazy=!1,t.math=!0},function(e,t,r){"use strict";function n(e,t,o,s,u){u.on("config",function(r,i){r.number!==i.number&&n(e,t,o,s,u)}),u["true"]=!0,u["false"]=!1,u["null"]=null,u.uninitialized=r(40).UNINITIALIZED,"BigNumber"===t.number?(u.Infinity=new e.BigNumber(1/0),u.NaN=new e.BigNumber(NaN),i.lazy(u,"pi",function(){return a.pi(e.BigNumber)}),i.lazy(u,"tau",function(){return a.tau(e.BigNumber)}),i.lazy(u,"e",function(){return a.e(e.BigNumber)}),i.lazy(u,"phi",function(){return a.phi(e.BigNumber)}),i.lazy(u,"E",function(){return u.e}),i.lazy(u,"LN2",function(){return new e.BigNumber(2).ln()}),i.lazy(u,"LN10",function(){return new e.BigNumber(10).ln()}),i.lazy(u,"LOG2E",function(){return new e.BigNumber(1).div(new e.BigNumber(2).ln())}),i.lazy(u,"LOG10E",function(){return new e.BigNumber(1).div(new e.BigNumber(10).ln())}),i.lazy(u,"PI",function(){return u.pi}),i.lazy(u,"SQRT1_2",function(){return new e.BigNumber("0.5").sqrt()}),i.lazy(u,"SQRT2",function(){return new e.BigNumber(2).sqrt()})):(u.Infinity=1/0,u.NaN=NaN,u.pi=Math.PI,u.tau=2*Math.PI,u.e=Math.E,u.phi=1.618033988749895,u.E=u.e,u.LN2=Math.LN2,u.LN10=Math.LN10,u.LOG2E=Math.LOG2E,u.LOG10E=Math.LOG10E,u.PI=u.pi,u.SQRT1_2=Math.SQRT1_2,u.SQRT2=Math.SQRT2),u.i=e.Complex.I,u.version=r(94)}var i=r(3),a=r(76);t.factory=n,t.lazy=!1,t.math=!0},function(e,t){e.exports="3.2.0"},function(e,t,r){e.exports=[r(96),r(268),r(297),r(299),r(325),r(270),r(296)]},function(e,t,r){function n(e,t,n,i){var a={};return a.bignumber=r(97),a["boolean"]=r(98),a.complex=r(99),a.fraction=r(100),a.index=r(101),a.matrix=r(102),a.number=r(103),a.sparse=r(104),a.string=r(105),a.unit=r(106),a.e=r(107),a.E=r(107),a["false"]=r(108),a.i=r(109),a.Infinity=r(110),a.LN2=r(111),a.LN10=r(112),a.LOG2E=r(113),a.LOG10E=r(114),a.NaN=r(115),a["null"]=r(116),a.pi=r(117),a.PI=r(117),a.phi=r(118),a.SQRT1_2=r(119),a.SQRT2=r(120),a.tau=r(121),a["true"]=r(122),a.version=r(123),a.speedOfLight={description:"Speed of light in vacuum",examples:["speedOfLight"]},a.gravitationConstant={description:"Newtonian constant of gravitation",examples:["gravitationConstant"]},a.planckConstant={description:"Planck constant",examples:["planckConstant"]},a.reducedPlanckConstant={description:"Reduced Planck constant",examples:["reducedPlanckConstant"]},a.magneticConstant={description:"Magnetic constant (vacuum permeability)",examples:["magneticConstant"]},a.electricConstant={description:"Electric constant (vacuum permeability)",examples:["electricConstant"]},a.vacuumImpedance={description:"Characteristic impedance of vacuum",examples:["vacuumImpedance"]},a.coulomb={description:"Coulomb's constant",examples:["coulomb"]},a.elementaryCharge={description:"Elementary charge",examples:["elementaryCharge"]},a.bohrMagneton={description:"Borh magneton",examples:["bohrMagneton"]},a.conductanceQuantum={description:"Conductance quantum",examples:["conductanceQuantum"]},a.inverseConductanceQuantum={description:"Inverse conductance quantum",examples:["inverseConductanceQuantum"]},a.magneticFluxQuantum={description:"Magnetic flux quantum",examples:["magneticFluxQuantum"]},a.nuclearMagneton={description:"Nuclear magneton",examples:["nuclearMagneton"]},a.klitzing={description:"Von Klitzing constant",examples:["klitzing"]},a.bohrRadius={description:"Borh radius",examples:["bohrRadius"]},a.classicalElectronRadius={description:"Classical electron radius",examples:["classicalElectronRadius"]},a.electronMass={description:"Electron mass",examples:["electronMass"]},a.fermiCoupling={description:"Fermi coupling constant",examples:["fermiCoupling"]},a.fineStructure={description:"Fine-structure constant",examples:["fineStructure"]},a.hartreeEnergy={description:"Hartree energy",examples:["hartreeEnergy"]},a.protonMass={description:"Proton mass",examples:["protonMass"]},a.deuteronMass={description:"Deuteron Mass",examples:["deuteronMass"]},a.neutronMass={description:"Neutron mass",examples:["neutronMass"]},a.quantumOfCirculation={description:"Quantum of circulation",examples:["quantumOfCirculation"]},a.rydberg={description:"Rydberg constant",examples:["rydberg"]},a.thomsonCrossSection={description:"Thomson cross section",examples:["thomsonCrossSection"]},a.weakMixingAngle={description:"Weak mixing angle",examples:["weakMixingAngle"]},a.efimovFactor={description:"Efimov factor",examples:["efimovFactor"]},a.atomicMass={description:"Atomic mass constant",examples:["atomicMass"]},a.avogadro={description:"Avogadro's number",examples:["avogadro"]},a.boltzmann={description:"Boltzmann constant",examples:["boltzmann"]},a.faraday={description:"Faraday constant",examples:["faraday"]},a.firstRadiation={description:"First radiation constant",examples:["firstRadiation"]},a.loschmidt={description:"Loschmidt constant at T=273.15 K and p=101.325 kPa",examples:["loschmidt"]},a.gasConstant={description:"Gas constant",examples:["gasConstant"]},a.molarPlanckConstant={description:"Molar Planck constant",examples:["molarPlanckConstant"]},a.molarVolume={description:"Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa",examples:["molarVolume"]},a.sackurTetrode={description:"Sackur-Tetrode constant at T=1 K and p=101.325 kPa",examples:["sackurTetrode"]},a.secondRadiation={description:"Second radiation constant",examples:["secondRadiation"]},a.stefanBoltzmann={description:"Stefan-Boltzmann constant",examples:["stefanBoltzmann"]},a.wienDisplacement={description:"Wien displacement law constant",examples:["wienDisplacement"]},a.molarMass={description:"Molar mass constant",examples:["molarMass"]},a.molarMassC12={description:"Molar mass constant of carbon-12",examples:["molarMassC12"]},a.gravity={description:"Standard acceleration of gravity (standard acceleration of free-fall on Earth)",examples:["gravity"]},a.planckLength={description:"Planck length",examples:["planckLength"]},a.planckMass={description:"Planck mass",examples:["planckMass"]},a.planckTime={description:"Planck time",examples:["planckTime"]},a.planckCharge={description:"Planck charge",examples:["planckCharge"]},a.planckTemperature={description:"Planck temperature",examples:["planckTemperature"]},a.lsolve=r(124),a.lup=r(125),a.lusolve=r(126),a.slu=r(127),a.usolve=r(128),a.abs=r(129),a.add=r(130),a.cbrt=r(131),a.ceil=r(132),a.cube=r(133),a.divide=r(134),a.dotDivide=r(135),a.dotMultiply=r(136),a.dotPow=r(137),a.exp=r(138),a.fix=r(139),a.floor=r(140),a.gcd=r(141),a.hypot=r(142),a.lcm=r(143),a.log=r(144),a.log10=r(145),a.mod=r(146),a.multiply=r(147),a.norm=r(148),a.nthRoot=r(149),a.pow=r(150),a.round=r(151),a.sign=r(152),a.sqrt=r(153),a.square=r(154),a.subtract=r(155),a.unaryMinus=r(156),a.unaryPlus=r(157),a.xgcd=r(158),a.bitAnd=r(159),a.bitNot=r(160),a.bitOr=r(161),a.bitXor=r(162),a.leftShift=r(163),a.rightArithShift=r(164),a.rightLogShift=r(165),a.bellNumbers=r(166),a.catalan=r(167),a.composition=r(168),a.stirlingS2=r(169),a.config=r(170),a["import"]=r(171),a.typed=r(172),a.arg=r(173),a.conj=r(174),a.re=r(175),a.im=r(176),a.eval=r(177),a.help=r(178),a.distance=r(179),a.intersect=r(180),a.and=r(181),a.not=r(182),a.or=r(183),a.xor=r(184),a.concat=r(185),a.cross=r(186),a.det=r(187),a.diag=r(188),a.dot=r(189),a.eye=r(190),a.filter=r(191),a.flatten=r(192),a.forEach=r(193),a.inv=r(194),a.map=r(195),a.ones=r(196),a.partitionSelect=r(197),a.range=r(198),a.resize=r(199),a.size=r(200),a.sort=r(201),a.squeeze=r(202),a.subset=r(203),a.trace=r(204),a.transpose=r(205),a.zeros=r(206),a.combinations=r(207),a.factorial=r(208),a.gamma=r(209),a.kldivergence=r(210),a.multinomial=r(211),a.permutations=r(212),a.pickRandom=r(213),a.random=r(214),a.randomInt=r(215),a.compare=r(216),a.deepEqual=r(217),a.equal=r(218),a.larger=r(219),a.largerEq=r(220),a.smaller=r(221),a.smallerEq=r(222),a.unequal=r(223),a.max=r(224),a.mean=r(225),a.median=r(226),a.min=r(227),a.mode=r(228),a.prod=r(229),a.quantileSeq=r(230),a.std=r(231),a.sum=r(232),a["var"]=r(233),a.acos=r(234),a.acosh=r(235),a.acot=r(236),a.acoth=r(237),a.acsc=r(238),a.acsch=r(239),a.asec=r(240),a.asech=r(241),a.asin=r(242),a.asinh=r(243),a.atan=r(244),a.atanh=r(245),a.atan2=r(246),a.cos=r(247),a.cosh=r(248),a.cot=r(249),a.coth=r(250),a.csc=r(251),a.csch=r(252),a.sec=r(253),a.sech=r(254),a.sin=r(255),a.sinh=r(256),a.tan=r(257),a.tanh=r(258),a.to=r(259),a.clone=r(260),a.format=r(261),a.isInteger=r(262),a.isNegative=r(263),a.isNumeric=r(264),a.isPositive=r(265),a.isZero=r(266),a["typeof"]=r(267),a}t.name="docs",t.path="expression",t.factory=n},function(e,t){e.exports={name:"bignumber",category:"Construction",syntax:["bignumber(x)"],description:"Create a big number from a number or string.",examples:["0.1 + 0.2","bignumber(0.1) + bignumber(0.2)",'bignumber("7.2")','bignumber("7.2e500")',"bignumber([0.1, 0.2, 0.3])"],seealso:["boolean","complex","fraction","index","matrix","string","unit"]}},function(e,t){e.exports={name:"boolean",category:"Construction",syntax:["x","boolean(x)"],description:"Convert a string or number into a boolean.",examples:["boolean(0)","boolean(1)","boolean(3)",'boolean("true")','boolean("false")',"boolean([1, 0, 1, 1])"],seealso:["bignumber","complex","index","matrix","number","string","unit"]}},function(e,t){e.exports={name:"complex",category:"Construction",syntax:["complex()","complex(re, im)","complex(string)"],description:"Create a complex number.",examples:["complex()","complex(2, 3)",'complex("7 - 2i")'],seealso:["bignumber","boolean","index","matrix","number","string","unit"]}},function(e,t){e.exports={name:"fraction",category:"Construction",syntax:["fraction(num)","fraction(num,den)"],description:"Create a fraction from a number or from a numerator and denominator.",examples:["fraction(0.125)","fraction(1, 3) + fraction(2, 5)"],seealso:["bignumber","boolean","complex","index","matrix","string","unit"]}},function(e,t){e.exports={name:"index",category:"Construction",syntax:["[start]","[start:end]","[start:step:end]","[start1, start 2, ...]","[start1:end1, start2:end2, ...]","[start1:step1:end1, start2:step2:end2, ...]"],description:"Create an index to get or replace a subset of a matrix",examples:["[]","[1, 2, 3]","A = [1, 2, 3; 4, 5, 6]","A[1, :]","A[1, 2] = 50","A[0:2, 0:2] = ones(2, 2)"],seealso:["bignumber","boolean","complex","matrix,","number","range","string","unit"]}},function(e,t){e.exports={name:"matrix",category:"Construction",syntax:["[]","[a1, b1, ...; a2, b2, ...]","matrix()",'matrix("dense")',"matrix([...])"],description:"Create a matrix.",examples:["[]","[1, 2, 3]","[1, 2, 3; 4, 5, 6]","matrix()","matrix([3, 4])",'matrix([3, 4; 5, 6], "sparse")','matrix([3, 4; 5, 6], "sparse", "number")'],seealso:["bignumber","boolean","complex","index","number","string","unit","sparse"]}},function(e,t){e.exports={name:"number",category:"Construction",syntax:["x","number(x)"],description:"Create a number or convert a string or boolean into a number.",examples:["2","2e3","4.05","number(2)",'number("7.2")',"number(true)","number([true, false, true, true])",'number("52cm", "m")'],seealso:["bignumber","boolean","complex","fraction","index","matrix","string","unit"]}},function(e,t){e.exports={name:"sparse",category:"Construction",syntax:["sparse()","sparse([a1, b1, ...; a1, b2, ...])",'sparse([a1, b1, ...; a1, b2, ...], "number")'],description:"Create a sparse matrix.",examples:["sparse()","sparse([3, 4; 5, 6])",'sparse([3, 0; 5, 0], "number")'],seealso:["bignumber","boolean","complex","index","number","string","unit","matrix"]}},function(e,t){e.exports={name:"string",category:"Construction",syntax:['"text"',"string(x)"],description:"Create a string or convert a value to a string",examples:['"Hello World!"',"string(4.2)","string(3 + 2i)"],seealso:["bignumber","boolean","complex","index","matrix","number","unit"]}},function(e,t){e.exports={name:"unit",category:"Construction",syntax:["value unit","unit(value, unit)","unit(string)"],description:"Create a unit.",examples:["5.5 mm","3 inch",'unit(7.1, "kilogram")','unit("23 deg")'],seealso:["bignumber","boolean","complex","index","matrix","number","string"]}},function(e,t){e.exports={name:"e",category:"Constants",syntax:["e"],description:"Euler's number, the base of the natural logarithm. Approximately equal to 2.71828",examples:["e","e ^ 2","exp(2)","log(e)"],seealso:["exp"]}},function(e,t){e.exports={name:"false",category:"Constants",syntax:["false"],description:"Boolean value false",examples:["false"],seealso:["true"]}},function(e,t){e.exports={name:"i",category:"Constants",syntax:["i"],description:"Imaginary unit, defined as i*i=-1. A complex number is described as a + b*i, where a is the real part, and b is the imaginary part.",examples:["i","i * i","sqrt(-1)"],seealso:[]}},function(e,t){e.exports={name:"Infinity",category:"Constants",syntax:["Infinity"],description:"Infinity, a number which is larger than the maximum number that can be handled by a floating point number.",examples:["Infinity","1 / 0"],seealso:[]}},function(e,t){e.exports={name:"LN2",category:"Constants",syntax:["LN2"],description:"Returns the natural logarithm of 2, approximately equal to 0.693",examples:["LN2","log(2)"],seealso:[]}},function(e,t){e.exports={name:"LN10",category:"Constants",syntax:["LN10"],description:"Returns the natural logarithm of 10, approximately equal to 2.302",examples:["LN10","log(10)"],seealso:[]}},function(e,t){e.exports={name:"LOG2E",category:"Constants",syntax:["LOG2E"],description:"Returns the base-2 logarithm of E, approximately equal to 1.442",examples:["LOG2E","log(e, 2)"],seealso:[]}},function(e,t){e.exports={name:"LOG10E",category:"Constants",syntax:["LOG10E"],description:"Returns the base-10 logarithm of E, approximately equal to 0.434",examples:["LOG10E","log(e, 10)"],seealso:[]}},function(e,t){e.exports={name:"NaN",category:"Constants",syntax:["NaN"],description:"Not a number",examples:["NaN","0 / 0"],seealso:[]}},function(e,t){e.exports={name:"null",category:"Constants",syntax:["null"],description:"Value null",examples:["null"],seealso:["true","false"]}},function(e,t){e.exports={name:"pi",category:"Constants",syntax:["pi"],description:"The number pi is a mathematical constant that is the ratio of a circle's circumference to its diameter, and is approximately equal to 3.14159",examples:["pi","sin(pi/2)"],seealso:["tau"]}},function(e,t){e.exports={name:"phi",category:"Constants",syntax:["phi"],description:"Phi is the golden ratio. Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. Phi is defined as `(1 + sqrt(5)) / 2` and is approximately 1.618034...",examples:["tau"],seealso:[]}},function(e,t){e.exports={name:"SQRT1_2",category:"Constants",syntax:["SQRT1_2"],description:"Returns the square root of 1/2, approximately equal to 0.707",examples:["SQRT1_2","sqrt(1/2)"],seealso:[]}},function(e,t){e.exports={name:"SQRT2",category:"Constants",syntax:["SQRT2"],description:"Returns the square root of 2, approximately equal to 1.414",examples:["SQRT2","sqrt(2)"],seealso:[]}},function(e,t){e.exports={name:"tau",category:"Constants",syntax:["tau"],description:"Tau is the ratio constant of a circle's circumference to radius, equal to 2 * pi, approximately 6.2832.",examples:["tau","2 * pi"],seealso:["pi"]}},function(e,t){e.exports={name:"true",category:"Constants",syntax:["true"],description:"Boolean value true",examples:["true"],seealso:["false"]}},function(e,t){e.exports={name:"version",category:"Constants",syntax:["version"],description:"A string with the version number of math.js",examples:["version"],seealso:[]}},function(e,t){e.exports={name:"lsolve",category:"Algebra",syntax:["x=lsolve(L, b)"],description:"Solves the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.",examples:["a = [-2, 3; 2, 1]","b = [11, 9]","x = lsolve(a, b)"],seealso:["lup","lusolve","usolve","matrix","sparse"]}},function(e,t){e.exports={name:"lup",category:"Algebra",syntax:["lup(m)"],description:"Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U",examples:["lup([[2, 1], [1, 4]])","lup(matrix([[2, 1], [1, 4]]))","lup(sparse([[2, 1], [1, 4]]))"],seealso:["lusolve","lsolve","usolve","matrix","sparse","slu"]}},function(e,t){e.exports={name:"lusolve",category:"Algebra",syntax:["x=lusolve(A, b)","x=lusolve(lu, b)"],description:"Solves the linear system A * x = b where A is an [n x n] matrix and b is a [n] column vector.",examples:["a = [-2, 3; 2, 1]","b = [11, 9]","x = lusolve(a, b)"],seealso:["lup","slu","lsolve","usolve","matrix","sparse"]}},function(e,t){e.exports={name:"slu",category:"Algebra",syntax:["slu(A, order, threshold)"],description:"Calculate the Matrix LU decomposition with full pivoting. Matrix A is decomposed in two matrices (L, U) and two permutation vectors (pinv, q) where P * A * Q = L * U",examples:["slu(sparse([4.5, 0, 3.2, 0; 3.1, 2.9, 0, 0.9; 0, 1.7, 3, 0; 3.5, 0.4, 0, 1]), 1, 0.001)"],seealso:["lusolve","lsolve","usolve","matrix","sparse","lup"]}},function(e,t){e.exports={name:"usolve",category:"Algebra",syntax:["x=usolve(U, b)"],description:"Solves the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.",examples:["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"],seealso:["lup","lusolve","lsolve","matrix","sparse"]}},function(e,t){e.exports={name:"abs",category:"Arithmetic",syntax:["abs(x)"],description:"Compute the absolute value.",examples:["abs(3.5)","abs(-4.2)"],seealso:["sign"]}},function(e,t){e.exports={name:"add",category:"Operators",syntax:["x + y","add(x, y)"],description:"Add two values.",examples:["a = 2.1 + 3.6","a - 3.6","3 + 2i","3 cm + 2 inch",'"2.3" + "4"'],seealso:["subtract"]}},function(e,t){e.exports={name:"cbrt",category:"Arithmetic",syntax:["cbrt(x)","cbrt(x, allRoots)"],description:"Compute the cubic root value. If x = y * y * y, then y is the cubic root of x. When `x` is a number or complex number, an optional second argument `allRoots` can be provided to return all three cubic roots. If not provided, the principal root is returned",examples:["cbrt(64)","cube(4)","cbrt(-8)","cbrt(2 + 3i)","cbrt(8i)","cbrt(8i, true)","cbrt(27 m^3)"],seealso:["square","sqrt","cube","multiply"]}},function(e,t){e.exports={name:"ceil",category:"Arithmetic",syntax:["ceil(x)"],description:"Round a value towards plus infinity. If x is complex, both real and imaginary part are rounded towards plus infinity.",examples:["ceil(3.2)","ceil(3.8)","ceil(-4.2)"],seealso:["floor","fix","round"]}},function(e,t){e.exports={name:"cube",category:"Arithmetic",syntax:["cube(x)"],description:"Compute the cube of a value. The cube of x is x * x * x.",examples:["cube(2)","2^3","2 * 2 * 2"],seealso:["multiply","square","pow"]}},function(e,t){e.exports={name:"divide",category:"Operators",syntax:["x / y","divide(x, y)"],description:"Divide two values.",examples:["a = 2 / 3","a * 3","4.5 / 2","3 + 4 / 2","(3 + 4) / 2","18 km / 4.5"],seealso:["multiply"]}},function(e,t){e.exports={name:"dotDivide",category:"Operators",syntax:["x ./ y","dotDivide(x, y)"],description:"Divide two values element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","b = [2, 1, 1; 3, 2, 5]","a ./ b"],seealso:["multiply","dotMultiply","divide"]}},function(e,t){e.exports={name:"dotMultiply",category:"Operators",syntax:["x .* y","dotMultiply(x, y)"],description:"Multiply two values element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","b = [2, 1, 1; 3, 2, 5]","a .* b"],seealso:["multiply","divide","dotDivide"]}},function(e,t){e.exports={name:"dotpow",category:"Operators",syntax:["x .^ y","dotpow(x, y)"],description:"Calculates the power of x to y element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","a .^ 2"],seealso:["pow"]}},function(e,t){e.exports={name:"exp",category:"Arithmetic",syntax:["exp(x)"],description:"Calculate the exponent of a value.",examples:["exp(1.3)","e ^ 1.3","log(exp(1.3))","x = 2.4","(exp(i*x) == cos(x) + i*sin(x))   # Euler's formula"],seealso:["pow","log"]}},function(e,t){e.exports={name:"fix",category:"Arithmetic",syntax:["fix(x)"],description:"Round a value towards zero. If x is complex, both real and imaginary part are rounded towards zero.",examples:["fix(3.2)","fix(3.8)","fix(-4.2)","fix(-4.8)"],seealso:["ceil","floor","round"]}},function(e,t){e.exports={name:"floor",category:"Arithmetic",syntax:["floor(x)"],description:"Round a value towards minus infinity.If x is complex, both real and imaginary part are rounded towards minus infinity.",examples:["floor(3.2)","floor(3.8)","floor(-4.2)"],seealso:["ceil","fix","round"]}},function(e,t){e.exports={name:"gcd",category:"Arithmetic",syntax:["gcd(a, b)","gcd(a, b, c, ...)"],
description:"Compute the greatest common divisor.",examples:["gcd(8, 12)","gcd(-4, 6)","gcd(25, 15, -10)"],seealso:["lcm","xgcd"]}},function(e,t){e.exports={name:"hypot",category:"Arithmetic",syntax:["hypot(a, b, c, ...)","hypot([a, b, c, ...])"],description:"Calculate the hypotenusa of a list with values. ",examples:["hypot(3, 4)","sqrt(3^2 + 4^2)","hypot(-2)","hypot([3, 4, 5])"],seealso:["abs","norm"]}},function(e,t){e.exports={name:"lcm",category:"Arithmetic",syntax:["lcm(x, y)"],description:"Compute the least common multiple.",examples:["lcm(4, 6)","lcm(6, 21)","lcm(6, 21, 5)"],seealso:["gcd"]}},function(e,t){e.exports={name:"log",category:"Arithmetic",syntax:["log(x)","log(x, base)"],description:"Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).",examples:["log(3.5)","a = log(2.4)","exp(a)","10 ^ 4","log(10000, 10)","log(10000) / log(10)","b = log(1024, 2)","2 ^ b"],seealso:["exp","log10"]}},function(e,t){e.exports={name:"log10",category:"Arithmetic",syntax:["log10(x)"],description:"Compute the 10-base logarithm of a value.",examples:["log10(0.00001)","log10(10000)","10 ^ 4","log(10000) / log(10)","log(10000, 10)"],seealso:["exp","log"]}},function(e,t){e.exports={name:"mod",category:"Operators",syntax:["x % y","x mod y","mod(x, y)"],description:"Calculates the modulus, the remainder of an integer division.",examples:["7 % 3","11 % 2","10 mod 4","function isOdd(x) = x % 2","isOdd(2)","isOdd(3)"],seealso:["divide"]}},function(e,t){e.exports={name:"multiply",category:"Operators",syntax:["x * y","multiply(x, y)"],description:"multiply two values.",examples:["a = 2.1 * 3.4","a / 3.4","2 * 3 + 4","2 * (3 + 4)","3 * 2.1 km"],seealso:["divide"]}},function(e,t){e.exports={name:"norm",category:"Arithmetic",syntax:["norm(x)","norm(x, p)"],description:"Calculate the norm of a number, vector or matrix.",examples:["abs(-3.5)","norm(-3.5)","norm(3 - 4i))","norm([1, 2, -3], Infinity)","norm([1, 2, -3], -Infinity)","norm([3, 4], 2)","norm([[1, 2], [3, 4]], 1)","norm([[1, 2], [3, 4]], 'inf')","norm([[1, 2], [3, 4]], 'fro')"]}},function(e,t){e.exports={name:"nthRoot",category:"Arithmetic",syntax:["nthRoot(a)","nthRoot(a, root)"],description:'Calculate the nth root of a value. The principal nth root of a positive real number A, is the positive real solution of the equation "x^root = A".',examples:["4 ^ 3","nthRoot(64, 3)","nthRoot(9, 2)","sqrt(9)"],seealso:["sqrt","pow"]}},function(e,t){e.exports={name:"pow",category:"Operators",syntax:["x ^ y","pow(x, y)"],description:"Calculates the power of x to y, x^y.",examples:["2^3 = 8","2*2*2","1 + e ^ (pi * i)"],seealso:["multiply"]}},function(e,t){e.exports={name:"round",category:"Arithmetic",syntax:["round(x)","round(x, n)"],description:"round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.",examples:["round(3.2)","round(3.8)","round(-4.2)","round(-4.8)","round(pi, 3)","round(123.45678, 2)"],seealso:["ceil","floor","fix"]}},function(e,t){e.exports={name:"sign",category:"Arithmetic",syntax:["sign(x)"],description:"Compute the sign of a value. The sign of a value x is 1 when x>1, -1 when x<0, and 0 when x=0.",examples:["sign(3.5)","sign(-4.2)","sign(0)"],seealso:["abs"]}},function(e,t){e.exports={name:"sqrt",category:"Arithmetic",syntax:["sqrt(x)"],description:"Compute the square root value. If x = y * y, then y is the square root of x.",examples:["sqrt(25)","5 * 5","sqrt(-1)"],seealso:["square","multiply"]}},function(e,t){e.exports={name:"square",category:"Arithmetic",syntax:["square(x)"],description:"Compute the square of a value. The square of x is x * x.",examples:["square(3)","sqrt(9)","3^2","3 * 3"],seealso:["multiply","pow","sqrt","cube"]}},function(e,t){e.exports={name:"subtract",category:"Operators",syntax:["x - y","subtract(x, y)"],description:"subtract two values.",examples:["a = 5.3 - 2","a + 2","2/3 - 1/6","2 * 3 - 3","2.1 km - 500m"],seealso:["add"]}},function(e,t){e.exports={name:"unaryMinus",category:"Operators",syntax:["-x","unaryMinus(x)"],description:"Inverse the sign of a value. Converts booleans and strings to numbers.",examples:["-4.5","-(-5.6)",'-"22"'],seealso:["add","subtract","unaryPlus"]}},function(e,t){e.exports={name:"unaryPlus",category:"Operators",syntax:["+x","unaryPlus(x)"],description:"Converts booleans and strings to numbers.",examples:["+true",'+"2"'],seealso:["add","subtract","unaryMinus"]}},function(e,t){e.exports={name:"xgcd",category:"Arithmetic",syntax:["xgcd(a, b)"],description:"Calculate the extended greatest common divisor for two values",examples:["xgcd(8, 12)","gcd(8, 12)","xgcd(36163, 21199)"],seealso:["gcd","lcm"]}},function(e,t){e.exports={name:"bitAnd",category:"Bitwise",syntax:["x & y","bitAnd(x, y)"],description:"Bitwise AND operation. Performs the logical AND operation on each pair of the corresponding bits of the two given values by multiplying them. If both bits in the compared position are 1, the bit in the resulting binary representation is 1, otherwise, the result is 0",examples:["5 & 3","bitAnd(53, 131)","[1, 12, 31] & 42"],seealso:["bitNot","bitOr","bitXor","leftShift","rightArithShift","rightLogShift"]}},function(e,t){e.exports={name:"bitNot",category:"Bitwise",syntax:["~x","bitNot(x)"],description:"Bitwise NOT operation. Performs a logical negation on each bit of the given value. Bits that are 0 become 1, and those that are 1 become 0.",examples:["~1","~2","bitNot([2, -3, 4])"],seealso:["bitAnd","bitOr","bitXor","leftShift","rightArithShift","rightLogShift"]}},function(e,t){e.exports={name:"bitOr",category:"Bitwise",syntax:["x | y","bitOr(x, y)"],description:"Bitwise OR operation. Performs the logical inclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if the first bit is 1 or the second bit is 1 or both bits are 1, otherwise, the result is 0.",examples:["5 | 3","bitOr([1, 2, 3], 4)"],seealso:["bitAnd","bitNot","bitXor","leftShift","rightArithShift","rightLogShift"]}},function(e,t){e.exports={name:"bitXor",category:"Bitwise",syntax:["bitXor(x, y)"],description:"Bitwise XOR operation, exclusive OR. Performs the logical exclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if only the first bit is 1 or only the second bit is 1, but will be 0 if both are 0 or both are 1.",examples:["bitOr(1, 2)","bitXor([2, 3, 4], 4)"],seealso:["bitAnd","bitNot","bitOr","leftShift","rightArithShift","rightLogShift"]}},function(e,t){e.exports={name:"leftShift",category:"Bitwise",syntax:["x << y","leftShift(x, y)"],description:"Bitwise left logical shift of a value x by y number of bits.",examples:["4 << 1","8 >> 1"],seealso:["bitAnd","bitNot","bitOr","bitXor","rightArithShift","rightLogShift"]}},function(e,t){e.exports={name:"rightArithShift",category:"Bitwise",syntax:["x >> y","leftShift(x, y)"],description:"Bitwise right arithmetic shift of a value x by y number of bits.",examples:["8 >> 1","4 << 1","-12 >> 2"],seealso:["bitAnd","bitNot","bitOr","bitXor","leftShift","rightLogShift"]}},function(e,t){e.exports={name:"rightLogShift",category:"Bitwise",syntax:["x >> y","leftShift(x, y)"],description:"Bitwise right logical shift of a value x by y number of bits.",examples:["8 >>> 1","4 << 1","-12 >>> 2"],seealso:["bitAnd","bitNot","bitOr","bitXor","leftShift","rightArithShift"]}},function(e,t){e.exports={name:"bellNumbers",category:"Combinatorics",syntax:["bellNumbers(n)"],description:"The Bell Numbers count the number of partitions of a set. A partition is a pairwise disjoint subset of S whose union is S. `bellNumbers` only takes integer arguments. The following condition must be enforced: n >= 0.",examples:["bellNumbers(3)","bellNumbers(8)"],seealso:["stirlingS2"]}},function(e,t){e.exports={name:"catalan",category:"Combinatorics",syntax:["catalan(n)"],description:"The Catalan Numbers enumerate combinatorial structures of many different types. catalan only takes integer arguments. The following condition must be enforced: n >= 0.",examples:["catalan(3)","catalan(8)"],seealso:["bellNumbers"]}},function(e,t){e.exports={name:"composition",category:"Combinatorics",syntax:["composition(n, k)"],description:"The composition counts of n into k parts. composition only takes integer arguments. The following condition must be enforced: k <= n.",examples:["composition(5, 3)"],seealso:["combinations"]}},function(e,t){e.exports={name:"stirlingS2",category:"Combinatorics",syntax:["stirlingS2(n, k)"],description:"he Stirling numbers of the second kind, counts the number of ways to partition a set of n labelled objects into k nonempty unlabelled subsets. `stirlingS2` only takes integer arguments. The following condition must be enforced: k <= n. If n = k or k = 1, then s(n,k) = 1.",examples:["stirlingS2(5, 3)"],seealso:["bellNumbers"]}},function(e,t){e.exports={name:"config",category:"Core",syntax:["config()","config(options)"],description:"Get configuration or change configuration.",examples:["config()","1/3 + 1/4",'config({number: "Fraction"})',"1/3 + 1/4"],seealso:[]}},function(e,t){e.exports={name:"import",category:"Core",syntax:["import(functions)","import(functions, options)"],description:"Import functions or constants from an object.",examples:["import({myFn: f(x)=x^2, myConstant: 32 })","myFn(2)","myConstant"],seealso:[]}},function(e,t){e.exports={name:"typed",category:"Core",syntax:["typed(signatures)","typed(name, signatures)"],description:"Create a typed function.",examples:['double = typed({ "number, number": f(x)=x+x })',"double(2)",'double("hello")'],seealso:[]}},function(e,t){e.exports={name:"arg",category:"Complex",syntax:["arg(x)"],description:"Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).",examples:["arg(2 + 2i)","atan2(3, 2)","arg(2 + 3i)"],seealso:["re","im","conj","abs"]}},function(e,t){e.exports={name:"conj",category:"Complex",syntax:["conj(x)"],description:"Compute the complex conjugate of a complex value. If x = a+bi, the complex conjugate is a-bi.",examples:["conj(2 + 3i)","conj(2 - 3i)","conj(-5.2i)"],seealso:["re","im","abs","arg"]}},function(e,t){e.exports={name:"re",category:"Complex",syntax:["re(x)"],description:"Get the real part of a complex number.",examples:["re(2 + 3i)","im(2 + 3i)","re(-5.2i)","re(2.4)"],seealso:["im","conj","abs","arg"]}},function(e,t){e.exports={name:"im",category:"Complex",syntax:["im(x)"],description:"Get the imaginary part of a complex number.",examples:["im(2 + 3i)","re(2 + 3i)","im(-5.2i)","im(2.4)"],seealso:["re","conj","abs","arg"]}},function(e,t){e.exports={name:"eval",category:"Expression",syntax:["eval(expression)","eval([expr1, expr2, expr3, ...])"],description:"Evaluate an expression or an array with expressions.",examples:['eval("2 + 3")','eval("sqrt(" + 4 + ")")'],seealso:[]}},function(e,t){e.exports={name:"help",category:"Expression",syntax:["help(object)","help(string)"],description:"Display documentation on a function or data type.",examples:["help(sqrt)",'help("complex")'],seealso:[]}},function(e,t){e.exports={name:"distance",category:"Geometry",syntax:["distance([x1, y1], [x2, y2])","distance([[x1, y1], [x2, y2])"],description:"Calculates the Euclidean distance between two points.",examples:["distance([0,0], [4,4])","distance([[0,0], [4,4]])"],seealso:[]}},function(e,t){e.exports={name:"intersect",category:"Geometry",syntax:["intersect(expr1, expr2, expr3, expr4)","intersect(expr1, expr2, expr3)"],description:"Computes the intersection point of lines and/or planes.",examples:["intersect([0, 0], [10, 10], [10, 0], [0, 10])","intersect([1, 0, 1],  [4, -2, 2], [1, 1, 1, 6])"],seealso:[]}},function(e,t){e.exports={name:"and",category:"Logical",syntax:["x and y","and(x, y)"],description:"Logical and. Test whether two values are both defined with a nonzero/nonempty value.",examples:["true and false","true and true","2 and 4"],seealso:["not","or","xor"]}},function(e,t){e.exports={name:"not",category:"Logical",syntax:["not x","not(x)"],description:"Logical not. Flips the boolean value of given argument.",examples:["not true","not false","not 2","not 0"],seealso:["and","or","xor"]}},function(e,t){e.exports={name:"or",category:"Logical",syntax:["x or y","or(x, y)"],description:"Logical or. Test if at least one value is defined with a nonzero/nonempty value.",examples:["true or false","false or false","0 or 4"],seealso:["not","and","xor"]}},function(e,t){e.exports={name:"xor",category:"Logical",syntax:["x or y","or(x, y)"],description:"Logical exclusive or, xor. Test whether one and only one value is defined with a nonzero/nonempty value.",examples:["true xor false","false xor false","true xor true","0 or 4"],seealso:["not","and","or"]}},function(e,t){e.exports={name:"concat",category:"Matrix",syntax:["concat(A, B, C, ...)","concat(A, B, C, ..., dim)"],description:"Concatenate matrices. By default, the matrices are concatenated by the last dimension. The dimension on which to concatenate can be provided as last argument.",examples:["A = [1, 2; 5, 6]","B = [3, 4; 7, 8]","concat(A, B)","concat(A, B, 1)","concat(A, B, 2)"],seealso:["det","diag","eye","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"cross",category:"Matrix",syntax:["cross(A, B)"],description:"Calculate the cross product for two vectors in three dimensional space.",examples:["cross([1, 1, 0],  [0, 1, 1])","cross([3, -3, 1], [4, 9, 2])","cross([2, 3, 4],  [5, 6, 7])"],seealso:["multiply","dot"]}},function(e,t){e.exports={name:"det",category:"Matrix",syntax:["det(x)"],description:"Calculate the determinant of a matrix",examples:["det([1, 2; 3, 4])","det([-2, 2, 3; -1, 1, 3; 2, 0, -1])"],seealso:["concat","diag","eye","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"diag",category:"Matrix",syntax:["diag(x)","diag(x, k)"],description:"Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.",examples:["diag(1:3)","diag(1:3, 1)","a = [1, 2, 3; 4, 5, 6; 7, 8, 9]","diag(a)"],seealso:["concat","det","eye","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"dot",category:"Matrix",syntax:["dot(A, B)"],description:"Calculate the dot product of two vectors. The dot product of A = [a1, a2, a3, ..., an] and B = [b1, b2, b3, ..., bn] is defined as dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn",examples:["dot([2, 4, 1], [2, 2, 3])","[2, 4, 1] * [2, 2, 3]"],seealso:["multiply","cross"]}},function(e,t){e.exports={name:"eye",category:"Matrix",syntax:["eye(n)","eye(m, n)","eye([m, n])","eye"],description:"Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.",examples:["eye(3)","eye(3, 5)","a = [1, 2, 3; 4, 5, 6]","eye(size(a))"],seealso:["concat","det","diag","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"filter",category:"Matrix",syntax:["filter(x, test)"],description:"Filter items in a matrix.",examples:["isPositive(x) = x > 0","filter([6, -2, -1, 4, 3], isPositive)","filter([6, -2, 0, 1, 0], x != 0)"],seealso:["sort","map","forEach"]}},function(e,t){e.exports={name:"flatten",category:"Matrix",syntax:["flatten(x)"],description:"Flatten a multi dimensional matrix into a single dimensional matrix.",examples:["a = [1, 2, 3; 4, 5, 6]","size(a)","b = flatten(a)","size(b)"],seealso:["concat","resize","size","squeeze"]}},function(e,t){e.exports={name:"forEach",category:"Matrix",syntax:["forEach(x, callback)"],description:"Iterates over all elements of a matrix/array, and executes the given callback function.",examples:["forEach([1, 2, 3], function(val) { console.log(val) })"],seealso:["map","sort","filter"]}},function(e,t){e.exports={name:"inv",category:"Matrix",syntax:["inv(x)"],description:"Calculate the inverse of a matrix",examples:["inv([1, 2; 3, 4])","inv(4)","1 / 4"],seealso:["concat","det","diag","eye","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"map",category:"Matrix",syntax:["map(x, callback)"],description:"Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.",examples:["map([1, 2, 3], function(val) { return value * value })"],seealso:["filter","forEach"]}},function(e,t){e.exports={name:"ones",category:"Matrix",syntax:["ones(m)","ones(m, n)","ones(m, n, p, ...)","ones([m])","ones([m, n])","ones([m, n, p, ...])","ones"],description:"Create a matrix containing ones.",examples:["ones(3)","ones(3, 5)","ones([2,3]) * 4.5","a = [1, 2, 3; 4, 5, 6]","ones(size(a))"],seealso:["concat","det","diag","eye","inv","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"partitionSelect",category:"Matrix",syntax:["partitionSelect(x, k)","partitionSelect(x, k, compare)"],description:"Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.",examples:["partitionSelect([5, 10, 1], 2)",'partitionSelect(["C", "B", "A", "D"], 1)'],seealso:["sort"]}},function(e,t){e.exports={name:"range",category:"Type",syntax:["start:end","start:step:end","range(start, end)","range(start, end, step)","range(string)"],description:"Create a range. Lower bound of the range is included, upper bound is excluded.",examples:["1:5","3:-1:-3","range(3, 7)","range(0, 12, 2)",'range("4:10")',"a = [1, 2, 3, 4; 5, 6, 7, 8]","a[1:2, 1:2]"],seealso:["concat","det","diag","eye","inv","ones","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"resize",category:"Matrix",syntax:["resize(x, size)","resize(x, size, defaultValue)"],description:"Resize a matrix.",examples:["resize([1,2,3,4,5], [3])","resize([1,2,3], [5])","resize([1,2,3], [5], -1)","resize(2, [2, 3])",'resize("hello", [8], "!")'],seealso:["size","subset","squeeze"]}},function(e,t){e.exports={name:"size",category:"Matrix",syntax:["size(x)"],description:"Calculate the size of a matrix.",examples:["size(2.3)",'size("hello world")',"a = [1, 2; 3, 4; 5, 6]","size(a)","size(1:6)"],seealso:["concat","det","diag","eye","inv","ones","range","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"sort",category:"Matrix",syntax:["sort(x)","sort(x, compare)"],description:'Sort the items in a matrix. Compare can be a string "asc" or "desc", or a custom sort function.',examples:["sort([5, 10, 1])",'sort(["C", "B", "A", "D"])',"sortByLength(a, b) = size(a)[1] - size(b)[1]",'sort(["Langdon", "Tom", "Sara"], sortByLength)'],seealso:["map","filter","forEach"]}},function(e,t){e.exports={name:"squeeze",category:"Matrix",syntax:["squeeze(x)"],description:"Remove inner and outer singleton dimensions from a matrix.",examples:["a = zeros(3,2,1)","size(squeeze(a))","b = zeros(1,1,3)","size(squeeze(b))"],seealso:["concat","det","diag","eye","inv","ones","range","size","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"subset",category:"Matrix",syntax:["value(index)","value(index) = replacement","subset(value, [index])","subset(value, [index], replacement)"],description:"Get or set a subset of a matrix or string. Indexes are one-based. Both the ranges lower-bound and upper-bound are included.",examples:["d = [1, 2; 3, 4]","e = []","e[1, 1:2] = [5, 6]","e[2, :] = [7, 8]","f = d * e","f[2, 1]","f[:, 1]"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","trace","transpose","zeros"]}},function(e,t){e.exports={name:"trace",category:"Matrix",syntax:["trace(A)"],description:"Calculate the trace of a matrix: the sum of the elements on the main diagonal of a square matrix.",examples:["A = [1, 2, 3; -1, 2, 3; 2, 0, 3]","trace(A)"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","subset","transpose","zeros"]}},function(e,t){e.exports={name:"transpose",category:"Matrix",syntax:["x'","transpose(x)"],description:"Transpose a matrix",examples:["a = [1, 2, 3; 4, 5, 6]","a'","transpose(a)"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","subset","trace","zeros"]}},function(e,t){e.exports={name:"zeros",category:"Matrix",syntax:["zeros(m)","zeros(m, n)","zeros(m, n, p, ...)","zeros([m])","zeros([m, n])","zeros([m, n, p, ...])","zeros"],description:"Create a matrix containing zeros.",examples:["zeros(3)","zeros(3, 5)","a = [1, 2, 3; 4, 5, 6]","zeros(size(a))"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","subset","trace","transpose"]}},function(e,t){e.exports={name:"combinations",category:"Probability",syntax:["combinations(n, k)"],description:"Compute the number of combinations of n items taken k at a time",examples:["combinations(7, 5)"],seealso:["permutations","factorial"]}},function(e,t){e.exports={name:"factorial",category:"Probability",syntax:["kldivergence(x, y)"],description:"Compute the factorial of a value",examples:["5!","5 * 4 * 3 * 2 * 1","3!"],seealso:["combinations","permutations","gamma"]}},function(e,t){e.exports={name:"gamma",category:"Probability",syntax:["gamma(n)"],description:"Compute the gamma function. For small values, the Lanczos approximation is used, and for large values the extended Stirling approximation.",examples:["gamma(4)","3!","gamma(1/2)","sqrt(pi)"],seealso:["factorial"]}},function(e,t){e.exports={name:"kldivergence",category:"Probability",syntax:["n!","factorial(n)"],description:"Calculate the Kullback-Leibler (KL) divergence  between two distributions.",examples:["math.kldivergence([0.7,0.5,0.4], [0.2,0.9,0.5])"],seealso:[]}},function(e,t){e.exports={name:"multinomial",category:"Probability",syntax:["multinomial(A)"],description:"Multinomial Coefficients compute the number of ways of picking a1, a2, ..., ai unordered outcomes from `n` possibilities. multinomial takes one array of integers as an argument. The following condition must be enforced: every ai <= 0.",examples:["multinomial([1, 2, 1])"],seealso:["combinations","factorial"]}},function(e,t){e.exports={name:"permutations",category:"Probability",syntax:["permutations(n)","permutations(n, k)"],description:"Compute the number of permutations of n items taken k at a time",examples:["permutations(5)","permutations(5, 3)"],seealso:["combinations","factorial"]}},function(e,t){e.exports={name:"pickRandom",category:"Probability",syntax:["pickRandom(array)"],description:"Pick a random entry from a given array.",examples:["pickRandom(0:10)","pickRandom([1, 3, 1, 6])"],seealso:["random","randomInt"]}},function(e,t){e.exports={name:"random",category:"Probability",syntax:["random()","random(max)","random(min, max)","random(size)","random(size, max)","random(size, min, max)"],description:"Return a random number.",examples:["random()","random(10, 20)","random([2, 3])"],seealso:["pickRandom","randomInt"]}},function(e,t){e.exports={name:"randInt",category:"Probability",syntax:["randInt(max)","randInt(min, max)","randInt(size)","randInt(size, max)","randInt(size, min, max)"],description:"Return a random integer number",examples:["randInt(10, 20)","randInt([2, 3], 10)"],seealso:["pickRandom","random"]}},function(e,t){e.exports={name:"compare",category:"Relational",syntax:["compare(x, y)"],description:"Compare two values. Returns 1 if x is larger than y, -1 if x is smaller than y, and 0 if x and y are equal.",examples:["compare(2, 3)","compare(3, 2)","compare(2, 2)","compare(5cm, 40mm)","compare(2, [1, 2, 3])"],seealso:["equal","unequal","smaller","smallerEq","largerEq"]}},function(e,t){e.exports={name:"deepEqual",category:"Relational",syntax:["deepEqual(x, y)"],description:"Check equality of two matrices element wise. Returns true if the size of both matrices is equal and when and each of the elements are equal.",examples:["[1,3,4] == [1,3,4]","[1,3,4] == [1,3]"],seealso:["equal","unequal","smaller","larger","smallerEq","largerEq","compare"]}},function(e,t){e.exports={name:"equal",category:"Relational",syntax:["x == y","equal(x, y)"],description:"Check equality of two values. Returns true if the values are equal, and false if not.",examples:["2+2 == 3","2+2 == 4","a = 3.2","b = 6-2.8","a == b","50cm == 0.5m"],seealso:["unequal","smaller","larger","smallerEq","largerEq","compare","deepEqual"]}},function(e,t){e.exports={name:"larger",category:"Relational",syntax:["x > y","larger(x, y)"],description:"Check if value x is larger than y. Returns true if x is larger than y, and false if not.",examples:["2 > 3","5 > 2*2","a = 3.3","b = 6-2.8","(a > b)","(b < a)","5 cm > 2 inch"],seealso:["equal","unequal","smaller","smallerEq","largerEq","compare"]}},function(e,t){e.exports={name:"largerEq",category:"Relational",syntax:["x >= y","largerEq(x, y)"],description:"Check if value x is larger or equal to y. Returns true if x is larger or equal to y, and false if not.",examples:["2 > 1+1","2 >= 1+1","a = 3.2","b = 6-2.8","(a > b)"],seealso:["equal","unequal","smallerEq","smaller","largerEq","compare"]}},function(e,t){e.exports={name:"smaller",category:"Relational",syntax:["x < y","smaller(x, y)"],description:"Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.",examples:["2 < 3","5 < 2*2","a = 3.3","b = 6-2.8","(a < b)","5 cm < 2 inch"],seealso:["equal","unequal","larger","smallerEq","largerEq","compare"]}},function(e,t){e.exports={name:"smallerEq",category:"Relational",syntax:["x <= y","smallerEq(x, y)"],description:"Check if value x is smaller or equal to value y. Returns true if x is smaller than y, and false if not.",examples:["2 < 1+1","2 <= 1+1","a = 3.2","b = 6-2.8","(a < b)"],seealso:["equal","unequal","larger","smaller","largerEq","compare"]}},function(e,t){e.exports={name:"unequal",category:"Relational",syntax:["x != y","unequal(x, y)"],description:"Check unequality of two values. Returns true if the values are unequal, and false if they are equal.",examples:["2+2 != 3","2+2 != 4","a = 3.2","b = 6-2.8","a != b","50cm != 0.5m","5 cm != 2 inch"],seealso:["equal","smaller","larger","smallerEq","largerEq","compare","deepEqual"]}},function(e,t){e.exports={name:"max",category:"Statistics",syntax:["max(a, b, c, ...)","max(A)","max(A, dim)"],description:"Compute the maximum value of a list of values.",examples:["max(2, 3, 4, 1)","max([2, 3, 4, 1])","max([2, 5; 4, 3])","max([2, 5; 4, 3], 1)","max([2, 5; 4, 3], 2)","max(2.7, 7.1, -4.5, 2.0, 4.1)","min(2.7, 7.1, -4.5, 2.0, 4.1)"],seealso:["mean","median","min","prod","std","sum","var"]}},function(e,t){e.exports={name:"mean",category:"Statistics",syntax:["mean(a, b, c, ...)","mean(A)","mean(A, dim)"],description:"Compute the arithmetic mean of a list of values.",examples:["mean(2, 3, 4, 1)","mean([2, 3, 4, 1])","mean([2, 5; 4, 3])","mean([2, 5; 4, 3], 1)","mean([2, 5; 4, 3], 2)","mean([1.0, 2.7, 3.2, 4.0])"],seealso:["max","median","min","prod","std","sum","var"]}},function(e,t){e.exports={name:"median",category:"Statistics",syntax:["median(a, b, c, ...)","median(A)"],description:"Compute the median of all values. The values are sorted and the middle value is returned. In case of an even number of values, the average of the two middle values is returned.",examples:["median(5, 2, 7)","median([3, -1, 5, 7])"],seealso:["max","mean","min","prod","std","sum","var"]}},function(e,t){e.exports={name:"min",category:"Statistics",syntax:["min(a, b, c, ...)","min(A)","min(A, dim)"],description:"Compute the minimum value of a list of values.",examples:["min(2, 3, 4, 1)","min([2, 3, 4, 1])","min([2, 5; 4, 3])","min([2, 5; 4, 3], 1)","min([2, 5; 4, 3], 2)","min(2.7, 7.1, -4.5, 2.0, 4.1)","max(2.7, 7.1, -4.5, 2.0, 4.1)"],seealso:["max","mean","median","prod","std","sum","var"]}},function(e,t){e.exports={name:"mode",category:"Statistics",syntax:["mode(a, b, c, ...)","mode(A)","mode(A, a, b, B, c, ...)"],description:"Computes the mode of all values as an array. In case mode being more than one, multiple values are returned in an array.",examples:["mode(5, 2, 7)","mode([3, -1, 5, 7])"],seealso:["max","mean","min","median","prod","std","sum","var"]}},function(e,t){e.exports={name:"prod",category:"Statistics",syntax:["prod(a, b, c, ...)","prod(A)"],description:"Compute the product of all values.",examples:["prod(2, 3, 4)","prod([2, 3, 4])","prod([2, 5; 4, 3])"],seealso:["max","mean","min","median","min","std","sum","var"]}},function(e,t){e.exports={name:"quantileSeq",category:"Statistics",syntax:["quantileSeq(A, prob[, sorted])","quantileSeq(A, [prob1, prob2, ...][, sorted])","quantileSeq(A, N[, sorted])"],description:"Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probablity are: Number, BigNumber. \n\nIn case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.",examples:["quantileSeq([3, -1, 5, 7], 0.5)","quantileSeq([3, -1, 5, 7], [1/3, 2/3])","quantileSeq([3, -1, 5, 7], 2)","quantileSeq([-1, 3, 5, 7], 0.5, true)"],seealso:["mean","median","min","max","prod","std","sum","var"]}},function(e,t){e.exports={name:"std",category:"Statistics",syntax:["std(a, b, c, ...)","std(A)","std(A, normalization)"],description:'Compute the standard deviation of all values, defined as std(A) = sqrt(var(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',examples:["std(2, 4, 6)","std([2, 4, 6, 8])",'std([2, 4, 6, 8], "uncorrected")','std([2, 4, 6, 8], "biased")',"std([1, 2, 3; 4, 5, 6])"],seealso:["max","mean","min","median","min","prod","sum","var"]}},function(e,t){e.exports={name:"sum",category:"Statistics",syntax:["sum(a, b, c, ...)","sum(A)"],description:"Compute the sum of all values.",examples:["sum(2, 3, 4, 1)","sum([2, 3, 4, 1])","sum([2, 5; 4, 3])"],seealso:["max","mean","median","min","prod","std","sum","var"]}},function(e,t){e.exports={name:"var",category:"Statistics",syntax:["var(a, b, c, ...)","var(A)","var(A, normalization)"],description:'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',examples:["var(2, 4, 6)","var([2, 4, 6, 8])",'var([2, 4, 6, 8], "uncorrected")','var([2, 4, 6, 8], "biased")',"var([1, 2, 3; 4, 5, 6])"],seealso:["max","mean","min","median","min","prod","std","sum"]}},function(e,t){e.exports={name:"acos",category:"Trigonometry",syntax:["acos(x)"],description:"Compute the inverse cosine of a value in radians.",examples:["acos(0.5)","acos(cos(2.3))"],seealso:["cos","atan","asin"]}},function(e,t){e.exports={name:"acosh",category:"Trigonometry",syntax:["acosh(x)"],description:"Calculate the hyperbolic arccos of a value, defined as `acosh(x) = ln(sqrt(x^2 - 1) + x)`.",examples:["acosh(1.5)"],seealso:["cosh","asinh","atanh"]}},function(e,t){e.exports={name:"acot",category:"Trigonometry",syntax:["acot(x)"],description:"Calculate the inverse cotangent of a value.",examples:["acot(0.5)","acot(cot(0.5))","acot(2)"],seealso:["cot","atan"]}},function(e,t){e.exports={name:"acoth",category:"Trigonometry",syntax:["acoth(x)"],description:"Calculate the hyperbolic arccotangent of a value, defined as `acoth(x) = (ln((x+1)/x) + ln(x/(x-1))) / 2`.",examples:["acoth(0.5)"],seealso:["acsch","asech"]}},function(e,t){e.exports={name:"acsc",category:"Trigonometry",syntax:["acsc(x)"],
description:"Calculate the inverse cotangent of a value.",examples:["acsc(0.5)","acsc(csc(0.5))","acsc(2)"],seealso:["csc","asin","asec"]}},function(e,t){e.exports={name:"acsch",category:"Trigonometry",syntax:["acsch(x)"],description:"Calculate the hyperbolic arccosecant of a value, defined as `acsch(x) = ln(1/x + sqrt(1/x^2 + 1))`.",examples:["acsch(0.5)"],seealso:["asech","acoth"]}},function(e,t){e.exports={name:"asec",category:"Trigonometry",syntax:["asec(x)"],description:"Calculate the inverse secant of a value.",examples:["asec(0.5)","asec(sec(0.5))","asec(2)"],seealso:["acos","acot","acsc"]}},function(e,t){e.exports={name:"asech",category:"Trigonometry",syntax:["asech(x)"],description:"Calculate the inverse secant of a value.",examples:["asech(0.5)"],seealso:["acsch","acoth"]}},function(e,t){e.exports={name:"asin",category:"Trigonometry",syntax:["asin(x)"],description:"Compute the inverse sine of a value in radians.",examples:["asin(0.5)","asin(sin(2.3))"],seealso:["sin","acos","atan"]}},function(e,t){e.exports={name:"asinh",category:"Trigonometry",syntax:["asinh(x)"],description:"Calculate the hyperbolic arcsine of a value, defined as `asinh(x) = ln(x + sqrt(x^2 + 1))`.",examples:["asinh(0.5)"],seealso:["acosh","atanh"]}},function(e,t){e.exports={name:"atan",category:"Trigonometry",syntax:["atan(x)"],description:"Compute the inverse tangent of a value in radians.",examples:["atan(0.5)","atan(tan(2.3))"],seealso:["tan","acos","asin"]}},function(e,t){e.exports={name:"atanh",category:"Trigonometry",syntax:["atanh(x)"],description:"Calculate the hyperbolic arctangent of a value, defined as `atanh(x) = ln((1 + x)/(1 - x)) / 2`.",examples:["atanh(0.5)"],seealso:["acosh","asinh"]}},function(e,t){e.exports={name:"atan2",category:"Trigonometry",syntax:["atan2(y, x)"],description:"Computes the principal value of the arc tangent of y/x in radians.",examples:["atan2(2, 2) / pi","angle = 60 deg in rad","x = cos(angle)","y = sin(angle)","atan2(y, x)"],seealso:["sin","cos","tan"]}},function(e,t){e.exports={name:"cos",category:"Trigonometry",syntax:["cos(x)"],description:"Compute the cosine of x in radians.",examples:["cos(2)","cos(pi / 4) ^ 2","cos(180 deg)","cos(60 deg)","sin(0.2)^2 + cos(0.2)^2"],seealso:["acos","sin","tan"]}},function(e,t){e.exports={name:"cosh",category:"Trigonometry",syntax:["cosh(x)"],description:"Compute the hyperbolic cosine of x in radians.",examples:["cosh(0.5)"],seealso:["sinh","tanh","coth"]}},function(e,t){e.exports={name:"cot",category:"Trigonometry",syntax:["cot(x)"],description:"Compute the cotangent of x in radians. Defined as 1/tan(x)",examples:["cot(2)","1 / tan(2)"],seealso:["sec","csc","tan"]}},function(e,t){e.exports={name:"coth",category:"Trigonometry",syntax:["coth(x)"],description:"Compute the hyperbolic cotangent of x in radians.",examples:["coth(2)","1 / tanh(2)"],seealso:["sech","csch","tanh"]}},function(e,t){e.exports={name:"csc",category:"Trigonometry",syntax:["csc(x)"],description:"Compute the cosecant of x in radians. Defined as 1/sin(x)",examples:["csc(2)","1 / sin(2)"],seealso:["sec","cot","sin"]}},function(e,t){e.exports={name:"csch",category:"Trigonometry",syntax:["csch(x)"],description:"Compute the hyperbolic cosecant of x in radians. Defined as 1/sinh(x)",examples:["csch(2)","1 / sinh(2)"],seealso:["sech","coth","sinh"]}},function(e,t){e.exports={name:"sec",category:"Trigonometry",syntax:["sec(x)"],description:"Compute the secant of x in radians. Defined as 1/cos(x)",examples:["sec(2)","1 / cos(2)"],seealso:["cot","csc","cos"]}},function(e,t){e.exports={name:"sech",category:"Trigonometry",syntax:["sech(x)"],description:"Compute the hyperbolic secant of x in radians. Defined as 1/cosh(x)",examples:["sech(2)","1 / cosh(2)"],seealso:["coth","csch","cosh"]}},function(e,t){e.exports={name:"sin",category:"Trigonometry",syntax:["sin(x)"],description:"Compute the sine of x in radians.",examples:["sin(2)","sin(pi / 4) ^ 2","sin(90 deg)","sin(30 deg)","sin(0.2)^2 + cos(0.2)^2"],seealso:["asin","cos","tan"]}},function(e,t){e.exports={name:"sinh",category:"Trigonometry",syntax:["sinh(x)"],description:"Compute the hyperbolic sine of x in radians.",examples:["sinh(0.5)"],seealso:["cosh","tanh"]}},function(e,t){e.exports={name:"tan",category:"Trigonometry",syntax:["tan(x)"],description:"Compute the tangent of x in radians.",examples:["tan(0.5)","sin(0.5) / cos(0.5)","tan(pi / 4)","tan(45 deg)"],seealso:["atan","sin","cos"]}},function(e,t){e.exports={name:"tanh",category:"Trigonometry",syntax:["tanh(x)"],description:"Compute the hyperbolic tangent of x in radians.",examples:["tanh(0.5)","sinh(0.5) / cosh(0.5)"],seealso:["sinh","cosh"]}},function(e,t){e.exports={name:"to",category:"Units",syntax:["x to unit","to(x, unit)"],description:"Change the unit of a value.",examples:["5 inch to cm","3.2kg to g","16 bytes in bits"],seealso:[]}},function(e,t){e.exports={name:"clone",category:"Utils",syntax:["clone(x)"],description:"Clone a variable. Creates a copy of primitive variables,and a deep copy of matrices",examples:["clone(3.5)","clone(2 - 4i)","clone(45 deg)","clone([1, 2; 3, 4])",'clone("hello world")'],seealso:[]}},function(e,t){e.exports={name:"format",category:"Utils",syntax:["format(value)","format(value, precision)"],description:"Format a value of any type as string.",examples:["format(2.3)","format(3 - 4i)","format([])","format(pi, 3)"],seealso:["print"]}},function(e,t){e.exports={name:"isInteger",category:"Utils",syntax:["isInteger(x)"],description:"Test whether a value is an integer number.",examples:["isInteger(2)","isInteger(3.5)","isInteger([3, 0.5, -2])"],seealso:["isNegative","isNumeric","isPositive","isZero"]}},function(e,t){e.exports={name:"isNegative",category:"Utils",syntax:["isNegative(x)"],description:"Test whether a value is negative: smaller than zero.",examples:["isNegative(2)","isNegative(0)","isNegative(-4)","isNegative([3, 0.5, -2])"],seealso:["isInteger","isNumeric","isPositive","isZero"]}},function(e,t){e.exports={name:"isNumeric",category:"Utils",syntax:["isNumeric(x)"],description:"Test whether a value is a numeric value. Returns true when the input is a number, BigNumber, Fraction, or boolean.",examples:["isNumeric(2)","isNumeric(0)","isNumeric(bignumber(500))","isNumeric(fraction(0.125))",'isNumeric("3")',"isNumeric(2 + 3i)",'isNumeric([2.3, "foo", false])'],seealso:["isInteger","isZero","isNegative","isPositive"]}},function(e,t){e.exports={name:"isPositive",category:"Utils",syntax:["isPositive(x)"],description:"Test whether a value is positive: larger than zero.",examples:["isPositive(2)","isPositive(0)","isPositive(-4)","isPositive([3, 0.5, -2])"],seealso:["isInteger","isNumeric","isNegative","isZero"]}},function(e,t){e.exports={name:"isZero",category:"Utils",syntax:["isZero(x)"],description:"Test whether a value is zero.",examples:["isZero(2)","isZero(0)","isZero(-4)","isZero([3, 0, -2, 0])"],seealso:["isInteger","isNumeric","isNegative","isPositive"]}},function(e,t){e.exports={name:"typeof",category:"Utils",syntax:["typeof(x)"],description:"Get the type of a variable.",examples:["typeof(3.5)","typeof(2 - 4i)","typeof(45 deg)",'typeof("hello world")'],seealso:[]}},function(e,t,r){e.exports=[r(269),r(292),r(293),r(294),r(295)]},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(270));return a("compile",{string:function(e){return o(e).compile()},"Array | Matrix":function(e){return i(e,function(e){return o(e).compile()})}})}var i=r(19);t.name="compile",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(t,r){if(1!=arguments.length&&2!=arguments.length)throw new i("parse",arguments.length,1,2);if(de=r&&r.nodes?r.nodes:{},"string"==typeof t)return ge=t,x();if(Array.isArray(t)||t instanceof e.Matrix)return a(t,function(e){if("string"!=typeof e)throw new TypeError("String expected");return ge=e,x()});throw new TypeError("String or matrix expected")}function u(){ve=0,ye=ge.charAt(0),we=0,Ne=null}function c(){ve++,ye=ge.charAt(ve)}function f(){return ge.charAt(ve+1)}function l(){return ge.charAt(ve+2)}function p(){for(be=pe.NULL,xe="";" "==ye||"	"==ye||"\n"==ye&&we;)c();if("#"==ye)for(;"\n"!=ye&&""!=ye;)c();if(""==ye)return void(be=pe.DELIMITER);if("\n"==ye&&!we)return be=pe.DELIMITER,xe=ye,void c();var e=ye+f(),t=e+l();if(3==t.length&&he[t])return be=pe.DELIMITER,xe=t,c(),c(),void c();if(2==e.length&&he[e])return be=pe.DELIMITER,xe=e,c(),void c();if(he[ye])return be=pe.DELIMITER,xe=ye,void c();if(!v(ye)){if(g()){for(;g()||y(ye);)xe+=ye,c();return void(be=me.hasOwnProperty(xe)?pe.DELIMITER:pe.SYMBOL)}for(be=pe.UNKNOWN;""!=ye;)xe+=ye,c();throw X('Syntax error in part "'+xe+'"')}if(be=pe.NUMBER,"."==ye)xe+=ye,c(),y(ye)||(be=pe.UNKNOWN);else{for(;y(ye);)xe+=ye,c();"."==ye&&(xe+=ye,c())}for(;y(ye);)xe+=ye,c();if(e=f(),"E"==ye||"e"==ye)if(y(e)||"-"==e||"+"==e){if(xe+=ye,c(),"+"!=ye&&"-"!=ye||(xe+=ye,c()),!y(ye))throw X('Digit expected, got "'+ye+'"');for(;y(ye);)xe+=ye,c();if("."==ye)throw X('Digit expected, got "'+ye+'"')}else if("."==e)throw c(),X('Digit expected, got "'+ye+'"')}function h(){do p();while("\n"==xe)}function m(){we++}function d(){we--}function g(){var e=ge.charAt(ve-1),t=ge.charAt(ve+1),r=function(e){return/^[a-zA-Z_\u00C0-\u02AF\u0370-\u03FF]$/.test(e)},n=function(e,t){return/^[\uD835]$/.test(e)&&/^[\uDC00-\uDFFF]$/.test(t)&&/^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(t)};return r(ye)||n(ye,t)||n(e,ye)}function v(e){return e>="0"&&"9">=e||"."==e}function y(e){return e>="0"&&"9">=e}function x(){u(),p();var e=b();if(""!=xe)throw be==pe.DELIMITER?J("Unexpected operator "+xe):X('Unexpected part "'+xe+'"');return e}function b(){var e,t,r=[];if(""==xe)return new ne("undefined","undefined");for("\n"!=xe&&";"!=xe&&(e=w());"\n"==xe||";"==xe;)0==r.length&&e&&(t=";"!=xe,r.push({node:e,visible:t})),p(),"\n"!=xe&&";"!=xe&&""!=xe&&(e=w(),t=";"!=xe,r.push({node:e,visible:t}));return r.length>0?new te(r):e}function w(){var e,t,r,n,i=N();if("="==xe){if(i&&i.isSymbolNode)return e=i.name,h(),r=w(),new ee(new le(e),r);if(i&&i.isAccessorNode)return h(),r=w(),new ee(i.object,i.index,r);if(i&&i.isFunctionNode&&(n=!0,t=[],e=i.name,i.args.forEach(function(e,r){e&&e.isSymbolNode?t[r]=e.name:n=!1}),n))return h(),r=w(),new ie(e,t,r);throw X("Invalid left hand side of assignment operator =")}return i}function N(){for(var e=E();"?"==xe;){var t=Ne;Ne=we,h();var r=e,n=w();if(":"!=xe)throw X("False part of conditional expression expected");Ne=null,h();var i=w();e=new re(r,n,i),Ne=t}return e}function E(){for(var e=M();"or"==xe;)h(),e=new se("or","or",[e,M()]);return e}function M(){for(var e=A();"xor"==xe;)h(),e=new se("xor","xor",[e,A()]);return e}function A(){for(var e=_();"and"==xe;)h(),e=new se("and","and",[e,_()]);return e}function _(){for(var e=O();"|"==xe;)h(),e=new se("|","bitOr",[e,O()]);return e}function O(){for(var e=T();"^|"==xe;)h(),e=new se("^|","bitXor",[e,T()]);return e}function T(){for(var e=C();"&"==xe;)h(),e=new se("&","bitAnd",[e,C()]);return e}function C(){var e,t,r,n,i;for(e=S(),t={"==":"equal","!=":"unequal","<":"smaller",">":"larger","<=":"smallerEq",">=":"largerEq"};xe in t;)r=xe,n=t[r],h(),i=[e,S()],e=new se(r,n,i);return e}function S(){var e,t,r,n,i;for(e=z(),t={"<<":"leftShift",">>":"rightArithShift",">>>":"rightLogShift"};xe in t;)r=xe,n=t[r],h(),i=[e,z()],e=new se(r,n,i);return e}function z(){var e,t,r,n,i;for(e=B(),t={to:"to","in":"to"};xe in t;)r=xe,n=t[r],h(),"in"===r&&""===xe?e=new se("*","multiply",[e,new le("in")],!0):(i=[e,B()],e=new se(r,n,i));return e}function B(){var e,t=[];if(e=":"==xe?new ne("1","number"):k(),":"==xe&&Ne!==we){for(t.push(e);":"==xe&&t.length<3;)h(),")"==xe||"]"==xe||","==xe||""==xe?t.push(new le("end")):t.push(k());e=3==t.length?new fe(t[0],t[2],t[1]):new fe(t[0],t[1])}return e}function k(){var e,t,r,n,i;for(e=I(),t={"+":"add","-":"subtract"};xe in t;)r=xe,n=t[r],h(),i=[e,I()],e=new se(r,n,i);return e}function I(){var e,t,r,n,i;for(e=R(),t=e,r={"*":"multiply",".*":"dotMultiply","/":"divide","./":"dotDivide","%":"mod",mod:"mod"};;)if(xe in r)n=xe,i=r[n],h(),t=R(),e=new se(n,i,[e,t]);else{if(!(be==pe.SYMBOL||"in"==xe&&e&&e.isConstantNode||be==pe.NUMBER&&!t.isConstantNode||"("==xe))break;t=R(),e=new se("*","multiply",[e,t],!0)}return e}function R(){var e,t,r={"-":"unaryMinus","+":"unaryPlus","~":"bitNot",not:"not"}[xe];return r?(e=xe,h(),t=[R()],new se(e,r,t)):P()}function P(){var e,t,r,n;return e=U(),"^"!=xe&&".^"!=xe||(t=xe,r="^"==t?"pow":"dotPow",h(),n=[e,R()],e=new se(t,r,n)),e}function U(){var e,t,r,n,i;for(e=q(),t={"!":"factorial","'":"transpose"};xe in t;)r=xe,n=t[r],p(),i=[e],e=new se(r,n,i),e=j(e);return e}function q(){var e,t=[];if(be==pe.SYMBOL&&de[xe]){if(e=de[xe],p(),"("==xe){if(t=[],m(),p(),")"!=xe)for(t.push(w());","==xe;)p(),t.push(w());if(")"!=xe)throw X("Parenthesis ) expected");d(),p()}return new e(t)}return L()}function L(){var e,t;return be==pe.SYMBOL||be==pe.DELIMITER&&xe in me?(t=xe,p(),e=new le(t),e=j(e)):F()}function j(e,t){for(var r;!("("!=xe&&"["!=xe&&"."!=xe||t&&-1===t.indexOf(xe));)if(r=[],"("==xe){if(!e.isSymbolNode&&!e.isAccessorNode)return e;if(m(),p(),")"!=xe)for(r.push(w());","==xe;)p(),r.push(w());if(")"!=xe)throw X("Parenthesis ) expected");d(),p(),e=new ce(e,r)}else if("["==xe){if(m(),p(),"]"!=xe)for(r.push(w());","==xe;)p(),r.push(w());if("]"!=xe)throw X("Parenthesis ] expected");d(),p(),e=new Q(e,new ae(r))}else{if(p(),be!=pe.SYMBOL)throw X("Property name expected after dot");r.push(new ne(xe)),p();var n=!0;e=new Q(e,new ae(r,n))}return e}function F(){var e,t;return'"'==xe?(t=D(),e=new ne(t,"string"),e=j(e)):$()}function D(){for(var e="";""!=ye&&'"'!=ye;)"\\"==ye&&(e+=ye,c()),e+=ye,c();if(p(),'"'!=xe)throw X('End of string " expected');return p(),e}function $(){var e,t,r,n;if("["==xe){if(m(),p(),"]"!=xe){var i=G();if(";"==xe){for(r=1,t=[i];";"==xe;)p(),t[r]=G(),r++;if("]"!=xe)throw X("End of matrix ] expected");d(),p(),n=t[0].items.length;for(var a=1;r>a;a++)if(t[a].items.length!=n)throw J("Column dimensions mismatch ("+t[a].items.length+" != "+n+")");e=new K(t)}else{if("]"!=xe)throw X("End of matrix ] expected");d(),p(),e=i}}else d(),p(),e=new K([]);return j(e)}return H()}function G(){for(var e=[w()],t=1;","==xe;)p(),e[t]=w(),t++;return new K(e)}function H(){if("{"==xe){var e,t={};do if(p(),"}"!=xe){if('"'==xe)e=D();else{if(be!=pe.SYMBOL)throw X("Symbol or string expected as object key");e=xe,p()}if(":"!=xe)throw X("Colon : expected after object key");p(),t[e]=w()}while(","==xe);if("}"!=xe)throw X("Comma , or bracket } expected after object value");p();var r=new oe(t);return r=j(r)}return V()}function V(){var e;return be==pe.NUMBER?(e=xe,p(),new ne(e,"number")):Z()}function Z(){var e;if("("==xe){if(m(),p(),e=w(),")"!=xe)throw X("Parenthesis ) expected");return d(),p(),e=new ue(e),e=j(e)}return W()}function W(){throw X(""==xe?"Unexpected end of expression":"Value expected")}function Y(){return ve-xe.length+1}function X(e){var t=Y(),r=new SyntaxError(e+" (char "+t+")");return r["char"]=t,r}function J(e){var t=Y(),r=new SyntaxError(e+" (char "+t+")");return r["char"]=t,r}var Q=n(r(271)),K=n(r(277)),ee=n(r(278)),te=n(r(281)),re=n(r(282)),ne=n(r(283)),ie=n(r(284)),ae=n(r(285)),oe=n(r(288)),se=n(r(289)),ue=n(r(291)),ce=n(r(290)),fe=n(r(286)),le=n(r(287)),pe={NULL:0,DELIMITER:1,NUMBER:2,SYMBOL:3,UNKNOWN:4},he={",":!0,"(":!0,")":!0,"[":!0,"]":!0,"{":!0,"}":!0,'"':!0,";":!0,"+":!0,"-":!0,"*":!0,".*":!0,"/":!0,"./":!0,"%":!0,"^":!0,".^":!0,"~":!0,"!":!0,"&":!0,"|":!0,"^|":!0,"'":!0,"=":!0,":":!0,"?":!0,"==":!0,"!=":!0,"<":!0,">":!0,"<=":!0,">=":!0,"<<":!0,">>":!0,">>>":!0},me={mod:!0,to:!0,"in":!0,and:!0,xor:!0,or:!0,not:!0},de={},ge="",ve=0,ye="",xe="",be=pe.NULL,we=0,Ne=null;return s}var i=r(11),a=r(19);t.name="parse",t.path="expression",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(!e||!e.isNode)throw new TypeError('Node expected for parameter "object"');if(!t||!t.isIndexNode)throw new TypeError('IndexNode expected for parameter "index"');this.object=e||null,this.index=t,Object.defineProperty(this,"name",{get:function(){return this.index?this.index.isObjectProperty()?this.index.getObjectProperty():"":this.object.name||""}.bind(this),set:function(){throw new Error("Cannot assign a new name, name is read-only")}})}function o(e){return!(e.isAccessorNode||e.isArrayNode||e.isConstantNode||e.isFunctionNode||e.isObjectNode||e.isParenthesisNode||e.isSymbolNode)}var s=n(r(272)),u=n(r(274));return a.prototype=new s,a.prototype.type="AccessorNode",a.prototype.isAccessorNode=!0,a.prototype._compile=function(e,t){e.access=u;var r=this.object._compile(e,t),n=this.index._compile(e,t);return this.index.isObjectProperty()?r+'["'+this.index.getObjectProperty()+'"]':this.index.needsSize()?"(function () {  var object = "+r+";  var size = math.size(object).valueOf();  return access(object, "+n+");})()":"access("+r+", "+n+")"},a.prototype.forEach=function(e){e(this.object,"object",this),e(this.index,"index",this)},a.prototype.map=function(e){return new a(this._ifNode(e(this.object,"object",this)),this._ifNode(e(this.index,"index",this)))},a.prototype.clone=function(){return new a(this.object,this.index)},a.prototype._toString=function(e){var t=this.object.toString(e);return o(this.object)&&(t="("+t+")"),t+this.index.toString(e)},a.prototype._toTex=function(e){var t=this.object.toTex(e);return o(this.object)&&(t="\\left("+t+"\\right)"),t+this.index.toTex(e)},a}t.name="AccessorNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n,a){function o(){if(!(this instanceof o))throw new SyntaxError("Constructor must be called with the new operator")}function s(e){for(var t in e)if(e.hasOwnProperty(t)&&t in i)throw new Error('Scope contains an illegal symbol, "'+t+'" is a reserved keyword')}return o.prototype.eval=function(e){return this.compile().eval(e)},o.prototype.type="Node",o.prototype.isNode=!0,o.prototype.compile=function(){if(arguments.length>0)throw new Error("Calling compile(math) is deprecated. Call the function as compile() instead.");var e={math:a.expression.transform,args:{},_validateScope:s},t={},r=this._compile(e,t),n=Object.keys(e).map(function(e){return"    var "+e+' = defs["'+e+'"];'}),i=n.join(" ")+'return {  "eval": function (scope) {    if (scope) _validateScope(scope);    scope = scope || {};    return '+r+";  }};",o=new Function("defs",i);return o(e)},o.prototype._compile=function(e,t){throw new Error("Cannot compile a Node interface")},o.prototype.forEach=function(e){throw new Error("Cannot run forEach on a Node interface")},o.prototype.map=function(e){throw new Error("Cannot run map on a Node interface")},o.prototype._ifNode=function(e){if(!e||!e.isNode)throw new TypeError("Callback function must return a Node");return e},o.prototype.traverse=function(e){function t(e,r){e.forEach(function(e,n,i){r(e,n,i),t(e,r)})}e(this,null,null),t(this,e)},o.prototype.transform=function(e){function t(e,r){return e.map(function(e,n,i){var a=r(e,n,i);return t(a,r)})}var r=e(this,null,null);return t(r,e)},o.prototype.filter=function(e){var t=[];return this.traverse(function(r,n,i){e(r,n,i)&&t.push(r)}),t},o.prototype.find=function(){throw new Error("Function Node.find is deprecated. Use Node.filter instead.")},o.prototype.match=function(){throw new Error("Function Node.match is deprecated. See functions Node.filter, Node.transform, Node.traverse.")},o.prototype.clone=function(){throw new Error("Cannot clone a Node interface")},o.prototype.toString=function(e){var t;if(e&&"object"==typeof e)switch(typeof e.handler){case"object":case"undefined":break;case"function":t=e.handler(this,e);break;default:throw new TypeError("Object or function expected as callback")}return"undefined"!=typeof t?t:this._toString(e)},o.prototype._toString=function(){throw new Error("_toString not implemented for "+this.type)},o.prototype.toTex=function(e){var t;if(e&&"object"==typeof e)switch(typeof e.handler){case"object":case"undefined":break;case"function":t=e.handler(this,e);break;default:throw new TypeError("Object or function expected as callback")}return"undefined"!=typeof t?t:this._toTex(e)},o.prototype._toTex=function(e){throw new Error("_toTex not implemented for "+this.type)},o.prototype.getIdentifier=function(){return this.type},o.prototype.getContent=function(){return this},o}var i=r(273);r(3).extend;t.name="Node",t.path="expression.node",t.math=!0,t.factory=n},function(e,t){"use strict";e.exports={end:!0}},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(276)),s=n(r(52));return function(e,t){try{if(Array.isArray(e))return s(e).subset(t).valueOf();if(e&&"function"==typeof e.subset)return e.subset(t);if("string"==typeof e)return o(e,t);if("object"==typeof e){if(!t.isObjectProperty())throw TypeError("Cannot apply a numeric index as object property");return e[t.getObjectProperty()]}throw new TypeError("Cannot apply index: unsupported type of object")}catch(r){throw i(r)}}}var i=r(275).transform;t.factory=n},function(e,t,r){var n=r(43);t.transform=function(e){return e&&e.isIndexError?new n(e.index+1,e.min+1,void 0!==e.max?e.max+1:void 0):e}},function(e,t,r){"use strict";function n(e,t,n,c){function f(e,t){if(!t||t.isIndex!==!0)throw new TypeError("Index expected");if(1!=t.size().length)throw new u(t.size().length,1);var r=e.length;s(t.min()[0],r),s(t.max()[0],r);var n=t.dimension(0),i="";return n.forEach(function(t){i+=e.charAt(t)}),i}function l(e,t,r,n){if(!t||t.isIndex!==!0)throw new TypeError("Index expected");if(1!=t.size().length)throw new u(t.size().length,1);if(void 0!==n){if("string"!=typeof n||1!==n.length)throw new TypeError("Single character expected as defaultValue")}else n=" ";var i=t.dimension(0),a=i.size()[0];if(a!=r.length)throw new u(i.size()[0],r.length);var o=e.length;s(t.min()[0]),s(t.max()[0]);for(var c=[],f=0;o>f;f++)c[f]=e.charAt(f);if(i.forEach(function(e,t){c[e]=r.charAt(t[0])}),c.length>o)for(f=o-1,a=c.length;a>f;f++)c[f]||(c[f]=n);return c.join("")}var p=n(r(52)),h=c("subset",{"Array, Index":function(e,t){var r=p(e),n=r.subset(t);return n&&n.valueOf()},"Matrix, Index":function(e,t){return e.subset(t)},"Object, Index":i,"string, Index":f,"Array, Index, any":function(e,t,r){return p(o(e)).subset(t,r,void 0).valueOf()},"Array, Index, any, any":function(e,t,r,n){return p(o(e)).subset(t,r,n).valueOf()},"Matrix, Index, any":function(e,t,r){return e.clone().subset(t,r)},"Matrix, Index, any, any":function(e,t,r,n){return e.clone().subset(t,r,n)},"string, Index, string":l,"string, Index, string, string":l,"Object, Index, any":a});return h.toTex=void 0,h}function i(e,t){if(1!==t.size().length)throw new u(t.size(),1);var r=t.dimension(0);if("string"!=typeof r)throw new TypeError("String expected as index to retrieve an object property");return e[r]}function a(e,t,r){if(1!==t.size().length)throw new u(t.size(),1);var n=t.dimension(0);if("string"!=typeof n)throw new TypeError("String expected as index to retrieve an object property");var i=o(e);return i[n]=r,i}var o=r(3).clone,s=r(40).validateIndex,u=r(42);t.name="subset",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(this.items=e||[],!Array.isArray(this.items)||!this.items.every(function(e){return e&&e.isNode}))throw new TypeError("Array containing Nodes expected");var t=function(){throw new Error("Property `ArrayNode.nodes` is deprecated, use `ArrayNode.items` instead")};Object.defineProperty(this,"nodes",{get:t,set:t})}var o=n(r(272));return a.prototype=new o,a.prototype.type="ArrayNode",a.prototype.isArrayNode=!0,a.prototype._compile=function(e,t){var r="Array"!==e.math.config().matrix,n=this.items.map(function(r){return r._compile(e,t)});return(r?"math.matrix([":"[")+n.join(",")+(r?"])":"]")},a.prototype.forEach=function(e){for(var t=0;t<this.items.length;t++){var r=this.items[t];e(r,"items["+t+"]",this)}},a.prototype.map=function(e){for(var t=[],r=0;r<this.items.length;r++)t[r]=this._ifNode(e(this.items[r],"items["+r+"]",this));return new a(t)},a.prototype.clone=function(){return new a(this.items.slice(0))},a.prototype._toString=function(e){var t=this.items.map(function(t){return t.toString(e)});return"["+t.join(", ")+"]"},a.prototype._toTex=function(e){var t="\\begin{bmatrix}";return this.items.forEach(function(r){t+=r.items?r.items.map(function(t){return t.toTex(e)}).join("&"):r.toTex(e),t+="\\\\"}),t+="\\end{bmatrix}"},a}t.name="ArrayNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t,r){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(this.object=e,this.index=r?t:null,this.value=r?r:t,!e||!e.isSymbolNode&&!e.isAccessorNode)throw new TypeError('SymbolNode or AccessorNode expected as "object"');if(e&&e.isSymbolNode&&"end"===e.name)throw new Error('Cannot assign to symbol "end"');if(this.index&&!this.index.isIndexNode)throw new TypeError('IndexNode expected as "index"');if(!this.value||!this.value.isNode)throw new TypeError('Node expected as "value"');Object.defineProperty(this,"name",{get:function(){return this.index?this.index.isObjectProperty()?this.index.getObjectProperty():"":this.object.name||""}.bind(this),set:function(){throw new Error("Cannot assign a new name, name is read-only")}})}function o(e,t){t||(t="keep");var r=f.getPrecedence(e,t),n=f.getPrecedence(e.value,t);return"all"===t||null!==n&&r>=n}var s=n(r(272)),u=(n(r(277)),n(r(52)),n(r(279))),c=n(r(274)),f=(r(273),r(280));return a.prototype=new s,a.prototype.type="AssignmentNode",a.prototype.isAssignmentNode=!0,a.prototype._compile=function(e,t){e.assign=u,e.access=c;var r,n=this.object._compile(e,t),i=this.index?this.index._compile(e,t):null,a=this.value._compile(e,t);if(this.index){if(this.index.isObjectProperty())return n+'["'+this.index.getObjectProperty()+'"] = '+a;if(this.object.isSymbolNode)return r=this.index.needsSize()?"var size = math.size(object).valueOf();":"","(function () {  var object = "+n+";  var value = "+a+";  "+r+'  scope["'+this.object.name+'"] = assign(object, '+i+", value);  return value;})()";r=this.index.needsSize()?"var size = math.size(object).valueOf();":"";var o=this.object.object._compile(e,t);if(this.object.index.isObjectProperty()){var s='["'+this.object.index.getObjectProperty()+'"]';return"(function () {  var parent = "+o+";  var object = parent"+s+";  var value = "+a+";"+r+"  parent"+s+" = assign(object, "+i+", value);  return value;})()"}var f=this.object.index.needsSize()?"var size = math.size(parent).valueOf();":"",l=this.object.index._compile(e,t);return"(function () {  var parent = "+o+";  "+f+"  var parentIndex = "+l+";  var object = access(parent, parentIndex);  var value = "+a+";  "+r+"  assign(parent, parentIndex, assign(object, "+i+", value));  return value;})()"}if(!this.object.isSymbolNode)throw new TypeError("SymbolNode expected as object");return'scope["'+this.object.name+'"] = '+a},a.prototype.forEach=function(e){e(this.object,"object",this),this.index&&e(this.index,"index",this),e(this.value,"value",this)},a.prototype.map=function(e){var t=this._ifNode(e(this.object,"object",this)),r=this.index?this._ifNode(e(this.index,"index",this)):null,n=this._ifNode(e(this.value,"value",this));return new a(t,r,n)},a.prototype.clone=function(){return new a(this.object,this.index,this.value)},a.prototype._toString=function(e){var t=this.object.toString(e),r=this.index?this.index.toString(e):"",n=this.value.toString(e);return o(this,e&&e.parenthesis)&&(n="("+n+")"),t+r+" = "+n},a.prototype._toTex=function(e){var t=this.object.toTex(e),r=this.index?this.index.toTex(e):"",n=this.value.toTex(e);return o(this,e&&e.parenthesis)&&(n="\\left("+n+"\\right)"),t+r+":="+n},a}r(32);t.name="AssignmentNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(276)),s=n(r(52));return function(e,t,r){try{if(Array.isArray(e))return s(e).subset(t,r).valueOf();if(e&&"function"==typeof e.subset)return e.subset(t,r);if("string"==typeof e)return o(e,t,r);if("object"==typeof e){if(!t.isObjectProperty())throw TypeError("Cannot apply a numeric index as object property");return e[t.getObjectProperty()]=r,e}throw new TypeError("Cannot apply index: unsupported type of object")}catch(n){throw i(n)}}}var i=r(275).transform;t.factory=n},function(e,t){"use strict";function r(e,t){var r=e;"keep"!==t&&(r=e.getContent());for(var n=r.getIdentifier(),i=0;i<a.length;i++)if(n in a[i])return i;return null}function n(e,t){var n=e;"keep"!==t&&(n=e.getContent());var i=n.getIdentifier(),o=r(n,t);if(null===o)return null;var s=a[o][i];if(s.hasOwnProperty("associativity")){if("left"===s.associativity)return"left";if("right"===s.associativity)return"right";throw Error("'"+i+"' has the invalid associativity '"+s.associativity+"'.")}return null}function i(e,t,n){var i=e,o=t;if("keep"!==n)var i=e.getContent(),o=t.getContent();var s=i.getIdentifier(),u=o.getIdentifier(),c=r(i,n);if(null===c)return null;var f=a[c][s];if(f.hasOwnProperty("associativeWith")&&f.associativeWith instanceof Array){for(var l=0;l<f.associativeWith.length;l++)if(f.associativeWith[l]===u)return!0;return!1}return null}var a=[{AssignmentNode:{},FunctionAssignmentNode:{}},{ConditionalNode:{latexLeftParens:!1,latexRightParens:!1,latexParens:!1}},{"OperatorNode:or":{associativity:"left",associativeWith:[]}},{"OperatorNode:xor":{associativity:"left",associativeWith:[]}},{"OperatorNode:and":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitOr":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitXor":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitAnd":{associativity:"left",associativeWith:[]}},{"OperatorNode:equal":{associativity:"left",associativeWith:[]},"OperatorNode:unequal":{associativity:"left",associativeWith:[]},"OperatorNode:smaller":{associativity:"left",associativeWith:[]},"OperatorNode:larger":{associativity:"left",associativeWith:[]},"OperatorNode:smallerEq":{associativity:"left",associativeWith:[]},"OperatorNode:largerEq":{associativity:"left",associativeWith:[]}},{"OperatorNode:leftShift":{associativity:"left",associativeWith:[]},"OperatorNode:rightArithShift":{associativity:"left",associativeWith:[]},"OperatorNode:rightLogShift":{associativity:"left",associativeWith:[]}},{"OperatorNode:to":{associativity:"left",associativeWith:[]}},{RangeNode:{}},{"OperatorNode:add":{associativity:"left",associativeWith:["OperatorNode:add","OperatorNode:subtract"]},"OperatorNode:subtract":{associativity:"left",associativeWith:[]}},{"OperatorNode:multiply":{associativity:"left",associativeWith:["OperatorNode:multiply","OperatorNode:divide","Operator:dotMultiply","Operator:dotDivide"]},"OperatorNode:divide":{associativity:"left",associativeWith:[],latexLeftParens:!1,latexRightParens:!1,latexParens:!1},"OperatorNode:dotMultiply":{associativity:"left",associativeWith:["OperatorNode:multiply","OperatorNode:divide","OperatorNode:dotMultiply","OperatorNode:doDivide"]},"OperatorNode:dotDivide":{associativity:"left",associativeWith:[]},"OperatorNode:mod":{associativity:"left",associativeWith:[]}},{"OperatorNode:unaryPlus":{associativity:"right"},"OperatorNode:unaryMinus":{associativity:"right"},"OperatorNode:bitNot":{associativity:"right"},"OperatorNode:not":{associativity:"right"}},{"OperatorNode:pow":{associativity:"right",associativeWith:[],latexRightParens:!1},"OperatorNode:dotPow":{associativity:"right",associativeWith:[]}},{"OperatorNode:factorial":{associativity:"left"}},{"OperatorNode:transpose":{associativity:"left"}}];e.exports.properties=a,e.exports.getPrecedence=r,e.exports.getAssociativity=n,e.exports.isAssociativeWith=i},function(e,t,r){"use strict";function n(e,t,n,i){function a(e){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");
if(!Array.isArray(e))throw new Error("Array expected");this.blocks=e.map(function(e){var t=e&&e.node,r=e&&void 0!==e.visible?e.visible:!0;if(!t||!t.isNode)throw new TypeError('Property "node" must be a Node');if("boolean"!=typeof r)throw new TypeError('Property "visible" must be a boolean');return{node:t,visible:r}})}var o=n(r(272)),s=n(r(72));return a.prototype=new o,a.prototype.type="BlockNode",a.prototype.isBlockNode=!0,a.prototype._compile=function(e,t){e.ResultSet=s;var r=this.blocks.map(function(r){var n=r.node._compile(e,t);return r.visible?"results.push("+n+");":n+";"});return"(function () {var results = [];"+r.join("")+"return new ResultSet(results);})()"},a.prototype.forEach=function(e){for(var t=0;t<this.blocks.length;t++)e(this.blocks[t].node,"blocks["+t+"].node",this)},a.prototype.map=function(e){for(var t=[],r=0;r<this.blocks.length;r++){var n=this.blocks[r],i=this._ifNode(e(n.node,"blocks["+r+"].node",this));t[r]={node:i,visible:n.visible}}return new a(t)},a.prototype.clone=function(){var e=this.blocks.map(function(e){return{node:e.node,visible:e.visible}});return new a(e)},a.prototype._toString=function(e){return this.blocks.map(function(t){return t.node.toString(e)+(t.visible?"":";")}).join("\n")},a.prototype._toTex=function(e){return this.blocks.map(function(t){return t.node.toTex(e)+(t.visible?"":";")}).join("\\;\\;\n")},a}t.name="BlockNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t,r){if(!(this instanceof o))throw new SyntaxError("Constructor must be called with the new operator");if(!e||!e.isNode)throw new TypeError("Parameter condition must be a Node");if(!t||!t.isNode)throw new TypeError("Parameter trueExpr must be a Node");if(!r||!r.isNode)throw new TypeError("Parameter falseExpr must be a Node");this.condition=e,this.trueExpr=t,this.falseExpr=r}var s=n(r(272));return o.prototype=new s,o.prototype.type="ConditionalNode",o.prototype.isConditionalNode=!0,o.prototype._compile=function(e,t){return e.testCondition=function(t){if("number"==typeof t||"boolean"==typeof t||"string"==typeof t)return!!t;if(t){if(t.isBigNumber===!0)return!t.isZero();if(t.isComplex===!0)return!(!t.re&&!t.im);if(t.isUnit===!0)return!!t.value}if(null===t||void 0===t)return!1;throw new TypeError('Unsupported type of condition "'+e.math["typeof"](t)+'"')},"testCondition("+this.condition._compile(e,t)+") ? ( "+this.trueExpr._compile(e,t)+") : ( "+this.falseExpr._compile(e,t)+")"},o.prototype.forEach=function(e){e(this.condition,"condition",this),e(this.trueExpr,"trueExpr",this),e(this.falseExpr,"falseExpr",this)},o.prototype.map=function(e){return new o(this._ifNode(e(this.condition,"condition",this)),this._ifNode(e(this.trueExpr,"trueExpr",this)),this._ifNode(e(this.falseExpr,"falseExpr",this)))},o.prototype.clone=function(){return new o(this.condition,this.trueExpr,this.falseExpr)},o.prototype._toString=function(e){var t=e&&e.parenthesis?e.parenthesis:"keep",r=i.getPrecedence(this,t),n=this.condition.toString(e),a=i.getPrecedence(this.condition,t);("all"===t||"OperatorNode"===this.condition.type||null!==a&&r>=a)&&(n="("+n+")");var o=this.trueExpr.toString(e),s=i.getPrecedence(this.trueExpr,t);("all"===t||"OperatorNode"===this.trueExpr.type||null!==s&&r>=s)&&(o="("+o+")");var u=this.falseExpr.toString(e),c=i.getPrecedence(this.falseExpr,t);return("all"===t||"OperatorNode"===this.falseExpr.type||null!==c&&r>=c)&&(u="("+u+")"),n+" ? "+o+" : "+u},o.prototype._toTex=function(e){return"\\begin{cases} {"+this.trueExpr.toTex(e)+"}, &\\quad{\\text{if }\\;"+this.condition.toTex(e)+"}\\\\{"+this.falseExpr.toTex(e)+"}, &\\quad{\\text{otherwise}}\\end{cases}"},o}var i=(r(32),r(280));t.name="ConditionalNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t){if(!(this instanceof o))throw new SyntaxError("Constructor must be called with the new operator");if(t){if("string"!=typeof t)throw new TypeError('String expected for parameter "valueType"');if("string"!=typeof e)throw new TypeError('String expected for parameter "value"');this.value=e,this.valueType=t}else this.value=e+"",this.valueType=i(e);if(!u[this.valueType])throw new TypeError('Unsupported type of value "'+this.valueType+'"')}var s=n(r(272)),u={number:!0,string:!0,"boolean":!0,undefined:!0,"null":!0};return o.prototype=new s,o.prototype.type="ConstantNode",o.prototype.isConstantNode=!0,o.prototype._compile=function(e,t){switch(this.valueType){case"number":var r=e.math.config().number;return"BigNumber"===r?'math.bignumber("'+this.value+'")':"Fraction"===r?'math.fraction("'+this.value+'")':this.value.replace(/^(0*)[0-9]/,function(e,t){return e.substring(t.length)});case"string":return'"'+this.value+'"';case"boolean":return this.value;case"undefined":return this.value;case"null":return this.value;default:throw new TypeError('Unsupported type of constant "'+this.valueType+'"')}},o.prototype.forEach=function(e){},o.prototype.map=function(e){return this.clone()},o.prototype.clone=function(){return new o(this.value,this.valueType)},o.prototype._toString=function(e){switch(this.valueType){case"string":return'"'+this.value+'"';default:return this.value}},o.prototype._toTex=function(e){var t,r=this.value;switch(this.valueType){case"string":return'\\mathtt{"'+r+'"}';case"number":return t=r.toLowerCase().indexOf("e"),-1!==t?r.substring(0,t)+"\\cdot10^{"+r.substring(t+1)+"}":r;default:return r}},o}var i=r(41).type;t.name="ConstantNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e){return"string"==typeof e}function i(e,t,i,u){function c(e,t,r){if(!(this instanceof c))throw new SyntaxError("Constructor must be called with the new operator");if("string"!=typeof e)throw new TypeError('String expected for parameter "name"');if(!Array.isArray(t)||!t.every(n))throw new TypeError('Array containing strings expected for parameter "params"');if(!r||!r.isNode)throw new TypeError('Node expected for parameter "expr"');if(e in a)throw new Error('Illegal function name, "'+e+'" is a reserved keyword');this.name=e,this.params=t,this.expr=r}function f(e,t){var r=s.getPrecedence(e,t),n=s.getPrecedence(e.expr,t);return"all"===t||null!==n&&r>=n}var l=i(r(272));return c.prototype=new l,c.prototype.type="FunctionAssignmentNode",c.prototype.isFunctionAssignmentNode=!0,c.prototype._compile=function(e,t){var r=Object.create(t);this.params.forEach(function(e){r[e]=!0});var n=this.expr._compile(e,r);return'scope["'+this.name+'"] =   (function () {    var fn = function '+this.name+"("+this.params.join(",")+") {      if (arguments.length != "+this.params.length+') {        throw new SyntaxError("Wrong number of arguments in function '+this.name+' (" + arguments.length + " provided, '+this.params.length+' expected)");      }      return '+n+'    };    fn.syntax = "'+this.name+"("+this.params.join(", ")+')";    return fn;  })()'},c.prototype.forEach=function(e){e(this.expr,"expr",this)},c.prototype.map=function(e){var t=this._ifNode(e(this.expr,"expr",this));return new c(this.name,this.params.slice(0),t)},c.prototype.clone=function(){return new c(this.name,this.params.slice(0),this.expr)},c.prototype._toString=function(e){var t=e&&e.parenthesis?e.parenthesis:"keep",r=this.expr.toString(e);return f(this,t)&&(r="("+r+")"),"function "+this.name+"("+this.params.join(", ")+") = "+r},c.prototype._toTex=function(e){var t=e&&e.parenthesis?e.parenthesis:"keep",r=this.expr.toTex(e);return f(this,t)&&(r="\\left("+r+"\\right)"),"\\mathrm{"+this.name+"}\\left("+this.params.map(o.toSymbol).join(",")+"\\right):="+r},c}var a=r(273),o=r(32),s=r(280);t.name="FunctionAssignmentNode",t.path="expression.node",t.factory=i},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(this.dimensions=e,this.dotNotation=t||!1,!u(e)||!e.every(function(e){return e&&e.isNode}))throw new TypeError('Array containing Nodes expected for parameter "dimensions"');if(this.dotNotation&&!this.isObjectProperty())throw new Error("dotNotation only applicable for object properties");var r=function(){throw new Error("Property `IndexNode.object` is deprecated, use `IndexNode.fn` instead")};Object.defineProperty(this,"object",{get:r,set:r})}var o=n(r(272)),s=(n(r(286)),n(r(287)),n(r(67))),u=Array.isArray;return a.prototype=new o,a.prototype.type="IndexNode",a.prototype.isIndexNode=!0,a.prototype._compile=function(e,t){var r=Object.create(t);e.range=function(e,t,r){return new s(e&&e.isBigNumber===!0?e.toNumber():e,t&&t.isBigNumber===!0?t.toNumber():t,r&&r.isBigNumber===!0?r.toNumber():r)};var n=this.dimensions.map(function(t,n){return t&&t.isRangeNode?t.needsEnd()?(r.end=!0,"(function () {var end = size["+n+"]; return range("+t.start._compile(e,r)+", "+t.end._compile(e,r)+", "+(t.step?t.step._compile(e,r):"1")+"); })()"):"range("+t.start._compile(e,r)+", "+t.end._compile(e,r)+", "+(t.step?t.step._compile(e,r):"1")+")":t.isSymbolNode&&"end"===t.name?(r.end=!0,"(function () {var end = size["+n+"]; return "+t._compile(e,r)+"; })()"):t._compile(e,r)});return"math.index("+n.join(", ")+")"},a.prototype.forEach=function(e){for(var t=0;t<this.dimensions.length;t++)e(this.dimensions[t],"dimensions["+t+"]",this)},a.prototype.map=function(e){for(var t=[],r=0;r<this.dimensions.length;r++)t[r]=this._ifNode(e(this.dimensions[r],"dimensions["+r+"]",this));return new a(t)},a.prototype.clone=function(){return new a(this.dimensions.slice(0))},a.prototype.isObjectProperty=function(){return 1===this.dimensions.length&&this.dimensions[0].isConstantNode&&"string"===this.dimensions[0].valueType},a.prototype.getObjectProperty=function(){return this.isObjectProperty()?this.dimensions[0].value:null},a.prototype._toString=function(e){return this.dotNotation?"."+this.getObjectProperty():"["+this.dimensions.join(", ")+"]"},a.prototype._toTex=function(e){var t=this.dimensions.map(function(t){return t.toTex(e)});return this.dotNotation?"."+this.getObjectProperty():"_{"+t.join(",")+"}"},a.prototype.needsSize=function(){return this.dimensions.some(function(e){return e.isRangeNode&&e.needsEnd()||e.isSymbolNode&&"end"===e.name})},a}t.name="IndexNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t,r){if(!(this instanceof o))throw new SyntaxError("Constructor must be called with the new operator");if(!e||!e.isNode)throw new TypeError("Node expected");if(!t||!t.isNode)throw new TypeError("Node expected");if(r&&(!r||!r.isNode))throw new TypeError("Node expected");if(arguments.length>3)throw new Error("Too many arguments");this.start=e,this.end=t,this.step=r||null}function s(e,t){var r=i.getPrecedence(e,t),n={},a=i.getPrecedence(e.start,t);if(n.start=null!==a&&r>=a||"all"===t,e.step){var o=i.getPrecedence(e.step,t);n.step=null!==o&&r>=o||"all"===t}var s=i.getPrecedence(e.end,t);return n.end=null!==s&&r>=s||"all"===t,n}var u=n(r(272));return o.prototype=new u,o.prototype.type="RangeNode",o.prototype.isRangeNode=!0,o.prototype.needsEnd=function(){var e=this.filter(function(e){return e&&e.isSymbolNode&&"end"==e.name});return e.length>0},o.prototype._compile=function(e,t){return"math.range("+this.start._compile(e,t)+", "+this.end._compile(e,t)+(this.step?", "+this.step._compile(e,t):"")+")"},o.prototype.forEach=function(e){e(this.start,"start",this),e(this.end,"end",this),this.step&&e(this.step,"step",this)},o.prototype.map=function(e){return new o(this._ifNode(e(this.start,"start",this)),this._ifNode(e(this.end,"end",this)),this.step&&this._ifNode(e(this.step,"step",this)))},o.prototype.clone=function(){return new o(this.start,this.end,this.step&&this.step)},o.prototype._toString=function(e){var t,r=e&&e.parenthesis?e.parenthesis:"keep",n=s(this,r),i=this.start.toString(e);if(n.start&&(i="("+i+")"),t=i,this.step){var a=this.step.toString(e);n.step&&(a="("+a+")"),t+=":"+a}var o=this.end.toString(e);return n.end&&(o="("+o+")"),t+=":"+o},o.prototype._toTex=function(e){var t=e&&e.parenthesis?e.parenthesis:"keep",r=s(this,t),n=this.start.toTex(e);if(r.start&&(n="\\left("+n+"\\right)"),this.step){var i=this.step.toTex(e);r.step&&(i="\\left("+i+"\\right)"),n+=":"+i}var a=this.end.toTex(e);return r.end&&(a="\\left("+a+"\\right)"),n+=":"+a},o}var i=r(280);t.name="RangeNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a,o){function s(e){if(!(this instanceof s))throw new SyntaxError("Constructor must be called with the new operator");if("string"!=typeof e)throw new TypeError('String expected for parameter "name"');this.name=e}function u(e){throw new Error("Undefined symbol "+e)}var c=n(r(272)),f=n(r(75));return s.prototype=new c,s.prototype.type="SymbolNode",s.prototype.isSymbolNode=!0,s.prototype._compile=function(e,t){return e.undef=u,e.Unit=f,t[this.name]?this.name:this.name in e.math?'("'+this.name+'" in scope ? scope["'+this.name+'"] : math["'+this.name+'"])':'("'+this.name+'" in scope ? scope["'+this.name+'"] : '+(f.isValuelessUnit(this.name)?'new Unit(null, "'+this.name+'")':'undef("'+this.name+'")')+")"},s.prototype.forEach=function(e){},s.prototype.map=function(e){return this.clone()},s.prototype.clone=function(){return new s(this.name)},s.prototype._toString=function(e){return this.name},s.prototype._toTex=function(e){var t=!1;"undefined"==typeof o[this.name]&&f.isValuelessUnit(this.name)&&(t=!0);var r=i.toSymbol(this.name,t);return"\\"===r[0]?r:" "+r},s}var i=r(32);t.name="SymbolNode",t.path="expression.node",t.math=!0,t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(this.properties=e||{},e&&("object"!=typeof e||Object.keys(e).some(function(t){return!e[t]||!e[t].isNode})))throw new TypeError("Object containing Nodes expected")}var o=n(r(272));return a.prototype=new o,a.prototype.type="ObjectNode",a.prototype.isObjectNode=!0,a.prototype._compile=function(e,t){var r=[];for(var n in this.properties)this.properties.hasOwnProperty(n)&&r.push('"'+n+'": '+this.properties[n]._compile(e,t));return"{"+r.join(", ")+"}"},a.prototype.forEach=function(e){for(var t in this.properties)this.properties.hasOwnProperty(t)&&e(this.properties[t],'properties["'+t+'"]',this)},a.prototype.map=function(e){var t={};for(var r in this.properties)this.properties.hasOwnProperty(r)&&(t[r]=this._ifNode(e(this.properties[r],'properties["'+r+'"]',this)));return new a(t)},a.prototype.clone=function(){var e={};for(var t in this.properties)this.properties.hasOwnProperty(t)&&(e[t]=this.properties[t]);return new a(e)},a.prototype._toString=function(e){var t=[];for(var r in this.properties)this.properties.hasOwnProperty(r)&&t.push('"'+r+'": '+this.properties[r].toString(e));return"{"+t.join(", ")+"}"},a.prototype._toTex=function(e){var t=[];for(var r in this.properties)this.properties.hasOwnProperty(r)&&t.push("\\mathbf{"+r+":} & "+this.properties[r].toTex(e)+"\\\\");return"\\left\\{\\begin{array}{ll}"+t.join("\n")+"\\end{array}\\right\\}"},a}r(23);t.name="ObjectNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o,s){function u(e,t,r,n){if(!(this instanceof u))throw new SyntaxError("Constructor must be called with the new operator");if("string"!=typeof e)throw new TypeError('string expected for parameter "op"');if("string"!=typeof t)throw new TypeError('string expected for parameter "fn"');if(!Array.isArray(r)||!r.every(function(e){return e&&e.isNode}))throw new TypeError('Array containing Nodes expected for parameter "args"');this.implicit=n===!0,this.op=e,this.fn=t,this.args=r||[]}function c(e,t,r,n){var i=a.getPrecedence(e,t),o=a.getAssociativity(e,t);if("all"===t||r.length>2){var s=[];return r.forEach(function(e){switch(e.getContent().type){case"ArrayNode":case"ConstantNode":case"SymbolNode":case"ParenthesisNode":s.push(!1);break;default:s.push(!0)}}),s}switch(r.length){case 0:return[];case 1:var u=a.getPrecedence(r[0],t);if(n&&null!==u){var c,f;if("keep"===t?(c=r[0].getIdentifier(),f=e.getIdentifier()):(c=r[0].getContent().getIdentifier(),f=e.getContent().getIdentifier()),a.properties[i][f].latexLeftParens===!1)return[!1];if(a.properties[u][c].latexParens===!1)return[!1]}return null===u?[!1]:i>=u?[!0]:[!1];case 2:var l,p=a.getPrecedence(r[0],t),h=a.isAssociativeWith(e,r[0],t);l=null===p?!1:p!==i||"right"!==o||h?i>p:!0;var m,d=a.getPrecedence(r[1],t),g=a.isAssociativeWith(e,r[1],t);if(m=null===d?!1:d!==i||"left"!==o||g?i>d:!0,n){var f,v,y;"keep"===t?(f=e.getIdentifier(),v=e.args[0].getIdentifier(),y=e.args[1].getIdentifier()):(f=e.getContent().getIdentifier(),v=e.args[0].getContent().getIdentifier(),y=e.args[1].getContent().getIdentifier()),null!==p&&(a.properties[i][f].latexLeftParens===!1&&(l=!1),a.properties[p][v].latexParens===!1&&(l=!1)),null!==d&&(a.properties[i][f].latexRightParens===!1&&(m=!1),a.properties[d][y].latexParens===!1&&(m=!1))}return[l,m]}}var f=n(r(272));n(r(283)),n(r(287)),n(r(290));return u.prototype=new f,u.prototype.type="OperatorNode",u.prototype.isOperatorNode=!0,u.prototype._compile=function(e,t){if(!e.math[this.fn])throw new Error("Function "+this.fn+' missing in provided namespace "math"');var r=this.args.map(function(r){return r._compile(e,t)});return"math."+this.fn+"("+r.join(", ")+")"},u.prototype.forEach=function(e){for(var t=0;t<this.args.length;t++)e(this.args[t],"args["+t+"]",this)},u.prototype.map=function(e){for(var t=[],r=0;r<this.args.length;r++)t[r]=this._ifNode(e(this.args[r],"args["+r+"]",this));return new u(this.op,this.fn,t)},u.prototype.clone=function(){return new u(this.op,this.fn,this.args.slice(0))},u.prototype._toString=function(e){var t=e&&e.parenthesis?e.parenthesis:"keep",r=e&&e.implicit?e.implicit:"hide",n=this.args,i=c(this,t,n,!1);switch(n.length){case 1:var o=a.getAssociativity(this,t),s=n[0].toString(e);return i[0]&&(s="("+s+")"),"right"===o?this.op+s:"left"===o?s+this.op:s+this.op;case 2:var u=n[0].toString(e),f=n[1].toString(e);return i[0]&&(u="("+u+")"),i[1]&&(f="("+f+")"),this.implicit&&"OperatorNode:multiply"===this.getIdentifier()&&"hide"==r?u+" "+f:u+" "+this.op+" "+f;default:return this.fn+"("+this.args.join(", ")+")"}},u.prototype._toTex=function(e){var t=e&&e.parenthesis?e.parenthesis:"keep",r=e&&e.implicit?e.implicit:"hide",n=this.args,o=c(this,t,n,!0),s=i.operators[this.fn];switch(s="undefined"==typeof s?this.op:s,n.length){case 1:var u=a.getAssociativity(this,t),f=n[0].toTex(e);return o[0]&&(f="\\left("+f+"\\right)"),"right"===u?s+f:"left"===u?f+s:f+s;case 2:var l=n[0],p=l.toTex(e);o[0]&&(p="\\left("+p+"\\right)");var h=n[1],m=h.toTex(e);o[1]&&(m="\\left("+m+"\\right)");var d;switch(d="keep"===t?l.getIdentifier():l.getContent().getIdentifier(),this.getIdentifier()){case"OperatorNode:divide":return s+"{"+p+"}{"+m+"}";case"OperatorNode:pow":switch(p="{"+p+"}",m="{"+m+"}",d){case"ConditionalNode":case"OperatorNode:divide":p="\\left("+p+"\\right)"}case"OperatorNode:multiply":if(this.implicit&&"hide"===r)return p+"~"+m}return p+s+m;default:return"\\mathrm{"+this.fn+"}\\left("+n.map(function(t){return t.toTex(e)}).join(",")+"\\right)"}},u.prototype.getIdentifier=function(){return this.type+":"+this.fn},u}var i=r(32),a=r(280);t.name="OperatorNode",t.path="expression.node",t.math=!0,t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a,o){function s(e,t){if(!(this instanceof s))throw new SyntaxError("Constructor must be called with the new operator");if("string"==typeof e&&(console.warn("WARNING: passing a string to FunctionNode is deprecated, pass a SymbolNode instead."),e=new f(e)),!e||!e.isNode)throw new TypeError('Node expected as parameter "fn"');if(!Array.isArray(t)||!t.every(function(e){return e&&e.isNode}))throw new TypeError('Array containing Nodes expected for parameter "args"');this.fn=e,this.args=t||[],Object.defineProperty(this,"name",{get:function(){return this.fn.name||""}.bind(this),set:function(){throw new Error("Cannot assign a new name, name is read-only")}});var r=function(){throw new Error("Property `FunctionNode.object` is deprecated, use `FunctionNode.fn` instead")};Object.defineProperty(this,"object",{get:r,set:r})}function u(e,t,r){for(var n,i="",a=new RegExp("\\$(?:\\{([a-z_][a-z_0-9]*)(?:\\[([0-9]+)\\])?\\}|\\$)","ig"),o=0;null!==(n=a.exec(e));)if(i+=e.substring(o,n.index),o=n.index,"$$"===n[0])i+="$",o++;else{o+=n[0].length;var s=t[n[1]];if(!s)throw new ReferenceError("Template: Property "+n[1]+" does not exist.");if(void 0===n[2])switch(typeof s){case"string":i+=s;break;case"object":if(s.isNode)i+=s.toTex(r);else{if(!Array.isArray(s))throw new TypeError("Template: "+n[1]+" has to be a Node, String or array of Nodes");i+=s.map(function(e,t){if(e&&e.isNode)return e.toTex(r);throw new TypeError("Template: "+n[1]+"["+t+"] is not a Node.")}).join(",")}break;default:throw new TypeError("Template: "+n[1]+" has to be a Node, String or array of Nodes")}else{if(!s[n[2]]||!s[n[2]].isNode)throw new TypeError("Template: "+n[1]+"["+n[2]+"] is not a Node.");i+=s[n[2]].toTex(r)}}return i+=e.slice(o)}var c=n(r(272)),f=n(r(287));s.prototype=new c,s.prototype.type="FunctionNode",s.prototype.isFunctionNode=!0,s.prototype._compile=function(e,t){var r,n=this.fn._compile(e,t),i=this.args.map(function(r){return r._compile(e,t)});if(this.fn.isSymbolNode){var a=this.fn.name,o=e.math[a],s="function"==typeof o&&1==o.rawArgs;return s?(r=this._getUniqueArgumentsName(e),e[r]=this.args,n+"("+r+", math, scope)"):n+"("+i.join(", ")+")"}if(this.fn.isAccessorNode&&this.fn.index.isObjectProperty()){r=this._getUniqueArgumentsName(e),e[r]=this.args;var u=this.fn.object._compile(e,t),c=this.fn.index.getObjectProperty();return"(function () {var object = "+u+';return (object["'+c+'"] && object["'+c+'"].rawArgs)  ? object["'+c+'"]('+r+', math, scope) : object["'+c+'"]('+i.join(", ")+")})()"}return r=this._getUniqueArgumentsName(e),e[r]=this.args,"(function () {var fn = "+n+";return (fn && fn.rawArgs)  ? fn("+r+", math, scope) : fn("+i.join(", ")+")})()"},s.prototype._getUniqueArgumentsName=function(e){var t,r=0;do t="args"+r,r++;while(t in e);return t},s.prototype.forEach=function(e){for(var t=0;t<this.args.length;t++)e(this.args[t],"args["+t+"]",this)},s.prototype.map=function(e){for(var t=this.fn.map(e),r=[],n=0;n<this.args.length;n++)r[n]=this._ifNode(e(this.args[n],"args["+n+"]",this));return new s(t,r)},s.prototype.clone=function(){return new s(this.fn,this.args.slice(0))};var l=s.prototype.toString;s.prototype.toString=function(e){var t,r=this.fn.toString(e);return e&&"object"==typeof e.handler&&e.handler.hasOwnProperty(r)&&(t=e.handler[r](this,e)),"undefined"!=typeof t?t:l.call(this,e)},s.prototype._toString=function(e){var t=this.args.map(function(t){return t.toString(e)});return this.fn.toString(e)+"("+t.join(", ")+")"};var p=s.prototype.toTex;return s.prototype.toTex=function(e){var t;return e&&"object"==typeof e.handler&&e.handler.hasOwnProperty(this.name)&&(t=e.handler[this.name](this,e)),"undefined"!=typeof t?t:p.call(this,e)},s.prototype._toTex=function(e){var t,r=this.args.map(function(t){return t.toTex(e)});!o[this.name]||"function"!=typeof o[this.name].toTex&&"object"!=typeof o[this.name].toTex&&"string"!=typeof o[this.name].toTex||(t=o[this.name].toTex);var n;switch(typeof t){case"function":n=t(this,e);break;case"string":n=u(t,this,e);break;case"object":switch(typeof t[r.length]){case"function":n=t[r.length](this,e);break;case"string":n=u(t[r.length],this,e)}}return"undefined"!=typeof n?n:u(i.defaultTemplate,this,e)},s.prototype.getIdentifier=function(){return this.type+":"+this.name},s}var i=r(32);t.name="FunctionNode",t.path="expression.node",t.math=!0,t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(!e||!e.isNode)throw new TypeError('Node expected for parameter "content"');this.content=e}var o=n(r(272));return a.prototype=new o,a.prototype.type="ParenthesisNode",a.prototype.isParenthesisNode=!0,a.prototype._compile=function(e,t){return this.content._compile(e,t)},a.prototype.getContent=function(){return this.content.getContent()},a.prototype.forEach=function(e){e(this.content,"content",this)},a.prototype.map=function(e){var t=e(this.content,"content",this);return new a(t)},a.prototype.clone=function(){return new a(this.content)},a.prototype._toString=function(e){return!e||e&&!e.parenthesis||e&&"keep"===e.parenthesis?"("+this.content.toString(e)+")":this.content.toString(e)},a.prototype._toTex=function(e){return!e||e&&!e.parenthesis||e&&"keep"===e.parenthesis?"\\left("+this.content.toTex(e)+"\\right)":this.content.toTex(e)},a}t.name="ParenthesisNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(270));return a("compile",{string:function(e){var t={};return o(e).compile().eval(t)},"string, Object":function(e,t){return o(e).compile().eval(t)},"Array | Matrix":function(e){var t={};return i(e,function(e){return o(e).compile().eval(t)})},"Array | Matrix, Object":function(e,t){return i(e,function(e){return o(e).compile().eval(t)})}})}var i=r(19);t.name="eval",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i,a){var o=n(r(96));return i("help",{any:function(t){var r,n=t;if("string"!=typeof t)for(r in a)if(a.hasOwnProperty(r)&&t===a[r]){n=r;break}var i=o[n];if(!i)throw new Error('No documentation found on "'+n+'"');return new e.Help(i)}})}t.math=!0,t.name="help",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(270));return i("parse",{"string | Array | Matrix":a,"string | Array | Matrix, Object":a})}t.name="parse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i,a){var o=n(r(296));return i("parser",{"":function(){return new o(a)}})}t.name="parser",t.factory=n,t.math=!0},function(e,t,r){"use strict";function n(e,t,n,a,o){function s(){if(!(this instanceof s))throw new SyntaxError("Constructor must be called with the new operator");this.scope={}}var u=n(r(270));return s.prototype.type="Parser",s.prototype.isParser=!0,s.prototype.parse=function(e){throw new Error("Parser.parse is deprecated. Use math.parse instead.")},s.prototype.compile=function(e){throw new Error("Parser.compile is deprecated. Use math.compile instead.")},s.prototype.eval=function(e){return u(e).compile().eval(this.scope)},s.prototype.get=function(e){return this.scope[e]},s.prototype.getAll=function(){return i({},this.scope)},s.prototype.set=function(e,t){return this.scope[e]=t},s.prototype.remove=function(e){delete this.scope[e]},s.prototype.clear=function(){for(var e in this.scope)this.scope.hasOwnProperty(e)&&delete this.scope[e]},s}var i=r(3).extend;t.name="Parser",t.path="expression",t.factory=n,t.math=!0},function(e,t,r){e.exports=[r(271),r(277),r(278),r(281),r(282),r(283),r(285),r(284),r(290),r(272),r(288),r(289),r(291),r(286),r(287),r(298)]},function(e,t){"use strict";function r(e,t,r,n){function i(){throw new Error("UpdateNode is deprecated. Use AssignmentNode instead.")}return i}t.name="UpdateNode",t.path="expression.node",t.factory=r},function(e,t,r){e.exports=[r(300),r(302),r(304),r(306),r(307),r(309),r(315),r(320),r(322),r(324)]},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(301));return a("concat",{"...any":function(e){var t=e.length-1,r=e[t];"number"==typeof r?e[t]=r-1:r&&r.isBigNumber===!0&&(e[t]=r.minus(1));try{return o.apply(null,e)}catch(n){throw i(n)}}})}var i=r(275).transform;t.name="concat",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,f){var l=n(r(52)),p=f("concat",{"...Array | Matrix | number | BigNumber":function(e){var t,r,n=e.length,f=-1,p=!1,h=[];for(t=0;n>t;t++){var m=e[t];if(m&&m.isMatrix===!0&&(p=!0),"number"==typeof m||m&&m.isBigNumber===!0){if(t!==n-1)throw new Error("Dimension must be specified as last argument");if(r=f,f=m.valueOf(),!o(f))throw new TypeError("Integer number expected for dimension");if(0>f||t>0&&f>r)throw new u(f,r+1)}else{var d=a(m).valueOf(),g=s.size(d);if(h[t]=d,r=f,f=g.length-1,t>0&&f!=r)throw new c(r+1,f+1)}}if(0==h.length)throw new SyntaxError("At least one matrix expected");for(var v=h.shift();h.length;)v=i(v,h.shift(),f,0);return p?l(v):v},"...string":function(e){return e.join("")}});return p.toTex=void 0,p}function i(e,t,r,n){if(r>n){if(e.length!=t.length)throw new c(e.length,t.length);for(var a=[],o=0;o<e.length;o++)a[o]=i(e[o],t[o],r,n+1);return a}return e.concat(t)}var a=r(3).clone,o=r(6).isInteger,s=r(40),u=r(43),c=r(42);t.name="concat",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t,r){var n,i;if(e[0]&&(n=e[0].compile().eval(r)),e[1])if(e[1]&&e[1].isSymbolNode)i=e[1].compile().eval(r);else{var a=r||{},s=e[1].filter(function(e){return e&&e.isSymbolNode&&!(e.name in t)&&!(e.name in a)})[0],u=Object.create(a),c=e[1].compile();if(!s)throw new Error("No undefined variable found in filter equation");var f=s.name;i=function(e){return u[f]=e,c.eval(u)}}return o(n,i)}var o=n(r(303));n(r(287));return a.rawArgs=!0,a}t.name="filter",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=o("filter",{"Array, function":i,"Array, RegExp":a,"Matrix, function":function(e,t){return s(i(e.toArray(),t))},"Matrix, RegExp":function(e,t){return s(a(e.toArray(),t))}});return u.toTex=void 0,u}function i(e,t){if(1!==o(e).length)throw new Error("Only one dimensional matrices supported");return e.filter(function(e){return t(e)})}function a(e,t){if(1!==o(e).length)throw new Error("Only one dimensional matrices supported");return e.filter(function(e){return t.test(e)})}var o=r(40).size;t.name="filter",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){n(r(305));return i("forEach",{"Array | Matrix, function":function(e,t){var r=function(n,i){Array.isArray(n)?n.forEach(function(e,t){r(e,i.concat(t+1))}):t(n,i,e)};r(e.valueOf(),[])}})}t.name="forEach",t.path="expression.transform",t.factory=n},function(e,t){"use strict";function r(e,t,r,i){var a=i("forEach",{"Array, function":n,"Matrix, function":function(e,t){return e.forEach(t)}});return a.toTex=void 0,a}function n(e,t){var r=function(n,i){Array.isArray(n)?n.forEach(function(e,t){r(e,i.concat(t))}):t(n,i,e)};r(e,[])}t.name="forEach",t.factory=r},function(e,t,r){"use strict";function n(e,t,n){n(r(68));return function(){for(var t=[],r=0,n=arguments.length;n>r;r++){var i=arguments[r];if(i&&i.isRange===!0)i.start--,i.end-=i.step>0?0:2;else if(i&&i.isSet===!0)i=i.map(function(e){return e-1});else if(i&&(i.isArray===!0||i.isMatrix))i=i.map(function(e){return e-1});else if("number"==typeof i)i--;else if(i&&i.isBigNumber===!0)i=i.toNumber()-1;else if("string"!=typeof i)throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");t[r]=i}var a=new e.Index;return e.Index.apply(a,t),a}}Array.isArray;t.name="index",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=(n(r(308)),n(r(52)));return a("max",{"Array, function":function(e,t){return i(e,t,e)},"Matrix, function":function(e,t){return o(i(e.valueOf(),t,e))}})}function i(e,t,r){function n(e,i){return Array.isArray(e)?e.map(function(e,t){return n(e,i.concat(t+1))}):t(e,i,r)}return n(e,[])}t.name="map",t.path="expression.transform",t.factory=n},function(e,t){"use strict";function r(e,t,r,i){var a=i("map",{"Array, function":n,"Matrix, function":function(e,t){return e.map(t)}});return a.toTex=void 0,a}function n(e,t){var r=function(n,i){return Array.isArray(n)?n.map(function(e,t){return r(e,i.concat(t))}):t(n,i,e)};return r(e,[])}t.name="map",t.factory=r},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(311));return o("max",{"...any":function(e){if(2==e.length&&a(e[0])){var t=e[1];"number"==typeof t?e[1]=t-1:t&&t.isBigNumber===!0&&(e[1]=t.minus(1))}try{return s.apply(null,e)}catch(r){throw i(r)}}})}var i=r(275).transform,a=r(310);t.name="max",t.path="expression.transform",t.factory=n},function(e,t){"use strict";
e.exports=function(e){return Array.isArray(e)||e&&e.isMatrix===!0}},function(e,t,r){"use strict";function n(e,t,n,s){function u(e,t){return f(e,t)?e:t}function c(e){var t=void 0;if(i(e,function(e){(void 0===t||f(e,t))&&(t=e)}),void 0===t)throw new Error("Cannot calculate max of an empty array");return t}var f=n(r(64)),l=s("max",{"Array | Matrix":c,"Array | Matrix, number | BigNumber":function(e,t){return a(e,t.valueOf(),u)},"...":function(e){if(o(e))throw new TypeError("Scalar values expected in function max");return c(e)}});return l.toTex="\\max\\left(${args}\\right)",l}var i=r(312),a=r(313),o=r(314);t.name="max",t.factory=n},function(e,t){"use strict";e.exports=function r(e,t){e&&e.isMatrix===!0&&(e=e.valueOf());for(var n=0,i=e.length;i>n;n++){var a=e[n];Array.isArray(a)?r(a,t):t(a)}}},function(e,t,r){"use strict";function n(e,t,r){var a,o,s,u;if(0>=t){if(Array.isArray(e[0])){for(u=i(e),o=[],a=0;a<u.length;a++)o[a]=n(u[a],t-1,r);return o}for(s=e[0],a=1;a<e.length;a++)s=r(s,e[a]);return s}for(o=[],a=0;a<e.length;a++)o[a]=n(e[a],t-1,r);return o}function i(e){var t,r,n=e.length,i=e[0].length,a=[];for(r=0;i>r;r++){var o=[];for(t=0;n>t;t++)o.push(e[t][r]);a.push(o)}return a}var a=r(40).size,o=r(43);e.exports=function(e,t,r){var i=Array.isArray(e)?a(e):e.size();if(0>t||t>=i.length)throw new o(t,i.length);return e&&e.isMatrix===!0?e.create(n(e.valueOf(),t,r)):n(e,t,r)}},function(e,t,r){"use strict";var n=r(310);e.exports=function(e){for(var t=0;t<e.length;t++)if(n(e[t]))return!0;return!1}},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(316));return o("mean",{"...any":function(e){if(2==e.length&&a(e[0])){var t=e[1];"number"==typeof t?e[1]=t-1:t&&t.isBigNumber===!0&&(e[1]=t.minus(1))}try{return s.apply(null,e)}catch(r){throw i(r)}}})}var i=r(275).transform,a=r(310);t.name="mean",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,u){function c(e,t){var r=o(e,t,l),n=Array.isArray(e)?i(e):e.size();return p(r,n[t])}function f(e){var t=0,r=0;if(a(e,function(e){t=l(t,e),r++}),0===r)throw new Error("Cannot calculate mean of an empty array");return p(t,r)}var l=n(r(51)),p=n(r(317)),h=u("mean",{"Array | Matrix":f,"Array | Matrix, number | BigNumber":c,"...":function(e){if(s(e))throw new TypeError("Scalar values expected in function mean");return f(e)}});return h.toTex=void 0,h}var i=r(40).size,a=r(312),o=r(313),s=r(314);t.name="mean",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(81)),s=n(r(84)),u=n(r(318)),c=n(r(52)),f=n(r(85)),l=n(r(58)),p=a("divide",i({"Array | Matrix, Array | Matrix":function(e,t){return s(e,u(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,o,!1);break;case"dense":r=l(e,t,o,!1)}return r},"Array, any":function(e,t){return l(c(e),t,o,!1).valueOf()},"any, Array | Matrix":function(e,t){return s(e,u(t))}},o.signatures));return p.toTex={2:"\\frac{${args[0]}}{${args[1]}}"},p}var i=r(3).extend;t.name="divide",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t,r){var n,i,a,o,s;if(1==t){if(o=e[0][0],0==o)throw Error("Cannot calculate inverse, determinant is zero");return[[u(1,o)]]}if(2==t){var m=p(e);if(0==m)throw Error("Cannot calculate inverse, determinant is zero");return[[u(e[1][1],m),u(l(e[0][1]),m)],[u(l(e[1][0]),m),u(e[0][0],m)]]}var d=e.concat();for(n=0;t>n;n++)d[n]=d[n].concat();for(var g=h(t).valueOf(),v=0;r>v;v++){for(n=v;t>n&&0==d[n][v];)n++;if(n==t||0==d[n][v])throw Error("Cannot calculate inverse, determinant is zero");n!=v&&(s=d[v],d[v]=d[n],d[n]=s,s=g[v],g[v]=g[n],g[n]=s);var y=d[v],x=g[v];for(n=0;t>n;n++){var b=d[n],w=g[n];if(n!=v){if(0!=b[v]){for(a=u(l(b[v]),y[v]),i=v;r>i;i++)b[i]=c(b[i],f(a,y[i]));for(i=0;r>i;i++)w[i]=c(w[i],f(a,x[i]))}}else{for(a=y[v],i=v;r>i;i++)b[i]=u(b[i],a);for(i=0;r>i;i++)w[i]=u(w[i],a)}}}return g}var s=n(r(52)),u=n(r(81)),c=n(r(53)),f=n(r(84)),l=n(r(78)),p=n(r(319)),h=n(r(83)),m=a("inv",{"Array | Matrix":function(e){var t=e.isMatrix===!0?e.size():i.array.size(e);switch(t.length){case 1:if(1==t[0])return e.isMatrix===!0?s([u(1,e.valueOf()[0])]):[u(1,e[0])];throw new RangeError("Matrix must be square (size: "+i.string.format(t)+")");case 2:var r=t[0],n=t[1];if(r==n)return e.isMatrix===!0?s(o(e.valueOf(),r,n),e.storage()):o(e,r,n);throw new RangeError("Matrix must be square (size: "+i.string.format(t)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+i.string.format(t)+")")}},any:function(e){return u(1,e)}});return m.toTex={1:"\\left(${args[0]}\\right)^{-1}"},m}var i=r(39);t.name="inv",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function s(e,t,r){if(1==t)return a.clone(e[0][0]);if(2==t)return f(l(e[0][0],e[1][1]),l(e[1][0],e[0][1]));for(var n=function(e){var t,r,n=new Array(e.length),i=0;for(t=1;t<e.length;t++)i=c(i,e[t][t]);for(t=0;t<e.length;t++){for(n[t]=new Array(e.length),n[t][t]=p(i),r=0;t>r;r++)n[t][r]=0;for(r=t+1;r<e.length;r++)n[t][r]=e[t][r];t+1<e.length&&(i=f(i,e[t+1][t+1]))}return n},i=e,o=0;t-1>o;o++)i=l(n(i),e);return t%2==0?p(i[0][0]):i[0][0]}var u=n(r(52)),c=n(r(51)),f=n(r(77)),l=n(r(84)),p=n(r(78)),h=i("det",{any:function(e){return a.clone(e)},"Array | Matrix":function(e){var t;switch(e&&e.isMatrix===!0?t=e.size():Array.isArray(e)?(e=u(e),t=e.size()):t=[],t.length){case 0:return a.clone(e);case 1:if(1==t[0])return a.clone(e.valueOf()[0]);throw new RangeError("Matrix must be square (size: "+o.format(t)+")");case 2:var r=t[0],n=t[1];if(r==n)return s(e.clone().valueOf(),r,n);throw new RangeError("Matrix must be square (size: "+o.format(t)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+o.format(t)+")")}}});return h.toTex={1:"\\det\\left(${args[0]}\\right)"},h}var i=r(39),a=i.object,o=i.string;t.name="det",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(321));return o("min",{"...any":function(e){if(2==e.length&&a(e[0])){var t=e[1];"number"==typeof t?e[1]=t-1:t&&t.isBigNumber===!0&&(e[1]=t.minus(1))}try{return s.apply(null,e)}catch(r){throw i(r)}}})}var i=r(275).transform,a=r(310);t.name="min",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,s){function u(e,t){return f(e,t)?e:t}function c(e){var t=void 0;if(i(e,function(e){(void 0===t||f(e,t))&&(t=e)}),void 0===t)throw new Error("Cannot calculate min of an empty array");return t}var f=n(r(60)),l=s("min",{"Array | Matrix":c,"Array | Matrix, number | BigNumber":function(e,t){return a(e,t.valueOf(),u)},"...":function(e){if(o(e))throw new TypeError("Scalar values expected in function min");return c(e)}});return l.toTex="\\min\\left(${args}\\right)",l}var i=r(312),a=r(313),o=r(314);t.name="min",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(323));return i("range",{"...any":function(e){var t=e.length-1,r=e[t];return"boolean"!=typeof r&&e.push(!0),a.apply(null,e)}})}t.name="range",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e){return"Array"===t.matrix?e:p(e)}function o(r,n){var i=l(r);if(!i)throw new SyntaxError('String "'+r+'" is no valid range');var o;return"BigNumber"===t.number?(o=n?f:c,a(o(new e.BigNumber(i.start),new e.BigNumber(i.end),new e.BigNumber(i.step)))):(o=n?u:s,a(o(i.start,i.end,i.step)))}function s(e,t,r){var n=[],i=e;if(r>0)for(;t>i;)n.push(i),i+=r;else if(0>r)for(;i>t;)n.push(i),i+=r;return n}function u(e,t,r){var n=[],i=e;if(r>0)for(;t>=i;)n.push(i),i+=r;else if(0>r)for(;i>=t;)n.push(i),i+=r;return n}function c(e,t,r){var n=[],i=e;if(r.gt(h))for(;i.lt(t);)n.push(i),i=i.plus(r);else if(r.lt(h))for(;i.gt(t);)n.push(i),i=i.plus(r);return n}function f(e,t,r){var n=[],i=e;if(r.gt(h))for(;i.lte(t);)n.push(i),i=i.plus(r);else if(r.lt(h))for(;i.gte(t);)n.push(i),i=i.plus(r);return n}function l(e){var t=e.split(":"),r=t.map(function(e){return Number(e)}),n=r.some(function(e){return isNaN(e)});if(n)return null;switch(r.length){case 2:return{start:r[0],end:r[1],step:1};case 3:return{start:r[0],end:r[2],step:r[1]};default:return null}}var p=n(r(52)),h=new e.BigNumber(0),m=new e.BigNumber(1),d=i("range",{string:o,"string, boolean":o,"number, number":function(e,t){return a(s(e,t,1))},"number, number, number":function(e,t,r){return a(s(e,t,r))},"number, number, boolean":function(e,t,r){return a(r?u(e,t,1):s(e,t,1))},"number, number, number, boolean":function(e,t,r,n){return a(n?u(e,t,r):s(e,t,r))},"BigNumber, BigNumber":function(e,t){return a(c(e,t,m))},"BigNumber, BigNumber, BigNumber":function(e,t,r){return a(c(e,t,r))},"BigNumber, BigNumber, boolean":function(e,t,r){return a(r?f(e,t,m):c(e,t,m))},"BigNumber, BigNumber, BigNumber, boolean":function(e,t,r,n){return a(n?f(e,t,r):c(e,t,r))}});return d.toTex=void 0,d}t.name="range",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(276));return a("subset",{"...any":function(e){try{return o.apply(null,e)}catch(t){throw i(t)}}})}var i=r(275).transform;t.name="subset",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(e){if(!(this instanceof s))throw new SyntaxError("Constructor must be called with the new operator");if(!e)throw new Error('Argument "doc" missing');this.doc=e}var u=n(r(295))();return s.prototype.type="Help",s.prototype.isHelp=!0,s.prototype.toString=function(){var e=this.doc||{},t="\n";if(e.name&&(t+="Name: "+e.name+"\n\n"),e.category&&(t+="Category: "+e.category+"\n\n"),e.description&&(t+="Description:\n    "+e.description+"\n\n"),e.syntax&&(t+="Syntax:\n    "+e.syntax.join("\n    ")+"\n\n"),e.examples){t+="Examples:\n";for(var r=0;r<e.examples.length;r++){var n=e.examples[r];t+="    "+n+"\n";var i;try{i=u.eval(n)}catch(o){i=o}i&&!i.isHelp&&(t+="        "+a.format(i,{precision:14})+"\n")}t+="\n"}return e.seealso&&(t+="See also: "+e.seealso.join(", ")+"\n"),t},s.prototype.toJSON=function(){var e=i.clone(this.doc);return e.mathjs="Help",e},s.fromJSON=function(e){var t={};for(var r in e)"mathjs"!==r&&(t[r]=e[r]);return new s(t)},s.prototype.valueOf=s.prototype.toString,s}var i=r(3),a=r(23);t.name="Help",t.path="type",t.factory=n},function(e,t,r){e.exports=[r(327),r(354),r(386),r(402),r(411),r(416),r(419),r(425),r(437),r(446),r(450),r(457),r(459),r(485),r(487)]},function(e,t,r){e.exports=[r(328),r(329),r(349),r(351),r(353)]},function(e,t,r){"use strict";function n(e,t,n,i){var o=n(r(52)),s=n(r(86)),u=n(r(53)),c=n(r(81)),f=n(r(80)),l=n(r(77)),p=n(r(64)),h=n(r(48)),m=n(r(78)),d=e.SparseMatrix,g=e.DenseMatrix,v=e.Spa,y=i("lup",{DenseMatrix:function(e){return x(e)},SparseMatrix:function(e){return b(e)},Array:function(e){var t=o(e),r=x(t);return{L:r.L.valueOf(),U:r.U.valueOf(),p:r.p}}}),x=function(e){var t,r,n,i=e._size[0],o=e._size[1],m=Math.min(i,o),d=a.clone(e._data),v=[],y=[i,m],x=[],b=[m,o],w=[];for(t=0;i>t;t++)w[t]=t;for(r=0;o>r;r++){if(r>0)for(t=0;i>t;t++){var N=Math.min(t,r),E=0;for(n=0;N>n;n++)E=u(E,f(d[t][n],d[n][r]));d[t][r]=l(d[t][r],E)}var M=r,A=0,_=0;for(t=r;i>t;t++){var O=d[t][r],T=s(O);p(T,A)&&(M=t,A=T,_=O)}if(r!==M&&(w[r]=[w[M],w[M]=w[r]][0],g._swapRows(r,M,d)),i>r)for(t=r+1;i>t;t++){var C=d[t][r];h(C,0)||(d[t][r]=c(d[t][r],_))}}for(r=0;o>r;r++)for(t=0;i>t;t++)0===r&&(o>t&&(x[t]=[]),v[t]=[]),r>t?(o>t&&(x[t][r]=d[t][r]),i>r&&(v[t][r]=0)):t!==r?(o>t&&(x[t][r]=0),i>r&&(v[t][r]=d[t][r])):(o>t&&(x[t][r]=d[t][r]),i>r&&(v[t][r]=1));var S=new g({data:v,size:y}),z=new g({data:x,size:b}),B=[];for(t=0,m=w.length;m>t;t++)B[w[t]]=t;return{L:S,U:z,p:B,toString:function(){return"L: "+this.L.toString()+"\nU: "+this.U.toString()+"\nP: "+this.p}}},b=function(e){var t,r,n,i=e._size[0],a=e._size[1],o=Math.min(i,a),u=e._values,l=e._index,g=e._ptr,y=[],x=[],b=[],w=[i,o],N=[],E=[],M=[],A=[o,a],_=[],O=[];for(t=0;i>t;t++)_[t]=t,O[t]=t;var T=function(e,t){var r=O[e],n=O[t];_[r]=t,_[n]=e,O[e]=n,O[t]=r};for(r=0;a>r;r++){var C=new v;i>r&&(b.push(y.length),y.push(1),x.push(r)),M.push(N.length);var S=g[r],z=g[r+1];for(n=S;z>n;n++)t=l[n],C.set(_[t],u[n]);r>0&&C.forEach(0,r-1,function(e,t){d._forEachRow(e,y,x,b,function(r,n){r>e&&C.accumulate(r,m(f(n,t)))})});var B=r,k=C.get(r),I=s(k);C.forEach(r+1,i-1,function(e,t){var r=s(t);p(r,I)&&(B=e,I=r,k=t)}),r!==B&&(d._swapRows(r,B,w[1],y,x,b),d._swapRows(r,B,A[1],N,E,M),C.swap(r,B),T(r,B)),C.forEach(0,i-1,function(e,t){r>=e?(N.push(t),E.push(e)):(t=c(t,k),h(t,0)||(y.push(t),x.push(e)))})}return M.push(N.length),b.push(y.length),{L:new d({values:y,index:x,ptr:b,size:w}),U:new d({values:N,index:E,ptr:M,size:A}),p:_,toString:function(){return"L: "+this.L.toString()+"\nU: "+this.U.toString()+"\nP: "+this.p}}};return y}var i=r(39),a=i.object;t.name="lup",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(330)),s=n(r(341)),u=i("slu",{"SparseMatrix, number, number":function(e,t,r){if(!o(t)||0>t||t>3)throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");if(0>r||r>1)throw new Error("Partial pivoting threshold must be a number from 0 to 1");var n=a(t,e,!1),i=s(e,n,r);return{L:i.L,U:i.U,p:i.pinv,q:n.q,toString:function(){return"L: "+this.L.toString()+"\nU: "+this.U.toString()+"\np: "+this.p.toString()+(this.q?"\nq: "+this.q.toString():"")+"\n"}}}});return u}var i=r(39),a=i.number,o=a.isInteger;t.name="slu",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(331)),a=n(r(336)),o=n(r(337)),s=n(r(338)),u=n(r(339)),c=function(e,t,r){var n,c=t._ptr,l=t._size,p=l[1],h={};if(h.q=i(e,t),e&&!h.q)return null;if(r){var m=e?a(t,null,h.q,0):t;h.parent=o(m,1);var d=s(h.parent,p);if(h.cp=u(m,h.parent,d,1),m&&h.parent&&h.cp&&f(m,h))for(h.unz=0,n=0;p>n;n++)h.unz+=h.cp[n]}else h.unz=4*c[p]+p,h.lnz=h.unz;return h},f=function(e,t){var r=e._ptr,n=e._index,i=e._size,a=i[0],o=i[1];t.pinv=[],t.leftmost=[];var s,u,c,f,l,p=t.parent,h=t.pinv,m=t.leftmost,d=[],g=0,v=a,y=a+o,x=a+2*o;for(u=0;o>u;u++)d[v+u]=-1,d[y+u]=-1,d[x+u]=0;for(s=0;a>s;s++)m[s]=-1;for(u=o-1;u>=0;u--)for(f=r[u],l=r[u+1],c=f;l>c;c++)m[n[c]]=u;for(s=a-1;s>=0;s--)h[s]=-1,u=m[s],-1!=u&&(0===d[x+u]++&&(d[y+u]=s),d[g+s]=d[v+u],d[v+u]=s);for(t.lnz=0,t.m2=a,u=0;o>u;u++)if(s=d[v+u],t.lnz++,0>s&&(s=t.m2++),h[s]=u,!(--x[u]<=0)){t.lnz+=d[x+u];var b=p[u];-1!=b&&(0===d[x+b]&&(d[y+b]=d[y+u]),d[g+d[y+u]]=d[v+b],d[v+b]=d[g+s],d[x+b]+=d[x+u])}for(s=0;a>s;s++)h[s]<0&&(h[s]=u++);return!0};return c}t.name="cs_sqr",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(332)),a=n(r(333)),o=n(r(334)),s=n(r(51)),u=n(r(84)),c=n(r(335)),f=function(e,t){if(!t||0>=e||e>3)return null;var r=t._size,n=r[0],s=r[1],u=0,c=Math.max(16,10*Math.sqrt(s));c=Math.min(s-2,c);var f=l(e,t,n,s,c);a(f,d,null);for(var g,v,y,x,b,w,N,E,M,A,_,O,T,C,S,z,B=f._index,k=f._ptr,I=k[s],R=[],P=[],U=0,q=s+1,L=2*(s+1),j=3*(s+1),F=4*(s+1),D=5*(s+1),$=6*(s+1),G=7*(s+1),H=R,V=p(s,k,P,U,j,H,L,G,q,$,F,D),Z=h(s,k,P,D,F,$,c,q,j,H,L),W=0;s>Z;){for(y=-1;s>W&&-1==(y=P[j+W]);W++);-1!=P[L+y]&&(H[P[L+y]]=-1),P[j+W]=P[L+y];var Y=P[F+y],X=P[q+y];Z+=X;var J=0;P[q+y]=-X;var Q=k[y],K=0===Y?Q:I,ee=K;for(x=1;Y+1>=x;x++){for(x>Y?(w=y,N=Q,E=P[U+y]-Y):(w=B[Q++],N=k[w],E=P[U+w]),b=1;E>=b;b++)g=B[N++],(M=P[q+g])<=0||(J+=M,P[q+g]=-M,B[ee++]=g,-1!=P[L+g]&&(H[P[L+g]]=H[g]),-1!=H[g]?P[L+H[g]]=P[L+g]:P[j+P[D+g]]=P[L+g]);w!=y&&(k[w]=i(y),P[$+w]=0)}for(0!==Y&&(I=ee),P[D+y]=J,k[y]=K,P[U+y]=ee-K,P[F+y]=-2,V=m(V,u,P,$,s),A=K;ee>A;A++)if(g=B[A],!((_=P[F+g])<=0)){M=-P[q+g];var te=V-M;for(Q=k[g],O=k[g]+_-1;O>=Q;Q++)w=B[Q],P[$+w]>=V?P[$+w]-=M:0!==P[$+w]&&(P[$+w]=P[D+w]+te)}for(A=K;ee>A;A++){for(g=B[A],O=k[g],T=O+P[F+g]-1,C=O,S=0,z=0,Q=O;T>=Q;Q++)if(w=B[Q],0!==P[$+w]){var re=P[$+w]-V;re>0?(z+=re,B[C++]=w,S+=w):(k[w]=i(y),P[$+w]=0)}P[F+g]=C-O+1;var ne=C,ie=O+P[U+g];for(Q=T+1;ie>Q;Q++){v=B[Q];var ae=P[q+v];0>=ae||(z+=ae,B[C++]=v,S+=v)}0===z?(k[g]=i(y),M=-P[q+g],J-=M,X+=M,Z+=M,P[q+g]=0,P[F+g]=-1):(P[D+g]=Math.min(P[D+g],z),B[C]=B[ne],B[ne]=B[O],B[O]=y,P[U+g]=C-O+1,S=(0>S?-S:S)%s,P[L+g]=P[G+S],P[G+S]=g,H[g]=S)}for(P[D+y]=J,u=Math.max(u,J),V=m(V+u,u,P,$,s),A=K;ee>A;A++)if(g=B[A],!(P[q+g]>=0))for(S=H[g],g=P[G+S],P[G+S]=-1;-1!=g&&-1!=P[L+g];g=P[L+g],V++){for(E=P[U+g],_=P[F+g],Q=k[g]+1;Q<=k[g]+E-1;Q++)P[$+B[Q]]=V;var oe=g;for(v=P[L+g];-1!=v;){var se=P[U+v]===E&&P[F+v]===_;for(Q=k[v]+1;se&&Q<=k[v]+E-1;Q++)P[$+B[Q]]!=V&&(se=0);se?(k[v]=i(g),P[q+g]+=P[q+v],P[q+v]=0,P[F+v]=-1,v=P[L+v],P[L+oe]=v):(oe=v,v=P[L+v])}}for(Q=K,A=K;ee>A;A++)g=B[A],(M=-P[q+g])<=0||(P[q+g]=M,z=P[D+g]+J-M,z=Math.min(z,s-Z-M),-1!=P[j+z]&&(H[P[j+z]]=g),P[L+g]=P[j+z],H[g]=-1,P[j+z]=g,W=Math.min(W,z),P[D+g]=z,B[Q++]=g);P[q+y]=X,0===(P[U+y]=Q-K)&&(k[y]=-1,P[$+y]=0),0!==Y&&(I=Q)}for(g=0;s>g;g++)k[g]=i(k[g]);for(v=0;s>=v;v++)P[j+v]=-1;for(v=s;v>=0;v--)P[q+v]>0||(P[L+v]=P[j+k[v]],P[j+k[v]]=v);for(w=s;w>=0;w--)P[q+w]<=0||-1!=k[w]&&(P[L+w]=P[j+k[w]],P[j+k[w]]=w);for(y=0,g=0;s>=g;g++)-1==k[g]&&(y=o(g,y,P,j,L,R,$));return R.splice(R.length-1,1),R},l=function(e,t,r,n,i){var a=c(t);if(1===e&&n===r)return s(t,a);if(2==e){for(var o=a._index,f=a._ptr,l=0,p=0;r>p;p++){var h=f[p];if(f[p]=l,!(f[p+1]-h>i))for(var m=f[p+1];m>h;h++)o[l++]=o[h]}return f[r]=l,t=c(a),u(a,t)}return u(a,t)},p=function(e,t,r,n,i,a,o,s,u,c,f,l){for(var p=0;e>p;p++)r[n+p]=t[p+1]-t[p];r[n+e]=0;for(var h=0;e>=h;h++)r[i+h]=-1,a[h]=-1,r[o+h]=-1,r[s+h]=-1,r[u+h]=1,r[c+h]=1,r[f+h]=0,r[l+h]=r[n+h];var d=m(0,0,r,c,e);return r[f+e]=-2,t[e]=-1,r[c+e]=0,d},h=function(e,t,r,n,a,o,s,u,c,f,l){for(var p=0,h=0;e>h;h++){var m=r[n+h];if(0===m)r[a+h]=-2,p++,t[h]=-1,r[o+h]=0;else if(m>s)r[u+h]=0,r[a+h]=-1,p++,t[h]=i(e),r[u+e]++;else{var d=r[c+m];-1!=d&&(f[d]=h),r[l+h]=r[c+m],r[c+m]=h}}return p},m=function(e,t,r,n,i){if(2>e||0>e+t){for(var a=0;i>a;a++)0!==r[n+a]&&(r[n+a]=1);e=2}return e},d=function(e,t){return e!=t};return f}t.name="cs_amd",t.path="sparse",t.factory=n},function(e,t){"use strict";function r(){var e=function(e){return-e-2};return e}t.name="cs_flip",t.path="sparse",t.factory=r},function(e,t){"use strict";function r(){var e=function(e,t,r){for(var n=e._values,i=e._index,a=e._ptr,o=e._size,s=o[1],u=0,c=0;s>c;c++){var f=a[c];for(a[c]=u;f<a[c+1];f++)t(i[f],c,n?n[f]:1,r)&&(i[u]=i[f],n&&(n[u]=n[f]),u++)}return a[s]=u,i.splice(u,i.length-u),n&&n.splice(u,n.length-u),u};return e}t.name="cs_fkeep",t.path="sparse",t.factory=r},function(e,t){"use strict";function r(){var e=function(e,t,r,n,i,a,o){var s=0;for(r[o]=e;s>=0;){var u=r[o+s],c=r[n+u];-1==c?(s--,a[t++]=u):(r[n+u]=r[i+c],++s,r[o+s]=c)}return t};return e}t.name="cs_tdfs",t.path="sparse",t.factory=r},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=e.DenseMatrix,f=e.SparseMatrix,l=o("transpose",{Array:function(e){return l(u(e)).valueOf()},Matrix:function(e){var t,r=e.size();switch(r.length){case 1:t=e.clone();break;case 2:var n=r[0],i=r[1];if(0===i)throw new RangeError("Cannot transpose a 2D matrix with no columns (size: "+a(r)+")");switch(e.storage()){case"dense":t=p(e,n,i);break;case"sparse":t=h(e,n,i)}break;default:throw new RangeError("Matrix must be a vector or two dimensional (size: "+a(this._size)+")")}return t},any:function(e){return i(e)}}),p=function(e,t,r){for(var n,a=e._data,o=[],s=0;r>s;s++){n=o[s]=[];for(var u=0;t>u;u++)n[u]=i(a[u][s])}return new c({data:o,size:[r,t],datatype:e._datatype})},h=function(e,t,r){for(var n=e._values,a=e._index,o=e._ptr,s=n?[]:void 0,u=[],c=[],l=[],p=0;t>p;p++)l[p]=0;var h,m,d;for(h=0,m=a.length;m>h;h++)l[a[h]]++;for(var g=0,v=0;t>v;v++)c.push(g),g+=l[v],l[v]=c[v];for(c.push(g),d=0;r>d;d++)for(var y=o[d],x=o[d+1],b=y;x>b;b++){var w=l[a[b]]++;u[w]=d,n&&(s[w]=i(n[b]))}return new f({values:s,index:u,ptr:c,size:[r,t],datatype:e._datatype})};return l.toTex={1:"\\left(${args[0]}\\right)"+s.operators.transpose},l}var i=r(3).clone,a=r(23).format;t.name="transpose",t.factory=n},function(e,t){"use strict";function r(e){var t=e.SparseMatrix,r=function(e,r,n,i){for(var a=e._values,o=e._index,s=e._ptr,u=e._size,c=e._datatype,f=u[0],l=u[1],p=i&&e._values?[]:null,h=[],m=[],d=0,g=0;l>g;g++){m[g]=d;for(var v=n?n[g]:g,y=s[v],x=s[v+1],b=y;x>b;b++){var w=r?r[o[b]]:o[b];h[d]=w,p&&(p[d]=a[b]),d++}}return m[l]=d,new t({values:p,index:h,ptr:m,size:[f,l],datatype:c})};return r}t.name="cs_permute",t.path="sparse",t.factory=r},function(e,t){"use strict";function r(){var e=function(e,t){if(!e)return null;var r,n,i=e._index,a=e._ptr,o=e._size,s=o[0],u=o[1],c=[],f=[],l=0,p=u;if(t)for(r=0;s>r;r++)f[p+r]=-1;for(var h=0;u>h;h++){c[h]=-1,f[l+h]=-1;for(var m=a[h],d=a[h+1],g=m;d>g;g++){var v=i[g];for(r=t?f[p+v]:v;-1!=r&&h>r;r=n)n=f[l+r],f[l+r]=h,-1==n&&(c[r]=h);t&&(f[p+v]=h)}}return c};return e}t.name="cs_etree",t.path="sparse",t.factory=r},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(334)),a=function(e,t){if(!e)return null;var r,n=0,a=[],o=[],s=0,u=t,c=2*t;for(r=0;t>r;r++)o[s+r]=-1;for(r=t-1;r>=0;r--)-1!=e[r]&&(o[u+r]=o[s+e[r]],o[s+e[r]]=r);for(r=0;t>r;r++)-1==e[r]&&(n=i(r,n,o,s,u,a,c));return a};return a}t.name="cs_post",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(335)),a=n(r(340)),o=function(e,t,r,n){if(!e||!t||!r)return null;var o,s,u,c,f,l,p,h=e._size,m=h[0],d=h[1],g=4*d+(n?d+m+1:0),v=[],y=0,x=d,b=2*d,w=3*d,N=4*d,E=5*d+1;for(u=0;g>u;u++)v[u]=-1;var M=[],A=i(e),_=A._index,O=A._ptr;for(u=0;d>u;u++)for(s=r[u],M[s]=-1==v[w+s]?1:0;-1!=s&&-1==v[w+s];s=t[s])v[w+s]=u;if(n){for(u=0;d>u;u++)v[r[u]]=u;for(o=0;m>o;o++){for(u=d,l=O[o],p=O[o+1],f=l;p>f;f++)u=Math.min(u,v[_[f]]);v[E+o]=v[N+u],v[N+u]=o}}for(o=0;d>o;o++)v[y+o]=o;for(u=0;d>u;u++){for(s=r[u],-1!=t[s]&&M[t[s]]--,c=n?v[N+u]:s;-1!=c;c=n?v[E+c]:-1)for(f=O[c];f<O[c+1];f++){o=_[f];var T=a(o,s,v,w,x,b,y);T.jleaf>=1&&M[s]++,2==T.jleaf&&M[T.q]--}-1!=t[s]&&(v[y+s]=t[s])}for(s=0;d>s;s++)-1!=t[s]&&(M[t[s]]+=M[s]);return M};return o}t.name="cs_counts",t.path="sparse",t.factory=n},function(e,t){"use strict";function r(){var e=function(e,t,r,n,i,a,o){var s,u,c,f,l=0;if(t>=e||r[n+t]<=r[i+e])return-1;if(r[i+e]=r[n+t],c=r[a+e],r[a+e]=t,-1===c)l=1,f=e;else{for(l=2,f=c;f!=r[o+f];f=r[o+f]);for(s=c;s!=f;s=u)u=r[o+s],r[o+s]=f}return{jleaf:l,q:f}};return e}t.name="cs_leaf",t.path="sparse",t.factory=r},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(86)),a=n(r(81)),o=n(r(84)),s=n(r(64)),u=n(r(342)),c=n(r(343)),f=e.SparseMatrix,l=function(e,t,r){if(!e)return null;var n,l=e._size,p=l[1],h=100,m=100;t&&(n=t.q,h=t.lnz||h,m=t.unz||m);var d,g,v=[],y=[],x=[],b=new f({values:v,index:y,ptr:x,size:[p,p]}),w=[],N=[],E=[],M=new f({values:w,index:N,ptr:E,size:[p,p]}),A=[],_=[],O=[];for(d=0;p>d;d++)_[d]=0,A[d]=-1,x[d+1]=0;h=0,m=0;for(var T=0;p>T;T++){x[T]=h,E[T]=m;var C=n?n[T]:T,S=c(b,e,C,O,_,A,1),z=-1,B=-1;for(g=S;p>g;g++)if(d=O[g],A[d]<0){var k=i(_[d]);s(k,B)&&(B=k,z=d)}else N[m]=A[d],w[m++]=_[d];if(-1==z||0>=B)return null;A[C]<0&&u(i(_[C]),o(B,r))&&(z=C);var I=_[z];for(N[m]=T,w[m++]=I,A[z]=T,y[h]=z,v[h++]=1,g=S;p>g;g++)d=O[g],A[d]<0&&(y[h]=d,v[h++]=a(_[d],I)),_[d]=0}for(x[p]=h,E[p]=m,g=0;h>g;g++)y[g]=A[y[g]];return v.splice(h,v.length-h),y.splice(h,y.length-h),w.splice(m,w.length-m),N.splice(m,N.length-m),{L:b,U:M,pinv:A}};return l}t.name="cs_lu",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(61)),c=n(r(62)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=r(32),m=o("largerEq",{"boolean, boolean":function(e,t){return e>=t},"number, number":function(e,r){return e>=r||i(e,r,t.epsilon)},"BigNumber, BigNumber":function(e,r){return e.gte(r)||a(e,r,t.epsilon)},"Fraction, Fraction":function(e,t){return-1!==e.compare(t)},"Complex, Complex":function(){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return m(e.value,t.value)},"string, string":function(e,t){return e>=t},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,m);break;default:r=u(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,m,!1);break;default:r=l(e,t,m)}}return r},"Array, Array":function(e,t){return m(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return m(s(e),t)},"Matrix, Array":function(e,t){return m(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=p(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,m,!0);break;default:r=p(t,e,m,!0)}return r},"Array, any":function(e,t){return p(s(e),t,m,!1).valueOf()},"any, Array":function(e,t){return p(s(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+h.operators.largerEq+"${args[1]}\\right)"},m}var i=r(6).nearlyEqual,a=r(49);t.name="largerEq",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(81)),a=n(r(84)),o=n(r(77)),s=n(r(344)),u=function(e,t,r,n,u,c,f){var l,p,h,m,d=e._values,g=e._index,v=e._ptr,y=e._size,x=y[1],b=t._values,w=t._index,N=t._ptr,E=s(e,t,r,n,c);for(l=E;x>l;l++)u[n[l]]=0;for(p=N[r],h=N[r+1],l=p;h>l;l++)u[w[l]]=b[l];for(var M=E;x>M;M++){var A=n[M],_=c?c[A]:A;if(!(0>_))for(p=v[_],h=v[_+1],u[A]=i(u[A],d[f?p:h-1]),l=f?p+1:p,m=f?h:h-1;m>l;l++){var O=g[l];u[O]=o(u[O],a(d[l],u[A]))}}return E};return u}t.name="cs_spsolve",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(345)),a=n(r(346)),o=n(r(347)),s=function(e,t,r,n,s){var u,c,f,l=e._ptr,p=e._size,h=t._index,m=t._ptr,d=p[1],g=d;for(c=m[r],f=m[r+1],u=c;f>u;u++){var v=h[u];a(l,v)||(g=i(v,e,g,n,s))}for(u=g;d>u;u++)o(l,n[u]);return g};return s}t.name="cs_reach",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(346)),a=n(r(347)),o=n(r(348)),s=function(e,t,r,n,s){var u,c,f,l=t._index,p=t._ptr,h=t._size,m=h[1],d=0;for(n[0]=e;d>=0;){e=n[d];var g=s?s[e]:e;i(p,e)||(a(p,e),n[m+d]=0>g?0:o(p[g]));var v=1;for(c=n[m+d],f=0>g?0:o(p[g+1]);f>c;c++)if(u=l[c],!i(p,u)){n[m+d]=c,n[++d]=u,v=0;break}v&&(d--,n[--r]=e)}return r};return s}t.name="cs_dfs",t.path="sparse",t.factory=n},function(e,t){"use strict";function r(){var e=function(e,t){return e[t]<0};return e}t.name="cs_marked",t.path="sparse",t.factory=r},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(332)),a=function(e,t){e[t]=i(e[t])};return a}t.name="cs_mark",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(332)),a=function(e){return 0>e?i(e):e};return a}t.name="cs_unflip",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(81)),s=n(r(80)),u=n(r(77)),c=n(r(48)),f=n(r(350)),l=e.DenseMatrix,p=i("lsolve",{"SparseMatrix, Array | Matrix":function(e,t){return m(e,t)},"DenseMatrix, Array | Matrix":function(e,t){return h(e,t)},"Array, Array | Matrix":function(e,t){var r=a(e),n=h(r,t);return n.valueOf()}}),h=function(e,t){t=f(e,t,!0);for(var r=t._data,n=e._size[0],i=e._size[1],a=[],p=e._data,h=0;i>h;h++){var m,d=r[h][0]||0;if(c(d,0))m=0;else{var g=p[h][h];if(c(g,0))throw new Error("Linear system cannot be solved since matrix is singular");m=o(d,g);for(var v=h+1;n>v;v++)r[v]=[u(r[v][0]||0,s(m,p[v][h]))]}a[h]=[m]}return new l({data:a,size:[n,1]})},m=function(e,t){t=f(e,t,!0);for(var r,n,i=t._data,a=e._size[0],p=e._size[1],h=e._values,m=e._index,d=e._ptr,g=[],v=0;p>v;v++){var y=i[v][0]||0;if(c(y,0))g[v]=[0];else{var x=0,b=[],w=[],N=d[v+1];for(n=d[v];N>n;n++)r=m[n],r===v?x=h[n]:r>v&&(b.push(h[n]),w.push(r));if(c(x,0))throw new Error("Linear system cannot be solved since matrix is singular");var E=o(y,x);for(n=0,N=w.length;N>n;n++)r=w[n],i[r]=[u(i[r][0]||0,s(E,b[n]))];g[v]=[E]}}return new l({data:g,size:[a,1]})};return p}t.name="lsolve",t.factory=n},function(e,t,r){"use strict";function n(e){var t=e.DenseMatrix,r=function(e,r,n){var i=e.size();if(2!==i.length)throw new RangeError("Matrix must be two dimensional (size: "+a.format(i)+")");var u=i[0],c=i[1];if(u!==c)throw new RangeError("Matrix must be square (size: "+a.format(i)+")");var f,l,p;if(r&&r.isMatrix===!0){var h=r.size();if(1===h.length){if(h[0]!==u)throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for(f=[],p=r._data,l=0;u>l;l++)f[l]=[p[l]];return new t({data:f,size:[u,1],datatype:r._datatype})}if(2===h.length){if(h[0]!==u||1!==h[1])throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");if(r.isDenseMatrix===!0){if(n){for(f=[],p=r._data,l=0;u>l;l++)f[l]=[p[l][0]];return new t({data:f,size:[u,1],datatype:r._datatype})}return r}for(f=[],l=0;u>l;l++)f[l]=[0];for(var m=r._values,d=r._index,g=r._ptr,v=g[1],y=g[0];v>y;y++)l=d[y],f[l][0]=m[y];return new t({data:f,size:[u,1],datatype:r._datatype})}throw new RangeError("Dimension mismatch. Matrix columns must match vector length.")}if(s(r)){var x=o.size(r);if(1===x.length){if(x[0]!==u)throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for(f=[],l=0;u>l;l++)f[l]=[r[l]];return new t({data:f,size:[u,1]})}if(2===x.length){if(x[0]!==u||1!==x[1])throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for(f=[],l=0;u>l;l++)f[l]=[r[l][0]];return new t({data:f,size:[u,1]})}throw new RangeError("Dimension mismatch. Matrix columns must match vector length.")}};return r}var i=r(39),a=i.string,o=i.array,s=Array.isArray;t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(52)),s=n(r(328)),u=n(r(329)),c=n(r(352)),f=n(r(350)),l=n(r(353)),p=n(r(349)),h=a("lusolve",{"Array, Array | Matrix":function(e,t){e=o(e);var r=s(e),n=d(r.L,r.U,r.p,null,t);return n.valueOf()},"DenseMatrix, Array | Matrix":function(e,t){var r=s(e);return d(r.L,r.U,r.p,null,t)},"SparseMatrix, Array | Matrix":function(e,t){var r=s(e);return d(r.L,r.U,r.p,null,t)},"SparseMatrix, Array | Matrix, number, number":function(e,t,r,n){var i=u(e,r,n);return d(i.L,i.U,i.p,i.q,t)},"Object, Array | Matrix":function(e,t){return d(e.L,e.U,e.p,e.q,t)}}),m=function(e){if(e&&e.isMatrix===!0)return e;if(i(e))return o(e);throw new TypeError("Invalid Matrix LU decomposition")},d=function(e,t,r,n,i){e=m(e),t=m(t),i=f(e,i,!1),r&&(i._data=c(r,i._data));var a=p(e,i),o=l(t,a);return n&&(o._data=c(n,o._data)),o};return h}var i=Array.isArray;t.name="lusolve",t.factory=n},function(e,t){"use strict";function r(){var e=function(e,t,r){var n,r=t.length,i=[];if(e)for(n=0;r>n;n++)i[e[n]]=t[n];else for(n=0;r>n;n++)i[n]=t[n];return i};return e}t.name="cs_ipvec",t.path="sparse",t.factory=r},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(81)),s=n(r(80)),u=n(r(77)),c=n(r(48)),f=n(r(350)),l=e.DenseMatrix,p=i("usolve",{"SparseMatrix, Array | Matrix":function(e,t){return m(e,t)},"DenseMatrix, Array | Matrix":function(e,t){return h(e,t)},"Array, Array | Matrix":function(e,t){var r=a(e),n=h(r,t);return n.valueOf()}}),h=function(e,t){t=f(e,t,!0);for(var r=t._data,n=e._size[0],i=e._size[1],a=[],p=e._data,h=i-1;h>=0;h--){var m,d=r[h][0]||0;if(c(d,0))m=0;else{var g=p[h][h];if(c(g,0))throw new Error("Linear system cannot be solved since matrix is singular");m=o(d,g);for(var v=h-1;v>=0;v--)r[v]=[u(r[v][0]||0,s(m,p[v][h]))]}a[h]=[m]}return new l({data:a,size:[n,1]})},m=function(e,t){t=f(e,t,!0);for(var r,n,i=t._data,a=e._size[0],p=e._size[1],h=e._values,m=e._index,d=e._ptr,g=[],v=p-1;v>=0;v--){var y=i[v][0]||0;if(c(y,0))g[v]=[0];else{var x=0,b=[],w=[],N=d[v],E=d[v+1];for(n=E-1;n>=N;n--)r=m[n],r===v?x=h[n]:v>r&&(b.push(h[n]),w.push(r));if(c(x,0))throw new Error("Linear system cannot be solved since matrix is singular");var M=o(y,x);for(n=0,E=w.length;E>n;n++)r=w[n],i[r]=[u(i[r][0],s(M,b[n]))];g[v]=[M]}}return new l({data:g,size:[a,1]})};return p}t.name="usolve",t.factory=n},function(e,t,r){e.exports=[r(86),r(51),r(53),r(355),r(357),r(358),r(317),r(359),r(361),r(363),r(364),r(365),r(366),r(367),r(368),r(371),r(374),r(375),r(376),r(84),r(377),r(379),r(82),r(380),r(382),r(369),r(383),r(77),r(78),r(384),r(385)]},function(e,t,r){"use strict";function n(e,t,n,o){function s(r,n){var i=r.arg()/3,o=r.abs(),s=new e.Complex(a(o),0).mul(new e.Complex(0,i).exp());if(n){var u=[s,new e.Complex(a(o),0).mul(new e.Complex(0,i+2*Math.PI/3).exp()),new e.Complex(a(o),0).mul(new e.Complex(0,i-2*Math.PI/3).exp())];return"Array"===t.matrix?u:l(u)}return s}function u(t){if(t.value&&t.value.isComplex){var r=t.clone();return r.value=1,
r=r.pow(1/3),r.value=s(t.value),r}var n=f(t.value);n&&(t.value=c(t.value));var i;i=t.value&&t.value.isBigNumber?new e.BigNumber(1).div(3):t.value&&t.value.isFraction?new e.Fraction(1,3):1/3;var r=t.pow(i);return n&&(r.value=c(r.value)),r}var c=n(r(78)),f=n(r(356)),l=n(r(52)),p=o("cbrt",{number:a,Complex:s,"Complex, boolean":s,BigNumber:function(e){return e.cbrt()},Unit:u,"Array | Matrix":function(e){return i(e,p,!0)}});return p.toTex={1:"\\sqrt[3]{${args[0]}}"},p}var i=r(19),a=Math.cbrt||function(e){if(0===e)return e;var t,r=0>e;return r&&(e=-e),isFinite(e)?(t=Math.exp(Math.log(e)/3),t=(e/(t*t)+2*t)/3):t=e,r?-t:t};t.name="cbrt",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("isNegative",{number:function(e){return 0>e},BigNumber:function(e){return e.isNeg()&&!e.isZero()&&!e.isNaN()},Fraction:function(e){return e.s<0},Unit:function(e){return a(e.value)},"Array | Matrix":function(e){return i(e,a)}});return a}var i=r(19);r(6);t.name="isNegative",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("ceil",{number:Math.ceil,Complex:function(e){return e.ceil()},BigNumber:function(e){return e.ceil()},Fraction:function(e){return e.ceil()},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\left\\lceil${args[0]}\\right\\rceil"},a}var i=r(19);t.name="ceil",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("cube",{number:function(e){return e*e*e},Complex:function(e){return e.mul(e).mul(e)},BigNumber:function(e){return e.times(e).times(e)},Fraction:function(e){return e.pow(3)},"Array | Matrix":function(e){return i(e,a,!0)},Unit:function(e){return e.pow(3)}});return a.toTex={1:"\\left(${args[0]}\\right)^3"},a}var i=r(19);t.name="cube",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(81)),s=r(32),u=n(r(360)),c=n(r(61)),f=n(r(62)),l=n(r(85)),p=n(r(63)),h=n(r(57)),m=n(r(58)),d=i("dotDivide",{"any, any":o,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,o,!1);break;default:r=u(t,e,o,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,o,!1);break;default:r=h(e,t,o)}}return r},"Array, Array":function(e,t){return d(a(e),a(t)).valueOf()},"Array, Matrix":function(e,t){return d(a(e),t)},"Matrix, Array":function(e,t){return d(e,a(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=l(e,t,o,!1);break;default:r=m(e,t,o,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=p(t,e,o,!0);break;default:r=m(t,e,o,!0)}return r},"Array, any":function(e,t){return m(a(e),t,o,!1).valueOf()},"any, Array":function(e,t){return m(a(t),e,o,!0).valueOf()}});return d.toTex={2:"\\left(${args[0]}"+s.operators.dotDivide+"${args[1]}\\right)"},d}t.name="dotDivide",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(48)),s=e.SparseMatrix,u=function(e,t,r,n){var u=e._data,c=e._size,f=e._datatype,l=t._values,p=t._index,h=t._ptr,m=t._size,d=t._datatype;if(c.length!==m.length)throw new i(c.length,m.length);if(c[0]!==m[0]||c[1]!==m[1])throw new RangeError("Dimension mismatch. Matrix A ("+c+") must match Matrix B ("+m+")");if(!l)throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var g,v=c[0],y=c[1],x=o,b=0,w=r;"string"==typeof f&&f===d&&(g=f,x=a.find(o,[g,g]),b=a.convert(0,g),w=a.find(r,[g,g]));for(var N=[],E=[],M=[],A=0;y>A;A++){M[A]=E.length;for(var _=h[A],O=h[A+1],T=_;O>T;T++){var C=p[T],S=n?w(l[T],u[C][A]):w(u[C][A],l[T]);x(S,b)||(E.push(C),N.push(S))}}return M[y]=E.length,new s({values:N,index:E,ptr:M,size:[v,y],datatype:g})};return u}var i=r(42);t.name="algorithm02",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(80)),s=r(32),u=n(r(360)),c=n(r(362)),f=n(r(85)),l=n(r(57)),p=n(r(58)),h=i("dotMultiply",{"any, any":o,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,o,!1);break;default:r=u(t,e,o,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,o,!1);break;default:r=l(e,t,o)}}return r},"Array, Array":function(e,t){return h(a(e),a(t)).valueOf()},"Array, Matrix":function(e,t){return h(a(e),t)},"Matrix, Array":function(e,t){return h(e,a(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,o,!1);break;default:r=p(e,t,o,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,o,!0);break;default:r=p(t,e,o,!0)}return r},"Array, any":function(e,t){return p(a(e),t,o,!1).valueOf()},"any, Array":function(e,t){return p(a(t),e,o,!0).valueOf()}});return h.toTex={2:"\\left(${args[0]}"+s.operators.dotMultiply+"${args[1]}\\right)"},h}t.name="dotMultiply",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(48)),s=e.SparseMatrix,u=function(e,t,r){var n=e._values,u=e._index,c=e._ptr,f=e._size,l=e._datatype,p=t._values,h=t._index,m=t._ptr,d=t._size,g=t._datatype;if(f.length!==d.length)throw new i(f.length,d.length);if(f[0]!==d[0]||f[1]!==d[1])throw new RangeError("Dimension mismatch. Matrix A ("+f+") must match Matrix B ("+d+")");var v,y=f[0],x=f[1],b=o,w=0,N=r;"string"==typeof l&&l===g&&(v=l,b=a.find(o,[v,v]),w=a.convert(0,v),N=a.find(r,[v,v]));var E,M,A,_,O,T=n&&p?[]:void 0,C=[],S=[],z=new s({values:T,index:C,ptr:S,size:[y,x],datatype:v}),B=T?[]:void 0,k=[];for(M=0;x>M;M++){S[M]=C.length;var I=M+1;if(B)for(_=m[M],O=m[M+1],A=_;O>A;A++)E=h[A],k[E]=I,B[E]=p[A];for(_=c[M],O=c[M+1],A=_;O>A;A++)if(E=u[A],B){var R=k[E]===I?B[E]:w,P=N(n[A],R);b(P,w)||(C.push(E),T.push(P))}else C.push(E)}return S[x]=C.length,z};return u}var i=r(42);t.name="algorithm09",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(82)),s=r(32),u=n(r(61)),c=n(r(62)),f=n(r(85)),l=n(r(63)),p=n(r(57)),h=n(r(58)),m=i("dotPow",{"any, any":o,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,o,!1);break;default:r=u(t,e,o,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,o,!1);break;default:r=p(e,t,o)}}return r},"Array, Array":function(e,t){return m(a(e),a(t)).valueOf()},"Array, Matrix":function(e,t){return m(a(e),t)},"Matrix, Array":function(e,t){return m(e,a(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=h(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=l(t,e,m,!0);break;default:r=h(t,e,m,!0)}return r},"Array, any":function(e,t){return h(a(e),t,m,!1).valueOf()},"any, Array":function(e,t){return h(a(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+s.operators.dotPow+"${args[1]}\\right)"},m}t.name="dotPow",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("exp",{number:Math.exp,Complex:function(e){return e.exp()},BigNumber:function(e){return e.exp()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\exp\\left(${args[0]}\\right)"},a}var i=r(19);t.name="exp",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("fix",{number:function(e){return e>0?Math.floor(e):Math.ceil(e)},Complex:function(t){return new e.Complex(t.re>0?Math.floor(t.re):Math.ceil(t.re),t.im>0?Math.floor(t.im):Math.ceil(t.im))},BigNumber:function(e){return e.isNegative()?e.ceil():e.floor()},Fraction:function(e){return e.s<0?e.ceil():e.floor()},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\mathrm{${name}}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="fix",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("floor",{number:Math.floor,Complex:function(e){return e.floor()},BigNumber:function(e){return e.floor()},Fraction:function(e){return e.floor()},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\left\\lfloor${args[0]}\\right\\rfloor"},a}var i=r(19);t.name="floor",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(t,r){if(!t.isInt()||!r.isInt())throw new Error("Parameters in function gcd must be integer numbers");for(var n=new e.BigNumber(0);!r.isZero();){var i=t.mod(r);t=r,r=i}return t.lt(n)?t.neg():t}var s=n(r(52)),u=n(r(54)),c=n(r(55)),f=n(r(56)),l=n(r(57)),p=n(r(58)),h=a("gcd",{"number, number":i,"BigNumber, BigNumber":o,"Fraction, Fraction":function(e,t){return e.gcd(t)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,h);break;default:r=u(t,e,h,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,h,!1);break;default:r=l(e,t,h)}}return r},"Array, Array":function(e,t){return h(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return h(s(e),t)},"Matrix, Array":function(e,t){return h(e,s(t))},"Matrix, number | BigNumber":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,h,!1);break;default:r=p(e,t,h,!1)}return r},"number | BigNumber, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,h,!0);break;default:r=p(t,e,h,!0)}return r},"Array, number | BigNumber":function(e,t){return p(s(e),t,h,!1).valueOf()},"number | BigNumber, Array":function(e,t){return p(s(t),e,h,!0).valueOf()},"Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber":function(e,t,r){for(var n=h(e,t),i=0;i<r.length;i++)n=h(n,r[i]);return n}});return h.toTex="\\gcd\\left(${args}\\right)",h}function i(e,t){if(!a(e)||!a(t))throw new Error("Parameters in function gcd must be integer numbers");for(var r;0!=t;)r=e%t,e=t,t=r;return 0>e?-e:e}var a=r(6).isInteger;t.name="gcd",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e){for(var t=0,r=0,n=0;n<e.length;n++){var i=s(e[n]);p(r,i)?(t=f(t,f(c(r,i),c(r,i))),t=u(t,1),r=i):t=u(t,h(i)?f(c(i,r),c(i,r)):i)}return f(r,l(t))}var s=n(r(86)),u=n(r(53)),c=n(r(81)),f=n(r(80)),l=n(r(369)),p=n(r(60)),h=n(r(370)),m=a("hypot",{"... number | BigNumber":o,Array:function(e){return m.apply(m,i(e))},Matrix:function(e){return m.apply(m,i(e.toArray()))}});return m.toTex="\\hypot\\left(${args}\\right)",m}var i=r(40).flatten;t.name="hypot",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){function a(r){return r>=0||t.predictable?Math.sqrt(r):new e.Complex(r,0).sqrt()}var o=n("sqrt",{number:a,Complex:function(e){return e.sqrt()},BigNumber:function(e){return!e.isNegative()||t.predictable?e.sqrt():a(e.toNumber())},"Array | Matrix":function(e){return i(e,o,!0)},Unit:function(e){return e.pow(.5)}});return o.toTex={1:"\\sqrt{${args[0]}}"},o}var i=r(19);t.name="sqrt",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("isPositive",{number:function(e){return e>0},BigNumber:function(e){return!e.isNeg()&&!e.isZero()&&!e.isNaN()},Fraction:function(e){return e.s>0&&e.n>0},Unit:function(e){return a(e.value)},"Array | Matrix":function(e){return i(e,a)}});return a}var i=r(19);r(6);t.name="isPositive",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(t,r){if(!t.isInt()||!r.isInt())throw new Error("Parameters in function lcm must be integer numbers");if(t.isZero()||r.isZero())return new e.BigNumber(0);for(var n=t.times(r);!r.isZero();){var i=r;r=t.mod(i),t=i}return n.div(t).abs()}var s=n(r(52)),u=n(r(360)),c=n(r(372)),f=n(r(85)),l=n(r(57)),p=n(r(58)),h=a("lcm",{"number, number":i,"BigNumber, BigNumber":o,"Fraction, Fraction":function(e,t){return e.lcm(t)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,h);break;default:r=u(t,e,h,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,h,!1);break;default:r=l(e,t,h)}}return r},"Array, Array":function(e,t){return h(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return h(s(e),t)},"Matrix, Array":function(e,t){return h(e,s(t))},"Matrix, number | BigNumber":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,h,!1);break;default:r=p(e,t,h,!1)}return r},"number | BigNumber, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,h,!0);break;default:r=p(t,e,h,!0)}return r},"Array, number | BigNumber":function(e,t){return p(s(e),t,h,!1).valueOf()},"number | BigNumber, Array":function(e,t){return p(s(t),e,h,!0).valueOf()},"Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber":function(e,t,r){for(var n=h(e,t),i=0;i<r.length;i++)n=h(n,r[i]);return n}});return h.toTex=void 0,h}function i(e,t){if(!a(e)||!a(t))throw new Error("Parameters in function lcm must be integer numbers");if(0==e||0==t)return 0;for(var r,n=e*t;0!=t;)r=t,t=e%r,e=r;return Math.abs(n/e)}var a=r(6).isInteger;t.name="lcm",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(48)),u=e.SparseMatrix,c=function(e,t,r){var n=e._values,c=e._size,f=e._datatype,l=t._values,p=t._size,h=t._datatype;if(c.length!==p.length)throw new a(c.length,p.length);if(c[0]!==p[0]||c[1]!==p[1])throw new RangeError("Dimension mismatch. Matrix A ("+c+") must match Matrix B ("+p+")");var m,d=c[0],g=c[1],v=s,y=0,x=r;"string"==typeof f&&f===h&&(m=f,v=o.find(s,[m,m]),y=o.convert(0,m),x=o.find(r,[m,m]));for(var b=n&&l?[]:void 0,w=[],N=[],E=new u({values:b,index:w,ptr:N,size:[d,g],datatype:m}),M=b?[]:void 0,A=[],_=[],O=0;g>O;O++){N[O]=w.length;var T=O+1;if(i(e,O,A,M,_,T,E,x),i(t,O,A,M,_,T,E,x),M)for(var C=N[O];C<w.length;){var S=w[C];if(_[S]===T){var z=M[S];v(z,y)?w.splice(C,1):(b.push(z),C++)}else w.splice(C,1)}else for(var B=N[O];B<w.length;){var k=w[B];_[k]!==T?w.splice(B,1):B++}}return N[g]=w.length,E};return c}var i=r(373),a=r(42);t.name="algorithm06",t.factory=n},function(e,t){"use strict";e.exports=function(e,t,r,n,i,a,o,s,u,c,f){var l,p,h,m,d=e._values,g=e._index,v=e._ptr,y=o._index;if(n)for(p=v[t],h=v[t+1],l=p;h>l;l++)m=g[l],r[m]!==a?(r[m]=a,y.push(m),c?(n[m]=u?s(d[l],f):s(f,d[l]),i[m]=a):n[m]=d[l]):(n[m]=u?s(d[l],n[m]):s(n[m],d[l]),i[m]=a);else for(p=v[t],h=v[t+1],l=p;h>l;l++)m=g[l],r[m]!==a?(r[m]=a,y.push(m)):i[m]=a}},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(81)),s=a("log",{number:function(r){return r>=0||t.predictable?Math.log(r):new e.Complex(r,0).log()},Complex:function(e){return e.log()},BigNumber:function(r){return!r.isNegative()||t.predictable?r.ln():new e.Complex(r.toNumber(),0).log()},"Array | Matrix":function(e){return i(e,s)},"any, any":function(e,t){return o(s(e),s(t))}});return s.toTex={1:"\\ln\\left(${args[0]}\\right)",2:"\\log_{${args[1]}}\\left(${args[0]}\\right)"},s}var i=r(19);t.name="log",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("log10",{number:function(r){return r>=0||t.predictable?a(r):new e.Complex(r,0).log().div(Math.LN10)},Complex:function(t){return new e.Complex(t).log().div(Math.LN10)},BigNumber:function(r){return!r.isNegative()||t.predictable?r.log():new e.Complex(r.toNumber(),0).log().div(Math.LN10)},"Array | Matrix":function(e){return i(e,o)}});return o.toTex={1:"\\log_{10}\\left(${args[0]}\\right)"},o}var i=r(19),a=Math.log10||function(e){return Math.log(e)/Math.LN10};t.name="log10",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){if(t>0)return e-t*Math.floor(e/t);if(0===t)return e;throw new Error("Cannot calculate mod for a negative divisor")}var o=n(r(52)),s=r(32),u=n(r(360)),c=n(r(61)),f=n(r(79)),l=n(r(85)),p=n(r(63)),h=n(r(57)),m=n(r(58)),d=i("mod",{"number, number":a,"BigNumber, BigNumber":function(e,t){return t.isZero()?e:e.mod(t)},"Fraction, Fraction":function(e,t){return e.mod(t)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,d,!1);break;default:r=u(t,e,d,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,d,!1);break;default:r=h(e,t,d)}}return r},"Array, Array":function(e,t){return d(o(e),o(t)).valueOf()},"Array, Matrix":function(e,t){return d(o(e),t)},"Matrix, Array":function(e,t){return d(e,o(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=l(e,t,d,!1);break;default:r=m(e,t,d,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=p(t,e,d,!0);break;default:r=m(t,e,d,!0)}return r},"Array, any":function(e,t){return m(o(e),t,d,!1).valueOf()},"any, Array":function(e,t){return m(o(t),e,d,!0).valueOf()}});return d.toTex={2:"\\left(${args[0]}"+s.operators.mod+"${args[1]}\\right)"},d}t.name="mod",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){var r=e.size();if(1==r.length){if(t===Number.POSITIVE_INFINITY||"inf"===t){var n=0;return e.forEach(function(e){var t=o(e);p(t,n)&&(n=t)},!0),n}if(t===Number.NEGATIVE_INFINITY||"-inf"===t){var i;return e.forEach(function(e){var t=o(e);i&&!h(t,i)||(i=t)},!0),i||0}if("fro"===t)return a(e,2);if("number"==typeof t&&!isNaN(t)){if(!l(t,0)){var m=0;return e.forEach(function(e){m=s(u(o(e),t),m)},!0),u(m,1/t)}return Number.POSITIVE_INFINITY}throw new Error("Unsupported parameter value")}if(2==r.length){if(1===t){var v=[],y=0;return e.forEach(function(e,t){var r=t[1],n=s(v[r]||0,o(e));p(n,y)&&(y=n),v[r]=n},!0),y}if(t===Number.POSITIVE_INFINITY||"inf"===t){var x=[],b=0;return e.forEach(function(e,t){var r=t[0],n=s(x[r]||0,o(e));p(n,b)&&(b=n),x[r]=n},!0),b}if("fro"===t)return c(d(f(g(e),e)));if(2===t)throw new Error("Unsupported parameter value, missing implementation of matrix singular value decomposition");throw new Error("Unsupported parameter value")}}var o=n(r(86)),s=n(r(51)),u=n(r(82)),c=n(r(369)),f=n(r(84)),l=n(r(48)),p=n(r(64)),h=n(r(60)),m=n(r(52)),d=n(r(378)),g=n(r(335)),v=i("norm",{number:Math.abs,Complex:function(e){return e.abs()},BigNumber:function(e){return e.abs()},"boolean | null":function(e){return Math.abs(e)},Array:function(e){return a(m(e),2)},Matrix:function(e){return a(e,2)},"number | Complex | BigNumber | boolean | null, number | BigNumber | string":function(e){return v(e)},"Array, number | BigNumber | string":function(e,t){return a(m(e),t)},"Matrix, number | BigNumber | string":function(e,t){return a(e,t)}});return v.toTex={1:"\\left\\|${args[0]}\\right\\|",2:void 0},v}t.name="norm",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(51)),c=o("trace",{Array:function(e){return c(s(e))},Matrix:function(e){var t;switch(e.storage()){case"dense":t=f(e);break;case"sparse":t=l(e)}return t},any:i}),f=function(e){var t=e._size,r=e._data;switch(t.length){case 1:if(1==t[0])return i(r[0]);throw new RangeError("Matrix must be square (size: "+a(t)+")");case 2:var n=t[0],o=t[1];if(n===o){for(var s=0,c=0;n>c;c++)s=u(s,r[c][c]);return s}throw new RangeError("Matrix must be square (size: "+a(t)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+a(t)+")")}},l=function(e){var t=e._values,r=e._index,n=e._ptr,i=e._size,o=i[0],s=i[1];if(o===s){var c=0;if(t.length>0)for(var f=0;s>f;f++)for(var l=n[f],p=n[f+1],h=l;p>h;h++){var m=r[h];if(m===f){c=u(c,t[h]);break}if(m>f)break}return c}throw new RangeError("Matrix must be square (size: "+a(i)+")")};return c.toTex={1:"\\mathrm{tr}\\left(${args[0]}\\right)"},c}var i=r(3).clone,a=r(23).format;t.name="trace",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(t,r){var n=e.BigNumber.precision,i=e.BigNumber.clone({precision:n+2}),a=new e.BigNumber(0),o=new i(1),s=r.isNegative();if(s&&(r=r.neg()),r.isZero())throw new Error("Root must be non-zero");if(t.isNegative()&&!r.abs().mod(2).equals(1))throw new Error("Root must be odd when a is negative.");if(t.isZero())return s?new i(1/0):0;if(!t.isFinite())return s?a:t;var u=t.abs().pow(o.div(r));return u=t.isNeg()?u.neg():u,new e.BigNumber((s?o.div(u):u).toPrecision(n))}var u=n(r(52)),c=n(r(54)),f=n(r(360)),l=n(r(372)),p=n(r(85)),h=n(r(57)),m=n(r(58)),d=o("nthRoot",{number:function(e){return i(e,2)},"number, number":i,BigNumber:function(t){return s(t,new e.BigNumber(2))},Complex:function(e){return a(e,2)},"Complex, number":a,"BigNumber, BigNumber":s,"Array | Matrix":function(e){return d(e,2)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":if(1!==t.density())throw new Error("Root must be non-zero");r=l(e,t,d);break;default:r=f(t,e,d,!0)}break;default:switch(t.storage()){case"sparse":if(1!==t.density())throw new Error("Root must be non-zero");r=c(e,t,d,!1);break;default:r=h(e,t,d)}}return r},"Array, Array":function(e,t){return d(u(e),u(t)).valueOf()},"Array, Matrix":function(e,t){return d(u(e),t)},"Matrix, Array":function(e,t){return d(e,u(t))},"Matrix, number | BigNumber":function(e,t){var r;switch(e.storage()){case"sparse":r=p(e,t,d,!1);break;default:r=m(e,t,d,!1)}return r},"number | BigNumber, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":if(1!==t.density())throw new Error("Root must be non-zero");r=p(t,e,d,!0);break;default:r=m(t,e,d,!0)}return r},"Array, number | BigNumber":function(e,t){return d(u(e),t).valueOf()},"number | BigNumber, Array":function(e,t){return d(e,u(t)).valueOf()}});return d.toTex={2:"\\sqrt[${args[1]}]{${args[0]}}"},d}function i(e,t){var r=0>t;if(r&&(t=-t),0===t)throw new Error("Root must be non-zero");if(0>e&&Math.abs(t)%2!=1)throw new Error("Root must be odd when a is negative.");if(0==e)return r?1/0:0;if(!isFinite(e))return r?0:e;var n=Math.pow(Math.abs(e),1/t);return n=0>e?-n:n,r?1/n:n}function a(e,t){if(0>t)throw new Error("Root must be greater than zero");if(0===t)throw new Error("Root must be non-zero");if(t%1!==0)throw new Error("Root must be an integer");for(var r=e.arg(),n=e.abs(),i=[],a=Math.pow(n,1/t),o=0;t>o;o++)i.push({r:a,phi:(r+2*Math.PI*o)/t});return i}t.name="nthRoot",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var c=n(r(52)),f=n(r(48)),l=n(r(381)),p=n(r(85)),h=n(r(63)),m=n(r(58)),d=o("round",{number:Math.round,"number, number":function(e,t){if(!a(t))throw new TypeError(u);if(0>t||t>15)throw new Error("Number of decimals in function round must be in te range of 0-15");return i(e,t)},Complex:function(e){return e.round()},"Complex, number":function(e,t){if(t%1)throw new TypeError(u);return e.round(t)},"Complex, BigNumber":function(e,t){if(!t.isInteger())throw new TypeError(u);var r=t.toNumber();return e.round(r)},"number, BigNumber":function(t,r){if(!r.isInteger())throw new TypeError(u);return new e.BigNumber(t).toDecimalPlaces(r.toNumber())},BigNumber:function(e){return e.toDecimalPlaces(0)},"BigNumber, BigNumber":function(e,t){if(!t.isInteger())throw new TypeError(u);return e.toDecimalPlaces(t.toNumber())},Fraction:function(e){return e.round()},"Fraction, number":function(e,t){if(t%1)throw new TypeError(u);return e.round(t)},"Array | Matrix":function(e){return s(e,d,!0)},"Matrix, number | BigNumber":function(e,t){var r;switch(e.storage()){case"sparse":r=p(e,t,d,!1);break;default:r=m(e,t,d,!1)}return r},"number | Complex | BigNumber, Matrix":function(e,t){if(!f(e,0)){var r;switch(t.storage()){case"sparse":r=h(t,e,d,!0);break;default:r=m(t,e,d,!0)}return r}return l(t.size(),t.storage())},"Array, number | BigNumber":function(e,t){return m(c(e),t,d,!1).valueOf()},"number | Complex | BigNumber, Array":function(e,t){return m(c(t),e,d,!0).valueOf()}});return d.toTex={1:"\\left\\lfloor${args[0]}\\right\\rceil",2:void 0},d}function i(e,t){return parseFloat(o(e,t))}var a=r(6).isInteger,o=r(6).toFixed,s=r(19),u="Number of decimals in function round must be an integer";t.name="round",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(t,r){var n=u(t),i=n?new e.BigNumber(0):0;if(c(t),r){var o=f(r);return t.length>0?o.resize(t,i):o}var s=[];return t.length>0?a(s,t,i):s}function u(e){var t=!1;return e.forEach(function(e,r,n){e&&e.isBigNumber===!0&&(t=!0,n[r]=e.toNumber())}),t}function c(e){e.forEach(function(e){if("number"!=typeof e||!i(e)||0>e)throw new Error("Parameters in function zeros must be positive integers")})}var f=n(r(52)),l=o("zeros",{"":function(){return"Array"===t.matrix?s([]):s([],"default")},"...number | BigNumber | string":function(e){var r=e[e.length-1];if("string"==typeof r){var n=e.pop();return s(e,n)}return"Array"===t.matrix?s(e):s(e,"default")},Array:s,Matrix:function(e){var t=e.storage();return s(e.valueOf(),t)},"Array | Matrix, string":function(e,t){return s(e.valueOf(),t)}});return l.toTex=void 0,l}var i=r(6).isInteger,a=r(40).resize;t.name="zeros",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("sign",{number:i.sign,Complex:function(e){return e.sign()},BigNumber:function(t){return new e.BigNumber(t.cmp(0))},Fraction:function(t){return new e.Fraction(t.s,1)},"Array | Matrix":function(e){return a(e,o,!0)},Unit:function(e){return o(e.value)}});return o.toTex={1:"\\mathrm{${name}}\\left(${args[0]}\\right)"},o}var i=r(6),a=r(19);t.name="sign",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("square",{number:function(e){return e*e},Complex:function(e){return e.mul(e)},BigNumber:function(e){return e.times(e)},Fraction:function(e){return e.mul(e)},"Array | Matrix":function(e){return i(e,a,!0)},Unit:function(e){return e.pow(2)}});return a.toTex={1:"\\left(${args[0]}\\right)^2"},a}var i=r(19);t.name="square",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=r(32),s=a("unaryPlus",{number:function(e){return e},Complex:function(e){return e},BigNumber:function(e){return e},Fraction:function(e){return e},Unit:function(e){return e.clone()},"Array | Matrix":function(e){return i(e,s,!0)},"boolean | string | null":function(r){return"BigNumber"==t.number?new e.BigNumber(+r):+r}});return s.toTex={1:o.operators.unaryPlus+"\\left(${args[0]}\\right)"},s}var i=r(19);t.name="unaryPlus",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,r){var n,a,o,s=0,c=1,f=1,l=0;if(!i(e)||!i(r))throw new Error("Parameters in function xgcd must be integer numbers");for(;r;)a=Math.floor(e/r),o=e%r,n=s,s=c-a*s,c=n,n=f,f=l-a*f,l=n,e=r,r=o;var p;return p=0>e?[-e,-c,-l]:[e,e?c:0,l],"Array"===t.matrix?p:u(p)}function s(r,n){var i,a,o,s=new e.BigNumber(0),c=new e.BigNumber(1),f=s,l=c,p=c,h=s;if(!r.isInt()||!n.isInt())throw new Error("Parameters in function xgcd must be integer numbers");for(;!n.isZero();)a=r.div(n).floor(),o=r.mod(n),i=f,f=l.minus(a.times(f)),l=i,i=p,p=h.minus(a.times(p)),h=i,r=n,n=o;var m;return m=r.lt(s)?[r.neg(),l.neg(),h.neg()]:[r,r.isZero()?0:l,h],"Array"===t.matrix?m:u(m)}var u=n(r(52)),c=a("xgcd",{"number, number":o,"BigNumber, BigNumber":s});return c.toTex=void 0,c}var i=r(6).isInteger;t.name="xgcd",t.factory=n},function(e,t,r){e.exports=[r(387),r(391),r(392),r(394),r(396),r(399),r(401)]},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=n(r(360)),f=n(r(372)),l=n(r(85)),p=n(r(57)),h=n(r(58)),m=o("bitAnd",{"number, number":function(e,t){if(!i(e)||!i(t))throw new Error("Integers expected in function bitAnd");return e&t},"BigNumber, BigNumber":a,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=c(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,m,!1);break;default:r=p(e,t,m)}}return r},"Array, Array":function(e,t){return m(u(e),u(t)).valueOf()},"Array, Matrix":function(e,t){return m(u(e),t)},"Matrix, Array":function(e,t){return m(e,u(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=l(e,t,m,!1);break;default:r=h(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=l(t,e,m,!0);break;default:r=h(t,e,m,!0)}return r},"Array, any":function(e,t){return h(u(e),t,m,!1).valueOf()},"any, Array":function(e,t){return h(u(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+s.operators.bitAnd+"${args[1]}\\right)"},m}var i=r(6).isInteger,a=r(388);t.name="bitAnd",t.factory=n},function(e,t,r){var n=r(389);e.exports=function(e,t){if(e.isFinite()&&!e.isInteger()||t.isFinite()&&!t.isInteger())throw new Error("Integers expected in function bitAnd");var r=e.constructor;if(e.isNaN()||t.isNaN())return new r(NaN);if(e.isZero()||t.eq(-1)||e.eq(t))return e;if(t.isZero()||e.eq(-1))return t;if(!e.isFinite()||!t.isFinite()){if(!e.isFinite()&&!t.isFinite())return e.isNegative()==t.isNegative()?e:new r(0);if(!e.isFinite())return t.isNegative()?e:e.isNegative()?new r(0):t;if(!t.isFinite())return e.isNegative()?t:t.isNegative()?new r(0):e}return n(e,t,function(e,t){return e&t})}},function(e,t,r){function n(e){for(var t=e.d,r=t[0]+"",n=1;n<t.length;++n){for(var i=t[n]+"",a=7-i.length;a--;)i="0"+i;r+=i}var o;for(o=r.length-1;"0"==r.charAt(o);--o);var s=e.e,u=r.slice(0,o+1||1),c=u.length;if(s>0)if(++s>c)for(s-=c;s--;u+="0");else c>s&&(u=u.slice(0,s)+"."+u.slice(s));for(var f=[0],n=0;n<u.length;){for(var l=f.length;l--;f[l]*=10);f[0]+=u.charAt(n++)<<0;for(var o=0;o<f.length;++o)f[o]>1&&(null==f[o+1]&&(f[o+1]=0),f[o+1]+=f[o]>>1,f[o]&=1)}return f.reverse()}var i=r(390);e.exports=function(e,t,r){var a,o,s=e.constructor,u=+(e.s<0),c=+(t.s<0);if(u){a=n(i(e));for(var f=0;f<a.length;++f)a[f]^=1}else a=n(e);if(c){o=n(i(t));for(var f=0;f<o.length;++f)o[f]^=1}else o=n(t);var l,p,h;a.length<=o.length?(l=a,p=o,h=u):(l=o,p=a,h=c);var m=l.length,d=p.length,g=1^r(u,c),v=new s(1^g),y=new s(1),x=new s(2),b=s.precision;for(s.config({precision:1e9});m>0;)r(l[--m],p[--d])==g&&(v=v.plus(y)),y=y.times(x);for(;d>0;)r(h,p[--d])==g&&(v=v.plus(y)),y=y.times(x);return s.config({precision:b}),0==g&&(v.s=-v.s),v}},function(e,t){e.exports=function(e){if(e.isFinite()&&!e.isInteger())throw new Error("Integer expected in function bitNot");var t=e.constructor,r=t.precision;t.config({precision:1e9});var e=e.plus(new t(1));return e.s=-e.s||null,t.config({precision:r}),e}},function(e,t,r){"use strict";function n(e,t,n,s){var u=r(32),c=s("bitNot",{number:function(e){if(!o(e))throw new Error("Integer expected in function bitNot");return~e},BigNumber:a,"Array | Matrix":function(e){return i(e,c)}});return c.toTex={1:u.operators.bitNot+"\\left(${args[0]}\\right)"},c}var i=r(19),a=r(390),o=r(6).isInteger;t.name="bitNot",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=n(r(54)),f=n(r(55)),l=n(r(56)),p=n(r(57)),h=n(r(58)),m=o("bitOr",{"number, number":function(e,t){if(!i(e)||!i(t))throw new Error("Integers expected in function bitOr");return e|t},"BigNumber, BigNumber":a,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,m);break;default:r=c(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,m,!1);break;default:r=p(e,t,m)}}return r},"Array, Array":function(e,t){return m(u(e),u(t)).valueOf()},"Array, Matrix":function(e,t){return m(u(e),t)},"Matrix, Array":function(e,t){return m(e,u(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=l(e,t,m,!1);break;default:r=h(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=l(t,e,m,!0);break;default:r=h(t,e,m,!0)}return r},"Array, any":function(e,t){return h(u(e),t,m,!1).valueOf()},"any, Array":function(e,t){return h(u(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+s.operators.bitOr+"${args[1]}\\right)"},m}var i=r(6).isInteger,a=r(393);t.name="bitOr",t.factory=n},function(e,t,r){var n=r(389);e.exports=function(e,t){if(e.isFinite()&&!e.isInteger()||t.isFinite()&&!t.isInteger())throw new Error("Integers expected in function bitOr");var r=e.constructor;if(e.isNaN()||t.isNaN())return new r(NaN);var i=new r(-1);return e.isZero()||t.eq(i)||e.eq(t)?t:t.isZero()||e.eq(i)?e:e.isFinite()&&t.isFinite()?n(e,t,function(e,t){return e|t}):!e.isFinite()&&!e.isNegative()&&t.isNegative()||e.isNegative()&&!t.isNegative()&&!t.isFinite()?i:e.isNegative()&&t.isNegative()?e.isFinite()?e:t:e.isFinite()?t:e}},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=n(r(61)),f=n(r(62)),l=n(r(63)),p=n(r(57)),h=n(r(58)),m=o("bitXor",{"number, number":function(e,t){if(!i(e)||!i(t))throw new Error("Integers expected in function bitXor");return e^t},"BigNumber, BigNumber":a,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,m);break;default:r=c(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,m,!1);break;default:r=p(e,t,m)}}return r},"Array, Array":function(e,t){
return m(u(e),u(t)).valueOf()},"Array, Matrix":function(e,t){return m(u(e),t)},"Matrix, Array":function(e,t){return m(e,u(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=l(e,t,m,!1);break;default:r=h(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=l(t,e,m,!0);break;default:r=h(t,e,m,!0)}return r},"Array, any":function(e,t){return h(u(e),t,m,!1).valueOf()},"any, Array":function(e,t){return h(u(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+s.operators.bitXor+"${args[1]}\\right)"},m}var i=r(6).isInteger,a=r(395);t.name="bitXor",t.factory=n},function(e,t,r){var n=r(389),i=r(390);e.exports=function(e,t){if(e.isFinite()&&!e.isInteger()||t.isFinite()&&!t.isInteger())throw new Error("Integers expected in function bitXor");var r=e.constructor;if(e.isNaN()||t.isNaN())return new r(NaN);if(e.isZero())return t;if(t.isZero())return e;if(e.eq(t))return new r(0);var a=new r(-1);return e.eq(a)?i(t):t.eq(a)?i(e):e.isFinite()&&t.isFinite()?n(e,t,function(e,t){return e^t}):e.isFinite()||t.isFinite()?new r(e.isNegative()==t.isNegative()?1/0:-(1/0)):a}},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=n(r(48)),f=n(r(381)),l=n(r(54)),p=n(r(360)),h=n(r(398)),m=n(r(56)),d=n(r(85)),g=n(r(57)),v=n(r(58)),y=o("leftShift",{"number, number":function(e,t){if(!i(e)||!i(t))throw new Error("Integers expected in function leftShift");return e<<t},"BigNumber, BigNumber":a,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=h(e,t,y,!1);break;default:r=p(t,e,y,!0)}break;default:switch(t.storage()){case"sparse":r=l(e,t,y,!1);break;default:r=g(e,t,y)}}return r},"Array, Array":function(e,t){return y(u(e),u(t)).valueOf()},"Array, Matrix":function(e,t){return y(u(e),t)},"Matrix, Array":function(e,t){return y(e,u(t))},"Matrix, number | BigNumber":function(e,t){if(!c(t,0)){var r;switch(e.storage()){case"sparse":r=d(e,t,y,!1);break;default:r=v(e,t,y,!1)}return r}return e.clone()},"number | BigNumber, Matrix":function(e,t){if(!c(e,0)){var r;switch(t.storage()){case"sparse":r=m(t,e,y,!0);break;default:r=v(t,e,y,!0)}return r}return f(t.size(),t.storage())},"Array, number | BigNumber":function(e,t){return y(u(e),t).valueOf()},"number | BigNumber, Array":function(e,t){return y(e,u(t)).valueOf()}});return y.toTex={2:"\\left(${args[0]}"+s.operators.leftShift+"${args[1]}\\right)"},y}var i=r(6).isInteger,a=r(397);t.name="leftShift",t.factory=n},function(e,t){e.exports=function(e,t){if(e.isFinite()&&!e.isInteger()||t.isFinite()&&!t.isInteger())throw new Error("Integers expected in function leftShift");var r=e.constructor;return e.isNaN()||t.isNaN()||t.isNegative()&&!t.isZero()?new r(NaN):e.isZero()||t.isZero()?e:e.isFinite()||t.isFinite()?t.lt(55)?e.times(Math.pow(2,t.toNumber())+""):e.times(new r(2).pow(t)):new r(NaN)}},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(48)),s=e.SparseMatrix,u=function(e,t,r){var n=e._values,u=e._index,c=e._ptr,f=e._size,l=e._datatype,p=t._values,h=t._index,m=t._ptr,d=t._size,g=t._datatype;if(f.length!==d.length)throw new i(f.length,d.length);if(f[0]!==d[0]||f[1]!==d[1])throw new RangeError("Dimension mismatch. Matrix A ("+f+") must match Matrix B ("+d+")");if(!n||!p)throw new Error("Cannot perform operation on Pattern Sparse Matrices");var v,y=f[0],x=f[1],b=o,w=0,N=r;"string"==typeof l&&l===g&&(v=l,b=a.find(o,[v,v]),w=a.convert(0,v),N=a.find(r,[v,v]));for(var E,M,A,_,O=[],T=[],C=[],S=new s({values:O,index:T,ptr:C,size:[y,x],datatype:v}),z=[],B=[],k=0;x>k;k++){C[k]=T.length;var I=k+1;for(M=c[k],A=c[k+1],E=M;A>E;E++)_=u[E],B[_]=I,z[_]=n[E],T.push(_);for(M=m[k],A=m[k+1],E=M;A>E;E++)_=h[E],B[_]===I&&(z[_]=N(z[_],p[E]));for(E=C[k];E<T.length;){_=T[E];var R=z[_];b(R,w)?T.splice(E,1):(O.push(R),E++)}}return C[x]=T.length,S};return u}var i=r(42);t.name="algorithm08",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=n(r(48)),f=n(r(381)),l=n(r(54)),p=n(r(360)),h=n(r(398)),m=n(r(56)),d=n(r(85)),g=n(r(57)),v=n(r(58)),y=o("rightArithShift",{"number, number":function(e,t){if(!i(e)||!i(t))throw new Error("Integers expected in function rightArithShift");return e>>t},"BigNumber, BigNumber":a,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=h(e,t,y,!1);break;default:r=p(t,e,y,!0)}break;default:switch(t.storage()){case"sparse":r=l(e,t,y,!1);break;default:r=g(e,t,y)}}return r},"Array, Array":function(e,t){return y(u(e),u(t)).valueOf()},"Array, Matrix":function(e,t){return y(u(e),t)},"Matrix, Array":function(e,t){return y(e,u(t))},"Matrix, number | BigNumber":function(e,t){if(!c(t,0)){var r;switch(e.storage()){case"sparse":r=d(e,t,y,!1);break;default:r=v(e,t,y,!1)}return r}return e.clone()},"number | BigNumber, Matrix":function(e,t){if(!c(e,0)){var r;switch(t.storage()){case"sparse":r=m(t,e,y,!0);break;default:r=v(t,e,y,!0)}return r}return f(t.size(),t.storage())},"Array, number | BigNumber":function(e,t){return y(u(e),t).valueOf()},"number | BigNumber, Array":function(e,t){return y(e,u(t)).valueOf()}});return y.toTex={2:"\\left(${args[0]}"+s.operators.rightArithShift+"${args[1]}\\right)"},y}var i=r(6).isInteger,a=r(400);t.name="rightArithShift",t.factory=n},function(e,t){e.exports=function(e,t){if(e.isFinite()&&!e.isInteger()||t.isFinite()&&!t.isInteger())throw new Error("Integers expected in function rightArithShift");var r=e.constructor;return e.isNaN()||t.isNaN()||t.isNegative()&&!t.isZero()?new r(NaN):e.isZero()||t.isZero()?e:t.isFinite()?t.lt(55)?e.div(Math.pow(2,t.toNumber())+"").floor():e.div(new r(2).pow(t)).floor():new r(e.isNegative()?-1:e.isFinite()?0:NaN)}},function(e,t,r){"use strict";function n(e,t,n,a){var o=r(32),s=n(r(52)),u=n(r(48)),c=n(r(381)),f=n(r(54)),l=n(r(360)),p=n(r(398)),h=n(r(56)),m=n(r(85)),d=n(r(57)),g=n(r(58)),v=a("rightLogShift",{"number, number":function(e,t){if(!i(e)||!i(t))throw new Error("Integers expected in function rightLogShift");return e>>>t},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=p(e,t,v,!1);break;default:r=l(t,e,v,!0)}break;default:switch(t.storage()){case"sparse":r=f(e,t,v,!1);break;default:r=d(e,t,v)}}return r},"Array, Array":function(e,t){return v(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return v(s(e),t)},"Matrix, Array":function(e,t){return v(e,s(t))},"Matrix, number | BigNumber":function(e,t){if(!u(t,0)){var r;switch(e.storage()){case"sparse":r=m(e,t,v,!1);break;default:r=g(e,t,v,!1)}return r}return e.clone()},"number | BigNumber, Matrix":function(e,t){if(!u(e,0)){var r;switch(t.storage()){case"sparse":r=h(t,e,v,!0);break;default:r=g(t,e,v,!0)}return r}return c(t.size(),t.storage())},"Array, number | BigNumber":function(e,t){return v(s(e),t).valueOf()},"number | BigNumber, Array":function(e,t){return v(e,s(t)).valueOf()}});return v.toTex={2:"\\left(${args[0]}"+o.operators.rightLogShift+"${args[1]}\\right)"},v}var i=r(6).isInteger;t.name="rightLogShift",t.factory=n},function(e,t,r){e.exports=[r(403),r(409),r(404),r(410)]},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(51)),o=n(r(404)),s=n(r(356)),u=n(r(408)),c=i("bellNumbers",{"number | BigNumber":function(e){if(!u(e)||s(e))throw new TypeError("Non-negative integer value expected in function bellNumbers");for(var t=0,r=0;e>=r;r++)t=a(t,o(e,r));return t}});return c.toTex={1:"\\mathrm{B}_{${args[0]}}"},c}t.name="bellNumbers",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(51)),o=n(r(77)),s=n(r(84)),u=n(r(317)),c=n(r(82)),f=n(r(405)),l=n(r(407)),p=n(r(356)),h=n(r(408)),m=n(r(64)),d=i("stirlingS2",{"number | BigNumber, number | BigNumber":function(e,t){if(!h(e)||p(e)||!h(t)||p(t))throw new TypeError("Non-negative integer value expected in function stirlingS2");if(m(t,e))throw new TypeError("k must be less than or equal to n in function stirlingS2");for(var r=f(t),n=0,i=0;t>=i;i++){var d=c(-1,o(t,i)),g=l(t,i),v=c(i,e);n=a(n,s(s(g,v),d))}return u(n,r)}});return d.toTex={2:"\\mathrm{S}\\left(${args}\\right)"},d}t.name="stirlingS2",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(406)),s=r(32),u=a("factorial",{number:function(e){if(0>e)throw new Error("Value must be non-negative");return o(e+1)},BigNumber:function(e){if(e.isNegative())throw new Error("Value must be non-negative");return o(e.plus(1))},"Array | Matrix":function(e){return i(e,u)}});return u.toTex={1:"\\left(${args[0]}\\right)"+s.operators.factorial},u}var i=r(19);t.name="factorial",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,u){function c(r){if(r.isZero())return new e.BigNumber(1);for(var n=t.precision+(0|Math.log(r.toNumber())),i=e.BigNumber.clone({precision:n}),a=new i(r),o=r.toNumber()-1;o>1;)a=a.times(o),o--;return new e.BigNumber(a.toPrecision(e.BigNumber.precision))}var f=n(r(84)),l=n(r(82)),p=u("gamma",{number:function(e){var t,r;if(a(e)){if(0>=e)return isFinite(e)?1/0:NaN;if(e>171)return 1/0;for(var n=e-2,i=e-1;n>1;)i*=n,n--;return 0==i&&(i=1),i}if(.5>e)return Math.PI/(Math.sin(Math.PI*e)*p(1-e));if(e>=171.35)return 1/0;if(e>85){var u=e*e,c=u*e,f=c*e,l=f*e;return Math.sqrt(2*Math.PI/e)*Math.pow(e/Math.E,e)*(1+1/(12*e)+1/(288*u)-139/(51840*c)-571/(2488320*f)+163879/(209018880*l)+5246819/(75246796800*l*e))}--e,r=s[0];for(var h=1;h<s.length;++h)r+=s[h]/(e+h);return t=e+o+.5,Math.sqrt(2*Math.PI)*Math.pow(t,e+.5)*Math.exp(-t)*r},Complex:function(t){var r,n;if(0==t.im)return p(t.re);t=new e.Complex(t.re-1,t.im),n=new e.Complex(s[0],0);for(var i=1;i<s.length;++i){var a=t.re+i,u=a*a+t.im*t.im;0!=u?(n.re+=s[i]*a/u,n.im+=-(s[i]*t.im)/u):n.re=s[i]<0?-(1/0):1/0}r=new e.Complex(t.re+o+.5,t.im);var c=Math.sqrt(2*Math.PI);t.re+=.5;var h=l(r,t);0==h.im?h.re*=c:0==h.re?h.im*=c:(h.re*=c,h.im*=c);var m=Math.exp(-r.re);return r.re=m*Math.cos(-r.im),r.im=m*Math.sin(-r.im),f(f(h,r),n)},BigNumber:function(t){if(t.isInteger())return t.isNegative()||t.isZero()?new e.BigNumber(1/0):c(t.minus(1));if(!t.isFinite())return new e.BigNumber(t.isNegative()?NaN:1/0);throw new Error("Integer BigNumber expected")},"Array | Matrix":function(e){return i(e,p)}});return p.toTex={1:"\\Gamma\\left(${args[0]}\\right)"},p}var i=r(19),a=r(6).isInteger,o=4.7421875,s=[.9999999999999971,57.15623566586292,-59.59796035547549,14.136097974741746,-.4919138160976202,3399464998481189e-20,4652362892704858e-20,-9837447530487956e-20,.0001580887032249125,-.00021026444172410488,.00021743961811521265,-.0001643181065367639,8441822398385275e-20,-26190838401581408e-21,36899182659531625e-22];t.name="gamma",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("combinations",{"number, number":function(e,t){var r,n,i;if(!a(e)||0>e)throw new TypeError("Positive integer value expected in function combinations");if(!a(t)||0>t)throw new TypeError("Positive integer value expected in function combinations");if(t>e)throw new TypeError("k must be less than or equal to n");for(r=Math.max(t,e-t),n=1,i=1;e-r>=i;i++)n=n*(r+i)/i;return n},"BigNumber, BigNumber":function(t,r){var n,a,o,s,u=new e.BigNumber(1);if(!i(t)||!i(r))throw new TypeError("Positive integer value expected in function combinations");if(r.gt(t))throw new TypeError("k must be less than n in function combinations");for(n=t.minus(r),r.lt(n)&&(n=r),a=u,o=u,s=t.minus(n);o.lte(s);o=o.plus(1))a=a.times(n.plus(o)).dividedBy(o);return a}});return o.toTex={2:"\\binom{${args[0]}}{${args[1]}}"},o}function i(e){return e.isInteger()&&e.gte(0)}var a=r(6).isInteger;t.name="combinations",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("isInteger",{number:a.isInteger,BigNumber:function(e){return e.isInt()},Fraction:function(e){return 1===e.d&&isFinite(e.n)},"Array | Matrix":function(e){return i(e,o)}});return o}var i=r(19),a=r(6);t.name="isInteger",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(407)),o=n(r(53)),s=n(r(370)),u=n(r(408)),c=n(r(64)),f=i("composition",{"number | BigNumber, number | BigNumber":function(e,t){if(!(u(e)&&s(e)&&u(t)&&s(t)))throw new TypeError("Positive integer value expected in function composition");if(c(t,e))throw new TypeError("k must be less than or equal to n in function composition");return a(o(e,-1),o(t,-1))}});return f.toTex=void 0,f}t.name="composition",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(51)),o=n(r(317)),s=n(r(84)),u=n(r(407)),c=n(r(356)),f=n(r(408)),l=i("catalan",{"number | BigNumber":function(e){if(!f(e)||c(e))throw new TypeError("Non-negative integer value expected in function catalan");return o(u(s(e,2),e),a(e,1))}});return l.toTex={1:"\\mathrm{C}_{${args[0]}}"},l}t.name="catalan",t.factory=n},function(e,t,r){e.exports=[r(412),r(413),r(414),r(415)]},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("arg",{number:function(e){return Math.atan2(0,e)},Complex:function(e){return e.arg()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\arg\\left(${args[0]}\\right)"},a}var i=r(19);t.name="arg",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("conj",{number:function(e){return e},BigNumber:function(e){return e},Complex:function(e){return e.conjugate()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\left(${args[0]}\\right)^*"},a}var i=r(19);t.name="conj",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("im",{number:function(e){return 0},BigNumber:function(t){return new e.BigNumber(0)},Complex:function(e){return e.im},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\Im\\left\\lbrace${args[0]}\\right\\rbrace"},a}var i=r(19);t.name="im",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("re",{number:function(e){return e},BigNumber:function(e){return e},Complex:function(e){return e.re},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\Re\\left\\lbrace${args[0]}\\right\\rbrace"},a}var i=r(19);t.name="re",t.factory=n},function(e,t,r){e.exports=[r(417),r(418)]},function(e,t,r){"use strict";function n(e,t,n,i){function a(e){return 2===e.length&&"number"==typeof e[0]&&"number"==typeof e[1]}function o(e){return 3===e.length&&"number"==typeof e[0]&&"number"==typeof e[1]&&"number"==typeof e[2]}function s(e){return 4===e.length&&"number"==typeof e[0]&&"number"==typeof e[1]&&"number"==typeof e[2]&&"number"==typeof e[3]}function u(e,r,n,i){var a=e,o=n,s=d(a,r),u=d(o,i),c=s[0]*u[1]-u[0]*s[1];if(l(c)<t.epsilon)return null;var f=(u[0]*a[1]-u[1]*a[0]-u[0]*o[1]+u[1]*o[0])/c;return p(m(s,f),a)}function c(e,t,r,n,i,a,o,s,u,c,f,l){var p=(e-o)*(c-o)+(t-s)*(f-s)+(r-u)*(l-u),h=(c-o)*(n-e)+(f-s)*(i-t)+(l-u)*(a-r),m=(e-o)*(n-e)+(t-s)*(i-t)+(r-u)*(a-r),d=(c-o)*(c-o)+(f-s)*(f-s)+(l-u)*(l-u),g=(n-e)*(n-e)+(i-t)*(i-t)+(a-r)*(a-r),v=(p*h-m*d)/(g*d-h*h),y=(p+v*h)/d,x=e+v*(n-e),b=t+v*(i-t),w=r+v*(a-r),N=o+y*(c-o),E=s+y*(f-s),M=u+y*(l-u);return x===N&&b===E&&w===M?[x,b,w]:null}function f(e,t,r,n,i,a,o,s,u,c){var f=(c-e*o-t*s-r*u)/(n*o+i*s+a*u-e-t-r),l=e+f*(n-e),p=t+f*(i-t),h=r+f*(a-r);return[l,p,h]}var l=n(r(86)),p=n(r(51)),h=n(r(52)),m=n(r(84)),d=n(r(77)),g=i("intersect",{"Array, Array, Array":function(e,t,r){if(!o(e))throw new TypeError("Array with 3 numbers expected for first argument");if(!o(t))throw new TypeError("Array with 3 numbers expected for second argument");if(!s(r))throw new TypeError("Array with 4 numbers expected as third argument");return f(e[0],e[1],e[2],t[0],t[1],t[2],r[0],r[1],r[2],r[3])},"Array, Array, Array, Array":function(e,t,r,n){if(2===e.length){if(!a(e))throw new TypeError("Array with 2 numbers expected for first argument");if(!a(t))throw new TypeError("Array with 2 numbers expected for second argument");if(!a(r))throw new TypeError("Array with 2 numbers expected for third argument");if(!a(n))throw new TypeError("Array with 2 numbers expected for fourth argument");return u(e,t,r,n)}if(3===e.length){if(!o(e))throw new TypeError("Array with 3 numbers expected for first argument");if(!o(t))throw new TypeError("Array with 3 numbers expected for second argument");if(!o(r))throw new TypeError("Array with 3 numbers expected for third argument");if(!o(n))throw new TypeError("Array with 3 numbers expected for fourth argument");return c(e[0],e[1],e[2],t[0],t[1],t[2],r[0],r[1],r[2],n[0],n[1],n[2])}throw new TypeError("Arrays with two or thee dimensional points expected")},"Matrix, Matrix, Matrix":function(e,t,r){return h(g(e.valueOf(),t.valueOf(),r.valueOf()))},"Matrix, Matrix, Matrix, Matrix":function(e,t,r,n){return h(g(e.valueOf(),t.valueOf(),r.valueOf(),n.valueOf()))}});return g}t.name="intersect",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,s){var m=(n(r(52)),s("distance",{"Array, Array, Array":function(e,t,r){if(2==e.length&&2==t.length&&2==r.length){if(!i(e))throw new TypeError("Array with 2 numbers expected for first argument");if(!i(t))throw new TypeError("Array with 2 numbers expected for second argument");if(!i(r))throw new TypeError("Array with 2 numbers expected for third argument");var n=(r[1]-r[0])/(t[1]-t[0]),a=n*n*t[0],o=-1*(n*t[0]),s=e[1];return c(e[0],e[1],a,o,s)}throw new TypeError("Invalid Arguments: Try again")},"Object, Object, Object":function(e,t,r){if(2==Object.keys(e).length&&2==Object.keys(t).length&&2==Object.keys(r).length){if(!i(e))throw new TypeError("Values of pointX and pointY should be numbers");if(!i(t))throw new TypeError("Values of lineOnePtX and lineOnePtY should be numbers");if(!i(r))throw new TypeError("Values of lineTwoPtX and lineTwoPtY should be numbers");if(e.hasOwnProperty("pointX")&&e.hasOwnProperty("pointY")&&t.hasOwnProperty("lineOnePtX")&&t.hasOwnProperty("lineOnePtY")&&r.hasOwnProperty("lineTwoPtX")&&r.hasOwnProperty("lineTwoPtY")){var n=(r.lineTwoPtY-r.lineTwoPtX)/(t.lineOnePtY-t.lineOnePtX),a=n*n*t.lineOnePtX,o=-1*(n*t.lineOnePtX),s=e.pointX;return c(e.pointX,e.pointY,a,o,s)}throw new TypeError("Key names do not match")}throw new TypeError("Invalid Arguments: Try again")},"Array, Array":function(e,t){if(2==e.length&&3==t.length){if(!i(e))throw new TypeError("Array with 2 numbers expected for first argument");if(!a(t))throw new TypeError("Array with 3 numbers expected for second argument");return c(e[0],e[1],t[0],t[1],t[2])}if(3==e.length&&6==t.length){if(!a(e))throw new TypeError("Array with 3 numbers expected for first argument");if(!o(t))throw new TypeError("Array with 6 numbers expected for second argument");return f(e[0],e[1],e[2],t[0],t[1],t[2],t[3],t[4],t[5])}if(2==e.length&&2==t.length){if(!i(e))throw new TypeError("Array with 2 numbers expected for first argument");if(!i(t))throw new TypeError("Array with 2 numbers expected for second argument");return l(e[0],e[1],t[0],t[1])}if(3==e.length&&3==t.length){if(!a(e))throw new TypeError("Array with 3 numbers expected for first argument");if(!a(t))throw new TypeError("Array with 3 numbers expected for second argument");return p(e[0],e[1],e[2],t[0],t[1],t[2])}throw new TypeError("Invalid Arguments: Try again")},"Object, Object":function(e,t){if(2==Object.keys(e).length&&3==Object.keys(t).length){if(!i(e))throw new TypeError("Values of pointX and pointY should be numbers");if(!a(t))throw new TypeError("Values of xCoeffLine, yCoeffLine and constant should be numbers");if(e.hasOwnProperty("pointX")&&e.hasOwnProperty("pointY")&&t.hasOwnProperty("xCoeffLine")&&t.hasOwnProperty("yCoeffLine")&&t.hasOwnProperty("yCoeffLine"))return c(e.pointX,e.pointY,t.xCoeffLine,t.yCoeffLine,t.constant);throw new TypeError("Key names do not match")}if(3==Object.keys(e).length&&6==Object.keys(t).length){if(!a(e))throw new TypeError("Values of pointX, pointY and pointZ should be numbers");if(!o(t))throw new TypeError("Values of x0, y0, z0, a, b and c should be numbers");if(e.hasOwnProperty("pointX")&&e.hasOwnProperty("pointY")&&t.hasOwnProperty("x0")&&t.hasOwnProperty("y0")&&t.hasOwnProperty("z0")&&t.hasOwnProperty("a")&&t.hasOwnProperty("b")&&t.hasOwnProperty("c"))return f(e.pointX,e.pointY,e.pointZ,t.x0,t.y0,t.z0,t.a,t.b,t.c);throw new TypeError("Key names do not match")}if(2==Object.keys(e).length&&2==Object.keys(t).length){if(!i(e))throw new TypeError("Values of pointOneX and pointOneY should be numbers");if(!i(t))throw new TypeError("Values of pointTwoX and pointTwoY should be numbers");if(e.hasOwnProperty("pointOneX")&&e.hasOwnProperty("pointOneY")&&t.hasOwnProperty("pointTwoX")&&t.hasOwnProperty("pointTwoY"))return l(e.pointOneX,e.pointOneY,t.pointTwoX,t.pointTwoY);throw new TypeError("Key names do not match")}if(3==Object.keys(e).length&&3==Object.keys(t).length){if(!a(e))throw new TypeError("Values of pointOneX, pointOneY and pointOneZ should be numbers");if(!a(t))throw new TypeError("Values of pointTwoX, pointTwoY and pointTwoZ should be numbers");if(e.hasOwnProperty("pointOneX")&&e.hasOwnProperty("pointOneY")&&e.hasOwnProperty("pointOneZ")&&t.hasOwnProperty("pointTwoX")&&t.hasOwnProperty("pointTwoY")&&t.hasOwnProperty("pointTwoZ"))return p(e.pointOneX,e.pointOneY,e.pointOneZ,t.pointTwoX,t.pointTwoY,t.pointTwoZ);throw new TypeError("Key names do not match")}throw new TypeError("Invalid Arguments: Try again")},Array:function(e){if(!u(e))throw new TypeError("Incorrect array format entered for pairwise distance calculation");return h(e)}}));return m}function i(e){return e.constructor!==Array&&(e=s(e)),"number"==typeof e[0]&&"number"==typeof e[1]}function a(e){return e.constructor!==Array&&(e=s(e)),"number"==typeof e[0]&&"number"==typeof e[1]&&"number"==typeof e[2]}function o(e){return e.constructor!==Array&&(e=s(e)),"number"==typeof e[0]&&"number"==typeof e[1]&&"number"==typeof e[2]&&"number"==typeof e[3]&&"number"==typeof e[4]&&"number"==typeof e[5]}function s(e){for(var t=Object.keys(e),r=[],n=0;n<t.length;n++)r.push(e[t[n]]);return r}function u(e){if(2==e[0].length&&"number"==typeof e[0][0]&&"number"==typeof e[0][1]){for(var t in e)if(2!=e[t].length||"number"!=typeof e[t][0]||"number"!=typeof e[t][1])return!1}else{if(3!=e[0].length||"number"!=typeof e[0][0]||"number"!=typeof e[0][1]||"number"!=typeof e[0][2])return!1;for(var t in e)if(3!=e[t].length||"number"!=typeof e[t][0]||"number"!=typeof e[t][1]||"number"!=typeof e[t][2])return!1}return!0}function c(e,t,r,n,i){var a=Math.abs(r*e+n*t+i),o=Math.pow(r*r+n*n,.5),s=a/o;return s}function f(e,t,r,n,i,a,o,s,u){var c=[(i-t)*u-(a-r)*s,(a-r)*o-(n-e)*u,(n-e)*s-(i-t)*o];c=Math.pow(c[0]*c[0]+c[1]*c[1]+c[2]*c[2],.5);var f=Math.pow(o*o+s*s+u*u,.5),l=c/f;return l}function l(e,t,r,n){var i=n-t,a=r-e,o=i*i+a*a,s=Math.pow(o,.5);return s}function p(e,t,r,n,i,a){var o=a-r,s=i-t,u=n-e,c=o*o+s*s+u*u,f=Math.pow(c,.5);return f}function h(e){for(var t=[],r=0;r<e.length-1;r++)for(var n=r+1;n<e.length;n++)2==e[0].length?t.push(l(e[r][0],e[r][1],e[n][0],e[n][1])):3==e[0].length&&t.push(p(e[r][0],e[r][1],e[r][2],e[n][0],e[n][1],e[n][2]));return t}t.name="distance",t.factory=n},function(e,t,r){e.exports=[r(420),r(421),r(423),r(424)]},function(e,t,r){"use strict";function n(e,t,n,i){var a=r(32),o=n(r(52)),s=n(r(381)),u=n(r(421)),c=(n(r(422)),n(r(360))),f=n(r(372)),l=n(r(85)),p=n(r(57)),h=n(r(58)),m=i("and",{"number, number":function(e,t){return!(!e||!t)},"Complex, Complex":function(e,t){return!(0===e.re&&0===e.im||0===t.re&&0===t.im)},"BigNumber, BigNumber":function(e,t){return!(e.isZero()||t.isZero()||e.isNaN()||t.isNaN())},"Unit, Unit":function(e,t){return m(e.value,t.value)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=c(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,m,!1);break;default:r=p(e,t,m)}}return r},"Array, Array":function(e,t){return m(o(e),o(t)).valueOf()},"Array, Matrix":function(e,t){return m(o(e),t)},"Matrix, Array":function(e,t){return m(e,o(t))},"Matrix, any":function(e,t){if(u(t))return s(e.size(),e.storage());var r;switch(e.storage()){case"sparse":r=l(e,t,m,!1);break;default:r=h(e,t,m,!1)}return r},"any, Matrix":function(e,t){if(u(e))return s(e.size(),e.storage());var r;switch(t.storage()){case"sparse":r=l(t,e,m,!0);break;default:r=h(t,e,m,!0)}return r},"Array, any":function(e,t){return m(o(e),t).valueOf()},"any, Array":function(e,t){return m(e,o(t)).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+a.operators.and+"${args[1]}\\right)"},m}t.name="and",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=r(32),s=a("not",{number:function(e){return!e},Complex:function(e){return 0===e.re&&0===e.im},BigNumber:function(e){return e.isZero()||e.isNaN()},Unit:function(e){return s(e.value)},"Array | Matrix":function(e){return i(e,s)}});return s.toTex={1:o.operators.not+"\\left(${args[0]}\\right)"},s}var i=r(19);t.name="not",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("isZero",{number:function(e){return 0===e},BigNumber:function(e){return e.isZero()},Complex:function(e){return 0===e.re&&0===e.im},Fraction:function(e){return 1===e.d&&0===e.n},Unit:function(e){return a(e.value)},"Array | Matrix":function(e){return i(e,a)}});return a}var i=r(19);r(6);t.name="isZero",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=r(32),o=n(r(52)),s=n(r(61)),u=n(r(79)),c=n(r(63)),f=n(r(57)),l=n(r(58)),p=i("or",{"number, number":function(e,t){return!(!e&&!t)},"Complex, Complex":function(e,t){return 0!==e.re||0!==e.im||0!==t.re||0!==t.im},"BigNumber, BigNumber":function(e,t){return!e.isZero()&&!e.isNaN()||!t.isZero()&&!t.isNaN()},"Unit, Unit":function(e,t){return p(e.value,t.value)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=u(e,t,p);break;default:r=s(t,e,p,!0)}break;default:switch(t.storage()){case"sparse":r=s(e,t,p,!1);break;default:r=f(e,t,p)}}return r},"Array, Array":function(e,t){return p(o(e),o(t)).valueOf()},"Array, Matrix":function(e,t){return p(o(e),t)},"Matrix, Array":function(e,t){return p(e,o(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=c(e,t,p,!1);break;default:r=l(e,t,p,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=c(t,e,p,!0);break;default:r=l(t,e,p,!0)}return r},"Array, any":function(e,t){return l(o(e),t,p,!1).valueOf()},"any, Array":function(e,t){return l(o(t),e,p,!0).valueOf()}});return p.toTex={2:"\\left(${args[0]}"+a.operators.or+"${args[1]}\\right)"},p}t.name="or",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=r(32),o=n(r(52)),s=n(r(61)),u=n(r(62)),c=n(r(63)),f=n(r(57)),l=n(r(58)),p=i("xor",{"number, number":function(e,t){return!!(!!e^!!t)},"Complex, Complex":function(e,t){return(0!==e.re||0!==e.im)!=(0!==t.re||0!==t.im)},"BigNumber, BigNumber":function(e,t){return(!e.isZero()&&!e.isNaN())!=(!t.isZero()&&!t.isNaN())},"Unit, Unit":function(e,t){return p(e.value,t.value)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=u(e,t,p);break;default:r=s(t,e,p,!0)}break;default:switch(t.storage()){case"sparse":r=s(e,t,p,!1);break;default:r=f(e,t,p)}}return r},"Array, Array":function(e,t){return p(o(e),o(t)).valueOf()},"Array, Matrix":function(e,t){return p(o(e),t)},"Matrix, Array":function(e,t){return p(e,o(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=c(e,t,p,!1);break;default:r=l(e,t,p,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=c(t,e,p,!0);break;default:r=l(t,e,p,!0)}return r},"Array, any":function(e,t){return l(o(e),t,p,!1).valueOf()},"any, Array":function(e,t){return l(o(t),e,p,!0).valueOf()}});return p.toTex={2:"\\left(${args[0]}"+a.operators.xor+"${args[1]}\\right)"},p}t.name="xor",t.factory=n},function(e,t,r){e.exports=[r(301),r(426),r(319),r(427),r(428),r(83),r(303),r(429),r(305),r(318),r(308),r(430),r(431),r(323),r(433),r(434),r(435),r(436),r(276),r(378),r(335),r(381)]},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t){var r=i(e),n=i(t);if(1!=r.length||1!=n.length||3!=r[0]||3!=n[0])throw new RangeError("Vectors with length 3 expected (Size A = ["+r.join(", ")+"], B = ["+n.join(", ")+"])");return[u(c(e[1],t[2]),c(e[2],t[1])),u(c(e[2],t[0]),c(e[0],t[2])),u(c(e[0],t[1]),c(e[1],t[0]))]}var s=n(r(52)),u=n(r(77)),c=n(r(84)),f=a("cross",{"Matrix, Matrix":function(e,t){return s(o(e.toArray(),t.toArray()))},"Matrix, Array":function(e,t){return s(o(e.toArray(),t))},"Array, Matrix":function(e,t){return s(o(e,t.toArray()))},"Array, Array":o});return f.toTex={2:"\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)"},f}var i=r(40).size;t.name="cross",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(e,t,r,n){if(!a(t))throw new TypeError("Second parameter in function diag must be an integer");var i=t>0?t:0,o=0>t?-t:0;switch(r.length){case 1:return u(e,t,n,r[0],o,i);case 2:return c(e,t,n,r,o,i)}throw new RangeError("Matrix for function diag must be 2 dimensional")}function u(t,r,n,i,a,o){var s=[i+a,i+o],u=e.Matrix.storage(n||"dense"),c=u.diagonal(s,t,r);return null!==n?c:c.valueOf()}function c(e,t,r,n,i,a){if(e&&e.isMatrix===!0){var o=e.diagonal(t);return null!==r?r!==o.storage()?f(o,r):o:o.valueOf()}for(var s=Math.min(n[0]-i,n[1]-a),u=[],c=0;s>c;c++)u[c]=e[c+i][c+a];return null!==r?f(u):u}var f=n(r(52)),l=o("diag",{Array:function(e){return s(e,0,i.size(e),null)},"Array, number":function(e,t){return s(e,t,i.size(e),null)},"Array, BigNumber":function(e,t){return s(e,t.toNumber(),i.size(e),null)},"Array, string":function(e,t){return s(e,0,i.size(e),t)},"Array, number, string":function(e,t,r){return s(e,t,i.size(e),r)},"Array, BigNumber, string":function(e,t,r){return s(e,t.toNumber(),i.size(e),r)},Matrix:function(e){return s(e,0,e.size(),e.storage())},"Matrix, number":function(e,t){return s(e,t,e.size(),e.storage())},"Matrix, BigNumber":function(e,t){return s(e,t.toNumber(),e.size(),e.storage())},"Matrix, string":function(e,t){return s(e,0,e.size(),t)},"Matrix, number, string":function(e,t,r){return s(e,t,e.size(),r)},"Matrix, BigNumber, string":function(e,t,r){return s(e,t.toNumber(),e.size(),r)}});return l.toTex=void 0,l}var i=r(40),a=(r(3).clone,r(6).isInteger);t.name="diag",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t){var r=i(e),n=i(t),a=r[0];if(1!==r.length||1!==n.length)throw new RangeError("Vector expected");if(r[0]!=n[0])throw new RangeError("Vectors must have equal length ("+r[0]+" != "+n[0]+")");if(0==a)throw new RangeError("Cannot calculate the dot product of empty vectors");for(var o=0,c=0;a>c;c++)o=s(o,u(e[c],t[c]));return o}var s=n(r(51)),u=n(r(84)),c=a("dot",{"Matrix, Matrix":function(e,t){return o(e.toArray(),t.toArray())},"Matrix, Array":function(e,t){return o(e.toArray(),t)},"Array, Matrix":function(e,t){return o(e,t.toArray())},"Array, Array":o});return c.toTex={2:"\\left(${args[0]}\\cdot${args[1]}\\right)"},c}var i=r(40).size;t.name="dot",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=o("flatten",{Array:function(e){return a(i(e))},Matrix:function(e){var t=a(i(e.toArray()));return s(t)}});return u.toTex=void 0,u}var i=r(3).clone,a=r(40).flatten;t.name="flatten",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(t,r){var n=u(t),i=n?new e.BigNumber(1):1;if(c(t),r){var o=f(r);return t.length>0?o.resize(t,i):o}var s=[];return t.length>0?a(s,t,i):s}function u(e){var t=!1;return e.forEach(function(e,r,n){e&&e.isBigNumber===!0&&(t=!0,n[r]=e.toNumber())}),t}function c(e){e.forEach(function(e){if("number"!=typeof e||!i(e)||0>e)throw new Error("Parameters in function ones must be positive integers")})}var f=n(r(52)),l=o("ones",{"":function(){return"Array"===t.matrix?s([]):s([],"default")},"...number | BigNumber | string":function(e){var r=e[e.length-1];if("string"==typeof r){var n=e.pop();return s(e,n)}return"Array"===t.matrix?s(e):s(e,"default")},Array:s,Matrix:function(e){var t=e.storage();return s(e.valueOf(),t)},"Array | Matrix, string":function(e,t){return s(e.valueOf(),t)}});return l.toTex=void 0,l}var i=r(6).isInteger,a=r(40).resize;t.name="ones",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t){return-c(e,t)}function s(e,t,r){
if(!i(t)||0>t)throw new Error("k must be a non-negative integer");if(e&&e.isMatrix){var n=e.size();if(n.length>1)throw new Error("Only one dimensional matrices supported");return u(e.valueOf(),t,r)}return Array.isArray(e)?u(e,t,r):void 0}function u(e,t,r){if(t>=e.length)throw new Error("k out of bounds");for(var n=0,i=e.length-1;i>n;){for(var a=n,o=i,s=e[Math.floor(Math.random()*(i-n+1))+n];o>a;)if(r(e[a],s)>=0){var u=e[o];e[o]=e[a],e[a]=u,--o}else++a;r(e[a],s)>0&&--a,a>=t?i=a:n=a+1}return e[t]}var c=n(r(432));return a("partitionSelect",{"Array | Matrix, number":function(e,t){return s(e,t,c)},"Array | Matrix, number, string":function(e,t,r){if("asc"===r)return s(e,t,c);if("desc"===r)return s(e,t,o);throw new Error('Compare string must be "asc" or "desc"')},"Array | Matrix, number, function":s})}var i=r(6).isInteger;t.name="partitionSelect",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(61)),c=n(r(79)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=o("compare",{"boolean, boolean":function(e,t){return e===t?0:e>t?1:-1},"number, number":function(e,r){return e===r||i(e,r,t.epsilon)?0:e>r?1:-1},"BigNumber, BigNumber":function(r,n){return r.eq(n)||a(r,n,t.epsilon)?new e.BigNumber(0):new e.BigNumber(r.cmp(n))},"Fraction, Fraction":function(t,r){return new e.Fraction(t.compare(r))},"Complex, Complex":function(){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return h(e.value,t.value)},"string, string":function(e,t){return e===t?0:e>t?1:-1},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,h);break;default:r=u(t,e,h,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,h,!1);break;default:r=l(e,t,h)}}return r},"Array, Array":function(e,t){return h(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return h(s(e),t)},"Matrix, Array":function(e,t){return h(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,h,!1);break;default:r=p(e,t,h,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,h,!0);break;default:r=p(t,e,h,!0)}return r},"Array, any":function(e,t){return p(s(e),t,h,!1).valueOf()},"any, Array":function(e,t){return p(s(t),e,h,!0).valueOf()}});return h.toTex=void 0,h}var i=r(6).nearlyEqual,a=r(49);t.name="compare",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,f){function l(e,t,r){if(void 0!==r){if("string"!=typeof r||1!==r.length)throw new TypeError("Single character expected as defaultValue")}else r=" ";if(1!==t.length)throw new i(t.length,1);var n=t[0];if("number"!=typeof n||!o(n))throw new TypeError("Invalid size, must contain positive integers (size: "+s(t)+")");if(e.length>n)return e.substring(0,n);if(e.length<n){for(var a=e,u=0,c=n-e.length;c>u;u++)a+=r;return a}return e}var p=n(r(52)),h=function(e,r,n){if(2!=arguments.length&&3!=arguments.length)throw new a("resize",arguments.length,2,3);if(r&&r.isMatrix===!0&&(r=r.valueOf()),r.length&&r[0]&&r[0].isBigNumber===!0&&(r=r.map(function(e){return e&&e.isBigNumber===!0?e.toNumber():e})),e&&e.isMatrix===!0)return e.resize(r,n,!0);if("string"==typeof e)return l(e,r,n);var i=Array.isArray(e)?!1:"Array"!==t.matrix;if(0==r.length){for(;Array.isArray(e);)e=e[0];return u(e)}Array.isArray(e)||(e=[e]),e=u(e);var o=c.resize(e,r,n);return i?p(o):o};return h.toTex=void 0,h}var i=r(42),a=r(11),o=r(6).isInteger,s=r(23).format,u=r(3).clone,c=r(40);t.name="resize",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(52)),s=a("size",{Matrix:function(e){return o(e.size())},Array:i.size,string:function(e){return"Array"===t.matrix?[e.length]:o([e.length])},"number | Complex | BigNumber | Unit | boolean | null":function(e){return"Array"===t.matrix?[]:o([])}});return s.toTex=void 0,s}var i=r(40);t.name="size",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e){if("asc"===e)return f;if("desc"===e)return l;throw new Error('String "asc" or "desc" expected')}function s(e){if(1!==i(e).length)throw new Error("One dimensional array expected")}function u(e){if(1!==e.size().length)throw new Error("One dimensional matrix expected")}var c=n(r(52)),f=n(r(432)),l=function(e,t){return-f(e,t)},p=a("sort",{Array:function(e){return s(e),e.sort(f)},Matrix:function(e){return u(e),c(e.toArray().sort(f),e.storage())},"Array, function":function(e,t){return s(e),e.sort(t)},"Matrix, function":function(e,t){return u(e),c(e.toArray().sort(t),e.storage())},"Array, string":function(e,t){return s(e),e.sort(o(t))},"Matrix, string":function(e,t){return u(e),c(e.toArray().sort(o(t)),e.storage())}});return p.toTex=void 0,p}var i=r(40).size;t.name="sort",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=o("squeeze",{Array:function(e){return a.squeeze(i.clone(e))},Matrix:function(e){var t=a.squeeze(e.toArray());return Array.isArray(t)?s(t):t},any:function(e){return i.clone(e)}});return u.toTex=void 0,u}var i=r(3),a=r(40);t.name="squeeze",t.factory=n},function(e,t,r){e.exports=[r(407),r(405),r(406),r(438),r(440),r(441),r(442),r(444),r(445)]},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){var r=t.size().length,n=e.size().length;if(r>1)throw new Error("first object must be one dimensional");if(n>1)throw new Error("second object must be one dimensional");if(r!==n)throw new Error("Length of two vectors must be equal");var i=u(e);if(0===i)throw new Error("Sum of elements in first object must be non zero");var a=u(t);if(0===a)throw new Error("Sum of elements in second object must be non zero");var o=s(e,u(e)),h=s(t,u(t)),m=u(c(o,l(f(o,h))));return p(m)?m:Number.NaN}var o=n(r(52)),s=n(r(317)),u=n(r(439)),c=n(r(84)),f=n(r(359)),l=n(r(374)),p=n(r(88)),h=i("kldivergence",{"Array, Array":function(e,t){return a(o(e),o(t))},"Matrix, Array":function(e,t){return a(e,o(t))},"Array, Matrix":function(e,t){return a(o(e),t)},"Matrix, Matrix":function(e,t){return a(e,t)}});return h}t.name="kldivergence",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(r){var n=void 0;if(i(r,function(e){n=void 0===n?e:s(n,e)}),void 0===n)switch(t.number){case"number":return 0;case"BigNumber":return new e.BigNumber(0);case"Fraction":return new e.Fraction(0);default:return 0}return n}var s=n(r(53)),u=a("sum",{"Array | Matrix":function(e){return o(e)},"Array | Matrix, number | BigNumber":function(){throw new Error("sum(A, dim) is not yet supported")},"...":function(e){return o(e)}});return u.toTex=void 0,u}var i=r(312);t.name="sum",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(51)),s=n(r(84)),u=n(r(317)),c=n(r(405)),f=n(r(408)),l=n(r(370));return a("multinomial",{"Array | Matrix":function(e){var t=0,r=1;return i(e,function(e){if(!f(e)||!l(e))throw new TypeError("Positive integer value expected in function multinomial");t=o(t,e),r=s(r,c(e))}),u(c(t),r)}})}var i=r(312);t.name="multinomial",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(405)),u=o("permutations",{"number | BigNumber":s,"number, number":function(e,t){var r,n;if(!a(e)||0>e)throw new TypeError("Positive integer value expected in function permutations");if(!a(t)||0>t)throw new TypeError("Positive integer value expected in function permutations");if(t>e)throw new TypeError("second argument k must be less than or equal to first argument n");for(r=1,n=e-t+1;e>=n;n++)r*=n;return r},"BigNumber, BigNumber":function(t,r){var n,a;if(!i(t)||!i(r))throw new TypeError("Positive integer value expected in function permutations");if(r.gt(t))throw new TypeError("second argument k must be less than or equal to first argument n");for(n=new e.BigNumber(1),a=t.minus(r).plus(1);a.lte(t);a=a.plus(1))n=n.times(a);return n}});return u.toTex=void 0,u}function i(e){return e.isInteger()&&e.gte(0)}var a=r(6).isInteger;t.name="permutations",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(443)),o=a("uniform").pickRandom;return o.toTex=void 0,o}t.name="pickRandom",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(e){if(!f.hasOwnProperty(e))throw new Error("Unknown distribution "+e);var t=Array.prototype.slice.call(arguments,1),r=f[e].apply(this,t);return function(e){var t={random:function(e,t,n){var s,c,f;if(arguments.length>3)throw new i("random",arguments.length,0,3);if(1===arguments.length?a(e)?s=e:f=e:2===arguments.length?a(e)?(s=e,f=t):(c=e,f=t):(s=e,c=t,f=n),void 0===f&&(f=1),void 0===c&&(c=0),void 0!==s){var l=o(s.valueOf(),c,f,r);return s&&s.isMatrix===!0?u(l):l}return r(c,f)},randomInt:function(e,t,r){var s,c,f;if(arguments.length>3||arguments.length<1)throw new i("randomInt",arguments.length,1,3);if(1===arguments.length?a(e)?s=e:f=e:2===arguments.length?a(e)?(s=e,f=t):(c=e,f=t):(s=e,c=t,f=r),void 0===c&&(c=0),void 0!==s){var l=o(s.valueOf(),c,f,n);return s&&s.isMatrix===!0?u(l):l}return n(c,f)},pickRandom:function(e){if(1!==arguments.length)throw new i("pickRandom",arguments.length,1);if(e&&e.isMatrix===!0)e=e.valueOf();else if(!Array.isArray(e))throw new TypeError("Unsupported type of value in function pickRandom");if(c.size(e).length>1)throw new Error("Only one dimensional vectors supported");return e[Math.floor(Math.random()*e.length)]}},r=function(t,r){return t+e()*(r-t)},n=function(t,r){return Math.floor(t+e()*(r-t))},o=function(e,t,r,n){var i,a,s=[];if(e=e.slice(0),e.length>1)for(a=0,i=e.shift();i>a;a++)s.push(o(e,t,r,n));else for(a=0,i=e.shift();i>a;a++)s.push(n(t,r));return s};return t}(r)}var u=n(r(52)),c=r(40),f={uniform:function(){return Math.random},normal:function(){return function(){for(var e,t,r=-1;0>r||r>1;)e=Math.random(),t=Math.random(),r=1/6*Math.pow(-2*Math.log(e),.5)*Math.cos(2*Math.PI*t)+.5;return r}}};return s.toTex=void 0,s}var i=r(11),a=r(310);t.name="distribution",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(443)),o=a("uniform").random;return o.toTex=void 0,o}t.name="random",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(443)),o=a("uniform").randomInt;return o.toTex=void 0,o}t.name="randomInt",t.factory=n},function(e,t,r){e.exports=[r(432),r(447),r(87),r(64),r(342),r(60),r(448),r(449)]},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){if(Array.isArray(e)){if(Array.isArray(t)){var r=e.length;if(r!==t.length)return!1;for(var n=0;r>n;n++)if(!a(e[n],t[n]))return!1;return!0}return!1}return Array.isArray(t)?!1:o(e,t)}var o=n(r(87)),s=i("deepEqual",{"any, any":function(e,t){return a(e.valueOf(),t.valueOf())}});return s.toTex=void 0,s}t.name="deepEqual",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(61)),c=n(r(62)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=r(32),m=o("smallerEq",{"boolean, boolean":function(e,t){return t>=e},"number, number":function(e,r){return r>=e||i(e,r,t.epsilon)},"BigNumber, BigNumber":function(e,r){return e.lte(r)||a(e,r,t.epsilon)},"Fraction, Fraction":function(e,t){return 1!==e.compare(t)},"Complex, Complex":function(){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return m(e.value,t.value)},"string, string":function(e,t){return t>=e},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,m);break;default:r=u(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,m,!1);break;default:r=l(e,t,m)}}return r},"Array, Array":function(e,t){return m(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return m(s(e),t)},"Matrix, Array":function(e,t){return m(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=p(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,m,!0);break;default:r=p(t,e,m,!0)}return r},"Array, any":function(e,t){return p(s(e),t,m,!1).valueOf()},"any, Array":function(e,t){return p(s(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+h.operators.smallerEq+"${args[1]}\\right)"},m}var i=r(6).nearlyEqual,a=r(49);t.name="smallerEq",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(61)),c=n(r(62)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=r(32),m=o("unequal",{"any, any":function(e,t){return null===e?null!==t:null===t?null!==e:void 0===e?void 0!==t:void 0===t?void 0!==e:d(e,t)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,d);break;default:r=u(t,e,d,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,d,!1);break;default:r=l(e,t,d)}}return r},"Array, Array":function(e,t){return m(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return m(s(e),t)},"Matrix, Array":function(e,t){return m(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,d,!1);break;default:r=p(e,t,d,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,d,!0);break;default:r=p(t,e,d,!0)}return r},"Array, any":function(e,t){return p(s(e),t,d,!1).valueOf()},"any, Array":function(e,t){return p(s(t),e,d,!0).valueOf()}}),d=o("_unequal",{"boolean, boolean":function(e,t){return e!==t},"number, number":function(e,r){return!i(e,r,t.epsilon)},"BigNumber, BigNumber":function(e,r){return!a(e,r,t.epsilon)},"Fraction, Fraction":function(e,t){return!e.equals(t)},"Complex, Complex":function(e,t){return!e.equals(t)},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return m(e.value,t.value)},"string, string":function(e,t){return e!==t}});return m.toTex={2:"\\left(${args[0]}"+h.operators.unequal+"${args[1]}\\right)"},m}var i=r(6).nearlyEqual,a=r(49);t.name="unequal",t.factory=n},function(e,t,r){e.exports=[r(311),r(316),r(451),r(321),r(452),r(453),r(454),r(455),r(439),r(456)]},function(e,t,r){"use strict";function n(e,t,n,o){function s(e){e=i(e.valueOf());var t=e.length;if(0==t)throw new Error("Cannot calculate median of an empty array");if(t%2==0){for(var r=t/2-1,n=l(e,r+1),a=e[r],o=0;r>o;++o)f(e[o],a)>0&&(a=e[o]);return m(a,n)}var s=l(e,(t-1)/2);return h(s)}var u=n(r(53)),c=n(r(81)),f=n(r(432)),l=n(r(431)),p=o("median",{"Array | Matrix":s,"Array | Matrix, number | BigNumber":function(e,t){throw new Error("median(A, dim) is not yet supported")},"...":function(e){if(a(e))throw new TypeError("Scalar values expected in function median");return s(e)}}),h=o({"number | BigNumber | Unit":function(e){return e}}),m=o({"number | BigNumber | Unit, number | BigNumber | Unit":function(e,t){return c(u(e,t),2)}});return p.toTex=void 0,p}var i=r(40).flatten,a=(r(313),r(314));t.name="median",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){function a(e){e=i(e.valueOf());var t=e.length;if(0==t)throw new Error("Cannot calculate mode of an empty array");var r={},n=[],a=0;for(var o in e)e[o]in r||(r[e[o]]=0),r[e[o]]++,r[e[o]]==a?n.push(e[o]):r[e[o]]>a&&(a=r[e[o]],n=[e[o]]);return n}var o=n("mode",{"Array | Matrix":a,"...":function(e){return a(e)}});return o}var i=r(40).flatten;t.name="mode",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e){var t=void 0;if(i(e,function(e){t=void 0===t?e:s(t,e)}),void 0===t)throw new Error("Cannot calculate prod of an empty array");return t}var s=n(r(80)),u=a("prod",{"Array | Matrix":o,"Array | Matrix, number | BigNumber":function(e,t){throw new Error("prod(A, dim) is not yet supported")},"...":function(e){return o(e)}});return u.toTex=void 0,u}var i=r(312);t.name="prod",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,u){function c(t,r,n){var o,u,c;if(arguments.length<2||arguments.length>3)throw new SyntaxError("Function quantileSeq requires two or three parameters");if(s(t)){if(n=n||!1,"boolean"==typeof n){if(u=t.valueOf(),a(r)){if(0>r)throw new Error("N/prob must be non-negative");if(1>=r)return f(u,r,n);if(r>1){if(!i(r))throw new Error("N must be a positive integer");var l=r+1;o=new Array(r);for(var p=0;r>p;)o[p]=f(u,++p/l,n);return o}}if(r&&r.isBigNumber){if(r.isNegative())throw new Error("N/prob must be non-negative");if(c=new r.constructor(1),r.lte(c))return f(u,r,n);if(r.gt(c)){if(!r.isInteger())throw new Error("N must be a positive integer");var h=r.toNumber();if(h>4294967295)throw new Error("N must be less than or equal to 2^32-1, as that is the maximum length of an Array");var l=new e.BigNumber(h+1);o=new Array(h);for(var p=0;h>p;)o[p]=f(u,new e.BigNumber(++p).div(l),n);return o}}if(Array.isArray(r)){o=new Array(r.length);for(var p=0;p<o.length;++p){var m=r[p];if(a(m)){if(0>m||m>1)throw new Error("Probability must be between 0 and 1, inclusive")}else{if(!m||!m.isBigNumber)throw new TypeError("Unexpected type of argument in function quantileSeq");if(c=new m.constructor(1),m.isNegative()||m.gt(c))throw new Error("Probability must be between 0 and 1, inclusive")}o[p]=f(u,m,n)}return o}throw new TypeError("Unexpected type of argument in function quantileSeq")}throw new TypeError("Unexpected type of argument in function quantileSeq")}throw new TypeError("Unexpected type of argument in function quantileSeq")}function f(e,t,r){var n=o(e),i=n.length;if(0===i)throw new Error("Cannot calculate quantile of an empty sequence");if(a(t)){var s=t*(i-1),u=s%1;if(0===u){var c=r?n[s]:h(n,s);return d(c),c}var f,g,v=Math.floor(s);if(r)f=n[v],g=n[v+1];else{g=h(n,v+1),f=n[v];for(var y=0;v>y;++y)m(n[y],f)>0&&(f=n[y])}return d(f),d(g),l(p(f,1-u),p(g,u))}var s=t.times(i-1);if(s.isInteger()){s=s.toNumber();var c=r?n[s]:h(n,s);return d(c),c}var f,g,v=s.floor(),u=s.minus(v),x=v.toNumber();if(r)f=n[x],g=n[x+1];else{g=h(n,x+1),f=n[x];for(var y=0;x>y;++y)m(n[y],f)>0&&(f=n[y])}d(f),d(g);var b=new u.constructor(1);return l(p(f,b.minus(u)),p(g,u))}var l=n(r(51)),p=n(r(84)),h=n(r(431)),m=n(r(432)),d=u({"number | BigNumber | Unit":function(e){return e}});return c}var i=r(6).isInteger,a=r(6).isNumber,o=r(40).flatten,s=r(310);t.name="quantileSeq",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){if(0==e.length)throw new SyntaxError("Function std requires one or more parameters (0 provided)");return o(s.apply(null,arguments))}var o=n(r(369)),s=n(r(456)),u=i("std",{"Array | Matrix":a,"Array | Matrix, string":a,"...":function(e){return a(e)}});return u.toTex=void 0,u}t.name="std",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(t,r){var n=0,i=0;if(0==t.length)throw new SyntaxError("Function var requires one or more parameters (0 provided)");if(a(t,function(e){n=u(n,e),i++}),0===i)throw new Error("Cannot calculate var of an empty array");var o=l(n,i);switch(n=0,a(t,function(e){var t=c(e,o);n=u(n,f(t,t))}),r){case"uncorrected":return l(n,i);case"biased":return l(n,i+1);case"unbiased":var s=n&&n.isBigNumber===!0?new e.BigNumber(0):0;return 1==i?s:l(n,i-1);default:throw new Error('Unknown normalization "'+r+'". Choose "unbiased" (default), "uncorrected", or "biased".')}}var u=n(r(53)),c=n(r(77)),f=n(r(80)),l=n(r(81)),p=o("variance",{"Array | Matrix":function(e){return s(e,i)},"Array | Matrix, string":s,"...":function(e){return s(e,i)}});return p.toTex="\\mathrm{Var}\\left(${args}\\right)",p}var i="unbiased",a=r(312);t.name="var",t.factory=n},function(e,t,r){e.exports=[r(89),r(458)]},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("print",{"string, Object":i,"string, Object, number":i});return a.toTex=void 0,a}function i(e,t,r){return e.replace(/\$([\w\.]+)/g,function(e,n){for(var i=n.split("."),s=t[i.shift()];i.length&&void 0!==s;){var u=i.shift();s=u?s[u]:s+"."}return void 0!==s?a(s)?s:o(s,r):e})}var a=r(23).isString,o=r(23).format;t.name="print",t.factory=n},function(e,t,r){e.exports=[r(460),r(461),r(462),r(463),r(464),r(465),r(466),r(467),r(468),r(469),r(470),r(471),r(472),r(473),r(474),r(475),r(476),r(477),r(478),r(479),r(480),r(481),r(482),r(483),r(484)]},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("acos",{number:function(r){return r>=-1&&1>=r||t.predictable?Math.acos(r):new e.Complex(r,0).acos()},Complex:function(e){return e.acos()},BigNumber:function(e){return e.acos()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\cos^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="acos",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("acosh",{number:function(r){return r>=1||t.predictable?a(r):-1>=r?new e.Complex(Math.log(Math.sqrt(r*r-1)-r),Math.PI):new e.Complex(r,0).acosh()},Complex:function(e){return e.acosh()},BigNumber:function(e){return e.acosh()},"Array | Matrix":function(e){return i(e,o)}});return o.toTex={1:"\\cosh^{-1}\\left(${args[0]}\\right)"},o}var i=r(19),a=Math.acosh||function(e){return Math.log(Math.sqrt(e*e-1)+e)};t.name="acosh",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("acot",{number:function(e){return Math.atan(1/e)},Complex:function(e){return e.acot()},BigNumber:function(t){return new e.BigNumber(1).div(t).atan()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\cot^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="acot",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("acoth",{number:function(r){return r>=1||-1>=r||t.predictable?isFinite(r)?(Math.log((r+1)/r)+Math.log(r/(r-1)))/2:0:new e.Complex(r,0).acoth()},Complex:function(e){return e.acoth()},BigNumber:function(t){return new e.BigNumber(1).div(t).atanh()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\coth^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="acoth",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("acsc",{number:function(r){return-1>=r||r>=1||t.predictable?Math.asin(1/r):new e.Complex(r,0).acsc()},Complex:function(e){return e.acsc()},BigNumber:function(t){return new e.BigNumber(1).div(t).asin()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\csc^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="acsc",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("acsch",{number:function(e){return e=1/e,Math.log(e+Math.sqrt(e*e+1))},Complex:function(e){return e.acsch()},BigNumber:function(t){return new e.BigNumber(1).div(t).asinh()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\mathrm{csch}^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="acsch",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("asec",{number:function(r){return-1>=r||r>=1||t.predictable?Math.acos(1/r):new e.Complex(r,0).asec()},Complex:function(e){return e.asec()},BigNumber:function(t){return new e.BigNumber(1).div(t).acos()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\sec^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="asec",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=(a.find(n(r(461)),["Complex"]),a("asech",{number:function(r){if(1>=r&&r>=-1||t.predictable){r=1/r;var n=Math.sqrt(r*r-1);return r>0||t.predictable?Math.log(n+r):new e.Complex(Math.log(n-r),Math.PI)}return new e.Complex(r,0).asech()},Complex:function(e){return e.asech()},BigNumber:function(t){return new e.BigNumber(1).div(t).acosh()},"Array | Matrix":function(e){return i(e,o)}}));return o.toTex={1:"\\mathrm{sech}^{-1}\\left(${args[0]}\\right)"},o}var i=r(19);t.name="asech",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("asin",{number:function(r){return r>=-1&&1>=r||t.predictable?Math.asin(r):new e.Complex(r,0).asin()},Complex:function(e){return e.asin()},BigNumber:function(e){return e.asin()},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\sin^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="asin",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("asinh",{number:Math.asinh||function(e){return Math.log(Math.sqrt(e*e+1)+e)},Complex:function(e){return e.asinh()},BigNumber:function(e){return e.asinh()},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\sinh^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="asinh",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("atan",{number:function(e){return Math.atan(e)},Complex:function(e){return e.atan()},BigNumber:function(e){return e.atan()},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\tan^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="atan",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(360)),s=n(r(61)),u=n(r(362)),c=n(r(85)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=i("atan2",{"number, number":Math.atan2,"BigNumber, BigNumber":function(t,r){return e.BigNumber.atan2(t,r)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=u(e,t,h,!1);break;default:r=o(t,e,h,!0)}break;default:switch(t.storage()){case"sparse":r=s(e,t,h,!1);break;default:r=l(e,t,h)}}return r},"Array, Array":function(e,t){return h(a(e),a(t)).valueOf()},"Array, Matrix":function(e,t){return h(a(e),t)},"Matrix, Array":function(e,t){return h(e,a(t))},"Matrix, number | BigNumber":function(e,t){var r;switch(e.storage()){case"sparse":r=c(e,t,h,!1);break;default:r=p(e,t,h,!1)}return r},"number | BigNumber, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,h,!0);break;default:r=p(t,e,h,!0)}return r},"Array, number | BigNumber":function(e,t){return p(a(e),t,h,!1).valueOf()},"number | BigNumber, Array":function(e,t){return p(a(t),e,h,!0).valueOf()}});return h.toTex={2:"\\mathrm{atan2}\\left(${args}\\right)"},h}t.name="atan2",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("atanh",{number:function(r){return 1>=r&&r>=-1||t.predictable?a(r):new e.Complex(r,0).atanh()},Complex:function(e){return e.atanh()},BigNumber:function(e){return e.atanh()},"Array | Matrix":function(e){return i(e,o,!0)}});return o.toTex={1:"\\tanh^{-1}\\left(${args[0]}\\right)"},o}var i=r(19),a=Math.atanh||function(e){return Math.log((1+e)/(1-e))/2};t.name="atanh",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("cos",{number:Math.cos,Complex:function(e){return e.cos()},BigNumber:function(e){return e.cos()},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cos is no angle");return a(t.value)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\cos\\left(${args[0]}\\right)"},a}var i=r(19);t.name="cos",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("cosh",{number:a,Complex:function(e){return e.cosh()},BigNumber:function(e){return e.cosh()},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cosh is no angle");return o(t.value)},"Array | Matrix":function(e){return i(e,o)}});return o.toTex={1:"\\cosh\\left(${args[0]}\\right)"},o}var i=r(19),a=Math.cosh||function(e){return(Math.exp(e)+Math.exp(-e))/2};t.name="cosh",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("cot",{number:function(e){return 1/Math.tan(e)},Complex:function(e){return e.cot()},BigNumber:function(t){return new e.BigNumber(1).div(t.tan())},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cot is no angle");return a(t.value)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\cot\\left(${args[0]}\\right)"},a}var i=r(19);t.name="cot",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("coth",{number:i,Complex:function(e){return e.coth()},BigNumber:function(t){return new e.BigNumber(1).div(t.tanh())},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function coth is no angle");return o(t.value)},"Array | Matrix":function(e){return a(e,o)}});return o.toTex={1:"\\coth\\left(${args[0]}\\right)"},o}function i(e){var t=Math.exp(2*e);return(t+1)/(t-1)}var a=r(19);t.name="coth",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("csc",{number:function(e){return 1/Math.sin(e)},Complex:function(e){return e.csc()},BigNumber:function(t){return new e.BigNumber(1).div(t.sin())},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function csc is no angle");return a(t.value)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\csc\\left(${args[0]}\\right)"},a}var i=r(19);t.name="csc",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("csch",{number:i,Complex:function(e){return e.csch()},BigNumber:function(t){return new e.BigNumber(1).div(t.sinh())},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function csch is no angle");return o(t.value)},"Array | Matrix":function(e){return a(e,o)}});return o.toTex={1:"\\mathrm{csch}\\left(${args[0]}\\right)"},o}function i(e){return 0==e?Number.POSITIVE_INFINITY:Math.abs(2/(Math.exp(e)-Math.exp(-e)))*o(e)}var a=r(19),o=r(6).sign;t.name="csch",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("sec",{number:function(e){return 1/Math.cos(e)},Complex:function(e){return e.sec()},BigNumber:function(t){return new e.BigNumber(1).div(t.cos())},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sec is no angle");return a(t.value)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\sec\\left(${args[0]}\\right)"},a}var i=r(19);t.name="sec",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("sech",{number:i,Complex:function(e){return e.sech()},BigNumber:function(t){return new e.BigNumber(1).div(t.cosh())},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sech is no angle");return o(t.value)},"Array | Matrix":function(e){return a(e,o)}});return o.toTex={1:"\\mathrm{sech}\\left(${args[0]}\\right)"},o}function i(e){return 2/(Math.exp(e)+Math.exp(-e))}var a=r(19);t.name="sech",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("sin",{number:Math.sin,Complex:function(e){return e.sin()},BigNumber:function(e){return e.sin()},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sin is no angle");return a(t.value)},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\sin\\left(${args[0]}\\right)"},a}var i=r(19);t.name="sin",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("sinh",{number:a,Complex:function(e){return e.sinh()},BigNumber:function(e){return e.sinh()},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sinh is no angle");return o(t.value)},"Array | Matrix":function(e){return i(e,o,!0)}});return o.toTex={1:"\\sinh\\left(${args[0]}\\right)"},o}var i=r(19),a=Math.sinh||function(e){return(Math.exp(e)-Math.exp(-e))/2};t.name="sinh",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("tan",{number:Math.tan,Complex:function(e){return e.tan()},BigNumber:function(e){return e.tan()},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function tan is no angle");return a(t.value)},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\tan\\left(${args[0]}\\right)"},a}var i=r(19);t.name="tan",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("tanh",{number:a,Complex:function(e){return e.tanh()},BigNumber:function(e){return e.tanh()},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function tanh is no angle");return o(t.value)},"Array | Matrix":function(e){return i(e,o,!0)}});return o.toTex={1:"\\tanh\\left(${args[0]}\\right)"},o}var i=r(19),a=Math.tanh||function(e){var t=Math.exp(2*e);return(t-1)/(t+1)};t.name="tanh",t.factory=n},function(e,t,r){e.exports=[r(486)]},function(e,t,r){"use strict";function n(e,t,n,i){var a=r(32),o=n(r(52)),s=n(r(57)),u=n(r(58)),c=i("to",{"Unit, Unit | string":function(e,t){return e.to(t)},"Matrix, Matrix":function(e,t){return s(e,t,c)},"Array, Array":function(e,t){return c(o(e),o(t)).valueOf();
},"Array, Matrix":function(e,t){return c(o(e),t)},"Matrix, Array":function(e,t){return c(e,o(t))},"Matrix, any":function(e,t){return u(e,t,c,!1)},"any, Matrix":function(e,t){return u(t,e,c,!0)},"Array, any":function(e,t){return u(o(e),t,c,!1).valueOf()},"any, Array":function(e,t){return u(o(t),e,c,!0).valueOf()}});return c.toTex={2:"\\left(${args[0]}"+a.operators.to+"${args[1]}\\right)"},c}t.name="to",t.factory=n},function(e,t,r){e.exports=[r(488),r(408),r(356),r(88),r(370),r(422),r(90)]},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("clone",{any:i.clone});return a.toTex=void 0,a}var i=r(3);t.name="clone",t.factory=n},function(e,t,r){e.exports=[r(490)]},function(e,t){"use strict";function r(e,t,r,n){return function(t,r){var n=e[r&&r.mathjs];return n&&"function"==typeof n.fromJSON?n.fromJSON(r):r}}t.name="reviver",t.path="json",t.factory=r},function(e,t,r){"use strict";var n=r(11),i=r(42),a=r(43);e.exports=[{name:"ArgumentsError",path:"error",factory:function(){return n}},{name:"DimensionError",path:"error",factory:function(){return i}},{name:"IndexError",path:"error",factory:function(){return a}}]}])});
//# sourceMappingURL=math.map
Math.toDegrees = function(angleInRadians){
  return angleInRadians * (180/Math.PI)
}

Math.toRadians = function(angleInDegrees){
  return angleInDegrees * (Math.PI/180)
}

Math.crossProduct = function(x, y){
  [
    x[1]*y[2]-x[2]*y[1],
    x[2]*y[0]-x[0]*y[2],
    x[0]*y[1]-x[1]*y[0]
  ]
}

Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
}

Math.cosh = Math.cosh || function(x) {
  return (Math.exp(x) + Math.exp(-x)) / 2;
}

Math.sinh = Math.sinh || function(x) {
  return (Math.exp(x) - Math.exp(-x)) / 2;
};
/*!
 * numeral.js
 * version : 1.5.3
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */
(function(){function a(a){this._value=a}function b(a,b,c,d){var e,f,g=Math.pow(10,b);return f=(c(a*g)/g).toFixed(b),d&&(e=new RegExp("0{1,"+d+"}$"),f=f.replace(e,"")),f}function c(a,b,c){var d;return d=b.indexOf("$")>-1?e(a,b,c):b.indexOf("%")>-1?f(a,b,c):b.indexOf(":")>-1?g(a,b):i(a._value,b,c)}function d(a,b){var c,d,e,f,g,i=b,j=["KB","MB","GB","TB","PB","EB","ZB","YB"],k=!1;if(b.indexOf(":")>-1)a._value=h(b);else if(b===q)a._value=0;else{for("."!==o[p].delimiters.decimal&&(b=b.replace(/\./g,"").replace(o[p].delimiters.decimal,".")),c=new RegExp("[^a-zA-Z]"+o[p].abbreviations.thousand+"(?:\\)|(\\"+o[p].currency.symbol+")?(?:\\))?)?$"),d=new RegExp("[^a-zA-Z]"+o[p].abbreviations.million+"(?:\\)|(\\"+o[p].currency.symbol+")?(?:\\))?)?$"),e=new RegExp("[^a-zA-Z]"+o[p].abbreviations.billion+"(?:\\)|(\\"+o[p].currency.symbol+")?(?:\\))?)?$"),f=new RegExp("[^a-zA-Z]"+o[p].abbreviations.trillion+"(?:\\)|(\\"+o[p].currency.symbol+")?(?:\\))?)?$"),g=0;g<=j.length&&!(k=b.indexOf(j[g])>-1?Math.pow(1024,g+1):!1);g++);a._value=(k?k:1)*(i.match(c)?Math.pow(10,3):1)*(i.match(d)?Math.pow(10,6):1)*(i.match(e)?Math.pow(10,9):1)*(i.match(f)?Math.pow(10,12):1)*(b.indexOf("%")>-1?.01:1)*((b.split("-").length+Math.min(b.split("(").length-1,b.split(")").length-1))%2?1:-1)*Number(b.replace(/[^0-9\.]+/g,"")),a._value=k?Math.ceil(a._value):a._value}return a._value}function e(a,b,c){var d,e,f=b.indexOf("$"),g=b.indexOf("("),h=b.indexOf("-"),j="";return b.indexOf(" $")>-1?(j=" ",b=b.replace(" $","")):b.indexOf("$ ")>-1?(j=" ",b=b.replace("$ ","")):b=b.replace("$",""),e=i(a._value,b,c),1>=f?e.indexOf("(")>-1||e.indexOf("-")>-1?(e=e.split(""),d=1,(g>f||h>f)&&(d=0),e.splice(d,0,o[p].currency.symbol+j),e=e.join("")):e=o[p].currency.symbol+j+e:e.indexOf(")")>-1?(e=e.split(""),e.splice(-1,0,j+o[p].currency.symbol),e=e.join("")):e=e+j+o[p].currency.symbol,e}function f(a,b,c){var d,e="",f=100*a._value;return b.indexOf(" %")>-1?(e=" ",b=b.replace(" %","")):b=b.replace("%",""),d=i(f,b,c),d.indexOf(")")>-1?(d=d.split(""),d.splice(-1,0,e+"%"),d=d.join("")):d=d+e+"%",d}function g(a){var b=Math.floor(a._value/60/60),c=Math.floor((a._value-60*b*60)/60),d=Math.round(a._value-60*b*60-60*c);return b+":"+(10>c?"0"+c:c)+":"+(10>d?"0"+d:d)}function h(a){var b=a.split(":"),c=0;return 3===b.length?(c+=60*Number(b[0])*60,c+=60*Number(b[1]),c+=Number(b[2])):2===b.length&&(c+=60*Number(b[0]),c+=Number(b[1])),Number(c)}function i(a,c,d){var e,f,g,h,i,j,k=!1,l=!1,m=!1,n="",r=!1,s=!1,t=!1,u=!1,v=!1,w="",x="",y=Math.abs(a),z=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],A="",B=!1;if(0===a&&null!==q)return q;if(c.indexOf("(")>-1?(k=!0,c=c.slice(1,-1)):c.indexOf("+")>-1&&(l=!0,c=c.replace(/\+/g,"")),c.indexOf("a")>-1&&(r=c.indexOf("aK")>=0,s=c.indexOf("aM")>=0,t=c.indexOf("aB")>=0,u=c.indexOf("aT")>=0,v=r||s||t||u,c.indexOf(" a")>-1?(n=" ",c=c.replace(" a","")):c=c.replace("a",""),y>=Math.pow(10,12)&&!v||u?(n+=o[p].abbreviations.trillion,a/=Math.pow(10,12)):y<Math.pow(10,12)&&y>=Math.pow(10,9)&&!v||t?(n+=o[p].abbreviations.billion,a/=Math.pow(10,9)):y<Math.pow(10,9)&&y>=Math.pow(10,6)&&!v||s?(n+=o[p].abbreviations.million,a/=Math.pow(10,6)):(y<Math.pow(10,6)&&y>=Math.pow(10,3)&&!v||r)&&(n+=o[p].abbreviations.thousand,a/=Math.pow(10,3))),c.indexOf("b")>-1)for(c.indexOf(" b")>-1?(w=" ",c=c.replace(" b","")):c=c.replace("b",""),g=0;g<=z.length;g++)if(e=Math.pow(1024,g),f=Math.pow(1024,g+1),a>=e&&f>a){w+=z[g],e>0&&(a/=e);break}return c.indexOf("o")>-1&&(c.indexOf(" o")>-1?(x=" ",c=c.replace(" o","")):c=c.replace("o",""),x+=o[p].ordinal(a)),c.indexOf("[.]")>-1&&(m=!0,c=c.replace("[.]",".")),h=a.toString().split(".")[0],i=c.split(".")[1],j=c.indexOf(","),i?(i.indexOf("[")>-1?(i=i.replace("]",""),i=i.split("["),A=b(a,i[0].length+i[1].length,d,i[1].length)):A=b(a,i.length,d),h=A.split(".")[0],A=A.split(".")[1].length?o[p].delimiters.decimal+A.split(".")[1]:"",m&&0===Number(A.slice(1))&&(A="")):h=b(a,null,d),h.indexOf("-")>-1&&(h=h.slice(1),B=!0),j>-1&&(h=h.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+o[p].delimiters.thousands)),0===c.indexOf(".")&&(h=""),(k&&B?"(":"")+(!k&&B?"-":"")+(!B&&l?"+":"")+h+A+(x?x:"")+(n?n:"")+(w?w:"")+(k&&B?")":"")}function j(a,b){o[a]=b}function k(a){var b=a.toString().split(".");return b.length<2?1:Math.pow(10,b[1].length)}function l(){var a=Array.prototype.slice.call(arguments);return a.reduce(function(a,b){var c=k(a),d=k(b);return c>d?c:d},-1/0)}var m,n="1.5.3",o={},p="en",q=null,r="0,0",s="undefined"!=typeof module&&module.exports;m=function(b){return m.isNumeral(b)?b=b.value():0===b||"undefined"==typeof b?b=0:Number(b)||(b=m.fn.unformat(b)),new a(Number(b))},m.version=n,m.isNumeral=function(b){return b instanceof a},m.language=function(a,b){if(!a)return p;if(a&&!b){if(!o[a])throw new Error("Unknown language : "+a);p=a}return(b||!o[a])&&j(a,b),m},m.languageData=function(a){if(!a)return o[p];if(!o[a])throw new Error("Unknown language : "+a);return o[a]},m.language("en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(a){var b=a%10;return 1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th"},currency:{symbol:"$"}}),m.zeroFormat=function(a){q="string"==typeof a?a:null},m.defaultFormat=function(a){r="string"==typeof a?a:"0.0"},"function"!=typeof Array.prototype.reduce&&(Array.prototype.reduce=function(a,b){"use strict";if(null===this||"undefined"==typeof this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof a)throw new TypeError(a+" is not a function");var c,d,e=this.length>>>0,f=!1;for(1<arguments.length&&(d=b,f=!0),c=0;e>c;++c)this.hasOwnProperty(c)&&(f?d=a(d,this[c],c,this):(d=this[c],f=!0));if(!f)throw new TypeError("Reduce of empty array with no initial value");return d}),m.fn=a.prototype={clone:function(){return m(this)},format:function(a,b){return c(this,a?a:r,void 0!==b?b:Math.round)},unformat:function(a){return"[object Number]"===Object.prototype.toString.call(a)?a:d(this,a?a:r)},value:function(){return this._value},valueOf:function(){return this._value},set:function(a){return this._value=Number(a),this},add:function(a){function b(a,b){return a+c*b}var c=l.call(null,this._value,a);return this._value=[this._value,a].reduce(b,0)/c,this},subtract:function(a){function b(a,b){return a-c*b}var c=l.call(null,this._value,a);return this._value=[a].reduce(b,this._value*c)/c,this},multiply:function(a){function b(a,b){var c=l(a,b);return a*c*b*c/(c*c)}return this._value=[this._value,a].reduce(b,1),this},divide:function(a){function b(a,b){var c=l(a,b);return a*c/(b*c)}return this._value=[this._value,a].reduce(b),this},difference:function(a){return Math.abs(m(this._value).subtract(a).value())}},s&&(module.exports=m),"undefined"==typeof ender&&(this.numeral=m),"function"==typeof define&&define.amd&&define([],function(){return m})}).call(this);
// Extracted Richard Bunt's work in Telemachus: https://github.com/richardbunt/Telemachus/blob/master/WebPages/WebPages/src/console.js

var TimeFormatters = {
  formatUT: function(t){
    var day, year;
    if (t == null) {
      t = 0;
    }
    year = ((t / (365 * 24 * 3600)) | 0) + 1;
    t %= 365 * 24 * 3600;
    day = ((t / (24 * 3600)) | 0) + 1;
    t %= 24 * 3600;
    return "Year " + year + ", Day " + day + ", " + (this.hourMinSec(t)) + " UT";
  },

  formatMET: function(t){
    var result;
    if (t == null) {
      t = 0;
    }
    result = "T+";
    if (t >= 365 * 24 * 3600) {
      result += (t / (365 * 24 * 3600) | 0) + ":";
      t %= 365 * 24 * 3600;
      if (t < 24 * 3600) {
        result += "0:";
      }
    }
    if (t >= 24 * 3600) {
      result += (t / (24 * 3600) | 0) + ":";
    }
    t %= 24 * 3600;
    return result + this.hourMinSec(t) + " MET";
  },

  hourMinSec: function(t) {
    var hour, min, sec;
    if (t == null) {
      t = 0;
    }
    hour = (t / 3600) | 0;
    if (hour < 10) {
      hour = "0" + hour;
    }
    t %= 3600;
    min = (t / 60) | 0;
    if (min < 10) {
      min = "0" + min;
    }
    sec = (t % 60 | 0).toFixed();
    if (sec < 10) {
      sec = "0" + sec;
    }
    return "" + hour + ":" + min + ":" + sec;
  },

  durationString: function(t) {
    var result;
    if (t == null) {
      t = 0;
    }
    result = t < 0 ? "-" : "";
    t = Math.abs(t);
    if (t >= 365 * 24 * 3600) {
      result += (t / (365 * 24 * 3600) | 0) + " years ";
      t %= 365 * 24 * 3600;
      if (t < 24 * 3600) {
        result += "0 days ";
      }
    }
    if (t >= 24 * 3600) {
      result += (t / (24 * 3600) | 0) + " days ";
    }
    t %= 24 * 3600;
    return result + this.hourMinSec(t);
  }
}
var DataFormatters = {
  distanceString: function(value){
    return numeral(value).format('0,0.000 a') + "m"
  },

  heightFromTerrainString: function(value){
    if(value <= -1 ){ return "NA" }
    return numeral(value).format('0,0.000 a') + "m"
  },

  degreeString: function(value){
    return numeral(value).format('0.000') + "&deg;"
  },

  velocityString: function(value){
    return numeral(value).format('0,0.000 a') + "m/s"
  },

  temperatureString: function(value){
    if(!value){return "NA"}
    return numeral(value).format('0,000') + "&deg;C"
  },

  accelerationSensorString: function(value){
    if(value[0] == "No Sensors of the Appropriate Type"){return "NA"}
    return numeral(value[1][0]).format('0,000') + "G"
  },

  pressureSensorString: function(value){
    if(value[0] == "No Sensors of the Appropriate Type"){return "NA"}
    return numeral(value[1][0]).format('0,000') + "Pa"
  },

  gravitySensorString: function(value){
    if(value[0] == "No Sensors of the Appropriate Type"){return "NA"}
    return numeral(value[1][0]).format('0,000 a') + "m/s&sup2;"
  },

  newtonsString: function(value){
    return numeral(value).format('0,0.00') + " N"
  },

  percentageString: function(value){
    return numeral(value).format("0%")
  },

  tonnageString: function(value){
    return numeral(value).format("0,0.00") + " t"
  },

  timeString: function(value){
    return numeral(value).format('00:00:00')
  },

  plainNumberString: function(value){
    return numeral(value).format("0,0.00")
  }
}
/*  Prototype JavaScript framework, version 1.7.2
 *  (c) 2005-2010 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/

var Prototype = {

  Version: '1.7.2',

  Browser: (function(){
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE:             !!window.attachEvent && !isOpera,
      Opera:          isOpera,
      WebKit:         ua.indexOf('AppleWebKit/') > -1,
      Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari:   /Apple.*Mobile/.test(ua)
    }
  })(),

  BrowserFeatures: {
    XPath: !!document.evaluate,

    SelectorsAPI: !!document.querySelector,

    ElementExtensions: (function() {
      var constructor = window.Element || window.HTMLElement;
      return !!(constructor && constructor.prototype);
    })(),
    SpecificElementExtensions: (function() {
      if (typeof window.HTMLDivElement !== 'undefined')
        return true;

      var div = document.createElement('div'),
          form = document.createElement('form'),
          isSupported = false;

      if (div['__proto__'] && (div['__proto__'] !== form['__proto__'])) {
        isSupported = true;
      }

      div = form = null;

      return isSupported;
    })()
  },

  ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script\\s*>',
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

  emptyFunction: function() { },

  K: function(x) { return x }
};

if (Prototype.Browser.MobileSafari)
  Prototype.BrowserFeatures.SpecificElementExtensions = false;
/* Based on Alex Arnell's inheritance implementation. */

var Class = (function() {

  var IS_DONTENUM_BUGGY = (function(){
    for (var p in { toString: 1 }) {
      if (p === 'toString') return false;
    }
    return true;
  })();

  function subclass() {};
  function create() {
    var parent = null, properties = $A(arguments);
    if (Object.isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    Object.extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

    for (var i = 0, length = properties.length; i < length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = Prototype.emptyFunction;

    klass.prototype.constructor = klass;
    return klass;
  }

  function addMethods(source) {
    var ancestor   = this.superclass && this.superclass.prototype,
        properties = Object.keys(source);

    if (IS_DONTENUM_BUGGY) {
      if (source.toString != Object.prototype.toString)
        properties.push("toString");
      if (source.valueOf != Object.prototype.valueOf)
        properties.push("valueOf");
    }

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i], value = source[property];
      if (ancestor && Object.isFunction(value) &&
          value.argumentNames()[0] == "$super") {
        var method = value;
        value = (function(m) {
          return function() { return ancestor[m].apply(this, arguments); };
        })(property).wrap(method);

        value.valueOf = (function(method) {
          return function() { return method.valueOf.call(method); };
        })(method);

        value.toString = (function(method) {
          return function() { return method.toString.call(method); };
        })(method);
      }
      this.prototype[property] = value;
    }

    return this;
  }

  return {
    create: create,
    Methods: {
      addMethods: addMethods
    }
  };
})();
(function() {

  var _toString = Object.prototype.toString,
      _hasOwnProperty = Object.prototype.hasOwnProperty,
      NULL_TYPE = 'Null',
      UNDEFINED_TYPE = 'Undefined',
      BOOLEAN_TYPE = 'Boolean',
      NUMBER_TYPE = 'Number',
      STRING_TYPE = 'String',
      OBJECT_TYPE = 'Object',
      FUNCTION_CLASS = '[object Function]',
      BOOLEAN_CLASS = '[object Boolean]',
      NUMBER_CLASS = '[object Number]',
      STRING_CLASS = '[object String]',
      ARRAY_CLASS = '[object Array]',
      DATE_CLASS = '[object Date]',
      NATIVE_JSON_STRINGIFY_SUPPORT = window.JSON &&
        typeof JSON.stringify === 'function' &&
        JSON.stringify(0) === '0' &&
        typeof JSON.stringify(Prototype.K) === 'undefined';



  var DONT_ENUMS = ['toString', 'toLocaleString', 'valueOf',
   'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

  var IS_DONTENUM_BUGGY = (function(){
    for (var p in { toString: 1 }) {
      if (p === 'toString') return false;
    }
    return true;
  })();

  function Type(o) {
    switch(o) {
      case null: return NULL_TYPE;
      case (void 0): return UNDEFINED_TYPE;
    }
    var type = typeof o;
    switch(type) {
      case 'boolean': return BOOLEAN_TYPE;
      case 'number':  return NUMBER_TYPE;
      case 'string':  return STRING_TYPE;
    }
    return OBJECT_TYPE;
  }

  function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
  }

  function inspect(object) {
    try {
      if (isUndefined(object)) return 'undefined';
      if (object === null) return 'null';
      return object.inspect ? object.inspect() : String(object);
    } catch (e) {
      if (e instanceof RangeError) return '...';
      throw e;
    }
  }

  function toJSON(value) {
    return Str('', { '': value }, []);
  }

  function Str(key, holder, stack) {
    var value = holder[key];
    if (Type(value) === OBJECT_TYPE && typeof value.toJSON === 'function') {
      value = value.toJSON(key);
    }

    var _class = _toString.call(value);

    switch (_class) {
      case NUMBER_CLASS:
      case BOOLEAN_CLASS:
      case STRING_CLASS:
        value = value.valueOf();
    }

    switch (value) {
      case null: return 'null';
      case true: return 'true';
      case false: return 'false';
    }

    var type = typeof value;
    switch (type) {
      case 'string':
        return value.inspect(true);
      case 'number':
        return isFinite(value) ? String(value) : 'null';
      case 'object':

        for (var i = 0, length = stack.length; i < length; i++) {
          if (stack[i] === value) {
            throw new TypeError("Cyclic reference to '" + value + "' in object");
          }
        }
        stack.push(value);

        var partial = [];
        if (_class === ARRAY_CLASS) {
          for (var i = 0, length = value.length; i < length; i++) {
            var str = Str(i, value, stack);
            partial.push(typeof str === 'undefined' ? 'null' : str);
          }
          partial = '[' + partial.join(',') + ']';
        } else {
          var keys = Object.keys(value);
          for (var i = 0, length = keys.length; i < length; i++) {
            var key = keys[i], str = Str(key, value, stack);
            if (typeof str !== "undefined") {
               partial.push(key.inspect(true)+ ':' + str);
             }
          }
          partial = '{' + partial.join(',') + '}';
        }
        stack.pop();
        return partial;
    }
  }

  function stringify(object) {
    return JSON.stringify(object);
  }

  function toQueryString(object) {
    return $H(object).toQueryString();
  }

  function toHTML(object) {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
  }

  function keys(object) {
    if (Type(object) !== OBJECT_TYPE) { throw new TypeError(); }
    var results = [];
    for (var property in object) {
      if (_hasOwnProperty.call(object, property))
        results.push(property);
    }

    if (IS_DONTENUM_BUGGY) {
      for (var i = 0; property = DONT_ENUMS[i]; i++) {
        if (_hasOwnProperty.call(object, property))
          results.push(property);
      }
    }

    return results;
  }

  function values(object) {
    var results = [];
    for (var property in object)
      results.push(object[property]);
    return results;
  }

  function clone(object) {
    return extend({ }, object);
  }

  function isElement(object) {
    return !!(object && object.nodeType == 1);
  }

  function isArray(object) {
    return _toString.call(object) === ARRAY_CLASS;
  }

  var hasNativeIsArray = (typeof Array.isArray == 'function')
    && Array.isArray([]) && !Array.isArray({});

  if (hasNativeIsArray) {
    isArray = Array.isArray;
  }

  function isHash(object) {
    return object instanceof Hash;
  }

  function isFunction(object) {
    return _toString.call(object) === FUNCTION_CLASS;
  }

  function isString(object) {
    return _toString.call(object) === STRING_CLASS;
  }

  function isNumber(object) {
    return _toString.call(object) === NUMBER_CLASS;
  }

  function isDate(object) {
    return _toString.call(object) === DATE_CLASS;
  }

  function isUndefined(object) {
    return typeof object === "undefined";
  }

  extend(Object, {
    extend:        extend,
    inspect:       inspect,
    toJSON:        NATIVE_JSON_STRINGIFY_SUPPORT ? stringify : toJSON,
    toQueryString: toQueryString,
    toHTML:        toHTML,
    keys:          Object.keys || keys,
    values:        values,
    clone:         clone,
    isElement:     isElement,
    isArray:       isArray,
    isHash:        isHash,
    isFunction:    isFunction,
    isString:      isString,
    isNumber:      isNumber,
    isDate:        isDate,
    isUndefined:   isUndefined
  });
})();
Object.extend(Function.prototype, (function() {
  var slice = Array.prototype.slice;

  function update(array, args) {
    var arrayLength = array.length, length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
  }

  function merge(array, args) {
    array = slice.call(array, 0);
    return update(array, args);
  }

  function argumentNames() {
    var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
      .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
      .replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
  }


  function bind(context) {
    if (arguments.length < 2 && Object.isUndefined(arguments[0]))
      return this;

    if (!Object.isFunction(this))
      throw new TypeError("The object is not callable.");

    var nop = function() {};
    var __method = this, args = slice.call(arguments, 1);

    var bound = function() {
      var a = merge(args, arguments);
      var c = this instanceof bound ? this : context;
      return __method.apply(c, a);
    };

    nop.prototype   = this.prototype;
    bound.prototype = new nop();

    return bound;
  }

  function bindAsEventListener(context) {
    var __method = this, args = slice.call(arguments, 1);
    return function(event) {
      var a = update([event || window.event], args);
      return __method.apply(context, a);
    }
  }

  function curry() {
    if (!arguments.length) return this;
    var __method = this, args = slice.call(arguments, 0);
    return function() {
      var a = merge(args, arguments);
      return __method.apply(this, a);
    }
  }

  function delay(timeout) {
    var __method = this, args = slice.call(arguments, 1);
    timeout = timeout * 1000;
    return window.setTimeout(function() {
      return __method.apply(__method, args);
    }, timeout);
  }

  function defer() {
    var args = update([0.01], arguments);
    return this.delay.apply(this, args);
  }

  function wrap(wrapper) {
    var __method = this;
    return function() {
      var a = update([__method.bind(this)], arguments);
      return wrapper.apply(this, a);
    }
  }

  function methodize() {
    if (this._methodized) return this._methodized;
    var __method = this;
    return this._methodized = function() {
      var a = update([this], arguments);
      return __method.apply(null, a);
    };
  }

  var extensions = {
    argumentNames:       argumentNames,
    bindAsEventListener: bindAsEventListener,
    curry:               curry,
    delay:               delay,
    defer:               defer,
    wrap:                wrap,
    methodize:           methodize
  };

  if (!Function.prototype.bind)
    extensions.bind = bind;

  return extensions;
})());



(function(proto) {


  function toISOString() {
    return this.getUTCFullYear() + '-' +
      (this.getUTCMonth() + 1).toPaddedString(2) + '-' +
      this.getUTCDate().toPaddedString(2) + 'T' +
      this.getUTCHours().toPaddedString(2) + ':' +
      this.getUTCMinutes().toPaddedString(2) + ':' +
      this.getUTCSeconds().toPaddedString(2) + 'Z';
  }


  function toJSON() {
    return this.toISOString();
  }

  if (!proto.toISOString) proto.toISOString = toISOString;
  if (!proto.toJSON) proto.toJSON = toJSON;

})(Date.prototype);


RegExp.prototype.match = RegExp.prototype.test;

RegExp.escape = function(str) {
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};
var PeriodicalExecuter = Class.create({
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  execute: function() {
    this.callback(this);
  },

  stop: function() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  },

  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.execute();
        this.currentlyExecuting = false;
      } catch(e) {
        this.currentlyExecuting = false;
        throw e;
      }
    }
  }
});
Object.extend(String, {
  interpret: function(value) {
    return value == null ? '' : String(value);
  },
  specialChar: {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '\\': '\\\\'
  }
});

Object.extend(String.prototype, (function() {
  var NATIVE_JSON_PARSE_SUPPORT = window.JSON &&
    typeof JSON.parse === 'function' &&
    JSON.parse('{"test": true}').test;

  function prepareReplacement(replacement) {
    if (Object.isFunction(replacement)) return replacement;
    var template = new Template(replacement);
    return function(match) { return template.evaluate(match) };
  }

  function isNonEmptyRegExp(regexp) {
    return regexp.source && regexp.source !== '(?:)';
  }


  function gsub(pattern, replacement) {
    var result = '', source = this, match;
    replacement = prepareReplacement(replacement);

    if (Object.isString(pattern))
      pattern = RegExp.escape(pattern);

    if (!(pattern.length || isNonEmptyRegExp(pattern))) {
      replacement = replacement('');
      return replacement + source.split('').join(replacement) + replacement;
    }

    while (source.length > 0) {
      match = source.match(pattern)
      if (match && match[0].length > 0) {
        result += source.slice(0, match.index);
        result += String.interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;
  }

  function sub(pattern, replacement, count) {
    replacement = prepareReplacement(replacement);
    count = Object.isUndefined(count) ? 1 : count;

    return this.gsub(pattern, function(match) {
      if (--count < 0) return match[0];
      return replacement(match);
    });
  }

  function scan(pattern, iterator) {
    this.gsub(pattern, iterator);
    return String(this);
  }

  function truncate(length, truncation) {
    length = length || 30;
    truncation = Object.isUndefined(truncation) ? '...' : truncation;
    return this.length > length ?
      this.slice(0, length - truncation.length) + truncation : String(this);
  }

  function strip() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  }

  function stripTags() {
    return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
  }

  function stripScripts() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  }

  function extractScripts() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img'),
        matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  }

  function evalScripts() {
    return this.extractScripts().map(function(script) { return eval(script); });
  }

  function escapeHTML() {
    return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function unescapeHTML() {
    return this.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  }


  function toQueryParams(separator) {
    var match = this.strip().match(/([^?#]*)(#.*)?$/);
    if (!match) return { };

    return match[1].split(separator || '&').inject({ }, function(hash, pair) {
      if ((pair = pair.split('='))[0]) {
        var key = decodeURIComponent(pair.shift()),
            value = pair.length > 1 ? pair.join('=') : pair[0];

        if (value != undefined) {
          value = value.gsub('+', ' ');
          value = decodeURIComponent(value);
        }

        if (key in hash) {
          if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
          hash[key].push(value);
        }
        else hash[key] = value;
      }
      return hash;
    });
  }

  function toArray() {
    return this.split('');
  }

  function succ() {
    return this.slice(0, this.length - 1) +
      String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
  }

  function times(count) {
    return count < 1 ? '' : new Array(count + 1).join(this);
  }

  function camelize() {
    return this.replace(/-+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
  }

  function capitalize() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  }

  function underscore() {
    return this.replace(/::/g, '/')
               .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
               .replace(/([a-z\d])([A-Z])/g, '$1_$2')
               .replace(/-/g, '_')
               .toLowerCase();
  }

  function dasherize() {
    return this.replace(/_/g, '-');
  }

  function inspect(useDoubleQuotes) {
    var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character) {
      if (character in String.specialChar) {
        return String.specialChar[character];
      }
      return '\\u00' + character.charCodeAt().toPaddedString(2, 16);
    });
    if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
    return "'" + escapedString.replace(/'/g, '\\\'') + "'";
  }

  function unfilterJSON(filter) {
    return this.replace(filter || Prototype.JSONFilter, '$1');
  }

  function isJSON() {
    var str = this;
    if (str.blank()) return false;
    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
    return (/^[\],:{}\s]*$/).test(str);
  }

  function evalJSON(sanitize) {
    var json = this.unfilterJSON(),
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    if (cx.test(json)) {
      json = json.replace(cx, function (a) {
        return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      });
    }
    try {
      if (!sanitize || json.isJSON()) return eval('(' + json + ')');
    } catch (e) { }
    throw new SyntaxError('Badly formed JSON string: ' + this.inspect());
  }

  function parseJSON() {
    var json = this.unfilterJSON();
    return JSON.parse(json);
  }

  function include(pattern) {
    return this.indexOf(pattern) > -1;
  }

  function startsWith(pattern, position) {
    position = Object.isNumber(position) ? position : 0;
    return this.lastIndexOf(pattern, position) === position;
  }

  function endsWith(pattern, position) {
    pattern = String(pattern);
    position = Object.isNumber(position) ? position : this.length;
    if (position < 0) position = 0;
    if (position > this.length) position = this.length;
    var d = position - pattern.length;
    return d >= 0 && this.indexOf(pattern, d) === d;
  }

  function empty() {
    return this == '';
  }

  function blank() {
    return /^\s*$/.test(this);
  }

  function interpolate(object, pattern) {
    return new Template(this, pattern).evaluate(object);
  }

  return {
    gsub:           gsub,
    sub:            sub,
    scan:           scan,
    truncate:       truncate,
    strip:          String.prototype.trim || strip,
    stripTags:      stripTags,
    stripScripts:   stripScripts,
    extractScripts: extractScripts,
    evalScripts:    evalScripts,
    escapeHTML:     escapeHTML,
    unescapeHTML:   unescapeHTML,
    toQueryParams:  toQueryParams,
    parseQuery:     toQueryParams,
    toArray:        toArray,
    succ:           succ,
    times:          times,
    camelize:       camelize,
    capitalize:     capitalize,
    underscore:     underscore,
    dasherize:      dasherize,
    inspect:        inspect,
    unfilterJSON:   unfilterJSON,
    isJSON:         isJSON,
    evalJSON:       NATIVE_JSON_PARSE_SUPPORT ? parseJSON : evalJSON,
    include:        include,
    startsWith:     String.prototype.startsWith || startsWith,
    endsWith:       String.prototype.endsWith || endsWith,
    empty:          empty,
    blank:          blank,
    interpolate:    interpolate
  };
})());

var Template = Class.create({
  initialize: function(template, pattern) {
    this.template = template.toString();
    this.pattern = pattern || Template.Pattern;
  },

  evaluate: function(object) {
    if (object && Object.isFunction(object.toTemplateReplacements))
      object = object.toTemplateReplacements();

    return this.template.gsub(this.pattern, function(match) {
      if (object == null) return (match[1] + '');

      var before = match[1] || '';
      if (before == '\\') return match[2];

      var ctx = object, expr = match[3],
          pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;

      match = pattern.exec(expr);
      if (match == null) return before;

      while (match != null) {
        var comp = match[1].startsWith('[') ? match[2].replace(/\\\\]/g, ']') : match[1];
        ctx = ctx[comp];
        if (null == ctx || '' == match[3]) break;
        expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
        match = pattern.exec(expr);
      }

      return before + String.interpret(ctx);
    });
  }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

var $break = { };

var Enumerable = (function() {
  function each(iterator, context) {
    try {
      this._each(iterator, context);
    } catch (e) {
      if (e != $break) throw e;
    }
    return this;
  }

  function eachSlice(number, iterator, context) {
    var index = -number, slices = [], array = this.toArray();
    if (number < 1) return array;
    while ((index += number) < array.length)
      slices.push(array.slice(index, index+number));
    return slices.collect(iterator, context);
  }

  function all(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = true;
    this.each(function(value, index) {
      result = result && !!iterator.call(context, value, index, this);
      if (!result) throw $break;
    }, this);
    return result;
  }

  function any(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = false;
    this.each(function(value, index) {
      if (result = !!iterator.call(context, value, index, this))
        throw $break;
    }, this);
    return result;
  }

  function collect(iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];
    this.each(function(value, index) {
      results.push(iterator.call(context, value, index, this));
    }, this);
    return results;
  }

  function detect(iterator, context) {
    var result;
    this.each(function(value, index) {
      if (iterator.call(context, value, index, this)) {
        result = value;
        throw $break;
      }
    }, this);
    return result;
  }

  function findAll(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (iterator.call(context, value, index, this))
        results.push(value);
    }, this);
    return results;
  }

  function grep(filter, iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];

    if (Object.isString(filter))
      filter = new RegExp(RegExp.escape(filter));

    this.each(function(value, index) {
      if (filter.match(value))
        results.push(iterator.call(context, value, index, this));
    }, this);
    return results;
  }

  function include(object) {
    if (Object.isFunction(this.indexOf) && this.indexOf(object) != -1)
      return true;

    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  }

  function inGroupsOf(number, fillWith) {
    fillWith = Object.isUndefined(fillWith) ? null : fillWith;
    return this.eachSlice(number, function(slice) {
      while(slice.length < number) slice.push(fillWith);
      return slice;
    });
  }

  function inject(memo, iterator, context) {
    this.each(function(value, index) {
      memo = iterator.call(context, memo, value, index, this);
    }, this);
    return memo;
  }

  function invoke(method) {
    var args = $A(arguments).slice(1);
    return this.map(function(value) {
      return value[method].apply(value, args);
    });
  }

  function max(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index, this);
      if (result == null || value >= result)
        result = value;
    }, this);
    return result;
  }

  function min(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index, this);
      if (result == null || value < result)
        result = value;
    }, this);
    return result;
  }

  function partition(iterator, context) {
    iterator = iterator || Prototype.K;
    var trues = [], falses = [];
    this.each(function(value, index) {
      (iterator.call(context, value, index, this) ?
        trues : falses).push(value);
    }, this);
    return [trues, falses];
  }

  function pluck(property) {
    var results = [];
    this.each(function(value) {
      results.push(value[property]);
    });
    return results;
  }

  function reject(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (!iterator.call(context, value, index, this))
        results.push(value);
    }, this);
    return results;
  }

  function sortBy(iterator, context) {
    return this.map(function(value, index) {
      return {
        value: value,
        criteria: iterator.call(context, value, index, this)
      };
    }, this).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  }

  function toArray() {
    return this.map();
  }

  function zip() {
    var iterator = Prototype.K, args = $A(arguments);
    if (Object.isFunction(args.last()))
      iterator = args.pop();

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      return iterator(collections.pluck(index));
    });
  }

  function size() {
    return this.toArray().length;
  }

  function inspect() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }









  return {
    each:       each,
    eachSlice:  eachSlice,
    all:        all,
    every:      all,
    any:        any,
    some:       any,
    collect:    collect,
    map:        collect,
    detect:     detect,
    findAll:    findAll,
    select:     findAll,
    filter:     findAll,
    grep:       grep,
    include:    include,
    member:     include,
    inGroupsOf: inGroupsOf,
    inject:     inject,
    invoke:     invoke,
    max:        max,
    min:        min,
    partition:  partition,
    pluck:      pluck,
    reject:     reject,
    sortBy:     sortBy,
    toArray:    toArray,
    entries:    toArray,
    zip:        zip,
    size:       size,
    inspect:    inspect,
    find:       detect
  };
})();

function $A(iterable) {
  if (!iterable) return [];
  if ('toArray' in Object(iterable)) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
}


function $w(string) {
  if (!Object.isString(string)) return [];
  string = string.strip();
  return string ? string.split(/\s+/) : [];
}

Array.from = $A;


(function() {
  var arrayProto = Array.prototype,
      slice = arrayProto.slice,
      _each = arrayProto.forEach; // use native browser JS 1.6 implementation if available

  function each(iterator, context) {
    for (var i = 0, length = this.length >>> 0; i < length; i++) {
      if (i in this) iterator.call(context, this[i], i, this);
    }
  }
  if (!_each) _each = each;

  function clear() {
    this.length = 0;
    return this;
  }

  function first() {
    return this[0];
  }

  function last() {
    return this[this.length - 1];
  }

  function compact() {
    return this.select(function(value) {
      return value != null;
    });
  }

  function flatten() {
    return this.inject([], function(array, value) {
      if (Object.isArray(value))
        return array.concat(value.flatten());
      array.push(value);
      return array;
    });
  }

  function without() {
    var values = slice.call(arguments, 0);
    return this.select(function(value) {
      return !values.include(value);
    });
  }

  function reverse(inline) {
    return (inline === false ? this.toArray() : this)._reverse();
  }

  function uniq(sorted) {
    return this.inject([], function(array, value, index) {
      if (0 == index || (sorted ? array.last() != value : !array.include(value)))
        array.push(value);
      return array;
    });
  }

  function intersect(array) {
    return this.uniq().findAll(function(item) {
      return array.indexOf(item) !== -1;
    });
  }


  function clone() {
    return slice.call(this, 0);
  }

  function size() {
    return this.length;
  }

  function inspect() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  }

  function indexOf(item, i) {
    if (this == null) throw new TypeError();

    var array = Object(this), length = array.length >>> 0;
    if (length === 0) return -1;

    i = Number(i);
    if (isNaN(i)) {
      i = 0;
    } else if (i !== 0 && isFinite(i)) {
      i = (i > 0 ? 1 : -1) * Math.floor(Math.abs(i));
    }

    if (i > length) return -1;

    var k = i >= 0 ? i : Math.max(length - Math.abs(i), 0);
    for (; k < length; k++)
      if (k in array && array[k] === item) return k;
    return -1;
  }


  function lastIndexOf(item, i) {
    if (this == null) throw new TypeError();

    var array = Object(this), length = array.length >>> 0;
    if (length === 0) return -1;

    if (!Object.isUndefined(i)) {
      i = Number(i);
      if (isNaN(i)) {
        i = 0;
      } else if (i !== 0 && isFinite(i)) {
        i = (i > 0 ? 1 : -1) * Math.floor(Math.abs(i));
      }
    } else {
      i = length;
    }

    var k = i >= 0 ? Math.min(i, length - 1) :
     length - Math.abs(i);

    for (; k >= 0; k--)
      if (k in array && array[k] === item) return k;
    return -1;
  }

  function concat(_) {
    var array = [], items = slice.call(arguments, 0), item, n = 0;
    items.unshift(this);
    for (var i = 0, length = items.length; i < length; i++) {
      item = items[i];
      if (Object.isArray(item) && !('callee' in item)) {
        for (var j = 0, arrayLength = item.length; j < arrayLength; j++) {
          if (j in item) array[n] = item[j];
          n++;
        }
      } else {
        array[n++] = item;
      }
    }
    array.length = n;
    return array;
  }


  function wrapNative(method) {
    return function() {
      if (arguments.length === 0) {
        return method.call(this, Prototype.K);
      } else if (arguments[0] === undefined) {
        var args = slice.call(arguments, 1);
        args.unshift(Prototype.K);
        return method.apply(this, args);
      } else {
        return method.apply(this, arguments);
      }
    };
  }


  function map(iterator) {
    if (this == null) throw new TypeError();
    iterator = iterator || Prototype.K;

    var object = Object(this);
    var results = [], context = arguments[1], n = 0;

    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object) {
        results[n] = iterator.call(context, object[i], i, object);
      }
      n++;
    }
    results.length = n;
    return results;
  }

  if (arrayProto.map) {
    map = wrapNative(Array.prototype.map);
  }

  function filter(iterator) {
    if (this == null || !Object.isFunction(iterator))
      throw new TypeError();

    var object = Object(this);
    var results = [], context = arguments[1], value;

    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object) {
        value = object[i];
        if (iterator.call(context, value, i, object)) {
          results.push(value);
        }
      }
    }
    return results;
  }

  if (arrayProto.filter) {
    filter = Array.prototype.filter;
  }

  function some(iterator) {
    if (this == null) throw new TypeError();
    iterator = iterator || Prototype.K;
    var context = arguments[1];

    var object = Object(this);
    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object && iterator.call(context, object[i], i, object)) {
        return true;
      }
    }

    return false;
  }

  if (arrayProto.some) {
    var some = wrapNative(Array.prototype.some);
  }


  function every(iterator) {
    if (this == null) throw new TypeError();
    iterator = iterator || Prototype.K;
    var context = arguments[1];

    var object = Object(this);
    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object && !iterator.call(context, object[i], i, object)) {
        return false;
      }
    }

    return true;
  }

  if (arrayProto.every) {
    var every = wrapNative(Array.prototype.every);
  }

  var _reduce = arrayProto.reduce;
  function inject(memo, iterator) {
    iterator = iterator || Prototype.K;
    var context = arguments[2];
    return _reduce.call(this, iterator.bind(context), memo);
  }

  if (!arrayProto.reduce) {
    var inject = Enumerable.inject;
  }

  Object.extend(arrayProto, Enumerable);

  if (!arrayProto._reverse)
    arrayProto._reverse = arrayProto.reverse;

  Object.extend(arrayProto, {
    _each:     _each,

    map:       map,
    collect:   map,
    select:    filter,
    filter:    filter,
    findAll:   filter,
    some:      some,
    any:       some,
    every:     every,
    all:       every,
    inject:    inject,

    clear:     clear,
    first:     first,
    last:      last,
    compact:   compact,
    flatten:   flatten,
    without:   without,
    reverse:   reverse,
    uniq:      uniq,
    intersect: intersect,
    clone:     clone,
    toArray:   clone,
    size:      size,
    inspect:   inspect
  });

  var CONCAT_ARGUMENTS_BUGGY = (function() {
    return [].concat(arguments)[0][0] !== 1;
  })(1,2);

  if (CONCAT_ARGUMENTS_BUGGY) arrayProto.concat = concat;

  if (!arrayProto.indexOf) arrayProto.indexOf = indexOf;
  if (!arrayProto.lastIndexOf) arrayProto.lastIndexOf = lastIndexOf;
})();
function $H(object) {
  return new Hash(object);
};

var Hash = Class.create(Enumerable, (function() {
  function initialize(object) {
    this._object = Object.isHash(object) ? object.toObject() : Object.clone(object);
  }


  function _each(iterator, context) {
    var i = 0;
    for (var key in this._object) {
      var value = this._object[key], pair = [key, value];
      pair.key = key;
      pair.value = value;
      iterator.call(context, pair, i);
      i++;
    }
  }

  function set(key, value) {
    return this._object[key] = value;
  }

  function get(key) {
    if (this._object[key] !== Object.prototype[key])
      return this._object[key];
  }

  function unset(key) {
    var value = this._object[key];
    delete this._object[key];
    return value;
  }

  function toObject() {
    return Object.clone(this._object);
  }



  function keys() {
    return this.pluck('key');
  }

  function values() {
    return this.pluck('value');
  }

  function index(value) {
    var match = this.detect(function(pair) {
      return pair.value === value;
    });
    return match && match.key;
  }

  function merge(object) {
    return this.clone().update(object);
  }

  function update(object) {
    return new Hash(object).inject(this, function(result, pair) {
      result.set(pair.key, pair.value);
      return result;
    });
  }

  function toQueryPair(key, value) {
    if (Object.isUndefined(value)) return key;

    value = String.interpret(value);

    value = value.gsub(/(\r)?\n/, '\r\n');
    value = encodeURIComponent(value);
    value = value.gsub(/%20/, '+');
    return key + '=' + value;
  }

  function toQueryString() {
    return this.inject([], function(results, pair) {
      var key = encodeURIComponent(pair.key), values = pair.value;

      if (values && typeof values == 'object') {
        if (Object.isArray(values)) {
          var queryValues = [];
          for (var i = 0, len = values.length, value; i < len; i++) {
            value = values[i];
            queryValues.push(toQueryPair(key, value));
          }
          return results.concat(queryValues);
        }
      } else results.push(toQueryPair(key, values));
      return results;
    }).join('&');
  }

  function inspect() {
    return '#<Hash:{' + this.map(function(pair) {
      return pair.map(Object.inspect).join(': ');
    }).join(', ') + '}>';
  }

  function clone() {
    return new Hash(this);
  }

  return {
    initialize:             initialize,
    _each:                  _each,
    set:                    set,
    get:                    get,
    unset:                  unset,
    toObject:               toObject,
    toTemplateReplacements: toObject,
    keys:                   keys,
    values:                 values,
    index:                  index,
    merge:                  merge,
    update:                 update,
    toQueryString:          toQueryString,
    inspect:                inspect,
    toJSON:                 toObject,
    clone:                  clone
  };
})());

Hash.from = $H;
Object.extend(Number.prototype, (function() {
  function toColorPart() {
    return this.toPaddedString(2, 16);
  }

  function succ() {
    return this + 1;
  }

  function times(iterator, context) {
    $R(0, this, true).each(iterator, context);
    return this;
  }

  function toPaddedString(length, radix) {
    var string = this.toString(radix || 10);
    return '0'.times(length - string.length) + string;
  }

  function abs() {
    return Math.abs(this);
  }

  function round() {
    return Math.round(this);
  }

  function ceil() {
    return Math.ceil(this);
  }

  function floor() {
    return Math.floor(this);
  }

  return {
    toColorPart:    toColorPart,
    succ:           succ,
    times:          times,
    toPaddedString: toPaddedString,
    abs:            abs,
    round:          round,
    ceil:           ceil,
    floor:          floor
  };
})());

function $R(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}

var ObjectRange = Class.create(Enumerable, (function() {
  function initialize(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  }

  function _each(iterator, context) {
    var value = this.start, i;
    for (i = 0; this.include(value); i++) {
      iterator.call(context, value, i);
      value = value.succ();
    }
  }

  function include(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }

  return {
    initialize: initialize,
    _each:      _each,
    include:    include
  };
})());



var Abstract = { };


var Try = {
  these: function() {
    var returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) { }
    }

    return returnValue;
  }
};

var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new XMLHttpRequest()},
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) || false;
  },

  activeRequestCount: 0
};

Ajax.Responders = {
  responders: [],

  _each: function(iterator, context) {
    this.responders._each(iterator, context);
  },

  register: function(responder) {
    if (!this.include(responder))
      this.responders.push(responder);
  },

  unregister: function(responder) {
    this.responders = this.responders.without(responder);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (Object.isFunction(responder[callback])) {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) { }
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate:   function() { Ajax.activeRequestCount++ },
  onComplete: function() { Ajax.activeRequestCount-- }
});
Ajax.Base = Class.create({
  initialize: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      contentType:  'application/x-www-form-urlencoded',
      encoding:     'UTF-8',
      parameters:   '',
      evalJSON:     true,
      evalJS:       true
    };
    Object.extend(this.options, options || { });

    this.options.method = this.options.method.toLowerCase();

    if (Object.isHash(this.options.parameters))
      this.options.parameters = this.options.parameters.toObject();
  }
});
Ajax.Request = Class.create(Ajax.Base, {
  _complete: false,

  initialize: function($super, url, options) {
    $super(options);
    this.transport = Ajax.getTransport();
    this.request(url);
  },

  request: function(url) {
    this.url = url;
    this.method = this.options.method;
    var params = Object.isString(this.options.parameters) ?
          this.options.parameters :
          Object.toQueryString(this.options.parameters);

    if (!['get', 'post'].include(this.method)) {
      params += (params ? '&' : '') + "_method=" + this.method;
      this.method = 'post';
    }

    if (params && this.method === 'get') {
      this.url += (this.url.include('?') ? '&' : '?') + params;
    }

    this.parameters = params.toQueryParams();

    try {
      var response = new Ajax.Response(this);
      if (this.options.onCreate) this.options.onCreate(response);
      Ajax.Responders.dispatch('onCreate', this, response);

      this.transport.open(this.method.toUpperCase(), this.url,
        this.options.asynchronous);

      if (this.options.asynchronous) this.respondToReadyState.bind(this).defer(1);

      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();

      this.body = this.method == 'post' ? (this.options.postBody || params) : null;
      this.transport.send(this.body);

      /* Force Firefox to handle ready state 4 for synchronous requests */
      if (!this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange();

    }
    catch (e) {
      this.dispatchException(e);
    }
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState > 1 && !((readyState == 4) && this._complete))
      this.respondToReadyState(this.transport.readyState);
  },

  setRequestHeaders: function() {
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Prototype-Version': Prototype.Version,
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };

    if (this.method == 'post') {
      headers['Content-type'] = this.options.contentType +
        (this.options.encoding ? '; charset=' + this.options.encoding : '');

      /* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType &&
          (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
            headers['Connection'] = 'close';
    }

    if (typeof this.options.requestHeaders == 'object') {
      var extras = this.options.requestHeaders;

      if (Object.isFunction(extras.push))
        for (var i = 0, length = extras.length; i < length; i += 2)
          headers[extras[i]] = extras[i+1];
      else
        $H(extras).each(function(pair) { headers[pair.key] = pair.value });
    }

    for (var name in headers)
      if (headers[name] != null)
        this.transport.setRequestHeader(name, headers[name]);
  },

  success: function() {
    var status = this.getStatus();
    return !status || (status >= 200 && status < 300) || status == 304;
  },

  getStatus: function() {
    try {
      if (this.transport.status === 1223) return 204;
      return this.transport.status || 0;
    } catch (e) { return 0 }
  },

  respondToReadyState: function(readyState) {
    var state = Ajax.Request.Events[readyState], response = new Ajax.Response(this);

    if (state == 'Complete') {
      try {
        this._complete = true;
        (this.options['on' + response.status]
         || this.options['on' + (this.success() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(response, response.headerJSON);
      } catch (e) {
        this.dispatchException(e);
      }

      var contentType = response.getHeader('Content-type');
      if (this.options.evalJS == 'force'
          || (this.options.evalJS && this.isSameOrigin() && contentType
          && contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
        this.evalResponse();
    }

    try {
      (this.options['on' + state] || Prototype.emptyFunction)(response, response.headerJSON);
      Ajax.Responders.dispatch('on' + state, this, response, response.headerJSON);
    } catch (e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      this.transport.onreadystatechange = Prototype.emptyFunction;
    }
  },

  isSameOrigin: function() {
    var m = this.url.match(/^\s*https?:\/\/[^\/]*/);
    return !m || (m[0] == '#{protocol}//#{domain}#{port}'.interpolate({
      protocol: location.protocol,
      domain: document.domain,
      port: location.port ? ':' + location.port : ''
    }));
  },

  getHeader: function(name) {
    try {
      return this.transport.getResponseHeader(name) || null;
    } catch (e) { return null; }
  },

  evalResponse: function() {
    try {
      return eval((this.transport.responseText || '').unfilterJSON());
    } catch (e) {
      this.dispatchException(e);
    }
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];








Ajax.Response = Class.create({
  initialize: function(request){
    this.request = request;
    var transport  = this.transport  = request.transport,
        readyState = this.readyState = transport.readyState;

    if ((readyState > 2 && !Prototype.Browser.IE) || readyState == 4) {
      this.status       = this.getStatus();
      this.statusText   = this.getStatusText();
      this.responseText = String.interpret(transport.responseText);
      this.headerJSON   = this._getHeaderJSON();
    }

    if (readyState == 4) {
      var xml = transport.responseXML;
      this.responseXML  = Object.isUndefined(xml) ? null : xml;
      this.responseJSON = this._getResponseJSON();
    }
  },

  status:      0,

  statusText: '',

  getStatus: Ajax.Request.prototype.getStatus,

  getStatusText: function() {
    try {
      return this.transport.statusText || '';
    } catch (e) { return '' }
  },

  getHeader: Ajax.Request.prototype.getHeader,

  getAllHeaders: function() {
    try {
      return this.getAllResponseHeaders();
    } catch (e) { return null }
  },

  getResponseHeader: function(name) {
    return this.transport.getResponseHeader(name);
  },

  getAllResponseHeaders: function() {
    return this.transport.getAllResponseHeaders();
  },

  _getHeaderJSON: function() {
    var json = this.getHeader('X-JSON');
    if (!json) return null;

    try {
      json = decodeURIComponent(escape(json));
    } catch(e) {
    }

    try {
      return json.evalJSON(this.request.options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  },

  _getResponseJSON: function() {
    var options = this.request.options;
    if (!options.evalJSON || (options.evalJSON != 'force' &&
      !(this.getHeader('Content-type') || '').include('application/json')) ||
        this.responseText.blank())
          return null;
    try {
      return this.responseText.evalJSON(options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  }
});

Ajax.Updater = Class.create(Ajax.Request, {
  initialize: function($super, container, url, options) {
    this.container = {
      success: (container.success || container),
      failure: (container.failure || (container.success ? null : container))
    };

    options = Object.clone(options);
    var onComplete = options.onComplete;
    options.onComplete = (function(response, json) {
      this.updateContent(response.responseText);
      if (Object.isFunction(onComplete)) onComplete(response, json);
    }).bind(this);

    $super(url, options);
  },

  updateContent: function(responseText) {
    var receiver = this.container[this.success() ? 'success' : 'failure'],
        options = this.options;

    if (!options.evalScripts) responseText = responseText.stripScripts();

    if (receiver = $(receiver)) {
      if (options.insertion) {
        if (Object.isString(options.insertion)) {
          var insertion = { }; insertion[options.insertion] = responseText;
          receiver.insert(insertion);
        }
        else options.insertion(receiver, responseText);
      }
      else receiver.update(responseText);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
  initialize: function($super, container, url, options) {
    $super(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = { };
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(response) {
    if (this.options.decay) {
      this.decay = (response.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = response.responseText;
    }
    this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});

(function(GLOBAL) {

  var UNDEFINED;
  var SLICE = Array.prototype.slice;

  var DIV = document.createElement('div');


  function $(element) {
    if (arguments.length > 1) {
      for (var i = 0, elements = [], length = arguments.length; i < length; i++)
        elements.push($(arguments[i]));
      return elements;
    }

    if (Object.isString(element))
      element = document.getElementById(element);
    return Element.extend(element);
  }

  GLOBAL.$ = $;


  if (!GLOBAL.Node) GLOBAL.Node = {};

  if (!GLOBAL.Node.ELEMENT_NODE) {
    Object.extend(GLOBAL.Node, {
      ELEMENT_NODE:                1,
      ATTRIBUTE_NODE:              2,
      TEXT_NODE:                   3,
      CDATA_SECTION_NODE:          4,
      ENTITY_REFERENCE_NODE:       5,
      ENTITY_NODE:                 6,
      PROCESSING_INSTRUCTION_NODE: 7,
      COMMENT_NODE:                8,
      DOCUMENT_NODE:               9,
      DOCUMENT_TYPE_NODE:         10,
      DOCUMENT_FRAGMENT_NODE:     11,
      NOTATION_NODE:              12
    });
  }

  var ELEMENT_CACHE = {};

  function shouldUseCreationCache(tagName, attributes) {
    if (tagName === 'select') return false;
    if ('type' in attributes) return false;
    return true;
  }

  var HAS_EXTENDED_CREATE_ELEMENT_SYNTAX = (function(){
    try {
      var el = document.createElement('<input name="x">');
      return el.tagName.toLowerCase() === 'input' && el.name === 'x';
    }
    catch(err) {
      return false;
    }
  })();


  var oldElement = GLOBAL.Element;
  function Element(tagName, attributes) {
    attributes = attributes || {};
    tagName = tagName.toLowerCase();

    if (HAS_EXTENDED_CREATE_ELEMENT_SYNTAX && attributes.name) {
      tagName = '<' + tagName + ' name="' + attributes.name + '">';
      delete attributes.name;
      return Element.writeAttribute(document.createElement(tagName), attributes);
    }

    if (!ELEMENT_CACHE[tagName])
      ELEMENT_CACHE[tagName] = Element.extend(document.createElement(tagName));

    var node = shouldUseCreationCache(tagName, attributes) ?
     ELEMENT_CACHE[tagName].cloneNode(false) : document.createElement(tagName);

    return Element.writeAttribute(node, attributes);
  }

  GLOBAL.Element = Element;

  Object.extend(GLOBAL.Element, oldElement || {});
  if (oldElement) GLOBAL.Element.prototype = oldElement.prototype;

  Element.Methods = { ByTag: {}, Simulated: {} };

  var methods = {};

  var INSPECT_ATTRIBUTES = { id: 'id', className: 'class' };
  function inspect(element) {
    element = $(element);
    var result = '<' + element.tagName.toLowerCase();

    var attribute, value;
    for (var property in INSPECT_ATTRIBUTES) {
      attribute = INSPECT_ATTRIBUTES[property];
      value = (element[property] || '').toString();
      if (value) result += ' ' + attribute + '=' + value.inspect(true);
    }

    return result + '>';
  }

  methods.inspect = inspect;


  function visible(element) {
    return $(element).style.display !== 'none';
  }

  function toggle(element, bool) {
    element = $(element);
    if (Object.isUndefined(bool))
      bool = !Element.visible(element);
    Element[bool ? 'show' : 'hide'](element);

    return element;
  }

  function hide(element) {
    element = $(element);
    element.style.display = 'none';
    return element;
  }

  function show(element) {
    element = $(element);
    element.style.display = '';
    return element;
  }


  Object.extend(methods, {
    visible: visible,
    toggle:  toggle,
    hide:    hide,
    show:    show
  });


  function remove(element) {
    element = $(element);
    element.parentNode.removeChild(element);
    return element;
  }

  var SELECT_ELEMENT_INNERHTML_BUGGY = (function(){
    var el = document.createElement("select"),
        isBuggy = true;
    el.innerHTML = "<option value=\"test\">test</option>";
    if (el.options && el.options[0]) {
      isBuggy = el.options[0].nodeName.toUpperCase() !== "OPTION";
    }
    el = null;
    return isBuggy;
  })();

  var TABLE_ELEMENT_INNERHTML_BUGGY = (function(){
    try {
      var el = document.createElement("table");
      if (el && el.tBodies) {
        el.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
        var isBuggy = typeof el.tBodies[0] == "undefined";
        el = null;
        return isBuggy;
      }
    } catch (e) {
      return true;
    }
  })();

  var LINK_ELEMENT_INNERHTML_BUGGY = (function() {
    try {
      var el = document.createElement('div');
      el.innerHTML = "<link />";
      var isBuggy = (el.childNodes.length === 0);
      el = null;
      return isBuggy;
    } catch(e) {
      return true;
    }
  })();

  var ANY_INNERHTML_BUGGY = SELECT_ELEMENT_INNERHTML_BUGGY ||
   TABLE_ELEMENT_INNERHTML_BUGGY || LINK_ELEMENT_INNERHTML_BUGGY;

  var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING = (function () {
    var s = document.createElement("script"),
        isBuggy = false;
    try {
      s.appendChild(document.createTextNode(""));
      isBuggy = !s.firstChild ||
        s.firstChild && s.firstChild.nodeType !== 3;
    } catch (e) {
      isBuggy = true;
    }
    s = null;
    return isBuggy;
  })();

  function update(element, content) {
    element = $(element);

    var descendants = element.getElementsByTagName('*'),
     i = descendants.length;
    while (i--) purgeElement(descendants[i]);

    if (content && content.toElement)
      content = content.toElement();

    if (Object.isElement(content))
      return element.update().insert(content);


    content = Object.toHTML(content);
    var tagName = element.tagName.toUpperCase();

    if (tagName === 'SCRIPT' && SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING) {
      element.text = content;
      return element;
    }

    if (ANY_INNERHTML_BUGGY) {
      if (tagName in INSERTION_TRANSLATIONS.tags) {
        while (element.firstChild)
          element.removeChild(element.firstChild);

        var nodes = getContentFromAnonymousElement(tagName, content.stripScripts());
        for (var i = 0, node; node = nodes[i]; i++)
          element.appendChild(node);

      } else if (LINK_ELEMENT_INNERHTML_BUGGY && Object.isString(content) && content.indexOf('<link') > -1) {
        while (element.firstChild)
          element.removeChild(element.firstChild);

        var nodes = getContentFromAnonymousElement(tagName,
         content.stripScripts(), true);

        for (var i = 0, node; node = nodes[i]; i++)
          element.appendChild(node);
      } else {
        element.innerHTML = content.stripScripts();
      }
    } else {
      element.innerHTML = content.stripScripts();
    }

    content.evalScripts.bind(content).defer();
    return element;
  }

  function replace(element, content) {
    element = $(element);

    if (content && content.toElement) {
      content = content.toElement();
    } else if (!Object.isElement(content)) {
      content = Object.toHTML(content);
      var range = element.ownerDocument.createRange();
      range.selectNode(element);
      content.evalScripts.bind(content).defer();
      content = range.createContextualFragment(content.stripScripts());
    }

    element.parentNode.replaceChild(content, element);
    return element;
  }

  var INSERTION_TRANSLATIONS = {
    before: function(element, node) {
      element.parentNode.insertBefore(node, element);
    },
    top: function(element, node) {
      element.insertBefore(node, element.firstChild);
    },
    bottom: function(element, node) {
      element.appendChild(node);
    },
    after: function(element, node) {
      element.parentNode.insertBefore(node, element.nextSibling);
    },

    tags: {
      TABLE:  ['<table>',                '</table>',                   1],
      TBODY:  ['<table><tbody>',         '</tbody></table>',           2],
      TR:     ['<table><tbody><tr>',     '</tr></tbody></table>',      3],
      TD:     ['<table><tbody><tr><td>', '</td></tr></tbody></table>', 4],
      SELECT: ['<select>',               '</select>',                  1]
    }
  };

  var tags = INSERTION_TRANSLATIONS.tags;

  Object.extend(tags, {
    THEAD: tags.TBODY,
    TFOOT: tags.TBODY,
    TH:    tags.TD
  });

  function replace_IE(element, content) {
    element = $(element);
    if (content && content.toElement)
      content = content.toElement();
    if (Object.isElement(content)) {
      element.parentNode.replaceChild(content, element);
      return element;
    }

    content = Object.toHTML(content);
    var parent = element.parentNode, tagName = parent.tagName.toUpperCase();

    if (tagName in INSERTION_TRANSLATIONS.tags) {
      var nextSibling = Element.next(element);
      var fragments = getContentFromAnonymousElement(
       tagName, content.stripScripts());

      parent.removeChild(element);

      var iterator;
      if (nextSibling)
        iterator = function(node) { parent.insertBefore(node, nextSibling) };
      else
        iterator = function(node) { parent.appendChild(node); }

      fragments.each(iterator);
    } else {
      element.outerHTML = content.stripScripts();
    }

    content.evalScripts.bind(content).defer();
    return element;
  }

  if ('outerHTML' in document.documentElement)
    replace = replace_IE;

  function isContent(content) {
    if (Object.isUndefined(content) || content === null) return false;

    if (Object.isString(content) || Object.isNumber(content)) return true;
    if (Object.isElement(content)) return true;
    if (content.toElement || content.toHTML) return true;

    return false;
  }

  function insertContentAt(element, content, position) {
    position   = position.toLowerCase();
    var method = INSERTION_TRANSLATIONS[position];

    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) {
      method(element, content);
      return element;
    }

    content = Object.toHTML(content);
    var tagName = ((position === 'before' || position === 'after') ?
     element.parentNode : element).tagName.toUpperCase();

    var childNodes = getContentFromAnonymousElement(tagName, content.stripScripts());

    if (position === 'top' || position === 'after') childNodes.reverse();

    for (var i = 0, node; node = childNodes[i]; i++)
      method(element, node);

    content.evalScripts.bind(content).defer();
  }

  function insert(element, insertions) {
    element = $(element);

    if (isContent(insertions))
      insertions = { bottom: insertions };

    for (var position in insertions)
      insertContentAt(element, insertions[position], position);

    return element;
  }

  function wrap(element, wrapper, attributes) {
    element = $(element);

    if (Object.isElement(wrapper)) {
      $(wrapper).writeAttribute(attributes || {});
    } else if (Object.isString(wrapper)) {
      wrapper = new Element(wrapper, attributes);
    } else {
      wrapper = new Element('div', wrapper);
    }

    if (element.parentNode)
      element.parentNode.replaceChild(wrapper, element);

    wrapper.appendChild(element);

    return wrapper;
  }

  function cleanWhitespace(element) {
    element = $(element);
    var node = element.firstChild;

    while (node) {
      var nextNode = node.nextSibling;
      if (node.nodeType === Node.TEXT_NODE && !/\S/.test(node.nodeValue))
        element.removeChild(node);
      node = nextNode;
    }
    return element;
  }

  function empty(element) {
    return $(element).innerHTML.blank();
  }

  function getContentFromAnonymousElement(tagName, html, force) {
    var t = INSERTION_TRANSLATIONS.tags[tagName], div = DIV;

    var workaround = !!t;
    if (!workaround && force) {
      workaround = true;
      t = ['', '', 0];
    }

    if (workaround) {
      div.innerHTML = '&#160;' + t[0] + html + t[1];
      div.removeChild(div.firstChild);
      for (var i = t[2]; i--; )
        div = div.firstChild;
    } else {
      div.innerHTML = html;
    }

    return $A(div.childNodes);
  }

  function clone(element, deep) {
    if (!(element = $(element))) return;
    var clone = element.cloneNode(deep);
    if (!HAS_UNIQUE_ID_PROPERTY) {
      clone._prototypeUID = UNDEFINED;
      if (deep) {
        var descendants = Element.select(clone, '*'),
         i = descendants.length;
        while (i--)
          descendants[i]._prototypeUID = UNDEFINED;
      }
    }
    return Element.extend(clone);
  }

  function purgeElement(element) {
    var uid = getUniqueElementID(element);
    if (uid) {
      Element.stopObserving(element);
      if (!HAS_UNIQUE_ID_PROPERTY)
        element._prototypeUID = UNDEFINED;
      delete Element.Storage[uid];
    }
  }

  function purgeCollection(elements) {
    var i = elements.length;
    while (i--)
      purgeElement(elements[i]);
  }

  function purgeCollection_IE(elements) {
    var i = elements.length, element, uid;
    while (i--) {
      element = elements[i];
      uid = getUniqueElementID(element);
      delete Element.Storage[uid];
      delete Event.cache[uid];
    }
  }

  if (HAS_UNIQUE_ID_PROPERTY) {
    purgeCollection = purgeCollection_IE;
  }


  function purge(element) {
    if (!(element = $(element))) return;
    purgeElement(element);

    var descendants = element.getElementsByTagName('*'),
     i = descendants.length;

    while (i--) purgeElement(descendants[i]);

    return null;
  }

  Object.extend(methods, {
    remove:  remove,
    update:  update,
    replace: replace,
    insert:  insert,
    wrap:    wrap,
    cleanWhitespace: cleanWhitespace,
    empty:   empty,
    clone:   clone,
    purge:   purge
  });



  function recursivelyCollect(element, property, maximumLength) {
    element = $(element);
    maximumLength = maximumLength || -1;
    var elements = [];

    while (element = element[property]) {
      if (element.nodeType === Node.ELEMENT_NODE)
        elements.push(Element.extend(element));

      if (elements.length === maximumLength) break;
    }

    return elements;
  }


  function ancestors(element) {
    return recursivelyCollect(element, 'parentNode');
  }

  function descendants(element) {
    return Element.select(element, '*');
  }

  function firstDescendant(element) {
    element = $(element).firstChild;
    while (element && element.nodeType !== Node.ELEMENT_NODE)
      element = element.nextSibling;

    return $(element);
  }

  function immediateDescendants(element) {
    var results = [], child = $(element).firstChild;

    while (child) {
      if (child.nodeType === Node.ELEMENT_NODE)
        results.push(Element.extend(child));

      child = child.nextSibling;
    }

    return results;
  }

  function previousSiblings(element) {
    return recursivelyCollect(element, 'previousSibling');
  }

  function nextSiblings(element) {
    return recursivelyCollect(element, 'nextSibling');
  }

  function siblings(element) {
    element = $(element);
    var previous = previousSiblings(element),
     next = nextSiblings(element);
    return previous.reverse().concat(next);
  }

  function match(element, selector) {
    element = $(element);

    if (Object.isString(selector))
      return Prototype.Selector.match(element, selector);

    return selector.match(element);
  }


  function _recursivelyFind(element, property, expression, index) {
    element = $(element), expression = expression || 0, index = index || 0;
    if (Object.isNumber(expression)) {
      index = expression, expression = null;
    }

    while (element = element[property]) {
      if (element.nodeType !== 1) continue;
      if (expression && !Prototype.Selector.match(element, expression))
        continue;
      if (--index >= 0) continue;

      return Element.extend(element);
    }
  }


  function up(element, expression, index) {
    element = $(element);

    if (arguments.length === 1) return $(element.parentNode);
    return _recursivelyFind(element, 'parentNode', expression, index);
  }

  function down(element, expression, index) {
    if (arguments.length === 1) return firstDescendant(element);
    element = $(element), expression = expression || 0, index = index || 0;

    if (Object.isNumber(expression))
      index = expression, expression = '*';

    var node = Prototype.Selector.select(expression, element)[index];
    return Element.extend(node);
  }

  function previous(element, expression, index) {
    return _recursivelyFind(element, 'previousSibling', expression, index);
  }

  function next(element, expression, index) {
    return _recursivelyFind(element, 'nextSibling', expression, index);
  }

  function select(element) {
    element = $(element);
    var expressions = SLICE.call(arguments, 1).join(', ');
    return Prototype.Selector.select(expressions, element);
  }

  function adjacent(element) {
    element = $(element);
    var expressions = SLICE.call(arguments, 1).join(', ');
    var siblings = Element.siblings(element), results = [];
    for (var i = 0, sibling; sibling = siblings[i]; i++) {
      if (Prototype.Selector.match(sibling, expressions))
        results.push(sibling);
    }

    return results;
  }

  function descendantOf_DOM(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    while (element = element.parentNode)
      if (element === ancestor) return true;
    return false;
  }

  function descendantOf_contains(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    if (!ancestor.contains) return descendantOf_DOM(element, ancestor);
    return ancestor.contains(element) && ancestor !== element;
  }

  function descendantOf_compareDocumentPosition(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    return (element.compareDocumentPosition(ancestor) & 8) === 8;
  }

  var descendantOf;
  if (DIV.compareDocumentPosition) {
    descendantOf = descendantOf_compareDocumentPosition;
  } else if (DIV.contains) {
    descendantOf = descendantOf_contains;
  } else {
    descendantOf = descendantOf_DOM;
  }


  Object.extend(methods, {
    recursivelyCollect:   recursivelyCollect,
    ancestors:            ancestors,
    descendants:          descendants,
    firstDescendant:      firstDescendant,
    immediateDescendants: immediateDescendants,
    previousSiblings:     previousSiblings,
    nextSiblings:         nextSiblings,
    siblings:             siblings,
    match:                match,
    up:                   up,
    down:                 down,
    previous:             previous,
    next:                 next,
    select:               select,
    adjacent:             adjacent,
    descendantOf:         descendantOf,

    getElementsBySelector: select,

    childElements:         immediateDescendants
  });


  var idCounter = 1;
  function identify(element) {
    element = $(element);
    var id = Element.readAttribute(element, 'id');
    if (id) return id;

    do { id = 'anonymous_element_' + idCounter++ } while ($(id));

    Element.writeAttribute(element, 'id', id);
    return id;
  }


  function readAttribute(element, name) {
    return $(element).getAttribute(name);
  }

  function readAttribute_IE(element, name) {
    element = $(element);

    var table = ATTRIBUTE_TRANSLATIONS.read;
    if (table.values[name])
      return table.values[name](element, name);

    if (table.names[name]) name = table.names[name];

    if (name.include(':')) {
      if (!element.attributes || !element.attributes[name]) return null;
      return element.attributes[name].value;
    }

    return element.getAttribute(name);
  }

  function readAttribute_Opera(element, name) {
    if (name === 'title') return element.title;
    return element.getAttribute(name);
  }

  var PROBLEMATIC_ATTRIBUTE_READING = (function() {
    DIV.setAttribute('onclick', []);
    var value = DIV.getAttribute('onclick');
    var isFunction = Object.isArray(value);
    DIV.removeAttribute('onclick');
    return isFunction;
  })();

  if (PROBLEMATIC_ATTRIBUTE_READING) {
    readAttribute = readAttribute_IE;
  } else if (Prototype.Browser.Opera) {
    readAttribute = readAttribute_Opera;
  }


  function writeAttribute(element, name, value) {
    element = $(element);
    var attributes = {}, table = ATTRIBUTE_TRANSLATIONS.write;

    if (typeof name === 'object') {
      attributes = name;
    } else {
      attributes[name] = Object.isUndefined(value) ? true : value;
    }

    for (var attr in attributes) {
      name = table.names[attr] || attr;
      value = attributes[attr];
      if (table.values[attr])
        name = table.values[attr](element, value) || name;
      if (value === false || value === null)
        element.removeAttribute(name);
      else if (value === true)
        element.setAttribute(name, name);
      else element.setAttribute(name, value);
    }

    return element;
  }

  var PROBLEMATIC_HAS_ATTRIBUTE_WITH_CHECKBOXES = (function () {
    if (!HAS_EXTENDED_CREATE_ELEMENT_SYNTAX) {
      return false;
    }
    var checkbox = document.createElement('<input type="checkbox">');
    checkbox.checked = true;
    var node = checkbox.getAttributeNode('checked');
    return !node || !node.specified;
  })();

  function hasAttribute(element, attribute) {
    attribute = ATTRIBUTE_TRANSLATIONS.has[attribute] || attribute;
    var node = $(element).getAttributeNode(attribute);
    return !!(node && node.specified);
  }

  function hasAttribute_IE(element, attribute) {
    if (attribute === 'checked') {
      return element.checked;
    }
    return hasAttribute(element, attribute);
  }

  GLOBAL.Element.Methods.Simulated.hasAttribute =
   PROBLEMATIC_HAS_ATTRIBUTE_WITH_CHECKBOXES ?
   hasAttribute_IE : hasAttribute;

  function classNames(element) {
    return new Element.ClassNames(element);
  }

  var regExpCache = {};
  function getRegExpForClassName(className) {
    if (regExpCache[className]) return regExpCache[className];

    var re = new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    regExpCache[className] = re;
    return re;
  }

  function hasClassName(element, className) {
    if (!(element = $(element))) return;

    var elementClassName = element.className;

    if (elementClassName.length === 0) return false;
    if (elementClassName === className) return true;

    return getRegExpForClassName(className).test(elementClassName);
  }

  function addClassName(element, className) {
    if (!(element = $(element))) return;

    if (!hasClassName(element, className))
      element.className += (element.className ? ' ' : '') + className;

    return element;
  }

  function removeClassName(element, className) {
    if (!(element = $(element))) return;

    element.className = element.className.replace(
     getRegExpForClassName(className), ' ').strip();

    return element;
  }

  function toggleClassName(element, className, bool) {
    if (!(element = $(element))) return;

    if (Object.isUndefined(bool))
      bool = !hasClassName(element, className);

    var method = Element[bool ? 'addClassName' : 'removeClassName'];
    return method(element, className);
  }

  var ATTRIBUTE_TRANSLATIONS = {};

  var classProp = 'className', forProp = 'for';

  DIV.setAttribute(classProp, 'x');
  if (DIV.className !== 'x') {
    DIV.setAttribute('class', 'x');
    if (DIV.className === 'x')
      classProp = 'class';
  }

  var LABEL = document.createElement('label');
  LABEL.setAttribute(forProp, 'x');
  if (LABEL.htmlFor !== 'x') {
    LABEL.setAttribute('htmlFor', 'x');
    if (LABEL.htmlFor === 'x')
      forProp = 'htmlFor';
  }
  LABEL = null;

  function _getAttr(element, attribute) {
    return element.getAttribute(attribute);
  }

  function _getAttr2(element, attribute) {
    return element.getAttribute(attribute, 2);
  }

  function _getAttrNode(element, attribute) {
    var node = element.getAttributeNode(attribute);
    return node ? node.value : '';
  }

  function _getFlag(element, attribute) {
    return $(element).hasAttribute(attribute) ? attribute : null;
  }

  DIV.onclick = Prototype.emptyFunction;
  var onclickValue = DIV.getAttribute('onclick');

  var _getEv;

  if (String(onclickValue).indexOf('{') > -1) {
    _getEv = function(element, attribute) {
      var value = element.getAttribute(attribute);
      if (!value) return null;
      value = value.toString();
      value = value.split('{')[1];
      value = value.split('}')[0];
      return value.strip();
    };
  }
  else if (onclickValue === '') {
    _getEv = function(element, attribute) {
      var value = element.getAttribute(attribute);
      if (!value) return null;
      return value.strip();
    };
  }

  ATTRIBUTE_TRANSLATIONS.read = {
    names: {
      'class':     classProp,
      'className': classProp,
      'for':       forProp,
      'htmlFor':   forProp
    },

    values: {
      style: function(element) {
        return element.style.cssText.toLowerCase();
      },
      title: function(element) {
        return element.title;
      }
    }
  };

  ATTRIBUTE_TRANSLATIONS.write = {
    names: {
      className:   'class',
      htmlFor:     'for',
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing'
    },

    values: {
      checked: function(element, value) {
        element.checked = !!value;
      },

      style: function(element, value) {
        element.style.cssText = value ? value : '';
      }
    }
  };

  ATTRIBUTE_TRANSLATIONS.has = { names: {} };

  Object.extend(ATTRIBUTE_TRANSLATIONS.write.names,
   ATTRIBUTE_TRANSLATIONS.read.names);

  var CAMEL_CASED_ATTRIBUTE_NAMES = $w('colSpan rowSpan vAlign dateTime ' +
   'accessKey tabIndex encType maxLength readOnly longDesc frameBorder');

  for (var i = 0, attr; attr = CAMEL_CASED_ATTRIBUTE_NAMES[i]; i++) {
    ATTRIBUTE_TRANSLATIONS.write.names[attr.toLowerCase()] = attr;
    ATTRIBUTE_TRANSLATIONS.has.names[attr.toLowerCase()]   = attr;
  }

  Object.extend(ATTRIBUTE_TRANSLATIONS.read.values, {
    href:        _getAttr2,
    src:         _getAttr2,
    type:        _getAttr,
    action:      _getAttrNode,
    disabled:    _getFlag,
    checked:     _getFlag,
    readonly:    _getFlag,
    multiple:    _getFlag,
    onload:      _getEv,
    onunload:    _getEv,
    onclick:     _getEv,
    ondblclick:  _getEv,
    onmousedown: _getEv,
    onmouseup:   _getEv,
    onmouseover: _getEv,
    onmousemove: _getEv,
    onmouseout:  _getEv,
    onfocus:     _getEv,
    onblur:      _getEv,
    onkeypress:  _getEv,
    onkeydown:   _getEv,
    onkeyup:     _getEv,
    onsubmit:    _getEv,
    onreset:     _getEv,
    onselect:    _getEv,
    onchange:    _getEv
  });


  Object.extend(methods, {
    identify:        identify,
    readAttribute:   readAttribute,
    writeAttribute:  writeAttribute,
    classNames:      classNames,
    hasClassName:    hasClassName,
    addClassName:    addClassName,
    removeClassName: removeClassName,
    toggleClassName: toggleClassName
  });


  function normalizeStyleName(style) {
    if (style === 'float' || style === 'styleFloat')
      return 'cssFloat';
    return style.camelize();
  }

  function normalizeStyleName_IE(style) {
    if (style === 'float' || style === 'cssFloat')
      return 'styleFloat';
    return style.camelize();
  }

  function setStyle(element, styles) {
    element = $(element);
    var elementStyle = element.style, match;

    if (Object.isString(styles)) {
      elementStyle.cssText += ';' + styles;
      if (styles.include('opacity')) {
        var opacity = styles.match(/opacity:\s*(\d?\.?\d*)/)[1];
        Element.setOpacity(element, opacity);
      }
      return element;
    }

    for (var property in styles) {
      if (property === 'opacity') {
        Element.setOpacity(element, styles[property]);
      } else {
        var value = styles[property];
        if (property === 'float' || property === 'cssFloat') {
          property = Object.isUndefined(elementStyle.styleFloat) ?
           'cssFloat' : 'styleFloat';
        }
        elementStyle[property] = value;
      }
    }

    return element;
  }


  function getStyle(element, style) {
    element = $(element);
    style = normalizeStyleName(style);

    var value = element.style[style];
    if (!value || value === 'auto') {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }

    if (style === 'opacity') return value ? parseFloat(value) : 1.0;
    return value === 'auto' ? null : value;
  }

  function getStyle_Opera(element, style) {
    switch (style) {
      case 'height': case 'width':
        if (!Element.visible(element)) return null;

        var dim = parseInt(getStyle(element, style), 10);

        if (dim !== element['offset' + style.capitalize()])
          return dim + 'px';

        return Element.measure(element, style);

      default: return getStyle(element, style);
    }
  }

  function getStyle_IE(element, style) {
    element = $(element);
    style = normalizeStyleName_IE(style);

    var value = element.style[style];
    if (!value && element.currentStyle) {
      value = element.currentStyle[style];
    }

    if (style === 'opacity' && !STANDARD_CSS_OPACITY_SUPPORTED)
      return getOpacity_IE(element);

    if (value === 'auto') {
      if ((style === 'width' || style === 'height') && Element.visible(element))
        return Element.measure(element, style) + 'px';
      return null;
    }

    return value;
  }

  function stripAlphaFromFilter_IE(filter) {
    return (filter || '').replace(/alpha\([^\)]*\)/gi, '');
  }

  function hasLayout_IE(element) {
    if (!element.currentStyle || !element.currentStyle.hasLayout)
      element.style.zoom = 1;
    return element;
  }

  var STANDARD_CSS_OPACITY_SUPPORTED = (function() {
    DIV.style.cssText = "opacity:.55";
    return /^0.55/.test(DIV.style.opacity);
  })();

  function setOpacity(element, value) {
    element = $(element);
    if (value == 1 || value === '') value = '';
    else if (value < 0.00001) value = 0;
    element.style.opacity = value;
    return element;
  }

  function setOpacity_IE(element, value) {
    if (STANDARD_CSS_OPACITY_SUPPORTED)
      return setOpacity(element, value);

    element = hasLayout_IE($(element));
    var filter = Element.getStyle(element, 'filter'),
     style = element.style;

    if (value == 1 || value === '') {
      filter = stripAlphaFromFilter_IE(filter);
      if (filter) style.filter = filter;
      else style.removeAttribute('filter');
      return element;
    }

    if (value < 0.00001) value = 0;

    style.filter = stripAlphaFromFilter_IE(filter) +
     'alpha(opacity=' + (value * 100) + ')';

    return element;
  }


  function getOpacity(element) {
    return Element.getStyle(element, 'opacity');
  }

  function getOpacity_IE(element) {
    if (STANDARD_CSS_OPACITY_SUPPORTED)
      return getOpacity(element);

    var filter = Element.getStyle(element, 'filter');
    if (filter.length === 0) return 1.0;
    var match = (filter || '').match(/alpha\(opacity=(.*)\)/);
    if (match && match[1]) return parseFloat(match[1]) / 100;
    return 1.0;
  }


  Object.extend(methods, {
    setStyle:   setStyle,
    getStyle:   getStyle,
    setOpacity: setOpacity,
    getOpacity: getOpacity
  });

  if ('styleFloat' in DIV.style) {
    methods.getStyle = getStyle_IE;
    methods.setOpacity = setOpacity_IE;
    methods.getOpacity = getOpacity_IE;
  }

  var UID = 0;

  GLOBAL.Element.Storage = { UID: 1 };

  function getUniqueElementID(element) {
    if (element === window) return 0;

    if (typeof element._prototypeUID === 'undefined')
      element._prototypeUID = Element.Storage.UID++;
    return element._prototypeUID;
  }

  function getUniqueElementID_IE(element) {
    if (element === window) return 0;
    if (element == document) return 1;
    return element.uniqueID;
  }

  var HAS_UNIQUE_ID_PROPERTY = ('uniqueID' in DIV);
  if (HAS_UNIQUE_ID_PROPERTY)
    getUniqueElementID = getUniqueElementID_IE;

  function getStorage(element) {
    if (!(element = $(element))) return;

    var uid = getUniqueElementID(element);

    if (!Element.Storage[uid])
      Element.Storage[uid] = $H();

    return Element.Storage[uid];
  }

  function store(element, key, value) {
    if (!(element = $(element))) return;
    var storage = getStorage(element);
    if (arguments.length === 2) {
      storage.update(key);
    } else {
      storage.set(key, value);
    }
    return element;
  }

  function retrieve(element, key, defaultValue) {
    if (!(element = $(element))) return;
    var storage = getStorage(element), value = storage.get(key);

    if (Object.isUndefined(value)) {
      storage.set(key, defaultValue);
      value = defaultValue;
    }

    return value;
  }


  Object.extend(methods, {
    getStorage: getStorage,
    store:      store,
    retrieve:   retrieve
  });


  var Methods = {}, ByTag = Element.Methods.ByTag,
   F = Prototype.BrowserFeatures;

  if (!F.ElementExtensions && ('__proto__' in DIV)) {
    GLOBAL.HTMLElement = {};
    GLOBAL.HTMLElement.prototype = DIV['__proto__'];
    F.ElementExtensions = true;
  }

  function checkElementPrototypeDeficiency(tagName) {
    if (typeof window.Element === 'undefined') return false;
    if (!HAS_EXTENDED_CREATE_ELEMENT_SYNTAX) return false;
    var proto = window.Element.prototype;
    if (proto) {
      var id = '_' + (Math.random() + '').slice(2),
       el = document.createElement(tagName);
      proto[id] = 'x';
      var isBuggy = (el[id] !== 'x');
      delete proto[id];
      el = null;
      return isBuggy;
    }

    return false;
  }

  var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY =
   checkElementPrototypeDeficiency('object');

  function extendElementWith(element, methods) {
    for (var property in methods) {
      var value = methods[property];
      if (Object.isFunction(value) && !(property in element))
        element[property] = value.methodize();
    }
  }

  var EXTENDED = {};
  function elementIsExtended(element) {
    var uid = getUniqueElementID(element);
    return (uid in EXTENDED);
  }

  function extend(element) {
    if (!element || elementIsExtended(element)) return element;
    if (element.nodeType !== Node.ELEMENT_NODE || element == window)
      return element;

    var methods = Object.clone(Methods),
     tagName = element.tagName.toUpperCase();

    if (ByTag[tagName]) Object.extend(methods, ByTag[tagName]);

    extendElementWith(element, methods);
    EXTENDED[getUniqueElementID(element)] = true;
    return element;
  }

  function extend_IE8(element) {
    if (!element || elementIsExtended(element)) return element;

    var t = element.tagName;
    if (t && (/^(?:object|applet|embed)$/i.test(t))) {
      extendElementWith(element, Element.Methods);
      extendElementWith(element, Element.Methods.Simulated);
      extendElementWith(element, Element.Methods.ByTag[t.toUpperCase()]);
    }

    return element;
  }

  if (F.SpecificElementExtensions) {
    extend = HTMLOBJECTELEMENT_PROTOTYPE_BUGGY ? extend_IE8 : Prototype.K;
  }

  function addMethodsToTagName(tagName, methods) {
    tagName = tagName.toUpperCase();
    if (!ByTag[tagName]) ByTag[tagName] = {};
    Object.extend(ByTag[tagName], methods);
  }

  function mergeMethods(destination, methods, onlyIfAbsent) {
    if (Object.isUndefined(onlyIfAbsent)) onlyIfAbsent = false;
    for (var property in methods) {
      var value = methods[property];
      if (!Object.isFunction(value)) continue;
      if (!onlyIfAbsent || !(property in destination))
        destination[property] = value.methodize();
    }
  }

  function findDOMClass(tagName) {
    var klass;
    var trans = {
      "OPTGROUP": "OptGroup", "TEXTAREA": "TextArea", "P": "Paragraph",
      "FIELDSET": "FieldSet", "UL": "UList", "OL": "OList", "DL": "DList",
      "DIR": "Directory", "H1": "Heading", "H2": "Heading", "H3": "Heading",
      "H4": "Heading", "H5": "Heading", "H6": "Heading", "Q": "Quote",
      "INS": "Mod", "DEL": "Mod", "A": "Anchor", "IMG": "Image", "CAPTION":
      "TableCaption", "COL": "TableCol", "COLGROUP": "TableCol", "THEAD":
      "TableSection", "TFOOT": "TableSection", "TBODY": "TableSection", "TR":
      "TableRow", "TH": "TableCell", "TD": "TableCell", "FRAMESET":
      "FrameSet", "IFRAME": "IFrame"
    };
    if (trans[tagName]) klass = 'HTML' + trans[tagName] + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName.capitalize() + 'Element';
    if (window[klass]) return window[klass];

    var element = document.createElement(tagName),
     proto = element['__proto__'] || element.constructor.prototype;

    element = null;
    return proto;
  }

  function addMethods(methods) {
    if (arguments.length === 0) addFormMethods();

    if (arguments.length === 2) {
      var tagName = methods;
      methods = arguments[1];
    }

    if (!tagName) {
      Object.extend(Element.Methods, methods || {});
    } else {
      if (Object.isArray(tagName)) {
        for (var i = 0, tag; tag = tagName[i]; i++)
          addMethodsToTagName(tag, methods);
      } else {
        addMethodsToTagName(tagName, methods);
      }
    }

    var ELEMENT_PROTOTYPE = window.HTMLElement ? HTMLElement.prototype :
     Element.prototype;

    if (F.ElementExtensions) {
      mergeMethods(ELEMENT_PROTOTYPE, Element.Methods);
      mergeMethods(ELEMENT_PROTOTYPE, Element.Methods.Simulated, true);
    }

    if (F.SpecificElementExtensions) {
      for (var tag in Element.Methods.ByTag) {
        var klass = findDOMClass(tag);
        if (Object.isUndefined(klass)) continue;
        mergeMethods(klass.prototype, ByTag[tag]);
      }
    }

    Object.extend(Element, Element.Methods);
    Object.extend(Element, Element.Methods.Simulated);
    delete Element.ByTag;
    delete Element.Simulated;

    Element.extend.refresh();

    ELEMENT_CACHE = {};
  }

  Object.extend(GLOBAL.Element, {
    extend:     extend,
    addMethods: addMethods
  });

  if (extend === Prototype.K) {
    GLOBAL.Element.extend.refresh = Prototype.emptyFunction;
  } else {
    GLOBAL.Element.extend.refresh = function() {
      if (Prototype.BrowserFeatures.ElementExtensions) return;
      Object.extend(Methods, Element.Methods);
      Object.extend(Methods, Element.Methods.Simulated);

      EXTENDED = {};
    };
  }

  function addFormMethods() {
    Object.extend(Form, Form.Methods);
    Object.extend(Form.Element, Form.Element.Methods);
    Object.extend(Element.Methods.ByTag, {
      "FORM":     Object.clone(Form.Methods),
      "INPUT":    Object.clone(Form.Element.Methods),
      "SELECT":   Object.clone(Form.Element.Methods),
      "TEXTAREA": Object.clone(Form.Element.Methods),
      "BUTTON":   Object.clone(Form.Element.Methods)
    });
  }

  Element.addMethods(methods);

  function destroyCache_IE() {
    DIV = null;
    ELEMENT_CACHE = null;
  }

  if (window.attachEvent)
    window.attachEvent('onunload', destroyCache_IE);

})(this);
(function() {

  function toDecimal(pctString) {
    var match = pctString.match(/^(\d+)%?$/i);
    if (!match) return null;
    return (Number(match[1]) / 100);
  }

  function getRawStyle(element, style) {
    element = $(element);

    var value = element.style[style];
    if (!value || value === 'auto') {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }

    if (style === 'opacity') return value ? parseFloat(value) : 1.0;
    return value === 'auto' ? null : value;
  }

  function getRawStyle_IE(element, style) {
    var value = element.style[style];
    if (!value && element.currentStyle) {
      value = element.currentStyle[style];
    }
    return value;
  }

  function getContentWidth(element, context) {
    var boxWidth = element.offsetWidth;

    var bl = getPixelValue(element, 'borderLeftWidth',  context) || 0;
    var br = getPixelValue(element, 'borderRightWidth', context) || 0;
    var pl = getPixelValue(element, 'paddingLeft',      context) || 0;
    var pr = getPixelValue(element, 'paddingRight',     context) || 0;

    return boxWidth - bl - br - pl - pr;
  }

  if ('currentStyle' in document.documentElement) {
    getRawStyle = getRawStyle_IE;
  }


  function getPixelValue(value, property, context) {
    var element = null;
    if (Object.isElement(value)) {
      element = value;
      value = getRawStyle(element, property);
    }

    if (value === null || Object.isUndefined(value)) {
      return null;
    }

    if ((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(value)) {
      return window.parseFloat(value);
    }

    var isPercentage = value.include('%'), isViewport = (context === document.viewport);

    if (/\d/.test(value) && element && element.runtimeStyle && !(isPercentage && isViewport)) {
      var style = element.style.left, rStyle = element.runtimeStyle.left;
      element.runtimeStyle.left = element.currentStyle.left;
      element.style.left = value || 0;
      value = element.style.pixelLeft;
      element.style.left = style;
      element.runtimeStyle.left = rStyle;

      return value;
    }

    if (element && isPercentage) {
      context = context || element.parentNode;
      var decimal = toDecimal(value), whole = null;

      var isHorizontal = property.include('left') || property.include('right') ||
       property.include('width');

      var isVertical   = property.include('top') || property.include('bottom') ||
        property.include('height');

      if (context === document.viewport) {
        if (isHorizontal) {
          whole = document.viewport.getWidth();
        } else if (isVertical) {
          whole = document.viewport.getHeight();
        }
      } else {
        if (isHorizontal) {
          whole = $(context).measure('width');
        } else if (isVertical) {
          whole = $(context).measure('height');
        }
      }

      return (whole === null) ? 0 : whole * decimal;
    }

    return 0;
  }

  function toCSSPixels(number) {
    if (Object.isString(number) && number.endsWith('px'))
      return number;
    return number + 'px';
  }

  function isDisplayed(element) {
    while (element && element.parentNode) {
      var display = element.getStyle('display');
      if (display === 'none') {
        return false;
      }
      element = $(element.parentNode);
    }
    return true;
  }

  var hasLayout = Prototype.K;
  if ('currentStyle' in document.documentElement) {
    hasLayout = function(element) {
      if (!element.currentStyle.hasLayout) {
        element.style.zoom = 1;
      }
      return element;
    };
  }

  function cssNameFor(key) {
    if (key.include('border')) key = key + '-width';
    return key.camelize();
  }

  Element.Layout = Class.create(Hash, {
    initialize: function($super, element, preCompute) {
      $super();
      this.element = $(element);

      Element.Layout.PROPERTIES.each( function(property) {
        this._set(property, null);
      }, this);

      if (preCompute) {
        this._preComputing = true;
        this._begin();
        Element.Layout.PROPERTIES.each( this._compute, this );
        this._end();
        this._preComputing = false;
      }
    },

    _set: function(property, value) {
      return Hash.prototype.set.call(this, property, value);
    },

    set: function(property, value) {
      throw "Properties of Element.Layout are read-only.";
    },

    get: function($super, property) {
      var value = $super(property);
      return value === null ? this._compute(property) : value;
    },

    _begin: function() {
      if (this._isPrepared()) return;

      var element = this.element;
      if (isDisplayed(element)) {
        this._setPrepared(true);
        return;
      }


      var originalStyles = {
        position:   element.style.position   || '',
        width:      element.style.width      || '',
        visibility: element.style.visibility || '',
        display:    element.style.display    || ''
      };

      element.store('prototype_original_styles', originalStyles);

      var position = getRawStyle(element, 'position'), width = element.offsetWidth;

      if (width === 0 || width === null) {
        element.style.display = 'block';
        width = element.offsetWidth;
      }

      var context = (position === 'fixed') ? document.viewport :
       element.parentNode;

      var tempStyles = {
        visibility: 'hidden',
        display:    'block'
      };

      if (position !== 'fixed') tempStyles.position = 'absolute';

      element.setStyle(tempStyles);

      var positionedWidth = element.offsetWidth, newWidth;
      if (width && (positionedWidth === width)) {
        newWidth = getContentWidth(element, context);
      } else if (position === 'absolute' || position === 'fixed') {
        newWidth = getContentWidth(element, context);
      } else {
        var parent = element.parentNode, pLayout = $(parent).getLayout();

        newWidth = pLayout.get('width') -
         this.get('margin-left') -
         this.get('border-left') -
         this.get('padding-left') -
         this.get('padding-right') -
         this.get('border-right') -
         this.get('margin-right');
      }

      element.setStyle({ width: newWidth + 'px' });

      this._setPrepared(true);
    },

    _end: function() {
      var element = this.element;
      var originalStyles = element.retrieve('prototype_original_styles');
      element.store('prototype_original_styles', null);
      element.setStyle(originalStyles);
      this._setPrepared(false);
    },

    _compute: function(property) {
      var COMPUTATIONS = Element.Layout.COMPUTATIONS;
      if (!(property in COMPUTATIONS)) {
        throw "Property not found.";
      }

      return this._set(property, COMPUTATIONS[property].call(this, this.element));
    },

    _isPrepared: function() {
      return this.element.retrieve('prototype_element_layout_prepared', false);
    },

    _setPrepared: function(bool) {
      return this.element.store('prototype_element_layout_prepared', bool);
    },

    toObject: function() {
      var args = $A(arguments);
      var keys = (args.length === 0) ? Element.Layout.PROPERTIES :
       args.join(' ').split(' ');
      var obj = {};
      keys.each( function(key) {
        if (!Element.Layout.PROPERTIES.include(key)) return;
        var value = this.get(key);
        if (value != null) obj[key] = value;
      }, this);
      return obj;
    },

    toHash: function() {
      var obj = this.toObject.apply(this, arguments);
      return new Hash(obj);
    },

    toCSS: function() {
      var args = $A(arguments);
      var keys = (args.length === 0) ? Element.Layout.PROPERTIES :
       args.join(' ').split(' ');
      var css = {};

      keys.each( function(key) {
        if (!Element.Layout.PROPERTIES.include(key)) return;
        if (Element.Layout.COMPOSITE_PROPERTIES.include(key)) return;

        var value = this.get(key);
        if (value != null) css[cssNameFor(key)] = value + 'px';
      }, this);
      return css;
    },

    inspect: function() {
      return "#<Element.Layout>";
    }
  });

  Object.extend(Element.Layout, {
    PROPERTIES: $w('height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height'),

    COMPOSITE_PROPERTIES: $w('padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height'),

    COMPUTATIONS: {
      'height': function(element) {
        if (!this._preComputing) this._begin();

        var bHeight = this.get('border-box-height');
        if (bHeight <= 0) {
          if (!this._preComputing) this._end();
          return 0;
        }

        var bTop = this.get('border-top'),
         bBottom = this.get('border-bottom');

        var pTop = this.get('padding-top'),
         pBottom = this.get('padding-bottom');

        if (!this._preComputing) this._end();

        return bHeight - bTop - bBottom - pTop - pBottom;
      },

      'width': function(element) {
        if (!this._preComputing) this._begin();

        var bWidth = this.get('border-box-width');
        if (bWidth <= 0) {
          if (!this._preComputing) this._end();
          return 0;
        }

        var bLeft = this.get('border-left'),
         bRight = this.get('border-right');

        var pLeft = this.get('padding-left'),
         pRight = this.get('padding-right');

        if (!this._preComputing) this._end();
        return bWidth - bLeft - bRight - pLeft - pRight;
      },

      'padding-box-height': function(element) {
        var height = this.get('height'),
         pTop = this.get('padding-top'),
         pBottom = this.get('padding-bottom');

        return height + pTop + pBottom;
      },

      'padding-box-width': function(element) {
        var width = this.get('width'),
         pLeft = this.get('padding-left'),
         pRight = this.get('padding-right');

        return width + pLeft + pRight;
      },

      'border-box-height': function(element) {
        if (!this._preComputing) this._begin();
        var height = element.offsetHeight;
        if (!this._preComputing) this._end();
        return height;
      },

      'border-box-width': function(element) {
        if (!this._preComputing) this._begin();
        var width = element.offsetWidth;
        if (!this._preComputing) this._end();
        return width;
      },

      'margin-box-height': function(element) {
        var bHeight = this.get('border-box-height'),
         mTop = this.get('margin-top'),
         mBottom = this.get('margin-bottom');

        if (bHeight <= 0) return 0;

        return bHeight + mTop + mBottom;
      },

      'margin-box-width': function(element) {
        var bWidth = this.get('border-box-width'),
         mLeft = this.get('margin-left'),
         mRight = this.get('margin-right');

        if (bWidth <= 0) return 0;

        return bWidth + mLeft + mRight;
      },

      'top': function(element) {
        var offset = element.positionedOffset();
        return offset.top;
      },

      'bottom': function(element) {
        var offset = element.positionedOffset(),
         parent = element.getOffsetParent(),
         pHeight = parent.measure('height');

        var mHeight = this.get('border-box-height');

        return pHeight - mHeight - offset.top;
      },

      'left': function(element) {
        var offset = element.positionedOffset();
        return offset.left;
      },

      'right': function(element) {
        var offset = element.positionedOffset(),
         parent = element.getOffsetParent(),
         pWidth = parent.measure('width');

        var mWidth = this.get('border-box-width');

        return pWidth - mWidth - offset.left;
      },

      'padding-top': function(element) {
        return getPixelValue(element, 'paddingTop');
      },

      'padding-bottom': function(element) {
        return getPixelValue(element, 'paddingBottom');
      },

      'padding-left': function(element) {
        return getPixelValue(element, 'paddingLeft');
      },

      'padding-right': function(element) {
        return getPixelValue(element, 'paddingRight');
      },

      'border-top': function(element) {
        return getPixelValue(element, 'borderTopWidth');
      },

      'border-bottom': function(element) {
        return getPixelValue(element, 'borderBottomWidth');
      },

      'border-left': function(element) {
        return getPixelValue(element, 'borderLeftWidth');
      },

      'border-right': function(element) {
        return getPixelValue(element, 'borderRightWidth');
      },

      'margin-top': function(element) {
        return getPixelValue(element, 'marginTop');
      },

      'margin-bottom': function(element) {
        return getPixelValue(element, 'marginBottom');
      },

      'margin-left': function(element) {
        return getPixelValue(element, 'marginLeft');
      },

      'margin-right': function(element) {
        return getPixelValue(element, 'marginRight');
      }
    }
  });

  if ('getBoundingClientRect' in document.documentElement) {
    Object.extend(Element.Layout.COMPUTATIONS, {
      'right': function(element) {
        var parent = hasLayout(element.getOffsetParent());
        var rect = element.getBoundingClientRect(),
         pRect = parent.getBoundingClientRect();

        return (pRect.right - rect.right).round();
      },

      'bottom': function(element) {
        var parent = hasLayout(element.getOffsetParent());
        var rect = element.getBoundingClientRect(),
         pRect = parent.getBoundingClientRect();

        return (pRect.bottom - rect.bottom).round();
      }
    });
  }

  Element.Offset = Class.create({
    initialize: function(left, top) {
      this.left = left.round();
      this.top  = top.round();

      this[0] = this.left;
      this[1] = this.top;
    },

    relativeTo: function(offset) {
      return new Element.Offset(
        this.left - offset.left,
        this.top  - offset.top
      );
    },

    inspect: function() {
      return "#<Element.Offset left: #{left} top: #{top}>".interpolate(this);
    },

    toString: function() {
      return "[#{left}, #{top}]".interpolate(this);
    },

    toArray: function() {
      return [this.left, this.top];
    }
  });

  function getLayout(element, preCompute) {
    return new Element.Layout(element, preCompute);
  }

  function measure(element, property) {
    return $(element).getLayout().get(property);
  }

  function getHeight(element) {
    return Element.getDimensions(element).height;
  }

  function getWidth(element) {
    return Element.getDimensions(element).width;
  }

  function getDimensions(element) {
    element = $(element);
    var display = Element.getStyle(element, 'display');

    if (display && display !== 'none') {
      return { width: element.offsetWidth, height: element.offsetHeight };
    }

    var style = element.style;
    var originalStyles = {
      visibility: style.visibility,
      position:   style.position,
      display:    style.display
    };

    var newStyles = {
      visibility: 'hidden',
      display:    'block'
    };

    if (originalStyles.position !== 'fixed')
      newStyles.position = 'absolute';

    Element.setStyle(element, newStyles);

    var dimensions = {
      width:  element.offsetWidth,
      height: element.offsetHeight
    };

    Element.setStyle(element, originalStyles);

    return dimensions;
  }

  function getOffsetParent(element) {
    element = $(element);

    if (isDocument(element) || isDetached(element) || isBody(element) || isHtml(element))
      return $(document.body);

    var isInline = (Element.getStyle(element, 'display') === 'inline');
    if (!isInline && element.offsetParent) return $(element.offsetParent);

    while ((element = element.parentNode) && element !== document.body) {
      if (Element.getStyle(element, 'position') !== 'static') {
        return isHtml(element) ? $(document.body) : $(element);
      }
    }

    return $(document.body);
  }


  function cumulativeOffset(element) {
    element = $(element);
    var valueT = 0, valueL = 0;
    if (element.parentNode) {
      do {
        valueT += element.offsetTop  || 0;
        valueL += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);
    }
    return new Element.Offset(valueL, valueT);
  }

  function positionedOffset(element) {
    element = $(element);

    var layout = element.getLayout();

    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (isBody(element)) break;
        var p = Element.getStyle(element, 'position');
        if (p !== 'static') break;
      }
    } while (element);

    valueL -= layout.get('margin-top');
    valueT -= layout.get('margin-left');

    return new Element.Offset(valueL, valueT);
  }

  function cumulativeScrollOffset(element) {
    var valueT = 0, valueL = 0;
    do {
      if (element === document.body) {
        var bodyScrollNode = document.documentElement || document.body.parentNode || document.body;
        valueT += !Object.isUndefined(window.pageYOffset) ? window.pageYOffset : bodyScrollNode.scrollTop || 0;
        valueL += !Object.isUndefined(window.pageXOffset) ? window.pageXOffset : bodyScrollNode.scrollLeft || 0;
        break;
      } else {
        valueT += element.scrollTop  || 0;
        valueL += element.scrollLeft || 0;
        element = element.parentNode;
      }
    } while (element);
    return new Element.Offset(valueL, valueT);
  }

  function viewportOffset(forElement) {
    var valueT = 0, valueL = 0, docBody = document.body;

    forElement = $(forElement);
    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == docBody &&
        Element.getStyle(element, 'position') == 'absolute') break;
    } while (element = element.offsetParent);

    element = forElement;
    do {
      if (element != docBody) {
        valueT -= element.scrollTop  || 0;
        valueL -= element.scrollLeft || 0;
      }
    } while (element = element.parentNode);
    return new Element.Offset(valueL, valueT);
  }

  function absolutize(element) {
    element = $(element);

    if (Element.getStyle(element, 'position') === 'absolute') {
      return element;
    }

    var offsetParent = getOffsetParent(element);
    var eOffset = element.viewportOffset(),
     pOffset = offsetParent.viewportOffset();

    var offset = eOffset.relativeTo(pOffset);
    var layout = element.getLayout();

    element.store('prototype_absolutize_original_styles', {
      position: element.getStyle('position'),
      left:     element.getStyle('left'),
      top:      element.getStyle('top'),
      width:    element.getStyle('width'),
      height:   element.getStyle('height')
    });

    element.setStyle({
      position: 'absolute',
      top:    offset.top + 'px',
      left:   offset.left + 'px',
      width:  layout.get('width') + 'px',
      height: layout.get('height') + 'px'
    });

    return element;
  }

  function relativize(element) {
    element = $(element);
    if (Element.getStyle(element, 'position') === 'relative') {
      return element;
    }

    var originalStyles =
     element.retrieve('prototype_absolutize_original_styles');

    if (originalStyles) element.setStyle(originalStyles);
    return element;
  }


  function scrollTo(element) {
    element = $(element);
    var pos = Element.cumulativeOffset(element);
    window.scrollTo(pos.left, pos.top);
    return element;
  }


  function makePositioned(element) {
    element = $(element);
    var position = Element.getStyle(element, 'position'), styles = {};
    if (position === 'static' || !position) {
      styles.position = 'relative';
      if (Prototype.Browser.Opera) {
        styles.top  = 0;
        styles.left = 0;
      }
      Element.setStyle(element, styles);
      Element.store(element, 'prototype_made_positioned', true);
    }
    return element;
  }

  function undoPositioned(element) {
    element = $(element);
    var storage = Element.getStorage(element),
     madePositioned = storage.get('prototype_made_positioned');

    if (madePositioned) {
      storage.unset('prototype_made_positioned');
      Element.setStyle(element, {
        position: '',
        top:      '',
        bottom:   '',
        left:     '',
        right:    ''
      });
    }
    return element;
  }

  function makeClipping(element) {
    element = $(element);

    var storage = Element.getStorage(element),
     madeClipping = storage.get('prototype_made_clipping');

    if (Object.isUndefined(madeClipping)) {
      var overflow = Element.getStyle(element, 'overflow');
      storage.set('prototype_made_clipping', overflow);
      if (overflow !== 'hidden')
        element.style.overflow = 'hidden';
    }

    return element;
  }

  function undoClipping(element) {
    element = $(element);
    var storage = Element.getStorage(element),
     overflow = storage.get('prototype_made_clipping');

    if (!Object.isUndefined(overflow)) {
      storage.unset('prototype_made_clipping');
      element.style.overflow = overflow || '';
    }

    return element;
  }

  function clonePosition(element, source, options) {
    options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, options || {});

    source  = $(source);
    element = $(element);
    var p, delta, layout, styles = {};

    if (options.setLeft || options.setTop) {
      p = Element.viewportOffset(source);
      delta = [0, 0];
      if (Element.getStyle(element, 'position') === 'absolute') {
        var parent = Element.getOffsetParent(element);
        if (parent !== document.body) delta = Element.viewportOffset(parent);
      }
    }

    if (options.setWidth || options.setHeight) {
      layout = Element.getLayout(source);
    }

    if (options.setLeft)
      styles.left = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if (options.setTop)
      styles.top  = (p[1] - delta[1] + options.offsetTop)  + 'px';

    if (options.setWidth)
      styles.width  = layout.get('border-box-width')  + 'px';
    if (options.setHeight)
      styles.height = layout.get('border-box-height') + 'px';

    return Element.setStyle(element, styles);
  }


  if (Prototype.Browser.IE) {
    getOffsetParent = getOffsetParent.wrap(
      function(proceed, element) {
        element = $(element);

        if (isDocument(element) || isDetached(element) || isBody(element) || isHtml(element))
          return $(document.body);

        var position = element.getStyle('position');
        if (position !== 'static') return proceed(element);

        element.setStyle({ position: 'relative' });
        var value = proceed(element);
        element.setStyle({ position: position });
        return value;
      }
    );

    positionedOffset = positionedOffset.wrap(function(proceed, element) {
      element = $(element);
      if (!element.parentNode) return new Element.Offset(0, 0);
      var position = element.getStyle('position');
      if (position !== 'static') return proceed(element);

      var offsetParent = element.getOffsetParent();
      if (offsetParent && offsetParent.getStyle('position') === 'fixed')
        hasLayout(offsetParent);

      element.setStyle({ position: 'relative' });
      var value = proceed(element);
      element.setStyle({ position: position });
      return value;
    });
  } else if (Prototype.Browser.Webkit) {
    cumulativeOffset = function(element) {
      element = $(element);
      var valueT = 0, valueL = 0;
      do {
        valueT += element.offsetTop  || 0;
        valueL += element.offsetLeft || 0;
        if (element.offsetParent == document.body) {
          if (Element.getStyle(element, 'position') == 'absolute') break;
        }

        element = element.offsetParent;
      } while (element);

      return new Element.Offset(valueL, valueT);
    };
  }


  Element.addMethods({
    getLayout:              getLayout,
    measure:                measure,
    getWidth:               getWidth,
    getHeight:              getHeight,
    getDimensions:          getDimensions,
    getOffsetParent:        getOffsetParent,
    cumulativeOffset:       cumulativeOffset,
    positionedOffset:       positionedOffset,
    cumulativeScrollOffset: cumulativeScrollOffset,
    viewportOffset:         viewportOffset,
    absolutize:             absolutize,
    relativize:             relativize,
    scrollTo:               scrollTo,
    makePositioned:         makePositioned,
    undoPositioned:         undoPositioned,
    makeClipping:           makeClipping,
    undoClipping:           undoClipping,
    clonePosition:          clonePosition
  });

  function isBody(element) {
    return element.nodeName.toUpperCase() === 'BODY';
  }

  function isHtml(element) {
    return element.nodeName.toUpperCase() === 'HTML';
  }

  function isDocument(element) {
    return element.nodeType === Node.DOCUMENT_NODE;
  }

  function isDetached(element) {
    return element !== document.body &&
     !Element.descendantOf(element, document.body);
  }

  if ('getBoundingClientRect' in document.documentElement) {
    Element.addMethods({
      viewportOffset: function(element) {
        element = $(element);
        if (isDetached(element)) return new Element.Offset(0, 0);

        var rect = element.getBoundingClientRect(),
         docEl = document.documentElement;
        return new Element.Offset(rect.left - docEl.clientLeft,
         rect.top - docEl.clientTop);
      }
    });
  }


})();

(function() {

  var IS_OLD_OPERA = Prototype.Browser.Opera &&
   (window.parseFloat(window.opera.version()) < 9.5);
  var ROOT = null;
  function getRootElement() {
    if (ROOT) return ROOT;
    ROOT = IS_OLD_OPERA ? document.body : document.documentElement;
    return ROOT;
  }

  function getDimensions() {
    return { width: this.getWidth(), height: this.getHeight() };
  }

  function getWidth() {
    return getRootElement().clientWidth;
  }

  function getHeight() {
    return getRootElement().clientHeight;
  }

  function getScrollOffsets() {
    var x = window.pageXOffset || document.documentElement.scrollLeft ||
     document.body.scrollLeft;
    var y = window.pageYOffset || document.documentElement.scrollTop ||
     document.body.scrollTop;

    return new Element.Offset(x, y);
  }

  document.viewport = {
    getDimensions:    getDimensions,
    getWidth:         getWidth,
    getHeight:        getHeight,
    getScrollOffsets: getScrollOffsets
  };

})();
window.$$ = function() {
  var expression = $A(arguments).join(', ');
  return Prototype.Selector.select(expression, document);
};

Prototype.Selector = (function() {

  function select() {
    throw new Error('Method "Prototype.Selector.select" must be defined.');
  }

  function match() {
    throw new Error('Method "Prototype.Selector.match" must be defined.');
  }

  function find(elements, expression, index) {
    index = index || 0;
    var match = Prototype.Selector.match, length = elements.length, matchIndex = 0, i;

    for (i = 0; i < length; i++) {
      if (match(elements[i], expression) && index == matchIndex++) {
        return Element.extend(elements[i]);
      }
    }
  }

  function extendElements(elements) {
    for (var i = 0, length = elements.length; i < length; i++) {
      Element.extend(elements[i]);
    }
    return elements;
  }


  var K = Prototype.K;

  return {
    select: select,
    match: match,
    find: find,
    extendElements: (Element.extend === K) ? K : extendElements,
    extendElement: Element.extend
  };
})();
Prototype._original_property = window.Sizzle;
/*!
 * Sizzle CSS Selector Engine v@VERSION
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: @DATE
 */
(function( window ) {

var i,
  support,
  Expr,
  getText,
  isXML,
  compile,
  select,
  outermostContext,
  sortInput,
  hasDuplicate,

  setDocument,
  document,
  docElem,
  documentIsHTML,
  rbuggyQSA,
  rbuggyMatches,
  matches,
  contains,

  expando = "sizzle" + -(new Date()),
  preferredDoc = window.document,
  dirruns = 0,
  done = 0,
  classCache = createCache(),
  tokenCache = createCache(),
  compilerCache = createCache(),
  sortOrder = function( a, b ) {
    if ( a === b ) {
      hasDuplicate = true;
    }
    return 0;
  },

  strundefined = typeof undefined,
  MAX_NEGATIVE = 1 << 31,

  hasOwn = ({}).hasOwnProperty,
  arr = [],
  pop = arr.pop,
  push_native = arr.push,
  push = arr.push,
  slice = arr.slice,
  indexOf = arr.indexOf || function( elem ) {
    var i = 0,
      len = this.length;
    for ( ; i < len; i++ ) {
      if ( this[i] === elem ) {
        return i;
      }
    }
    return -1;
  },

  booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


  whitespace = "[\\x20\\t\\r\\n\\f]",
  characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

  identifier = characterEncoding.replace( "w", "w#" ),

  attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
    "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

  pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

  rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

  rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
  rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

  rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

  rpseudo = new RegExp( pseudos ),
  ridentifier = new RegExp( "^" + identifier + "$" ),

  matchExpr = {
    "ID": new RegExp( "^#(" + characterEncoding + ")" ),
    "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
    "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
    "ATTR": new RegExp( "^" + attributes ),
    "PSEUDO": new RegExp( "^" + pseudos ),
    "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
      "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
      "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
    "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
    "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
      whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
  },

  rinputs = /^(?:input|select|textarea|button)$/i,
  rheader = /^h\d$/i,

  rnative = /^[^{]+\{\s*\[native \w/,

  rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

  rsibling = /[+~]/,
  rescape = /'|\\/g,

  runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
  funescape = function( _, escaped, escapedWhitespace ) {
    var high = "0x" + escaped - 0x10000;
    return high !== high || escapedWhitespace ?
      escaped :
      high < 0 ?
        String.fromCharCode( high + 0x10000 ) :
        String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
  };

try {
  push.apply(
    (arr = slice.call( preferredDoc.childNodes )),
    preferredDoc.childNodes
  );
  arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
  push = { apply: arr.length ?

    function( target, els ) {
      push_native.apply( target, slice.call(els) );
    } :

    function( target, els ) {
      var j = target.length,
        i = 0;
      while ( (target[j++] = els[i++]) ) {}
      target.length = j - 1;
    }
  };
}

function Sizzle( selector, context, results, seed ) {
  var match, elem, m, nodeType,
    i, groups, old, nid, newContext, newSelector;

  if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
    setDocument( context );
  }

  context = context || document;
  results = results || [];

  if ( !selector || typeof selector !== "string" ) {
    return results;
  }

  if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
    return [];
  }

  if ( documentIsHTML && !seed ) {

    if ( (match = rquickExpr.exec( selector )) ) {
      if ( (m = match[1]) ) {
        if ( nodeType === 9 ) {
          elem = context.getElementById( m );
          if ( elem && elem.parentNode ) {
            if ( elem.id === m ) {
              results.push( elem );
              return results;
            }
          } else {
            return results;
          }
        } else {
          if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
            contains( context, elem ) && elem.id === m ) {
            results.push( elem );
            return results;
          }
        }

      } else if ( match[2] ) {
        push.apply( results, context.getElementsByTagName( selector ) );
        return results;

      } else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
        push.apply( results, context.getElementsByClassName( m ) );
        return results;
      }
    }

    if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
      nid = old = expando;
      newContext = context;
      newSelector = nodeType === 9 && selector;

      if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
        groups = tokenize( selector );

        if ( (old = context.getAttribute("id")) ) {
          nid = old.replace( rescape, "\\$&" );
        } else {
          context.setAttribute( "id", nid );
        }
        nid = "[id='" + nid + "'] ";

        i = groups.length;
        while ( i-- ) {
          groups[i] = nid + toSelector( groups[i] );
        }
        newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
        newSelector = groups.join(",");
      }

      if ( newSelector ) {
        try {
          push.apply( results,
            newContext.querySelectorAll( newSelector )
          );
          return results;
        } catch(qsaError) {
        } finally {
          if ( !old ) {
            context.removeAttribute("id");
          }
        }
      }
    }
  }

  return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *  deleting the oldest entry
 */
function createCache() {
  var keys = [];

  function cache( key, value ) {
    if ( keys.push( key + " " ) > Expr.cacheLength ) {
      delete cache[ keys.shift() ];
    }
    return (cache[ key + " " ] = value);
  }
  return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
  fn[ expando ] = true;
  return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
  var div = document.createElement("div");

  try {
    return !!fn( div );
  } catch (e) {
    return false;
  } finally {
    if ( div.parentNode ) {
      div.parentNode.removeChild( div );
    }
    div = null;
  }
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
  var arr = attrs.split("|"),
    i = attrs.length;

  while ( i-- ) {
    Expr.attrHandle[ arr[i] ] = handler;
  }
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
  var cur = b && a,
    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
      ( ~b.sourceIndex || MAX_NEGATIVE ) -
      ( ~a.sourceIndex || MAX_NEGATIVE );

  if ( diff ) {
    return diff;
  }

  if ( cur ) {
    while ( (cur = cur.nextSibling) ) {
      if ( cur === b ) {
        return -1;
      }
    }
  }

  return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
  return function( elem ) {
    var name = elem.nodeName.toLowerCase();
    return name === "input" && elem.type === type;
  };
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
  return function( elem ) {
    var name = elem.nodeName.toLowerCase();
    return (name === "input" || name === "button") && elem.type === type;
  };
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
  return markFunction(function( argument ) {
    argument = +argument;
    return markFunction(function( seed, matches ) {
      var j,
        matchIndexes = fn( [], seed.length, argument ),
        i = matchIndexes.length;

      while ( i-- ) {
        if ( seed[ (j = matchIndexes[i]) ] ) {
          seed[j] = !(matches[j] = seed[j]);
        }
      }
    });
  });
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
  return context && typeof context.getElementsByTagName !== strundefined && context;
}

support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
  var documentElement = elem && (elem.ownerDocument || elem).documentElement;
  return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
  var hasCompare,
    doc = node ? node.ownerDocument || node : preferredDoc,
    parent = doc.defaultView;

  if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
    return document;
  }

  document = doc;
  docElem = doc.documentElement;

  documentIsHTML = !isXML( doc );

  if ( parent && parent !== parent.top ) {
    if ( parent.addEventListener ) {
      parent.addEventListener( "unload", function() {
        setDocument();
      }, false );
    } else if ( parent.attachEvent ) {
      parent.attachEvent( "onunload", function() {
        setDocument();
      });
    }
  }

  /* Attributes
  ---------------------------------------------------------------------- */

  support.attributes = assert(function( div ) {
    div.className = "i";
    return !div.getAttribute("className");
  });

  /* getElement(s)By*
  ---------------------------------------------------------------------- */

  support.getElementsByTagName = assert(function( div ) {
    div.appendChild( doc.createComment("") );
    return !div.getElementsByTagName("*").length;
  });

  support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
    div.innerHTML = "<div class='a'></div><div class='a i'></div>";

    div.firstChild.className = "i";
    return div.getElementsByClassName("i").length === 2;
  });

  support.getById = assert(function( div ) {
    docElem.appendChild( div ).id = expando;
    return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
  });

  if ( support.getById ) {
    Expr.find["ID"] = function( id, context ) {
      if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
        var m = context.getElementById( id );
        return m && m.parentNode ? [m] : [];
      }
    };
    Expr.filter["ID"] = function( id ) {
      var attrId = id.replace( runescape, funescape );
      return function( elem ) {
        return elem.getAttribute("id") === attrId;
      };
    };
  } else {
    delete Expr.find["ID"];

    Expr.filter["ID"] =  function( id ) {
      var attrId = id.replace( runescape, funescape );
      return function( elem ) {
        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
        return node && node.value === attrId;
      };
    };
  }

  Expr.find["TAG"] = support.getElementsByTagName ?
    function( tag, context ) {
      if ( typeof context.getElementsByTagName !== strundefined ) {
        return context.getElementsByTagName( tag );
      }
    } :
    function( tag, context ) {
      var elem,
        tmp = [],
        i = 0,
        results = context.getElementsByTagName( tag );

      if ( tag === "*" ) {
        while ( (elem = results[i++]) ) {
          if ( elem.nodeType === 1 ) {
            tmp.push( elem );
          }
        }

        return tmp;
      }
      return results;
    };

  Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
    if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
      return context.getElementsByClassName( className );
    }
  };

  /* QSA/matchesSelector
  ---------------------------------------------------------------------- */


  rbuggyMatches = [];

  rbuggyQSA = [];

  if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
    assert(function( div ) {
      div.innerHTML = "<select t=''><option selected=''></option></select>";

      if ( div.querySelectorAll("[t^='']").length ) {
        rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
      }

      if ( !div.querySelectorAll("[selected]").length ) {
        rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
      }

      if ( !div.querySelectorAll(":checked").length ) {
        rbuggyQSA.push(":checked");
      }
    });

    assert(function( div ) {
      var input = doc.createElement("input");
      input.setAttribute( "type", "hidden" );
      div.appendChild( input ).setAttribute( "name", "D" );

      if ( div.querySelectorAll("[name=d]").length ) {
        rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
      }

      if ( !div.querySelectorAll(":enabled").length ) {
        rbuggyQSA.push( ":enabled", ":disabled" );
      }

      div.querySelectorAll("*,:x");
      rbuggyQSA.push(",.*:");
    });
  }

  if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
    docElem.mozMatchesSelector ||
    docElem.oMatchesSelector ||
    docElem.msMatchesSelector) )) ) {

    assert(function( div ) {
      support.disconnectedMatch = matches.call( div, "div" );

      matches.call( div, "[s!='']:x" );
      rbuggyMatches.push( "!=", pseudos );
    });
  }

  rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
  rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

  /* Contains
  ---------------------------------------------------------------------- */
  hasCompare = rnative.test( docElem.compareDocumentPosition );

  contains = hasCompare || rnative.test( docElem.contains ) ?
    function( a, b ) {
      var adown = a.nodeType === 9 ? a.documentElement : a,
        bup = b && b.parentNode;
      return a === bup || !!( bup && bup.nodeType === 1 && (
        adown.contains ?
          adown.contains( bup ) :
          a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
      ));
    } :
    function( a, b ) {
      if ( b ) {
        while ( (b = b.parentNode) ) {
          if ( b === a ) {
            return true;
          }
        }
      }
      return false;
    };

  /* Sorting
  ---------------------------------------------------------------------- */

  sortOrder = hasCompare ?
  function( a, b ) {

    if ( a === b ) {
      hasDuplicate = true;
      return 0;
    }

    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
    if ( compare ) {
      return compare;
    }

    compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
      a.compareDocumentPosition( b ) :

      1;

    if ( compare & 1 ||
      (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

      if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
        return -1;
      }
      if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
        return 1;
      }

      return sortInput ?
        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
        0;
    }

    return compare & 4 ? -1 : 1;
  } :
  function( a, b ) {
    if ( a === b ) {
      hasDuplicate = true;
      return 0;
    }

    var cur,
      i = 0,
      aup = a.parentNode,
      bup = b.parentNode,
      ap = [ a ],
      bp = [ b ];

    if ( !aup || !bup ) {
      return a === doc ? -1 :
        b === doc ? 1 :
        aup ? -1 :
        bup ? 1 :
        sortInput ?
        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
        0;

    } else if ( aup === bup ) {
      return siblingCheck( a, b );
    }

    cur = a;
    while ( (cur = cur.parentNode) ) {
      ap.unshift( cur );
    }
    cur = b;
    while ( (cur = cur.parentNode) ) {
      bp.unshift( cur );
    }

    while ( ap[i] === bp[i] ) {
      i++;
    }

    return i ?
      siblingCheck( ap[i], bp[i] ) :

      ap[i] === preferredDoc ? -1 :
      bp[i] === preferredDoc ? 1 :
      0;
  };

  return doc;
};

Sizzle.matches = function( expr, elements ) {
  return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
  if ( ( elem.ownerDocument || elem ) !== document ) {
    setDocument( elem );
  }

  expr = expr.replace( rattributeQuotes, "='$1']" );

  if ( support.matchesSelector && documentIsHTML &&
    ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
    ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

    try {
      var ret = matches.call( elem, expr );

      if ( ret || support.disconnectedMatch ||
          elem.document && elem.document.nodeType !== 11 ) {
        return ret;
      }
    } catch(e) {}
  }

  return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
  if ( ( context.ownerDocument || context ) !== document ) {
    setDocument( context );
  }
  return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
  if ( ( elem.ownerDocument || elem ) !== document ) {
    setDocument( elem );
  }

  var fn = Expr.attrHandle[ name.toLowerCase() ],
    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
      fn( elem, name, !documentIsHTML ) :
      undefined;

  return val !== undefined ?
    val :
    support.attributes || !documentIsHTML ?
      elem.getAttribute( name ) :
      (val = elem.getAttributeNode(name)) && val.specified ?
        val.value :
        null;
};

Sizzle.error = function( msg ) {
  throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
  var elem,
    duplicates = [],
    j = 0,
    i = 0;

  hasDuplicate = !support.detectDuplicates;
  sortInput = !support.sortStable && results.slice( 0 );
  results.sort( sortOrder );

  if ( hasDuplicate ) {
    while ( (elem = results[i++]) ) {
      if ( elem === results[ i ] ) {
        j = duplicates.push( i );
      }
    }
    while ( j-- ) {
      results.splice( duplicates[ j ], 1 );
    }
  }

  sortInput = null;

  return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
  var node,
    ret = "",
    i = 0,
    nodeType = elem.nodeType;

  if ( !nodeType ) {
    while ( (node = elem[i++]) ) {
      ret += getText( node );
    }
  } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
    if ( typeof elem.textContent === "string" ) {
      return elem.textContent;
    } else {
      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
        ret += getText( elem );
      }
    }
  } else if ( nodeType === 3 || nodeType === 4 ) {
    return elem.nodeValue;
  }

  return ret;
};

Expr = Sizzle.selectors = {

  cacheLength: 50,

  createPseudo: markFunction,

  match: matchExpr,

  attrHandle: {},

  find: {},

  relative: {
    ">": { dir: "parentNode", first: true },
    " ": { dir: "parentNode" },
    "+": { dir: "previousSibling", first: true },
    "~": { dir: "previousSibling" }
  },

  preFilter: {
    "ATTR": function( match ) {
      match[1] = match[1].replace( runescape, funescape );

      match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

      if ( match[2] === "~=" ) {
        match[3] = " " + match[3] + " ";
      }

      return match.slice( 0, 4 );
    },

    "CHILD": function( match ) {
      /* matches from matchExpr["CHILD"]
        1 type (only|nth|...)
        2 what (child|of-type)
        3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
        4 xn-component of xn+y argument ([+-]?\d*n|)
        5 sign of xn-component
        6 x of xn-component
        7 sign of y-component
        8 y of y-component
      */
      match[1] = match[1].toLowerCase();

      if ( match[1].slice( 0, 3 ) === "nth" ) {
        if ( !match[3] ) {
          Sizzle.error( match[0] );
        }

        match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
        match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

      } else if ( match[3] ) {
        Sizzle.error( match[0] );
      }

      return match;
    },

    "PSEUDO": function( match ) {
      var excess,
        unquoted = !match[5] && match[2];

      if ( matchExpr["CHILD"].test( match[0] ) ) {
        return null;
      }

      if ( match[3] && match[4] !== undefined ) {
        match[2] = match[4];

      } else if ( unquoted && rpseudo.test( unquoted ) &&
        (excess = tokenize( unquoted, true )) &&
        (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

        match[0] = match[0].slice( 0, excess );
        match[2] = unquoted.slice( 0, excess );
      }

      return match.slice( 0, 3 );
    }
  },

  filter: {

    "TAG": function( nodeNameSelector ) {
      var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
      return nodeNameSelector === "*" ?
        function() { return true; } :
        function( elem ) {
          return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
        };
    },

    "CLASS": function( className ) {
      var pattern = classCache[ className + " " ];

      return pattern ||
        (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
        classCache( className, function( elem ) {
          return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
        });
    },

    "ATTR": function( name, operator, check ) {
      return function( elem ) {
        var result = Sizzle.attr( elem, name );

        if ( result == null ) {
          return operator === "!=";
        }
        if ( !operator ) {
          return true;
        }

        result += "";

        return operator === "=" ? result === check :
          operator === "!=" ? result !== check :
          operator === "^=" ? check && result.indexOf( check ) === 0 :
          operator === "*=" ? check && result.indexOf( check ) > -1 :
          operator === "$=" ? check && result.slice( -check.length ) === check :
          operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
          operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
          false;
      };
    },

    "CHILD": function( type, what, argument, first, last ) {
      var simple = type.slice( 0, 3 ) !== "nth",
        forward = type.slice( -4 ) !== "last",
        ofType = what === "of-type";

      return first === 1 && last === 0 ?

        function( elem ) {
          return !!elem.parentNode;
        } :

        function( elem, context, xml ) {
          var cache, outerCache, node, diff, nodeIndex, start,
            dir = simple !== forward ? "nextSibling" : "previousSibling",
            parent = elem.parentNode,
            name = ofType && elem.nodeName.toLowerCase(),
            useCache = !xml && !ofType;

          if ( parent ) {

            if ( simple ) {
              while ( dir ) {
                node = elem;
                while ( (node = node[ dir ]) ) {
                  if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                    return false;
                  }
                }
                start = dir = type === "only" && !start && "nextSibling";
              }
              return true;
            }

            start = [ forward ? parent.firstChild : parent.lastChild ];

            if ( forward && useCache ) {
              outerCache = parent[ expando ] || (parent[ expando ] = {});
              cache = outerCache[ type ] || [];
              nodeIndex = cache[0] === dirruns && cache[1];
              diff = cache[0] === dirruns && cache[2];
              node = nodeIndex && parent.childNodes[ nodeIndex ];

              while ( (node = ++nodeIndex && node && node[ dir ] ||

                (diff = nodeIndex = 0) || start.pop()) ) {

                if ( node.nodeType === 1 && ++diff && node === elem ) {
                  outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                  break;
                }
              }

            } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
              diff = cache[1];

            } else {
              while ( (node = ++nodeIndex && node && node[ dir ] ||
                (diff = nodeIndex = 0) || start.pop()) ) {

                if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                  if ( useCache ) {
                    (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                  }

                  if ( node === elem ) {
                    break;
                  }
                }
              }
            }

            diff -= last;
            return diff === first || ( diff % first === 0 && diff / first >= 0 );
          }
        };
    },

    "PSEUDO": function( pseudo, argument ) {
      var args,
        fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
          Sizzle.error( "unsupported pseudo: " + pseudo );

      if ( fn[ expando ] ) {
        return fn( argument );
      }

      if ( fn.length > 1 ) {
        args = [ pseudo, pseudo, "", argument ];
        return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
          markFunction(function( seed, matches ) {
            var idx,
              matched = fn( seed, argument ),
              i = matched.length;
            while ( i-- ) {
              idx = indexOf.call( seed, matched[i] );
              seed[ idx ] = !( matches[ idx ] = matched[i] );
            }
          }) :
          function( elem ) {
            return fn( elem, 0, args );
          };
      }

      return fn;
    }
  },

  pseudos: {
    "not": markFunction(function( selector ) {
      var input = [],
        results = [],
        matcher = compile( selector.replace( rtrim, "$1" ) );

      return matcher[ expando ] ?
        markFunction(function( seed, matches, context, xml ) {
          var elem,
            unmatched = matcher( seed, null, xml, [] ),
            i = seed.length;

          while ( i-- ) {
            if ( (elem = unmatched[i]) ) {
              seed[i] = !(matches[i] = elem);
            }
          }
        }) :
        function( elem, context, xml ) {
          input[0] = elem;
          matcher( input, null, xml, results );
          return !results.pop();
        };
    }),

    "has": markFunction(function( selector ) {
      return function( elem ) {
        return Sizzle( selector, elem ).length > 0;
      };
    }),

    "contains": markFunction(function( text ) {
      return function( elem ) {
        return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
      };
    }),

    "lang": markFunction( function( lang ) {
      if ( !ridentifier.test(lang || "") ) {
        Sizzle.error( "unsupported lang: " + lang );
      }
      lang = lang.replace( runescape, funescape ).toLowerCase();
      return function( elem ) {
        var elemLang;
        do {
          if ( (elemLang = documentIsHTML ?
            elem.lang :
            elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

            elemLang = elemLang.toLowerCase();
            return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
          }
        } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
        return false;
      };
    }),

    "target": function( elem ) {
      var hash = window.location && window.location.hash;
      return hash && hash.slice( 1 ) === elem.id;
    },

    "root": function( elem ) {
      return elem === docElem;
    },

    "focus": function( elem ) {
      return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
    },

    "enabled": function( elem ) {
      return elem.disabled === false;
    },

    "disabled": function( elem ) {
      return elem.disabled === true;
    },

    "checked": function( elem ) {
      var nodeName = elem.nodeName.toLowerCase();
      return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
    },

    "selected": function( elem ) {
      if ( elem.parentNode ) {
        elem.parentNode.selectedIndex;
      }

      return elem.selected === true;
    },

    "empty": function( elem ) {
      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
        if ( elem.nodeType < 6 ) {
          return false;
        }
      }
      return true;
    },

    "parent": function( elem ) {
      return !Expr.pseudos["empty"]( elem );
    },

    "header": function( elem ) {
      return rheader.test( elem.nodeName );
    },

    "input": function( elem ) {
      return rinputs.test( elem.nodeName );
    },

    "button": function( elem ) {
      var name = elem.nodeName.toLowerCase();
      return name === "input" && elem.type === "button" || name === "button";
    },

    "text": function( elem ) {
      var attr;
      return elem.nodeName.toLowerCase() === "input" &&
        elem.type === "text" &&

        ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
    },

    "first": createPositionalPseudo(function() {
      return [ 0 ];
    }),

    "last": createPositionalPseudo(function( matchIndexes, length ) {
      return [ length - 1 ];
    }),

    "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
      return [ argument < 0 ? argument + length : argument ];
    }),

    "even": createPositionalPseudo(function( matchIndexes, length ) {
      var i = 0;
      for ( ; i < length; i += 2 ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "odd": createPositionalPseudo(function( matchIndexes, length ) {
      var i = 1;
      for ( ; i < length; i += 2 ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
      var i = argument < 0 ? argument + length : argument;
      for ( ; --i >= 0; ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
      var i = argument < 0 ? argument + length : argument;
      for ( ; ++i < length; ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    })
  }
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
  Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
  Expr.pseudos[ i ] = createButtonPseudo( i );
}

function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
  var matched, match, tokens, type,
    soFar, groups, preFilters,
    cached = tokenCache[ selector + " " ];

  if ( cached ) {
    return parseOnly ? 0 : cached.slice( 0 );
  }

  soFar = selector;
  groups = [];
  preFilters = Expr.preFilter;

  while ( soFar ) {

    if ( !matched || (match = rcomma.exec( soFar )) ) {
      if ( match ) {
        soFar = soFar.slice( match[0].length ) || soFar;
      }
      groups.push( (tokens = []) );
    }

    matched = false;

    if ( (match = rcombinators.exec( soFar )) ) {
      matched = match.shift();
      tokens.push({
        value: matched,
        type: match[0].replace( rtrim, " " )
      });
      soFar = soFar.slice( matched.length );
    }

    for ( type in Expr.filter ) {
      if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
        (match = preFilters[ type ]( match ))) ) {
        matched = match.shift();
        tokens.push({
          value: matched,
          type: type,
          matches: match
        });
        soFar = soFar.slice( matched.length );
      }
    }

    if ( !matched ) {
      break;
    }
  }

  return parseOnly ?
    soFar.length :
    soFar ?
      Sizzle.error( selector ) :
      tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
  var i = 0,
    len = tokens.length,
    selector = "";
  for ( ; i < len; i++ ) {
    selector += tokens[i].value;
  }
  return selector;
}

function addCombinator( matcher, combinator, base ) {
  var dir = combinator.dir,
    checkNonElements = base && dir === "parentNode",
    doneName = done++;

  return combinator.first ?
    function( elem, context, xml ) {
      while ( (elem = elem[ dir ]) ) {
        if ( elem.nodeType === 1 || checkNonElements ) {
          return matcher( elem, context, xml );
        }
      }
    } :

    function( elem, context, xml ) {
      var oldCache, outerCache,
        newCache = [ dirruns, doneName ];

      if ( xml ) {
        while ( (elem = elem[ dir ]) ) {
          if ( elem.nodeType === 1 || checkNonElements ) {
            if ( matcher( elem, context, xml ) ) {
              return true;
            }
          }
        }
      } else {
        while ( (elem = elem[ dir ]) ) {
          if ( elem.nodeType === 1 || checkNonElements ) {
            outerCache = elem[ expando ] || (elem[ expando ] = {});
            if ( (oldCache = outerCache[ dir ]) &&
              oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

              return (newCache[ 2 ] = oldCache[ 2 ]);
            } else {
              outerCache[ dir ] = newCache;

              if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
                return true;
              }
            }
          }
        }
      }
    };
}

function elementMatcher( matchers ) {
  return matchers.length > 1 ?
    function( elem, context, xml ) {
      var i = matchers.length;
      while ( i-- ) {
        if ( !matchers[i]( elem, context, xml ) ) {
          return false;
        }
      }
      return true;
    } :
    matchers[0];
}

function multipleContexts( selector, contexts, results ) {
  var i = 0,
    len = contexts.length;
  for ( ; i < len; i++ ) {
    Sizzle( selector, contexts[i], results );
  }
  return results;
}

function condense( unmatched, map, filter, context, xml ) {
  var elem,
    newUnmatched = [],
    i = 0,
    len = unmatched.length,
    mapped = map != null;

  for ( ; i < len; i++ ) {
    if ( (elem = unmatched[i]) ) {
      if ( !filter || filter( elem, context, xml ) ) {
        newUnmatched.push( elem );
        if ( mapped ) {
          map.push( i );
        }
      }
    }
  }

  return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
  if ( postFilter && !postFilter[ expando ] ) {
    postFilter = setMatcher( postFilter );
  }
  if ( postFinder && !postFinder[ expando ] ) {
    postFinder = setMatcher( postFinder, postSelector );
  }
  return markFunction(function( seed, results, context, xml ) {
    var temp, i, elem,
      preMap = [],
      postMap = [],
      preexisting = results.length,

      elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

      matcherIn = preFilter && ( seed || !selector ) ?
        condense( elems, preMap, preFilter, context, xml ) :
        elems,

      matcherOut = matcher ?
        postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

          [] :

          results :
        matcherIn;

    if ( matcher ) {
      matcher( matcherIn, matcherOut, context, xml );
    }

    if ( postFilter ) {
      temp = condense( matcherOut, postMap );
      postFilter( temp, [], context, xml );

      i = temp.length;
      while ( i-- ) {
        if ( (elem = temp[i]) ) {
          matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
        }
      }
    }

    if ( seed ) {
      if ( postFinder || preFilter ) {
        if ( postFinder ) {
          temp = [];
          i = matcherOut.length;
          while ( i-- ) {
            if ( (elem = matcherOut[i]) ) {
              temp.push( (matcherIn[i] = elem) );
            }
          }
          postFinder( null, (matcherOut = []), temp, xml );
        }

        i = matcherOut.length;
        while ( i-- ) {
          if ( (elem = matcherOut[i]) &&
            (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

            seed[temp] = !(results[temp] = elem);
          }
        }
      }

    } else {
      matcherOut = condense(
        matcherOut === results ?
          matcherOut.splice( preexisting, matcherOut.length ) :
          matcherOut
      );
      if ( postFinder ) {
        postFinder( null, results, matcherOut, xml );
      } else {
        push.apply( results, matcherOut );
      }
    }
  });
}

function matcherFromTokens( tokens ) {
  var checkContext, matcher, j,
    len = tokens.length,
    leadingRelative = Expr.relative[ tokens[0].type ],
    implicitRelative = leadingRelative || Expr.relative[" "],
    i = leadingRelative ? 1 : 0,

    matchContext = addCombinator( function( elem ) {
      return elem === checkContext;
    }, implicitRelative, true ),
    matchAnyContext = addCombinator( function( elem ) {
      return indexOf.call( checkContext, elem ) > -1;
    }, implicitRelative, true ),
    matchers = [ function( elem, context, xml ) {
      return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
        (checkContext = context).nodeType ?
          matchContext( elem, context, xml ) :
          matchAnyContext( elem, context, xml ) );
    } ];

  for ( ; i < len; i++ ) {
    if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
      matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
    } else {
      matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

      if ( matcher[ expando ] ) {
        j = ++i;
        for ( ; j < len; j++ ) {
          if ( Expr.relative[ tokens[j].type ] ) {
            break;
          }
        }
        return setMatcher(
          i > 1 && elementMatcher( matchers ),
          i > 1 && toSelector(
            tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
          ).replace( rtrim, "$1" ),
          matcher,
          i < j && matcherFromTokens( tokens.slice( i, j ) ),
          j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
          j < len && toSelector( tokens )
        );
      }
      matchers.push( matcher );
    }
  }

  return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
  var bySet = setMatchers.length > 0,
    byElement = elementMatchers.length > 0,
    superMatcher = function( seed, context, xml, results, outermost ) {
      var elem, j, matcher,
        matchedCount = 0,
        i = "0",
        unmatched = seed && [],
        setMatched = [],
        contextBackup = outermostContext,
        elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
        len = elems.length;

      if ( outermost ) {
        outermostContext = context !== document && context;
      }

      for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
        if ( byElement && elem ) {
          j = 0;
          while ( (matcher = elementMatchers[j++]) ) {
            if ( matcher( elem, context, xml ) ) {
              results.push( elem );
              break;
            }
          }
          if ( outermost ) {
            dirruns = dirrunsUnique;
          }
        }

        if ( bySet ) {
          if ( (elem = !matcher && elem) ) {
            matchedCount--;
          }

          if ( seed ) {
            unmatched.push( elem );
          }
        }
      }

      matchedCount += i;
      if ( bySet && i !== matchedCount ) {
        j = 0;
        while ( (matcher = setMatchers[j++]) ) {
          matcher( unmatched, setMatched, context, xml );
        }

        if ( seed ) {
          if ( matchedCount > 0 ) {
            while ( i-- ) {
              if ( !(unmatched[i] || setMatched[i]) ) {
                setMatched[i] = pop.call( results );
              }
            }
          }

          setMatched = condense( setMatched );
        }

        push.apply( results, setMatched );

        if ( outermost && !seed && setMatched.length > 0 &&
          ( matchedCount + setMatchers.length ) > 1 ) {

          Sizzle.uniqueSort( results );
        }
      }

      if ( outermost ) {
        dirruns = dirrunsUnique;
        outermostContext = contextBackup;
      }

      return unmatched;
    };

  return bySet ?
    markFunction( superMatcher ) :
    superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
  var i,
    setMatchers = [],
    elementMatchers = [],
    cached = compilerCache[ selector + " " ];

  if ( !cached ) {
    if ( !match ) {
      match = tokenize( selector );
    }
    i = match.length;
    while ( i-- ) {
      cached = matcherFromTokens( match[i] );
      if ( cached[ expando ] ) {
        setMatchers.push( cached );
      } else {
        elementMatchers.push( cached );
      }
    }

    cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

    cached.selector = selector;
  }
  return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
  var i, tokens, token, type, find,
    compiled = typeof selector === "function" && selector,
    match = !seed && tokenize( (selector = compiled.selector || selector) );

  results = results || [];

  if ( match.length === 1 ) {

    tokens = match[0] = match[0].slice( 0 );
    if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
        support.getById && context.nodeType === 9 && documentIsHTML &&
        Expr.relative[ tokens[1].type ] ) {

      context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
      if ( !context ) {
        return results;

      } else if ( compiled ) {
        context = context.parentNode;
      }

      selector = selector.slice( tokens.shift().value.length );
    }

    i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
    while ( i-- ) {
      token = tokens[i];

      if ( Expr.relative[ (type = token.type) ] ) {
        break;
      }
      if ( (find = Expr.find[ type ]) ) {
        if ( (seed = find(
          token.matches[0].replace( runescape, funescape ),
          rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
        )) ) {

          tokens.splice( i, 1 );
          selector = seed.length && toSelector( tokens );
          if ( !selector ) {
            push.apply( results, seed );
            return results;
          }

          break;
        }
      }
    }
  }

  ( compiled || compile( selector, match ) )(
    seed,
    context,
    !documentIsHTML,
    results,
    rsibling.test( selector ) && testContext( context.parentNode ) || context
  );
  return results;
};


support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

support.detectDuplicates = !!hasDuplicate;

setDocument();

support.sortDetached = assert(function( div1 ) {
  return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

if ( !assert(function( div ) {
  div.innerHTML = "<a href='#'></a>";
  return div.firstChild.getAttribute("href") === "#" ;
}) ) {
  addHandle( "type|href|height|width", function( elem, name, isXML ) {
    if ( !isXML ) {
      return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
    }
  });
}

if ( !support.attributes || !assert(function( div ) {
  div.innerHTML = "<input/>";
  div.firstChild.setAttribute( "value", "" );
  return div.firstChild.getAttribute( "value" ) === "";
}) ) {
  addHandle( "value", function( elem, name, isXML ) {
    if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
      return elem.defaultValue;
    }
  });
}

if ( !assert(function( div ) {
  return div.getAttribute("disabled") == null;
}) ) {
  addHandle( booleans, function( elem, name, isXML ) {
    var val;
    if ( !isXML ) {
      return elem[ name ] === true ? name.toLowerCase() :
          (val = elem.getAttributeNode( name )) && val.specified ?
          val.value :
        null;
    }
  });
}

if ( typeof define === "function" && define.amd ) {
  define(function() { return Sizzle; });
} else if ( typeof module !== "undefined" && module.exports ) {
  module.exports = Sizzle;
} else {
  window.Sizzle = Sizzle;
}

})( window );

;(function(engine) {
  var extendElements = Prototype.Selector.extendElements;

  function select(selector, scope) {
    return extendElements(engine(selector, scope || document));
  }

  function match(element, selector) {
    return engine.matches(selector, [element]).length == 1;
  }

  Prototype.Selector.engine = engine;
  Prototype.Selector.select = select;
  Prototype.Selector.match = match;
})(Sizzle);

window.Sizzle = Prototype._original_property;
delete Prototype._original_property;

var Form = {
  reset: function(form) {
    form = $(form);
    form.reset();
    return form;
  },

  serializeElements: function(elements, options) {
    if (typeof options != 'object') options = { hash: !!options };
    else if (Object.isUndefined(options.hash)) options.hash = true;
    var key, value, submitted = false, submit = options.submit, accumulator, initial;

    if (options.hash) {
      initial = {};
      accumulator = function(result, key, value) {
        if (key in result) {
          if (!Object.isArray(result[key])) result[key] = [result[key]];
          result[key] = result[key].concat(value);
        } else result[key] = value;
        return result;
      };
    } else {
      initial = '';
      accumulator = function(result, key, values) {
        if (!Object.isArray(values)) {values = [values];}
        if (!values.length) {return result;}
        var encodedKey = encodeURIComponent(key).gsub(/%20/, '+');
        return result + (result ? "&" : "") + values.map(function (value) {
          value = value.gsub(/(\r)?\n/, '\r\n');
          value = encodeURIComponent(value);
          value = value.gsub(/%20/, '+');
          return encodedKey + "=" + value;
        }).join("&");
      };
    }

    return elements.inject(initial, function(result, element) {
      if (!element.disabled && element.name) {
        key = element.name; value = $(element).getValue();
        if (value != null && element.type != 'file' && (element.type != 'submit' || (!submitted &&
            submit !== false && (!submit || key == submit) && (submitted = true)))) {
          result = accumulator(result, key, value);
        }
      }
      return result;
    });
  }
};

Form.Methods = {
  serialize: function(form, options) {
    return Form.serializeElements(Form.getElements(form), options);
  },


  getElements: function(form) {
    var elements = $(form).getElementsByTagName('*');
    var element, results = [], serializers = Form.Element.Serializers;

    for (var i = 0; element = elements[i]; i++) {
      if (serializers[element.tagName.toLowerCase()])
        results.push(Element.extend(element));
    }
    return results;
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name) return $A(inputs).map(Element.extend);

    for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) || (name && input.name != name))
        continue;
      matchingInputs.push(Element.extend(input));
    }

    return matchingInputs;
  },

  disable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('disable');
    return form;
  },

  enable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('enable');
    return form;
  },

  findFirstElement: function(form) {
    var elements = $(form).getElements().findAll(function(element) {
      return 'hidden' != element.type && !element.disabled;
    });
    var firstByIndex = elements.findAll(function(element) {
      return element.hasAttribute('tabIndex') && element.tabIndex >= 0;
    }).sortBy(function(element) { return element.tabIndex }).first();

    return firstByIndex ? firstByIndex : elements.find(function(element) {
      return /^(?:input|select|textarea)$/i.test(element.tagName);
    });
  },

  focusFirstElement: function(form) {
    form = $(form);
    var element = form.findFirstElement();
    if (element) element.activate();
    return form;
  },

  request: function(form, options) {
    form = $(form), options = Object.clone(options || { });

    var params = options.parameters, action = form.readAttribute('action') || '';
    if (action.blank()) action = window.location.href;
    options.parameters = form.serialize(true);

    if (params) {
      if (Object.isString(params)) params = params.toQueryParams();
      Object.extend(options.parameters, params);
    }

    if (form.hasAttribute('method') && !options.method)
      options.method = form.method;

    return new Ajax.Request(action, options);
  }
};

/*--------------------------------------------------------------------------*/


Form.Element = {
  focus: function(element) {
    $(element).focus();
    return element;
  },

  select: function(element) {
    $(element).select();
    return element;
  }
};

Form.Element.Methods = {

  serialize: function(element) {
    element = $(element);
    if (!element.disabled && element.name) {
      var value = element.getValue();
      if (value != undefined) {
        var pair = { };
        pair[element.name] = value;
        return Object.toQueryString(pair);
      }
    }
    return '';
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    return Form.Element.Serializers[method](element);
  },

  setValue: function(element, value) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    Form.Element.Serializers[method](element, value);
    return element;
  },

  clear: function(element) {
    $(element).value = '';
    return element;
  },

  present: function(element) {
    return $(element).value != '';
  },

  activate: function(element) {
    element = $(element);
    try {
      element.focus();
      if (element.select && (element.tagName.toLowerCase() != 'input' ||
          !(/^(?:button|reset|submit)$/i.test(element.type))))
        element.select();
    } catch (e) { }
    return element;
  },

  disable: function(element) {
    element = $(element);
    element.disabled = true;
    return element;
  },

  enable: function(element) {
    element = $(element);
    element.disabled = false;
    return element;
  }
};

/*--------------------------------------------------------------------------*/

var Field = Form.Element;

var $F = Form.Element.Methods.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers = (function() {
  function input(element, value) {
    switch (element.type.toLowerCase()) {
      case 'checkbox':
      case 'radio':
        return inputSelector(element, value);
      default:
        return valueSelector(element, value);
    }
  }

  function inputSelector(element, value) {
    if (Object.isUndefined(value))
      return element.checked ? element.value : null;
    else element.checked = !!value;
  }

  function valueSelector(element, value) {
    if (Object.isUndefined(value)) return element.value;
    else element.value = value;
  }

  function select(element, value) {
    if (Object.isUndefined(value))
      return (element.type === 'select-one' ? selectOne : selectMany)(element);

    var opt, currentValue, single = !Object.isArray(value);
    for (var i = 0, length = element.length; i < length; i++) {
      opt = element.options[i];
      currentValue = this.optionValue(opt);
      if (single) {
        if (currentValue == value) {
          opt.selected = true;
          return;
        }
      }
      else opt.selected = value.include(currentValue);
    }
  }

  function selectOne(element) {
    var index = element.selectedIndex;
    return index >= 0 ? optionValue(element.options[index]) : null;
  }

  function selectMany(element) {
    var values, length = element.length;
    if (!length) return null;

    for (var i = 0, values = []; i < length; i++) {
      var opt = element.options[i];
      if (opt.selected) values.push(optionValue(opt));
    }
    return values;
  }

  function optionValue(opt) {
    return Element.hasAttribute(opt, 'value') ? opt.value : opt.text;
  }

  return {
    input:         input,
    inputSelector: inputSelector,
    textarea:      valueSelector,
    select:        select,
    selectOne:     selectOne,
    selectMany:    selectMany,
    optionValue:   optionValue,
    button:        valueSelector
  };
})();

/*--------------------------------------------------------------------------*/


Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
  initialize: function($super, element, frequency, callback) {
    $super(callback, frequency);
    this.element   = $(element);
    this.lastValue = this.getValue();
  },

  execute: function() {
    var value = this.getValue();
    if (Object.isString(this.lastValue) && Object.isString(value) ?
        this.lastValue != value : String(this.lastValue) != String(value)) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
});

Form.Element.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = Class.create({
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    Form.getElements(this.element).each(this.registerCallback, this);
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        default:
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
});

Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
(function(GLOBAL) {
  var DIV = document.createElement('div');
  var docEl = document.documentElement;
  var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'onmouseenter' in docEl
   && 'onmouseleave' in docEl;

  var Event = {
    KEY_BACKSPACE: 8,
    KEY_TAB:       9,
    KEY_RETURN:   13,
    KEY_ESC:      27,
    KEY_LEFT:     37,
    KEY_UP:       38,
    KEY_RIGHT:    39,
    KEY_DOWN:     40,
    KEY_DELETE:   46,
    KEY_HOME:     36,
    KEY_END:      35,
    KEY_PAGEUP:   33,
    KEY_PAGEDOWN: 34,
    KEY_INSERT:   45
  };


  var isIELegacyEvent = function(event) { return false; };

  if (window.attachEvent) {
    if (window.addEventListener) {
      isIELegacyEvent = function(event) {
        return !(event instanceof window.Event);
      };
    } else {
      isIELegacyEvent = function(event) { return true; };
    }
  }

  var _isButton;

  function _isButtonForDOMEvents(event, code) {
    return event.which ? (event.which === code + 1) : (event.button === code);
  }

  var legacyButtonMap = { 0: 1, 1: 4, 2: 2 };
  function _isButtonForLegacyEvents(event, code) {
    return event.button === legacyButtonMap[code];
  }

  function _isButtonForWebKit(event, code) {
    switch (code) {
      case 0: return event.which == 1 && !event.metaKey;
      case 1: return event.which == 2 || (event.which == 1 && event.metaKey);
      case 2: return event.which == 3;
      default: return false;
    }
  }

  if (window.attachEvent) {
    if (!window.addEventListener) {
      _isButton = _isButtonForLegacyEvents;
    } else {
      _isButton = function(event, code) {
        return isIELegacyEvent(event) ? _isButtonForLegacyEvents(event, code) :
         _isButtonForDOMEvents(event, code);
      }
    }
  } else if (Prototype.Browser.WebKit) {
    _isButton = _isButtonForWebKit;
  } else {
    _isButton = _isButtonForDOMEvents;
  }

  function isLeftClick(event)   { return _isButton(event, 0) }

  function isMiddleClick(event) { return _isButton(event, 1) }

  function isRightClick(event)  { return _isButton(event, 2) }

  function element(event) {
    return Element.extend(_element(event));
  }

  function _element(event) {
    event = Event.extend(event);

    var node = event.target, type = event.type,
     currentTarget = event.currentTarget;

    if (currentTarget && currentTarget.tagName) {
      if (type === 'load' || type === 'error' ||
        (type === 'click' && currentTarget.tagName.toLowerCase() === 'input'
          && currentTarget.type === 'radio'))
            node = currentTarget;
    }

    return node.nodeType == Node.TEXT_NODE ? node.parentNode : node;
  }

  function findElement(event, expression) {
    var element = _element(event), selector = Prototype.Selector;
    if (!expression) return Element.extend(element);
    while (element) {
      if (Object.isElement(element) && selector.match(element, expression))
        return Element.extend(element);
      element = element.parentNode;
    }
  }

  function pointer(event) {
    return { x: pointerX(event), y: pointerY(event) };
  }

  function pointerX(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollLeft: 0 };

    return event.pageX || (event.clientX +
      (docElement.scrollLeft || body.scrollLeft) -
      (docElement.clientLeft || 0));
  }

  function pointerY(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollTop: 0 };

    return  event.pageY || (event.clientY +
       (docElement.scrollTop || body.scrollTop) -
       (docElement.clientTop || 0));
  }


  function stop(event) {
    Event.extend(event);
    event.preventDefault();
    event.stopPropagation();

    event.stopped = true;
  }


  Event.Methods = {
    isLeftClick:   isLeftClick,
    isMiddleClick: isMiddleClick,
    isRightClick:  isRightClick,

    element:     element,
    findElement: findElement,

    pointer:  pointer,
    pointerX: pointerX,
    pointerY: pointerY,

    stop: stop
  };

  var methods = Object.keys(Event.Methods).inject({ }, function(m, name) {
    m[name] = Event.Methods[name].methodize();
    return m;
  });

  if (window.attachEvent) {
    function _relatedTarget(event) {
      var element;
      switch (event.type) {
        case 'mouseover':
        case 'mouseenter':
          element = event.fromElement;
          break;
        case 'mouseout':
        case 'mouseleave':
          element = event.toElement;
          break;
        default:
          return null;
      }
      return Element.extend(element);
    }

    var additionalMethods = {
      stopPropagation: function() { this.cancelBubble = true },
      preventDefault:  function() { this.returnValue = false },
      inspect: function() { return '[object Event]' }
    };

    Event.extend = function(event, element) {
      if (!event) return false;

      if (!isIELegacyEvent(event)) return event;

      if (event._extendedByPrototype) return event;
      event._extendedByPrototype = Prototype.emptyFunction;

      var pointer = Event.pointer(event);

      Object.extend(event, {
        target: event.srcElement || element,
        relatedTarget: _relatedTarget(event),
        pageX:  pointer.x,
        pageY:  pointer.y
      });

      Object.extend(event, methods);
      Object.extend(event, additionalMethods);

      return event;
    };
  } else {
    Event.extend = Prototype.K;
  }

  if (window.addEventListener) {
    Event.prototype = window.Event.prototype || document.createEvent('HTMLEvents').__proto__;
    Object.extend(Event.prototype, methods);
  }

  var EVENT_TRANSLATIONS = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };

  function getDOMEventName(eventName) {
    return EVENT_TRANSLATIONS[eventName] || eventName;
  }

  if (MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED)
    getDOMEventName = Prototype.K;

  function getUniqueElementID(element) {
    if (element === window) return 0;

    if (typeof element._prototypeUID === 'undefined')
      element._prototypeUID = Element.Storage.UID++;
    return element._prototypeUID;
  }

  function getUniqueElementID_IE(element) {
    if (element === window) return 0;
    if (element == document) return 1;
    return element.uniqueID;
  }

  if ('uniqueID' in DIV)
    getUniqueElementID = getUniqueElementID_IE;

  function isCustomEvent(eventName) {
    return eventName.include(':');
  }

  Event._isCustomEvent = isCustomEvent;

  function getRegistryForElement(element, uid) {
    var CACHE = GLOBAL.Event.cache;
    if (Object.isUndefined(uid))
      uid = getUniqueElementID(element);
    if (!CACHE[uid]) CACHE[uid] = { element: element };
    return CACHE[uid];
  }

  function destroyRegistryForElement(element, uid) {
    if (Object.isUndefined(uid))
      uid = getUniqueElementID(element);
    delete GLOBAL.Event.cache[uid];
  }


  function register(element, eventName, handler) {
    var registry = getRegistryForElement(element);
    if (!registry[eventName]) registry[eventName] = [];
    var entries = registry[eventName];

    var i = entries.length;
    while (i--)
      if (entries[i].handler === handler) return null;

    var uid = getUniqueElementID(element);
    var responder = GLOBAL.Event._createResponder(uid, eventName, handler);
    var entry = {
      responder: responder,
      handler:   handler
    };

    entries.push(entry);
    return entry;
  }

  function unregister(element, eventName, handler) {
    var registry = getRegistryForElement(element);
    var entries = registry[eventName];
    if (!entries) return;

    var i = entries.length, entry;
    while (i--) {
      if (entries[i].handler === handler) {
        entry = entries[i];
        break;
      }
    }

    if (!entry) return;

    var index = entries.indexOf(entry);
    entries.splice(index, 1);

    return entry;
  }


  function observe(element, eventName, handler) {
    element = $(element);
    var entry = register(element, eventName, handler);

    if (entry === null) return element;

    var responder = entry.responder;
    if (isCustomEvent(eventName))
      observeCustomEvent(element, eventName, responder);
    else
      observeStandardEvent(element, eventName, responder);

    return element;
  }

  function observeStandardEvent(element, eventName, responder) {
    var actualEventName = getDOMEventName(eventName);
    if (element.addEventListener) {
      element.addEventListener(actualEventName, responder, false);
    } else {
      element.attachEvent('on' + actualEventName, responder);
    }
  }

  function observeCustomEvent(element, eventName, responder) {
    if (element.addEventListener) {
      element.addEventListener('dataavailable', responder, false);
    } else {
      element.attachEvent('ondataavailable', responder);
      element.attachEvent('onlosecapture',   responder);
    }
  }

  function stopObserving(element, eventName, handler) {
    element = $(element);
    var handlerGiven = !Object.isUndefined(handler),
     eventNameGiven = !Object.isUndefined(eventName);

    if (!eventNameGiven && !handlerGiven) {
      stopObservingElement(element);
      return element;
    }

    if (!handlerGiven) {
      stopObservingEventName(element, eventName);
      return element;
    }

    var entry = unregister(element, eventName, handler);

    if (!entry) return element;
    removeEvent(element, eventName, entry.responder);
    return element;
  }

  function stopObservingStandardEvent(element, eventName, responder) {
    var actualEventName = getDOMEventName(eventName);
    if (element.removeEventListener) {
      element.removeEventListener(actualEventName, responder, false);
    } else {
      element.detachEvent('on' + actualEventName, responder);
    }
  }

  function stopObservingCustomEvent(element, eventName, responder) {
    if (element.removeEventListener) {
      element.removeEventListener('dataavailable', responder, false);
    } else {
      element.detachEvent('ondataavailable', responder);
      element.detachEvent('onlosecapture',   responder);
    }
  }



  function stopObservingElement(element) {
    var uid = getUniqueElementID(element), registry = GLOBAL.Event.cache[uid];
    if (!registry) return;

    destroyRegistryForElement(element, uid);

    var entries, i;
    for (var eventName in registry) {
      if (eventName === 'element') continue;

      entries = registry[eventName];
      i = entries.length;
      while (i--)
        removeEvent(element, eventName, entries[i].responder);
    }
  }

  function stopObservingEventName(element, eventName) {
    var registry = getRegistryForElement(element);
    var entries = registry[eventName];
    if (!entries) return;
    delete registry[eventName];

    var i = entries.length;
    while (i--)
      removeEvent(element, eventName, entries[i].responder);
  }


  function removeEvent(element, eventName, handler) {
    if (isCustomEvent(eventName))
      stopObservingCustomEvent(element, eventName, handler);
    else
      stopObservingStandardEvent(element, eventName, handler);
  }



  function getFireTarget(element) {
    if (element !== document) return element;
    if (document.createEvent && !element.dispatchEvent)
      return document.documentElement;
    return element;
  }

  function fire(element, eventName, memo, bubble) {
    element = getFireTarget($(element));
    if (Object.isUndefined(bubble)) bubble = true;
    memo = memo || {};

    var event = fireEvent(element, eventName, memo, bubble);
    return Event.extend(event);
  }

  function fireEvent_DOM(element, eventName, memo, bubble) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent('dataavailable', bubble, true);

    event.eventName = eventName;
    event.memo = memo;

    element.dispatchEvent(event);
    return event;
  }

  function fireEvent_IE(element, eventName, memo, bubble) {
    var event = document.createEventObject();
    event.eventType = bubble ? 'ondataavailable' : 'onlosecapture';

    event.eventName = eventName;
    event.memo = memo;

    element.fireEvent(event.eventType, event);
    return event;
  }

  var fireEvent = document.createEvent ? fireEvent_DOM : fireEvent_IE;



  Event.Handler = Class.create({
    initialize: function(element, eventName, selector, callback) {
      this.element   = $(element);
      this.eventName = eventName;
      this.selector  = selector;
      this.callback  = callback;
      this.handler   = this.handleEvent.bind(this);
    },


    start: function() {
      Event.observe(this.element, this.eventName, this.handler);
      return this;
    },

    stop: function() {
      Event.stopObserving(this.element, this.eventName, this.handler);
      return this;
    },

    handleEvent: function(event) {
      var element = Event.findElement(event, this.selector);
      if (element) this.callback.call(this.element, event, element);
    }
  });

  function on(element, eventName, selector, callback) {
    element = $(element);
    if (Object.isFunction(selector) && Object.isUndefined(callback)) {
      callback = selector, selector = null;
    }

    return new Event.Handler(element, eventName, selector, callback).start();
  }

  Object.extend(Event, Event.Methods);

  Object.extend(Event, {
    fire:          fire,
    observe:       observe,
    stopObserving: stopObserving,
    on:            on
  });

  Element.addMethods({
    fire:          fire,

    observe:       observe,

    stopObserving: stopObserving,

    on:            on
  });

  Object.extend(document, {
    fire:          fire.methodize(),

    observe:       observe.methodize(),

    stopObserving: stopObserving.methodize(),

    on:            on.methodize(),

    loaded:        false
  });

  if (GLOBAL.Event) Object.extend(window.Event, Event);
  else GLOBAL.Event = Event;

  GLOBAL.Event.cache = {};

  function destroyCache_IE() {
    GLOBAL.Event.cache = null;
  }

  if (window.attachEvent)
    window.attachEvent('onunload', destroyCache_IE);

  DIV = null;
  docEl = null;
})(this);

(function(GLOBAL) {
  /* Code for creating leak-free event responders is based on work by
   John-David Dalton. */

  var docEl = document.documentElement;
  var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'onmouseenter' in docEl
    && 'onmouseleave' in docEl;

  function isSimulatedMouseEnterLeaveEvent(eventName) {
    return !MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED &&
     (eventName === 'mouseenter' || eventName === 'mouseleave');
  }

  function createResponder(uid, eventName, handler) {
    if (Event._isCustomEvent(eventName))
      return createResponderForCustomEvent(uid, eventName, handler);
    if (isSimulatedMouseEnterLeaveEvent(eventName))
      return createMouseEnterLeaveResponder(uid, eventName, handler);

    return function(event) {
      if (!Event.cache) return;

      var element = Event.cache[uid].element;
      Event.extend(event, element);
      handler.call(element, event);
    };
  }

  function createResponderForCustomEvent(uid, eventName, handler) {
    return function(event) {
      var element = Event.cache[uid].element;

      if (Object.isUndefined(event.eventName))
        return false;

      if (event.eventName !== eventName)
        return false;

      Event.extend(event, element);
      handler.call(element, event);
    };
  }

  function createMouseEnterLeaveResponder(uid, eventName, handler) {
    return function(event) {
      var element = Event.cache[uid].element;

      Event.extend(event, element);
      var parent = event.relatedTarget;

      while (parent && parent !== element) {
        try { parent = parent.parentNode; }
        catch(e) { parent = element; }
      }

      if (parent === element) return;
      handler.call(element, event);
    }
  }

  GLOBAL.Event._createResponder = createResponder;
  docEl = null;
})(this);

(function(GLOBAL) {
  /* Support for the DOMContentLoaded event is based on work by Dan Webb,
     Matthias Miller, Dean Edwards, John Resig, and Diego Perini. */

  var TIMER;

  function fireContentLoadedEvent() {
    if (document.loaded) return;
    if (TIMER) window.clearTimeout(TIMER);
    document.loaded = true;
    document.fire('dom:loaded');
  }

  function checkReadyState() {
    if (document.readyState === 'complete') {
      document.detachEvent('onreadystatechange', checkReadyState);
      fireContentLoadedEvent();
    }
  }

  function pollDoScroll() {
    try {
      document.documentElement.doScroll('left');
    } catch (e) {
      TIMER = pollDoScroll.defer();
      return;
    }

    fireContentLoadedEvent();
  }


  if (document.readyState === 'complete') {
    fireContentLoadedEvent();
    return;
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
  } else {
    document.attachEvent('onreadystatechange', checkReadyState);
    if (window == top) TIMER = pollDoScroll.defer();
  }

  Event.observe(window, 'load', fireContentLoadedEvent);
})(this);


Element.addMethods();
/*------------------------------- DEPRECATED -------------------------------*/

Hash.toQueryString = Object.toQueryString;

var Toggle = { display: Element.toggle };

Element.Methods.childOf = Element.Methods.descendantOf;

var Insertion = {
  Before: function(element, content) {
    return Element.insert(element, {before:content});
  },

  Top: function(element, content) {
    return Element.insert(element, {top:content});
  },

  Bottom: function(element, content) {
    return Element.insert(element, {bottom:content});
  },

  After: function(element, content) {
    return Element.insert(element, {after:content});
  }
};

var $continue = new Error('"throw $continue" is deprecated, use "return" instead');

var Position = {
  includeScrollOffsets: false,

  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = Element.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = Element.cumulativeScrollOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = Element.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },


  cumulativeOffset: Element.Methods.cumulativeOffset,

  positionedOffset: Element.Methods.positionedOffset,

  absolutize: function(element) {
    Position.prepare();
    return Element.absolutize(element);
  },

  relativize: function(element) {
    Position.prepare();
    return Element.relativize(element);
  },

  realOffset: Element.Methods.cumulativeScrollOffset,

  offsetParent: Element.Methods.getOffsetParent,

  page: Element.Methods.viewportOffset,

  clone: function(source, target, options) {
    options = options || { };
    return Element.clonePosition(target, source, options);
  }
};

/*--------------------------------------------------------------------------*/

if (!document.getElementsByClassName) document.getElementsByClassName = function(instanceMethods){
  function iter(name) {
    return name.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + name + " ')]";
  }

  instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath ?
  function(element, className) {
    className = className.toString().strip();
    var cond = /\s/.test(className) ? $w(className).map(iter).join('') : iter(className);
    return cond ? document._getElementsByXPath('.//*' + cond, element) : [];
  } : function(element, className) {
    className = className.toString().strip();
    var elements = [], classNames = (/\s/.test(className) ? $w(className) : null);
    if (!classNames && !className) return elements;

    var nodes = $(element).getElementsByTagName('*');
    className = ' ' + className + ' ';

    for (var i = 0, child, cn; child = nodes[i]; i++) {
      if (child.className && (cn = ' ' + child.className + ' ') && (cn.include(className) ||
          (classNames && classNames.all(function(name) {
            return !name.toString().blank() && cn.include(' ' + name + ' ');
          }))))
        elements.push(Element.extend(child));
    }
    return elements;
  };

  return function(className, parentElement) {
    return $(parentElement || document.body).getElementsByClassName(className);
  };
}(Element.Methods);

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator, context) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator, context);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set($A(this).concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set($A(this).without(classNameToRemove).join(' '));
  },

  toString: function() {
    return $A(this).join(' ');
  }
};

Object.extend(Element.ClassNames.prototype, Enumerable);

/*--------------------------------------------------------------------------*/

(function() {
  window.Selector = Class.create({
    initialize: function(expression) {
      this.expression = expression.strip();
    },

    findElements: function(rootElement) {
      return Prototype.Selector.select(this.expression, rootElement);
    },

    match: function(element) {
      return Prototype.Selector.match(element, this.expression);
    },

    toString: function() {
      return this.expression;
    },

    inspect: function() {
      return "#<Selector: " + this.expression + ">";
    }
  });

  Object.extend(Selector, {
    matchElements: function(elements, expression) {
      var match = Prototype.Selector.match,
          results = [];

      for (var i = 0, length = elements.length; i < length; i++) {
        var element = elements[i];
        if (match(element, expression)) {
          results.push(Element.extend(element));
        }
      }
      return results;
    },

    findElement: function(elements, expression, index) {
      index = index || 0;
      var matchIndex = 0, element;
      for (var i = 0, length = elements.length; i < length; i++) {
        element = elements[i];
        if (Prototype.Selector.match(element, expression) && index === matchIndex++) {
          return Element.extend(element);
        }
      }
    },

    findChildElements: function(element, expressions) {
      var selector = expressions.toArray().join(', ');
      return Prototype.Selector.select(selector, element || document);
    }
  });
})();

/**
 * Event.simulate(@element, eventName[, options]) -> Element
 * 
 * - @element: element to fire event on
 * - eventName: name of event to fire (only MouseEvents and HTMLEvents interfaces are supported)
 * - options: optional object to fine-tune event properties - pointerX, pointerY, ctrlKey, etc.
 *
 *    $('foo').simulate('click'); // => fires "click" event on an element with id=foo
 *
 **/
(function(){
  
  var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll|input)$/,
    'MouseEvents': /^(?:click|mouse(?:down|up|over|move|out))$/
  }
  var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
  }
  
  Event.simulate = function(element, eventName) {
    var options = Object.extend(defaultOptions, arguments[2] || { });
    var oEvent, eventType = null;
    
    element = $(element);
    
    for (var name in eventMatchers) {
      if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
      throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent) {
      oEvent = document.createEvent(eventType);
      if (eventType == 'HTMLEvents') {
        oEvent.initEvent(eventName, options.bubbles, options.cancelable);
      }
      else {
        oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView, 
          options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
          options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
      }
      element.dispatchEvent(oEvent);
    }
    else {
      options.clientX = options.pointerX;
      options.clientY = options.pointerY;
      oEvent = Object.extend(document.createEventObject(), options);
      element.fireEvent('on' + eventName, oEvent);
    }
    return element;
  }
  
  Element.addMethods({ simulate: Event.simulate });
})()
function phi4z(t,i,s,e,o,n,a,r,h){var l,c,m,u,d,p,_,f,P,y;for(h=n,y=1;15>=y;y++)if(l=Math.sin(h),m=Math.tan(h),r=m*Math.sqrt(1-t*l*l),c=Math.sin(2*h),u=i*h-s*c+e*Math.sin(4*h)-o*Math.sin(6*h),d=i-2*s*Math.cos(2*h)+4*e*Math.cos(4*h)-6*o*Math.cos(6*h),p=2*u+r*(u*u+a)-2*n*(r*u+1),_=t*c*(u*u+a-2*n*u)/(2*r),f=2*(n-u)*(r*d-2/c)-2*d,P=p/(_+f),h+=P,1e-10>=Math.abs(P))return h;return Proj4js.reportError("phi4z: No convergence"),null}function e4fn(t){var i,s;return i=1+t,s=1-t,Math.sqrt(Math.pow(i,i)*Math.pow(s,s))}var Proj4js={defaultDatum:"WGS84",transform:function(t,i,s){if(!t.readyToUse)return this.reportError("Proj4js initialization for:"+t.srsCode+" not yet complete"),s;if(!i.readyToUse)return this.reportError("Proj4js initialization for:"+i.srsCode+" not yet complete"),s;if(t.datum&&i.datum&&((t.datum.datum_type==Proj4js.common.PJD_3PARAM||t.datum.datum_type==Proj4js.common.PJD_7PARAM)&&"WGS84"!=i.datumCode||(i.datum.datum_type==Proj4js.common.PJD_3PARAM||i.datum.datum_type==Proj4js.common.PJD_7PARAM)&&"WGS84"!=t.datumCode)){var e=Proj4js.WGS84;this.transform(t,e,s),t=e}return"enu"!=t.axis&&this.adjust_axis(t,!1,s),"longlat"==t.projName?(s.x*=Proj4js.common.D2R,s.y*=Proj4js.common.D2R):(t.to_meter&&(s.x*=t.to_meter,s.y*=t.to_meter),t.inverse(s)),t.from_greenwich&&(s.x+=t.from_greenwich),s=this.datum_transform(t.datum,i.datum,s),i.from_greenwich&&(s.x-=i.from_greenwich),"longlat"==i.projName?(s.x*=Proj4js.common.R2D,s.y*=Proj4js.common.R2D):(i.forward(s),i.to_meter&&(s.x/=i.to_meter,s.y/=i.to_meter)),"enu"!=i.axis&&this.adjust_axis(i,!0,s),s},datum_transform:function(t,i,s){return t.compare_datums(i)?s:t.datum_type==Proj4js.common.PJD_NODATUM||i.datum_type==Proj4js.common.PJD_NODATUM?s:((t.es!=i.es||t.a!=i.a||t.datum_type==Proj4js.common.PJD_3PARAM||t.datum_type==Proj4js.common.PJD_7PARAM||i.datum_type==Proj4js.common.PJD_3PARAM||i.datum_type==Proj4js.common.PJD_7PARAM)&&(t.geodetic_to_geocentric(s),(t.datum_type==Proj4js.common.PJD_3PARAM||t.datum_type==Proj4js.common.PJD_7PARAM)&&t.geocentric_to_wgs84(s),(i.datum_type==Proj4js.common.PJD_3PARAM||i.datum_type==Proj4js.common.PJD_7PARAM)&&i.geocentric_from_wgs84(s),i.geocentric_to_geodetic(s)),s)},adjust_axis:function(t,i,s){for(var e,o,n=s.x,a=s.y,r=s.z||0,h=0;3>h;h++)if(!i||2!=h||void 0!==s.z)switch(0==h?(e=n,o="x"):1==h?(e=a,o="y"):(e=r,o="z"),t.axis[h]){case"e":s[o]=e;break;case"w":s[o]=-e;break;case"n":s[o]=e;break;case"s":s[o]=-e;break;case"u":void 0!==s[o]&&(s.z=e);break;case"d":void 0!==s[o]&&(s.z=-e);break;default:return alert("ERROR: unknow axis ("+t.axis[h]+") - check definition of "+t.projName),null}return s},reportError:function(){},extend:function(t,i){if(t=t||{},i)for(var s in i){var e=i[s];void 0!==e&&(t[s]=e)}return t},Class:function(){for(var t,i=function(){this.initialize.apply(this,arguments)},s={},e=0;arguments.length>e;++e)t="function"==typeof arguments[e]?arguments[e].prototype:arguments[e],Proj4js.extend(s,t);return i.prototype=s,i},bind:function(t,i){var s=Array.prototype.slice.apply(arguments,[2]);return function(){var e=s.concat(Array.prototype.slice.apply(arguments,[0]));return t.apply(i,e)}},scriptName:"proj4js-combined.js",defsLookupService:"http://spatialreference.org/ref",libPath:null,getScriptLocation:function(){if(this.libPath)return this.libPath;for(var t=this.scriptName,i=t.length,s=document.getElementsByTagName("script"),e=0;s.length>e;e++){var o=s[e].getAttribute("src");if(o){var n=o.lastIndexOf(t);if(n>-1&&n+i==o.length){this.libPath=o.slice(0,-i);break}}}return this.libPath||""},loadScript:function(t,i,s,e){var o=document.createElement("script");o.defer=!1,o.type="text/javascript",o.id=t,o.src=t,o.onload=i,o.onerror=s,o.loadCheck=e,/MSIE/.test(navigator.userAgent)&&(o.onreadystatechange=this.checkReadyState),document.getElementsByTagName("head")[0].appendChild(o)},checkReadyState:function(){"loaded"==this.readyState&&(this.loadCheck()?this.onload():this.onerror())}};Proj4js.Proj=Proj4js.Class({readyToUse:!1,title:null,projName:null,units:null,datum:null,x0:0,y0:0,localCS:!1,queue:null,initialize:function(t,i){if(this.srsCodeInput=t,this.queue=[],i&&this.queue.push(i),t.indexOf("GEOGCS")>=0||t.indexOf("GEOCCS")>=0||t.indexOf("PROJCS")>=0||t.indexOf("LOCAL_CS")>=0)return this.parseWKT(t),this.deriveConstants(),this.loadProjCode(this.projName),void 0;if(0==t.indexOf("urn:")){var s=t.split(":");"ogc"!=s[1]&&"x-ogc"!=s[1]||"def"!=s[2]||"crs"!=s[3]||(t=s[4]+":"+s[s.length-1])}else if(0==t.indexOf("http://")){var e=t.split("#");e[0].match(/epsg.org/)?t="EPSG:"+e[1]:e[0].match(/RIG.xml/)&&(t="IGNF:"+e[1])}this.srsCode=t.toUpperCase(),0==this.srsCode.indexOf("EPSG")?(this.srsCode=this.srsCode,this.srsAuth="epsg",this.srsProjNumber=this.srsCode.substring(5)):0==this.srsCode.indexOf("IGNF")?(this.srsCode=this.srsCode,this.srsAuth="IGNF",this.srsProjNumber=this.srsCode.substring(5)):0==this.srsCode.indexOf("CRS")?(this.srsCode=this.srsCode,this.srsAuth="CRS",this.srsProjNumber=this.srsCode.substring(4)):(this.srsAuth="",this.srsProjNumber=this.srsCode),this.loadProjDefinition()},loadProjDefinition:function(){if(Proj4js.defs[this.srsCode])return this.defsLoaded(),void 0;var t=Proj4js.getScriptLocation()+"defs/"+this.srsAuth.toUpperCase()+this.srsProjNumber+".js";Proj4js.loadScript(t,Proj4js.bind(this.defsLoaded,this),Proj4js.bind(this.loadFromService,this),Proj4js.bind(this.checkDefsLoaded,this))},loadFromService:function(){var t=Proj4js.defsLookupService+"/"+this.srsAuth+"/"+this.srsProjNumber+"/proj4js/";Proj4js.loadScript(t,Proj4js.bind(this.defsLoaded,this),Proj4js.bind(this.defsFailed,this),Proj4js.bind(this.checkDefsLoaded,this))},defsLoaded:function(){this.parseDefs(),this.loadProjCode(this.projName)},checkDefsLoaded:function(){return Proj4js.defs[this.srsCode]?!0:!1},defsFailed:function(){Proj4js.reportError("failed to load projection definition for: "+this.srsCode),Proj4js.defs[this.srsCode]=Proj4js.defs.WGS84,this.defsLoaded()},loadProjCode:function(t){if(Proj4js.Proj[t])return this.initTransforms(),void 0;var i=Proj4js.getScriptLocation()+"projCode/"+t+".js";Proj4js.loadScript(i,Proj4js.bind(this.loadProjCodeSuccess,this,t),Proj4js.bind(this.loadProjCodeFailure,this,t),Proj4js.bind(this.checkCodeLoaded,this,t))},loadProjCodeSuccess:function(t){Proj4js.Proj[t].dependsOn?this.loadProjCode(Proj4js.Proj[t].dependsOn):this.initTransforms()},loadProjCodeFailure:function(t){Proj4js.reportError("failed to find projection file for: "+t)},checkCodeLoaded:function(t){return Proj4js.Proj[t]?!0:!1},initTransforms:function(){if(Proj4js.extend(this,Proj4js.Proj[this.projName]),this.init(),this.readyToUse=!0,this.queue)for(var t;t=this.queue.shift();)t.call(this,this)},wktRE:/^(\w+)\[(.*)\]$/,parseWKT:function(t){var i=t.match(this.wktRE);if(i){var s,e=i[1],o=i[2],n=o.split(",");s="TOWGS84"==e.toUpperCase()?e:n.shift(),s=s.replace(/^\"/,""),s=s.replace(/\"$/,"");for(var a=[],r=0,h="",l=0;n.length>l;++l){for(var c=n[l],m=0;c.length>m;++m)"["==c.charAt(m)&&++r,"]"==c.charAt(m)&&--r;h+=c,0===r?(a.push(h),h=""):h+=","}switch(e){case"LOCAL_CS":this.projName="identity",this.localCS=!0,this.srsCode=s;break;case"GEOGCS":this.projName="longlat",this.geocsCode=s,this.srsCode||(this.srsCode=s);break;case"PROJCS":this.srsCode=s;break;case"GEOCCS":break;case"PROJECTION":this.projName=Proj4js.wktProjections[s];break;case"DATUM":this.datumName=s;break;case"LOCAL_DATUM":this.datumCode="none";break;case"SPHEROID":this.ellps=s,this.a=parseFloat(a.shift()),this.rf=parseFloat(a.shift());break;case"PRIMEM":this.from_greenwich=parseFloat(a.shift());break;case"UNIT":this.units=s,this.unitsPerMeter=parseFloat(a.shift());break;case"PARAMETER":var u=s.toLowerCase(),d=parseFloat(a.shift());switch(u){case"false_easting":this.x0=d;break;case"false_northing":this.y0=d;break;case"scale_factor":this.k0=d;break;case"central_meridian":this.long0=d*Proj4js.common.D2R;break;case"latitude_of_origin":this.lat0=d*Proj4js.common.D2R;break;case"more_here":break;default:}break;case"TOWGS84":this.datum_params=a;break;case"AXIS":var u=s.toLowerCase(),d=a.shift();switch(d){case"EAST":d="e";break;case"WEST":d="w";break;case"NORTH":d="n";break;case"SOUTH":d="s";break;case"UP":d="u";break;case"DOWN":d="d";break;case"OTHER":default:d=" "}switch(this.axis||(this.axis="enu"),u){case"x":this.axis=d+this.axis.substr(1,2);break;case"y":this.axis=this.axis.substr(0,1)+d+this.axis.substr(2,1);break;case"z":this.axis=this.axis.substr(0,2)+d;break;default:}case"MORE_HERE":break;default:}for(var l=0;a.length>l;++l)this.parseWKT(a[l])}},parseDefs:function(){this.defData=Proj4js.defs[this.srsCode];var t,i;if(this.defData){for(var s=this.defData.split("+"),e=0;s.length>e;e++){var o=s[e].split("=");switch(t=o[0].toLowerCase(),i=o[1],t.replace(/\s/gi,"")){case"":break;case"title":this.title=i;break;case"proj":this.projName=i.replace(/\s/gi,"");break;case"units":this.units=i.replace(/\s/gi,"");break;case"datum":this.datumCode=i.replace(/\s/gi,"");break;case"nadgrids":this.nagrids=i.replace(/\s/gi,"");break;case"ellps":this.ellps=i.replace(/\s/gi,"");break;case"a":this.a=parseFloat(i);break;case"b":this.b=parseFloat(i);break;case"rf":this.rf=parseFloat(i);break;case"lat_0":this.lat0=i*Proj4js.common.D2R;break;case"lat_1":this.lat1=i*Proj4js.common.D2R;break;case"lat_2":this.lat2=i*Proj4js.common.D2R;break;case"lat_ts":this.lat_ts=i*Proj4js.common.D2R;break;case"lon_0":this.long0=i*Proj4js.common.D2R;break;case"alpha":this.alpha=parseFloat(i)*Proj4js.common.D2R;break;case"lonc":this.longc=i*Proj4js.common.D2R;break;case"x_0":this.x0=parseFloat(i);break;case"y_0":this.y0=parseFloat(i);break;case"k_0":this.k0=parseFloat(i);break;case"k":this.k0=parseFloat(i);break;case"r_a":this.R_A=!0;break;case"zone":this.zone=parseInt(i,10);break;case"south":this.utmSouth=!0;break;case"towgs84":this.datum_params=i.split(",");break;case"to_meter":this.to_meter=parseFloat(i);break;case"from_greenwich":this.from_greenwich=i*Proj4js.common.D2R;break;case"pm":i=i.replace(/\s/gi,""),this.from_greenwich=Proj4js.PrimeMeridian[i]?Proj4js.PrimeMeridian[i]:parseFloat(i),this.from_greenwich*=Proj4js.common.D2R;break;case"axis":i=i.replace(/\s/gi,"");var n="ewnsud";3==i.length&&-1!=n.indexOf(i.substr(0,1))&&-1!=n.indexOf(i.substr(1,1))&&-1!=n.indexOf(i.substr(2,1))&&(this.axis=i);break;case"no_defs":break;default:}}this.deriveConstants()}},deriveConstants:function(){if("@null"==this.nagrids&&(this.datumCode="none"),this.datumCode&&"none"!=this.datumCode){var t=Proj4js.Datum[this.datumCode];t&&(this.datum_params=t.towgs84?t.towgs84.split(","):null,this.ellps=t.ellipse,this.datumName=t.datumName?t.datumName:this.datumCode)}if(!this.a){var i=Proj4js.Ellipsoid[this.ellps]?Proj4js.Ellipsoid[this.ellps]:Proj4js.Ellipsoid.WGS84;Proj4js.extend(this,i)}this.rf&&!this.b&&(this.b=(1-1/this.rf)*this.a),(0===this.rf||Math.abs(this.a-this.b)<Proj4js.common.EPSLN)&&(this.sphere=!0,this.b=this.a),this.a2=this.a*this.a,this.b2=this.b*this.b,this.es=(this.a2-this.b2)/this.a2,this.e=Math.sqrt(this.es),this.R_A&&(this.a*=1-this.es*(Proj4js.common.SIXTH+this.es*(Proj4js.common.RA4+this.es*Proj4js.common.RA6)),this.a2=this.a*this.a,this.b2=this.b*this.b,this.es=0),this.ep2=(this.a2-this.b2)/this.b2,this.k0||(this.k0=1),this.axis||(this.axis="enu"),this.datum=new Proj4js.datum(this)}}),Proj4js.Proj.longlat={init:function(){},forward:function(t){return t},inverse:function(t){return t}},Proj4js.Proj.identity=Proj4js.Proj.longlat,Proj4js.defs={WGS84:"+title=long/lat:WGS84 +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees","EPSG:4326":"+title=long/lat:WGS84 +proj=longlat +a=6378137.0 +b=6356752.31424518 +ellps=WGS84 +datum=WGS84 +units=degrees","EPSG:4269":"+title=long/lat:NAD83 +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees","EPSG:3875":"+title= Google Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"},Proj4js.defs["EPSG:3785"]=Proj4js.defs["EPSG:3875"],Proj4js.defs.GOOGLE=Proj4js.defs["EPSG:3875"],Proj4js.defs["EPSG:900913"]=Proj4js.defs["EPSG:3875"],Proj4js.defs["EPSG:102113"]=Proj4js.defs["EPSG:3875"],Proj4js.common={PI:3.141592653589793,HALF_PI:1.5707963267948966,TWO_PI:6.283185307179586,FORTPI:.7853981633974483,R2D:57.29577951308232,D2R:.017453292519943295,SEC_TO_RAD:484813681109536e-20,EPSLN:1e-10,MAX_ITER:20,COS_67P5:.3826834323650898,AD_C:1.0026,PJD_UNKNOWN:0,PJD_3PARAM:1,PJD_7PARAM:2,PJD_GRIDSHIFT:3,PJD_WGS84:4,PJD_NODATUM:5,SRS_WGS84_SEMIMAJOR:6378137,SIXTH:.16666666666666666,RA4:.04722222222222222,RA6:.022156084656084655,RV4:.06944444444444445,RV6:.04243827160493827,msfnz:function(t,i,s){var e=t*i;return s/Math.sqrt(1-e*e)},tsfnz:function(t,i,s){var e=t*s,o=.5*t;return e=Math.pow((1-e)/(1+e),o),Math.tan(.5*(this.HALF_PI-i))/e},phi2z:function(t,i){for(var s,e,o=.5*t,n=this.HALF_PI-2*Math.atan(i),a=0;15>=a;a++)if(s=t*Math.sin(n),e=this.HALF_PI-2*Math.atan(i*Math.pow((1-s)/(1+s),o))-n,n+=e,1e-10>=Math.abs(e))return n;return alert("phi2z has NoConvergence"),-9999},qsfnz:function(t,i){var s;return t>1e-7?(s=t*i,(1-t*t)*(i/(1-s*s)-.5/t*Math.log((1-s)/(1+s)))):2*i},asinz:function(t){return Math.abs(t)>1&&(t=t>1?1:-1),Math.asin(t)},e0fn:function(t){return 1-.25*t*(1+t/16*(3+1.25*t))},e1fn:function(t){return.375*t*(1+.25*t*(1+.46875*t))},e2fn:function(t){return.05859375*t*t*(1+.75*t)},e3fn:function(t){return t*t*t*(35/3072)},mlfn:function(t,i,s,e,o){return t*o-i*Math.sin(2*o)+s*Math.sin(4*o)-e*Math.sin(6*o)},srat:function(t,i){return Math.pow((1-t)/(1+t),i)},sign:function(t){return 0>t?-1:1},adjust_lon:function(t){return t=Math.abs(t)<this.PI?t:t-this.sign(t)*this.TWO_PI},adjust_lat:function(t){return t=Math.abs(t)<this.HALF_PI?t:t-this.sign(t)*this.PI},latiso:function(t,i,s){if(Math.abs(i)>this.HALF_PI)return+Number.NaN;if(i==this.HALF_PI)return Number.POSITIVE_INFINITY;if(i==-1*this.HALF_PI)return-1*Number.POSITIVE_INFINITY;var e=t*s;return Math.log(Math.tan((this.HALF_PI+i)/2))+t*Math.log((1-e)/(1+e))/2},fL:function(t,i){return 2*Math.atan(t*Math.exp(i))-this.HALF_PI},invlatiso:function(t,i){var s=this.fL(1,i),e=0,o=0;do e=s,o=t*Math.sin(e),s=this.fL(Math.exp(t*Math.log((1+o)/(1-o))/2),i);while(Math.abs(s-e)>1e-12);return s},sinh:function(t){var i=Math.exp(t);return i=(i-1/i)/2},cosh:function(t){var i=Math.exp(t);return i=(i+1/i)/2},tanh:function(t){var i=Math.exp(t);return i=(i-1/i)/(i+1/i)},asinh:function(t){var i=t>=0?1:-1;return i*Math.log(Math.abs(t)+Math.sqrt(t*t+1))},acosh:function(t){return 2*Math.log(Math.sqrt((t+1)/2)+Math.sqrt((t-1)/2))},atanh:function(t){return Math.log((t-1)/(t+1))/2},gN:function(t,i,s){var e=i*s;return t/Math.sqrt(1-e*e)},pj_enfn:function(t){var i=[];i[0]=this.C00-t*(this.C02+t*(this.C04+t*(this.C06+t*this.C08))),i[1]=t*(this.C22-t*(this.C04+t*(this.C06+t*this.C08)));var s=t*t;return i[2]=s*(this.C44-t*(this.C46+t*this.C48)),s*=t,i[3]=s*(this.C66-t*this.C68),i[4]=s*t*this.C88,i},pj_mlfn:function(t,i,s,e){return s*=i,i*=i,e[0]*t-s*(e[1]+i*(e[2]+i*(e[3]+i*e[4])))},pj_inv_mlfn:function(t,i,s){for(var e=1/(1-i),o=t,n=Proj4js.common.MAX_ITER;n;--n){var a=Math.sin(o),r=1-i*a*a;if(r=(this.pj_mlfn(o,a,Math.cos(o),s)-t)*r*Math.sqrt(r)*e,o-=r,Math.abs(r)<Proj4js.common.EPSLN)return o}return Proj4js.reportError("cass:pj_inv_mlfn: Convergence error"),o},C00:1,C02:.25,C04:.046875,C06:.01953125,C08:.01068115234375,C22:.75,C44:.46875,C46:.013020833333333334,C48:.007120768229166667,C66:.3645833333333333,C68:.005696614583333333,C88:.3076171875},Proj4js.datum=Proj4js.Class({initialize:function(t){if(this.datum_type=Proj4js.common.PJD_WGS84,t.datumCode&&"none"==t.datumCode&&(this.datum_type=Proj4js.common.PJD_NODATUM),t&&t.datum_params){for(var i=0;t.datum_params.length>i;i++)t.datum_params[i]=parseFloat(t.datum_params[i]);(0!=t.datum_params[0]||0!=t.datum_params[1]||0!=t.datum_params[2])&&(this.datum_type=Proj4js.common.PJD_3PARAM),t.datum_params.length>3&&(0!=t.datum_params[3]||0!=t.datum_params[4]||0!=t.datum_params[5]||0!=t.datum_params[6])&&(this.datum_type=Proj4js.common.PJD_7PARAM,t.datum_params[3]*=Proj4js.common.SEC_TO_RAD,t.datum_params[4]*=Proj4js.common.SEC_TO_RAD,t.datum_params[5]*=Proj4js.common.SEC_TO_RAD,t.datum_params[6]=t.datum_params[6]/1e6+1)}t&&(this.a=t.a,this.b=t.b,this.es=t.es,this.ep2=t.ep2,this.datum_params=t.datum_params)},compare_datums:function(t){return this.datum_type!=t.datum_type?!1:this.a!=t.a||Math.abs(this.es-t.es)>5e-11?!1:this.datum_type==Proj4js.common.PJD_3PARAM?this.datum_params[0]==t.datum_params[0]&&this.datum_params[1]==t.datum_params[1]&&this.datum_params[2]==t.datum_params[2]:this.datum_type==Proj4js.common.PJD_7PARAM?this.datum_params[0]==t.datum_params[0]&&this.datum_params[1]==t.datum_params[1]&&this.datum_params[2]==t.datum_params[2]&&this.datum_params[3]==t.datum_params[3]&&this.datum_params[4]==t.datum_params[4]&&this.datum_params[5]==t.datum_params[5]&&this.datum_params[6]==t.datum_params[6]:this.datum_type==Proj4js.common.PJD_GRIDSHIFT||t.datum_type==Proj4js.common.PJD_GRIDSHIFT?(alert("ERROR: Grid shift transformations are not implemented."),!1):!0},geodetic_to_geocentric:function(t){var i,s,e,o,n,a,r,h=t.x,l=t.y,c=t.z?t.z:0,m=0;if(-Proj4js.common.HALF_PI>l&&l>-1.001*Proj4js.common.HALF_PI)l=-Proj4js.common.HALF_PI;else if(l>Proj4js.common.HALF_PI&&1.001*Proj4js.common.HALF_PI>l)l=Proj4js.common.HALF_PI;else if(-Proj4js.common.HALF_PI>l||l>Proj4js.common.HALF_PI)return Proj4js.reportError("geocent:lat out of range:"+l),null;return h>Proj4js.common.PI&&(h-=2*Proj4js.common.PI),n=Math.sin(l),r=Math.cos(l),a=n*n,o=this.a/Math.sqrt(1-this.es*a),i=(o+c)*r*Math.cos(h),s=(o+c)*r*Math.sin(h),e=(o*(1-this.es)+c)*n,t.x=i,t.y=s,t.z=e,m},geocentric_to_geodetic:function(t){var i,s,e,o,n,a,r,h,l,c,m,u,d,p,_,f,P,y=1e-12,g=y*y,L=30,v=t.x,j=t.y,M=t.z?t.z:0;if(d=!1,i=Math.sqrt(v*v+j*j),s=Math.sqrt(v*v+j*j+M*M),y>i/this.a){if(d=!0,_=0,y>s/this.a)return f=Proj4js.common.HALF_PI,P=-this.b,void 0}else _=Math.atan2(j,v);e=M/s,o=i/s,n=1/Math.sqrt(1-this.es*(2-this.es)*o*o),h=o*(1-this.es)*n,l=e*n,p=0;do p++,r=this.a/Math.sqrt(1-this.es*l*l),P=i*h+M*l-r*(1-this.es*l*l),a=this.es*r/(r+P),n=1/Math.sqrt(1-a*(2-a)*o*o),c=o*(1-a)*n,m=e*n,u=m*h-c*l,h=c,l=m;while(u*u>g&&L>p);return f=Math.atan(m/Math.abs(c)),t.x=_,t.y=f,t.z=P,t},geocentric_to_geodetic_noniter:function(t){var i,s,e,o,n,a,r,h,l,c,m,u,d,p,_,f,P,y=t.x,g=t.y,L=t.z?t.z:0;if(y=parseFloat(y),g=parseFloat(g),L=parseFloat(L),P=!1,0!=y)i=Math.atan2(g,y);else if(g>0)i=Proj4js.common.HALF_PI;else if(0>g)i=-Proj4js.common.HALF_PI;else if(P=!0,i=0,L>0)s=Proj4js.common.HALF_PI;else{if(!(0>L))return s=Proj4js.common.HALF_PI,e=-this.b,void 0;s=-Proj4js.common.HALF_PI}return n=y*y+g*g,o=Math.sqrt(n),a=L*Proj4js.common.AD_C,h=Math.sqrt(a*a+n),c=a/h,u=o/h,m=c*c*c,r=L+this.b*this.ep2*m,f=o-this.a*this.es*u*u*u,l=Math.sqrt(r*r+f*f),d=r/l,p=f/l,_=this.a/Math.sqrt(1-this.es*d*d),e=p>=Proj4js.common.COS_67P5?o/p-_:-Proj4js.common.COS_67P5>=p?o/-p-_:L/d+_*(this.es-1),0==P&&(s=Math.atan(d/p)),t.x=i,t.y=s,t.z=e,t},geocentric_to_wgs84:function(t){if(this.datum_type==Proj4js.common.PJD_3PARAM)t.x+=this.datum_params[0],t.y+=this.datum_params[1],t.z+=this.datum_params[2];else if(this.datum_type==Proj4js.common.PJD_7PARAM){var i=this.datum_params[0],s=this.datum_params[1],e=this.datum_params[2],o=this.datum_params[3],n=this.datum_params[4],a=this.datum_params[5],r=this.datum_params[6],h=r*(t.x-a*t.y+n*t.z)+i,l=r*(a*t.x+t.y-o*t.z)+s,c=r*(-n*t.x+o*t.y+t.z)+e;t.x=h,t.y=l,t.z=c}},geocentric_from_wgs84:function(t){if(this.datum_type==Proj4js.common.PJD_3PARAM)t.x-=this.datum_params[0],t.y-=this.datum_params[1],t.z-=this.datum_params[2];else if(this.datum_type==Proj4js.common.PJD_7PARAM){var i=this.datum_params[0],s=this.datum_params[1],e=this.datum_params[2],o=this.datum_params[3],n=this.datum_params[4],a=this.datum_params[5],r=this.datum_params[6],h=(t.x-i)/r,l=(t.y-s)/r,c=(t.z-e)/r;t.x=h+a*l-n*c,t.y=-a*h+l+o*c,t.z=n*h-o*l+c}}}),Proj4js.Point=Proj4js.Class({initialize:function(t,i,s){if("object"==typeof t)this.x=t[0],this.y=t[1],this.z=t[2]||0;else if("string"==typeof t&&i===void 0){var e=t.split(",");this.x=parseFloat(e[0]),this.y=parseFloat(e[1]),this.z=parseFloat(e[2])||0}else this.x=t,this.y=i,this.z=s||0},clone:function(){return new Proj4js.Point(this.x,this.y,this.z)},toString:function(){return"x="+this.x+",y="+this.y},toShortString:function(){return this.x+", "+this.y}}),Proj4js.PrimeMeridian={greenwich:0,lisbon:-9.131906111111,paris:2.337229166667,bogota:-74.080916666667,madrid:-3.687938888889,rome:12.452333333333,bern:7.439583333333,jakarta:106.807719444444,ferro:-17.666666666667,brussels:4.367975,stockholm:18.058277777778,athens:23.7163375,oslo:10.722916666667},Proj4js.Ellipsoid={MERIT:{a:6378137,rf:298.257,ellipseName:"MERIT 1983"},SGS85:{a:6378136,rf:298.257,ellipseName:"Soviet Geodetic System 85"},GRS80:{a:6378137,rf:298.257222101,ellipseName:"GRS 1980(IUGG, 1980)"},IAU76:{a:6378140,rf:298.257,ellipseName:"IAU 1976"},airy:{a:6377563.396,b:6356256.91,ellipseName:"Airy 1830"},"APL4.":{a:6378137,rf:298.25,ellipseName:"Appl. Physics. 1965"},NWL9D:{a:6378145,rf:298.25,ellipseName:"Naval Weapons Lab., 1965"},mod_airy:{a:6377340.189,b:6356034.446,ellipseName:"Modified Airy"},andrae:{a:6377104.43,rf:300,ellipseName:"Andrae 1876 (Den., Iclnd.)"},aust_SA:{a:6378160,rf:298.25,ellipseName:"Australian Natl & S. Amer. 1969"},GRS67:{a:6378160,rf:298.247167427,ellipseName:"GRS 67(IUGG 1967)"},bessel:{a:6377397.155,rf:299.1528128,ellipseName:"Bessel 1841"},bess_nam:{a:6377483.865,rf:299.1528128,ellipseName:"Bessel 1841 (Namibia)"},clrk66:{a:6378206.4,b:6356583.8,ellipseName:"Clarke 1866"},clrk80:{a:6378249.145,rf:293.4663,ellipseName:"Clarke 1880 mod."},CPM:{a:6375738.7,rf:334.29,ellipseName:"Comm. des Poids et Mesures 1799"},delmbr:{a:6376428,rf:311.5,ellipseName:"Delambre 1810 (Belgium)"},engelis:{a:6378136.05,rf:298.2566,ellipseName:"Engelis 1985"},evrst30:{a:6377276.345,rf:300.8017,ellipseName:"Everest 1830"},evrst48:{a:6377304.063,rf:300.8017,ellipseName:"Everest 1948"},evrst56:{a:6377301.243,rf:300.8017,ellipseName:"Everest 1956"},evrst69:{a:6377295.664,rf:300.8017,ellipseName:"Everest 1969"},evrstSS:{a:6377298.556,rf:300.8017,ellipseName:"Everest (Sabah & Sarawak)"},fschr60:{a:6378166,rf:298.3,ellipseName:"Fischer (Mercury Datum) 1960"},fschr60m:{a:6378155,rf:298.3,ellipseName:"Fischer 1960"},fschr68:{a:6378150,rf:298.3,ellipseName:"Fischer 1968"},helmert:{a:6378200,rf:298.3,ellipseName:"Helmert 1906"},hough:{a:6378270,rf:297,ellipseName:"Hough"},intl:{a:6378388,rf:297,ellipseName:"International 1909 (Hayford)"},kaula:{a:6378163,rf:298.24,ellipseName:"Kaula 1961"},lerch:{a:6378139,rf:298.257,ellipseName:"Lerch 1979"},mprts:{a:6397300,rf:191,ellipseName:"Maupertius 1738"},new_intl:{a:6378157.5,b:6356772.2,ellipseName:"New International 1967"},plessis:{a:6376523,rf:6355863,ellipseName:"Plessis 1817 (France)"},krass:{a:6378245,rf:298.3,ellipseName:"Krassovsky, 1942"},SEasia:{a:6378155,b:6356773.3205,ellipseName:"Southeast Asia"},walbeck:{a:6376896,b:6355834.8467,ellipseName:"Walbeck"},WGS60:{a:6378165,rf:298.3,ellipseName:"WGS 60"},WGS66:{a:6378145,rf:298.25,ellipseName:"WGS 66"},WGS72:{a:6378135,rf:298.26,ellipseName:"WGS 72"},WGS84:{a:6378137,rf:298.257223563,ellipseName:"WGS 84"},sphere:{a:6370997,b:6370997,ellipseName:"Normal Sphere (r=6370997)"}},Proj4js.Datum={WGS84:{towgs84:"0,0,0",ellipse:"WGS84",datumName:"WGS84"},GGRS87:{towgs84:"-199.87,74.79,246.62",ellipse:"GRS80",datumName:"Greek_Geodetic_Reference_System_1987"},NAD83:{towgs84:"0,0,0",ellipse:"GRS80",datumName:"North_American_Datum_1983"},NAD27:{nadgrids:"@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",ellipse:"clrk66",datumName:"North_American_Datum_1927"},potsdam:{towgs84:"606.0,23.0,413.0",ellipse:"bessel",datumName:"Potsdam Rauenberg 1950 DHDN"},carthage:{towgs84:"-263.0,6.0,431.0",ellipse:"clark80",datumName:"Carthage 1934 Tunisia"},hermannskogel:{towgs84:"653.0,-212.0,449.0",ellipse:"bessel",datumName:"Hermannskogel"},ire65:{towgs84:"482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",ellipse:"mod_airy",datumName:"Ireland 1965"},nzgd49:{towgs84:"59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",ellipse:"intl",datumName:"New Zealand Geodetic Datum 1949"},OSGB36:{towgs84:"446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",ellipse:"airy",datumName:"Airy 1830"}},Proj4js.WGS84=new Proj4js.Proj("WGS84"),Proj4js.Datum.OSB36=Proj4js.Datum.OSGB36,Proj4js.wktProjections={"Lambert Tangential Conformal Conic Projection":"lcc",Mercator:"merc","Popular Visualisation Pseudo Mercator":"merc",Mercator_1SP:"merc",Transverse_Mercator:"tmerc","Transverse Mercator":"tmerc","Lambert Azimuthal Equal Area":"laea","Universal Transverse Mercator System":"utm"},Proj4js.Proj.aea={init:function(){return Math.abs(this.lat1+this.lat2)<Proj4js.common.EPSLN?(Proj4js.reportError("aeaInitEqualLatitudes"),void 0):(this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e3=Math.sqrt(this.es),this.sin_po=Math.sin(this.lat1),this.cos_po=Math.cos(this.lat1),this.t1=this.sin_po,this.con=this.sin_po,this.ms1=Proj4js.common.msfnz(this.e3,this.sin_po,this.cos_po),this.qs1=Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po),this.sin_po=Math.sin(this.lat2),this.cos_po=Math.cos(this.lat2),this.t2=this.sin_po,this.ms2=Proj4js.common.msfnz(this.e3,this.sin_po,this.cos_po),this.qs2=Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po),this.sin_po=Math.sin(this.lat0),this.cos_po=Math.cos(this.lat0),this.t3=this.sin_po,this.qs0=Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po),this.ns0=Math.abs(this.lat1-this.lat2)>Proj4js.common.EPSLN?(this.ms1*this.ms1-this.ms2*this.ms2)/(this.qs2-this.qs1):this.con,this.c=this.ms1*this.ms1+this.ns0*this.qs1,this.rh=this.a*Math.sqrt(this.c-this.ns0*this.qs0)/this.ns0,void 0)},forward:function(t){var i=t.x,s=t.y;this.sin_phi=Math.sin(s),this.cos_phi=Math.cos(s);var e=Proj4js.common.qsfnz(this.e3,this.sin_phi,this.cos_phi),o=this.a*Math.sqrt(this.c-this.ns0*e)/this.ns0,n=this.ns0*Proj4js.common.adjust_lon(i-this.long0),a=o*Math.sin(n)+this.x0,r=this.rh-o*Math.cos(n)+this.y0;return t.x=a,t.y=r,t},inverse:function(t){var i,s,e,o,n,a;return t.x-=this.x0,t.y=this.rh-t.y+this.y0,this.ns0>=0?(i=Math.sqrt(t.x*t.x+t.y*t.y),e=1):(i=-Math.sqrt(t.x*t.x+t.y*t.y),e=-1),o=0,0!=i&&(o=Math.atan2(e*t.x,e*t.y)),e=i*this.ns0/this.a,s=(this.c-e*e)/this.ns0,this.e3>=1e-10?(e=1-.5*(1-this.es)*Math.log((1-this.e3)/(1+this.e3))/this.e3,a=Math.abs(Math.abs(e)-Math.abs(s))>1e-10?this.phi1z(this.e3,s):s>=0?.5*Proj4js.common.PI:-.5*Proj4js.common.PI):a=this.phi1z(this.e3,s),n=Proj4js.common.adjust_lon(o/this.ns0+this.long0),t.x=n,t.y=a,t},phi1z:function(t,i){var s,e,o,n,a,r=Proj4js.common.asinz(.5*i);if(Proj4js.common.EPSLN>t)return r;for(var h=t*t,l=1;25>=l;l++)if(s=Math.sin(r),e=Math.cos(r),o=t*s,n=1-o*o,a=.5*n*n/e*(i/(1-h)-s/n+.5/t*Math.log((1-o)/(1+o))),r+=a,1e-7>=Math.abs(a))return r;return Proj4js.reportError("aea:phi1z:Convergence error"),null}},Proj4js.Proj.sterea={dependsOn:"gauss",init:function(){return Proj4js.Proj.gauss.init.apply(this),this.rc?(this.sinc0=Math.sin(this.phic0),this.cosc0=Math.cos(this.phic0),this.R2=2*this.rc,this.title||(this.title="Oblique Stereographic Alternative"),void 0):(Proj4js.reportError("sterea:init:E_ERROR_0"),void 0)},forward:function(t){var i,s,e,o;return t.x=Proj4js.common.adjust_lon(t.x-this.long0),Proj4js.Proj.gauss.forward.apply(this,[t]),i=Math.sin(t.y),s=Math.cos(t.y),e=Math.cos(t.x),o=this.k0*this.R2/(1+this.sinc0*i+this.cosc0*s*e),t.x=o*s*Math.sin(t.x),t.y=o*(this.cosc0*i-this.sinc0*s*e),t.x=this.a*t.x+this.x0,t.y=this.a*t.y+this.y0,t},inverse:function(t){var i,s,e,o,n;if(t.x=(t.x-this.x0)/this.a,t.y=(t.y-this.y0)/this.a,t.x/=this.k0,t.y/=this.k0,n=Math.sqrt(t.x*t.x+t.y*t.y)){var a=2*Math.atan2(n,this.R2);i=Math.sin(a),s=Math.cos(a),o=Math.asin(s*this.sinc0+t.y*i*this.cosc0/n),e=Math.atan2(t.x*i,n*this.cosc0*s-t.y*this.sinc0*i)}else o=this.phic0,e=0;return t.x=e,t.y=o,Proj4js.Proj.gauss.inverse.apply(this,[t]),t.x=Proj4js.common.adjust_lon(t.x+this.long0),t}},Proj4js.Proj.poly={init:function(){0==this.lat0&&(this.lat0=90),this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e=Math.sqrt(this.es),this.e0=Proj4js.common.e0fn(this.es),this.e1=Proj4js.common.e1fn(this.es),this.e2=Proj4js.common.e2fn(this.es),this.e3=Proj4js.common.e3fn(this.es),this.ml0=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat0)},forward:function(t){var i,s,e,o,n,a,r,h=t.x,l=t.y;return e=Proj4js.common.adjust_lon(h-this.long0),1e-7>=Math.abs(l)?(a=this.x0+this.a*e,r=this.y0-this.a*this.ml0):(i=Math.sin(l),s=Math.cos(l),o=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,l),n=Proj4js.common.msfnz(this.e,i,s),e=i,a=this.x0+this.a*n*Math.sin(e)/i,r=this.y0+this.a*(o-this.ml0+n*(1-Math.cos(e))/i)),t.x=a,t.y=r,t},inverse:function(t){var i,s,e,o,n,a;if(t.x-=this.x0,t.y-=this.y0,i=this.ml0+t.y/this.a,o=0,1e-7>=Math.abs(i))n=t.x/this.a+this.long0,a=0;else{if(s=i*i+t.x/this.a*(t.x/this.a),o=phi4z(this.es,this.e0,this.e1,this.e2,this.e3,this.al,s,e,a),1!=o)return o;n=Proj4js.common.adjust_lon(Proj4js.common.asinz(t.x*e/this.a)/Math.sin(a)+this.long0)}return t.x=n,t.y=a,t}},Proj4js.Proj.equi={init:function(){this.x0||(this.x0=0),this.y0||(this.y0=0),this.lat0||(this.lat0=0),this.long0||(this.long0=0)},forward:function(t){var i=t.x,s=t.y,e=Proj4js.common.adjust_lon(i-this.long0),o=this.x0+this.a*e*Math.cos(this.lat0),n=this.y0+this.a*s;return this.t1=o,this.t2=Math.cos(this.lat0),t.x=o,t.y=n,t},inverse:function(t){t.x-=this.x0,t.y-=this.y0;var i=t.y/this.a;Math.abs(i)>Proj4js.common.HALF_PI&&Proj4js.reportError("equi:Inv:DataError");var s=Proj4js.common.adjust_lon(this.long0+t.x/(this.a*Math.cos(this.lat0)));t.x=s,t.y=i}},Proj4js.Proj.merc={init:function(){this.lat_ts&&(this.k0=this.sphere?Math.cos(this.lat_ts):Proj4js.common.msfnz(this.es,Math.sin(this.lat_ts),Math.cos(this.lat_ts)))},forward:function(t){var i=t.x,s=t.y;if(s*Proj4js.common.R2D>90&&-90>s*Proj4js.common.R2D&&i*Proj4js.common.R2D>180&&-180>i*Proj4js.common.R2D)return Proj4js.reportError("merc:forward: llInputOutOfRange: "+i+" : "+s),null;var e,o;if(Math.abs(Math.abs(s)-Proj4js.common.HALF_PI)<=Proj4js.common.EPSLN)return Proj4js.reportError("merc:forward: ll2mAtPoles"),null;if(this.sphere)e=this.x0+this.a*this.k0*Proj4js.common.adjust_lon(i-this.long0),o=this.y0+this.a*this.k0*Math.log(Math.tan(Proj4js.common.FORTPI+.5*s));else{var n=Math.sin(s),a=Proj4js.common.tsfnz(this.e,s,n);e=this.x0+this.a*this.k0*Proj4js.common.adjust_lon(i-this.long0),o=this.y0-this.a*this.k0*Math.log(a)}return t.x=e,t.y=o,t},inverse:function(t){var i,s,e=t.x-this.x0,o=t.y-this.y0;if(this.sphere)s=Proj4js.common.HALF_PI-2*Math.atan(Math.exp(-o/this.a*this.k0));else{var n=Math.exp(-o/(this.a*this.k0));if(s=Proj4js.common.phi2z(this.e,n),-9999==s)return Proj4js.reportError("merc:inverse: lat = -9999"),null}return i=Proj4js.common.adjust_lon(this.long0+e/(this.a*this.k0)),t.x=i,t.y=s,t}},Proj4js.Proj.utm={dependsOn:"tmerc",init:function(){return this.zone?(this.lat0=0,this.long0=(6*Math.abs(this.zone)-183)*Proj4js.common.D2R,this.x0=5e5,this.y0=this.utmSouth?1e7:0,this.k0=.9996,Proj4js.Proj.tmerc.init.apply(this),this.forward=Proj4js.Proj.tmerc.forward,this.inverse=Proj4js.Proj.tmerc.inverse,void 0):(Proj4js.reportError("utm:init: zone must be specified for UTM"),void 0)}},Proj4js.Proj.eqdc={init:function(){this.mode||(this.mode=0),this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e=Math.sqrt(this.es),this.e0=Proj4js.common.e0fn(this.es),this.e1=Proj4js.common.e1fn(this.es),this.e2=Proj4js.common.e2fn(this.es),this.e3=Proj4js.common.e3fn(this.es),this.sinphi=Math.sin(this.lat1),this.cosphi=Math.cos(this.lat1),this.ms1=Proj4js.common.msfnz(this.e,this.sinphi,this.cosphi),this.ml1=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat1),0!=this.mode?(Math.abs(this.lat1+this.lat2)<Proj4js.common.EPSLN&&Proj4js.reportError("eqdc:Init:EqualLatitudes"),this.sinphi=Math.sin(this.lat2),this.cosphi=Math.cos(this.lat2),this.ms2=Proj4js.common.msfnz(this.e,this.sinphi,this.cosphi),this.ml2=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat2),this.ns=Math.abs(this.lat1-this.lat2)>=Proj4js.common.EPSLN?(this.ms1-this.ms2)/(this.ml2-this.ml1):this.sinphi):this.ns=this.sinphi,this.g=this.ml1+this.ms1/this.ns,this.ml0=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat0),this.rh=this.a*(this.g-this.ml0)
},forward:function(t){var i=t.x,s=t.y,e=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,s),o=this.a*(this.g-e),n=this.ns*Proj4js.common.adjust_lon(i-this.long0),a=this.x0+o*Math.sin(n),r=this.y0+this.rh-o*Math.cos(n);return t.x=a,t.y=r,t},inverse:function(t){t.x-=this.x0,t.y=this.rh-t.y+this.y0;var i,s;this.ns>=0?(s=Math.sqrt(t.x*t.x+t.y*t.y),i=1):(s=-Math.sqrt(t.x*t.x+t.y*t.y),i=-1);var e=0;0!=s&&(e=Math.atan2(i*t.x,i*t.y));var o=this.g-s/this.a,n=this.phi3z(o,this.e0,this.e1,this.e2,this.e3),a=Proj4js.common.adjust_lon(this.long0+e/this.ns);return t.x=a,t.y=n,t},phi3z:function(t,i,s,e,o){var n,a;n=t;for(var r=0;15>r;r++)if(a=(t+s*Math.sin(2*n)-e*Math.sin(4*n)+o*Math.sin(6*n))/i-n,n+=a,1e-10>=Math.abs(a))return n;return Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations"),null}},Proj4js.Proj.tmerc={init:function(){this.e0=Proj4js.common.e0fn(this.es),this.e1=Proj4js.common.e1fn(this.es),this.e2=Proj4js.common.e2fn(this.es),this.e3=Proj4js.common.e3fn(this.es),this.ml0=this.a*Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat0)},forward:function(t){var i,s,e,o=t.x,n=t.y,a=Proj4js.common.adjust_lon(o-this.long0),r=Math.sin(n),h=Math.cos(n);if(this.sphere){var l=h*Math.sin(a);if(1e-10>Math.abs(Math.abs(l)-1))return Proj4js.reportError("tmerc:forward: Point projects into infinity"),93;s=.5*this.a*this.k0*Math.log((1+l)/(1-l)),i=Math.acos(h*Math.cos(a)/Math.sqrt(1-l*l)),0>n&&(i=-i),e=this.a*this.k0*(i-this.lat0)}else{var c=h*a,m=Math.pow(c,2),u=this.ep2*Math.pow(h,2),d=Math.tan(n),p=Math.pow(d,2);i=1-this.es*Math.pow(r,2);var _=this.a/Math.sqrt(i),f=this.a*Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,n);s=this.k0*_*c*(1+m/6*(1-p+u+m/20*(5-18*p+Math.pow(p,2)+72*u-58*this.ep2)))+this.x0,e=this.k0*(f-this.ml0+_*d*m*(.5+m/24*(5-p+9*u+4*Math.pow(u,2)+m/30*(61-58*p+Math.pow(p,2)+600*u-330*this.ep2))))+this.y0}return t.x=s,t.y=e,t},inverse:function(t){var i,s,e,o,n,a,r=6;if(this.sphere){var h=Math.exp(t.x/(this.a*this.k0)),l=.5*(h-1/h),c=this.lat0+t.y/(this.a*this.k0),m=Math.cos(c);i=Math.sqrt((1-m*m)/(1+l*l)),n=Proj4js.common.asinz(i),0>c&&(n=-n),a=0==l&&0==m?this.long0:Proj4js.common.adjust_lon(Math.atan2(l,m)+this.long0)}else{var u=t.x-this.x0,d=t.y-this.y0;for(i=(this.ml0+d/this.k0)/this.a,s=i,o=0;!0&&(e=(i+this.e1*Math.sin(2*s)-this.e2*Math.sin(4*s)+this.e3*Math.sin(6*s))/this.e0-s,s+=e,!(Math.abs(e)<=Proj4js.common.EPSLN));o++)if(o>=r)return Proj4js.reportError("tmerc:inverse: Latitude failed to converge"),95;if(Math.abs(s)<Proj4js.common.HALF_PI){var p=Math.sin(s),_=Math.cos(s),f=Math.tan(s),P=this.ep2*Math.pow(_,2),y=Math.pow(P,2),g=Math.pow(f,2),L=Math.pow(g,2);i=1-this.es*Math.pow(p,2);var v=this.a/Math.sqrt(i),j=v*(1-this.es)/i,M=u/(v*this.k0),S=Math.pow(M,2);n=s-v*f*S/j*(.5-S/24*(5+3*g+10*P-4*y-9*this.ep2-S/30*(61+90*g+298*P+45*L-252*this.ep2-3*y))),a=Proj4js.common.adjust_lon(this.long0+M*(1-S/6*(1+2*g+P-S/20*(5-2*P+28*g-3*y+8*this.ep2+24*L)))/_)}else n=Proj4js.common.HALF_PI*Proj4js.common.sign(d),a=this.long0}return t.x=a,t.y=n,t}},Proj4js.defs.GOOGLE="+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs",Proj4js.defs["EPSG:900913"]=Proj4js.defs.GOOGLE,Proj4js.Proj.gstmerc={init:function(){var t=this.b/this.a;this.e=Math.sqrt(1-t*t),this.lc=this.long0,this.rs=Math.sqrt(1+this.e*this.e*Math.pow(Math.cos(this.lat0),4)/(1-this.e*this.e));var i=Math.sin(this.lat0),s=Math.asin(i/this.rs),e=Math.sin(s);this.cp=Proj4js.common.latiso(0,s,e)-this.rs*Proj4js.common.latiso(this.e,this.lat0,i),this.n2=this.k0*this.a*Math.sqrt(1-this.e*this.e)/(1-this.e*this.e*i*i),this.xs=this.x0,this.ys=this.y0-this.n2*s,this.title||(this.title="Gauss Schreiber transverse mercator")},forward:function(t){var i=t.x,s=t.y,e=this.rs*(i-this.lc),o=this.cp+this.rs*Proj4js.common.latiso(this.e,s,Math.sin(s)),n=Math.asin(Math.sin(e)/Proj4js.common.cosh(o)),a=Proj4js.common.latiso(0,n,Math.sin(n));return t.x=this.xs+this.n2*a,t.y=this.ys+this.n2*Math.atan(Proj4js.common.sinh(o)/Math.cos(e)),t},inverse:function(t){var i=t.x,s=t.y,e=Math.atan(Proj4js.common.sinh((i-this.xs)/this.n2)/Math.cos((s-this.ys)/this.n2)),o=Math.asin(Math.sin((s-this.ys)/this.n2)/Proj4js.common.cosh((i-this.xs)/this.n2)),n=Proj4js.common.latiso(0,o,Math.sin(o));return t.x=this.lc+e/this.rs,t.y=Proj4js.common.invlatiso(this.e,(n-this.cp)/this.rs),t}},Proj4js.Proj.ortho={init:function(){this.sin_p14=Math.sin(this.lat0),this.cos_p14=Math.cos(this.lat0)},forward:function(t){var i,s,e,o,n,a,r=t.x,h=t.y;if(e=Proj4js.common.adjust_lon(r-this.long0),i=Math.sin(h),s=Math.cos(h),o=Math.cos(e),a=this.sin_p14*i+this.cos_p14*s*o,n=1,a>0||Math.abs(a)<=Proj4js.common.EPSLN)var l=this.a*n*s*Math.sin(e),c=this.y0+this.a*n*(this.cos_p14*i-this.sin_p14*s*o);else Proj4js.reportError("orthoFwdPointError");return t.x=l,t.y=c,t},inverse:function(t){var i,s,e,o,n,a,r;return t.x-=this.x0,t.y-=this.y0,i=Math.sqrt(t.x*t.x+t.y*t.y),i>this.a+1e-7&&Proj4js.reportError("orthoInvDataError"),s=Proj4js.common.asinz(i/this.a),e=Math.sin(s),o=Math.cos(s),a=this.long0,Math.abs(i)<=Proj4js.common.EPSLN&&(r=this.lat0),r=Proj4js.common.asinz(o*this.sin_p14+t.y*e*this.cos_p14/i),n=Math.abs(this.lat0)-Proj4js.common.HALF_PI,Math.abs(n)<=Proj4js.common.EPSLN&&(a=this.lat0>=0?Proj4js.common.adjust_lon(this.long0+Math.atan2(t.x,-t.y)):Proj4js.common.adjust_lon(this.long0-Math.atan2(-t.x,t.y))),n=o-this.sin_p14*Math.sin(r),t.x=a,t.y=r,t}},Proj4js.Proj.krovak={init:function(){this.a=6377397.155,this.es=.006674372230614,this.e=Math.sqrt(this.es),this.lat0||(this.lat0=.863937979737193),this.long0||(this.long0=.4334234309119251),this.k0||(this.k0=.9999),this.s45=.785398163397448,this.s90=2*this.s45,this.fi0=this.lat0,this.e2=this.es,this.e=Math.sqrt(this.e2),this.alfa=Math.sqrt(1+this.e2*Math.pow(Math.cos(this.fi0),4)/(1-this.e2)),this.uq=1.04216856380474,this.u0=Math.asin(Math.sin(this.fi0)/this.alfa),this.g=Math.pow((1+this.e*Math.sin(this.fi0))/(1-this.e*Math.sin(this.fi0)),this.alfa*this.e/2),this.k=Math.tan(this.u0/2+this.s45)/Math.pow(Math.tan(this.fi0/2+this.s45),this.alfa)*this.g,this.k1=this.k0,this.n0=this.a*Math.sqrt(1-this.e2)/(1-this.e2*Math.pow(Math.sin(this.fi0),2)),this.s0=1.37008346281555,this.n=Math.sin(this.s0),this.ro0=this.k1*this.n0/Math.tan(this.s0),this.ad=this.s90-this.uq},forward:function(t){var i,s,e,o,n,a,r,h=t.x,l=t.y,c=Proj4js.common.adjust_lon(h-this.long0);return i=Math.pow((1+this.e*Math.sin(l))/(1-this.e*Math.sin(l)),this.alfa*this.e/2),s=2*(Math.atan(this.k*Math.pow(Math.tan(l/2+this.s45),this.alfa)/i)-this.s45),e=-c*this.alfa,o=Math.asin(Math.cos(this.ad)*Math.sin(s)+Math.sin(this.ad)*Math.cos(s)*Math.cos(e)),n=Math.asin(Math.cos(s)*Math.sin(e)/Math.cos(o)),a=this.n*n,r=this.ro0*Math.pow(Math.tan(this.s0/2+this.s45),this.n)/Math.pow(Math.tan(o/2+this.s45),this.n),t.y=r*Math.cos(a)/1,t.x=r*Math.sin(a)/1,this.czech&&(t.y*=-1,t.x*=-1),t},inverse:function(t){var i,s,e,o,n,a,r,h,l=t.x;t.x=t.y,t.y=l,this.czech&&(t.y*=-1,t.x*=-1),a=Math.sqrt(t.x*t.x+t.y*t.y),n=Math.atan2(t.y,t.x),o=n/Math.sin(this.s0),e=2*(Math.atan(Math.pow(this.ro0/a,1/this.n)*Math.tan(this.s0/2+this.s45))-this.s45),i=Math.asin(Math.cos(this.ad)*Math.sin(e)-Math.sin(this.ad)*Math.cos(e)*Math.cos(o)),s=Math.asin(Math.cos(e)*Math.sin(o)/Math.cos(i)),t.x=this.long0-s/this.alfa,r=i,h=0;var c=0;do t.y=2*(Math.atan(Math.pow(this.k,-1/this.alfa)*Math.pow(Math.tan(i/2+this.s45),1/this.alfa)*Math.pow((1+this.e*Math.sin(r))/(1-this.e*Math.sin(r)),this.e/2))-this.s45),1e-10>Math.abs(r-t.y)&&(h=1),r=t.y,c+=1;while(0==h&&15>c);return c>=15?(Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations"),null):t}},Proj4js.Proj.somerc={init:function(){var t=this.lat0;this.lambda0=this.long0;var i=Math.sin(t),s=this.a,e=this.rf,o=1/e,n=2*o-Math.pow(o,2),a=this.e=Math.sqrt(n);this.R=this.k0*s*Math.sqrt(1-n)/(1-n*Math.pow(i,2)),this.alpha=Math.sqrt(1+n/(1-n)*Math.pow(Math.cos(t),4)),this.b0=Math.asin(i/this.alpha),this.K=Math.log(Math.tan(Math.PI/4+this.b0/2))-this.alpha*Math.log(Math.tan(Math.PI/4+t/2))+this.alpha*a/2*Math.log((1+a*i)/(1-a*i))},forward:function(t){var i=Math.log(Math.tan(Math.PI/4-t.y/2)),s=this.e/2*Math.log((1+this.e*Math.sin(t.y))/(1-this.e*Math.sin(t.y))),e=-this.alpha*(i+s)+this.K,o=2*(Math.atan(Math.exp(e))-Math.PI/4),n=this.alpha*(t.x-this.lambda0),a=Math.atan(Math.sin(n)/(Math.sin(this.b0)*Math.tan(o)+Math.cos(this.b0)*Math.cos(n))),r=Math.asin(Math.cos(this.b0)*Math.sin(o)-Math.sin(this.b0)*Math.cos(o)*Math.cos(n));return t.y=this.R/2*Math.log((1+Math.sin(r))/(1-Math.sin(r)))+this.y0,t.x=this.R*a+this.x0,t},inverse:function(t){for(var i=t.x-this.x0,s=t.y-this.y0,e=i/this.R,o=2*(Math.atan(Math.exp(s/this.R))-Math.PI/4),n=Math.asin(Math.cos(this.b0)*Math.sin(o)+Math.sin(this.b0)*Math.cos(o)*Math.cos(e)),a=Math.atan(Math.sin(e)/(Math.cos(this.b0)*Math.cos(e)-Math.sin(this.b0)*Math.tan(o))),r=this.lambda0+a/this.alpha,h=0,l=n,c=-1e3,m=0;Math.abs(l-c)>1e-7;){if(++m>20)return Proj4js.reportError("omercFwdInfinity"),void 0;h=1/this.alpha*(Math.log(Math.tan(Math.PI/4+n/2))-this.K)+this.e*Math.log(Math.tan(Math.PI/4+Math.asin(this.e*Math.sin(l))/2)),c=l,l=2*Math.atan(Math.exp(h))-Math.PI/2}return t.x=r,t.y=l,t}},Proj4js.Proj.stere={ssfn_:function(t,i,s){return i*=s,Math.tan(.5*(Proj4js.common.HALF_PI+t))*Math.pow((1-i)/(1+i),.5*s)},TOL:1e-8,NITER:8,CONV:1e-10,S_POLE:0,N_POLE:1,OBLIQ:2,EQUIT:3,init:function(){this.phits=this.lat_ts?this.lat_ts:Proj4js.common.HALF_PI;var t=Math.abs(this.lat0);if(this.mode=Math.abs(t)-Proj4js.common.HALF_PI<Proj4js.common.EPSLN?0>this.lat0?this.S_POLE:this.N_POLE:t>Proj4js.common.EPSLN?this.OBLIQ:this.EQUIT,this.phits=Math.abs(this.phits),this.es){var i;switch(this.mode){case this.N_POLE:case this.S_POLE:Math.abs(this.phits-Proj4js.common.HALF_PI)<Proj4js.common.EPSLN?this.akm1=2*this.k0/Math.sqrt(Math.pow(1+this.e,1+this.e)*Math.pow(1-this.e,1-this.e)):(t=Math.sin(this.phits),this.akm1=Math.cos(this.phits)/Proj4js.common.tsfnz(this.e,this.phits,t),t*=this.e,this.akm1/=Math.sqrt(1-t*t));break;case this.EQUIT:this.akm1=2*this.k0;break;case this.OBLIQ:t=Math.sin(this.lat0),i=2*Math.atan(this.ssfn_(this.lat0,t,this.e))-Proj4js.common.HALF_PI,t*=this.e,this.akm1=2*this.k0*Math.cos(this.lat0)/Math.sqrt(1-t*t),this.sinX1=Math.sin(i),this.cosX1=Math.cos(i)}}else switch(this.mode){case this.OBLIQ:this.sinph0=Math.sin(this.lat0),this.cosph0=Math.cos(this.lat0);case this.EQUIT:this.akm1=2*this.k0;break;case this.S_POLE:case this.N_POLE:this.akm1=Math.abs(this.phits-Proj4js.common.HALF_PI)>=Proj4js.common.EPSLN?Math.cos(this.phits)/Math.tan(Proj4js.common.FORTPI-.5*this.phits):2*this.k0}},forward:function(t){var i=t.x;i=Proj4js.common.adjust_lon(i-this.long0);var s,e,o=t.y;if(this.sphere){var n,a,r,h;switch(n=Math.sin(o),a=Math.cos(o),r=Math.cos(i),h=Math.sin(i),this.mode){case this.EQUIT:e=1+a*r,Proj4js.common.EPSLN>=e&&Proj4js.reportError("stere:forward:Equit"),e=this.akm1/e,s=e*a*h,e*=n;break;case this.OBLIQ:e=1+this.sinph0*n+this.cosph0*a*r,Proj4js.common.EPSLN>=e&&Proj4js.reportError("stere:forward:Obliq"),e=this.akm1/e,s=e*a*h,e*=this.cosph0*n-this.sinph0*a*r;break;case this.N_POLE:r=-r,o=-o;case this.S_POLE:Math.abs(o-Proj4js.common.HALF_PI)<this.TOL&&Proj4js.reportError("stere:forward:S_POLE"),e=this.akm1*Math.tan(Proj4js.common.FORTPI+.5*o),s=h*e,e*=r}}else{r=Math.cos(i),h=Math.sin(i),n=Math.sin(o);var l,c;if(this.mode==this.OBLIQ||this.mode==this.EQUIT){var m=2*Math.atan(this.ssfn_(o,n,this.e));l=Math.sin(m-Proj4js.common.HALF_PI),c=Math.cos(m)}switch(this.mode){case this.OBLIQ:var u=this.akm1/(this.cosX1*(1+this.sinX1*l+this.cosX1*c*r));e=u*(this.cosX1*l-this.sinX1*c*r),s=u*c;break;case this.EQUIT:var u=2*this.akm1/(1+c*r);e=u*l,s=u*c;break;case this.S_POLE:o=-o,r=-r,n=-n;case this.N_POLE:s=this.akm1*Proj4js.common.tsfnz(this.e,o,n),e=-s*r}s*=h}return t.x=s*this.a+this.x0,t.y=e*this.a+this.y0,t},inverse:function(t){var i,s,e,o,n,a,r=(t.x-this.x0)/this.a,h=(t.y-this.y0)/this.a,l=0,c=0,m=0,u=0;if(this.sphere){var d,p,_,f;switch(p=Math.sqrt(r*r+h*h),d=2*Math.atan(p/this.akm1),_=Math.sin(d),f=Math.cos(d),i=0,this.mode){case this.EQUIT:s=Math.abs(p)<=Proj4js.common.EPSLN?0:Math.asin(h*_/p),(0!=f||0!=r)&&(i=Math.atan2(r*_,f*p));break;case this.OBLIQ:s=Math.abs(p)<=Proj4js.common.EPSLN?this.phi0:Math.asin(f*this.sinph0+h*_*this.cosph0/p),d=f-this.sinph0*Math.sin(s),(0!=d||0!=r)&&(i=Math.atan2(r*_*this.cosph0,d*p));break;case this.N_POLE:h=-h;case this.S_POLE:s=Math.abs(p)<=Proj4js.common.EPSLN?this.phi0:Math.asin(this.mode==this.S_POLE?-f:f),i=0==r&&0==h?0:Math.atan2(r,h)}t.x=Proj4js.common.adjust_lon(i+this.long0),t.y=s}else{switch(n=Math.sqrt(r*r+h*h),this.mode){case this.OBLIQ:case this.EQUIT:l=2*Math.atan2(n*this.cosX1,this.akm1),e=Math.cos(l),o=Math.sin(l),c=0==n?Math.asin(e*this.sinX1):Math.asin(e*this.sinX1+h*o*this.cosX1/n),l=Math.tan(.5*(Proj4js.common.HALF_PI+c)),r*=o,h=n*this.cosX1*e-h*this.sinX1*o,u=Proj4js.common.HALF_PI,m=.5*this.e;break;case this.N_POLE:h=-h;case this.S_POLE:l=-n/this.akm1,c=Proj4js.common.HALF_PI-2*Math.atan(l),u=-Proj4js.common.HALF_PI,m=-.5*this.e}for(a=this.NITER;a--;c=s)if(o=this.e*Math.sin(c),s=2*Math.atan(l*Math.pow((1+o)/(1-o),m))-u,Math.abs(c-s)<this.CONV)return this.mode==this.S_POLE&&(s=-s),i=0==r&&0==h?0:Math.atan2(r,h),t.x=Proj4js.common.adjust_lon(i+this.long0),t.y=s,t}}},Proj4js.Proj.nzmg={iterations:1,init:function(){this.A=[],this.A[1]=.6399175073,this.A[2]=-.1358797613,this.A[3]=.063294409,this.A[4]=-.02526853,this.A[5]=.0117879,this.A[6]=-.0055161,this.A[7]=.0026906,this.A[8]=-.001333,this.A[9]=67e-5,this.A[10]=-34e-5,this.B_re=[],this.B_im=[],this.B_re[1]=.7557853228,this.B_im[1]=0,this.B_re[2]=.249204646,this.B_im[2]=.003371507,this.B_re[3]=-.001541739,this.B_im[3]=.04105856,this.B_re[4]=-.10162907,this.B_im[4]=.01727609,this.B_re[5]=-.26623489,this.B_im[5]=-.36249218,this.B_re[6]=-.6870983,this.B_im[6]=-1.1651967,this.C_re=[],this.C_im=[],this.C_re[1]=1.3231270439,this.C_im[1]=0,this.C_re[2]=-.577245789,this.C_im[2]=-.007809598,this.C_re[3]=.508307513,this.C_im[3]=-.112208952,this.C_re[4]=-.15094762,this.C_im[4]=.18200602,this.C_re[5]=1.01418179,this.C_im[5]=1.64497696,this.C_re[6]=1.9660549,this.C_im[6]=2.5127645,this.D=[],this.D[1]=1.5627014243,this.D[2]=.5185406398,this.D[3]=-.03333098,this.D[4]=-.1052906,this.D[5]=-.0368594,this.D[6]=.007317,this.D[7]=.0122,this.D[8]=.00394,this.D[9]=-.0013},forward:function(t){for(var i=t.x,s=t.y,e=s-this.lat0,o=i-this.long0,n=1e-5*(e/Proj4js.common.SEC_TO_RAD),a=o,r=1,h=0,l=1;10>=l;l++)r*=n,h+=this.A[l]*r;for(var c,m,u=h,d=a,p=1,_=0,f=0,P=0,l=1;6>=l;l++)c=p*u-_*d,m=_*u+p*d,p=c,_=m,f=f+this.B_re[l]*p-this.B_im[l]*_,P=P+this.B_im[l]*p+this.B_re[l]*_;return t.x=P*this.a+this.x0,t.y=f*this.a+this.y0,t},inverse:function(t){for(var i,s,e=t.x,o=t.y,n=e-this.x0,a=o-this.y0,r=a/this.a,h=n/this.a,l=1,c=0,m=0,u=0,d=1;6>=d;d++)i=l*r-c*h,s=c*r+l*h,l=i,c=s,m=m+this.C_re[d]*l-this.C_im[d]*c,u=u+this.C_im[d]*l+this.C_re[d]*c;for(var p=0;this.iterations>p;p++){for(var _,f,P=m,y=u,g=r,L=h,d=2;6>=d;d++)_=P*m-y*u,f=y*m+P*u,P=_,y=f,g+=(d-1)*(this.B_re[d]*P-this.B_im[d]*y),L+=(d-1)*(this.B_im[d]*P+this.B_re[d]*y);P=1,y=0;for(var v=this.B_re[1],j=this.B_im[1],d=2;6>=d;d++)_=P*m-y*u,f=y*m+P*u,P=_,y=f,v+=d*(this.B_re[d]*P-this.B_im[d]*y),j+=d*(this.B_im[d]*P+this.B_re[d]*y);var M=v*v+j*j;m=(g*v+L*j)/M,u=(L*v-g*j)/M}for(var S=m,b=u,x=1,E=0,d=1;9>=d;d++)x*=S,E+=this.D[d]*x;var C=this.lat0+1e5*E*Proj4js.common.SEC_TO_RAD,w=this.long0+b;return t.x=w,t.y=C,t}},Proj4js.Proj.mill={init:function(){},forward:function(t){var i=t.x,s=t.y,e=Proj4js.common.adjust_lon(i-this.long0),o=this.x0+this.a*e,n=this.y0+1.25*this.a*Math.log(Math.tan(Proj4js.common.PI/4+s/2.5));return t.x=o,t.y=n,t},inverse:function(t){t.x-=this.x0,t.y-=this.y0;var i=Proj4js.common.adjust_lon(this.long0+t.x/this.a),s=2.5*(Math.atan(Math.exp(.8*t.y/this.a))-Proj4js.common.PI/4);return t.x=i,t.y=s,t}},Proj4js.Proj.gnom={init:function(){this.sin_p14=Math.sin(this.lat0),this.cos_p14=Math.cos(this.lat0),this.infinity_dist=1e3*this.a,this.rc=1},forward:function(t){var i,s,e,o,n,a,r,h,l=t.x,c=t.y;return e=Proj4js.common.adjust_lon(l-this.long0),i=Math.sin(c),s=Math.cos(c),o=Math.cos(e),a=this.sin_p14*i+this.cos_p14*s*o,n=1,a>0||Math.abs(a)<=Proj4js.common.EPSLN?(r=this.x0+this.a*n*s*Math.sin(e)/a,h=this.y0+this.a*n*(this.cos_p14*i-this.sin_p14*s*o)/a):(Proj4js.reportError("orthoFwdPointError"),r=this.x0+this.infinity_dist*s*Math.sin(e),h=this.y0+this.infinity_dist*(this.cos_p14*i-this.sin_p14*s*o)),t.x=r,t.y=h,t},inverse:function(t){var i,s,e,o,n,a;return t.x=(t.x-this.x0)/this.a,t.y=(t.y-this.y0)/this.a,t.x/=this.k0,t.y/=this.k0,(i=Math.sqrt(t.x*t.x+t.y*t.y))?(o=Math.atan2(i,this.rc),s=Math.sin(o),e=Math.cos(o),a=Proj4js.common.asinz(e*this.sin_p14+t.y*s*this.cos_p14/i),n=Math.atan2(t.x*s,i*this.cos_p14*e-t.y*this.sin_p14*s),n=Proj4js.common.adjust_lon(this.long0+n)):(a=this.phic0,n=0),t.x=n,t.y=a,t}},Proj4js.Proj.sinu={init:function(){this.sphere?(this.n=1,this.m=0,this.es=0,this.C_y=Math.sqrt((this.m+1)/this.n),this.C_x=this.C_y/(this.m+1)):this.en=Proj4js.common.pj_enfn(this.es)},forward:function(t){var i,s,e=t.x,o=t.y;if(e=Proj4js.common.adjust_lon(e-this.long0),this.sphere){if(this.m)for(var n=this.n*Math.sin(o),a=Proj4js.common.MAX_ITER;a;--a){var r=(this.m*o+Math.sin(o)-n)/(this.m+Math.cos(o));if(o-=r,Math.abs(r)<Proj4js.common.EPSLN)break}else o=1!=this.n?Math.asin(this.n*Math.sin(o)):o;i=this.a*this.C_x*e*(this.m+Math.cos(o)),s=this.a*this.C_y*o}else{var h=Math.sin(o),l=Math.cos(o);s=this.a*Proj4js.common.pj_mlfn(o,h,l,this.en),i=this.a*e*l/Math.sqrt(1-this.es*h*h)}return t.x=i,t.y=s,t},inverse:function(t){var i,s,e;if(t.x-=this.x0,t.y-=this.y0,i=t.y/this.a,this.sphere)t.y/=this.C_y,i=this.m?Math.asin((this.m*t.y+Math.sin(t.y))/this.n):1!=this.n?Math.asin(Math.sin(t.y)/this.n):t.y,e=t.x/(this.C_x*(this.m+Math.cos(t.y)));else{i=Proj4js.common.pj_inv_mlfn(t.y/this.a,this.es,this.en);var o=Math.abs(i);Proj4js.common.HALF_PI>o?(o=Math.sin(i),s=this.long0+t.x*Math.sqrt(1-this.es*o*o)/(this.a*Math.cos(i)),e=Proj4js.common.adjust_lon(s)):o-Proj4js.common.EPSLN<Proj4js.common.HALF_PI&&(e=this.long0)}return t.x=e,t.y=i,t}},Proj4js.Proj.vandg={init:function(){this.R=6370997},forward:function(t){var i,s,e=t.x,o=t.y,n=Proj4js.common.adjust_lon(e-this.long0);Math.abs(o)<=Proj4js.common.EPSLN&&(i=this.x0+this.R*n,s=this.y0);var a=Proj4js.common.asinz(2*Math.abs(o/Proj4js.common.PI));(Math.abs(n)<=Proj4js.common.EPSLN||Math.abs(Math.abs(o)-Proj4js.common.HALF_PI)<=Proj4js.common.EPSLN)&&(i=this.x0,s=o>=0?this.y0+Proj4js.common.PI*this.R*Math.tan(.5*a):this.y0+Proj4js.common.PI*this.R*-Math.tan(.5*a));var r=.5*Math.abs(Proj4js.common.PI/n-n/Proj4js.common.PI),h=r*r,l=Math.sin(a),c=Math.cos(a),m=c/(l+c-1),u=m*m,d=m*(2/l-1),p=d*d,_=Proj4js.common.PI*this.R*(r*(m-p)+Math.sqrt(h*(m-p)*(m-p)-(p+h)*(u-p)))/(p+h);return 0>n&&(_=-_),i=this.x0+_,_=Math.abs(_/(Proj4js.common.PI*this.R)),s=o>=0?this.y0+Proj4js.common.PI*this.R*Math.sqrt(1-_*_-2*r*_):this.y0-Proj4js.common.PI*this.R*Math.sqrt(1-_*_-2*r*_),t.x=i,t.y=s,t},inverse:function(t){var i,s,e,o,n,a,r,h,l,c,m,u,d;return t.x-=this.x0,t.y-=this.y0,m=Proj4js.common.PI*this.R,e=t.x/m,o=t.y/m,n=e*e+o*o,a=-Math.abs(o)*(1+n),r=a-2*o*o+e*e,h=-2*a+1+2*o*o+n*n,d=o*o/h+(2*r*r*r/h/h/h-9*a*r/h/h)/27,l=(a-r*r/3/h)/h,c=2*Math.sqrt(-l/3),m=3*d/l/c,Math.abs(m)>1&&(m=m>=0?1:-1),u=Math.acos(m)/3,s=t.y>=0?(-c*Math.cos(u+Proj4js.common.PI/3)-r/3/h)*Proj4js.common.PI:-(-c*Math.cos(u+Proj4js.common.PI/3)-r/3/h)*Proj4js.common.PI,Math.abs(e)<Proj4js.common.EPSLN&&(i=this.long0),i=Proj4js.common.adjust_lon(this.long0+Proj4js.common.PI*(n-1+Math.sqrt(1+2*(e*e-o*o)+n*n))/2/e),t.x=i,t.y=s,t}},Proj4js.Proj.cea={init:function(){},forward:function(t){var i=t.x,s=t.y,e=Proj4js.common.adjust_lon(i-this.long0),o=this.x0+this.a*e*Math.cos(this.lat_ts),n=this.y0+this.a*Math.sin(s)/Math.cos(this.lat_ts);return t.x=o,t.y=n,t},inverse:function(t){t.x-=this.x0,t.y-=this.y0;var i=Proj4js.common.adjust_lon(this.long0+t.x/this.a/Math.cos(this.lat_ts)),s=Math.asin(t.y/this.a*Math.cos(this.lat_ts));return t.x=i,t.y=s,t}},Proj4js.Proj.eqc={init:function(){this.x0||(this.x0=0),this.y0||(this.y0=0),this.lat0||(this.lat0=0),this.long0||(this.long0=0),this.lat_ts||(this.lat_ts=0),this.title||(this.title="Equidistant Cylindrical (Plate Carre)"),this.rc=Math.cos(this.lat_ts)},forward:function(t){var i=t.x,s=t.y,e=Proj4js.common.adjust_lon(i-this.long0),o=Proj4js.common.adjust_lat(s-this.lat0);return t.x=this.x0+this.a*e*this.rc,t.y=this.y0+this.a*o,t},inverse:function(t){var i=t.x,s=t.y;return t.x=Proj4js.common.adjust_lon(this.long0+(i-this.x0)/(this.a*this.rc)),t.y=Proj4js.common.adjust_lat(this.lat0+(s-this.y0)/this.a),t}},Proj4js.Proj.cass={init:function(){this.sphere||(this.en=Proj4js.common.pj_enfn(this.es),this.m0=Proj4js.common.pj_mlfn(this.lat0,Math.sin(this.lat0),Math.cos(this.lat0),this.en))},C1:.16666666666666666,C2:.008333333333333333,C3:.041666666666666664,C4:.3333333333333333,C5:.06666666666666667,forward:function(t){var i,s,e=t.x,o=t.y;return e=Proj4js.common.adjust_lon(e-this.long0),this.sphere?(i=Math.asin(Math.cos(o)*Math.sin(e)),s=Math.atan2(Math.tan(o),Math.cos(e))-this.phi0):(this.n=Math.sin(o),this.c=Math.cos(o),s=Proj4js.common.pj_mlfn(o,this.n,this.c,this.en),this.n=1/Math.sqrt(1-this.es*this.n*this.n),this.tn=Math.tan(o),this.t=this.tn*this.tn,this.a1=e*this.c,this.c*=this.es*this.c/(1-this.es),this.a2=this.a1*this.a1,i=this.n*this.a1*(1-this.a2*this.t*(this.C1-(8-this.t+8*this.c)*this.a2*this.C2)),s-=this.m0-this.n*this.tn*this.a2*(.5+(5-this.t+6*this.c)*this.a2*this.C3)),t.x=this.a*i+this.x0,t.y=this.a*s+this.y0,t},inverse:function(t){t.x-=this.x0,t.y-=this.y0;var i,s,e=t.x/this.a,o=t.y/this.a;if(this.sphere)this.dd=o+this.lat0,i=Math.asin(Math.sin(this.dd)*Math.cos(e)),s=Math.atan2(Math.tan(e),Math.cos(this.dd));else{var n=Proj4js.common.pj_inv_mlfn(this.m0+o,this.es,this.en);this.tn=Math.tan(n),this.t=this.tn*this.tn,this.n=Math.sin(n),this.r=1/(1-this.es*this.n*this.n),this.n=Math.sqrt(this.r),this.r*=(1-this.es)*this.n,this.dd=e/this.n,this.d2=this.dd*this.dd,i=n-this.n*this.tn/this.r*this.d2*(.5-(1+3*this.t)*this.d2*this.C3),s=this.dd*(1+this.t*this.d2*(-this.C4+(1+3*this.t)*this.d2*this.C5))/Math.cos(n)}return t.x=Proj4js.common.adjust_lon(this.long0+s),t.y=i,t}},Proj4js.Proj.gauss={init:function(){var t=Math.sin(this.lat0),i=Math.cos(this.lat0);i*=i,this.rc=Math.sqrt(1-this.es)/(1-this.es*t*t),this.C=Math.sqrt(1+this.es*i*i/(1-this.es)),this.phic0=Math.asin(t/this.C),this.ratexp=.5*this.C*this.e,this.K=Math.tan(.5*this.phic0+Proj4js.common.FORTPI)/(Math.pow(Math.tan(.5*this.lat0+Proj4js.common.FORTPI),this.C)*Proj4js.common.srat(this.e*t,this.ratexp))},forward:function(t){var i=t.x,s=t.y;return t.y=2*Math.atan(this.K*Math.pow(Math.tan(.5*s+Proj4js.common.FORTPI),this.C)*Proj4js.common.srat(this.e*Math.sin(s),this.ratexp))-Proj4js.common.HALF_PI,t.x=this.C*i,t},inverse:function(t){for(var i=1e-14,s=t.x/this.C,e=t.y,o=Math.pow(Math.tan(.5*e+Proj4js.common.FORTPI)/this.K,1/this.C),n=Proj4js.common.MAX_ITER;n>0&&(e=2*Math.atan(o*Proj4js.common.srat(this.e*Math.sin(t.y),-.5*this.e))-Proj4js.common.HALF_PI,!(i>Math.abs(e-t.y)));--n)t.y=e;return n?(t.x=s,t.y=e,t):(Proj4js.reportError("gauss:inverse:convergence failed"),null)}},Proj4js.Proj.omerc={init:function(){this.mode||(this.mode=0),this.lon1||(this.lon1=0,this.mode=1),this.lon2||(this.lon2=0),this.lat2||(this.lat2=0);var t=this.b/this.a,i=1-Math.pow(t,2);Math.sqrt(i),this.sin_p20=Math.sin(this.lat0),this.cos_p20=Math.cos(this.lat0),this.con=1-this.es*this.sin_p20*this.sin_p20,this.com=Math.sqrt(1-i),this.bl=Math.sqrt(1+this.es*Math.pow(this.cos_p20,4)/(1-i)),this.al=this.a*this.bl*this.k0*this.com/this.con,Math.abs(this.lat0)<Proj4js.common.EPSLN?(this.ts=1,this.d=1,this.el=1):(this.ts=Proj4js.common.tsfnz(this.e,this.lat0,this.sin_p20),this.con=Math.sqrt(this.con),this.d=this.bl*this.com/(this.cos_p20*this.con),this.f=this.d*this.d-1>0?this.lat0>=0?this.d+Math.sqrt(this.d*this.d-1):this.d-Math.sqrt(this.d*this.d-1):this.d,this.el=this.f*Math.pow(this.ts,this.bl)),0!=this.mode?(this.g=.5*(this.f-1/this.f),this.gama=Proj4js.common.asinz(Math.sin(this.alpha)/this.d),this.longc=this.longc-Proj4js.common.asinz(this.g*Math.tan(this.gama))/this.bl,this.con=Math.abs(this.lat0),this.con>Proj4js.common.EPSLN&&Math.abs(this.con-Proj4js.common.HALF_PI)>Proj4js.common.EPSLN?(this.singam=Math.sin(this.gama),this.cosgam=Math.cos(this.gama),this.sinaz=Math.sin(this.alpha),this.cosaz=Math.cos(this.alpha),this.u=this.lat0>=0?this.al/this.bl*Math.atan(Math.sqrt(this.d*this.d-1)/this.cosaz):-(this.al/this.bl)*Math.atan(Math.sqrt(this.d*this.d-1)/this.cosaz)):Proj4js.reportError("omerc:Init:DataError")):(this.sinphi=Math.sin(this.at1),this.ts1=Proj4js.common.tsfnz(this.e,this.lat1,this.sinphi),this.sinphi=Math.sin(this.lat2),this.ts2=Proj4js.common.tsfnz(this.e,this.lat2,this.sinphi),this.h=Math.pow(this.ts1,this.bl),this.l=Math.pow(this.ts2,this.bl),this.f=this.el/this.h,this.g=.5*(this.f-1/this.f),this.j=(this.el*this.el-this.l*this.h)/(this.el*this.el+this.l*this.h),this.p=(this.l-this.h)/(this.l+this.h),this.dlon=this.lon1-this.lon2,this.dlon<-Proj4js.common.PI&&(this.lon2=this.lon2-2*Proj4js.common.PI),this.dlon>Proj4js.common.PI&&(this.lon2=this.lon2+2*Proj4js.common.PI),this.dlon=this.lon1-this.lon2,this.longc=.5*(this.lon1+this.lon2)-Math.atan(this.j*Math.tan(.5*this.bl*this.dlon)/this.p)/this.bl,this.dlon=Proj4js.common.adjust_lon(this.lon1-this.longc),this.gama=Math.atan(Math.sin(this.bl*this.dlon)/this.g),this.alpha=Proj4js.common.asinz(this.d*Math.sin(this.gama)),Math.abs(this.lat1-this.lat2)<=Proj4js.common.EPSLN?Proj4js.reportError("omercInitDataError"):this.con=Math.abs(this.lat1),this.con<=Proj4js.common.EPSLN||Math.abs(this.con-Proj4js.common.HALF_PI)<=Proj4js.common.EPSLN?Proj4js.reportError("omercInitDataError"):Math.abs(Math.abs(this.lat0)-Proj4js.common.HALF_PI)<=Proj4js.common.EPSLN&&Proj4js.reportError("omercInitDataError"),this.singam=Math.sin(this.gam),this.cosgam=Math.cos(this.gam),this.sinaz=Math.sin(this.alpha),this.cosaz=Math.cos(this.alpha),this.u=this.lat0>=0?this.al/this.bl*Math.atan(Math.sqrt(this.d*this.d-1)/this.cosaz):-(this.al/this.bl)*Math.atan(Math.sqrt(this.d*this.d-1)/this.cosaz))},forward:function(t){var i,s,e,o,n,a,r,h,l,c,m,u=t.x,d=t.y;i=Math.sin(d),c=Proj4js.common.adjust_lon(u-this.longc),a=Math.sin(this.bl*c),Math.abs(Math.abs(d)-Proj4js.common.HALF_PI)>Proj4js.common.EPSLN?(m=Proj4js.common.tsfnz(this.e,d,i),o=this.el/Math.pow(m,this.bl),l=.5*(o-1/o),s=.5*(o+1/o),r=(l*this.singam-a*this.cosgam)/s,e=Math.cos(this.bl*c),1e-7>Math.abs(e)?n=this.al*this.bl*c:(n=this.al*Math.atan((l*this.cosgam+a*this.singam)/e)/this.bl,0>e&&(n+=Proj4js.common.PI*this.al/this.bl))):(r=d>=0?this.singam:-this.singam,n=this.al*d/this.bl),Math.abs(Math.abs(r)-1)<=Proj4js.common.EPSLN&&Proj4js.reportError("omercFwdInfinity"),h=.5*this.al*Math.log((1-r)/(1+r))/this.bl,n-=this.u;var p=this.x0+h*this.cosaz+n*this.sinaz,_=this.y0+n*this.cosaz-h*this.sinaz;return t.x=p,t.y=_,t},inverse:function(t){var i,s,e,o,n,a,r,h,l,c,m,u,d;return t.x-=this.x0,t.y-=this.y0,d=0,o=t.x*this.cosaz-t.y*this.sinaz,n=t.y*this.cosaz+t.x*this.sinaz,n+=this.u,a=Math.exp(-this.bl*o/this.al),r=.5*(a-1/a),s=.5*(a+1/a),l=Math.sin(this.bl*n/this.al),c=(l*this.cosgam+r*this.singam)/s,Math.abs(Math.abs(c)-1)<=Proj4js.common.EPSLN?(m=this.longc,u=c>=0?Proj4js.common.HALF_PI:-Proj4js.common.HALF_PI):(e=1/this.bl,h=Math.pow(this.el/Math.sqrt((1+c)/(1-c)),e),u=Proj4js.common.phi2z(this.e,h),i=this.longc-Math.atan2(r*this.cosgam-l*this.singam,e)/this.bl,m=Proj4js.common.adjust_lon(i)),t.x=m,t.y=u,t}},Proj4js.Proj.lcc={init:function(){if(this.lat2||(this.lat2=this.lat0),this.k0||(this.k0=1),Math.abs(this.lat1+this.lat2)<Proj4js.common.EPSLN)return Proj4js.reportError("lcc:init: Equal Latitudes"),void 0;var t=this.b/this.a;this.e=Math.sqrt(1-t*t);var i=Math.sin(this.lat1),s=Math.cos(this.lat1),e=Proj4js.common.msfnz(this.e,i,s),o=Proj4js.common.tsfnz(this.e,this.lat1,i),n=Math.sin(this.lat2),a=Math.cos(this.lat2),r=Proj4js.common.msfnz(this.e,n,a),h=Proj4js.common.tsfnz(this.e,this.lat2,n),l=Proj4js.common.tsfnz(this.e,this.lat0,Math.sin(this.lat0));this.ns=Math.abs(this.lat1-this.lat2)>Proj4js.common.EPSLN?Math.log(e/r)/Math.log(o/h):i,this.f0=e/(this.ns*Math.pow(o,this.ns)),this.rh=this.a*this.f0*Math.pow(l,this.ns),this.title||(this.title="Lambert Conformal Conic")},forward:function(t){var i=t.x,s=t.y;if(!(90>=s&&s>=-90&&180>=i&&i>=-180))return Proj4js.reportError("lcc:forward: llInputOutOfRange: "+i+" : "+s),null;var e,o,n=Math.abs(Math.abs(s)-Proj4js.common.HALF_PI);if(n>Proj4js.common.EPSLN)e=Proj4js.common.tsfnz(this.e,s,Math.sin(s)),o=this.a*this.f0*Math.pow(e,this.ns);else{if(n=s*this.ns,0>=n)return Proj4js.reportError("lcc:forward: No Projection"),null;o=0}var a=this.ns*Proj4js.common.adjust_lon(i-this.long0);return t.x=this.k0*o*Math.sin(a)+this.x0,t.y=this.k0*(this.rh-o*Math.cos(a))+this.y0,t},inverse:function(t){var i,s,e,o,n,a=(t.x-this.x0)/this.k0,r=this.rh-(t.y-this.y0)/this.k0;this.ns>0?(i=Math.sqrt(a*a+r*r),s=1):(i=-Math.sqrt(a*a+r*r),s=-1);var h=0;if(0!=i&&(h=Math.atan2(s*a,s*r)),0!=i||this.ns>0){if(s=1/this.ns,e=Math.pow(i/(this.a*this.f0),s),o=Proj4js.common.phi2z(this.e,e),-9999==o)return null}else o=-Proj4js.common.HALF_PI;return n=Proj4js.common.adjust_lon(h/this.ns+this.long0),t.x=n,t.y=o,t}},Proj4js.Proj.laea={S_POLE:1,N_POLE:2,EQUIT:3,OBLIQ:4,init:function(){var t=Math.abs(this.lat0);if(this.mode=Math.abs(t-Proj4js.common.HALF_PI)<Proj4js.common.EPSLN?0>this.lat0?this.S_POLE:this.N_POLE:Math.abs(t)<Proj4js.common.EPSLN?this.EQUIT:this.OBLIQ,this.es>0){var i;switch(this.qp=Proj4js.common.qsfnz(this.e,1),this.mmf=.5/(1-this.es),this.apa=this.authset(this.es),this.mode){case this.N_POLE:case this.S_POLE:this.dd=1;break;case this.EQUIT:this.rq=Math.sqrt(.5*this.qp),this.dd=1/this.rq,this.xmf=1,this.ymf=.5*this.qp;break;case this.OBLIQ:this.rq=Math.sqrt(.5*this.qp),i=Math.sin(this.lat0),this.sinb1=Proj4js.common.qsfnz(this.e,i)/this.qp,this.cosb1=Math.sqrt(1-this.sinb1*this.sinb1),this.dd=Math.cos(this.lat0)/(Math.sqrt(1-this.es*i*i)*this.rq*this.cosb1),this.ymf=(this.xmf=this.rq)/this.dd,this.xmf*=this.dd}}else this.mode==this.OBLIQ&&(this.sinph0=Math.sin(this.lat0),this.cosph0=Math.cos(this.lat0))},forward:function(t){var i,s,e=t.x,o=t.y;if(e=Proj4js.common.adjust_lon(e-this.long0),this.sphere){var n,a,r;switch(r=Math.sin(o),a=Math.cos(o),n=Math.cos(e),this.mode){case this.OBLIQ:case this.EQUIT:if(s=this.mode==this.EQUIT?1+a*n:1+this.sinph0*r+this.cosph0*a*n,Proj4js.common.EPSLN>=s)return Proj4js.reportError("laea:fwd:y less than eps"),null;s=Math.sqrt(2/s),i=s*a*Math.sin(e),s*=this.mode==this.EQUIT?r:this.cosph0*r-this.sinph0*a*n;break;case this.N_POLE:n=-n;case this.S_POLE:if(Math.abs(o+this.phi0)<Proj4js.common.EPSLN)return Proj4js.reportError("laea:fwd:phi < eps"),null;s=Proj4js.common.FORTPI-.5*o,s=2*(this.mode==this.S_POLE?Math.cos(s):Math.sin(s)),i=s*Math.sin(e),s*=n}}else{var n,h,r,l,c=0,m=0,u=0;switch(n=Math.cos(e),h=Math.sin(e),r=Math.sin(o),l=Proj4js.common.qsfnz(this.e,r),(this.mode==this.OBLIQ||this.mode==this.EQUIT)&&(c=l/this.qp,m=Math.sqrt(1-c*c)),this.mode){case this.OBLIQ:u=1+this.sinb1*c+this.cosb1*m*n;break;case this.EQUIT:u=1+m*n;break;case this.N_POLE:u=Proj4js.common.HALF_PI+o,l=this.qp-l;break;case this.S_POLE:u=o-Proj4js.common.HALF_PI,l=this.qp+l}if(Math.abs(u)<Proj4js.common.EPSLN)return Proj4js.reportError("laea:fwd:b < eps"),null;switch(this.mode){case this.OBLIQ:case this.EQUIT:u=Math.sqrt(2/u),s=this.mode==this.OBLIQ?this.ymf*u*(this.cosb1*c-this.sinb1*m*n):(u=Math.sqrt(2/(1+m*n)))*c*this.ymf,i=this.xmf*u*m*h;break;case this.N_POLE:case this.S_POLE:l>=0?(i=(u=Math.sqrt(l))*h,s=n*(this.mode==this.S_POLE?u:-u)):i=s=0}}return t.x=this.a*i+this.x0,t.y=this.a*s+this.y0,t},inverse:function(t){t.x-=this.x0,t.y-=this.y0;var i,s,e=t.x/this.a,o=t.y/this.a;if(this.sphere){var n,a=0,r=0;if(n=Math.sqrt(e*e+o*o),s=.5*n,s>1)return Proj4js.reportError("laea:Inv:DataError"),null;
switch(s=2*Math.asin(s),(this.mode==this.OBLIQ||this.mode==this.EQUIT)&&(r=Math.sin(s),a=Math.cos(s)),this.mode){case this.EQUIT:s=Math.abs(n)<=Proj4js.common.EPSLN?0:Math.asin(o*r/n),e*=r,o=a*n;break;case this.OBLIQ:s=Math.abs(n)<=Proj4js.common.EPSLN?this.phi0:Math.asin(a*this.sinph0+o*r*this.cosph0/n),e*=r*this.cosph0,o=(a-Math.sin(s)*this.sinph0)*n;break;case this.N_POLE:o=-o,s=Proj4js.common.HALF_PI-s;break;case this.S_POLE:s-=Proj4js.common.HALF_PI}i=0!=o||this.mode!=this.EQUIT&&this.mode!=this.OBLIQ?Math.atan2(e,o):0}else{var h,l,c,m,u=0;switch(this.mode){case this.EQUIT:case this.OBLIQ:if(e/=this.dd,o*=this.dd,m=Math.sqrt(e*e+o*o),Proj4js.common.EPSLN>m)return t.x=0,t.y=this.phi0,t;l=2*Math.asin(.5*m/this.rq),h=Math.cos(l),e*=l=Math.sin(l),this.mode==this.OBLIQ?(u=h*this.sinb1+o*l*this.cosb1/m,c=this.qp*u,o=m*this.cosb1*h-o*this.sinb1*l):(u=o*l/m,c=this.qp*u,o=m*h);break;case this.N_POLE:o=-o;case this.S_POLE:if(c=e*e+o*o,!c)return t.x=0,t.y=this.phi0,t;u=1-c/this.qp,this.mode==this.S_POLE&&(u=-u)}i=Math.atan2(e,o),s=this.authlat(Math.asin(u),this.apa)}return t.x=Proj4js.common.adjust_lon(this.long0+i),t.y=s,t},P00:.3333333333333333,P01:.17222222222222222,P02:.10257936507936508,P10:.06388888888888888,P11:.0664021164021164,P20:.016415012942191543,authset:function(t){var i,s=[];return s[0]=t*this.P00,i=t*t,s[0]+=i*this.P01,s[1]=i*this.P10,i*=t,s[0]+=i*this.P02,s[1]+=i*this.P11,s[2]=i*this.P20,s},authlat:function(t,i){var s=t+t;return t+i[0]*Math.sin(s)+i[1]*Math.sin(s+s)+i[2]*Math.sin(s+s+s)}},Proj4js.Proj.aeqd={init:function(){this.sin_p12=Math.sin(this.lat0),this.cos_p12=Math.cos(this.lat0)},forward:function(t){var i=t.x;t.y;var s,e=Math.sin(t.y),o=Math.cos(t.y),n=Proj4js.common.adjust_lon(i-this.long0),a=Math.cos(n),r=this.sin_p12*e+this.cos_p12*o*a;if(Math.abs(Math.abs(r)-1)<Proj4js.common.EPSLN){if(s=1,0>r)return Proj4js.reportError("aeqd:Fwd:PointError"),void 0}else{var h=Math.acos(r);s=h/Math.sin(h)}return t.x=this.x0+this.a*s*o*Math.sin(n),t.y=this.y0+this.a*s*(this.cos_p12*e-this.sin_p12*o*a),t},inverse:function(t){t.x-=this.x0,t.y-=this.y0;var i=Math.sqrt(t.x*t.x+t.y*t.y);if(i>2*Proj4js.common.HALF_PI*this.a)return Proj4js.reportError("aeqdInvDataError"),void 0;var s,e=i/this.a,o=Math.sin(e),n=Math.cos(e),a=this.long0;if(Math.abs(i)<=Proj4js.common.EPSLN)s=this.lat0;else{s=Proj4js.common.asinz(n*this.sin_p12+t.y*o*this.cos_p12/i);var r=Math.abs(this.lat0)-Proj4js.common.HALF_PI;Math.abs(r)<=Proj4js.common.EPSLN?a=this.lat0>=0?Proj4js.common.adjust_lon(this.long0+Math.atan2(t.x,-t.y)):Proj4js.common.adjust_lon(this.long0-Math.atan2(-t.x,t.y)):(r=n-this.sin_p12*Math.sin(s),Math.abs(r)<Proj4js.common.EPSLN&&Math.abs(t.x)<Proj4js.common.EPSLN||(Math.atan2(t.x*o*this.cos_p12,r*i),a=Proj4js.common.adjust_lon(this.long0+Math.atan2(t.x*o*this.cos_p12,r*i))))}return t.x=a,t.y=s,t}},Proj4js.Proj.moll={init:function(){},forward:function(t){for(var i=t.x,s=t.y,e=Proj4js.common.adjust_lon(i-this.long0),o=s,n=Proj4js.common.PI*Math.sin(s),a=0;!0;a++){var r=-(o+Math.sin(o)-n)/(1+Math.cos(o));if(o+=r,Math.abs(r)<Proj4js.common.EPSLN)break;a>=50&&Proj4js.reportError("moll:Fwd:IterationError")}o/=2,Proj4js.common.PI/2-Math.abs(s)<Proj4js.common.EPSLN&&(e=0);var h=.900316316158*this.a*e*Math.cos(o)+this.x0,l=1.4142135623731*this.a*Math.sin(o)+this.y0;return t.x=h,t.y=l,t},inverse:function(t){var i,s;t.x-=this.x0;var s=t.y/(1.4142135623731*this.a);Math.abs(s)>.999999999999&&(s=.999999999999);var i=Math.asin(s),e=Proj4js.common.adjust_lon(this.long0+t.x/(.900316316158*this.a*Math.cos(i)));-Proj4js.common.PI>e&&(e=-Proj4js.common.PI),e>Proj4js.common.PI&&(e=Proj4js.common.PI),s=(2*i+Math.sin(2*i))/Proj4js.common.PI,Math.abs(s)>1&&(s=1);var o=Math.asin(s);return t.x=e,t.y=o,t}},function(t,i,s){var e,o;typeof exports!=s+""?e=exports:(o=t.L,e={},e.noConflict=function(){return t.L=o,this},t.L=e),e.version="0.5.1",e.Util={extend:function(t){var i,s,e,o,n=Array.prototype.slice.call(arguments,1);for(s=0,e=n.length;e>s;s++){o=n[s]||{};for(i in o)o.hasOwnProperty(i)&&(t[i]=o[i])}return t},bind:function(t,i){var s=arguments.length>2?Array.prototype.slice.call(arguments,2):null;return function(){return t.apply(i,s||arguments)}},stamp:function(){var t=0,i="_leaflet_id";return function(s){return s[i]=s[i]||++t,s[i]}}(),limitExecByInterval:function(t,i,e){var o,n;return function a(){var r=arguments;return o?(n=!0,s):(o=!0,setTimeout(function(){o=!1,n&&(a.apply(e,r),n=!1)},i),t.apply(e,r),s)}},falseFn:function(){return!1},formatNum:function(t,i){var s=Math.pow(10,i||5);return Math.round(t*s)/s},splitWords:function(t){return t.replace(/^\s+|\s+$/g,"").split(/\s+/)},setOptions:function(t,i){return t.options=e.extend({},t.options,i),t.options},getParamString:function(t,i){var s=[];for(var e in t)t.hasOwnProperty(e)&&s.push(e+"="+t[e]);return(i&&-1!==i.indexOf("?")?"&":"?")+s.join("&")},template:function(t,i){return t.replace(/\{ *([\w_]+) *\}/g,function(t,s){var e=i[s];if(!i.hasOwnProperty(s))throw Error("No value provided for variable "+t);return e})},isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},emptyImageUrl:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="},function(){function i(i){var s,e,o=["webkit","moz","o","ms"];for(s=0;o.length>s&&!e;s++)e=t[o[s]+i];return e}function o(i){var s=+new Date,e=Math.max(0,16-(s-n));return n=s+e,t.setTimeout(i,e)}var n=0,a=t.requestAnimationFrame||i("RequestAnimationFrame")||o,r=t.cancelAnimationFrame||i("CancelAnimationFrame")||i("CancelRequestAnimationFrame")||function(i){t.clearTimeout(i)};e.Util.requestAnimFrame=function(i,n,r,h){return i=e.bind(i,n),r&&a===o?(i(),s):a.call(t,i,h)},e.Util.cancelAnimFrame=function(i){i&&r.call(t,i)}}(),e.extend=e.Util.extend,e.bind=e.Util.bind,e.stamp=e.Util.stamp,e.setOptions=e.Util.setOptions,e.Class=function(){},e.Class.extend=function(t){var i=function(){this.initialize&&this.initialize.apply(this,arguments),this._initHooks&&this.callInitHooks()},s=function(){};s.prototype=this.prototype;var o=new s;o.constructor=i,i.prototype=o;for(var n in this)this.hasOwnProperty(n)&&"prototype"!==n&&(i[n]=this[n]);t.statics&&(e.extend(i,t.statics),delete t.statics),t.includes&&(e.Util.extend.apply(null,[o].concat(t.includes)),delete t.includes),t.options&&o.options&&(t.options=e.extend({},o.options,t.options)),e.extend(o,t),o._initHooks=[];var a=this;return o.callInitHooks=function(){if(!this._initHooksCalled){a.prototype.callInitHooks&&a.prototype.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,i=o._initHooks.length;i>t;t++)o._initHooks[t].call(this)}},i},e.Class.include=function(t){e.extend(this.prototype,t)},e.Class.mergeOptions=function(t){e.extend(this.prototype.options,t)},e.Class.addInitHook=function(t){var i=Array.prototype.slice.call(arguments,1),s="function"==typeof t?t:function(){this[t].apply(this,i)};this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(s)};var n="_leaflet_events";e.Mixin={},e.Mixin.Events={addEventListener:function(t,i,s){var o,a,r,h=this[n]=this[n]||{};if("object"==typeof t){for(o in t)t.hasOwnProperty(o)&&this.addEventListener(o,t[o],i);return this}for(t=e.Util.splitWords(t),a=0,r=t.length;r>a;a++)h[t[a]]=h[t[a]]||[],h[t[a]].push({action:i,context:s||this});return this},hasEventListeners:function(t){return n in this&&t in this[n]&&this[n][t].length>0},removeEventListener:function(t,i,s){var o,a,r,h,l,c=this[n];if("object"==typeof t){for(o in t)t.hasOwnProperty(o)&&this.removeEventListener(o,t[o],i);return this}for(t=e.Util.splitWords(t),a=0,r=t.length;r>a;a++)if(this.hasEventListeners(t[a]))for(h=c[t[a]],l=h.length-1;l>=0;l--)i&&h[l].action!==i||s&&h[l].context!==s||h.splice(l,1);return this},fireEvent:function(t,i){if(!this.hasEventListeners(t))return this;for(var s=e.extend({type:t,target:this},i),o=this[n][t].slice(),a=0,r=o.length;r>a;a++)o[a].action.call(o[a].context||this,s);return this}},e.Mixin.Events.on=e.Mixin.Events.addEventListener,e.Mixin.Events.off=e.Mixin.Events.removeEventListener,e.Mixin.Events.fire=e.Mixin.Events.fireEvent,function(){var o=!!t.ActiveXObject,n=o&&!t.XMLHttpRequest,a=o&&!i.querySelector,r=navigator.userAgent.toLowerCase(),h=-1!==r.indexOf("webkit"),l=-1!==r.indexOf("chrome"),c=-1!==r.indexOf("android"),m=-1!==r.search("android [23]"),u=typeof orientation!=s+"",d=t.navigator&&t.navigator.msPointerEnabled&&t.navigator.msMaxTouchPoints,p="devicePixelRatio"in t&&t.devicePixelRatio>1||"matchMedia"in t&&t.matchMedia("(min-resolution:144dpi)")&&t.matchMedia("(min-resolution:144dpi)").matches,_=i.documentElement,f=o&&"transition"in _.style,P="WebKitCSSMatrix"in t&&"m11"in new t.WebKitCSSMatrix,y="MozPerspective"in _.style,g="OTransition"in _.style,L=!t.L_DISABLE_3D&&(f||P||y||g),v=!t.L_NO_TOUCH&&function(){var t="ontouchstart";if(d||t in _)return!0;var s=i.createElement("div"),e=!1;return s.setAttribute?(s.setAttribute(t,"return;"),"function"==typeof s[t]&&(e=!0),s.removeAttribute(t),s=null,e):!1}();e.Browser={ie:o,ie6:n,ie7:a,webkit:h,android:c,android23:m,chrome:l,ie3d:f,webkit3d:P,gecko3d:y,opera3d:g,any3d:L,mobile:u,mobileWebkit:u&&h,mobileWebkit3d:u&&P,mobileOpera:u&&t.opera,touch:v,msTouch:d,retina:p}}(),e.Point=function(t,i,s){this.x=s?Math.round(t):t,this.y=s?Math.round(i):i},e.Point.prototype={clone:function(){return new e.Point(this.x,this.y)},add:function(t){return this.clone()._add(e.point(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(e.point(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},distanceTo:function(t){t=e.point(t);var i=t.x-this.x,s=t.y-this.y;return Math.sqrt(i*i+s*s)},equals:function(t){return t.x===this.x&&t.y===this.y},toString:function(){return"Point("+e.Util.formatNum(this.x)+", "+e.Util.formatNum(this.y)+")"}},e.point=function(t,i,s){return t instanceof e.Point?t:e.Util.isArray(t)?new e.Point(t[0],t[1]):isNaN(t)?t:new e.Point(t,i,s)},e.Bounds=function(t,i){if(t)for(var s=i?[t,i]:t,e=0,o=s.length;o>e;e++)this.extend(s[e])},e.Bounds.prototype={extend:function(t){return t=e.point(t),this.min||this.max?(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(t.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(t.y,this.max.y)):(this.min=t.clone(),this.max=t.clone()),this},getCenter:function(t){return new e.Point((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return new e.Point(this.min.x,this.max.y)},getTopRight:function(){return new e.Point(this.max.x,this.min.y)},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var i,s;return t="number"==typeof t[0]||t instanceof e.Point?e.point(t):e.bounds(t),t instanceof e.Bounds?(i=t.min,s=t.max):i=s=t,i.x>=this.min.x&&s.x<=this.max.x&&i.y>=this.min.y&&s.y<=this.max.y},intersects:function(t){t=e.bounds(t);var i=this.min,s=this.max,o=t.min,n=t.max,a=n.x>=i.x&&o.x<=s.x,r=n.y>=i.y&&o.y<=s.y;return a&&r},isValid:function(){return!(!this.min||!this.max)}},e.bounds=function(t,i){return!t||t instanceof e.Bounds?t:new e.Bounds(t,i)},e.Transformation=function(t,i,s,e){this._a=t,this._b=i,this._c=s,this._d=e},e.Transformation.prototype={transform:function(t,i){return this._transform(t.clone(),i)},_transform:function(t,i){return i=i||1,t.x=i*(this._a*t.x+this._b),t.y=i*(this._c*t.y+this._d),t},untransform:function(t,i){return i=i||1,new e.Point((t.x/i-this._b)/this._a,(t.y/i-this._d)/this._c)}},e.DomUtil={get:function(t){return"string"==typeof t?i.getElementById(t):t},getStyle:function(t,s){var e=t.style[s];if(!e&&t.currentStyle&&(e=t.currentStyle[s]),(!e||"auto"===e)&&i.defaultView){var o=i.defaultView.getComputedStyle(t,null);e=o?o[s]:null}return"auto"===e?null:e},getViewportOffset:function(t){var s,o=0,n=0,a=t,r=i.body,h=e.Browser.ie7;do{if(o+=a.offsetTop||0,n+=a.offsetLeft||0,o+=parseInt(e.DomUtil.getStyle(a,"borderTopWidth"),10)||0,n+=parseInt(e.DomUtil.getStyle(a,"borderLeftWidth"),10)||0,s=e.DomUtil.getStyle(a,"position"),a.offsetParent===r&&"absolute"===s)break;if("fixed"===s){o+=r.scrollTop||0,n+=r.scrollLeft||0;break}a=a.offsetParent}while(a);a=t;do{if(a===r)break;o-=a.scrollTop||0,n-=a.scrollLeft||0,e.DomUtil.documentIsLtr()||!e.Browser.webkit&&!h||(n+=a.scrollWidth-a.clientWidth,h&&"hidden"!==e.DomUtil.getStyle(a,"overflow-y")&&"hidden"!==e.DomUtil.getStyle(a,"overflow")&&(n+=17)),a=a.parentNode}while(a);return new e.Point(n,o)},documentIsLtr:function(){return e.DomUtil._docIsLtrCached||(e.DomUtil._docIsLtrCached=!0,e.DomUtil._docIsLtr="ltr"===e.DomUtil.getStyle(i.body,"direction")),e.DomUtil._docIsLtr},create:function(t,s,e){var o=i.createElement(t);return o.className=s,e&&e.appendChild(o),o},disableTextSelection:function(){i.selection&&i.selection.empty&&i.selection.empty(),this._onselectstart||(this._onselectstart=i.onselectstart||null,i.onselectstart=e.Util.falseFn)},enableTextSelection:function(){i.onselectstart===e.Util.falseFn&&(i.onselectstart=this._onselectstart,this._onselectstart=null)},hasClass:function(t,i){return t.className.length>0&&RegExp("(^|\\s)"+i+"(\\s|$)").test(t.className)},addClass:function(t,i){e.DomUtil.hasClass(t,i)||(t.className+=(t.className?" ":"")+i)},removeClass:function(t,i){function s(t,s){return s===i?"":t}t.className=t.className.replace(/(\S+)\s*/g,s).replace(/(^\s+|\s+$)/,"")},setOpacity:function(t,i){if("opacity"in t.style)t.style.opacity=i;else if("filter"in t.style){var s=!1,e="DXImageTransform.Microsoft.Alpha";try{s=t.filters.item(e)}catch(o){}i=Math.round(100*i),s?(s.Enabled=100!==i,s.Opacity=i):t.style.filter+=" progid:"+e+"(opacity="+i+")"}},testProp:function(t){for(var s=i.documentElement.style,e=0;t.length>e;e++)if(t[e]in s)return t[e];return!1},getTranslateString:function(t){var i=e.Browser.webkit3d,s="translate"+(i?"3d":"")+"(",o=(i?",0":"")+")";return s+t.x+"px,"+t.y+"px"+o},getScaleString:function(t,i){var s=e.DomUtil.getTranslateString(i.add(i.multiplyBy(-1*t))),o=" scale("+t+") ";return s+o},setPosition:function(t,i,s){t._leaflet_pos=i,!s&&e.Browser.any3d?(t.style[e.DomUtil.TRANSFORM]=e.DomUtil.getTranslateString(i),e.Browser.mobileWebkit3d&&(t.style.WebkitBackfaceVisibility="hidden")):(t.style.left=i.x+"px",t.style.top=i.y+"px")},getPosition:function(t){return t._leaflet_pos}},e.DomUtil.TRANSFORM=e.DomUtil.testProp(["transform","WebkitTransform","OTransform","MozTransform","msTransform"]),e.DomUtil.TRANSITION=e.DomUtil.testProp(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),e.DomUtil.TRANSITION_END="webkitTransition"===e.DomUtil.TRANSITION||"OTransition"===e.DomUtil.TRANSITION?e.DomUtil.TRANSITION+"End":"transitionend",e.LatLng=function(t,i){var s=parseFloat(t),e=parseFloat(i);if(isNaN(s)||isNaN(e))throw Error("Invalid LatLng object: ("+t+", "+i+")");this.lat=s,this.lng=e},e.extend(e.LatLng,{DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,MAX_MARGIN:1e-9}),e.LatLng.prototype={equals:function(t){if(!t)return!1;t=e.latLng(t);var i=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return e.LatLng.MAX_MARGIN>=i},toString:function(t){return"LatLng("+e.Util.formatNum(this.lat,t)+", "+e.Util.formatNum(this.lng,t)+")"},distanceTo:function(t){t=e.latLng(t);var i=6378137,s=e.LatLng.DEG_TO_RAD,o=(t.lat-this.lat)*s,n=(t.lng-this.lng)*s,a=this.lat*s,r=t.lat*s,h=Math.sin(o/2),l=Math.sin(n/2),c=h*h+l*l*Math.cos(a)*Math.cos(r);return 2*i*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))},wrap:function(t,i){var s=this.lng;return t=t||-180,i=i||180,s=(s+i)%(i-t)+(t>s||s===i?i:t),new e.LatLng(this.lat,s)}},e.latLng=function(t,i){return t instanceof e.LatLng?t:e.Util.isArray(t)?new e.LatLng(t[0],t[1]):isNaN(t)?t:new e.LatLng(t,i)},e.LatLngBounds=function(t,i){if(t)for(var s=i?[t,i]:t,e=0,o=s.length;o>e;e++)this.extend(s[e])},e.LatLngBounds.prototype={extend:function(t){return t="number"==typeof t[0]||"string"==typeof t[0]||t instanceof e.LatLng?e.latLng(t):e.latLngBounds(t),t instanceof e.LatLng?this._southWest||this._northEast?(this._southWest.lat=Math.min(t.lat,this._southWest.lat),this._southWest.lng=Math.min(t.lng,this._southWest.lng),this._northEast.lat=Math.max(t.lat,this._northEast.lat),this._northEast.lng=Math.max(t.lng,this._northEast.lng)):(this._southWest=new e.LatLng(t.lat,t.lng),this._northEast=new e.LatLng(t.lat,t.lng)):t instanceof e.LatLngBounds&&(this.extend(t._southWest),this.extend(t._northEast)),this},pad:function(t){var i=this._southWest,s=this._northEast,o=Math.abs(i.lat-s.lat)*t,n=Math.abs(i.lng-s.lng)*t;return new e.LatLngBounds(new e.LatLng(i.lat-o,i.lng-n),new e.LatLng(s.lat+o,s.lng+n))},getCenter:function(){return new e.LatLng((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new e.LatLng(this._northEast.lat,this._southWest.lng)},getSouthEast:function(){return new e.LatLng(this._southWest.lat,this._northEast.lng)},contains:function(t){t="number"==typeof t[0]||t instanceof e.LatLng?e.latLng(t):e.latLngBounds(t);var i,s,o=this._southWest,n=this._northEast;return t instanceof e.LatLngBounds?(i=t.getSouthWest(),s=t.getNorthEast()):i=s=t,i.lat>=o.lat&&s.lat<=n.lat&&i.lng>=o.lng&&s.lng<=n.lng},intersects:function(t){t=e.latLngBounds(t);var i=this._southWest,s=this._northEast,o=t.getSouthWest(),n=t.getNorthEast(),a=n.lat>=i.lat&&o.lat<=s.lat,r=n.lng>=i.lng&&o.lng<=s.lng;return a&&r},toBBoxString:function(){var t=this._southWest,i=this._northEast;return[t.lng,t.lat,i.lng,i.lat].join(",")},equals:function(t){return t?(t=e.latLngBounds(t),this._southWest.equals(t.getSouthWest())&&this._northEast.equals(t.getNorthEast())):!1},isValid:function(){return!(!this._southWest||!this._northEast)}},e.latLngBounds=function(t,i){return!t||t instanceof e.LatLngBounds?t:new e.LatLngBounds(t,i)},e.Projection={},e.Projection.SphericalMercator={MAX_LATITUDE:85.0511287798,project:function(t){var i=e.LatLng.DEG_TO_RAD,s=this.MAX_LATITUDE,o=Math.max(Math.min(s,t.lat),-s),n=t.lng*i,a=o*i;return a=Math.log(Math.tan(Math.PI/4+a/2)),new e.Point(n,a)},unproject:function(t){var i=e.LatLng.RAD_TO_DEG,s=t.x*i,o=(2*Math.atan(Math.exp(t.y))-Math.PI/2)*i;return new e.LatLng(o,s)}},e.Projection.LonLat={project:function(t){return new e.Point(t.lng,t.lat)},unproject:function(t){return new e.LatLng(t.y,t.x)}},e.CRS={latLngToPoint:function(t,i){var s=this.projection.project(t),e=this.scale(i);return this.transformation._transform(s,e)},pointToLatLng:function(t,i){var s=this.scale(i),e=this.transformation.untransform(t,s);return this.projection.unproject(e)},project:function(t){return this.projection.project(t)},scale:function(t){return 256*Math.pow(2,t)}},e.CRS.Simple=e.extend({},e.CRS,{projection:e.Projection.LonLat,transformation:new e.Transformation(1,0,-1,0),scale:function(t){return Math.pow(2,t)}}),e.CRS.EPSG3857=e.extend({},e.CRS,{code:"EPSG:3857",projection:e.Projection.SphericalMercator,transformation:new e.Transformation(.5/Math.PI,.5,-.5/Math.PI,.5),project:function(t){var i=this.projection.project(t),s=6378137;return i.multiplyBy(s)}}),e.CRS.EPSG900913=e.extend({},e.CRS.EPSG3857,{code:"EPSG:900913"}),e.CRS.EPSG4326=e.extend({},e.CRS,{code:"EPSG:4326",projection:e.Projection.LonLat,transformation:new e.Transformation(1/360,.5,-1/360,.5)}),e.Map=e.Class.extend({includes:e.Mixin.Events,options:{crs:e.CRS.EPSG3857,fadeAnimation:e.DomUtil.TRANSITION&&!e.Browser.android23,trackResize:!0,markerZoomAnimation:e.DomUtil.TRANSITION&&e.Browser.any3d},initialize:function(t,i){i=e.setOptions(this,i),this._initContainer(t),this._initLayout(),this.callInitHooks(),this._initEvents(),i.maxBounds&&this.setMaxBounds(i.maxBounds),i.center&&i.zoom!==s&&this.setView(e.latLng(i.center),i.zoom,!0),this._initLayers(i.layers)},setView:function(t,i){return this._resetView(e.latLng(t),this._limitZoom(i)),this},setZoom:function(t){return this.setView(this.getCenter(),t)},zoomIn:function(t){return this.setZoom(this._zoom+(t||1))},zoomOut:function(t){return this.setZoom(this._zoom-(t||1))},fitBounds:function(t){var i=this.getBoundsZoom(t);return this.setView(e.latLngBounds(t).getCenter(),i)},fitWorld:function(){var t=new e.LatLng(-60,-170),i=new e.LatLng(85,179);return this.fitBounds(new e.LatLngBounds(t,i))},panTo:function(t){return this.setView(t,this._zoom)},panBy:function(t){return this.fire("movestart"),this._rawPanBy(e.point(t)),this.fire("move"),this.fire("moveend")},setMaxBounds:function(t){if(t=e.latLngBounds(t),this.options.maxBounds=t,!t)return this._boundsMinZoom=null,this;var i=this.getBoundsZoom(t,!0);return this._boundsMinZoom=i,this._loaded&&(i>this._zoom?this.setView(t.getCenter(),i):this.panInsideBounds(t)),this},panInsideBounds:function(t){t=e.latLngBounds(t);var i=this.getBounds(),s=this.project(i.getSouthWest()),o=this.project(i.getNorthEast()),n=this.project(t.getSouthWest()),a=this.project(t.getNorthEast()),r=0,h=0;return o.y<a.y&&(h=a.y-o.y),o.x>a.x&&(r=a.x-o.x),s.y>n.y&&(h=n.y-s.y),s.x<n.x&&(r=n.x-s.x),this.panBy(new e.Point(r,h,!0))},addLayer:function(t){var i=e.stamp(t);return this._layers[i]?this:(this._layers[i]=t,!t.options||isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[i]=t,this._updateZoomLevels()),this.options.zoomAnimation&&e.TileLayer&&t instanceof e.TileLayer&&(this._tileLayersNum++,this._tileLayersToLoad++,t.on("load",this._onTileLayerLoad,this)),this.whenReady(function(){t.onAdd(this),this.fire("layeradd",{layer:t})},this),this)},removeLayer:function(t){var i=e.stamp(t);if(this._layers[i])return t.onRemove(this),delete this._layers[i],this._zoomBoundLayers[i]&&(delete this._zoomBoundLayers[i],this._updateZoomLevels()),this.options.zoomAnimation&&e.TileLayer&&t instanceof e.TileLayer&&(this._tileLayersNum--,this._tileLayersToLoad--,t.off("load",this._onTileLayerLoad,this)),this.fire("layerremove",{layer:t})},hasLayer:function(t){var i=e.stamp(t);return this._layers.hasOwnProperty(i)},invalidateSize:function(t){var i=this.getSize();if(this._sizeChanged=!0,this.options.maxBounds&&this.setMaxBounds(this.options.maxBounds),!this._loaded)return this;var s=i._subtract(this.getSize())._divideBy(2)._round();return t===!0?this.panBy(s):(this._rawPanBy(s),this.fire("move"),clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(e.bind(this.fire,this,"moveend"),200)),this},addHandler:function(t,i){return i?(this[t]=new i(this),this.options[t]&&this[t].enable(),this):s},getCenter:function(){return this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),i=this.unproject(t.getBottomLeft()),s=this.unproject(t.getTopRight());return new e.LatLngBounds(i,s)},getMinZoom:function(){var t=this.options.minZoom||0,i=this._layersMinZoom||0,s=this._boundsMinZoom||0;return Math.max(t,i,s)},getMaxZoom:function(){var t=this.options.maxZoom===s?1/0:this.options.maxZoom,i=this._layersMaxZoom===s?1/0:this._layersMaxZoom;return Math.min(t,i)},getBoundsZoom:function(t,i){t=e.latLngBounds(t);var s,o,n,a=this.getSize(),r=this.options.minZoom||0,h=this.getMaxZoom(),l=t.getNorthEast(),c=t.getSouthWest(),m=!0;i&&r--;do r++,o=this.project(l,r),n=this.project(c,r),s=new e.Point(Math.abs(o.x-n.x),Math.abs(n.y-o.y)),m=i?s.x<a.x||s.y<a.y:s.x<=a.x&&s.y<=a.y;while(m&&h>=r);return m&&i?null:i?r:r-1},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new e.Point(this._container.clientWidth,this._container.clientHeight),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(){var t=this._getTopLeftPoint();return new e.Bounds(t,t.add(this.getSize()))},getPixelOrigin:function(){return this._initialTopLeftPoint},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t){var i=this.options.crs;return i.scale(t)/i.scale(this._zoom)},getScaleZoom:function(t){return this._zoom+Math.log(t)/Math.LN2},project:function(t,i){return i=i===s?this._zoom:i,this.options.crs.latLngToPoint(e.latLng(t),i)},unproject:function(t,i){return i=i===s?this._zoom:i,this.options.crs.pointToLatLng(e.point(t),i)},layerPointToLatLng:function(t){var i=e.point(t).add(this._initialTopLeftPoint);return this.unproject(i)},latLngToLayerPoint:function(t){var i=this.project(e.latLng(t))._round();return i._subtract(this._initialTopLeftPoint)},containerPointToLayerPoint:function(t){return e.point(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return e.point(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var i=this.containerPointToLayerPoint(e.point(t));return this.layerPointToLatLng(i)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(e.latLng(t)))},mouseEventToContainerPoint:function(t){return e.DomEvent.getMousePosition(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var i=this._container=e.DomUtil.get(t);if(i._leaflet)throw Error("Map container is already initialized.");i._leaflet=!0},_initLayout:function(){var t=this._container;e.DomUtil.addClass(t,"leaflet-container"),e.Browser.touch&&e.DomUtil.addClass(t,"leaflet-touch"),this.options.fadeAnimation&&e.DomUtil.addClass(t,"leaflet-fade-anim");var i=e.DomUtil.getStyle(t,"position");"absolute"!==i&&"relative"!==i&&"fixed"!==i&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._mapPane=t.mapPane=this._createPane("leaflet-map-pane",this._container),this._tilePane=t.tilePane=this._createPane("leaflet-tile-pane",this._mapPane),t.objectsPane=this._createPane("leaflet-objects-pane",this._mapPane),t.shadowPane=this._createPane("leaflet-shadow-pane"),t.overlayPane=this._createPane("leaflet-overlay-pane"),t.markerPane=this._createPane("leaflet-marker-pane"),t.popupPane=this._createPane("leaflet-popup-pane");var i=" leaflet-zoom-hide";this.options.markerZoomAnimation||(e.DomUtil.addClass(t.markerPane,i),e.DomUtil.addClass(t.shadowPane,i),e.DomUtil.addClass(t.popupPane,i))},_createPane:function(t,i){return e.DomUtil.create("div",t,i||this._panes.objectsPane)},_initLayers:function(t){t=t?e.Util.isArray(t)?t:[t]:[],this._layers={},this._zoomBoundLayers={},this._tileLayersNum=0;var i,s;for(i=0,s=t.length;s>i;i++)this.addLayer(t[i])},_resetView:function(t,i,s,o){var n=this._zoom!==i;o||(this.fire("movestart"),n&&this.fire("zoomstart")),this._zoom=i,this._initialTopLeftPoint=this._getNewTopLeftPoint(t),s?this._initialTopLeftPoint._add(this._getMapPanePos()):e.DomUtil.setPosition(this._mapPane,new e.Point(0,0)),this._tileLayersToLoad=this._tileLayersNum;var a=!this._loaded;this._loaded=!0,this.fire("viewreset",{hard:!s}),this.fire("move"),(n||o)&&this.fire("zoomend"),this.fire("moveend",{hard:!s}),a&&this.fire("load")},_rawPanBy:function(t){e.DomUtil.setPosition(this._mapPane,this._getMapPanePos().subtract(t))},_updateZoomLevels:function(){var t,i=1/0,e=-1/0;for(t in this._zoomBoundLayers)if(this._zoomBoundLayers.hasOwnProperty(t)){var o=this._zoomBoundLayers[t];isNaN(o.options.minZoom)||(i=Math.min(i,o.options.minZoom)),isNaN(o.options.maxZoom)||(e=Math.max(e,o.options.maxZoom))}t===s?this._layersMaxZoom=this._layersMinZoom=s:(this._layersMaxZoom=e,this._layersMinZoom=i)},_initEvents:function(){if(e.DomEvent){e.DomEvent.on(this._container,"click",this._onMouseClick,this);var i,s,o=["dblclick","mousedown","mouseup","mouseenter","mouseleave","mousemove","contextmenu"];for(i=0,s=o.length;s>i;i++)e.DomEvent.on(this._container,o[i],this._fireMouseEvent,this);this.options.trackResize&&e.DomEvent.on(t,"resize",this._onResize,this)}},_onResize:function(){e.Util.cancelAnimFrame(this._resizeRequest),this._resizeRequest=e.Util.requestAnimFrame(this.invalidateSize,this,!1,this._container)},_onMouseClick:function(t){!this._loaded||this.dragging&&this.dragging.moved()||(this.fire("preclick"),this._fireMouseEvent(t))},_fireMouseEvent:function(t){if(this._loaded){var i=t.type;if(i="mouseenter"===i?"mouseover":"mouseleave"===i?"mouseout":i,this.hasEventListeners(i)){"contextmenu"===i&&e.DomEvent.preventDefault(t);var s=this.mouseEventToContainerPoint(t),o=this.containerPointToLayerPoint(s),n=this.layerPointToLatLng(o);this.fire(i,{latlng:n,layerPoint:o,containerPoint:s,originalEvent:t})}}},_onTileLayerLoad:function(){this._tileLayersToLoad--,this._tileLayersNum&&!this._tileLayersToLoad&&this._tileBg&&(clearTimeout(this._clearTileBgTimer),this._clearTileBgTimer=setTimeout(e.bind(this._clearTileBg,this),500))},whenReady:function(t,i){return this._loaded?t.call(i||this,this):this.on("load",t,i),this},_getMapPanePos:function(){return e.DomUtil.getPosition(this._mapPane)},_getTopLeftPoint:function(){if(!this._loaded)throw Error("Set map center and zoom first.");return this._initialTopLeftPoint.subtract(this._getMapPanePos())},_getNewTopLeftPoint:function(t,i){var s=this.getSize()._divideBy(2);return this.project(t,i)._subtract(s)._round()},_latLngToNewLayerPoint:function(t,i,s){var e=this._getNewTopLeftPoint(s,i).add(this._getMapPanePos());return this.project(t,i)._subtract(e)},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitZoom:function(t){var i=this.getMinZoom(),s=this.getMaxZoom();return Math.max(i,Math.min(s,t))}}),e.map=function(t,i){return new e.Map(t,i)},e.Projection.Mercator={MAX_LATITUDE:85.0840591556,R_MINOR:6356752.3142,R_MAJOR:6378137,project:function(t){var i=e.LatLng.DEG_TO_RAD,s=this.MAX_LATITUDE,o=Math.max(Math.min(s,t.lat),-s),n=this.R_MAJOR,a=this.R_MINOR,r=t.lng*i*n,h=o*i,l=a/n,c=Math.sqrt(1-l*l),m=c*Math.sin(h);m=Math.pow((1-m)/(1+m),.5*c);var u=Math.tan(.5*(.5*Math.PI-h))/m;return h=-a*Math.log(u),new e.Point(r,h)},unproject:function(t){for(var i,s=e.LatLng.RAD_TO_DEG,o=this.R_MAJOR,n=this.R_MINOR,a=t.x*s/o,r=n/o,h=Math.sqrt(1-r*r),l=Math.exp(-t.y/n),c=Math.PI/2-2*Math.atan(l),m=15,u=1e-7,d=m,p=.1;Math.abs(p)>u&&--d>0;)i=h*Math.sin(c),p=Math.PI/2-2*Math.atan(l*Math.pow((1-i)/(1+i),.5*h))-c,c+=p;return new e.LatLng(c*s,a)}},e.CRS.EPSG3395=e.extend({},e.CRS,{code:"EPSG:3395",projection:e.Projection.Mercator,transformation:function(){var t=e.Projection.Mercator,i=t.R_MAJOR,s=t.R_MINOR;return new e.Transformation(.5/(Math.PI*i),.5,-.5/(Math.PI*s),.5)}()}),e.TileLayer=e.Class.extend({includes:e.Mixin.Events,options:{minZoom:0,maxZoom:18,tileSize:256,subdomains:"abc",errorTileUrl:"",attribution:"",zoomOffset:0,opacity:1,unloadInvisibleTiles:e.Browser.mobile,updateWhenIdle:e.Browser.mobile},initialize:function(t,i){i=e.setOptions(this,i),i.detectRetina&&e.Browser.retina&&i.maxZoom>0&&(i.tileSize=Math.floor(i.tileSize/2),i.zoomOffset++,i.minZoom>0&&i.minZoom--,this.options.maxZoom--),this._url=t;var s=this.options.subdomains;"string"==typeof s&&(this.options.subdomains=s.split(""))},onAdd:function(t){this._map=t,this._initContainer(),this._createTileProto(),t.on({viewreset:this._resetCallback,moveend:this._update},this),this.options.updateWhenIdle||(this._limitedUpdate=e.Util.limitExecByInterval(this._update,150,this),t.on("move",this._limitedUpdate,this)),this._reset(),this._update()},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){this._container.parentNode.removeChild(this._container),t.off({viewreset:this._resetCallback,moveend:this._update},this),this.options.updateWhenIdle||t.off("move",this._limitedUpdate,this),this._container=null,this._map=null
},bringToFront:function(){var t=this._map._panes.tilePane;return this._container&&(t.appendChild(this._container),this._setAutoZIndex(t,Math.max)),this},bringToBack:function(){var t=this._map._panes.tilePane;return this._container&&(t.insertBefore(this._container,t.firstChild),this._setAutoZIndex(t,Math.min)),this},getAttribution:function(){return this.options.attribution},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},setUrl:function(t,i){return this._url=t,i||this.redraw(),this},redraw:function(){return this._map&&(this._map._panes.tilePane.empty=!1,this._reset(!0),this._update()),this},_updateZIndex:function(){this._container&&this.options.zIndex!==s&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t,i){var s,e,o,n=t.children,a=-i(1/0,-1/0);for(e=0,o=n.length;o>e;e++)n[e]!==this._container&&(s=parseInt(n[e].style.zIndex,10),isNaN(s)||(a=i(a,s)));this.options.zIndex=this._container.style.zIndex=(isFinite(a)?a:0)+i(1,-1)},_updateOpacity:function(){e.DomUtil.setOpacity(this._container,this.options.opacity);var t,i=this._tiles;if(e.Browser.webkit)for(t in i)i.hasOwnProperty(t)&&(i[t].style.webkitTransform+=" translate(0,0)")},_initContainer:function(){var t=this._map._panes.tilePane;(!this._container||t.empty)&&(this._container=e.DomUtil.create("div","leaflet-layer"),this._updateZIndex(),t.appendChild(this._container),1>this.options.opacity&&this._updateOpacity())},_resetCallback:function(t){this._reset(t.hard)},_reset:function(t){var i=this._tiles;for(var s in i)i.hasOwnProperty(s)&&this.fire("tileunload",{tile:i[s]});this._tiles={},this._tilesToLoad=0,this.options.reuseTiles&&(this._unusedTiles=[]),t&&this._container&&(this._container.innerHTML=""),this._initContainer()},_update:function(){if(this._map){var t=this._map.getPixelBounds(),i=this._map.getZoom(),s=this.options.tileSize;if(!(i>this.options.maxZoom||this.options.minZoom>i)){var o=new e.Point(Math.floor(t.min.x/s),Math.floor(t.min.y/s)),n=new e.Point(Math.floor(t.max.x/s),Math.floor(t.max.y/s)),a=new e.Bounds(o,n);this._addTilesFromCenterOut(a),(this.options.unloadInvisibleTiles||this.options.reuseTiles)&&this._removeOtherTiles(a)}}},_addTilesFromCenterOut:function(t){var s,o,n,a=[],r=t.getCenter();for(s=t.min.y;t.max.y>=s;s++)for(o=t.min.x;t.max.x>=o;o++)n=new e.Point(o,s),this._tileShouldBeLoaded(n)&&a.push(n);var h=a.length;if(0!==h){a.sort(function(t,i){return t.distanceTo(r)-i.distanceTo(r)});var l=i.createDocumentFragment();for(this._tilesToLoad||this.fire("loading"),this._tilesToLoad+=h,o=0;h>o;o++)this._addTile(a[o],l);this._container.appendChild(l)}},_tileShouldBeLoaded:function(t){if(t.x+":"+t.y in this._tiles)return!1;if(!this.options.continuousWorld){var i=this._getWrapTileNum();if(this.options.noWrap&&(0>t.x||t.x>=i)||0>t.y||t.y>=i)return!1}return!0},_removeOtherTiles:function(t){var i,s,e,o;for(o in this._tiles)this._tiles.hasOwnProperty(o)&&(i=o.split(":"),s=parseInt(i[0],10),e=parseInt(i[1],10),(t.min.x>s||s>t.max.x||t.min.y>e||e>t.max.y)&&this._removeTile(o))},_removeTile:function(t){var i=this._tiles[t];this.fire("tileunload",{tile:i,url:i.src}),this.options.reuseTiles?(e.DomUtil.removeClass(i,"leaflet-tile-loaded"),this._unusedTiles.push(i)):i.parentNode===this._container&&this._container.removeChild(i),e.Browser.android||(i.src=e.Util.emptyImageUrl),delete this._tiles[t]},_addTile:function(t,i){var s=this._getTilePos(t),o=this._getTile();e.DomUtil.setPosition(o,s,e.Browser.chrome||e.Browser.android23),this._tiles[t.x+":"+t.y]=o,this._loadTile(o,t),o.parentNode!==this._container&&i.appendChild(o)},_getZoomForUrl:function(){var t=this.options,i=this._map.getZoom();return t.zoomReverse&&(i=t.maxZoom-i),i+t.zoomOffset},_getTilePos:function(t){var i=this._map.getPixelOrigin(),s=this.options.tileSize;return t.multiplyBy(s).subtract(i)},getTileUrl:function(t){return this._adjustTilePoint(t),e.Util.template(this._url,e.extend({s:this._getSubdomain(t),z:this._getZoomForUrl(),x:t.x,y:t.y},this.options))},_getWrapTileNum:function(){return Math.pow(2,this._getZoomForUrl())},_adjustTilePoint:function(t){var i=this._getWrapTileNum();this.options.continuousWorld||this.options.noWrap||(t.x=(t.x%i+i)%i),this.options.tms&&(t.y=i-t.y-1)},_getSubdomain:function(t){var i=(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[i]},_createTileProto:function(){var t=this._tileImg=e.DomUtil.create("img","leaflet-tile");t.style.width=t.style.height=this.options.tileSize+"px",t.galleryimg="no"},_getTile:function(){if(this.options.reuseTiles&&this._unusedTiles.length>0){var t=this._unusedTiles.pop();return this._resetTile(t),t}return this._createTile()},_resetTile:function(){},_createTile:function(){var t=this._tileImg.cloneNode(!1);return t.onselectstart=t.onmousemove=e.Util.falseFn,t},_loadTile:function(t,i){t._layer=this,t.onload=this._tileOnLoad,t.onerror=this._tileOnError,t.src=this.getTileUrl(i)},_tileLoaded:function(){this._tilesToLoad--,this._tilesToLoad||this.fire("load")},_tileOnLoad:function(){var t=this._layer;this.src!==e.Util.emptyImageUrl&&(e.DomUtil.addClass(this,"leaflet-tile-loaded"),t.fire("tileload",{tile:this,url:this.src})),t._tileLoaded()},_tileOnError:function(){var t=this._layer;t.fire("tileerror",{tile:this,url:this.src});var i=t.options.errorTileUrl;i&&(this.src=i),t._tileLoaded()}}),e.tileLayer=function(t,i){return new e.TileLayer(t,i)},e.TileLayer.WMS=e.TileLayer.extend({defaultWmsParams:{service:"WMS",request:"GetMap",version:"1.1.1",layers:"",styles:"",format:"image/jpeg",transparent:!1},initialize:function(t,i){this._url=t;var s=e.extend({},this.defaultWmsParams);s.width=s.height=i.detectRetina&&e.Browser.retina?2*this.options.tileSize:this.options.tileSize;for(var o in i)this.options.hasOwnProperty(o)||(s[o]=i[o]);this.wmsParams=s,e.setOptions(this,i)},onAdd:function(t){var i=parseFloat(this.wmsParams.version)>=1.3?"crs":"srs";this.wmsParams[i]=t.options.crs.code,e.TileLayer.prototype.onAdd.call(this,t)},getTileUrl:function(t,i){this._adjustTilePoint(t);var s=this._map,o=s.options.crs,n=this.options.tileSize,a=t.multiplyBy(n),r=a.add(new e.Point(n,n)),h=o.project(s.unproject(a,i)),l=o.project(s.unproject(r,i)),c=[h.x,l.y,l.x,h.y].join(","),m=e.Util.template(this._url,{s:this._getSubdomain(t)});return m+e.Util.getParamString(this.wmsParams,m)+"&bbox="+c},setParams:function(t,i){return e.extend(this.wmsParams,t),i||this.redraw(),this}}),e.tileLayer.wms=function(t,i){return new e.TileLayer.WMS(t,i)},e.TileLayer.Canvas=e.TileLayer.extend({options:{async:!1},initialize:function(t){e.setOptions(this,t)},redraw:function(){var t=this._tiles;for(var i in t)t.hasOwnProperty(i)&&this._redrawTile(t[i])},_redrawTile:function(t){this.drawTile(t,t._tilePoint,this._map._zoom)},_createTileProto:function(){var t=this._canvasProto=e.DomUtil.create("canvas","leaflet-tile");t.width=t.height=this.options.tileSize},_createTile:function(){var t=this._canvasProto.cloneNode(!1);return t.onselectstart=t.onmousemove=e.Util.falseFn,t},_loadTile:function(t,i){t._layer=this,t._tilePoint=i,this._redrawTile(t),this.options.async||this.tileDrawn(t)},drawTile:function(){},tileDrawn:function(t){this._tileOnLoad.call(t)}}),e.tileLayer.canvas=function(t){return new e.TileLayer.Canvas(t)},e.ImageOverlay=e.Class.extend({includes:e.Mixin.Events,options:{opacity:1},initialize:function(t,i,s){this._url=t,this._bounds=e.latLngBounds(i),e.setOptions(this,s)},onAdd:function(t){this._map=t,this._image||this._initImage(),t._panes.overlayPane.appendChild(this._image),t.on("viewreset",this._reset,this),t.options.zoomAnimation&&e.Browser.any3d&&t.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(t){t.getPanes().overlayPane.removeChild(this._image),t.off("viewreset",this._reset,this),t.options.zoomAnimation&&t.off("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},bringToFront:function(){return this._image&&this._map._panes.overlayPane.appendChild(this._image),this},bringToBack:function(){var t=this._map._panes.overlayPane;return this._image&&t.insertBefore(this._image,t.firstChild),this},_initImage:function(){this._image=e.DomUtil.create("img","leaflet-image-layer"),this._map.options.zoomAnimation&&e.Browser.any3d?e.DomUtil.addClass(this._image,"leaflet-zoom-animated"):e.DomUtil.addClass(this._image,"leaflet-zoom-hide"),this._updateOpacity(),e.extend(this._image,{galleryimg:"no",onselectstart:e.Util.falseFn,onmousemove:e.Util.falseFn,onload:e.bind(this._onImageLoad,this),src:this._url})},_animateZoom:function(t){var i=this._map,s=this._image,o=i.getZoomScale(t.zoom),n=this._bounds.getNorthWest(),a=this._bounds.getSouthEast(),r=i._latLngToNewLayerPoint(n,t.zoom,t.center),h=i._latLngToNewLayerPoint(a,t.zoom,t.center)._subtract(r),l=r._add(h._multiplyBy(.5*(1-1/o)));s.style[e.DomUtil.TRANSFORM]=e.DomUtil.getTranslateString(l)+" scale("+o+") "},_reset:function(){var t=this._image,i=this._map.latLngToLayerPoint(this._bounds.getNorthWest()),s=this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(i);e.DomUtil.setPosition(t,i),t.style.width=s.x+"px",t.style.height=s.y+"px"},_onImageLoad:function(){this.fire("load")},_updateOpacity:function(){e.DomUtil.setOpacity(this._image,this.options.opacity)}}),e.imageOverlay=function(t,i,s){return new e.ImageOverlay(t,i,s)},e.Icon=e.Class.extend({options:{className:""},initialize:function(t){e.setOptions(this,t)},createIcon:function(){return this._createIcon("icon")},createShadow:function(){return this._createIcon("shadow")},_createIcon:function(t){var i=this._getIconUrl(t);if(!i){if("icon"===t)throw Error("iconUrl not set in Icon options (see the docs).");return null}var s=this._createImg(i);return this._setIconStyles(s,t),s},_setIconStyles:function(t,i){var s,o=this.options,n=e.point(o[i+"Size"]);s="shadow"===i?e.point(o.shadowAnchor||o.iconAnchor):e.point(o.iconAnchor),!s&&n&&(s=n.divideBy(2,!0)),t.className="leaflet-marker-"+i+" "+o.className,s&&(t.style.marginLeft=-s.x+"px",t.style.marginTop=-s.y+"px"),n&&(t.style.width=n.x+"px",t.style.height=n.y+"px")},_createImg:function(t){var s;return e.Browser.ie6?(s=i.createElement("div"),s.style.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+t+'")'):(s=i.createElement("img"),s.src=t),s},_getIconUrl:function(t){return e.Browser.retina&&this.options[t+"RetinaUrl"]?this.options[t+"RetinaUrl"]:this.options[t+"Url"]}}),e.icon=function(t){return new e.Icon(t)},e.Icon.Default=e.Icon.extend({options:{iconSize:new e.Point(25,41),iconAnchor:new e.Point(12,41),popupAnchor:new e.Point(1,-34),shadowSize:new e.Point(41,41)},_getIconUrl:function(t){var i=t+"Url";if(this.options[i])return this.options[i];e.Browser.retina&&"icon"===t&&(t+="@2x");var s=e.Icon.Default.imagePath;if(!s)throw Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");return "marker-"+t+".png"}}),e.Icon.Default.imagePath=function(){var t,s,e,o,n=i.getElementsByTagName("script"),a=/\/?leaflet[\-\._]?([\w\-\._]*)\.js\??/;for(t=0,s=n.length;s>t;t++)if(e=n[t].src,o=e.match(a))return e.split(a)[0]+""}(),e.Marker=e.Class.extend({includes:e.Mixin.Events,options:{icon:new e.Icon.Default,title:"",clickable:!0,draggable:!1,zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250},initialize:function(t,i){e.setOptions(this,i),this._latlng=e.latLng(t)},onAdd:function(t){this._map=t,t.on("viewreset",this.update,this),this._initIcon(),this.update(),t.options.zoomAnimation&&t.options.markerZoomAnimation&&t.on("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){this._removeIcon(),this.fire("remove"),t.off({viewreset:this.update,zoomanim:this._animateZoom},this),this._map=null},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=e.latLng(t),this.update(),this.fire("move",{latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update(),this},setIcon:function(t){return this._map&&this._removeIcon(),this.options.icon=t,this._map&&(this._initIcon(),this.update()),this},update:function(){if(this._icon){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,i=this._map,s=i.options.zoomAnimation&&i.options.markerZoomAnimation,o=s?"leaflet-zoom-animated":"leaflet-zoom-hide",n=!1;this._icon||(this._icon=t.icon.createIcon(),t.title&&(this._icon.title=t.title),this._initInteraction(),n=1>this.options.opacity,e.DomUtil.addClass(this._icon,o),t.riseOnHover&&e.DomEvent.on(this._icon,"mouseover",this._bringToFront,this).on(this._icon,"mouseout",this._resetZIndex,this)),this._shadow||(this._shadow=t.icon.createShadow(),this._shadow&&(e.DomUtil.addClass(this._shadow,o),n=1>this.options.opacity)),n&&this._updateOpacity();var a=this._map._panes;a.markerPane.appendChild(this._icon),this._shadow&&a.shadowPane.appendChild(this._shadow)},_removeIcon:function(){var t=this._map._panes;this.options.riseOnHover&&e.DomEvent.off(this._icon,"mouseover",this._bringToFront).off(this._icon,"mouseout",this._resetZIndex),t.markerPane.removeChild(this._icon),this._shadow&&t.shadowPane.removeChild(this._shadow),this._icon=this._shadow=null},_setPos:function(t){e.DomUtil.setPosition(this._icon,t),this._shadow&&e.DomUtil.setPosition(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon.style.zIndex=this._zIndex+t},_animateZoom:function(t){var i=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPos(i)},_initInteraction:function(){if(this.options.clickable){var t=this._icon,i=["dblclick","mousedown","mouseover","mouseout","contextmenu"];e.DomUtil.addClass(t,"leaflet-clickable"),e.DomEvent.on(t,"click",this._onMouseClick,this);for(var s=0;i.length>s;s++)e.DomEvent.on(t,i[s],this._fireMouseEvent,this);e.Handler.MarkerDrag&&(this.dragging=new e.Handler.MarkerDrag(this),this.options.draggable&&this.dragging.enable())}},_onMouseClick:function(t){var i=this.dragging&&this.dragging.moved();(this.hasEventListeners(t.type)||i)&&e.DomEvent.stopPropagation(t),i||(this.dragging&&this.dragging._enabled||!this._map.dragging||!this._map.dragging.moved())&&this.fire(t.type,{originalEvent:t})},_fireMouseEvent:function(t){this.fire(t.type,{originalEvent:t}),"contextmenu"===t.type&&this.hasEventListeners(t.type)&&e.DomEvent.preventDefault(t),"mousedown"!==t.type&&e.DomEvent.stopPropagation(t)},setOpacity:function(t){this.options.opacity=t,this._map&&this._updateOpacity()},_updateOpacity:function(){e.DomUtil.setOpacity(this._icon,this.options.opacity),this._shadow&&e.DomUtil.setOpacity(this._shadow,this.options.opacity)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)}}),e.marker=function(t,i){return new e.Marker(t,i)},e.DivIcon=e.Icon.extend({options:{iconSize:new e.Point(12,12),className:"leaflet-div-icon"},createIcon:function(){var t=i.createElement("div"),s=this.options;return s.html&&(t.innerHTML=s.html),s.bgPos&&(t.style.backgroundPosition=-s.bgPos.x+"px "+-s.bgPos.y+"px"),this._setIconStyles(t,"icon"),t},createShadow:function(){return null}}),e.divIcon=function(t){return new e.DivIcon(t)},e.Map.mergeOptions({closePopupOnClick:!0}),e.Popup=e.Class.extend({includes:e.Mixin.Events,options:{minWidth:50,maxWidth:300,maxHeight:null,autoPan:!0,closeButton:!0,offset:new e.Point(0,6),autoPanPadding:new e.Point(5,5),className:"",zoomAnimation:!0},initialize:function(t,i){e.setOptions(this,t),this._source=i,this._animated=e.Browser.any3d&&this.options.zoomAnimation},onAdd:function(t){this._map=t,this._container||this._initLayout(),this._updateContent();var i=t.options.fadeAnimation;i&&e.DomUtil.setOpacity(this._container,0),t._panes.popupPane.appendChild(this._container),t.on("viewreset",this._updatePosition,this),this._animated&&t.on("zoomanim",this._zoomAnimation,this),t.options.closePopupOnClick&&t.on("preclick",this._close,this),this._update(),i&&e.DomUtil.setOpacity(this._container,1)},addTo:function(t){return t.addLayer(this),this},openOn:function(t){return t.openPopup(this),this},onRemove:function(t){t._panes.popupPane.removeChild(this._container),e.Util.falseFn(this._container.offsetWidth),t.off({viewreset:this._updatePosition,preclick:this._close,zoomanim:this._zoomAnimation},this),t.options.fadeAnimation&&e.DomUtil.setOpacity(this._container,0),this._map=null},setLatLng:function(t){return this._latlng=e.latLng(t),this._update(),this},setContent:function(t){return this._content=t,this._update(),this},_close:function(){var t=this._map;t&&(t._popup=null,t.removeLayer(this).fire("popupclose",{popup:this}))},_initLayout:function(){var t,i="leaflet-popup",s=i+" "+this.options.className+" leaflet-zoom-"+(this._animated?"animated":"hide"),o=this._container=e.DomUtil.create("div",s);this.options.closeButton&&(t=this._closeButton=e.DomUtil.create("a",i+"-close-button",o),t.href="#close",t.innerHTML="&#215;",e.DomEvent.on(t,"click",this._onCloseButtonClick,this));var n=this._wrapper=e.DomUtil.create("div",i+"-content-wrapper",o);e.DomEvent.disableClickPropagation(n),this._contentNode=e.DomUtil.create("div",i+"-content",n),e.DomEvent.on(this._contentNode,"mousewheel",e.DomEvent.stopPropagation),this._tipContainer=e.DomUtil.create("div",i+"-tip-container",o),this._tip=e.DomUtil.create("div",i+"-tip",this._tipContainer)},_update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},_updateContent:function(){if(this._content){if("string"==typeof this._content)this._contentNode.innerHTML=this._content;else{for(;this._contentNode.hasChildNodes();)this._contentNode.removeChild(this._contentNode.firstChild);this._contentNode.appendChild(this._content)}this.fire("contentupdate")}},_updateLayout:function(){var t=this._contentNode,i=t.style;i.width="",i.whiteSpace="nowrap";var s=t.offsetWidth;s=Math.min(s,this.options.maxWidth),s=Math.max(s,this.options.minWidth),i.width=s+1+"px",i.whiteSpace="",i.height="";var o=t.offsetHeight,n=this.options.maxHeight,a="leaflet-popup-scrolled";n&&o>n?(i.height=n+"px",e.DomUtil.addClass(t,a)):e.DomUtil.removeClass(t,a),this._containerWidth=this._container.offsetWidth},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),i=this._animated,s=this.options.offset;i&&e.DomUtil.setPosition(this._container,t),this._containerBottom=-s.y-(i?0:t.y),this._containerLeft=-Math.round(this._containerWidth/2)+s.x+(i?0:t.x),this._container.style.bottom=this._containerBottom+"px",this._container.style.left=this._containerLeft+"px"}},_zoomAnimation:function(t){var i=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);e.DomUtil.setPosition(this._container,i)},_adjustPan:function(){if(this.options.autoPan){var t=this._map,i=this._container.offsetHeight,s=this._containerWidth,o=new e.Point(this._containerLeft,-i-this._containerBottom);this._animated&&o._add(e.DomUtil.getPosition(this._container));var n=t.layerPointToContainerPoint(o),a=this.options.autoPanPadding,r=t.getSize(),h=0,l=0;0>n.x&&(h=n.x-a.x),n.x+s>r.x&&(h=n.x+s-r.x+a.x),0>n.y&&(l=n.y-a.y),n.y+i>r.y&&(l=n.y+i-r.y+a.y),(h||l)&&t.panBy(new e.Point(h,l))}},_onCloseButtonClick:function(t){this._close(),e.DomEvent.stop(t)}}),e.popup=function(t,i){return new e.Popup(t,i)},e.Marker.include({openPopup:function(){return this._popup&&this._map&&(this._popup.setLatLng(this._latlng),this._map.openPopup(this._popup)),this},closePopup:function(){return this._popup&&this._popup._close(),this},bindPopup:function(t,i){var s=e.point(this.options.icon.options.popupAnchor)||new e.Point(0,0);return s=s.add(e.Popup.prototype.options.offset),i&&i.offset&&(s=s.add(i.offset)),i=e.extend({offset:s},i),this._popup||this.on("click",this.openPopup,this).on("remove",this.closePopup,this).on("move",this._movePopup,this),this._popup=new e.Popup(i,this).setContent(t),this},unbindPopup:function(){return this._popup&&(this._popup=null,this.off("click",this.openPopup).off("remove",this.closePopup).off("move",this._movePopup)),this},_movePopup:function(t){this._popup.setLatLng(t.latlng)}}),e.Map.include({openPopup:function(t){return this.closePopup(),this._popup=t,this.addLayer(t).fire("popupopen",{popup:this._popup})},closePopup:function(){return this._popup&&this._popup._close(),this}}),e.LayerGroup=e.Class.extend({initialize:function(t){this._layers={};var i,s;if(t)for(i=0,s=t.length;s>i;i++)this.addLayer(t[i])},addLayer:function(t){var i=e.stamp(t);return this._layers[i]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var i=e.stamp(t);return delete this._layers[i],this._map&&this._map.removeLayer(t),this},clearLayers:function(){return this.eachLayer(this.removeLayer,this),this},invoke:function(t){var i,s,e=Array.prototype.slice.call(arguments,1);for(i in this._layers)this._layers.hasOwnProperty(i)&&(s=this._layers[i],s[t]&&s[t].apply(s,e));return this},onAdd:function(t){this._map=t,this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t),this._map=null},addTo:function(t){return t.addLayer(this),this},eachLayer:function(t,i){for(var s in this._layers)this._layers.hasOwnProperty(s)&&t.call(i,this._layers[s])},setZIndex:function(t){return this.invoke("setZIndex",t)}}),e.layerGroup=function(t){return new e.LayerGroup(t)},e.FeatureGroup=e.LayerGroup.extend({includes:e.Mixin.Events,statics:{EVENTS:"click dblclick mouseover mouseout mousemove contextmenu"},addLayer:function(t){return this._layers[e.stamp(t)]?this:(t.on(e.FeatureGroup.EVENTS,this._propagateEvent,this),e.LayerGroup.prototype.addLayer.call(this,t),this._popupContent&&t.bindPopup&&t.bindPopup(this._popupContent,this._popupOptions),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return t.off(e.FeatureGroup.EVENTS,this._propagateEvent,this),e.LayerGroup.prototype.removeLayer.call(this,t),this._popupContent&&this.invoke("unbindPopup"),this.fire("layerremove",{layer:t})},bindPopup:function(t,i){return this._popupContent=t,this._popupOptions=i,this.invoke("bindPopup",t,i)},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new e.LatLngBounds;return this.eachLayer(function(i){t.extend(i instanceof e.Marker?i.getLatLng():i.getBounds())}),t},_propagateEvent:function(t){t.layer=t.target,t.target=this,this.fire(t.type,t)}}),e.featureGroup=function(t){return new e.FeatureGroup(t)},e.Path=e.Class.extend({includes:[e.Mixin.Events],statics:{CLIP_PADDING:e.Browser.mobile?Math.max(0,Math.min(.5,(1280/Math.max(t.innerWidth,t.innerHeight)-1)/2)):.5},options:{stroke:!0,color:"#0033ff",dashArray:null,weight:5,opacity:.5,fill:!1,fillColor:null,fillOpacity:.2,clickable:!0},initialize:function(t){e.setOptions(this,t)},onAdd:function(t){this._map=t,this._container||(this._initElements(),this._initEvents()),this.projectLatlngs(),this._updatePath(),this._container&&this._map._pathRoot.appendChild(this._container),this.fire("add"),t.on({viewreset:this.projectLatlngs,moveend:this._updatePath},this)},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){t._pathRoot.removeChild(this._container),this.fire("remove"),this._map=null,e.Browser.vml&&(this._container=null,this._stroke=null,this._fill=null),t.off({viewreset:this.projectLatlngs,moveend:this._updatePath},this)},projectLatlngs:function(){},setStyle:function(t){return e.setOptions(this,t),this._container&&this._updateStyle(),this},redraw:function(){return this._map&&(this.projectLatlngs(),this._updatePath()),this}}),e.Map.include({_updatePathViewport:function(){var t=e.Path.CLIP_PADDING,i=this.getSize(),s=e.DomUtil.getPosition(this._mapPane),o=s.multiplyBy(-1)._subtract(i.multiplyBy(t)._round()),n=o.add(i.multiplyBy(1+2*t)._round());this._pathViewport=new e.Bounds(o,n)}}),e.Path.SVG_NS="http://www.w3.org/2000/svg",e.Browser.svg=!(!i.createElementNS||!i.createElementNS(e.Path.SVG_NS,"svg").createSVGRect),e.Path=e.Path.extend({statics:{SVG:e.Browser.svg},bringToFront:function(){var t=this._map._pathRoot,i=this._container;return i&&t.lastChild!==i&&t.appendChild(i),this},bringToBack:function(){var t=this._map._pathRoot,i=this._container,s=t.firstChild;return i&&s!==i&&t.insertBefore(i,s),this},getPathString:function(){},_createElement:function(t){return i.createElementNS(e.Path.SVG_NS,t)},_initElements:function(){this._map._initPathRoot(),this._initPath(),this._initStyle()},_initPath:function(){this._container=this._createElement("g"),this._path=this._createElement("path"),this._container.appendChild(this._path)},_initStyle:function(){this.options.stroke&&(this._path.setAttribute("stroke-linejoin","round"),this._path.setAttribute("stroke-linecap","round")),this.options.fill&&this._path.setAttribute("fill-rule","evenodd"),this._updateStyle()},_updateStyle:function(){this.options.stroke?(this._path.setAttribute("stroke",this.options.color),this._path.setAttribute("stroke-opacity",this.options.opacity),this._path.setAttribute("stroke-width",this.options.weight),this.options.dashArray?this._path.setAttribute("stroke-dasharray",this.options.dashArray):this._path.removeAttribute("stroke-dasharray")):this._path.setAttribute("stroke","none"),this.options.fill?(this._path.setAttribute("fill",this.options.fillColor||this.options.color),this._path.setAttribute("fill-opacity",this.options.fillOpacity)):this._path.setAttribute("fill","none")},_updatePath:function(){var t=this.getPathString();t||(t="M0 0"),this._path.setAttribute("d",t)},_initEvents:function(){if(this.options.clickable){(e.Browser.svg||!e.Browser.vml)&&this._path.setAttribute("class","leaflet-clickable"),e.DomEvent.on(this._container,"click",this._onMouseClick,this);for(var t=["dblclick","mousedown","mouseover","mouseout","mousemove","contextmenu"],i=0;t.length>i;i++)e.DomEvent.on(this._container,t[i],this._fireMouseEvent,this)}},_onMouseClick:function(t){this._map.dragging&&this._map.dragging.moved()||this._fireMouseEvent(t)},_fireMouseEvent:function(t){if(this.hasEventListeners(t.type)){var i=this._map,s=i.mouseEventToContainerPoint(t),o=i.containerPointToLayerPoint(s),n=i.layerPointToLatLng(o);this.fire(t.type,{latlng:n,layerPoint:o,containerPoint:s,originalEvent:t}),"contextmenu"===t.type&&e.DomEvent.preventDefault(t),"mousemove"!==t.type&&e.DomEvent.stopPropagation(t)}}}),e.Map.include({_initPathRoot:function(){this._pathRoot||(this._pathRoot=e.Path.prototype._createElement("svg"),this._panes.overlayPane.appendChild(this._pathRoot),this.options.zoomAnimation&&e.Browser.any3d?(this._pathRoot.setAttribute("class"," leaflet-zoom-animated"),this.on({zoomanim:this._animatePathZoom,zoomend:this._endPathZoom})):this._pathRoot.setAttribute("class"," leaflet-zoom-hide"),this.on("moveend",this._updateSvgViewport),this._updateSvgViewport())},_animatePathZoom:function(t){var i=this.getZoomScale(t.zoom),s=this._getCenterOffset(t.center)._multiplyBy(-i)._add(this._pathViewport.min);this._pathRoot.style[e.DomUtil.TRANSFORM]=e.DomUtil.getTranslateString(s)+" scale("+i+") ",this._pathZooming=!0},_endPathZoom:function(){this._pathZooming=!1},_updateSvgViewport:function(){if(!this._pathZooming){this._updatePathViewport();var t=this._pathViewport,i=t.min,s=t.max,o=s.x-i.x,n=s.y-i.y,a=this._pathRoot,r=this._panes.overlayPane;e.Browser.mobileWebkit&&r.removeChild(a),e.DomUtil.setPosition(a,i),a.setAttribute("width",o),a.setAttribute("height",n),a.setAttribute("viewBox",[i.x,i.y,o,n].join(" ")),e.Browser.mobileWebkit&&r.appendChild(a)}}}),e.Path.include({bindPopup:function(t,i){return(!this._popup||i)&&(this._popup=new e.Popup(i,this)),this._popup.setContent(t),this._popupHandlersAdded||(this.on("click",this._openPopup,this).on("remove",this.closePopup,this),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this._popup=null,this.off("click",this._openPopup).off("remove",this.closePopup),this._popupHandlersAdded=!1),this},openPopup:function(t){return this._popup&&(t=t||this._latlng||this._latlngs[Math.floor(this._latlngs.length/2)],this._openPopup({latlng:t})),this},closePopup:function(){return this._popup&&this._popup._close(),this},_openPopup:function(t){this._popup.setLatLng(t.latlng),this._map.openPopup(this._popup)}}),e.Browser.vml=!e.Browser.svg&&function(){try{var t=i.createElement("div");t.innerHTML='<v:shape adj="1"/>';var s=t.firstChild;return s.style.behavior="url(#default#VML)",s&&"object"==typeof s.adj}catch(e){return!1}}(),e.Path=e.Browser.svg||!e.Browser.vml?e.Path:e.Path.extend({statics:{VML:!0,CLIP_PADDING:.02},_createElement:function(){try{return i.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return i.createElement("<lvml:"+t+' class="lvml">')}}catch(t){return function(t){return i.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}}(),_initPath:function(){var t=this._container=this._createElement("shape");e.DomUtil.addClass(t,"leaflet-vml-shape"),this.options.clickable&&e.DomUtil.addClass(t,"leaflet-clickable"),t.coordsize="1 1",this._path=this._createElement("path"),t.appendChild(this._path),this._map._pathRoot.appendChild(t)},_initStyle:function(){this._updateStyle()},_updateStyle:function(){var t=this._stroke,i=this._fill,s=this.options,e=this._container;e.stroked=s.stroke,e.filled=s.fill,s.stroke?(t||(t=this._stroke=this._createElement("stroke"),t.endcap="round",e.appendChild(t)),t.weight=s.weight+"px",t.color=s.color,t.opacity=s.opacity,t.dashStyle=s.dashArray?s.dashArray instanceof Array?s.dashArray.join(" "):s.dashArray.replace(/ *, */g," "):""):t&&(e.removeChild(t),this._stroke=null),s.fill?(i||(i=this._fill=this._createElement("fill"),e.appendChild(i)),i.color=s.fillColor||s.color,i.opacity=s.fillOpacity):i&&(e.removeChild(i),this._fill=null)},_updatePath:function(){var t=this._container.style;t.display="none",this._path.v=this.getPathString()+" ",t.display=""}}),e.Map.include(e.Browser.svg||!e.Browser.vml?{}:{_initPathRoot:function(){if(!this._pathRoot){var t=this._pathRoot=i.createElement("div");t.className="leaflet-vml-container",this._panes.overlayPane.appendChild(t),this.on("moveend",this._updatePathViewport),this._updatePathViewport()}}}),e.Browser.canvas=function(){return!!i.createElement("canvas").getContext}(),e.Path=e.Path.SVG&&!t.L_PREFER_CANVAS||!e.Browser.canvas?e.Path:e.Path.extend({statics:{CANVAS:!0,SVG:!1},redraw:function(){return this._map&&(this.projectLatlngs(),this._requestUpdate()),this},setStyle:function(t){return e.setOptions(this,t),this._map&&(this._updateStyle(),this._requestUpdate()),this},onRemove:function(t){t.off("viewreset",this.projectLatlngs,this).off("moveend",this._updatePath,this),this.options.clickable&&this._map.off("click",this._onClick,this),this._requestUpdate(),this._map=null},_requestUpdate:function(){this._map&&!e.Path._updateRequest&&(e.Path._updateRequest=e.Util.requestAnimFrame(this._fireMapMoveEnd,this._map))},_fireMapMoveEnd:function(){e.Path._updateRequest=null,this.fire("moveend")},_initElements:function(){this._map._initPathRoot(),this._ctx=this._map._canvasCtx},_updateStyle:function(){var t=this.options;t.stroke&&(this._ctx.lineWidth=t.weight,this._ctx.strokeStyle=t.color),t.fill&&(this._ctx.fillStyle=t.fillColor||t.color)},_drawPath:function(){var t,i,s,o,n,a;for(this._ctx.beginPath(),t=0,s=this._parts.length;s>t;t++){for(i=0,o=this._parts[t].length;o>i;i++)n=this._parts[t][i],a=(0===i?"move":"line")+"To",this._ctx[a](n.x,n.y);this instanceof e.Polygon&&this._ctx.closePath()}},_checkIfEmpty:function(){return!this._parts.length},_updatePath:function(){if(!this._checkIfEmpty()){var t=this._ctx,i=this.options;this._drawPath(),t.save(),this._updateStyle(),i.fill&&(t.globalAlpha=i.fillOpacity,t.fill()),i.stroke&&(t.globalAlpha=i.opacity,t.stroke()),t.restore()
}},_initEvents:function(){this.options.clickable&&this._map.on("click",this._onClick,this)},_onClick:function(t){this._containsPoint(t.layerPoint)&&this.fire("click",{latlng:t.latlng,layerPoint:t.layerPoint,containerPoint:t.containerPoint,originalEvent:t})}}),e.Map.include(e.Path.SVG&&!t.L_PREFER_CANVAS||!e.Browser.canvas?{}:{_initPathRoot:function(){var t,s=this._pathRoot;s||(s=this._pathRoot=i.createElement("canvas"),s.style.position="absolute",t=this._canvasCtx=s.getContext("2d"),t.lineCap="round",t.lineJoin="round",this._panes.overlayPane.appendChild(s),this.options.zoomAnimation&&(this._pathRoot.className="leaflet-zoom-animated",this.on("zoomanim",this._animatePathZoom),this.on("zoomend",this._endPathZoom)),this.on("moveend",this._updateCanvasViewport),this._updateCanvasViewport())},_updateCanvasViewport:function(){if(!this._pathZooming){this._updatePathViewport();var t=this._pathViewport,i=t.min,s=t.max.subtract(i),o=this._pathRoot;e.DomUtil.setPosition(o,i),o.width=s.x,o.height=s.y,o.getContext("2d").translate(-i.x,-i.y)}}}),e.LineUtil={simplify:function(t,i){if(!i||!t.length)return t.slice();var s=i*i;return t=this._reducePoints(t,s),t=this._simplifyDP(t,s)},pointToSegmentDistance:function(t,i,s){return Math.sqrt(this._sqClosestPointOnSegment(t,i,s,!0))},closestPointOnSegment:function(t,i,s){return this._sqClosestPointOnSegment(t,i,s)},_simplifyDP:function(t,i){var e=t.length,o=typeof Uint8Array!=s+""?Uint8Array:Array,n=new o(e);n[0]=n[e-1]=1,this._simplifyDPStep(t,n,i,0,e-1);var a,r=[];for(a=0;e>a;a++)n[a]&&r.push(t[a]);return r},_simplifyDPStep:function(t,i,s,e,o){var n,a,r,h=0;for(a=e+1;o-1>=a;a++)r=this._sqClosestPointOnSegment(t[a],t[e],t[o],!0),r>h&&(n=a,h=r);h>s&&(i[n]=1,this._simplifyDPStep(t,i,s,e,n),this._simplifyDPStep(t,i,s,n,o))},_reducePoints:function(t,i){for(var s=[t[0]],e=1,o=0,n=t.length;n>e;e++)this._sqDist(t[e],t[o])>i&&(s.push(t[e]),o=e);return n-1>o&&s.push(t[n-1]),s},clipSegment:function(t,i,s,e){var o,n,a,r=e?this._lastCode:this._getBitCode(t,s),h=this._getBitCode(i,s);for(this._lastCode=h;;){if(!(r|h))return[t,i];if(r&h)return!1;o=r||h,n=this._getEdgeIntersection(t,i,o,s),a=this._getBitCode(n,s),o===r?(t=n,r=a):(i=n,h=a)}},_getEdgeIntersection:function(t,i,o,n){var a=i.x-t.x,r=i.y-t.y,h=n.min,l=n.max;return 8&o?new e.Point(t.x+a*(l.y-t.y)/r,l.y):4&o?new e.Point(t.x+a*(h.y-t.y)/r,h.y):2&o?new e.Point(l.x,t.y+r*(l.x-t.x)/a):1&o?new e.Point(h.x,t.y+r*(h.x-t.x)/a):s},_getBitCode:function(t,i){var s=0;return t.x<i.min.x?s|=1:t.x>i.max.x&&(s|=2),t.y<i.min.y?s|=4:t.y>i.max.y&&(s|=8),s},_sqDist:function(t,i){var s=i.x-t.x,e=i.y-t.y;return s*s+e*e},_sqClosestPointOnSegment:function(t,i,s,o){var n,a=i.x,r=i.y,h=s.x-a,l=s.y-r,c=h*h+l*l;return c>0&&(n=((t.x-a)*h+(t.y-r)*l)/c,n>1?(a=s.x,r=s.y):n>0&&(a+=h*n,r+=l*n)),h=t.x-a,l=t.y-r,o?h*h+l*l:new e.Point(a,r)}},e.Polyline=e.Path.extend({initialize:function(t,i){e.Path.prototype.initialize.call(this,i),this._latlngs=this._convertLatLngs(t)},options:{smoothFactor:1,noClip:!1},projectLatlngs:function(){this._originalPoints=[];for(var t=0,i=this._latlngs.length;i>t;t++)this._originalPoints[t]=this._map.latLngToLayerPoint(this._latlngs[t])},getPathString:function(){for(var t=0,i=this._parts.length,s="";i>t;t++)s+=this._getPathPartStr(this._parts[t]);return s},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._latlngs=this._convertLatLngs(t),this.redraw()},addLatLng:function(t){return this._latlngs.push(e.latLng(t)),this.redraw()},spliceLatLngs:function(){var t=[].splice.apply(this._latlngs,arguments);return this._convertLatLngs(this._latlngs),this.redraw(),t},closestLayerPoint:function(t){for(var i,s,o=1/0,n=this._parts,a=null,r=0,h=n.length;h>r;r++)for(var l=n[r],c=1,m=l.length;m>c;c++){i=l[c-1],s=l[c];var u=e.LineUtil._sqClosestPointOnSegment(t,i,s,!0);o>u&&(o=u,a=e.LineUtil._sqClosestPointOnSegment(t,i,s))}return a&&(a.distance=Math.sqrt(o)),a},getBounds:function(){var t,i,s=new e.LatLngBounds,o=this.getLatLngs();for(t=0,i=o.length;i>t;t++)s.extend(o[t]);return s},_convertLatLngs:function(t){var i,s;for(i=0,s=t.length;s>i;i++){if(e.Util.isArray(t[i])&&"number"!=typeof t[i][0])return;t[i]=e.latLng(t[i])}return t},_initEvents:function(){e.Path.prototype._initEvents.call(this)},_getPathPartStr:function(t){for(var i,s=e.Path.VML,o=0,n=t.length,a="";n>o;o++)i=t[o],s&&i._round(),a+=(o?"L":"M")+i.x+" "+i.y;return a},_clipPoints:function(){var t,i,o,n=this._originalPoints,a=n.length;if(this.options.noClip)return this._parts=[n],s;this._parts=[];var r=this._parts,h=this._map._pathViewport,l=e.LineUtil;for(t=0,i=0;a-1>t;t++)o=l.clipSegment(n[t],n[t+1],h,t),o&&(r[i]=r[i]||[],r[i].push(o[0]),(o[1]!==n[t+1]||t===a-2)&&(r[i].push(o[1]),i++))},_simplifyPoints:function(){for(var t=this._parts,i=e.LineUtil,s=0,o=t.length;o>s;s++)t[s]=i.simplify(t[s],this.options.smoothFactor)},_updatePath:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),e.Path.prototype._updatePath.call(this))}}),e.polyline=function(t,i){return new e.Polyline(t,i)},e.PolyUtil={},e.PolyUtil.clipPolygon=function(t,i){var s,o,n,a,r,h,l,c,m,u=[1,4,2,8],d=e.LineUtil;for(o=0,l=t.length;l>o;o++)t[o]._code=d._getBitCode(t[o],i);for(a=0;4>a;a++){for(c=u[a],s=[],o=0,l=t.length,n=l-1;l>o;n=o++)r=t[o],h=t[n],r._code&c?h._code&c||(m=d._getEdgeIntersection(h,r,c,i),m._code=d._getBitCode(m,i),s.push(m)):(h._code&c&&(m=d._getEdgeIntersection(h,r,c,i),m._code=d._getBitCode(m,i),s.push(m)),s.push(r));t=s}return t},e.Polygon=e.Polyline.extend({options:{fill:!0},initialize:function(t,i){e.Polyline.prototype.initialize.call(this,t,i),t&&e.Util.isArray(t[0])&&"number"!=typeof t[0][0]&&(this._latlngs=this._convertLatLngs(t[0]),this._holes=t.slice(1))},projectLatlngs:function(){if(e.Polyline.prototype.projectLatlngs.call(this),this._holePoints=[],this._holes){var t,i,s,o;for(t=0,s=this._holes.length;s>t;t++)for(this._holePoints[t]=[],i=0,o=this._holes[t].length;o>i;i++)this._holePoints[t][i]=this._map.latLngToLayerPoint(this._holes[t][i])}},_clipPoints:function(){var t=this._originalPoints,i=[];if(this._parts=[t].concat(this._holePoints),!this.options.noClip){for(var s=0,o=this._parts.length;o>s;s++){var n=e.PolyUtil.clipPolygon(this._parts[s],this._map._pathViewport);n.length&&i.push(n)}this._parts=i}},_getPathPartStr:function(t){var i=e.Polyline.prototype._getPathPartStr.call(this,t);return i+(e.Browser.svg?"z":"x")}}),e.polygon=function(t,i){return new e.Polygon(t,i)},function(){function t(t){return e.FeatureGroup.extend({initialize:function(t,i){this._layers={},this._options=i,this.setLatLngs(t)},setLatLngs:function(i){var s=0,e=i.length;for(this.eachLayer(function(t){e>s?t.setLatLngs(i[s++]):this.removeLayer(t)},this);e>s;)this.addLayer(new t(i[s++],this._options));return this}})}e.MultiPolyline=t(e.Polyline),e.MultiPolygon=t(e.Polygon),e.multiPolyline=function(t,i){return new e.MultiPolyline(t,i)},e.multiPolygon=function(t,i){return new e.MultiPolygon(t,i)}}(),e.Rectangle=e.Polygon.extend({initialize:function(t,i){e.Polygon.prototype.initialize.call(this,this._boundsToLatLngs(t),i)},setBounds:function(t){this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=e.latLngBounds(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}}),e.rectangle=function(t,i){return new e.Rectangle(t,i)},e.Circle=e.Path.extend({initialize:function(t,i,s){e.Path.prototype.initialize.call(this,s),this._latlng=e.latLng(t),this._mRadius=i},options:{fill:!0},setLatLng:function(t){return this._latlng=e.latLng(t),this.redraw()},setRadius:function(t){return this._mRadius=t,this.redraw()},projectLatlngs:function(){var t=this._getLngRadius(),i=new e.LatLng(this._latlng.lat,this._latlng.lng-t),s=this._map.latLngToLayerPoint(i);this._point=this._map.latLngToLayerPoint(this._latlng),this._radius=Math.max(Math.round(this._point.x-s.x),1)},getBounds:function(){var t=this._getLngRadius(),i=360*(this._mRadius/40075017),s=this._latlng,o=new e.LatLng(s.lat-i,s.lng-t),n=new e.LatLng(s.lat+i,s.lng+t);return new e.LatLngBounds(o,n)},getLatLng:function(){return this._latlng},getPathString:function(){var t=this._point,i=this._radius;return this._checkIfEmpty()?"":e.Browser.svg?"M"+t.x+","+(t.y-i)+"A"+i+","+i+",0,1,1,"+(t.x-.1)+","+(t.y-i)+" z":(t._round(),i=Math.round(i),"AL "+t.x+","+t.y+" "+i+","+i+" 0,"+23592600)},getRadius:function(){return this._mRadius},_getLatRadius:function(){return 360*(this._mRadius/40075017)},_getLngRadius:function(){return this._getLatRadius()/Math.cos(e.LatLng.DEG_TO_RAD*this._latlng.lat)},_checkIfEmpty:function(){if(!this._map)return!1;var t=this._map._pathViewport,i=this._radius,s=this._point;return s.x-i>t.max.x||s.y-i>t.max.y||s.x+i<t.min.x||s.y+i<t.min.y}}),e.circle=function(t,i,s){return new e.Circle(t,i,s)},e.CircleMarker=e.Circle.extend({options:{radius:10,weight:2},initialize:function(t,i){e.Circle.prototype.initialize.call(this,t,null,i),this._radius=this.options.radius},projectLatlngs:function(){this._point=this._map.latLngToLayerPoint(this._latlng)},_updateStyle:function(){e.Circle.prototype._updateStyle.call(this),this.setRadius(this.options.radius)},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()}}),e.circleMarker=function(t,i){return new e.CircleMarker(t,i)},e.Polyline.include(e.Path.CANVAS?{_containsPoint:function(t,i){var s,o,n,a,r,h,l,c=this.options.weight/2;for(e.Browser.touch&&(c+=10),s=0,a=this._parts.length;a>s;s++)for(l=this._parts[s],o=0,r=l.length,n=r-1;r>o;n=o++)if((i||0!==o)&&(h=e.LineUtil.pointToSegmentDistance(t,l[n],l[o]),c>=h))return!0;return!1}}:{}),e.Polygon.include(e.Path.CANVAS?{_containsPoint:function(t){var i,s,o,n,a,r,h,l,c=!1;if(e.Polyline.prototype._containsPoint.call(this,t,!0))return!0;for(n=0,h=this._parts.length;h>n;n++)for(i=this._parts[n],a=0,l=i.length,r=l-1;l>a;r=a++)s=i[a],o=i[r],s.y>t.y!=o.y>t.y&&t.x<(o.x-s.x)*(t.y-s.y)/(o.y-s.y)+s.x&&(c=!c);return c}}:{}),e.Circle.include(e.Path.CANVAS?{_drawPath:function(){var t=this._point;this._ctx.beginPath(),this._ctx.arc(t.x,t.y,this._radius,0,2*Math.PI,!1)},_containsPoint:function(t){var i=this._point,s=this.options.stroke?this.options.weight/2:0;return t.distanceTo(i)<=this._radius+s}}:{}),e.GeoJSON=e.FeatureGroup.extend({initialize:function(t,i){e.setOptions(this,i),this._layers={},t&&this.addData(t)},addData:function(t){var i,s,o=e.Util.isArray(t)?t:t.features;if(o){for(i=0,s=o.length;s>i;i++)(o[i].geometries||o[i].geometry||o[i].features)&&this.addData(o[i]);return this}var n=this.options;if(!n.filter||n.filter(t)){var a=e.GeoJSON.geometryToLayer(t,n.pointToLayer);return a.feature=t,a.defaultOptions=a.options,this.resetStyle(a),n.onEachFeature&&n.onEachFeature(t,a),this.addLayer(a)}},resetStyle:function(t){var i=this.options.style;i&&(e.Util.extend(t.options,t.defaultOptions),this._setLayerStyle(t,i))},setStyle:function(t){this.eachLayer(function(i){this._setLayerStyle(i,t)},this)},_setLayerStyle:function(t,i){"function"==typeof i&&(i=i(t.feature)),t.setStyle&&t.setStyle(i)}}),e.extend(e.GeoJSON,{geometryToLayer:function(t,i){var s,o,n,a,r,h="Feature"===t.type?t.geometry:t,l=h.coordinates,c=[];switch(h.type){case"Point":return s=this.coordsToLatLng(l),i?i(t,s):new e.Marker(s);case"MultiPoint":for(n=0,a=l.length;a>n;n++)s=this.coordsToLatLng(l[n]),r=i?i(t,s):new e.Marker(s),c.push(r);return new e.FeatureGroup(c);case"LineString":return o=this.coordsToLatLngs(l),new e.Polyline(o);case"Polygon":return o=this.coordsToLatLngs(l,1),new e.Polygon(o);case"MultiLineString":return o=this.coordsToLatLngs(l,1),new e.MultiPolyline(o);case"MultiPolygon":return o=this.coordsToLatLngs(l,2),new e.MultiPolygon(o);case"GeometryCollection":for(n=0,a=h.geometries.length;a>n;n++)r=this.geometryToLayer({geometry:h.geometries[n],type:"Feature",properties:t.properties},i),c.push(r);return new e.FeatureGroup(c);default:throw Error("Invalid GeoJSON object.")}},coordsToLatLng:function(t,i){var s=parseFloat(t[i?0:1]),o=parseFloat(t[i?1:0]);return new e.LatLng(s,o)},coordsToLatLngs:function(t,i,s){var e,o,n,a=[];for(o=0,n=t.length;n>o;o++)e=i?this.coordsToLatLngs(t[o],i-1,s):this.coordsToLatLng(t[o],s),a.push(e);return a}}),e.geoJson=function(t,i){return new e.GeoJSON(t,i)},e.DomEvent={addListener:function(t,i,o,n){var a,r,h,l=e.stamp(o),c="_leaflet_"+i+l;return t[c]?this:(a=function(i){return o.call(n||t,i||e.DomEvent._getEvent())},e.Browser.msTouch&&0===i.indexOf("touch")?this.addMsTouchListener(t,i,a,l):(e.Browser.touch&&"dblclick"===i&&this.addDoubleTapListener&&this.addDoubleTapListener(t,a,l),"addEventListener"in t?"mousewheel"===i?(t.addEventListener("DOMMouseScroll",a,!1),t.addEventListener(i,a,!1)):"mouseenter"===i||"mouseleave"===i?(r=a,h="mouseenter"===i?"mouseover":"mouseout",a=function(i){return e.DomEvent._checkMouse(t,i)?r(i):s},t.addEventListener(h,a,!1)):t.addEventListener(i,a,!1):"attachEvent"in t&&t.attachEvent("on"+i,a),t[c]=a,this))},removeListener:function(t,i,s){var o=e.stamp(s),n="_leaflet_"+i+o,a=t[n];if(a)return e.Browser.msTouch&&0===i.indexOf("touch")?this.removeMsTouchListener(t,i,o):e.Browser.touch&&"dblclick"===i&&this.removeDoubleTapListener?this.removeDoubleTapListener(t,o):"removeEventListener"in t?"mousewheel"===i?(t.removeEventListener("DOMMouseScroll",a,!1),t.removeEventListener(i,a,!1)):"mouseenter"===i||"mouseleave"===i?t.removeEventListener("mouseenter"===i?"mouseover":"mouseout",a,!1):t.removeEventListener(i,a,!1):"detachEvent"in t&&t.detachEvent("on"+i,a),t[n]=null,this},stopPropagation:function(t){return t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,this},disableClickPropagation:function(t){for(var i=e.DomEvent.stopPropagation,s=e.Draggable.START.length-1;s>=0;s--)e.DomEvent.addListener(t,e.Draggable.START[s],i);return e.DomEvent.addListener(t,"click",i).addListener(t,"dblclick",i)},preventDefault:function(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this},stop:function(t){return e.DomEvent.preventDefault(t).stopPropagation(t)},getMousePosition:function(t,s){var o=i.body,n=i.documentElement,a=t.pageX?t.pageX:t.clientX+o.scrollLeft+n.scrollLeft,r=t.pageY?t.pageY:t.clientY+o.scrollTop+n.scrollTop,h=new e.Point(a,r);return s?h._subtract(e.DomUtil.getViewportOffset(s)):h},getWheelDelta:function(t){var i=0;return t.wheelDelta&&(i=t.wheelDelta/120),t.detail&&(i=-t.detail/3),i},_checkMouse:function(t,i){var s=i.relatedTarget;if(!s)return!0;try{for(;s&&s!==t;)s=s.parentNode}catch(e){return!1}return s!==t},_getEvent:function(){var i=t.event;if(!i)for(var s=arguments.callee.caller;s&&(i=s.arguments[0],!i||t.Event!==i.constructor);)s=s.caller;return i}},e.DomEvent.on=e.DomEvent.addListener,e.DomEvent.off=e.DomEvent.removeListener,e.Draggable=e.Class.extend({includes:e.Mixin.Events,statics:{START:e.Browser.touch?["touchstart","mousedown"]:["mousedown"],END:{mousedown:"mouseup",touchstart:"touchend",MSPointerDown:"touchend"},MOVE:{mousedown:"mousemove",touchstart:"touchmove",MSPointerDown:"touchmove"},TAP_TOLERANCE:15},initialize:function(t,i,s){this._element=t,this._dragStartTarget=i||t,this._longPress=s&&!e.Browser.msTouch},enable:function(){if(!this._enabled){for(var t=e.Draggable.START.length-1;t>=0;t--)e.DomEvent.on(this._dragStartTarget,e.Draggable.START[t],this._onDown,this);this._enabled=!0}},disable:function(){if(this._enabled){for(var t=e.Draggable.START.length-1;t>=0;t--)e.DomEvent.off(this._dragStartTarget,e.Draggable.START[t],this._onDown,this);this._enabled=!1,this._moved=!1}},_onDown:function(t){if(!(!e.Browser.touch&&t.shiftKey||1!==t.which&&1!==t.button&&!t.touches||(e.DomEvent.preventDefault(t),e.DomEvent.stopPropagation(t),e.Draggable._disabled))){if(this._simulateClick=!0,t.touches&&t.touches.length>1)return this._simulateClick=!1,clearTimeout(this._longPressTimeout),s;var o=t.touches&&1===t.touches.length?t.touches[0]:t,n=o.target;e.Browser.touch&&"a"===n.tagName.toLowerCase()&&e.DomUtil.addClass(n,"leaflet-active"),this._moved=!1,this._moving||(this._startPoint=new e.Point(o.clientX,o.clientY),this._startPos=this._newPos=e.DomUtil.getPosition(this._element),t.touches&&1===t.touches.length&&e.Browser.touch&&this._longPress&&(this._longPressTimeout=setTimeout(e.bind(function(){var t=this._newPos&&this._newPos.distanceTo(this._startPos)||0;e.Draggable.TAP_TOLERANCE>t&&(this._simulateClick=!1,this._onUp(),this._simulateEvent("contextmenu",o))},this),1e3)),e.DomEvent.on(i,e.Draggable.MOVE[t.type],this._onMove,this),e.DomEvent.on(i,e.Draggable.END[t.type],this._onUp,this))}},_onMove:function(t){if(!(t.touches&&t.touches.length>1)){var i=t.touches&&1===t.touches.length?t.touches[0]:t,s=new e.Point(i.clientX,i.clientY),o=s.subtract(this._startPoint);(o.x||o.y)&&(e.DomEvent.preventDefault(t),this._moved||(this.fire("dragstart"),this._moved=!0,this._startPos=e.DomUtil.getPosition(this._element).subtract(o),e.Browser.touch||(e.DomUtil.disableTextSelection(),this._setMovingCursor())),this._newPos=this._startPos.add(o),this._moving=!0,e.Util.cancelAnimFrame(this._animRequest),this._animRequest=e.Util.requestAnimFrame(this._updatePosition,this,!0,this._dragStartTarget))}},_updatePosition:function(){this.fire("predrag"),e.DomUtil.setPosition(this._element,this._newPos),this.fire("drag")},_onUp:function(t){var s;if(clearTimeout(this._longPressTimeout),this._simulateClick&&t.changedTouches){var o=t.changedTouches[0],n=o.target,a=this._newPos&&this._newPos.distanceTo(this._startPos)||0;"a"===n.tagName.toLowerCase()&&e.DomUtil.removeClass(n,"leaflet-active"),e.Draggable.TAP_TOLERANCE>a&&(s=o)}e.Browser.touch||(e.DomUtil.enableTextSelection(),this._restoreCursor());for(var r in e.Draggable.MOVE)e.Draggable.MOVE.hasOwnProperty(r)&&(e.DomEvent.off(i,e.Draggable.MOVE[r],this._onMove),e.DomEvent.off(i,e.Draggable.END[r],this._onUp));this._moved&&(e.Util.cancelAnimFrame(this._animRequest),this.fire("dragend")),this._moving=!1,s&&(this._moved=!1,this._simulateEvent("click",s))},_setMovingCursor:function(){e.DomUtil.addClass(i.body,"leaflet-dragging")},_restoreCursor:function(){e.DomUtil.removeClass(i.body,"leaflet-dragging")},_simulateEvent:function(s,e){var o=i.createEvent("MouseEvents");o.initMouseEvent(s,!0,!0,t,1,e.screenX,e.screenY,e.clientX,e.clientY,!1,!1,!1,!1,0,null),e.target.dispatchEvent(o)}}),e.Handler=e.Class.extend({initialize:function(t){this._map=t},enable:function(){this._enabled||(this._enabled=!0,this.addHooks())},disable:function(){this._enabled&&(this._enabled=!1,this.removeHooks())},enabled:function(){return!!this._enabled}}),e.Map.mergeOptions({dragging:!0,inertia:!e.Browser.android23,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,inertiaThreshold:e.Browser.touch?32:18,easeLinearity:.25,longPress:!0,worldCopyJump:!1}),e.Map.Drag=e.Handler.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new e.Draggable(t._mapPane,t._container,t.options.longPress),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDrag,this),t.on("viewreset",this._onViewReset,this))}this._draggable.enable()},removeHooks:function(){this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){var t=this._map;t._panAnim&&t._panAnim.stop(),t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(){if(this._map.options.inertia){var t=this._lastTime=+new Date,i=this._lastPos=this._draggable._newPos;this._positions.push(i),this._times.push(t),t-this._times[0]>200&&(this._positions.shift(),this._times.shift())}this._map.fire("move").fire("drag")},_onViewReset:function(){var t=this._map.getSize()._divideBy(2),i=this._map.latLngToLayerPoint(new e.LatLng(0,0));this._initialWorldOffset=i.subtract(t).x,this._worldWidth=this._map.project(new e.LatLng(0,180)).x},_onPreDrag:function(){var t=this._worldWidth,i=Math.round(t/2),s=this._initialWorldOffset,e=this._draggable._newPos.x,o=(e-i+s)%t+i-s,n=(e+i+s)%t-i-s,a=Math.abs(o+s)<Math.abs(n+s)?o:n;this._draggable._newPos.x=a},_onDragEnd:function(){var t=this._map,i=t.options,s=+new Date-this._lastTime,o=!i.inertia||s>i.inertiaThreshold||!this._positions[0];if(o)t.fire("moveend");else{var n=this._lastPos.subtract(this._positions[0]),a=(this._lastTime+s-this._times[0])/1e3,r=i.easeLinearity,h=n.multiplyBy(r/a),l=h.distanceTo(new e.Point(0,0)),c=Math.min(i.inertiaMaxSpeed,l),m=h.multiplyBy(c/l),u=c/(i.inertiaDeceleration*r),d=m.multiplyBy(-u/2).round();e.Util.requestAnimFrame(function(){t.panBy(d,u,r)})}t.fire("dragend"),i.maxBounds&&e.Util.requestAnimFrame(this._panInsideMaxBounds,t,!0,t._container)},_panInsideMaxBounds:function(){this.panInsideBounds(this.options.maxBounds)}}),e.Map.addInitHook("addHandler","dragging",e.Map.Drag),e.Map.mergeOptions({doubleClickZoom:!0}),e.Map.DoubleClickZoom=e.Handler.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick)},_onDoubleClick:function(t){this.setView(t.latlng,this._zoom+1)}}),e.Map.addInitHook("addHandler","doubleClickZoom",e.Map.DoubleClickZoom),e.Map.mergeOptions({scrollWheelZoom:!0}),e.Map.ScrollWheelZoom=e.Handler.extend({addHooks:function(){e.DomEvent.on(this._map._container,"mousewheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){e.DomEvent.off(this._map._container,"mousewheel",this._onWheelScroll)},_onWheelScroll:function(t){var i=e.DomEvent.getWheelDelta(t);this._delta+=i,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var s=Math.max(40-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(e.bind(this._performZoom,this),s),e.DomEvent.preventDefault(t),e.DomEvent.stopPropagation(t)},_performZoom:function(){var t=this._map,i=this._delta,s=t.getZoom();if(i=i>0?Math.ceil(i):Math.round(i),i=Math.max(Math.min(i,4),-4),i=t._limitZoom(s+i)-s,this._delta=0,this._startTime=null,i){var e=s+i,o=this._getCenterForScrollWheelZoom(e);t.setView(o,e)}},_getCenterForScrollWheelZoom:function(t){var i=this._map,s=i.getZoomScale(t),e=i.getSize()._divideBy(2),o=this._lastMousePos._subtract(e)._multiplyBy(1-1/s),n=i._getTopLeftPoint()._add(e)._add(o);return i.unproject(n)}}),e.Map.addInitHook("addHandler","scrollWheelZoom",e.Map.ScrollWheelZoom),e.extend(e.DomEvent,{_touchstart:e.Browser.msTouch?"MSPointerDown":"touchstart",_touchend:e.Browser.msTouch?"MSPointerUp":"touchend",addDoubleTapListener:function(t,s,o){function n(t){var i;if(e.Browser.msTouch?(p.push(t.pointerId),i=p.length):i=t.touches.length,!(i>1)){var s=Date.now(),o=s-(r||s);h=t.touches?t.touches[0]:t,l=o>0&&c>=o,r=s}}function a(t){if(e.Browser.msTouch){var i=p.indexOf(t.pointerId);if(-1===i)return;p.splice(i,1)}if(l){if(e.Browser.msTouch){var o,n={};for(var a in h)o=h[a],n[a]="function"==typeof o?o.bind(h):o;h=n}h.type="dblclick",s(h),r=null}}var r,h,l=!1,c=250,m="_leaflet_",u=this._touchstart,d=this._touchend,p=[];t[m+u+o]=n,t[m+d+o]=a;var _=e.Browser.msTouch?i.documentElement:t;return t.addEventListener(u,n,!1),_.addEventListener(d,a,!1),e.Browser.msTouch&&_.addEventListener("MSPointerCancel",a,!1),this},removeDoubleTapListener:function(t,s){var o="_leaflet_";return t.removeEventListener(this._touchstart,t[o+this._touchstart+s],!1),(e.Browser.msTouch?i.documentElement:t).removeEventListener(this._touchend,t[o+this._touchend+s],!1),e.Browser.msTouch&&i.documentElement.removeEventListener("MSPointerCancel",t[o+this._touchend+s],!1),this}}),e.extend(e.DomEvent,{_msTouches:[],_msDocumentListener:!1,addMsTouchListener:function(t,i,s,e){switch(i){case"touchstart":return this.addMsTouchListenerStart(t,i,s,e);case"touchend":return this.addMsTouchListenerEnd(t,i,s,e);case"touchmove":return this.addMsTouchListenerMove(t,i,s,e);default:throw"Unknown touch event type"}},addMsTouchListenerStart:function(t,s,e,o){var n="_leaflet_",a=this._msTouches,r=function(t){for(var i=!1,s=0;a.length>s;s++)if(a[s].pointerId===t.pointerId){i=!0;break}i||a.push(t),t.touches=a.slice(),t.changedTouches=[t],e(t)};if(t[n+"touchstart"+o]=r,t.addEventListener("MSPointerDown",r,!1),!this._msDocumentListener){var h=function(t){for(var i=0;a.length>i;i++)if(a[i].pointerId===t.pointerId){a.splice(i,1);break}};i.documentElement.addEventListener("MSPointerUp",h,!1),i.documentElement.addEventListener("MSPointerCancel",h,!1),this._msDocumentListener=!0}return this},addMsTouchListenerMove:function(t,i,s,e){function o(t){if(t.pointerType!==t.MSPOINTER_TYPE_MOUSE||0!==t.buttons){for(var i=0;a.length>i;i++)if(a[i].pointerId===t.pointerId){a[i]=t;break}t.touches=a.slice(),t.changedTouches=[t],s(t)}}var n="_leaflet_",a=this._msTouches;return t[n+"touchmove"+e]=o,t.addEventListener("MSPointerMove",o,!1),this},addMsTouchListenerEnd:function(t,i,s,e){var o="_leaflet_",n=this._msTouches,a=function(t){for(var i=0;n.length>i;i++)if(n[i].pointerId===t.pointerId){n.splice(i,1);break}t.touches=n.slice(),t.changedTouches=[t],s(t)};return t[o+"touchend"+e]=a,t.addEventListener("MSPointerUp",a,!1),t.addEventListener("MSPointerCancel",a,!1),this},removeMsTouchListener:function(t,i,s){var e="_leaflet_",o=t[e+i+s];switch(i){case"touchstart":t.removeEventListener("MSPointerDown",o,!1);break;case"touchmove":t.removeEventListener("MSPointerMove",o,!1);break;case"touchend":t.removeEventListener("MSPointerUp",o,!1),t.removeEventListener("MSPointerCancel",o,!1)}return this}}),e.Map.mergeOptions({touchZoom:e.Browser.touch&&!e.Browser.android23}),e.Map.TouchZoom=e.Handler.extend({addHooks:function(){e.DomEvent.on(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){e.DomEvent.off(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var s=this._map;if(t.touches&&2===t.touches.length&&!s._animatingZoom&&!this._zooming){var o=s.mouseEventToLayerPoint(t.touches[0]),n=s.mouseEventToLayerPoint(t.touches[1]),a=s._getCenterLayerPoint();this._startCenter=o.add(n)._divideBy(2),this._startDist=o.distanceTo(n),this._moved=!1,this._zooming=!0,this._centerOffset=a.subtract(this._startCenter),s._panAnim&&s._panAnim.stop(),e.DomEvent.on(i,"touchmove",this._onTouchMove,this).on(i,"touchend",this._onTouchEnd,this),e.DomEvent.preventDefault(t)}},_onTouchMove:function(t){if(t.touches&&2===t.touches.length){var i=this._map,s=i.mouseEventToLayerPoint(t.touches[0]),o=i.mouseEventToLayerPoint(t.touches[1]);this._scale=s.distanceTo(o)/this._startDist,this._delta=s._add(o)._divideBy(2)._subtract(this._startCenter),1!==this._scale&&(this._moved||(e.DomUtil.addClass(i._mapPane,"leaflet-zoom-anim leaflet-touching"),i.fire("movestart").fire("zoomstart")._prepareTileBg(),this._moved=!0),e.Util.cancelAnimFrame(this._animRequest),this._animRequest=e.Util.requestAnimFrame(this._updateOnMove,this,!0,this._map._container),e.DomEvent.preventDefault(t))}},_updateOnMove:function(){var t=this._map,i=this._getScaleOrigin(),s=t.layerPointToLatLng(i);t.fire("zoomanim",{center:s,zoom:t.getScaleZoom(this._scale)}),t._tileBg.style[e.DomUtil.TRANSFORM]=e.DomUtil.getTranslateString(this._delta)+" "+e.DomUtil.getScaleString(this._scale,this._startCenter)},_onTouchEnd:function(){if(this._moved&&this._zooming){var t=this._map;this._zooming=!1,e.DomUtil.removeClass(t._mapPane,"leaflet-touching"),e.DomEvent.off(i,"touchmove",this._onTouchMove).off(i,"touchend",this._onTouchEnd);var s=this._getScaleOrigin(),o=t.layerPointToLatLng(s),n=t.getZoom(),a=t.getScaleZoom(this._scale)-n,r=a>0?Math.ceil(a):Math.floor(a),h=t._limitZoom(n+r);t.fire("zoomanim",{center:o,zoom:h}),t._runAnimation(o,h,t.getZoomScale(h)/this._scale,s,!0)}},_getScaleOrigin:function(){var t=this._centerOffset.subtract(this._delta).divideBy(this._scale);return this._startCenter.add(t)}}),e.Map.addInitHook("addHandler","touchZoom",e.Map.TouchZoom),e.Map.mergeOptions({boxZoom:!0}),e.Map.BoxZoom=e.Handler.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane},addHooks:function(){e.DomEvent.on(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){e.DomEvent.off(this._container,"mousedown",this._onMouseDown)},_onMouseDown:function(t){return!t.shiftKey||1!==t.which&&1!==t.button?!1:(e.DomUtil.disableTextSelection(),this._startLayerPoint=this._map.mouseEventToLayerPoint(t),this._box=e.DomUtil.create("div","leaflet-zoom-box",this._pane),e.DomUtil.setPosition(this._box,this._startLayerPoint),this._container.style.cursor="crosshair",e.DomEvent.on(i,"mousemove",this._onMouseMove,this).on(i,"mouseup",this._onMouseUp,this).preventDefault(t),this._map.fire("boxzoomstart"),s)},_onMouseMove:function(t){var i=this._startLayerPoint,s=this._box,o=this._map.mouseEventToLayerPoint(t),n=o.subtract(i),a=new e.Point(Math.min(o.x,i.x),Math.min(o.y,i.y));e.DomUtil.setPosition(s,a),s.style.width=Math.max(0,Math.abs(n.x)-4)+"px",s.style.height=Math.max(0,Math.abs(n.y)-4)+"px"},_onMouseUp:function(t){this._pane.removeChild(this._box),this._container.style.cursor="",e.DomUtil.enableTextSelection(),e.DomEvent.off(i,"mousemove",this._onMouseMove).off(i,"mouseup",this._onMouseUp);var s=this._map,o=s.mouseEventToLayerPoint(t);if(!this._startLayerPoint.equals(o)){var n=new e.LatLngBounds(s.layerPointToLatLng(this._startLayerPoint),s.layerPointToLatLng(o));s.fitBounds(n),s.fire("boxzoomend",{boxZoomBounds:n})}}}),e.Map.addInitHook("addHandler","boxZoom",e.Map.BoxZoom),e.Map.mergeOptions({keyboard:!0,keyboardPanOffset:80,keyboardZoomOffset:1}),e.Map.Keyboard=e.Handler.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61],zoomOut:[189,109,173]},initialize:function(t){this._map=t,this._setPanOffset(t.options.keyboardPanOffset),this._setZoomOffset(t.options.keyboardZoomOffset)},addHooks:function(){var t=this._map._container;-1===t.tabIndex&&(t.tabIndex="0"),e.DomEvent.on(t,"focus",this._onFocus,this).on(t,"blur",this._onBlur,this).on(t,"mousedown",this._onMouseDown,this),this._map.on("focus",this._addHooks,this).on("blur",this._removeHooks,this)},removeHooks:function(){this._removeHooks();var t=this._map._container;e.DomEvent.off(t,"focus",this._onFocus,this).off(t,"blur",this._onBlur,this).off(t,"mousedown",this._onMouseDown,this),this._map.off("focus",this._addHooks,this).off("blur",this._removeHooks,this)},_onMouseDown:function(){this._focused||this._map._container.focus()},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanOffset:function(t){var i,s,e=this._panKeys={},o=this.keyCodes;for(i=0,s=o.left.length;s>i;i++)e[o.left[i]]=[-1*t,0];for(i=0,s=o.right.length;s>i;i++)e[o.right[i]]=[t,0];for(i=0,s=o.down.length;s>i;i++)e[o.down[i]]=[0,t];for(i=0,s=o.up.length;s>i;i++)e[o.up[i]]=[0,-1*t]},_setZoomOffset:function(t){var i,s,e=this._zoomKeys={},o=this.keyCodes;for(i=0,s=o.zoomIn.length;s>i;i++)e[o.zoomIn[i]]=t;for(i=0,s=o.zoomOut.length;s>i;i++)e[o.zoomOut[i]]=-t},_addHooks:function(){e.DomEvent.on(i,"keydown",this._onKeyDown,this)},_removeHooks:function(){e.DomEvent.off(i,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){var i=t.keyCode,s=this._map;if(this._panKeys.hasOwnProperty(i))s.panBy(this._panKeys[i]),s.options.maxBounds&&s.panInsideBounds(s.options.maxBounds);else{if(!this._zoomKeys.hasOwnProperty(i))return;s.setZoom(s.getZoom()+this._zoomKeys[i])}e.DomEvent.stop(t)}}),e.Map.addInitHook("addHandler","keyboard",e.Map.Keyboard),e.Handler.MarkerDrag=e.Handler.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new e.Draggable(t,t).on("dragstart",this._onDragStart,this).on("drag",this._onDrag,this).on("dragend",this._onDragEnd,this)),this._draggable.enable()},removeHooks:function(){this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){this._marker.closePopup().fire("movestart").fire("dragstart")},_onDrag:function(){var t=this._marker,i=t._shadow,s=e.DomUtil.getPosition(t._icon),o=t._map.layerPointToLatLng(s);i&&e.DomUtil.setPosition(i,s),t._latlng=o,t.fire("move",{latlng:o}).fire("drag")
},_onDragEnd:function(){this._marker.fire("moveend").fire("dragend")}}),e.Handler.PolyEdit=e.Handler.extend({options:{icon:new e.DivIcon({iconSize:new e.Point(8,8),className:"leaflet-div-icon leaflet-editing-icon"})},initialize:function(t,i){this._poly=t,e.setOptions(this,i)},addHooks:function(){this._poly._map&&(this._markerGroup||this._initMarkers(),this._poly._map.addLayer(this._markerGroup))},removeHooks:function(){this._poly._map&&(this._poly._map.removeLayer(this._markerGroup),delete this._markerGroup,delete this._markers)},updateMarkers:function(){this._markerGroup.clearLayers(),this._initMarkers()},_initMarkers:function(){this._markerGroup||(this._markerGroup=new e.LayerGroup),this._markers=[];var t,i,s,o,n=this._poly._latlngs;for(t=0,s=n.length;s>t;t++)o=this._createMarker(n[t],t),o.on("click",this._onMarkerClick,this),this._markers.push(o);var a,r;for(t=0,i=s-1;s>t;i=t++)(0!==t||e.Polygon&&this._poly instanceof e.Polygon)&&(a=this._markers[i],r=this._markers[t],this._createMiddleMarker(a,r),this._updatePrevNext(a,r))},_createMarker:function(t,i){var s=new e.Marker(t,{draggable:!0,icon:this.options.icon});return s._origLatLng=t,s._index=i,s.on("drag",this._onMarkerDrag,this),s.on("dragend",this._fireEdit,this),this._markerGroup.addLayer(s),s},_fireEdit:function(){this._poly.fire("edit")},_onMarkerDrag:function(t){var i=t.target;e.extend(i._origLatLng,i._latlng),i._middleLeft&&i._middleLeft.setLatLng(this._getMiddleLatLng(i._prev,i)),i._middleRight&&i._middleRight.setLatLng(this._getMiddleLatLng(i,i._next)),this._poly.redraw()},_onMarkerClick:function(t){if(!(3>this._poly._latlngs.length)){var i=t.target,s=i._index;this._markerGroup.removeLayer(i),this._markers.splice(s,1),this._poly.spliceLatLngs(s,1),this._updateIndexes(s,-1),this._updatePrevNext(i._prev,i._next),i._middleLeft&&this._markerGroup.removeLayer(i._middleLeft),i._middleRight&&this._markerGroup.removeLayer(i._middleRight),i._prev&&i._next?this._createMiddleMarker(i._prev,i._next):i._prev?i._next||(i._prev._middleRight=null):i._next._middleLeft=null,this._poly.fire("edit")}},_updateIndexes:function(t,i){this._markerGroup.eachLayer(function(s){s._index>t&&(s._index+=i)})},_createMiddleMarker:function(t,i){var s,e,o,n=this._getMiddleLatLng(t,i),a=this._createMarker(n);a.setOpacity(.6),t._middleRight=i._middleLeft=a,e=function(){var e=i._index;a._index=e,a.off("click",s).on("click",this._onMarkerClick,this),n.lat=a.getLatLng().lat,n.lng=a.getLatLng().lng,this._poly.spliceLatLngs(e,0,n),this._markers.splice(e,0,a),a.setOpacity(1),this._updateIndexes(e,1),i._index++,this._updatePrevNext(t,a),this._updatePrevNext(a,i)},o=function(){a.off("dragstart",e,this),a.off("dragend",o,this),this._createMiddleMarker(t,a),this._createMiddleMarker(a,i)},s=function(){e.call(this),o.call(this),this._poly.fire("edit")},a.on("click",s,this).on("dragstart",e,this).on("dragend",o,this),this._markerGroup.addLayer(a)},_updatePrevNext:function(t,i){t&&(t._next=i),i&&(i._prev=t)},_getMiddleLatLng:function(t,i){var s=this._poly._map,e=s.latLngToLayerPoint(t.getLatLng()),o=s.latLngToLayerPoint(i.getLatLng());return s.layerPointToLatLng(e._add(o)._divideBy(2))}}),e.Polyline.addInitHook(function(){e.Handler.PolyEdit&&(this.editing=new e.Handler.PolyEdit(this),this.options.editable&&this.editing.enable()),this.on("add",function(){this.editing&&this.editing.enabled()&&this.editing.addHooks()}),this.on("remove",function(){this.editing&&this.editing.enabled()&&this.editing.removeHooks()})}),e.Control=e.Class.extend({options:{position:"topright"},initialize:function(t){e.setOptions(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var i=this._map;return i&&i.removeControl(this),this.options.position=t,i&&i.addControl(this),this},addTo:function(t){this._map=t;var i=this._container=this.onAdd(t),s=this.getPosition(),o=t._controlCorners[s];return e.DomUtil.addClass(i,"leaflet-control"),-1!==s.indexOf("bottom")?o.insertBefore(i,o.firstChild):o.appendChild(i),this},removeFrom:function(t){var i=this.getPosition(),s=t._controlCorners[i];return s.removeChild(this._container),this._map=null,this.onRemove&&this.onRemove(t),this}}),e.control=function(t){return new e.Control(t)},e.Map.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.removeFrom(this),this},_initControlPos:function(){function t(t,n){var a=s+t+" "+s+n;i[t+n]=e.DomUtil.create("div",a,o)}var i=this._controlCorners={},s="leaflet-",o=this._controlContainer=e.DomUtil.create("div",s+"control-container",this._container);t("top","left"),t("top","right"),t("bottom","left"),t("bottom","right")}}),e.Control.Zoom=e.Control.extend({options:{position:"topleft"},onAdd:function(t){var i="leaflet-control-zoom",s="leaflet-bar",o=s+"-part",n=e.DomUtil.create("div",i+" "+s);return this._map=t,this._zoomInButton=this._createButton("+","Zoom in",i+"-in "+o+" "+o+"-top",n,this._zoomIn,this),this._zoomOutButton=this._createButton("-","Zoom out",i+"-out "+o+" "+o+"-bottom",n,this._zoomOut,this),t.on("zoomend",this._updateDisabled,this),n},onRemove:function(t){t.off("zoomend",this._updateDisabled,this)},_zoomIn:function(t){this._map.zoomIn(t.shiftKey?3:1)},_zoomOut:function(t){this._map.zoomOut(t.shiftKey?3:1)},_createButton:function(t,i,s,o,n,a){var r=e.DomUtil.create("a",s,o);r.innerHTML=t,r.href="#",r.title=i;var h=e.DomEvent.stopPropagation;return e.DomEvent.on(r,"click",h).on(r,"mousedown",h).on(r,"dblclick",h).on(r,"click",e.DomEvent.preventDefault).on(r,"click",n,a),r},_updateDisabled:function(){var t=this._map,i="leaflet-control-zoom-disabled";e.DomUtil.removeClass(this._zoomInButton,i),e.DomUtil.removeClass(this._zoomOutButton,i),t._zoom===t.getMinZoom()&&e.DomUtil.addClass(this._zoomOutButton,i),t._zoom===t.getMaxZoom()&&e.DomUtil.addClass(this._zoomInButton,i)}}),e.Map.mergeOptions({zoomControl:!0}),e.Map.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new e.Control.Zoom,this.addControl(this.zoomControl))}),e.control.zoom=function(t){return new e.Control.Zoom(t)},e.Control.Attribution=e.Control.extend({options:{position:"bottomright",prefix:'Powered by <a href="http://leafletjs.com">Leaflet</a>'},initialize:function(t){e.setOptions(this,t),this._attributions={}},onAdd:function(t){return this._container=e.DomUtil.create("div","leaflet-control-attribution"),e.DomEvent.disableClickPropagation(this._container),t.on("layeradd",this._onLayerAdd,this).on("layerremove",this._onLayerRemove,this),this._update(),this._container},onRemove:function(t){t.off("layeradd",this._onLayerAdd).off("layerremove",this._onLayerRemove)},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):s},removeAttribution:function(t){return t?(this._attributions[t]--,this._update(),this):s},_update:function(){if(this._map){var t=[];for(var i in this._attributions)this._attributions.hasOwnProperty(i)&&this._attributions[i]&&t.push(i);var s=[];this.options.prefix&&s.push(this.options.prefix),t.length&&s.push(t.join(", ")),this._container.innerHTML=s.join(" &#8212; ")}},_onLayerAdd:function(t){t.layer.getAttribution&&this.addAttribution(t.layer.getAttribution())},_onLayerRemove:function(t){t.layer.getAttribution&&this.removeAttribution(t.layer.getAttribution())}}),e.Map.mergeOptions({attributionControl:!0}),e.Map.addInitHook(function(){this.options.attributionControl&&(this.attributionControl=(new e.Control.Attribution).addTo(this))}),e.control.attribution=function(t){return new e.Control.Attribution(t)},e.Control.Scale=e.Control.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0,updateWhenIdle:!1},onAdd:function(t){this._map=t;var i="leaflet-control-scale",s=e.DomUtil.create("div",i),o=this.options;return this._addScales(o,i,s),t.on(o.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),s},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,i,s){t.metric&&(this._mScale=e.DomUtil.create("div",i+"-line",s)),t.imperial&&(this._iScale=e.DomUtil.create("div",i+"-line",s))},_update:function(){var t=this._map.getBounds(),i=t.getCenter().lat,s=6378137*Math.PI*Math.cos(i*Math.PI/180),e=s*(t.getNorthEast().lng-t.getSouthWest().lng)/180,o=this._map.getSize(),n=this.options,a=0;o.x>0&&(a=e*(n.maxWidth/o.x)),this._updateScales(n,a)},_updateScales:function(t,i){t.metric&&i&&this._updateMetric(i),t.imperial&&i&&this._updateImperial(i)},_updateMetric:function(t){var i=this._getRoundNum(t);this._mScale.style.width=this._getScaleWidth(i/t)+"px",this._mScale.innerHTML=1e3>i?i+" m":i/1e3+" km"},_updateImperial:function(t){var i,s,e,o=3.2808399*t,n=this._iScale;o>5280?(i=o/5280,s=this._getRoundNum(i),n.style.width=this._getScaleWidth(s/i)+"px",n.innerHTML=s+" mi"):(e=this._getRoundNum(o),n.style.width=this._getScaleWidth(e/o)+"px",n.innerHTML=e+" ft")},_getScaleWidth:function(t){return Math.round(this.options.maxWidth*t)-10},_getRoundNum:function(t){var i=Math.pow(10,(Math.floor(t)+"").length-1),s=t/i;return s=s>=10?10:s>=5?5:s>=3?3:s>=2?2:1,i*s}}),e.control.scale=function(t){return new e.Control.Scale(t)},e.Control.Layers=e.Control.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0},initialize:function(t,i,s){e.setOptions(this,s),this._layers={},this._lastZIndex=0,this._handlingClick=!1;for(var o in t)t.hasOwnProperty(o)&&this._addLayer(t[o],o);for(o in i)i.hasOwnProperty(o)&&this._addLayer(i[o],o,!0)},onAdd:function(t){return this._initLayout(),this._update(),t.on("layeradd",this._onLayerChange,this).on("layerremove",this._onLayerChange,this),this._container},onRemove:function(t){t.off("layeradd",this._onLayerChange).off("layerremove",this._onLayerChange)},addBaseLayer:function(t,i){return this._addLayer(t,i),this._update(),this},addOverlay:function(t,i){return this._addLayer(t,i,!0),this._update(),this},removeLayer:function(t){var i=e.stamp(t);return delete this._layers[i],this._update(),this},_initLayout:function(){var t="leaflet-control-layers",i=this._container=e.DomUtil.create("div",t);e.Browser.touch?e.DomEvent.on(i,"click",e.DomEvent.stopPropagation):(e.DomEvent.disableClickPropagation(i),e.DomEvent.on(i,"mousewheel",e.DomEvent.stopPropagation));var s=this._form=e.DomUtil.create("form",t+"-list");if(this.options.collapsed){e.DomEvent.on(i,"mouseover",this._expand,this).on(i,"mouseout",this._collapse,this);var o=this._layersLink=e.DomUtil.create("a",t+"-toggle",i);o.href="#",o.title="Layers",e.Browser.touch?e.DomEvent.on(o,"click",e.DomEvent.stopPropagation).on(o,"click",e.DomEvent.preventDefault).on(o,"click",this._expand,this):e.DomEvent.on(o,"focus",this._expand,this),this._map.on("movestart",this._collapse,this)}else this._expand();this._baseLayersList=e.DomUtil.create("div",t+"-base",s),this._separator=e.DomUtil.create("div",t+"-separator",s),this._overlaysList=e.DomUtil.create("div",t+"-overlays",s),i.appendChild(s)},_addLayer:function(t,i,s){var o=e.stamp(t);this._layers[o]={layer:t,name:i,overlay:s},this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex))},_update:function(){if(this._container){this._baseLayersList.innerHTML="",this._overlaysList.innerHTML="";var t=!1,i=!1;for(var s in this._layers)if(this._layers.hasOwnProperty(s)){var e=this._layers[s];this._addItem(e),i=i||e.overlay,t=t||!e.overlay}this._separator.style.display=i&&t?"":"none"}},_onLayerChange:function(t){var i=e.stamp(t.layer);this._layers[i]&&!this._handlingClick&&this._update()},_createRadioElement:function(t,s){var e='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"';s&&(e+=' checked="checked"'),e+="/>";var o=i.createElement("div");return o.innerHTML=e,o.firstChild},_addItem:function(t){var s,o=i.createElement("label"),n=this._map.hasLayer(t.layer);t.overlay?(s=i.createElement("input"),s.type="checkbox",s.className="leaflet-control-layers-selector",s.defaultChecked=n):s=this._createRadioElement("leaflet-base-layers",n),s.layerId=e.stamp(t.layer),e.DomEvent.on(s,"click",this._onInputClick,this);var a=i.createElement("span");a.innerHTML=" "+t.name,o.appendChild(s),o.appendChild(a);var r=t.overlay?this._overlaysList:this._baseLayersList;return r.appendChild(o),o},_onInputClick:function(){var t,i,s,e,o=this._form.getElementsByTagName("input"),n=o.length;for(this._handlingClick=!0,t=0;n>t;t++)i=o[t],s=this._layers[i.layerId],i.checked&&!this._map.hasLayer(s.layer)?(this._map.addLayer(s.layer),s.overlay||(e=s.layer)):!i.checked&&this._map.hasLayer(s.layer)&&this._map.removeLayer(s.layer);e&&(this._map.setZoom(this._map.getZoom()),this._map.fire("baselayerchange",{layer:e})),this._handlingClick=!1},_expand:function(){e.DomUtil.addClass(this._container,"leaflet-control-layers-expanded")},_collapse:function(){this._container.className=this._container.className.replace(" leaflet-control-layers-expanded","")}}),e.control.layers=function(t,i,s){return new e.Control.Layers(t,i,s)},e.PosAnimation=e.Class.extend({includes:e.Mixin.Events,run:function(t,i,s,o){this.stop(),this._el=t,this._inProgress=!0,this.fire("start"),t.style[e.DomUtil.TRANSITION]="all "+(s||.25)+"s cubic-bezier(0,0,"+(o||.5)+",1)",e.DomEvent.on(t,e.DomUtil.TRANSITION_END,this._onTransitionEnd,this),e.DomUtil.setPosition(t,i),e.Util.falseFn(t.offsetWidth),this._stepTimer=setInterval(e.bind(this.fire,this,"step"),50)},stop:function(){this._inProgress&&(e.DomUtil.setPosition(this._el,this._getPos()),this._onTransitionEnd(),e.Util.falseFn(this._el.offsetWidth))},_transformRe:/(-?[\d\.]+), (-?[\d\.]+)\)/,_getPos:function(){var i,s,o,n=this._el,a=t.getComputedStyle(n);return e.Browser.any3d?(o=a[e.DomUtil.TRANSFORM].match(this._transformRe),i=parseFloat(o[1]),s=parseFloat(o[2])):(i=parseFloat(a.left),s=parseFloat(a.top)),new e.Point(i,s,!0)},_onTransitionEnd:function(){e.DomEvent.off(this._el,e.DomUtil.TRANSITION_END,this._onTransitionEnd,this),this._inProgress&&(this._inProgress=!1,this._el.style[e.DomUtil.TRANSITION]="",clearInterval(this._stepTimer),this.fire("step").fire("end"))}}),e.Map.include({setView:function(t,i,s){i=this._limitZoom(i);var e=this._zoom!==i;if(this._loaded&&!s&&this._layers){this._panAnim&&this._panAnim.stop();var o=e?this._zoomToIfClose&&this._zoomToIfClose(t,i):this._panByIfClose(t);if(o)return clearTimeout(this._sizeTimer),this}return this._resetView(t,i),this},panBy:function(t,i,s){if(t=e.point(t),!t.x&&!t.y)return this;this._panAnim||(this._panAnim=new e.PosAnimation,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),this.fire("movestart"),e.DomUtil.addClass(this._mapPane,"leaflet-pan-anim");var o=e.DomUtil.getPosition(this._mapPane).subtract(t)._round();return this._panAnim.run(this._mapPane,o,i||.25,s),this},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){e.DomUtil.removeClass(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_panByIfClose:function(t){var i=this._getCenterOffset(t)._floor();return this._offsetIsWithinView(i)?(this.panBy(i),!0):!1},_offsetIsWithinView:function(t,i){var s=i||1,e=this.getSize();return Math.abs(t.x)<=e.x*s&&Math.abs(t.y)<=e.y*s}}),e.PosAnimation=e.DomUtil.TRANSITION?e.PosAnimation:e.PosAnimation.extend({run:function(t,i,s,o){this.stop(),this._el=t,this._inProgress=!0,this._duration=s||.25,this._easeOutPower=1/Math.max(o||.5,.2),this._startPos=e.DomUtil.getPosition(t),this._offset=i.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(),this._complete())},_animate:function(){this._animId=e.Util.requestAnimFrame(this._animate,this),this._step()},_step:function(){var t=+new Date-this._startTime,i=1e3*this._duration;i>t?this._runFrame(this._easeOut(t/i)):(this._runFrame(1),this._complete())},_runFrame:function(t){var i=this._startPos.add(this._offset.multiplyBy(t));e.DomUtil.setPosition(this._el,i),this.fire("step")},_complete:function(){e.Util.cancelAnimFrame(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),e.Map.mergeOptions({zoomAnimation:e.DomUtil.TRANSITION&&!e.Browser.android23&&!e.Browser.mobileOpera}),e.DomUtil.TRANSITION&&e.Map.addInitHook(function(){e.DomEvent.on(this._mapPane,e.DomUtil.TRANSITION_END,this._catchTransitionEnd,this)}),e.Map.include(e.DomUtil.TRANSITION?{_zoomToIfClose:function(t,i){if(this._animatingZoom)return!0;if(!this.options.zoomAnimation)return!1;var s=this.getZoomScale(i),o=this._getCenterOffset(t)._divideBy(1-1/s);if(!this._offsetIsWithinView(o,1))return!1;e.DomUtil.addClass(this._mapPane,"leaflet-zoom-anim"),this.fire("movestart").fire("zoomstart"),this.fire("zoomanim",{center:t,zoom:i});var n=this._getCenterLayerPoint().add(o);return this._prepareTileBg(),this._runAnimation(t,i,s,n),!0},_catchTransitionEnd:function(){this._animatingZoom&&this._onZoomTransitionEnd()},_runAnimation:function(t,i,s,o,n){this._animateToCenter=t,this._animateToZoom=i,this._animatingZoom=!0,e.Draggable&&(e.Draggable._disabled=!0);var a=e.DomUtil.TRANSFORM,r=this._tileBg;clearTimeout(this._clearTileBgTimer),e.Util.falseFn(r.offsetWidth);var h=e.DomUtil.getScaleString(s,o),l=r.style[a];r.style[a]=n?l+" "+h:h+" "+l},_prepareTileBg:function(){var t=this._tilePane,i=this._tileBg;if(i&&this._getLoadedTilesPercentage(i)>.5&&.5>this._getLoadedTilesPercentage(t))return t.style.visibility="hidden",t.empty=!0,this._stopLoadingImages(t),s;i||(i=this._tileBg=this._createPane("leaflet-tile-pane",this._mapPane),i.style.zIndex=1),i.style[e.DomUtil.TRANSFORM]="",i.style.visibility="hidden",i.empty=!0,t.empty=!1,this._tilePane=this._panes.tilePane=i;var o=this._tileBg=t;e.DomUtil.addClass(o,"leaflet-zoom-animated"),this._stopLoadingImages(o)},_getLoadedTilesPercentage:function(t){var i,s,e=t.getElementsByTagName("img"),o=0;for(i=0,s=e.length;s>i;i++)e[i].complete&&o++;return o/s},_stopLoadingImages:function(t){var i,s,o,n=Array.prototype.slice.call(t.getElementsByTagName("img"));for(i=0,s=n.length;s>i;i++)o=n[i],o.complete||(o.onload=e.Util.falseFn,o.onerror=e.Util.falseFn,o.src=e.Util.emptyImageUrl,o.parentNode.removeChild(o))},_onZoomTransitionEnd:function(){this._restoreTileFront(),e.DomUtil.removeClass(this._mapPane,"leaflet-zoom-anim"),e.Util.falseFn(this._tileBg.offsetWidth),this._animatingZoom=!1,this._resetView(this._animateToCenter,this._animateToZoom,!0,!0),e.Draggable&&(e.Draggable._disabled=!1)},_restoreTileFront:function(){this._tilePane.innerHTML="",this._tilePane.style.visibility="",this._tilePane.style.zIndex=2,this._tileBg.style.zIndex=1},_clearTileBg:function(){this._animatingZoom||this.touchZoom._zooming||(this._tileBg.innerHTML="")}}:{}),e.Map.include({_defaultLocateOptions:{watch:!1,setView:!1,maxZoom:1/0,timeout:1e4,maximumAge:0,enableHighAccuracy:!1},locate:function(t){if(t=this._locationOptions=e.extend(this._defaultLocateOptions,t),!navigator.geolocation)return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var i=e.bind(this._handleGeolocationResponse,this),s=e.bind(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(i,s,t):navigator.geolocation.getCurrentPosition(i,s,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch(this._locationWatchId),this},_handleGeolocationError:function(t){var i=t.code,s=t.message||(1===i?"permission denied":2===i?"position unavailable":"timeout");this._locationOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:i,message:"Geolocation error: "+s+"."})},_handleGeolocationResponse:function(t){var i=180*t.coords.accuracy/4e7,s=2*i,o=t.coords.latitude,n=t.coords.longitude,a=new e.LatLng(o,n),r=new e.LatLng(o-i,n-s),h=new e.LatLng(o+i,n+s),l=new e.LatLngBounds(r,h),c=this._locationOptions;if(c.setView){var m=Math.min(this.getBoundsZoom(l),c.maxZoom);this.setView(a,m)}this.fire("locationfound",{latlng:a,bounds:l,accuracy:t.coords.accuracy})}})}(this,document),L.Proj={},L.Proj._isProj4Proj=function(t){return t.projName!==void 0},L.Proj.Projection=L.Class.extend({initialize:function(t,i){if(L.Proj._isProj4Proj(t))this._proj=t;else{var s=t;Proj4js.defs[s]=i,this._proj=new Proj4js.Proj(s)}},project:function(t){var i=new L.Point(t.lng,t.lat);return Proj4js.transform(Proj4js.WGS84,this._proj,i)},unproject:function(t,i){var s=Proj4js.transform(this._proj,Proj4js.WGS84,t.clone());return new L.LatLng(s.y,s.x,i)}}),L.Proj.CRS=L.Class.extend({includes:L.CRS,options:{transformation:new L.Transformation(1,0,-1,0)},initialize:function(t,i,s){var e,o,n,a;L.Proj._isProj4Proj(t)?(o=t,e=o.srsCode,a=i||{},this.projection=new L.Proj.Projection(o)):(e=t,n=i,a=s||{},this.projection=new L.Proj.Projection(e,n)),L.Util.setOptions(this,a),this.code=e,this.transformation=this.options.transformation,this.options.origin&&(this.transformation=new L.Transformation(1,-this.options.origin[0],-1,this.options.origin[1])),this.options.scales?this.scale=function(t){return this.options.scales[t]}:this.options.resolutions&&(this.scale=function(t){return 1/this.options.resolutions[t]})}}),L.Proj.CRS.TMS=L.Proj.CRS.extend({initialize:function(t,i,s,e){if(L.Proj._isProj4Proj(t)){var o=t,n=i,a=s||{};a.origin=[n[0],n[3]],L.Proj.CRS.prototype.initialize(o,a)}else{var r=t,h=i,n=s,a=e||{};a.origin=[n[0],n[3]],L.Proj.CRS.prototype.initialize(r,h,a)}this.projectedBounds=n}}),L.Proj.TileLayer={},L.Proj.TileLayer.TMS=L.TileLayer.extend({options:{tms:!0,continuousWorld:!0},initialize:function(t,i,s){if(!(i instanceof L.Proj.CRS.TMS))throw Error("CRS is not L.Proj.CRS.TMS.");L.TileLayer.prototype.initialize.call(this,t,s),this.crs=i;for(var e=this.options.minZoom;this.options.maxZoom>e;e++){var o=(this.crs.projectedBounds[3]-this.crs.projectedBounds[1])/this._projectedTileSize(e);if(Math.abs(o-Math.round(o))>.001)throw Error("Projected bounds does not match grid at zoom "+e)}},getTileUrl:function(t){var i=Math.round((this.crs.projectedBounds[3]-this.crs.projectedBounds[1])/this._projectedTileSize(this._map.getZoom()));return L.Util.template(this._url,L.Util.extend({s:this._getSubdomain(t),z:this._getZoomForUrl(),x:t.x,y:i-t.y-1},this.options))},_projectedTileSize:function(t){return this.options.tileSize/this.crs.scale(t)}}),"undefined"!=typeof module&&(module.exports=L.Proj),"undefined"!=typeof L&&L.CRS!==void 0&&(L.CRS.proj4js=function(){return function(t,i,s,e){return e=e||{},s&&(e.transformation=s),new L.Proj.CRS(t,i,e)}}()),L.Control.MousePosition=L.Control.extend({options:{position:"bottomleft",separator:" : ",emptyString:"Unavailable",lngFirst:!1,numDigits:5,lngFormatter:void 0,latFormatter:void 0},onAdd:function(t){return this._container=L.DomUtil.create("div","leaflet-control-mouseposition"),L.DomEvent.disableClickPropagation(this._container),t.on("mousemove",this._onMouseMove,this),this._container.innerHTML=this.options.emptyString,this._container},onRemove:function(t){t.off("mousemove",this._onMouseMove)},_onMouseMove:function(t){var i=L.Util.formatNum(t.latlng.lng,this.options.numDigits),s=L.Util.formatNum(t.latlng.lat,this.options.numDigits);this.options.lngFormatter&&(i=this.options.lngFormatter(i)),this.options.latFormatter&&(s=this.options.latFormatter(s));var e=this.options.lngFirst?i+this.options.separator+s:s+this.options.separator+i;this._container.innerHTML=e}}),L.Map.mergeOptions({positionControl:!1}),L.Map.addInitHook(function(){this.options.positionControl&&(this.positionControl=new L.Control.MousePosition,this.addControl(this.positionControl))}),L.control.mousePosition=function(t){return new L.Control.MousePosition(t)},function(t,i){L.KSP={},L.KSP.version="0.2.1",L.KSP.CRS={},L.KSP.CRS.EPSG4326=new L.Proj.CRS.TMS(new Proj4js.Proj("EPSG:4326"),[-180,-90,180,90],{resolutions:[.703125,.3515625,.17578125,.087890625,.0439453125,.02197265625]}),L.KSP.CelestialBody=L.Class.extend({initialize:function(t){if(!t.hasOwnProperty("id"))throw Error("must specify id");if(!t.hasOwnProperty("name"))throw Error("must specify name");if(t.hasOwnProperty("crs")){if(!(t.crs instanceof L.Proj.CRS.TMS))throw Error("crs is not an instance of L.Proj.CRS.TMS")}else this.crs=L.KSP.CRS.EPSG4326;t.hasOwnProperty("radius")||(this.radius=1),t.hasOwnProperty("thumbnail")||(this.thumbnail="body-unknown.png"),t.hasOwnProperty("baseLayers")||(this.baseLayers={}),L.Util.extend(this,t)},addTo:function(t){var i,s=t._body;if(t._body=this,t.fire("bodychangestart",{body:this,oldBody:s}),s){for(i in s.baseLayers)s.baseLayers.hasOwnProperty(i)&&t.removeLayer(s.baseLayers[i]);for(i in s.overlays)s.overlays.hasOwnProperty(i)&&t.removeLayer(s.overlays[i])}var e=this.defaultLayer||this.baseLayers.Satellite;if(e){for(i in this.baseLayers)if(this.baseLayers.hasOwnProperty(i)&&this.baseLayers[i]._type===t._baseLayerType){e=this.baseLayers[i];break}t.addLayer(e),t.fire("baselayerchange",{layer:e})}for(i in this.overlays)this.overlays.hasOwnProperty(i)&&t._overlayTypes.indexOf(this.overlays[i]._type)>=0&&(t.addLayer(this.overlays[i]),t.fire("layeradd",{layer:this.overlays[i]}));t.fire("bodychangeend",{body:this,oldBody:s})},onAdd:function(t){this.addTo(t)},removeFrom:function(t){L.KSP.CelestialBody.DUMMY.addTo(t)},onRemove:function(t){this.removeFrom(t)}}),L.KSP.celestialBody=function(t){return new L.KSP.CelestialBody(t)},L.KSP.CelestialBody.DUMMY=L.KSP.celestialBody({id:"",name:"",crs:L.KSP.CRS.EPSG4326}),L.KSP.CelestialBody.ALL_PLANETARY=[L.KSP.CelestialBody.DUMMY],L.KSP.Map=L.Map.extend({options:{crs:L.KSP.CRS.EPSG4326,continuousWorld:!0},initialize:function(t,i){this._baseLayerType=-1,this._overlayTypes=[],L.Util.setOptions(this,i),this.startTrackingLayerState(),this.on("bodychangestart",this._onBodyChangeStart).on("bodychangeend",this._onBodyChangeEnd),L.Map.prototype.initialize.call(this,t,this.options)},clampZoom:function(){var t=this.getZoom(),i=this.getMinZoom(),s=this.getMaxZoom();i>t?this.setZoom(i):t>s?this.setZoom(s):this.fire("zoomend",this)},_onBodyChangeStart:function(){this.stopTrackingLayerState()},_onBodyChangeEnd:function(){this.clampZoom(),this.startTrackingLayerState()},_onLayerStateChange:function(t){if("layeradd"===t.type)t.layer instanceof L.KSP.TileLayer?this._baseLayerType=t.layer._type:t.layer instanceof L.KSP.LayerGroup&&0>this._overlayTypes.indexOf(t.layer._type)&&this._overlayTypes.push(t.layer._type);else if(t.layer instanceof L.KSP.LayerGroup){var i,s,e=t.layer._type,o=this._overlayTypes;for(i=o.length-1;i>=0;i--)s=o[i],s===e&&o.splice(i,1)}},startTrackingLayerState:function(){this.on("layeradd",this._onLayerStateChange).on("layerremove",this._onLayerStateChange)},stopTrackingLayerState:function(){this.off("layeradd",this._onLayerStateChange).off("layerremove",this._onLayerStateChange)}}),L.KSP.map=function(t,i){return new L.KSP.Map(t,i)},L.KSP.TileLayer=L.Proj.TileLayer.TMS.extend({statics:{TYPE_SATELLITE:0,TYPE_COLORRELIEF:1,TYPE_SLOPE:2,DEFAULT_URL:"http://tiles.kerbalmaps.com/{body}/{style}/{z}/{x}/{y}.png"},options:{continuousWorld:!1,noWrap:!1,minZoom:0,maxZoom:5,attribution:"Map data &copy; Joel Pedraza"},initialize:function(t,i,s,e){L.Util.setOptions(this,e),this._type=t,L.Proj.TileLayer.TMS.prototype.initialize.call(this,i,s,this.options)}}),L.KSP.tileLayer=function(t,i,s,e){return new L.KSP.TileLayer(t,i,s,e)},L.KSP.LayerGroup=L.LayerGroup.extend({statics:{TYPE_SPACECENTER:0,TYPE_ANOMALY:1},initialize:function(t,i){this._type=t,L.LayerGroup.prototype.initialize.call(this,i)}}),L.KSP.layerGroup=function(t,i){return new L.KSP.LayerGroup(t,i)},L.KSP.Icon={},L.KSP.Icon.SPACECENTER=new L.Icon({iconUrl:"../assets/images/markers-spacecenter.png",shadowUrl:"../assets/images/markers-shadow.png",iconSize:[30,40],shadowSize:[35,16],iconAnchor:[15,40],shadowAnchor:[10,12],popupAnchor:[0,-35]}),L.KSP.Icon.ANOMALY=new L.Icon({iconUrl:"../assets/images/markers-anomaly.png",shadowUrl:"../assets/images/markers-shadow.png",iconSize:[30,40],shadowSize:[35,16],iconAnchor:[15,40],shadowAnchor:[10,12],popupAnchor:[0,-35]}),L.KSP.Legend={},L.KSP.Legend.SLOPE={"&ge; 60&deg;":"#E19678","&lt; 60&deg;":"#C86464","&lt; 30&deg;":"#965A64","&lt; 15&deg;":"#645064","&lt; 5&deg;":"#325064","0&deg;":"#32465A"},L.KSP.Control=L.KSP.control={},L.KSP.Control.Legend=L.Control.extend({options:{position:"bottomright"},onAdd:function(t){return this._container=L.DomUtil.create("div","leaflet-control-legend"),t.on("baselayerchange",this._onLayerChange,this),this._container},_update:function(t){if(this._container.innerHTML="",t){for(var i in t)t.hasOwnProperty(i)&&(this._container.innerHTML+='<i style="background-color: '+t[i]+';"></i>'+i+"<br>");L.DomUtil.addClass(this._container,"leaflet-control-legend-visible")}else this._container.className=this._container.className.replace(" leaflet-control-legend-visible","")},_onLayerChange:function(t){this._update(t.layer.options.legend)}}),L.Map.mergeOptions({legendControl:!0}),L.Map.addInitHook(function(){this.options.bodyControl&&(this.legendControl=new L.KSP.Control.Legend,this.addControl(this.legendControl))}),L.control.legend=function(t){return new L.KSP.Control.Legend(t)},L.KSP.Control.Scale=L.Control.Scale.extend({options:{imperial:!1},onAdd:function(t){this._radius=0,t._body&&(this._radius=t._body.radius);var i=L.Control.Scale.prototype.onAdd.call(this,t);return t.on("bodychangeend",this._onBodyChangeEnd,this),i},onRemove:function(t){L.Control.Scale.prototype.onRemove.call(this,t),t.off("bodychangeend",this._onBodyChangeEnd)},_onBodyChangeEnd:function(t){this._radius=t.body.radius,this._update()},_update:function(){var t=this._map.getBounds(),i=t.getCenter().lat,s=this._radius*Math.PI*Math.cos(i*Math.PI/180),e=s*(t.getNorthEast().lng-t.getSouthWest().lng)/180,o=this._map.getSize(),n=this.options,a=0;o.x>0&&(a=e*(n.maxWidth/o.x)),this._updateScales(n,a)}}),L.KSP.Map.mergeOptions({scaleControl:!1}),L.KSP.Map.addInitHook(function(){this.options.scaleControl&&(this.scaleControl=new L.KSP.Control.Scale,this.addControl(this.scaleControl))}),L.KSP.control.scale=function(t){return new L.KSP.Control.Scale(t)},L.KSP.Control.CelestialBody=L.Control.extend({options:{position:"topright",collapsed:!0},initialize:function(t,i){L.Util.setOptions(this,i),this._bodies=t,this._timeInMillis=(new Date).valueOf(),this._weekInMillis=6048e5},onAdd:function(){return this._initLayout(),this._update(),this._map.on("bodychangeend",this._update,this),this._container},_initLayout:function(){var t="leaflet-control-celestialbodies",s=this._container=L.DomUtil.create("div",t),e=this._bodies;if(this.options.collapsed){L.DomEvent.on(s,"mouseover",this._expand,this).on(s,"mouseout",this._collapse,this);var o=this._bodiesLink=L.DomUtil.create("a",t+"-toggle",s);o.href="#",o.title="Celestial Bodies",L.DomEvent.on(o,"focus",this._expand,this),this._map.on("movestart",this._collapse,this)}var n=this._list=L.DomUtil.create("ul",t+"-list",s);for(var a in e)if(e.hasOwnProperty(a)){var r=this._addBody(e[a],n);if(e[a].children){var h=i.createElement("ul");for(var l in e[a].children)e[a].children.hasOwnProperty(l)&&this._addBody(e[a].children[l],h);r.appendChild(h)}}},_update:function(){this._map._body&&(this._bodiesLink.style.backgroundImage='url("'+this._map._body.thumbnail+'")')},_addBody:function(t,s){var e,o=i.createElement("li"),n=i.createElement("img");if(n.src=t.thumbnail,n.alt=o.title=t.name,t.addedOn){this._timeInMillis-t.addedOn<this._weekInMillis?(e=L.DomUtil.create("h2","leaflet-control-celestialbodies-flag leaflet-control-celestialbodies-flag-orange",o),e.innerHTML="new"):this._timeInMillis-t.lastUpdated<this._weekInMillis&&(e=L.DomUtil.create("h2","leaflet-control-celestialbodies-flag",o),e.innerHTML="update");var a=i.createElement("a");a.href="#";var r=L.DomEvent.stopPropagation;L.DomEvent.on(a,"click",r).on(a,"mousedown",r).on(a,"dblclick",r).on(a,"click",L.DomEvent.preventDefault).on(a,"click",function(){return t.addTo(this._map),!1
},this),a.appendChild(n),o.appendChild(a)}else L.DomUtil.addClass(n,"disabled"),o.appendChild(n);return s.appendChild(o),o},_expand:function(){L.DomUtil.addClass(this._container,"leaflet-control-celestialbodies-expanded")},_collapse:function(){this._container.className=this._container.className.replace(" leaflet-control-celestialbodies-expanded","")}}),L.KSP.Map.mergeOptions({bodyControl:!0}),L.KSP.Map.addInitHook(function(){this.options.bodyControl&&(this.bodyControl=new L.KSP.Control.CelestialBody(L.KSP.CelestialBody.ALL_PLANETARY),this.addControl(this.bodyControl))}),L.KSP.control.celestialBody=function(t,i){return new L.KSP.Control.CelestialBody(t,i)},L.KSP.Control.Layers=L.Control.Layers.extend({onAdd:function(t){var i=L.Control.Layers.prototype.onAdd.call(this,t);return t._body&&this.addBody(t._body),t.on("bodychangestart",this._onBodyChangeStart,this),i},onRemove:function(t){L.Control.Layers.prototype.onRemove.call(this,t),t.off("bodychangestart",this._onBodyChangeStart)},addBody:function(t){var i;for(i in t.baseLayers)t.baseLayers.hasOwnProperty(i)&&this.addBaseLayer(t.baseLayers[i],i);for(i in t.overlays)t.overlays.hasOwnProperty(i)&&this.addOverlay(t.overlays[i],i)},removeBody:function(t){var i;for(i in t.baseLayers)t.baseLayers.hasOwnProperty(i)&&this.removeLayer(t.baseLayers[i],i);for(i in t.overlays)t.overlays.hasOwnProperty(i)&&this.removeLayer(t.overlays[i],i)},_onBodyChangeStart:function(t){t.oldBody&&this.removeBody(t.oldBody),this.addBody(t.body)}}),L.KSP.Map.mergeOptions({layersControl:!0}),L.KSP.Map.addInitHook(function(){this.options.layersControl&&(this.layersControl=new L.KSP.Control.Layers,this.addControl(this.layersControl))}),L.KSP.control.layers=function(t,i,s){return new L.KSP.Control.Layers(t,i,s)},L.KSP.CelestialBody.MOHO=L.KSP.celestialBody({id:"moho",name:"Moho",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-moho.png"}),L.KSP.CelestialBody.EVE=L.KSP.celestialBody({id:"eve",name:"Eve",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-eve.png"}),L.KSP.CelestialBody.GILLY=L.KSP.celestialBody({id:"gilly",name:"Gilly",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-gilly.png"}),L.KSP.CelestialBody.KERBIN=L.KSP.celestialBody({id:"kerbin",name:"Kerbin",crs:L.KSP.CRS.EPSG4326,radius:6e5,addedOn:1366416e6,lastUpdated:1366416e6,thumbnail:"body-kerbin.png",baseLayers:{Satellite:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{body:"kerbin",style:"sat",maxZoom:4}),"Color Relief":L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{body:"kerbin",style:"color",maxZoom:4,legend:{"4500 m":"#FFFFFF","4000 m":"#E6E1E1","3000 m":"#C39B87","2000 m":"#B97855","1000 m":"#B99B6E","600 m":"#5A825A","200 m":"#1E784B","50 m":"#0A6437","0 m":"#004120","-500 m":"#0F4B9B","-100 m":"#1E6E9B"}}),Slope:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{body:"kerbin",style:"slope",maxZoom:4})},overlays:{"Space Centers":L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_SPACECENTER,[L.marker([-.0969,-74.6004],{icon:L.KSP.Icon.SPACECENTER}).bindPopup("<strong>Kerbal Space Center</strong><br>-0.0969 : -74.6004"),L.marker([20.5829,-146.5116],{icon:L.KSP.Icon.SPACECENTER}).bindPopup("<strong>Kerbal Space Center 2</strong><br>20.5829 : -146.5116"),L.marker([-1.5409,-71.9099],{icon:L.KSP.Icon.SPACECENTER}).bindPopup("<strong>Island Airfield</strong><br>-1.5409 : -71.9099")]),Anomalies:L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_ANOMALY,[L.marker([.1023,-74.5684],{icon:L.KSP.Icon.ANOMALY}).bindPopup("0.1023 : -74.5684"),L.marker([20.6709,-146.4968],{icon:L.KSP.Icon.ANOMALY}).bindPopup("20.6709 : -146.4968"),L.marker([35.5705,-74.9773],{icon:L.KSP.Icon.ANOMALY}).bindPopup("35.5705 : -74.9773"),L.marker([-.6402,-80.7668],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-0.6402 : -80.7668"),L.marker([-28.8083,-13.4401],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-28.8083 : -13.4401"),L.marker([-6.5057,-141.6856],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-6.5057 : -141.6856"),L.marker([81.9551,-128.518],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-81.9551 : -128.518")])}}),L.KSP.CelestialBody.MUN=L.KSP.celestialBody({id:"mun",name:"Mun",crs:L.KSP.CRS.EPSG4326,radius:2e5,addedOn:13682304e5,lastUpdated:1368144e6,thumbnail:"body-mun.png",baseLayers:{Satellite:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{body:"mun",style:"sat"}),"Color Relief":L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{body:"mun",style:"color",legend:{"3150 m":"#EBEBEB","-180 m":"#232323"}}),Slope:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{body:"mun",style:"slope",legend:L.KSP.Legend.SLOPE})},overlays:{Anomalies:L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_ANOMALY,[L.marker([-9.8314,25.9177],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-9.8314 : 25.9177"),L.marker([-82.2063,102.9305],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-82.2063 : 102.9305"),L.marker([57.6604,9.1422],{icon:L.KSP.Icon.ANOMALY}).bindPopup("57.6604 : 9.1422"),L.marker([2.4695,81.5133],{icon:L.KSP.Icon.ANOMALY}).bindPopup("2.4695 : 81.5133"),L.marker([12.4432,39.178],{icon:L.KSP.Icon.ANOMALY}).bindPopup("12.4432 : 39.1780"),L.marker([-12.4431,-140.822],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-12.4431 : -140.8220"),L.marker([.7027,22.747],{icon:L.KSP.Icon.ANOMALY}).bindPopup("0.7027 : 22.7470"),L.marker([-70.9556,-68.1378],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-70.9556,-68.1378")])}}),L.KSP.CelestialBody.MINMUS=L.KSP.celestialBody({id:"minmus",name:"Minmus",crs:L.KSP.CRS.EPSG4326,radius:6e4,addedOn:13682304e5,lastUpdated:13682304e5,thumbnail:"body-minmus.png",baseLayers:{Satellite:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"sat",body:"minmus"}),"Color Relief":L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"color",body:"minmus",legend:{"5750 m":"#414B41","2500 m":"#BEE6C3","1 m":"#96CDB4","0 m":"#87B9A5"}}),Slope:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"slope",body:"minmus",legend:L.KSP.Legend.SLOPE})},overlays:{Anomalies:L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_ANOMALY,[L.marker([23.7768,60.0462],{icon:L.KSP.Icon.ANOMALY}).bindPopup("23.7768 : 60.0462")])}}),L.KSP.CelestialBody.DUNA=L.KSP.celestialBody({id:"duna",name:"Duna",crs:L.KSP.CRS.EPSG4326,radius:32e4,addedOn:13688352e5,lastUpdated:13688352e5,thumbnail:"body-duna.png",baseLayers:{Satellite:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"sat",body:"duna"}),"Color Relief":L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"color",body:"duna",legend:{"4800 m":"#C3A082","4000 m":"#966446","3000 m":"#733219","2000 m":"#501E14","1000 m":"#3C140F","0 m":"#280F0A"}}),Slope:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"slope",body:"duna",legend:L.KSP.Legend.SLOPE})},overlays:{Anomalies:L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_ANOMALY,[L.marker([17.0483,-85.4717],{icon:L.KSP.Icon.ANOMALY}).bindPopup("17.0483 : -85.4717"),L.marker([-30.3525,-28.6828],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-30.3525 : -28.6828"),L.marker([-66.1344,-160.7432],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-66.1344 : -160.7432")])}}),L.KSP.CelestialBody.IKE=L.KSP.celestialBody({id:"ike",name:"Ike",crs:L.KSP.CRS.EPSG4326,radius:13e4,addedOn:13688352e5,lastUpdated:13688352e5,thumbnail:"body-ike.png",baseLayers:{Satellite:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"sat",body:"ike"}),"Color Relief":L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"color",body:"ike",legend:{"13000 m":"#828282","11000 m":"#6E6E6E","9000 m":"#5A5A5A","7000 m":"#464646","5000 m":"#323232","2500 m":"#191919","70 m":"#070707"}}),Slope:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"slope",body:"ike",legend:L.KSP.Legend.SLOPE})},overlays:{}}),L.KSP.CelestialBody.DRES=L.KSP.celestialBody({id:"dres",name:"Dres",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-dres.png"}),L.KSP.CelestialBody.JOOL=L.KSP.celestialBody({id:"jool",name:"Jool",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-jool.png"}),L.KSP.CelestialBody.LAYTHE=L.KSP.celestialBody({id:"laythe",name:"Laythe",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-laythe.png"}),L.KSP.CelestialBody.VALL=L.KSP.celestialBody({id:"vall",name:"Vall",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-vall.png"}),L.KSP.CelestialBody.TYLO=L.KSP.celestialBody({id:"tylo",name:"Tylo",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-tylo.png"}),L.KSP.CelestialBody.BOP=L.KSP.celestialBody({id:"bop",name:"Bop",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-bop.png"}),L.KSP.CelestialBody.POL=L.KSP.celestialBody({id:"pol",name:"Pol",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-pol.png"}),L.KSP.CelestialBody.EELOO=L.KSP.celestialBody({id:"eeloo",name:"Eeloo",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-eeloo.png"}),L.KSP.CelestialBody.KERBIN.defaultLayer=L.KSP.CelestialBody.KERBIN.baseLayers.Satellite,L.KSP.CelestialBody.MUN.defaultLayer=L.KSP.CelestialBody.MUN.baseLayers.Satellite,L.KSP.CelestialBody.MINMUS.defaultLayer=L.KSP.CelestialBody.MINMUS.baseLayers.Satellite,L.KSP.CelestialBody.EVE.children=[L.KSP.CelestialBody.GILLY],L.KSP.CelestialBody.KERBIN.children=[L.KSP.CelestialBody.MUN,L.KSP.CelestialBody.MINMUS],L.KSP.CelestialBody.DUNA.children=[L.KSP.CelestialBody.IKE],L.KSP.CelestialBody.JOOL.children=[L.KSP.CelestialBody.LAYTHE,L.KSP.CelestialBody.VALL,L.KSP.CelestialBody.TYLO,L.KSP.CelestialBody.BOP,L.KSP.CelestialBody.POL],L.KSP.CelestialBody.GILLY.parent=L.KSP.CelestialBody.EVE,L.KSP.CelestialBody.MUN.parent=L.KSP.CelestialBody.MINMUS.parent=L.KSP.CelestialBody.KERBIN,L.KSP.CelestialBody.IKE.parent=L.KSP.CelestialBody.DUNA,L.KSP.CelestialBody.LAYTHE.parent=L.KSP.CelestialBody.VALL.parent=L.KSP.CelestialBody.TYLO.parent=L.KSP.CelestialBody.BOP.parent=L.KSP.CelestialBody.POL.parent=L.KSP.CelestialBody.JOOL,L.KSP.CelestialBody.ALL_PLANETARY=[L.KSP.CelestialBody.MOHO,L.KSP.CelestialBody.EVE,L.KSP.CelestialBody.KERBIN,L.KSP.CelestialBody.DUNA,L.KSP.CelestialBody.DRES,L.KSP.CelestialBody.JOOL,L.KSP.CelestialBody.EELOO],L.KSP.Map.addInitHook(function(){this.options.layers=[L.KSP.CelestialBody.KERBIN]})}(this,document);
var Settings = Class.create({
  initialize: function(defaultHost, defaultPort){
    if(!this.getHost()){ this.setHost(defaultHost)}
    if(!this.getPort()){ this.setPort(defaultPort)}
  },

  getHost: function(){
    return this.get('host')
  },

  getPort: function(){
    return this.get('port')
  },

  setHost: function(value){
    return this.set('host', value)
  },

  setPort: function(value){
    return this.set('port', value)
  },

  get: function(property){
    return localStorage.getItem(property)
  },

  set: function(property, value){
    return localStorage.setItem(property, value)
  }
})
var Telemachus = Class.create({
  initialize: function(host, port){
    this.updateConnection(host, port)
    this.receiverFunctions = []
    this.subscribedFields = {}
    this.orbitingBodies = this.getOrbitalBodies()
    this.rate = 500

    this.loopTimeout = setTimeout(this.poll.bind(this), this.rate)
  },

  url: function(){
    return "http://" + this.host + ":" + this.port + "/telemachus/datalink"
  },

  updateConnection: function(host, port){
    this.host = host
    this.port = port
  },

  addReceiverFunction: function(func){
    this.receiverFunctions.push(func)
  },

  subscribeToData: function(fields){
    for (var i = fields.length - 1; i >= 0; i--) {
      var field = fields[i]
      this.subscribedFields[field] = field
    };
  },

  dispatchMessages: function(data){
    for (var i = this.receiverFunctions.length - 1; i >= 0; i--) {
      try{
        this.receiverFunctions[i](data)
      } catch(e){
        console.error(e)
      }
    };
  },

  send: function(message){
    this.socket.send(JSON.stringify(message))
  },

  getOrbitalBodyInfo: function(name){
    var properties = this.orbitingBodies[name]

    if(properties){
      return Object.extend({name: name}, properties)
    } else{
      return null
    }
  },

  notifyIfLOS: function(request){
    if(request.transport.status == 0){
      document.fire('telemachus:loss-of-signal')
      return true
    }
    return false
  },

  prepareParams: function(params){
    var normalizedParams = []
    Object.keys(params).forEach(function(field){
      var sanitizedFieldName = field.replace("[", "{").replace("]","}")
      normalizedParams.push(sanitizedFieldName + "=" + field)
    })
    return normalizedParams
  },

  convertData: function(rawData){
    var data = {}
    var startBracesRegexp = /\{/g
    var endBracesRegexp = /\}/g

    Object.keys(rawData).forEach(function(key){
      var convertedFieldName = key.replace(startBracesRegexp, "[").replace(endBracesRegexp, "]")
      data[convertedFieldName] = rawData[key]
    })

    return data
  },

  poll: function(){
    var params = this.prepareParams(this.subscribedFields)
    var requestURL = this.url() + "?" + params.join("&")

    new Ajax.Request(requestURL, {
      method: "get",
      onSuccess: function(response){
        var rawData = JSON.parse(response.responseText)
        var data = this.convertData(rawData)

        this.dispatchMessages(data)
      }.bind(this),
      onException: this.notifyIfLOS.bind(this),
      onComplete: function(response){
        setTimeout(this.poll.bind(this),this.rate);
      }.bind(this)
    })
  },

  sendMessage: function(params, callback){
    new Ajax.Request(this.url(), {
      method: "post",
      postBody: JSON.stringify(params),
      // parameters: params,
      onSuccess: function(response){
        var rawData = JSON.parse(response.responseText)
        var data = this.convertData(rawData)
        callback(data)
      }.bind(this),
      onException: this.notifyIfLOS.bind(this)
    })
  },

  getOrbitalBodies: function(){
    return {
      "Sun" : {
        id: 0,
        referenceBodyName: null,
        mapBody: null,
        atmosphericRadius: 0,
        color: '#FFFF00',
        surfaceGravity: 17.1 //m/s^2,
      },
      "Kerbin" : {
        id: 1,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.KERBIN,
        atmosphericRadius: 70000,
        color: '#4a5472',
        surfaceGravity: 9.81 //m/s^2
      },
      "Mun" : {
        id: 2,
        referenceBodyName: "Kerbin",
        mapBody: L.KSP.CelestialBody.MUN,
        atmosphericRadius: 0,
        color: '#e2e0d7',
        surfaceGravity: 1.63 //m/s^2
      },
      "Minmus" : {
        id: 3,
        referenceBodyName: "Kerbin",
        mapBody: L.KSP.CelestialBody.MINMUS,
        color: '#98f2c5',
        atmosphericRadius: 0,
        surfaceGravity: 0.491 //m/s^2
      },
      "Moho" : {
        id: 4,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.MOHO,
        atmosphericRadius: 0,
        color: '#fdc39e',
        surfaceGravity: 2.70 //m/s^2
      },
      "Eve" : {
        id: 5,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.EVE,
        atmosphericRadius: 90000,
        color: '#c394fe',
        surfaceGravity: 16.7 //m/s^2
      },
      "Duna" : {
        id: 6,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.DUNA,
        atmosphericRadius: 50000,
        color: '#fc5e49',
        surfaceGravity: 2.94 //m/s^2
      },
      "Ike" : {
        id: 7,
        referenceBodyName: "Duna",
        mapBody: L.KSP.CelestialBody.IKE,
        atmosphericRadius: 0,
        color: '#e2e0d7',
        surfaceGravity: 1.10 //m/s^2
      },
      "Jool" : {
        id: 8,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.JOOL,
        atmosphericRadius: 200000,
        color: '#C5DCAB',
        surfaceGravity: 7.85 //m/s^2
      },
      "Laythe" : {
        id: 9,
        referenceBodyName: "Jool",
        mapBody: L.KSP.CelestialBody.LAYTHE,
        atmosphericRadius: 50000,
        color: '#a8b4fe',
        surfaceGravity: 7.85 //m/s^2
      },
      "Vall" : {
        id: 10,
        referenceBodyName: "Jool",
        mapBody: L.KSP.CelestialBody.VALL,
        atmosphericRadius: 0,
        color: '#b0f4fe',
        surfaceGravity: 2.31 //m/s^2
      },
      "Bop" : {
        id: 11,
        referenceBodyName: "Jool",
        mapBody: L.KSP.CelestialBody.BOP,
        atmosphericRadius: 0,
        color: '#c64605',
        surfaceGravity: 0.589 //m/s^2
      },
      "Tylo" : {
        id: 12,
        referenceBodyName: "Jool",
        mapBody: L.KSP.CelestialBody.TYLO,
        atmosphericRadius: 0,
        color: '#fdf7ed',
        surfaceGravity: 7.85 //m/s^2
      },
      "Gilly" : {
        id: 13,
        referenceBodyName: "Eve",
        mapBody: L.KSP.CelestialBody.GILLY,
        atmosphericRadius: 0,
        color: '#fdcbb1',
        surfaceGravity: 0.049 //m/s^2
      },
      "Pol" : {
        id: 14,
        referenceBodyName: "Pol",
        mapBody: L.KSP.CelestialBody.POL,
        atmosphericRadius: 0,
        color: '#fec681',
        surfaceGravity: 0.373 //m/s^2
      },
      "Dres" : {
        id: 15,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.DRES,
        atmosphericRadius: 0,
        color: '#fef8f9',
        surfaceGravity: 1.13 //m/s^2
      },
      "Eeloo" : {
        id: 16,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.EELOO,
        atmosphericRadius: 0,
        color: '#e5fafe',
        surfaceGravity: 1.69 //m/s^2
      }
    }
  }
})
var TitleBar = Class.create({
  initialize: function(datalink, title_bar_id){
    this.datalink = datalink
    this.title_bar_id = title_bar_id
    this.title_bar = $(this.title_bar_id)
    this.initializeLOSNotifier()
    this.initializeDatalink()
  },

  update: function(data){
    window.requestAnimationFrame(function(){
      this.title_bar.down("#world-clock").update(TimeFormatters.formatUT(data["t.universalTime"]))
      this.title_bar.down("#mission-time").update(TimeFormatters.formatMET(data["v.missionTime"]))

      this.title_bar.down("#mission-time").removeClassName("loss-of-signal")
    }.bind(this))
  },

  initializeLOSNotifier:function(){
    document.observe('telemachus:loss-of-signal', function(){
      window.requestAnimationFrame(function(){
        this.title_bar.down("#mission-time").update("&#9888; LOS &#9888;")
        this.title_bar.down("#mission-time").addClassName("loss-of-signal")
      }.bind(this))
    }.bind(this))
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      't.timeWarp', 't.universalTime', 'v.missionTime'
    ])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})
var ButtonIndicator = Class.create({
  initialize: function(datalink, indicatorId, apiButtonString){
    this.datalink = datalink
    this.indicatorId = indicatorId
    this.indicator = $(this.indicatorId)
    this.apiButtonString = apiButtonString
    this.initializeDatalink()
  },

  update: function(data){
    if(data[this.apiButtonString] == true){
      this.indicator.addClassName("on")
    } else{
      this.indicator.removeClassName("on")
    }
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([this.apiButtonString])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})
var ReadoutTable = Class.create({
  initialize: function(datalink, tableId, dataRows){
    this.datalink = datalink
    this.tableId = tableId
    this.table = $(this.tableId)
    this.dataRows = dataRows
    this.initializeDatalink()
  },

  update: function(data){
    window.requestAnimationFrame(function(){
      this.dataRows.forEach(function(row){
        var rowId = row.label
        var tableRow = this.table.down("tr[data-label='"+ rowId +"']")

        if(!tableRow){
          var tableRow = new Element("tr", {
            "data-label" : rowId
          })

          tableRow.insert("<th>" + row.label + "</th><td></td>")
          this.table.insert(tableRow)
        }

        tableRow.down("td").update(row.formatter(data[row.value]))
      }.bind(this))
    }.bind(this))
  },

  initializeDatalink: function(){
    var dataValues = this.dataRows.map(function(dataRow){
      return dataRow.value
    })

    this.datalink.subscribeToData(dataValues)

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})
var ResourceMonitor = Class.create({
  initialize: function(datalink, resourceName, options){
    this.datalink = datalink
    this.resourceName = resourceName
    this.options = Object.extend({
      currentStageProgressBar: null,
      totalProgressBar: null,
      valuePrefix: null
    }, options)

    this.resourceStrings = this.buildResourceStrings()

    this.initializeDatalink()
  },

  update: function(data){
    window.requestAnimationFrame(function(){
      if(this.options.totalProgressBar){
        this.options.totalProgressBar.value = data[this.resourceStrings.totalAvailable]
        this.options.totalProgressBar.max = data[this.resourceStrings.totalMax]
      }

      if(this.options.currentStageProgressBar){
        this.options.currentStageProgressBar.value = data[this.resourceStrings.currentStageAvailable]
        this.options.currentStageProgressBar.max = data[this.resourceStrings.currentStageMax]
      }

      this.updateValue("-total-value", data[this.resourceStrings.totalAvailable])
      this.updateValue("-total-max", data[this.resourceStrings.totalMax])

      this.updateValue("-current-stage-value", data[this.resourceStrings.currentStageAvailable])
      this.updateValue("-current-stage-max", data[this.resourceStrings.currentStageMax])
    }.bind(this))
  },

  updateValue: function(id, value){
    if($(this.options.valuePrefix + id)){
      if(value < 0){
        $(this.options.valuePrefix + id).update("NA")
      } else{
        $(this.options.valuePrefix + id).update(value.toFixed(2))
      }
    }
  },

  buildResourceStrings: function(){
    return {
      totalAvailable: "r.resource["+ this.resourceName +"]",
      totalMax: "r.resourceMax["+ this.resourceName +"]",
      currentStageAvailable: "r.resourceCurrent["+ this.resourceName +"]",
      currentStageMax: "r.resourceCurrentMax["+ this.resourceName +"]",
    }
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      this.resourceStrings.totalAvailable,
      this.resourceStrings.totalMax,
      this.resourceStrings.currentStageAvailable,
      this.resourceStrings.currentStageMax
    ])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})
var DataTable = Class.create({
  initialize: function(tableID, dataRows){
    this.tableID = tableID
    this.table = $(this.tableID)
    this.dataRows = dataRows
  },

  update: function(){
    window.requestAnimationFrame(function(){
      this.dataRows.forEach(function(row){
        var rowId = row.label
        var tableRow = this.table.down("tr[data-label='"+ rowId +"']")

        if(!tableRow){
          var tableRow = new Element("tr", {
            "data-label" : rowId
          })

          tableRow.insert("<th>" + row.label + "</th><td></td>")
          this.table.insert(tableRow)
        }

        tableRow.down("td").update(row.value)
      }.bind(this))
    }.bind(this))
  },

  clear: function(){
    window.requestAnimationFrame(function(){
      this.dataRows = []
      this.table.innerHTML = ""
    }.bind(this))
  }
})
var AtmosphericDensityGauge = Class.create({
  initialize: function(datalink, gaugeID){
    this.datalink = datalink
    this.gaugeID = gaugeID
    this.gauge = $(this.gaugeID)
    this.initializeDatalink()
    this.func = function(x){return Math.log(2.0 * x)}
  },

  update: function(data){
    var max = this.func(100)
    var value = this.func(data['v.atmosphericPressure'] * 100)
    console.log(value)
    this.gauge.value = value
    this.gauge.max = max
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['v.atmosphericPressure'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})
var ThrottleGauge = Class.create({
  initialize: function(datalink, gaugeID){
    this.datalink = datalink
    this.gaugeID = gaugeID
    this.gauge = $(this.gaugeID)
    this.initializeDatalink()
  },

  update: function(data){
    this.gauge.value = data['f.throttle'] * 100
    this.gauge.max = 100
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['f.throttle'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})
/*
 Graticule plugin for Leaflet powered maps.
*/
L.Graticule = L.GeoJSON.extend({

    options: {
        style: {
            color: '#333',
            weight: 1
        },
        interval: 20
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
        this._layers = {};

        if (this.options.sphere) {
            this.addData(this._getFrame());
        } else {
            this.addData(this._getGraticule());
        }
    },

    _getFrame: function() {
        return { "type": "Polygon",
          "coordinates": [
              this._getMeridian(-180).concat(this._getMeridian(180).reverse())
          ]
        };
    },

    _getGraticule: function () {
        var features = [], interval = this.options.interval;

        // Meridians
        for (var lng = 0; lng <= 180; lng = lng + interval) {
            features.push(this._getFeature(this._getMeridian(lng), {
                "name": (lng) ? lng.toString() + "° E" : "Prime meridian"
            }));
            if (lng !== 0) {
                features.push(this._getFeature(this._getMeridian(-lng), {
                    "name": lng.toString() + "° W"
                }));
            }
        }

        // Parallels
        for (var lat = 0; lat <= 90; lat = lat + interval) {
            features.push(this._getFeature(this._getParallel(lat), {
                "name": (lat) ? lat.toString() + "° N" : "Equator"
            }));
            if (lat !== 0) {
                features.push(this._getFeature(this._getParallel(-lat), {
                    "name": lat.toString() + "° S"
                }));
            }
        }

        return {
            "type": "FeatureCollection",
            "features": features
        };
    },

    _getMeridian: function (lng) {
        lng = this._lngFix(lng);
        var coords = [];
        for (var lat = -90; lat <= 90; lat++) {
            coords.push([lng, lat]);
        }
        return coords;
    },

    _getParallel: function (lat) {
        var coords = [];
        for (var lng = -180; lng <= 180; lng++) {
            coords.push([this._lngFix(lng), lat]);
        }
        return coords;
    },

    _getFeature: function (coords, prop) {
        return {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": coords
            },
            "properties": prop
        };
    },

    _lngFix: function (lng) {
        if (lng >= 180) return 179.999999;
        if (lng <= -180) return -179.999999;
        return lng;
    }

});

L.graticule = function (options) {
    return new L.Graticule(options);
};
var PositionMap = Class.create({
  initialize: function(datalink, mapId, options){
    this.datalink = datalink
    this.mapId = mapId
    this.noMapIndicatorId = (mapId + '-no-map')
    this.previousBody = "KERBIN"
    this.options = Object.extend({
      lockOnVessel: true
    }, options)
    this.initializeMap()
    this.initializeNoMapIndicator()
    this.initializeDatalink()
  },

  update: function(data){
    window.requestAnimationFrame(function(){
      if(this.isMapAvailable(data)){
        this.showMap()
        this.updateBodyIfNecessary(data)
        this.setCoordinatesForMapObject(this.coordinates, data['v.lat'], data['v.long'])
        if(this.options.lockOnVessel){
          this.map.panTo([data['v.lat'], data['v.long']])
        }
      } else{
        this.hideMap()
      }
    }.bind(this))
  },

  updateBodyIfNecessary: function(data){
    var bodyName = data['v.body'].toUpperCase()
    if(this.previousBody != bodyName){
      newBody = L.KSP.CelestialBody[bodyName];
      newBody.addTo(this.map);
      this.previousBody = bodyName;
    }
  },

  initializeMap: function(){
    this.map = new L.KSP.Map(this.mapId, {
      layers: [L.KSP.CelestialBody[this.previousBody.toUpperCase()]],
      zoom: 'fit',
      bodyControl: false,
      layerControl: true,
      scaleControl: true
    })

    this.map.fitWorld()

    L.graticule().addTo(this.map)

    var circleMarkerOptions = {
      // fill: false,
      color: '#FD7E23',
      opacity: 1.0,
      fillOpacity: 1.0,
      radius: 5
    }

    this.coordinates = L.circleMarker([0, 0], circleMarkerOptions)
    this.coordinates.addTo(this.map)
  },

  convertCoordinatesToMap: function(latitude, longitude){
    return [latitude, longitude > 180 ? longitude - 360 : longitude]
  },

  setCoordinatesForMapObject: function(object, latitude, longitude){
    var convertedCoordinates = this.convertCoordinatesToMap(latitude, longitude)
    object.setLatLng([convertedCoordinates[0], convertedCoordinates[1]])
  },

  isMapAvailable: function(data){
    return data['v.body'].toUpperCase() != "SUN"
  },

  hideMap: function(){
    $(this.mapId).hide()
    this.noMapIndicator.removeClassName("hidden")
  },

  showMap: function(){
    $(this.mapId).show()
    this.noMapIndicator.addClassName("hidden")
  },

  initializeNoMapIndicator: function(){
    this.noMapIndicator = $(this.noMapIndicatorId)
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['v.lat', 'v.long', 'v.body'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  }
})
var OrbitingBodyInfoTable = Class.create({
  initialize: function(datalink, tableId, options){
    this.datalink = datalink
    this.tableId = tableId
    this.currentBody = null
    this.currentBodyId = null

    this.initializeTable()
    this.initializeDatalink()
  },

  update: function(data){
    if(this.bodyChanged(data)){
      this.updateReadoutTableRows(data)
    }
  },

  propertyForBody: function(property){
    return "b." + property + "[" + this.currentBodyId + "]"
  },

  updateReadoutTableRows: function(data){
    this.currentBody = data['v.body']
    this.currentBodyId = this.datalink.getOrbitalBodyInfo(this.currentBody).id

    var newTableRows = [
      {
        label: "Name",
        value: this.propertyForBody('name'),
        formatter: function(value){ return value }
      },
      {
        label: "Radius",
        value: this.propertyForBody('radius'),
        formatter: function(value){ return DataFormatters.distanceString(value) }
      },
      {
        label: "Atmosphere Contains O2?",
        value: this.propertyForBody('atmosphereContainsOxygen'),
        formatter: function(value){ return value }
      },
      {
        label: "Sphere of Influence",
        value: this.propertyForBody('soi'),
        formatter: function(value){ return value }
      },
      {
        label: "Max Atmospheric Density",
        value: this.propertyForBody('maxAtmosphere'),
        formatter: function(value){ return value }
      },
      {
        label: "Tidally Locked?",
        value: this.propertyForBody('tidallyLocked'),
        formatter: function(value){ return value }
      },
      {
        label: "GravitationalParameter",
        value: this.propertyForBody('o.gravParameter'),
        formatter: function(value){ return value }
      },
      {
        label: "Body's Relative Velocity",
        value: this.propertyForBody('o.relativeVelocity'),
        formatter: function(value){ return DataFormatters.velocityString(value) }
      },

      {
        label: "Apoapsis",
        value: this.propertyForBody('o.ApA'),
        formatter: function(value){ return DataFormatters.distanceString(value) }
      },
      {
        label: "Periapsis",
        value: this.propertyForBody('o.PeA'),
        formatter: function(value){ return DataFormatters.distanceString(value) }
      },
      {
        label: "Time to Apoapsis",
        value: this.propertyForBody('o.timeToAp'),
        formatter: function(value){ return "-" + TimeFormatters.durationString(value) }
      },
      {
        label: "Time to Periapsis",
        value: this.propertyForBody('o.timeToPe'),
        formatter: function(value){ return "-" + TimeFormatters.durationString(value) }
      },
      {
        label: "Inclination",
        value: this.propertyForBody('o.inclination'),
        formatter: function(value){ return DataFormatters.degreeString(value) }
      },
      {
        label: "Eccentricity",
        value: this.propertyForBody('o.eccentricity'),
        formatter: function(value){ return value.toFixed(3) }
      },
      {
        label: "Orbital Period",
        value: this.propertyForBody('o.period'),
        formatter: function(value){ return TimeFormatters.durationString(value) }
      },
      {
        label: "True Anomaly",
        value: this.propertyForBody('o.trueAnomaly'),
        formatter: function(value){ return DataFormatters.degreeString(value) }
      },
    ]

    var fieldsToSubscribeTo = newTableRows.map(function(newTableRow){
      return newTableRow.value
    })

    this.datalink.subscribeToData(fieldsToSubscribeTo)

    this.table.dataRows = newTableRows
  },

  bodyChanged: function(data){
    return this.currentBody != data['v.body']
  },

  initializeTable: function(){
    this.table = new ReadoutTable(datalink, this.tableId, [])
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['v.body'])
    this.datalink.addReceiverFunction(this.update.bind(this))
  }
})