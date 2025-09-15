export type LinkType =
    | "twitter"
    | "instagram"
    | "telegram"
    | "github"
    | "linkedin"
    | "youtube"
    | "facebook"
    | "discord"
    | "tiktok"
    | "reddit"
    | "website"
    | "unknown";

export function getLinkType(link: string): LinkType {
    try {
        let normalized = link.trim();
        if (!/^https?:\/\//i.test(normalized)) {
            normalized = "https://" + normalized;
        }

        const { hostname } = new URL(normalized);
        const domain = hostname.replace(/^www\./, "").toLowerCase();

        const patterns: Record<Exclude<LinkType, "website" | "unknown">, RegExp[]> = {
            twitter: [/(\.|^)twitter\.com$/, /(\.|^)x\.com$/],
            instagram: [/(\.|^)instagram\.com$/],
            telegram: [/(\.|^)t\.me$/, /(\.|^)telegram\.me$/, /(\.|^)telegram\.org$/],
            github: [/(\.|^)github\.com$/],
            linkedin: [/(\.|^)linkedin\.com$/],
            youtube: [/(\.|^)youtube\.com$/, /(\.|^)youtu\.be$/],
            facebook: [/(\.|^)facebook\.com$/, /(\.|^)fb\.com$/],
            discord: [/(\.|^)discord\.gg$/, /(\.|^)discord\.com$/],
            tiktok: [/(\.|^)tiktok\.com$/],
            reddit: [/(\.|^)reddit\.com$/, /(\.|^)redd\.it$/],
        };

        for (const [type, regexes] of Object.entries(patterns)) {
            if (regexes.some((re) => re.test(domain))) {
                return type as LinkType;
            }
        }

        if (domain.includes(".")) return "website";

        return "unknown";
    } catch {
        return "unknown";
    }
}
