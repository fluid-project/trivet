/*
Copyright the Fluidic Eleventy copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/fluidic-11ty/raw/master/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/fluidic-11ty/raw/master/LICENSE.md.
*/

"use strict";

var uio = uio || {};
(function ($, fluid) {
    uio.setupUIO = function (path) {
        path = path || "/";
        fluid.uiOptions.prefsEditor(".flc-prefsEditor-separatedPanel", {
            terms: {
                "templatePrefix": path + "lib/infusion/src/framework/preferences/html",
                "messagePrefix": path + "lib/infusion/src/framework/preferences/messages"
            },
            "tocTemplate": path + "lib/infusion/src/components/tableOfContents/html/TableOfContents.html",
            "tocMessage": path + "lib/infusion/src/framework/preferences/messages/tableOfContents-enactor.json"
        });
    };
})(jQuery, fluid);

uio.setupUIO('/');
