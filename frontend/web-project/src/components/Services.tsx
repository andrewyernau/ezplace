import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { AvasIcon, UbIcon } from "./Icons";
import waving from "../assets/andrew_waving.png";



interface ServiceProps {
  title: string;
  description: string;
  link?: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "A.V.A.S",
    description: "Anti Villager abuse system is a plugin made by andrewYernau to prevent people from abusing villagers trading system with rerolls.",
    link: "https://modrinth.com/plugin/antivillagerabusesystem",
    icon: <AvasIcon />,
  },
  {
    title: "UltimateBlood",
    description: "UltimateBlood is a plugin made by andrewYernau implementing a fresh game mechanic about blood particles and bleeding effects.",
    link: "https://modrinth.com/plugin/ultimateblood",
    icon: <UbIcon />,
  },
];



export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Our projects{" "}
            </span>
            
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Take a look into some projects our team have developed.{" "}
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title,link, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2" >
                      {description }
                      {link && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline ml-2"
                        >
                          Learn More
                        </a>
                      )}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={waving}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="About services"
        />
      </div>
    </section>
  );
};
