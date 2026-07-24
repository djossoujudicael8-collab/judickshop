import { Truck, ShieldCheck, Heart, Undo2 } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
    {
        icon: Truck,
        title: "Livraison rapide",
        text: "Partout ou vous etes",
    },
    {
        icon: ShieldCheck,
        title: "Paiement securise",
        text: "A la livraison",
    },
    {
        icon: Heart,
        title: "Produits selectionnes",
        text: "Avec soin et exigence",
    },
    {
        icon: Undo2,
        title: "Retour facile",
        text: "Satisfaction garantie",
    },
];

export default function TrustBadges() {
    return (
        <section className="relative z-10 mx-auto max-w-7xl px-4 -mt-8 md:px-8 md:-mt-10">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {badges.map((badge, index) => (
                    <motion.div
                        key={badge.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        className="glass flex flex-col items-center gap-2 rounded-2xl px-4 py-6 text-center shadow-sm md:flex-row md:gap-4 md:text-left"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-md">
                            <badge.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground">{badge.title}</p>
                            <p className="text-xs text-muted-foreground">{badge.text}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}