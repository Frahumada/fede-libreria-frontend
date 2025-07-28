import React from 'react';
import { Link } from 'react-router-dom';

export function Button({ to, children, variant = 'primary', ...props }) {
  const base = 'px-4 py-2 rounded font-medium transition';
  const styles = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    accent: 'bg-accent text-white hover:bg-accent/90',
    danger: 'bg-red-600 text-white hover:bg-red-500',
  };

  if (to) {
    return (
      <Link to={to} className={`${base} ${styles[variant]}`} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}
// Agregado por mi con el tab
export function OutlineButton({to, children, variant = 'primary', ...props }) {
  if (to) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  }
  const base = 'px-4 py-2 rounded font-medium transition border';
  const styles = {
    primary: 'border-primary text-primary hover:bg-primary/10',
    secondary: 'border-secondary text-secondary hover:bg-secondary/10',
    accent: 'border-accent text-accent hover:bg-accent/10',
    danger: 'border-red-600 text-red-600 hover:bg-red-100',
  };
  return (
    <button 
      className={`${base} ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
