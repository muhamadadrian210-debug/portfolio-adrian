"use client";

import { useEffect } from "react";
import { projects } from "@/data/projects";

export function SiteEffects() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".animate-on-scroll, .fade-in-up, .fade-in");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: "0px 0px 150px 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanup: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>(".faq__q").forEach((question) => {
      const handleClick = () => {
        const answer = question.nextElementSibling as HTMLElement | null;
        const marker = question.querySelector("span");
        if (!answer) return;
        const isOpen = Boolean(answer.style.maxHeight && answer.style.maxHeight !== "0px");
        answer.style.maxHeight = isOpen ? "0" : `${answer.scrollHeight}px`;
        if (marker) marker.textContent = isOpen ? "+" : "−";
      };
      question.addEventListener("click", handleClick);
      cleanup.push(() => question.removeEventListener("click", handleClick));
    });
    return () => cleanup.forEach((dispose) => dispose());
  }, []);

  useEffect(() => {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;
    grid.innerHTML = projects.map((project, index) => `
      <div class="project-card animate-on-scroll stagger-${(index % 2) + 1}" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); padding: 40px; margin-bottom: 30px;">
        <h3 class="project-card__title" style="color: #fff; font-size: 2rem; margin-bottom: 15px;">${escapeHtml(project.name)}</h3>
        <p class="project-card__desc" style="color: rgba(255,255,255,0.7); font-size: 1.1rem; line-height: 1.6; margin-bottom: 25px;">${escapeHtml(project.description)}</p>
        <div class="project-card__tags" style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
          ${project.technologies.map((tech) => `<span class="tag" style="color: var(--color-primary); font-weight: 800; font-size: 0.9rem; background: var(--color-primary-glow); padding: 4px 12px;"># ${escapeHtml(tech)}</span>`).join("")}
        </div>
        <a href="${escapeHtml(project.link)}" target="_blank" class="btn btn--link" style="color: var(--color-primary); font-weight: 700; text-decoration: underline;">Lihat Proyek →</a>
      </div>
    `).join("");
  }, []);

  return null;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
