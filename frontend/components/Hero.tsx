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
                        Plataforma de ingeniería de seguridad
                    </div>

                    <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
                        Seguridad que actúa
                        <span className="block text-[var(--accent)]">
                            antes del ataque.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                        Comprende tu superficie de ataque, identifica riesgos y toma medidas desde
                        una única plataforma enfocada en la seguridad.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-4">
                        <button className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-[#0B0D0F] transition hover:bg-[var(--accent-soft)]">
                            Iniciar análisis
                            <ArrowUpRightIcon />
                        </button>

                        <a
                            href="/dashboard"
                            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)]"
                        >
                            Explorar plataforma
                        </a>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
                        <span>Pensado para equipos de seguridad</span>
                        <span>•</span>
                        <span>Hallazgos explicados con claridad</span>
                        <span>•</span>
                        <span>Seguridad desde el diseño</span>
                    </div>
                </div>

                <SecurityPreview />
            </div>
        </section>
    );
}