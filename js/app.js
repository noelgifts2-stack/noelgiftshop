/**
 * NOËL GIFT SHOP - Application Controller & Router
 * Gère le routage, les rendus de pages, les filtres, la recherche et les interactions
 */

const App = {
  currentRoute: "home",
  routeParam: null,
  activeFilters: {
    category: "all",
    recipient: "all",
    budget: "all",
    maxPrice: 250000,
    search: "",
    sortBy: "popular",
    onlyPromo: false,
    inStock: false
  },
  currentPage: 1,
  itemsPerPage: 8,

  init() {
    Store.init();
    this.initSnow();
    this.initCountdown();
    this.initRouter();
    this.initGlobalListeners();
    this.renderHeaderCartCount();
    this.renderHeaderWishlistCount();

    // Subscribe to store updates
    Store.subscribe(() => {
      this.renderHeaderCartCount();
      this.renderHeaderWishlistCount();
      this.updateCartDrawer();
      if (this.currentRoute === "cart") this.renderCartPage();
      if (this.currentRoute === "checkout") this.renderCheckoutSummary();
    });
  },

  // ROUTER SIMPLE BASÉ SUR LE HASH
  initRouter() {
    window.addEventListener("hashchange", () => this.handleRouting());
    this.handleRouting();
  },

  handleRouting() {
    const hash = window.location.hash.slice(1) || "home";
    const parts = hash.split("/");
    this.currentRoute = parts[0] || "home";
    this.routeParam = parts[1] || null;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Close any open drawers
    this.closeMobileMenu();
    this.closeCartDrawer();
    this.closeQuickView();

    // Hide search suggestions
    const searchDropdown = document.getElementById("search-results-dropdown");
    if (searchDropdown) searchDropdown.classList.add("hidden");

    // Render corresponding view
    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    switch (this.currentRoute) {
      case "home":
        this.renderHomePage();
        break;
      case "shop":
        this.renderShopPage();
        break;
      case "category":
        this.renderCategoryPage(this.routeParam);
        break;
      case "product":
        this.renderProductDetailPage(this.routeParam);
        break;
      case "cart":
        this.renderCartPage();
        break;
      case "checkout":
        this.renderCheckoutPage();
        break;
      case "contact":
        this.renderContactPage();
        break;
      case "promotions":
        this.activeFilters.onlyPromo = true;
        this.renderShopPage();
        break;
      case "wishlist":
        this.renderWishlistPage();
        break;
      default:
        this.renderHomePage();
    }

    this.updateActiveNavLinks();
  },

  navigate(route) {
    window.location.hash = route;
  },

  updateActiveNavLinks() {
    document.querySelectorAll("[data-nav-route]").forEach(link => {
      const target = link.getAttribute("data-nav-route");
      if (target === this.currentRoute) {
        link.classList.add("text-[#C62828]", "font-bold");
        link.classList.remove("text-[#242424]");
      } else {
        link.classList.remove("text-[#C62828]", "font-bold");
        link.classList.add("text-[#242424]");
      }
    });
  },

  // HEADER COUNTERS
  renderHeaderCartCount() {
    const count = Store.getCartCount();
    document.querySelectorAll(".cart-count-badge").forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? "flex" : "none";
    });
  },

  renderHeaderWishlistCount() {
    const count = Store.state.wishlist.length;
    document.querySelectorAll(".wishlist-count-badge").forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? "flex" : "none";
    });
  },

  // 1. PAGE D'ACCUEIL (HOMEPAGE)
  renderHomePage() {
    const mainContent = document.getElementById("main-content");
    const bestSellers = PRODUCTS.filter(p => p.isBestseller).slice(0, 8);
    const promoProducts = PRODUCTS.filter(p => p.isPromo).slice(0, 4);

    mainContent.innerHTML = `
      <!-- HERO BANNER FESTIF -->
      <section class="relative bg-gradient-to-br from-[#14532D] via-[#0D381E] to-[#0A2614] text-white overflow-hidden py-14 lg:py-20 border-b-4 border-[#F4C542]">
        <!-- Décorations festives en arrière-plan -->
        <div class="absolute -right-24 -top-24 w-96 h-96 bg-[#C62828]/25 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute left-1/3 -bottom-20 w-80 h-80 bg-[#F4C542]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
              <!-- Badge Spécial Noël 2026 -->
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C62828] text-[#F4C542] border border-[#F4C542]/40 text-xs sm:text-sm font-bold shadow-lg badge-gold-glow animate-bounce">
                <span>🎅 Spécial Noël 2026</span>
                <span class="w-1.5 h-1.5 rounded-full bg-[#F4C542]"></span>
                <span class="text-white font-normal">Livraison garantie avant le réveillon</span>
              </div>

              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading leading-tight tracking-tight">
                Le cadeau parfait <br class="hidden sm:inline"/>
                <span class="text-gold-gradient">se trouve ici !</span>
              </h1>

              <p class="text-base sm:text-lg text-[#FFFDF8]/90 max-w-2xl font-light leading-relaxed">
                Faites plaisir à ceux que vous aimez avec notre sélection de cadeaux pour tous les goûts et tous les budgets.
                Emballage festif soigné et paiement sécurisé par Mobile Money.
              </p>

              <!-- Boutons Call to Action -->
              <div class="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                <a href="#shop" class="px-7 py-3.5 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-xl hover-lift flex items-center gap-2.5 text-base border border-[#F4C542]/30 pulse-festive">
                  <svg class="w-5 h-5 text-[#F4C542]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                  Découvrir la boutique
                </a>
                <a href="#promotions" class="px-7 py-3.5 rounded-xl font-bold text-[#242424] bg-[#F4C542] hover:bg-[#E5B535] shadow-lg hover-lift flex items-center gap-2.5 text-base">
                  <svg class="w-5 h-5 text-[#C62828]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
                  Voir les promotions
                </a>
              </div>

              <!-- Compte à rebours Noël -->
              <div class="pt-6 border-t border-white/15">
                <div class="text-xs uppercase tracking-wider text-[#F4C542] font-semibold mb-2 flex items-center justify-center lg:justify-start gap-2">
                  <span>🎄 Compte à rebours jusqu'à Noël :</span>
                </div>
                <div class="flex gap-3 justify-center lg:justify-start" id="hero-countdown">
                  <div class="bg-black/35 backdrop-blur px-3.5 py-2 rounded-lg border border-white/10 text-center min-w-[62px]">
                    <span class="block text-2xl font-black text-white" id="cd-days">45</span>
                    <span class="text-[10px] text-gray-300 uppercase">Jours</span>
                  </div>
                  <div class="bg-black/35 backdrop-blur px-3.5 py-2 rounded-lg border border-white/10 text-center min-w-[62px]">
                    <span class="block text-2xl font-black text-[#F4C542]" id="cd-hours">12</span>
                    <span class="text-[10px] text-gray-300 uppercase">Heures</span>
                  </div>
                  <div class="bg-black/35 backdrop-blur px-3.5 py-2 rounded-lg border border-white/10 text-center min-w-[62px]">
                    <span class="block text-2xl font-black text-white" id="cd-mins">34</span>
                    <span class="text-[10px] text-gray-300 uppercase">Min</span>
                  </div>
                  <div class="bg-black/35 backdrop-blur px-3.5 py-2 rounded-lg border border-white/10 text-center min-w-[62px]">
                    <span class="block text-2xl font-black text-[#F4C542]" id="cd-secs">50</span>
                    <span class="text-[10px] text-gray-300 uppercase">Sec</span>
                  </div>
                </div>
              </div>

            </div>

            <!-- Image Hero interactive -->
            <div class="lg:col-span-5 relative">
              <div class="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-[#F4C542]/50 group">
                <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80" alt="Cadeaux de Noël" class="w-full h-[430px] object-cover transition-transform duration-700 group-hover:scale-105"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span class="inline-block px-3 py-1 rounded-full bg-[#C62828] text-white text-xs font-bold w-max mb-2">Collection Festive</span>
                  <p class="text-xl font-bold text-white font-heading">Coffrets Cadeaux & Merveilles</p>
                  <p class="text-xs text-gray-200 mt-1">Prêts à être déposés au pied de votre sapin</p>
                </div>
              </div>

              <!-- Pastille flottante promo -->
              <div class="absolute -bottom-4 -left-4 sm:left-4 bg-white text-[#242424] p-3.5 rounded-2xl shadow-xl border-2 border-[#C62828] flex items-center gap-3 animate-pulse">
                <div class="w-11 h-11 rounded-xl bg-[#C62828]/10 text-[#C62828] flex items-center justify-center font-bold text-xl">🎁</div>
                <div>
                  <p class="text-xs text-gray-500 font-semibold uppercase">Code Promo</p>
                  <p class="text-sm font-bold text-[#C62828]"><span class="bg-[#C62828]/10 px-1.5 py-0.5 rounded text-black font-mono">NOEL2026</span> : -15%</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- SECTION AVANTAGES (BÉNÉFICES CLÉS) -->
      <section class="py-8 bg-white border-b border-[#F1ECE1]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="flex items-center gap-3.5 p-3 rounded-xl bg-[#FFFDF8] border border-[#F1ECE1]">
              <div class="w-12 h-12 rounded-xl bg-[#14532D]/10 text-[#14532D] flex items-center justify-center text-2xl flex-shrink-0">🚚</div>
              <div>
                <h4 class="font-bold text-sm text-[#242424]">Livraison Rapide</h4>
                <p class="text-xs text-gray-500">Sous 24h à 48h partout</p>
              </div>
            </div>
            <div class="flex items-center gap-3.5 p-3 rounded-xl bg-[#FFFDF8] border border-[#F1ECE1]">
              <div class="w-12 h-12 rounded-xl bg-[#C62828]/10 text-[#C62828] flex items-center justify-center text-2xl flex-shrink-0">🔒</div>
              <div>
                <h4 class="font-bold text-sm text-[#242424]">Paiement Sécurisé</h4>
                <p class="text-xs text-gray-500">MTN, Moov & Espèces</p>
              </div>
            </div>
            <div class="flex items-center gap-3.5 p-3 rounded-xl bg-[#FFFDF8] border border-[#F1ECE1]">
              <div class="w-12 h-12 rounded-xl bg-[#F4C542]/20 text-[#A67C00] flex items-center justify-center text-2xl flex-shrink-0">🎁</div>
              <div>
                <h4 class="font-bold text-sm text-[#242424]">Emballage Cadeau</h4>
                <p class="text-xs text-gray-500">Papier & ruban festif offert</p>
              </div>
            </div>
            <div class="flex items-center gap-3.5 p-3 rounded-xl bg-[#FFFDF8] border border-[#F1ECE1]">
              <div class="w-12 h-12 rounded-xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center text-2xl flex-shrink-0">💬</div>
              <div>
                <h4 class="font-bold text-sm text-[#242424]">Service Client 7j/7</h4>
                <p class="text-xs text-gray-500">Assistance directe WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 10 CATÉGORIES POPULAIRES -->
      <section class="py-14 sm:py-18 bg-[#FFFDF8]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-[#C62828] text-xs font-bold tracking-widest uppercase">Explorez la magie</span>
            <h2 class="text-3xl font-extrabold text-[#242424] font-heading mt-1">Nos Catégories Populaires</h2>
            <p class="text-sm text-gray-600 mt-2">Dénichez des idées cadeaux inspirantes classées avec soin pour toutes les envies</p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            ${CATEGORIES.map(cat => `
              <a href="#category/${cat.slug}" class="group relative rounded-2xl overflow-hidden bg-white border border-[#F1ECE1] shadow-sm hover-lift flex flex-col">
                <div class="aspect-square w-full overflow-hidden bg-gray-100 relative">
                  <img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                  <span class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#14532D] text-[#F4C542] text-[10px] font-bold">
                    ${cat.badge}
                  </span>
                </div>
                <div class="p-3 text-center flex-1 flex flex-col justify-center bg-white group-hover:bg-[#FFF9F0] transition-colors">
                  <h3 class="font-bold text-xs sm:text-sm text-[#242424] group-hover:text-[#C62828] transition-colors line-clamp-1">${cat.name}</h3>
                  <p class="text-[11px] text-gray-500 mt-0.5">Découvrir →</p>
                </div>
              </a>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- SECTION MEILLEURES VENTES (GRID 4-5 ITEMS DESKTOP) -->
      <section class="py-14 bg-white border-y border-[#F1ECE1]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <span class="text-[#C62828] text-xs font-bold tracking-widest uppercase">Les coups de cœur de la saison</span>
              <h2 class="text-3xl font-extrabold text-[#242424] font-heading mt-1">Nos Meilleures Ventes</h2>
            </div>
            <a href="#shop" class="text-sm font-bold text-[#C62828] hover:text-[#A71D1D] flex items-center gap-1 group">
              Voir tout le catalogue
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            ${bestSellers.map(product => this.renderProductCardHTML(product)).join("")}
          </div>
        </div>
      </section>

      <!-- SECTION PROMOTIONS DE NOËL AVEC BANNIÈRE ATTRACTIVE -->
      <section class="py-14 bg-[#FFFDF8]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl bg-gradient-to-r from-[#C62828] via-[#B22222] to-[#8B0000] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-10 border-2 border-[#F4C542]">
            <div class="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
              <svg class="w-96 h-96" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div class="relative z-10 max-w-2xl">
              <span class="inline-block px-3 py-1 rounded-full bg-[#F4C542] text-[#242424] text-xs font-extrabold uppercase mb-3">Vente Flash de Noël</span>
              <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-white">« Les offres de Noël sont arrivées ! »</h2>
              <p class="text-sm sm:text-base text-gray-200 mt-2 font-light">
                Profitez de réductions exceptionnelles jusqu'à -35% sur une sélection de cadeaux festifs. Stocks limités !
              </p>
              <div class="mt-6 flex flex-wrap gap-4">
                <a href="#promotions" class="px-6 py-3 rounded-xl bg-white text-[#C62828] font-bold text-sm hover:bg-[#FFF3B0] shadow-md transition-colors">
                  Profiter des réductions
                </a>
                <span class="inline-flex items-center text-xs font-semibold text-[#F4C542]">
                  ⚡ Offres valables dans la limite des stocks disponibles
                </span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
            ${promoProducts.map(product => this.renderProductCardHTML(product)).join("")}
          </div>
        </div>
      </section>

      <!-- SECTION CADEAUX PAR DESTINATAIRE -->
      <section class="py-14 bg-white border-y border-[#F1ECE1]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-[#14532D] text-xs font-bold tracking-widest uppercase">Guide d'achat sur-mesure</span>
            <h2 class="text-3xl font-extrabold text-[#242424] font-heading mt-1">Cadeaux par Destinataire</h2>
            <p class="text-sm text-gray-600 mt-2">Trouvez en un clin d'œil le présent adapté à chaque être cher</p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            ${RECIPIENTS.map(rec => `
              <div onclick="App.filterByRecipient('${rec.id}')" class="cursor-pointer group relative rounded-2xl overflow-hidden shadow-sm border border-[#F1ECE1] hover-lift bg-white">
                <div class="h-44 w-full overflow-hidden relative">
                  <img src="${rec.image}" alt="${rec.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div class="absolute bottom-3 left-3 right-3 text-white">
                    <h3 class="font-bold text-sm sm:text-base leading-tight font-heading">${rec.name}</h3>
                    <p class="text-[11px] text-[#F4C542] mt-0.5">${rec.count} idées cadeaux</p>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- SECTION PETITS BUDGETS -->
      <section class="py-14 bg-[#FFFDF8]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-[#C62828] text-xs font-bold tracking-widest uppercase">Budget Maîtrisé</span>
            <h2 class="text-3xl font-extrabold text-[#242424] font-heading mt-1">« Faire plaisir sans se ruiner »</h2>
            <p class="text-sm text-gray-600 mt-2">Des attentions magiques et abordables pour combler tous vos proches</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            ${BUDGET_RANGES.map(b => `
              <div onclick="App.filterByBudget('${b.id}')" class="cursor-pointer p-6 rounded-2xl bg-white border border-[#F1ECE1] shadow-sm hover:border-[#C62828] hover-lift transition-all text-center group">
                <div class="w-14 h-14 mx-auto rounded-2xl bg-[#FFF5E6] text-[#C62828] flex items-center justify-center text-2xl group-hover:bg-[#C62828] group-hover:text-white transition-colors mb-4">
                  🎁
                </div>
                <h3 class="font-bold text-base text-[#242424] group-hover:text-[#C62828] font-heading">${b.name}</h3>
                <p class="text-xs text-gray-500 mt-2 line-clamp-2">${b.description}</p>
                <span class="inline-block mt-4 text-xs font-bold text-[#14532D] group-hover:underline">Voir la sélection →</span>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- AVIS CLIENTS & SATISFACTION -->
      <section class="py-14 bg-white border-t border-[#F1ECE1]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <div class="flex justify-center text-[#F4C542] text-xl gap-1 mb-2">★★★★★</div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#242424] font-heading">Ils ont vécu la magie de Noël avec nous</h2>
            <p class="text-xs sm:text-sm text-gray-500 mt-1">Plus de 2 500 commandes livrées avec le sourire pour les fêtes</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-[#FFFDF8] border border-[#F1ECE1] shadow-sm space-y-3">
              <div class="flex items-center gap-1 text-[#F4C542]">★★★★★</div>
              <p class="text-xs sm:text-sm text-gray-700 italic">« Le coffret prestige est encore plus magnifique en vrai ! La boîte en bois laqué rouge et le mot personnalisé ont fait verser une larme à ma mère. Livraison ultra-rapide à Cotonou. »</p>
              <div class="flex items-center gap-3 pt-2">
                <div class="w-9 h-9 rounded-full bg-[#14532D] text-white flex items-center justify-center font-bold text-xs">SK</div>
                <div>
                  <h4 class="text-xs font-bold text-[#242424]">Sylvie K.</h4>
                  <p class="text-[11px] text-gray-400">Commande vérifiée • Coffret Prestige</p>
                </div>
              </div>
            </div>

            <div class="p-6 rounded-2xl bg-[#FFFDF8] border border-[#F1ECE1] shadow-sm space-y-3">
              <div class="flex items-center gap-1 text-[#F4C542]">★★★★★</div>
              <p class="text-xs sm:text-sm text-gray-700 italic">« J'ai commandé la montre chronographe et le casque Bluetooth pour mes ados. Paiement MTN Mobile Money facile et confirmation instantanée sur WhatsApp. Tout était parfaitement emballé ! »</p>
              <div class="flex items-center gap-3 pt-2">
                <div class="w-9 h-9 rounded-full bg-[#C62828] text-white flex items-center justify-center font-bold text-xs">AD</div>
                <div>
                  <h4 class="text-xs font-bold text-[#242424]">Armel D.</h4>
                  <p class="text-[11px] text-gray-400">Commande vérifiée • Montre & Casque</p>
                </div>
              </div>
            </div>

            <div class="p-6 rounded-2xl bg-[#FFFDF8] border border-[#F1ECE1] shadow-sm space-y-3">
              <div class="flex items-center gap-1 text-[#F4C542]">★★★★★</div>
              <p class="text-xs sm:text-sm text-gray-700 italic">« L'ours géant de 120 cm a rendu mon fils fou de joie le matin du 25 ! Rapport qualité-prix imbattable. Merci à toute l'équipe pour l'attention portée aux détails. »</p>
              <div class="flex items-center gap-3 pt-2">
                <div class="w-9 h-9 rounded-full bg-[#F4C542] text-[#242424] flex items-center justify-center font-bold text-xs">NL</div>
                <div>
                  <h4 class="text-xs font-bold text-[#242424]">Nadia L.</h4>
                  <p class="text-[11px] text-gray-400">Commande vérifiée • Jouets & Enfants</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    this.initCountdown();
  },

  // 2. PAGE BOUTIQUE / CATALOGUE COMPLET
  renderShopPage() {
    const mainContent = document.getElementById("main-content");
    let filtered = PRODUCTS.filter(p => {
      // Catégorie
      if (this.activeFilters.category !== "all" && p.category !== this.activeFilters.category) return false;
      // Destinataire
      if (this.activeFilters.recipient !== "all" && p.recipient !== this.activeFilters.recipient) return false;
      // Budget tier
      if (this.activeFilters.budget !== "all" && p.budgetTier !== this.activeFilters.budget) return false;
      // Prix max
      if (p.price > this.activeFilters.maxPrice) return false;
      // Promo only
      if (this.activeFilters.onlyPromo && !p.isPromo) return false;
      // En stock
      if (this.activeFilters.inStock && p.stock <= 0) return false;
      // Recherche textuelle
      if (this.activeFilters.search) {
        const query = this.activeFilters.search.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        const matchCat = p.category.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat) return false;
      }
      return true;
    });

    // Tri
    if (this.activeFilters.sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.activeFilters.sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.activeFilters.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (this.activeFilters.sortBy === "popular") {
      filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    // Pagination
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage) || 1;
    if (this.currentPage > totalPages) this.currentPage = 1;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const currentItems = filtered.slice(startIndex, startIndex + this.itemsPerPage);

    mainContent.innerHTML = `
      <div class="bg-[#FFFDF8] py-8 border-b border-[#F1ECE1]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Fil d'Ariane -->
          <nav class="flex text-xs text-gray-500 mb-4" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2">
              <li><a href="#home" class="hover:text-[#C62828]">Accueil</a></li>
              <li><span>/</span></li>
              <li class="text-[#242424] font-semibold">Notre boutique</li>
            </ol>
          </nav>

          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 class="text-3xl sm:text-4xl font-extrabold text-[#242424] font-heading">
                Notre Boutique de Noël
              </h1>
              <p class="text-sm text-gray-600 mt-1">
                Explorez tous nos trésors et cadeaux soigneusement sélectionnés pour les fêtes.
              </p>
            </div>

            <!-- Bouton Filtres sur mobile -->
            <button onclick="App.openMobileFilters()" class="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#14532D] text-white text-sm font-semibold shadow">
              <svg class="w-4 h-4 text-[#F4C542]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              Filtrer & Trier (${totalItems})
            </button>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <!-- SIDEBAR FILTRES DESKTOP -->
          <aside class="hidden md:block col-span-1 space-y-6">
            <div class="bg-white p-6 rounded-2xl border border-[#F1ECE1] shadow-sm space-y-6">
              
              <!-- En-tête filtres -->
              <div class="flex items-center justify-between pb-4 border-b border-[#F1ECE1]">
                <h3 class="font-bold text-[#242424] text-base flex items-center gap-2">
                  <svg class="w-4 h-4 text-[#C62828]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                  Filtres
                </h3>
                <button onclick="App.resetFilters()" class="text-xs text-[#C62828] hover:underline font-medium">Réinitialiser</button>
              </div>

              <!-- Filtre par Catégorie -->
              <div>
                <h4 class="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">Catégories</h4>
                <div class="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  <label class="flex items-center gap-2.5 text-sm cursor-pointer p-1.5 rounded-lg hover:bg-gray-50">
                    <input type="radio" name="shop_cat" value="all" ${this.activeFilters.category === 'all' ? 'checked' : ''} onchange="App.setFilter('category', 'all')" class="accent-[#C62828]"/>
                    <span class="${this.activeFilters.category === 'all' ? 'font-bold text-[#C62828]' : 'text-gray-700'}">Toutes les catégories</span>
                  </label>
                  ${CATEGORIES.map(cat => `
                    <label class="flex items-center justify-between text-sm cursor-pointer p-1.5 rounded-lg hover:bg-gray-50">
                      <div class="flex items-center gap-2.5">
                        <input type="radio" name="shop_cat" value="${cat.slug}" ${this.activeFilters.category === cat.slug ? 'checked' : ''} onchange="App.setFilter('category', '${cat.slug}')" class="accent-[#C62828]"/>
                        <span class="${this.activeFilters.category === cat.slug ? 'font-bold text-[#C62828]' : 'text-gray-700'}">${cat.name}</span>
                      </div>
                      <span class="text-xs text-gray-400">(${PRODUCTS.filter(p => p.category === cat.slug).length})</span>
                    </label>
                  `).join("")}
                </div>
              </div>

              <!-- Filtre Prix FCFA -->
              <div class="pt-4 border-t border-[#F1ECE1]">
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-bold text-xs uppercase tracking-wider text-gray-500">Prix maximum</h4>
                  <span class="text-xs font-bold text-[#C62828]" id="price-slider-label">${Store.formatPrice(this.activeFilters.maxPrice)}</span>
                </div>
                <input type="range" min="5000" max="250000" step="5000" value="${this.activeFilters.maxPrice}" 
                  oninput="App.onPriceSliderChange(this.value)" 
                  class="w-full accent-[#C62828] cursor-pointer"/>
                <div class="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>5 000 FCFA</span>
                  <span>250 000 FCFA</span>
                </div>
              </div>

              <!-- Filtre Destinataire -->
              <div class="pt-4 border-t border-[#F1ECE1]">
                <h4 class="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">Destinataire</h4>
                <div class="flex flex-wrap gap-1.5">
                  <button onclick="App.setFilter('recipient', 'all')" class="px-2.5 py-1 rounded-full text-xs font-medium border ${this.activeFilters.recipient === 'all' ? 'bg-[#14532D] text-white border-[#14532D]' : 'bg-gray-50 text-gray-700 border-gray-200'}">Tous</button>
                  ${RECIPIENTS.map(r => `
                    <button onclick="App.setFilter('recipient', '${r.id}')" class="px-2.5 py-1 rounded-full text-xs font-medium border ${this.activeFilters.recipient === r.id ? 'bg-[#14532D] text-white border-[#14532D]' : 'bg-gray-50 text-gray-700 border-gray-200'}">${r.name.replace('Cadeaux pour ', '')}</button>
                  `).join("")}
                </div>
              </div>

              <!-- Filtres Rapides (Promos & Stock) -->
              <div class="pt-4 border-t border-[#F1ECE1] space-y-2.5">
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" ${this.activeFilters.onlyPromo ? 'checked' : ''} onchange="App.setFilter('onlyPromo', this.checked)" class="rounded text-[#C62828] accent-[#C62828] w-4 h-4"/>
                  <span class="text-gray-700">Promotions uniquement 🎁</span>
                </label>
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" ${this.activeFilters.inStock ? 'checked' : ''} onchange="App.setFilter('inStock', this.checked)" class="rounded text-[#14532D] accent-[#14532D] w-4 h-4"/>
                  <span class="text-gray-700">En stock uniquement</span>
                </label>
              </div>

            </div>
          </aside>

          <!-- GRILLE DE PRODUITS ET BARRE D'OUTILS -->
          <main class="col-span-1 md:col-span-3">
            
            <!-- Barre d'outils / Tri -->
            <div class="bg-white p-4 rounded-2xl border border-[#F1ECE1] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div class="text-xs text-gray-500">
                Affichage de <span class="font-bold text-[#242424]">${totalItems > 0 ? startIndex + 1 : 0}</span> à 
                <span class="font-bold text-[#242424]">${Math.min(startIndex + this.itemsPerPage, totalItems)}</span> sur 
                <span class="font-bold text-[#C62828]">${totalItems}</span> cadeaux
              </div>

              <div class="flex items-center gap-2.5 w-full sm:w-auto">
                <label for="shop-sort" class="text-xs text-gray-500 whitespace-nowrap">Trier par :</label>
                <select id="shop-sort" onchange="App.setFilter('sortBy', this.value)" class="text-xs font-semibold bg-[#FFFDF8] border border-[#F1ECE1] rounded-xl px-3 py-2 text-[#242424] focus:outline-none focus:border-[#C62828] cursor-pointer w-full sm:w-auto">
                  <option value="popular" ${this.activeFilters.sortBy === 'popular' ? 'selected' : ''}>Popularité (Avis clients)</option>
                  <option value="price-asc" ${this.activeFilters.sortBy === 'price-asc' ? 'selected' : ''}>Prix : Croissant</option>
                  <option value="price-desc" ${this.activeFilters.sortBy === 'price-desc' ? 'selected' : ''}>Prix : Décroissant</option>
                  <option value="rating" ${this.activeFilters.sortBy === 'rating' ? 'selected' : ''}>Meilleures notes (★ 5.0)</option>
                </select>
              </div>
            </div>

            <!-- Grille de produits -->
            ${currentItems.length > 0 ? `
              <div class="grid grid-cols-2 lg:grid-cols-3 gap-5">
                ${currentItems.map(product => this.renderProductCardHTML(product)).join("")}
              </div>

              <!-- Pagination -->
              ${totalPages > 1 ? `
                <div class="flex items-center justify-center gap-2 mt-10">
                  <button onclick="App.goToPage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''} class="px-3.5 py-2 rounded-xl text-xs font-bold border border-[#F1ECE1] bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
                    ← Précédent
                  </button>
                  ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
                    <button onclick="App.goToPage(${page})" class="w-9 h-9 rounded-xl text-xs font-bold border ${page === this.currentPage ? 'bg-[#C62828] text-white border-[#C62828]' : 'bg-white text-gray-700 border-[#F1ECE1] hover:bg-gray-50'}">
                      ${page}
                    </button>
                  `).join("")}
                  <button onclick="App.goToPage(${this.currentPage + 1})" ${this.currentPage === totalPages ? 'disabled' : ''} class="px-3.5 py-2 rounded-xl text-xs font-bold border border-[#F1ECE1] bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
                    Suivant →
                  </button>
                </div>
              ` : ''}

            ` : `
              <!-- État vide -->
              <div class="bg-white rounded-3xl p-12 text-center border border-[#F1ECE1] shadow-sm">
                <div class="w-20 h-20 rounded-full bg-red-50 text-[#C62828] flex items-center justify-center text-4xl mx-auto mb-4">🔍</div>
                <h3 class="text-xl font-bold text-[#242424] font-heading">Aucun cadeau ne correspond à vos filtres</h3>
                <p class="text-sm text-gray-500 max-w-md mx-auto mt-2">
                  Essayez d'élargir votre recherche, de modifier le budget ou de réinitialiser les filtres.
                </p>
                <button onclick="App.resetFilters()" class="mt-6 px-6 py-2.5 rounded-xl bg-[#C62828] text-white font-bold text-xs shadow hover:bg-[#A71D1D]">
                  Réinitialiser tous les filtres
                </button>
              </div>
            `}

          </main>
        </div>
      </div>
    `;
  },

  // 3. PAGE CATÉGORIE DYNAMIQUE RÉUTILISABLE
  renderCategoryPage(slug) {
    const category = CATEGORIES.find(c => c.slug === slug) || CATEGORIES[0];
    const categoryProducts = PRODUCTS.filter(p => p.category === category.slug);

    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
      <!-- Bannière de Catégorie -->
      <section class="relative bg-[#14532D] text-white overflow-hidden py-12 lg:py-16 border-b-4 border-[#F4C542]">
        <div class="absolute inset-0 opacity-20 bg-cover bg-center" style="background-image: url('${category.image}');"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#14532D] via-[#14532D]/90 to-transparent"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <nav class="flex text-xs text-gray-300 mb-3" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2">
              <li><a href="#home" class="hover:text-[#F4C542]">Accueil</a></li>
              <li><span>/</span></li>
              <li><a href="#shop" class="hover:text-[#F4C542]">Boutique</a></li>
              <li><span>/</span></li>
              <li class="text-[#F4C542] font-semibold">${category.name}</li>
            </ol>
          </nav>

          <span class="inline-block px-3 py-1 rounded-full bg-[#C62828] text-[#F4C542] text-xs font-bold mb-3">
            Collection Spéciale Noël
          </span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white">
            ${category.name}
          </h1>
          <p class="text-sm sm:text-base text-gray-200 max-w-2xl mt-2 font-light">
            ${category.description}
          </p>

          <!-- Sous-catégories sous forme de pilules -->
          <div class="flex flex-wrap gap-2 mt-6">
            ${category.subcategories.map(sub => `
              <span class="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium cursor-pointer backdrop-blur transition-colors">
                ${sub}
              </span>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Grille des produits de la catégorie -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-[#242424] font-heading">Produits de cette collection</h2>
            <p class="text-xs text-gray-500 mt-0.5">${categoryProducts.length} articles disponibles</p>
          </div>
          <a href="#shop" class="text-xs font-bold text-[#C62828] hover:underline">
            Voir toute la boutique →
          </a>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          ${categoryProducts.map(p => this.renderProductCardHTML(p)).join("")}
        </div>
      </div>
    `;
  },

  // 4. PAGE DÉTAIL D'UN PRODUIT
  renderProductDetailPage(productId) {
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
    const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const categoryInfo = CATEGORIES.find(c => c.slug === product.category);

    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
      <div class="bg-[#FFFDF8] py-8 border-b border-[#F1ECE1]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="flex text-xs text-gray-500 mb-2">
            <ol class="inline-flex items-center space-x-1 md:space-x-2">
              <li><a href="#home" class="hover:text-[#C62828]">Accueil</a></li>
              <li><span>/</span></li>
              <li><a href="#shop" class="hover:text-[#C62828]">Boutique</a></li>
              <li><span>/</span></li>
              <li><a href="#category/${product.category}" class="hover:text-[#C62828]">${categoryInfo ? categoryInfo.name : 'Catégorie'}</a></li>
              <li><span>/</span></li>
              <li class="text-[#242424] font-semibold truncate max-w-[200px]">${product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <!-- GALERIE PHOTOS -->
          <div class="lg:col-span-7 space-y-4">
            <div class="relative rounded-3xl overflow-hidden bg-white border border-[#F1ECE1] shadow-md aspect-square max-h-[520px]">
              <img id="main-product-img" src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover transition-all duration-300"/>
              
              <!-- Badges -->
              <div class="absolute top-4 left-4 flex flex-col gap-2">
                <span class="px-3 py-1 rounded-full bg-[#C62828] text-white text-xs font-bold shadow-md">
                  ${product.badge}
                </span>
                ${product.oldPrice ? `
                  <span class="px-3 py-1 rounded-full bg-[#F4C542] text-[#242424] text-xs font-black shadow-md">
                    -${Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </span>
                ` : ''}
              </div>

              <!-- Bouton Favoris -->
              <button onclick="Store.toggleWishlist('${product.id}')" class="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur text-gray-700 hover:text-[#C62828] flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                <svg class="w-6 h-6 ${Store.isInWishlist(product.id) ? 'fill-[#C62828] text-[#C62828]' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              </button>
            </div>

            <!-- Miniatures photos -->
            <div class="flex gap-3 overflow-x-auto pb-2">
              ${product.images.map((img, idx) => `
                <button onclick="App.changeProductMainImage('${img}', this)" class="w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 ${idx === 0 ? 'border-[#C62828]' : 'border-transparent opacity-75 hover:opacity-100'} transition-all">
                  <img src="${img}" alt="${product.name} ${idx}" class="w-full h-full object-cover"/>
                </button>
              `).join("")}
            </div>
          </div>

          <!-- INFOS PRODUIT & COMMANDE -->
          <div class="lg:col-span-5 space-y-6">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <div class="flex text-[#F4C542] text-sm">★★★★★</div>
                <span class="text-xs font-bold text-[#242424]">${product.rating}</span>
                <span class="text-xs text-gray-400">(${product.reviewsCount} avis vérifiés)</span>
                <span class="mx-1 text-gray-300">•</span>
                <span class="text-xs text-[#14532D] font-bold flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                  En stock (${product.stock} dispo)
                </span>
              </div>

              <h1 class="text-2xl sm:text-3xl font-extrabold text-[#242424] font-heading leading-tight">
                ${product.name}
              </h1>

              <!-- Prix en FCFA -->
              <div class="mt-4 flex items-baseline gap-3">
                <span class="text-3xl font-black text-[#C62828] font-heading">
                  ${Store.formatPrice(product.price)}
                </span>
                ${product.oldPrice ? `
                  <span class="text-lg text-gray-400 line-through">
                    ${Store.formatPrice(product.oldPrice)}
                  </span>
                  <span class="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    Économisez ${Store.formatPrice(product.oldPrice - product.price)}
                  </span>
                ` : ''}
              </div>
            </div>

            <!-- Description courte -->
            <p class="text-sm text-gray-600 leading-relaxed">
              ${product.description}
            </p>

            <!-- Options (Couleur / Taille / Modèle) -->
            <div class="space-y-4 pt-4 border-t border-[#F1ECE1]">
              ${product.options?.colors ? `
                <div>
                  <label class="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-2">Couleur / Finition :</label>
                  <div class="flex flex-wrap gap-2" id="detail-colors">
                    ${product.options.colors.map((c, i) => `
                      <button onclick="App.selectOption('color', '${c}', this)" class="px-3 py-1.5 rounded-xl text-xs font-medium border ${i === 0 ? 'bg-[#14532D] text-white border-[#14532D]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}">
                        ${c}
                      </button>
                    `).join("")}
                  </div>
                </div>
              ` : ''}

              ${product.options?.sizes ? `
                <div>
                  <label class="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-2">Taille / Pointure :</label>
                  <div class="flex flex-wrap gap-2" id="detail-sizes">
                    ${product.options.sizes.map((s, i) => `
                      <button onclick="App.selectOption('size', '${s}', this)" class="px-3.5 py-1.5 rounded-xl text-xs font-medium border ${i === 0 ? 'bg-[#C62828] text-white border-[#C62828]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}">
                        ${s}
                      </button>
                    `).join("")}
                  </div>
                </div>
              ` : ''}

              ${product.options?.models ? `
                <div>
                  <label class="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-2">Variante / Modèle :</label>
                  <div class="flex flex-wrap gap-2" id="detail-models">
                    ${product.options.models.map((m, i) => `
                      <button onclick="App.selectOption('model', '${m}', this)" class="px-3.5 py-1.5 rounded-xl text-xs font-medium border ${i === 0 ? 'bg-[#14532D] text-white border-[#14532D]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}">
                        ${m}
                      </button>
                    `).join("")}
                  </div>
                </div>
              ` : ''}

              <!-- Sélecteur de Quantité -->
              <div>
                <label class="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-2">Quantité :</label>
                <div class="inline-flex items-center rounded-xl border border-gray-200 bg-white p-1">
                  <button onclick="App.detailQtyStep(-1)" class="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center">-</button>
                  <span id="detail-quantity-val" class="w-12 text-center font-bold text-sm text-[#242424]">1</span>
                  <button onclick="App.detailQtyStep(1)" class="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center">+</button>
                </div>
              </div>
            </div>

            <!-- BOUTONS D'ACTION (Ajouter au panier / Commander maintenant / WhatsApp) -->
            <div class="space-y-3 pt-2">
              <button onclick="App.addCurrentDetailToCart('${product.id}', false)" class="w-full py-4 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-lg hover-lift flex items-center justify-center gap-3 text-base">
                <svg class="w-5 h-5 text-[#F4C542]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                Ajouter au panier
              </button>

              <button onclick="App.addCurrentDetailToCart('${product.id}', true)" class="w-full py-3.5 rounded-xl font-bold text-[#242424] bg-[#F4C542] hover:bg-[#E5B535] shadow-md hover-lift flex items-center justify-center gap-2 text-sm">
                ⚡ Commander maintenant (Paiement direct)
              </button>

              <a href="${Store.generateWhatsAppLink(null, product)}" target="_blank" class="w-full py-3.5 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-md hover-lift flex items-center justify-center gap-2 text-sm">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                Commander via WhatsApp
              </a>
            </div>

            <!-- RASSURANCE & GARANTIES -->
            <div class="rounded-2xl bg-white border border-[#F1ECE1] p-4 space-y-3 text-xs text-gray-600">
              <div class="flex items-center gap-3">
                <span class="text-base text-[#14532D]">🚚</span>
                <span><strong>Livraison garantie</strong> : sous 24h à 48h dans toute la région</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-base text-[#C62828]">🎁</span>
                <span><strong>Emballage de Noël offert</strong> avec ruban satin et carte de vœux</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-base text-[#F4C542]">🔄</span>
                <span><strong>Retour simplifié</strong> sous 14 jours si le cadeau ne plaît pas</span>
              </div>
            </div>

          </div>
        </div>

        <!-- ONGLETS DE DÉTAIL : Caractéristiques & Avis -->
        <div class="mt-14 bg-white rounded-3xl border border-[#F1ECE1] p-6 sm:p-8 shadow-sm">
          <div class="border-b border-[#F1ECE1] pb-4 mb-6 flex gap-6 text-sm font-bold">
            <span class="text-[#C62828] border-b-2 border-[#C62828] pb-4 cursor-pointer">Points forts & Caractéristiques</span>
            <span class="text-gray-500 hover:text-[#242424] cursor-pointer">Avis clients (${product.reviewsCount})</span>
            <span class="text-gray-500 hover:text-[#242424] cursor-pointer">Livraison & Retours</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h4 class="font-bold text-[#242424] mb-3">Caractéristiques du produit :</h4>
              <ul class="space-y-2">
                ${product.features.map(f => `
                  <li class="flex items-center gap-2">
                    <span class="text-[#14532D] font-bold">✓</span>
                    <span>${f}</span>
                  </li>
                `).join("")}
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-[#242424] mb-3">La garantie NOËL GIFT SHOP :</h4>
              <p class="text-xs text-gray-500 leading-relaxed">
                Chaque article est minutieusement vérifié et préparé à la main avant expédition. Vous recevez un emballage cadeau raffiné prêt à être déposé directement sous le sapin de Noël avec le message de votre choix.
              </p>
            </div>
          </div>
        </div>

        <!-- PRODUITS SIMILAIRES -->
        ${relatedProducts.length > 0 ? `
          <div class="mt-14">
            <h2 class="text-2xl font-bold text-[#242424] font-heading mb-6">Vous aimerez aussi pour Noël</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
              ${relatedProducts.map(p => this.renderProductCardHTML(p)).join("")}
            </div>
          </div>
        ` : ''}

      </div>
    `;
  },

  // 5. PAGE PANIER COMPLÈTE
  renderCartPage() {
    const mainContent = document.getElementById("main-content");
    const cart = Store.state.cart;
    const subtotal = Store.getCartSubtotal();
    const shipping = Store.getShippingCost();
    const discount = Store.state.discountAmount;
    const total = Store.getCartTotal();
    const freeShippingRemaining = Math.max(0, Store.SHIPPING_THRESHOLD - subtotal);
    const shippingPercent = Math.min(100, Math.round((subtotal / Store.SHIPPING_THRESHOLD) * 100));

    mainContent.innerHTML = `
      <div class="bg-[#FFFDF8] py-8 border-b border-[#F1ECE1]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-extrabold text-[#242424] font-heading">Votre Hotte de Noël (Panier)</h1>
          <p class="text-sm text-gray-600 mt-1">Vérifiez vos articles avant de passer à l'étape de livraison et de paiement.</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        ${cart.length === 0 ? `
          <!-- Panier Vide -->
          <div class="bg-white rounded-3xl p-12 text-center border border-[#F1ECE1] shadow-sm max-w-xl mx-auto">
            <div class="w-20 h-20 rounded-full bg-red-50 text-[#C62828] flex items-center justify-center text-4xl mx-auto mb-4">🛒</div>
            <h2 class="text-2xl font-bold text-[#242424] font-heading">Votre panier est encore vide !</h2>
            <p class="text-sm text-gray-500 mt-2">
              Le traîneau du Père Noël attend vos choix pour se remplir. Découvrez nos coffrets festifs et nos cadeaux tendances.
            </p>
            <a href="#shop" class="mt-6 inline-block px-7 py-3.5 rounded-xl bg-[#C62828] text-white font-bold text-sm shadow hover:bg-[#A71D1D] transition-colors">
              Découvrir la boutique
            </a>
          </div>
        ` : `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <!-- Liste des articles -->
            <div class="lg:col-span-8 space-y-4">
              
              <!-- Barre de progression livraison gratuite -->
              <div class="bg-white p-4 rounded-2xl border border-[#F1ECE1] shadow-sm">
                <div class="flex justify-between items-center text-xs font-bold mb-2">
                  <span class="flex items-center gap-1.5 text-[#14532D]">
                    <span>🚚</span>
                    ${freeShippingRemaining === 0 
                      ? 'Félicitations ! Vous bénéficiez de la livraison offerte ! 🎉' 
                      : `Plus que ${Store.formatPrice(freeShippingRemaining)} pour débloquer la livraison gratuite !`}
                  </span>
                  <span class="text-gray-400">${shippingPercent}%</span>
                </div>
                <div class="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-[#14532D] to-[#F4C542] rounded-full transition-all duration-500" style="width: ${shippingPercent}%"></div>
                </div>
              </div>

              <!-- Cartes des articles -->
              <div class="bg-white rounded-2xl border border-[#F1ECE1] shadow-sm divide-y divide-[#F1ECE1] overflow-hidden">
                ${cart.map(item => `
                  <div class="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-gray-100 flex-shrink-0"/>
                    <div class="flex-1 text-center sm:text-left">
                      <h3 class="font-bold text-sm text-[#242424] hover:text-[#C62828] cursor-pointer" onclick="App.navigate('product/${item.productId}')">${item.name}</h3>
                      <div class="flex flex-wrap gap-2 text-xs text-gray-500 mt-1 justify-center sm:justify-start">
                        ${item.color ? `<span>Couleur : <strong>${item.color}</strong></span>` : ''}
                        ${item.size ? `<span>Taille : <strong>${item.size}</strong></span>` : ''}
                        ${item.model ? `<span>Modèle : <strong>${item.model}</strong></span>` : ''}
                      </div>
                      <div class="font-bold text-[#C62828] text-sm mt-2">
                        ${Store.formatPrice(item.price)}
                      </div>
                    </div>

                    <!-- Contrôles quantité -->
                    <div class="flex items-center gap-3">
                      <div class="flex items-center rounded-xl border border-gray-200 bg-white p-1">
                        <button onclick="Store.updateQuantity('${item.key}', -1)" class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs">-</button>
                        <span class="w-8 text-center font-bold text-xs text-[#242424]">${item.quantity}</span>
                        <button onclick="Store.updateQuantity('${item.key}', 1)" class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs">+</button>
                      </div>

                      <button onclick="Store.removeFromCart('${item.key}')" class="text-gray-400 hover:text-red-600 p-2 rounded-lg" title="Supprimer">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>

                    <div class="font-bold text-sm text-[#242424] min-w-[90px] text-right hidden sm:block">
                      ${Store.formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                `).join("")}
              </div>

              <!-- Option Emballage Cadeau -->
              <div class="bg-white p-5 rounded-2xl border border-[#F1ECE1] shadow-sm">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" id="gift-packaging-check" ${Store.state.giftPackaging ? 'checked' : ''} onchange="Store.setGiftOptions(this.checked, document.getElementById('gift-note-input').value)" class="w-5 h-5 text-[#C62828] accent-[#C62828] rounded"/>
                  <div>
                    <span class="font-bold text-sm text-[#242424] flex items-center gap-1.5">
                      🎁 Emballage de Noël soigné & ruban doré (OFFERT)
                    </span>
                    <p class="text-xs text-gray-500">Ajoutez une touche de magie avec notre emballage prêt à offrir</p>
                  </div>
                </label>
                <div class="mt-3 ${Store.state.giftPackaging ? '' : 'hidden'}" id="gift-note-container">
                  <textarea id="gift-note-input" rows="2" placeholder="Écrivez le mot doux que nous glisserons sur la carte de vœux..." class="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]">${Store.state.giftNote}</textarea>
                </div>
              </div>

            </div>

            <!-- Récapitulatif de la commande -->
            <div class="lg:col-span-4">
              <div class="bg-white p-6 rounded-2xl border border-[#F1ECE1] shadow-md space-y-4 sticky top-24">
                <h3 class="font-bold text-base text-[#242424] pb-3 border-b border-[#F1ECE1]">Récapitulatif</h3>
                
                <!-- Code Promo -->
                <div>
                  <label class="block text-xs font-bold text-gray-600 mb-1.5">Code promo ou de réduction :</label>
                  <div class="flex gap-2">
                    <input type="text" id="cart-promo-code" placeholder="Ex: NOEL2026" class="flex-1 uppercase text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"/>
                    <button onclick="App.applyPromoCodeFromCart()" class="px-4 py-2.5 rounded-xl bg-[#14532D] text-[#F4C542] font-bold text-xs hover:bg-[#0E3E21]">
                      Appliquer
                    </button>
                  </div>
                  ${Store.state.promoCode ? `
                    <div class="flex items-center justify-between text-xs text-green-700 bg-green-50 p-2 rounded-lg mt-2">
                      <span>✓ Code <strong>${Store.state.promoCode}</strong> appliqué (-${Store.formatPrice(discount)})</span>
                      <button onclick="Store.removePromo()" class="text-red-500 font-bold ml-2">×</button>
                    </div>
                  ` : ''}
                </div>

                <!-- Lignes tarifaires -->
                <div class="space-y-2 text-xs pt-3 border-t border-[#F1ECE1]">
                  <div class="flex justify-between text-gray-600">
                    <span>Sous-total (${Store.getCartCount()} articles) :</span>
                    <span class="font-semibold text-[#242424]">${Store.formatPrice(subtotal)}</span>
                  </div>
                  ${discount > 0 ? `
                    <div class="flex justify-between text-green-600 font-medium">
                      <span>Réduction code promo :</span>
                      <span>-${Store.formatPrice(discount)}</span>
                    </div>
                  ` : ''}
                  <div class="flex justify-between text-gray-600">
                    <span>Frais de livraison estimés :</span>
                    <span class="font-semibold text-[#242424]">${shipping === 0 ? '<strong class="text-green-700">GRATUITE</strong>' : Store.formatPrice(shipping)}</span>
                  </div>
                </div>

                <div class="pt-3 border-t border-[#F1ECE1] flex justify-between items-baseline">
                  <span class="font-bold text-base text-[#242424]">Total à régler :</span>
                  <span class="font-black text-2xl text-[#C62828] font-heading">${Store.formatPrice(total)}</span>
                </div>

                <!-- Bouton Checkout -->
                <a href="#checkout" class="w-full py-4 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-xl hover-lift flex items-center justify-center gap-2 text-sm text-center block">
                  Passer à la commande →
                </a>

                <a href="#shop" class="block text-center text-xs text-gray-500 hover:text-[#C62828] pt-1">
                  ← Continuer vos achats
                </a>
              </div>
            </div>

          </div>
        `}
      </div>
    `;
  },

  // 6. PAGE COMMANDE / CHECKOUT (PROCESSUS 3 ÉTAPES)
  checkoutStep: 1,
  checkoutData: {
    fullName: "",
    phone: "",
    city: "Cotonou",
    address: "",
    paymentMethod: "MTN Mobile Money",
    momoNumber: ""
  },

  renderCheckoutPage() {
    const mainContent = document.getElementById("main-content");
    const cart = Store.state.cart;

    if (cart.length === 0) {
      window.location.hash = "#cart";
      return;
    }

    mainContent.innerHTML = `
      <div class="bg-[#FFFDF8] py-8 border-b border-[#F1ECE1]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-extrabold text-[#242424] font-heading">Finaliser votre commande</h1>
          
          <!-- Stepper 3 étapes -->
          <div class="flex items-center justify-center gap-2 sm:gap-4 mt-6 max-w-xl mx-auto">
            <div class="flex items-center gap-2 ${this.checkoutStep >= 1 ? 'text-[#C62828] font-bold' : 'text-gray-400'}">
              <span class="w-8 h-8 rounded-full flex items-center justify-center text-xs ${this.checkoutStep >= 1 ? 'bg-[#C62828] text-white' : 'bg-gray-200'}">1</span>
              <span class="text-xs hidden sm:inline">Coordonnées</span>
            </div>
            <div class="w-8 sm:w-16 h-0.5 ${this.checkoutStep >= 2 ? 'bg-[#C62828]' : 'bg-gray-200'}"></div>
            <div class="flex items-center gap-2 ${this.checkoutStep >= 2 ? 'text-[#C62828] font-bold' : 'text-gray-400'}">
              <span class="w-8 h-8 rounded-full flex items-center justify-center text-xs ${this.checkoutStep >= 2 ? 'bg-[#C62828] text-white' : 'bg-gray-200'}">2</span>
              <span class="text-xs hidden sm:inline">Paiement</span>
            </div>
            <div class="w-8 sm:w-16 h-0.5 ${this.checkoutStep >= 3 ? 'bg-[#C62828]' : 'bg-gray-200'}"></div>
            <div class="flex items-center gap-2 ${this.checkoutStep >= 3 ? 'text-[#C62828] font-bold' : 'text-gray-400'}">
              <span class="w-8 h-8 rounded-full flex items-center justify-center text-xs ${this.checkoutStep >= 3 ? 'bg-[#C62828] text-white' : 'bg-gray-200'}">3</span>
              <span class="text-xs hidden sm:inline">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- FORMULAIRE ÉTAPE ACTIVE -->
          <div class="lg:col-span-7">
            <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#F1ECE1] shadow-sm">
              
              <!-- ÉTAPE 1 : COORDONNÉES CLIENT -->
              <div id="checkout-step-1" class="${this.checkoutStep === 1 ? '' : 'hidden'} space-y-5">
                <h2 class="text-xl font-bold text-[#242424] font-heading flex items-center gap-2">
                  <span class="text-[#C62828]">1.</span> Informations de livraison
                </h2>

                <div class="space-y-4">
                  <div>
                    <label class="block text-xs font-bold text-[#242424] mb-1">Nom complet *</label>
                    <input type="text" id="chk-fullname" value="${this.checkoutData.fullName}" placeholder="Ex: Jean-Marc Dossou" class="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"/>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-[#242424] mb-1">Numéro WhatsApp / Téléphone *</label>
                    <input type="tel" id="chk-phone" value="${this.checkoutData.phone}" placeholder="Ex: +229 97 00 00 00" class="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"/>
                    <p class="text-[11px] text-gray-500 mt-1">Utilisé pour vous envoyer le suivi de votre colis de Noël</p>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-bold text-[#242424] mb-1">Ville *</label>
                      <select id="chk-city" class="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828] bg-white">
                        <option value="Cotonou" ${this.checkoutData.city === 'Cotonou' ? 'selected' : ''}>Cotonou (Bénin)</option>
                        <option value="Abomey-Calavi" ${this.checkoutData.city === 'Abomey-Calavi' ? 'selected' : ''}>Abomey-Calavi</option>
                        <option value="Porto-Novo" ${this.checkoutData.city === 'Porto-Novo' ? 'selected' : ''}>Porto-Novo</option>
                        <option value="Abidjan" ${this.checkoutData.city === 'Abidjan' ? 'selected' : ''}>Abidjan (Côte d'Ivoire)</option>
                        <option value="Lomé" ${this.checkoutData.city === 'Lomé' ? 'selected' : ''}>Lomé (Togo)</option>
                        <option value="Dakar" ${this.checkoutData.city === 'Dakar' ? 'selected' : ''}>Dakar (Sénégal)</option>
                        <option value="Ouagadougou" ${this.checkoutData.city === 'Ouagadougou' ? 'selected' : ''}>Ouagadougou (Burkina)</option>
                        <option value="Autre" ${this.checkoutData.city === 'Autre' ? 'selected' : ''}>Autre localité...</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-xs font-bold text-[#242424] mb-1">Quartier & Repères *</label>
                      <input type="text" id="chk-address" value="${this.checkoutData.address}" placeholder="Ex: Haie Vive, en face pharmacie" class="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"/>
                    </div>
                  </div>
                </div>

                <div class="pt-4">
                  <button onclick="App.validateStep1()" class="w-full py-4 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-lg hover-lift text-sm">
                    Continuer vers le paiement →
                  </button>
                </div>
              </div>

              <!-- ÉTAPE 2 : MODE DE PAIEMENT -->
              <div id="checkout-step-2" class="${this.checkoutStep === 2 ? '' : 'hidden'} space-y-5">
                <h2 class="text-xl font-bold text-[#242424] font-heading flex items-center gap-2">
                  <span class="text-[#C62828]">2.</span> Mode de paiement sécurisé
                </h2>

                <div class="space-y-3">
                  <!-- MTN MoMo -->
                  <label class="flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${this.checkoutData.paymentMethod === 'MTN Mobile Money' ? 'border-[#C62828] bg-red-50/20' : 'border-gray-200 hover:border-gray-300'}">
                    <input type="radio" name="pay_method" value="MTN Mobile Money" ${this.checkoutData.paymentMethod === 'MTN Mobile Money' ? 'checked' : ''} onchange="App.setPaymentMethod(this.value)" class="w-5 h-5 accent-[#C62828]"/>
                    <div class="flex-1">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-sm text-[#242424]">MTN Mobile Money</span>
                        <span class="text-xs px-2 py-0.5 rounded bg-yellow-400 text-black font-black">MTN MoMo</span>
                      </div>
                      <p class="text-xs text-gray-500 mt-0.5">Paiement instantané sécurisé par notification sur votre téléphone</p>
                    </div>
                  </label>

                  <!-- Moov Money -->
                  <label class="flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${this.checkoutData.paymentMethod === 'Moov Money' ? 'border-[#C62828] bg-red-50/20' : 'border-gray-200 hover:border-gray-300'}">
                    <input type="radio" name="pay_method" value="Moov Money" ${this.checkoutData.paymentMethod === 'Moov Money' ? 'checked' : ''} onchange="App.setPaymentMethod(this.value)" class="w-5 h-5 accent-[#C62828]"/>
                    <div class="flex-1">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-sm text-[#242424]">Moov Money Flooz</span>
                        <span class="text-xs px-2 py-0.5 rounded bg-blue-600 text-white font-black">Moov</span>
                      </div>
                      <p class="text-xs text-gray-500 mt-0.5">Validation directe avec votre code secret</p>
                    </div>
                  </label>

                  <!-- Paiement à la livraison -->
                  <label class="flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${this.checkoutData.paymentMethod === 'Paiement à la livraison' ? 'border-[#C62828] bg-red-50/20' : 'border-gray-200 hover:border-gray-300'}">
                    <input type="radio" name="pay_method" value="Paiement à la livraison" ${this.checkoutData.paymentMethod === 'Paiement à la livraison' ? 'checked' : ''} onchange="App.setPaymentMethod(this.value)" class="w-5 h-5 accent-[#C62828]"/>
                    <div class="flex-1">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-sm text-[#242424]">Paiement Cash à la livraison</span>
                        <span class="text-xs px-2 py-0.5 rounded bg-green-700 text-white font-bold">Espèces</span>
                      </div>
                      <p class="text-xs text-gray-500 mt-0.5">Payez directement au livreur lors de la réception de votre colis</p>
                    </div>
                  </label>
                </div>

                <div class="flex gap-3 pt-4">
                  <button onclick="App.goToStep(1)" class="w-1/3 py-3.5 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 text-xs">
                    ← Retour
                  </button>
                  <button onclick="App.validateStep2()" class="w-2/3 py-3.5 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-lg text-sm">
                    Vérifier et confirmer →
                  </button>
                </div>
              </div>

              <!-- ÉTAPE 3 : CONFIRMATION COMMANDE -->
              <div id="checkout-step-3" class="${this.checkoutStep === 3 ? '' : 'hidden'} space-y-6">
                <div class="text-center py-4">
                  <div class="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-3xl mx-auto mb-3">✓</div>
                  <h2 class="text-2xl font-bold text-[#242424] font-heading">Commande prête à être validée !</h2>
                  <p class="text-xs text-gray-500 mt-1">Veuillez vérifier vos détails une dernière fois avant de confirmer.</p>
                </div>

                <div class="bg-gray-50 rounded-2xl p-4 text-xs space-y-2 border border-gray-200">
                  <div class="flex justify-between">
                    <span class="text-gray-500">Destinataire :</span>
                    <span class="font-bold text-[#242424]" id="summary-name">${this.checkoutData.fullName}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Téléphone / WhatsApp :</span>
                    <span class="font-bold text-[#242424]" id="summary-phone">${this.checkoutData.phone}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Lieu de livraison :</span>
                    <span class="font-bold text-[#242424]" id="summary-address">${this.checkoutData.city}, ${this.checkoutData.address}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Mode de règlement :</span>
                    <span class="font-bold text-[#14532D]" id="summary-payment">${this.checkoutData.paymentMethod}</span>
                  </div>
                </div>

                <div class="flex gap-3 pt-2">
                  <button onclick="App.goToStep(2)" class="w-1/3 py-3.5 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 text-xs">
                    ← Modifier
                  </button>
                  <button onclick="App.finalizeOrder()" class="w-2/3 py-4 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-xl hover-lift text-sm pulse-festive">
                    🎁 Confirmer ma commande (${Store.formatPrice(Store.getCartTotal())})
                  </button>
                </div>
              </div>

            </div>
          </div>

          <!-- SIDEBAR RÉCAPITULATIF COMMANDE CHECKOUT -->
          <div class="lg:col-span-5" id="checkout-summary-container">
            <!-- Rendu dynamique via renderCheckoutSummary() -->
          </div>

        </div>
      </div>
    `;

    this.renderCheckoutSummary();
  },

  renderCheckoutSummary() {
    const container = document.getElementById("checkout-summary-container");
    if (!container) return;

    const cart = Store.state.cart;
    const subtotal = Store.getCartSubtotal();
    const shipping = Store.getShippingCost();
    const discount = Store.state.discountAmount;
    const total = Store.getCartTotal();

    container.innerHTML = `
      <div class="bg-white p-6 rounded-3xl border border-[#F1ECE1] shadow-sm space-y-4">
        <h3 class="font-bold text-sm text-[#242424] pb-3 border-b border-[#F1ECE1] flex items-center justify-between">
          <span>Articles dans la commande (${Store.getCartCount()})</span>
          <a href="#cart" class="text-xs text-[#C62828] hover:underline font-normal">Modifier</a>
        </h3>

        <div class="space-y-3 max-h-60 overflow-y-auto pr-1">
          ${cart.map(i => `
            <div class="flex items-center gap-3">
              <img src="${i.image}" alt="${i.name}" class="w-12 h-12 object-cover rounded-lg border border-gray-100 flex-shrink-0"/>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-[#242424] truncate">${i.name}</p>
                <p class="text-[11px] text-gray-400">Qté : ${i.quantity} × ${Store.formatPrice(i.price)}</p>
              </div>
              <span class="text-xs font-bold text-[#242424]">${Store.formatPrice(i.price * i.quantity)}</span>
            </div>
          `).join("")}
        </div>

        <div class="space-y-2 text-xs pt-3 border-t border-[#F1ECE1]">
          <div class="flex justify-between text-gray-600">
            <span>Sous-total :</span>
            <span class="font-semibold text-[#242424]">${Store.formatPrice(subtotal)}</span>
          </div>
          ${discount > 0 ? `
            <div class="flex justify-between text-green-600 font-medium">
              <span>Réduction (${Store.state.promoCode}) :</span>
              <span>-${Store.formatPrice(discount)}</span>
            </div>
          ` : ''}
          <div class="flex justify-between text-gray-600">
            <span>Frais de livraison :</span>
            <span class="font-semibold text-[#242424]">${shipping === 0 ? '<strong class="text-green-700">OFFERTE</strong>' : Store.formatPrice(shipping)}</span>
          </div>
          <div class="flex justify-between items-baseline pt-2 border-t border-[#F1ECE1]">
            <span class="font-bold text-sm text-[#242424]">Total à payer :</span>
            <span class="font-black text-xl text-[#C62828] font-heading">${Store.formatPrice(total)}</span>
          </div>
        </div>

        <div class="p-3 rounded-xl bg-[#FFFDF8] border border-[#F1ECE1] text-[11px] text-gray-500 space-y-1">
          <p class="flex items-center gap-1.5 text-[#14532D] font-bold">
            <span>🎄</span> Emballage cadeau festif inclus
          </p>
          <p>Expédié sous boîte scellée avec ruban de protection.</p>
        </div>
      </div>
    `;
  },

  // VALIDATION & ACTIONS CHECKOUT
  goToStep(step) {
    this.checkoutStep = step;
    this.renderCheckoutPage();
  },

  validateStep1() {
    const fullName = document.getElementById("chk-fullname")?.value.trim();
    const phone = document.getElementById("chk-phone")?.value.trim();
    const city = document.getElementById("chk-city")?.value;
    const address = document.getElementById("chk-address")?.value.trim();

    if (!fullName || !phone || !address) {
      Store.showToast("Veuillez renseigner votre nom, téléphone et quartier de livraison.", "error");
      return;
    }

    this.checkoutData.fullName = fullName;
    this.checkoutData.phone = phone;
    this.checkoutData.city = city;
    this.checkoutData.address = address;

    this.goToStep(2);
  },

  setPaymentMethod(val) {
    this.checkoutData.paymentMethod = val;
  },

  validateStep2() {
    this.goToStep(3);
  },

  finalizeOrder() {
    const orderId = `NLG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderData = {
      orderId: orderId,
      fullName: this.checkoutData.fullName,
      phone: this.checkoutData.phone,
      city: this.checkoutData.city,
      address: this.checkoutData.address,
      paymentMethod: this.checkoutData.paymentMethod,
      items: [...Store.state.cart],
      total: Store.getCartTotal(),
      giftNote: Store.state.giftNote
    };

    const whatsappLink = Store.generateWhatsAppLink(orderData);

    // Vider le panier
    Store.clearCart();
    this.checkoutStep = 1;

    // Afficher écran de félicitations
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
      <div class="max-w-3xl mx-auto px-4 py-16 text-center">
        <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-[#14532D] to-[#25D366] text-white flex items-center justify-center text-5xl mx-auto mb-6 shadow-xl animate-bounce">
          🎉
        </div>

        <span class="inline-block px-4 py-1.5 rounded-full bg-[#F4C542] text-[#242424] text-xs font-black uppercase mb-3">
          Commande Validée avec succès !
        </span>

        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#242424] font-heading">
          Merci pour votre commande, ${orderData.fullName} ! 🎅
        </h1>

        <p class="text-sm text-gray-600 mt-2 max-w-md mx-auto">
          Votre référence de commande est : <strong class="text-[#C62828] font-mono text-base">${orderData.orderId}</strong>.
          Nos lutins s'activent pour préparer vos paquets cadeaux avec amour.
        </p>

        <div class="mt-8 bg-white p-6 rounded-3xl border border-[#F1ECE1] shadow-md max-w-lg mx-auto text-left space-y-3 text-xs">
          <h3 class="font-bold text-sm text-[#242424] border-b pb-2">Prochaines étapes :</h3>
          <p class="flex items-start gap-2 text-gray-600">
            <span class="text-[#14532D] font-bold">1.</span>
            <span>Vous allez recevoir un appel ou un message de notre coursier avant la livraison.</span>
          </p>
          <p class="flex items-start gap-2 text-gray-600">
            <span class="text-[#14532D] font-bold">2.</span>
            <span>Pour accélérer le traitement, envoyez votre récapitulatif directement par WhatsApp en un clic ci-dessous.</span>
          </p>
        </div>

        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="${whatsappLink}" target="_blank" class="px-7 py-4 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-xl hover-lift flex items-center justify-center gap-2 text-sm">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            Envoyer confirmation par WhatsApp
          </a>

          <a href="#home" class="px-7 py-4 rounded-xl font-bold text-[#242424] bg-white border border-gray-200 hover:bg-gray-50 shadow text-sm flex items-center justify-center">
            Retour à l'accueil
          </a>
        </div>
      </div>
    `;

    Store.showToast("🎄 Commande validée avec succès ! Merci !");
  },

  // 7. PAGE CONTACT & FAQ
  renderContactPage() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
      <div class="bg-[#FFFDF8] py-8 border-b border-[#F1ECE1]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-extrabold text-[#242424] font-heading">Contact & Service Client</h1>
          <p class="text-sm text-gray-600 mt-1">Notre équipe de lutins est à votre disposition 7j/7 pour vous assister.</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- FORMULAIRE DE CONTACT -->
          <div class="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#F1ECE1] shadow-sm space-y-5">
            <h2 class="text-xl font-bold text-[#242424] font-heading">Envoyez-nous un message</h2>
            
            <form onsubmit="App.handleContactSubmit(event)" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-[#242424] mb-1">Votre Nom *</label>
                  <input type="text" required placeholder="Ex: Chantal A." class="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"/>
                </div>
                <div>
                  <label class="block text-xs font-bold text-[#242424] mb-1">Adresse E-mail *</label>
                  <input type="email" required placeholder="Ex: chantal@gmail.com" class="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"/>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-[#242424] mb-1">Numéro WhatsApp / Téléphone</label>
                <input type="tel" placeholder="Ex: +229 97 00 11 22" class="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"/>
              </div>

              <div>
                <label class="block text-xs font-bold text-[#242424] mb-1">Objet de votre demande</label>
                <select class="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828] bg-white">
                  <option>Renseignements sur un cadeau</option>
                  <option>Suivi d'une commande en cours</option>
                  <option>Commande personnalisée ou pour entreprise</option>
                  <option>Retour ou échange</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-[#242424] mb-1">Votre message *</label>
                <textarea required rows="4" placeholder="Comment pouvons-nous vous aider à préparer Noël ?" class="w-full text-sm p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"></textarea>
              </div>

              <button type="submit" class="w-full py-3.5 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-md hover-lift text-sm">
                Envoyer mon message 🎅
              </button>
            </form>
          </div>

          <!-- COORDONNÉES DIRECTES & WHATSAPP -->
          <div class="lg:col-span-5 space-y-6">
            <div class="bg-gradient-to-br from-[#14532D] to-[#0A2614] text-white p-6 rounded-3xl shadow-md border-2 border-[#F4C542] space-y-4">
              <span class="text-xs px-2.5 py-1 rounded-full bg-[#F4C542] text-[#242424] font-black uppercase">Réponse Express</span>
              <h3 class="text-xl font-bold font-heading">Besoin d'une réponse immédiate ?</h3>
              <p class="text-xs text-gray-200 leading-relaxed">
                Notre assistance WhatsApp dédiée aux fêtes répond généralement en moins de 10 minutes pour toute question sur les stocks ou livraisons.
              </p>
              <a href="${Store.generateWhatsAppLink()}" target="_blank" class="w-full py-3.5 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-lg flex items-center justify-center gap-2 text-sm">
                💬 Discuter sur WhatsApp (+229 97 00 11 22)
              </a>
            </div>

            <!-- Coordonnées textuelles -->
            <div class="bg-white p-6 rounded-3xl border border-[#F1ECE1] shadow-sm space-y-4 text-xs">
              <h4 class="font-bold text-sm text-[#242424] border-b pb-2">Informations utiles</h4>
              
              <div class="flex items-start gap-3">
                <span class="text-base text-[#C62828]">📍</span>
                <div>
                  <strong class="text-[#242424]">Boutique & Showroom de Noël :</strong>
                  <p class="text-gray-500">Boulevard Saint-Michel, Immeuble Les Étoiles, Cotonou</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <span class="text-base text-[#14532D]">⏰</span>
                <div>
                  <strong class="text-[#242424]">Horaires d'ouverture :</strong>
                  <p class="text-gray-500">Lundi au Samedi : 8h30 - 20h00 | Dimanche : 10h00 - 18h00</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <span class="text-base text-[#F4C542]">✉️</span>
                <div>
                  <strong class="text-[#242424]">Adresse e-mail :</strong>
                  <p class="text-gray-500">contact@noelgiftshop.com</p>
                </div>
              </div>
            </div>

            <!-- FAQ Rapide -->
            <div class="bg-white p-6 rounded-3xl border border-[#F1ECE1] shadow-sm space-y-3">
              <h4 class="font-bold text-sm text-[#242424]">Questions fréquentes</h4>
              
              <details class="text-xs group border-b border-gray-100 pb-2">
                <summary class="font-semibold text-gray-700 cursor-pointer list-none flex justify-between items-center">
                  <span>Puis-je être livré avant le 24 décembre ?</span>
                  <span class="text-[#C62828] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p class="text-gray-500 mt-2 text-[11px] leading-relaxed">
                  Oui ! Toutes les commandes passées avant le 22 décembre à 18h sont garanties d'être livrées avant le réveillon de Noël.
                </p>
              </details>

              <details class="text-xs group border-b border-gray-100 pb-2">
                <summary class="font-semibold text-gray-700 cursor-pointer list-none flex justify-between items-center">
                  <span>L'emballage cadeau est-il payant ?</span>
                  <span class="text-[#C62828] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p class="text-gray-500 mt-2 text-[11px] leading-relaxed">
                  Non, pour toute la période de Noël 2026, l'emballage festif avec ruban satin et carte manuscrite vous est offert gracieusement.
                </p>
              </details>

              <details class="text-xs group">
                <summary class="font-semibold text-gray-700 cursor-pointer list-none flex justify-between items-center">
                  <span>Quels sont les moyens de paiement acceptés ?</span>
                  <span class="text-[#C62828] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p class="text-gray-500 mt-2 text-[11px] leading-relaxed">
                  Nous acceptons MTN Mobile Money, Moov Money Flooz, le paiement en espèces à la livraison, ainsi que les cartes Visa et Mastercard.
                </p>
              </details>
            </div>

          </div>

        </div>
      </div>
    `;
  },

  handleContactSubmit(e) {
    e.preventDefault();
    Store.showToast("🎅 Votre message a bien été transmis aux lutins ! Nous vous répondrons sous peu.");
    e.target.reset();
  },

  // 8. PAGE FAVORIS (WISHLIST)
  renderWishlistPage() {
    const mainContent = document.getElementById("main-content");
    const wishlistIds = Store.state.wishlist;
    const items = PRODUCTS.filter(p => wishlistIds.includes(p.id));

    mainContent.innerHTML = `
      <div class="bg-[#FFFDF8] py-8 border-b border-[#F1ECE1]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-extrabold text-[#242424] font-heading">Mes Favoris de Noël (Liste d'envies)</h1>
          <p class="text-sm text-gray-600 mt-1">Gardez sous la main vos idées cadeaux préférées pour les fêtes.</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        ${items.length === 0 ? `
          <div class="bg-white rounded-3xl p-12 text-center border border-[#F1ECE1] shadow-sm max-w-xl mx-auto">
            <div class="w-20 h-20 rounded-full bg-red-50 text-[#C62828] flex items-center justify-center text-4xl mx-auto mb-4">💖</div>
            <h2 class="text-2xl font-bold text-[#242424] font-heading">Votre liste d'envies est vide</h2>
            <p class="text-sm text-gray-500 mt-2">Cliquez sur le petit cœur présent sur chaque produit pour le retrouver ici facilement.</p>
            <a href="#shop" class="mt-6 inline-block px-7 py-3.5 rounded-xl bg-[#C62828] text-white font-bold text-sm shadow hover:bg-[#A71D1D]">
              Parcourir la boutique
            </a>
          </div>
        ` : `
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            ${items.map(p => this.renderProductCardHTML(p)).join("")}
          </div>
        `}
      </div>
    `;
  },

  // RENDU CARTE PRODUIT RÉUTILISABLE
  renderProductCardHTML(product) {
    const inWishlist = Store.isInWishlist(product.id);
    return `
      <div class="group relative rounded-2xl bg-white border border-[#F1ECE1] shadow-sm hover-lift flex flex-col overflow-hidden">
        
        <!-- Image & Badges -->
        <div class="aspect-square w-full overflow-hidden bg-gray-50 relative img-zoom-container">
          <img src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover cursor-pointer" onclick="App.navigate('product/${product.id}')"/>
          
          <!-- Badge Promo / Best-seller -->
          <div class="absolute top-2.5 left-2.5 flex flex-col gap-1">
            <span class="px-2 py-0.5 rounded-full ${product.isPromo ? 'bg-[#C62828] text-white' : 'bg-[#14532D] text-[#F4C542]'} text-[10px] font-bold shadow-sm">
              ${product.badge}
            </span>
          </div>

          <!-- Bouton Favoris Coeur -->
          <button onclick="Store.toggleWishlist('${product.id}')" class="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-gray-600 hover:text-[#C62828] flex items-center justify-center shadow-sm transition-transform hover:scale-110" title="Ajouter aux favoris">
            <svg class="w-4 h-4 ${inWishlist ? 'fill-[#C62828] text-[#C62828]' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>

          <!-- Bouton Aperçu Rapide sur Hover -->
          <button onclick="App.openQuickView('${product.id}')" class="hidden sm:flex absolute bottom-2.5 inset-x-2.5 py-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-xs font-semibold items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur">
            <span>👁 Aperçu rapide</span>
          </button>
        </div>

        <!-- Détails carte -->
        <div class="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
          <div>
            <div class="flex items-center gap-1 text-[#F4C542] text-xs">
              <span>★</span>
              <span class="font-bold text-[#242424] text-[11px]">${product.rating}</span>
              <span class="text-gray-400 text-[10px]">(${product.reviewsCount})</span>
            </div>

            <h3 class="font-bold text-xs sm:text-sm text-[#242424] group-hover:text-[#C62828] transition-colors line-clamp-2 mt-1 cursor-pointer" onclick="App.navigate('product/${product.id}')">
              ${product.name}
            </h3>
          </div>

          <div>
            <!-- Prix FCFA -->
            <div class="flex items-baseline gap-2 mb-3">
              <span class="font-black text-sm sm:text-base text-[#C62828] font-heading">
                ${Store.formatPrice(product.price)}
              </span>
              ${product.oldPrice ? `
                <span class="text-xs text-gray-400 line-through">
                  ${Store.formatPrice(product.oldPrice)}
                </span>
              ` : ''}
            </div>

            <!-- Bouton Ajouter au panier -->
            <button onclick="Store.addToCart(PRODUCTS.find(p => p.id === '${product.id}'))" class="w-full py-2 sm:py-2.5 rounded-xl font-bold text-xs text-[#242424] bg-[#FFF5E6] hover:bg-[#C62828] hover:text-white border border-[#F4C542]/50 transition-colors flex items-center justify-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span>Ajouter</span>
            </button>
          </div>

        </div>

      </div>
    `;
  },

  // 9. MODAL APERÇU RAPIDE (QUICK VIEW)
  openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let modal = document.getElementById("quick-view-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "quick-view-modal";
      modal.className = "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#F4C542] p-6 relative animate-in fade-in zoom-in duration-200">
        <button onclick="App.closeQuickView()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-lg">×</button>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div class="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
            <img src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover"/>
          </div>
          <div class="space-y-3">
            <span class="px-2.5 py-0.5 rounded-full bg-[#C62828] text-white text-[10px] font-bold">${product.badge}</span>
            <h3 class="text-lg font-bold text-[#242424] font-heading">${product.name}</h3>
            
            <div class="flex items-baseline gap-2">
              <span class="text-xl font-black text-[#C62828]">${Store.formatPrice(product.price)}</span>
              ${product.oldPrice ? `<span class="text-xs text-gray-400 line-through">${Store.formatPrice(product.oldPrice)}</span>` : ''}
            </div>

            <p class="text-xs text-gray-600 line-clamp-3">${product.description}</p>
            
            <div class="pt-3 space-y-2">
              <button onclick="Store.addToCart(PRODUCTS.find(p => p.id === '${product.id}')); App.closeQuickView();" class="w-full py-2.5 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow text-xs">
                Ajouter au panier 🎁
              </button>
              <button onclick="App.navigate('product/${product.id}'); App.closeQuickView();" class="w-full py-2 rounded-xl font-bold text-[#242424] bg-gray-100 hover:bg-gray-200 text-xs">
                Voir la fiche complète →
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
  },

  closeQuickView() {
    const modal = document.getElementById("quick-view-modal");
    if (modal) modal.remove();
  },

  // 10. TIROIR PANIER SLIDE-OVER (MINI CART)
  openCartDrawer() {
    let drawer = document.getElementById("cart-drawer");
    if (!drawer) return;
    drawer.classList.remove("translate-x-full");
    document.getElementById("cart-backdrop")?.classList.remove("hidden");
    this.updateCartDrawer();
  },

  closeCartDrawer() {
    let drawer = document.getElementById("cart-drawer");
    if (!drawer) return;
    drawer.classList.add("translate-x-full");
    document.getElementById("cart-backdrop")?.classList.add("hidden");
  },

  updateCartDrawer() {
    const container = document.getElementById("cart-drawer-items");
    const subtotalEl = document.getElementById("drawer-subtotal");
    const totalEl = document.getElementById("drawer-total");
    if (!container) return;

    const cart = Store.state.cart;
    if (cart.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center text-gray-400 space-y-2">
          <span class="text-4xl block">🛒</span>
          <p class="text-xs font-semibold text-gray-600">Votre hotte de Noël est vide</p>
          <a href="#shop" onclick="App.closeCartDrawer()" class="inline-block mt-3 px-4 py-2 rounded-lg bg-[#C62828] text-white text-xs font-bold">Découvrir les cadeaux</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = "0 FCFA";
      if (totalEl) totalEl.textContent = "0 FCFA";
      return;
    }

    container.innerHTML = cart.map(i => `
      <div class="flex items-center gap-3 py-3 border-b border-gray-100">
        <img src="${i.image}" alt="${i.name}" class="w-14 h-14 object-cover rounded-xl border border-gray-100 flex-shrink-0"/>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold text-[#242424] truncate">${i.name}</p>
          <p class="text-[11px] text-[#C62828] font-bold mt-0.5">${Store.formatPrice(i.price)}</p>
          <div class="flex items-center gap-2 mt-1">
            <button onclick="Store.updateQuantity('${i.key}', -1)" class="w-5 h-5 bg-gray-100 rounded text-xs flex items-center justify-center font-bold">-</button>
            <span class="text-xs font-bold text-gray-700">${i.quantity}</span>
            <button onclick="Store.updateQuantity('${i.key}', 1)" class="w-5 h-5 bg-gray-100 rounded text-xs flex items-center justify-center font-bold">+</button>
          </div>
        </div>
        <button onclick="Store.removeFromCart('${i.key}')" class="text-gray-400 hover:text-red-600 text-xs p-1">×</button>
      </div>
    `).join("");

    if (subtotalEl) subtotalEl.textContent = Store.formatPrice(Store.getCartSubtotal());
    if (totalEl) totalEl.textContent = Store.formatPrice(Store.getCartTotal());
  },

  // 11. RECHERCHE EN DIRECT & AUTO-COMPLÉTION
  handleSearchInput(value) {
    const query = (value || "").trim().toLowerCase();
    const dropdown = document.getElementById("search-results-dropdown");
    if (!dropdown) return;

    if (query.length < 2) {
      dropdown.classList.add("hidden");
      return;
    }

    const matches = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matches.length === 0) {
      dropdown.innerHTML = `
        <div class="p-4 text-center text-xs text-gray-500">
          Aucun cadeau trouvé pour « ${query} »
        </div>
      `;
    } else {
      dropdown.innerHTML = `
        <div class="p-2 space-y-1">
          <div class="text-[10px] uppercase font-bold text-gray-400 px-2 py-1">Suggestions de Noël :</div>
          ${matches.map(p => `
            <div onclick="App.navigate('product/${p.id}'); document.getElementById('search-results-dropdown').classList.add('hidden');" class="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FFF9F0] cursor-pointer transition-colors">
              <img src="${p.images[0]}" alt="${p.name}" class="w-10 h-10 object-cover rounded-lg border"/>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-[#242424] truncate">${p.name}</p>
                <p class="text-[11px] text-[#C62828] font-bold">${Store.formatPrice(p.price)}</p>
              </div>
            </div>
          `).join("")}
          <div class="pt-1 border-t border-gray-100 text-center">
            <button onclick="App.submitSearch('${query}')" class="text-xs text-[#C62828] font-bold py-1 hover:underline">
              Voir tous les résultats (${matches.length}) →
            </button>
          </div>
        </div>
      `;
    }

    dropdown.classList.remove("hidden");
  },

  submitSearch(query) {
    this.activeFilters.search = query;
    const dropdown = document.getElementById("search-results-dropdown");
    if (dropdown) dropdown.classList.add("hidden");
    this.navigate("shop");
  },

  // FILTRES BOUTIQUE ACTIONS
  setFilter(key, value) {
    this.activeFilters[key] = value;
    this.currentPage = 1;
    this.renderShopPage();
  },

  onPriceSliderChange(val) {
    this.activeFilters.maxPrice = Number(val);
    const label = document.getElementById("price-slider-label");
    if (label) label.textContent = Store.formatPrice(val);
    this.currentPage = 1;
    this.renderShopPage();
  },

  resetFilters() {
    this.activeFilters = {
      category: "all",
      recipient: "all",
      budget: "all",
      maxPrice: 250000,
      search: "",
      sortBy: "popular",
      onlyPromo: false,
      inStock: false
    };
    this.currentPage = 1;
    this.renderShopPage();
  },

  filterByRecipient(recId) {
    this.activeFilters.recipient = recId;
    this.currentPage = 1;
    this.navigate("shop");
  },

  filterByBudget(budgetId) {
    this.activeFilters.budget = budgetId;
    this.currentPage = 1;
    this.navigate("shop");
  },

  goToPage(page) {
    this.currentPage = page;
    this.renderShopPage();
    window.scrollTo({ top: 300, behavior: "smooth" });
  },

  // GESTION FICHE PRODUIT ACTIONS
  detailSelectedOptions: {},
  detailQuantity: 1,

  selectOption(type, value, btnEl) {
    this.detailSelectedOptions[type] = value;
    const parent = btnEl.parentElement;
    parent.querySelectorAll("button").forEach(b => {
      b.className = "px-3 py-1.5 rounded-xl text-xs font-medium border bg-white text-gray-700 border-gray-200 hover:bg-gray-50";
    });
    btnEl.className = "px-3 py-1.5 rounded-xl text-xs font-medium border bg-[#14532D] text-white border-[#14532D]";
  },

  detailQtyStep(delta) {
    const valEl = document.getElementById("detail-quantity-val");
    if (!valEl) return;
    let qty = Number(valEl.textContent) + delta;
    if (qty < 1) qty = 1;
    this.detailQuantity = qty;
    valEl.textContent = qty;
  },

  changeProductMainImage(src, btnEl) {
    const imgEl = document.getElementById("main-product-img");
    if (imgEl) imgEl.src = src;
    btnEl.parentElement.querySelectorAll("button").forEach(b => b.classList.replace("border-[#C62828]", "border-transparent"));
    btnEl.classList.replace("border-transparent", "border-[#C62828]");
  },

  addCurrentDetailToCart(productId, directCheckout = false) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    Store.addToCart(product, this.detailSelectedOptions, this.detailQuantity || 1);
    if (directCheckout) {
      this.navigate("checkout");
    } else {
      this.openCartDrawer();
    }
  },

  applyPromoCodeFromCart() {
    const input = document.getElementById("cart-promo-code");
    if (!input) return;
    const res = Store.applyPromo(input.value);
    Store.showToast(res.message, res.success ? "success" : "error");
    if (res.success) input.value = "";
  },

  // MENU MOBILE & TIROIRS
  toggleMobileMenu() {
    const drawer = document.getElementById("mobile-menu-drawer");
    const backdrop = document.getElementById("mobile-menu-backdrop");
    if (!drawer) return;
    drawer.classList.toggle("-translate-x-full");
    backdrop?.classList.toggle("hidden");
  },

  closeMobileMenu() {
    const drawer = document.getElementById("mobile-menu-drawer");
    const backdrop = document.getElementById("mobile-menu-backdrop");
    if (drawer) drawer.classList.add("-translate-x-full");
    if (backdrop) backdrop.classList.add("hidden");
  },

  openMobileFilters() {
    // Scroll smoothly to filters
    const aside = document.querySelector("aside");
    if (aside) {
      aside.classList.toggle("hidden");
      aside.scrollIntoView({ behavior: "smooth" });
    }
  },

  // 12. COMPTE À REBOURS NOËL (COUNTDOWN)
  initCountdown() {
    const update = () => {
      // Date cible : 25 Décembre 2026 à 00:00:00
      const targetDate = new Date("2026-12-25T00:00:00").getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const elDays = document.getElementById("cd-days");
      const elHours = document.getElementById("cd-hours");
      const elMins = document.getElementById("cd-mins");
      const elSecs = document.getElementById("cd-secs");

      if (elDays) elDays.textContent = String(days).padStart(2, "0");
      if (elHours) elHours.textContent = String(hours).padStart(2, "0");
      if (elMins) elMins.textContent = String(mins).padStart(2, "0");
      if (elSecs) elSecs.textContent = String(secs).padStart(2, "0");
    };

    update();
    setInterval(update, 1000);
  },

  // 13. ANIMATION LÉGÈRE FLOCONS DE NEIGE (CANVAS 60FPS LÉGER)
  initSnow() {
    const canvas = document.getElementById("snow-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const flakeCount = 45; // Très léger pour garantir 60fps et zéros ralentissements
    const flakes = [];

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.5 + 1,
        d: Math.random() * flakeCount,
        vx: Math.random() * 0.8 - 0.4,
        vy: Math.random() * 1.2 + 0.6,
        opacity: Math.random() * 0.7 + 0.3
      });
    }

    const draw = () => {
      if (!Store.state.snowActive) {
        ctx.clearRect(0, 0, width, height);
        requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";

      for (let i = 0; i < flakeCount; i++) {
        const f = flakes[i];
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        ctx.fillStyle = `rgba(255, 253, 248, ${f.opacity})`;
        ctx.fill();

        f.y += f.vy;
        f.x += f.vx;

        if (f.y > height) {
          f.y = -5;
          f.x = Math.random() * width;
        }
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;
      }

      requestAnimationFrame(draw);
    };

    draw();
  },

  // LISTENERS GLOBAUX
  initGlobalListeners() {
    // Clic en dehors pour fermer les menus
    document.addEventListener("click", e => {
      const searchBox = document.getElementById("search-box-container");
      const searchDropdown = document.getElementById("search-results-dropdown");
      if (searchBox && !searchBox.contains(e.target) && searchDropdown) {
        searchDropdown.classList.add("hidden");
      }
    });
  }
};

window.App = App;

// Démarrage automatique au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
