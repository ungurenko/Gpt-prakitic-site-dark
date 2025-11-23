import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, XCircle, Check, ArrowRight, Bot, 
  Calendar, Clock, Video, Star, ShieldCheck, X, Heart, Sparkles,
  PlayCircle, TrendingUp, Layers, Infinity, Users, Briefcase
} from 'lucide-react';
import { Accordion } from './components/ui/Accordion';
import { 
  PAIN_POINTS, PROGRAM_MODULES, OUTCOMES, 
  ASSISTANTS, FORMAT_POINTS, PRICING_TIERS 
} from './constants';

// --- Hooks ---

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ 
        x: (ev.clientX / window.innerWidth) * 2 - 1, 
        y: (ev.clientY / window.innerHeight) * 2 - 1 
      });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

// --- Helper Components ---

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Ticker = () => {
  const items = ["СИСТЕМА", "ПРОДАЖИ", "КОНТЕНТ", "AI", "СВОБОДА", "GPT", "СТРАТЕГИЯ", "ДЕНЬГИ", "БЛОГ"];
  return (
    <div className="w-full bg-neon-lime text-dark-900 overflow-hidden py-3 border-y border-white/10 transform -rotate-1 relative z-20 shadow-neon-lime">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-8 mx-4">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-8">
                <span className="text-xl font-display font-black tracking-wider">{item}</span>
                <Star className="w-4 h-4 fill-current" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 3D Objects (CSS Only) ---

const Sphere3D = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <div className={`rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),inset_10px_10px_20px_rgba(255,255,255,0.4)] bg-gradient-to-br from-gray-200 to-gray-400 ${className}`} style={style}></div>
);

const Cube3D = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <div className={`relative ${className}`} style={style}>
     <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/30 transform rotate-45 rounded-xl shadow-neon"></div>
  </div>
);

// --- UI Components ---

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ className = "", children, id = "" }) => (
  <section id={id} className={`py-12 md:py-20 px-6 relative overflow-hidden ${className}`}>
    <div className="max-w-7xl mx-auto relative z-10">
      {children}
    </div>
  </section>
);

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'white' | 'soft';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = "",
  onClick
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 rounded-full font-medium transition-all duration-300 transform active:scale-95 text-base font-display tracking-wide relative overflow-hidden group";
  const variants = {
    primary: "bg-neon-pink text-dark-900 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] shadow-neon",
    outline: "border border-white/20 text-white hover:border-neon-pink hover:text-neon-pink bg-transparent backdrop-blur-sm",
    white: "bg-white text-dark-900 hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]",
    soft: "bg-dark-700/50 text-white hover:bg-dark-600 border border-white/10 backdrop-blur-sm"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {/* Shine effect */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [openModuleId, setOpenModuleId] = useState<number | null>(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { x, y } = useMousePosition();

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen bg-dark-900 text-gray-300 font-sans selection:bg-neon-pink selection:text-dark-900 overflow-x-hidden">
      
      {/* Global Noise Texture */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-50 opacity-30 mix-blend-overlay"></div>

      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-dark-900/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer z-50">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-neon-lime transition-colors shadow-inner-light">
              <Bot className="w-4 h-4 md:w-5 md:h-5 text-neon-lime" />
            </div>
            <span className="font-display font-bold text-lg md:text-xl text-white tracking-tight">GPT-ПРАКТИК</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
              <a href="#program" className="hover:text-white transition-colors">Программа</a>
              <a href="#results" className="hover:text-white transition-colors">Результат</a>
              <a href="#pricing" className="hover:text-white transition-colors">Тарифы</a>
            </div>
            <button 
              onClick={scrollToPricing}
              className="bg-white/10 border border-white/10 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-neon-lime hover:text-dark-900 hover:border-neon-lime transition-all shadow-inner-light"
            >
              Выбрать тариф
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
             <button onClick={toggleMenu} className="text-white p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Layers className="w-6 h-6 rotate-90" />}
             </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-dark-900 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <a href="#program" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-bold text-white">Программа</a>
            <a href="#results" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-bold text-white">Результат</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-bold text-white">Тарифы</a>
            <Button onClick={scrollToPricing}>Выбрать тариф</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-28 pb-12 md:pt-48 md:pb-20 px-6 overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-purple/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-neon-pink/15 rounded-full blur-[60px] md:blur-[100px]" />
        </div>
        
        {/* 3D Parallax Objects (Hidden on mobile to save performance) */}
        <div className="hidden md:block">
          <Sphere3D 
            className="absolute top-32 left-[10%] w-24 h-24 bg-gradient-to-br from-neon-lime to-green-900 opacity-80 z-0" 
            style={{ transform: `translate(${x * -20}px, ${y * -20}px)` }}
          />
          <Cube3D 
            className="absolute bottom-40 right-[15%] z-0" 
            style={{ transform: `translate(${x * 30}px, ${y * 30}px) rotate(15deg)` }} 
          />
          <div 
            className="absolute top-1/3 right-[5%] w-4 h-4 rounded-full bg-neon-pink blur-[2px] animate-float"
            style={{ transform: `translate(${x * -10}px, ${y * -10}px)` }}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-gray-300 font-medium text-xs md:text-sm mb-8 shadow-inner-light">
              <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse shadow-[0_0_10px_#d1f898]"></span>
              <span>Старт группы 6 октября</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-6 md:mb-8 leading-[1.1] md:leading-[0.95] tracking-tight">
              <span className="text-gradient-platinum">Системный и</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-purple-400 to-neon-cyan relative inline-block">
                 продающий блог
                 <svg className="absolute w-full h-2 md:h-3 -bottom-2 md:-bottom-4 left-0 text-neon-pink opacity-60" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C35.5002 2.99998 150.5 -2.00002 198 3.99998" stroke="currentColor" strokeWidth="3"/></svg>
              </span> <br />
              <span className="text-gradient-platinum">с ChatGPT</span>
            </h1>
            
            <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto px-2">
              Внедри ИИ в свой блог и начни СИСТЕМНО делать контент для соц.сетей который приводит клиентов на услуги или инфопродукты.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 mb-12 md:mb-20">
              <Button onClick={scrollToPricing} className="w-full sm:w-auto min-w-[200px]">Выбрать тариф</Button>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer group bg-white/5 px-6 py-4 rounded-full border border-white/5 hover:border-white/20 backdrop-blur-sm w-full sm:w-auto justify-center">
                 <PlayCircle className="w-5 h-5 text-white group-hover:text-neon-pink transition-colors" />
                 <a href="#program" className="font-medium">Программа обучения</a>
              </div>
            </div>

            {/* Hero Stats/Bento Glass */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
              {[
                { icon: Video, label: "Формат", val: "Живые воркшопы", color: "text-neon-lime" },
                { icon: Calendar, label: "Длительность", val: "8 недель", color: "text-neon-pink" },
                { icon: Layers, label: "Программа", val: "5 модулей", color: "text-neon-purple" },
                { icon: Star, label: "Результат", val: "Система", color: "text-neon-cyan" },
              ].map((item, idx) => (
                <div key={idx} className="glass-card p-4 md:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center text-center hover:bg-white/10 transition-all group">
                  <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.color} mb-2 md:mb-3 group-hover:scale-110 transition-transform`} />
                  <span className="text-white font-display font-bold text-sm md:text-lg leading-tight mb-1 text-shadow-sm">{item.val}</span>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 font-semibold group-hover:text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Ticker Section */}
      <Ticker />

      {/* Pain Points Section */}
      <Section className="bg-dark-900 relative">
        {/* Subtle grid bg */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 relative z-10">
           <div className="max-w-2xl">
              <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4 md:mb-6 leading-tight">
                Для кого <span className="text-neon-lime inline-block transform rotate-1 decoration-wavy underline decoration-neon-lime/50">эта программа?</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                Ты эксперт, продюсер, маркетолог и тебе откликается одно из этого:
              </p>
           </div>
           <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-neon-lime/20 blur-xl rounded-full"></div>
              <Star className="w-16 h-16 text-neon-lime relative z-10 animate-spin-slow" />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative z-10">
          {PAIN_POINTS.map((item, idx) => (
            <FadeIn key={item.id} delay={idx * 100}>
              <div className="glass-card glass-card-hover h-full p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-300 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 md:mb-6 text-gray-400 group-hover:text-neon-pink group-hover:bg-neon-pink/10 group-hover:scale-110 transition-all border border-white/5 shadow-inner-light">
                  <XCircle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <p className="text-gray-200 text-base md:text-lg font-medium leading-relaxed group-hover:text-white">{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        
        {/* Intro Result Quote */}
        <div className="mt-12 md:mt-20 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-dark-800 to-dark-900 border border-white/10 text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-lime"></div>
           <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl"></div>
           
           <p className="text-lg md:text-3xl text-white font-display font-medium leading-relaxed relative z-10">
             «Ты уходишь с каждого созвона не с кашей в голове, а с <span className="text-neon-lime underline decoration-2 underline-offset-4 decoration-neon-lime/30">готовым постом, сценарием или частью воронки</span>. 
             Ты платишь за внедрение ИИ в твой блог, а не за информацию.»
           </p>
        </div>
      </Section>

      {/* Author Section */}
      <Section className="relative overflow-visible">
         <div className="absolute top-1/2 left-0 w-full h-[500px] bg-neon-purple/10 blur-[100px] -translate-y-1/2 pointer-events-none"></div>
         
         <div className="max-w-5xl mx-auto">
            <div className="glass-card p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row gap-8 md:gap-12 items-center relative overflow-hidden border-neon-purple/30">
               {/* Decorative background elements */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-pink/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
               
               {/* Image Side */}
               <div className="w-full md:w-2/5 relative shrink-0">
                  <div className="aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden relative z-10 border border-white/10 shadow-2xl group">
                     <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60"></div>
                     {/* Placeholder Image */}
                     <img 
                       src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" 
                       alt="Автор курса" 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute bottom-0 left-0 p-4 md:p-6">
                        <p className="text-neon-lime font-mono text-xs mb-1">@alex_neuro</p>
                        <h3 className="text-xl md:text-2xl font-display font-bold text-white">Алексей Нейро</h3>
                     </div>
                  </div>
                  {/* Floating Badge (Hidden on mobile) */}
                  <div className="hidden md:flex absolute -bottom-6 -right-6 bg-dark-800/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl z-20 items-center gap-3 animate-float">
                     <div className="bg-neon-pink/20 p-2 rounded-full text-neon-pink">
                        <ShieldCheck className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Опыт</p>
                        <p className="text-white font-bold">4+ года</p>
                     </div>
                  </div>
               </div>

               {/* Content Side */}
               <div className="w-full md:w-3/5 relative z-10">
                  <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-4 md:mb-6">
                    Кто ведет <span className="text-neon-purple">программу?</span>
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                    Я не просто теоретик, а практик, который ежедневно использует нейросети для запуска проектов, создания контента и автоматизации рутины. Моя цель — передать вам не просто "промты", а <span className="text-white font-bold">систему мышления</span>.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                     {[
                        { label: "Учеников", val: "500+", icon: Users },
                        { label: "Проектов", val: "50+", icon: Briefcase },
                     ].map((stat, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-3 md:p-4 border border-white/5 flex items-center gap-4">
                           <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-500" />
                           <div>
                              <div className="text-xl md:text-2xl font-display font-bold text-white">{stat.val}</div>
                              <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide font-bold">{stat.label}</div>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="inline-flex items-center gap-3">
                     <div className="h-px w-8 md:w-12 bg-neon-purple"></div>
                     <span className="font-display italic text-xl md:text-2xl text-gray-400">Alex Neuro</span>
                  </div>
               </div>
            </div>
         </div>
      </Section>

      {/* Program Section */}
      <Section id="program" className="my-0 md:my-10">
        <div className="absolute inset-0 bg-dark-800/30 transform -skew-y-2 scale-110 z-0 rounded-[3rem] md:rounded-[5rem]"></div>
        
        <div className="text-center mb-10 md:mb-16 relative z-10">
          <span className="text-neon-purple text-xs md:text-sm font-bold uppercase tracking-widest mb-3 md:mb-4 block">Структура</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-gradient-platinum">Программа обучения</h2>
        </div>
        
        <div className="max-w-4xl mx-auto flex flex-col gap-3 md:gap-4 relative z-10">
          {PROGRAM_MODULES.map((module) => (
            <Accordion 
              key={module.id} 
              module={module} 
              isOpen={openModuleId === module.id}
              onClick={() => setOpenModuleId(openModuleId === module.id ? null : module.id)}
            />
          ))}
        </div>
      </Section>

      {/* Results / Bento Grid */}
      <Section id="results">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4 md:mb-6">
            Что будет <span className="text-neon-pink font-black italic">на выходе</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base">Твой результат после 8 недель плотной работы.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-auto md:grid-rows-2 gap-4 md:gap-6 max-w-6xl mx-auto md:h-[600px]">
          {/* Large Card - Neuro Network */}
          <div className="md:col-span-2 md:row-span-2 glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group hover:border-neon-purple/50 transition-all min-h-[280px] md:min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sphere3D className="absolute -right-10 -bottom-10 w-40 h-40 md:w-64 md:h-64 opacity-10 blur-xl" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
               <div>
                 <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-neon-purple to-purple-700 text-white flex items-center justify-center mb-4 md:mb-6 shadow-neon">
                    <Bot className="w-6 h-6 md:w-8 md:h-8" />
                 </div>
                 <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 md:mb-4">Твоя нейросеть</h3>
                 <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                   Настроена под тебя, говорит твоими словами. Ты перестаешь писать шаблонно.
                 </p>
               </div>
               <div className="flex gap-2 mt-6 md:mt-8">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                       <div className="h-full bg-neon-purple w-2/3 animate-[shimmer_2s_infinite]"></div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Small Card 1 - Content */}
          <div className="glass-card p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] hover:bg-white/5 transition-colors flex flex-col justify-center min-h-[180px] md:min-h-[200px] relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 md:p-8 opacity-20 group-hover:opacity-40 transition-opacity group-hover:scale-110 duration-500">
                <TrendingUp className="w-16 h-16 md:w-24 md:h-24 text-neon-lime" />
             </div>
             <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-neon-lime mb-3 md:mb-4 relative z-10" />
             <h4 className="text-lg md:text-xl font-display font-bold text-white mb-2 relative z-10">Контент</h4>
             <p className="text-gray-400 text-xs md:text-sm relative z-10">Стабильно создаётся, качественно и с твоими смыслами.</p>
          </div>

          {/* Small Card 2 - Feelings */}
          <div className="bg-gradient-to-br from-neon-pink to-pink-600 text-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-center relative overflow-hidden min-h-[180px] md:min-h-[200px] shadow-neon">
             <div className="absolute -right-4 -bottom-4 w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full blur-2xl" />
             <h4 className="text-2xl md:text-3xl font-display font-bold mb-2">Ты</h4>
             <p className="font-medium opacity-90 leading-tight text-sm md:text-base">Чувствуешь опору, ясность и контроль над своим блогом.</p>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
           <div className="glass-card p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex items-center gap-4 md:gap-6 group hover:border-neon-cyan/50 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-dark-900/50 border border-white/10 flex items-center justify-center text-neon-cyan shrink-0 shadow-inner-light">
                <Layers className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <p className="text-white font-medium text-sm md:text-lg">Прогревы собраны в воронку, структура выстроена</p>
           </div>
           <div className="glass-card p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex items-center gap-4 md:gap-6 group hover:border-neon-lime/50 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-dark-900/50 border border-white/10 flex items-center justify-center text-neon-lime shrink-0 shadow-inner-light">
                <Video className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <p className="text-white font-medium text-sm md:text-lg">Видео, визуал, сторис делаются быстрее и лучше, чем вручную</p>
           </div>
        </div>
      </Section>

      {/* Assistants Grid */}
      <Section className="bg-dark-900 relative border-t border-white/5">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
         
         <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-12 relative z-10">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white text-center md:text-left mb-4 md:mb-0">
              Какие <span className="text-neon-lime">GPT-ассистенты</span> <br /> ты получишь:
            </h2>
            <div className="px-5 py-2 md:px-6 md:py-3 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple font-bold text-xs md:text-sm backdrop-blur-sm shadow-neon">
              13 авторских GPT в комплекте
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 relative z-10">
            {ASSISTANTS.map((assistant, idx) => (
              <div key={idx} className="glass-card glass-card-hover p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-300 group hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-cyan transition-colors group-hover:shadow-[0_0_15px_rgba(137,241,255,0.3)]">
                      <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </div>
                  <h3 className="font-display font-bold text-white text-base md:text-lg mb-2 group-hover:text-neon-cyan transition-colors">{assistant.name}</h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{assistant.description}</p>
              </div>
            ))}
         </div>
      </Section>

      {/* Format & Investment */}
      <Section className="relative">
        {/* 3D Object Decoration */}
        <div className="hidden md:block">
            <Sphere3D 
            className="absolute top-20 right-10 w-32 h-32 opacity-50 blur-md z-0 bg-gradient-to-t from-neon-pink to-purple-900"
            style={{ transform: `translate(${x * -15}px, ${y * -15}px)` }}
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 relative z-10">
           <div className="glass-card p-6 md:p-14 rounded-[2rem] md:rounded-[3rem]">
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-6 md:mb-8">Формат работы</h3>
              <div className="space-y-4 md:space-y-6">
                {FORMAT_POINTS.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 md:gap-4 group">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center shrink-0 text-neon-lime mt-1 group-hover:bg-neon-lime group-hover:text-dark-900 transition-all shadow-neon-lime">
                      <Check className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </div>
                    <p className="text-gray-300 text-base md:text-lg font-medium">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 md:mt-10 p-5 md:p-6 bg-gradient-to-r from-dark-800 to-dark-700 rounded-2xl md:rounded-3xl border border-white/10 text-gray-400 text-xs md:text-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-neon-lime"></div>
                 На рынке полно курсов, где тебе продают доступ к видео. Это не тот случай. <span className="text-white font-bold block mt-2 text-sm md:text-base">ЭТО НЕ ОБУЧЕНИЕ, А ВНЕДРЕНИЕ.</span>
              </div>
           </div>

           <div className="relative rounded-[2rem] md:rounded-[3rem] p-1 p-[1px] bg-gradient-to-br from-neon-pink via-transparent to-neon-purple overflow-hidden">
             <div className="absolute inset-0 bg-dark-900 rounded-[2rem] md:rounded-[3rem]"></div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-neon-pink/20 rounded-full blur-[80px]"></div>
             
             <div className="relative bg-dark-900/90 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-14 h-full flex flex-col">
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-6 md:mb-8">Твоя инвестиция в свободу</h3>
                
                <div className="space-y-3 md:space-y-4 flex-1">
                   <p className="text-gray-400 mb-2 md:mb-4">Давай на чистоту.</p>
                   <div className="flex items-center justify-between p-4 md:p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <span className="text-gray-400 font-medium text-sm md:text-base">SMM-специалист</span>
                      <span className="font-bold text-white text-sm md:text-base">20-40 тыс/мес</span>
                   </div>
                   <div className="flex items-center justify-between p-4 md:p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <span className="text-gray-400 font-medium text-sm md:text-base">Продюсер</span>
                      <span className="font-bold text-white text-sm md:text-base">50% с запуска</span>
                   </div>
                   
                   <div className="mt-6 md:mt-8 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-neon-lime to-lime-600 text-dark-900 relative overflow-hidden shadow-neon-lime group cursor-default transition-transform hover:scale-[1.02]">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full -mr-10 -mt-10 blur-xl"></div>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3 relative z-10">
                         <span className="font-bold text-lg md:text-xl">GPT-ПРАКТИК</span>
                         <span className="font-bold bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] md:text-xs text-white border border-white/10 w-fit">Единоразовый платёж</span>
                      </div>
                      <p className="font-bold text-base md:text-lg leading-tight opacity-90 relative z-10">
                        Ты один раз инвестируешь в систему, которая останется с тобой навсегда.
                      </p>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </Section>

      {/* Pricing Section */}
      <Section id="pricing" className="bg-dark-900 pt-10 pb-20 md:pb-32">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4 md:mb-6">Тарифы</h2>
          <p className="text-gray-400 max-w-lg mx-auto bg-white/5 px-4 py-3 md:px-6 rounded-full border border-white/10 inline-block text-xs md:text-sm">
            ❗️Оплату можно разделить на 2 платежа: 50% сразу и 50% через месяц.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-end">
          {PRICING_TIERS.map((tier, idx) => (
            <div 
              key={idx}
              className={`
                relative flex flex-col p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 border group
                ${tier.isPopular 
                  ? 'bg-neon-pink text-dark-900 border-neon-pink shadow-[0_0_40px_rgba(255,143,186,0.4)] scale-100 md:scale-105 z-10' 
                  : 'bg-dark-800/40 backdrop-blur-md border-white/10 hover:border-white/20 hover:bg-dark-800/60'
                }
              `}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 bg-white text-neon-pink px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-black tracking-widest shadow-lg flex items-center gap-2 whitespace-nowrap">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                  ХИТ
                </div>
              )}
              
              <div className={`mb-6 md:mb-8 pb-6 md:pb-8 border-b ${tier.isPopular ? 'border-dark-900/10' : 'border-white/5'}`}>
                <h3 className={`text-xl md:text-2xl font-display font-bold mb-2 md:mb-3 ${tier.isPopular ? 'text-dark-900' : 'text-white'}`}>{tier.name}</h3>
                {tier.spots && (
                  <div className={`inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${tier.isPopular ? 'text-dark-900 bg-white/20 border-dark-900/10' : 'text-neon-purple bg-neon-purple/10 border-neon-purple/20'}`}>
                    Мест: {tier.spots}
                  </div>
                )}
              </div>
              
              <div className="mb-6 md:mb-8">
                <div className={`line-through text-base md:text-lg mb-1 font-mono ${tier.isPopular ? 'text-dark-900/60' : 'text-gray-500'}`}>
                  {tier.oldPrice.toLocaleString('ru-RU')}
                </div>
                <div className="flex flex-col gap-1">
                   <span className={`text-3xl md:text-4xl font-display font-bold ${tier.isPopular ? 'text-dark-900' : 'text-white'}`}>
                     {tier.price.toLocaleString('ru-RU')} <span className={`text-xl md:text-2xl font-normal ${tier.isPopular ? 'text-dark-900/60' : 'text-gray-500'}`}>₽</span>
                   </span>
                   <span className={`text-xs md:text-sm font-mono ${tier.isPopular ? 'text-dark-900/60' : 'text-gray-500'}`}>
                     / {tier.currencyEu} €
                   </span>
                </div>
              </div>

              <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-1">
                {tier.features.map((feature, fIdx) => {
                  const isExcluded = feature.includes('(нет)');
                  return (
                    <li key={fIdx} className={`flex items-start gap-3 text-xs md:text-sm ${isExcluded ? 'opacity-30' : ''}`}>
                       {isExcluded ? (
                         <X className="w-4 h-4 md:w-5 md:h-5 text-gray-600 shrink-0" />
                       ) : (
                         <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shrink-0 ${tier.isPopular ? 'bg-dark-900 text-white' : 'bg-neon-lime/20 text-neon-lime'}`}>
                           <Check className="w-2.5 h-2.5 md:w-3 md:h-3" />
                         </div>
                       )}
                       <span className={isExcluded ? 'line-through text-gray-500' : (tier.isPopular ? 'text-dark-900 font-medium' : 'text-gray-300')}>
                         {feature.replace('(нет)', '')}
                       </span>
                    </li>
                  );
                })}
              </ul>

              <Button 
                variant={tier.isPopular ? 'white' : 'soft'} 
                className="w-full shadow-lg"
              >
                {tier.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-6 border-t border-white/5 relative bg-dark-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-dark-900" />
            </div>
            <span className="font-display font-bold text-white">GPT-ПРАКТИК</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Оферта</a>
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
          </div>

          <div className="text-gray-600 text-xs md:text-sm">
             © 2025. Сделано с <Heart className="w-3 h-3 inline text-red-500 mx-1" /> и ИИ
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;