
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
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Detalles de Reserva</h1>
            <p className="text-gray-600 mt-1">ID de Reserva: {reservation.id}</p>
          </div>
          
          <div className="flex space-x-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Editar Reserva
            </Button>
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              Cancelar
            </Button>
          </div>
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
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    <Badge variant="default">{reservation.status}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Materials */}
        <Card>
          <CardHeader>
            <CardTitle>Materiales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reservation.materials.map((material, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Eye className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{material.name}</p>
                      <p className="text-sm text-gray-600">Cantidad: {material.quantity}</p>
                    </div>
                  </div>
                  <Badge variant={material.status === 'Available' ? 'default' : 'secondary'}>
                    {material.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Comentarios</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservation.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <Avatar>
                    <AvatarFallback>EC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium">{comment.author}</p>
                      <p className="text-sm text-gray-500">{comment.date}</p>
                    </div>
                    <p className="text-gray-700">{comment.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Observations */}
        <Card>
          <CardHeader>
            <CardTitle>Observaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservation.observations.map((observation) => (
                <div key={observation.id} className="flex space-x-3">
                  <Avatar>
                    <AvatarFallback>FS</AvatarFallback>
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
