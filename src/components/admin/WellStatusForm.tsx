import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const wellSchema = z.object({
  date: z.date({ required_error: "La fecha es requerida" }),
  wellName: z.string().min(1, "El nombre del pozo es requerido"),
  wellNumber: z.string().min(1, "El número del pozo es requerido"),
  category: z.string().min(1, "Seleccione una categoría"),
  status: z.string().min(1, "Seleccione un estado"),
  production: z.number().min(0, "Debe ser un valor positivo").optional(),
  lastMaintenance: z.date().optional(),
  nextMaintenance: z.date().optional(),
  observations: z.string().optional(),
});

type WellFormData = z.infer<typeof wellSchema>;

const categories = [
  "Categoría 1: Pozos activos",
  "Categoría 2: Pozos inactivos con daños menores", 
  "Categoría 3: Pozos inactivos con daños mayores",
  "Categoría 4: Por definir",
  "Categoría 5: Por definir"
];

const statuses = [
  "Activo",
  "Inactivo - Mantenimiento",
  "Inactivo - Daño menor",
  "Inactivo - Daño mayor",
  "En reparación",
  "Fuera de servicio"
];

export const WellStatusForm = () => {
  const { toast } = useToast();
  
  const form = useForm<WellFormData>({
    resolver: zodResolver(wellSchema),
    defaultValues: {
      wellName: "",
      wellNumber: "",
      production: 0,
      observations: "",
    },
  });

  const onSubmit = (data: WellFormData) => {
    console.log("Datos de pozo:", data);
    toast({
      title: "Datos guardados",
      description: "El estado del pozo ha sido actualizado exitosamente",
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Información del Pozo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información del Pozo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Registro</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wellName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Pozo</FormLabel>
                    <FormControl>
                      <Input placeholder="ej: Pozo Norte 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wellNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número del Pozo</FormLabel>
                    <FormControl>
                      <Input placeholder="ej: PN-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="production"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Producción (barriles/día)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Estado y Categoría */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estado y Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Mantenimiento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Programa de Mantenimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lastMaintenance"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Último Mantenimiento</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nextMaintenance"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Próximo Mantenimiento</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Observaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Observaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones y Comentarios</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe el estado del pozo, problemas identificados, trabajos realizados, etc."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          Actualizar Estado del Pozo
        </Button>
      </form>
    </Form>
  );
};