import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  FileText,
  LayoutDashboard,
  Package,
  Plus,
  Search,
  ShoppingCart,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import Seo from '../components/Seo'

type Item = {
  sku: string
  name: string
  category: 'Clothing' | 'Accessories' | 'Home'
  stock: number
  price: number
}

type Invoice = {
  id: string
  customer: string
  date: string
  status: 'Paid' | 'Due'
  items: { name: string; qty: number; price: number }[]
}

const initialInventory: Item[] = [
  { sku: 'BT-001', name: 'Cotton Panjabi', category: 'Clothing', stock: 24, price: 1800 },
  { sku: 'BT-002', name: 'Leather Wallet', category: 'Accessories', stock: 5, price: 650 },
  { sku: 'BT-003', name: 'Canvas Tote', category: 'Accessories', stock: 0, price: 450 },
  { sku: 'BT-004', name: 'Linen Shirt', category: 'Clothing', stock: 12, price: 1400 },
  { sku: 'BT-005', name: 'Ceramic Mug', category: 'Home', stock: 38, price: 300 },
  { sku: 'BT-006', name: 'Desk Lamp', category: 'Home', stock: 3, price: 1200 },
  { sku: 'BT-007', name: 'Denim Jacket', category: 'Clothing', stock: 9, price: 2600 },
  { sku: 'BT-008', name: 'Travel Bottle', category: 'Home', stock: 17, price: 550 },
]

const initialInvoices: Invoice[] = [
  {
    id: 'INV-2041',
    customer: 'Ayesha Rahman',
    date: '18 Oct 2026',
    status: 'Paid',
    items: [
      { name: 'Cotton Panjabi', qty: 2, price: 1800 },
      { name: 'Leather Wallet', qty: 1, price: 650 },
    ],
  },
  {
    id: 'INV-2040',
    customer: 'Rafiq Hasan',
    date: '17 Oct 2026',
    status: 'Due',
    items: [
      { name: 'Denim Jacket', qty: 1, price: 2600 },
      { name: 'Travel Bottle', qty: 2, price: 550 },
    ],
  },
  {
    id: 'INV-2039',
    customer: 'Nusrat Jahan',
    date: '16 Oct 2026',
    status: 'Paid',
    items: [
      { name: 'Ceramic Mug', qty: 4, price: 300 },
      { name: 'Linen Shirt', qty: 1, price: 1400 },
    ],
  },
]

const sales = [
  { day: 'Mon', value: 42 },
  { day: 'Tue', value: 58 },
  { day: 'Wed', value: 47 },
  { day: 'Thu', value: 72 },
  { day: 'Fri', value: 64 },
  { day: 'Sat', value: 91 },
  { day: 'Sun', value: 78 },
]

const categories = ['All', 'Clothing', 'Accessories', 'Home'] as const

const views = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'invoices', label: 'Invoices', icon: FileText },
] as const

type View = (typeof views)[number]['id']

const money = (value: number) => `৳${value.toLocaleString('en-IN')}`

function stockStatus(stock: number) {
  if (stock === 0) return { label: 'Out of stock', className: 'bg-rose-500/15 text-rose-300' }
  if (stock <= 5) return { label: 'Low stock', className: 'bg-amber-400/15 text-amber-800' }
  return { label: 'In stock', className: 'bg-mint/15 text-mint' }
}

const today = new Date().toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

function Modal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label={`Close ${title}`}
      />
      <div className="card relative w-full max-w-md !p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <button
            type="button"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-slate-600 transition hover:text-ink"
            onClick={onClose}
            aria-label={`Close ${title}`}
          >
            <X size={15} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function AddProductModal({
  sku,
  onClose,
  onCreate,
}: {
  sku: string
  onClose: () => void
  onCreate: (item: Item) => void
}) {
  return (
    <Modal title="Add product" onClose={onClose}>
      <form
        className="mt-4 grid gap-3"
        onSubmit={(event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          onCreate({
            sku: String(data.get('sku') || sku),
            name: String(data.get('name') || ''),
            category: String(data.get('category')) as Item['category'],
            stock: Number(data.get('stock') || 0),
            price: Number(data.get('price') || 0),
          })
        }}
      >
        <label className="text-sm">
          SKU
          <input name="sku" className="inp mt-1.5" defaultValue={sku} />
        </label>
        <label className="text-sm">
          Product name
          <input name="name" required className="inp mt-1.5" placeholder="e.g. Jute Bag" />
        </label>
        <label className="text-sm">
          Category
          <select name="category" className="inp mt-1.5" defaultValue="Clothing">
            <option>Clothing</option>
            <option>Accessories</option>
            <option>Home</option>
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            Stock
            <input
              name="stock"
              type="number"
              min={0}
              required
              defaultValue={10}
              className="inp mt-1.5"
            />
          </label>
          <label className="text-sm">
            Price (৳)
            <input
              name="price"
              type="number"
              min={0}
              required
              defaultValue={500}
              className="inp mt-1.5"
            />
          </label>
        </div>
        <button className="btn-p mt-1 w-full" type="submit">
          Add to inventory
        </button>
        <p className="text-center text-xs text-slate-500">
          Stays on this page only — the demo has no backend.
        </p>
      </form>
    </Modal>
  )
}

function InvoiceModal({
  products,
  nextId,
  onClose,
  onCreate,
}: {
  products: Item[]
  nextId: string
  onClose: () => void
  onCreate: (invoice: Invoice) => void
}) {
  const [firstSku, setFirstSku] = useState(products[0]?.sku ?? '')
  const [firstQty, setFirstQty] = useState(1)
  const [secondSku, setSecondSku] = useState('')
  const [secondQty, setSecondQty] = useState(1)

  const rows = [firstSku, secondSku]
    .map((sku, index) => {
      const product = products.find((item) => item.sku === sku)
      if (!product) return null
      return { product, qty: index === 0 ? firstQty : secondQty }
    })
    .filter(Boolean) as { product: Item; qty: number }[]

  const subtotal = rows.reduce((sum, row) => sum + row.product.price * row.qty, 0)
  const vat = Math.round(subtotal * 0.05)
  const total = subtotal + vat

  return (
    <Modal title="Create invoice" onClose={onClose}>
      <form
        className="mt-4 space-y-3"
        onSubmit={(event) => {
          event.preventDefault()
          if (rows.length === 0) return
          const data = new FormData(event.currentTarget)
          onCreate({
            id: nextId,
            customer: String(data.get('customer') || ''),
            date: today,
            status: data.get('status') === 'Due' ? 'Due' : 'Paid',
            items: rows.map((row) => ({
              name: row.product.name,
              qty: row.qty,
              price: row.product.price,
            })),
          })
        }}
      >
        <label className="block text-sm">
          Customer name
          <input name="customer" required className="inp mt-1.5" placeholder="e.g. Karim Uddin" />
        </label>
        <label className="block text-sm">
          Status
          <select name="status" className="inp mt-1.5" defaultValue="Paid">
            <option>Paid</option>
            <option>Due</option>
          </select>
        </label>

        <div className="rounded-xl border border-line bg-slate-50 p-3 text-xs">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Items</p>
          <div className="mt-2 space-y-2">
            <div className="flex gap-2">
              <label className="min-w-0 flex-1">
                <span className="sr-only">First product</span>
                <select
                  className="inp !py-2 text-xs"
                  value={firstSku}
                  onChange={(event) => setFirstSku(event.target.value)}
                  aria-label="First product"
                >
                  {products.map((item) => (
                    <option key={item.sku} value={item.sku}>
                      {item.name} — {money(item.price)}
                    </option>
                  ))}
                </select>
              </label>
              <input
                type="number"
                min={1}
                max={99}
                value={firstQty}
                onChange={(event) => setFirstQty(Math.max(1, Number(event.target.value) || 1))}
                className="inp !w-16 !py-2 text-center text-xs"
                aria-label="Quantity for first product"
              />
            </div>
            <div className="flex gap-2">
              <label className="min-w-0 flex-1">
                <span className="sr-only">Second product</span>
                <select
                  className="inp !py-2 text-xs"
                  value={secondSku}
                  onChange={(event) => setSecondSku(event.target.value)}
                  aria-label="Second product"
                >
                  <option value="">No second product</option>
                  {products.map((item) => (
                    <option key={item.sku} value={item.sku}>
                      {item.name} — {money(item.price)}
                    </option>
                  ))}
                </select>
              </label>
              <input
                type="number"
                min={1}
                max={99}
                value={secondQty}
                onChange={(event) => setSecondQty(Math.max(1, Number(event.target.value) || 1))}
                disabled={!secondSku}
                className="inp !w-16 !py-2 text-center text-xs"
                aria-label="Quantity for second product"
              />
            </div>
          </div>

          <dl className="mt-3 space-y-1 border-t border-line pt-3">
            <div className="flex justify-between text-slate-600">
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-slate-600">
              <dt>VAT (5%)</dt>
              <dd>{money(vat)}</dd>
            </div>
            <div className="flex justify-between font-display text-sm font-bold text-ink">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
        </div>

        <button className="btn-p w-full" type="submit" disabled={rows.length === 0}>
          Create invoice — {money(total)}
        </button>
        <p className="text-center text-xs text-slate-500">
          Invoice is a local sample — no PDF is generated and nothing is sent.
        </p>
      </form>
    </Modal>
  )
}

export default function BizTrackDemo() {
  const [stock, setStock] = useState(initialInventory)
  const [bills, setBills] = useState(initialInvoices)
  const [view, setView] = useState<View>('overview')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [lowOnly, setLowOnly] = useState(false)
  const [invoiceId, setInvoiceId] = useState(initialInvoices[0].id)
  const [addOpen, setAddOpen] = useState(false)
  const [invOpen, setInvOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = addOpen || invOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [addOpen, invOpen])

  const filtered = useMemo(
    () =>
      stock.filter((item) => {
        const matchesCategory = category === 'All' || item.category === category
        const needle = query.trim().toLowerCase()
        const matchesQuery =
          !needle ||
          item.name.toLowerCase().includes(needle) ||
          item.sku.toLowerCase().includes(needle)
        const matchesLow = !lowOnly || item.stock <= 5
        return matchesCategory && matchesQuery && matchesLow
      }),
    [stock, category, query, lowOnly],
  )

  const invoice = bills.find((item) => item.id === invoiceId) ?? bills[0]
  const invoiceSubtotal = invoice.items.reduce((sum, item) => sum + item.qty * item.price, 0)
  const invoiceVat = Math.round(invoiceSubtotal * 0.05)
  const invoiceTotal = invoiceSubtotal + invoiceVat

  const lowCount = stock.filter((item) => item.stock <= 5).length
  const nextId = `INV-${Math.max(...bills.map((bill) => Number(bill.id.split('-')[1])), 0) + 1}`

  const summary = [
    { label: 'Revenue this month', value: '৳1,24,500', change: '+12.4%', icon: TrendingUp },
    { label: 'Orders', value: '148', change: '+8 this week', icon: ShoppingCart },
    {
      label: 'Low stock items',
      value: String(lowCount),
      change: 'Needs attention',
      icon: AlertTriangle,
    },
    { label: 'Customers', value: '64', change: '+5 new', icon: Users },
  ]

  const activity = [
    { text: 'INV-2041 settled by Ayesha Rahman', time: '2h ago', tone: 'bg-mint' },
    { text: 'Canvas Tote marked out of stock', time: '5h ago', tone: 'bg-rose-400' },
    { text: 'Due reminder sent for INV-2040', time: '8h ago', tone: 'bg-amber-300' },
    { text: 'New order added by Nusrat Jahan', time: '1d ago', tone: 'bg-mint' },
  ]

  const quickActions = [
    {
      label: 'Add product',
      run: () => {
        setQuery('')
        setCategory('All')
        setLowOnly(false)
        setView('inventory')
        setAddOpen(true)
      },
    },
    {
      label: 'Create invoice',
      run: () => {
        setView('invoices')
        setInvOpen(true)
      },
    },
    {
      label: 'Review low stock',
      run: () => {
        setQuery('')
        setCategory('All')
        setLowOnly(true)
        setView('inventory')
      },
    },
  ]

  const viewTitle =
    view === 'overview' ? 'Overview' : view === 'inventory' ? 'Inventory' : 'Invoices'

  return (
    <>
      <Seo
        title="Business Dashboard Demo — Inventory & Invoices"
        desc="A business web app demo with inventory, invoices and sales analytics on sample data — a preview of custom dashboards for small businesses in Bangladesh."
        path="/demo/biztrack"
      />

      <div className="border-b border-mint/20 bg-mint/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-3 text-xs text-mint">
          <p>Demo only. All products, sales and invoices are fictional sample data.</p>
          <Link className="underline underline-offset-2" to="/portfolio">
            Back to portfolio
          </Link>
        </div>
      </div>

      <section className="container-x py-10">
        <h1 className="sr-only">BizTrack Lite — business dashboard demo</h1>

        <div className="overflow-hidden rounded-2xl border border-line bg-panel/60 shadow-card">
          <div className="grid lg:grid-cols-[220px_1fr]">
            <aside className="hidden border-r border-line bg-slate-50 p-5 lg:block">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint/15 text-mint">
                  <Boxes size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold">BizTrack</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">Lite demo</p>
                </div>
              </div>

              <nav className="mt-6 space-y-1 text-sm" aria-label="Demo dashboard sections">
                {views.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setView(item.id)}
                    aria-pressed={view === item.id}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition ${
                      view === item.id
                        ? 'bg-ink/10 text-ink'
                        : 'text-slate-600 hover:bg-ink/5 hover:text-ink'
                    }`}
                  >
                    <item.icon size={16} aria-hidden="true" />
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-8 rounded-xl border border-line bg-ink/5 p-3 text-[11px] leading-relaxed text-slate-500">
                Switch views with the buttons above. Add products and create invoices — everything
                stays on this page.
              </div>
            </aside>

            <div>
              <div
                className="flex gap-1.5 overflow-x-auto border-b border-line px-4 py-3 lg:hidden"
                role="group"
                aria-label="Switch dashboard view"
              >
                {views.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setView(item.id)}
                    aria-pressed={view === item.id}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition ${
                      view === item.id
                        ? 'border-mint/50 bg-mint/15 text-mint'
                        : 'border-line text-slate-600 hover:text-ink'
                    }`}
                  >
                    <item.icon size={13} aria-hidden="true" />
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
                <div>
                  <p className="font-display text-lg font-semibold">{viewTitle}</p>
                  <p className="text-xs text-slate-500">{today}</p>
                </div>
                <div className="flex items-center gap-2">
                  {view === 'inventory' && (
                    <div className="relative">
                      <Search
                        size={14}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                        aria-hidden="true"
                      />
                      <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search inventory"
                        aria-label="Search inventory"
                        className="inp !w-44 !py-2 !pl-9 text-xs sm:!w-56"
                      />
                    </div>
                  )}
                  <span
                    className="grid h-8 w-8 place-items-center rounded-full bg-brand-500/20 text-xs font-bold text-brand-600"
                    aria-hidden="true"
                  >
                    S
                  </span>
                </div>
              </div>

              <div className="p-5">
                {view === 'overview' && (
                  <div className="space-y-5">
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {summary.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl border border-line bg-slate-50 p-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-wide text-slate-500">
                              {item.label}
                            </span>
                            <item.icon
                              size={15}
                              className={
                                item.label === 'Low stock items' ? 'text-amber-700' : 'text-mint'
                              }
                              aria-hidden="true"
                            />
                          </div>
                          <p className="mt-2 font-display text-xl font-bold">{item.value}</p>
                          <p className="mt-0.5 text-[11px] text-slate-500">{item.change}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-4 xl:grid-cols-3">
                      <div className="rounded-xl border border-line bg-slate-50 p-4 xl:col-span-2">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-medium">Sales this week</h2>
                          <span className="inline-flex items-center gap-1 text-xs text-mint">
                            <ArrowUpRight size={13} aria-hidden="true" />
                            18.2%
                          </span>
                        </div>
                        <div className="mt-5 flex h-40 items-end gap-2.5">
                          {sales.map((entry) => (
                            <div
                              key={entry.day}
                              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                            >
                              <div
                                className="w-full rounded-t-md bg-gradient-to-t from-mint/25 to-mint transition hover:from-mint/40"
                                style={{ height: `${entry.value}%` }}
                                title={`${entry.day}: ${money(entry.value * 1000)}`}
                              />
                              <span className="text-[10px] text-slate-500">{entry.day}</span>
                            </div>
                          ))}
                        </div>
                        <p className="mt-3 text-[11px] text-slate-500">
                          Sample sales in ৳ thousands. Hover bars for daily totals.
                        </p>
                      </div>

                      <div className="rounded-xl border border-line bg-slate-50 p-4">
                        <h2 className="text-sm font-medium">Quick actions</h2>
                        <div className="mt-4 space-y-2 text-sm">
                          {quickActions.map((action) => (
                            <button
                              key={action.label}
                              type="button"
                              onClick={action.run}
                              className="flex w-full items-center justify-between rounded-lg border border-line bg-ink/5 px-3 py-2.5 text-slate-600 transition hover:border-brand-300 hover:text-ink"
                            >
                              {action.label}
                              <ArrowUpRight
                                size={13}
                                className="text-slate-500"
                                aria-hidden="true"
                              />
                            </button>
                          ))}
                        </div>
                        <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
                          These buttons really work — try them.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-line bg-slate-50 p-4">
                      <h2 className="text-sm font-medium">Recent activity</h2>
                      <ul className="mt-3 space-y-2.5 text-xs">
                        {activity.map((entry) => (
                          <li
                            key={entry.text}
                            className="flex items-center gap-2.5 border-b border-line/60 pb-2.5 last:border-0 last:pb-0"
                          >
                            <span
                              className={`h-1.5 w-1.5 shrink-0 rounded-full ${entry.tone}`}
                              aria-hidden="true"
                            />
                            <span className="text-slate-600">{entry.text}</span>
                            <span className="ml-auto shrink-0 text-slate-500">{entry.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {view === 'inventory' && (
                  <div className="rounded-xl border border-line bg-slate-50">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-medium">Stock on hand</h2>
                        <button
                          type="button"
                          aria-pressed={lowOnly}
                          onClick={() => setLowOnly((value) => !value)}
                          className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                            lowOnly
                              ? 'border-amber-300/50 bg-amber-400/15 text-amber-800'
                              : 'border-line text-slate-600 hover:text-ink'
                          }`}
                        >
                          Low stock only
                        </button>
                      </div>
                      <button
                        type="button"
                        className="btn-p !bg-mint !px-3 !py-1.5 !text-ink !shadow-none text-xs hover:!bg-mint/90"
                        onClick={() => setAddOpen(true)}
                      >
                        <span className="flex items-center gap-1.5">
                          <Plus size={13} aria-hidden="true" />
                          Add product
                        </span>
                      </button>
                    </div>

                    <div className="px-4 py-3">
                      <div
                        className="flex flex-wrap gap-1.5"
                        role="group"
                        aria-label="Filter inventory"
                      >
                        {categories.map((item) => (
                          <button
                            key={item}
                            type="button"
                            aria-pressed={category === item}
                            onClick={() => setCategory(item)}
                            className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                              category === item
                                ? 'border-mint/50 bg-mint/15 text-mint'
                                : 'border-line text-slate-600 hover:text-ink'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[560px] text-left text-xs">
                        <thead className="text-[10px] uppercase tracking-wider text-slate-500">
                          <tr className="border-y border-line bg-ink/5">
                            <th className="px-4 py-2.5 font-medium">Product</th>
                            <th className="px-4 py-2.5 font-medium">SKU</th>
                            <th className="px-4 py-2.5 font-medium">Category</th>
                            <th className="px-4 py-2.5 text-right font-medium">Stock</th>
                            <th className="px-4 py-2.5 text-right font-medium">Price</th>
                            <th className="px-4 py-2.5 text-right font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.map((item) => {
                            const status = stockStatus(item.stock)
                            return (
                              <tr
                                key={`${item.sku}-${item.name}`}
                                className="border-b border-line/60 last:border-0 hover:bg-ink/5"
                              >
                                <td className="px-4 py-2.5 text-ink">{item.name}</td>
                                <td className="px-4 py-2.5 text-slate-500">{item.sku}</td>
                                <td className="px-4 py-2.5 text-slate-600">{item.category}</td>
                                <td className="px-4 py-2.5 text-right text-slate-600">
                                  {item.stock}
                                </td>
                                <td className="px-4 py-2.5 text-right text-slate-600">
                                  {money(item.price)}
                                </td>
                                <td className="px-4 py-2.5 text-right">
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] ${status.className}`}
                                  >
                                    {status.label}
                                  </span>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                    <p className="px-4 py-3 text-[11px] text-slate-500">
                      Showing {filtered.length} of {stock.length} sample products.
                    </p>
                    {filtered.length === 0 && (
                      <p className="px-4 pb-4 text-center text-xs text-slate-500">
                        No products match the current search and filter.
                      </p>
                    )}
                  </div>
                )}

                {view === 'invoices' && (
                  <div className="rounded-xl border border-line bg-slate-50">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
                      <h2 className="text-sm font-medium">Invoices</h2>
                      <button
                        type="button"
                        className="btn-p !px-3 !py-1.5 text-xs"
                        onClick={() => setInvOpen(true)}
                      >
                        <span className="flex items-center gap-1.5">
                          <Plus size={13} aria-hidden="true" />
                          Create invoice
                        </span>
                      </button>
                    </div>

                    <div className="grid gap-4 p-4 xl:grid-cols-3">
                      <div className="space-y-2">
                        {bills.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setInvoiceId(item.id)}
                            aria-pressed={invoiceId === item.id}
                            className={`w-full rounded-lg border px-3 py-2.5 text-left text-xs transition ${
                              invoiceId === item.id
                                ? 'border-brand-400/50 bg-brand-500/15'
                                : 'border-line bg-ink/5 hover:border-brand-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-ink">{item.id}</span>
                              <span
                                className={item.status === 'Paid' ? 'text-mint' : 'text-amber-800'}
                              >
                                {item.status}
                              </span>
                            </div>
                            <p className="mt-1 text-slate-500">
                              {item.customer} · {item.date}
                            </p>
                          </button>
                        ))}
                      </div>

                      <div className="rounded-xl border border-line bg-slate-50 p-4 xl:col-span-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-sm font-medium">Invoice preview</h2>
                            <p className="text-xs text-slate-500">
                              {invoice.id} · {invoice.customer}
                            </p>
                          </div>
                          <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[10px] uppercase tracking-wide text-slate-600">
                            Preview only
                          </span>
                        </div>

                        <div className="mt-4 space-y-2 text-xs">
                          {invoice.items.map((item, index) => (
                            <div
                              key={`${item.name}-${index}`}
                              className="flex items-center justify-between gap-3 border-b border-line/60 pb-2"
                            >
                              <span className="text-slate-600">
                                {item.name} <span className="text-slate-500">× {item.qty}</span>
                              </span>
                              <span className="text-slate-600">{money(item.qty * item.price)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between pt-1 text-slate-500">
                            <span>Subtotal</span>
                            <span>{money(invoiceSubtotal)}</span>
                          </div>
                          <div className="flex justify-between text-slate-500">
                            <span>VAT (5%)</span>
                            <span>{money(invoiceVat)}</span>
                          </div>
                          <div className="flex justify-between border-t border-line pt-2 font-display text-base font-bold text-ink">
                            <span>Total</span>
                            <span>{money(invoiceTotal)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {addOpen && (
          <AddProductModal
            sku={`BT-${String(stock.length + 1).padStart(3, '0')}`}
            onClose={() => setAddOpen(false)}
            onCreate={(item) => {
              setStock((current) => [item, ...current])
              setQuery('')
              setCategory('All')
              setLowOnly(false)
              setView('inventory')
              setAddOpen(false)
            }}
          />
        )}

        {invOpen && (
          <InvoiceModal
            products={stock}
            nextId={nextId}
            onClose={() => setInvOpen(false)}
            onCreate={(created) => {
              setBills((current) => [created, ...current])
              setInvoiceId(created.id)
              setView('invoices')
              setInvOpen(false)
            }}
          />
        )}

        <p className="mt-4 text-center text-xs text-slate-500">
          BizTrack Lite is a front-end demo. Views, filters and forms are interactive, but no data
          is stored or sent anywhere.
        </p>
      </section>
    </>
  )
}
