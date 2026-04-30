const About = () => {
  return (
    <section className="py-28 px-6 bg-slate-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] -translate-x-1/2"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Academic Contribution
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Developer Card */}
          <div className="bg-slate-900/60 backdrop-blur-lg p-10 rounded-3xl border border-slate-800 hover:border-purple-500 transition duration-500 shadow-xl">
            <p className="text-sm text-purple-400 mb-2 uppercase tracking-widest">
              Developed By
            </p>

            <h3 className="text-2xl font-semibold mb-4">
              Badal B. Wasnik
            </h3>

            <p className="text-slate-400 leading-relaxed">
              M.Tech in Computer Science Engineering <br />
              GH Raisoni College of Engineering and Management, Nagpur
            </p>

            <div className="mt-6 text-sm text-slate-500">
              Focused on AI-driven secure digital inheritance systems,
              fraud detection, and nominee-based controlled access architecture.
            </div>
          </div>

          {/* Guide Card */}
          <div className="bg-slate-900/60 backdrop-blur-lg p-10 rounded-3xl border border-slate-800 hover:border-blue-500 transition duration-500 shadow-xl">
            <p className="text-sm text-blue-400 mb-2 uppercase tracking-widest">
              Guided By
            </p>

            <h3 className="text-2xl font-semibold mb-4">
              Antara Bhattacharya
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Assistant Professor <br />
              GH Raisoni College of Engineering and Management
            </p>

            <div className="mt-6 text-sm text-slate-500">
              Provided academic mentorship and architectural guidance for
              secure backend workflow and AI integration design.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;