"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Plane,
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  ArrowRight
} from "lucide-react";
import { siteConfig } from "@/data/site";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const timeoutRef = useRef(null);
  const navRef = useRef(null);
  const pathname = usePathname();

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close menus on route change without triggering cascading effect renders
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }

  // Handle outside click to close dropdowns - only active when a dropdown is open
  useEffect(() => {
    if (!activeDropdown) return;

    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  // Handle ESC key to close dropdowns & mobile menu
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = (label) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleTriggerClick = (e, label) => {
    // On devices with hover (desktop mouse), keep open if already open (do not toggle closed on click)
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      if (activeDropdown !== label) {
        setActiveDropdown(label);
      }
      return;
    }
    // On touch devices without hover, toggle open/closed
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const handleTriggerKeyDown = (e, label) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveDropdown((prev) => (prev === label ? null : label));
    } else if (e.key === "Escape") {
      e.preventDefault();
      setActiveDropdown(null);
    }
  };

  const toggleMobileAccordion = (label) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <header className="relative w-full z-50">
      {/* 1. Thin Black Top Bar */}
      <div className="bg-ink text-neutral-300 text-xs border-b border-neutral-800 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
              className="flex text-sm items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>{siteConfig.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex text-sm items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
          {/* <div className="flex items-center gap-4 text-neutral-400">
            <span>{siteConfig.hours}</span>
            <span className="w-1 h-1 rounded-full bg-primary inline-block"></span>
            <span>Contracted Fares for 10+ Passengers</span>
          </div> */}
        </div>
      </div>

      {/* 2. Main Navbar: Black, Sticky, ~80px */}
      <nav
        ref={navRef}
        className="sticky top-0 bg-ink border-b border-neutral-800 shadow-md"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Text Logo with plane in rounded blue square */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-1"
            >
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-white shadow-md group-hover:bg-primary-dark transition-colors">
                <Plane className="w-6 h-6 text-white rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white leading-tight">
                  Group Flight
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-bold leading-none mt-0.5">
                  BOOKINGS
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation with downward animated dropdowns */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {siteConfig.navigation.map((item, index) => {
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = activeDropdown === item.label;
                const isRightAligned = index >= 3 || item.label === "Airlines" || item.label === "About Us";

                if (!hasChildren) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="px-3 py-2 text-sm font-semibold text-white hover:text-primary transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Trigger Button */}
                    <button
                      type="button"
                      onClick={(e) => handleTriggerClick(e, item.label)}
                      onKeyDown={(e) => handleTriggerKeyDown(e, item.label)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={`relative inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer ${
                        isOpen ? "text-primary bg-neutral-900" : "text-white hover:text-primary"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 motion-reduce:transition-none ${
                          isOpen ? "rotate-180 text-primary" : "text-neutral-400"
                        }`}
                      />
                      {/* Growing blue underline from center */}
                      <span
                        className={`absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full transition-transform duration-200 origin-center motion-reduce:transition-none ${
                          isOpen ? "scale-x-100" : "scale-x-0"
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Dropdown Panel opening directly downwards - permanently mounted for smooth close transition */}
                    <div
                      className={`absolute top-full pt-3 z-50 w-[320px] sm:w-[340px] max-w-[calc(100vw-2rem)] transition-all duration-200 ease-out origin-top motion-reduce:transition-none motion-reduce:transform-none ${
                        isRightAligned ? "right-0" : "left-0"
                      } ${
                        isOpen
                          ? "opacity-100 visible pointer-events-auto translate-y-0 scale-100"
                          : "opacity-0 invisible pointer-events-none -translate-y-2 scale-95"
                      }`}
                      role="menu"
                      aria-label={`${item.label} submenu`}
                    >
                      {/* Invisible hover bridge to eliminate any gap between trigger and panel */}
                      <div className="absolute -top-3 left-0 right-0 h-4 pointer-events-auto" aria-hidden="true" />

                      {/* White rounded card with border and top arrow notch */}
                      <div className="relative bg-white text-ink rounded-2xl shadow-2xl border border-neutral-200 p-2.5">
                        {/* Small top notch arrow aligned under trigger */}
                        <div
                          className={`absolute -top-1.5 w-3 h-3 bg-white border-t border-l border-neutral-200 rotate-45 ${
                            isRightAligned ? "right-7" : "left-7"
                          }`}
                          aria-hidden="true"
                        />

                        {/* Dropdown Items with Staggered Entrance and Smooth Hover */}
                        <div className="flex flex-col gap-1 max-h-[460px] overflow-y-auto overflow-x-hidden">
                          {item.children.map((child, childIdx) => (
                            <div
                              key={child.label}
                              style={{
                                transitionDelay: isOpen ? `${childIdx * 40}ms` : "0ms"
                              }}
                              className={`transition-all duration-200 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
                                isOpen
                                  ? "opacity-100 translate-y-0"
                                  : "opacity-0 translate-y-1"
                              }`}
                            >
                              <Link
                                href={child.href}
                                onClick={() => setActiveDropdown(null)}
                                className="relative flex items-center justify-between pl-4 pr-3 py-2.5 rounded-xl transition-all duration-150 ease-out hover:bg-slate-50 hover:translate-x-0.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transform-none motion-reduce:transition-none"
                                role="menuitem"
                              >
                                {/* 3px blue bar that grows on left on hover */}
                                <span
                                  className="absolute left-1.5 top-2.5 bottom-2.5 w-[3px] bg-primary rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-150 origin-center motion-reduce:transition-none"
                                  aria-hidden="true"
                                />

                                {/* Text content: Title and wrapping description */}
                                <div className="flex flex-col pr-2 min-w-0">
                                  <span className="text-sm font-bold text-neutral-900 group-hover:text-primary transition-colors duration-150 leading-snug">
                                    {child.label}
                                  </span>
                                  {child.desc && (
                                    <span className="text-xs text-neutral-500 mt-0.5 font-normal leading-relaxed">
                                      {child.desc}
                                    </span>
                                  )}
                                </div>

                                {/* Tiny blue arrow that slides and fades in on hover */}
                                <ArrowRight
                                  className="w-4 h-4 text-primary shrink-0 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 ease-out ml-2 motion-reduce:transition-none"
                                  aria-hidden="true"
                                />
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Large Phone Number + Blue "GET A QUOTE" Button */}
            <div className="hidden lg:flex items-center gap-5">
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center gap-2 text-white font-semibold text-base hover:text-primary transition-colors"
                aria-label={`Call ${siteConfig.phone}`}
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>{siteConfig.phone}</span>
              </a>

              <a
                href="#quote"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-ink"
              >
                GET A QUOTE
              </a>
            </div>

            {/* Mobile: Hamburger Button */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href="#quote"
                className="text-xs font-bold uppercase tracking-wider bg-primary hover:bg-primary-dark text-white px-3.5 py-2 rounded-full"
              >
                Quote
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Black Full-Width Accordion with smooth grid animation) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-ink border-t border-neutral-800 px-4 pt-4 pb-8 space-y-3">
            <div className="flex flex-col space-y-1">
              {siteConfig.navigation.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = !!mobileExpanded[item.label];

                if (!hasChildren) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-3 rounded-xl text-base font-semibold text-white hover:bg-neutral-900 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.label} className="border-b border-neutral-800/80 pb-1">
                    <button
                      type="button"
                      onClick={() => toggleMobileAccordion(item.label)}
                      aria-expanded={isExpanded}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-base font-semibold text-white hover:bg-neutral-900 hover:text-primary transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 motion-reduce:transition-none ${
                          isExpanded ? "rotate-180 text-primary" : "text-neutral-400"
                        }`}
                      />
                    </button>

                    {/* Smooth height accordion animation via grid-template-rows */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-4 pr-2 py-2 space-y-1 bg-neutral-950 rounded-xl mb-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-3 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors group"
                            >
                              <span className="font-bold block text-white group-hover:text-primary transition-colors">
                                {child.label}
                              </span>
                              {child.desc && (
                                <span className="text-xs text-neutral-400 block mt-0.5 leading-relaxed font-normal">
                                  {child.desc}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Contact & CTA Footer */}
            <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center justify-center gap-2 text-white font-semibold text-base py-2.5 bg-neutral-900 rounded-xl border border-neutral-800"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>{siteConfig.phone}</span>
              </a>

              <a
                href="#quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-full uppercase tracking-wider text-sm shadow-md text-center"
              >
                <span>GET A QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
