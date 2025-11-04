import CustomCard from "@/components/CustomCard";
import { HeaderOne } from "@/components/headers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const PET_TYPES = [
  {
    type: "Dog",
    displayName: "Dog",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
    likes: ["chicken", "play", "meat"],
    dislikes: ["beef"],
  },
  {
    type: "Cat",
    displayName: "Cat",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
    likes: ["fish", "cat food", "meat"],
    dislikes: ["bones"],
  },
  {
    type: "Rabbit",
    displayName: "Rabbit",
    image:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop",
    likes: ["carrots", "grass", "fresh vegetables"],
    dislikes: ["avocado", "onions", "potatoes"],
  },
];

const FOOD_ITEMS = [
  { type: "chicken", name: "Chicken", image: "🍗" },
  { type: "meat", name: "Meat", image: "🥩" },
  { type: "fish", name: "Fish", image: "🐟" },
  { type: "cat food", name: "Cat Food", image: "🐱" },
  { type: "carrots", name: "Carrots", image: "🥕" },
  { type: "grass", name: "Grass", image: "🌿" },
  { type: "fresh vegetables", name: "Fresh Vegetables", image: "🥬" },
  { type: "beef", name: "Beef", image: "🐄" },
  { type: "bones", name: "Bones", image: "🦴" },
  { type: "avocado", name: "Avocado", image: "🥑" },
  { type: "onions", name: "Onions", image: "🧅" },
  { type: "potatoes", name: "Potatoes", image: "🥔" },
];

// Check if item is food
const isFood = (item: string) => {
  return FOOD_ITEMS.some((food) => food.type === item);
};

const PHRASES = [
  {
    status: "normal",
    phrases: ["Hello!", "How are you?", "I'm doing well!", "Nice day!"],
  },
  {
    status: "tired",
    phrases: ["I'm sleepy...", "Need some rest", "Zzz...", "Too tired to talk"],
  },
  {
    status: "hungry",
    phrases: [
      "I'm hungry!",
      "Feed me please!",
      "My tummy is rumbling",
      "Need food!",
    ],
  },
  {
    status: "depressed",
    phrases: [
      "I'm sad...",
      "Don't feel good",
      "Leave me alone",
      "Not in the mood",
    ],
  },
  {
    status: "bloated",
    phrases: ["Too full!", "Can't eat more", "My tummy hurts", "Overfed!"],
  },
  {
    status: "great",
    phrases: [
      "I feel amazing!",
      "Best day ever!",
      "So happy!",
      "Life is great!",
    ],
  },
];

const BUTTON_PHRASES = [
  {
    activity: "play",
    phrases: [
      {
        liked: [
          "That was fun!",
          "Play again!",
          "I love playing!",
          "More play time!",
        ],
      },
      {
        hated: [
          "I don't like playing",
          "Can we stop?",
          "Not in the mood to play",
          "I'm tired of playing",
        ],
      },
    ],
  },
  {
    activity: "eat",
    phrases: [
      {
        liked: ["Yummy!", "This is delicious!", "My favorite!", "More please!"],
      },
      {
        hated: [
          "I don't like this",
          "Yucky!",
          "Can I have something else?",
          "This tastes bad",
        ],
      },
    ],
  },
  {
    activity: "sleep",
    phrases: ["Zzzzz...", "Good night!", "Time to sleep", "Sweet dreams!"],
  },
];

function Play() {
  const navigate = useNavigate();
  const [pet, setPet] = useState<{
    petName: string | null;
    petType: string | null;
  } | null>({
    petName: localStorage.getItem("petName"),
    petType: localStorage.getItem("petType"),
  });

  const selectedTypeData = pet
    ? PET_TYPES.find((p) => p.type === pet.petType)
    : null;

  useEffect(() => {
    setPet({
      petName: localStorage.getItem("petName"),
      petType: localStorage.getItem("petType"),
    });
    console.log("pet: ", pet);
    if (!pet) {
      navigate("/");
    }
  }, []);

  const buttonStyle =
    "w-full rounded-none bg-cyan-200 p-2 border-2 border-cyan-300 outline outline-1 outline-cyan-200 text-cyan-700 shadow-[2px_2px_0_0_#22d3ee] hover:shadow-[1px_1px_0_0_#22d3ee] hover:translate-x-[1px] hover:translate-y-[1px] transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]";

  const sectionStyle =
    "bg-cyan-50/90 p-4 flex flex-row justify-between gap-3 border-double border-8 border-cyan-300 outline outline-2 outline-cyan-200 shadow-[4px_4px_0_0_#22d3ee]";

  const [hungerValue, setHungerValue] = useState(50);
  const [energyValue, setEnergyValue] = useState(50);
  const [happyValue, setHappyValue] = useState(100);
  const [dialog, setDialog] = useState(false);
  const [monologue, setMonologue] = useState("");
  const [status, setStatus] = useState("normal");

  useEffect(() => {
    if (energyValue > 100) {
      setEnergyValue(100);
    }
    if (happyValue > 100) {
      setHappyValue(100);
    }
  }, [energyValue, happyValue]);

  useEffect(() => {
    if (hungerValue > 20 && energyValue > 20 && happyValue > 20) {
      setStatus("normal");
      if (hungerValue > 80) {
        setStatus("bloated");
      } else if (
        hungerValue > 50 &&
        hungerValue < 100 &&
        energyValue > 50 &&
        happyValue > 50
      ) {
        setStatus("great");
      }
    } else if (
      hungerValue < 50 &&
      hungerValue < energyValue &&
      happyValue > 10
    ) {
      setStatus("hungry");
    } else if (energyValue < 20 && energyValue < hungerValue) {
      setStatus("tired");
    } else if (happyValue < 20 && (energyValue > 0 || hungerValue > 0)) {
      setStatus("depressed");
    }
  }, [hungerValue, energyValue, happyValue]);

  // Talk effect
  const handleTalkClick = () => {
    const statusPhrases = PHRASES.find((e) => e.status === status)?.phrases as
      | string[]
      | undefined;
    const randomPhrase =
      statusPhrases?.[Math.floor(Math.random() * statusPhrases.length)];
    setMonologue(randomPhrase || "Hello!");
  };

  // Play effext
  const handlePlayClick = () => {
    setEnergyValue((prev) => prev - 25); //-25%
    setHungerValue((prev) => prev - 20); //-20%

    const likesPlaying = selectedTypeData?.likes.some(
      (like) => like === "play"
    );
    const dislikesPlaying = selectedTypeData?.dislikes.some(
      (dislike) => dislike === "play"
    );

    const playPhrases = BUTTON_PHRASES.find((e) => e.activity === "play")
      ?.phrases as any;

    if (likesPlaying) {
      setHappyValue((prev) => prev + 25); //+25%
      const likedPhrases = playPhrases?.[0]?.liked || [];
      const randomPhrase =
        likedPhrases[Math.floor(Math.random() * likedPhrases.length)];
      setMonologue(randomPhrase || "That was fun!");
    } else if (dislikesPlaying) {
      setHappyValue((prev) => prev - 25); //-25%
      const hatedPhrases = playPhrases?.[1]?.hated || [];
      const randomPhrase =
        hatedPhrases[Math.floor(Math.random() * hatedPhrases.length)];
      setMonologue(randomPhrase || "I didn't enjoy that");
    } else {
      setMonologue("That was okay!");
    }
  };

  // sleep effect
  const handleSleepClick = () => {
    setHungerValue((prev) => prev - 20); //-20%
    setEnergyValue((prev) => prev + 25); //+25%

    const likesSleeping = selectedTypeData?.likes.some(
      (like) => like === "sleeping"
    );
    const dislikesSleeping = selectedTypeData?.dislikes.some(
      (dislike) => dislike === "sleeping"
    );

    if (likesSleeping) {
      setHappyValue((prev) => prev + 25); //+25%
    } else if (dislikesSleeping) {
      setHappyValue((prev) => prev - 25); //-25%
    }

    const sleepPhrases = BUTTON_PHRASES.find((e) => e.activity === "sleep")
      ?.phrases as string[] | undefined;
    const randomPhrase =
      sleepPhrases?.[Math.floor(Math.random() * sleepPhrases.length)];
    setMonologue(randomPhrase || "zzzzz");
  };

  const handleFoodSelect = (foodType: string) => {
    setDialog(false);

    const likesThis = selectedTypeData?.likes.some((like) => like === foodType);
    const hatesThis = selectedTypeData?.dislikes.some(
      (dislike) => dislike === foodType
    );

    const eatPhrases = BUTTON_PHRASES.find((e) => e.activity === "eat")
      ?.phrases as any;

    if (likesThis) {
      setHappyValue((prev) => prev + 25);
      setHungerValue((prev) => prev + 20);
      setEnergyValue((prev) => prev + 15);
      const likedPhrases = eatPhrases?.[0]?.liked || [];
      const randomPhrase =
        likedPhrases[Math.floor(Math.random() * likedPhrases.length)];
      setMonologue(randomPhrase || "Yummy!");
    } else if (hatesThis) {
      setHappyValue((prev) => prev - 25);
      setHungerValue((prev) => prev + 2);
      setEnergyValue((prev) => prev + 5);
      const hatedPhrases = eatPhrases?.[1]?.hated || [];
      const randomPhrase =
        hatedPhrases[Math.floor(Math.random() * hatedPhrases.length)];
      setMonologue(randomPhrase || "I don't like this!");
    } else {
      setHungerValue((prev) => prev + 10);
      setEnergyValue((prev) => prev + 10);
      setMonologue("nom nom");
    }
  };

  // Patay haha
  useEffect(() => {
    if (energyValue <= 0 || hungerValue <= 0 || happyValue <= 0) {
      localStorage.clear();

      alert("Your pet died!");
      navigate("/");
    }
  }, [energyValue, hungerValue, happyValue]);

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <HeaderOne text="No Pet Found" cl="text-red-500" />
          <p className="text-gray-600 mb-4">You need to adopt a pet first!</p>
          <button
            onClick={() => navigate("/adopt")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Adopt a Pet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <HeaderOne
          cl="font-bold text-center"
          text={`${pet?.petName} the ${pet?.petType}`}
        />
        <CustomCard
          title={`Status: ${status}`}
          description=""
          cl="mt-10 flex flex-col gap-5"
        >
          <>
            <div className="flex flex-col gap-4 relative">
              {/* nametag */}
              <div className="absolute left-4 top-2 z-40 px-3 py-1 rounded-md bg-cyan-200/95 text-cyan-900 font-semibold text-sm border-2 border-cyan-300 shadow-[2px_2px_0_0_#22d3ee] backdrop-blur-sm">
                {pet?.petName}
              </div>
              {/* pet display */}
              <div className={sectionStyle}>
                <div className="flex flex-col">
                  <div className="w-[150px] h-[150px] p-2 border-double border-4 border-cyan-300 bg-white/70 outline outline-1 outline-cyan-200 shadow-[2px_2px_0_0_#22d3ee] flex items-center justify-center">
                    {selectedTypeData?.image && (
                      <img
                        src={selectedTypeData?.image}
                        alt={selectedTypeData.displayName}
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                    )}
                  </div>
                </div>
                {/* talk */}
                <div className="w-[300px] bg-white/80 p-4 border-double border-4 border-cyan-300 outline outline-1 outline-cyan-200 text-cyan-900">
                  {pet?.petName}: {monologue}
                </div>
              </div>

              {/* buttons */}
              <div className={sectionStyle}>
                <button className={buttonStyle} onClick={handleTalkClick}>
                  Talk
                </button>
                <Dialog open={dialog} onOpenChange={setDialog}>
                  <form className="w-full ">
                    <DialogTrigger asChild>
                      <button className={buttonStyle}>Eat</button>
                    </DialogTrigger>
                    <DialogContent className="sm:min-w-[200px] bg-cyan-900/10 text-cyan-900">
                      <DialogHeader>
                        <DialogDescription className="text-cyan-900 font-normal flex flex-row gap-10">
                          {/* pet's likes n dislikes */}
                          <div>
                            <p className="font-bold mb-2">
                              {pet?.petName} likes:
                            </p>
                            {selectedTypeData?.likes
                              .filter((like) => isFood(like))
                              .map((like) => {
                                const foodItem = FOOD_ITEMS.find(
                                  (item) => item.type === like
                                );
                                return (
                                  <p
                                    key={like}
                                    className="flex items-center gap-2"
                                  >
                                    {foodItem?.image} {foodItem?.name || like}
                                  </p>
                                );
                              })}
                          </div>
                          <div>
                            <p className="font-bold mb-2">
                              {pet?.petName} hates:
                            </p>
                            {selectedTypeData?.dislikes
                              .filter((dislike) => isFood(dislike))
                              .map((dislike) => {
                                const foodItem = FOOD_ITEMS.find(
                                  (item) => item.type === dislike
                                );
                                return (
                                  <p
                                    key={dislike}
                                    className="flex items-center gap-2"
                                  >
                                    {foodItem?.image}{" "}
                                    {foodItem?.name || dislike}
                                  </p>
                                );
                              })}
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      {FOOD_ITEMS?.map((item) => (
                        <button
                          key={item.type}
                          className="flex items-center gap-2 p-1.5 hover:bg-cyan-200/50 w-full text-left"
                          onClick={() => handleFoodSelect(item.type)}
                        >
                          <span className="text-2xl w-8">{item.image}</span>
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </DialogContent>
                  </form>
                </Dialog>
                <button className={buttonStyle} onClick={handlePlayClick}>
                  Play
                </button>
                <button className={buttonStyle} onClick={handleSleepClick}>
                  Sleep
                </button>
              </div>

              {/* bars */}
              <div className="bg-white/80 p-4 flex flex-col justify-between gap-3 border-double border-4 border-cyan-300 outline outline-1 outline-cyan-200 shadow-[2px_2px_0_0_#22d3ee]">
                <div className="font-bold text-cyan-900">Hunger</div>
                <Progress value={hungerValue} className="h-3" />
                <div className="font-bold text-cyan-900">Energy</div>
                <Progress value={energyValue} className="h-3" />
                <div className="font-bold text-cyan-900">Happiness</div>
                <Progress value={happyValue} className="h-3" />
              </div>
            </div>
          </>
        </CustomCard>
      </div>
    </div>
  );
}

export default Play;
