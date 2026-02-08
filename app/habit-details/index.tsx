import CalendarTab from "@/components/ui/CalendarTab";
import { useLocalSearchParams } from "expo-router";
import { useHabitStore } from "@/store/useHabitStore";

export default function Page() {
  const { id } = useLocalSearchParams();
  const { habits } = useHabitStore();
  const habit = habits.find(h => String(h.id) === String(id));
  
  return habit ? <CalendarTab habit={habit} /> : null;
}