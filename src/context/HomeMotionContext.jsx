import React, { createContext, useContext, useState, useEffect } from 'react';

const visitedRoutes = new Set();
try {
  const stored = sessionStorage.getItem('stylein_visited_routes');
  if (stored) JSON.parse(stored).forEach((r) => visitedRoutes.add(r));
} catch (_) {}

const RouteMotionContext = createContext(true);

export function RouteMotionProvider({ routeKey = 'global', children }) {
  const isAlreadyVisited = visitedRoutes.has(routeKey);
  const [isFirstVisit, setIsFirstVisit] = useState(!isAlreadyVisited);

  useEffect(() => {
    if (!isAlreadyVisited) {
      const timer = setTimeout(() => {
        visitedRoutes.add(routeKey);
        try {
          sessionStorage.setItem('stylein_visited_routes', JSON.stringify([...visitedRoutes]));
        } catch (_) {}
        setIsFirstVisit(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
        visitedRoutes.add(routeKey);
        try {
          sessionStorage.setItem('stylein_visited_routes', JSON.stringify([...visitedRoutes]));
        } catch (_) {}
      };
    }
  }, [routeKey, isAlreadyVisited]);

  return (
    <RouteMotionContext.Provider value={isFirstVisit}>
      {children}
    </RouteMotionContext.Provider>
  );
}

export function useRouteMotion() {
  return useContext(RouteMotionContext);
}

export const HomeMotionProvider = ({ children }) => (
  <RouteMotionProvider routeKey="home">{children}</RouteMotionProvider>
);

export const useHomeMotion = useRouteMotion;
