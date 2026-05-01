import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { SectionTitle } from '../components/ui/SectionTitle';

const Projects = () => {
  return (
    <div className="pt-40 pb-20 px-8 max-w-7xl mx-auto bg-ph-light min-h-screen text-ph-black">
      <SectionTitle title="WORK" subtitle="Selected Projects" />

      <div className="flex flex-col">
        {projects.map((project, index) => (
          <Link 
            key={project.id} 
            to={`/projects/${project.id}`}
            className="group border-b border-ph-black/10 py-12 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex items-center gap-8">
              <span className="font-sans text-sm opacity-30">0{index + 1}</span>
              <h3 className="font-serif text-[6vw] leading-none uppercase group-hover:italic group-hover:translate-x-4 transition-all duration-500">
                {project.title}
              </h3>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-sans text-sm uppercase tracking-widest text-ph-orange">View Project</span>
              <p className="font-sans text-sm opacity-60 mt-1">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
