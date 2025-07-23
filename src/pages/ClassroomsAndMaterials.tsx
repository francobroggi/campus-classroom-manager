
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin, Users, Monitor, Plus, Edit, Calendar as CalendarIcon, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const ClassroomsAndMaterials = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { toast } = useToast();

  const classrooms = [
    {
      id: 1,
      name: "Room 101",
      capacity: 30,
      location: "Main Building, 1st Floor",
      type: "Normal",
      status: "Available"
    },
    {
      id: 2,
      name: "Room 205", 
      capacity: 25,
      location: "Science Wing, 2nd Floor",
      type: "Laboratory",
      status: "Available"
    },
    {
      id: 3,
      name: "Auditorium A",
      capacity: 150,
      location: "Performing Arts Center", 
      type: "Auditorium",
      status: "Available"
    }
  ];

  const materials = [
    {
      id: 1,
      name: "Projector",
      quantity: 5,
      status: "Available"
    },
    {
      id: 2,
      name: "Whiteboard Markers",
      quantity: 100,
      status: "Available" 
    },
    {
      id: 3,
      name: "Microphones",
      quantity: 10,
      status: "Available"
    }
  ];

  const reservationsForSelectedDate = [
    {
      id: 1,
      time: "09:00 - 10:30",
      classroom: "Room 101",
      professor: "Dr. Sarah Lee",
      course: "Matemáticas Avanzadas",
      materials: ["Proyector"]
    },
    {
      id: 2,
      time: "14:00 - 15:30",
      classroom: "Lab. Computación",
      professor: "Prof. David Chen",
      course: "Programación",
      materials: ["Micrófonos", "Notebooks"]
    },
    {
      id: 3,
      time: "16:00 - 17:30",
      classroom: "Aula Magna",
      professor: "Dr. Emily Carter",
      course: "Conferencia",
      materials: ["Proyector", "Altavoces"]
    }
  ];

  const handleDeleteClassroom = (classroomId: number, classroomName: string) => {
    toast({
      title: "Aula eliminada",
      description: `${classroomName} ha sido eliminada exitosamente`,
    });
  };

  const handleDeleteMaterial = (materialId: number, materialName: string) => {
    toast({
      title: "Material eliminado",
      description: `${materialName} ha sido eliminado exitosamente`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Aulas y Materiales</h1>
            <p className="text-gray-600 mt-1">Gestione los recursos disponibles en el campus</p>
          </div>
          {isAdmin && (
            <div className="flex space-x-2">
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate('/admin/add-classroom')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Agregar Aula
              </Button>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Material
              </Button>
            </div>
          )}
        </div>

        {/* Date Selector for Availability */}
        <Card>
          <CardHeader>
            <CardTitle>Ver Disponibilidad por Día</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Label htmlFor="date-picker">Seleccionar fecha:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Reservations for Selected Date */}
        <Card>
          <CardHeader>
            <CardTitle>
              Reservas para {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Hoy"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservationsForSelectedDate.map((reservation) => (
                <div key={reservation.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CalendarIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{reservation.course}</p>
                        <p className="text-sm text-gray-600">{reservation.professor}</p>
                        <p className="text-sm text-gray-500">{reservation.classroom} • {reservation.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">Materiales:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {reservation.materials.map((material, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Classrooms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Aulas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classrooms.map((classroom) => (
                  <div key={classroom.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{classroom.name}</h3>
                      {isAdmin && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteClassroom(classroom.id, classroom.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Capacidad: {classroom.capacity}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{classroom.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline">{classroom.type}</Badge>
                        <Badge variant={classroom.status === 'Available' ? 'default' : 'secondary'}>
                          {classroom.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Materials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5" />
                <span>Materiales</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materials.map((material) => (
                  <div key={material.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{material.name}</h3>
                      {isAdmin && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteMaterial(material.id, material.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Cantidad: {material.quantity}
                      </span>
                      <Badge variant={material.status === 'Available' ? 'default' : 'secondary'}>
                        {material.status}
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

export default ClassroomsAndMaterials;
