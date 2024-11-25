import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useState } from "react";

export const Username = ({ onClose }: { onClose: () => void }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [skin, setSkin] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      // Verificar existencia del usuario en Mojang API
      const mojangResponse = await fetch(
        `http://localhost:8000/mojang-api/users/profiles/minecraft/${username}`
      );

      if (!mojangResponse.ok) {
        const errorData = await mojangResponse.json();
        setError(errorData.error || "Invalid Minecraft username.");
        return;
      }

      const mojangData = await mojangResponse.json();
      setSkin(`https://crafatar.com/avatars/${mojangData.id}`);
      setError(null);

      // Realizar fast-login en el servidor
      const fastLoginResponse = await fetch("http://localhost:8000/api/fast-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
        credentials: "include", // Para manejar cookies en solicitudes CORS
      }); 

      if (!fastLoginResponse.ok) {
        const loginError = await fastLoginResponse.json();
        setError(loginError.message || "Error during fast login.");
        return;
      }

      // Login exitoso
      setIsLoggedIn(true);
      setError(null);

      // Cerrar el modal después de un tiempo
      setTimeout(() => {
        onClose();
      }, 5000);
    } catch (err) {
      setError("An error occurred while connecting to the server.");
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Minecraft Username"
                  />
                </span>
                <br />
                <Button onClick={handleLogin}>Login</Button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            </div>
            {isLoggedIn && (
              <div className="mt-4 flex items-center gap-4">
                {skin && (
                  <img
                    src={skin}
                    alt="User skin"
                    className="w-16 h-16 rounded-full border border-primary shadow-md"
                  />
                )}
                <p className="text-green-500 text-lg">Welcome, {username}!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
