import React from "react";
import { Plane } from "lucide-react";
import MainTitle from "@/layouts/MainTitle";
import Breadcrumbs from "@/components/ui/braadcrumbs";
import DestinationManager from "@/components/destinations/DestinationManager";

const DestinationsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <Breadcrumbs />
      <MainTitle
        title="Destinations"
        icon={Plane}
        description="Connect your goals with destination checkpoints that interact with LLM"
      />
      <DestinationManager />
    </div>
  );
};

export default DestinationsPage;