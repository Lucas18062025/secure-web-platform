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