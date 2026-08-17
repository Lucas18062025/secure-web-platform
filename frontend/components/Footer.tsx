import type { ReactNode } from "react";

import {
    GitHubIcon,
    GlobeIcon,
    LinkedInIcon,
    MailIcon,
} from "./Icons";

export function Footer() {
    return (
        <footer
            id="about"
            className="border-t border-[var(--border)] bg-[var(--background)]"
        >
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                    {/* Brand */}
                    <div>
                        <p className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                            Secure Web Platform
                        </p>

                        <p className="mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                            Security engineering with human context.
                        </p>

                        <div className="mt-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                Built by
                            </p>

                            <p className="mt-2 text-base font-semibold text-[var(--text-primary)]">
                                Lucas Villagra
                            </p>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Cybersecurity Analyst · Ethical Hacker · SOC Analyst
                            </p>
                        </div>
                    </div>

                    {/* Contact / Social */}
                    <div className="lg:justify-self-end">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Connect
                        </p>

                        <div className="mt-4 space-y-3">
                            <SocialLink
                                href="https://github.com/Lucas18062025"
                                label="GitHub"
                                icon={<GitHubIcon />}
                            />

                            <SocialLink
                                href="https://www.linkedin.com/in/lucas-villagra-cybersecurity"
                                label="LinkedIn"
                                icon={<LinkedInIcon />}
                            />

                            <SocialLink
                                href="https://portafolio.lucaslean1806.workers.dev/"
                                label="Portfolio"
                                icon={<GlobeIcon />}
                            />

                            <SocialLink
                                href="mailto:lucaslean1806@proton.me"
                                label="Contact"
                                icon={<MailIcon />}
                                external={false}
                            />
                        </div>
                    </div>
                </div>

                <div className="my-10 h-px bg-[var(--border)]" />

                <div className="flex flex-col gap-3 text-xs text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Secure Web Platform</p>

                    <p className="font-mono">Security by design</p>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({
    href,
    label,
    icon,
    external = true,
}: {
    href: string;
    label: string;
    icon: ReactNode;
    external?: boolean;
}) {
    return (
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-3 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
        >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] transition group-hover:border-[var(--accent)]/50">
                {icon}
            </span>

            <span>{label}</span>
        </a>
    );
}