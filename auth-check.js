import { initAuth0, isAuthenticated, isAuthCallback } from "./js/auth.js";

/**
 * Verifica a autenticação e redireciona para login se não estiver autenticado
 * Usa sessionStorage para evitar múltiplas verificações
 */
export async function checkAuthentication() {
	// Se está a voltar de callback Auth0, deixa processar
	if (isAuthCallback()) {
		console.log("Auth0 callback detected, processing...");
		try {
			await initAuth0();
			// Aguarda um pouco para auth0 processar
			await new Promise((resolve) => setTimeout(resolve, 500));
			console.log("Auth0 callback processed");
		} catch (err) {
			console.error("Auth callback processing error:", err);
		}
		return true;
	}

	// Evita verificação múltipla na mesma sessão
	if (sessionStorage.getItem("auth-checked") === "true") {
		console.log("Auth check already performed in this session");
		return true;
	}

	try {
		// Inicializa Auth0
		console.log("Initializing Auth0...");
		await initAuth0();

		// Verifica autenticação
		const authenticated = await isAuthenticated();
		console.log("User authenticated:", authenticated);

		// Marca como verificado
		sessionStorage.setItem("auth-checked", "true");

		if (!authenticated) {
			// Redireciona para login se não autenticado
			console.log("User not authenticated, redirecting to login...");
			window.location.href = "/login.html";
			return false;
		}

		return true;
	} catch (err) {
		console.error("Authentication check error:", err);
		// Em caso de erro, deixa continuar (pode ser config issue)
		sessionStorage.setItem("auth-checked", "true");
		return true;
	}
}

/**
 * Inicializa o check de autenticação automaticamente
 */
(async function () {
	// Só roda se Auth0 está configurado
	if (
		import.meta.env.VITE_AUTH0_DOMAIN &&
		import.meta.env.VITE_AUTH0_CLIENT_ID
	) {
		await checkAuthentication();
	}
})();
