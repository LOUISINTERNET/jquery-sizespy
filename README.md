# Quick Start
Include `jquery.sizespy.js` or `jquery.sizespy.min.js` into your site and call 

```javascript
$('.your-selector, p.other-selector').sizeSpy();
```

# Options

* `string` cssPrefix - change css prefix of generated elements
* `string` spanTarget - target element of debug span. Regular CSS selector, 'wrap' will wrap matching elements. Default is false
* `object` spanStyles - change/adjust CSS style of created debug span, options are merged.
* `object` containerStyles - change/adjust CSS style of created container div, options are merged. 
* `object` targetStyles - change/adjust CSS style of observed element, options are merged. 

## Default Values

```javascript
spanTarget: false,
spanStyles: {
    "position": "absolute",
    "left": "0",
    "top": "0",
    "background-color": "red",
    "color": "white",
    "padding": "3px 6px",
    "font-family": "sans-serif",
    "font-weight": "bold",
    "z-index": "99999"
},
containerStyles: {
    "outline": "1px dashed red"
},
targetStyles: {
    "position": "relative"
}
```