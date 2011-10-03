# Fun with equality operators:  ( == vs === )
```
'' == '0'		|		'' === 0
// false		|		// false
				|
'' = 0			|		'0' === 0
// true 		|		// false
```


|`false == 'false'  // false`  |`false === 'false'  // false`    |
|`false == 0  // true`         |`false === 0  // false`          |
|`false == undefined  // false`|`false === undefined  // false`  |
|`false == null  // true`      |`false === null  // false`       |
|`null == undefined  // true`  |`null === undefined  // false`   |
|`' \t\r\n' == 0  // true`     |`' \t\r\n' === 0  // false`      |

   * == uses type coercion (weak typing) to try to discern equality
   * === evaluates both value and type to discern equality
      * behaves more like the traditional C-style '==' operator
   * When in doubt, use '==='

# Understanding null and undefined

   * Avoid explicit null checks in your JavaScript (e.g. - if (foo == null)… )
      * null is an object whose type is "null"
      * undefined is NOT an object. Its type is 'undefined'
         * undefined functions more like the classic C-style null
   * Instead, use "not checks" (e.g. - if (!foo)... )

window.hello
>> undefined

window.hello.something
>> type error

window.hello == null
>> true

window.hello == undefined
>> true

window.hello === null
>> false

window.hello === undefined
>> true

typeof(null)
>> object

typeof(undefined)
>> undefined

Object literals vs constructed objects

   * Be aware of interesting 'inconsistencies' in expected behavior when creating object primitives
   * Creating object via primitive type constructors is generally to be avoided, and for good reason
      * When creating a new primitive variable (e.g. - string, number, boolean, etc)
      * Constructed object initialization is OK for reference-types and custom objects
         * var foo = new Foo();
var a = 'a';console.log(typeof(a));

>> string


var b = new String('b');
console.log(typeof(b));
>> object

Variable declaration

   * ALWAYS use the 'var' keyword when declaring variables
   * If you omit 'var' when creating a new variable, the JavaScript interpreter will traverse up the scope chain.
      * Looks first in local scope, then will keep going up a level in search of your variable's declaration
      * Once it gets to the global level, if it doesn't find your variable, it will add it to global scope
      * This is bad, as it will pollute the global scope, and can cause unpredictable bahavior when working with third party libraries.
foo = 1;
function test() {
     foo = 'bar';
}
test();
console.log(foo);
>> 'foo'

// if we had used var
foo = 1;
function test() {
     var foo = 'bar';
}
test();
console.log(foo);
>> 1


Interacting with the DOM

   * Text and HTML
      * innerText vs innerHTML (or $.text() vs $.html() in jQuery)
var body = document.getElementsByTagName('body')[0];var markup = '<span class="foo">foo</span>';

var p1 = document.createElement('p');
p1.innerText = markup;
body.appendChild(p1);

var p2 = document.createElement('p');
p2.innerHTML = markup;
body.appendChild(p2);

console.log(p1.innerText);
console.log(p1.innerHTML);


   * When dynamically creating elements
      * Doing complex DOM manipulation can be expensive.
      * Best to build in memory first, and append to DOM once.
// BAD
var body = document.getElementsByTagName('body')[0];
var text = 'number ';
var ul = document.createElement('ul');
body.appendChild(ul);
for (var i = 0; i < 100; i++) {

     var li = document.createElement('li');
     li.innerText = text + (i + 1);
     ul.appendChild(li);
}

// GOOD
var body = document.getElementsByTagName('body')[0];
var text = 'number ';
var ul = document.createElement('ul');
for (var i = 0; i < 100; i++) {

     var li = document.createElement('li');
     li.innerText = text + (i + 1);
     ul.appendChild(li);
}
body.appendChild(ul);


Semicolons and Braces

   * Even though JavaScript has a C-style syntax, it does NOT enforce the use of semicolons.
   * However, JavaScript is not a semicolon-less language like VB, Ruby, Python, etc
      * The JS interpreter needs semicolons to understand your source code
      * If you leave out semicolons, the interpreter will attempt to add them in for you.
      * It doesn't always do a very good job.
      * Semicolons get inserted whenever the interpreter encounters a parse error due to a missing semicolon
   * Brace placement matters!
      * Forget your side in the Allman vs K&R holy war. Put your opening braces on the same line
      * If the end of a line is reached, and a semicolon is placed BEFORE your opening brace, it will change the behavior of your code.
Consider the following code without semicolons:
(function(window, undefined) {     function test(options) {

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

The above code will result in the following parsed output:

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

Some general rules to keep in mind concerning JS parsers:

   * In case of leading parenthesis, the parser will NOT insert a semicolon, however, it may try to merge lines.
      * In the above code, if the 'log' function does not return a function, the parser will throw a type error (undefined is not a function).
Take-aways:
   * Keep opening braces on the same line.
   * Never omit braces for single-line if/else statements
   * Never omit semicolons
          

