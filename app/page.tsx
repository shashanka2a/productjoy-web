"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, Globe, Clock, Mail } from "lucide-react";

/* --- UTILS & HOOKS --- */

const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold }
    );

    const currentElement = domRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [threshold]);

  return [domRef, isVisible] as const;
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("a, button, .interactive")) {
        setIsHovering(true);
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("a, button, .interactive")) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return { mousePosition, isHovering };
};

const useLocalTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/New_York"
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  return time;
};

/* --- COMPONENTS --- */

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled ? "py-4 bg-[#F5F3EF]/90 backdrop-blur-sm" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Mark */}
        <div className="flex items-center gap-2 interactive cursor-none">
          <div className="w-10 h-6 bg-[#1A1A1A] rounded-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-1 left-2 w-2 h-2 bg-white rounded-full animate-blink" />
            <div className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full animate-blink" />
          </div>
          <span className="font-bold text-xl tracking-tighter text-[#1A1A1A] font-serif">
            ProductJoy
          </span>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {["Work", "Services", "Process", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#1A1A1A] font-medium hover:opacity-50 transition-opacity interactive cursor-none"
            >
              {item}
            </a>
          ))}
          <button className="bg-[#1A1A1A] text-[#F5F3EF] px-5 py-2 rounded-full font-medium hover:scale-105 transition-transform interactive cursor-none text-sm">
            Let&apos;s Talk
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[120vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden px-6">
      <div className="container mx-auto relative z-10">
        {/* Intro Text */}
        <div className="mb-6 ml-2 animate-fade-in-up">
          <span className="text-sm font-bold uppercase tracking-widest text-[#1A1A1A]">
            ProductJoy is a
          </span>
        </div>

        {/* Title + Illustration */}
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end">
          {/* Stacked Typography */}
          <div className="flex-1 flex flex-col items-start leading-[0.85] tracking-tighter text-[#1A1A1A]">
            <div className="relative group">
              <h1 className="text-[13vw] md:text-[8rem] font-serif transition-transform duration-500 group-hover:skew-x-2">
                Curious
              </h1>
            </div>

            <div className="relative ml-[5vw] md:ml-32 group">
              <h1 className="text-[13vw] md:text-[8rem] font-serif italic transition-transform duration-500 group-hover:skew-x-[-2deg]">
                Fullservice
              </h1>
            </div>

            <div className="relative group">
              <h1 className="text-[13vw] md:text-[8rem] font-serif transition-transform duration-500 group-hover:skew-x-2">
                Product&nbsp;Agency
              </h1>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="hidden lg:flex flex-col items-center justify-center flex-none w-[320px] h-[320px] rounded-[2.5rem] bg-[#1A1A1A] text-[#F5F3EF] relative overflow-hidden shadow-2xl animate-float-slow">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 via-transparent to-[#9C27B0]/25" />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5F3EF]/70">
                  Q1 2026
                </span>
              </div>
              <div className="relative w-32 h-24 rounded-[1.75rem] bg-[#F5F3EF] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-x-4 top-5 h-6 rounded-full bg-[#1A1A1A]/5" />
                <div className="relative flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#1A1A1A]" />
                  <div className="w-3 h-3 rounded-full bg-[#1A1A1A]" />
                </div>
                <div className="absolute bottom-4 inset-x-6 h-1 rounded-full bg-[#1A1A1A]/10 overflow-hidden">
                  <div className="h-full w-1/2 bg-[#1A1A1A]" />
                </div>
              </div>
              <p className="text-sm text-center text-[#F5F3EF]/70 max-w-[230px] leading-relaxed">
                From fuzzy problem to joyful product. Strategy, design, and build in one curious
                studio.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-32 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-[#1A1A1A] pt-8 max-w-6xl">
          <p className="text-xl font-medium leading-relaxed text-[#1A1A1A]/80 max-w-md">
            Based in Gainesville. We take care of the entire process from concept to joy.
          </p>

          <a
            href="https://calendly.com/5ha5hank/availability"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 md:mt-0 bg-[#1A1A1A] text-[#F5F3EF] pl-6 pr-8 py-4 rounded-full text-sm font-bold tracking-widest transition-all hover:bg-[#FFD700] hover:text-[#1A1A1A] interactive cursor-none flex items-center gap-3"
          >
            BOOK A CALL
            <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
          </a>
        </div>
      </div>
    </section>
  );
};

type WorkCardProps = {
  title: string;
  category: string;
};

const WorkCard: React.FC<WorkCardProps> = ({ title, category }) => {
  return (
    <div className="min-w-[80vw] md:min-w-[600px] group relative interactive cursor-none transition-transform duration-500">
      <div className="aspect-[4/3] rounded-[2rem] overflow-hidden relative bg-[#2A2A2A] group-hover:scale-[0.98] transition-transform duration-500 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-50" />

        <div className="absolute inset-0 flex items-center justify-center text-[#F5F3EF]/20 font-bold text-9xl select-none font-serif">
          {title[0]}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold">
            Watch Case Study
          </span>
        </div>
      </div>
      <div className="mt-8 pl-2">
        <h3 className="text-4xl font-bold text-[#F5F3EF] font-serif">{title}</h3>
        <p className="text-[#F5F3EF]/50 mt-2 text-xl">{category}</p>
      </div>
    </div>
  );
};

const FeaturedWork: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const start = 0;
      const end = height - viewportHeight;

      const scrolled = -top;
      let newProgress = scrolled / end;
      newProgress = Math.max(0, Math.min(newProgress, 1));
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const getTranslateX = () => {
    if (!trackRef.current) return 0;
    const trackWidth = trackRef.current.scrollWidth;
    const windowWidth = window.innerWidth;

    const scrollAmount = trackWidth - windowWidth + windowWidth * 0.2;
    if (scrollAmount <= 0) return 0;

    return -(progress * scrollAmount);
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative h-[900vh] bg-[#1A1A1A] text-[#F5F3EF] z-20 rounded-t-[3rem] -mt-10"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-40">
        <div className="container mx-auto px-6 md:px-20 w-full flex-shrink-0">
          <div className="flex items-end justify-between">
            <div className="animate-fade-in-up">
              <span className="text-[#FFD700] font-bold tracking-widest uppercase text-sm mb-4 block">
                Featured Projects
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight font-serif">
                From Idea
                <br />
                to Execution.
              </h2>
            </div>

            <div className="hidden md:block">
              <div className="text-right text-sm font-bold mb-2 text-[#F5F3EF]/50">
                {Math.round(progress * 100)}%
              </div>
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFD700] transition-all duration-75 ease-out"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-32 px-6 md:px-20 mt-32 will-change-transform"
          style={{ transform: `translateX(${getTranslateX()}px)` }}
        >
          <WorkCard title="FinTech Neo" category="App Design & Motion System" />
          <WorkCard title="Green Energy" category="Brand Identity" />
          <WorkCard title="Nordic Stream" category="Web Experience" />
          <WorkCard title="Health AI" category="Product Strategy" />
          <WorkCard title="Urban Flow" category="Smart City App" />
        </div>
      </div>
    </section>
  );
};

type ServiceItemProps = {
  title: string;
  tags: string[];
};

const ServiceItem: React.FC<ServiceItemProps> = ({ title, tags }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="border-b border-[#1A1A1A]/10 py-10 interactive cursor-pointer group"
      onClick={() => setIsOpen((o) => !o)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-3xl md:text-4xl font-bold group-hover:text-[#FF6B6B] transition-colors font-serif">
          {title}
        </h3>
        <div className={`transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>
          <Plus size={32} />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-40 opacity-100 mt-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-lg text-[#1A1A1A]/60 mb-4 max-w-xl">
          We handle everything from the initial sketch to the final pixel. Our team integrates
          seamlessly with yours.
        </p>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-white border border-[#1A1A1A]/10 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-[#F5F3EF] rounded-t-[3rem] relative z-30">
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-20">
        <div className="md:w-1/3">
          <div className="sticky top-32">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
              Our
              <br />
              Services
            </h2>
            <p className="text-xl text-[#1A1A1A]/60 mb-8">
              A full-service partner for ambitious brands. We don&apos;t just make things pretty; we
              make them work.
            </p>
            <div className="bg-[#1A1A1A] text-[#F5F3EF] p-8 rounded-2xl inline-block transition-transform duration-300">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 bg-[#FFD700] rounded-full" />
                <span className="font-bold uppercase tracking-widest text-xs">Availability</span>
              </div>
              <p className="text-2xl font-bold">Open for Q1 2026</p>
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <ServiceItem
            title="Strategy & Branding"
            tags={["Positioning", "Tone of Voice", "Visual Identity"]}
          />
          <ServiceItem
            title="Digital Product"
            tags={["UX/UI Design", "App Development", "Design Systems"]}
          />
          <ServiceItem
            title="Motion & 3D"
            tags={["Explainer Videos", "3D Illustration", "Interaction Design"]}
          />
          <ServiceItem
            title="Content Production"
            tags={["Social Assets", "Copywriting", "Campaigns"]}
          />
        </div>
      </div>
    </section>
  );
};

type ProcessStepType = {
  title: string;
  desc: string;
};

type ProcessStepProps = {
  step: ProcessStepType;
  index: number;
};

const ProcessStep: React.FC<ProcessStepProps> = ({ step, index }) => {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={`group interactive transition-all duration-1000 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <div className="text-6xl font-bold text-[#F5F3EF]/10 mb-4 group-hover:text-[#FFD700] transition-colors duration-500 font-serif">
        0{index + 1}
      </div>
      <h3 className="text-3xl font-bold mb-4 font-serif">{step.title}</h3>
      <p className="text-xl text-[#F5F3EF]/60 leading-relaxed max-w-md">{step.desc}</p>
    </div>
  );
};

const Process: React.FC = () => {
  const steps: ProcessStepType[] = [
    { title: "Discovery", desc: "We dig deep into your business goals, user needs, and bad jokes." },
    { title: "Definition", desc: "Setting the roadmap. No fluff, just a clear path to victory." },
    {
      title: "Design",
      desc: "Where the magic happens. Iterative, collaborative, and pixel-perfect."
    },
    {
      title: "Delivery",
      desc: "Handover with confidence. Clean code, tidy files, and high-fives."
    }
  ];

  return (
    <section
      id="process"
      className="py-32 bg-[#1A1A1A] text-[#F5F3EF] rounded-t-[3rem] -mt-10 relative z-40"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32">
          <div className="md:w-1/3">
            <h2 className="text-4xl md:text-6xl font-bold sticky top-32 font-serif">
              How we
              <br />
              work.
            </h2>
          </div>
          <div className="md:w-2/3 space-y-24">
            {steps.map((step, i) => (
              <ProcessStep key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const localTime = useLocalTime();

  return (
    <footer className="bg-[#F5F3EF] text-[#1A1A1A] pt-40 pb-0 relative overflow-hidden -mt-10 z-50 rounded-t-[3rem]">
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
        <h1 className="text-[22vw] md:text-[18vw] font-bold leading-none text-center font-serif tracking-tight">
          PRODUCT
          <br />
          JOY
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10 pb-32">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-xl">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 font-serif">
              Let&apos;s get
              <br />
              <span className="text-[#9C27B0] italic font-serif">serious.</span>
            </h2>
            <p className="text-2xl text-[#1A1A1A]/60">(Just kidding, let&apos;s keep it fun.)</p>
          </div>

          <div className="bg-[#1A1A1A] text-[#F5F3EF] p-8 rounded-3xl w-full md:w-auto min-w-[300px] border border-black/5 hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="font-bold uppercase tracking-widest text-xs opacity-80">
                We are in our studio!
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[#F5F3EF]/70 hover:text-[#FFD700] transition-colors cursor-pointer interactive">
                <Mail size={20} />
                <span className="text-lg">hello@productjoy.com</span>
              </div>
              <div className="flex items-center gap-4 text-[#F5F3EF]/70">
                <Clock size={20} />
                <span className="text-lg">Local time: {localTime}</span>
              </div>
              <div className="flex items-center gap-4 text-[#F5F3EF]/70">
                <Globe size={20} />
                <span className="text-lg">Gainesville, USA</span>
              </div>
            </div>
            <button className="w-full mt-8 bg-[#F5F3EF] text-[#1A1A1A] py-4 rounded-xl font-bold hover:bg-[#FFD700] transition-colors interactive">
              Book a Meeting
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-4 text-[#1A1A1A]/40 font-medium text-sm uppercase tracking-wider border-t border-[#1A1A1A]/10 pt-8">
          <a href="#" className="hover:text-[#1A1A1A] transition-colors interactive">
            Instagram
          </a>
          <a href="#" className="hover:text-[#1A1A1A] transition-colors interactive">
            LinkedIn
          </a>
          <a href="#" className="hover:text-[#1A1A1A] transition-colors interactive">
            Vimeo
          </a>
          <span className="ml-auto">© 2024 ProductJoy Agency</span>
        </div>
      </div>
    </footer>
  );
};

const HomePage: React.FC = () => {
  const { mousePosition, isHovering } = useMousePosition();

  return (
    <div className="bg-[#F5F3EF] min-h-screen text-[#1A1A1A] font-sans selection:bg-[#9C27B0] selection:text-white">
      {/* Custom Cursor */}
      <div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[200] mix-blend-difference hidden md:flex items-center justify-center transition-all duration-100 ease-out border border-white bg-white"
        style={{
          transform: `translate(${mousePosition.x - 12}px, ${
            mousePosition.y - 12
          }px) scale(${isHovering ? 3 : 1})`
        }}
      />

      <Navigation />
      <Hero />
      <FeaturedWork />
      <Services />
      <Process />
      <Footer />
    </div>
  );
};

export default HomePage;


