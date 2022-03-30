# Adonis Authentication and Socket-io

# Table of contents

1. [Introduction](#introduction)
2. [Some paragraph](#paragraph1)
3. [Another paragraph](#paragraph2)

## 1/ Introduction <a name="introduction"></a>

Often in applications will be used using both authentication and socket protocol.
Sometimes you will need to guard specific http routes and not others. It can be the same for socket events listener.
Depending on your framework there's a lot of idiomatic ways to handle authenticated http communication between a client and a server.
As far as socket event/listener are concerned this can be quite unusual.
<br/>
Some official documentation about adonis & socket-io can be found [here](https://docs.adonisjs.com/cookbooks/socketio-with-adonisjs). But for the moment unless I'm mistaken, nothing about adonis/auth and socket-io.
This is why in this article I'll describe an implementation of adonis authenticated/guarded socket-io listeners using socket-io middlewares.

## 2/ Quick Adonis/auth overview

Adonis provides a plug and play [authentication package](https://docs.adonisjs.com/guides/auth/introduction)
It provides three ways to authenticate your user:
1 - Web guard, using crypted cookies client storage.
2 - Api tokens, generating a token that you have to securely store in your client ( usefull for any system that does not support cookies )
3 - Basic auth, where you pass user credentials on every request
In this article we will be implementing both Web guard and Api Tokens authentication for socket-io.
For http protocol adonis allows you to be check for authentication using authentication guards and routes middlewares:

```ts
//Api Tokens and Web Auth guarded get route using auth guards and route middleware
Route.get('dashboard', async ({ auth, response }) => {
    // authenticated operations...
}.middleware('auth:api,web')
```

Note: Depending on your configuration @adonis/auth will define default auth guards.
Of course you can custom guards

But there's also an other way to look for your user authentication, using the auth `AuthContract` that allows you to use whenever you want any authentication guards. Note that to be able to retrieve an `AuthContract` instance you need to have access to a `HttpContextContract`, we will come back to this point later.

```ts
//Api Tokens and  guarded get route using AuthContract
Route.get('dashboard', async ({ auth, response }) => {
    const user = await auth.use('api').authenticate();
    // authenticated operations...

}

//Web Auth and guarded get route using AuthContract
Route.get('dashboard', async ({ auth, response }) => {
    const user = await auth.use('web').authenticate();
    // authenticated operations...
}
```

## Socket-io and Authentication

Socket-io provides middlewares via `io.use` where you can prevent listeners to be reached.
An socket-io server & adonis example can be found below.
We can retrieve the initial socket initialization http request inside the `socket.request` prop.
We would then be able to retrieve headers cookies etc.
Socket-io-client config options can take an [auth](https://socket.io/fr/docs/v3/client-initialization/#auth) props, where you can store the `Api Tokens` token nor `Basic Auth` credentials and then access them inside `socket.handshake.auth` in the server side.

```ts
import AdonisServer from '@ioc:Adonis/Core/Server';
import { Server } from 'socket.io';

const io = new Server(AdonisServer.instance, {
    cors: {
        origin: true,
        credentials: true,
    },
});

//Here whole socket connection will be rejected
io.use((socket, next) => {
    //You can access socket initial http request here
    console.log(socket.request.headers);

    console.log(socket.handshake.auth);

    next(new Error('middleware error'));
}).on('connection', (socket) => {
    // not triggered as above middleware throws an error
});
```

Socket-io-client also needs that you define [withCredentials](https://socket.io/fr/docs/v3/client-initialization/#withcredentials) prop to true to be able to forward every `Web auth` crypted cookies in the initial http socket initialization request to the server.

```ts
export { io } from 'socket.io-client';

io(SERVER_ENDPOINT, {
    query,
    //For Web Auth
    withCredentials: true,
    //For Api Tokens nor Basic Auth
    auth: {
        credentials: {},
        token: `Bearer ${token}`,
    },
});
```

Note: You can access `socket.Auth` everywhere in your client, for example after authentication operation.

```ts
export { socket } from 'socket.io-client';

socket.auth = {
    Authorization: `Bearer ${token}`,
};
```

Note: [autoConnect](https://socket.io/fr/docs/v3/client-initialization/#autoconnect) socket-io-client config props can be usefull if you don't want to perform a socket connection for an unauthenticated user on your app start.

## 3/ Using Adonis/auth and Socket-io together

From there we know both what expect adonis/auth and socket-io concerning the authentication, lets see how we can use them together.
We know that we will have access to each `Api Tokens` or `Basic Auth` or `Web Auth` token, credentials or cookies inside the socket-io middleware.
But to be able to perform the authentication check we need to have access to an `AuthContract` that itself depends on an `HttpContextContract`.
Adonis provides a tool that allow you to instanciate a `HttpContextContract` from any http request using `HttpContext.create`.
Then we will use the `AuthManager.getAuthForRequest` method passing the instancied `HttpContextContract` to retrieve the `AuthContract` instance.

```ts
import AdonisServer from '@ioc:Adonis/Core/Server';
import { Server } from 'socket.io';
import HttpContext from '@ioc:Adonis/Core/HttpContext';
import AuthManager from '@ioc:Adonis/Addons/Auth';

const io = new Server(AdonisServer.instance, {
    cors: {
        origin: true,
        credentials: true,
    },
});

io.use((socket, next) => {
    //HttpContextContract
    const ctx = HttpContext.create('/', {}, socket.request);

    // AuthContract
    const auth = AuthManager.getAuthForRequest(ctx);
}).on('connection', (socket) => {});
```

Now that we have everything we need there're still few things to setup specific to each authentication mode before being able to perform an authentication check successfully,

## Api Tokens example

As we know Api Tokens involves a crypted token. That we store inside `socket.handshake.auth`.
The problem is, adonis/auth doesn't know about it all, it will check the request `Authorization` header searching for the token ! As we can't set the socket initial http request headers we will have to do it by hand inside socket-io middleware.

Note: You can use socket-io handshake to forward authenticated user to following events listener

Warning: At the moment I'm writing this article, using the `auth.use('api').check()` looks like not working for the `Api Tokens` authentication mode. Anyway using the `auth.use('api').authenticate()` will do the job just beware of catching the exception.

```ts
import AdonisServer from '@ioc:Adonis/Core/Server';
import { Server } from 'socket.io';
import HttpContext from '@ioc:Adonis/Core/HttpContext';
import AuthManager from '@ioc:Adonis/Addons/Auth';
import User from 'App/Models/User';

const io = new Server(AdonisServer.instance, {
    cors: {
        origin: true,
        credentials: true,
    },
});

io.use((socket, next) => {
    const apiAuthToken: undefined | string =
        socket.handshake.auth.Authorization;

    if (apiAuthToken === undefined || apiAuthToken === null) {
        next(new Error('no api auth token provided'));
    }
    //We set the request header authorization, be careful about the Bearer prefix
    socket.request.headers.authorization = apiAuthToken;

    // HttpContextContract
    const ctx = HttpContext.create('/', {}, socket.request);
    //AuthContract
    const auth = AuthManager.getAuthForRequest(ctx);

    try {
        // /!\ Warning I wasn't able to make this work using auth.use('api').check() /!\
        const user = await auth.use('api').authenticate();

        //Will display `false` but above user is correctly defined when authenticated
        console.log(auth.isLoggedIn);

        socket.handshake['user'] = user;
        next();
    } catch (e) {
        console.log('Error api tokens auth socket failed');
        next(new Error('User must be authenticated to init socket connection'));
    }
}).on('connection', (socket) => {
    try {
        const user = socket.handshake['user'];
        //Notifying typescript should never occurs
        if (!user instanceof User) {
            throw new Error('Didnot receive User model instance');
        }

        console.log(user.name);
        //User is authenticated
    } catch (e) {
        console.error(e);
    }
});
```

## Web Auth example

The Web Auth authentication mode depends on the adonis/session package. The we need to initiate it manually inside the socket-io middleware and that's it !

```ts
import AdonisServer from '@ioc:Adonis/Core/Server';
import { Server } from 'socket.io';
import HttpContext from '@ioc:Adonis/Core/HttpContext';
import AuthManager from '@ioc:Adonis/Addons/Auth';
import User from 'App/Models/User';

const io = new Server(AdonisServer.instance, {
    cors: {
        origin: true,
        credentials: true,
    },
});

io.use((socket, next) => {
    // HttpContextContract
    const ctx = HttpContext.create('/', {}, socket.request);
    //AuthContract
    const auth = AuthManager.getAuthForRequest(ctx);

    try {
        const readyOnly = true;
        await ctx.session.initiate(true);
        const isAuthenticated = await auth.use('web').check();

        if (isAuthenticated) {
            socket.handshake['user'] = auth.user;
            next();
        } else {
            next(
                new Error(
                    'User must be authenticated to perform socket protocol',
                ),
            );
        }
    } catch (e) {
        console.log('Adonis session init failed');
        next(new Error('Adonis session init failed'));
    }
}).on('connection', (socket) => {
    try {
        const user = socket.handshake['user'];
        //Notifying typescript should never occurs
        if (!user instanceof User) {
            throw new Error('Didnot receive User model instance');
        }

        console.log(user.name);
        //User is authenticated
    } catch (e) {
        console.error(e);
    }
});
```

## TL;DR

Depending on the adonis/auth authentication you wanna use ( `Web Auth`, `Api Tokens`, `Basic Auth` ) the implementation will differ.
Overall, server-side inside a socket-io middleware we wanna have acces to an `AuthContract` instance to be able to test the provided authentication information. `AuthContract` itself depends on an `HttpContextContract` instance that you can create using the `HttpContext.create` method, then by using `AuthManager.getAuthForRequest` and passing the created context we will be able to create an `AuthContract` instance.

Web Auth:
Client-side we have to instanciate the socket-io-client using the `withCredentials` option to true to forward the client cookies
Server-side we will have to init the adonis/session using `ctx.session.initiate()` method

Api Token:
Client-side we will have to pass the token inside the `socket-io-client` `socket.auth` accessible at anytime via the `socket.auth` props
Server-side we will have to manually define the `request.headers.authorization` prop to allow adonis/auth to retrive the token.

## Conclusion

In my opinion Adonis itself is really powerfull.
I found it really smooth to be working with Adonis as it provides a lot of idiomatic tools avoiding wobbly hacks.
<br/>
Lets say we're working on cross platform app, mobile and web. That then needs to use both `Web Auth` and `Api Tokens` authentication modes.
Nothing is blocking us to verify both authentication modes inside the socket-io middleware !
If you're really interested in something like that you can have a look at this [file](https://github.com/AdonisEnProvence/MusicRoom/blob/master/packages/server/start/socket.ts)

Thanks for reading
Any suggestion are welcomed !
