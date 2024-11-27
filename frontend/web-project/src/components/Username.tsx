import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "./SessionContext";

export const Username = ({ onClose }: { onClose: () => void }) => {
  const [inputValue, setInputValue] = useState(""); // Para almacenar el valor del input
  const [error, setError] = useState<string | null>(null);
  const [skin, setSkin] = useState<string | null>(null);
  const { session, setSession } = useSession(); // Obtención del contexto de sesión

  // Este useEffect asegura que el componente se actualice cuando session cambie.
  useEffect(() => {
    if (session && session.username) {
      // Si la sesión tiene un usuario, cargamos el avatar
      setSkin(`https://crafatar.com/avatars/${session.id}`);
    }
  }, [session]); // Dependemos de session para actualizar el avatar

  const handleLogin = async () => {
    try {
      const mojangResponse = await fetch(
        `http://localhost:8000/mojang-api/users/profiles/minecraft/${inputValue}`
      );

      if (!mojangResponse.ok) {
        const errorData = await mojangResponse.json();
        setError(errorData.error || "Invalid Minecraft username.");
        return;
      }

      const mojangData = await mojangResponse.json();
      setSkin(`https://crafatar.com/avatars/${mojangData.id}`);
      setError(null);

      const fastLoginResponse = await fetch("http://localhost:8000/api/fast-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: inputValue, id: mojangData.id }),
        credentials: "include",
      });

      if (!fastLoginResponse.ok) {
        const loginError = await fastLoginResponse.json();
        setError(loginError.message || "Error during fast login.");
        return;
      }

      // Actualiza el contexto de sesión
      setSession({ username: inputValue, id: mojangData.id });

      // Cerrar la ventana después de 5 segundos
      setTimeout(() => {
        onClose();
      }, 5000);
    } catch (err) {
      setError("An error occurred while connecting to the server.");
    }
  };

  // Manejar el evento de "Enter" para iniciar sesión
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin(); // Ejecutar la función de login cuando se presiona Enter
    }
  };

  return (
    <section id="username" className="username-container py-12 sm:py-16">
      <div className="relative bg-muted/90 border rounded-lg py-12 overflow-hidden">
        {/* Close Button */}
        <X
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 cursor-pointer text-muted-foreground hover:text-primary"
        />

        {/* Content */}
        <div className="relative px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <div className="flex flex-col justify-between">
            <div className="pb-5">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  Fast log in!
                </span>
              </h2>
              <div className="text-xl text-muted-foreground mt-3">
                <p>Log in just with your username!</p>
                <span className="text-primary">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown} // Detectar la tecla "Enter"
                    placeholder="Enter Minecraft Username"
                  />
                </span>
                <br />
                {/* Solo mostrar el botón de login si no está logueado */}
                {!session || !session.username ? (
                  <Button onClick={handleLogin}>Login</Button>
                ) : null}
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            </div>

            {/* Mostrar mensaje de bienvenida y avatar solo cuando el usuario esté logueado */}
            {session && session.username && (
              <div className="mt-4 flex items-center gap-4">
                {skin && (
                  <img
                    src={skin}
                    alt="User skin"
                    className="w-16 h-16 rounded-full border border-primary shadow-md"
                  />
                )}
                <p className="text-green-500 text-lg">Welcome, {session.username}!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
