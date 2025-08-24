'use client';

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Hand, Brain, Phone, Mail } from "lucide-react";

/**
 * FIX FOR ERROR: "SyntaxError: /index.tsx: Unexpected token (1:0)"
 * --------------------------------------------------------------
 * Your project is running JavaScript, but the file was named/treated as TypeScript (.tsx).
 * This component is plain **JavaScript + JSX**.
 *
 * ✅ Rename your page/component file to **index.jsx** (or **index.js**).
 * ❌ Do NOT keep the .tsx extension unless you add a proper tsconfig and TS deps.
 *
 * Drop this file into Next.js `pages/index.jsx` (Pages Router) or `app/page.jsx` (App Router).
 * It does not use any TypeScript-only syntax.
 */

/** Minimal UI primitives (local, no external UI lib required) */
function Button({ children, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      data-testid="learn-more"
      className={`px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-xl shadow transition ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-2xl shadow-md ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

/**
 * RUNTIME DEV TESTS (console assertions)
 * -------------------------------------
 * These lightweight checks run only in the browser and help ensure the page renders
 * as expected without adding a full test runner. They DO NOT affect production UX.
 */
function runDevTests(therapies) {
  try {
    console.group("✅ WellnessTherapies sanity tests");

    // Data-shape tests
    console.assert(Array.isArray(therapies), "therapies should be an array");
    console.assert(therapies.length === 3, "should list exactly 3 therapies");
    const names = therapies.map((t) => t.name);
    console.assert(names.includes("Sujok Therapy"), "Missing: Sujok Therapy");
    console.assert(names.includes("Mudra Therapy"), "Missing: Mudra Therapy");
    console.assert(
      names.includes("Neuro-Linguistic Programming (NLP)"),
      "Missing: NLP"
    );
    therapies.forEach((t, i) => {
      console.assert(typeof t.name === "string" && t.name.length > 0, `therapy[${i}] name invalid`);
      console.assert(typeof t.description === "string" && t.description.length > 0, `therapy[${i}] description invalid`);
      console.assert(!!t.icon, `therapy[${i}] icon missing`);
    });

    // DOM existence tests (only if document is available)
    if (typeof document !== "undefined") {
      const section = document.getElementById("therapies");
      console.assert(section, "#therapies section missing in DOM");

      const cards = document.querySelectorAll('[data-testid="therapy-card"]');
      console.assert(cards.length === 3, `expected 3 therapy cards, found ${cards.length}`);

      const navTherapies = document.querySelector('a[href="#therapies"]');
      const navContact = document.querySelector('a[href="#contact"]');
      console.assert(!!navTherapies, "nav link to #therapies missing");
      console.assert(!!navContact, "nav link to #contact missing");

      const tel = document.querySelector('a[href^="tel:"]');
      const mail = document.querySelector('a[href^="mailto:"]');
      console.assert(!!tel, "contact phone link (tel:) missing");
      console.assert(!!mail, "contact email link (mailto:) missing");

      const svgs = section ? section.querySelectorAll('svg') : [];
      console.assert(svgs.length >= 3, "expected at least 3 icons (svgs)");

      // Verify Learn More triggers a handler (monkey-patch alert)
      const oldAlert = window.alert;
      let alertCalled = false;
      window.alert = () => { alertCalled = true; };
      const firstLearnMore = document.querySelector('[data-testid="learn-more"]');
      if (firstLearnMore) firstLearnMore.click();
      console.assert(alertCalled === true, '"Learn More" should trigger an alert');
      window.alert = oldAlert;
    }
  } catch (e) {
    console.error("Test threw an error:", e);
  } finally {
    console.groupEnd();
  }
}

export default function WellnessTherapies() {
  const therapies = [
    {
      name: "Sujok Therapy",
      description:
        "A natural healing method based on acupressure and acupuncture principles applied to hands and feet for balancing body energy.",
      icon: <Leaf aria-hidden="true" className="w-10 h-10" />,
    },
    {
      name: "Mudra Therapy",
      description:
        "Uses hand gestures (mudras) to channel energy flow in the body, promoting physical, emotional, and spiritual wellness.",
      icon: <Hand aria-hidden="true" className="w-10 h-10" />,
    },
    {
      name: "Neuro-Linguistic Programming (NLP)",
      description:
        "A psychological approach to personal development and communication, helping reframe thoughts and behaviors.",
      icon: <Brain aria-hidden="true" className="w-10 h-10" />,
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") runDevTests(therapies);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-green-700">Wellness Therapies</h1>
        <div className="space-x-6 text-gray-700 font-medium">
          <a href="#therapies" className="hover:text-green-600">Therapies</a>
          <a href="#contact" className="hover:text-green-600">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="py-16 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Discover the Power of Healing</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience holistic wellness through therapies that balance mind, body, and soul.
        </p>
      </motion.section>

      {/* Therapies Section */}
      <section id="therapies" className="flex-1 py-12 bg-green-50">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">Our Therapies</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {therapies.map((therapy, index) => (
            <motion.div
              key={therapy.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="hover:shadow-xl transition duration-300" data-testid="therapy-card">
                <CardContent className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-white border w-16 h-16 flex items-center justify-center">
                    {therapy.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">{therapy.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{therapy.description}</p>
                  <Button className="mt-2" onClick={() => alert(`${therapy.name} — coming soon!`)}>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white border-t">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Get in Touch</h2>
        <div className="max-w-xl mx-auto text-center space-y-6">
          <p className="text-gray-600">Have questions or want to book a session? Reach out to us.</p>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-gray-700">
            <div className="flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5" aria-hidden="true" />
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5" aria-hidden="true" />
              <a href="mailto:info@wellnesstherapies.com">info@wellnesstherapies.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-green-700 text-white text-center">
        <p>© {new Date().getFullYear()} Wellness Therapies. All rights reserved.</p>
      </footer>
    </div>
  );
}
