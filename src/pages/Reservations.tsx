import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, Plus, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Reservations = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [observations, setObservations] = useState<{[key: string]: string}>({});
  const [showObservationForm, setShowObservationForm] = useState<string | null>(null);
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
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{reservation.date}</span>
                      </div>
                      <Badge variant={reservation.status === 'Confirmada' ? 'default' : 'secondary'}>
                        {reservation.status}
                      </Badge>
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
      </div>
    </Layout>
  );
};

export default Reservations;
