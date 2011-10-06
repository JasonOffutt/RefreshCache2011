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

You can also manipulate the value of 'this' by using the apply method on a function. The apply method provides us with a way to extend context in a broader range.

If we bring in closures, and make use of the apply function, we can create something reusable for dynamically setting the value of 'this':

```javascript
var bind = function(func, valueOfThis) {
	return function() {
		return func.apply(valueOfThis, arguments);	// arguments is an array-like container for all function params passed in
	}
};

var boundHello = bind(person.hello, person);
boundHello('world');
```

If you've ever worked with jQuery, you've probably noticed that they've done some helpful things using apply and call to provide some truly useful functionality when scripting events.

```javascript
$('#some-element').click(function() {
	// The jQuery team has thoughtfully modified the value of 'this' to be the 
	// value of the element that triggered the click event
	$(this).addClass('selected');
});
```

# Understanding closures and scope

* A closure is a reference in memory to a function
	* variable values are preserved
	* context and state is also preserved
* Closures are not deallocated from memory when they lose scope

```javascript
function outerScopedFunction() {
	var b = 'outer scope';
	
	function innerScopedFunction() {
		var a = 'inner scope';
	}
}
```

* When the execution context encounters a function definition in code:
	*a new function object is created with an internal [[scope]] property 
	* [[scope]] references the current VariableEnvironment

*This basically means that when the parser runs into your function, it remembers the context in which it is being executed, and a reference to that context is stored in memory.*

* Practical applications
	* Scoping your scripts for use by only a specific module
	* Function templates
	* jQuery plugins
	
```javascript
// Theres a reason jQuery plugins are usually wrapped in an anonymous/self-calling function...

// Create a closure that executes itself and accepts the jQuery object as a parameter
(function($) {
	// private variables, functions, etc that you don't want exposed publicly go here
	
	$.fn.foo = function(args) {
		// your plugin code goes here
	};
})(jQuery);  // Call the anonymous function and pass in 'jQuery' to receive the new function binding
```

