import { useMachine } from '@xstate/react';
import { assign, createMachine } from 'xstate';

type ColorTheme = 'dark' | 'light' | 'default';

const toggleColorThemeMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOigHsCoARdAJwGsBiRUAB3NlwBddz9WIAB6IALAHYAHCQCMANjkBmSQAZxKgJziNMgDQgAnog0AmRSRWiArIpMzRimRo2KNAXzf60WPIVIUqABlcKGxuFiQQDi5efkERBFE5DRIrexUrURMNFRUZSX0jBDlxOVkzKxVHOVFRXMUPLwwcAmIySnwaMAAzdABXABtwwWiePgFIhOsUkpLnKUlkk0krQsR7cRJsmx0ZcUUatRNGkG8WvyYAcQB5AH1qAEEAJQBpEc4xuMnEORVU0R0GkkjnEVisklKawQMhUkhSdkylkUsLq4mOnlOzV8xCud0CAElLgAJAAq7xi43iPz+mUBwL2YIhcihkiyWxc4N+dUkMgOJzO2KIuPuAFEAGIPACqgTJkVGsQmoASv3+dJBjMhhkQVg0VhIinEexK4n2di0Hgx+HIEDgggFrVIdDA3DouDAADcqABhcgDch0EnYMCoMBiujkVCBciYdADADK3H96Bg5M+iuE1NVTnpoPBmqKElEJCyMjMJjspZMyVE-KxDvaVFojFTCqpCBsZVKeWW+Rs4IKWuhmhS1VLDhklTkVlrPnrAU6wVC3BblO+7YOJC7pZ5K0U-ZZVhM+o0DhUXPEEnsM-ObXnXV6g2Xco+rbXHc3v23vb3kgHRV+eoSCYogQiaQImnI16CiuXxKogG60tm6p5syg4qjUDiglIuw8g0FpAA */
    createMachine(
        {
            tsTypes: {} as import('./ColorThemeSwitch.typegen').Typegen0,
            schema: {
                context: {
                    colorTheme: undefined,
                } as { colorTheme: undefined | ColorTheme },
                events: {} as
                    | { type: 'GO_DARK' }
                    | { type: 'GO_LIGHT' }
                    | { type: 'GO_DEFAULT' },
            },

            id: '(machine)',
            initial: 'retrievingColorThemeFromLocalStorage',
            states: {
                retrievingColorThemeFromLocalStorage: {
                    invoke: {
                        src: 'retrieveColorThemeFromLocalStorage',
                    },
                },

                goingDark: {
                    entry: [
                        'assignDarkToColorTheme',
                        'saveColorThemeInLocalStorage',
                        'addDarkFromDocumentClassList',
                    ],

                    on: {
                        GO_DARK: undefined,
                    },
                },

                goingLight: {
                    entry: [
                        'assignLightToColorTheme',
                        'saveColorThemeInLocalStorage',
                        'removeDarkFromDocumentClassList',
                    ],

                    on: {
                        GO_LIGHT: undefined,
                    },
                },

                goingDefault: {
                    entry: [
                        'assignDefaultToColorTheme',
                        'saveColorThemeInLocalStorage',
                    ],

                    on: {
                        GO_DEFAULT: undefined,
                    },
                },
            },

            on: {
                GO_DARK: {
                    target: '#(machine).goingDark',
                },
                GO_LIGHT: {
                    target: '#(machine).goingLight',
                },
                GO_DEFAULT: [
                    {
                        cond: 'browserMediaPreferenceIsDark',
                        actions: 'addDarkFromDocumentClassList',
                        target: '#(machine).goingDefault',
                    },
                    {
                        actions: 'removeDarkFromDocumentClassList',
                        target: '#(machine).goingDefault',
                    },
                ],
            },
        },
        {
            guards: {
                browserMediaPreferenceIsDark: () =>
                    window.matchMedia('(prefers-color-scheme: dark)').matches,
            },
            services: {
                retrieveColorThemeFromLocalStorage: () => (sendBack) => {
                    if (typeof window === 'undefined')
                        throw new Error('page not built');

                    const colorThemeLocalStorageValue =
                        localStorage.getItem('color-theme');

                    const colorThemeLocalStorageIsDark =
                        colorThemeLocalStorageValue === 'dark';

                    const colorThemeLocalStorageIsLight =
                        colorThemeLocalStorageValue === 'light';

                    if (colorThemeLocalStorageIsDark) {
                        sendBack({
                            type: 'GO_DARK',
                        });
                    } else if (colorThemeLocalStorageIsLight) {
                        sendBack({
                            type: 'GO_LIGHT',
                        });
                    } else {
                        sendBack({
                            type: 'GO_DEFAULT',
                        });
                    }
                },
            },
            actions: {
                saveColorThemeInLocalStorage: (context) => {
                    if (typeof window === 'undefined')
                        throw new Error('page not built');

                    if (context.colorTheme !== undefined) {
                        localStorage.setItem('color-theme', context.colorTheme);
                    }
                },

                removeDarkFromDocumentClassList: () => {
                    document.documentElement.classList.remove('dark');
                },

                addDarkFromDocumentClassList: () => {
                    document.documentElement.classList.add('dark');
                },

                assignDarkToColorTheme: assign({
                    colorTheme: () => 'dark',
                }),
                assignLightToColorTheme: assign({
                    colorTheme: () => 'light',
                }),
                assignDefaultToColorTheme: assign({
                    colorTheme: () => 'default',
                }),
            },
        },
    );

const ColorThemeSwitch: React.FC = () => {
    const [_state, send] = useMachine(toggleColorThemeMachine);
    return (
        <>
            <button
                onClick={() => {
                    send({
                        type: 'GO_DARK',
                    });
                }}
            >
                Go dark
            </button>
            <button
                onClick={() => {
                    send({
                        type: 'GO_LIGHT',
                    });
                }}
            >
                Go light
            </button>
            <button
                onClick={() => {
                    send({
                        type: 'GO_DEFAULT',
                    });
                }}
            >
                Go default
            </button>
        </>
    );
};

export default ColorThemeSwitch;
