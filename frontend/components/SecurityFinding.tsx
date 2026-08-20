import { ShieldAlertIcon } from "./Icons";

export function SecurityFinding() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-24">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                        Hallazgos explicados con claridad
                    </p>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                        Seguridad que se entiende.
                    </h2>

                    <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                        La información técnica es importante. El contexto lo es aún más.
                        Cada hallazgo debe explicar qué ocurre, por qué importa y qué
                        debería hacerse para reducir el riesgo.
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
                                    ALTO
                                </p>

                                <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
                                    Control de acceso insuficiente
                                </h3>

                                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                                    Broken Access Control
                                </p>
                            </div>
                        </div>

                        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                            Hallazgo de ejemplo
                        </span>
                    </div>

                    <div className="mt-8 grid gap-6 border-t border-[var(--border)] pt-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                                Impacto para el negocio
                            </p>

                            <p className="mt-2 text-sm leading-7 text-[var(--text-primary)]">
                                Un usuario podría acceder a información o funciones que
                                no le corresponden. Esto puede provocar exposición de
                                datos, afectar la operación y generar pérdida de confianza
                                de clientes.
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                                Recomendación
                            </p>

                            <p className="mt-2 text-sm leading-7 text-[var(--text-primary)]">
                                Verificar los permisos en el servidor antes de permitir
                                el acceso a cada recurso protegido.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4 text-xs leading-6 text-[var(--text-secondary)]">
                            <p className="mb-3 font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                                Detalles técnicos
                            </p>

                            <div className="space-y-1 font-mono">
                                <p>
                                    category ={" "}
                                    <span className="text-[var(--accent-soft)]">
                                        &quot;broken-access-control&quot;
                                    </span>
                                </p>

                                <p>
                                    severity ={" "}
                                    <span className="text-[var(--accent-soft)]">
                                        &quot;high&quot;
                                    </span>
                                </p>

                                <p>
                                    control ={" "}
                                    <span className="text-[var(--accent-soft)]">
                                        &quot;server-side-authorization&quot;
                                    </span>
                                </p>
                            </div>

                            <p className="mt-4 text-[var(--text-secondary)]">
                                En términos simples: el servidor debe comprobar qué puede
                                hacer cada usuario antes de entregar información o permitir
                                una operación protegida.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}