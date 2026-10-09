const COOKIE_NAME = "gb_anonymous_id";

function generateAnonymousId(length = 10) {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const bytes = crypto.getRandomValues(
        new Uint8Array(length)
    );

    return Array.from(bytes, (byte) =>
        chars[byte % chars.length]
    ).join('');
}

export function getAnonymousId(): string {
    if (typeof document === "undefined") {
        throw new Error("getAnonymousId must run in the browser");
    }

    const existing = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));

    if (existing) {
        return decodeURIComponent(existing.split("=")[1]);
    }

    const anonymousId = generateAnonymousId(12);

    document.cookie = [
        `${COOKIE_NAME}=${encodeURIComponent(anonymousId)}`,
        "Path=/",
        "Max-Age=31536000",
        "SameSite=Lax",
    ].join("; ");

    return anonymousId;
}