import React from 'react';
import { Studio, defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { postType } from '../data/sanity-schema';

const config = defineConfig({
  projectId: 'wcmtfjdd',
  dataset: 'production',
  title: 'Srinivas Portfolio Studio',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [postType],
  },
});

export default function StudioPage() {
  return (
    <div className="h-screen w-screen overflow-hidden relative z-[9999]">
      <Studio config={config} />
    </div>
  );
}
