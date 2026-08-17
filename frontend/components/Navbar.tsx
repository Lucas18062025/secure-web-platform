export function Navbar() {
    return (
        <header className="border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                        <span className="text-sm font-semibold text-[var(--accent)]">
                            SWP
                        </span>
                    </div>

                    <div>
                        <p className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
                            Secure Web Platform
                        </p>

                        <p className="text-xs text-[var(--text-secondary)]">
                            Security engineering platform
                        </p>
                    </div>
                </div>

                <nav
                    className="hidden items-center gap-8 md:flex"
                    aria-label="Primary navigation"
                >
                    <a
                        href="#platform"
                        className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                    >
                        Platform
                    </a>

                    <a
                        href="#security"
                        className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                    >
                        Security
                    </a>

                    <a
                        href="#architecture"
                        className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                    >
                        Architecture
                    </a>

                    <a
                        href="#about"
                        className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                    >
                        About
                    </a>
                </nav>

                <div className="flex items-center gap-3">
                    <button className="hidden rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:block">
                        Sign in
                    </button>

                    <button className="rounded-lg border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#0B0D0F] transition hover:bg-[var(--accent-soft)]">
                        Get started
                    </button>
                </div>
            </div>
        </header>
    );
}