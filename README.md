# bgCompare.js
bgCompare is a jQuery script to compare 2 images for differences, to create a before/after effect. It is fully responsive and works on all devices. It can even be put into a lightbox, like (http://cornel.bopp-art.com/lightcase/ "lightbox.js"). It is easy to set up anywhere.

DEMO : http://theflupke.github.io/bgCompare/

## Instructions

1. Link the css into the head of your html file
2. Link  jQuery and bgCompare.js just before the closing </body> tag
3. Add div container to body and configure bgCompare function for each slider. 

```html
<html>
  <head>
    ...
    <link href="css/bgCompare.min.css" rel="stylesheet" type="text/css" />
    ...
  </head>
  <body>
      ...
        <div id="bgCompare"></div>
      ...

     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
     <script src="js/bgCompare.min.js"></script>
     <script>
       bgCompare({
          beforeImage: "img/pvpayvqwuia-christian-sterk-before.jpg", // Your before image
          afterImage: "img/pvpayvqwuia-christian-sterk-after.jpg", // Your after image
        });
      </script>
   </body>
 </html>
```

##Options
```javascript
 bgCompare({
          beforeImage: "img/pvpayvqwuia-christian-sterk-before.jpg", // Your before image
          afterImage: "img/pvpayvqwuia-christian-sterk-after.jpg", // Your after image
          bgSize: "contain", // the background-size ("cover", "contain" for responsive awesomeness) (default "contain")
          targetId: "backgroundCompare", // the id of the element you want the script to load into
          showTooltips: "yes", // show or hide the tooltips next to the handle (default "yes")
          txtBefore: "Before", // the text of the before tooltip (default "Before")
          txtAfter: "After", // the text of the after tooltip (default "After")
          handleTheme: "dark-theme", // the theme of the handle (default "dark-theme")
          sliderPos: "20%" // the position of the slider on load (default: "50%")
        });
```
