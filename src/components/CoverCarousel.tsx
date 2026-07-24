import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";

interface CoverCarouselProps {
    children: ReactNode[];
}

/**
 * Carrousel inspire "Cover Flow / Netflix" : les cartes se retrouvent
 * mises a l'echelle et legerement inclinees selon leur distance au centre
 * du conteneur visible. Fonctionne au scroll tactile (mobile) et a la molette
 * (desktop), sans dependance externe.
 */
export default function CoverCarousel({ children }: CoverCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [transforms, setTransforms] = useState(
        children.map(() => ({ scale: 1, rotate: 0, opacity: 1 }))
    );

    const updateTransforms = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;
        const containerCenter = container.scrollLeft + container.clientWidth / 2;

        const next = itemRefs.current.map((el) => {
            if (!el) return { scale: 1, rotate: 0, opacity: 1 };
            const itemCenter = el.offsetLeft + el.offsetWidth / 2;
            const distance = itemCenter - containerCenter;
            const normalized = Math.min(Math.abs(distance) / (container.clientWidth / 2 + 1), 1);
            const scale = 1 - normalized * 0.16;
            const rotate = (distance > 0 ? -1 : 1) * normalized * 8;
            const opacity = 1 - normalized * 0.3;
            return { scale, rotate, opacity };
        });

        setTransforms(next);
    }, []);

    useEffect(() => {
        updateTransforms();
        const container = containerRef.current;
        if (!container) return;

        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(updateTransforms);
        };

        container.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            container.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(raf);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateTransforms, children.length]);

    return (
        <div
            ref={containerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-[12vw] pb-4 [perspective:1400px] md:px-8"
        >
            {children.map((child, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        itemRefs.current[i] = el;
                    }}
                    className="w-[64vw] shrink-0 snap-center will-change-transform sm:w-[42vw] md:w-[260px] lg:w-[280px]"
                    style={{
                        transform: `scale(${transforms[i]?.scale ?? 1}) rotateY(${transforms[i]?.rotate ?? 0}deg)`,
                        opacity: transforms[i]?.opacity ?? 1,
                        transition: "transform 0.12s ease-out, opacity 0.12s ease-out",
                    }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
}