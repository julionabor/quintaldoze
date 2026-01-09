(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        } 
    });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
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
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });


    // vegetable carousel
    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });



    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

})(jQuery);
// funçao da seleção de box nos cards
function selectBox(tipo, tamanho, preco, el) {
  // Guardar estado
  boxState.tipo = tipo;
  boxState.tamanho = tamanho;
  boxState.precoBase = preco;

  // UX: destacar opção selecionada
  document.querySelectorAll(".list-group-item").forEach(btn => {
    btn.classList.remove("active");
  });
  el.classList.add("active");

  // Mostrar botão correto
  ["fruta", "legumes", "mista"].forEach(t => {
    const btn = document.getElementById(`btn-${t}`);
    if (btn) btn.classList.add("d-none");
  });
  document.getElementById(`btn-${tipo}`).classList.remove("d-none");

  // Atualizar tabela e valor
  renderBoxTable(tipo);
  updateBoxTotal();
}
// recorrencia
function highlightPlan(card) {
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  }
//   box data
function renderBoxTable(tipo) {
  const tableBody = document.getElementById("boxTableBody");
  tableBody.innerHTML = "";

  if (!boxData[tipo]) return;

  boxData[tipo].forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.produto}</td>
      <td>${item.quantidade}</td>
    `;
    tableBody.appendChild(row);
  });
}
function updateBoxTotal() {
  let total = boxState.precoBase;

  // Ajuste por sazonalidade (preparado para futuro)
  if (boxState.sazonalidade === "fora") {
    total *= 1.1; // +10%
  }

  // Ajuste por frequência (exemplo)
  if (boxState.frequencia === "semanal") {
    total *= 0.95; // -5%
  } else if (boxState.frequencia === "quinzenal") {
    total *= 0.98; // -2%
  }

  document.getElementById("boxTotalValue").innerText =
    total.toFixed(2) + " €";
}
document.getElementById("boxResumo").scrollIntoView({
  behavior: "smooth"
});