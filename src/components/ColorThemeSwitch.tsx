import { useEffect, useState } from 'react';

type ColorTheme = 'dark' | 'light';

function getLocalStorageColorThemeValue(): ColorTheme {
    if (typeof window === 'undefined') throw new Error('page not built');
    return localStorage.getItem('color-theme') as ColorTheme;
}

function setLocalStorageColorThemeValue(value: ColorTheme) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('color-theme', value);
    }
}

const ColorThemeSwitch: React.FC = () => {
    const [colorTheme, setColorTheme] = useState<ColorTheme>('dark');

    //TODO refactor using xstate
    const handleOnClick = () => {
        if (colorTheme === 'dark') {
            setColorTheme('light');
            setLocalStorageColorThemeValue('light');
            document.documentElement.classList.remove('dark');
        } else {
            setColorTheme('dark');
            setLocalStorageColorThemeValue('dark');
            document.documentElement.classList.add('dark');
        }
    };

    useEffect(() => {
        console.log('useEffect');
        setColorTheme(getLocalStorageColorThemeValue());
    }, []);

    return (
        <button
            onClick={() => {
                console.log('coucou');
                handleOnClick();
            }}
        >
            {colorTheme}
        </button>
    );
};

export default ColorThemeSwitch;
