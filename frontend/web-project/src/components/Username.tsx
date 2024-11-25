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
      const response = await fetch(`http://localhost:8000/mojang-api/users/profiles/minecraft/${username}`);
      if (response.ok) {
        const data = await response.json();
        setSkin(`https://crafatar.com/avatars/${data.id}`);
        setIsLoggedIn(true);
        setError(null);

        // Mostrar un mensaje de bienvenida
        setTimeout(() => {
          onClose(); // Cerrar la ventana después de 1 segundo
        }, 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Ocurrió un error al conectar con el servidor");
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
              <div className="mt-4 text-center">
                <p className="text-green-500">Welcome, {username}!</p>
                {skin && <img src={skin} alt="User skin" className="w-16 h-16 rounded-full" />}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
