// ==========================
// QUIZ CONFIGURAÇÃO
// ==========================

const userAnswers = {};
const totalQuestions = 4;

/**
 * Avança para a próxima pergunta e salva a resposta do utilizador.
 * @param {number} currentStep - Número da pergunta atual.
 * @param {string} answer - Resposta selecionada.
 */
function handleAnswer(currentStep, answer) {
	const clickedButton = event.target;
	setActiveOption(clickedButton);

	userAnswers[`q${currentStep}`] = answer;
	toggleQuestionVisibility(currentStep, currentStep + 1);
	updateProgress(currentStep + 1);
}

/**
 * Mostra a próxima pergunta e esconde a atual.
 */
function toggleQuestionVisibility(current, next) {
	document.getElementById(`q${current}`).classList.remove("active");
	document.getElementById(`q${next}`).classList.add("active");
}

/**
 * Atualiza a barra de progresso.
 */
function updateProgress(step) {
	const progress = ((step - 1) / totalQuestions) * 100;
	document.getElementById("progress-bar").style.width = `${progress}%`;
}

/**
 * Finaliza o quiz e mostra o resultado.
 */
function finishQuiz(finalAnswer) {
	userAnswers.q4 = finalAnswer;
	hideAllQuestions();
	updateProgress(totalQuestions + 1);

	const boxName = getBoxName(userAnswers.q1);
	const boxDesc = buildBoxDescription(userAnswers);

	document.getElementById("boxName").innerText = boxName;
	document.getElementById("boxDesc").innerText = boxDesc;
	document.getElementById("result").style.display = "block";
}

/**
 * Retorna o nome da box com base no tamanho.
 */
function getBoxName(sizeAnswer) {
	const options = {
		"1pessoa": "Box Pequena (20€)",
		"2a3": "Box Média (30€)",
		"4mais": "Box Familiar (40€)",
	};
	return options[sizeAnswer] || "Box Personalizada";
}

/**
 * Gera a descrição final combinando as respostas.
 */
function buildBoxDescription({ q2, q3, q4 }) {
	let desc = "";

	const typeMap = {
		frutas: "Perfeita para amantes de frutas locais e sazonais.",
		legumes: "Ideal para quem prefere legumes frescos e versáteis.",
		equilibrado: "Equilíbrio perfeito entre frutas e legumes da época.",
	};
	desc += typeMap[q2] || "";

	const freqMap = {
		semanal: " Recebe todas as semanas sem preocupações.",
		quinzenal: " Entrega quinzenal, no ritmo certo.",
		avulsa: " Pede quando quiser, sem compromisso.",
	};
	desc += freqMap[q3] || "";

	if (q4 === "sim")
		desc += " Inclui surpresas locais e sazonais do Zé da Horta.";

	return desc.trim();
}

/**
 * Esconde todas as perguntas do quiz.
 */
function hideAllQuestions() {
	document
		.querySelectorAll(".question")
		.forEach((q) => q.classList.remove("active"));
}

/**
 * Reinicia o quiz.
 */
function resetQuiz() {
	Object.keys(userAnswers).forEach((k) => delete userAnswers[k]);
	hideAllQuestions();
	document.getElementById("result").style.display = "none";
	document.getElementById("q1").classList.add("active");
	updateProgress(1);
}
function nextQuestion(current, answer) {
	// se a função refatorada existe, usa-a
	if (typeof handleAnswer === "function") {
		// se current é o último (4), tratamos com finishQuiz em vez de avançar
		const lastQuestion = 4;
		if (current >= lastQuestion) {
			if (typeof finishQuiz === "function") {
				finishQuiz(answer);
			} else {
				handleAnswer(current, answer);
			}
		} else {
			handleAnswer(current, answer);
		}
	} else {
		console.warn(
			"handleAnswer não está definido — assegura que o script refatorado foi carregado."
		);
	}
}
/**
 * Marca visualmente a opção selecionada.
 */
function setActiveOption(button) {
	const parent = button.closest(".question");
	const allOptions = parent.querySelectorAll(".btn-option");

	// Remove estado ativo de todas as opções da pergunta atual
	allOptions.forEach((opt) => opt.classList.remove("active"));

	// Adiciona estado ativo à opção clicada
	button.classList.add("active");
}
