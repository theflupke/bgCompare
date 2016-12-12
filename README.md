# bgCompare.js
bgCompare is a jQuery script to compare 2 images for differences, to create a before/after effect. It is fully responsive and works on all devices. It can even be put into a lightbox, like (http://cornel.bopp-art.com/lightcase/ "lightbox.js"). It is easy to set up an

## Instructions

1. Link the css into the head of your html file

```html
    <link href="css/bgCompare.css" rel="stylesheet" type="text/css" />
```

2. Link the jquery and bgCompare.js just before the closing </body> tag

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
          bgSize: "contain", // the background-size ("cover", "contain" for responsive awesomeness)
          targetId: "backgroundCompare", // the id of the element you want the script to load into
          showTooltips: "yes" // show or hide the tooltips next to the handle
          txtBefore: "Before" // the text of the before tooltip
          txtAfter: "After" // the text of the after tooltip
          handleTheme: "dark-theme" // the theme of the handle
        });
```
