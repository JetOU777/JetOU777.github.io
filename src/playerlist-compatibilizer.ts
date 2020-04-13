const BYE_REGEX = /^Bye #\d+$/;
const VS_REGEX = /\s\u202F?vs\.?\u202F?\s/i;

/**
 * Compatibilizes the Smogon bracketmaker's output to work with
 * IFM's bracketmaker
 */
export function compatibilize(playerlist: string) {
    const compatibilized: string[] = [];
    for (const players of playerlist.split("\n").map((el) => el.split(VS_REGEX))) {
        if (players.length !== 2) continue;
        const [p1, p2] = players;
        if (!BYE_REGEX.test(p1)) {
            compatibilized.push(p1);
        }
        if (!BYE_REGEX.test(p2)) {
            compatibilized.push(p2);
        }
    }
    return compatibilized;
}

// @ts-ignore
if (process.title === "browser") {
    const button = document.getElementById("compatibilizer");
    button?.addEventListener("click", () => {
        const playerlist = (document.getElementById("playerlist") as HTMLInputElement | undefined)?.value;
        if (playerlist) {
            const compatibilized = document.getElementById("compatibilized");
            if (compatibilized) {
                compatibilized.innerHTML = compatibilize(playerlist).join("\n");
            }
        }
    });
}
