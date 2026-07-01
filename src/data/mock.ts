export type Category = {
    id: number;
    name: string;
    slug: string;
    image: string;
};

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    categoryId: number;
    categoryName: string;
    sku: string;
};

export type BlogPost = {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    coverImage: string;
    category: string;
    publishedAt: string;
};

export const mockCategories: Category[] = [
    {
        id: 1,
        name: "Mode",
        slug: "mode",
        image:
            "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "Electronique",
        slug: "electronique",
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Bijoux",
        slug: "bijoux",
        image:
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    },
];

export const mockProducts: Product[] = [
    {
        id: 1,
        name: "Blazer Premium Lin",
        description:
            "Blazer elegant en lin naturel, coupe ajustee. Parfait pour les occasions formelles ou un look decontracte chic.",
        price: 45000,
        image:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
        categoryId: 1,
        categoryName: "Mode",
        sku: "BLZ-LIN-001",
    },
    {
        id: 2,
        name: "Ecouteurs Sans Fil Pro",
        description:
            "Ecouteurs Bluetooth 5.3 avec reduction de bruit active. Autonomie 30h avec le boitier, son haute fidelite.",
        price: 35000,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
        categoryId: 2,
        categoryName: "Electronique",
        sku: "ECU-PRO-003",
    },
    {
        id: 3,
        name: "Bracelet Or 18K",
        description:
            "Bracelet en or 18 carats, design contemporain et intemporel. Finition polie miroir, chaine ajustable.",
        price: 125000,
        image:
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
        categoryId: 3,
        categoryName: "Bijoux",
        sku: "BRZ-OR0-005",
    },
    {
        id: 4,
        name: "Montre Connectee Elegance",
        description:
            "Montre intelligente avec ecran AMOLED, suivi de la sante, GPS integre. Bracelet en cuir veritable interchangeable.",
        price: 55000,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
        categoryId: 2,
        categoryName: "Electronique",
        sku: "MTR-CON-004",
    },
    {
        id: 5,
        name: "Chemise en Coton Bio",
        description:
            "Chemise confectionnee en coton biologique de haute qualite. Coupe moderne, col italien, boutons en nacre.",
        price: 25000,
        image:
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
        categoryId: 1,
        categoryName: "Mode",
        sku: "CHM-BIO-002",
    },
    {
        id: 6,
        name: "Bagues Empilables",
        description:
            "Set de 3 bagues en argent sterling 925 avec finition doree. Design minimaliste, a porter seules ou empilees.",
        price: 28000,
        image:
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
        categoryId: 3,
        categoryName: "Bijoux",
        sku: "BGQ-EMP-006",
    },
];

export const mockBlogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Comment choisir votre style personnalise",
        excerpt:
            "Trouver son style personnel est un voyage qui merite d'etre savoure. Decouvrez nos conseils pour construire un vestiaire qui vous ressemble.",
        content:
            "Trouver son style personnel est un voyage qui merite d'etre savoure. Un vestiaire bien construit commence par des pieces intemporelles. Investissez dans des vetements de qualite qui dureront des annees.\n\nUn blazer en lin, une chemise en coton bio, un jean parfaitement ajuste — ces fondations vous serviront dans toutes les occasions.\n\nLes accessoires sont ce qui transforme une tenue basique en look memorable. Une montre elegante, un bracelet delicat ou des ecouteurs design peuvent faire toute la difference.\n\nLes couleurs neutres — beige, creme, brun, noir — forment une base polyvalente. Ajoutez des touches de couleur selon votre personnalite et votre humeur.",
        coverImage:
            "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
        category: "Style",
        publishedAt: "2025-01-15",
    },
    {
        id: 2,
        title: "Les tendances tech de 2025",
        excerpt:
            "Le monde de la technologie evolue a une vitesse fulgurante. Decouvrez les gadgets qui feront la difference cette annee.",
        content:
            "Le monde de la technologie evolue a une vitesse fulgurante. Les ecouteurs de nouvelle generation offrent une qualite sonore exceptionnelle avec une reduction de bruit toujours plus performante.\n\nL'autonomie atteint desormais des records avec jusqu'a 40 heures d'ecoute. Les montres connectees d'aujourd'hui integrent des fonctionnalites de sante avancees, des paiements sans contact et une personnalisation poussee.\n\nLa technologie ne se contente plus d'etre fonctionnelle — elle doit aussi etre belle. Les finitions premium, les materiaux nobles et l'attention aux details font la difference.",
        coverImage:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        category: "Technologie",
        publishedAt: "2025-02-03",
    },
    {
        id: 3,
        title: "L'art des bijoux contemporains",
        excerpt:
            "Les bijoux contemporains marient tradition artisanale et design moderne. Decouvrez comment choisir des pieces qui racontent votre histoire.",
        content:
            "Les bijoux contemporains marient tradition artisanale et design moderne. Les lignes epurees et les formes geometriques dominent la joaillerie contemporaine.\n\nCes pieces s'adaptent a toutes les occasions, du quotidien aux evenements les plus prestigieux. L'or 18 carats et l'argent sterling 925 restent les choix privilegies pour leur durabilite et leur eclat.\n\nPorter plusieurs bagues ou bracelets ensemble cree un style personnel unique. Mixez les metaux, les textures et les epaisseurs pour un resultat harmonieux.",
        coverImage:
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
        category: "Bijoux",
        publishedAt: "2025-03-10",
    },
];