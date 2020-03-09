# stylelint-disallow-at-rule

stylelint-disallow-at-rule is a stylelint rule to disallow at-rule specifically.

## Purpose

In my opinion, `@extend` makes stylesheet complexity and reduces maintainability.

I think it should not use in many cases.

I'd like to disallow using `@extend`.

## Install an usage

stylelint-disallow-at-rule is a plugin for [stylelint](https://github.com/stylelint/stylelint).

First, install stylelint-disallow-at-rule (and stylelint) via npm:

```
npm install st  ylelint stylelint-disallow-at-rule
```

## Config

Create `.stylelintrc.json` config file (if you haven't).

Add `stylelint-disallow-at-rule` to the plugins array and add the rule `disallow-at-rule/rules` to `rules`.

```json
{
  "plugins": ["stylelint-disallow-at-rule"],
  "rules": {
    "disallow-at-rule/rules": [true, ["extend"]]
  }
}
```

This plugin has only one rule `"stylelint-disallow-at-rule"`.

You can set rule name multiply:

```json
{
  "plugins": ["stylelint-disallow-at-rule"],
  "rules": {
    "disallow-at-rule/rules": [true, ["extend", "at-root"]]
  }
}
```

## Examples

### Source

```scss
@mixin purple {
  color: purple;
}

.hoge {
  color: red;
  .fuga {
    color: blue;
  }
}

.hogehoge {
  @at-root {
    .hogefuga {
      @extend .hoge;
    }
    .fuga {
      @include purple;
    }
  }
}
```

### Config

```json
{
  "plugins": ["stylelint-disallow-at-rule"],
  "rules": {
    "disallow-at-rule/rules": [true, ["extend", "at-root"]]
  }
}
```

### Result

```
test.scss
 13:3  ✖  Disallowed at-rule "@at-root" was found   disallow-at-rule/rules
 15:7  ✖  Disallowed at-rule "@extend" was found    disallow-at-rule/rules
```
