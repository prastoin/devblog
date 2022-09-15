// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
    '@@xstate/typegen': true;
    internalEvents: {
        'done.invoke.(machine).Retrieving color theme from localStorage:invocation[0]': {
            type: 'done.invoke.(machine).Retrieving color theme from localStorage:invocation[0]';
            data: unknown;
            __tip: 'See the XState TS docs to learn how to strongly type this.';
        };
        'error.platform.(machine).Retrieving color theme from localStorage:invocation[0]': {
            type: 'error.platform.(machine).Retrieving color theme from localStorage:invocation[0]';
            data: unknown;
        };
        'xstate.after(LOCALSTORAGE_RETRY_DELAY)#(machine).Wait for localStorage retry': {
            type: 'xstate.after(LOCALSTORAGE_RETRY_DELAY)#(machine).Wait for localStorage retry';
        };
        'xstate.init': { type: 'xstate.init' };
    };
    invokeSrcNameMap: {
        'Retrieve color theme from localStorage': 'done.invoke.(machine).Retrieving color theme from localStorage:invocation[0]';
    };
    missingImplementations: {
        actions: never;
        services: never;
        guards: never;
        delays: never;
    };
    eventsCausingActions: {
        'Apply dark theme to document':
            | 'GO_DARK'
            | 'GO_DEFAULT'
            | 'done.invoke.(machine).Retrieving color theme from localStorage:invocation[0]';
        'Assign dark theme to context':
            | 'GO_DARK'
            | 'done.invoke.(machine).Retrieving color theme from localStorage:invocation[0]';
        'Assign default theme to context':
            | 'GO_DEFAULT'
            | 'done.invoke.(machine).Retrieving color theme from localStorage:invocation[0]';
        'Assign light theme to context':
            | 'GO_LIGHT'
            | 'done.invoke.(machine).Retrieving color theme from localStorage:invocation[0]';
        'Persist context colorTheme value into LocalStorage':
            | 'GO_DARK'
            | 'GO_DEFAULT'
            | 'GO_LIGHT'
            | 'done.invoke.(machine).Retrieving color theme from localStorage:invocation[0]';
        'Remove dark theme from document':
            | 'GO_DEFAULT'
            | 'GO_LIGHT'
            | 'done.invoke.(machine).Retrieving color theme from localStorage:invocation[0]';
    };
    eventsCausingServices: {
        'Retrieve color theme from localStorage':
            | 'GO_DARK'
            | 'GO_DEFAULT'
            | 'GO_LIGHT'
            | 'xstate.after(LOCALSTORAGE_RETRY_DELAY)#(machine).Wait for localStorage retry'
            | 'xstate.init';
    };
    eventsCausingGuards: {
        'Browser media preference is dark': 'GO_DEFAULT';
        'Retrieved dark from localStorage': 'done.invoke.(machine).Retrieving color theme from localStorage:invocation[0]';
        'Retrieved light from localStorage': 'done.invoke.(machine).Retrieving color theme from localStorage:invocation[0]';
    };
    eventsCausingDelays: {
        LOCALSTORAGE_RETRY_DELAY: 'error.platform.(machine).Retrieving color theme from localStorage:invocation[0]';
    };
    matchesStates:
        | 'Retrieving color theme from localStorage'
        | 'Wait for localStorage retry'
        | 'goingDark'
        | 'goingDefault'
        | 'goingDefault.dark'
        | 'goingDefault.light'
        | 'goingLight'
        | { goingDefault?: 'dark' | 'light' };
    tags: 'Loading localStorage';
}
