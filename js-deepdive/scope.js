console.log(a);					// undefined
var a = 'global scope';
console.log(a);					// 'global scope'

function outerScopedFunction() {
	var b = 'outer scope';
	console.log(a);				// 'global scope'
	
	// The closure created by this function effectively hides global scope
	function innerScopedFunction() {
		console.log(a);			// undefined
		var a = 'inner scope';
		console.log(a);			// 'inner scope'
	}
}