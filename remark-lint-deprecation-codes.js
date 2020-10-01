"use strict";

const visit = require("unist-util-visit");
const rule = require("unified-lint-rule");

const DEPRECATION = /^DEP\d+:\s/;

function validateDeprecationCodes(tree, file) {
  if (file.basename !== "deprecations.md") return;

  visit(
    tree,
    {
      type: "heading",
      depth: 3,
    },
    (node) => {
      const [deprecationCode] = node.children;
      if (
        !deprecationCode ||
        deprecationCode.type !== "text" ||
        !DEPRECATION.test(deprecationCode.value)
      )
        file.message("Invalid deprecation code", node);
    }
  );
}

module.exports = rule(
  "remark-lint:nodejs-lint-deprecation-codes",
  validateDeprecationCodes
);
