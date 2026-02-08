import CircularProgress from "@/components/ui/CircularProgress";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

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
  const navigation = useNavigation();
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
            <Text className="text-6xl font-black font-monospaced text-white tracking-widest">
              {formatTime(swTime)}
            </Text>
            <Text className="text-indigo-300 text-lg mt-2 font-medium tracking-widest uppercase">
              Stopwatch
            </Text>
          </CircularProgress>
        </View>
      );
    }

    if (mode === "Countdown") {
      if (isCdSetting) {
        return (
          <View className="items-center justify-center flex-1 w-full">
            <View className="flex-row items-center justify-center space-x-4 mb-10">
              
              {/* Hours Picker */}
              <View className="items-center">
                <Text className="text-gray-400 mb-2 text-xs uppercase tracking-widest font-bold">Hours</Text>
                <BlurView intensity={20} tint="dark" className="p-2 rounded-2xl items-center w-24 border border-white/10 overflow-hidden">
                  <TouchableOpacity onPress={() => setHours((h) => h + 1)} className="p-2">
                    <Ionicons name="chevron-up" color="#818cf8" size={24} />
                  </TouchableOpacity>
                  <Text className="text-4xl font-bold my-2 text-white">
                    {hours.toString().padStart(2, "0")}
                  </Text>
                  <TouchableOpacity onPress={() => setHours((h) => Math.max(0, h - 1))} className="p-2">
                    <Ionicons name="chevron-down" color="#818cf8" size={24} />
                  </TouchableOpacity>
                </BlurView>
              </View>

              <Text className="text-3xl mt-6 text-white/50">:</Text>

              {/* Minutes Picker */}
              <View className="items-center">
                <Text className="text-gray-400 mb-2 text-xs uppercase tracking-widest font-bold">Min</Text>
                <BlurView intensity={20} tint="dark" className="p-2 rounded-2xl items-center w-24 border border-white/10 overflow-hidden">
                  <TouchableOpacity onPress={() => setMinutes((m) => (m >= 59 ? 0 : m + 1))} className="p-2">
                    <Ionicons name="chevron-up" color="#818cf8" size={24} />
                  </TouchableOpacity>
                  <Text className="text-4xl font-bold my-2 text-white">
                    {minutes.toString().padStart(2, "0")}
                  </Text>
                  <TouchableOpacity onPress={() => setMinutes((m) => (m <= 0 ? 59 : m - 1))} className="p-2">
                    <Ionicons name="chevron-down" color="#818cf8" size={24} />
                  </TouchableOpacity>
                </BlurView>
              </View>

              <Text className="text-3xl mt-6 text-white/50">:</Text>

              {/* Seconds Picker */}
              <View className="items-center">
                <Text className="text-gray-400 mb-2 text-xs uppercase tracking-widest font-bold">Sec</Text>
                <BlurView intensity={20} tint="dark" className="p-2 rounded-2xl items-center w-24 border border-white/10 overflow-hidden">
                  <TouchableOpacity onPress={() => setSeconds((s) => (s >= 59 ? 0 : s + 1))} className="p-2">
                    <Ionicons name="chevron-up" color="#818cf8" size={24} />
                  </TouchableOpacity>
                  <Text className="text-4xl font-bold my-2 text-white">
                    {seconds.toString().padStart(2, "0")}
                  </Text>
                  <TouchableOpacity onPress={() => setSeconds((s) => (s <= 0 ? 59 : s - 1))} className="p-2">
                    <Ionicons name="chevron-down" color="#818cf8" size={24} />
                  </TouchableOpacity>
                </BlurView>
              </View>

            </View>
          </View>
        );
      } else {
        const progress = cdInitialTime > 0 ? cdTime / cdInitialTime : 0;
        return (
          <View className="items-center justify-center flex-1">
            <CircularProgress progress={progress} size={280}>
              <Text className="text-6xl font-black font-monospaced text-white tracking-widest">
                {formatTime(cdTime)}
              </Text>
              <Text className="text-indigo-300 text-lg mt-2 font-medium tracking-widest uppercase">
                Remaining
              </Text>
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
            <Text className="text-6xl font-black font-monospaced text-white tracking-widest">
              {formatTime(pomoTime)}
            </Text>
            <View
              className={`px-4 py-2 rounded-full mt-4 ${
                pomoState === "Work" ? "bg-indigo-500/20 border border-indigo-500/50" : "bg-green-500/20 border border-green-500/50"
              }`}
            >
              <Text
                className={`text-base font-bold ${
                   pomoState === "Work" ? "text-indigo-400" : "text-green-400"
                }`}
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
    <View className="flex-1">
      <StatusBar barStyle="light-content" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={["#0f172a", "#1e1b4b", "#0f172a"]}
        className="flex-1"
      >
        {/* Header Section */}
        <View className="pt-14 px-6 pb-4 flex-row items-center justify-between z-10">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/20 mr-4"
            >
              <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>
            
            <View>
              <Text className="text-gray-400 text-[10px] uppercase tracking-[3px] font-bold">
                Stay Productive
              </Text>
              <Text className="text-white text-2xl font-black">Focus Timer</Text>
            </View>
          </View>
        </View>

        <View className="h-10" />

        {/* Tab Switcher (Glassmorphism) */}
        <View className="px-6 mb-8">
          <BlurView intensity={30} tint="dark" className="rounded-2xl flex-row p-1 border border-white/10 overflow-hidden">
            {(["Stopwatch", "Countdown", "Intervals"] as TimerMode[]).map((tab) => {
              const isActive = mode === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => {
                    setMode(tab);
                    handleStop();
                  }}
                  className={`flex-1 py-3 rounded-xl items-center justify-center ${isActive ? "bg-white/10" : "bg-transparent"}`}
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
                    color={isActive ? "#818cf8" : "#94a3b8"}
                  />
                  <Text
                    className={`text-xs mt-1 font-semibold ${isActive ? "text-indigo-400" : "text-gray-400"}`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </BlurView>
        </View>

        {/* Main Content */}
        <View className="flex-1 justify-center">{renderContent()}</View>

        {/* Control Buttons */}
        <View className="items-center justify-center mb-10">
          {isRunning ? (
            <TouchableOpacity
              onPress={handlePause}
              activeOpacity={0.8}
            >
              <BlurView intensity={20} tint="light" className="flex-row items-center px-10 py-4 rounded-2xl overflow-hidden border border-white/20">
                <Ionicons name="pause" size={24} color="white" />
                <Text className="ml-2 text-lg font-bold text-white tracking-widest">
                  PAUSE
                </Text>
              </BlurView>
            </TouchableOpacity>
          ) : hasStarted() ? (
            <View className="flex-row space-x-4">
              <TouchableOpacity
                onPress={handleStart}
                activeOpacity={0.8}
                className="shadow-lg shadow-indigo-500/50"
              >
                 <LinearGradient
                    colors={["#6366f1", "#4f46e5"]}
                    className="flex-row items-center px-8 py-4 rounded-2xl"
                  >
                  <Ionicons name="play" size={24} color="white" />
                  <Text className="ml-2 text-lg font-bold text-white tracking-widest">
                    RESUME
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleStop}
                activeOpacity={0.8}
              >
                <BlurView intensity={20} tint="light" className="flex-row items-center px-8 py-4 rounded-2xl overflow-hidden border border-white/20">
                  <Ionicons name="stop" size={24} color="#ef4444" />
                  <Text className="ml-2 text-lg font-bold text-red-400 tracking-widest">
                    STOP
                  </Text>
                </BlurView>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleStart}
              activeOpacity={0.8}
              className="shadow-lg shadow-indigo-500/50"
            >
              <LinearGradient
                  colors={["#6366f1", "#4f46e5"]}
                  className="flex-row items-center px-12 py-4 rounded-2xl"
                >
                <Ionicons name="play" size={24} color="white" />
                <Text className="ml-2 text-lg font-bold text-white tracking-widest">
                  START
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      
        <View className="h-10 mb-20" />

        
      </LinearGradient>
    </View>
  );
};

export default Timer;