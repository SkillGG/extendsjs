# ExtendsJS

ExtendsJS is a file with compact functions that allow more easy DOMElement modification, Array manipulation, RegExp handling and some small additions.

## Contents

### Added functions (non-prototype)


#### Number.isEven
>__Number.isEven(number)__

###### Arguments
- *number*:	value to check

*Returns*:
- *`true`* 		if number is even or `NaN` (0)
- *`false`* 	if number is odd

```javasctipt
Number.isEven(1);			// false
Number.isEven(2);			// true
Number.isEven("3");			// false
Number.isEven("a");			// true ("a" is NaN = 0)
Number.isEven(NaN);			// true (NaN = 0)
```

---

### Array.prototype functions

#### getLastItem
>__Array.prototype.getLastItem()__

Returns last element from array (`arr[arr.length-1]`). If not present returns `null`.

*Returns*:
- *`null`*		if there is no last element (e.g. array is empty)
- last *`Object`* in Array

```javasctipt
[3,4,5].getLastItem();		// returns 5
[].getLastItem();		// returns null
```


#### setLastItem
>__Array.prototype.setLastItem( value )__

###### Arguments
- *value*:	value to be set to the last element.

It sets value to last existing element of an array. (`array[indexOfLastItem] = value`)

*Function does not return any value.*

```javasctipt
q = ["a","b","c"];
q.setLastItem("d");	// q = ["a", "b", "d"];
```

#### unsetItem
>__Array.prototype.unsetItem(i)__

###### Arguments
- *i*:	index of element to unset.

It unsets(deletes) elemenent with given index (`array[i]`). (Essentially `.splice(i,1)`);

*Returns*:
- unseted element.

```javasctipt
q = ["a","b",3];
r = q.unsetItem(1);	// q = ["a",3]; r = "b";
```

#### unsetLastItem
>__Array.prototype.unsetLastItem()__

It unsets (deletes) last element.

*Returns*:
- unseted element.

```javasctipt
q = ["a","b",3];
r = q.unsetLastItem();	// q = ["a","b"]; r = 3;
```

#### clear
>__Array.protorype.clear()__

It removes every element from array.

*Returns*:
- *`Array`* containing every deleted element.

```javasctipt
q = [1,2,3];
q.x = "2";
copy = q.clear();	// copy = [1,2,3]; q = []; q.x = "2";
```

#### where
>__Array.prototype.where(func&lt;el&gt;)__

###### Arguments
- *func*:	`function` that defines the conditions of the element to search for.

###### *func* arguments:
- *el*:		element to check

It returns every element that given to *func* as an argument returns *true*.

*Returns*:
- *`array`* of elements for whom `func(el)` returned *true*.
- empty *`array`* if none elements found

```javasctipt
		// function that returns true if argument.i === 1
IDEquals1 = function(x){ if(x.i===1) return true; return false;};
q = [{i:1, n:"a"}, {i:2, g:0}, {i:3}];
q.where(IDEquals1);				// returns [{i:1, n:"a"}]
		// where element has not setted g parameter
q.where(e=>e.g===undefined);	// returns [{i:1, n:"a"},{i:3}]
```

#### doWhere
>__Array.prototype.doWhere(func&lt;el&gt;, do&lt;el&gt;)__

###### Arguments
- *func*: 	`function` that defines the conditions of the element to search for. Should return *true* or *false*
- *do*:		`function`(method) that takes one argument.

###### *func* arguments:
- *el*:		element to check

###### *do* arguments:
- *el*:		element that has been checked

It invokes *do* with elements that *func* returned *true* when invoked.

*Function does not return any value.*

```javasctipt
q = [{id:1,message:"one"},{id:2,message:"two"},{id:3,message:"three"}];
	// console.log `message` from each element that has id not equal 1
q.doWhere(e=>e.id!==1,e=>console.log(e.message));
/*
results in console:
"two"
"three"
*/
```

#### whereOne
>__Array.prototype.whereOne(func&lt;el&gt;)__

###### Arguments
- *func*: 	`function` that defines the conditions of the element to search for.

###### *func* arguments:
- *el*:		element to check

It returns first element that given to *func* as an argument returns *true*.

*Returns*:
- first element for whom `func(el)` returned *true*.
- *`null`* if none elements found

```javasctipt
q = [{id:1, id2:0}, {id:1, id2:1}, {id:3}]
q.whereOne(e=>e.id===1);	// returns {id:1, id2:0}
```

#### valuedWhere
>__Array.prototype.valuedWhere(func&lt;el, val&gt;, value)__

###### Arguments
- *func*:	`function` that defines the conditions of the element to search for.
- *value*:	an object that is feed to *func* as a second argument.

###### *func* arguments:
- *el*:		element to check
- *val*:		parsed *value*

It returns every element that given to *func* with parsed *value* as an argument returns *true*.

Parsed *value* is *value* that has been specially parsed. If *value* is an object then it is passed as is.

*value* parsing:
- If *value* is an string each `$i` in string is replaced with an index of checking element (to escape $ sign use `$$`).
- If *value* equals `'$a'` then second argument will be whole array.

*Returns*:
- *`array`* of elements that given to *func* with parsed *value* returned *true*.
- empty *`array`* if none elements found.

```javasctipt
q = [{id:3, m:"three"}, {id:1, m:"one"}, {id:2, m:"two"}, {id:0, m:"zero"}]
	// return each that has id same as index in an array
q.valuedWhere((e,v)=>parseInt(v)===e.id,"$i");	// returns [{id:1, m:"one"},{id:2, m:"two"}]
```

---
### Not fully implemented Array.prototype functions:

#### pushIfNot
>__Array.prototype.pushIfNot(func&lt;check,add&gt;, obj)__

###### Arguments
- *func*:		`function` to check if element already matches.
- *obj*:		object to push.

###### *func* arguments:
- *check*:		checking object (currently)
- *add*:		*obj*

If there is no element that returns *true* while being given as argument to *func* than *obj* is pushed to array.

*Returns*:
- *`true`*		if object has been pushed
- *`false`*		if object has not been pushed

````javasctipt
q = [{a:1, b:2}, {a:2, b:1}, {a:1, b:1}];
q.pushIfNot((c,a)=>(c.a === a.a && c.b === a.b)?true:false, {a:2, b:2})
````

#### pushIfNotChange
>Array.prototype.pushIfNotChange(func<check,add>, obj)

###### Arguments
- *func*:	`function` to check if element already matches. Function takes two arguments, checking object and adding object
- *obj*:	object to push/change

###### *func* arguments:
- *check*:		checking object (currently)
- *add*:		*obj*

If *func* returns *true* then found element is substituted with *obj*
If there is no element that returns *true* while being given as argument to *obj* than *obj* is pushed to array.

*Returns*:
- *`true`*		if object has been pushed
- *`false`*		if object has not been pushed

````javasctipt
q = [{a:1, b:2}, {a:2, b:1}, {a:1, b:1}];
q.pushIfNot((c,a)=>(c.a === a.a && c.b === a.b)?true:false, {a:2, b:2})
````

---

### Element.prototype functions

#### ID
>Element.prototype.ID([value])

###### Arguments
- *value*:	value to be set.

If *value* is specified sets element's id attribute to given *value*. If not returns current id value.

*Returns*:
- `Element` if *value* has been specified
- `Element.id` if *value* has not been specified

#### HTML
>Element.prototype.HTML([value])

###### Arguments
- *value*:	value to be set.

If *value* is specified sets element's innerHTML to given *value*. If not returns current innerHTML value.

*Returns*:
- `Element` if *value* has been specified
- `Element.innerHTML` if *value* has not been specified

#### Text
>Element.prototype.Text([value])

###### Arguments
- *value*:	value to be set.

If *value* is specified sets element's innerText to given *value*. If not returns current innerText value.

*Returns*:
- `Element` if *value* has been specified
- `Element.innerText` if *value* has not been specified

#### cssText
>Element.prototype.cssText([value])

###### Arguments
- *value*:	value to be set.

If *value* is specified sets element's style.cssText to given *value*. If not returns current style.cssText value.

*Returns*:
- `Element` if *value* has been specified
- `Element.style.cssText` if *value* has not been specified

#### addCSS
>Element.prototype.addCSS(...css)

###### Arguments
- *css*:	css strings to be added.

Adds each string of CSS to style.cssText.

*Returns*:
- `Element`

#### addClasses
>Element.prototype.addClasses(...classes)

###### Arguments
- *classes*:	classes to be added.

Adds HTML classes to `Element`.

*Returns*:
- `Element`

#### clearClass
>Element.prototype.clearClass()

Removes all classes.

*Returns*:
- `Element`

#### classEqual
>Element.prototype.classEqual(...classes)

###### Arguments
- *classes*:	classes to be added.

Removes all classes, then adds given ones.

*Returns*:
- `Element`

#### Attr
>Element.prototype.Attr([saveID], [saveClasses])

###### Arguments
- *name*:	name of attribute
- *value*:	value to be set.

If *value* is specified changes attribute named *name* to given *value*. If not returns current value of given attribute.

*Returns*:
- `Element` if *value* has been specified
-  **Attribute's value** if *value* has not been specified

#### removeAllAttributes
>Element.prototype.removeAllAttributes(name, [value])

###### Arguments
- *saveID*:			flag to leave element's ID attribute.
- *saveClasses*:	flag to leave element's class attribute.

Removes every set attribute.

If *saveID* is **defined**, id attribute will be saved.

If *saveClasses* is **defined**, class attribute will be saved.

*Returns*:
- `Element`

#### clear
>Element.prototype.clear()

Replaces given element with new element with the same id and classes.

*Returns*:
- `Element` that has been placed in DOM in exchange of `this`

````javascript
// create element
el = document.createElement("div");
el.id = "a";
el.addClasses("c1","c2");
document.body.append(el);	// el in DOM
el = el.clear();	// el is still in DOM
el.clear();	// el is no more in DOM
````
