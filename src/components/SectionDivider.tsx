export default function SectionDivider({ flip = false }: { flip?: boolean }) {
    return (
        <div className={"relative h-16 w-full overflow-hidden md:h-24 " + (flip ? "rotate-180" : "")}>
            <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="absolute bottom-0 h-full w-full"
            >
                <path
                    d="M0,40 C300,90 900,0 1200,50 L1200,120 L0,120 Z"
                    fill="hsl(var(--primary) / 0.06)"
                />
                <path
                    d="M0,70 C300,20 900,110 1200,60 L1200,120 L0,120 Z"
                    fill="hsl(var(--secondary) / 0.06)"
                />
            </svg>
        </div>
    );
}