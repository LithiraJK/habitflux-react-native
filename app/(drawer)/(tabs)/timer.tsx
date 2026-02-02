import CircularProgress from "@/components/ui/CircularProgress";
import { Colors } from "@/constants/theme";
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
            <Text
              style={{ color: Colors.dark.text }}
              className="text-6xl font-bold font-monospaced"
            >
              {formatTime(swTime)}
            </Text>
            <Text
              style={{ color: Colors.dark.textTertiary }}
              className="text-lg mt-2"
            >
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
              <View className="items-center">
                <Text
                  style={{ color: Colors.dark.textTertiary }}
                  className="mb-2"
                >
                  Hours
                </Text>
                <View
                  style={{ backgroundColor: Colors.dark.cardBackground }}
                  className="p-4 rounded-xl items-center w-20"
                >
                  <TouchableOpacity onPress={() => setHours((h) => h + 1)}>
                    <Ionicons
                      name="chevron-up"
                      color={Colors.dark.textSecondary}
                      size={24}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{ color: Colors.dark.text }}
                    className="text-3xl font-bold my-2"
                  >
                    {hours.toString().padStart(2, "0")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setHours((h) => Math.max(0, h - 1))}
                  >
                    <Ionicons
                      name="chevron-down"
                      color={Colors.dark.textSecondary}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{ color: Colors.dark.text }}
                className="text-3xl mt-6"
              >
                :
              </Text>
              <View className="items-center">
                <Text
                  style={{ color: Colors.dark.textTertiary }}
                  className="mb-2"
                >
                  Minutes
                </Text>
                <View
                  style={{ backgroundColor: Colors.dark.cardBackground }}
                  className="p-4 rounded-xl items-center w-20"
                >
                  <TouchableOpacity
                    onPress={() => setMinutes((m) => (m >= 59 ? 0 : m + 1))}
                  >
                    <Ionicons
                      name="chevron-up"
                      color={Colors.dark.textSecondary}
                      size={24}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{ color: Colors.dark.text }}
                    className="text-3xl font-bold my-2"
                  >
                    {minutes.toString().padStart(2, "0")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setMinutes((m) => (m <= 0 ? 59 : m - 1))}
                  >
                    <Ionicons
                      name="chevron-down"
                      color={Colors.dark.textSecondary}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{ color: Colors.dark.text }}
                className="text-3xl mt-6"
              >
                :
              </Text>
              <View className="items-center">
                <Text
                  style={{ color: Colors.dark.textTertiary }}
                  className="mb-2"
                >
                  Seconds
                </Text>
                <View
                  style={{ backgroundColor: Colors.dark.cardBackground }}
                  className="p-4 rounded-xl items-center w-20"
                >
                  <TouchableOpacity
                    onPress={() => setSeconds((s) => (s >= 59 ? 0 : s + 1))}
                  >
                    <Ionicons
                      name="chevron-up"
                      color={Colors.dark.textSecondary}
                      size={24}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{ color: Colors.dark.text }}
                    className="text-3xl font-bold my-2"
                  >
                    {seconds.toString().padStart(2, "0")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setSeconds((s) => (s <= 0 ? 59 : s - 1))}
                  >
                    <Ionicons
                      name="chevron-down"
                      color={Colors.dark.textSecondary}
                      size={24}
                    />
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
              <Text
                style={{ color: Colors.dark.text }}
                className="text-6xl font-bold font-monospaced"
              >
                {formatTime(cdTime)}
              </Text>
              <Text
                style={{ color: Colors.dark.textTertiary }}
                className="text-lg mt-2"
              >
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
            <Text
              style={{
                color:
                  pomoState === "Work"
                    ? Colors.dark.primary
                    : Colors.dark.success,
              }}
              className="text-6xl font-bold font-monospaced"
            >
              {formatTime(pomoTime)}
            </Text>
            <View
              style={{
                backgroundColor:
                  pomoState === "Work"
                    ? `${Colors.dark.primary}20`
                    : `${Colors.dark.success}20`,
              }}
              className="px-4 py-1 rounded-full mt-2"
            >
              <Text
                style={{
                  color:
                    pomoState === "Work"
                      ? Colors.dark.primary
                      : Colors.dark.success,
                }}
                className="text-base font-bold"
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <View className="flex-1 justify-center">{renderContent()}</View>

      <View className="items-center mb-10">
        {isRunning ? (
          <TouchableOpacity
            onPress={handlePause}
            activeOpacity={0.8}
            style={{ backgroundColor: Colors.dark.cardBackgroundSecondary }}
            className="flex-row items-center px-10 py-4 rounded-2xl"
          >
            <Ionicons name="pause" size={24} color={Colors.dark.primary} />
            <Text
              style={{ color: Colors.dark.primary }}
              className="ml-2 text-lg font-bold"
            >
              PAUSE
            </Text>
          </TouchableOpacity>
        ) : hasStarted() ? (
          <View className="flex-row space-x-4">
            <TouchableOpacity
              onPress={handleStart}
              activeOpacity={0.8}
              style={{ backgroundColor: Colors.dark.primary }}
              className="flex-row items-center mx-2 px-8 py-4 rounded-2xl"
            >
              <Ionicons name="play" size={24} color={Colors.dark.text} />
              <Text
                style={{ color: Colors.dark.text }}
                className="mx-2 text-lg font-bold"
              >
                RESUME
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleStop}
              activeOpacity={0.8}
              style={{ backgroundColor: Colors.dark.cardBackgroundSecondary }}
              className="flex-row items-center mx-2 px-8 py-4 rounded-2xl"
            >
              <Ionicons name="stop" size={24} color={Colors.dark.primary} />
              <Text
                style={{ color: Colors.dark.primary }}
                className="mx-2 text-lg font-bold"
              >
                STOP
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleStart}
            activeOpacity={0.8}
            style={{ backgroundColor: Colors.dark.primary }}
            className="flex-row items-center px-10 py-4 rounded-2xl"
          >
            <Ionicons name="play" size={24} color={Colors.dark.text} />
            <Text
              style={{ color: Colors.dark.text }}
              className="ml-2 text-lg font-bold"
            >
              START
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{ backgroundColor: Colors.dark.cardBackground }}
        className="mx-4 mb-10 p-1 rounded-2xl flex-row "
      >
        {(["Stopwatch", "Countdown", "Intervals"] as TimerMode[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              setMode(tab);
              handleStop();
            }}
            style={{
              backgroundColor:
                mode === tab
                  ? Colors.dark.cardBackgroundSecondary
                  : "transparent",
            }}
            className="flex-1 py-3 rounded-xl items-center justify-center"
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
              color={
                mode === tab ? Colors.dark.primary : Colors.dark.textSecondary
              }
            />
            <Text
              style={{
                color:
                  mode === tab ? Colors.dark.primary : Colors.dark.textTertiary,
              }}
              className="text-xs mt-1 font-medium"
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
