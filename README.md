<p align="center">
  <img src="https://raw.githubusercontent.com/Lucas18062025/secure-web-platform/main/assets/banner.svg" alt="Secure Web Platform — Security Engineering Platform" width="100%" />
</p>

<h1 align="center">🛡️ SECURE-WEB-PLATFORM</h1>

<p align="center">
  <strong>Security Engineering Platform</strong><br />
  <em>Identify. Prioritize. Remediate.</em>
</p>

---

## 🛡️ Sobre el proyecto

**No es otra landing bonita.**

secure-web-platform es una plataforma orientada a la **identificación, priorización y gestión de riesgos de aplicaciones web**, diseñada bajo principios de **Security by Design**.

> El objetivo es convertir información técnica de seguridad en decisiones claras sobre riesgo, impacto y remediación.

## 🔎 ¿Qué hace?

La plataforma busca centralizar el análisis de seguridad de una aplicación y presentar sus resultados de forma comprensible tanto para perfiles técnicos como para responsables del negocio.

### Características

- 🔎 **Análisis de seguridad**
- 🛡️ **Gestión de vulnerabilidades**
- 📊 **Security Score**
- 🚨 **Security Findings**
- 🏗️ **Arquitectura Security by Design**
- 📋 **Información técnica + impacto de negocio**
- 🎯 **Priorización orientada al riesgo**
- 🔧 **Recomendaciones de remediación**

## 🧠 Principios

- **Security by Design** — la seguridad forma parte de la arquitectura desde el inicio.
- **Risk-oriented** — priorización basada en severidad, impacto y remediación.
- **Technical + Business Context** — los hallazgos explican el problema técnico y su impacto.
- **Human-readable findings** — información accionable, no solo datos técnicos.

## 🏗️ Arquitectura

La plataforma está diseñada siguiendo una separación clara de responsabilidades:

```text
┌──────────────┐
│   Frontend   │
└──────┬───────┘
       ↓
┌──────────────┐
│     API      │
└──────┬───────┘
       ↓
┌──────────────┐
│ Validation   │
└──────┬───────┘
       ↓
┌──────────────┐
│Authorization │
└──────┬───────┘
       ↓
┌──────────────┐
│   Database   │
└──────────────┘
```

## 🧰 Stack

- **Frontend:** Next.js + TypeScript
- **API:** FastAPI
- **Database:** PostgreSQL
- **Deployment:** Cloudflare (objetivo)

## 🚧 Estado

**En desarrollo.**

La interfaz y la arquitectura base están implementadas. El siguiente paso es conectar las capas de backend, persistencia, autenticación/autorización y comenzar el despliegue público.

## 🌐 Demo

> URL pública de Cloudflare: **pendiente de despliegue**

## 👨‍💻 Autor

**Lucas Villagra**  
Cybersecurity Analyst · Ethical Hacker · SOC Analyst

- GitHub: https://github.com/Lucas18062025
- LinkedIn: https://www.linkedin.com/in/lucas-villagra-cybersecurity
- Portfolio: https://portafolio.lucaslean1806.workers.dev/

---

**Security by Design. Built to understand risk.**
