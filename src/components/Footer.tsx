import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#000000] text-neutral-400 border-t border-neutral-900 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Column 1: Brand Manifesto */}
        <div className="md:col-span-1.5 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-display font-bold tracking-widest text-white mb-4">VAULT UNDERGROUND</h3>
            <p className="text-xs font-sans tracking-wider leading-relaxed text-neutral-500 mb-6 max-w-sm">
              A SYNTHESIS OF ARCHITECTURAL BRUTALISM AND STREET AUTHENTICITY. DESIGNED FOR THOSE WHO OPERATE IN THE MARGINS. ALL ARCHIVES ARE STRICTLY LIMITED RUNS.
            </p>
          </div>
          {/* Social Links under branding */}
          <div className="flex flex-col space-y-2 text-[10px] font-mono tracking-widest text-neutral-500">
            <a href="#instagram" className="hover:text-orange-500 transition-colors uppercase">INSTAGRAM</a>
            <a href="#tiktok" className="hover:text-orange-500 transition-colors uppercase">TIKTOK</a>
            <a href="#discord" className="hover:text-orange-500 transition-colors uppercase">DISCORD</a>
            <a href="#twitter" className="hover:text-orange-500 transition-colors uppercase">TWITTER (X)</a>
          </div>
        </div>

        {/* Column 2: Service/Info */}
        <div>
          <h4 className="text-xs font-mono font-bold tracking-[0.2em] text-white mb-6 uppercase">SERVICE</h4>
          <ul className="space-y-3 text-xs tracking-wider">
            <li><a href="#shipping" className="hover:text-white transition-colors uppercase">SHIPPING INFO</a></li>
            <li><a href="#returns" className="hover:text-white transition-colors uppercase">RETURNS & REPLACEMENTS</a></li>
            <li><a href="#authentication" className="hover:text-white transition-colors uppercase">AUTHENTICITY VERIFICATION</a></li>
            <li><a href="#orders" className="hover:text-white transition-colors uppercase">ORDER PROTOCOLS</a></li>
          </ul>
        </div>

        {/* Column 3: Legal */}
        <div>
          <h4 className="text-xs font-mono font-bold tracking-[0.2em] text-white mb-6 uppercase">LEGAL</h4>
          <ul className="space-y-3 text-xs tracking-wider">
            <li><a href="#privacy" className="hover:text-white transition-colors uppercase">PRIVACY SYSTEM</a></li>
            <li><a href="#terms" className="hover:text-white transition-colors uppercase">TERMS OF OPERATION</a></li>
            <li><a href="#cookies" className="hover:text-white transition-colors uppercase">COOKIE DEVIATION</a></li>
            <li><a href="#licensing" className="hover:text-white transition-colors uppercase">INTELLECTUAL RIGHTS</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter registry */}
        <div>
          <h4 className="text-xs font-mono font-bold tracking-[0.2em] text-white mb-6 uppercase">JOIN THE REGISTRY</h4>
          <p className="text-xs tracking-wider text-neutral-500 mb-4 uppercase">
            Subscribe to receive immediate notification of drop codes and archive restorations.
          </p>
          <form onSubmit={handleSubscribe} className="relative border-b border-neutral-700 focus-within:border-orange-600 transition-colors duration-300">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL@ADDRESS.COM"
              className="bg-transparent text-xs font-mono tracking-widest text-white w-full pb-3 pr-8 placeholder-neutral-700 focus:outline-none uppercase"
              required
            />
            <button
              type="submit"
              className="absolute right-0 top-0 pb-3 hover:text-orange-500 text-neutral-400 transition-colors cursor-pointer"
              title="Subscribe"
              id="footer-subscribe-btn"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          {subscribed && (
            <span className="block mt-2 text-[10px] font-mono text-orange-500 animate-pulse uppercase">
              CONNECTION ESTABLISHED. ACCESS GRANTED.
            </span>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-neutral-600 tracking-widest">
        <div className="mb-4 sm:mb-0 uppercase">
          ©{new Date().getFullYear()} VAULT UNDERGROUND. ALL RIGHTS RESERVED.
        </div>
        <div className="flex space-x-6 uppercase">
          <span>EST. 2012</span>
          <span>TOKYO</span>
          <span>LONDON</span>
          <span>NYC</span>
        </div>
      </div>
    </footer>
  );
}
