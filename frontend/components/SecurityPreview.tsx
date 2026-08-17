import { GaugeIcon, ShieldAlertIcon } from "./Icons";

export function SecurityPreview() {
    return (
        <div className="relative">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl shadow-black/20">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                                System status
                            </p>

                            <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                                Security posture
                            </p>
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-[var(--success)]/20 bg-[var(--success)]/10 px-3 py-1.5 text-xs font-medium text-[var(--success)]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                            Secure
                        </div>
                    </div>

                    <div className="mt-8 flex items-end justify-between gap-6">
                        <div>
                            <p className="text-6xl font-semibold tracking-tight text-[var(--text-primary)]">
                                94
                            </p>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Security score / 100
                            </p>
                        </div>

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                            <GaugeIcon className="h-8 w-8 text-[var(--accent)]" />
                        </div>
                    </div>

                    <div className="my-8 h-px bg-[var(--border)]" />

                    <div className="space-y-4">
                        <SecurityMetric label="Critical" value="0" status="safe" />
                        <SecurityMetric label="High" value="2" status="warning" />
                        <SecurityMetric label="Medium" value="7" status="neutral" />
                        <SecurityMetric label="Low" value="14" status="neutral" />
                    </div>

                    <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)]/10">
                                <ShieldAlertIcon className="h-5 w-5 text-[var(--accent)]" />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-[var(--text-primary)]">
                                    2 high-risk findings
                                </p>

                                <p className="text-xs text-[var(--text-secondary)]">
                                    Review recommended actions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SecurityMetric({
    label,
    value,
    status,
}: {
    label: string;
    value: string;
    status: "safe" | "warning" | "neutral";
}) {
    const dotClass =
        status === "safe"
            ? "bg-[var(--success)]"
            : status === "warning"
                ? "bg-[var(--accent)]"
                : "bg-slate-500";

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${dotClass}`} />

                <span className="text-sm text-[var(--text-secondary)]">
                    {label}
                </span>
            </div>

            <span className="font-mono text-sm text-[var(--text-primary)]">
                {value}
            </span>
        </div>
    );
}