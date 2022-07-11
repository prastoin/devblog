---
title: Docker compose down volumes
publishDate: 31 mar 2022
name: prastoin
---

While using playwright to end to end testing our application, we had to hit from the test context our API to bypass some verification.
We can access from any playwright page an API testing helper. Requests made with this API will use page cookies.

```ts
await page.request.get(`${SERVER_ENDPOINT}/test/bypass-email-confirmation`);
```

In this way inside e2e test we can hit our tests only API routes, using test context authentication.
