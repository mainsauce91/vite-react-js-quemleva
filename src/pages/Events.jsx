import { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import MomentForm from "../components/MomentForm";
import MomentList from "../components/MomentList";
import ParticipantForm from "../components/ParticipantForm";
import ParticipantList from "../components/ParticipantList";

export default function Events() {
  const [editingMomentIndex, setEditingMomentIndex] = useState(null);
  const [selectedTab, setSelectedTab] = useState("participants");
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [events, setEvents] = useState([
    {
      name: "Festa de Aniversário",
      startDate: "2025-07-10",
      endDate: "2025-07-10",
      startTime: "19:00",
      endTime: "23:30",
      participants: [
        {name: "Andreia", isDriver: false},
        {name: "Sá",      isDriver: true },
        {name: "Mariana", isDriver: false}
      ],
      moments: []
    },
    {
      name: "Convivios Eternos: Carollipa",
      startDate: "2025-07-04",
      endDate: "2025-07-06",
      startTime: "19:00",
      endTime: "19:00",
      participants: [
        {name: "Filipa",   isDriver: true },
        {name: "Carolina", isDriver: false},
        {name: "Fernando", isDriver: true },
        {name: "Cátia",    isDriver: false},
        {name: "Rita",     isDriver: false},
        {name: "Nuno",     isDriver: false},
        {name: "Benedita", isDriver: false},
        {name: "Andreia",  isDriver: false},
        {name: "Sá",       isDriver: true },
        {name: "Mariana",  isDriver: false},
        {name: "Lopes",    isDriver: true },
        {name: "Machado",  isDriver: true },
        {name: "Marta",    isDriver: false},
        {name: "Bernardo", isDriver: true }
      ],
      moments: [
        {
          name: "Jantar de Sexta",
          present: [
            "Filipa",   "Carolina", "Cátia",    "Rita",     "Nuno",
            "Benedita", "Lopes"
          ]
        },
        {
          name: "Pequeno-Almoço de Sábado",
          present: [
            "Filipa",   "Carolina", "Fernando", "Cátia",    "Rita",
            "Nuno",     "Benedita", "Lopes",    "Marta",    "Bernardo"
          ]
        },
        {
          name: "Almoço de Sábado",
          present: [
            "Filipa",   "Carolina", "Fernando", "Cátia",    "Rita",
            "Nuno",     "Benedita", "Lopes",    "Machado",  "Marta",    "Bernardo"
          ]
        },
        {
          name: "Lanche de Sábado",
          present: [
            "Filipa",   "Carolina", "Fernando", "Cátia",    "Rita",
            "Nuno",     "Benedita", "Lopes",    "Machado",  "Marta",    "Bernardo"
          ]
        },
        {
          name: "Jantar de Sábado",
          present: [
            "Filipa",   "Carolina", "Fernando", "Cátia",    "Rita",
            "Nuno",     "Benedita", "Andreia",  "Sá",       "Mariana",
            "Machado",  "Marta",    "Bernardo"
          ]
        },
        {
          name: "Pequeno-Almoço de Domingo",
          present: [
            "Filipa",   "Carolina", "Fernando", "Cátia",    "Rita",
            "Nuno",     "Benedita", "Andreia",  "Sá",       "Mariana",
            "Machado",  "Marta",    "Bernardo"
          ]
        },
        {
          name: "Almoço de Domingo",
          present: [
            "Filipa",   "Carolina", "Fernando", "Cátia",    "Rita",
            "Nuno",     "Benedita", "Machado",  "Marta",    "Bernardo"
          ]
        },
        {
          name: "Lanche de Domingo",
          present: [
            "Filipa",   "Carolina", "Fernando", "Cátia",    "Rita",
            "Nuno",     "Benedita", "Machado",  "Marta",    "Bernardo"
          ]
        }
      ]
    },
    {
      name: "Convivio de Solteiros Misto: V&R",
      startDate: "2025-07-12",
      endDate: "2025-07-12",
      startTime: "11:00",
      endTime: "23:00",
      participants: [
        {name: "Fernandes", isDriver: false},
        {name: "Valéria",   isDriver: true },
        {name: "Bruno",     isDriver: false},
        {name: "Mendes",    isDriver: false},
        {name: "Gil",       isDriver: false},
        {name: "Cabeceiro", isDriver: false},
        {name: "Margarida", isDriver: false},
        {name: "Beatriz",   isDriver: true },
        {name: "Jéssica",   isDriver: false}
      ],
      moments: []
    }
  ]
  );
  
  // ← Carregar eventos do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("quemleva-events");
    if (stored) {
      setEvents(JSON.parse(stored));
    }
  }, []);

  // ← Guardar eventos no localStorage sempre que mudam
  useEffect(() => {
    localStorage.setItem("quemleva-events", JSON.stringify(events));
  }, [events]);

  //#region Participant
  const selectedEvent = events[selectedEventIndex];

  function handleAddEvent(event) {
    setEvents([...events, { ...event, participants: [] }]);
  }

  function handleAddParticipant(participant) {
    const updatedEvents = [...events];
    updatedEvents[selectedEventIndex].participants.push(participant);
    setEvents(updatedEvents);
  }
  
  function handleEdit(index) {
    setEditingIndex(index);
  }
  
  function handleUpdateParticipant(updated) {
    const updatedEvents = [...events];
    const updatedParticipants = [...selectedEvent.participants];
    updatedParticipants[editingIndex] = updated;
    updatedEvents[selectedEventIndex].participants = updatedParticipants;
    setEvents(updatedEvents);
    setEditingIndex(null);
  }
  
  function handleDelete(index) {
    const updatedEvents = [...events];
    updatedEvents[selectedEventIndex].participants = selectedEvent.participants.filter(
      (_, i) => i !== index
    );
    setEvents(updatedEvents);
  }
  //#endregion Participant

  //#region Moments
  function handleAddMoment(moment) {
    const updated = events.map((event, index) =>
      index === selectedEventIndex
        ? {
            ...event,
            moments: [...(event.moments || []), moment],
          }
        : event
    );
    setEvents(updated);
  }
  function handleEditMoment(index) {
    setEditingMomentIndex(index);
  }
  
  function handleUpdateMoment(updatedMoment) {
    const updatedEvents = [...events];
    const updatedMoments = [...(selectedEvent.moments || [])];
    updatedMoments[editingMomentIndex] = updatedMoment;
    updatedEvents[selectedEventIndex].moments = updatedMoments;
    setEvents(updatedEvents);
    setEditingMomentIndex(null);
  }
  
  //#endregion Participant
  
  

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">Eventos</h2>
      
      <EventForm onAdd={handleAddEvent} />
  
      <div>
        <h3 className="text-lg font-semibold mb-2">Lista de Eventos</h3>
        {events.map((event, index) => (
          <div
            key={index}
            className={`p-3 border rounded mb-2 cursor-pointer ${
              selectedEventIndex === index ? "bg-blue-100" : "bg-white"
            }`}
            onClick={() => setSelectedEventIndex(index)}
          >
            <div className="font-medium">{event.name}</div>
            <div className="text-sm text-gray-600">
              {event.startDate} {event.startTime}
              {event.endDate && ` → ${event.endDate} ${event.endTime || ""}`}
            </div>
          </div>
        ))}
      </div>
  
      {/* Tabs e conteúdos */}
      {selectedEvent && (
        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">
            Evento: "{selectedEvent.name}"
          </h3>
  
          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded ${
                selectedTab === "participants"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setSelectedTab("participants")}
            >
              Participantes
            </button>
  
            <button
              className={`px-4 py-2 rounded ${
                selectedTab === "moments"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setSelectedTab("moments")}
            >
              Momentos
            </button>
          </div>
  
          {selectedTab === "participants" && (
            <>
              <ParticipantForm
                onAdd={handleAddParticipant}
                onUpdate={handleUpdateParticipant}
                editingParticipant={
                  editingIndex !== null
                    ? selectedEvent.participants[editingIndex]
                    : null
                }
                clearEdit={() => setEditingIndex(null)}
              />
              <ParticipantList
                participants={selectedEvent.participants}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </>
          )}
  
          {selectedTab === "moments" && (
            <>
              <MomentForm
                participants={selectedEvent.participants}
                onAdd={handleAddMoment}
                onUpdate={handleUpdateMoment}
                editingMoment={
                  editingMomentIndex !== null
                    ? selectedEvent.moments[editingMomentIndex]
                    : null
                }
                clearEdit={() => setEditingMomentIndex(null)}
              />
              <MomentList
                moments={selectedEvent.moments || []}
                onEdit={handleEditMoment}
              />
            </>
          )}
        </div>
      )}
    </div>
  );

}
