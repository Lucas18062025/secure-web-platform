"use client";

import { useState } from "react";
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
        title: "Cumplimiento (Compliance)",
        description:
            "Asigna automáticamente cada hallazgo a normativas como OWASP, PCI-DSS e ISO 27001 para facilitar las auditorías y demostrar el estado de seguridad.",
    },
];

export function FeatureGrid() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [joinedWaitlist, setJoinedWaitlist] = useState(false);
    const [email, setEmail] = useState("");

    const handleJoinWaitlist = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setJoinedWaitlist(true);
            // Aquí en un futuro enviarías 'email' a tu backend o servicio (ej. Resend, Mailchimp)
        }
    };

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

                    const isCompliance = feature.title.includes("Compliance");

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

                            <button 
                                onClick={() => isCompliance && setIsModalOpen(true)}
                                className={`mt-8 text-xs font-medium uppercase tracking-[0.16em] transition ${isCompliance ? 'text-[var(--accent)] hover:text-[var(--accent-soft)] cursor-pointer' : 'text-[var(--text-secondary)] cursor-not-allowed opacity-50'}`}
                            >
                                Ver capacidad
                            </button>
                        </article>
                    );
                })}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-4 sm:p-8">
                    <div className="relative mx-auto my-8 mt-12 w-full max-w-4xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-2xl">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 flex items-center gap-2"
                        >
                            <span className="text-sm font-medium uppercase tracking-widest">Cerrar</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                            <img 
                                src="/compliance-mockup.jpg" 
                                alt="Compliance Dashboard Mockup" 
                                className="w-full max-h-[75vh] object-contain bg-black"
                            />
                        </div>
                        <div className="absolute -bottom-8 left-0 right-0 flex justify-center pb-8 px-4">
                            {!joinedWaitlist ? (
                                <form onSubmit={handleJoinWaitlist} className="flex flex-col sm:flex-row gap-3 w-full max-w-md bg-[var(--surface)] p-2 rounded-3xl border border-[var(--border)] shadow-2xl">
                                    <input 
                                        type="email" 
                                        placeholder="tu@email.com" 
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full flex-1 rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-6 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                                    />
                                    <button type="submit" className="rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] hover:bg-[var(--accent-soft)] hover:scale-105 transition-all whitespace-nowrap">
                                        Unirse
                                    </button>
                                </form>
                            ) : (
                                <div className="rounded-full border border-[var(--success)]/20 bg-[var(--success)]/10 px-8 py-3 text-sm font-semibold text-[var(--success)] flex items-center gap-2 shadow-2xl bg-[var(--surface)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                    ¡Genial! Te avisaremos pronto.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}