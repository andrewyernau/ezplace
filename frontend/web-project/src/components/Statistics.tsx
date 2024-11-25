export const Statistics = () => {
  interface statsProps {
    stat: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      stat: "online",
      description: "Server Status",
    },
    {
      stat: "45",
      description: "Users online",
    },
    {
      stat: "UHC",
      description: "Free gamemode rotation",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(({ stat, description }: statsProps) => (
          <div key={description} className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold ">{stat}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
