/*
Copyright the Fluidic Eleventy copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/fluidic-11ty/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/fluidic-11ty/raw/main/LICENSE.md.
*/

"use strict";

fluid.uiOptions.prefsEditor(".flc-prefsEditor-separatedPanel", {
    terms: {
        "templatePrefix": "/lib/infusion/src/framework/preferences/html",
        "messagePrefix": "/lib/infusion/src/framework/preferences/messages"
    },
    "tocTemplate": "/lib/infusion/src/components/tableOfContents/html/TableOfContents.html",
    "tocMessage": "/lib/infusion/src/framework/preferences/messages/tableOfContents-enactor.json"
});
