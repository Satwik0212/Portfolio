import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';

const Contact = () => {
  return (
    <div className="pt-40 pb-20 px-8 max-w-7xl mx-auto bg-ph-black min-h-screen text-ph-light">
      <SectionTitle title="CONNECT" subtitle="Let's work together" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h3 className="font-serif text-5xl mb-12 leading-tight">
            Have a project in mind? Or just want to talk about AI orchestration?
          </h3>
          
          <div className="space-y-8">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-ph-orange mb-2">Email</p>
              <a href="mailto:hello@satwik.com" className="font-serif text-3xl hover:text-ph-orange transition-colors">
                hello@satwik.com
              </a>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-ph-orange mb-2">Socials</p>
              <div className="flex gap-8">
                <a href="#" className="font-serif text-2xl hover:text-ph-orange transition-colors">LinkedIn</a>
                <a href="#" className="font-serif text-2xl hover:text-ph-orange transition-colors">GitHub</a>
                <a href="#" className="font-serif text-2xl hover:text-ph-orange transition-colors">X (Twitter)</a>
              </div>
            </div>
          </div>
        </div>

        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6 bg-ph-light/5 p-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-2">
            <label className="font-sans text-xs uppercase tracking-widest opacity-60">Name</label>
            <input type="text" className="w-full bg-transparent border-b border-ph-light/20 py-4 focus:border-ph-orange outline-none transition-colors" placeholder="Your Name" />
          </div>
          <div className="space-y-2">
            <label className="font-sans text-xs uppercase tracking-widest opacity-60">Email</label>
            <input type="email" className="w-full bg-transparent border-b border-ph-light/20 py-4 focus:border-ph-orange outline-none transition-colors" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <label className="font-sans text-xs uppercase tracking-widest opacity-60">Message</label>
            <textarea className="w-full bg-transparent border-b border-ph-light/20 py-4 focus:border-ph-orange outline-none transition-colors min-h-[150px]" placeholder="How can I help you?"></textarea>
          </div>
          <Button className="w-full mt-8">Send Message</Button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
