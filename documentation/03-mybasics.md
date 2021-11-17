# My basics of HTML, CSS and JS

You can check if you are firm with the following thinks. 
I added links to learn in detail about all the elements available that are listet here.  
Also you don't have to worry about rembering all this if you just startet with web development.  
I will bring this thinks into action in the next chapters and there you can see how they are used.

## My HTML tags to know: 
- `<script></script>` refernce a js file for code
- `<link></link>` reference a css file for styling 
- `<div>` a basic container to structure html code 
- `<a></a>` a link to another page, file or any other kind of URL
- `<span></span>` inline container for simple text
- `<form> </form>` A Form holding controls for input data.
- `<label></label>` caption for an element, mostly inputs
- `<input type="text" /> ` a textbox
- `<input type="checkbox" /> ` a checkbox
- `<input type="date" /> ` a datepicker
- `<input type="time" /> ` a time input control
- `<input type="file" /> ` a file selector for uploading files
- `<input type="hidden" /> ` data not shown to the user but submitted with the form.
- `<input type="radio" /> ` a radiobutton
- ```
  <datalist>
    <option value="1">option1</option>
  </datalist>
  ```
  a dropdown list input where custon text can be entered
- ```
  <select>
    <option value="1">option1</option>
  </select>
  ```
  a simple dropdown list input
- `<textarea></textarea>` a multiline text input, richtext available
- `<button> </button>` a button, 
- `<progress></progress>` a progress bar, (`<meter>` will may be an option in the future)
- ```
  <details>
    <summary>title</summary>
    A keyboard.
  </details>
  ```
  an simple expandable area
-`<slot></slot>` placeholder for elements inside a webcomponent, we will need this soon.
- `<canvas><canvas>` used for high-performance 2D and 3D rendering with WebGL. 
- `<audio></audio>` audio player in the browser
- `<img></img>` an image
- `<video></video>` video player in the browser
#
Learn more about html in the MDN documentation: [MDN Web Docs: HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).
___
&nbsp;

## My CSS to know
- `font-size: 12px` sets font-size of the element to 12 pixeles
- `font-size: 1em` equals the default font size of the container element.  
e.g.: 1.5em may mean a size of 1.5*12px.
- `:root` selector applies rules on the root level.
- `--myvariable: 6px` defines a variable 'myvariable' with the value of '6px'.
- `@import` import style rules from other style sheets.
- `padding: <top> <right> <bottom> <left>`  
  `padding: <top&bottom> <right&left>`  

  `padding-top:`  
  `padding-right:`  
  `padding-bottom:`  
  `padding-left:`  

  diffent ways of applying padding. 
- `margin: <top> <right> <bottom> <left>` works the same as padding.
- `display: block` behaviour like a div.
- `display: inline` behaviour like a span or an input.
- `display: flex` devines this as an flexbox container. look at [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- `background-color: #000` color as hex values, #000000 is black
- `border: 1px solid #000` a 1px border in black, 'none' would disable a border on an element.
- `border-radius: 1em`  rounding the corners of the element by a given value.
- `box-shadow: ` defines one or more shadow effect in a comma seperated list.
- `height: calc(100%-20px)` sets the height of an element.  'calc' calculates here the height of an element to be 20px smaller than 100% of the parent height.
- `width: var(--myvariable)` sets the width of an element. 'var' resolves the variable --myvariable if available. 
- `color: #fff` sets the color of the text of the element.
- `element:checked` selector for checkboxes or radio buttons with value true.
- `element:disabled` or `element:enabled` selector used if the html element is enabled or disabled.
- `element:focus` input element has focus.
- `element:invalid` input element with an invalid value
- 

#
Learn more about css selectors here [CSS Selectors](https://www.w3schools.com/cssref/css_selectors.asp)
#
Learn more about css in the MDN documentation: [MDN Web Docs: CSS](https://developer.mozilla.org/de/docs/Web/CSS)
___
&nbsp;

## My JavaScript to know
- primitives in JS are: number, string, boolean, null, undefined.
- Other importan types may: Date, Array, Map, Error, Function
- `let myvariable;` a local variable
- `const myconst = 2;` a constant
- `(myparameter)=>{ }` a arrow function used for inline functions, e.g. as parameter for another function.
- ```
    class MyClass{
        constructor(){

        }
        mymethod(myparameter){

        }
    }
  ```
  a class to describe an object.
- `for(const <item> of <items>)` js equivalent to foreach
- there are no real private variables in javascript. Later we will learn a trick to ecapsulate some variables to be private.
- use js doc syntax to document your js code [JSDoc](https://jsdoc.app/about-getting-started.html)
- `"use strict";` always add at the beginning of a js file to be sure to enable strict mode. Helps to prevent errors that are possible with standard javascript syntax.
- `get mygetter(){ return myvar}` getter function binding a property *mygetter*
- `set mysetter(value){ myvar = value; }` setter function binding a property *mysetter*
- `async function () { await promisecallback(); }` synchronize asynchonous calls with async await.
- `new Worker('workerscript.js')` a worker to execute js in another thread. keyword multithreading.
- `extends` in class declaration used to create a class that is a child of another class.
- `(()=>{ //script code })()` IIFE - immediately invoked function Expression or known as a self executing function.  
Will be used to realise real privacy.

#
Learn more about JavaScript in the MDN documentation: [MDN Web Docs: JavaScript](https://developer.mozilla.org/de/docs/Web/JavaScript)
___
&nbsp;

As some of the features seem to be pretty new they will only working with a updated browser.

Next we will set up our first javascript project in vscode.

[Previous](02-basicpage.md) - [Next](04-setup-jsproj.md)