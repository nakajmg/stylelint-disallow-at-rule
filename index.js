var stylelint = require("stylelint");

var ruleName = "disallow-at-rule/disallow-at-rule";
var messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: atRuleName => 'Disallowed at-rule "@' + atRuleName + '" was found'
});

var AT_RULE_TYPE = "atrule";
var AT_EXTEND = "extend";

function isDisallowedAtRule(disallowedRuleNames, rule) {
  disallowedRuleNames = disallowedRuleNames || [];
  if (rule.type !== AT_RULE_TYPE) return false;
  return disallowedRuleNames.indexOf(rule.name) !== -1;
}

function ruleFunction(primaryOption, secondaryOption) {
  return function(postcssRoot, postcssResult) {
    var validOptions = stylelint.utils.validateOptions(postcssResult, ruleName);
    if (!validOptions) {
      return;
    }
    if (!primaryOption) {
      return;
    }

    postcssRoot.walkAtRules(rule => {
      if (isDisallowedAtRule(["extend"], rule)) {
        stylelint.utils.report({
          message: messages.rejected(rule.name),
          node: rule,
          ruleName,
          result: postcssResult
        });
      }
    });
  };
}

module.exports = stylelint.createPlugin(ruleName, ruleFunction);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
