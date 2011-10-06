var createAdders = function() {
	var fns = [];

	for (var i = 1; i < 4; i++) {
		fns[i] = (function(n) {
			return i + n;
		});
	}

	return fns;
}

var adders = createAdders();				// These all return the same thing...
console.log(adders[1](7));				// 11
console.log(adders[2](7));				// 11
console.log(adders[3](7));				// 11


var createAdders2 = function() {
	var fns = [];

	for (var i = 1; i < 4; i++) {
		(function(i) {				// Because we add an extra closure here he state of the...
			fns[i] = (function(n) {		// variables passed in will be preserved with the context of each iteration.
				return i + n;
			});				// Doing this creates a reference to each value that the funciton gets called with.
		})(i)
	}

	return fns;
}

var adders2 = createAdders2();				// These will all retrun the expected incrementing values
console.log(adders2[1](7));				// 8
console.log(adders2[2](7));				// 9 
console.log(adders2[3](7));				// 10