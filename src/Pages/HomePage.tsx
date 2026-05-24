import React, { useState } from "react";
import TarifForm from "../Components/TarifForm";
import TarifListesi from "../Components/TarifListesi";
import { ITarif, ITarifForm } from "../Interfaces/ITarif";

const kategoriler = ["Tümü", "Kahvaltı", "Çorba", "Ana Yemek", "Tatlı", "İçecek", "Atıştırmalık"];

const HomePage: React.FC = () => {
  const [tarifler, setTarifler] = useState<ITarif[]>([]);
  const [filtre, setFiltre] = useState("Tümü");
  const [arama, setArama] = useState("");

  const handleAdd = (form: ITarifForm) => {
    const yeni: ITarif = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toLocaleDateString("tr-TR", {
        day: "2-digit", month: "long", year: "numeric",
      }),
    };
    setTarifler((prev) => [yeni, ...prev]);
  };

  const handleDelete = (id: number) => {
    setTarifler((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdate = (id: number, data: Partial<ITarif>) => {
    setTarifler((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
  };

  const filtered = tarifler
    .filter((t) => filtre === "Tümü" || t.kategori === filtre)
    .filter((t) => t.ad.toLowerCase().includes(arama.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50 px-4 py-10">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">📖</div>
          <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Tarif Defterim</h1>
          <p className="text-sm text-stone-400 mt-1">{tarifler.length} tarif kayıtlı</p>
        </div>

        {/* Arama */}
        {tarifler.length > 0 && (
          <div className="mb-4">
            <input
              type="text"
              value={arama}
              onChange={(e) => setArama(e.target.value)}
              placeholder="🔍 Tarif ara..."
              className="w-full border border-stone-200 bg-white rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>
        )}

        {/* Form */}
        <TarifForm onAdd={handleAdd} />

        {/* Kategori Filtresi */}
        {tarifler.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
            {kategoriler.map((k) => (
              <button
                key={k}
                onClick={() => setFiltre(k)}
                className={`flex-shrink-0 px-4 py-1.5 text-xs font-medium rounded-full transition ${
                  filtre === k
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-white text-stone-500 hover:bg-stone-50 border border-stone-200"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        )}

        {/* Liste */}
        <TarifListesi
          tarifler={filtered}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default HomePage;
