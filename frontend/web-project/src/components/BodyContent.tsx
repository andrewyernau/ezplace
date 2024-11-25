import * as React from "react";
import { Card, CardContent } from "./ui/card";
import { About } from "./About";
import { ServerLink } from "./ServerLink";
import { Store } from "./Store";
import { Pricing } from "./Pricing";
import { Services } from "./Services";
import { Sponsors } from "./Sponsors";

const BodyContent: React.FC = () => {
  return (
    <Card className="w-full max-w-5xl mx-auto mt-5 shadow-lg">
      <CardContent>
        <About />
        <ServerLink />
        <Services />
        <Pricing />
        <Store />
        <Sponsors />
      </CardContent>
    </Card>
  );
};

export default BodyContent;
