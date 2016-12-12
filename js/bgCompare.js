"use strict";

/* 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                            bgCompare.js
                    ----------------------------
                    a script by Stéphane Salomon
                    contact@stephane-salomon.com
                    ----------------------------
                Copyright (c) 2016 Stéphane Salomon

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the 
"Software"), to deal in the Software without restriction, including 
without limitation the rights to use, copy, modify, merge, publish, 
distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject 
to the following conditions:

The above copyright notice and this permission notice shall be 
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
OTHER DEALINGS IN THE SOFTWARE.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

function bgCompare(options) {
    // getting the attributes
    var before = options.beforeImage;
    var after = options.afterImage;
    var bgSize = options.bgSize || "contain";
    var targetId = options.targetId || "bgCompare";
    var showTooltips = options.showTooltips || "yes";
    var txtBefore = options.txtBefore || "Before";
    var txtAfter = options.txtAfter || "After";
    var handleTheme = options.handleTheme || "dark-theme";
    var sliderPos = options.sliderPos || "50%";

    if (targetId && before && after) {
        (function () {
            //Generating the slider

            var targetElement = document.getElementById(targetId);

            var docfrag = document.createDocumentFragment();

            var container1 = document.createElement("div");
            container1.className = "super-container";
            docfrag.appendChild(container1);

            var container2 = document.createElement('div');
            container2.className = "aspect-container";
            container1.appendChild(container2);

            var aspectCritical = document.createElement('div');
            aspectCritical.className = "aspect-critical-content";
            container2.appendChild(aspectCritical);

            var beforeWrapper = document.createElement('div');
            beforeWrapper.className = "before-wrapper";
            beforeWrapper.id = "before" + targetId;
            aspectCritical.appendChild(beforeWrapper);

            var afterWrapper = document.createElement('div');
            afterWrapper.className = "after-wrapper";
            beforeWrapper.appendChild(afterWrapper);

            var afterImage = document.createElement('div');
            afterImage.className = "after-image";
            afterImage.id = "after" + targetId;
            afterWrapper.appendChild(afterImage);

            var sliderHandle = document.createElement('div');
            sliderHandle.className = "comparison-slider handle";
            sliderHandle.id = handleTheme;
            aspectCritical.appendChild(sliderHandle);

            if (showTooltips === "yes") {
                var beforeTooltip = document.createElement('div');
                beforeTooltip.className = "avant";
                beforeTooltip.textContent = txtBefore;
                sliderHandle.appendChild(beforeTooltip);

                var afterTooltip = document.createElement('div');
                afterTooltip.className = "apres";
                afterTooltip.textContent = txtAfter;
                sliderHandle.appendChild(afterTooltip);
            }

            targetElement.appendChild(docfrag);

            // Putting the images in the background

            var beforeTarget = "#before" + targetId;
            var afterTarget = "#after" + targetId;

            $(beforeTarget).css({
                "background": "url(" + before + ") center no-repeat",
                "background-size": bgSize
            });
            $(afterTarget).css({
                "background": "url(" + after + ") center no-repeat",
                "background-size": bgSize
            });

            $(document).ready(function () {
                $(document).find('.comparison-slider').css({
                    left: sliderPos
                });
                $(document).find('.after-wrapper').css({
                    transform: 'translateX(' + sliderPos + ')'
                });
                $(document).find('.after-image').css({
                    transform: 'translateX(-' + sliderPos + ')'
                });
            });

            var down = false;

            $(targetElement).find('.comparison-slider').on("mousedown touchstart", function () {
                down = true;
                $('.avant, .apres').stop().fadeOut(100);
            });
            $(targetElement).on("mouseup touchend", function () {
                down = false;
                $('.avant, .apres').stop().fadeIn(400);
            });

            $(targetElement).on("touchmove", function (e) {
                e.preventDefault();
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                if (down) {

                    var offsets = $(targetElement).find('.before-wrapper').offset();
                    var fullWidth = $(targetElement).find('.before-wrapper').width();
                    var mouseX = touch.pageX - offsets.left;

                    if (mouseX < 0) {
                        mouseX = 0;
                    } else if (mouseX > fullWidth) {
                        mouseX = fullWidth;
                    }

                    $(targetElement).find('.before-wrapper').parent().find('.comparison-slider').css({
                        left: mouseX,
                        transition: 'none'
                    });
                    $(targetElement).find('.before-wrapper').find('.after-wrapper').css({
                        transform: 'translateX(' + mouseX + 'px)',
                        transition: 'none'
                    });
                    $(targetElement).find('.before-wrapper').find('.after-image').css({
                        transform: 'translateX(' + -1 * mouseX + 'px)',
                        transition: 'none'
                    });
                }
            });

            $(targetElement).on("mousemove", function (e) {

                if (down) {

                    var offsets = $(targetElement).find('.before-wrapper').offset();
                    var fullWidth = $(targetElement).find('.before-wrapper').width();
                    var mouseX = e.pageX - offsets.left;

                    if (mouseX < 0) {
                        mouseX = 0;
                    } else if (mouseX > fullWidth) {
                        mouseX = fullWidth;
                    }

                    $(targetElement).find('.before-wrapper').parent().find('.comparison-slider').css({
                        left: mouseX,
                        transition: 'none'
                    });
                    $(targetElement).find('.before-wrapper').find('.after-wrapper').css({
                        transform: 'translateX(' + mouseX + 'px)',
                        transition: 'none'
                    });
                    $(targetElement).find('.before-wrapper').find('.after-image').css({
                        transform: 'translateX(' + -1 * mouseX + 'px)',
                        transition: 'none'
                    });
                }
            });

            $(window).resize(function () {
                $(targetElement).find('.comparison-slider').css({
                    left: sliderPos,
                    transition: 'all 1.5s'
                });
                $(targetElement).find('.after-wrapper').css({
                    transform: 'translateX(' + sliderPos + ')',
                    transition: 'all 1.5s'
                });
                $(targetElement).find('.after-image').css({
                    transform: 'translateX(-' + sliderPos + ')',
                    transition: 'all 1.5s'
                });
            });
        })();
    } else {
        console.log("Error: could not load slider. A parameter is missing");
    }
}