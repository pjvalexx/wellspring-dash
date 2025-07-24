import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductionDataForm } from "@/components/admin/ProductionDataForm";
import { StationDataForm } from "@/components/admin/StationDataForm";
import { WellStatusForm } from "@/components/admin/WellStatusForm";
import { HistoricalDataForm } from "@/components/admin/HistoricalDataForm";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Panel de Administración
            </h1>
            <p className="text-muted-foreground">
              Gestión y carga de datos de producción
            </p>
          </div>
        </div>

        {/* Forms Tabs */}
        <Tabs defaultValue="production" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="production">Producción Diaria</TabsTrigger>
            <TabsTrigger value="stations">Datos por Estación</TabsTrigger>
            <TabsTrigger value="wells">Estado de Pozos</TabsTrigger>
            <TabsTrigger value="historical">Datos Históricos</TabsTrigger>
          </TabsList>

          <TabsContent value="production">
            <Card>
              <CardHeader>
                <CardTitle>Carga de Producción Diaria</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductionDataForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stations">
            <Card>
              <CardHeader>
                <CardTitle>Datos por Estación/Campo</CardTitle>
              </CardHeader>
              <CardContent>
                <StationDataForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wells">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Pozos por Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <WellStatusForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historical">
            <Card>
              <CardHeader>
                <CardTitle>Carga de Datos Históricos</CardTitle>
              </CardHeader>
              <CardContent>
                <HistoricalDataForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;