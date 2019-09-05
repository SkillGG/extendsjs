/***
	Small handy set of functions to improve visibility of code :P
	Coded by: SkillGG
	VERSION: 1.9
*/

// Returns last item of the array
Array.prototype.getLastItem = function() {
	return this[this.length-1] || null;
};
// Sets last item of the array to given value
Array.prototype.setLastItem = function(value) {
	return (this[this.indexOf(this.getLastItem())] = value);
};
// Deletes last item of the array
Array.prototype.unsetLastItem = function() {
	return this.unsetItem(this.indexOf(this.getLastItem()));
};
// Deletes matching `object` by attributes.
Array.prototype.unsetMatchingItemA = function(match){
	let i;
	if(i = this.getFirstMatchingObjectA(match)){
		return this.unsetItem(this.indexOf(i));
	}
}
// Deletes matching `object` by attributes and values
Array.prototype.unsetMatchingItemV = function(match){
	let i;
	if(i = this.getFirstMatchingObjectV(match)){
		return this.unsetItem(this.indexOf(i));
	}
}
// Deletes item with given index (short for this.splice(x,1))
Array.prototype.unsetItem = function(index){
	if(index === -1)
		return null;
	return this.splice(index, 1)[0];
}
// Returns all `objects` from array that share same atributes.
Array.prototype.getAllMatchingObjectsA = function(match){
	if(!((match === Object(match))&& 	// Check if is an object
		typeof match !== 'function'))	// exclude functions
		return null;
	let r = [];
	this.forEach((e)=>{
		let eMatch = [];
		if(	(e === Object(e))&& 		// Check if is an object
			typeof e !== 'function'&& 	// exclude functions
			!Array.isArray(e)){			// exclude arrays
				let matchAttrs = [];
				if(Array.isArray(match))
					matchAttrs = match;	
				else 
					Object.entries(match).forEach((z)=>{matchAttrs.push(z[0])});
				let fail = false;
				matchAttrs.forEach((x)=>{
					if(!(e[x])){
						fail = true;
						return;
					}
				});
				if(fail)
					return;
				else r.push(e);
		}
	});
	return (r||[]).length > 0?(r||null):null;
}
// C# LINQ's Array.Find(cb, value)
// returns array of items that return true when parsed through func f
Array.prototype.where = function(f) {
	let ret = [];
	this.forEach(e=>{if(f(e))ret.push(e);});
	return ret;
};
// .where() that makes available multi-purpose checking functions
Array.prototype.valuedWhere = function(f, v){
let ret = [];
	this.forEach(e=>{if(f(e,v))ret.push(e);});
	return ret;
};
// Returns last `object` from array that share same atributes.
Array.prototype.getLastMatchingObjectA = function(match){
	if(!((match === Object(match))&& 	// Check if is an object
		typeof match !== 'function'))	// exclude functions
		return null;
	let r;
	this.forEach((e)=>{
		let eMatch = [];
		if(	(e === Object(e))&& 		// Check if is an object
			typeof e !== 'function'&& 	// exclude functions
			!Array.isArray(e)){			// exclude arrays
				let matchAttrs = [];
				if(Array.isArray(match))
					matchAttrs = match;	
				else 
					Object.entries(match).forEach((z)=>{matchAttrs.push(z[0])});
				let fail = false;
				matchAttrs.forEach((x)=>{
					if(!(e[x])){
						fail = true;
						return;
					}
				});
				if(fail)
					return;
				else r = e;
		}
	});
	return r || null;
}
// Pushes to array if there is no same element
Array.prototype.pushIfNot = function(el)
{
	if(this.indexOf(el) !== -1){
		return false;
	}
	else if(this.getFirstMatchingObjectV(el)){
		return false;
	}
	this.push(el);
	return true;
}
// Pushes to array. If there is already an element it changes its value instead of doubling it.
Array.prototype.pushIfNotChange = function(el){
	if(this.indexOf(el) !== -1){
		this[this.indexOf(el)] = el;
		return true
	}
	else if(this.getFirstMatchingObjectA(el)){
		let z = this.getFirstMatchingObjectA(el);
		this[this.indexOf(z)] = el;
		return true

	}
	else{
		this.push(el);
	}
}
// Returns firt macthing `object` by attributes
Array.prototype.getFirstMatchingObjectA = function(match){
	if(!((match === Object(match))&& 	// Check if is an object
		typeof match !== 'function'))	// exclude functions
		return null;
	let r;
	this.forEach((e)=>{
		if(!r){
			let eMatch = [];
			if(	(e === Object(e))&& 		// Check if is an object
				typeof e !== 'function'&& 	// exclude functions
				!Array.isArray(e)){			// exclude arrays
					let matchAttrs = [];
					if(Array.isArray(match))
						matchAttrs = match;	
					else 
						Object.entries(match).forEach((z)=>{matchAttrs.push(z[0])});
					let fail = false;
					matchAttrs.forEach((x)=>{
						if(!(e[x])){
							fail = true;
							return;
						}
					});
					if(fail)
						return;
					else r = e;
			}
		}
	});
	return r || null;
}
// Returns all `objects` matching by attributes and their values.
Array.prototype.getAllMatchingObjectsV = function(match){
	if(!((match === Object(match))&& 	// Check if is an object
		typeof match !== 'function'))	// exclude functions
		return null;
	let r = [];
	this.forEach((e)=>{
		let eMatch = [];
		if(	(e === Object(e))&& 		// Check if is an object
			typeof e !== 'function'&& 	// exclude functions
			!Array.isArray(e)){			// exclude arrays
				let matchAttrs = [];
				if(Array.isArray(match))
					return;
				else 
					Object.entries(match).forEach((z)=>{matchAttrs.push({n:z[0],v:z[1]})});
				let fail = false;
				matchAttrs.forEach((x)=>{
					if(!(e[x.n]) || (e[x.n] !== x.v)){
						fail = true;
						return;
					}
				});
				if(fail)
					return;
				else r.push(e);
		}
	});
	return (r||[]).length > 0?(r||null):null;
}
// Returns first object from getAllMatchingObjectsV
Array.prototype.getFirstMatchingObjectV = function(match){
	return (r = (this.getAllMatchingObjectsV(match) ) )?r[0]?r[0]:null:null;
}
// Returns last object from getAllMatchingObjectsV
Array.prototype.getLastMatchingObjectV = function(match){
	return (r = (this.getAllMatchingObjectsV(match) ) )?r.getLastItem()?r.getLastItem():null:null;
}
// Chainable changing of id attribute. If no value specified returns that attribute.
Element.prototype.ID = function(value){
	if(!value)
		return this.id;
	else
		this.id = value;
	return this;
}
// Chainable changing of attribute. If no value specified returns that attribute.
Element.prototype.Attr = function(name, value){
	if(!value)
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
	if(!value)
		return this.innerHTML;
	else
		this.innerHTML = value;
	return this;
}
// Chainable changing of innerText. If no value specified returns its innerText.
Element.prototype.Text = function(value){
	if(!value)
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
Element.prototype.cssText = function(v){
	if(!v) return this.style.cssText;
	this.style.cssText = v;
	return this;
}
// It changes text into regular Expression.
RegExp.toRegExp = function(text){
	return new RegExp(text.replace(/([\\\/$^.])/g, `\\$1`));
}
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
Exts.element = (tag, d)=>{
	return (d || document).createElement(tag);
}
// document.createElement("div") shortcut
Exts.DIV = ()=>{
	return Exts.element("div");
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
