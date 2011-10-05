# Understanding "this" and JavaScript function invocation

* In JavaScript functions are first-class primitive objects
	* This means that you can set a function to be the result of an expression:
		* `var add = function(a, b) { return a + b; }`
	* You can then call that function or access its value (as a set of instructions)
		* Function call: `var result = add(2, 2);`
		* Accessing function value: `var someObject = { someMethod: add }`
* Calling a function in JavaScript is actually a shorthand for another operation:
	* The function primitive has a call method

```javascript
function hello(name) {
	console.log(this + ' says "Hello ' + name + '!"');
}
```

The traditional method calling syntax of `hello('world');` is actually shorthand for `hello.call(this, "world");`. 
In the scope of a browser, the value of 'this' starts out as the global object 'window'.

So whether we use the shorthand notation or we use call, `[object DOMWindow] says "Hello world!"` will be emitted to the console.

You can manually assign the contextual value of 'this' using the call method:

```javascript
hello.call('Jason', 'world');
```

If you've worked with jQuery, you've probably noticed that they've done some helpful things using call:

```javascript
$('#some-element').click(function() {
	// The jQuery team has thoughtfully modified the value of 'this' to be the 
	// value of the element that triggered the click event
	$(this).addClass('selected');
});
```

In the case of a member function, the relationship will look like this:

```javascript
var person = {
	name: 'Jason Offutt',
	hello: function(name) {
		console.log(this.name + ' says "Hello ' + name + '!"');
	}
};

// this
person.hello('world');

// is equal to this
person.hello.call(person, 'world');
```

If we bring in closures, and make use of the apply function, we can create something reusable for dynamically setting the value of 'this':

```javascript
var bind = function(func, valueOfThis) {
	return function() {
		return func.apply(thisValue, arguments);	// arguments is an array-like container for all function params passed in
	}
};

var boundHello = bind(person.hello, person);
boundHello('world');
```