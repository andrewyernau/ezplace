import { Statistics } from "./Statistics";
{/*import pilot from "../assets/pilot.png";*/}

export const About = () => {
  return (
    <section id="about" className="container py-12 sm:py-16">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          {/*
        
          <img
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          */}
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-5">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  Ezplace Network{" "}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mt-3">
                What is Ezplace Network?<br/> Ezplace Network is not only a platform
                for connecting people, but also an experience. We are a team of
                professionals who are passionate about what we do and give our
                best to make your experience with us unforgettable.<br/> Join to
                discover an unique RPG experience, where you can create your own
                character, make friends, and explore the world of Ezplace
                Network. We are here to make your dreams come true.{" "}
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
