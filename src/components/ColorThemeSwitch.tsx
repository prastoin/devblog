import { useMachine } from '@xstate/react';
import { assign, createMachine } from 'xstate';

type ColorTheme = 'dark' | 'light';

const toggleColorThemeMachine = createMachine(
    {
        schema: {
            context: {
                colorTheme: undefined,
            } as { colorTheme: undefined | ColorTheme },
            events: {} as
                | { type: '__RETRIEVED_COLOR_THEME'; colorTheme: ColorTheme }
                | { type: 'TOGGLE' },
        },
        initial: 'retrievingColorThemeFromLocalStorage',
        states: {
            retrievingColorThemeFromLocalStorage: {
                invoke: {
                    src: 'retrieveColorThemeFromLocalStorage',
                },

                on: {
                    __RETRIEVED_COLOR_THEME: [
                        {
                            cond: 'isDark',
                            actions: 'assignDarkToColorTheme',
                            target: 'dark',
                        },
                        {
                            cond: 'isLight',
                            actions: 'assignLightToColorTheme',
                            target: 'light',
                        },
                    ],
                },
            },

            dark: {
                invoke: {
                    src: 'addDarkFromDocumentClassList',
                },

                on: {
                    TOGGLE: {
                        target: 'light',
                        actions: 'assignLightToColorTheme',
                    },
                },
            },
            light: {
                invoke: {
                    src: 'removeDarkFromDocumentClassList',
                },

                on: {
                    TOGGLE: {
                        target: 'dark',
                        actions: 'assignDarkToColorTheme',
                    },
                },
            },
        },
    },
    {
        guards: {
            isDark: (_context, event) =>
                event.type === '__RETRIEVED_COLOR_THEME' &&
                event.colorTheme === 'dark',
            isLight: (_context, event) =>
                event.type === '__RETRIEVED_COLOR_THEME' &&
                event.colorTheme === 'light',
        },
        services: {
            removeDarkFromDocumentClassList: () => () => {
                document.documentElement.classList.remove('dark');
            },

            addDarkFromDocumentClassList: () => () => {
                document.documentElement.classList.add('dark');
            },

            retrieveColorThemeFromLocalStorage: () => (sendBack) => {
                if (typeof window === 'undefined')
                    throw new Error('page not built');
                const localStorageColorThemeValue =
                    localStorage.getItem('color-theme');

                switch (localStorageColorThemeValue) {
                    case 'light':
                    case 'dark': {
                        sendBack({
                            type: '__RETRIEVED_COLOR_THEME',
                            colorTheme: localStorageColorThemeValue,
                        });
                        break;
                    }
                    default: {
                        sendBack({
                            type: '__RETRIEVED_COLOR_THEME',
                            colorTheme: 'light',
                        });
                    }
                }
            },
        },
        actions: {
            assignDarkToColorTheme: assign({
                colorTheme: () => 'dark' as ColorTheme,
            }),
            assignLightToColorTheme: assign({
                colorTheme: () => 'light' as ColorTheme,
            }),
        },
    },
);

const ColorThemeSwitch: React.FC = () => {
    const [state, send] = useMachine(toggleColorThemeMachine);

    const handleOnClick = () => {
        send({
            type: 'TOGGLE',
        });
    };

    return (
        <button
            onClick={() => {
                console.log('coucou');
                handleOnClick();
            }}
        >
            {state.context.colorTheme || 'loading'}
        </button>
    );
};

export default ColorThemeSwitch;
