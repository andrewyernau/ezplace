import * as React from "react";
import { Card, CardContent } from "./ui/card";
import { About } from "./About";
import { ServerLink } from "./ServerLink";
import { Cta } from "./Cta";
import { FAQ } from "./FAQ";
import { Features } from "./Features";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Newsletter } from "./Newsletter";
import { Pricing } from "./Pricing";
import { Services } from "./Services";
import { Sponsors } from "./Sponsors";
import { Team } from "./Team";
import { Testimonials } from "./Testimonials";

const BodyContent: React.FC = () => {
  return (
    <Card className="w-full max-w-7xl mx-auto mt-5 shadow-lg">
      <CardContent>
        <About />
        <ServerLink />

        <Hero />
        <Sponsors />

        <HowItWorks />
        <Features />
        <Services />
        <Cta />
        <Testimonials />
        <Team />
        <Pricing />
        <Newsletter />
        <FAQ />
      </CardContent>
    </Card>
  );
};

export default BodyContent;
