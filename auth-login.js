import {
	initAuth0,
	login,
	logout,
	isAuthenticated,
	getUser,
} from "./js/auth.js";

// DOM elements
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const errorDetails = document.getElementById("error-details");
const app = document.getElementById("app");
const loggedOutSection = document.getElementById("logged-out");
const loggedInSection = document.getElementById("logged-in");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const profileContainer = document.getElementById("profile");

console.log("DOM elements loaded:", {
	loading: !!loading,
	error: !!error,
	errorDetails: !!errorDetails,
	app: !!app,
	loggedOutSection: !!loggedOutSection,
	loggedInSection: !!loggedInSection,
	loginBtn: !!loginBtn,
	logoutBtn: !!logoutBtn,
	profileContainer: !!profileContainer,
});

// Initialize on page load
(async function initPage() {
	try {
		showLoading();

		// Initialize Auth0
		console.log("Initializing Auth0...");
		await initAuth0();

		// Check authentication status
		const authenticated = await isAuthenticated();
		console.log("Authentication status:", authenticated);

		if (authenticated) {
			showLoggedIn();
			await displayProfile();
			// Redirect to home page after 3 seconds
			console.log("User authenticated, redirecting to home in 3 seconds...");
			setTimeout(() => {
				window.location.href = "/";
			}, 3000);
		} else {
			showLoggedOut();
			hideLoading();
		}
	} catch (err) {
		console.error("Page initialization error:", err);
		showError(err.message);
	}
})();

// Display user profile
async function displayProfile() {
	try {
		const user = await getUser();
		const placeholderImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='110' viewBox='0 0 110 110'%3E%3Ccircle cx='55' cy='55' r='55' fill='%2363b3ed'/%3E%3Cpath d='M55 50c8.28 0 15-6.72 15-15s-6.72-15-15-15-15 6.72-15 15 6.72 15 15 15zm0 7.5c-10 0-30 5.02-30 15v3.75c0 2.07 1.68 3.75 3.75 3.75h52.5c2.07 0 3.75-1.68 3.75-3.75V72.5c0-9.98-20-15-30-15z' fill='%23fff'/%3E%3C/svg%3E`;

		profileContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
        <img 
          src="${user.picture || placeholderImage}" 
          alt="${user.name || "User"}" 
          class="profile-picture"
          style="
            width: 110px; 
            height: 110px; 
            border-radius: 50%; 
            object-fit: cover;
            border: 3px solid #63b3ed;
          "
          onerror="this.src='${placeholderImage}'"
        />
        <div style="text-align: center;">
          <div class="profile-name" style="font-size: 2rem; font-weight: 600; color: #f7fafc; margin-bottom: 0.5rem;">
            ${user.name || "User"}
          </div>
          <div class="profile-email" style="font-size: 1.15rem; color: #a0aec0;">
            ${user.email || "No email provided"}
          </div>
        </div>
      </div>
    `;
	} catch (err) {
		console.error("Error displaying profile:", err);
	}
}

// UI state management
function showLoading() {
	if (loading) loading.style.display = "block";
	if (error) error.style.display = "none";
	if (app) app.style.display = "none";
}

function hideLoading() {
	if (loading) loading.style.display = "none";
	if (app) app.style.display = "flex";
}

function showError(message) {
	if (loading) loading.style.display = "none";
	if (app) app.style.display = "none";
	if (error) error.style.display = "block";
	if (errorDetails) errorDetails.textContent = message;
}

function showLoggedIn() {
	if (loggedOutSection) loggedOutSection.style.display = "none";
	if (loggedInSection) loggedInSection.style.display = "flex";
}

function showLoggedOut() {
	if (loggedInSection) loggedInSection.style.display = "none";
	if (loggedOutSection) loggedOutSection.style.display = "flex";
}

// Event listeners
if (loginBtn) {
	loginBtn.addEventListener("click", async () => {
		try {
			console.log("Login button clicked, calling login()...");
			showLoading();
			await login();
			console.log("Login initiated, redirecting to Auth0...");
		} catch (err) {
			console.error("Login button click error:", err);
			showError(err.message);
		}
	});
	console.log("✓ Login button event listener attached");
} else {
	console.error("✗ Login button not found in DOM!");
}

if (logoutBtn) {
	logoutBtn.addEventListener("click", async () => {
		try {
			console.log("Logout button clicked, calling logout()...");
			await logout();
			console.log("Logged out successfully");
		} catch (err) {
			console.error("Logout button click error:", err);
			showError(err.message);
		}
	});
	console.log("✓ Logout button event listener attached");
} else {
	console.error("✗ Logout button not found in DOM!");
}
