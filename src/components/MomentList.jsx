export default function MomentList({ moments, onEdit }) {
    if (!moments || moments.length === 0) {
      return <p className="text-gray-500">Sem momentos registados.</p>;
    }
  
    return (
      <ul className="space-y-2">
        {moments.map((moment, index) => (
          <li
            key={index}
            className="border rounded p-3 bg-white shadow-sm flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold">{moment.name}</h4>
              <p className="text-sm text-gray-600">
                Presentes: {(moment.present && moment.present.length > 0)
                  ? moment.present.join(", ")
                  : "Nenhum"}
              </p>
            </div>
  
            <button
              onClick={() => onEdit(index)}
              className="text-sm text-blue-600 hover:underline"
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    );
  }
  