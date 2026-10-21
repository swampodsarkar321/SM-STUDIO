import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Bot, Check, Send, Sparkles, Trash2 } from 'lucide-react'
import Seo from '../components/Seo'
import WhatsAppCta from '../components/WhatsAppCta'

type PlatformId = 'telegram' | 'messenger' | 'discord'

type Message = { id: number; from: 'user' | 'bot'; text: string; time: string }

const timeStamp = () =>
  new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

type Style = {
  body: string
  head: string
  user: string
  bot: string
  input: string
}

const platformList: {
  id: PlatformId
  label: string
  hint: string
  style: Style
}[] = [
  {
    id: 'telegram',
    label: 'Telegram',
    hint: 'Telegram bot · @shopbuddy_demo',
    style: {
      body: 'bg-[#0e1621]',
      head: 'bg-[#17212b]',
      user: 'bg-[#2b5278]',
      bot: 'bg-[#182533]',
      input: 'bg-[#17212b]',
    },
  },
  {
    id: 'messenger',
    label: 'Messenger',
    hint: 'Facebook page inbox · demo build',
    style: {
      body: 'bg-[#18191a]',
      head: 'bg-[#242526]',
      user: 'bg-[#0084ff]',
      bot: 'bg-[#3a3b3c]',
      input: 'bg-[#242526]',
    },
  },
  {
    id: 'discord',
    label: 'Discord',
    hint: 'Discord server · #shop-support',
    style: {
      body: 'bg-[#313338]',
      head: 'bg-[#2b2d31]',
      user: 'bg-[#5865f2]',
      bot: 'bg-[#383a40]',
      input: 'bg-[#383a40]',
    },
  },
]

const welcome: Record<PlatformId, string> = {
  telegram:
    'Hi! ShopBuddy is connected on Telegram. Ask about an order, price list or opening hours — or tap a quick reply below.',
  messenger:
    'Hello! ShopBuddy is answering this Facebook page inbox. Try sending: order, price list or opening hours.',
  discord:
    'ShopBuddy is live in #shop-support. Mention an order, price or hours and it replies automatically.',
}

const quickReplies = ['Order status', 'Price list', 'Opening hours', 'Talk to human']
const commands = ['/start', '/order', '/help']

function botReply(raw: string): string {
  const text = raw.toLowerCase()
  if (text.includes('order'))
    return 'Your order #2041 was handed to the courier today. Estimated delivery: tomorrow evening. (Sample reply)'
  if (text.includes('price') || text.includes('rate'))
    return 'Current price list (sample): Panjabi ৳1,800 · Wallet ৳650 · Mug ৳300. Delivery inside Dhaka ৳60.'
  if (text.includes('hour') || text.includes('open') || text.includes('time'))
    return 'Our store is open 12:00–22:30 every day, and 14:00–23:00 on Fridays. (Sample data)'
  if (text.includes('human') || text.includes('agent'))
    return 'Understood — marking this conversation for a human reply. A team member will continue shortly. (Demo handoff)'
  if (text.startsWith('/start'))
    return 'Welcome! I can help with order status, price list, opening hours or reaching a human. What do you need?'
  if (text.startsWith('/help') || text.includes('help'))
    return 'Available topics: order · price · hours · human. Type any keyword or tap a quick reply below.'
  if (text.startsWith('/'))
    return 'Unknown command. This demo bot supports /start, /order and /help.'
  if (text.includes('hi') || text.includes('hello') || text.includes('assalam'))
    return 'Hello! Ask me about an order, our price list or opening hours — or tap a quick reply below.'
  return "I'm a demo auto-reply bot, so I only recognise a few keywords: order, price, hours, human."
}

export default function BotDemo() {
  const [platform, setPlatform] = useState<PlatformId>('telegram')
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'bot', text: welcome.telegram, time: timeStamp() },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const timer = useRef<number | null>(null)
  const scroller = useRef<HTMLDivElement | null>(null)

  const current = platformList.find((item) => item.id === platform) ?? platformList[0]

  function switchPlatform(next: PlatformId) {
    if (next === platform) return
    if (timer.current) window.clearTimeout(timer.current)
    setTyping(false)
    setInput('')
    setPlatform(next)
    setMessages([{ id: Date.now(), from: 'bot', text: welcome[next], time: timeStamp() }])
  }

  function clearChat() {
    if (timer.current) window.clearTimeout(timer.current)
    setTyping(false)
    setInput('')
    setMessages([{ id: Date.now(), from: 'bot', text: welcome[platform], time: timeStamp() }])
  }

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || typing) return
    setMessages((list) => [
      ...list,
      { id: Date.now(), from: 'user', text: trimmed, time: timeStamp() },
    ])
    setInput('')
    setTyping(true)
    timer.current = window.setTimeout(() => {
      setMessages((list) => [
        ...list,
        { id: Date.now(), from: 'bot', text: botReply(trimmed), time: timeStamp() },
      ])
      setTyping(false)
    }, 850)
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    send(input)
  }

  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  return (
    <>
      <Seo
        title="Chatbot Demo — Telegram, Messenger & Discord Auto-Replies"
        desc="Try a working chatbot demo with keyword auto-replies styled for Telegram, Facebook Messenger and Discord — how automation answers customers 24/7."
        path="/demo/bots"
      />

      <div className="border-b border-violet-400/20 bg-violet-400/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-3 text-xs text-violet-800">
          <p>Demo only. The bot replies from your browser — no real bot server is connected.</p>
          <Link className="underline underline-offset-2" to="/portfolio">
            Back to portfolio
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative grid gap-10 py-12 md:grid-cols-2 md:items-center md:py-16">
          <div>
            <p className="eyebrow !border-violet-400/30 !bg-violet-400/10 !text-violet-800">
              <Sparkles size={13} aria-hidden="true" />
              Chatbot demo
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold md:text-5xl">
              Bot<span className="text-gradient">Lab</span>
            </h1>
            <p className="mt-4 max-w-lg leading-relaxed text-slate-600">
              One conversation UI styled as a Telegram bot, Facebook Messenger inbox and Discord
              bot. Send a message and the demo bot answers instantly — exactly how an ordered
              auto-reply flow feels before we wire it to a real bot server.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500">
              {[
                '3 platforms',
                'Keyword auto-replies',
                'Quick replies & commands',
                'Runs in the browser',
              ].map((item) => (
                <span key={item} className="rounded-full border border-line bg-ink/5 px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl border border-line bg-panel/70 p-5 shadow-card"
            aria-hidden="true"
          >
            <div className="space-y-2.5">
              <div className="flex justify-start">
                <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-ink/5 px-3.5 py-2.5 text-sm text-slate-600">
                  Where is my order? It has been two days.
                </p>
              </div>
              <div className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-md bg-violet-500/20 px-3.5 py-2.5 text-sm text-violet-900">
                  Order #2041 shipped today — delivery tomorrow evening.
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl bg-violet-500/15 px-3.5 py-3 w-fit">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-700"
                    style={{ animationDelay: `${dot * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-wider text-slate-600">
              Sample conversation
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-6 lg:grid-cols-5">
          <div className="card flex flex-col !p-0 lg:col-span-3">
            <div
              className="flex flex-wrap gap-1.5 border-b border-line px-4 py-3"
              role="tablist"
              aria-label="Bot platform"
            >
              {platformList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={platform === item.id}
                  onClick={() => switchPlatform(item.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                    platform === item.id
                      ? 'border-violet-400/50 bg-violet-500/10 text-violet-700'
                      : 'border-line text-slate-600 hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className={`flex flex-col ${current.style.head} h-[30rem]`}>
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-violet-400/30 text-violet-200">
                    <Bot size={17} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-semibold text-white">
                      ShopBuddy
                    </p>
                    <p className="truncate text-[10px] text-white/50">{current.hint}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
                    Online
                  </span>
                  <button
                    type="button"
                    onClick={() => clearChat()}
                    aria-label="Clear conversation"
                    title="Clear conversation"
                    className="grid h-8 w-8 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div
                ref={scroller}
                className={`${current.style.body} flex-1 space-y-3 overflow-y-auto px-4 py-4`}
                role="log"
                aria-live="polite"
                aria-label="Chat conversation"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed text-white ${
                        message.from === 'user'
                          ? `${current.style.user} rounded-br-md`
                          : `${current.style.bot} rounded-bl-md border border-white/5`
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className="mt-1 text-right text-[9px] text-white/40">{message.time}</p>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start" aria-label="Bot is typing">
                    <div
                      className={`flex items-center gap-1.5 rounded-2xl rounded-bl-md px-3.5 py-3 ${current.style.bot}`}
                    >
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60"
                          style={{ animationDelay: `${dot * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-4 py-2.5">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => send(reply)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    {reply}
                  </button>
                ))}
                {commands.map((command) => (
                  <button
                    key={command}
                    type="button"
                    onClick={() => send(command)}
                    className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1.5 font-mono text-[11px] text-violet-200 transition hover:bg-violet-500/25"
                  >
                    {command}
                  </button>
                ))}
              </div>

              <form
                onSubmit={submit}
                className={`flex items-center gap-2 border-t border-white/10 px-3 py-3 ${current.style.input}`}
              >
                <label className="flex-1">
                  <span className="sr-only">Message</span>
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    aria-label="Message"
                    placeholder="Type a message…"
                    className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-violet-400/50 focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  aria-label="Send message"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-violet-500/30 text-violet-200 transition hover:bg-violet-500/50"
                >
                  <Send size={16} aria-hidden="true" />
                </button>
              </form>
            </div>

            <p className="px-4 py-3 text-center text-xs text-slate-500">
              Demo chat — replies are generated locally in your browser. No message is stored or
              sent to a bot server.
            </p>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="card">
              <h2 className="font-display font-semibold">Where a real bot connects</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                {[
                  'Telegram Bot API — commands and inline keyboards',
                  'Facebook Messenger — page inbox auto-replies',
                  'Discord — server bots for support channels',
                  'Same reply flows on every platform',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-violet-700"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h2 className="font-display font-semibold">Sample bot analytics</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ['92%', 'Auto-reply rate'],
                  ['3s', 'Avg reply time'],
                  ['1,240', 'Conversations'],
                  ['24/7', 'Coverage'],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-line bg-slate-50 p-3 text-center"
                  >
                    <p className="font-display text-xl font-bold text-violet-800">{value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Fictional numbers to show what a real bot dashboard reports.
              </p>
            </div>

            <WhatsAppCta
              service="Chatbot & automation (BotLab demo)"
              label="Ask about a bot like this"
            />
          </div>
        </div>
      </section>
    </>
  )
}
