import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Clock3, Flame, MapPin, Phone, Quote, Star, UtensilsCrossed } from 'lucide-react'
import Seo from '../components/Seo'
import WhatsAppCta from '../components/WhatsAppCta'

type MenuItem = { name: string; desc: string; price: number; tag?: string }

const menu: Record<string, MenuItem[]> = {
  Starters: [
    { name: 'Chicken Pakora', desc: 'Crisp gram-flour fritters with mint chutney.', price: 320 },
    { name: 'Beguni', desc: 'Thin sliced aubergine, spiced batter, fried to order.', price: 180 },
    { name: 'Prawn Tempura', desc: 'Light batter, sweet chilli dip.', price: 520, tag: 'Popular' },
    { name: 'Lentil Soup', desc: 'Slow-cooked masoor dal with lemon.', price: 220 },
  ],
  Mains: [
    {
      name: 'Kacchi Biryani',
      desc: 'Mutton and aged basmati, cooked on dum.',
      price: 780,
      tag: 'Signature',
    },
    { name: 'Beef Bhuna', desc: 'Slow-braised beef with roasted spices.', price: 640 },
    { name: 'Chicken Roast', desc: 'Whole leg roast with rich gravy.', price: 520 },
    {
      name: 'Paneer Curry',
      desc: 'Cottage cheese in a tomato-cashew gravy.',
      price: 480,
      tag: 'Veg',
    },
  ],
  Desserts: [
    { name: 'Firni', desc: 'Chilled rice pudding in a clay bowl.', price: 180 },
    { name: 'Mishti Doi', desc: 'Caramelised sweet yoghurt.', price: 160 },
    { name: 'Gulab Jamun', desc: 'Warm milk dumplings in rose syrup.', price: 200 },
  ],
  Drinks: [
    { name: 'Borhani', desc: 'Salted yoghurt drink with mint.', price: 120 },
    { name: 'Fresh Lemonade', desc: 'Hand-pressed lemon, light sugar.', price: 150 },
    { name: 'Masala Tea', desc: 'Cardamom and ginger milk tea.', price: 90 },
  ],
}

const gallery = [
  { label: 'Dining room', className: 'from-amber-500/30 via-orange-600/20 to-rose-500/20' },
  { label: 'Signature biryani', className: 'from-rose-500/30 via-amber-500/20 to-yellow-400/20' },
  { label: 'Open kitchen', className: 'from-orange-500/30 via-rose-500/20 to-purple-500/20' },
  { label: 'Dessert counter', className: 'from-yellow-400/30 via-amber-500/20 to-orange-600/20' },
]

const special = {
  name: 'Mutton Tehari',
  desc: 'Friday-only special: short-grain rice slow-cooked in mustard oil with a bright spice mix.',
  price: 650,
}

const reviews = [
  {
    name: 'Tanjim Ahmed',
    area: 'Gulshan',
    rating: 5,
    text: 'The kacchi biryani is the best I have had outside Old Dhaka. Already booked again for next month.',
  },
  {
    name: 'Farhana Islam',
    area: 'Uttara',
    rating: 5,
    text: 'Calm room, quick service and the firni tastes exactly like home. Perfect for family dinners.',
  },
  {
    name: 'Shakib Chowdhury',
    area: 'Mirpur',
    rating: 4,
    text: 'Good food and honest prices. Friday evening gets busy, so reserve ahead.',
  },
]

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={13}
          className={star <= value ? 'fill-amber-300 text-amber-700' : 'text-slate-600'}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

export default function RestaurantDemo() {
  const [tab, setTab] = useState('Mains')
  const [reserved, setReserved] = useState(false)

  function reserve(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setReserved(true)
  }

  return (
    <>
      <Seo
        title="Restaurant Website Demo — Menu & Reservation"
        desc="A restaurant website demo with tabbed menu, chef's special, guest reviews, gallery and a reservation form — see how a Dhaka restaurant site can look."
        path="/demo/restaurantpro"
      />

      <div className="border-b border-amber-400/20 bg-amber-400/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-3 text-xs text-amber-800">
          <p>Demo only. This restaurant is fictional and no real reservations are taken.</p>
          <Link className="underline underline-offset-2" to="/portfolio">
            Back to portfolio
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-600/15 via-white to-rose-600/10"
          aria-hidden="true"
        />
        <div className="container-x relative grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-800">
              <Star size={13} aria-hidden="true" />
              Modern Bangladeshi kitchen
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold md:text-6xl">
              Restaurant<span className="text-amber-700">Pro</span>
            </h1>
            <p className="mt-4 max-w-lg leading-relaxed text-slate-600">
              Slow-cooked classics, a calm dining room and a menu built around fresh, local
              ingredients. Sample restaurant concept for demonstration.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#reserve"
                className="btn-p !bg-amber-400 !text-ink !shadow-none hover:!bg-amber-300"
              >
                Reserve a table
              </a>
              <a href="#menu" className="btn-s">
                View the menu
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={14} aria-hidden="true" /> Open daily from 12:00
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} aria-hidden="true" /> Dhanmondi, Dhaka
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone size={14} aria-hidden="true" /> 01XXXXXXXXX
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              {gallery.map((item, index) => (
                <div
                  key={item.label}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.className} ${
                    index === 0 ? 'row-span-2 h-full min-h-[15rem]' : 'h-32'
                  }`}
                >
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] text-ink/70 shadow-sm backdrop-blur">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-right text-[10px] uppercase tracking-wider text-slate-600">
              Placeholder gallery
            </p>
          </div>
        </div>
      </section>

      <section id="menu" className="section border-y border-line bg-panel/30">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow !border-amber-400/30 !bg-amber-400/10 !text-amber-800">Menu</p>
              <h2 className="h2 mt-4">Cooked to order</h2>
              <p className="mt-3 max-w-xl text-slate-600">
                Sample prices in BDT. A real restaurant would manage this menu from a simple CMS.
              </p>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">
              {Object.keys(menu).map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={tab === category}
                  onClick={() => setTab(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    tab === category
                      ? 'border-amber-400/60 bg-amber-400/15 text-amber-900'
                      : 'border-line text-slate-600 hover:text-ink'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="card mt-8 flex flex-col gap-3 !border-amber-400/30 !bg-gradient-to-r !from-amber-400/10 !via-amber-400/5 !to-transparent md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-800">
                <Flame size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-800">
                  Chef's special today
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold">{special.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{special.desc}</p>
              </div>
            </div>
            <p className="font-display text-xl font-bold text-amber-800">৳{special.price}</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {menu[tab].map((item) => (
              <article key={item.name} className="card flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display font-semibold">{item.name}</h3>
                    {item.tag && (
                      <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-800">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </div>
                <p className="shrink-0 font-display text-lg font-bold text-amber-800">
                  ৳{item.price}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Guest reviews</p>
              <h2 className="h2 mt-4">What guests say</h2>
              <p className="mt-3 max-w-xl text-slate-600">
                A real build can pull live reviews from Google Maps. These are sample reviews shown
                in the section a restaurant gets on its homepage.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Stars value={5} />
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-ink">4.8 / 5</span> · 254 reviews
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.name} className="card flex flex-col">
                <Quote size={18} className="text-amber-700/70" aria-hidden="true" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {review.text}
                </blockquote>
                <figcaption className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-sm text-slate-600">
                    {review.name} · {review.area}
                  </span>
                  <Stars value={review.rating} />
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">
            Reviews are fictional samples for the demo.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <div className="card">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/10 text-amber-800">
              <Clock3 size={18} aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-display font-semibold">Opening hours</h2>
            <dl className="mt-4 space-y-2 text-sm">
              {[
                ['Mon – Thu', '12:00 – 22:30'],
                ['Friday', '14:00 – 23:00'],
                ['Sat – Sun', '12:00 – 23:00'],
              ].map(([day, hours]) => (
                <div
                  key={day}
                  className="flex justify-between border-b border-line pb-2 last:border-0"
                >
                  <dt className="text-slate-600">{day}</dt>
                  <dd className="text-ink">{hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="card">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/10 text-amber-800">
              <MapPin size={18} aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-display font-semibold">Find us</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              House 12, Road 7, Dhanmondi
              <br />
              Dhaka 1205, Bangladesh
            </p>
            <div className="mt-4 grid h-28 place-items-center rounded-xl border border-line bg-ink/5 text-xs text-slate-500">
              Map placeholder
            </div>
          </div>

          <div className="card">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/10 text-amber-800">
              <UtensilsCrossed size={18} aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-display font-semibold">Private dining</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              The side room seats up to 18 guests for birthdays and small corporate dinners. Advance
              booking is recommended.
            </p>
            <a href="#reserve" className="btn-ghost mt-4 !text-amber-800">
              Ask about the room
            </a>
          </div>
        </div>
      </section>

      <section id="reserve" className="section border-t border-line bg-panel/30">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow !border-amber-400/30 !bg-amber-400/10 !text-amber-800">
              Reservations
            </p>
            <h2 className="h2 mt-4">Book a table</h2>
            <p className="mt-3 max-w-md leading-relaxed text-slate-600">
              This is a demo form. Nothing is stored or sent to a restaurant — it only demonstrates
              the flow a real reservation system would use.
            </p>
            <div className="mt-6">
              <WhatsAppCta
                service="Restaurant website (RestaurantPro demo)"
                label="Ask about a site like this"
              />
            </div>
          </div>

          <div className="card">
            {reserved ? (
              <div role="status">
                <h3 className="font-display text-xl font-semibold text-amber-800">
                  Sample reservation completed
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Nothing was sent or saved. In a real build this step would send a confirmation
                  email or WhatsApp message and add the booking to the restaurant's calendar.
                </p>
                <button className="btn-s mt-5" onClick={() => setReserved(false)}>
                  Try the form again
                </button>
              </div>
            ) : (
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={reserve}>
                <label className="text-sm sm:col-span-2">
                  Name
                  <input required className="inp mt-1.5" placeholder="Your name" />
                </label>
                <label className="text-sm">
                  Phone
                  <input required className="inp mt-1.5" placeholder="01XXXXXXXXX" />
                </label>
                <label className="text-sm">
                  Guests
                  <input
                    required
                    type="number"
                    min={1}
                    max={18}
                    defaultValue={2}
                    className="inp mt-1.5"
                  />
                </label>
                <label className="text-sm">
                  Date
                  <input required type="date" className="inp mt-1.5" />
                </label>
                <label className="text-sm">
                  Time
                  <input required type="time" className="inp mt-1.5" />
                </label>
                <label className="text-sm">
                  Occasion
                  <select className="inp mt-1.5" defaultValue="Casual dinner">
                    <option>Casual dinner</option>
                    <option>Birthday</option>
                    <option>Business dinner</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="text-sm sm:col-span-2">
                  Notes <span className="text-slate-500">(optional)</span>
                  <textarea
                    className="inp mt-1.5 min-h-[5.5rem]"
                    placeholder="Allergies, seating preference, birthday cake…"
                  />
                </label>
                <button className="btn-p mt-2 w-full !bg-amber-400 !text-ink !shadow-none hover:!bg-amber-300 sm:col-span-2">
                  Request reservation
                </button>
                <p className="text-xs text-slate-500 sm:col-span-2">
                  Demo form — submitting does not send your data anywhere.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
