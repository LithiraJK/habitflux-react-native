import CircularProgress from "@/components/ui/CircularProgress";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

type TimerMode = "Stopwatch" | "Countdown" | "Intervals";
type PomodoroState = "Work" | "Break";

const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hDisplay = hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "";
  const mDisplay = minutes.toString().padStart(2, "0");
  const sDisplay = seconds.toString().padStart(2, "0");

  return `${hDisplay}${mDisplay}:${sDisplay}`;
};

const Timer = () => {
  const [mode, setMode] = useState<TimerMode>("Stopwatch");
  const [isRunning, setIsRunning] = useState(false);

  const [swTime, setSwTime] = useState(0);

  const [cdInitialTime, setCdInitialTime] = useState(60);
  const [cdTime, setCdTime] = useState(60);
  const [isCdSetting, setIsCdSetting] = useState(true);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);

  const [pomoState, setPomoState] = useState<PomodoroState>("Work");
  const [pomoTime, setPomoTime] = useState(25 * 60);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasStarted = () => {
    if (mode === "Stopwatch") return swTime > 0;
    if (mode === "Countdown") return !isCdSetting && cdTime !== cdInitialTime;
    if (mode === "Intervals") {
      const fullTime = pomoState === "Work" ? 25 * 60 : 5 * 60;
      return pomoTime !== fullTime;
    }
    return false;
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        if (mode === "Stopwatch") {
          setSwTime((prev) => prev + 1);
        } else if (mode === "Countdown") {
          setCdTime((prev) => {
            if (prev <= 1) {
              setIsRunning(false);
              setIsCdSetting(true);
              return 0;
            }
            return prev - 1;
          });
        } else if (mode === "Intervals") {
          setPomoTime((prev) => {
            if (prev <= 1) {
              const nextState = pomoState === "Work" ? "Break" : "Work";
              const nextTime = nextState === "Work" ? 25 * 60 : 5 * 60;
              setPomoState(nextState);
              return nextTime;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, pomoState]);

  const handleStart = () => {
    if (mode === "Countdown" && isCdSetting) {
      const total = hours * 3600 + minutes * 60 + seconds;
      if (total === 0) return;
      setCdInitialTime(total);
      setCdTime(total);
      setIsCdSetting(false);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (mode === "Stopwatch") setSwTime(0);
    if (mode === "Countdown") setIsCdSetting(true);
    if (mode === "Intervals") {
      setPomoState("Work");
      setPomoTime(25 * 60);
    }
  };

  const renderContent = () => {
    if (mode === "Stopwatch") {
      return (
        <View className="items-center justify-center flex-1">
          <CircularProgress progress={0} size={280}>
            <Text className="text-white text-6xl font-bold font-monospaced">
              {formatTime(swTime)}
            </Text>
            <Text className="text-gray-500 text-lg mt-2">Stopwatch</Text>
          </CircularProgress>
        </View>
      );
    }

    if (mode === "Countdown") {
      if (isCdSetting) {
        return (
          <View className="items-center justify-center flex-1 w-full">
            <View className="flex-row items-center justify-center space-x-4 mb-10">
              <View className="items-center">
                <Text className="text-gray-500 mb-2">Hours</Text>
                <View className="bg-[#1C1C1E] p-4 rounded-xl items-center w-20">
                  <TouchableOpacity onPress={() => setHours((h) => h + 1)}>
                    <Ionicons name="chevron-up" color="gray" size={24} />
                  </TouchableOpacity>
                  <Text className="text-white text-3xl font-bold my-2">
                    {hours.toString().padStart(2, "0")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setHours((h) => Math.max(0, h - 1))}
                  >
                    <Ionicons name="chevron-down" color="gray" size={24} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text className="text-white text-3xl mt-6">:</Text>
              <View className="items-center">
                <Text className="text-gray-500 mb-2">Minutes</Text>
                <View className="bg-[#1C1C1E] p-4 rounded-xl items-center w-20">
                  <TouchableOpacity
                    onPress={() => setMinutes((m) => (m >= 59 ? 0 : m + 1))}
                  >
                    <Ionicons name="chevron-up" color="gray" size={24} />
                  </TouchableOpacity>
                  <Text className="text-white text-3xl font-bold my-2">
                    {minutes.toString().padStart(2, "0")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setMinutes((m) => (m <= 0 ? 59 : m - 1))}
                  >
                    <Ionicons name="chevron-down" color="gray" size={24} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text className="text-white text-3xl mt-6">:</Text>
              <View className="items-center">
                <Text className="text-gray-500 mb-2">Seconds</Text>
                <View className="bg-[#1C1C1E] p-4 rounded-xl items-center w-20">
                  <TouchableOpacity
                    onPress={() => setSeconds((s) => (s >= 59 ? 0 : s + 1))}
                  >
                    <Ionicons name="chevron-up" color="gray" size={24} />
                  </TouchableOpacity>
                  <Text className="text-white text-3xl font-bold my-2">
                    {seconds.toString().padStart(2, "0")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setSeconds((s) => (s <= 0 ? 59 : s - 1))}
                  >
                    <Ionicons name="chevron-down" color="gray" size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      } else {
        const progress = cdInitialTime > 0 ? cdTime / cdInitialTime : 0;
        return (
          <View className="items-center justify-center flex-1">
            <CircularProgress progress={progress} size={280}>
              <Text className="text-white text-6xl font-bold font-monospaced">
                {formatTime(cdTime)}
              </Text>
              <Text className="text-gray-500 text-lg mt-2">Remaining</Text>
            </CircularProgress>
          </View>
        );
      }
    }

    if (mode === "Intervals") {
      const totalTime = pomoState === "Work" ? 25 * 60 : 5 * 60;
      const progress = pomoTime / totalTime;

      return (
        <View className="items-center justify-center flex-1">
          <CircularProgress progress={progress} size={280}>
            <Text
              className={`text-6xl font-bold font-monospaced ${pomoState === "Work" ? "text-[#8B5CF6]" : "text-[#22C55E]"}`}
            >
              {formatTime(pomoTime)}
            </Text>
            <View
              className={`px-4 py-1 rounded-full mt-2 ${pomoState === "Work" ? "bg-[#8B5CF6]/20" : "bg-[#22C55E]/20"}`}
            >
              <Text
                className={`text-base font-bold ${pomoState === "Work" ? "text-[#8B5CF6]" : "text-[#22C55E]"}`}
              >
                {pomoState === "Work" ? "🔥 Focus Time" : "☕ Break Time"}
              </Text>
            </View>
          </CircularProgress>
        </View>
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <View className="flex-row justify-between items-center px-6 py-4">
        <TouchableOpacity>
          <Ionicons name="information-circle-outline" size={24} color="gray" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Timer</Text>
        <TouchableOpacity>
          <Ionicons name="volume-high-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center">{renderContent()}</View>

      <View className="items-center mb-10">
        {isRunning ? (
          <TouchableOpacity
            onPress={handlePause}
            activeOpacity={0.8}
            className="flex-row items-center px-10 py-4 rounded-2xl bg-[#2C2C2E]"
          >
            <Ionicons name="pause" size={24} color="#8B5CF6" />
            <Text className="ml-2 text-lg font-bold text-[#8B5CF6]">PAUSE</Text>
          </TouchableOpacity>
        ) : hasStarted() ? (
          <View className="flex-row space-x-4">
            <TouchableOpacity
              onPress={handleStart}
              activeOpacity={0.8}
              className="flex-row items-center mx-2 px-8 py-4 rounded-2xl bg-[#8B5CF6]"
            >
              <Ionicons name="play" size={24} color="white" />
              <Text className="mx-2 text-lg font-bold text-white">RESUME</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleStop}
              activeOpacity={0.8}
              className="flex-row items-center mx-2 px-8 py-4 rounded-2xl bg-[#2C2C2E]"
            >
              <Ionicons name="stop" size={24} color="#8B5CF6" />
              <Text className="mx-2 text-lg font-bold text-[#8B5CF6]">
                STOP
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleStart}
            activeOpacity={0.8}
            className="flex-row items-center px-10 py-4 rounded-2xl bg-[#8B5CF6]"
          >
            <Ionicons name="play" size={24} color="white" />
            <Text className="ml-2 text-lg font-bold text-white">START</Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="bg-[#1C1C1E] mx-4 mb-4 p-1 rounded-2xl flex-row ">
        {(["Stopwatch", "Countdown", "Intervals"] as TimerMode[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              setMode(tab);
              handleStop();
            }}
            className={`flex-1 py-3 rounded-xl items-center justify-center ${mode === tab ? "bg-[#2C2C2E]" : "transparent"}`}
          >
            <Ionicons
              name={
                tab === "Stopwatch"
                  ? "stopwatch-outline"
                  : tab === "Countdown"
                    ? "hourglass-outline"
                    : "infinite-outline"
              }
              size={20}
              color={mode === tab ? "#8B5CF6" : "gray"}
            />
            <Text
              className={`text-xs mt-1 font-medium ${mode === tab ? "text-[#8B5CF6]" : "text-gray-500"}`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Timer;
