// Monkeypatching is the act of adding functionality onto an object that
// wouldn't ordinarily be there, or to override existing functionality.

String.prototype.isPalindrome = function() {
	var val = this.toString().toLowerCase();
	var reverse = val.split('').reverse().join('');
	return val === reverse;
}

var str = 'something';
var result = str.isPalindrome();	// false

var str2 = 'level';
var result2 = str2.isPalindrome();	// true