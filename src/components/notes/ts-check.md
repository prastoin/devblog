---
title: Type checking JavaScript
publishDate: 12 sept 2022
name: prastoin
---

While working on a `POC` or a small script where we don't really wanna bring Typescript.
We can still type checking a JavaScript file with TypeScript in `Visual Studio Code` by adding `// @ts-check` on the top of your file:

```js
// @ts-check

let itsAsEasyAs = "abc";
itsAsEasyAs = 123; // Error: Type '123' is not assignable to type 'string'
```
