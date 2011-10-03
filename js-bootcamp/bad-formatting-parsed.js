(function(window, undefined) {
     function test(options) {
          // no insertions, however lines got merged
          log('testing')(options.list || []).forEach(function(i) {
          });  // <- insertion

          options.value.test(
               'a long string to pass here',
               'and another long string to pass'
          );  // <- insertion
          
          return;  // <- insertion, breaks the return statement
          {  // treated as a block
               // this is now treated as a label and single expression statement
               foo: function() {}
          );  // <- insertion

          window.test = test;  // <- insertion
// another instance of lines being merged
})(window)(function(window) { 
     window.someLibrary = {};  // <- insertion
))(window);  // <- insertion
