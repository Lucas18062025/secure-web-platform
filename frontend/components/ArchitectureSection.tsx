const layers = [
    "Frontend",
    "API",
    "Validation",
    "Authorization",
    "Database",
];

export function ArchitectureSection() {
    return (
        <section
            id="architecture"
            className="border-y border-[var(--border)] bg-[var(--surface)]"
        >
            <div className="mx-auto max-w-7xl px-6 py-24">
                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                            Seguridad desde el diseño
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            La seguridad forma parte de la arquitectura.
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                            Cada capa tiene una responsabilidad definida. La interfaz no
                            toma decisiones de autorización y los datos sensibles no
                            necesitan almacenarse en el navegador.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
                        <div className="space-y-3">
                            {layers.map((layer, index) => (
                                <div key={layer}>
                                    <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                                        <span className="text-sm font-medium text-[var(--text-primary)]">
                                            {layer}
                                        </span>

                                        <span className="font-mono text-xs text-[var(--text-secondary)]">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    {index < layers.length - 1 && (
                                        <div className="mx-auto h-3 w-px bg-[var(--border)]" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}