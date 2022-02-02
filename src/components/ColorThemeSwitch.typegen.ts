// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
    '@@xstate/typegen': true;
    eventsCausingActions: {
        addDarkFromDocumentClassList: 'GO_DEFAULT' | 'GO_DARK';
        removeDarkFromDocumentClassList: 'GO_DEFAULT' | 'GO_LIGHT';
        assignDarkToColorTheme: 'GO_DARK';
        saveColorThemeInLocalStorage: 'GO_DARK' | 'GO_LIGHT' | 'GO_DEFAULT';
        assignLightToColorTheme: 'GO_LIGHT';
        assignDefaultToColorTheme: 'GO_DEFAULT';
    };
    internalEvents: {
        'xstate.init': { type: 'xstate.init' };
    };
    invokeSrcNameMap: {
        retrieveColorThemeFromLocalStorage: 'done.invoke.(machine).retrievingColorThemeFromLocalStorage:invocation[0]';
    };
    missingImplementations: {
        actions: never;
        services: never;
        guards: never;
        delays: never;
    };
    eventsCausingServices: {
        retrieveColorThemeFromLocalStorage: 'xstate.init';
    };
    eventsCausingGuards: {
        browserMediaPreferenceIsDark: 'GO_DEFAULT';
    };
    eventsCausingDelays: {};
    matchesStates:
        | 'retrievingColorThemeFromLocalStorage'
        | 'goingDark'
        | 'goingLight'
        | 'goingDefault';
    tags: never;
}
