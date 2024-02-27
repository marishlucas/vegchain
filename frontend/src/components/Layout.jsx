import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}


const userNavigation = [
  { name: 'Sign out' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Layout = ({ children, setUser }) => {
  let navigate = useNavigate();
  function logout() {
    localStorage.clear();
    setUser(null);
    navigate('/');
  }


  let [navigation, setNavigation] = useState([
    { name: 'Transactions', href: '/dashboard', current: location.pathname === '/dashboard' },
    { name: 'Batch', href: '/dashboard/batch', current: location.pathname === '/dashboard/batch' },
  ]);

  const handleNavigationClick = (index) => {
    let updatedNavigation = navigation.map((item, i) => ({
      ...item,
      current: i === index,
    }));

    setNavigation(updatedNavigation);

    navigate(updatedNavigation[index].href);
  };


  return (
    <>
      <div className="min-h-full">
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 pb-32">
          <Disclosure as="nav" className="border-b border-green-100 border-opacity-25 bg-gradient-to-r from-green-400 to-emerald-500 lg:border-none">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-screen-2xl px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-green-100 lg:border-opacity-25">
                    <div className="flex items-center px-2 lg:px-0">
                      <div className="hidden lg:block">
                        <div className="flex space-x-4">
                          {navigation.map((item, index) => (
                            <button
                              key={item.name}
                              onClick={() => handleNavigationClick(index)}
                              className={classNames(
                                item.current
                                  ? 'bg-green-400 bg-opacity-75 hover:bg-opacity-100 text-white'
                                  : 'text-white hover:bg-green-500 hover:bg-opacity-75',
                                'rounded-md py-2 px-3 text-sm font-medium transition'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex lg:hidden">
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-emerald-400 p-2 text-green-200 hover:bg-emerald-400 bg-opacity-75 hover:bg-opacity-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="hidden lg:ml-4 lg:block">
                      <div className="flex items-center">
                        <Menu as="div" className="relative ml-3 flex-shrink-0">
                          <div>
                            <Menu.Button className="relative flex rounded-full bg-green-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => logout()}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'text-sm text-gray-700',
                                      'w-full text-left block px-4 py-2'
                                    )}
                                  >
                                    Sign out
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white'
                            : 'text-white',
                          'block rounded-md py-2 px-3 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-green-100 border-opacity-25 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">{user.name}</div>
                        <div className="text-sm font-medium text-green-300">{user.email}</div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-emerald-500 hover:bg-opacity-75"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-screen-2xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Layout;
