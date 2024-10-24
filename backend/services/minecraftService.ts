export async function getServerStatus(host: string) {
    try {
      const response = await fetch(`https://api.mcsrvstat.us/2/${host}`);
      const data = await response.json();
  
      return {
        online: data.online,                  
        playersOnline: data.players?.online || 0,  
        maxPlayers: data.players?.max || 0,   
        version: data.version || "unknown",   
      };
    } catch (error) {
      return {
        online: false,
        playersOnline: 0,
        maxPlayers: 0,
        version: "unknown",
      };
    }
  }
  