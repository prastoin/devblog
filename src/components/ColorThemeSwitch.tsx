import { useMachine } from '@xstate/react';
import { assign, createMachine, DoneInvokeEvent } from 'xstate';
import { after } from 'xstate/lib/actions';

type ColorTheme = "dark" | "light" | "default";

const toggleColorThemeMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOigHsCoARdAJwGsBiRUAB3NlwBddz9WIAB6IALAHYAHCQCMANjkBmSQAZxKgJziNMgDQgAnog0AmRSRWiArIpMzRimRo2KNAXzf60WPIVIUqABlcKGxuFiQQDi5efkERBFE5DRIrexUrURMNFRUZSX0jBDlxOVkzKxVHOVFRXMUPLwwcAmIySnwaMAAzdABXABtwwWiePgFIhOsUkpLnKUlkk0krQsR7cRJsmx0ZcUUatRNGkG8WvyYAcQB5AH1qAEEAJQBpEc4xuMnEORVU0R0GkkjnEVisklKawQMhUkhSdkylkUsLq4mOnlOzV8xCud0CAElLgAJAAq7xi43iPz+mUBwL2YIhcihkiyWxc4N+dUkMgOJzO2KIuPuAFEAGIPACqgTJkVGsQmoASv3+dJBjMhhkQVg0VhIinEexK4n2di0Hgx+HIEDgggFrVIdDA3DouDAADcqABhcgDch0EnYMCoMBiujkVCBciYdADADK3H96Bg5M+iuE1NVTnpoPBmqKElEJCyMjMJjspZMyVE-KxDvaVFojFTCqpCBsZVKeWW+Rs4IKWuhmhS1VLDhklTkVlrPnrAU6wVC3BblO+7YOJC7pZ5K0U-ZZVhM+o0DhUXPEEnsM-ObXnXV6g2Xco+rbXHc3v23vb3kgHRV+eoSCYogQiaQImnI16CiuXxKogG60tm6p5syg4qjUDiglIuw8g0FpAA */
    createMachine(
        {
            tsTypes: {} as import("./ColorThemeSwitch.typegen").Typegen0,
            schema: {
                services: {} as {
                    "Retrieve color theme from localStorage": {
                        data: ColorTheme
                    }
                },
                context: {} as { colorTheme?: ColorTheme },
                events: {} as
                    | { type: 'GO_DARK' }
                    | { type: 'GO_LIGHT' }
                    | { type: 'GO_DEFAULT' },
            },

            preserveActionOrder: true,
            id: '(machine)',
            initial: 'Retrieving color theme from localStorage',
            states: {
                "Retrieving color theme from localStorage": {
                    tags: "Loading localStorage",
                    invoke: {
                        src: 'Retrieve color theme from localStorage',

                        onDone: [
                            {
                                cond: "Retrieved dark from localStorage",
                                target: "goingDark"
                            },
                            {
                                cond: "Retrieved light from localStorage",
                                target: "goingLight"
                            },
                            {
                                target: "goingDefault"
                            }
                        ],


                        onError: {
                            target: "Wait for localStorage retry"
                        }
                    },
                },

                "Wait for localStorage retry": {
                    tags: "Loading localStorage",
                    after: {
                        LOCALSTORAGE_RETRY_DELAY: {
                            target: "Retrieving color theme from localStorage"
                        }
                    }
                },

                goingDark: {
                    entry: [
                        'Apply dark theme to document',
                        'Assign dark theme to context',
                        'Persist context colorTheme value into LocalStorage',
                    ],

                    on: {
                        GO_DARK: undefined,
                    },
                },

                goingLight: {
                    entry: [
                        'Assign light theme to context',
                        'Persist context colorTheme value into LocalStorage',
                        'Remove dark theme from document',
                    ],

                    on: {
                        GO_LIGHT: undefined,
                    },
                },

                goingDefault: {
                    entry: [
                        'Assign default theme to context',
                        'Persist context colorTheme value into LocalStorage',
                    ],

                    states: {
                        "dark": {
                            entry: 'Apply dark theme to document',
                        },

                        "light": {
                            entry: 'Remove dark theme from document',
                        }
                    },


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
                        cond: 'Browser media preference is dark',
                        target: '#(machine).goingDefault.dark',
                    },
                    {
                        target: '#(machine).goingDefault.light',
                    },
                ],
            },
        },
        {
            delays: {
                LOCALSTORAGE_RETRY_DELAY: 500,
                // LOCALSTORAGE_RETRY_SUCCESS_ANIMATION_DELAY: 200
            },
            guards: {
                "Retrieved dark from localStorage": (_context, event) => {
                    return event.data === "dark"
                },
                "Retrieved light from localStorage": (_context, event) => {
                    return event.data === "light"
                },

                "Browser media preference is dark": () =>
                    window.matchMedia('(prefers-color-scheme: dark)').matches,
            },
            services: {
                "Retrieve color theme from localStorage": async (_context, _event) => {
                    if (typeof window === 'undefined')
                        throw new Error('page not built');

                    const colorThemeLocalStorageValue =
                        localStorage.getItem('color-theme');

                    switch (colorThemeLocalStorageValue) {
                        case "default":
                        case "light":
                        case "dark": {
                            return colorThemeLocalStorageValue
                        }
                        default: {
                            return "default"
                        }
                    }
                },
            },
            actions: {
                "Persist context colorTheme value into LocalStorage": (context) => {
                    if (typeof window === 'undefined')
                        throw new Error('page not built');

                    if (context.colorTheme !== undefined) {
                        localStorage.setItem('color-theme', context.colorTheme);
                    }
                },

                "Remove dark theme from document": () => {
                    document.documentElement.classList.remove('dark');
                },

                "Apply dark theme to document": () => {
                    document.documentElement.classList.add('dark');
                },

                "Assign dark theme to context": assign({
                    colorTheme: () => "dark" as ColorTheme,
                }),
                "Assign light theme to context": assign({
                    colorTheme: () => 'light' as ColorTheme,
                }),
                "Assign default theme to context": assign({
                    colorTheme: () => 'default' as ColorTheme,
                }),
            },
        },
    );

const ColorThemeSwitch: React.FC = () => {
    const [state, send] = useMachine(toggleColorThemeMachine);
    const themeValue = state.context.colorTheme === undefined ? "default" : state.context.colorTheme
    const machineIsRetrievingThemeColor = state.hasTag("Loading localStorage")

    function handleOnSelectChange(event: React.FormEvent<HTMLSelectElement>) {
        const value = event.currentTarget.value;

        switch (value) {
            case "dark": {
                send({
                    type: "GO_DARK"
                })
                break;
            }
            case "light": {
                send({
                    type: "GO_LIGHT"
                })
                break;
            }
            case "default": {
                send({
                    type: "GO_DEFAULT"
                })
                break;
            }
            default: {
                throw new Error(`Unknown select value ${value}`)
            }
        }

    }

    if (machineIsRetrievingThemeColor) {
        return <>
            <select disabled={true} value="loading" className="animate-pulse bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="loading">Loading</option>
            </select>
        </>
    }

    return (
        <>
            <select onChange={handleOnSelectChange} value={themeValue} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="default">Default</option>
                <option value="light" >Light</option>
                <option value="dark">Dark</option>

            </select>
        </>
    );
};

export default ColorThemeSwitch;
