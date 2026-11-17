import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, saveProduct, toggleProductAvailability, deleteProduct, getProductById } from '@/lib/adminStore';
import { Product } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase();
    const availability = searchParams.get('availability');

    let products = getAllProducts();

    if (category && category !== 'all') {
      products = products.filter(p => p.categorySlug === category);
    }

    if (availability && availability !== 'all') {
      products = products.filter(p => p.availability === availability);
    }

    if (search) {
      products = products.filter(p => 
        p.title.fr?.toLowerCase().includes(search) ||
        p.title.en?.toLowerCase().includes(search) ||
        p.sku?.toLowerCase().includes(search) ||
        p.gtin?.includes(search) ||
        p.brand?.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({
      success: true,
      total: products.length,
      products
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// Créer un nouveau produit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product, actor } = body;

    if (!product || !product.title?.fr || !product.categorySlug) {
      return NextResponse.json({ success: false, message: 'Données produit invalides' }, { status: 400 });
    }

    const newId = product.id || `prod-${product.categorySlug}-${Date.now().toString().slice(-5)}`;
    const newSku = product.sku || `NOEL-${product.categorySlug.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Générer GTIN EAN-13 valide si non fourni
    let gtin = product.gtin;
    if (!gtin || gtin.length !== 13) {
      const base12 = `3760${Math.floor(10000000 + Math.random() * 90000000)}`;
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(base12[i]) * (i % 2 === 0 ? 1 : 3);
      }
      const checkDigit = (10 - (sum % 10)) % 10;
      gtin = `${base12}${checkDigit}`;
    }

    const createdProduct = saveProduct({
      ...product,
      id: newId,
      sku: newSku,
      gtin,
      mpn: product.mpn || newSku,
      brand: product.brand || "NOËL PRESTIGE",
      identifierExists: true,
      condition: "new",
      stock: product.stock !== undefined ? Number(product.stock) : 25,
      availability: product.availability || 'in_stock',
      rating: product.rating || 4.8,
      reviewsCount: product.reviewsCount || 12,
      isBestseller: !!product.isBestseller,
      isPromo: !!product.isPromo,
      images: Array.isArray(product.images) && product.images.length > 0 
        ? product.images 
        : ["https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80"]
    }, actor || "Admin Principal");

    return NextResponse.json({
      success: true,
      message: 'Produit créé avec succès',
      product: createdProduct
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// Mettre à jour un produit existant
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { product, actor } = body;

    if (!product || !product.id) {
      return NextResponse.json({ success: false, message: 'Identifiant du produit manquant' }, { status: 400 });
    }

    const updated = saveProduct(product, actor || "Admin Principal");

    return NextResponse.json({
      success: true,
      message: 'Produit mis à jour avec succès',
      product: updated
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// Basculer Disponibilité (Vendu / Disponible)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, actor } = body;

    if (!productId) {
      return NextResponse.json({ success: false, message: 'productId manquant' }, { status: 400 });
    }

    const result = toggleProductAvailability(productId, actor || "Admin Principal");

    return NextResponse.json({
      success: true,
      message: `Statut du produit modifié en ${result.availability === 'in_stock' ? 'Disponible' : 'Vendu / Rupture'}`,
      availability: result.availability,
      stock: result.stock
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// Supprimer un produit
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');
    const actor = searchParams.get('actor') || 'Admin Principal';

    if (!productId) {
      return NextResponse.json({ success: false, message: 'id manquant' }, { status: 400 });
    }

    const deleted = deleteProduct(productId, actor);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Produit introuvable' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Produit supprimé du catalogue'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
