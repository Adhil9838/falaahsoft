import React from 'react';
import myImage from '../assets/how to devlope.png';

const HowToDevelopProject: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <img
        src={myImage}
        alt="Project"
        className="max-w-full h-auto rounded-xl shadow-lg"
      />
    </div>
  );
};

export default HowToDevelopProject;