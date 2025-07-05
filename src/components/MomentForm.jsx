import { useState, useEffect } from "react";

export default function MomentForm({ participants, onAdd, onUpdate, editingMoment, clearEdit }) {
  const [name, setName] = useState("");
  const [present, setPresent] = useState({});

  useEffect(() => {
    if (editingMoment) {
      setName(editingMoment.name);
      const presenceMap = {};
      editingMoment.present.forEach((p) => (presenceMap[p] = true));
      setPresent(presenceMap);
    }
  }, [editingMoment]);

  function handleToggle(name) {
    setPresent((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    const confirmed = participants
      .filter((p) => present[p.name])
      .map((p) => p.name);

    const newMoment = { name, present: confirmed };

    if (editingMoment) {
      onUpdate(newMoment);
    } else {
      onAdd(newMoment);
    }

    // Limpar estado
    setName("");
    setPresent({});
    clearEdit();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div>
        <label className="block text-sm font-medium">Nome do Momento</label>
        <input
          type="text"
          className="mt-1 w-full border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Participantes Presentes
        </label>
        <div className="flex flex-wrap gap-2">
          {participants.map((p) => (
            <label key={p.name} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={present[p.name] || false}
                onChange={() => handleToggle(p.name)}
              />
              {p.name}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {editingMoment ? "Atualizar" : "Adicionar"}
        </button>
        {editingMoment && (
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
