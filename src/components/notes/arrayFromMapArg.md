---
title: Array.from second argument
publishDate: 7 feb 2022
name: prastoin
---

Today I learned that **Array.from** method takes an function as second argument that will be used to fill the created array.

```ts
const array = Array.from({ length: 5 }, (_value, index) => index);
// [ 0, 1, 2, 3, 4 ]
```

Instead of usually

```ts
const array = Array.from({ length: 5 }).map((_value, index) => index);
// [ 0, 1, 2, 3, 4 ]
```
