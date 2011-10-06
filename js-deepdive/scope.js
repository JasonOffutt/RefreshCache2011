// VariableEnvironment: { a: undefined }
var a = 'global scope';
// VariableEnvironment: { a: 'global scope' }

function outerScopedFunction() {
	// VariableEnvironment: { b: undefined, outerLex: { a: 'global scope' } }
	var b = 'outer scope';
	// VariableEnvironment: { b: 'outer scope', outerLex: { a: 'global scope' } }
	
	// The closure created by this function effectively hides
	// the global execution context
	function innerScopedFunction() {
		// VariableEnvironment: { a: undefined, outerLex: { b: 'outer scope', outerLex: { a: 'global scope' } } }
		var a = 'inner scope';
		// VariableEnvironment: { a: 'inner scope', outerLex: { b: 'outer scope', outerLex: { a: 'global scope' } } }
	}
}