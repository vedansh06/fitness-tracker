import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import type { FoodEntry, FormData } from "../types";

const FoodLog = () => {
  const { allFoodLogs, setAllFoodLogs } = useAppContext();

  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    calories: 0,
    mealType: "",
  });

  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const loadEntries = () => {
    const todaysEntries = allFoodLogs.filter(
      (e: FoodEntry) => e.createdAt?.split("T")[0] === today,
    );
    setEntries(todaysEntries);
  };

  const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0);

  useEffect(() => {
    (() => {
      loadEntries();
    })();
  }, [allFoodLogs]);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Food Log
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Track your daily intake
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Today's Total
            </p>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {totalCalories} kcal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodLog;
