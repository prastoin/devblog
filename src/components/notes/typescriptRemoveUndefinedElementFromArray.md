---
title: Remove undefined element from array in typescript
publishDate: 10 feb 2022
name: prastoin
---

I had to use some async method on an array to be generating a new one.
As **array.filter** does not support Promises it leads to be using **array.map** and **Promise.all**.
However using **array.map** means that your outputted array will be containing unwanted undefined occurrences, that you could remove using a filter on the end.
But this wont be enough for typescript itself, even if indeed it would work on runtime.

```js
const rawResults = await Promise.all(
    array.map(async (_, index) => {
        if (await someAsyncFunction(index)) {
            return index;
        }
    }),
);
// const rawResults: (number | undefined)[]

const parsedResults = rawResults.filter((el) => el !== undefined);
// parsedResults still has the same type as rawResults
// const parsedResults: (number | undefined)[]
```

We need some more TS syntax to make the array type as not containing undefined anymore.
Using [type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) we can tell typescript that the filter will return only the expected type

```ts
const rawResults = await Promise.all(
    array.map(async (_, index) => {
        if (await someAsyncFunction(index)) {
            return index;
        }
    }),
);
// const rawResults: (number | undefined)[]

const parsedResults = rawResults.filter(
    (el: number | undefined): el is number => el !== undefined,
);
// const parsedResults: number[]
```
