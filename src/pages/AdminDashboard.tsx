
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Calendar, Settings, TrendingUp, Clock, MapPin } from 'lucide-react';

const AdminDashboard = () => {
  const pendingRegistrations = [
    {
      id: 1,
      name: "Dr. Robert Green",
      email: "robert.green@university.edu",
      date: "2024-07-24",
      department: "Computer Science"
    },
    {
      id: 2,
      name: "Prof. Maria Rodriguez",
      email: "maria.rodriguez@university.edu", 
      date: "2024-07-23",
      department: "Mathematics"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      teacher: "Dr. Sarah Lee",
      action: "Reserved Classroom",
      details: "Room 201, Projector",
      date: "2024-07-26"
    },
    {
      id: 2,
      teacher: "Prof. David Chen",
      action: "Requested Material",
      details: "Microscope",
      date: "2024-07-25"
    },
    {
      id: 3,
      teacher: "Dr. Robert Green",
      action: "Registered",
      details: "New Teacher",
      date: "2024-07-24"
    }
  ];

  const stats = [
    {
      title: "Total de Profesores",
      value: "45",
      description: "Activos en el sistema",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Reservas Activas",
      value: "23",
      description: "Este mes",
      icon: Calendar,
      color: "text-green-600"
    },
    {
      title: "Aulas Disponibles",
      value: "18",
      description: "De 25 total",
      icon: MapPin,
      color: "text-purple-600"
    },
    {
      title: "Registros Pendientes",
      value: "2",
      description: "Esperando aprobación",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-indigo-100">
            Gestione usuarios, recursos y supervise la actividad del sistema
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                    <div className={`${stat.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Accesos directos a las funciones administrativas más utilizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="h-16 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center space-y-2">
                <Users className="h-6 w-6" />
                <span>Gestionar Aulas</span>
              </Button>
              
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
                <Settings className="h-6 w-6" />
                <span>Gestionar Materiales</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Registrations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Registros Pendientes</span>
              </CardTitle>
              <CardDescription>Nuevos profesores esperando aprobación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRegistrations.map((registration) => (
                  <div key={registration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {registration.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{registration.name}</p>
                        <p className="text-sm text-gray-600">{registration.email}</p>
                        <p className="text-xs text-gray-500">{registration.department}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Aprobar
                      </Button>
                      <Button size="sm" variant="outline">
                        Rechazar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Actividad Reciente</span>
              </CardTitle>
              <CardDescription>Últimas acciones en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.teacher}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{activity.date}</p>
                      <Badge variant="outline" className="text-xs">
                        {activity.action.includes('Reserved') ? 'Reserva' :
                         activity.action.includes('Requested') ? 'Solicitud' : 'Registro'}
                      </Badge>
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

export default AdminDashboard;
