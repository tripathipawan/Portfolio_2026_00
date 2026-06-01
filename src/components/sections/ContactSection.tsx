"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectTypes = [
  "UI/UX Design",
  "Front-end Dev",
  "GenAI Integration",
  "Prompt Engineering",
  "Data Analysis",
  "Full-Stack",
];

const channels = [
  {
    label: "LinkedIn",
    handle: "in/pawantripathi",
    url: "https://linkedin.com/in/pawantripathi",
    icon: "↗",
  },
  {
    label: "GitHub",
    handle: "@tripathipawan",
    url: "https://github.com/tripathipawan",
    icon: "↗",
  },
  {
    label: "Instagram",
    handle: "@pawantripathi",
    url: "https://instagram.com/pawantripathi",
    icon: "↗",
  },
  {
    label: "WhatsApp",
    handle: "+91 87647 47477",
    url: "https://wa.me/918764747477",
    icon: "↗",
  },
];

const currentInfo = [
  { label: "Currently", value: "Working at PhysicsWallah" },
  { label: "Role", value: "Content R&D Trainee" },
  { label: "Education", value: "NSUT · Comp Sci" },
  { label: "Status", value: "Open to collab" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-title", start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggleChip = (chip: string) => {
    setActiveChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip],
    );
  };

  const handleSubmit = () => {
    if (!formState.name || !formState.email) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Ambient orb */}
      <div
        className="ambient-orb w-80 h-80 bg-ember/8 bottom-0 right-0"
        style={{ position: "absolute" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Mega headline */}
        <div className="contact-title opacity-0 mb-16">
          <span className="font-mono text-[10px] tracking-widest text-ember uppercase block mb-3">
            — Get in touch
          </span>
          <h2 className="font-display text-[clamp(3rem,7vw,7rem)] font-bold text-bone leading-[1.0]">
            Let&apos;s build
            <br />
            <span className="italic text-ember">something rare.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-24 text-center glass rounded-2xl">
                <div className="w-16 h-16 border-2 border-ember rounded-full flex items-center justify-center mb-6">
                  <span className="text-ember text-2xl">✓</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-bone mb-2">
                  Message sent!
                </h3>
                <p className="font-geist text-sm text-graphite-600 mt-2">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Project type chips */}
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-graphite uppercase block mb-3">
                    Project type
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((chip) => (
                      <button
                        key={chip}
                        onClick={() => toggleChip(chip)}
                        className={`chip-toggle ${activeChips.includes(chip) ? "active" : ""}`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floating label inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {["name", "email", "company", "budget"].map((field) => (
                    <div key={field} className="floating-label-group">
                      <input
                        type={field === "email" ? "email" : "text"}
                        placeholder=" "
                        value={formState[field as keyof typeof formState]}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            [field]: e.target.value,
                          })
                        }
                        data-cursor-text
                      />
                      <label className="floating-label">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="floating-label-group">
                  <textarea
                    placeholder=" "
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    data-cursor-text
                  />
                  <label className="floating-label">Message</label>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  className="magnetic-btn relative w-full py-4 rounded-full bg-ember text-carbon font-mono text-[11px] tracking-widest uppercase overflow-hidden disabled:opacity-60"
                >
                  <div className="btn-sweep" />
                  <span className="relative z-10">
                    {sending ? "Sending..." : "Send message →"}
                  </span>
                  {sending && (
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-ember-dark transition-all"
                      style={{
                        width: "100%",
                        animation: "shimmer 1.4s ease-in-out forwards",
                      }}
                    />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right panel */}
          <div className="space-y-10">
            {/* Direct email */}
            <div>
              <span className="font-mono text-[10px] tracking-widest text-graphite uppercase block mb-2">
                Direct
              </span>
              <a
                href="mailto:goyalharsh642@gmail.com"
                className="font-display text-[clamp(1.2rem,2.5vw,1.8rem)] font-bold text-bone hover:text-ember transition-colors block"
              >
                tripathipawan8705@gmail.com
              </a>
            </div>

            {/* Social channels */}
            <div>
              <span className="font-mono text-[10px] tracking-widest text-graphite uppercase block mb-4">
                Channels
              </span>
              <div className="space-y-3">
                {channels.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-3 border-b border-graphite-200 hover:border-ember group transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] tracking-widest text-graphite w-20">
                        {ch.label}
                      </span>
                      <span className="font-geist text-sm text-bone group-hover:text-ember transition-colors">
                        {ch.handle}
                      </span>
                    </div>
                    <span className="text-graphite group-hover:text-ember transition-colors">
                      {ch.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Currently */}
            <div className="glass rounded-2xl p-6">
              <span className="font-mono text-[10px] tracking-widest text-ember uppercase block mb-4">
                — Currently
              </span>
              <div className="space-y-3">
                {currentInfo.map((info) => (
                  <div key={info.label} className="flex justify-between">
                    <span className="font-mono text-[10px] tracking-widest text-graphite uppercase">
                      {info.label}
                    </span>
                    <span className="font-geist text-sm text-bone text-right">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
