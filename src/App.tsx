import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Pricing = lazy(() => import('./pages/Pricing'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const ShopDemo = lazy(() => import('./pages/ShopDemo'))
const RestaurantDemo = lazy(() => import('./pages/RestaurantDemo'))
const BizTrackDemo = lazy(() => import('./pages/BizTrackDemo'))
const BotDemo = lazy(() => import('./pages/BotDemo'))
const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="demo/shopstarter" element={<ShopDemo />} />
        <Route path="demo/restaurantpro" element={<RestaurantDemo />} />
        <Route path="demo/biztrack" element={<BizTrackDemo />} />
        <Route path="demo/bots" element={<BotDemo />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
