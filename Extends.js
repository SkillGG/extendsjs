/***
	Small handy set of functions to improve visibility of code :P
	Coded by: SkillGG
	VERSION: 1.10
*/

// Checks if number is even
Number.isEven = (x)=>(parseInt(x) || 0)%2===0?true:false;
// Returns last item of the array
Array.prototype.getLastItem = function() { return this[this.length-1] || null; };
// Sets last item of the array to given value
Array.prototype.setLastItem = function(value) { return (this[this.indexOf(this.getLastItem())] = value); };
// Deletes last item of the array
Array.prototype.unsetLastItem = function() { return this.unsetItem(this.indexOf(this.getLastItem())); };
// Deletes item with given index (short for this.splice(x,1))
Array.prototype.unsetItem = function(index){
	if(index === -1)
		return null;
	return this.splice(index, 1)[0];
}
// C# LINQ's Array.Find(cb, value)
// returns array of items that return true when parsed through func f
Array.prototype.where = function(f) {
	if(typeof f !== "function") return null;
	let ret = [];
	this.forEach(e=>{if(f(e))ret.push(e);});
	return ret;
};
// Deletes all items from the array
// returns array of all deleted elements
Array.prototype.clear = function() { return this.splice(0, this.length); };
// Does d(e) on each element in array that successfully passes f(e) test (returns true value)
Array.prototype.doWhere = function(f, d) {
	if(typeof f !== "function" || typeof d !== "function") return;
	this.forEach(e=>{if(f(e)){d(e)}});
}
// First from .where
// returns first item that returns true when parsed through func f
Array.prototype.whereOne = function(f) { return this.where(f)[0] || null; };
// .where() that makes available multi-purpose checking functions
Array.prototype.valuedWhere = function(f, v){
	if(typeof f !== "function") return null;
	let ret = [];
	this.forEach((e,i,a)=>{
		if(typeof v === "string"){
			v=v==="$a"?a:v;
			v=v==="$e"?e:v;
			if(f(e,v.replace(/\${2}/g, " ").replace(/\$i/gi, i).replace(/ /g,"$"))) ret.push(e);
		}
		else
			if(f(e,v)) ret.push(e);
	});
	return ret;
};
// Pushes to array if there is no same element
Array.prototype.pushIfNot = function(el) {
	if(this.indexOf(el) !== -1){
		return false;
	}
	//else if(/* TODO: Check for attributes and values */) return false;
	this.push(el);
	return true;
}
// Pushes to array. If there is already an element it changes its value instead of doubling it.
Array.prototype.pushIfNotChange = function(el) {
	if(this.indexOf(el) !== -1){		// if object exists
		this[this.indexOf(el)] = el;	// change
		return true;
	}
	//else if(/* TODO: Check for attributes and values */){		// if object with more/less attributes, but same values
		// TODO: 
	//}
	else this.push(el); // push
}
// Chainable changing of id attribute. If no value specified returns that attribute.
Element.prototype.ID = function(value){
	if(value === undefined)
		return this.id;
	else
		this.id = value;
	return this;
}
// Chainable changing of attribute. If no value specified returns that attribute.
Element.prototype.Attr = function(name, value){
	if(value === undefined)
		return this.getAttribute(name);
	else
		this.setAttribute(name, value);
	return this;
}
// Clears inside of given element. It deletes every attribute except for id and classes!
// Becuase it clears by replacing it returns new item, which is now showed in DOM.
Element.prototype.clear = function(){
	let change = document.createElement(this.tagName);
	this.classList.forEach(e=>change.addClasses(e));
	change.id = this.id;
	this.replaceWith(change);
	return change;
};
// Chainable changing of innerHTML. If no value specified returns its innerHTML.
Element.prototype.HTML = function(value){
	if(value === undefined)
		return this.innerHTML;
	else
		this.innerHTML = value;
	return this;
}
// Chainable changing of innerText. If no value specified returns its innerText.
Element.prototype.Text = function(value){
	if(value === undefined)
		return this.innerText;
	else
		this.innerText = value;
	return this;
}
// It removes all attributes. If saveID specified it does not delete id, same with saveClasses.
Element.prototype.removeAllAttributes = function(saveID, saveClasses){
	Array.from(this.attributes).forEach((e,i,a)=>{
		if(/id/i.test(e.nodeName)){
			if(!saveID)
				this.attributes.removeNamedItem(e.nodeName);
		}
		if(/class/i.test(e.nodeName)){
			if(!saveClasses)
				this.attributes.removeNamedItem(e.nodeName);
		}
	});
	return this;
}
// It adds given classes to item.
Element.prototype.addClasses = function(...c){
	c.forEach(e=>this.classList.add(e));
	return this;
}
// It deletes every class from element
Element.prototype.clearClass = function(){
	while(this.classList.length > 0)
		this.classList.remove(this.classList.item(0));
	return this;
}
// It makes classes of element equal given classes.
Element.prototype.classEqual = function(...c){
	this.clearClass();
	c.forEach(e=>this.addClasses(e));
	return this;
}
// Chainable changing of style.cssText. If no value specified returns its style.cssText.
Element.prototype.cssText = function(value){
	if(value === undefined) return this.style.cssText;
	this.style.cssText = value;
	return this;
}
// Add new css rules after current cssText
Element.prototype.addCSS = function(...v) {
	v.forEach(e=>{
		if(typeof e === "string"){
			this.cssText(`${this.cssText()}\n${e};`);
		}
	});
	return this;
};
// It changes text into regular Expression.
RegExp.toRegExp = function(text){ return new RegExp(text.replace(/([\\\/$^.])/g, `\\$1`)); }
// It concatenates all regexes into one with given flag.
RegExp.concat = function (flags, ...regexs){
	let srcs = "";
	for(r in regexs){
		if(typeof regexs[r] === 'object'){
			srcs += regexs[r].source;
		}
		else if(typeof regexs[r] === 'string'){
			srcs += regexs[r];
		}
	}
	let rex = new RegExp(srcs, flags);
	// console.log(rex);
	return rex;
}

let Exts = {};
// document.createElement shortcut
Exts.element = (tag, d)=>{ return (d || document).createElement(tag); }
// document.createElement("div") shortcut
Exts.DIV = (d)=>{ return Exts.element("div", d); }
// returns div with vertically aligned text
/*
	args: {
		css: {
			inn: ``,	// innerCSS
			out: ``		// outer CSS
		}
	}
	r:{
		outer:null,		//outside (horiz. align) box
		inner:null, 	//inner (vertical align) box
		// FUNCS
		Text: inner.Text, HTML: outer.HTML, innerHTML: inner.HTML
	}
*/
Exts.v_alignDIV = (css)=>{
	let outDIV = Exts.DIV();
	let innDIV = Exts.DIV();
	outDIV.append(innDIV);
	outDIV.cssText(`display: table; text-align: center;`);
	innDIV.cssText(`display: table-cell; vertical-align: middle;`);
	if(css)
		if(css.out)
			outDIV.addCSS(css.out);
		else if(css.inn)
			innDIV.addCSS(css.inn);
	return {
		element: outDIV || null,
		outer: outDIV || null,
		inner: innDIV || null,
		Text: function($){return $?innDIV.Text($):this;},
		HTML: function($){return $?outDIV.HTML($):this;},
		innerHTML: function($){return $?innDIV.HTML($):this;}
	};
}
// `document.createElement("input");input.type=type;input.placeholder=pholder;` shortcut
Exts.INPUT = (type, pholder)=>{
	let r = Exts.element("input")
	r.type = type;
	r.placeholder = pholder;
	return r;
}
// `document.createElement("input");input.type="button";input.value=value;` shortcut
Exts.INPUTBTN = (value)=>{
	let b = Exts.element("input")
	b.type = 'button';
	b.value = value;
	return b;
}