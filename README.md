# ExtendsJS

ExtendsJS is a file with compact functions that allow more easy DOMElement modification, Array manipulation, RegExp handling and some small additions.

## Contents

### Added functions (non-prototype)


#### Numbers.isEven
>Number.isEven(number)

Checks is number is even. Returns `true` if given is not a number.

---

### Array.prototype functions

#### getLastItem
>__Array.prototype.getLastItem()__

Returns last item from array (`arr[arr.length-1]`). If not present returns `null`.

Example:
```
[3,4,5].getLastItem(); // returns 5
```


#### setLastItem
>__Array.prototype.setLastItem( value )__

`value` is value to be set to the last item.

It sets value to last existing item of an array. (`array[indexOfLastItem] = value`)

#### unsetItem
>Array.prototype.unsetItem(i)__

`i` is index of item to delete.

It deletes item with given index (`array[i]`).

Returns deleted item.

#### unsetLastItem
>__Array.prototype.unsetLastItem()__

It unsets (deletes) last item.

Returns deleted item.

#### where
>__Array.prototype.where(function)__

