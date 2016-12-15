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

// Fade Animations
// -------------------------------------------------

function fadeOut(el) {
        el.style.opacity = 1;

        (function fade() {
                if ((el.style.opacity -= .1) < 0) {
                        el.style.display = "none";
                } else {
                        requestAnimationFrame(fade);
                }
        })();
}

// fade in

function fadeIn(el, display) {
        el.style.opacity = 0;
        el.style.display = display || "block";

        (function fade() {
                var val = parseFloat(el.style.opacity);
                if (!((val += .1) > 1)) {
                        el.style.opacity = val;
                        requestAnimationFrame(fade);
                }
        })();
}

// Manage touch events as mouse events
// -------------------------------------------------

function touchHandler(event) {
        var touch = event.changedTouches[0];

        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
                touchstart: "mousedown",
                touchmove: "mousemove",
                touchend: "mouseup"
        }[event.type], true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);

        touch.target.dispatchEvent(simulatedEvent);
        event.preventDefault();
}

// The main course
// -------------------------------------------------

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

                        var thisComparisonSlider = document.querySelector('#' + targetId + ' .comparison-slider');
                        var thisBeforeWrapper = document.querySelector('#' + targetId + ' .before-wrapper');
                        var thisAfterWrapper = document.querySelector('#' + targetId + ' .after-wrapper');
                        var thisAfterImage = document.querySelector('#' + targetId + ' .after-image');
                        var thisAvant = document.querySelector('#' + targetId + ' .avant');
                        var thisApres = document.querySelector('#' + targetId + ' .apres');

                        thisBeforeWrapper.style.background = "url(" + before + ") center no-repeat";
                        thisBeforeWrapper.style.backgroundSize = bgSize;
                        thisAfterImage.style.background = "url(" + after + ") center no-repeat";
                        thisAfterImage.style.backgroundSize = bgSize;

                        var down = false;

                        thisComparisonSlider.addEventListener("mousedown", function () {
                                down = true;
                                fadeOut(thisAvant);
                                fadeOut(thisApres);
                        });

                        targetElement.addEventListener("mouseup", function () {
                                down = false;
                                fadeIn(thisAvant);
                                fadeIn(thisApres);
                        });

                        window.addEventListener("mouseup", function () {
                                down = false;
                        });

                        targetElement.addEventListener("mousemove", function (e) {
                                if (down) {

                                        var offsets = {
                                                top: thisBeforeWrapper.offsetTop,
                                                left: thisBeforeWrapper.offsetLeft
                                        };
                                        var fullWidth = thisBeforeWrapper.clientWidth;
                                        var mouseX = e.pageX - offsets.left;

                                        if (mouseX < 0) {
                                                mouseX = 0;
                                        } else if (mouseX > fullWidth) {
                                                mouseX = fullWidth;
                                        }
                                        console.log(fullWidth);
                                        thisComparisonSlider.style.left = mouseX + "px";
                                        thisComparisonSlider.style.transition = 'opacity 1s ease';

                                        thisAfterWrapper.style.transform = 'translateX(' + mouseX + 'px)';
                                        thisAfterWrapper.style.transition = 'opacity 1s ease';

                                        thisAfterImage.style.transform = 'translateX(' + -1 * mouseX + 'px)';
                                        thisAfterImage.style.transition = 'opacity 1s ease';
                                }
                        });

                        targetElement.addEventListener("touchstart", touchHandler, true);
                        targetElement.addEventListener("touchmove", touchHandler, true);
                        targetElement.addEventListener("touchend", touchHandler, true);
                        targetElement.addEventListener("touchcancel", touchHandler, true);

                        window.onload = function () {
                                thisComparisonSlider.style.left = sliderPos;
                                thisAfterWrapper.style.transform = 'translateX(' + sliderPos + ')';
                                thisAfterImage.style.transform = 'translateX(-' + sliderPos + ')';
                                thisBeforeWrapper.style.opacity = '1';
                                thisAfterImage.style.opacity = '1';
                        };

                        window.addEventListener('resize', function () {

                                thisComparisonSlider.style.left = sliderPos;
                                thisComparisonSlider.style.transition = 'left 1.5s';

                                thisAfterWrapper.style.transform = 'translateX(' + sliderPos + ')';
                                thisAfterWrapper.style.transition = 'transform 1.5s';

                                thisAfterImage.style.transform = 'translateX(-' + sliderPos + ')';
                                thisAfterImage.style.transition = 'transform 1.5s';
                        });
                })();
        } else {
                console.log("Error: could not load slider. A parameter is missing");
        }
}