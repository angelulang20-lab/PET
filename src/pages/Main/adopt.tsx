import CustomCard from "@/components/CustomCard";
import { HeaderOne, HeaderTwo } from "@/components/headers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const petImages = {
  Dog: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
  Cat: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
  Rabbit:
    "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop",
  Bird: "https://images.unsplash.com/photo-1555169062-013468b47731?w=400&h=400&fit=crop",
  Fish: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  Hamster:
    "https://plus.unsplash.com/premium_photo-1723541849330-cab9c6ed74d4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1112",
  Other:
    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=400&fit=crop",
};

function Adopt() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    likes: ["Sleeping", "Playing", "Walking"],
    dislikes: ["Vegetables", "Loud noises"],
  });

  const [currentView, setCurrentView] = useState("form");

  useEffect(() => {
    localStorage.clear()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAdopt = () => {
    if (!formData.petName || !formData.petType) {
      alert("Please fill in pet name and type!");
      return;
    }

    alert(
      `🎉 Congratulations! You adopted ${formData.petName} the ${formData.petType}!`
    );
    localStorage.setItem("petName", formData.petName);
    localStorage.setItem("petType", formData.petType);

    navigate("/game")

    // Reset form after adoption
    setFormData({
      petName: "",
      petType: "",
      likes: ["Sleeping", "Playing", "Walking"],
      dislikes: ["Vegetables", "Loud noises"],
    });
  };

  const viewPetDetails = () => {
    if (!formData.petName || !formData.petType) {
      alert("Please fill in pet name and type first!");
      return;
    }
    setCurrentView("details");
  };

  const goBackToForm = () => {
    setCurrentView("form");
  };

  const goBack = () => {
    navigate("/game");
  };

  const getPetImage = () => {
    return (
      petImages[formData.petType as keyof typeof petImages] || petImages.Other
    );
  };

  if (currentView === "details") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            {/* Pet Info Card - UPDATED */}
            <div className="text-center mb-8">
              {/* Circular Pet Image */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-300 mx-auto mb-4 shadow-md">
                <img
                  src={getPetImage()}
                  alt={formData.petType}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {formData.petName}
              </h3>
              <p className="text-gray-600 text-xl">The {formData.petType}</p>
            </div>

            {/* Likes Section - UPDATED */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>LIKES</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {formData.likes.map((like: string, index: number) => (
                  <div
                    key={index}
                    className="bg-green-100 border border-green-300 rounded-full px-4 py-2"
                  >
                    <span className="text-green-800 font-medium text-sm">
                      {like}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dislikes Section - UPDATED */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span>DISLIKES</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {formData.dislikes.map((dislike: string, index: number) => (
                  <div
                    key={index}
                    className="bg-red-100 border border-red-300 rounded-full px-4 py-2"
                  >
                    <span className="text-red-800 font-medium text-sm">
                      {dislike}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={goBackToForm}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300"
              >
                Go Back to Form
              </button>
              <button
                onClick={handleAdopt}
                className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
              >
                Adopt This Pet
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Adoption Form View - SAME AS BEFORE
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <HeaderOne text="Adopt a Pet" cl="text-gray-800 text-center mb-2" />
        <HeaderTwo
          text="Enter name and what type of pet do you like"
          cl="text-gray-600 text-center text-lg font-normal mb-8"
        />

        <CustomCard
          title="Pet Adoption Form"
          description="Fill in the details about your new pet"
          cl="bg-white/80 backdrop-blur-sm"
        >
          <div className="space-y-6">
            {/* Pet Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet name
              </label>
              <input
                type="text"
                value={formData.petName}
                onChange={(e) => handleInputChange("petName", e.target.value)}
                placeholder="Enter pet name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
              />
            </div>

            {/* Pet Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type/species of pet:
              </label>
              <select
                value={formData.petType}
                onChange={(e) => handleInputChange("petType", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
              >
                <option value="">Select pet type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Bird">Bird</option>
                <option value="Fish">Fish</option>
                <option value="Hamster">Hamster</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <div className="flex gap-4">
                <button
                  onClick={goBack}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300"
                >
                  Go back
                </button>
                <button
                  onClick={handleAdopt}
                  className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
                >
                  Adopt
                </button>
              </div>

              {/* View Pet Details Button */}
              <button
                onClick={viewPetDetails}
                className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <span>View Pet Details</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </CustomCard>
      </div>
    </div>
  );
}

export default Adopt;
