import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    // Check if the credentials match
    if (email === "test123@test.no" && password === "test123") {
      router.push("/dashbord"); // Redirect to the dashboard page
    } else {
      alert("Feil e-postadresse eller passord");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {" "}
      {/* Bakgrunnsfarge og full høyde skjerm med sentrering */}
      <main className="flex flex-col items-center justify-center w-full">
        {" "}
        {/* Sentrering av innholdet innenfor main */}
        <Card className="w-full max-w-sm">
          {" "}
          {/* Bredde kontroll for kort */}
          <CardHeader>
            <CardTitle className="text-2xl">Logg inn</CardTitle>
            <CardDescription>
              Skriv inn din e-postadresse og passord for å logge inn.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">E-post</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Passord</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Logg inn
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
