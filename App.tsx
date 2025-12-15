import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight, ArrowUpRight, Plus, X, Globe, Clock, Mail } from 'lucide-react';

/* --- UTILS & HOOKS --- */

const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { threshold });

    const currentElement = domRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [threshold]);

  return [domRef, isVisible];
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMoveHandler = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };
    
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .interactive')) {
        setIsHovering(true);
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, .interactive')) {
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

const useLocalTime = (offsetGMT) => {
    const [time, setTime] = useState('');
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const newTime = new Date(utc + (3600000 * offsetGMT));
            setTime(newTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, [offsetGMT]);
    return time;
};

/* --- COMPONENTS --- */

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'py-4 bg-[#F5F3EF]/90 backdrop-blur-sm' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Mark */}
        <div className="flex items-center gap-2 interactive cursor-none">
            <div className="w-10 h-6 bg-[#1A1A1A] rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-1 left-2 w-2 h-2 bg-white rounded-full animate-blink"></div>
                <div className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full animate-blink"></div>
            </div>
            <span className="font-bold text-xl tracking-tighter text-[#1A1A1A] font-serif">ProductJoy</span>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {['Work', 'Services', 'Process', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[#1A1A1A] font-medium hover:opacity-50 transition-opacity interactive cursor-none">
              {item}
            </a>
          ))}
          <button className="bg-[#1A1A1A] text-[#F5F3EF] px-5 py-2 rounded-full font-medium hover:scale-105 transition-transform interactive cursor-none text-sm">
            Let's Talk
          </button>
        </div>
      </div>
    </nav>
  );
};

// 3. Hero Section (Clean & Taller)
const Hero = () => {
  return (
    <section className="relative min-h-[120vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden px-6">
      <div className="container mx-auto relative z-10">
        
        {/* Intro Text */}
        <div className="mb-6 ml-2 animate-fade-in-up">
            <span className="text-sm font-bold uppercase tracking-widest text-[#1A1A1A]">ProductJoy is a</span>
        </div>

        {/* Stacked Typography - Cleaned up */}
        <div className="flex flex-col items-start leading-[0.85] tracking-tighter text-[#1A1A1A]">
            
            {/* LINE 1 */}
            <div className="relative group">
                <h1 className="text-[13vw] md:text-[8rem] font-serif transition-transform duration-500 group-hover:skew-x-2">Curious</h1>
            </div>

            {/* LINE 2 */}
            <div className="relative ml-[5vw] md:ml-32 group">
                <h1 className="text-[13vw] md:text-[8rem] font-serif italic transition-transform duration-500 group-hover:skew-x-[-2deg]">Fullservice</h1>
            </div>

            {/* LINE 3 */}
            <div className="relative group">
                {/* Ensure explicit space between words */}
                <h1 className="text-[13vw] md:text-[8rem] font-serif transition-transform duration-500 group-hover:skew-x-2">Product&nbsp;Agency</h1>
            </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-32 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-[#1A1A1A] pt-8 max-w-6xl">
           <p className="text-xl font-medium leading-relaxed text-[#1A1A1A]/80 max-w-md">
               Based in Gainesville. We take care of the entire process from concept to joy.
           </p>
           
           <button className="mt-8 md:mt-0 bg-[#1A1A1A] text-[#F5F3EF] pl-6 pr-8 py-4 rounded-full text-sm font-bold tracking-widest transition-all hover:bg-[#FFD700] hover:text-[#1A1A1A] interactive cursor-none flex items-center gap-3">
             SEE OUR REEL 
             <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
           </button>
        </div>
      </div>
    </section>
  );
};

// 4. Featured Work (Scroll-Locked Horizontal Progress)
const WorkCard = ({ title, category, video, delay }) => {
  return (
    <div 
        className={`min-w-[80vw] md:min-w-[600px] group relative interactive cursor-none transition-transform duration-500`}
    >
      <div className="aspect-[4/3] rounded-[2rem] overflow-hidden relative bg-[#2A2A2A] group-hover:scale-[0.98] transition-transform duration-500 shadow-2xl">
         {/* Simulate Video Auto-Play on Hover */}
         <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-50"></div>
         
         <div className="absolute inset-0 flex items-center justify-center text-[#F5F3EF]/20 font-bold text-9xl select-none font-serif">
            {title[0]}
         </div>
         
         <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <span className="text-white bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold">Watch Case Study</span>
         </div>
      </div>
      <div className="mt-8 pl-2">
        <h3 className="text-4xl font-bold text-[#F5F3EF] font-serif">{title}</h3>
        <p className="text-[#F5F3EF]/50 mt-2 text-xl">{category}</p>
      </div>
    </div>
  );
};

const FeaturedWork = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const { top, height } = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Calculate scroll progress within the tall section container
            const start = 0; // When section top hits 0
            const end = height - viewportHeight; // Total scrollable distance
            
            // Invert top because scrolling down makes top negative
            const scrolled = -top;
            
            let newProgress = scrolled / end;
            
            // Clamp between 0 and 1
            newProgress = Math.max(0, Math.min(newProgress, 1));
            
            setProgress(newProgress);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const getTranslateX = () => {
        if (!trackRef.current) return 0;
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        
        // Increase buffer to allow the last item to be reached easily and sit more centrally
        const scrollAmount = trackWidth - windowWidth + (windowWidth * 0.2); 
        
        // Don't scroll if content fits
        if (scrollAmount <= 0) return 0;

        return -(progress * scrollAmount);
    };

    return (
        // Height 900vh for extremely smooth, extended scroll experience
        <section ref={sectionRef} id="work" className="relative h-[900vh] bg-[#1A1A1A] text-[#F5F3EF] z-20 rounded-t-[3rem] -mt-10">
            {/* Sticky Container with SIGNIFICANT padding: py-40 gives massive breathing room top and bottom */}
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-40">
                
                {/* Header Area */}
                <div className="container mx-auto px-6 md:px-20 w-full flex-shrink-0">
                    <div className="flex items-end justify-between">
                        <div className="animate-fade-in-up">
                            <span className="text-[#FFD700] font-bold tracking-widest uppercase text-sm mb-4 block">Featured Projects</span>
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tight font-serif">From Idea<br />to Done.</h2>
                        </div>
                        
                        {/* Progress Indicator */}
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
                
                {/* The Horizontally Scrolling Track */}
                <div 
                    ref={trackRef}
                    // Increased top margin to mt-32 for maximum separation from title
                    className="flex gap-32 px-6 md:px-20 mt-32 will-change-transform"
                    style={{ transform: `translateX(${getTranslateX()}px)` }}
                >
                    <WorkCard title="FinTech Neo" category="App Design & Motion System" delay={0} />
                    <WorkCard title="Green Energy" category="Brand Identity" delay={0} />
                    <WorkCard title="Nordic Stream" category="Web Experience" delay={0} />
                    <WorkCard title="Health AI" category="Product Strategy" delay={0} />
                    <WorkCard title="Urban Flow" category="Smart City App" delay={0} />
                </div>
            </div>
        </section>
    );
};

// 5. Services Section (List with Plus)
const ServiceItem = ({ title, tags }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div 
            className="border-b border-[#1A1A1A]/10 py-10 interactive cursor-pointer group"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-3xl md:text-4xl font-bold group-hover:text-[#FF6B6B] transition-colors font-serif">{title}</h3>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    <Plus size={32} />
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                <p className="text-lg text-[#1A1A1A]/60 mb-4 max-w-xl">
                    We handle everything from the initial sketch to the final pixel. Our team integrates seamlessly with yours.
                </p>
                <div className="flex gap-2 flex-wrap">
                    {tags.map(tag => (
                        <span key={tag} className="bg-white border border-[#1A1A1A]/10 px-3 py-1 rounded-full text-sm">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Services = () => {
    return (
        <section id="services" className="py-32 bg-[#F5F3EF] rounded-t-[3rem] relative z-30">
            <div className="container mx-auto px-6 flex flex-col md:flex-row gap-20">
                <div className="md:w-1/3">
                    <div className="sticky top-32">
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 font-serif">Our<br/>Services</h2>
                        <p className="text-xl text-[#1A1A1A]/60 mb-8">
                            A full-service partner for ambitious brands. We don't just make things pretty; we make them work.
                        </p>
                        {/* Straightened badge (no rotate-3) */}
                        <div className="bg-[#1A1A1A] text-[#F5F3EF] p-8 rounded-2xl inline-block transition-transform duration-300">
                             <div className="flex items-center gap-3 mb-2">
                                <span className="w-3 h-3 bg-[#FFD700] rounded-full"></span>
                                <span className="font-bold uppercase tracking-widest text-xs">Availability</span>
                             </div>
                             <p className="text-2xl font-bold">Open for Q1 2025</p>
                        </div>
                    </div>
                </div>
                <div className="md:w-2/3">
                    <ServiceItem title="Strategy & Branding" tags={['Positioning', 'Tone of Voice', 'Visual Identity']} />
                    <ServiceItem title="Digital Product" tags={['UX/UI Design', 'App Development', 'Design Systems']} />
                    <ServiceItem title="Motion & 3D" tags={['Explainer Videos', '3D Illustration', 'Interaction Design']} />
                    <ServiceItem title="Content Production" tags={['Social Assets', 'Copywriting', 'Campaigns']} />
                </div>
            </div>
        </section>
    );
};

// 6. Process Section (Dark BG)
const ProcessStep = ({ step, index }) => {
    const [ref, isVisible] = useScrollReveal(0.2); // Each step reveals independently

    return (
        <div 
            ref={ref}
            className={`group interactive transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}
        >
            <div className="text-6xl font-bold text-[#F5F3EF]/10 mb-4 group-hover:text-[#FFD700] transition-colors duration-500 font-serif">0{index + 1}</div>
            <h3 className="text-3xl font-bold mb-4 font-serif">{step.title}</h3>
            <p className="text-xl text-[#F5F3EF]/60 leading-relaxed max-w-md">{step.desc}</p>
        </div>
    );
};

const Process = () => {
    return (
        <section id="process" className="py-32 bg-[#1A1A1A] text-[#F5F3EF] rounded-t-[3rem] -mt-10 relative z-40">
             <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16 md:gap-32">
                    <div className="md:w-1/3">
                        <h2 className="text-4xl md:text-6xl font-bold sticky top-32 font-serif">How we<br/>work.</h2>
                    </div>
                    <div className="md:w-2/3 space-y-24">
                        {[
                            { title: "Discovery", desc: "We dig deep into your business goals, user needs, and bad jokes." },
                            { title: "Definition", desc: "Setting the roadmap. No fluff, just a clear path to victory." },
                            { title: "Design", desc: "Where the magic happens. Iterative, collaborative, and pixel-perfect." },
                            { title: "Delivery", desc: "Handover with confidence. Clean code, tidy files, and high-fives." }
                        ].map((step, i) => (
                            <ProcessStep key={i} step={step} index={i} />
                        ))}
                    </div>
                </div>
             </div>
        </section>
    );
};

// 7. Footer (Light BG)
const Footer = () => {
    const localTime = useLocalTime(1); 

    return (
        <footer className="bg-[#F5F3EF] text-[#1A1A1A] pt-40 pb-0 relative overflow-hidden -mt-10 z-50 rounded-t-[3rem]">
            
            {/* Background Watermark */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
                <h1 className="text-[25vw] font-bold leading-none text-center whitespace-nowrap translate-y-[30%] font-serif">
                    PRODUCTJOY
                </h1>
            </div>

            <div className="container mx-auto px-6 relative z-10 pb-32">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                    <div className="max-w-xl">
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 font-serif">
                            Let's get <br/>
                            <span className="text-[#9C27B0] italic font-serif">serious.</span>
                        </h2>
                        <p className="text-2xl text-[#1A1A1A]/60">
                            (Just kidding, let's keep it fun.)
                        </p>
                    </div>
                    
                    {/* Status Box */}
                    <div className="bg-[#1A1A1A] text-[#F5F3EF] p-8 rounded-3xl w-full md:w-auto min-w-[300px] border border-black/5 hover:scale-[1.01] transition-transform">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="font-bold uppercase tracking-widest text-xs opacity-80">We are in our studio!</span>
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
                    <a href="#" className="hover:text-[#1A1A1A] transition-colors interactive">Instagram</a>
                    <a href="#" className="hover:text-[#1A1A1A] transition-colors interactive">LinkedIn</a>
                    <a href="#" className="hover:text-[#1A1A1A] transition-colors interactive">Vimeo</a>
                    <span className="ml-auto">© 2024 ProductJoy Agency</span>
                </div>
            </div>
        </footer>
    );
};

// Main App Component
const App = () => {
  const { mousePosition, isHovering } = useMousePosition();

  return (
    <div className="bg-[#F5F3EF] min-h-screen text-[#1A1A1A] font-sans selection:bg-[#9C27B0] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap');
        
        :root {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .font-serif {
            font-family: 'Playfair Display', serif;
        }

        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes blink {
          0%, 96%, 100% { transform: scaleY(1); }
          98% { transform: scaleY(0.1); }
        }
        @keyframes worm-wiggle {
            0%, 100% { d: path("M10 30 Q30 10 50 30 T90 30 T130 30 T170 30"); }
            50% { d: path("M10 30 Q30 50 50 30 T90 30 T130 30 T170 30"); }
        }
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes leg-sway {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
        }
        @keyframes leg-sway-delayed {
            0%, 100% { transform: rotate(5deg); }
            50% { transform: rotate(-5deg); }
        }
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-blink { animation: blink 4s infinite; }
        .animate-worm-wiggle { animation: worm-wiggle 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-leg-sway { animation: leg-sway 2s ease-in-out infinite; }
        .animate-leg-sway-delayed { animation: leg-sway-delayed 2s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>

      {/* Custom Cursor */}
      <div 
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[200] mix-blend-difference hidden md:flex items-center justify-center transition-all duration-100 ease-out border border-white bg-white"
        style={{ 
            transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px) scale(${isHovering ? 3 : 1})`,
        }}
      >
      </div>

      <Navigation />
      <Hero />
      <FeaturedWork />
      <Services />
      <Process />
      <Footer />
    </div>
  );
};

export default App;
