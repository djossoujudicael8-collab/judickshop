import { useEffect, useState } from "react";

/**
 * Detecte si l'utilisateur navigue principalement au toucher (mobile/tablette)
 * plutot qu'a la souris. Permet de desactiver les effets qui dependent du survol
 * (tilt 3D, hover complexe) sur les appareils tactiles, ou l'appareil ne peut
 * de toute facon pas les declencher correctement, et ou ils coutent des
 * ressources GPU inutiles.
 */
export function useIsTouchDevice() {
    const [isTouch, setIsTouch] = useState(true);

    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
        setIsTouch(!mq.matches);

        const handler = (e: MediaQueryListEvent) => setIsTouch(!e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return isTouch;
}