# Tarif Defterim 📖

React + TypeScript + Tailwind CSS ile geliştirilmiş tarif yönetim uygulaması.

## Özellikler
- ➕ Tarif ekleme (ad, kategori, süre, malzemeler, yapılış)
- 📋 Tarif listeleme (kategori filtresi + arama)
- ✏️ Tarif güncelleme (inline düzenleme)
- 🗑️ Tarif silme
- 🗂️ Kategoriler: Kahvaltı, Çorba, Ana Yemek, Tatlı, İçecek, Atıştırmalık

## Proje Yapısı
```
src/
├── Components/
│   ├── TarifForm.tsx      # Yeni tarif ekleme formu
│   ├── TarifKart.tsx      # Tek tarif kartı (detay/düzenle/sil)
│   └── TarifListesi.tsx   # Tarif listesi
├── Pages/
│   └── HomePage.tsx       # Ana sayfa, state yönetimi, filtreler
├── Interfaces/
│   └── ITarif.ts          # TypeScript interface tanımları
├── App.tsx
└── index.tsx
```

## Kurulum

```bash
npm install
npm start
```

## Build & Deploy (Netlify)

```bash
npm run build
```
