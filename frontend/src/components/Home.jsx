import { Navbar } from "./ui/Navbar"
import { MacbookScroll } from "./ui/Macbook-Hero"
import { TextGenerateEffect } from "./ui/Text-Generate"
import { InfiniteMovingCards } from "./ui/Infinite-Images";
import { ChartBarIcon, ClockIcon, AdjustmentsHorizontalIcon, FingerPrintIcon, MapPinIcon } from '@heroicons/react/24/outline'

import { CheckIcon } from '@heroicons/react/20/solid'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Footer from "./ui/Footer";
import { useState } from "react";

const tiers = [
  {
    name: 'Personal',
    id: 'tier-personal',
    href: '#',
    priceMonthly: '$39',
    description: "The perfect plan if you're just getting started with our product.",
    features: [
      'Blockchain-backed Produce Certification',
      'Real-time Monitoring of Harvests',
      'Monthly Analytics Report',
      'Advanced analytics',
      'Email support',
      'Marketing automations',
    ],
    featured: true,
  },
  {
    name: 'Team',
    id: 'tier-team',
    href: '#',
    priceMonthly: '$99',
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      'Everything in Personal',
      '24/7 Priority Customer Support',
      'Enterprise-level Traceability Solutions',
      'Customizable Smart Contracts',
      'Predictive Insights'],
    featured: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Contact() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto flex flex-col items-center max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-center max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Contact us</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Do you have a team and want to try our product? We'd love to hear from you.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <div>
            <h3 className="border-l border-emerald-600 pl-6 font-semibold text-gray-900">Los Angeles</h3>
            <address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              <p>4556 Brendan Ferry</p>
              <p>Los Angeles, CA 90210</p>
            </address>
          </div>
          <div>
            <h3 className="border-l border-emerald-600 pl-6 font-semibold text-gray-900">New York</h3>
            <address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              <p>886 Walter Street</p>
              <p>New York, NY 12345</p>
            </address>
          </div>
          <div>
            <h3 className="border-l border-emerald-600 pl-6 font-semibold text-gray-900">Toronto</h3>
            <address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              <p>7363 Cynthia Pass</p>
              <p>Toronto, ON N3Y 4H8</p>
            </address>
          </div>
          <div>
            <h3 className="border-l border-emerald-600 pl-6 font-semibold text-gray-900">London</h3>
            <address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              <p>114 Cobble Lane</p>
              <p>London N1 2EF</p>
            </address>
          </div>
        </div>
      </div>
    </div>
  )
}


function CTA() {
  return (
    <div className="bg-white pb-24 sm:pb-32">
      <div className="bg-gradient-to-l from-green-300 to-emerald-400 xl:rounded-3xl mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-32">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Ready to dive in?
          <br />
          Start your free trial today.
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <a
            href="#"
            className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Contact us
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}



function Pricing() {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
        <div
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-lime-400 to-emerald-600 opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 className="text-base font-semibold leading-7 text-emerald-600">Pricing</h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          The right price for you, whoever you are
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        Empowering Farmers Every Step of the Way,
        choose the Plan That Fits Your Farming Needs
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? 'relative bg-white shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
              tier.featured
                ? ''
                : tierIdx === 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                  : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10'
            )}
          >
            <h3 id={tier.id} className="text-base font-semibold leading-7 text-emerald-600">
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
              <span className="text-base text-gray-500">/month</span>
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600">{tier.description}</p>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 sm:mt-10">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon className="h-6 w-5 flex-none text-emerald-600" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? 'bg-emerald-600 text-white shadow hover:bg-emerald-500'
                  : 'text-emerald-600 ring-1 ring-inset ring-emerald-200 hover:ring-emerald-300',
                'mt-8 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:mt-10'
              )}
            >
              Get started today
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}


const features = [
  {
    name: 'Real-Time Visibility',
    description:
      'Track your produce in real-time from the farm to the market. Gain insights into each stage of the supply chain, ensuring transparency and accountability.',
    icon: ClockIcon,
  },
  {
    name: 'User-Friendly Interface',
    description:
      'Our dashboard is designed with farmers in mind. The intuitive and user-friendly interface makes it easy to manage inventory, shipments, and payments effortlessly.',
    icon: AdjustmentsHorizontalIcon,
  },
  {
    name: 'Data-Driven Insights',
    description:
      'Empower your decision-making with data-driven insights. Access information on crop yields, distribution patterns, and pricing strategies to optimize your farming operations',
    icon: ChartBarIcon,
  },
  {
    name: 'Traceability and Assurance',
    description:
      'Build trust in your brand with Vegchain\'s traceability features. Assure your customers of the origin and quality of your produce, enhancing your market presence.',
    icon: MapPinIcon,
  },
]

function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-600">Enhanced Supply Chain Visibility</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Empowering Farmers Through Blockchain Technology
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Experience real-time insights and transparency in your agricultural supply chain. Our platform leverages blockchain technology to bring you unparalleled visibility and control over your produce journey from farm to market.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}


export default function Home() {
  const [navColor, changeNavbarColor] = useState(false);
  const words = `Vegchain is the next generation of supply-chain management. We are building a blockchain-based platform that can be used to manage and monitor supply chain operations.`;

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Github', link: 'https://github.com/marishlucas/vegchain', newTab: true },
    { name: 'Blockchain', link: 'https://hyperledger-fabric.readthedocs.io/en/release-2.5/whatis.html', newTab: true },
  ]

  const testimonials = [
    {
      "quote": "Vegchain has brought transparency to our supply chain like never before. I can track my produce from the farm to the market, ensuring its quality and freshness. This has been a game-changer for our farm!",
      "name": "Alice Green",
      "title": "Farm Owner, Farmington, USA"
    },
    {
      "quote": "As a farmer, Vegchain has simplified my life. The dashboard is user-friendly, and I can easily manage inventory, shipments, and payments. It's a reliable tool for enhancing the efficiency of our farming operations.",
      "name": "Carlos Rodriguez",
      "title": "Agribusiness Manager, Seville, Spain"
    },
    {
      "quote": "Vegchain has empowered us with data-driven insights. I can make informed decisions about crop yields, distribution, and pricing. This platform has been instrumental in the success of our farm.",
      "name": "Priya Patel",
      "title": "Farm Manager, Gujarat, India"
    },
    {
      "quote": "The traceability features of Vegchain are exceptional. I can assure my customers of the origin and quality of our produce, building trust in our brand. It's a powerful tool for farmers looking to establish a strong market presence.",
      "name": "Kenji Tanaka",
      "title": "Crop Quality Assurance, Hokkaido, Japan"
    },
    {
      "quote": "With Vegchain, managing the entire supply chain has become efficient and reliable. From planting to distribution, every step is seamlessly tracked. This has improved the overall productivity and profitability of our farm.",
      "name": "Isabella Costa",
      "title": "Supply Chain Coordinator, Sao Paulo, Brazil"
    },
    {
      "quote": "Vegchain understands the unique challenges of farmers in different regions. The platform's adaptability and support for local farmers make it an invaluable asset. I highly recommend it to fellow farmers.",
      "name": "Moses Kibet",
      "title": "Smallholder Farmer, Nairobi, Kenya"
    }]

  return (
    <>
      <div className="dark:bg-[#0B0B0F] h-fit dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative ">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <Navbar navItems={navItems} navColor={navColor} />
        <div className="overflow-hidden w-full">
          <MacbookScroll
            changeNavbarColor={changeNavbarColor}
            src={`/mock.png`}
            title={
              <span className="">VEGCHAIN</span>
            }
            showGradient={true}
          />
        </div>
      </div>
      <div className="bg-white border-t">
        <TextGenerateEffect
          words={words} />;
      </div>
      <div className="bg-white">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow" />
      </div>
      <div>
        <Features />
      </div>
      <div>
        <Pricing />
      </div>
      <div>
        <CTA />
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}
