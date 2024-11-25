import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Check } from "lucide-react";
import girl from "../assets/formato_vertical_girl_pose.png";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "WARRIOR",
    popular: 0,
    price: 2.5,
    description:
      "A rank for those who want to stand out as brave fighters of the realm.",
    buttonText: "Become a Warrior",
    benefitList: [
      "Exclusive chat tag [WARRIOR]",
      "Access to a custom armor emblem",
      "Ability to use color in chat",
      "Access to the VIP Discord channel",
      "Participation in special giveaways",
    ],
  },
  {
    title: "SORCERER",
    popular: 0,
    price: 3.0,
    description:
      "Perfect for those who want a magical touch to their experience.",
    buttonText: "Become a Sorcerer",
    benefitList: [
      "Exclusive chat tag [SORCERER]",
      "Access to magical particles when walking",
      "Pet customization commands (change names and colors)",
      "Thematic cosmetics: wizard hats, special cloaks",
      "Priority access to thematic events",
    ],
  },
  {
    title: "FORGEMASTER",
    popular: 0,
    price: 3.5,
    description:
      "A rank for the masters of crafting and design in the RPG world.",
    buttonText: "Become a Forgemaster",
    benefitList: [
      "Exclusive chat tag [FORGEMASTER]",
      "Access to custom tool skins",
      "Permission to use a design workbench (cosmetic only)",
      "Access to exclusive decorations for plots (banners and ornaments)",
      "Private Discord channel to share designs",
    ],
  },
  {
    title: "WANDERER",
    popular: 0,
    price: 1.5,
    description:
      "For adventurers who want to leave a special mark on the world.",
    buttonText: "Become a Wanderer",
    benefitList: [
      "Exclusive chat tag [WANDERER]",
      "Access to decorative backpacks",
      "Visual effects when entering towns (lights, bells)",
      "Customizable chat title (no gameplay impact)",
      "Explorer-themed cosmetics",
    ],
  },
  {
    title: "NOBLE",
    popular: 1,
    price: 15.0,
    description:
      "A rank for those seeking elegance and recognition in the realm.",
    buttonText: "Become a Noble",
    benefitList: [
      "Exclusive chat tag [NOBLE]",
      "Golden cosmetic cape",
      "Golden particle effects for greeting commands",
      "Access to luxury decorations for plots",
      "Special recognition in public server events",
    ],
  },
  {
    title: "BARD",
    popular: 0,
    price: 10.0,
    description:
      "For lovers of music and stories, a rank full of style and creativity.",
    buttonText: "Become a Bard",
    benefitList: [
      "Exclusive chat tag [BARD]",
      "Access to a musical emote in chat (decorative musical notes)",
      "Musical particle effects when moving",
      "Commands to play pre-set melodies with note blocks",
      "Access to bard-themed attire (hat, cloak, decorative lute)",
    ],
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Get a
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          Rank{" "}
        </span>
        in our server
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        You'll be able to show off your badges and enjoy exclusive cosmetics.
      </h3>
      <div className="flex justify-center items-center mb-8">
        <img
          src={girl}
          className="w-[150px] md:w-[250px] lg:w-[300px] object-contain"
          alt="Girl pose"
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge variant="secondary" className="text-sm text-primary">
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">{pricing.price}€</span>
                <span className="text-muted-foreground"> /month</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button className="w-full">{pricing.buttonText}</Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span key={benefit} className="flex">
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
