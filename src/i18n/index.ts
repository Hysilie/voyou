import fr from "./fr.json";

export type Lang = "fr" | "en";
type Dict = typeof fr;

function deepGet(obj : any, path: string) {
    return path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);
}

function format(str: string, params?: Record<string, string | number>) {
    if (!params) return str;
    return str.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? `{${k}}`));
}

export function useI18n() {
    const dict: Dict = fr as Dict;
    function t(key: string, params?: Record<string, string | number>) {
        const val = deepGet(dict, key);
        return typeof val === "string" ? format(val, params) : key;
    }
    return t;
}
