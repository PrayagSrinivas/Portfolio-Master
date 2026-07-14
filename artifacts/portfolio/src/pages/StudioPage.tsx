import React from 'react';
import { Studio, defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { codeInput } from '@sanity/code-input';
import { postType } from '../data/sanity-schema';

const config = defineConfig({
  projectId: 'wcmtfjdd',
  dataset: 'production',
  title: 'Srinivas Portfolio Studio',
  basePath: '/studio',
  plugins: [structureTool(), codeInput()],
  schema: {
    types: [postType],
  },
});

export default function StudioPage() {
  const handleClearSession = () => {
    // Clear local storage and session storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies under current domain
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // Redirect to clean studio path
    window.location.href = '/studio';
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative z-[9999]">
      <Studio config={config} />
      
      {/* Emergency Floating Sign Out / Reset session button */}
      <button 
        onClick={handleClearSession}
        className="fixed bottom-4 left-4 z-[999999] px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-mono rounded shadow-lg border border-red-500/30 transition-all cursor-pointer uppercase tracking-wider"
      >
        Sign Out / Reset Session
      </button>
    </div>
  );
}
