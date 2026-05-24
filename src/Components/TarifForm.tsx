import React, { useState } from "react";
import { ITarifForm } from "../Interfaces/ITarif";

interface Props {
  onAdd: (form: ITarifForm) => void;
}

const kategoriler = ["Kahvaltı", "Çorba", "Ana Yemek", "Tatlı", "İçecek", "Atıştırmalık"];

const TarifForm: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<ITarifForm>({
    ad: "", kategori: "Ana Yemek", malzemeler: "", yapilis: "", sure: "",
  });
  const [acik, setAcik] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ad.trim() || !form.malzemeler.trim() || !form.yapilis.trim()) {
      setError("Ad, malzemeler ve yapılış alanları zorunludur.");
      return;
    }
    onAdd(form);
    setForm({ ad: "", kategori: "Ana Yemek", malzemeler: "", yapilis: "", sure: "" });
    setError("");
    setAcik(false);
  };

  return (
    <div className="mb-8">
      {!acik ? (
        <button
          onClick={() => setAcik(true)}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-2xl transition text-sm shadow-md"
        >
          + Yeni Tarif Ekle
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 border border-amber-100">
          <h2 className="text-lg font-semibold text-stone-700 mb-4">Yeni Tarif</h2>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-stone-500 mb-1">Tarif Adı *</label>
              <input
                type="text"
                value={form.ad}
                onChange={(e) => setForm({ ...form, ad: e.target.value })}
                placeholder="Örn: Mercimek Çorbası"
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Kategori</label>
              <select
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition bg-white"
              >
                {kategoriler.map((k) => <option key={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Süre (dk)</label>
              <input
                type="number"
                value={form.sure}
                onChange={(e) => setForm({ ...form, sure: e.target.value })}
                placeholder="Örn: 30"
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-xs font-medium text-stone-500 mb-1">Malzemeler *</label>
            <textarea
              value={form.malzemeler}
              onChange={(e) => setForm({ ...form, malzemeler: e.target.value })}
              placeholder="Her malzemeyi yeni satıra yazın&#10;Örn: 1 su bardağı mercimek&#10;1 soğan"
              rows={4}
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition resize-none"
            />
          </div>

          <div className="mb-5">
            <label className="block text-xs font-medium text-stone-500 mb-1">Yapılış *</label>
            <textarea
              value={form.yapilis}
              onChange={(e) => setForm({ ...form, yapilis: e.target.value })}
              placeholder="Tarifi adım adım anlatın..."
              rows={4}
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 rounded-xl transition text-sm">
              Tarifi Kaydet
            </button>
            <button type="button" onClick={() => { setAcik(false); setError(""); }} className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-600 font-medium py-2.5 rounded-xl transition text-sm">
              İptal
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TarifForm;
