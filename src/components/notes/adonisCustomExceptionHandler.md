---
title: Adonis custom exceptions
publishDate: 1 feb 2022
name: prastoin
---

While implementing some authentication logic on an adonis project. I needed at some point to throw a specific http code status
In this case a **403 forbidden**.

Adonis thanks to it's [global exceptions handler](https://docs.adonisjs.com/guides/exception-handling#handling-exceptions-globally) will manage exceptions for you.

```ts
Route.get('dashboard', async ({ auth, response }) => {
    //If someCode comes to throw an error,
    //then adonis global exception listener will handle it
    await auth.Authenfication();

    // business logic
});

//Instead of usually
Route.get('dashboard', async ({ auth, response }) => {
    if (!auth.isLoggedIn) {
        return response.status(401).send('Unauthenticated');
    }

    // business logic
});
```

Adonis provides an idiomatic way to raise custom exceptions manually.<br/> Using adonis [custom execeptions](https://docs.adonisjs.com/guides/exception-handling#custom-exceptions), it's possible to throw custom exception to the global exception listener at any time.<br/>
You can use adonis CLI to init your custom exception as follows

```bash
node ace make:exception Forbidden
# CREATE: app/Exceptions/ForbiddenException.ts
```

Then add static context to the created custom exception if necessary.

```ts
//app/Exceptions/ForbiddenException.ts
import { Exception } from '@adonisjs/core/build/standalone';

export default class ForbiddenException extends Exception {
    constructor() {
        const message = 'Access forbidden';
        const status = 403;
        const errorCode = 'E_FORBIDDEN';

        super(message, status, errorCode);
    }
}
```

Finally use it inside any route handler

```ts
import ForbiddenException from 'App/Exceptions/ForbiddenException';

Route.get('dashboard', async ({ auth, response }) => {
    if (someCondition) {
        throw new ForbiddenException();
    }

    // business logic
});
```
