# Understanding "this" and JavaScript function invocation

* In JavaScript functions are first-class primitive objects
	* This means that you can set a function to be the result of an expression:
		* `var add = function(a, b) { return a + b; }`
	* You can also pass a function as argument of a function:
		* `$('.selector').click(function() { ...`
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
	* functional programming

'Templating' function behavior for better code reuse:

```javascript
function unitConverter(unitType, factor, offset) {
	offset = offset || 0;
	return function(input) {
		return [((offset + input) * factor).toFixed(2), unitType].join(' ');
	}
}

var miToKm = unitConverter('km', 1.60936);
var lbsToKg = unitConverter('kg', 0.45460);
var farenheitToCelcius = unitConverter('C', 0.5556, -32);

console.log(miToKm(10));
console.log(lbsToKg(2.5));
console.log(farenheitToCelcius(98));
```

jQuery plugin creation:
	
```javascript
// Create a closure that executes itself and accepts the jQuery object as a parameter
(function($) {
	// private variables, functions, etc that you don't want exposed publicly go here
	
	$.fn.foo = function(args) {
		// your plugin code goes here
	};
})(jQuery);  // Call the anonymous function and pass in 'jQuery' to receive the new function binding
```

# Namespacing

* There are few popular ways to do this
	* Global Object
	* Singleton
	* Cascading

Global object: Works almost like a class with a bunch of static methods

```javascript
var MyGlobalObject = {};

MyGlobalObject.sayHi = function() {
	console.log('hi');
};

MyGlobalFunction.add = function(a, b) {
	return a + b;
};

MyGlobalObject.sayHi();
var result = MyGlobalObject.add(2, 8);
```

Singleton: Variant of Global Object, but uses a closure to provide a private scope to hide internal functionality

```javascript
var Singleton = (function() {
	var privateVariable = 'foo';
	
	function privateFunction() {
		console.log("I'm encapsulated!");
	}
	
	return {
		name: privateVariable,
		doSomething: function() {
			privateFunction();
		}
	};
})();
```

Cascading: Building off Global Object and Singleton. Allows more classic style dot-notated namespaces

```javascript
window.CentralAZ = CentralAZ || {};
CentralAZ.Web = CentralAZ.Web || {};

CentralAZ.Web.EventRegistration = (function() {
	// ... code goes in here...
})();
```

My personal fav is Cascading. Though it's a little more involved than the other approaches, it gives you the most flexibility.

# Object Prototypes

Object prototypes are how you add functionality to instances of an object. Prototypes are exposed to allow developers to add and override functionality.

```javascript
var Person = function() {
	// this is the constructor
};

// Static method declaration
Person.doSomething = function() {
	// ... do something...
};

// Instance method declaration
Person.prototype.getAge = function() {
	// ... calculate age in here...
}

var person = new Person();
var age = person.getAge();
Person.doSomething();
```
