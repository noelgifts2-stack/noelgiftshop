import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SnowEffect from '@/components/SnowEffect';
import ToastContainer from '@/components/ToastContainer';
import CookieConsent from '@/components/CookieConsent';
import Link from 'next/link';
import { Home, ShoppingBag, Heart, Gift } from 'lucide-react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NOËL GIFT SHOP | Boutique de Cadeaux de Noël - France, Canada, Allemagne, Espagne',
  description: 'Boutique en ligne officielle certifiée Google Merchant de cadeaux féeriques pour Noël 2026. Mode, montres, high-tech, jouets, beauté et coffrets prêts à offrir.',
  keywords: ['cadeaux noel', 'christmas gifts', 'weihnachtsgeschenke', 'regalos navidad', 'google shopping', 'coffrets cadeaux', 'e-commerce festif'],
  authors: [{ name: 'NOËL GIFT SHOP' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.noelgiftshop.com'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'NOËL GIFT SHOP | Le cadeau parfait se trouve ici !',
    description: 'Boutique en ligne de cadeaux de Noël pour toute la famille. Emballage offert et livraison soignée.',
    type: 'website',
    images: ['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className="bg-[#FFFDF8] text-[#242424] antialiased min-h-screen flex flex-col pb-16 md:pb-0">
        <ShopProvider>
          {/* Flocons de neige canvas léger 60fps */}
          <SnowEffect />

          {/* En-tête multi-pays avec recherche et devises */}
          <Header />

          {/* Tiroir Panier latéral */}
          <CartDrawer />

          {/* Notifications Toast */}
          <ToastContainer />

          {/* Contenu principal */}
          <main className="flex-1">{children}</main>

          {/* Pied de page international */}
          <Footer />

          {/* Bandeau de consentement Cookies RGPD */}
          <CookieConsent />

          {/* Barre de navigation mobile inférieure (style application) */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#F1ECE1] py-2 px-6 flex justify-around items-center z-40 shadow-lg">
            <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-[#C62828]">
              <Home className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Accueil</span>
            </Link>
            <Link href="/shop" className="flex flex-col items-center text-gray-600 hover:text-[#C62828]">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Boutique</span>
            </Link>
            <Link href="/shop?wishlist=true" className="flex flex-col items-center text-gray-600 hover:text-[#C62828]">
              <Heart className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Favoris</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center text-[#C62828]">
              <Gift className="w-5 h-5" />
              <span className="text-[10px] mt-0.5 font-bold">Panier</span>
            </Link>
          </nav>
        </ShopProvider>
      </body>
    </html>
  );
}
