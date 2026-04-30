const Hero = () => {
  return (
    <section className="pt-32 pb-24 text-center px-6">
      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Secure Your Digital Legacy with AI
      </h1>

      <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
        AI-powered digital inheritance platform with secure will management,
        fraud detection, and nominee access automation.
      </p>

      <div className="mt-10 flex justify-center gap-6">
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
          Get Started
        </button>
        <button className="px-6 py-3 border border-slate-700 rounded-lg">
          Watch Demo
        </button>
      </div>
    </section>
  );
};

export default Hero;