const boxProducts = {
  fruta: {
    essential: {
      publico: "1–2 pessoas",
      preco: 20,
      items: [
        { nome: "Laranja", qtd: "1 kg" },
        { nome: "Maçã", qtd: "0,8 kg" },
        { nome: "Pera Rocha", qtd: "0,6 kg" },
        { nome: "Banana", qtd: "0,5 kg" },
        { nome: "Tangerina", qtd: "0,4 kg" },
        { nome: "Uvas Roxas", qtd: "0,25 kg" },
        { nome: "Limão", qtd: "0,1 kg" }
      ]
    },
    familiar: {
      publico: "3–4 pessoas",
      preco: 30,
      items: [
        { nome: "Laranja", qtd: "1,5 kg" },
        { nome: "Maçã", qtd: "1,2 kg" },
        { nome: "Pera Rocha", qtd: "1 kg" },
        { nome: "Banana", qtd: "0,8 kg" },
        { nome: "Tangerina", qtd: "1 kg" },
        { nome: "Uvas Roxas", qtd: "0,5 kg" },
        { nome: "Limão", qtd: "0,2 kg" },
        { nome: "Diospiro", qtd: "0,3 kg" }
      ]
    },
    premium: {
      publico: "5+ pessoas",
      preco: 40,
      items: [
        { nome: "Laranja", qtd: "2 kg" },
        { nome: "Maçã", qtd: "1,5 kg" },
        { nome: "Pera Rocha", qtd: "1,2 kg" },
        { nome: "Banana", qtd: "1,2 kg" },
        { nome: "Tangerina", qtd: "1,5 kg" },
        { nome: "Uvas Roxas", qtd: "0,7 kg" },
        { nome: "Uvas Verdes", qtd: "0,6 kg" },
        { nome: "Limão", qtd: "0,3 kg" },
        { nome: "Diospiro", qtd: "0,5 kg" },
        { nome: "Ananás", qtd: "1 un" }
      ]
    }
  },

  legumes: {
    essential: {
      publico: "1–2 pessoas",
      preco: 20,
      items: [
        { nome: "Batata", qtd: "1,2 kg" },
        { nome: "Cebola", qtd: "0,6 kg" },
        { nome: "Cenoura", qtd: "0,7 kg" },
        { nome: "Tomate", qtd: "0,8 kg" },
        { nome: "Couve Coração", qtd: "1 un pequena" },
        { nome: "Nabo", qtd: "0,4 kg" }
      ]
    },
    familiar: {
      publico: "3–4 pessoas",
      preco: 30,
      items: [
        { nome: "Batata", qtd: "1,8 kg" },
        { nome: "Cebola", qtd: "1 kg" },
        { nome: "Cenoura", qtd: "1 kg" },
        { nome: "Tomate", qtd: "1,2 kg" },
        { nome: "Couve Coração", qtd: "1 un média" },
        { nome: "Nabo", qtd: "0,6 kg" },
        { nome: "Grelos", qtd: "½ mão" }
      ]
    },
    premium: {
      publico: "5+ pessoas",
      preco: 40,
      items: [
        { nome: "Batata", qtd: "2,2 kg" },
        { nome: "Cebola", qtd: "1,2 kg" },
        { nome: "Cenoura", qtd: "1,3 kg" },
        { nome: "Tomate", qtd: "1,5 kg" },
        { nome: "Couve Coração", qtd: "1 un grande" },
        { nome: "Nabo", qtd: "0,8 kg" },
        { nome: "Grelos", qtd: "1 mão" },
        { nome: "Brócolos ou Alho-francês", qtd: "0,8 kg" }
      ]
    }
  },

  mista: {
    essential: {
      publico: "1–2 pessoas",
      preco: 20,
      items: [
        { nome: "Laranja", qtd: "0,7 kg" },
        { nome: "Maçã", qtd: "0,6 kg" },
        { nome: "Banana", qtd: "0,4 kg" },
        { nome: "Uvas Roxas", qtd: "0,3 kg" },
        { nome: "Limão", qtd: "0,1 kg" },
        { nome: "Cebola", qtd: "0,5 kg" },
        { nome: "Cenoura", qtd: "0,7 kg" },
        { nome: "Tomate", qtd: "0,6 kg" }
      ]
    },
    familiar: {
      publico: "3–4 pessoas",
      preco: 30,
      items: [
        { nome: "Laranja", qtd: "1 kg" },
        { nome: "Maçã", qtd: "1 kg" },
        { nome: "Pera", qtd: "0,7 kg" },
        { nome: "Banana", qtd: "0,6 kg" },
        { nome: "Tangerina", qtd: "0,7 kg" },
        { nome: "Cebola", qtd: "1 kg" },
        { nome: "Cenoura", qtd: "1,2 kg" },
        { nome: "Tomate", qtd: "1,3 kg" },
        { nome: "Couve Coração", qtd: "1 un pequena" }
      ]
    },
    premium: {
      publico: "5+ pessoas",
      preco: 40,
      items: [
        { nome: "Laranja", qtd: "1,5 kg" },
        { nome: "Maçã", qtd: "1,2 kg" },
        { nome: "Pera", qtd: "1 kg" },
        { nome: "Tangerina", qtd: "1,2 kg" },
        { nome: "Uvas (roxas e verdes)", qtd: "0,6 kg" },
        { nome: "Cebola", qtd: "1,2 kg" },
        { nome: "Cenoura", qtd: "1,5 kg" },
        { nome: "Tomate", qtd: "1,5 kg" },
        { nome: "Grelos", qtd: "1 mão" },
        { nome: "Nabo", qtd: "0,8 kg" }
      ]
    }
  },

  extras: [
    { nome: "Azeite caseiro", qtd: "0,5 L", preco: 7 },
    { nome: "Ovos caseiros", qtd: "1 duzia", preco: 6 }
  ]
};

// const boxState = {
//   tipo: null,        // fruta | legumes | mista
//   tamanho: null,     // Essential | Familiar | Premium
//   precoBase: 0,
//   sazonalidade: "epoca", // epoca | fora (preparado)
//   frequencia: "avulsa"   // semanal | quinzenal | avulsa
// };