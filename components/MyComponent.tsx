

import React from 'react';

const MyComponent: React.FC = () => {
  return (
    <div className="bg-background text-foreground p-4 rounded-md">
      <h1 className="text-2xl text-red-500 font-bold mb-2">My Component</h1>
      <p className="text-muted-foreground">
        This is a simple React component using Tailwind CSS classes.
      </p>
      <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-opacity-90 transition-colors">
        Click me
      </button>
    </div>
  );
};

export default MyComponent;
