"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import ChristmasMusic from "./ChristmasMusic";

type RevealResult = { recipient?: string; error?: string };

function Snowflake({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/floc-neu-nadal.png"
      alt=""
      width={32}
      height={32}
      className={`snowflake-icon ${className}`}
      aria-hidden="true"
    />
  );
}

export default function Home() {
  const [code, setCode] = useState("");
  const [recipient, setRecipient] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [opening, setOpening] = useState(false);

  async function reveal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setOpening(false);
    setRecipient(null);
    setError("");

    try {
      const response = await fetch("/api/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        cache: "no-store",
      });

      const result: RevealResult = await response.json();

      if (!response.ok || !result.recipient) {
        throw new Error(result.error ?? "No s'ha pogut completar la consulta");
      }

      setRecipient(result.recipient);
      setOpening(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Error inesperat");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setRecipient(null);
    setCode("");
    setError("");
    setOpening(false);
  }

  return (
    <main className="christmas-page">
      <ChristmasMusic />
      {/* NEU ANIMADA — SENSE CANVIS */}
      <div className="snowfall" aria-hidden="true">
        {Array.from({ length: 34 }, (_, index) => (
          <span
            key={index}
            style={{
              left: `${(index * 37 + 13) % 100}%`,
              animationDelay: `-${(index * 1.7) % 17}s`,
              animationDuration: `${12 + (index % 8) * 2}s`,
              opacity: 0.3 + (index % 5) * 0.1,
            }}
          />
        ))}
      </div>

      {/* CAPÇALERA — SENSE CANVIS */}
      <header className="site-header">
        <a className="brand" href="#inici" aria-label="Amic Invisible 2026, inici">
          <Snowflake />
          AMIC INVISIBLE{" "}
          <span className="brand-year">2026</span>
        </a>
        <span className="header-tag">✦ Una tradició de família ✦</span>
      </header>

      {/* PORTADA — SENSE CANVIS */}
      <section className="hero" id="inici" aria-labelledby="hero-title">
        <div className="hero-intro">
          <div className="eyebrow">
            <span>✧</span> ÉS TEMPS DE COMPARTIR <span>✧</span>
          </div>
          <h1 id="hero-title">
            La màgia de
            <br />
            <em>l&apos;Amic Invisible</em>
          </h1>
          <p>
            Un petit secret, una gran il·lusió.
            <br />
            Aquest Nadal, la sorpresa comença aquí.
          </p>
          <a className="hero-link" href="#descobreix">
            Descobreix el teu regal{" "}
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="village-wrap">
          <div className="village-scene">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="village"
              src="/christmas-village.png"
              alt="Poble nadalenc nevat amb casetes il·luminades, avets i regals"
            />
            <div className="chimney-smoke smoke-left" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="chimney-smoke smoke-right" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <span>✦</span>
          FET AMB AMOR PER A LA FAMÍLIA
          <span>✦</span>
        </div>
      </section>

      {/* SECCIÓ DEL REGAL — NOU DISSENY */}
      <section className="reveal-section" id="descobreix" aria-labelledby="reveal-title">
        <div className="section-decoration" aria-hidden="true">
          <Snowflake className="snowflake-decoration" />
          <span>✧</span>
          <Snowflake className="snowflake-decoration" />
        </div>

        <p className="eyebrow">EL TEU SECRET DE NADAL</p>
        <h2 id="reveal-title">
          Hi ha un regal
          <br />
          <em>esperant-te...</em>
        </h2>
        <p className="section-description">
          Introdueix el teu codi privat i descobreix
          <br className="desktop-break" /> a qui faràs somriure aquest Nadal.
        </p>

        <div className={`reveal-card ${recipient ? "reveal-card--letter" : ""}`}>
          {!recipient ? (
            <>
              <div className="magic-gift" aria-hidden="true">
                <div className="magic-gift__glow" />
                <span className="magic-gift__spark magic-gift__spark--one">✦</span>
                <span className="magic-gift__spark magic-gift__spark--two">✧</span>
                <span className="magic-gift__spark magic-gift__spark--three">✦</span>
                <div className="magic-gift__bow">
                  <span className="magic-gift__loop magic-gift__loop--left" />
                  <span className="magic-gift__loop magic-gift__loop--right" />
                  <span className="magic-gift__knot" />
                </div>
                <div className="magic-gift__lid" />
                <div className="magic-gift__box" />
              </div>

              <form onSubmit={reveal}>
                <label htmlFor="code">EL TEU CODI SECRET</label>
                <input
                  id="code"
                  name="code"
                  type="password"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="Introdueix el teu codi..."
                  required
                  maxLength={80}
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                />
                <button className="primary-button" type="submit" disabled={loading}>
                  {loading ? "Buscant la màgia..." : "Obre el teu regal"}{" "}
                  <span aria-hidden="true">✧</span>
                </button>
              </form>

              {error && <p className="form-error" role="alert">{error}</p>}
              <p className="privacy-note">✧ El teu secret queda entre nosaltres ✧</p>
            </>
          ) : (
            <div className={`magic-reveal ${opening ? "magic-reveal--opening" : ""}`}>
              <div className="magic-gift magic-gift--opening" aria-hidden="true">
                <div className="magic-gift__glow" />
                <span className="magic-gift__spark magic-gift__spark--one">✦</span>
                <span className="magic-gift__spark magic-gift__spark--two">✧</span>
                <span className="magic-gift__spark magic-gift__spark--three">✦</span>
                <div className="magic-gift__bow">
                  <span className="magic-gift__loop magic-gift__loop--left" />
                  <span className="magic-gift__loop magic-gift__loop--right" />
                  <span className="magic-gift__knot" />
                </div>
                <div className="magic-gift__lid" />
                <div className="magic-gift__box" />
              </div>

              <article className="christmas-letter" role="status" aria-live="polite">
                <div className="christmas-letter__inner">
                  <span className="christmas-letter__ornament" aria-hidden="true">✦ ❄ ✦</span>
                  <p className="christmas-letter__eyebrow">UNA CARTA ESPECIAL PER A TU</p>
                  <div className="christmas-letter__seal" aria-hidden="true">✧</div>
                  <h3>La màgia del Nadal</h3>
                  <p className="christmas-letter__intro">Aquest any tens una missió molt especial...</p>
                  <div className="christmas-letter__rule" aria-hidden="true" />
                  <p className="christmas-letter__label">Aquest Nadal faràs un regal a</p>
                  <p className="christmas-letter__recipient">{recipient}</p>
                  <div className="christmas-letter__rule" aria-hidden="true" />
                  <p className="christmas-letter__message">
                    Prepara una sorpresa plena d&apos;il·lusió i, sobretot, guarda el secret! ♡
                  </p>
                  <p className="christmas-letter__year">NADAL 2026</p>
                </div>
              </article>

              <button className="secondary-button" type="button" onClick={reset}>
                Amaga el resultat <span aria-hidden="true">↗</span>
              </button>
            </div>
          )}
        </div>

        <p className="after-card">
          No expliquis a ningú qui t&apos;ha tocat... <span>🤫</span>
        </p>
      </section>

      {/* PEU DE PÀGINA — SENSE CANVIS */}
      <footer className="site-footer">
        <span className="footer-brand">
          <Snowflake className="snowflake-footer" />
          AMIC INVISIBLE 2026
        </span>
        <span>Que la màgia del Nadal ens uneixi sempre ♡</span>
      </footer>
    </main>
  );
}
