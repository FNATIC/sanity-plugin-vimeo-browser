import React from 'react';

const LoadingSpinner: React.FC = () => {

  return (
    <div className="max-w-7xl h-screen flex justify-center items-center flex-wrap text-white">
      <div className="text-center">
        <div>
          <svg className="animate-spin h-10 w-10 m-auto" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4"></circle>
            <path className="opacity-100" fill="#fff" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        Loading... Please don't close this window.
      </div>
    </div>
  );
};

export default LoadingSpinner;