(function ($) {
	"use strict";

	// Spinner
	var spinner = function () {
		setTimeout(function () {
			if ($("#spinner").length > 0) {
				$("#spinner").removeClass("show");
			}
		}, 1);
	};
	spinner(0);

	// Fixed Navbar
	$(window).scroll(function () {
		if ($(window).width() < 992) {
			if ($(this).scrollTop() > 55) {
				$(".fixed-top").addClass("shadow");
			} else {
				$(".fixed-top").removeClass("shadow");
			}
		} else {
			if ($(this).scrollTop() > 55) {
				$(".fixed-top").addClass("shadow").css("top", -55);
			} else {
				$(".fixed-top").removeClass("shadow").css("top", 0);
			}
		}
	});

	// Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			$(".back-to-top").fadeIn("slow");
		} else {
			$(".back-to-top").fadeOut("slow");
		}
	});
	$(".back-to-top").click(function () {
		$("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
		return false;
	});

	// Testimonial carousel
	$(".testimonial-carousel").owlCarousel({
		autoplay: true,
		smartSpeed: 2000,
		center: false,
		dots: true,
		loop: true,
		margin: 25,
		nav: true,
		navText: [
			'<i class="bi bi-arrow-left"></i>',
			'<i class="bi bi-arrow-right"></i>',
		],
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
			},
			576: {
				items: 1,
			},
			768: {
				items: 1,
			},
			992: {
				items: 2,
			},
			1200: {
				items: 2,
			},
		},
	});

	// vegetable carousel
	$(".vegetable-carousel").owlCarousel({
		autoplay: true,
		smartSpeed: 1500,
		center: false,
		dots: true,
		loop: true,
		margin: 25,
		nav: true,
		navText: [
			'<i class="bi bi-arrow-left"></i>',
			'<i class="bi bi-arrow-right"></i>',
		],
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
			},
			576: {
				items: 1,
			},
			768: {
				items: 2,
			},
			992: {
				items: 3,
			},
			1200: {
				items: 4,
			},
		},
	});

	// Modal Video
	$(document).ready(function () {
		var $videoSrc;
		$(".btn-play").click(function () {
			$videoSrc = $(this).data("src");
		});
		console.log($videoSrc);

		$("#videoModal").on("shown.bs.modal", function (e) {
			$("#video").attr(
				"src",
				$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
			);
		});

		$("#videoModal").on("hide.bs.modal", function (e) {
			$("#video").attr("src", $videoSrc);
		});
	});

	// Product Quantity
	$(".quantity button").on("click", function () {
		var button = $(this);
		var oldValue = button.parent().parent().find("input").val();
		if (button.hasClass("btn-plus")) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		button.parent().parent().find("input").val(newVal);
	});
})(jQuery);
if (typeof boxProducts === "undefined") {
  console.error("boxProducts não foi carregado");
}
/* ===============================
   ESTADO GLOBAL DA SELEÇÃO
================================ */
let selectedBox = {
  tipo: null,
  tamanho: null,
  precoBase: 0,
  extras: {
    ovos: false,
    azeite: false
  }
};

let selectedFrequency = {
	tipo: null,
	multiplier: 1,
};

/* ===============================
   SELEÇÃO DA BOX
================================ */
function selectBox(tipo, tamanho, preco, element) {
	selectedBox.tipo = tipo;
	selectedBox.tamanho = tamanho;
	selectedBox.precoBase = parseFloat(preco);

	document.querySelectorAll(".list-group-item").forEach((btn) => {
		btn.classList.remove("active");
	});

	element.classList.add("active");

	// Renderiza produtos da box selecionada
	renderBoxTable(tipo);
    updateTotal();
}

/* ===============================
   SELEÇÃO DA FREQUÊNCIA
================================ */
function highlightPlan(card) {
	document.querySelectorAll(".plan-card").forEach((c) => {
		c.classList.remove("border-3", "border-success");
	});

	card.classList.add("border-3", "border-success");

	const title = card.querySelector("h4").innerText.toLowerCase();

	if (title.includes("semanal")) {
		selectedFrequency.tipo = "semanal";
		selectedFrequency.multiplier = 0.9;
	} else if (title.includes("quinzenal")) {
		selectedFrequency.tipo = "quinzenal";
		selectedFrequency.multiplier = 0.95;
	} else {
		selectedFrequency.tipo = "avulsa";
		selectedFrequency.multiplier = 1;
	}

	updateTotal();
}

/* ===============================
   ATUALIZA O TOTAL NA TABELA
================================ */
function updateTotal() {
	if (!selectedBox.precoBase) return;

	const tableBody = document.getElementById("boxTableBody");

	const oldTotal = document.getElementById("boxTotalRow");
	if (oldTotal) oldTotal.remove();
    
	 let total = Number(selectedBox.precoBase);

  if (selectedBox.extras.ovos) total += 5;
  if (selectedBox.extras.azeite) total += 5; 
   document.getElementById("boxTotal").innerText = total.toFixed(2) + " €";


	const totalRow = document.createElement("tr");
	totalRow.id = "boxTotalRow";
	totalRow.innerHTML = `
    <td class="fw-bold text-success table-success">Total (${
			selectedFrequency.tipo || "avulsa"
		})</td>
    <td class="fw-bold text-success table-success">${total} €</td>
  `;

	tableBody.appendChild(totalRow);
}
function renderBoxTable(tipo) {
	const tableBody = document.getElementById("boxTableBody");
	tableBody.innerHTML = "";

	if (!boxProducts[tipo]) return;

	boxProducts[tipo].forEach((produto) => {
		const row = document.createElement("tr");
		row.innerHTML = `
      <td>${produto.nome}</td>
      <td>${produto.qtd}</td>
    `;
		tableBody.appendChild(row);
	});

	// Após renderizar os produtos, adiciona o total (se existir)
	updateTotal();
}   
document.getElementById("boxResumo").scrollIntoView({
	behavior: "smooth",
});
function toggleExtra(extra, price) {
  selectedBox.extras[extra] = !selectedBox.extras[extra];
  updateTotal();
}
