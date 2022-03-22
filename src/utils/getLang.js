"use strict";

module.exports = (filePathStem, collection) => {
    return filePathStem.replace(new RegExp(`\/collections\/${collection}\/([A-Za-z-]*)\/[A-Za-z0-9-/]*`, "g"), "$1");
};
