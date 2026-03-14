import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      {/* Sticky Header */}
      <nav className="fixed w-full z-50 bg-darkBg/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold tracking-tighter text-accent">PP.</span>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Experience</a>
            <a href="#impact" className="hover:text-white transition-colors">Impact</a>
          </div>
          <a href="https://www.linkedin.com/in/ppushpam/" target="_blank" className="text-xs border border-accent text-accent px-4 py-2 rounded-full hover:bg-accent hover:text-darkBg transition-all font-bold uppercase tracking-widest">
            LinkedIn
          </a>
        </div>
      </nav>

      {/* NEW UPDATED HERO SECTION */}
      <header id="about" className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Available for Strategic Technical Roles
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none">
            PRIYANSHU <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
              PUSHPAM
            </span>
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed max-w-xl border-l-2 border-gray-800 pl-6">
            A Technical Product Leader with 10 years of experience. I bridge the gap between **C-suite strategy** and **high-concurrency engineering**, scaling platforms from $1 \to N$.
          </p>

          {/* Social Proof Bar */}
          <div className="flex flex-wrap gap-3">
            {['CSPO®', 'Google GA4', 'Productsup Expert', 'Ex-Dev'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-cardBg border border-gray-800 rounded text-[10px] font-bold uppercase tracking-widest text-gray-500">
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-4 flex gap-4">
            <a href="#impact" className="bg-white text-darkBg px-10 py-4 rounded-full font-bold hover:bg-accent hover:text-white transition-all duration-300 inline-block">
              Explore Impact
            </a>
          </div>
        </div>
        
        {/* Updated Photo Section with Geometric Effects */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative group">
            <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative w-72 h-72 md:w-80 md:h-96">
              <div className="absolute inset-0 border border-gray-800 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="absolute inset-0 border border-accent/30 rounded-2xl -rotate-3 group-hover:-rotate-12 transition-transform duration-500"></div>
              
              <div className="relative w-full h-full bg-cardBg rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                <img 
                  src="me.jpg" 
                  alt="Priyanshu Pushpam" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700 scale-105 group-hover:scale-100"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x500?text=Profile+Photo"; }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* QUICK STATS BAR */}
      <section className="border-y border-gray-900 bg-cardBg/10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap justify-around gap-8 text-center">
          <div><h3 className="text-3xl font-bold text-accent">10+</h3><p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Years Exp</p></div>
          <div><h3 className="text-3xl font-bold text-white">200%</h3><p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Rev Growth</p></div>
          <div><h3 className="text-3xl font-bold text-white">90K+</h3><p className="text-xs text-gray-500 uppercase tracking-widest mt-1">SKUs Scaled</p></div>
          <div><h3 className="text-3xl font-bold text-white">50+</h3><p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Eng Leaders</p></div>
        </div>
      </section>

      {/* TPM DNA (Bento Grid) */}
      <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-12 text-center">Core DNA</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-cardBg border border-gray-800 space-y-4 hover:border-gray-600 transition-colors">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center text-accent text-xl">⚙️</div>
            <h3 className="text-xl font-bold">Engineering Roots</h3>
            <p className="text-gray-400 text-sm">Software Engineer at UHG & Techmojo. Deep expertise in SQL, Java, and Python for automating massive workloads.</p>
          </div>
          <div className="p-8 rounded-3xl bg-cardBg border border-gray-800 space-y-4 hover:border-gray-600 transition-colors">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center text-accent text-xl">📈</div>
            <h3 className="text-xl font-bold">Product Strategy</h3>
            <p className="text-gray-400 text-sm">Certified Scrum Product Owner (CSPO) managing multi-team (50+) engineering organizations.</p>
          </div>
          <div className="p-8 rounded-3xl bg-cardBg border border-gray-800 space-y-4 hover:border-gray-600 transition-colors">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center text-accent text-xl">🤖</div>
            <h3 className="text-xl font-bold">AI & Scale</h3>
            <p className="text-gray-400 text-sm">Leveraging LLMs and GCP to scale 90k+ SKU publication engines for global markets.</p>
          </div>
        </div>
      </section>

      {/* Impact Section (NDA Friendly) */}
      <section id="impact" className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
        <h2 className="text-3xl font-bold mb-12">System Impact</h2>
        <div className="grid gap-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <h4 className="text-accent font-mono text-xs uppercase mb-2">E-commerce • AI</h4>
              <h3 className="text-2xl font-bold mb-4">Content Scaling Engine</h3>
              <p className="text-gray-400 text-sm italic">"Automating the publication journey for 90k+ SKUs."</p>
            </div>
            <div className="flex-1 bg-cardBg p-10 rounded-3xl border border-gray-800 grid grid-cols-2 gap-8 shadow-xl">
              <div>
                <p className="text-4xl font-bold text-white">+7%</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Conversion Lift</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">60h</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Weekly Hours Saved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-600 text-[10px] uppercase tracking-[0.3em] border-t border-gray-900">
        &copy; 2026 Priyanshu Pushpam • Technical Product Leader
      </footer>
    </div>
  );
};

export default App;