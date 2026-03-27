"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type AlgorithmKey =
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick"
  | "heap";

type BarState = "default" | "comparing" | "sorted" | "pivot" | "swapping";

interface Bar {
  value: number;
  state: BarState;
}

interface Step {
  bars: Bar[];
  comparisons: number;
  swaps: number;
}

interface AlgorithmInfo {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  stable: boolean;
}

// ─── Algorithm Metadata ───────────────────────────────────────────────────────

const ALGORITHMS: Record<AlgorithmKey, AlgorithmInfo> = {
  bubble: {
    name: "Bubble Sort",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    stable: true,
    description:
      "Compara elementos adjacentes e os troca se estiverem fora de ordem. Repete até o array estar ordenado. Simples mas ineficiente para grandes conjuntos — cada passagem faz um elemento 'borbulhar' para a posição correta.",
  },
  selection: {
    name: "Selection Sort",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    stable: false,
    description:
      "Encontra o menor elemento do array e coloca-o no início. Repete para o resto do array. Faz no máximo n-1 trocas, o que o torna útil quando escrever é custoso, mas as comparações são sempre O(n²).",
  },
  insertion: {
    name: "Insertion Sort",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    stable: true,
    description:
      "Constrói o array ordenado um elemento de cada vez, inserindo cada novo elemento na posição correta. Muito eficiente para arrays quase ordenados e para conjuntos pequenos. É o algoritmo usado em cartas de baralho.",
  },
  merge: {
    name: "Merge Sort",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    stable: true,
    description:
      "Divide o array ao meio recursivamente até ter sub-arrays de 1 elemento, depois junta-os de forma ordenada. Garantidamente O(n log n) em todos os casos. Excelente para dados em disco ou listas ligadas.",
  },
  quick: {
    name: "Quick Sort",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    stable: false,
    description:
      "Escolhe um pivô e particiona o array em elementos menores e maiores que o pivô, depois ordena recursivamente cada parte. Na prática é o algoritmo mais rápido para memória interna — muito usado em stdlib's.",
  },
  heap: {
    name: "Heap Sort",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    stable: false,
    description:
      "Constrói uma heap máxima e extrai o maior elemento repetidamente. Garante O(n log n) no pior caso com O(1) de espaço extra. Não é estável mas tem excelente comportamento no pior cenário.",
  },
};

// ─── Color Helpers ────────────────────────────────────────────────────────────

function getBarColor(value: number, state: BarState, maxVal: number): string {
  if (state === "sorted") return "#22c55e";
  if (state === "comparing") return "#facc15";
  if (state === "pivot") return "#f97316";
  if (state === "swapping") return "#ef4444";

  // Gradient: short=blue (#3b82f6), tall=red (#ef4444)
  const ratio = value / maxVal;
  const r = Math.round(59 + (239 - 59) * ratio);
  const g = Math.round(130 + (68 - 130) * ratio);
  const b = Math.round(246 + (68 - 246) * ratio);
  return `rgb(${r},${g},${b})`;
}

// ─── Algorithm Generators ────────────────────────────────────────────────────

function* bubbleSortGen(arr: number[]): Generator<Step> {
  const bars: Bar[] = arr.map((v) => ({ value: v, state: "default" as BarState }));
  let comparisons = 0;
  let swaps = 0;
  const n = bars.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      bars[j].state = "comparing";
      bars[j + 1].state = "comparing";
      comparisons++;
      yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };

      if (bars[j].value > bars[j + 1].value) {
        const tmp = bars[j].value;
        bars[j].value = bars[j + 1].value;
        bars[j + 1].value = tmp;
        bars[j].state = "swapping";
        bars[j + 1].state = "swapping";
        swaps++;
        yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
      }

      bars[j].state = "default";
      bars[j + 1].state = "default";
    }
    bars[n - 1 - i].state = "sorted";
  }
  bars[0].state = "sorted";
  yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
}

function* selectionSortGen(arr: number[]): Generator<Step> {
  const bars: Bar[] = arr.map((v) => ({ value: v, state: "default" as BarState }));
  let comparisons = 0;
  let swaps = 0;
  const n = bars.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    bars[i].state = "pivot";

    for (let j = i + 1; j < n; j++) {
      bars[j].state = "comparing";
      comparisons++;
      yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };

      if (bars[j].value < bars[minIdx].value) {
        if (minIdx !== i) bars[minIdx].state = "default";
        minIdx = j;
        bars[minIdx].state = "pivot";
      } else {
        bars[j].state = "default";
      }
    }

    if (minIdx !== i) {
      const tmp = bars[i].value;
      bars[i].value = bars[minIdx].value;
      bars[minIdx].value = tmp;
      bars[i].state = "swapping";
      bars[minIdx].state = "swapping";
      swaps++;
      yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
      bars[minIdx].state = "default";
    }

    bars[i].state = "sorted";
    yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
  }
  bars[n - 1].state = "sorted";
  yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
}

function* insertionSortGen(arr: number[]): Generator<Step> {
  const bars: Bar[] = arr.map((v) => ({ value: v, state: "default" as BarState }));
  let comparisons = 0;
  let swaps = 0;
  const n = bars.length;

  bars[0].state = "sorted";

  for (let i = 1; i < n; i++) {
    const key = bars[i].value;
    bars[i].state = "comparing";
    let j = i - 1;

    while (j >= 0 && bars[j].value > key) {
      comparisons++;
      bars[j + 1].value = bars[j].value;
      bars[j + 1].state = "swapping";
      bars[j].state = "comparing";
      swaps++;
      yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
      bars[j].state = "sorted";
      j--;
    }
    comparisons++;
    bars[j + 1].value = key;
    bars[j + 1].state = "sorted";
    yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
  }

  bars.forEach((b) => (b.state = "sorted"));
  yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
}

function* mergeSortGen(arr: number[]): Generator<Step> {
  const bars: Bar[] = arr.map((v) => ({ value: v, state: "default" as BarState }));
  let comparisons = 0;
  let swaps = 0;

  function* merge(
    left: number,
    mid: number,
    right: number
  ): Generator<Step> {
    const tmp: number[] = [];
    let i = left;
    let j = mid + 1;

    while (i <= mid && j <= right) {
      bars[i].state = "comparing";
      bars[j].state = "comparing";
      comparisons++;
      yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };

      if (bars[i].value <= bars[j].value) {
        tmp.push(bars[i].value);
        bars[i].state = "default";
        i++;
      } else {
        tmp.push(bars[j].value);
        bars[j].state = "default";
        j++;
      }
    }

    while (i <= mid) {
      tmp.push(bars[i].value);
      bars[i].state = "default";
      i++;
    }
    while (j <= right) {
      tmp.push(bars[j].value);
      bars[j].state = "default";
      j++;
    }

    for (let k = 0; k < tmp.length; k++) {
      bars[left + k].value = tmp[k];
      bars[left + k].state = "swapping";
      swaps++;
      yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
      bars[left + k].state = "default";
    }
  }

  function* mergeSort(left: number, right: number): Generator<Step> {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    yield* mergeSort(left, mid);
    yield* mergeSort(mid + 1, right);
    yield* merge(left, mid, right);
  }

  yield* mergeSort(0, bars.length - 1);
  bars.forEach((b) => (b.state = "sorted"));
  yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
}

function* quickSortGen(arr: number[]): Generator<Step> {
  const bars: Bar[] = arr.map((v) => ({ value: v, state: "default" as BarState }));
  let comparisons = 0;
  let swaps = 0;

  function* partition(low: number, high: number): Generator<Step, number> {
    const pivotVal = bars[high].value;
    bars[high].state = "pivot";
    let i = low - 1;

    for (let j = low; j < high; j++) {
      bars[j].state = "comparing";
      comparisons++;
      yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };

      if (bars[j].value <= pivotVal) {
        i++;
        const tmp = bars[i].value;
        bars[i].value = bars[j].value;
        bars[j].value = tmp;
        bars[i].state = "swapping";
        bars[j].state = "swapping";
        swaps++;
        yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
        bars[i].state = "default";
      }
      bars[j].state = "default";
    }

    const pivotPos = i + 1;
    const tmp = bars[pivotPos].value;
    bars[pivotPos].value = bars[high].value;
    bars[high].value = tmp;
    bars[high].state = "default";
    bars[pivotPos].state = "sorted";
    swaps++;
    yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };

    return pivotPos;
  }

  function* quickSort(low: number, high: number): Generator<Step> {
    if (low < high) {
      const pi: number = yield* partition(low, high);
      yield* quickSort(low, pi - 1);
      yield* quickSort(pi + 1, high);
    } else if (low === high) {
      bars[low].state = "sorted";
      yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
    }
  }

  yield* quickSort(0, bars.length - 1);
  bars.forEach((b) => (b.state = "sorted"));
  yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
}

function* heapSortGen(arr: number[]): Generator<Step> {
  const bars: Bar[] = arr.map((v) => ({ value: v, state: "default" as BarState }));
  let comparisons = 0;
  let swaps = 0;
  const n = bars.length;

  function* heapify(size: number, root: number): Generator<Step> {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      bars[left].state = "comparing";
      bars[largest].state = "comparing";
      comparisons++;
      yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
      if (bars[left].value > bars[largest].value) largest = left;
      bars[left].state = left === largest ? "pivot" : "default";
      bars[root].state = root === largest ? "pivot" : "default";
    }

    if (right < size) {
      bars[right].state = "comparing";
      if (largest !== root) bars[largest].state = "comparing";
      comparisons++;
      yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
      if (bars[right].value > bars[largest].value) largest = right;
      bars[right].state = "default";
      if (largest !== root) bars[largest].state = "default";
    }

    if (largest !== root) {
      bars[root].state = "swapping";
      bars[largest].state = "swapping";
      const tmp = bars[root].value;
      bars[root].value = bars[largest].value;
      bars[largest].value = tmp;
      swaps++;
      yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
      bars[root].state = "default";
      bars[largest].state = "default";
      yield* heapify(size, largest);
    } else {
      bars[root].state = "default";
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i);
  }

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    bars[0].state = "swapping";
    bars[i].state = "swapping";
    const tmp = bars[0].value;
    bars[0].value = bars[i].value;
    bars[i].value = tmp;
    swaps++;
    yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
    bars[i].state = "sorted";
    bars[0].state = "default";
    yield* heapify(i, 0);
  }

  bars[0].state = "sorted";
  yield { bars: bars.map((b) => ({ ...b })), comparisons, swaps };
}

// ─── Generate steps upfront ──────────────────────────────────────────────────

function generateSteps(algorithm: AlgorithmKey, arr: number[]): Step[] {
  const generators: Record<AlgorithmKey, (a: number[]) => Generator<Step>> = {
    bubble: bubbleSortGen,
    selection: selectionSortGen,
    insertion: insertionSortGen,
    merge: mergeSortGen,
    quick: quickSortGen,
    heap: heapSortGen,
  };

  const gen = generators[algorithm](arr);
  const steps: Step[] = [];
  let result = gen.next();
  while (!result.done) {
    steps.push(result.value as Step);
    result = gen.next();
  }
  return steps;
}

// ─── Random Array ─────────────────────────────────────────────────────────────

function randomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SortingVisualizer() {
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50); // ms delay
  const [algorithm, setAlgorithm] = useState<AlgorithmKey>("bubble");
  const [rawArray, setRawArray] = useState<number[]>(() => randomArray(50));
  const [bars, setBars] = useState<Bar[]>(() =>
    randomArray(50).map((v) => ({ value: v, state: "default" as BarState }))
  );
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStepMode, setIsStepMode] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [pulseActive, setPulseActive] = useState(false);

  const stepsRef = useRef<Step[]>([]);
  const stepIdxRef = useRef(0);
  const pausedRef = useRef(false);
  const stopRef = useRef(false);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animFrameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const maxVal = Math.max(...rawArray, 1);

  // Sync bars when rawArray changes (not sorting)
  useEffect(() => {
    if (!isSorting) {
      setBars(rawArray.map((v) => ({ value: v, state: "default" as BarState })));
      setComparisons(0);
      setSwaps(0);
      setElapsedTime(0);
      setIsDone(false);
      setStepIndex(0);
    }
  }, [rawArray, isSorting]);

  const generateNew = useCallback(() => {
    if (isSorting) return;
    const arr = randomArray(arraySize);
    setRawArray(arr);
  }, [isSorting, arraySize]);

  const handleArraySizeChange = useCallback(
    (val: number) => {
      if (isSorting) return;
      setArraySize(val);
      const arr = randomArray(val);
      setRawArray(arr);
    },
    [isSorting]
  );

  const stopSorting = useCallback(() => {
    stopRef.current = true;
    pausedRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    if (animFrameRef.current) clearTimeout(animFrameRef.current);
    setIsSorting(false);
    setIsPaused(false);
  }, []);

  const applyStep = useCallback((idx: number) => {
    const step = stepsRef.current[idx];
    if (!step) return;
    setBars(step.bars.map((b) => ({ ...b })));
    setComparisons(step.comparisons);
    setSwaps(step.swaps);
    if (step.swaps > (stepsRef.current[idx - 1]?.swaps ?? 0)) {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 150);
    }
  }, []);

  const startSorting = useCallback(() => {
    if (isSorting) return;

    // Pre-compute all steps
    const steps = generateSteps(algorithm, rawArray);
    stepsRef.current = steps;
    stepIdxRef.current = 0;
    stopRef.current = false;
    pausedRef.current = false;

    setIsSorting(true);
    setIsPaused(false);
    setIsDone(false);
    setComparisons(0);
    setSwaps(0);
    setStepIndex(0);

    startTimeRef.current = performance.now();
    timerRef.current = setInterval(() => {
      setElapsedTime(
        Math.round(performance.now() - startTimeRef.current)
      );
    }, 100);

    if (isStepMode) return; // wait for manual steps

    const runNext = () => {
      if (stopRef.current) return;
      if (pausedRef.current) {
        animFrameRef.current = setTimeout(runNext, 50);
        return;
      }

      const idx = stepIdxRef.current;
      if (idx >= stepsRef.current.length) {
        // Done
        if (timerRef.current) clearInterval(timerRef.current);
        setIsSorting(false);
        setIsDone(true);
        return;
      }

      applyStep(idx);
      setStepIndex(idx);
      stepIdxRef.current = idx + 1;
      animFrameRef.current = setTimeout(runNext, speed);
    };

    animFrameRef.current = setTimeout(runNext, speed);
  }, [isSorting, algorithm, rawArray, speed, isStepMode, applyStep]);

  const handlePauseResume = useCallback(() => {
    if (!isSorting) return;
    pausedRef.current = !pausedRef.current;
    setIsPaused((p) => !p);
  }, [isSorting]);

  const handleStepForward = useCallback(() => {
    if (!isSorting || !isStepMode) return;
    const idx = stepIdxRef.current;
    if (idx >= stepsRef.current.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsSorting(false);
      setIsDone(true);
      return;
    }
    applyStep(idx);
    setStepIndex(idx);
    stepIdxRef.current = idx + 1;
    setElapsedTime(Math.round(performance.now() - startTimeRef.current));
  }, [isSorting, isStepMode, applyStep]);

  const handleReset = useCallback(() => {
    stopSorting();
    setBars(rawArray.map((v) => ({ value: v, state: "default" as BarState })));
    setComparisons(0);
    setSwaps(0);
    setElapsedTime(0);
    setIsDone(false);
    setStepIndex(0);
  }, [stopSorting, rawArray]);

  // Update speed dynamically
  useEffect(() => {
    // speed change takes effect on next tick naturally
  }, [speed]);

  // Update runNext speed — we need to re-read speed from ref
  const speedRef = useRef(speed);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Re-do startSorting with ref-based speed
  const startSortingFinal = useCallback(() => {
    if (isSorting) return;

    const steps = generateSteps(algorithm, rawArray);
    stepsRef.current = steps;
    stepIdxRef.current = 0;
    stopRef.current = false;
    pausedRef.current = false;

    setIsSorting(true);
    setIsPaused(false);
    setIsDone(false);
    setComparisons(0);
    setSwaps(0);
    setStepIndex(0);

    startTimeRef.current = performance.now();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.round(performance.now() - startTimeRef.current));
    }, 100);

    if (isStepMode) return;

    const runNext = () => {
      if (stopRef.current) return;
      if (pausedRef.current) {
        animFrameRef.current = setTimeout(runNext, 50);
        return;
      }
      const idx = stepIdxRef.current;
      if (idx >= stepsRef.current.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsSorting(false);
        setIsDone(true);
        return;
      }
      applyStep(idx);
      setStepIndex(idx);
      stepIdxRef.current = idx + 1;
      animFrameRef.current = setTimeout(runNext, speedRef.current);
    };

    animFrameRef.current = setTimeout(runNext, speedRef.current);
  }, [isSorting, algorithm, rawArray, isStepMode, applyStep]);

  useEffect(() => {
    return () => {
      stopRef.current = true;
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) clearTimeout(animFrameRef.current);
    };
  }, []);

  const progress =
    stepsRef.current.length > 0
      ? Math.round((stepIndex / stepsRef.current.length) * 100)
      : 0;

  const info = ALGORITHMS[algorithm];

  return (
    <div
      style={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "#f1f5f9" }}
      className="font-sans"
    >
      {/* Pulse overlay */}
      <AnimatePresence>
        {pulseActive && (
          <motion.div
            key="pulse"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "#facc15",
              pointerEvents: "none",
              zIndex: 50,
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1
            className="text-3xl md:text-4xl font-bold mb-1"
            style={{ color: "#f1f5f9" }}
          >
            Visualizador de{" "}
            <span style={{ color: "#818cf8" }}>Sorting</span>
          </h1>
          <p style={{ color: "#94a3b8" }} className="text-sm">
            Vê algoritmos de ordenação a trabalhar em tempo real
          </p>
        </motion.div>

        {/* Algorithm Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {(Object.keys(ALGORITHMS) as AlgorithmKey[]).map((key) => {
            const isActive = algorithm === key;
            const isO2 = ["bubble", "selection", "insertion"].includes(key);
            return (
              <button
                key={key}
                onClick={() => {
                  if (isSorting) return;
                  setAlgorithm(key);
                }}
                disabled={isSorting}
                style={{
                  backgroundColor: isActive ? "#818cf8" : "#1e293b",
                  color: isActive ? "#fff" : "#94a3b8",
                  border: `1px solid ${isActive ? "#818cf8" : "#334155"}`,
                  borderRadius: "8px",
                  padding: "8px 14px",
                  cursor: isSorting ? "not-allowed" : "pointer",
                  fontSize: "0.8rem",
                  fontWeight: isActive ? 700 : 400,
                  transition: "all 0.2s",
                  opacity: isSorting && !isActive ? 0.5 : 1,
                }}
              >
                {ALGORITHMS[key].name}
                <span
                  style={{
                    marginLeft: "6px",
                    fontSize: "0.7rem",
                    color: isActive
                      ? "#c7d2fe"
                      : isO2
                      ? "#f87171"
                      : "#34d399",
                  }}
                >
                  {ALGORITHMS[key].timeComplexity}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Controls Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-4 items-end justify-center"
          style={{
            backgroundColor: "#1e293b",
            borderRadius: "12px",
            padding: "16px 20px",
            border: "1px solid #334155",
          }}
        >
          {/* Array Size */}
          <div className="flex flex-col gap-1 min-w-[160px]">
            <label
              style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600 }}
            >
              Tamanho do Array: <span style={{ color: "#f1f5f9" }}>{arraySize}</span>
            </label>
            <input
              type="range"
              min={10}
              max={100}
              value={arraySize}
              onChange={(e) => handleArraySizeChange(Number(e.target.value))}
              disabled={isSorting}
              style={{ accentColor: "#818cf8", width: "100%", cursor: isSorting ? "not-allowed" : "pointer" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.65rem",
                color: "#475569",
              }}
            >
              <span>10</span>
              <span>100</span>
            </div>
          </div>

          {/* Speed */}
          <div className="flex flex-col gap-1 min-w-[160px]">
            <label
              style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600 }}
            >
              Velocidade:{" "}
              <span style={{ color: "#f1f5f9" }}>
                {speed <= 10 ? "Muito rápida" : speed <= 50 ? "Rápida" : speed <= 100 ? "Média" : "Lenta"}
              </span>
            </label>
            <input
              type="range"
              min={1}
              max={200}
              value={201 - speed}
              onChange={(e) => setSpeed(201 - Number(e.target.value))}
              style={{ accentColor: "#f59e0b", width: "100%", cursor: "pointer" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.65rem",
                color: "#475569",
              }}
            >
              <span>Lenta</span>
              <span>Rápida</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={generateNew}
              disabled={isSorting}
              style={{
                backgroundColor: "#1e293b",
                color: "#94a3b8",
                border: "1px solid #334155",
                borderRadius: "8px",
                padding: "9px 14px",
                cursor: isSorting ? "not-allowed" : "pointer",
                fontSize: "0.8rem",
                opacity: isSorting ? 0.5 : 1,
                whiteSpace: "nowrap",
              }}
            >
              Gerar Novo Array
            </button>

            {!isSorting && !isDone && (
              <button
                onClick={startSortingFinal}
                style={{
                  backgroundColor: "#818cf8",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "9px 20px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                Ordenar!
              </button>
            )}

            {isSorting && !isStepMode && (
              <button
                onClick={handlePauseResume}
                style={{
                  backgroundColor: isPaused ? "#22c55e" : "#f59e0b",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "9px 16px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {isPaused ? "Continuar" : "Pausar"}
              </button>
            )}

            {isSorting && isStepMode && (
              <button
                onClick={handleStepForward}
                style={{
                  backgroundColor: "#818cf8",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "9px 16px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Passo →
              </button>
            )}

            {(isSorting || isDone) && (
              <button
                onClick={handleReset}
                style={{
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "9px 14px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Reiniciar
              </button>
            )}

            <button
              onClick={() => {
                if (isSorting) return;
                setIsStepMode((v) => !v);
              }}
              disabled={isSorting}
              style={{
                backgroundColor: isStepMode ? "#0f172a" : "#1e293b",
                color: isStepMode ? "#818cf8" : "#64748b",
                border: `1px solid ${isStepMode ? "#818cf8" : "#334155"}`,
                borderRadius: "8px",
                padding: "9px 14px",
                cursor: isSorting ? "not-allowed" : "pointer",
                fontSize: "0.75rem",
                whiteSpace: "nowrap",
                opacity: isSorting ? 0.5 : 1,
              }}
            >
              {isStepMode ? "Passo a Passo ON" : "Passo a Passo"}
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { label: "Comparações", value: comparisons, color: "#facc15" },
            { label: "Trocas", value: swaps, color: "#f87171" },
            {
              label: "Tempo",
              value: `${(elapsedTime / 1000).toFixed(2)}s`,
              color: "#34d399",
            },
            {
              label: "Progresso",
              value: `${isSorting || isDone ? progress : 0}%`,
              color: "#818cf8",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              layout
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "10px",
                padding: "10px 20px",
                textAlign: "center",
                minWidth: "100px",
              }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: stat.color,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {stat.value.toLocaleString()}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "2px" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}

          {isDone && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                backgroundColor: "#14532d",
                border: "1px solid #22c55e",
                borderRadius: "10px",
                padding: "10px 20px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>Ordenado!</span>
              <span style={{ color: "#22c55e", fontWeight: 700 }}>✓</span>
            </motion.div>
          )}
        </div>

        {/* Progress Bar */}
        {(isSorting || isDone) && (
          <div
            style={{
              height: "4px",
              backgroundColor: "#1e293b",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ width: `${isDone ? 100 : progress}%` }}
              transition={{ duration: 0.1 }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #818cf8, #34d399)",
                borderRadius: "4px",
              }}
            />
          </div>
        )}

        {/* Visualization */}
        <div
          style={{
            backgroundColor: "#0d1b2e",
            borderRadius: "12px",
            border: "1px solid #1e293b",
            padding: "16px 12px 8px",
            minHeight: "300px",
            display: "flex",
            alignItems: "flex-end",
            gap: "2px",
            overflow: "hidden",
          }}
        >
          {bars.map((bar, i) => {
            const heightPct = (bar.value / (maxVal + 5)) * 100;
            const color = getBarColor(bar.value, bar.state, maxVal);
            const isComparing = bar.state === "comparing";
            const isSwapping = bar.state === "swapping";
            const isPivot = bar.state === "pivot";

            return (
              <div
                key={i}
                title={`${bar.value}`}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: `${heightPct}%`,
                  backgroundColor: color,
                  borderRadius: "2px 2px 0 0",
                  transition: "height 0.08s ease, background-color 0.1s ease",
                  boxShadow:
                    isComparing
                      ? "0 0 6px 2px rgba(250,204,21,0.6)"
                      : isSwapping
                      ? "0 0 6px 2px rgba(239,68,68,0.6)"
                      : isPivot
                      ? "0 0 6px 2px rgba(249,115,22,0.6)"
                      : "none",
                  transform:
                    isComparing || isSwapping ? "scaleY(1.03)" : "scaleY(1)",
                  transformOrigin: "bottom",
                }}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { label: "Comparando", color: "#facc15" },
            { label: "Trocando", color: "#ef4444" },
            { label: "Pivô", color: "#f97316" },
            { label: "Ordenado", color: "#22c55e" },
            { label: "Padrão", color: "#3b82f6" },
          ].map((item) => (
            <div
              key={item.label}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "3px",
                  backgroundColor: item.color,
                }}
              />
              <span style={{ fontSize: "0.7rem", color: "#64748b" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Algorithm Info Panel */}
        <motion.div
          key={algorithm}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: "#1e293b",
            borderRadius: "12px",
            border: "1px solid #334155",
            padding: "20px",
          }}
        >
          <div className="flex flex-wrap gap-3 items-start justify-between mb-3">
            <div>
              <h2
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#f1f5f9",
                  marginBottom: "4px",
                }}
              >
                {info.name}
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: "1.6" }}>
                {info.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3" style={{ flexShrink: 0 }}>
              <div
                style={{
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "#64748b",
                    marginBottom: "2px",
                  }}
                >
                  Tempo
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: ["bubble", "selection", "insertion"].includes(algorithm)
                      ? "#f87171"
                      : "#34d399",
                  }}
                >
                  {info.timeComplexity}
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "#64748b",
                    marginBottom: "2px",
                  }}
                >
                  Espaço
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: info.spaceComplexity === "O(n)" ? "#f59e0b" : "#34d399",
                  }}
                >
                  {info.spaceComplexity}
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "#64748b",
                    marginBottom: "2px",
                  }}
                >
                  Estável
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: info.stable ? "#34d399" : "#f87171",
                  }}
                >
                  {info.stable ? "Sim" : "Não"}
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div style={{ overflowX: "auto", marginTop: "12px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.75rem",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #334155" }}>
                  {["Algoritmo", "Melhor caso", "Médio", "Pior caso", "Espaço", "Estável"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: "6px 10px",
                          color: "#64748b",
                          textAlign: "left",
                          fontWeight: 600,
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Bubble Sort", "O(n)", "O(n²)", "O(n²)", "O(1)", true],
                    ["Selection Sort", "O(n²)", "O(n²)", "O(n²)", "O(1)", false],
                    ["Insertion Sort", "O(n)", "O(n²)", "O(n²)", "O(1)", true],
                    ["Merge Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(n)", true],
                    ["Quick Sort", "O(n log n)", "O(n log n)", "O(n²)", "O(log n)", false],
                    ["Heap Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(1)", false],
                  ] as [string, string, string, string, string, boolean][]
                ).map(([name, best, avg, worst, space, stable]) => {
                  const isActive = name === info.name;
                  return (
                    <tr
                      key={name}
                      style={{
                        backgroundColor: isActive ? "#1a2744" : "transparent",
                        borderBottom: "1px solid #1e293b",
                        transition: "background 0.2s",
                      }}
                    >
                      <td
                        style={{
                          padding: "6px 10px",
                          fontWeight: isActive ? 700 : 400,
                          color: isActive ? "#818cf8" : "#94a3b8",
                        }}
                      >
                        {name}
                      </td>
                      <td style={{ padding: "6px 10px", color: "#34d399" }}>{best}</td>
                      <td style={{ padding: "6px 10px", color: "#f59e0b" }}>{avg}</td>
                      <td
                        style={{
                          padding: "6px 10px",
                          color: worst.includes("n²") ? "#f87171" : "#34d399",
                        }}
                      >
                        {worst}
                      </td>
                      <td
                        style={{
                          padding: "6px 10px",
                          color: space === "O(n)" ? "#f59e0b" : "#94a3b8",
                        }}
                      >
                        {space}
                      </td>
                      <td
                        style={{
                          padding: "6px 10px",
                          color: stable ? "#34d399" : "#f87171",
                        }}
                      >
                        {stable ? "Sim" : "Não"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Footer */}
        <div style={{ textAlign: "center", color: "#334155", fontSize: "0.7rem", paddingBottom: "16px" }}>
          Descomplicai — Visualizador de Sorting
        </div>
      </div>
    </div>
  );
}
