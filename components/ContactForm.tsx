"use client";

import { useState, FormEvent } from "react";
import { siteConfig } from "@/lib/site-data";

type Status = "idle" | "submitted";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div className="rounded-card border border-border bg-surface p-8 text-center">
        <h3 className="text-lg font-semibold text-ink">Thanks — we've got it.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We read every message ourselves and will get back to you at {email || "the email you provided"}{" "}
          shortly. If it's urgent, reach us directly at{" "}
          <a href={`mailto:${siteConfig.salesEmail}`} className="text-accent underline">
            {siteConfig.salesEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1.5 w-full rounded-card border border-border bg-background px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Work email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 w-full rounded-card border border-border bg-background px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
            placeholder="jane@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="text-sm font-medium text-ink">
          Company
        </label>
        <input
          id="company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="mt-1.5 w-full rounded-card border border-border bg-background px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
          placeholder="Company name"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          What are you hoping to get done?
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mt-1.5 w-full rounded-card border border-border bg-background px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
          placeholder="Tell us about your team and what you're looking to offload first."
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-rust focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Send message
      </button>
    </form>
  );
}
