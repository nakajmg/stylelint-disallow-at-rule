var stylelint = require("stylelint");
var plugins = ["./index.js"];
var files = ["./test/test.scss"];

function createOptions(atRules) {
  return {
    config: {
      plugins: plugins,
      rules: {
        "disallow-at-rule/rules": [true, atRules]
      }
    },
    files: files
  };
}

describe("disallow-at-rule.test.js", function() {
  test("with error", function() {
    return stylelint.lint(createOptions(["extend"])).then(function(data) {
      expect(data.errored).toBe(true);
    });
  });

  test("without error", function() {
    return stylelint.lint(createOptions(["function"])).then(function(data) {
      expect(data.errored).toBe(false);
    });
  });

  test("with parse error", function() {
    return stylelint
      .lint({
        config: {
          rules: {
            "disallow-at-rule/rules": true
          },
          plugins: plugins
        },
        files: files
      })
      .then(function(data) {
        expect(data.errored).toBe(true);
      });
  });
});
