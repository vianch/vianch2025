"use client";

import { useState } from "react";

export default function StyleGuidePage() {
  const [activeTab, setActiveTab] = useState("grid");

  return (
    <div className="container" style={{ margin: "8rem auto" }}>
      <h1 className="h1">VIANCH 2025 Style Guide</h1>

      <a href="/theme/vianch-2025.zip" download>
        Download Theme
      </a>

      {/* Navigation */}
      <div className="grid gap-1 items-center" style={{ marginBlock: "2rem" }}>
        <button
          onClick={() => setActiveTab("grid")}
          className={`col-3 ${activeTab === "grid" ? "button-primary " : ""}`}
          style={{
            padding: "1rem",
            border: "2px solid var(--color-grey-300)",
          }}
        >
          Grid System
        </button>
        <button
          onClick={() => setActiveTab("typography")}
          className={`col-3 ${activeTab === "typography" ? "button-primary" : ""}`}
          style={{
            padding: "1rem",
            border: "2px solid var(--color-grey-300)",
          }}
        >
          Typography
        </button>
        <button
          onClick={() => setActiveTab("colors")}
          className={`col-3 ${activeTab === "colors" ? "button-primary" : ""}`}
          style={{
            padding: "1rem",
            border: "2px solid var(--color-grey-300)",
          }}
        >
          Colors
        </button>

        <button
          onClick={() => setActiveTab("buttons")}
          className={`col-3 ${activeTab === "buttons" ? "button-primary" : ""}`}
          style={{
            padding: "1rem",
            border: "2px solid var(--color-grey-300)",
          }}
        >
          Buttons system
        </button>
      </div>

      {/* Grid System Section */}
      <section className={`${activeTab === "grid" ? "show" : "hide"}`}>
        <h2 className="h2">Grid System</h2>
        <p className="text-base" style={{ marginBlock: "2rem" }}>
          Our 12-column grid system is built with CSS Grid and is fully responsive.
        </p>

        {/* Equal Columns Example */}
        <h3 className="h3 font-primary" style={{ marginBlock: "2rem" }}>
          Equal Columns
        </h3>
        <div className="grid" style={{ marginBottom: "2rem" }}>
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className="col-12 md:col-6 lg:col-3"
              style={{
                padding: "2rem",
                border: "2px solid var(--color-grey-300)",
                textAlign: "center",
              }}
            >
              Column {num}
            </div>
          ))}
        </div>

        {/* Different Spans Example */}
        <h3 className="h3 font-primary" style={{ marginBlock: "2rem" }}>
          Different Column Spans
        </h3>
        <div className="grid" style={{ marginBottom: "2rem" }}>
          <div
            className="col-12 lg:col-8"
            style={{
              padding: "2rem",
              border: "2px solid var(--color-grey-500)",
              textAlign: "center",
            }}
          >
            Main Content (col-8)
          </div>
          <div
            className="col-12 lg:col-4"
            style={{
              padding: "2rem",
              border: "2px solid var(--color-grey-700)",
              textAlign: "center",
            }}
          >
            Sidebar (col-4)
          </div>
        </div>

        {/* Grid Gaps Example */}
        <h3 className="h3 font-primary" style={{ marginBlock: "2rem" }}>
          Grid Gaps
        </h3>
        {[0, 1, 2, 3, 4].map((gap) => (
          <div key={gap} style={{ marginBottom: "2rem" }}>
            <p className="text-base">Gap {gap}</p>
            <div className={`grid gap-${gap}`}>
              {[1, 2, 3].map((col) => (
                <div
                  key={col}
                  className="col-4"
                  style={{
                    padding: "2rem",
                    border: "2px solid var(--color-grey-400)",
                    textAlign: "center",
                  }}
                >
                  Column
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Typography System */}
      <section className={`${activeTab === "typography" ? "show" : "hide"}`}>
        <h2 className="h2" style={{ marginBlock: "2rem" }}>
          Typography System
        </h2>

        {/* Text Sizes */}
        <div style={{ marginBottom: "4rem" }}>
          <h3 className="h3 font-primary" style={{ marginBottom: "2rem" }}>
            Text Sizes
          </h3>
          <div className="grid gap-1">
            {[
              { name: "Extra Small", class: "text-xs", var: "--text-xs" },
              { name: "Small", class: "text-sm", var: "--text-sm" },
              { name: "Base", class: "text-base", var: "--text-base" },
              { name: "Large", class: "text-lg", var: "--text-lg" },
              { name: "Extra Large", class: "text-xl", var: "--text-xl" },
            ].map((size) => (
              <div
                key={size.name}
                className="col-12"
                style={{
                  padding: "1rem",
                  border: "1px solid var(--color-grey-300)",
                  marginBottom: "1rem",
                }}
              >
                <p className={size.class}>
                  {size.name} - The quick brown fox jumps over the lazy dog
                </p>
                <p className="text-sm" style={{ color: "var(--color-grey-600)" }}>
                  Class: {size.class} | Variable: {size.var}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Heading Sizes */}
        <div>
          <h3 className="h3 font-primary" style={{ marginBottom: "2rem" }}>
            Heading Sizes
          </h3>
          <div className="grid gap-1">
            {[
              { level: "h1", var: "--h1" },
              { level: "h2", var: "--h2" },
              { level: "h3", var: "--h3" },
              { level: "h4", var: "--h4" },
              { level: "h5", var: "--h5" },
            ].map((heading) => (
              <div
                key={heading.level}
                className="col-12"
                style={{
                  padding: "1rem",
                  border: "1px solid var(--color-grey-300)",
                  marginBottom: "1rem",
                }}
              >
                <div className={`${heading.level} font-primary`}>
                  Heading {heading.level.charAt(1)} - The quick brown fox
                </div>
                <p className="text-sm" style={{ color: "var(--color-grey-600)" }}>
                  Class: {heading.level} | Variable: {heading.var}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${activeTab === "colors" ? "show" : "hide"}`}>
        {/* Color System */}
        <h2 className="h2" style={{ marginBlock: "2rem" }}>
          Color System
        </h2>

        {/* Brand Colors */}
        <div className="grid gap-1">
          <div className="col-12">
            <h3 className="h3 font-primary" style={{ marginBottom: "1rem" }}>
              Brand Colors
            </h3>
            <div className="grid gap-1">
              {[
                { name: "Black", var: "--color-black", hex: "#000000" },
                { name: "Navy", var: "--color-navy", hex: "#14213d" },
                { name: "Orange", var: "--color-orange", hex: "#fca311" },
                { name: "Light", var: "--color-light", hex: "#e5e5e5" },
                { name: "White", var: "--color-white", hex: "#ffffff" },
              ].map((color) => (
                <div key={color.name} className="col-6 md:col-4" style={{ marginBottom: "1rem" }}>
                  <div
                    style={{
                      height: "60px",
                      background: color.hex,
                      border: "1px solid var(--color-grey-300)",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <p className="text-base">{color.name}</p>
                  <p className="text-sm" style={{ color: "var(--color-grey-600)" }}>
                    {color.hex}
                  </p>
                  <p className="text-sm" style={{ color: "var(--color-grey-600)" }}>
                    {color.var}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Status Colors */}
          <div className="col-12">
            <h3 className="h3 font-primary" style={{ marginBottom: "1rem" }}>
              Status Colors
            </h3>
            <div className="grid gap-1">
              {[
                { name: "Error", var: "--color-error", hex: "#d62828" },
                { name: "Success", var: "--color-success", hex: "#06d6a0" },
              ].map((color) => (
                <div key={color.name} className="col-6" style={{ marginBottom: "1rem" }}>
                  <div
                    style={{
                      height: "60px",
                      background: color.hex,
                      border: "1px solid var(--color-grey-300)",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <p className="text-base">{color.name}</p>
                  <p className="text-sm" style={{ color: "var(--color-grey-600)" }}>
                    {color.hex}
                  </p>
                  <p className="text-sm" style={{ color: "var(--color-grey-600)" }}>
                    {color.var}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Grey Scale */}
          <div className="col-12">
            <h3 className="h3 font-primary" style={{ marginBottom: "1rem" }}>
              Grey Scale
            </h3>
            <div className="grid gap-1">
              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((level) => (
                <div key={level} className="col-6 md:col-4" style={{ marginBottom: "1rem" }}>
                  <div
                    style={{
                      height: "60px",
                      background: `var(--color-grey-${level})`,
                      border: "1px solid var(--color-grey-300)",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <p className="text-base">Grey {level}</p>
                  <p className="text-sm" style={{ color: "var(--color-grey-600)" }}>
                    --color-grey-{level}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add this new section after the Typography System section */}
      <section className={`${activeTab === "buttons" ? "show" : "hide"}`}>
        <h2 className="h2" style={{ marginBlock: "2rem" }}>
          Button System
        </h2>

        <div className="grid gap-2">
          {/* Button Variants */}
          <div className="col-12">
            <h3 className="h3 font-primary" style={{ marginBottom: "2rem" }}>
              Button Variants
            </h3>
            <div className="grid gap-2">
              <div className="col-12 lg:col-3">
                <button className="button button-primary">Primary Button</button>
                <p
                  className="text-sm"
                  style={{ marginTop: "1rem", color: "var(--color-grey-600)" }}
                >
                  Class: button button-primary
                </p>
              </div>
              <div className="col-12 lg:col-3">
                <button className="button button-secondary">Secondary Button</button>
                <p
                  className="text-sm"
                  style={{ marginTop: "1rem", color: "var(--color-grey-600)" }}
                >
                  Class: button button-secondary
                </p>
              </div>
              <div className="col-12 lg:col-3">
                <button className="button button-tertiary">Tertiary Button</button>
                <p
                  className="text-sm"
                  style={{ marginTop: "1rem", color: "var(--color-grey-600)" }}
                >
                  Class: button button-tertiary
                </p>
              </div>
            </div>
          </div>

          {/* Button States */}
          <div className="col-12">
            <h3 className="h3 font-primary" style={{ marginBottom: "2rem" }}>
              Button States
            </h3>
            <div className="grid gap-2">
              <div className="col-12 md:col-3">
                <button className="button button-primary">Normal</button>
              </div>
              <div className="col-12 md:col-3">
                <button className="button button-primary" disabled>
                  Disabled
                </button>
              </div>
              <div className="col-12 md:col-3">
                <button className="button button-primary" style={{ width: "100%" }}>
                  Full Width
                </button>
              </div>
              <div className="col-12 md:col-3">
                <button className="button button-primary">
                  <span>With Icon</span>
                  <span style={{ marginLeft: "0.5rem" }}>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
