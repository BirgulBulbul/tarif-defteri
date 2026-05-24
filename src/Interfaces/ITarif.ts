export interface ITarif {
  id: number;
  ad: string;
  kategori: string;
  malzemeler: string;
  yapilis: string;
  sure: string;
  createdAt: string;
}

export interface ITarifForm {
  ad: string;
  kategori: string;
  malzemeler: string;
  yapilis: string;
  sure: string;
}
