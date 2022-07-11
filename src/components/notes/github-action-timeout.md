---
title: Docker compose down volumes
publishDate: 31 mar 2022
name: prastoin
---

I've faced an issue where a GitHub action entered an infinite loop.
GitHub actions configuration allows you to set a global timeout for a job as follows.

```yml
my-job:
    runs-on: ubuntu-latest
    timeout-minutes: 30
```
