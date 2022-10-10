---
title: How to diff two commands output
publishDate: 12 sept 2022
name: prastoin
---

While working on a project, we've had to compare two `curl` requests that both returned a web html page.
Instead of saving two tmp files for each curl and then diff the two files, `diff` allows us to use the following expression:

```bash
diff <(command_1) <(command_2)
```

In this way, to be diffing two curl responses we can use:

```bash
diff <(curl url) <(curl url)
```

Note that curl's `--silent` flag can be useful here, see [documentation](https://curl.se/docs/manpage.html#:~:text=progress%2Dmeter.-,%2Ds%2C%20%2D%2Dsilent,-Silent%20or%20quiet)

```
-s, --silent Silent or quiet mode. Don't show progress meter or error messages. Makes Curl mute. It will still output the data you ask for, potentially even to the terminal/stdout unless you redirect it.
```
