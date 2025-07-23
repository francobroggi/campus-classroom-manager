
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, MapPin, User, MessageSquare, Eye } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const ReservationDetails = () => {
  const { id } = useParams();

  // Mock reservation data
  const reservation = {
    id: "20240715-1234",
    classroom: "Room 205",
    date: "July 15, 2024",
    time: "10:00 AM - 11:30 AM",
    course: "Introduction to Psychology",
    instructor: "Dr. Emily Carter",
    status: "Confirmed",
    materials: [
      { name: "Projector", quantity: 1, status: "Available" },
      { name: "Whiteboard Markers", quantity: 5, status: "Available" },
      { name: "Laptop", quantity: 1, status: "Checked Out" }
    ],
    comments: [
      {
        id: 1,
        author: "Dr. Emily Carter",
        date: "July 14, 2024, 2:30 PM",
        message: "Please ensure the projector is set up before the class begins."
      }
    ],
    observations: [
      {
        id: 1,
        author: "Facilities Staff",
        date: "July 15, 2024, 9:45 AM", 
        message: "Projector is set up and ready for use. Whiteboard markers are also in place."
      }
    ]
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detalles de Reserva</h1>
          <p className="text-gray-600 mt-1">ID de Reserva: {reservation.id}</p>
        </div>

        {/* Reservation Information */}
        <Card>
          <CardHeader>
            <CardTitle>Información de la Reserva</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Aula</p>
                    <p className="font-semibold">{reservation.classroom}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Fecha</p>
                    <p className="font-semibold">{reservation.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Horario</p>
                    <p className="font-semibold">{reservation.time}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Materia</p>
                    <p className="font-semibold">{reservation.course}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Instructor</p>
                    <p className="font-semibold">{reservation.instructor}</p>
                  </div>
                </div>
                
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Observations */}
        <Card>
          <CardHeader>
            <CardTitle>Observaciones del Profesor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservation.observations
                .filter(observation => observation.author.includes('Dr.') || observation.author.includes('Prof.'))
                .map((observation) => (
                <div key={observation.id} className="flex space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {observation.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium">{observation.author}</p>
                      <p className="text-sm text-gray-500">{observation.date}</p>
                    </div>
                    <p className="text-gray-700">{observation.message}</p>
                  </div>
                </div>
              ))}
              {reservation.observations.filter(observation => observation.author.includes('Dr.') || observation.author.includes('Prof.')).length === 0 && (
                <p className="text-gray-500 text-center py-4">No hay observaciones del profesor para esta reserva.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center">
          <Link to="/reservations">
            <Button variant="outline">
              Volver a Reservas
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ReservationDetails;
