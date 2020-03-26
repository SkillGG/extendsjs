# ExtendsJS

ExtendsJS is a file with compact functions that allow more easy DOMElement modification, Array manipulation, RegExp handling and some small additions.

## Contents

### Added functions (non-prototype)


#### Numbers.isEven
>__Number.isEven(number)__

Checks is number is even. Returns `true` if given is not a number.

---

### Array.prototype functions

#### getLastItem
>__Array.prototype.getLastItem()__

Returns last item from array (`arr[arr.length-1]`). If not present returns `null`.

```
[3,4,5].getLastItem(); // returns 5
```


#### setLastItem
>__Array.prototype.setLastItem( value )__

`value` is value to be set to the last item.

It sets value to last existing item of an array. (`array[indexOfLastItem] = value`)

```
q = ["a","b","c"];
q.setLastItem("d");	// q = ["a", "b", "d"];
```

#### unsetItem
>__Array.prototype.unsetItem(i)__

`i` is index of item to delete.

It deletes item with given index (`array[i]`). (Essentaily `.splice(i,0)`);

Returns deleted item.

```
q = ["a","b",3];
r = q.unsetItem(1);	// q = ["a",3]; r = "b";
```

#### unsetLastItem
>__Array.prototype.unsetLastItem()__

It unsets (deletes) last item.

Returns deleted item.

```
q = ["a","b",3];
r = q.unsetLastItem();	// q = ["a","b"]; r = 3;
```

#### clear
>__Array.protorype.clear()__

It removes every element from array.

Returns every deleted element in an array.

```
q = [1,2,3];
q.x = "2";
copy = q.clear();	// copy = [1,2,3]; q = []; q.x = "2";
```

#### where
>__Array.prototype.where(function)__

`function` is function that returns true or false given one argument.

It returns every item that given to `function` as an argument returns `true`.

Returns array of items for whom `function(item)` returned `true`.

```
		// function that returns true if argument.i === 1
IDEquals1 = function(x){ if(x.i===1) return true; return false;};
q = [{i:1, n:"a"}, {i:2, g:0}, {i:3}];
q.where(IDEquals1);				// returns [{i:1, n:"a"}]
		// where element has not setted g parameter
q.where(e=>e.g===undefined);	// returns [{i:1, n:"a"},{i:3}]
```

#### doWhere
>__Array.prototype.doWhere(function, do)__

`function` is function that returns true or false. Takes one argument.
`do` is method that takes one argument.

It invokes `do` with elements that `function` returned true when invoked.

```
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
>__Array.prototype.whereOne(function)__

`function` is function that returns true or false given one argument.

It returns first item that given to `function` as an argument returns `true`.

Returns first item for whom `function(item)` returned `true`.

#### valuedWhere
>__Array.prototype.valuedWhere(function, value)__

`function` is function that returns true or false given _two_ arguments.
`value` is an object that is feed to `function` as a second argument.

It returns every item that given to `function` with parsed `value` as an argument returns `true`.

Parsed `value` is `value` that has been specially parsed. If `value` is an object then it is passed as is.

If `value` is an string:
- if `value` is `$e` then second argument will be same as first.
- if `value` is `$a` then second argument will be whole array (`this`)
- each `$i` in string is replaced with an index of checking item (to escape $ sign use `$$`)

Returns array of items that given to `function` with parsed `value` as an argument returned `true`.

```
q = [{id:3, m:"three"}, {id:1, m:"one"}, {id:2, m:"two"}, {id:0, m:"zero"}]
	// return each that has id same as index in an array
q.valuedWhere((e,v)=>parseInt(v)===e.id,"$i");	// returns [{id:1, m:"one"},{id:2, m:"two"}]
```