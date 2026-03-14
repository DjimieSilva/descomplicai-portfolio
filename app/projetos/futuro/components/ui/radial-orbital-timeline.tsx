"use client";
import { useState, useEffect, useRef } from "react";
import { Zap, ArrowRight, Link as LinkIcon } from "lucide-react";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export function RadialOrbitalTimeline({
  timelineData,
}: {
  timelineData: TimelineItem[];
}) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];
      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulse: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulse[relId] = true;
        });
        setPulseEffect(newPulse);
        const nodeIndex = timelineData.findIndex((item) => item.id === id);
        const targetAngle = (nodeIndex / timelineData.length) * 360;
        setRotationAngle(270 - targetAngle);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      }, 50);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 180;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );
    return { x, y, angle, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-[#2563eb] border-[#2563eb]";
      case "in-progress":
        return "text-[#2563eb] bg-[rgba(37,99,235,0.08)] border-[#2563eb]";
      case "pending":
        return "text-[#94a3b8] bg-[#fafbfd] border-[rgba(15,23,42,0.08)]";
      default:
        return "text-[#94a3b8] bg-[#fafbfd] border-[rgba(15,23,42,0.08)]";
    }
  };

  return (
    <div
      className="w-full h-[500px] flex flex-col items-center justify-center rounded-3xl overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      }}
    >
      <div className="relative w-full max-w-3xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Center orb */}
          <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-18 h-18 rounded-full border border-white/20 animate-ping opacity-70" />
            <div
              className="absolute w-22 h-22 rounded-full border border-white/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-md" />
          </div>

          {/* Orbit ring */}
          <div
            className="absolute rounded-full border border-white/10"
            style={{ width: 360, height: 360 }}
          />

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Energy aura */}
                <div
                  className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                    width: `${item.energy * 0.4 + 36}px`,
                    height: `${item.energy * 0.4 + 36}px`,
                    left: `-${(item.energy * 0.4 + 36 - 36) / 2}px`,
                    top: `-${(item.energy * 0.4 + 36 - 36) / 2}px`,
                  }}
                />

                {/* Node circle */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${
                      isExpanded
                        ? "bg-white text-slate-900 border-white shadow-lg shadow-white/30 scale-150"
                        : isRelated
                          ? "bg-white/50 text-slate-900 border-white animate-pulse"
                          : "bg-slate-900 text-white border-white/40"
                    }`}
                >
                  <Icon size={14} />
                </div>

                {/* Label */}
                <div
                  className={`absolute top-11 whitespace-nowrap text-[10px] font-semibold tracking-wider transition-all duration-300
                  ${isExpanded ? "text-white scale-110" : "text-white/60"}`}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 w-56 rounded-xl border bg-slate-900/95 backdrop-blur-xl border-white/20 shadow-xl text-white overflow-visible">
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-px h-2.5 bg-white/40" />
                    <div className="flex flex-col space-y-1.5 p-4 pb-2">
                      <div className="flex justify-between items-center">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getStatusStyles(item.status)}`}
                        >
                          {item.status === "completed"
                            ? "DONE"
                            : item.status === "in-progress"
                              ? "ACTIVE"
                              : "PENDING"}
                        </span>
                        <span className="text-[10px] font-mono text-white/50">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="text-xs mt-2 font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                    <div className="text-[11px] text-white/75 p-4 pt-0">
                      <p>{item.content}</p>
                      <div className="mt-3 pt-2 border-t border-white/10">
                        <div className="flex justify-between items-center text-[10px] mb-1">
                          <span className="flex items-center">
                            <Zap size={9} className="mr-1" />
                            Energy
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>
                      {item.relatedIds.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-white/10">
                          <div className="flex items-center mb-1">
                            <LinkIcon
                              size={9}
                              className="text-white/60 mr-1"
                            />
                            <h4 className="text-[10px] uppercase tracking-wider font-medium text-white/60">
                              Connected
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <button
                                  key={relatedId}
                                  className="flex items-center h-5 px-1.5 py-0 text-[10px] rounded border border-white/20 bg-transparent hover:bg-white/10 text-white/75 hover:text-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-white/50"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
