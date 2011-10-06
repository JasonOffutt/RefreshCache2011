var GlobalObject = {}					// Create a JSON object literal in the global scope

GlobalObject.foo = function() {				// Add functionality to it..
	return 'foo';
}

console.log(GlobalObject.foo());


var Singleton = (function() {				// Create a global object that's encapsulated within
	// Private variables...				// a self-calling function
	var foo = 'foo';
	
	// Private funcitons...
	function add(a, b) {
		return a + b;
	}
	
	return {					// Public scope is represented as a JSON object returned
		theFoo: foo,				// by the anonymous function. Can be operated against
		addNumbers: function(first, second) {	// in the same way as the Global Object technique
			return  add(first, second);
		}
	};
})();

console.log(Singleton.addNumbers(2, 5));


var Cascading = Cascading || {};			// Create a chain of objects that hangs off the global scope
Cascading.Method = Cascading.Method || {};		// The or check (||) ensures you're not ruining your own code

Cascading.Method.config = {				// This method provides some nice options to cleanly break your
	foo: 'foo',					// code out into managable chunks
	bar: 'bar',
	baz: 'baz'
};

Cascading.Method.Namespace = (function() {		// You can use any other variant with Cascading namespaces
	return {
		foo: Cascading.Method.config.foo;
	};
})();

console.log(Cascading.Method.Namespace.foo);		// The main downside to this technique is that it makes for
							// some long object declarations