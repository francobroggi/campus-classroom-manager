import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, Plus, ChevronLeft, ChevronRight, MessageSquare, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const Reservations = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [observations, setObservations] = useState<{[key: string]: string}>({});
  const [showObservationForm, setShowObservationForm] = useState<string | null>(null);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedClassroom, setSelectedClassroom] = useState<string>('');
  const { toast } = useToast();

  const reservations = [
    {
      id: "1",
      date: "26 Oct 2024",
      time: "10:00 AM - 11:00 AM",
      classroom: "Room 201",
      status: "Confirmada",
      observation: ""
    },
    {
      id: "2", 
      date: "1 Nov 2024",
      time: "2:00 PM - 3:00 PM",
      classroom: "Room 305",
      status: "Pendiente",
      observation: ""
    },
    {
      id: "3",
      date: "15 Nov 2024",
      time: "9:00 AM - 10:00 AM", 
      classroom: "Room 102",
      status: "Confirmada",
      observation: "El proyector funcionó perfectamente"
    }
  ];

  const classrooms = [
    { id: "1", name: "Room 101", capacity: 30 },
    { id: "2", name: "Room 201", capacity: 25 },
    { id: "3", name: "Room 305", capacity: 40 },
    { id: "4", name: "Lab A", capacity: 20 },
    { id: "5", name: "Auditorium", capacity: 150 }
  ];

  const getClassroomAvailability = (classroom: string, date: Date) => {
    // Simulated availability data
    const timeSlots = [
      "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
      "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00",
      "16:00 - 17:00", "17:00 - 18:00"
    ];
    
    // Mock some occupied slots
    const occupiedSlots = ["09:00 - 10:00", "14:00 - 15:00"];
    
    return timeSlots.map(slot => ({
      time: slot,
      available: !occupiedSlots.includes(slot),
      professor: occupiedSlots.includes(slot) ? "Dr. Sarah Lee" : null
    }));
  };

  const handleSaveObservation = (reservationId: string) => {
    const observation = observations[reservationId] || '';
    
    toast({
      title: "Observación guardada",
      description: "Su observación ha sido registrada exitosamente",
    });
    
    setShowObservationForm(null);
    setObservations(prev => ({ ...prev, [reservationId]: '' }));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const isDateHighlighted = (day: number) => {
    if (!day) return false;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonthName = monthNames[currentMonth.getMonth()];
    const year = currentMonth.getFullYear();
    
    return reservations.some(reservation => {
      const reservationDate = reservation.date;
      return reservationDate.includes(`${day} ${currentMonthName} ${year}`);
    });
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reservas de Aulas</h1>
            <p className="text-gray-600 mt-1">Gestione sus reservas y vea la disponibilidad</p>
          </div>
          <Link to="/new-reservation">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Reserva
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentMonth).map((day, index) => (
                  <div
                    key={index}
                    className={`text-center p-2 text-sm cursor-pointer hover:bg-gray-100 rounded ${
                      day === 5 ? 'bg-blue-600 text-white hover:bg-blue-700' :
                      isDateHighlighted(day) ? 'bg-blue-100 text-blue-700' : 
                      day ? 'text-gray-900' : 'text-gray-300'
                    }`}
                    onClick={() => {
                      if (day) {
                        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                        setSelectedDate(newDate);
                        setShowAvailabilityModal(true);
                      }
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reservations List */}
          <Card>
            <CardHeader>
              <CardTitle>Mis Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{reservation.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{reservation.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{reservation.classroom}</span>
                      </div>
                    </div>
                    
                    {/* Existing Observation */}
                    {reservation.observation && (
                      <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <MessageSquare className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">Observación:</span>
                        </div>
                        <p className="text-sm text-gray-600">{reservation.observation}</p>
                      </div>
                    )}
                    
                    {/* Observation Form */}
                    {showObservationForm === reservation.id && (
                      <div className="mb-3 space-y-3">
                        <Textarea
                          placeholder="Escriba sus observaciones sobre el aula o materiales utilizados..."
                          value={observations[reservation.id] || ''}
                          onChange={(e) => setObservations(prev => ({ 
                            ...prev, 
                            [reservation.id]: e.target.value 
                          }))}
                          rows={3}
                        />
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleSaveObservation(reservation.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Guardar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setShowObservationForm(null)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowObservationForm(reservation.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {reservation.observation ? 'Editar Observación' : 'Agregar Observación'}
                      </Button>
                      <Link to={`/reservation/${reservation.id}`}>
                        <Button variant="outline" size="sm">Ver Detalles</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Availability Modal */}
        {showAvailabilityModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Disponibilidad de Aulas</h2>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowAvailabilityModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label>Fecha</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <div className="p-3">
                          <div className="grid grid-cols-7 gap-1 mb-4">
                            {dayNames.map(day => (
                              <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                                {day}
                              </div>
                            ))}
                          </div>
                          <div className="grid grid-cols-7 gap-1">
                            {getDaysInMonth(currentMonth).map((day, index) => (
                              <div
                                key={index}
                                className={`text-center p-2 text-sm cursor-pointer hover:bg-gray-100 rounded ${
                                  day ? 'text-gray-900' : 'text-gray-300'
                                }`}
                                onClick={() => {
                                  if (day) {
                                    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                                    setSelectedDate(newDate);
                                  }
                                }}
                              >
                                {day}
                              </div>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Aula</Label>
                    <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar aula" />
                      </SelectTrigger>
                      <SelectContent>
                        {classrooms.map((classroom) => (
                          <SelectItem key={classroom.id} value={classroom.name}>
                            {classroom.name} (Capacidad: {classroom.capacity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedDate && selectedClassroom && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Disponibilidad de {selectedClassroom} - {format(selectedDate, "PPP", { locale: es })}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getClassroomAvailability(selectedClassroom, selectedDate).map((slot, index) => (
                          <div
                            key={index}
                            className={`p-3 border rounded-lg ${
                              slot.available 
                                ? 'border-green-200 bg-green-50' 
                                : 'border-red-200 bg-red-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{slot.time}</span>
                              <Badge 
                                variant={slot.available ? "default" : "secondary"}
                                className={slot.available ? "bg-green-600" : "bg-red-600"}
                              >
                                {slot.available ? "Disponible" : "Ocupado"}
                              </Badge>
                            </div>
                            {slot.professor && (
                              <p className="text-sm text-gray-600 mt-1">
                                Reservado por: {slot.professor}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Reservations;
