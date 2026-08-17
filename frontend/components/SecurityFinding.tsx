import { ShieldAlertIcon } from "./Icons";

export function SecurityFinding() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-24">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                        Human-readable security
                    </p>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                        Security findings without the noise.
                    </h2>

                    <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                        Technical information matters. Context matters more. Findings
                        should explain what happened, why it matters and what to do next.
                    </p>
                </div>

                <article className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                                <ShieldAlertIcon />
                            </div>

                            <div>
                                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                                    HIGH
                                </p>

                                <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
                                    Improper access control
                                </h3>
                            </div>
                        </div>

                        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                            Example
                        </span>
                    </div>

                    <div className="mt-8 grid gap-6 border-t border-[var(--border)] pt-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                                Impact
                            </p>

                            <p className="mt-2 text-sm leading-7 text-[var(--text-primary)]">
                                Unauthorized users may access restricted resources.
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                                Recommendation
                            </p>

                            <p className="mt-2 text-sm leading-7 text-[var(--text-primary)]">
                                Implement server-side authorization checks for every protected
                                resource.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
                            <code>
                                finding.category = &quot;broken-access-control&quot;
                                <br />
                                severity = &quot;high&quot;
                                <br />
                                remediation = &quot;server-side authorization&quot;
                            </code>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}