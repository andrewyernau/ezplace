import icon from "../assets/icon.png";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export const Username = ({ onClose }: { onClose: () => void }) => {
  return (
    <section
     id="username" className="username-container py-12 sm:py-16">
      <div className="relative bg-muted/90 border rounded-lg py-12 overflow-hidden">
        {/* Close Button */}
        <X
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 cursor-pointer text-muted-foreground hover:text-primary"
        />

        {/* Content */}
        <div className="relative px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={icon}
            alt="Icon"
            className="w-[20%] object-contain rounded-lg"
          />
          <div className="flex flex-col justify-between">
            <div className="pb-5">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  Fast log in!
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mt-3">
                Log in just with your username!
                <span className="text-primary">
                  <Input />
                </span>
                <br />
                <Button>Login</Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
