import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeftIcon, CheckIcon } from "@heroicons/react/24/solid";

export function DemoToolsEquipment() {
  const navigate = useNavigate();
  const [items, setItems] = useState<
    Array<{ id: number; name: string; category: string; completed: boolean }>
  >([
    { id: 1, name: "Welding Machine", category: "Equipment", completed: true },
    { id: 2, name: "Protective Gear", category: "PPE", completed: true },
    { id: 3, name: "Welding Rod", category: "Materials", completed: false },
  ]);

  const toggleItem = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          onClick={() => navigate("/demonstration-test")}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold text-[#333]">
          Demo Test Tools & Equipment
        </h1>
      </div>

      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
        <p className="text-[#666] mb-6">
          Specify the tools and equipment needed for the demonstration test
          evaluation.
        </p>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-[#E0E0E0] rounded hover:bg-[#F5F5F5] transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  className={`p-2 rounded transition-colors ${
                    item.completed ? "bg-green-100" : "bg-gray-100"
                  }`}
                  onClick={() => toggleItem(item.id)}
                >
                  {item.completed && (
                    <CheckIcon className="w-5 h-5 text-green-600" />
                  )}
                </button>
                <div>
                  <div className="font-medium text-[#333]">{item.name}</div>
                  <div className="text-xs text-[#999]">{item.category}</div>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded text-xs font-medium ${
                  item.completed ? "bg-green-100 text-green-700" : "bg-gray-100"
                }`}
              >
                {item.completed ? "Ready" : "Pending"}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            className="px-4 py-2 bg-[#1976D2] text-white rounded font-medium hover:bg-[#1565C0] transition-colors"
            onClick={() => navigate("/demonstration-test")}
          >
            Continue
          </button>
          <button
            className="px-4 py-2 border border-[#E0E0E0] text-[#666] rounded font-medium hover:bg-[#F5F5F5] transition-colors"
            onClick={() => navigate("/")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
