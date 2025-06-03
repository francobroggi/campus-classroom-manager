
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Users, Monitor, Plus, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ClassroomsAndMaterials = () => {
  const { isAdmin } = useAuth();

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
              <Button className="bg-blue-600 hover:bg-blue-700">
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
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
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
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
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

        {/* Add Forms for Admin */}
        {isAdmin && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Classroom Form */}
            <Card>
              <CardHeader>
                <CardTitle>Agregar Nueva Aula</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="classroom-name">Nombre del Aula</Label>
                    <Input id="classroom-name" placeholder="Ej: Room 301" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="classroom-capacity">Capacidad</Label>
                    <Input id="classroom-capacity" type="number" placeholder="30" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="classroom-location">Ubicación</Label>
                    <Input id="classroom-location" placeholder="Ej: Main Building, 3rd Floor" />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Agregar Aula
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Add Material Form */}
            <Card>
              <CardHeader>
                <CardTitle>Agregar Nuevo Material</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="material-name">Nombre del Material</Label>
                    <Input id="material-name" placeholder="Ej: Laptop" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="material-quantity">Cantidad</Label>
                    <Input id="material-quantity" type="number" placeholder="5" />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Agregar Material
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClassroomsAndMaterials;
