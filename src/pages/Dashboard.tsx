
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const recentReservations = [
    {
      id: "1",
      date: "15 Nov 2024",
      time: "10:00 AM - 11:30 AM",
      classroom: "Aula 205",
      course: "Introducción a la Psicología",
      status: "Confirmada"
    },
    {
      id: "2",
      date: "18 Nov 2024",
      time: "2:00 PM - 3:30 PM",
      classroom: "Lab. Computación",
      course: "Análisis de Datos",
      status: "Pendiente"
    },
    {
      id: "3",
      date: "20 Nov 2024",
      time: "9:00 AM - 10:30 AM",
      classroom: "Aula Magna",
      course: "Conferencia Magistral",
      status: "Confirmada"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Bienvenido, {user?.name}
          </h1>
          <p className="text-blue-100">
            Gestione sus reservas de aulas y materiales de manera eficiente
          </p>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Accesos directos a las funciones más utilizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/new-reservation">
                <Button className="w-full h-20 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Nueva Reserva</span>
                </Button>
              </Link>
              
              <Link to="/reservations">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Clock className="h-6 w-6" />
                  <span>Mis Reservas</span>
                </Button>
              </Link>
              
              <Link to="/classrooms-materials">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <MapPin className="h-6 w-6" />
                  <span>Ver Disponibilidad</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reservations */}
        <Card>
          <CardHeader>
            <CardTitle>Reservas Recientes</CardTitle>
            <CardDescription>Sus últimas reservas de aulas y materiales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{reservation.course}</p>
                      <p className="text-sm text-gray-600">{reservation.classroom}</p>
                      <p className="text-sm text-gray-500">{reservation.date} • {reservation.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link to={`/reservation/${reservation.id}`}>
                      <Button variant="ghost" size="sm">Ver Detalles</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
