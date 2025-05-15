import React from 'react';

const About = () => {
  return (
    <section className="min-h-[80vh] px-4 py-12 bg-gradient-to-br from-[#f8fafc] to-[#e0f2fe] text-zinc-800 flex items-center justify-center">
      <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-8 sm:p-10 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2563eb]">About Us</h1>
        <p className="text-base sm:text-lg leading-relaxed text-zinc-700">
          Welcome to our appointment booking platform! We aim to make scheduling simple, fast, and stress-free.
          Whether you're booking for a consultation, service, or support — we've got you covered.
        </p>
        <p className="text-base sm:text-lg leading-relaxed text-zinc-700">
          This platform was built with modern technologies like <strong>React</strong>, <strong>Node.js</strong>,
          and <strong>MongoDB</strong> to deliver a smooth and reliable experience. It's designed to scale,
          adapt, and make your life easier when managing appointments.
        </p>
        <p className="text-base sm:text-lg leading-relaxed text-zinc-700">
          Have feedback or suggestions? We'd love to hear from you. Our goal is to keep improving and bring
          you the best user experience possible.
        </p>
        <div className="pt-4 border-t border-zinc-200">
          <p className="text-sm text-zinc-500">
            Made with ❤️ by Rizwan and the team. All rights reserved © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
