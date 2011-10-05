function sayHello(name) {
	console.log(this + ' says "Hello ' + name + '!"');
}

sayHello('world');									// This line...
sayHello.call(window, 'world');						// is functionally equivalent to this line.

sayHello.call('Jason', 'world');					// Modifying 'this' within the scope of the function being called

var person = {
	name: 'Jason Offutt',
	hello: sayHello,								// Assign our function to be an instance method for person object.
	toString: function() {							// Overriding the toString() method on our nice little object...
		return this.name;							// just to be a little bit more useful.
	}
};

person.hello('world');								// This line...
person.hello.call(person, 'world');					// is functionally equivalent to this line.

var bind = function(func, valueOfThis) {
	return function() {
		return func.apply(valueOfThis, arguments);	// arguments is an array-like container for all function params passed in.
	}
};

var boundHello = bind(person.hello, person);
boundHello('world');