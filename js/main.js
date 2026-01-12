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
	tipo: null, // fruta | legumes | misto
	plano: null, // essential | familiar | premium
	publico: null,
	basePrice: 0,
	extras: {},
};

let selectedFrequency = {
	tipo: null,
	multiplier: 1,
};

/* ===============================
   SELEÇÃO DA BOX
================================ */
function selectBox(tipo, plano, el) {
	const box = boxProducts[tipo][plano];
	if (!box) return;

	// Estado
	selectedBox.tipo = tipo;
	selectedBox.plano = plano;
	selectedBox.publico = box.publico;
	selectedBox.basePrice = Number(box.preco) || 0;

	// UX: remover seleção anterior
	document.querySelectorAll(".plan-card").forEach((card) => {
		card.classList.remove("selected", "border-success");
	});

	// UX: aplicar seleção
	el.classList.add("selected", "border-success");

	renderBoxTable(tipo, plano);
	updateTotal();
	const sazonalidadeSection = document.getElementById("sazonalidade");
	if (sazonalidadeSection) {
		sazonalidadeSection.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}
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
	const boxResumo = document.getElementById("boxResumo");
	if (boxResumo) {
		boxResumo.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}
}

/* ===============================
   ATUALIZA O TOTAL NA TABELA
================================ */
function updateTotal() {
	let total = Number(selectedBox.basePrice) || 0;

	for (const extra in selectedBox.extras) {
		if (selectedBox.extras[extra] === true) {
			const price = Number(EXTRA_PRICES[extra]) || 0;
			total += price;
		}
	}

	// Aplicar multiplicador de frequência/sazonalidade
	const finalTotal = total * selectedFrequency.multiplier;

	const totalEl = document.getElementById("boxTotal");
	if (totalEl) {
		totalEl.innerText = finalTotal.toFixed(2) + " €";
	}
}
function renderBoxTable(tipo, plano) {
	const tableBody = document.getElementById("boxTableBody");
	if (!tableBody) return;

	tableBody.innerHTML = "";

	const box = boxProducts[tipo][plano];
	if (!box || !box.items) return;

	box.items.forEach((item) => {
		const row = document.createElement("tr");
		row.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.qtd}</td>
    `;
		tableBody.appendChild(row);
	});

	const publicoEl = document.getElementById("boxPublico");
	if (publicoEl) {
		publicoEl.innerText = box.publico;
	}
}
const EXTRA_PRICES = {};
boxProducts.extras.forEach((extra) => {
	EXTRA_PRICES[extra.nome] = Number(extra.preco);
});

boxProducts.extras.forEach((extra) => {
	EXTRA_PRICES[extra.nome] = extra.preco;
});
/* ====================
GERAR EXTRAS DINAMICAMENTE
==================== */
function toggleExtra(extra) {
	selectedBox.extras[extra] = !selectedBox.extras[extra];
	updateTotal();
}
function renderExtras() {
	const container = document.getElementById("extrasContainer");
	container.innerHTML = "";

	boxProducts.extras.forEach((extra) => {
		container.innerHTML += `
      <div class="form-check mb-2">
        <input
          class="form-check-input"
          type="checkbox"
          onchange="toggleExtra('${extra.nome}')"
        />
        <label class="form-check-label">
          ${extra.nome} (${extra.qtd})
          <span class="text-muted">+ ${extra.preco} €</span>
        </label>
      </div>
    `;
	});
}
