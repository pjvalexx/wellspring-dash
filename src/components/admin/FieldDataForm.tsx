import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";

const fieldSchema = z.object({
  date: z.date({ required_error: "La fecha es requerida" }),
  field: z.string().min(1, "Seleccione un campo"),
  area: z.string().min(1, "El área es requerida"),
  crudeProduction: z.number().min(0, "Debe ser un valor positivo"),
  mechanicalPumping: z.number().min(0, "Debe ser un valor positivo"),
  electricPumping: z.number().min(0, "Debe ser un valor positivo"),
  gasPumping: z.number().min(0, "Debe ser un valor positivo"),
  injection: z.number().min(0, "Debe ser un valor positivo"),
});

type FieldFormData = z.infer<typeof fieldSchema>;

const fields = [
  "Campo Norte",
  "Campo Sur", 
  "Campo Este",
  "Campo Oeste",
  "Campo Central"
];

export const FieldDataForm = () => {
  const { toast } = useToast();
  
  const form = useForm<FieldFormData>({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      area: "",
      crudeProduction: 0,
      mechanicalPumping: 0,
      electricPumping: 0,
      gasPumping: 0,
      injection: 0,
    },
  });

  const onSubmit = (data: FieldFormData) => {
    console.log("Datos de campo:", data);
    toast({
      title: "Datos guardados",
      description: "Los datos del campo han sido registrados exitosamente",
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Información General */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha</FormLabel>
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
            name="field"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar campo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fields.map((fieldOption) => (
                      <SelectItem key={fieldOption} value={fieldOption}>
                        {fieldOption}
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
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Área</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del área" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Datos de Producción */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Datos de Producción</h3>
          
          <FormField
            control={form.control}
            name="crudeProduction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producción de Crudo (barriles)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="mechanicalPumping"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bombeo Mecánico</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="electricPumping"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bombeo Eléctrico</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gasPumping"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bombeo por Gas</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="injection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inyección (barriles)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Guardar Datos de Campo
        </Button>
      </form>
    </Form>
  );
};