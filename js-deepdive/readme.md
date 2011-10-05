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

The traditional method calling syntax of `hello('world');` is actually shorthand for `hello.call(window, "world");`. 

Both of which would output `[object DOMWindow] says "Hello world!"` to the console.

You can manually assign the contextual value of 'this' using the call method:

```javascript
hello.call('Jason', 'world');
```

