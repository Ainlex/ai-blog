import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/lib/sanity';
import HerramientasGrid from '@/components/HerramientasGrid';
import HeroSection from '@/components/HeroSection';

const validCategories = ['principiantes', 'profesionales', 'empresas'] as const;
type ValidCategory = typeof validCategories[number];

const titles: Record<ValidCategory, string> = {
  principiantes: 'Herramientas de IA para Principiantes',
  profesionales: 'Herramientas de IA para Profesionales',
  empresas: 'Herramientas de IA para Empresas'
};

const descriptions: Record<ValidCategory, string> = {
  principiantes: 'Descubre las mejores herramientas de IA para comenzar. Perfectas para principiantes que quieren aprender y experimentar con la inteligencia artificial.',
  profesionales: 'Herramientas de IA avanzadas para profesionales. Potencia tu trabajo y productividad con las últimas innovaciones en inteligencia artificial.',
  empresas: 'Soluciones empresariales de IA. Transforma tu negocio con herramientas de inteligencia artificial diseñadas para escalar.'
};

const toolsQuery = `*[_type == "aiTool" && category == $category] | order(order asc) {
  _id,
  name,
  slug,
  shortDescription,
  priceType,
  price,
  rating,
  featured,
  usersCount,
  discount,
  affiliateUrl,
  "icon": {
    "url": icon.asset->url,
    "alt": icon.alt
  },
  tags
}`;

const tagsQuery = `*[_type == "aiTool" && category == $category].tags[]`;

// Generar rutas estáticas
export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }));
}

// Generar metadata dinámica
export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category;
  
  if (!validCategories.includes(category as ValidCategory)) {
    return {
      title: 'Página no encontrada',
    };
  }

  const validCategory = category as ValidCategory;

  return {
    title: titles[validCategory],
    description: descriptions[validCategory],
    openGraph: {
      title: titles[validCategory],
      description: descriptions[validCategory],
      type: 'website',
      images: [
        {
          url: `https://promptlab.vercel.app/og/herramientas-${validCategory}.png`,
          width: 1200,
          height: 630,
          alt: titles[validCategory],
        },
      ],
    },
  };
}

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const category = params.category;

  // Validar categoría
  if (!validCategories.includes(category as ValidCategory)) {
    notFound();
  }

  try {
    // Obtener datos
    const [tools, allTags] = await Promise.all([
      sanityClient.fetch(toolsQuery, { category }),
      sanityClient.fetch<string[]>(tagsQuery, { category }),
    ]);

    // Obtener tags únicos y filtrar valores nulos
    const uniqueTags = Array.from(new Set(allTags)).filter(Boolean);

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <HeroSection category={category as ValidCategory} />

        {/* Grid de herramientas con filtros */}
        <HerramientasGrid
          tools={tools}
          tags={uniqueTags}
          category={category as ValidCategory}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-600">
          Error al cargar las herramientas. Por favor, intenta de nuevo más tarde.
        </p>
      </div>
    );
  }
};

export default CategoryPage;
