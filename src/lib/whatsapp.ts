export const WHATSAPP_NUMBER = "22999521506";

export function getWhatsAppLink(product?: {
    name: string;
    price: number;
}) {
    const base = `https://wa.me/${WHATSAPP_NUMBER}`;

    if (!product) {
        return `${base}?text=${encodeURIComponent("Bonjour, j'ai une question.")}`;
    }

    const msg =
        "Bonjour, je suis interesse(e) par le produit " +
        '"' + product.name + '"' +
        " (Prix: " + product.price.toLocaleString() + " FCFA)." +
        " Est-il encore disponible ?";

    return `${base}?text=${encodeURIComponent(msg)}`;
}

export function getCartWhatsAppLink(
    items: { name: string; quantity: number; price: number }[]
) {
    const base = `https://wa.me/${WHATSAPP_NUMBER}`;

    const itemList = items
        .map(
            (item) =>
                "- " +
                item.name +
                " (x" +
                item.quantity +
                ") : " +
                (item.price * item.quantity).toLocaleString() +
                " FCFA"
        )
        .join("\n");

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const msg =
        "Bonjour, je souhaite commander les articles suivants :\n\n" +
        itemList +
        "\n\nTotal : " +
        total.toLocaleString() +
        " FCFA\n\nMerci de me confirmer la disponibilite.";

    return `${base}?text=${encodeURIComponent(msg)}`;
}