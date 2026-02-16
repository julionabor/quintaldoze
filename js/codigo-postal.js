const avaiablesCp = [
	// São João da Madeira
	"3700",
	// Oliveira de Azeméis
	"3720",
	"3700",
	"3721",
	// Santa Maria da Feira
	"4520",
	"4524",
	"4525",
	"4535",
	"4505",
	"4509",
	// Vale de Cambra
	"3730",
	// Ovar
	"3880",
	"3885",
	// Albergaria-a-Velha (Zonas Norte)
	"3850",
	// Castelo de Paiva (Zonas Sul)
	"4550",
	// Vila Nova de Gaia (Zonas no limite de 15km - Arrifana/Grijó)
	"4500",
	"4415",
];
function checkZone() {
	const postal = document.getElementById("postalCode").value.trim();
	const result = document.getElementById("zoneResult");

	if (!postal) {
		result.innerHTML = `<span class="text-warning">Insere um código-postal.</span>`;
		return;
	}

	if (avaiablesCp.some((cp) => postal.startsWith(cp))) {
		result.innerHTML = `
      <div class="alert alert-success mt-3">
        ✅ Estamos na tua zona! Entrega ao sábado.
      </div>
    `;
	} else {
		result.innerHTML = `
      <div class="alert alert-warning mt-3">
        ⚠️ Ainda não chegamos a tua zona.<br>
        <a href="https://wa.me/351938020511" target="_blank">
          Solicite a expansão para a sua área pelo nosso WhatsApp
        </a>
      </div>
    `;
	}
}
