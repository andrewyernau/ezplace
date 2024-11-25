import { useState, useEffect } from "react";

export const Statistics = () => {
  interface StatsProps {
    online: boolean;
    playersOnline: number;
    maxPlayers: number;
    version: string;
  }

  const [stats, setStats] = useState<StatsProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/minecraft/status");
        if (!response.ok) {
          throw new Error("Failed to fetch server statistics");
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError("Unable to fetch server statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p>Loading server statistics...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats && (
          <>
            <div className="space-y-2 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">
                {stats.online ? "Online" : "Offline"}
              </h2>
              <p className="text-xl text-muted-foreground">Server Status</p>
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">
                {stats.playersOnline}/{stats.maxPlayers}
              </h2>
              <p className="text-xl text-muted-foreground">Players Online</p>
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">{stats.version}</h2>
              <p className="text-xl text-muted-foreground">Server Version</p>
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">UHC</h2>
              <p className="text-xl text-muted-foreground">Free minigame rotation</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
