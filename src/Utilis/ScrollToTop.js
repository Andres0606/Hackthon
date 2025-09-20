import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Hook personalizado para scroll automático
export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);
};

// Componente alternativo que puedes usar en App.jsx
export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return null;
};