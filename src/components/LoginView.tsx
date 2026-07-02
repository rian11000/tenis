import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Key, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (email: string) => void;
  setView: (view: 'home' | 'men' | 'women' | 'login' | 'product-detail') => void;
}

export default function LoginView({ onLoginSuccess, setView }: LoginViewProps) {
  const [email, setEmail] = useState('USER@VAULT.UNDERGROUND');
  const [password, setPassword] = useState('••••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoggingIn(true);

    // Simulate cryptographic link connection
    setTimeout(() => {
      setIsLoggingIn(false);
      onLoginSuccess(email);
      setView('home');
    }, 1500);
  };

  const handleThirdPartyConnect = (provider: string) => {
    alert(`Connecting secure signature node via: ${provider}...`);
    onLoginSuccess(`${provider.toLowerCase()}@vault.connected`);
    setView('home');
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white flex flex-col md:flex-row border-b border-neutral-900 selection:bg-orange-500 selection:text-black">
      {/* LEFT SIDE: Immersive atmospheric collage & manifesto */}
      <div className="md:w-1/2 relative bg-black flex flex-col justify-between p-8 md:p-12 overflow-hidden min-h-[40vh] md:min-h-screen border-b md:border-b-0 md:border-r border-neutral-900">
        {/* Background Repeating Collage of Dark Cyberpunk Alleyways */}
        <div className="absolute inset-0 z-0 opacity-40 grid grid-rows-3 gap-1">
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="relative overflow-hidden w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop"
                alt="Tokyo Underground"
                className="w-full h-full object-cover filter grayscale contrast-150 brightness-50"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        {/* Brand Authorized Label */}
        <div className="relative z-10">
          <h2 className="text-xl font-display font-bold tracking-[0.3em] text-white">VAULT</h2>
          <p className="text-[9px] font-mono tracking-[0.4em] text-neutral-500 uppercase mt-1">
            UNDERGROUND AUTHORIZED PROTOCOL
          </p>
        </div>

        {/* Manifesto text at bottom */}
        <div className="relative z-10 max-w-sm mt-auto">
          <span className="text-[10px] font-mono text-orange-500 block tracking-[0.3em] mb-2 uppercase">
            MANIFESTO 001
          </span>
          <p className="text-xl md:text-2xl font-display font-bold leading-tight uppercase tracking-wide text-neutral-300">
            AUTHENTICITY IS THE ONLY CURRENCY WE ACCEPT.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Cryptographic connection panel */}
      <div className="md:w-1/2 bg-[#0a0a0a] flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          {/* Header titles */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-white mb-2 uppercase">
              ENTER <br />
              THE VAULT
            </h1>
            <div className="flex space-x-6 border-b border-neutral-900 pb-2 mt-6">
              <button
                onClick={() => setIsSignUp(false)}
                className={`text-[10px] font-mono tracking-[0.2em] uppercase pb-2 transition-colors relative cursor-pointer ${
                  !isSignUp ? 'text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'
                }`}
                id="login-tab-signin"
              >
                LOG IN
                {!isSignUp && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-orange-600" />}
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`text-[10px] font-mono tracking-[0.2em] uppercase pb-2 transition-colors relative cursor-pointer ${
                  isSignUp ? 'text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'
                }`}
                id="login-tab-signup"
              >
                SIGN UP
                {isSignUp && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-orange-600" />}
              </button>
            </div>
          </div>

          {/* Connection Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-[9px] font-mono tracking-[0.25em] text-neutral-400 block uppercase">
                IDENTIFICATION / EMAIL
              </label>
              <div className="relative border border-neutral-800 focus-within:border-orange-500 bg-[#0d0d0d] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none text-xs font-mono tracking-widest text-white py-3.5 px-4 focus:outline-none uppercase"
                  placeholder="USER@VAULT.UNDERGROUND"
                  required
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-600 text-sm font-mono">
                  @
                </span>
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-mono tracking-[0.25em] text-neutral-400 block uppercase">
                  SECURITY KEY
                </label>
                <button
                  type="button"
                  onClick={() => alert('Reset key signal sent. Check your secure recovery protocols.')}
                  className="text-[9px] font-mono tracking-widest text-neutral-500 hover:text-orange-500 transition-colors uppercase"
                  id="forgot-key-btn"
                >
                  LOST ACCESS?
                </button>
              </div>
              <div className="relative border border-neutral-800 focus-within:border-orange-500 bg-[#0d0d0d] transition-colors">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-none text-xs font-mono tracking-widest text-white py-3.5 px-4 pr-12 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                  id="toggle-pass-visibility-btn"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Establish Connection Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-[#dfdfdf] hover:bg-orange-500 text-black font-mono text-xs font-bold tracking-[0.3em] py-4 uppercase border-b-4 border-orange-600 hover:border-orange-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:border-neutral-900 cursor-pointer"
                id="establish-connection-btn"
              >
                {isLoggingIn ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>SYNCHRONIZING SECURE KEY...</span>
                  </>
                ) : (
                  <span>ESTABLISH CONNECTION</span>
                )}
              </button>
            </div>
          </form>

          {/* Social and Alternative Login */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center space-x-4">
              <span className="h-[1px] bg-neutral-900 flex-1" />
              <span className="text-[8px] font-mono tracking-widest text-neutral-600 uppercase">
                OR ACCESS VIA
              </span>
              <span className="h-[1px] bg-neutral-900 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleThirdPartyConnect('DISCORD')}
                className="border border-neutral-900 hover:border-neutral-700 hover:bg-white/5 bg-neutral-950 text-[10px] font-mono tracking-widest text-neutral-400 hover:text-white py-3 px-4 flex items-center justify-center space-x-2 uppercase transition-all duration-300 cursor-pointer"
                id="discord-connect-btn"
              >
                <span>👾 DISCORD</span>
              </button>
              <button
                onClick={() => handleThirdPartyConnect('WEB3')}
                className="border border-neutral-900 hover:border-neutral-700 hover:bg-white/5 bg-neutral-950 text-[10px] font-mono tracking-widest text-neutral-400 hover:text-white py-3 px-4 flex items-center justify-center space-x-2 uppercase transition-all duration-300 cursor-pointer"
                id="web3-connect-btn"
              >
                <span>🔑 WEB3</span>
              </button>
            </div>
          </div>

          {/* Portal Footer */}
          <div className="mt-16 flex items-center justify-between text-[9px] font-mono text-neutral-600 tracking-widest border-t border-neutral-950 pt-6 uppercase">
            <span>©{new Date().getFullYear()} VAULT UNDERGROUND.</span>
            <div className="space-x-4">
              <a href="#privacy" className="hover:text-neutral-400 transition-colors">PRIVACY</a>
              <a href="#terms" className="hover:text-neutral-400 transition-colors">TERMS</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
