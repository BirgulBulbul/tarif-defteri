import React from "react";
import { ITarif } from "../Interfaces/ITarif";
import TarifKart from "./TarifKart";

interface Props {
  tarifler: ITarif[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Partial<ITarif>) => void;
}

const TarifListesi: React.FC<Props> = ({ tarifler, onDelete, onUpdate }) => {
  if (tarifler.length === 0) {
    return (
      <div className="text-center py-20 text-stone-300">
        <div className="text-6xl mb-4">🍽️</div>
        <p className="text-sm">Henüz tarif yok. İlk tarifi ekle!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tarifler.map((tarif) => (
        <TarifKart
          key={tarif.id}
          tarif={tarif}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TarifListesi;
