import { useState } from 'react';
import ColorThemeSwitch from '../ColorThemeSwitch';

const HeaderLinks: React.FC = () => (
    <>
        <a
            href="/"
            className="text-primary hover:text-secondary hover:underline font-medium"
        >
            Home
        </a>
        <a
            href="/projects"
            className="text-primary hover:text-secondary hover:underline font-medium"
        >
            Projects
        </a>

        <a
            href="/notes"
            className="text-primary hover:text-secondary hover:underline font-medium"
        >
            Notes
        </a>

        <a
            href="/writing"
            className="text-primary hover:text-secondary hover:underline font-medium"
        >
            Writing
        </a>
    </>
);

const BaseHeader: React.FC = () => {
    const [burgerMenuIsExpanded, setExpandBurgerMenu] =
        useState<boolean>(false);

    function handleBurgerMenuButtonOnClick() {
        setExpandBurgerMenu(!burgerMenuIsExpanded);
    }

    return (
        <header className="flex flex-col max-w-none w-full max-w-7xl mx-auto">
            <nav className="mx-auto w-full max-w-4xl py-4 text-gray-900 sm:pb-6">
                <div className="flex mx-auto w-full items-center justify-between">
                    {/* medium and large screen inline header*/}
                    <div className="hidden md:flex flex-row space-x-5 text-lg justify-between">
                        <HeaderLinks />
                    </div>

                    {/* small screen burger menu header*/}
                    <button
                        className="flex flex-col md:hidden justify-center gap-1 self-stretch"
                        onClick={handleBurgerMenuButtonOnClick}
                    >
                        <span
                            aria-hidden="true"
                            className={`h-0.5 w-6 bg-gray-600 transform transition duration-500 ease-in-out ${
                                burgerMenuIsExpanded === true
                                    ? 'rotate-45 absolute'
                                    : ''
                            }`}
                        />
                        <span
                            aria-hidden="true"
                            className={`h-0.5 w-6 bg-gray-600 transform transition duration-500 ease-in-out ${
                                burgerMenuIsExpanded === true ? 'opacity-0' : ''
                            }`}
                        />
                        <span
                            aria-hidden="true"
                            className={`h-0.5 w-6 bg-gray-600 transform  transition duration-500 ease-in-out ${
                                burgerMenuIsExpanded === true
                                    ? '-rotate-45 absolute'
                                    : ''
                            }`}
                        />
                    </button>

                    <div className="items-center">
                        <ColorThemeSwitch />
                    </div>
                </div>

                {/* push content down small screen header content */}
                <div
                    className={`md:hidden flex w-full h-full flex flex-col text-lg overflow-hidden ${
                        burgerMenuIsExpanded === true ? 'h-fit-content' : 'h-0'
                    }`}
                >
                    <HeaderLinks />
                </div>
            </nav>
        </header>
    );
};

export default BaseHeader;
