import {
    GaugeIcon,
    ScanIcon,
    ShieldAlertIcon,
    SlidersIcon,
} from "./Icons";

const features = [
    {
        icon: ScanIcon,
        title: "Análisis de seguridad",
        description:
            "Detecta debilidades antes de que puedan convertirse en incidentes que afecten la operación, los datos o la confianza de los clientes.",
        large: true,
    },
    {
        icon: ShieldAlertIcon,
        title: "Gestión de vulnerabilidades",
        description:
            "Prioriza los riesgos que pueden generar mayores pérdidas y enfoca los esfuerzos de corrección donde más impacto tienen.",
    },
    {
        icon: GaugeIcon,
        title: "Puntaje de seguridad",
        description:
            "Convierte el estado de seguridad en un indicador fácil de interpretar para evaluar riesgos y tomar decisiones.",
    },
    {
        icon: SlidersIcon,
        title: "Configuración",
        description:
            "Mantiene organizados los controles y políticas de seguridad para reducir errores, exposición innecesaria y riesgos operativos.",
    },
];

export function FeatureGrid() {
    return (
        <section id="security" className="mx-auto max-w-7xl px-6 py-24">
            <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Seguridad orientada al negocio
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                    Identifica riesgos antes de que se conviertan en problemas.
                </h2>

                <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                    Comprende qué puede afectar tu operación, prioriza los riesgos
                    más importantes y toma decisiones de seguridad con información clara.
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
                                Ver capacidad
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}