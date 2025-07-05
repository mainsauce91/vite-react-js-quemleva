import { useState } from "react";

export default function EventForm({ onAdd }) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !startDate || !startTime) return;

    const newEvent = {
      name,
      startDate,
      endDate,
      startTime,
      endTime,
      participants: [],
    };

    onAdd(newEvent);

    // Limpar campos
    setName("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium">Nome do Evento</label>
        <input
          type="text"
          className="mt-1 w-full border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium">Data de Início</label>
          <input
            type="date"
            className="mt-1 w-full border rounded p-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium">Data de Fim</label>
          <input
            type="date"
            className="mt-1 w-full border rounded p-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium">Hora de Início</label>
          <input
            type="time"
            className="mt-1 w-full border rounded p-2"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium">Hora de Fim</label>
          <input
            type="time"
            className="mt-1 w-full border rounded p-2"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Criar Evento
      </button>
    </form>
  );
}
