import React from 'react';

export function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 ${className}`}>
      {title && <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>}
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}
//Agregado por mi con el tab
export function CardHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      {subtitle && <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>}
    </div>
  );
}
