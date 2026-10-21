import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Heart, Minus, Plus, Search, ShoppingBag, Trash2, X } from 'lucide-react'
import Seo from '../components/Seo'
import WhatsAppCta from '../components/WhatsAppCta'

type Badge = 'Popular' | 'New'

type Product = {
  id: number
  name: string
  category: 'Clothing' | 'Accessories' | 'Home'
  price: number
  tone: string
  badge?: Badge
  desc: string
}

const items: Product[] = [
  {
    id: 1,
    name: 'Cotton Panjabi',
    category: 'Clothing',
    price: 1800,
    tone: 'from-indigo-500/30 to-violet-500/10',
    badge: 'Popular',
    desc: 'Hand-loomed cotton with traditional stitching, ideal for Eid and family events.',
  },
  {
    id: 2,
    name: 'Leather Wallet',
    category: 'Accessories',
    price: 650,
    tone: 'from-amber-500/30 to-orange-500/10',
    desc: 'Six card slots, a zip pocket and full-grain leather that softens with use.',
  },
  {
    id: 3,
    name: 'Canvas Tote Bag',
    category: 'Accessories',
    price: 450,
    tone: 'from-emerald-500/30 to-teal-500/10',
    badge: 'New',
    desc: 'Heavy-duty cotton canvas with an inner pocket. Machine washable.',
  },
  {
    id: 4,
    name: 'Linen Shirt',
    category: 'Clothing',
    price: 1400,
    tone: 'from-sky-500/30 to-cyan-500/10',
    desc: 'Breathable half-sleeve linen blend for humid days. Pairs with anything.',
  },
  {
    id: 5,
    name: 'Ceramic Mug',
    category: 'Home',
    price: 300,
    tone: 'from-rose-500/30 to-pink-500/10',
    badge: 'New',
    desc: 'Studio-glazed stoneware, 320ml. Dishwasher and microwave safe.',
  },
  {
    id: 6,
    name: 'Desk Lamp',
    category: 'Home',
    price: 1200,
    tone: 'from-fuchsia-500/30 to-violet-500/10',
    desc: 'Three light modes, touch dimmer and a USB-C port on the base.',
  },
]

const categories = ['All', 'Clothing', 'Accessories', 'Home'] as const

const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'lowhigh', label: 'Price: low to high' },
  { id: 'highlow', label: 'Price: high to low' },
] as const

const money = (value: number) => `৳${value.toLocaleString('en-IN')}`

export default function ShopDemo() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [sort, setSort] = useState<(typeof sorts)[number]['id']>('featured')
  const [selected, setSelected] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [placed, setPlaced] = useState(false)
  const [toast, setToast] = useState('')

  const list = useMemo(() => {
    const filtered = items.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      return matchesCategory && item.name.toLowerCase().includes(query.trim().toLowerCase())
    })
    if (sort === 'lowhigh') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'highlow') return [...filtered].sort((a, b) => b.price - a.price)
    return filtered
  }, [category, query, sort])

  const cartEntries = Object.entries(cart)
    .map(([id, qty]) => ({ product: items.find((item) => item.id === Number(id))!, qty }))
    .filter((entry) => entry.product)

  const cartCount = cartEntries.reduce((sum, entry) => sum + entry.qty, 0)
  const cartSubtotal = cartEntries.reduce((sum, entry) => sum + entry.product.price * entry.qty, 0)
  const cartVat = Math.round(cartSubtotal * 0.05)
  const cartTotal = cartSubtotal + cartVat

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [cartOpen])

  function toggleWishlist(id: number) {
    setWishlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  function addToCart(product: Product, qty = 1) {
    setPlaced(false)
    setCart((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + qty }))
    setToast(`${product.name} added to cart`)
  }

  function updateQty(id: number, delta: number) {
    setCart((current) => {
      const next = { ...current }
      const qty = (next[id] ?? 0) + delta
      if (qty <= 0) delete next[id]
      else next[id] = Math.min(20, qty)
      return next
    })
  }

  function checkout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCart({})
    setPlaced(true)
  }

  return (
    <>
      <Seo
        title="E-commerce Website Demo — Storefront with Cart"
        desc="Try a live e-commerce website demo with catalog, filters, wishlist, cart and checkout flow — how an online store for a Bangladeshi brand can work."
        path="/demo/shopstarter"
      />

      <div className="border-b border-amber-400/20 bg-amber-400/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-3 text-xs text-amber-800">
          <p>Demo only. Products are fictional and no real orders are taken.</p>
          <Link className="underline underline-offset-2" to="/portfolio">
            Back to portfolio
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative grid gap-8 py-12 md:grid-cols-2 md:items-center md:py-16">
          <div>
            <p className="eyebrow">
              <ShoppingBag size={13} aria-hidden="true" />
              Storefront demo
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold md:text-5xl">
              ShopStarter <span className="text-gradient">BD</span>
            </h1>
            <p className="mt-4 max-w-lg leading-relaxed text-slate-600">
              A clean catalog with search, filters, wishlist and a full cart checkout — everything a
              small Bangladeshi brand needs to sell online. Sample data only.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500">
              {['6 sample products', 'Cart and checkout', 'Wishlist', 'No backend'].map((item) => (
                <span key={item} className="rounded-full border border-line bg-ink/5 px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div
              className="relative flex items-center gap-3 rounded-full border border-line bg-panel/80 px-4 py-2.5 shadow-card"
              aria-live="polite"
            >
              <span className="relative">
                <ShoppingBag size={20} className="text-brand-600" aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-ink">
                    {cartCount}
                  </span>
                )}
              </span>
              <div className="text-xs">
                <p className="font-medium text-ink">Your cart</p>
                <p className="text-slate-500">
                  {cartCount === 0 ? 'Empty — add something' : `${money(cartTotal)} · incl. VAT 5%`}
                </p>
              </div>
              <button
                type="button"
                className="btn-p !px-3 !py-1.5 text-xs"
                onClick={() => setCartOpen(true)}
                disabled={cartCount === 0}
                aria-label={
                  cartCount === 0 ? 'Cart is empty' : 'Open cart to review and place sample order'
                }
              >
                View cart
                <ArrowRight size={13} aria-hidden="true" />
              </button>
            </div>

            <div className="grid w-full grid-cols-3 gap-3" aria-hidden="true">
              {items.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className={`flex h-28 items-end rounded-2xl bg-gradient-to-br p-3 md:h-36 ${item.tone}`}
                >
                  <span className="text-[11px] text-ink/70">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xs">
              <Search
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />
              <input
                className="inp !pl-10"
                aria-label="Search products"
                placeholder="Search products"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label="Filter by category"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    category === item
                      ? 'border-brand-400/60 bg-brand-500/20 text-ink'
                      : 'border-line text-slate-600 hover:text-ink'
                  }`}
                >
                  {item}
                </button>
              ))}

              <label className="ml-auto">
                <span className="sr-only">Sort products</span>
                <select
                  className="inp !w-44 !py-2"
                  value={sort}
                  onChange={(event) => setSort(event.target.value as (typeof sorts)[number]['id'])}
                >
                  {sorts.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((item) => (
              <article key={item.id} className="card card-hover group flex flex-col !p-0">
                <div
                  className={`relative h-40 rounded-t-2xl bg-gradient-to-br transition duration-300 group-hover:brightness-110 ${item.tone}`}
                >
                  {item.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink/70 shadow-sm backdrop-blur">
                      {item.badge}
                    </span>
                  )}
                  <button
                    type="button"
                    aria-pressed={wishlist.includes(item.id)}
                    aria-label={
                      wishlist.includes(item.id)
                        ? `Remove ${item.name} from wishlist`
                        : `Add ${item.name} to wishlist`
                    }
                    onClick={() => toggleWishlist(item.id)}
                    className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/85 shadow-sm backdrop-blur transition hover:bg-white"
                  >
                    <Heart
                      size={15}
                      className={
                        wishlist.includes(item.id) ? 'fill-rose-400 text-rose-400' : 'text-ink/70'
                      }
                    />
                  </button>
                  <span
                    className="absolute bottom-3 right-4 font-display text-4xl font-bold text-ink/25"
                    aria-hidden="true"
                  >
                    {String(item.id).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                    {item.category}
                  </p>
                  <h2 className="mt-1 font-display text-lg font-semibold">{item.name}</h2>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                  <p className="mt-3 font-display text-xl font-bold text-brand-600">
                    {money(item.price)}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="btn-p flex-1 !px-3 !py-2.5 text-xs"
                      aria-label={`Add ${item.name} to cart`}
                      onClick={() => addToCart(item)}
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      className="btn-s !px-3 !py-2.5 text-xs"
                      aria-label={`View details for ${item.name}`}
                      onClick={() => {
                        setSelected(item)
                        setQuantity(1)
                      }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!list.length && (
            <div className="card mt-8 text-center">
              <p className="font-display font-semibold">No products match.</p>
              <p className="mt-2 text-sm text-slate-600">
                Clear the search or choose another category.
              </p>
              <button
                type="button"
                className="btn-s mt-5"
                onClick={() => {
                  setQuery('')
                  setCategory('All')
                }}
              >
                Reset filters
              </button>
            </div>
          )}

          <p className="mt-8 text-center text-xs text-slate-500">
            Catalog is filtered and sorted in the browser. Cart totals use a sample 5% VAT and are
            not sent anywhere.
          </p>
        </div>
      </section>

      {selected && (
        <section className="container-x pb-16" aria-live="polite">
          <div className="card relative grid gap-6 md:grid-cols-2">
            <button
              type="button"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-line text-slate-600 transition hover:text-ink"
              onClick={() => setSelected(null)}
              aria-label="Close product details"
            >
              <X size={15} />
            </button>

            <div
              className={`min-h-56 rounded-xl bg-gradient-to-br ${selected.tone}`}
              aria-hidden="true"
            />

            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                {selected.category}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold">{selected.name}</h2>
              <p className="mt-2 font-display text-2xl font-bold text-brand-600">
                {money(selected.price)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{selected.desc}</p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                {[
                  'Free delivery inside Dhaka on orders over ৳1,000',
                  '7-day return window on unused items',
                  'Cash on delivery available',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-brand-300" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-3">
                <span className="text-sm text-slate-600">Quantity</span>
                <div className="flex items-center gap-1 rounded-full border border-line p-1">
                  <button
                    type="button"
                    className="grid h-7 w-7 place-items-center rounded-full text-slate-600 hover:bg-ink/10"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-6 text-center text-sm" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="grid h-7 w-7 place-items-center rounded-full text-slate-600 hover:bg-ink/10"
                    onClick={() => setQuantity((value) => Math.min(20, value + 1))}
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>
                <span className="ml-auto text-sm text-slate-600">
                  Subtotal{' '}
                  <span className="font-semibold text-ink">{money(selected.price * quantity)}</span>
                </span>
              </div>

              <button
                type="button"
                className="btn-p mt-5 w-full"
                onClick={() => addToCart(selected, quantity)}
              >
                Add to cart — {money(selected.price * quantity)}
              </button>
              <button
                type="button"
                className="btn-s mt-2 w-full"
                onClick={() => {
                  addToCart(selected, quantity)
                  setCartOpen(true)
                }}
              >
                Buy now
              </button>

              <div className="mt-5">
                <WhatsAppCta
                  service="E-commerce website (ShopStarter BD demo)"
                  label="Ask about a store like this"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {cartOpen && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Sample cart"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <h2 className="font-display text-lg font-semibold">Your cart</h2>
                <p className="text-xs text-slate-500">
                  {placed
                    ? 'Sample order placed'
                    : `${cartCount} item${cartCount === 1 ? '' : 's'} · demo checkout`}
                </p>
              </div>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-slate-600 transition hover:text-ink"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {placed ? (
                <div className="rounded-xl border border-mint/30 bg-mint/10 p-5">
                  <h3 className="flex items-center gap-2 font-display font-semibold text-mint">
                    Sample order completed
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Nothing was sent or saved — this demo has no backend, so no merchant received an
                    order. The cart has been cleared for another try.
                  </p>
                  <button
                    type="button"
                    className="btn-s mt-4"
                    onClick={() => {
                      setPlaced(false)
                      setCartOpen(false)
                    }}
                  >
                    Start a new demo order
                  </button>
                </div>
              ) : cartEntries.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-ink/5 text-slate-500">
                      <ShoppingBag size={20} aria-hidden="true" />
                    </span>
                    <p className="mt-4 font-display font-semibold text-ink">Your cart is empty</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Add a few products and open the cart here.
                    </p>
                    <button type="button" className="btn-s mt-5" onClick={() => setCartOpen(false)}>
                      Continue browsing
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {cartEntries.map(({ product, qty }) => (
                    <li
                      key={product.id}
                      className="flex items-center gap-3 rounded-xl border border-line bg-slate-50 p-3"
                    >
                      <span
                        className={`h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br ${product.tone}`}
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-ink">{product.name}</p>
                        <p className="text-xs text-slate-500">{money(product.price)}</p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full border border-line p-0.5 text-xs">
                        <button
                          type="button"
                          className="grid h-6 w-6 place-items-center rounded-full text-slate-600 hover:bg-ink/10"
                          aria-label={`Decrease quantity of ${product.name}`}
                          onClick={() => updateQty(product.id, -1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center" aria-live="polite">
                          {qty}
                        </span>
                        <button
                          type="button"
                          className="grid h-6 w-6 place-items-center rounded-full text-slate-600 hover:bg-ink/10"
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => updateQty(product.id, 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="w-16 text-right text-sm font-semibold text-ink">
                        {money(product.price * qty)}
                      </p>
                      <button
                        type="button"
                        className="text-slate-500 transition hover:text-rose-300"
                        aria-label={`Remove ${product.name} from cart`}
                        onClick={() => {
                          updateQty(product.id, -qty)
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {!placed && cartEntries.length > 0 && (
              <form onSubmit={checkout} className="border-t border-line px-5 py-4">
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <dt>Subtotal</dt>
                    <dd>{money(cartSubtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <dt>VAT (5%)</dt>
                    <dd>{money(cartVat)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-line pt-2 font-display text-lg font-bold text-ink">
                    <dt>Total</dt>
                    <dd>{money(cartTotal)}</dd>
                  </div>
                </dl>
                <button className="btn-p mt-4 w-full" type="submit">
                  Place sample order — {money(cartTotal)}
                </button>
                <p className="mt-2 text-center text-xs text-slate-500">
                  Demo checkout — nothing is sent to a server.
                </p>
              </form>
            )}
          </aside>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2" role="status">
          <p className="flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2.5 text-sm text-ink shadow-card">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-mint/20 text-mint">
              <Check size={12} aria-hidden="true" />
            </span>
            {toast}
          </p>
        </div>
      )}
    </>
  )
}
