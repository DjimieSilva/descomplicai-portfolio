"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = "alta" | "media" | "baixa";
type ColumnId = "todo" | "doing" | "done";

interface Task {
  id: string;
  text: string;
  priority: Priority;
  createdAt: string;
  columnId: ColumnId;
}

interface Column {
  id: ColumnId;
  title: string;
  accent: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COLUMNS: Column[] = [
  {
    id: "todo",
    title: "A Fazer 📝",
    accent: "#3b82f6",
    accentBg: "bg-blue-50",
    accentText: "text-blue-700",
    accentBorder: "border-blue-400",
  },
  {
    id: "doing",
    title: "Em Progresso 🔄",
    accent: "#f59e0b",
    accentBg: "bg-amber-50",
    accentText: "text-amber-700",
    accentBorder: "border-amber-400",
  },
  {
    id: "done",
    title: "Concluído ✅",
    accent: "#22c55e",
    accentBg: "bg-green-50",
    accentText: "text-green-700",
    accentBorder: "border-green-400",
  },
];

const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; dot: string; badge: string }
> = {
  alta: {
    label: "🔴 Alta",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-700",
  },
  media: {
    label: "🟡 Média",
    dot: "bg-amber-400",
    badge: "bg-amber-100 text-amber-700",
  },
  baixa: {
    label: "🟢 Baixa",
    dot: "bg-green-500",
    badge: "bg-green-100 text-green-700",
  },
};

const DEMO_TASKS: Task[] = [
  {
    id: "demo-1",
    text: "Redesenhar a página inicial",
    priority: "alta",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    columnId: "todo",
  },
  {
    id: "demo-2",
    text: "Escrever artigo para o blog",
    priority: "media",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    columnId: "todo",
  },
  {
    id: "demo-3",
    text: "Implementar dark mode",
    priority: "baixa",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    columnId: "doing",
  },
  {
    id: "demo-4",
    text: "Rever feedback dos utilizadores",
    priority: "alta",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    columnId: "doing",
  },
  {
    id: "demo-5",
    text: "Publicar nova ferramenta",
    priority: "media",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    columnId: "done",
  },
];

const LS_KEY = "descomplicai-kanban-tasks";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-PT", { day: "2-digit", month: "short" });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  isDragging: boolean;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

function TaskCard({
  task,
  onDelete,
  onEdit,
  isDragging,
  onDragStart,
}: TaskCardProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);
  const p = PRIORITY_CONFIG[task.priority];

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function commitEdit() {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== task.text) {
      onEdit(task.id, trimmed);
    } else {
      setEditText(task.text);
    }
    setEditing(false);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      draggable
      onDragStart={(e) => onDragStart(e as unknown as React.DragEvent, task.id)}
      className={`group relative bg-white rounded-xl shadow-sm border border-gray-100 p-3 cursor-grab active:cursor-grabbing select-none transition-all duration-200 hover:shadow-md ${
        isDragging ? "opacity-40 ring-2 ring-blue-300 scale-95" : ""
      }`}
    >
      {/* Priority dot */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <span
            className={`mt-1.5 shrink-0 w-2 h-2 rounded-full ${p.dot}`}
          />
          {editing ? (
            <input
              ref={inputRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitEdit();
                if (e.key === "Escape") {
                  setEditText(task.text);
                  setEditing(false);
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 text-sm text-gray-800 bg-blue-50 border border-blue-300 rounded px-1.5 py-0.5 outline-none focus:ring-1 focus:ring-blue-400"
            />
          ) : (
            <span
              className="flex-1 text-sm text-gray-800 leading-snug cursor-text"
              onClick={() => setEditing(true)}
              title="Clica para editar"
            >
              {task.text}
            </span>
          )}
        </div>

        {/* Delete button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-red-500 text-base leading-none mt-0.5"
          title="Eliminar tarefa"
        >
          🗑️
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
        <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-full ${p.badge}`}>
          {p.label}
        </span>
        <span className="text-[11px] text-gray-400">{formatDate(task.createdAt)}</span>
      </div>
    </motion.div>
  );
}

// ─── AddTaskForm ───────────────────────────────────────────────────────────────

interface AddTaskFormProps {
  onAdd: (text: string, priority: Priority) => void;
  onClose: () => void;
}

function AddTaskForm({ onAdd, onClose }: AddTaskFormProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("media");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed, priority);
    setText("");
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-blue-200 shadow-sm p-3 space-y-2"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        placeholder="Descreve a tarefa..."
        className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
      />
      <div className="flex gap-1">
        {(["alta", "media", "baixa"] as Priority[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPriority(p)}
            className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-all ${
              priority === p
                ? "bg-gray-800 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {PRIORITY_CONFIG[p].label}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex-1 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-200 text-white rounded-lg py-1.5 font-medium transition-colors"
        >
          Adicionar
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-3 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg py-1.5 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </motion.form>
  );
}

// ─── KanbanColumn ──────────────────────────────────────────────────────────────

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  draggingId: string | null;
  dragOverCol: ColumnId | null;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent, colId: ColumnId) => void;
  onDrop: (e: React.DragEvent, colId: ColumnId) => void;
  onDragLeave: () => void;
  onAddTask: (colId: ColumnId, text: string, priority: Priority) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newText: string) => void;
  onClearDone?: () => void;
}

function KanbanColumn({
  column,
  tasks,
  draggingId,
  dragOverCol,
  onDragStart,
  onDragOver,
  onDrop,
  onDragLeave,
  onAddTask,
  onDeleteTask,
  onEditTask,
  onClearDone,
}: KanbanColumnProps) {
  const [showForm, setShowForm] = useState(false);
  const isOver = dragOverCol === column.id;

  function handleAdd(text: string, priority: Priority) {
    onAddTask(column.id, text, priority);
    setShowForm(false);
  }

  return (
    <motion.div
      layout
      className={`flex flex-col rounded-2xl min-h-[400px] transition-all duration-200 ${
        isOver
          ? `ring-2 ${column.accentBorder} ring-offset-2 bg-opacity-80`
          : ""
      }`}
      style={{
        background: isOver ? `${column.accent}08` : "#f3f4f6",
      }}
      onDragOver={(e) => onDragOver(e, column.id)}
      onDrop={(e) => onDrop(e, column.id)}
      onDragLeave={onDragLeave}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 pt-4 pb-3"
        style={{ borderBottom: `2px solid ${column.accent}30` }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: column.accent }}
          />
          <h2 className="font-semibold text-gray-800 text-sm">{column.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {column.id === "done" && tasks.length > 0 && onClearDone && (
            <button
              onClick={onClearDone}
              className="text-[11px] text-gray-400 hover:text-red-500 transition-colors font-medium"
              title="Limpar tarefas concluídas"
            >
              Limpar
            </button>
          )}
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${column.accentBg} ${column.accentText}`}
          >
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Add task button */}
      <div className="px-3 pt-3">
        <AnimatePresence mode="wait">
          {showForm ? (
            <AddTaskForm
              key="form"
              onAdd={handleAdd}
              onClose={() => setShowForm(false)}
            />
          ) : (
            <motion.button
              key="btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(true)}
              className={`w-full text-sm text-left px-3 py-2 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-all duration-200 flex items-center gap-1.5`}
            >
              <span className="text-base leading-none">+</span>
              <span>Adicionar tarefa</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Task list */}
      <div className="flex-1 px-3 pt-2 pb-4 space-y-2 overflow-y-auto">
        <AnimatePresence initial={false}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isDragging={draggingId === task.id}
              onDragStart={onDragStart}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))}
        </AnimatePresence>

        {tasks.length === 0 && !showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-300 text-sm select-none"
          >
            {isOver ? "Larga aqui ✨" : "Sem tarefas"}
          </motion.div>
        )}

        {/* Drop zone indicator when dragging */}
        {isOver && draggingId && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 48 }}
            className="rounded-xl border-2 border-dashed"
            style={{ borderColor: column.accent }}
          />
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<ColumnId | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Task[];
        setTasks(parsed);
      } else {
        setTasks(DEMO_TASKS);
      }
    } catch {
      setTasks(DEMO_TASKS);
    }
    setHydrated(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(LS_KEY, JSON.stringify(tasks));
  }, [tasks, hydrated]);

  const getColumnTasks = useCallback(
    (colId: ColumnId) => tasks.filter((t) => t.columnId === colId),
    [tasks]
  );

  function handleAddTask(colId: ColumnId, text: string, priority: Priority) {
    const newTask: Task = {
      id: uid(),
      text,
      priority,
      createdAt: new Date().toISOString(),
      columnId: colId,
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function handleDeleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function handleEditTask(id: string, newText: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  }

  function handleClearDone() {
    setTasks((prev) => prev.filter((t) => t.columnId !== "done"));
  }

  // Drag handlers
  function handleDragStart(e: React.DragEvent, taskId: string) {
    setDraggingId(taskId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("taskId", taskId);
  }

  function handleDragOver(e: React.DragEvent, colId: ColumnId) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverCol(colId);
  }

  function handleDrop(e: React.DragEvent, colId: ColumnId) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, columnId: colId } : t))
    );
    setDraggingId(null);
    setDragOverCol(null);
  }

  function handleDragLeave() {
    setDragOverCol(null);
  }

  function handleDragEnd() {
    setDraggingId(null);
    setDragOverCol(null);
  }

  const totalTasks = tasks.length;
  const doneTasks = getColumnTasks("done").length;

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f9fafb" }}
      onDragEnd={handleDragEnd}
    >
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Quadro Kanban 📋
          </h1>
          <p className="mt-1 text-gray-500">Organiza as tuas tarefas</p>

          {/* Progress bar */}
          {totalTasks > 0 && (
            <div className="mt-4 flex items-center gap-3 max-w-xs">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.round((doneTasks / totalTasks) * 100)}%`,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
              </div>
              <span className="text-xs text-gray-500 shrink-0">
                {doneTasks}/{totalTasks} concluídas
              </span>
            </div>
          )}
        </div>

        {/* Columns grid */}
        {hydrated ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COLUMNS.map((col) => (
              <KanbanColumn
                key={col.id}
                column={col}
                tasks={getColumnTasks(col.id)}
                draggingId={draggingId}
                dragOverCol={dragOverCol}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
                onClearDone={col.id === "done" ? handleClearDone : undefined}
              />
            ))}
          </div>
        ) : (
          // Skeleton while hydrating
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-gray-100 animate-pulse h-64"
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-300">
          Os dados ficam guardados no teu browser · Descomplicai
        </p>
      </div>
    </div>
  );
}
