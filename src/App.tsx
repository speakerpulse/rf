import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Map, Activity, Home, Compass, Menu, X } from 'lucide-react';
import TravelMap from './components/TravelMap';

// --- Components ---

const FadeInSection = ({ children, delay = 0, className = '', id }: { children: React.ReactNode, delay?: number, className?: string, id?: string }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const EntryGate = ({ onEnter }: { onEnter: (name: string) => void }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'czesc' || password.toLowerCase() === 'hello') {
      onEnter(name);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-[#F5F4F0]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/50 backdrop-blur-sm p-10 md:p-14 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60"
      >
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-4 text-[#1C1B1A]">
            Krótkie wprowadzenie.
          </h1>
          <p className="text-[#8C8B88] font-light text-lg">
            Przemyślany skrót zamiast small talku.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.2em] text-[#8C8B88] mb-2 font-medium">Twoje imię</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-[#E6E4DD] py-2 text-xl text-[#1C1B1A] focus:outline-none focus:border-[#1C1B1A] transition-colors placeholder:text-[#D5D4D0]"
              placeholder="Jak mam się do Ciebie zwracać?"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-[10px] uppercase tracking-[0.2em] text-[#8C8B88] mb-2 font-medium">Kod dostępu</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className="w-full bg-transparent border-b border-[#E6E4DD] py-2 text-xl text-[#1C1B1A] focus:outline-none focus:border-[#1C1B1A] transition-colors placeholder:text-[#D5D4D0]"
              placeholder="Podpowiedź: czesc"
            />
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-6 left-0 text-[#D9534F] text-sm">
                Nieprawidłowy kod dostępu.
              </motion.p>
            )}
          </div>
          <div className="pt-8">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-[#1C1B1A] text-white py-4 rounded-xl hover:bg-[#333230] transition-all duration-300 text-lg font-light hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Wejdź</span>
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const Chapter = ({ title, children, id }: { title: string, children: React.ReactNode, id?: string }) => (
  <FadeInSection id={id} className="py-20 md:py-28 border-t border-[#E6E4DD] first:border-0 relative">
    <h2 className="font-serif text-4xl md:text-5xl text-[#1C1B1A] mb-10 font-light tracking-tight">{title}</h2>
    <div className="text-[#595854] font-light leading-[1.8] text-lg md:text-xl space-y-8">
      {children}
    </div>
  </FadeInSection>
);

const SubSection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
  <div className="mt-16 pt-12">
    <div className="flex items-center gap-4 mb-8">
      <div className="text-[#8C8B88]">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h3 className="font-serif text-2xl md:text-3xl text-[#1C1B1A] font-light">{title}</h3>
    </div>
    <div className="text-[#595854] font-light leading-[1.8] text-lg md:text-xl space-y-8">
      {children}
    </div>
  </div>
);

const TagList = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-3 my-10">
    {tags.map((tag, i) => (
      <span key={i} className="px-5 py-2 border border-[#E6E4DD] bg-white/50 rounded-full text-sm tracking-wide text-[#595854] shadow-sm">
        {tag}
      </span>
    ))}
  </div>
);

const Guide = ({ name }: { name: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'O mnie', href: '#o-mnie' },
    { label: 'Ludzie i relacje', href: '#relacje' },
    { label: 'Wspólny czas', href: '#czas' },
    { label: 'Aktualnie', href: '#aktualnie' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F5F4F0] pb-32 selection:bg-[#E6E4DD] selection:text-[#1C1B1A]">
      {/* Navigation Burger */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-md border border-[#E6E4DD] rounded-full text-[#1C1B1A] shadow-sm hover:shadow-md transition-all duration-300"
          aria-label="Menu"
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} strokeWidth={1.5} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} strokeWidth={1.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#F5F4F0]/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <nav className="text-center">
              <ul className="space-y-8">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="font-serif text-4xl md:text-5xl text-[#1C1B1A] font-light hover:opacity-50 transition-opacity duration-300"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header / Introduction */}
      <header className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-[#1C1B1A] mb-12">
            Cześć!<br />
          </h1>
          <div className="space-y-8 text-[#595854] font-light leading-[1.8] text-xl md:text-2xl">
            <p>
              Ten sposób przedstawienia się może wydawać się trochę nietypowy, ale wynika z jednej prostej rzeczy - nie jestem zbyt dobry w small talku, szczególnie na samym początku.
            </p>
            <p>
              Jestem introwertykiem i potrzebuję trochę czasu, żeby się otworzyć. Dlatego pomyślałem, że taka strona może być dobrym rozwiązaniem. Możesz mnie tutaj poznać trochę szybciej i bardziej konkretnie.
            </p>
            <p>
              Jeśli uznasz, że brzmi to ciekawie, byłoby fajnie dalej porozmawiać. Jeśli to nie twoja bajka - wszystko w porządku.
            </p>
          </div>
        </motion.div>
      </header>

      <main className="px-6 max-w-3xl mx-auto">
        
        <Chapter id="o-mnie" title="O mnie">
          <p>
            Jestem raczej spokojnym człowiekiem. Dużo obserwuję i często długo przemyślam różne sprawy, zanim coś powiem albo zdecyduję.
          </p>
          <p>
            Z natury jestem osobą praktyczną i refleksyjną. Zwykle staram się rozpatrzyć różne warianty, spojrzeć na sytuację z kilku stron i zrozumieć emocje - swoje i innych, przy czym częściej innych niż swoje, nad czym też pracuję. Czasami zajmuje mi to więcej czasu niż innym ludziom, ale dzięki temu wydaje mi się, że podejmuję decyzje bardziej świadomie.
          </p>
          <p>
            Od zawsze miałem bardzo szerokie zainteresowania. Dzięki temu potrafię rozmawiać i robić wiele różnych rzeczy, a rozmowy, które coś wnoszą, sprawiają mi dużą przyjemność. Dlatego raczej będziemy mieli o czym pogadać.
          </p>
          <p>
            Lubię, kiedy większość rzeczy jest dosyć prosta i prawdziwa - bez udawania i bez gierek. Wiem też, że z czasem relacje mogą stawać się bardziej skomplikowane, kiedy pojawiają się obowiązki, problemy i różne życiowe sytuacje. Dlatego zależy mi, żeby zaczynać znajomość od razu w sposób otwarty i szczery.
          </p>
          <p>
            Wolę też od razu mieć jedną rzecz z głowy, bo wydaje mi się, że dla niektórych może to być bardzo istotne. Jestem w połowie Polakiem, w połowie Rosjaninem - urodziłem się w Moskwie, ale do Polski przyjechałem w wieku 5 lat. Czuję się zdecydowanie bardziej związany z Polską.
          </p>
          <p>
            Czuję też, że lepiej to powiedzieć niż zostawić w powietrzu - jestem absolutnie przeciwny wojnie wywołanej przez Rosję, która toczy się w Ukrainie. Jest mi bardzo przykro, że tak się stało i przepraszam za to co się stało, co się dzieje i co niestety pewnie wkrótce się nie zakończy.
          </p>
        </Chapter>

        <Chapter id="relacje" title="Ludzie i relacje">
          <p>
            Na co dzień jestem raczej cichy i dużo myślę. Kiedy już dojdę do jakiejś wykrystalizowanej myśli, raczej wypowiadam się dosyć jasno i tego nie skrywam.
          </p>
          <p>
            Cenię ludzi, z którymi można ciekawie porozmawiać i spędzić wartościowo czas - takich, przy których ma się ochotę coś robić i gdzie pojawia się naturalne zaangażowanie.
          </p>
          <p>
            Rozumiem też, że z czasem takie zaangażowanie może słabnąć, dlatego ważne jest dla mnie, żeby było podtrzymywane przez obie strony i żeby relacja była czymś, nad czym po prostu razem się pracuje.
          </p>
          <p>
            Nie chodzi o to, żeby ktoś był taki sam jak ja albo lubił dokładnie to samo. Życie pokazuje, że czasem właśnie osoby z zupełnie innej bajki okazują się tymi, z którymi czujemy się najlepiej i dzięki którym odkrywamy nowe rzeczy.
          </p>
        </Chapter>

        <Chapter id="czas" title="Wspólny czas">
          <p>
            Czas spędzany razem to dla mnie fundament poznawania się i bycia razem. Poniżej kilka obszarów, które pokazują w skrócie, jak lubię spędzać czas.
          </p>

          <SubSection icon={Map} title="Podróże">
            <p>
              Podróżowanie to dla mnie bardzo ważny temat. Lubię mieć ogólny plan w głowie, ale na miejscu zostawiać sobie przestrzeń na spontaniczne decyzje, odkrywanie nowych i zaskakujących miejsc.
            </p>
            <p>
              Idealna podróż to dolecieć gdzieś samolotem, wynająć samochód i po prostu zwiedzać i poznawać miejsca we własnym tempie - wszędzie tam, gdzie ma się ochotę pojechać.
            </p>
            <p>
              Oprócz tego lubię spontaniczne lub zaplanowane, krótsze wyjazdy - takie z pomysłem z dnia na dzień, czy to w góry, czy do innego miasta, czy na rower do jakiegoś ciekawego miejsca.
            </p>
            <TravelMap />

            <div className="mt-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="text-[#8C8B88]">
                  <Compass size={24} strokeWidth={1.5} />
                </div>
                <h4 className="font-serif text-2xl md:text-3xl text-[#1C1B1A] font-light">Plany i marzenia</h4>
              </div>
              <p className="text-[#595854] font-light text-lg md:text-xl leading-[1.8] mb-8">
                Jako mały snippet kilku pomysłów podróżniczych, które w bliższej i dalszej przyszłości bardzo chciałbym zrealizować:
              </p>

              <div className="space-y-6">
                {/* Japonia */}
                <div className="group relative bg-white/60 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-[#E6E4DD] shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1C1B1A] opacity-20 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h5 className="font-serif text-2xl md:text-3xl text-[#1C1B1A]">Japonia</h5>
                    <span className="inline-flex items-center justify-center px-4 py-1.5 bg-[#1C1B1A] text-white text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase rounded-full">Największe marzenie</span>
                  </div>
                  <div className="text-[#595854] font-light text-lg leading-[1.8] space-y-4">
                    <p>Przejechać kraj pociągami od Hokkaido do Kyushu, a w idealnym scenariuszu - spędzić tam nawet miesiąc, podróżując autem i odkrywając miejsca po swojemu.</p>
                    <p>Do tego czasu muszę jednak już znaleźć "specjalną wyjątkową osobę", ponieważ będzie to wyjątkowe i niezapomniane przeżycie.</p>
                  </div>
                </div>

                {/* Chiny */}
                <div className="group relative bg-white/60 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-[#E6E4DD] shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#8C8B88] opacity-20 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h5 className="font-serif text-2xl md:text-3xl text-[#1C1B1A]">Chiny</h5>
                    <span className="inline-flex items-center justify-center px-4 py-1.5 bg-[#E6E4DD] text-[#595854] text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase rounded-full">Takie bardziej na chillu</span>
                  </div>
                  <div className="text-[#595854] font-light text-lg leading-[1.8] space-y-4">
                    <p>Około trzech tygodni podróży pociągami przez różne regiony kraju.</p>
                    <p>Najpierw południe - Hongkong, Guangzhou i przyroda, potem środkowe Chiny - Nankin i Szanghaj, a na koniec północ - Pekin, przyroda, (Harbin?).</p>
                  </div>
                </div>

                {/* Włochy */}
                <div className="group relative bg-white/60 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-[#E6E4DD] shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C5C9C0] opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h5 className="font-serif text-2xl md:text-3xl text-[#1C1B1A]">Włochy</h5>
                    <span className="inline-flex items-center justify-center px-4 py-1.5 bg-[#E6E4DD] text-[#595854] text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase rounded-full">Z tych bliższych</span>
                  </div>
                  <div className="text-[#595854] font-light text-lg leading-[1.8] space-y-4">
                    <p>Toskania autem, dużo zwiedzania, dużo jedzenia, małe miasteczka, do tego Rzym i oczywiście miasto gdzie czeka na nas pizza.</p>
                  </div>
                </div>
              </div>
            </div>
          </SubSection>

          <SubSection icon={Activity} title="Sport">
            <p>
              Wcześniej zajmowałem się sportem intensywnie i nie ograniczałem się do jednego czy dwóch. Przez długi czas wiele z nich odłożyłem na bok, ale teraz coraz częściej do nich wracam myślami i wracam/planuję powrót w tym roku.
            </p>
            <TagList tags={['rower', 'bieganie', 'koszykówka', 'piłka nożna', 'siłownia', 'narty', 'rolki', 'łyżwy', 'siatkówka', 'pływanie']} />
            <p>
              Mam też takie poczucie, że wiele z tych aktywności jest po prostu przyjemniejszych, kiedy można je robić z drugą osobą. To nie jest warunek, ale gdzieś z tyłu głowy mam taką potrzebę, żeby móc dzielić takie rzeczy z kimś.
            </p>
            <p>
              Ostatnie kilka lat sprawiło też, że polubiłem chodzić po górach. Coraz częściej czuję potrzebę, żeby po prostu pojechać w góry i wyjść na szlak.
            </p>
          </SubSection>

          <SubSection icon={Home} title="Domowe sprawy">
            <p>
              Po prostu lubię spokojne, codzienne rzeczy - oglądać filmy i seriale, czytać książki, pograć w planszówki, spędzać spokojne wieczory. Wspólne gotowanie czy sprzątanie to też dla mnie wartościowy czas spędzony razem :)
            </p>
            <p>
              Gotować lubię, jednak uprzedzam, nie jestem mistrzem kuchni. Sprzątać sprzątam i lubię, kiedy jest porządek, chociaż pewnie osoby bardziej pedantyczne zauważą niedoskonałości. Zdecydowanie jednak nie jestem bałaganiarzem.
            </p>
          </SubSection>
        </Chapter>

        <Chapter id="aktualnie" title="Aktualnie">
          <p>
            Nie będę wchodzić tutaj w bardzo prywatne szczegóły :) Mogę powiedzieć tyle, że od około roku zacząłem stopniowo wprowadzać w swoim życiu różne zmiany. Teraz robię to bardziej świadomie i intensywnie.
          </p>
          <p>
            Przez ostatnie 10 lat w dużej mierze zajmowałem się rozwiązywaniem różnych problemów i codziennych spraw w rodzinnej firmie. To praca, która nauczyła mnie odpowiedzialności, samodzielności i radzenia sobie w wielu kryzysowych sytuacjach. W ostatnim roku zacząłem jednak coraz poważniej zastanawiać się nad tym, co dalej chciałbym robić zawodowo i w jakim miejscu chciałbym żyć.
          </p>
          <p>
            To popchnęło mnie do szukania nowej pracy z dosyć otwartą głową, niezależnie od tego, czy będzie zdalna, czy stacjonarna. Zależy mi na tym aby dalej móc się rozwijać. Docelowo widzę siebie raczej w większym mieście, a być może za granicą. Nie chodzi o ucieczkę, tylko o poczucie, że chcę budować swoją przyszłość w miejscu, które daje więcej możliwości - zarówno zawodowych, jak i życiowych. Jeśli poszczęści mi się znaleźć tą jedyną, jakkolwiek by to nie wyglądało, czy z marzeniami o dzieciach czy bez, chciałbym aby przyszłość była w bardziej perspektywicznym miejscu niż Bielsko-Biała. Ale kto wie co się stanie, może i Bielsko nie będzie takie złe z właściwą osobą :)
          </p>
        </Chapter>

        {/* Final Decision Section */}
        <FadeInSection className="pt-24 md:pt-32 mt-20 border-t border-[#E6E4DD]">
          <div className="text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-10 text-[#1C1B1A]">
              To tyle o mnie na start :)
            </h2>
            <div className="text-[#595854] font-light leading-[1.8] text-lg md:text-xl space-y-6 max-w-2xl mx-auto">
              <p>
                Jeśli po przeczytaniu wszystkiego czujesz, że mamy o czym rozmawiać, coś zaciekawiło, coś zdenerwowało, coś obraziło, coś było niejasne - zapraszam Cię z powrotem do wiadomości.
              </p>
              <p>
                A jeśli nie do końca Ci się to spodobało, dziękuję za poświęcony czas.
              </p>
            </div>
          </div>
        </FadeInSection>

      </main>
    </div>
  );
};

export default function App() {
  // Temporarily bypassing the login gate for development as requested previously.
  // Change `isAuthenticated` to `false` to re-enable the entry gate.
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [visitorName, setVisitorName] = useState('Gość');

  const handleEnter = (name: string) => {
    setVisitorName(name);
    setIsAuthenticated(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated ? (
        <motion.div
          key="gate"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <EntryGate onEnter={handleEnter} />
        </motion.div>
      ) : (
        <motion.div
          key="guide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Guide name={visitorName} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
