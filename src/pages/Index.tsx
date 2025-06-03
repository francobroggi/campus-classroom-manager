
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Settings, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Campus Central</h1>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="ghost">Iniciar Sesión</Button>
              </Link>
              <Link to="/register">
                <Button>Registrarse</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Sistema de Reservas
            <span className="text-blue-600 block">Universitario</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma diseñada exclusivamente para profesores universitarios. 
            Reserve aulas, materiales y gestione sus clases de manera eficiente.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Comenzar Ahora
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Ya tengo cuenta
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Reservas Inteligentes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Reserve aulas y materiales con disponibilidad en tiempo real. 
                Calendario visual y validaciones automáticas.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Gestión de Recursos</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Acceso a laboratorios, salas de computación, proyectores, 
                notebooks y todos los materiales necesarios.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Settings className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Administración</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Control total para administradores. Aprobación de usuarios, 
                gestión de recursos y seguimiento de actividades.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Process */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Proceso Simple
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Registro",
                description: "Complete el formulario de registro como profesor"
              },
              {
                step: "2",
                title: "Aprobación",
                description: "Espere la aprobación del administrador"
              },
              {
                step: "3",
                title: "Acceso",
                description: "Inicie sesión y acceda al sistema"
              },
              {
                step: "4",
                title: "Reservar",
                description: "Reserve aulas y materiales según sus necesidades"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Campus Central. Sistema de Reservas Universitario.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
