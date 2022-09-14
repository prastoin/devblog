// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
    '@@xstate/typegen': true;
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
    eventsCausingActions: {
        addDarkFromDocumentClassList: 'GO_DARK' | 'GO_DEFAULT';
        assignDarkToColorTheme: 'GO_DARK';
        assignDefaultToColorTheme: 'GO_DEFAULT';
        assignLightToColorTheme: 'GO_LIGHT';
        removeDarkFromDocumentClassList: 'GO_DEFAULT' | 'GO_LIGHT';
        saveColorThemeInLocalStorage: 'GO_DARK' | 'GO_DEFAULT' | 'GO_LIGHT';
    };
    eventsCausingServices: {
        retrieveColorThemeFromLocalStorage:
            | 'GO_DARK'
            | 'GO_DEFAULT'
            | 'GO_LIGHT'
            | 'xstate.init';
    };
    eventsCausingGuards: {
        browserMediaPreferenceIsDark: 'GO_DEFAULT';
    };
    eventsCausingDelays: {};
    matchesStates:
        | 'goingDark'
        | 'goingDefault'
        | 'goingLight'
        | 'retrievingColorThemeFromLocalStorage';
    tags: never;
}
