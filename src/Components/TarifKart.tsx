import React, { useState } from "react";
import { ITarif } from "../Interfaces/ITarif";

interface Props {
  tarif: ITarif;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Partial<ITarif>) => void;
}

const kategoriler = ["Kahvaltı", "Çorba", "Ana Yemek", "Tatlı", "İçecek", "Atıştırmalık"];

const kategoriRenk: Record<string, string> = {
  "Kahvaltı": "bg-yellow-100 text-yellow-700",
  "Çorba": "bg-orange-100 text-orange-700",
  "Ana Yemek": "bg-red-100 text-red-700",
  "Tatlı": "bg-pink-100 text-pink-700",
  "İçecek": "bg-blue-100 text-blue-700",
  "Atıştırmalık": "bg-green-100 text-green-700",
};

const TarifKart: React.FC<Props> = ({ tarif, onDelete, onUpdate }) => {
  const [acik, setAcik] = useState(false);
  const [duzenle, setDuzenle] = useState(false);
  const [form, setForm] = useState({
    ad: tarif.ad,
    kategori: tarif.kategori,
    malzemeler: tarif.malzemeler,
    yapilis: tarif.yapilis,
    sure: tarif.sure,
  });

  const handleSave = () => {
    if (!form.ad.trim()) return;
    onUpdate(tarif.id, form);
    setDuzenle(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-all duration-200 overflow-hidden">
      {duzenle ? (
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="col-span-2">
              <input
                type="text"
                value={form.ad}
                onChange={(e) => setForm({ ...form, ad: e.target.value })}
                className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <select
              value={form.kategori}
              onChange={(e) => setForm({ ...form, kategori: e.target.value })}
              className="border border-stone-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {kategoriler.map((k) => <option key={k}>{k}</option>)}
            </select>
            <input
              type="number"
              value={form.sure}
              onChange={(e) => setForm({ ...form, sure: e.target.value })}
              placeholder="Süre (dk)"
              className="border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <textarea
            value={form.malzemeler}
            onChange={(e) => setForm({ ...form, malzemeler: e.target.value })}
            rows={3}
            placeholder="Malzemeler"
            className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
          />
          <textarea
            value={form.yapilis}
            onChange={(e) => setForm({ ...form, yapilis: e.target.value })}
            rows={3}
            placeholder="Yapılış"
            className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
          />
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-sm py-2 rounded-xl transition">Kaydet</button>
            <button onClick={() => setDuzenle(false)} className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-600 text-sm py-2 rounded-xl transition">İptal</button>
          </div>
        </div>
      ) : (
        <>
          <div
            className="p-5 cursor-pointer"
            onClick={() => setAcik(!acik)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${kategoriRenk[tarif.kategori] || "bg-stone-100 text-stone-600"}`}>
                    {tarif.kategori}
                  </span>
                  {tarif.sure && (
                    <span className="text-xs text-stone-400">⏱ {tarif.sure} dk</span>
                  )}
                </div>
                <h3 className="font-semibold text-stone-800 text-base">{tarif.ad}</h3>
                <p className="text-xs text-stone-400 mt-1">{tarif.createdAt}</p>
              </div>
              <span className="text-stone-300 text-lg mt-1">{acik ? "▲" : "▼"}</span>
            </div>
          </div>

          {acik && (
            <div className="px-5 pb-5 border-t border-stone-50 pt-4">
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Malzemeler</h4>
                <div className="bg-amber-50 rounded-xl p-3">
                  {tarif.malzemeler.split("\n").filter(Boolean).map((m, i) => (
                    <p key={i} className="text-sm text-stone-700 flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span> {m}
                    </p>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Yapılış</h4>
                <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">{tarif.yapilis}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={() => setDuzenle(true)} className="flex-1 text-xs text-amber-500 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 py-2 rounded-xl transition">
                  ✏️ Düzenle
                </button>
                <button onClick={() => onDelete(tarif.id)} className="flex-1 text-xs text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 py-2 rounded-xl transition">
                  🗑️ Sil
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TarifKart;
