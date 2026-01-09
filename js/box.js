const boxData = {
  fruta: [
    { produto: "Maçã", quantidade: "1 kg" },
    { produto: "Banana", quantidade: "1 kg" },
    { produto: "Laranja", quantidade: "1,5 kg" }
  ],
  legumes: [
    { produto: "Batata", quantidade: "2 kg" },
    { produto: "Cenoura", quantidade: "1 kg" },
    { produto: "Cebola", quantidade: "1 kg" }
  ],
  mista: [
    { produto: "Maçã", quantidade: "1 kg" },
    { produto: "Batata", quantidade: "1,5 kg" },
    { produto: "Cenoura", quantidade: "0,5 kg" }
  ]
};
const boxState = {
  tipo: null,        // fruta | legumes | mista
  tamanho: null,     // Essential | Familiar | Premium
  precoBase: 0,
  sazonalidade: "epoca", // epoca | fora (preparado)
  frequencia: "avulsa"   // semanal | quinzenal | avulsa
};