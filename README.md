# hotmenu

A responsive, full-screen jQuery menu.

## Usage

Include `hotmenu.jquery.js` and `hotmenu.css` in your project...

```
<script type="text/javascript" src="hotmenu.jquery.min.js"></script>
<link rel="stylesheet" href="hotmenu.min.css">`
```

...add a toggle...

`<button class='hm-toggle'>Click me</button>`

...and then:

`$(function() { $('nav').hotMenu(); });`

## Options

`toggleSelector`  
The selector for element that should trigger the menu to open. Default: '.hm-toggle'

`mediaQuery`  
Media query string at which hotmenu should be active. Default: null

### Example with options

```
$(’nav’).hotMenu({ 
  toggleSelector: '.hm-toggle', 
  mediaQuery: '(max-width: 600px)' 
});
```

hotmenu takes care of basic styling, but most of it's up to you. You're responsible for creating the toggle that opens the menu. The default class that hotmenu looks for is `hm-toggle`.
