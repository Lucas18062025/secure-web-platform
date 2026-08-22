export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
            <header className="border-b border-[var(--border)]">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div>
                        <p className="text-lg font-semibold">Secure Web Platform</p>
                        <p className="mt-1 text-xs text-[var(--text-secondary)]">
                            Panel de seguridad
                        </p>
                    </div>

                    <div className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--success)]">
                        Sistema seguro
                    </div>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-10">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                        Panel
                    </p>

                    <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Postura de seguridad
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                        Una vista centralizada de su postura de seguridad actual, hallazgos,
                        activos y actividad reciente.
                    </p>
                </div>

                {/* Métricas de seguridad */}
                <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    <MetricCard
                        label="Puntuación de seguridad"
                        value="94"
                        suffix="/100"
                        accent="score"
                    />

                    <MetricCard
                        label="Críticos"
                        value="0"
                        suffix="hallazgos"
                        accent="safe"
                    />

                    <MetricCard
                        label="Altos"
                        value="2"
                        suffix="hallazgos"
                        accent="warning"
                    />

                    <MetricCard
                        label="Activos monitoreados"
                        value="6"
                        suffix="monitoreados"
                        accent="neutral"
                    />
                </div>

                {/* Dashboard principal */}
                <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                                    Hallazgos
                                </p>

                                <h2 className="mt-2 text-xl font-semibold">
                                    Hallazgos de seguridad recientes
                                </h2>
                            </div>

                            <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                                Datos de ejemplo
                            </span>
                        </div>

                        <div className="mt-6 space-y-3">
                            <FindingRow
                                severity="HIGH"
                                title="Control de acceso inadecuado"
                                category="Control de acceso"
                            />

                            <FindingRow
                                severity="HIGH"
                                title="Cabeceras de seguridad débiles"
                                category="Configuración de seguridad"
                            />

                            <FindingRow
                                severity="MEDIUM"
                                title="Divulgación de información"
                                category="Exposición de información"
                            />

                            <FindingRow
                                severity="LOW"
                                title="Política de seguridad ausente"
                                category="Configuración de seguridad"
                            />
                        </div>
                    </section>

                    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                        <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                            Activos
                        </p>

                        <h2 className="mt-2 text-xl font-semibold">
                            Activos monitoreados
                        </h2>

                        <div className="mt-6 space-y-4">
                            <AssetRow
                                name="web-application"
                                type="Aplicación web"
                                status="Saludable"
                            />

                            <AssetRow
                                name="api-service"
                                type="REST API"
                                status="Requiere revisión"
                            />

                            <AssetRow
                                name="admin-portal"
                                type="Aplicación web"
                                status="Saludable"
                            />
                        </div>
                    </section>
                </div>

                {/* Actividad */}
                <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                        Actividad
                    </p>

                    <h2 className="mt-2 text-xl font-semibold">
                        Actividad reciente
                    </h2>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <ActivityItem
                            title="Análisis de seguridad completado"
                            description="web-application"
                        />

                        <ActivityItem
                            title="Hallazgo actualizado"
                            description="Control de acceso inadecuado"
                        />

                        <ActivityItem
                            title="Activo agregado"
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
                <span className={"text-4xl font-semibold " + accentClass}>
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

    const severityLabel =
        severity === "HIGH"
            ? "ALTO"
            : severity === "MEDIUM"
                ? "MEDIO"
                : "BAJO";

    return (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4">
            <div>
                <p className={"font-mono text-xs font-semibold " + severityClass}>
                    {severityLabel}
                </p>

                <p className="mt-1 text-sm font-medium">
                    {title}
                </p>

                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    {category}
                </p>
            </div>

            <span className="text-xs text-[var(--text-secondary)]">
                Revisar
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
    const healthy = status === "Saludable";

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
                className={"text-xs font-medium " + (healthy ? "text-[var(--success)]" : "text-[var(--accent-soft)]")}
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