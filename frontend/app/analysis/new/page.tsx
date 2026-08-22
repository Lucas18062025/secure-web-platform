"use client";

import { useState, type SubmitEvent } from "react";

export default function NewAnalysisPage() {
    const [target, setTarget] = useState("");
    const [environment, setEnvironment] = useState("Desarrollo");
    const [profile, setProfile] = useState("Evaluación Rápida");
    const [criticality, setCriticality] = useState("Media");
    const [started, setStarted] = useState(false);

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setStarted(true);
    }

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
            <header className="border-b border-[var(--border)]">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div>
                        <a
                            href="/dashboard"
                            className="text-lg font-semibold transition hover:text-[var(--accent)]"
                        >
                            Secure Web Platform
                        </a>

                        <p className="mt-1 text-xs text-[var(--text-secondary)]">
                            Análisis de Seguridad de Aplicaciones Web
                        </p>
                    </div>

                    <a
                        href="/dashboard"
                        className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                    >
                        Volver al Dashboard
                    </a>
                </div>
            </header>

            <section className="mx-auto max-w-5xl px-6 py-12">
                <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                        Nuevo Análisis
                    </p>

                    <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Iniciar un análisis de seguridad
                    </h1>

                    <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                        Configure el objetivo, el entorno y el contexto de riesgo antes
                        de comenzar la evaluación de seguridad.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
                >
                    <div className="space-y-8">
                        {/* Objetivo */}
                        <div>
                            <label
                                htmlFor="target"
                                className="text-sm font-semibold"
                            >
                                Objetivo
                            </label>

                            <p className="mt-1 text-xs text-[var(--text-secondary)]">
                                URL de la aplicación a analizar.
                            </p>

                            <input
                                id="target"
                                type="url"
                                required
                                value={target}
                                onChange={(event) => setTarget(event.target.value)}
                                placeholder="https://example.com"
                                className="mt-4 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)]"
                            />
                        </div>

                        {/* Entorno */}
                        <div>
                            <label
                                htmlFor="environment"
                                className="text-sm font-semibold"
                            >
                                Entorno
                            </label>

                            <p className="mt-1 text-xs text-[var(--text-secondary)]">
                                Identifique dónde se está ejecutando la aplicación.
                            </p>

                            <select
                                id="environment"
                                value={environment}
                                onChange={(event) => setEnvironment(event.target.value)}
                                className="mt-4 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
                            >
                                <option>Desarrollo</option>
                                <option>Staging</option>
                                <option>Producción</option>
                            </select>
                        </div>

                        {/* Perfil de análisis */}
                        <div>
                            <label
                                htmlFor="profile"
                                className="text-sm font-semibold"
                            >
                                Perfil de Análisis
                            </label>

                            <p className="mt-1 text-xs text-[var(--text-secondary)]">
                                Elija la profundidad de la evaluación de seguridad.
                            </p>

                            <select
                                id="profile"
                                value={profile}
                                onChange={(event) => setProfile(event.target.value)}
                                className="mt-4 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
                            >
                                <option>Evaluación Rápida</option>
                                <option>Evaluación de Seguridad Completa</option>
                            </select>
                        </div>

                        {/* Criticidad del negocio */}
                        <div>
                            <label
                                htmlFor="criticality"
                                className="text-sm font-semibold"
                            >
                                Criticidad del negocio
                            </label>

                            <p className="mt-1 text-xs text-[var(--text-secondary)]">
                                Defina qué tan importante es esta aplicación para el negocio.
                            </p>

                            <select
                                id="criticality"
                                value={criticality}
                                onChange={(event) => setCriticality(event.target.value)}
                                className="mt-4 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
                            >
                                <option>Baja</option>
                                <option>Media</option>
                                <option>Alta</option>
                                <option>Crítica</option>
                            </select>
                        </div>

                        {/* Enviar */}
                        <div className="border-t border-[var(--border)] pt-6">
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-[#0B0D0F] transition hover:bg-[var(--accent-soft)] sm:w-auto"
                            >
                                Iniciar Análisis
                            </button>
                        </div>

                        {started && (
                            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-5">
                                <p className="text-sm font-semibold text-[var(--success)]">
                                    Análisis de Seguridad Iniciado
                                </p>

                                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                    El análisis de seguridad para{" "}
                                    <span className="font-mono text-[var(--text-primary)]">
                                        {target}
                                    </span>{" "}
                                    ha sido puesto en cola utilizando el perfil{" "}
                                    <strong className="text-[var(--text-primary)]">
                                        {profile}
                                    </strong>{" "}
                                    en el entorno{" "}
                                    <strong className="text-[var(--text-primary)]">
                                        {environment}
                                    </strong>{" "}
                                    con una criticidad de negocio{" "}
                                    <strong className="text-[var(--text-primary)]">
                                        {criticality}
                                    </strong>
                                    .
                                </p>
                            </div>
                        )}
                    </div>
                </form>
            </section>
        </main>
    );
}