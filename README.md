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
>Array.prototype.getLastItem()

Returns last item from array (`arr[arr.length-1]`). If not present returns `null`.

### setLastItem
>Array.prototype.setLastItem( value )

`value` is value to be set to the last item.

It sets value to last existing item of an array. (`array[indexOfLastItem] = value`)