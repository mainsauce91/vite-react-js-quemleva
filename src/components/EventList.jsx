export default function EventList({ events }) {
    if (events.length === 0) {
      return <p className="text-gray-500">Nenhum evento criado ainda.</p>;
    }
  
    return (
      <ul className="space-y-2">
        {events.map((event, index) => (
          <li
            key={index}
            className="border rounded p-3 bg-white shadow-sm"
          >
            <h3 className="font-semibold text-lg">{event.name}</h3>
            <p className="text-sm text-gray-600">{event.date}</p>
          </li>
        ))}
      </ul>
    );
  }
  