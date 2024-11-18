import { Statistics } from "./Statistics";
import icon from "../assets/icon.png";
import background from "../assets/card_background.png";

export const ServerLink = () => {
  return (
    <section id="serverlink" className="container py-24 sm:py-32">
      <div
        className="relative bg-muted/50 border rounded-lg py-12 overflow-hidden"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for Blur */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

        {/* Content */}
        <div className="relative px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={icon}
            alt=""
            className="w-[150px] object-contain rounded-lg"
          />
          <div className="flex flex-col justify-between">
            <div className="pb-5">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  I want to play!{" "}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Join and start to play on our Minecraft server! You can enter
                with this IP:{" "}
                <span className="text-primary">play.ezplace.net</span>
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
