function loginGoogle() {
	// integração futura com Google OAuth
	userState.isLogged = true;
	userState.nome = "Utilizador Google";
	showDashboard();
}

function guestCheckout() {
	userState.isLogged = false;
	showDashboard();
}

// const userState = {
// 	isLogged: false,
// 	nome: null,
// };
