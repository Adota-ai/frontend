export function login(data: { user: string; pass: string }) {
	if (data.user === "admin" && data.pass === "admin") {
		localStorage.setItem(
			"user",
			JSON.stringify({ user: data.user, type: "admin" }),
		);
		return true;
	}
	return false;
}

export function isLoggedIn(): boolean {
	const user = localStorage.getItem("user");

	if (!user) return false;

	return true;
}

export function getUser(): { user: string; type: string } {
	const user = localStorage.getItem("user");

	if (!user) throw "Usuario não encontrado";
	return JSON.parse(user) as { user: string; type: string };
}
