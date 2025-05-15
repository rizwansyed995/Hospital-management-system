import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="min-h-[80vh] px-4 py-12 bg-gradient-to-br from-[#f0f4ff] to-[#e0f7fa] flex items-center justify-center text-zinc-800">
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2563eb] mb-6">Contact Us</h2>
        <p className="text-zinc-600 mb-6">Have questions, feedback, or need help? Reach out — we'd love to hear from you!</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input disabled
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input disabled
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea disabled
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-zinc-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <button disabled
            type="submit"
            className="bg-[#2563eb] text-white py-2 px-6 rounded hover:bg-[#1e40af] transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
