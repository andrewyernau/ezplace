import React, { createContext, useContext, useState, useEffect } from 'react';

// Define el tipo de datos de la sesión
interface Session {
  username: string | null;
  id: string | null;
}

// Contexto inicial
const SessionContext = createContext<{
  session: Session;
  setSession: (session: Session) => void;
}>({
  session: { username: null, id: null },
  setSession: () => {},
});

// Hook para usar el contexto
export const useSession = () => useContext(SessionContext);

// Proveedor del contexto
export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session>({ username: null, id: null });

  // Intentar cargar la sesión desde el servidor al montar
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/session', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setSession({ username: data.username, id: data.id });
        }
      } catch (error) {
        console.error('Failed to fetch session:', error);
      }
    };

    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};
