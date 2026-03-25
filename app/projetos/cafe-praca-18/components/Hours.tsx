"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock } from "lucide-react";

const schedule = [
  { day: "Segunda-feira", open: "07:30", close: "19:00", status: "normal" },
  { day: "Terça-feira", open: "07:30", close: "19:00", status: "normal" },
  { day: "Quarta-feira", open: "07:30", close: "19:00", status: "normal" },
  { day: "Quinta-feira", open: "07:30", close: "19:00", status: "normal" },
  { day: "Sexta-feira", open: "07:30", close: "20:00", status: "extended" },
  { day: "Sábado", open: "08:00", close: "20:00", status: "extended" },
  { day: "Domingo", open: "08:00", close: "15:00", status: "shorter" },
];

const services = [
  { time: "07:30 – 11:00", label: "Pequeno-Almoço", description: "Tostas, ovos, pastéis, café" },
  { time: "11:00 – 15:00", label: "Almoço", description: "Pratos do dia, petiscos, snacks" },
  { time: "15:00 – 19:00", label: "Tarde", description: "Café, pastelaria, snacks leves" },
];

export default function Hours() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const today = new Date().toLocaleDateString("pt-PT", { weekday: "long" });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <section
      ref={ref}
      id="hours"
      className="py-24 md:py-32 px-6"
      style={{ backgroundColor: "#3C1518" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-3 mb-6"
            style={{ color: "#B5A642" }}
          >
            <div className="w-8 h-px" style={{ backgroundColor: "#B5A642" }} />
            <Clock className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-widest uppercase">
              Horários
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: "#B5A642" }} />
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: "var(--font-domine), serif",
              color: "#E8D5B7",
            }}
          >
            Quando Estamos
            <br />
            <span style={{ color: "#B5A642" }}>à Sua Espera</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Weekly schedule */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ color: "rgba(181,166,66,0.7)" }}
            >
              Horário Semanal
            </h3>

            <div className="space-y-1">
              {schedule.map((item, index) => {
                const isToday = item.day.toLowerCase() === todayCapitalized.toLowerCase();
                return (
                  <motion.div
                    key={item.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.07 }}
                    className="flex items-center justify-between py-3 px-4 rounded-sm"
                    style={{
                      backgroundColor: isToday
                        ? "rgba(181,166,66,0.12)"
                        : "rgba(232,213,183,0.04)",
                      borderLeft: isToday ? "2px solid #B5A642" : "2px solid transparent",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {isToday && (
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: "#B5A642",
                            color: "#3C1518",
                          }}
                        >
                          Hoje
                        </span>
                      )}
                      <span
                        className={`text-sm ${isToday ? "font-semibold" : "font-normal"}`}
                        style={{
                          color: isToday ? "#E8D5B7" : "rgba(232,213,183,0.7)",
                        }}
                      >
                        {item.day}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: isToday ? "#B5A642" : "rgba(181,166,66,0.6)",
                        }}
                      >
                        {item.open} – {item.close}
                      </span>
                      {item.status === "extended" && (
                        <span
                          className="text-xs px-1.5 py-0.5"
                          style={{
                            backgroundColor: "rgba(181,166,66,0.15)",
                            color: "#B5A642",
                            borderRadius: "2px",
                          }}
                        >
                          alargado
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Service times */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ color: "rgba(181,166,66,0.7)" }}
            >
              Serviços
            </h3>

            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.12 }}
                  className="p-6 rounded-sm"
                  style={{
                    backgroundColor: "rgba(232,213,183,0.06)",
                    border: "1px solid rgba(181,166,66,0.12)",
                  }}
                >
                  <div
                    className="text-xs font-semibold tracking-widest uppercase mb-2"
                    style={{ color: "#B5A642" }}
                  >
                    {service.time}
                  </div>
                  <div
                    className="text-lg font-bold mb-1"
                    style={{
                      fontFamily: "var(--font-domine), serif",
                      color: "#E8D5B7",
                    }}
                  >
                    {service.label}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "rgba(232,213,183,0.55)" }}
                  >
                    {service.description}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Reservas note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-6 p-4 rounded-sm"
              style={{
                backgroundColor: "rgba(181,166,66,0.08)",
                border: "1px solid rgba(181,166,66,0.2)",
              }}
            >
              <p
                className="text-sm"
                style={{ color: "rgba(232,213,183,0.7)" }}
              >
                <span style={{ color: "#B5A642", fontWeight: 600 }}>
                  Grupos e reservas —
                </span>{" "}
                Para grupos acima de 8 pessoas, contacte-nos com antecedência.
                Temos espaço para todos.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
