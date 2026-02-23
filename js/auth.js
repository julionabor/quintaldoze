import { createAuth0Client } from "@auth0/auth0-spa-js";

let auth0Client;

/**
 * Inicializa o cliente Auth0
 */
export async function initAuth0() {
	try {
		console.log("Auth0 - Creating client with:", {
			domain: import.meta.env.VITE_AUTH0_DOMAIN,
			clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
			redirect_uri: `${window.location.origin}/login.html`
		});

		auth0Client = await createAuth0Client({
			domain: import.meta.env.VITE_AUTH0_DOMAIN,
			clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
			authorizationParams: {
				redirect_uri: `${window.location.origin}/login.html`,
			},
		});

		console.log("Auth0 client created successfully");

		// Check if user is returning from login
		if (
			window.location.search.includes("code=") &&
			window.location.search.includes("state=")
		) {
			console.log("Auth0 callback detected, processing redirect...");
			const result = await handleRedirectCallback();
			console.log("Redirect callback processed:", result);
			// Aguarda um pouco para garantir que Auth0 processou
			await new Promise(resolve => setTimeout(resolve, 500));
		}

		return auth0Client;
	} catch (err) {
		console.error("Auth0 initialization error:", err);
		throw err;
	}
}

/**
 * Obtém a instância do cliente Auth0
 */
export function getAuth0Client() {
	return auth0Client;
}

/**
 * Verifica se o utilizador está autenticado
 */
export async function isAuthenticated() {
	if (!auth0Client) {
		console.log("Auth0 client not initialized, initializing...");
		auth0Client = await initAuth0();
	}
	try {
		const result = await auth0Client.isAuthenticated();
		console.log("isAuthenticated check result:", result);
		return result;
	} catch (err) {
		console.error("isAuthenticated error:", err);
		return false;
	}
}

/**
 * Verifica se está a vir de um callback Auth0
 */
export function isAuthCallback() {
	return window.location.search.includes('code=') && window.location.search.includes('state=');
}

/**
 * Lida com o callback de redirecionamento do Auth0
 */
export async function handleRedirectCallback() {
	if (!auth0Client) {
		console.warn("Auth0 client not initialized");
		return false;
	}
	try {
		console.log("Processing Auth0 redirect callback...");
		await auth0Client.handleRedirectCallback();
		console.log("Auth0 redirect callback processed successfully");
		window.history.replaceState({}, document.title, window.location.pathname);
		return true;
	} catch (err) {
		console.error("Redirect callback error:", err);
		return false;
	}
}

/**
 * Obtém o utilizador autenticado
 */
export async function getUser() {
	if (!auth0Client) {
		auth0Client = await initAuth0();
	}
	return await auth0Client.getUser();
}

/**
 * Login com redirecionamento
 */
export async function login() {
	console.log("login() function called");
	if (!auth0Client) {
		console.log("Auth0 client not available, initializing...");
		auth0Client = await initAuth0();
	}
	try {
		console.log("Calling loginWithRedirect()...");
		await auth0Client.loginWithRedirect();
		console.log("Redirecting to Auth0...");
	} catch (err) {
		console.error("Login error:", err);
		throw err;
	}
}

/**
 * Logout
 */
export async function logout() {
	console.log("logout() function called");
	if (!auth0Client) {
		console.log("Auth0 client not available, initializing...");
		auth0Client = await initAuth0();
	}
	try {
		console.log("Calling logout()...");
		await auth0Client.logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
		console.log("Logged out successfully");
	} catch (err) {
		console.error("Logout error:", err);
		throw err;
	}
}
