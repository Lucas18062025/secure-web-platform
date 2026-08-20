export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
            <header className="border-b border-[var(--border)]">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div>
                        <p className="text-lg font-semibold">Secure Web Platform</p>
                        <p className="mt-1 text-xs text-[var(--text-secondary)]">
                            Security dashboard
                        </p>
                    </div>

                    <div className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--success)]">
                        System secure
                    </div>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-10">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                        Dashboard
                    </p>

                    <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Security posture
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                        A centralized view of your current security posture, findings,
                        assets and recent activity.
                    </p>
                </div>

                {/* Security metrics */}
                <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    <MetricCard
                        label="Security Score"
                        value="94"
                        suffix="/100"
                        accent="score"
                    />

                    <MetricCard
                        label="Critical"
                        value="0"
                        suffix="findings"
                        accent="safe"
                    />

                    <MetricCard
                        label="High"
                        value="2"
                        suffix="findings"
                        accent="warning"
                    />

                    <MetricCard
                        label="Assets"
                        value="6"
                        suffix="monitored"
                        accent="neutral"
                    />
                </div>

                {/* Main dashboard */}
                <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                                    Findings
                                </p>

                                <h2 className="mt-2 text-xl font-semibold">
                                    Recent security findings
                                </h2>
                            </div>

                            <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                                Example data
                            </span>
                        </div>

                        <div className="mt-6 space-y-3">
                            <FindingRow
                                severity="HIGH"
                                title="Improper access control"
                                category="Broken access control"
                            />

                            <FindingRow
                                severity="HIGH"
                                title="Weak security headers"
                                category="Security configuration"
                            />

                            <FindingRow
                                severity="MEDIUM"
                                title="Information disclosure"
                                category="Information exposure"
                            />

                            <FindingRow
                                severity="LOW"
                                title="Missing security policy"
                                category="Security configuration"
                            />
                        </div>
                    </section>

                    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                        <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                            Assets
                        </p>

                        <h2 className="mt-2 text-xl font-semibold">
                            Monitored assets
                        </h2>

                        <div className="mt-6 space-y-4">
                            <AssetRow
                                name="web-application"
                                type="Web application"
                                status="Healthy"
                            />

                            <AssetRow
                                name="api-service"
                                type="REST API"
                                status="Needs review"
                            />

                            <AssetRow
                                name="admin-portal"
                                type="Web application"
                                status="Healthy"
                            />
                        </div>
                    </section>
                </div>

                {/* Activity */}
                <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                        Activity
                    </p>

                    <h2 className="mt-2 text-xl font-semibold">
                        Recent activity
                    </h2>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <ActivityItem
                            title="Security scan completed"
                            description="web-application"
                        />

                        <ActivityItem
                            title="Finding updated"
                            description="Improper access control"
                        />

                        <ActivityItem
                            title="Asset added"
                            description="admin-portal"
                        />
                    </div>
                </section>
            </section>
        </main>
    );
}

function MetricCard({
    label,
    value,
    suffix,
    accent,
}: {
    label: string;
    value: string;
    suffix: string;
    accent: "score" | "safe" | "warning" | "neutral";
}) {
    const accentClass =
        accent === "score"
            ? "text-[var(--accent)]"
            : accent === "safe"
                ? "text-[var(--success)]"
                : accent === "warning"
                    ? "text-[var(--accent-soft)]"
                    : "text-[var(--text-primary)]";

    return (
        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                {label}
            </p>

            <div className="mt-5 flex items-end gap-2">
                <span className={`text-4xl font-semibold ${accentClass}`}>
                    {value}
                </span>

                <span className="mb-1 text-xs text-[var(--text-secondary)]">
                    {suffix}
                </span>
            </div>
        </article>
    );
}

function FindingRow({
    severity,
    title,
    category,
}: {
    severity: string;
    title: string;
    category: string;
}) {
    const severityClass =
        severity === "HIGH"
            ? "text-[var(--accent)]"
            : severity === "MEDIUM"
                ? "text-[var(--accent-soft)]"
                : "text-[var(--text-secondary)]";

    return (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4">
            <div>
                <p className={`font-mono text-xs font-semibold ${severityClass}`}>
                    {severity}
                </p>

                <p className="mt-1 text-sm font-medium">
                    {title}
                </p>

                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    {category}
                </p>
            </div>

            <span className="text-xs text-[var(--text-secondary)]">
                Review
            </span>
        </div>
    );
}

function AssetRow({
    name,
    type,
    status,
}: {
    name: string;
    type: string;
    status: string;
}) {
    const healthy = status === "Healthy";

    return (
        <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
            <div>
                <p className="font-mono text-sm text-[var(--text-primary)]">
                    {name}
                </p>

                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    {type}
                </p>
            </div>

            <span
                className={`text-xs font-medium ${healthy
                    ? "text-[var(--success)]"
                    : "text-[var(--accent-soft)]"
                    }`}
            >
                {status}
            </span>
        </div>
    );
}

function ActivityItem({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4">
            <p className="text-sm font-medium">{title}</p>

            <p className="mt-2 font-mono text-xs text-[var(--text-secondary)]">
                {description}
            </p>
        </div>
    );
}