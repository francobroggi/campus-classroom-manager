
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const NewReservation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    classroomType: '',
    date: '',
    startTime: '',
    endTime: '',
    course: '',
    materials: {
      projectors: false,
      notebooks: false,
      microphones: false,
      speakers: false,
      markers: false,
      whiteboards: false
    },
    quantities: {
      projectors: 0,
      notebooks: 0,
      microphones: 0,
      speakers: 0,
      markers: 0,
      whiteboards: 0
    }
  });

  const classroomTypes = [
    { value: 'laboratory', label: 'Laboratorio' },
    { value: 'computer-room', label: 'Sala de Computación' },
    { value: 'normal-classroom', label: 'Aula Normal' },
    { value: 'auditorium', label: 'Aula Magna' }
  ];

  const materials = [
    { key: 'projectors', label: 'Proyectores', available: 5 },
    { key: 'notebooks', label: 'Notebooks', available: 10 },
    { key: 'microphones', label: 'Micrófonos', available: 8 },
    { key: 'speakers', label: 'Altavoces', available: 6 },
    { key: 'markers', label: 'Fibrones', available: 15 },
    { key: 'whiteboards', label: 'Pizarras', available: 3 }
  ];

  const handleMaterialChange = (materialKey: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      materials: {
        ...prev.materials,
        [materialKey]: checked
      },
      quantities: {
        ...prev.quantities,
        [materialKey]: checked ? 1 : 0
      }
    }));
  };

  const handleQuantityChange = (materialKey: string, quantity: number) => {
    setFormData(prev => ({
      ...prev,
      quantities: {
        ...prev.quantities,
        [materialKey]: quantity
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Reserva enviada",
      description: "Su reserva ha sido enviada para confirmación",
    });
    
    navigate('/reservations');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nueva Reserva</h1>
          <p className="text-gray-600 mt-1">Complete el formulario para reservar aulas y materiales</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="classroomType">Tipo de Aula</Label>
                  <Select value={formData.classroomType} onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, classroomType: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de aula" />
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

                <div className="space-y-2">
                  <Label htmlFor="course">Materia/Curso</Label>
                  <Input
                    id="course"
                    placeholder="Ej: Introducción a la Psicología"
                    value={formData.course}
                    onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Hora de Inicio</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">Hora de Fin</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Materials */}
          <Card>
            <CardHeader>
              <CardTitle>Materiales Adicionales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {materials.map(material => (
                  <div key={material.key} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={material.key}
                        checked={formData.materials[material.key as keyof typeof formData.materials]}
                        onCheckedChange={(checked) => handleMaterialChange(material.key, checked as boolean)}
                      />
                      <Label htmlFor={material.key} className="font-medium">
                        {material.label}
                      </Label>
                    </div>
                    
                    {formData.materials[material.key as keyof typeof formData.materials] && (
                      <div className="ml-6 space-y-2">
                        <p className="text-sm text-gray-600">
                          Disponibles: {material.available}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`${material.key}-quantity`} className="text-sm">
                            Cantidad:
                          </Label>
                          <Input
                            id={`${material.key}-quantity`}
                            type="number"
                            min="1"
                            max={material.available}
                            value={formData.quantities[material.key as keyof typeof formData.quantities]}
                            onChange={(e) => handleQuantityChange(material.key, parseInt(e.target.value) || 0)}
                            className="w-20"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/reservations')}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Enviar Reserva
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewReservation;
