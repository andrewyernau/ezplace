import { Button } from "./ui/button";

export const Store = () => {
  return (
    <section id="cta" className="bg-muted/50 py-16 my-24 sm:my-32">
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Or go to our 
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {" "}
              Store website{" "}
            </span>
            
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            To see all the products we have available for you.
          </p>
        </div>

        <div className="space-y-2 lg:col-start-2">
          <Button className="w-full md:mr-4 md:w-auto">Go visit the store</Button>
        </div>
      </div>
    </section>
  );
};
