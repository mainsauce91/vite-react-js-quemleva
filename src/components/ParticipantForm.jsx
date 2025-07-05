import { useState, useEffect } from "react";

export default function ParticipantForm({ onAdd, onUpdate, editingParticipant, clearEdit }) {
  const [name, setName] = useState("");
  const [isDriver, setIsDriver] = useState(false);

  useEffect(() => {
    if (editingParticipant) {
      setName(editingParticipant.name);
      setIsDriver(editingParticipant.isDriver);
    }
  }, [editingParticipant]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    const participant = { name, isDriver };

    if (editingParticipant) {
      onUpdate(participant);
    } else {
      onAdd(participant);
    }

    setName("");
    setIsDriver(false);
    clearEdit();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input
          type="text"
          className="mt-1 w-full border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          checked={isDriver}
          onChange={(e) => setIsDriver(e.target.checked)}
        />
        Leva carro
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editingParticipant ? "Atualizar" : "Adicionar"}
        </button>

        {editingParticipant && (
          <button
            type="button"
            onClick={clearEdit}
            className="text-sm text-gray-500 underline"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
