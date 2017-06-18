# is Object

[Full Plankton Documentation](../index.md) 

## Table Of Contents

  * [is(subject)](#is-subject)
  * [is.true(subject)](#istrue-subject)
  * [is.false(subject)](#isfalse-subject)
  * [is.defined(subject)](#isdefined-subject)
  * [is.undefined(subject)](#isundefined-subject)
  * [is.null(subject)](#isnull-subject)
  * [is.bool(subject)](#isbool-subject)
  * [is.function(subject)](#isfunction-subject)
  * [is.string(subject)](#isstring-subject)
  * [is.string.empty(subject)](#isstringempty-subject)
  * [is.string.notEmpty(subject)](#isstringnotempty-subject)
  * [is.number(subject)](#isnumber-subject)
  * [is.numeric(subject)](#isnumeric-subject)
  * [is.numeric.int(subject)](#isnumericint-subject)
  * [is.numeric.float(subject)](#isnumericfloat-subject)
  * [is.numeric.odd(subject)](#isnumericodd-subject)
  * [is.numeric.even(subject)](#isnumericeven-subject)
  * [is.NaN(subject)](#isNaN-subject)
  * [is.infinite(subject)](#isinfinite-subject)
  * [is.array(subject)](#isarray-subject)
  * [is.array.empty(subject)](#isarrayempty-subject)
  * [is.array.notEmpty(subject)](#isarraynotEmpty-subject)
  * [is.object(subject)](#isobject-subject)
  * [is.object.empty(subject)](#isobjectempty-subject)
  * [is.object.notEmpty(subject)](#isobjectnotEmpty-subject)
  * [is.objectLiteral(subject)](#isobjectLiteral-subject)
  * [is.jsObject(subject)](#isjsObject-subject)
  * [is.jsPrimitive(subject)](#isjsPrimitive-subject)
  * [is.collection(subject)](#iscollection-subject)
  * [is.collection.empty(subject)](#iscollectionempty-subject)
  * [is.collection.notEmpty(subject)](#iscollectionnotEmpty-subject)
  * [is.empty(subject)](#isempty-subject)
  * [is.json(subject)](#isjson-subject)
  * [is.index(subject)](#isindex-subject)


## is (subject)

Alias to the [`is.true(subject)`](istrue-subject) function.

```js
is([]);			// false

is({a: 1});		// true
```

## is.true (subject)

Check if the value of **subject** denotes to a true like value.

```js
is.true([]);		// false
is.true({});		// false
is.true(NaN);		// false
is.true('');		// false

is.true(1);			// true
is.true([1, 2]);	// true
is.true(true);		// true
```

## is.false (subject)

Opposite of the [`is.true(subject)`](istrue-subject) function.

## is.defined (subject)

Check if **subject** is defined.

```js
is.defined(1);			// true

is.defined(undefined);	// false
```

## is.undefined (subject)

Opposite of the [`is.defined(subject)`](isdefined-subject) function.

```js
is.undefined(1);			// false

is.undefined(undefined);	// true
```

## is.null (subject)

Return true only if **subject** is **null**

```js
is.null(1);			// false
is.null(undefined);	// false

is.null(null);		// true
```

## is.bool (subject)

Return true if **subject** is of boolean type.

```js
is.bool(1);				// false
is.bool(undefined);		// false

is.bool(true);			// true
is.bool(false);			// true
is.bool(new Boolean());	// true
```

## is.function (subject)

Return true if **subject** is a function.

```js
is.function(function () {});	// true
is.function(undefined);			// false
```

## is.string (subject)

Return true if **subject** is a string.

```js
is.string(new String('a'));	// true
is.string("a");				// true
is.string('');				// true

is.string(123);				// false
```

## is.string.empty (subject)

Return true if **subject** is a string and is empty.

```js
is.string.empty(new String(''));	// true
is.string.empty('');				// true

is.string.empty('abc');			// false
is.string.empty(123);				// false
```

## is.string.notEmpty (subject)

Return true if **subject** is a string and not empty.

```js
is.string.notEmpty(new String('abc'));	// true
is.string.notEmpty('abc');				// true

is.string.notEmpty('');					// false
is.string.notEmpty(123);				// false
```

## is.number (subject)

Return true if **subject** is of number type

```js
is.number(123);			// true
is.number(-932.23);		// true
is.number(Infinity);	// true
is.number(NaN);			// true

is.number('asd');		// false
is.number(null);		// false
```

## is.numeric (subject)

Return true if **subject** is of number type and can be represented as a numeric value. 

```js
is.number(123);			// true
is.number(-932.23);		// true

is.number(Infinity);	// false
is.number(NaN);			// false
is.number('asd');		// false
is.number(null);		// false
```

## is.numeric.int (subject)

Return true if **subject** is of number type, can be represented as a numeric value and 
have no fractional component.

```js
is.number.int(123);			// true
is.number.int(-123);		// true

is.number.int(-932.23);		// false
is.number.int('asd');		// false
```

## is.numeric.float (subject)

Return true if **subject** is of number type, can be represented as a numeric value and 
have a fractional component.

```js
is.number.int(-932.23);		// true

is.number.int(123);			// false
is.number.int('asd');		// false
```

## is.numeric.odd (subject)

Return true if **subject** is an odd number.

```js
is.number.odd(123);		// true
is.number.odd(-123);	// true

is.number.odd(122);		// false
is.number.odd(0);		// false
is.number.odd('asd');	// false
```

## is.numeric.even (subject)

Return true if **subject** is an even number.

```js
is.number.even(122);	// true
is.number.even(-122);	// true
is.number.even(0);		// true

is.number.even(123);	// false
is.number.even('asd');	// false
```

## is.NaN (subject)

Return true if **subject** is **NaN**.

```js
is.NaN(NaN);	// true

is.NaN(/* anything else */);	// false
```

## is.infinite (subject)

Return true if **subject** is **Infinity** or **-Infinity**.

```js
is.infinite(Infinity);	// true
is.infinite(-Infinity);	// true

is.infinite(/* anything else */);	// false
```

## is.array (subject)

Return true if **subject** is an array.

```js
is.array([]);			// true
is.array([1, 2, 3]);	// true

is.array({a: 1});		// false
is.array(null);			// false
is.array("123");		// false
```

## is.array.empty (subject)

Return true if **subject** is an array and empty.

```js
is.array.empty([]);			// true

is.array.empty([1, 2, 3]);	// false
is.array.empty({a: 1});		// false
is.array.empty("123");		// false
```


## is.array.notEmpty (subject)

Return true if **subject** is an array and not empty.

```js
is.array.empty([1, 2, 3]);	// true

is.array.empty([]);			// false
is.array.empty({a: 1});		// false
is.array.empty("123");		// false
```

## is.object (subject)

Return true if **subject** is an object literal, or an instance created using a constructor function.

```js
function MyClass() {}

is.object({});					// true
is.object(new MyClass());		// true
is.object(Object.create(null));	// true

is.object("123");				// false
is.object([1, 2, 3]);			// false
is.object(new String());		// false
is.object(function() {});		// false
```

## is.object.empty (subject)

Return true if **subject** is an object literal or an instance created using a constructor function, and 
have at least one owned property.

```js
function MyClass() {}
MyClass.prototype.value = 123;

is.object.empty({});					// true
is.object.empty(new MyClass());			// true
is.object.empty(Object.create(null));	// true

is.object.empty("123");					// false
is.object.empty([1, 2, 3]);				// false
is.object.empty(new String());			// false
is.object.empty({ a: 1 });				// false
```

## is.object.notEmpty (subject)

Return true if **subject** is an object literal or an instance created using a constructor function, and 
have no owned properties.

```js
function MyClass() {}
MyClass.prototype.value = 123;

var instance = new MyClass();
instance.abc = "abc";

is.object.notEmpty("123");					// true
is.object.notEmpty({ a: 1 });				// true
is.object.notEmpty(instance);				// true


is.object.notEmpty({});						// false
is.object.notEmpty(new MyClass());			// false
is.object.notEmpty(Object.create(null));	// false
is.object.notEmpty(new String());			// false
is.object.notEmpty([1, 2, 3]);				// false
```
## is.objectLiteral (subject)

Return true if **subject** is an object literal

```js
function MyClass() {}

is.objectLiteral({});						// true
is.objectLiteral({ a: 1 });					// true
is.objectLiteral(Object.create(null));		// true


is.object.notEmpty("123");					// false
is.object.notEmpty(new MyClass());			// false
is.object.notEmpty(new String());			// false
is.object.notEmpty([1, 2, 3]);				// false
```

## is.jsObject (subject)

Return true if **subject** is any non primitive value excluding null.

```js
is.jsObject({});			// true
is.jsObject(new String());	// true
is.jsObject(new MyClass());	// true

is.jsObject(null);	// false
is.jsObject(1);		// false
is.jsObject("1");	// false
is.jsObject(false);	// false
```

## is.jsPrimitive (subject)

Return true if **subject** is a primitive value.

```js
is.jsObject(1);		// true
is.jsObject("1");	// true
is.jsObject(false);	// true

is.jsObject({});			// false
is.jsObject(new String());	// false
is.jsObject(new MyClass());	// false

is.jsObject(null);	// false
```

## is.collection (subject)

Return true if **subject** is either string, array or object literal.

## is.collection.empty (subject)

Return true if **subject** is either string, array or object literal and empty.

## is.collection.notEmpty (subject)

Return true if **subject** is either string, array or object literal and not empty.

## is.empty (subject)

Return true if **subject** is either string, array or object literal and not empty.

## is.json (subject)

Return true if **subject** is an empty collection. Note that if subject is not 
a collection, an error is thrown.

## is.index (subject)

Return true if **subject** is a numeric value that can be used as an index of an array.