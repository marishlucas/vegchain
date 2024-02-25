import { Navbar } from "./ui/Navbar"
import { MacbookScroll } from "./ui/Macbook-Hero"

export default function Home() {
  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Github', link: 'https://github.com/marishlucas/vegchain', newTab: true },
    { name: 'Blockchain', link: 'https://hyperledger-fabric.readthedocs.io/en/release-2.5/whatis.html', newTab: true },
  ]
  return (
    <div className="dark:bg-[#0B0B0F] h-fit dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Navbar navItems={navItems} />
      <div className="overflow-hidden w-full">
        <MacbookScroll
          src={`/mock.png`}
          title={
            <span className="">VEGCHAIN</span>
          }
          showGradient={false}
        />
      </div>
    </div>
  )
}
