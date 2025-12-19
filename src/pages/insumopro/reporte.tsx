import { useState } from 'react';
import { Check, Filter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useToast } from '../../components/ui/use-toast';
import { insumosMock } from '../../data/insumopro-mock';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

interface Insumo {
  id: number;
  nombre: string;
  categoria: string;
  stockSistema: number;
  unidad: string;
  conteoFisico: number | null;
}

const insumosIniciales: Insumo[] = insumosMock.map((insumo) => ({
  id: insumo.id,
  nombre: insumo.nombre,
  categoria: insumo.categoria,
  stockSistema: insumo.stockSistema,
  unidad: insumo.unidad,
  conteoFisico: null,
}));

export default function InsumoproReporte() {
  const [insumos, setInsumos] = useState<Insumo[]>(insumosIniciales);
  const [categoriaFilter, setCategoriaFilter] = useState<string>('todas');
  const { toast } = useToast();

  const handleConteoChange = (id: number, value: string) => {
    setInsumos((prev) =>
      prev.map((insumo) =>
        insumo.id === id
          ? { ...insumo, conteoFisico: value === '' ? null : parseFloat(value) }
          : insumo
      )
    );
  };

  const handleFinalizarConteo = () => {
    const completados = insumos.filter((i) => i.conteoFisico !== null).length;
    const total = insumos.length;

    if (completados < total) {
      toast({
        title: 'Conteo incompleto',
        description: `Por favor completa el conteo de todos los insumos (${completados}/${total})`,
        variant: 'destructive',
      });
      return;
    }

    const mermas = insumos.filter((i) => i.conteoFisico! < i.stockSistema);

    toast({
      title: '¡Reporte guardado!',
      description: `Se detectaron ${mermas.length} mermas. Las mermas han sido calculadas.`,
    });

    setTimeout(() => {
      setInsumos(insumosIniciales);
    }, 2000);
  };

  const insumosFiltrados = categoriaFilter === 'todas'
    ? insumos
    : insumos.filter((i) => i.categoria === categoriaFilter);

  const completados = insumosFiltrados.filter((i) => i.conteoFisico !== null).length;
  const total = insumosFiltrados.length;
  const progreso = total > 0 ? (completados / total) * 100 : 0;

  const categorias = ['Carnes', 'Vegetales', 'Granos', 'Lácteos', 'Especias', 'Otros'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800">Reporte Diario de Inventario</h3>
        <p className="text-gray-500">Ingresa las cantidades físicas reales de cada insumo</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progreso</span>
            <span>
              {completados} de {total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
        </div>
        <div className="w-48">
          <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
            <SelectTrigger>
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las categorías</SelectItem>
              {categorias.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
        {insumosFiltrados.map((insumo) => (
          <div
            key={insumo.id}
            className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div
                className={`h-2 w-2 rounded-full ${
                  insumo.conteoFisico !== null ? 'bg-green-500' : 'bg-gray-400'
                }`}
              ></div>
              <div>
                <p className="font-semibold text-gray-800">{insumo.nombre}</p>
                <p className="text-xs text-gray-500">
                  {insumo.categoria} • Sistema: {insumo.stockSistema} {insumo.unidad}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0.0"
                step="0.1"
                value={insumo.conteoFisico ?? ''}
                onChange={(e) => handleConteoChange(insumo.id, e.target.value)}
                className="w-24 text-right"
              />
              <span className="text-gray-500 text-sm">{insumo.unidad}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {total} insumos • {completados} contados • {total - completados} pendientes
        </div>
        <Button
          onClick={handleFinalizarConteo}
          className="bg-gray-800 hover:bg-black text-white px-6 py-3 font-bold"
        >
          <Check className="mr-2" size={18} />
          Finalizar Conteo
        </Button>
      </div>
    </div>
  );
}
