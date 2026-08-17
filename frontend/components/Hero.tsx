import { ArrowUpRightIcon } from "./Icons";
import { SecurityPreview } from "./SecurityPreview";

export function Hero() {
    return (
        <section
            id="platform"
            className="relative overflow-hidden border-b border-[var(--border)]"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(216,138,61,0.10),transparent_28%)]" />

            <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
                <div>
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--accent-soft)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                        Security engineering platform
                    </div>

                    <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
                        Security that works
                        <span className="block text-[var(--accent)]">
                            before the attack.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                        Understand your attack surface, identify risk and take action from
                        a single security-focused platform.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-4">
                        <button className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-[#0B0D0F] transition hover:bg-[var(--accent-soft)]">
                            Start assessment
                            <ArrowUpRightIcon />
                        </button>

                        <button className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)]">
                            Explore platform
                        </button>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
                        <span>Built for security teams</span>
                        <span>•</span>
                        <span>Human-readable findings</span>
                        <span>•</span>
                        <span>Security by design</span>
                    </div>
                </div>

                <SecurityPreview />
            </div>
        </section>
    );
}