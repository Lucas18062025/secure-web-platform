import {
    GaugeIcon,
    ScanIcon,
    ShieldAlertIcon,
    SlidersIcon,
} from "./Icons";

const features = [
    {
        icon: ScanIcon,
        title: "Security Scan",
        description:
            "Analyze applications and services to identify weaknesses across your attack surface.",
        large: true,
    },
    {
        icon: ShieldAlertIcon,
        title: "Vulnerability Management",
        description:
            "Centralize findings and prioritize remediation by risk.",
    },
    {
        icon: GaugeIcon,
        title: "Security Score",
        description:
            "Measure your security posture with a signal that is easy to understand.",
    },
    {
        icon: SlidersIcon,
        title: "Configuration",
        description:
            "Keep security controls, policies and application settings organized.",
    },
];

export function FeatureGrid() {
    return (
        <section id="security" className="mx-auto max-w-7xl px-6 py-24">
            <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Security capabilities
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                    Security controls without unnecessary noise.
                </h2>

                <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                    A focused interface for understanding risk, prioritizing findings
                    and making better security decisions.
                </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
                {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                        <article
                            key={feature.title}
                            className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 transition hover:border-[var(--accent)]/40 ${feature.large
                                    ? "min-h-[300px] lg:p-10"
                                    : "min-h-[220px]"
                                }`}
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
                                <Icon />
                            </div>

                            <h3 className="mt-8 text-xl font-semibold text-[var(--text-primary)]">
                                {feature.title}
                            </h3>

                            <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                                {feature.description}
                            </p>

                            <div className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-[var(--accent-soft)]">
                                Explore capability
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}