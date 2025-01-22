// src/pages/public/HomePage.tsx

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <section className="text-center my-32">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Welcome to the Wizard RAG System
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Manage documents and categories effectively through innovative wizard-based workflows.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Get Started</Button>
          <Button variant="secondary" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-bold">Document Management</h2>
          </CardHeader>
          <CardContent>
            <p>
              Create, edit, and organize documents seamlessly in structured categories.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link">Discover More</Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-bold">Wizard Workflows</h2>
          </CardHeader>
          <CardContent>
            <p>
              Build step-by-step processes linking documents and categories for efficient knowledge retrieval.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link">View Examples</Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-bold">User Authentication</h2>
          </CardHeader>
          <CardContent>
            <p>
              Secure your platform with Google login and Firebase Authentication.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link">Read More</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="text-center mt-10">
        <Badge className="text-lg px-4 py-2">
          Trusted by Thousands of Users Worldwide
        </Badge>
      </section>
    </div>
  );
}
