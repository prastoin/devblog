---
title: Docker compose down volumes
publishDate: 2 mar 2022
name: prastoin
---

Instead of connecting to the container storage to wipe it we can use the `--volumes` flag.

```bash
docker-compose down --volumes
```

It will remove any container related volumes.
