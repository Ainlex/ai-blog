'use client';

import { useState, useRef, useEffect, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { XMarkIcon, ArrowRightIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { sanityClientForPreview } from '@/lib/sanity';
import { AI_TOOLS_QUERY, POPULAR_POSTS_QUERY, MENU_CONFIG_QUERY } from '@/lib/queries';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function useClickOutside(ref: any, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

function useKeyPress(key: string, handler: () => void) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === key) handler();
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [key, handler]);
}

const badgeColors: Record<string, string> = {
  'GRATIS': 'bg-green-600',
  'Prueba gratis': 'bg-green-600',
  'NUEVO': 'bg-blue-600',
  '30% OFF': 'bg-pink-600',
  '20% OFF': 'bg-yellow-500',
  '7 días gratis': 'bg-green-500',
  'Créditos gratis': 'bg-purple-600',
};

const trackAffiliateClick = (toolName: string, category: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'affiliate_click', {
      tool_name: toolName,
      category: category,
      value: 1
    });
  }
};

interface MenuItem {
  label: string;
  icon: string;
  url?: string;
  isExternal?: boolean;
  order: number;
  isActive: boolean;
  hasSubmenu?: boolean;
  subItems?: MenuItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [modalTool, setModalTool] = useState<any>(null);
  const [aiTools, setAiTools] = useState<any[]>([]);
  const [popularPosts, setPopularPosts] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sidebarRef = useRef(null);
  const dataFetchedRef = useRef(false);
  const pathname = usePathname();

  useClickOutside(sidebarRef, onClose);
  useKeyPress('Escape', onClose);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    async function fetchData() {
      if (dataFetchedRef.current) return;
      
      setIsLoading(true);
      try {
        const [tools, posts, menuConfig] = await Promise.all([
          sanityClientForPreview.fetch(AI_TOOLS_QUERY),
          sanityClientForPreview.fetch(POPULAR_POSTS_QUERY),
          sanityClientForPreview.fetch(MENU_CONFIG_QUERY)
        ]);

        console.log('Menu Config:', menuConfig);

        setAiTools(tools || []);
        setPopularPosts(posts || []);
        if (menuConfig?.menuItems) {
          const sortedItems = menuConfig.menuItems
            .filter((item: MenuItem) => item.isActive)
            .sort((a: MenuItem, b: MenuItem) => a.order - b.order);
          
          console.log('Sorted Menu Items:', sortedItems);
          
          // Inicializar el estado de los submenús
          const initialSubmenus: Record<string, boolean> = {};
          sortedItems.forEach((item: MenuItem) => {
            if (item.hasSubmenu) {
              initialSubmenus[item.label] = false;
              console.log(`Submenú encontrado: ${item.label}`, item.subItems);
            }
          });
          setOpenSubmenus(initialSubmenus);
          setMenuItems(sortedItems);
        }
        dataFetchedRef.current = true;
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
        setAiTools([]);
        setPopularPosts([]);
        setMenuItems([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const toolsByCategory = aiTools.reduce((acc: any, tool: any) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  const getAffiliateUrl = (url: string, tool: string, category: string) => {
    const utm = `?utm_source=blog&utm_medium=sidebar&utm_campaign=${encodeURIComponent(tool)}_${encodeURIComponent(category)}`;
    return url + utm;
  };

  const renderIcon = (iconUrl: string | undefined, fallback: JSX.Element) =>
    iconUrl ? (
      <img src={iconUrl} alt="" className="w-5 h-5 object-contain inline-block" loading="lazy" />
    ) : fallback;

  const toggleSubmenu = (itemLabel: string) => {
    console.log('Toggling submenu:', itemLabel);
    setOpenSubmenus(prev => {
      const newState = {
        ...prev,
        [itemLabel]: !prev[itemLabel]
      };
      console.log('New submenu state:', newState);
      return newState;
    });
  };

  return (
    <>
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]" 
          aria-hidden="true" 
          onClick={onClose}
        />
      </Transition>

      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-transform duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-200"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <aside
          ref={sidebarRef}
          className="fixed top-0 left-0 z-50 h-full w-[280px] max-w-full bg-white dark:bg-gray-900 shadow-xl flex flex-col"
          aria-label="Menú lateral"
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100 dark:border-gray-800">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Menú</span>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Cerrar menú"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-3 space-y-0.5">
              {menuItems.map((item) => (
                item.hasSubmenu ? (
                  <div key={`${item.label}-${item.order}`}>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="w-full flex items-center px-3 py-2.5 text-[15px] font-medium rounded-lg transition-colors duration-200 gap-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                      <ArrowRightIcon 
                        className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${openSubmenus[item.label] ? 'rotate-90' : ''}`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        openSubmenus[item.label] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-4 mt-0.5 space-y-0.5">
                        {item.subItems?.map((subItem) => (
                          <Link
                            key={`${subItem.label}-${subItem.order}`}
                            href={subItem.url || '#'}
                            onClick={onClose}
                            className={`flex items-center px-3 py-2 text-[14px] font-medium rounded-lg transition-colors duration-200 gap-2.5
                              ${pathname === subItem.url
                                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                          >
                            <span>{subItem.icon}</span>
                            <span>{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={`${item.label}-${item.order}`}
                    href={item.url || '#'}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    onClick={onClose}
                    className={`flex items-center px-3 py-2.5 text-[15px] font-medium rounded-lg transition-colors duration-200 gap-3
                      ${pathname === item.url
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                )
              ))}
            </div>
          </nav>
        </aside>
      </Transition>

      {/* Modal */}
      {modalTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button 
              className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
              onClick={() => setModalTool(null)} 
              aria-label="Cerrar modal"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              {renderIcon(modalTool.iconUrl, <ArrowRightIcon className="w-6 h-6 text-blue-500" />)}
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{modalTool.name}</h2>
              {modalTool.discount && (
                <span className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-md ${badgeColors[modalTool.discount] || 'bg-blue-600'}`}>
                  {modalTool.discount}
                </span>
              )}
            </div>

            <p className="mb-3 text-gray-600 dark:text-gray-300">{modalTool.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Precio: <span className="font-medium text-gray-900 dark:text-white">{modalTool.price}</span>
            </p>

            <div className="mt-6 flex justify-end">
              <a
                href={getAffiliateUrl(modalTool.affiliateUrl, modalTool.name, modalTool.category)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                onClick={() => {
                  trackAffiliateClick(modalTool.name, modalTool.category);
                  setModalTool(null);
                }}
              >
                Ir a la herramienta
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 