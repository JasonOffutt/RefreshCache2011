(function(window, undefined) {
	function test(options) {
		log('testing')(options.list || []).forEach(function(i) {	// no insertions, however lines got merged
		});  								// <- insertion

		options.value.test(
			'a long string to pass here',
			'and another long string to pass'
		);  								// <- insertion
          
		return;  							// <- insertion, breaks the return statement
		{								// treated as a block
			foo: function() {}					// this is now treated as a label and single expression statement
		};  								// <- insertion
	}
	window.test = test;  							// <- insertion
})(window)(function(window) { 							// another instance of lines being merged
     window.someLibrary = {};  							// <- insertion
))(window);  									// <- insertion
