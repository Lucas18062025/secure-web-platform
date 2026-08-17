type IconProps = {
    className?: string;
};

export function ScanIcon({ className = "h-5 w-5" }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden="true"
        >
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path d="M16 3h3a2 2 0 0 1 2 2v3" />
            <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 7v2M12 15v2M7 12h2M15 12h2" />
        </svg>
    );
}

export function ShieldAlertIcon({ className = "h-5 w-5" }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden="true"
        >
            <path d="M12 3 5 6v5c0 4.8 2.9 8 7 10 4.1-2 7-5.2 7-10V6l-7-3Z" />
            <path d="M12 8v4" />
            <circle cx="12" cy="15.5" r=".7" fill="currentColor" stroke="none" />
        </svg>
    );
}

export function GaugeIcon({ className = "h-5 w-5" }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden="true"
        >
            <path d="M4 15a8 8 0 1 1 16 0" />
            <path d="M6 18h12" />
            <path d="m12 12 3-3" />
            <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
    );
}

export function SlidersIcon({ className = "h-5 w-5" }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden="true"
        >
            <path d="M4 7h16" />
            <path d="M4 17h16" />
            <circle cx="9" cy="7" r="2" />
            <circle cx="15" cy="17" r="2" />
        </svg>
    );
}

export function ArrowUpRightIcon({ className = "h-4 w-4" }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden="true"
        >
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
        </svg>
    );
}

export function CheckIcon({ className = "h-4 w-4" }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={className}
            aria-hidden="true"
        >
            <path d="m5 12 4 4L19 6" />
        </svg>
    );
}
export function GitHubIcon({ className = "h-4 w-4" }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.01c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.24 5.68.41.35.77 1.04.77 2.1v3.1c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
    );
}

export function LinkedInIcon({ className = "h-4 w-4" }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M5.2 3.5A2.3 2.3 0 1 1 .6 3.5a2.3 2.3 0 0 1 4.6 0ZM1 8h4.4v14H1V8Zm7 0h4.2v1.9h.1c.58-1.1 2.01-2.25 4.14-2.25 4.43 0 5.25 2.92 5.25 6.72V22h-4.4v-6.73c0-1.61-.03-3.68-2.24-3.68-2.24 0-2.58 1.75-2.58 3.56V22H8V8Z" />
        </svg>
    );
}

export function GlobeIcon({ className = "h-4 w-4" }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
        </svg>
    );
}

export function MailIcon({ className = "h-4 w-4" }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden="true"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
        </svg>
    );
}