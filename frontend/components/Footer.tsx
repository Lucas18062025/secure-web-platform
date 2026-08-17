export function Footer() {
    return (
        <footer id="about" className="border-t border-[var(--border)]">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                        Secure Web Platform
                    </p>

                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                        Security engineering with human context.
                    </p>
                </div>

                <p className="text-xs text-[var(--text-secondary)]">
                    Security by design · Development environment
                </p>
            </div>
        </footer>
    );
}