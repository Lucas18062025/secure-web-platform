const principles = [
    {
        title: "Security by Design",
        description:
            "La seguridad se considera desde la arquitectura, no como una capa agregada al final del desarrollo.",
    },
    {
        title: "Risk-oriented",
        description:
            "Los hallazgos se interpretan según severidad, impacto y prioridad de remediación.",
    },
    {
        title: "Technical + Business",
        description:
            "La información técnica se acompaña de contexto para facilitar decisiones de seguridad y negocio.",
    },
];

export function AboutSection() {
    return (
        <section
            id="about"
            className="border-y border-[var(--border)] bg-[var(--surface)]"
        >
            <div className="mx-auto max-w-7xl px-6 py-24">
                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                            Acerca del proyecto
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            Una plataforma pensada para entender y reducir el riesgo.
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                            secure-web-platform es un proyecto de ingeniería de seguridad
                            orientado a aplicaciones web. Busca transformar hallazgos
                            técnicos en información accionable para desarrolladores,
                            equipos de seguridad y responsables del negocio.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {principles.map((principle) => (
                            <article
                                key={principle.title}
                                className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
                            >
                                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                                    {principle.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                    {principle.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                        Estado actual
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                        Proyecto en desarrollo. La arquitectura está preparada para
                        evolucionar desde el frontend hacia una API, validación,
                        autorización y persistencia de datos.
                    </p>
                </div>
            </div>
        </section>
    );
}
