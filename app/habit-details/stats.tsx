import StatisticsTab from "@/components/ui/StatisticsTab";
import { useLocalSearchParams } from "expo-router";
import { useHabitStore } from "@/store/useHabitStore";

export default function Page() {
  const { id } = useLocalSearchParams();
  const { habits } = useHabitStore();
  const habit = habits.find(h => String(h.id) === String(id));
  
  return habit ? <StatisticsTab habit={habit} /> : null;
}