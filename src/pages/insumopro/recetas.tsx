import { useState } from 'react';
import { Search, UtensilsCrossed, Eye, DollarSign, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { recetasMock, Receta } from '../../data/insumopro-mock';
import { RecipeModal } from '../../components/insumopro/recipe-modal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

export default function InsumoproRecetas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState<string>('todas');
  const [selectedReceta, setSelectedReceta] = useState<Receta | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRecetas = recetasMock.filter((receta) => {
    const matchesSearch = receta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receta.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = categoriaFilter === 'todas' || receta.categoria === categoriaFilter;
    return matchesSearch && matchesCategoria;
  });

  const handleOpenReceta = (receta: Receta) => {
    setSelectedReceta(receta);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReceta(null);
  };

  const categorias = ['Entrada', 'Plato Principal', 'Postre', 'Bebida'];

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Buscar recetas..."
              className="pl-10 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
            <SelectTrigger className="w-48">
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
        <Button className="bg-green-500 hover:bg-green-600 text-white font-bold">
          + Nueva Receta
        </Button>
      </div>

      <div className="mb-4 text-sm text-gray-500">
        Mostrando {filteredRecetas.length} de {recetasMock.length} recetas
      </div>

      <div className="grid gap-4">
        {filteredRecetas.map((receta) => (
          <div
            key={receta.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
            onClick={() => handleOpenReceta(receta)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl flex-shrink-0">
                  <UtensilsCrossed size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-800">{receta.nombre}</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {receta.categoria}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{receta.descripcion}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{receta.tiempoPreparacion} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} />
                      <span>
                        Costo: S/ {receta.costo.toFixed(2)} | Precio: S/ {receta.precio.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">{receta.ingredientes.length} ingredientes</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-gray-400 hover:text-green-500 transition-colors flex-shrink-0 ml-4">
                <Eye size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecetas.length === 0 && (
        <div className="text-center py-12">
          <UtensilsCrossed className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 text-lg font-medium">No se encontraron recetas</p>
          <p className="text-gray-400 text-sm">Intenta con otros términos de búsqueda</p>
        </div>
      )}

      {selectedReceta && (
        <RecipeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          receta={selectedReceta}
        />
      )}
    </div>
  );
}
