/**
 * Safe fetch wrapper to prevent "Unexpected end of JSON input" errors.
 * 1. Checks response.ok
 * 2. If not ok, reads response.text() and throws an Error
 * 3. Only calls response.json() if Content-Type is application/json and body is not empty
 * 4. Automatically includes credentials: "include"
 */
export const safeFetch = async (url, options = {}) => {
	const defaultOptions = {
		credentials: "include", // Required for authentication cookies
	};

	const mergedOptions = {
		...defaultOptions,
		...options,
		headers: {
			...options.headers,
		},
	};

	const response = await fetch(url, mergedOptions);

	// 1 & 2. Check response.ok and handle non-ok responses
	if (!response.ok) {
		const text = await response.text();
		let errorMessage = text;
		try {
			// Try to parse error as JSON to get a specific error message if it exists
			const errorData = JSON.parse(text);
			errorMessage = errorData.error || errorData.message || text;
		} catch (e) {
			// Not JSON, use raw text
		}
		throw new Error(errorMessage || `Request failed with status ${response.status}`);
	}

	// 3 & 4. Handle JSON responses safely
	const contentType = response.headers.get("content-type");
	if (contentType && contentType.includes("application/json")) {
		const text = await response.text();
		
		// Handle empty bodies safely
		if (!text || text.trim() === "") {
			return null;
		}

		try {
			return JSON.parse(text);
		} catch (e) {
			console.error("JSON Parse Error:", e);
			throw new Error("Received invalid JSON from server");
		}
	}

	// For non-JSON responses (like empty logout responses)
	return null;
};
