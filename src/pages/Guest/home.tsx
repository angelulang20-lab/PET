import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function HomePage() {
  const navigate = useNavigate();
  const [pet, setPet] = useState<{ petName: string | null, petType: string | null } | null>(null);

  useEffect(() => {
    setPet({"petName":localStorage.getItem("petName"),"petType": localStorage.getItem("petType")})
    console.log(pet)

  },[])

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md p-8 shadow-xl border-0">
        <CardHeader className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
            🐣
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Pet Adventure
          </CardTitle>
          <p className="text-gray-600 text-lg">
            {pet
              ? "Your pet is waiting! Start playing now."
              : "Adopt a pet to begin your adventure!"}
          </p>
        </CardHeader>

        <CardContent className="space-y-4 mt-8">
          <Button
            onClick={() => navigate("/adopt")}
            disabled={!pet}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 text-lg h-12"
          >
            Adopt Pet
          </Button>

          <Button
            onClick={() => navigate("/game")}
            disabled={!pet}
            variant={pet ? "default" : "outline"}
            className={`w-full py-3 text-lg h-12 ${
              pet ? "bg-emerald-500 hover:bg-emerald-600" : ""
            }`}
          >
            Play Game
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default HomePage;
