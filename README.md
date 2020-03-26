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
>__Array.prototype.doWhere(func&lt;el&gt;, do)__

###### Arguments
- *func*: 	`function` that defines the conditions of the element to search for. Should return *true* or *false*
- *do*:		`function`(method) that takes one argument.

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
- *func*:	`function` that returns true or false given _two_ arguments.
- *value*:	an object that is feed to *func* as a second argument.

It returns every element that given to *func* with parsed *value* as an argument returns *true*.

Parsed *value* is *value* that has been specially parsed. If *value* is an object then it is passed as is.

*value* parsing:
- If *value* is an string each `$i` in string is replaced with an index of checking elemenet (to escape $ sign use `$$`).
- If *value* equals `'$e'` then second argument will be same as first.
- If *value* `'$a'` then second argument will be whole array (`this`).

*Returns*:
- *`array`* of elements that given to *func* with parsed *value* as second argument returned *true*.
- empty *`array`* if none elements found.

```javasctipt
q = [{id:3, m:"three"}, {id:1, m:"one"}, {id:2, m:"two"}, {id:0, m:"zero"}]
	// return each that has id same as index in an array
q.valuedWhere((e,v)=>parseInt(v)===e.id,"$i");	// returns [{id:1, m:"one"},{id:2, m:"two"}]
```

---
### Not fully implemented Array.prototype functions:

#### pushIfNot
>Array.prototype.pushIfNot(func<check,add>, obj)

###### Arguments
- *func*:	`function` to check if element already matches. Function takes two arguments, checking object and adding object
- *obj*:	object to push

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

If *value* is specified sets element's id attribute to given value. If not returns current id value.

*Returns*:

