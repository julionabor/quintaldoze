const boxProducts = {
  fruta: [
    { nome: "Maçã", qtd: "1 kg" },
    { nome: "Banana", qtd: "1 kg" },
    { nome: "Laranja", qtd: "1,5 kg" }
  ],
  legumes: [
    { nome: "Batata", qtd: "2 kg" },
    { nome: "Cenoura", qtd: "1 kg" },
    { nome: "Cebola", qtd: "1 kg" }
  ],
  mista: [
    { nome: "Maçã", qtd: "1 kg" },
    { nome: "Batata", qtd: "1,5 kg" },
    { nome: "Cenoura", qtd: "0,5 kg" }
  ]
};
const boxState = {
  tipo: null,        // fruta | legumes | mista
  tamanho: null,     // Essential | Familiar | Premium
  precoBase: 0,
  sazonalidade: "epoca", // epoca | fora (preparado)
  frequencia: "avulsa"   // semanal | quinzenal | avulsa
};