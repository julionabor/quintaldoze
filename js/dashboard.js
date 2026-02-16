const orderData = JSON.parse(localStorage.getItem("zdcp_order"));
if (!orderData) {
	alert("Nenhuma encomenda encontrada");
	window.location.href = "index.html";
}
const selectedBox = orderData.box;
const userState = orderData.user;
const total = orderData.total;

document.addEventListener("DOMContentLoaded", () => {
	if (typeof selectedBox !== "undefined") {
		showDashboard();
	}
});

function showDashboard() {
	document.getElementById("dashboard").classList.remove("d-none");

	document.getElementById("userName").innerText = userState.nome;

	document.getElementById("nextDeliveryDate").innerText =
		calcularProximaEntrega(userState.frequencia);

	document.getElementById("dashBoxTipo").innerText =
		`${capitalize(selectedBox.tipo)} ${capitalize(selectedBox.plano)}`;

	document.getElementById("dashFrequencia").innerText = userState.frequencia;

	document.getElementById("dashValor").innerText =
		total.toFixed(2);

	document.getElementById("dashExtras").innerText =
		Object.keys(selectedBox.extras)
			.filter((e) => selectedBox.extras[e])
			.join(", ") || "Nenhum";

	document.getElementById("dashMorada").innerText = userState.morada;

	document.getElementById("dashContacto").innerText = userState.contacto;

	document.getElementById("dashPagamento").innerText = userState.pagamento;

	updateStatus("prep"); // estado inicial
	document.getElementById("dashboard").classList.remove("d-none");
}
// Função para calcular a próxima data de entrega com base na frequência
function calcularProximaEntrega(frequencia) {
	const hoje = new Date();
	let dias = 0;

	if (frequencia === "Semanal") dias = 7;
	if (frequencia === "Quinzenal") dias = 14;
	if (frequencia === "Mensal") dias = 28;

	const proxima = new Date(hoje);
	proxima.setDate(hoje.getDate() + dias);

	// Ajustar para sábado
	proxima.setDate(proxima.getDate() + ((6 - proxima.getDay() + 7) % 7));

	return `Sábado, ${proxima.toLocaleDateString("pt-PT")}`;
}
// Função para atualizar o status da entrega
function updateStatus(status) {
	["prep", "route", "done"].forEach((s) => {
		const el = document.getElementById(`status-${s}`);
		el.classList.remove("fw-bold", "text-success");
	});

	const active = document.getElementById(`status-${status}`);
	if (active) {
		active.classList.add("fw-bold", "text-success");
	}
}
// funçao auxiliar para capitalizar palavras
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
