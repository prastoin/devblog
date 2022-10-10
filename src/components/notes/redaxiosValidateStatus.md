---
title: Redaxios ValidateStatus
publishDate: 20 mar 2022
name: prastoin
---

[Axios](https://github.com/axios/axios) the great Http client for browser and nodejs also existing as a minified lib called [Redaxios](https://github.com/developit/redaxios) allowing you to perform basic RESTful calls. Both defaultly throws an error while encountering an error scoped http status response (default: 200-399 is a success).<br/>
While implementing a form validation I needed more granularity to handle errors. In this way axios provides an config option named [ValidateStatus](https://axios-http.com/docs/req_config)

You can either always return true inside validate status manually and handle every http response code

```ts
import redaxios from 'redaxios';

const rawResponse = await redaxios.get('/route', {
    validateStatus: () => true,
});

console.log(rawResponse.status);
// => can be anything ( 500, 404, 200...)
```

Or you can provide your own http status range, in the example below redaxios will throw an error on http status code 500

```ts
import redaxios from 'redaxios';

const rawResponse = await redaxios.get('/route', {
    validateStatus: (status) => status >= 200 && status <= 499,
});

console.log(rawResponse.status);
// => can be anything between 200 and 499
```
