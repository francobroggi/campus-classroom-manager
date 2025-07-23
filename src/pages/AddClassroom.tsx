import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AddClassroom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    capacity: '',
    location: '',
    floor: '',
    equipment: '',
    description: ''
  });

  const classroomTypes = [
    { value: 'laboratory', label: 'Laboratorio' },
    { value: 'computer-room', label: 'Sala de Computación' },
    { value: 'normal-classroom', label: 'Aula Normal' },
    { value: 'auditorium', label: 'Aula Magna' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Aula agregada",
      description: "El aula ha sido agregada exitosamente al sistema",
    });
    
    navigate('/admin/classrooms-materials');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agregar Nueva Aula</h1>
          <p className="text-gray-600 mt-1">Complete los datos para agregar un aula al sistema</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del Aula</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Aula</Label>
                  <Input
                    id="name"
                    placeholder="Ej: Aula 101"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Aula</Label>
                  <Select value={formData.type} onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, type: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {classroomTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidad</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Ej: 30"
                  value={formData.capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment">Equipamiento Fijo</Label>
                <Input
                  id="equipment"
                  placeholder="Ej: Proyector, Aire acondicionado, Pizarra digital"
                  value={formData.equipment}
                  onChange={(e) => setFormData(prev => ({ ...prev, equipment: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Descripción adicional del aula..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/admin/classrooms-materials')}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Agregar Aula
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddClassroom;