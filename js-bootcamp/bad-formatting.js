(function(window, undefined) {
	function test(options) {
		log('testing')
		(options.list || []).forEach(function(i) {
		})
		options.value.test(
			'long string to pass here',
			'and another long string to pass'
		)

		return
		{
			foo: function() {}
		}
	}
	window.test = test
})(window)
(function(window) {
	window.someLibrary = {}
})(window)
