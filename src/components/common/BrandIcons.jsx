/**
 * Custom Brand SVG Icons
 * Icons not available in lucide-react: Threads, TikTok, Snapchat, XTwitter
 * Each icon accepts `size` and `className` props to match lucide-react API.
 */

export function Threads({ size = 24, className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12.152 2c3.2 0 5.14 1.222 6.29 3.058.59.94.93 2.002 1.058 3.142.13 1.14.08 2.36-.15 3.5-.46 2.28-1.78 4.06-3.76 5.06a7.6 7.6 0 0 1-3.44.94c-1.24.06-2.4-.2-3.44-.74-1.6-.84-2.68-2.24-3.04-4.04-.18-.9-.14-1.82.12-2.7.26-.88.74-1.66 1.4-2.28.66-.62 1.46-1.04 2.36-1.2a4.3 4.3 0 0 1 2.56.28c.78.34 1.42.9 1.86 1.62.44.72.66 1.56.6 2.4-.04.58-.2 1.14-.48 1.62s-.66.88-1.14 1.16c-.48.28-1.02.42-1.58.4a2.1 2.1 0 0 1-1.38-.54c-.36-.34-.56-.8-.56-1.28" />
            <path d="M14.158 8.06c-1.1-.68-2.6-.74-3.76-.06" />
        </svg>
    );
}

export function TikTok({ size = 24, className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
    );
}

export function Snapchat({ size = 24, className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 2.5c-2.2 0-4.2 1.4-4.8 3.6-.3 1.1-.2 2.4-.1 3.5 0 .3-.2.5-.5.5-.6.1-1.2.2-1.6.5-.3.2-.3.5-.1.7.4.4 1 .5 1.6.6.3.1.5.3.4.6-.3 1.2-1.2 2.2-2.2 2.8-.4.2-.5.5-.3.8.3.5 1 .7 1.6.8.1 0 .2.1.2.3.1.4.2.8.4 1 .2.2.6.3 1 .3.6 0 1.2-.2 1.8-.2.8 0 1.4.4 2.2 1 .6.4 1.2.7 2 .7s1.4-.3 2-.7c.8-.6 1.4-1 2.2-1 .6 0 1.2.2 1.8.2.4 0 .8-.1 1-.3.2-.2.3-.6.4-1 0-.2.1-.3.2-.3.6-.1 1.3-.3 1.6-.8.2-.3.1-.6-.3-.8-1-.6-1.9-1.6-2.2-2.8-.1-.3.1-.5.4-.6.6-.1 1.2-.2 1.6-.6.2-.2.2-.5-.1-.7-.4-.3-1-.4-1.6-.5-.3-.1-.5-.2-.5-.5.1-1.1.2-2.4-.1-3.5-.6-2.2-2.6-3.6-4.8-3.6Z" />
        </svg>
    );
}

export function XTwitter({ size = 24, className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m3 21 7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548" />
        </svg>
    );
}
