import Icon from 'astro-icon';

// Note that we do not encode URI component the label, it should no contains any url
// reserved characters
// Why ? good question for FTM it's for the table of content's auto build
export interface BaseAnchorProps {
    label: string;
}

const BaseAnchor: React.FC<BaseAnchorProps> = ({ label }) => {
    const encodedId = label.toLowerCase().replace(/[^a-zA-Z0-9-\s]/g,'').split(' ').join('-');

    return (
        <a
            className="cursor-pointer group font-bold inline text-black dark:text-white hover:text-black dark:hover:text-white hover:no-underline"
            id={encodedId}
            href={`#${encodedId}`}
        >
            <span className="inline">{label}</span>
            <span className="ml-2 inline-flex items-baseline">
                <svg
                    className="w-4 h-4 lg:w-5 lg:h-5 underline md:invisible group-hover:visible opacity-80"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M4.4 3h3.085a3.4 3.4 0 0 1 3.4 3.4v.205A3.4 3.4 0 0 1 7.485 10H7V9h.485A2.4 2.4 0 0 0 9.88 6.61V6.4A2.4 2.4 0 0 0 7.49 4H4.4A2.4 2.4 0 0 0 2 6.4v.205A2.394 2.394 0 0 0 4 8.96v1a3.4 3.4 0 0 1-3-3.35V6.4A3.405 3.405 0 0 1 4.4 3zM12 7.04v-1a3.4 3.4 0 0 1 3 3.36v.205A3.405 3.405 0 0 1 11.605 13h-3.09A3.4 3.4 0 0 1 5.12 9.61V9.4A3.4 3.4 0 0 1 8.515 6H9v1h-.485A2.4 2.4 0 0 0 6.12 9.4v.205A2.4 2.4 0 0 0 8.515 12h3.09A2.4 2.4 0 0 0 14 9.61V9.4a2.394 2.394 0 0 0-2-2.36z"
                        clip-rule="evenodd"
                    />
                </svg>
            </span>
        </a>
    );
};

export default BaseAnchor;
