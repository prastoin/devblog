---
title: GitHub action timeout
publishDate: 3 may 2022
name: prastoin
---

I've faced an issue where a GitHub action entered an infinite loop.
GitHub actions configuration allows you to set a global timeout for a job as follows.

```
my-job:
    runs-on: ubuntu-latest
    timeout-minutes: 30
```
