export default function ParticipantList({ participants, onEdit, onDelete }) {
    if (participants.length === 0) {
      return <p className="text-gray-500">Sem participantes ainda.</p>;
    }
    
    return (
      <ul className="space-y-2">
        {participants.map((p, index) => (
          <li
            key={index}
            className="border p-3 rounded bg-white shadow flex justify-between items-center"
          >
            <div>
              <span className="font-medium">{p.name}</span>
              {p.isDriver && (
                <span className="text-sm text-blue-600 ml-2">(condutor)</span>
              )}
            </div>
  
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(index)}
                className="text-sm text-yellow-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-sm text-red-600 hover:underline"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  