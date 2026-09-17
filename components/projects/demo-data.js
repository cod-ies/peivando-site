export const DEMO_SHELL = {
  de: {
    banner: "Konzeptprojekt von Peivando — kein Live-Kunde",
    back: "Alle Projekte",
    langs: "Sprache",
    peivandoCta: "Projekt mit Peivando besprechen",
  },
  en: {
    banner: "Peivando concept project — not a live client",
    back: "All projects",
    langs: "Language",
    peivandoCta: "Talk to Peivando about a project",
  },
  prs: {
    banner: "پروژهٔ مفهومی پیوندو — مشتری زنده نیست",
    back: "همهٔ پروژه‌ها",
    langs: "زبان",
    peivandoCta: "در بارهٔ پروژه با پیوندو گفت‌وگو کنید",
  },
  fa: {
    banner: "پروژهٔ مفهومی پیوندو — مشتری واقعی نیست",
    back: "همه پروژه‌ها",
    langs: "زبان",
    peivandoCta: "درباره پروژه با پیوندو گفت‌وگو کنید",
  },
};

export const DEMOS = {
  "baeckerei-nowzad": {
    theme: "bakery",
    title: {
      de: "Bäckerei Nowzad — Konzeptprojekt",
      en: "Nowzad Bakery — concept project",
      prs: "نانوایی نوزاد — پروژهٔ مفهومی",
      fa: "نانوایی نوزاد — پروژهٔ مفهومی",
    },
    brand: {
      de: "Bäckerei Nowzad",
      en: "Nowzad Bakery",
      prs: "نانوایی نوزاد",
      fa: "نانوایی نوزاد",
    },
    nav: [
      { href: "#range", de: "Sortiment", en: "Range", prs: "محصولات", fa: "محصولات" },
      { href: "#shops", de: "Filialen", en: "Shops", prs: "شعبه‌ها", fa: "شعبه‌ها" },
      { href: "/#contact", de: "Kontakt", en: "Contact", prs: "تماس", fa: "تماس" },
    ],
    hero: {
      kicker: { de: "München", en: "Munich", prs: "مونیخ", fa: "مونیخ" },
      h: {
        de: "Frisches Brot, jeden Morgen um sechs.",
        en: "Fresh bread, every morning at six.",
        prs: "نان تازه، هر صبح ساعت شش.",
        fa: "نان تازه، هر صبح ساعت شش.",
      },
      p: {
        de: "Zwei Filialen in München. Bestellungen für Feiern nehmen wir bis Donnerstag an.",
        en: "Two shops in Munich. Orders for celebrations taken until Thursday.",
        prs: "دو شعبه در مونیخ. سفارش برای مراسم تا روز پنجشنبه پذیرفته می‌شود.",
        fa: "دو شعبه در مونیخ. سفارش جشن‌ها تا پنجشنبه پذیرفته می‌شود.",
      },
      cta: { de: "Jetzt bestellen", en: "Order now", prs: "همین حالا سفارش دهید", fa: "همین حالا سفارش دهید" },
    },
    sections: [
      {
        id: "range",
        title: { de: "Sortiment", en: "Range", prs: "محصولات", fa: "محصولات" },
        kind: "cards",
        items: [
          {
            title: { de: "Sauerteig", en: "Sourdough", prs: "نان خمیرترش", fa: "نان خمیرترش" },
            text: {
              de: "Täglich. Kruste, die knackt.",
              en: "Every day. A crust that cracks.",
              prs: "هر روز. پوسته‌ای که می‌شکند.",
              fa: "هر روز. پوسته‌ای که می‌شکند.",
            },
          },
          {
            title: { de: "Nan & Samoon", en: "Nan & samoon", prs: "نان و سامون", fa: "نان و سامون" },
            text: {
              de: "Frisch, weich, zum Teilen.",
              en: "Fresh, soft, made for sharing.",
              prs: "تازه، نرم، برای تقسیم.",
              fa: "تازه، نرم، برای تقسیم.",
            },
          },
          {
            title: { de: "Für Feiern", en: "For celebrations", prs: "برای جشن‌ها", fa: "برای جشن‌ها" },
            text: {
              de: "Bestellung bis Donnerstag.",
              en: "Order by Thursday.",
              prs: "سفارش تا پنجشنبه.",
              fa: "سفارش تا پنجشنبه.",
            },
          },
        ],
      },
      {
        id: "shops",
        title: { de: "Filialen", en: "Shops", prs: "شعبه‌ها", fa: "شعبه‌ها" },
        kind: "cards",
        items: [
          {
            title: { de: "Innenstadt", en: "City centre", prs: "مرکز شهر", fa: "مرکز شهر" },
            text: {
              de: "Mo–Sa 6:00–18:00 · Musterstandort",
              en: "Mon–Sat 6:00–18:00 · sample location",
              prs: "دوشنبه تا شنبه ۶–۱۸ · موقعیت نمونه",
              fa: "دوشنبه تا شنبه ۶–۱۸ · موقعیت نمونه",
            },
          },
          {
            title: { de: "Neuhausen", en: "Neuhausen", prs: "نوی‌هاوزن", fa: "نوی‌هاوزن" },
            text: {
              de: "Mo–Sa 6:30–18:00 · Musterstandort",
              en: "Mon–Sat 6:30–18:00 · sample location",
              prs: "دوشنبه تا شنبه ۶:۳۰–۱۸ · موقعیت نمونه",
              fa: "دوشنبه تا شنبه ۶:۳۰–۱۸ · موقعیت نمونه",
            },
          },
        ],
      },
    ],
  },

  "afghanisches-restaurant": {
    theme: "restaurant",
    title: {
      de: "Afghanisches Restaurant — Konzeptprojekt",
      en: "Afghan restaurant — concept project",
      prs: "رستوران افغانی — پروژهٔ مفهومی",
      fa: "رستوران افغانستانی — پروژهٔ مفهومی",
    },
    brand: {
      de: "Afghanisches Restaurant",
      en: "Afghan restaurant",
      prs: "رستوران افغانی",
      fa: "رستوران افغانستانی",
    },
    nav: [
      { href: "#menu", de: "Speisekarte", en: "Menu", prs: "منو", fa: "منو" },
      { href: "/#contact", de: "Reservierung", en: "Booking", prs: "رزرو", fa: "رزرو" },
      { href: "#visit", de: "Anfahrt", en: "Directions", prs: "مسیر", fa: "مسیر" },
    ],
    hero: {
      kicker: { de: "Küche aus Kabul · München", en: "Kabul cooking · Munich", prs: "آشپزی کابل · مونیخ", fa: "آشپزی کابل · مونیخ" },
      h: {
        de: "Kabuli Palau, Bolani, Tee — auf Deutsch, Dari und Farsi.",
        en: "Kabuli palau, bolani, tea — in German, Dari and Farsi.",
        prs: "قابلی پلو، بولانی، چای — به آلمانی، دری و فارسی.",
        fa: "قابلی پلو، بولانی، چای — به آلمانی، دری و فارسی.",
      },
      p: {
        de: "Eine Demoseite für Gäste, die in verschiedenen Sprachen bestellen und reservieren. Kein bestehendes Lokal.",
        en: "A demo page for guests who order and book in more than one language. Not an existing restaurant.",
        prs: "صفحهٔ نمونه برای مهمانانی که به چند زبان سفارش و رزرو می‌کنند. رستوران واقعی نیست.",
        fa: "صفحهٔ نمونه برای مهمانانی که به چند زبان سفارش و رزرو می‌کنند. رستوران واقعی نیست.",
      },
      cta: { de: "Tisch anfragen", en: "Request a table", prs: "درخواست میز", fa: "درخواست میز" },
    },
    sections: [
      {
        id: "menu",
        title: { de: "Speisekarte (Auszug)", en: "Menu (excerpt)", prs: "منو (نمونه)", fa: "منو (نمونه)" },
        kind: "cards",
        items: [
          {
            title: { de: "Kabuli Palau", en: "Kabuli palau", prs: "قابلی پلو", fa: "قابلی پلو" },
            text: {
              de: "Reis, Möhren, Rosinen, Lamm — das Festtagsgericht.",
              en: "Rice, carrots, raisins, lamb — the celebration dish.",
              prs: "برنج، زردک، کشمش، گوشت — غذای جشن.",
              fa: "برنج، هویج، کشمش، گوشت — غذای جشن.",
            },
          },
          {
            title: { de: "Mantu", en: "Mantu", prs: "منتو", fa: "منتو" },
            text: {
              de: "Teigtaschen mit Joghurt und Linse.",
              en: "Dumplings with yoghurt and lentils.",
              prs: "کوفتهٔ خمیری با ماست و عدس.",
              fa: "دامپلینگ با ماست و عدس.",
            },
          },
          {
            title: { de: "Bolani", en: "Bolani", prs: "بولانی", fa: "بولانی" },
            text: {
              de: "Gefülltes Fladenbrot, zum Teilen.",
              en: "Stuffed flatbread, made for sharing.",
              prs: "نان پرشده، برای تقسیم.",
              fa: "نان پرشده، برای تقسیم.",
            },
          },
        ],
      },
      {
        id: "visit",
        title: { de: "Besuch", en: "Visit", prs: "آمدن", fa: "بازدید" },
        kind: "cards",
        items: [
          {
            title: { de: "Reservierung", en: "Booking", prs: "رزرو", fa: "رزرو" },
            text: {
              de: "In der Demo führt die Anfrage zu Peivando — nicht zu einem Restaurant-Telefon.",
              en: "In this demo the request goes to Peivando — not a restaurant phone number.",
              prs: "در این نمونه درخواست به پیوندو می‌رود — نه به تیلفون رستوران.",
              fa: "در این نمونه درخواست به پیوندو می‌رود — نه به تلفن رستوران.",
            },
          },
          {
            title: { de: "Anfahrt", en: "Directions", prs: "مسیر", fa: "مسیر" },
            text: {
              de: "Kartenplatzhalter für München. Keine erfundene Straße eines echten Lokals.",
              en: "Map placeholder for Munich. No invented street of a real venue.",
              prs: "جای نقشه برای مونیخ. سرک ساختگی یک محل واقعی نیست.",
              fa: "جای نقشه برای مونیخ. خیابان ساختگی یک محل واقعی نیست.",
            },
          },
        ],
      },
    ],
  },

  "kfz-handel": {
    theme: "cars",
    title: {
      de: "KFZ-Handel — Konzeptprojekt",
      en: "Used car dealer — concept project",
      prs: "فروش موتر — پروژهٔ مفهومی",
      fa: "فروش خودرو — پروژهٔ مفهومی",
    },
    brand: {
      de: "KFZ-Handel",
      en: "Used cars",
      prs: "فروش موتر",
      fa: "فروش خودرو",
    },
    nav: [
      { href: "#stock", de: "Fahrzeuge", en: "Vehicles", prs: "موترها", fa: "خودروها" },
      { href: "/#contact", de: "Anfrage", en: "Enquiry", prs: "درخواست", fa: "درخواست" },
      { href: "/#contact", de: "Kontakt", en: "Contact", prs: "تماس", fa: "تماس" },
    ],
    hero: {
      kicker: { de: "Deutsch & English", en: "German & English", prs: "آلمانی و انگلیسی", fa: "آلمانی و انگلیسی" },
      h: {
        de: "Fahrzeuge klar beschrieben. Anfrage in zwei Sprachen.",
        en: "Vehicles described clearly. Enquire in two languages.",
        prs: "موترها روشن گفته شده. درخواست به دو زبان.",
        fa: "خودروها روشن توضیح داده شده. درخواست به دو زبان.",
      },
      p: {
        de: "Musterfahrzeuge für das Layout — kein Lager eines echten Händlers, keine VIN, keine erfundenen Preise als Angebot.",
        en: "Sample vehicles for the layout — not a real dealer’s stock, no VINs, no invented prices presented as an offer.",
        prs: "موترهای نمونه برای طرح — موجودی یک فروشندهٔ واقعی نیست، بدون شماره شاسی، بدون قیمت ساختگی به‌عنوان پیشنهاد.",
        fa: "خودروهای نمونه برای طرح — موجودی یک فروشنده واقعی نیست، بدون شماره شاسی، بدون قیمت ساختگی به‌عنوان پیشنهاد.",
      },
      cta: { de: "Fahrzeug anfragen", en: "Enquire about a car", prs: "در مورد موتر بپرسید", fa: "درباره خودرو بپرسید" },
    },
    sections: [
      {
        id: "stock",
        title: { de: "Musterfahrzeuge", en: "Sample vehicles", prs: "موترهای نمونه", fa: "خودروهای نمونه" },
        kind: "cards",
        items: [
          {
            title: { de: "Kompakt · Beispiel", en: "Compact · sample", prs: "کوچک · نمونه", fa: "کامپکت · نمونه" },
            text: {
              de: "Stadt, sparsam, eine Anfrage statt Call-Center-Text.",
              en: "City use, modest running costs, one enquiry instead of call-centre copy.",
              prs: "شهر، کم‌مصرف، یک درخواست به‌جای متن مرکز تماس.",
              fa: "شهر، کم‌مصرف، یک درخواست به‌جای متن مرکز تماس.",
            },
          },
          {
            title: { de: "Kombi · Beispiel", en: "Estate · sample", prs: "استیشن · نمونه", fa: "استیشن · نمونه" },
            text: {
              de: "Familie und Werkzeug. Datenblatt-Platz, keine Fake-Bilder.",
              en: "Family and tools. Space for a spec sheet, no fake photos.",
              prs: "خانواده و ابزار. جای مشخصات، بدون عکس جعلی.",
              fa: "خانواده و ابزار. جای مشخصات، بدون عکس جعلی.",
            },
          },
          {
            title: { de: "Transporter · Beispiel", en: "Van · sample", prs: "وانیت · نمونه", fa: "ون · نمونه" },
            text: {
              de: "Für Betriebe, die liefern. Filter und Formular reichen oft.",
              en: "For businesses that deliver. Filters and a form are often enough.",
              prs: "برای کسب‌وکارهایی که می‌رسانند. فیلتر و فورم اغلب کافی است.",
              fa: "برای کسب‌وکارهایی که ارسال می‌کنند. فیلتر و فرم اغلب کافی است.",
            },
          },
        ],
      },
    ],
  },

  "reinigungsunternehmen": {
    theme: "clean",
    title: {
      de: "Reinigungsunternehmen — Konzeptprojekt",
      en: "Cleaning company — concept project",
      prs: "شرکت نظافت — پروژهٔ مفهومی",
      fa: "شرکت نظافت — پروژهٔ مفهومی",
    },
    brand: {
      de: "Reinigungsunternehmen",
      en: "Cleaning company",
      prs: "شرکت نظافت",
      fa: "شرکت نظافت",
    },
    nav: [
      { href: "#services", de: "Leistungen", en: "Services", prs: "خدمات", fa: "خدمات" },
      { href: "#area", de: "Gebiet", en: "Area", prs: "ساحه", fa: "محدوده" },
      { href: "/#contact", de: "Angebot", en: "Quote", prs: "قیمت", fa: "قیمت" },
    ],
    hero: {
      kicker: { de: "Büro · Praxis · Haus", en: "Office · practice · home", prs: "دفتر · کلینیک · خانه", fa: "دفتر · مطب · خانه" },
      h: {
        de: "Saubere Räume. Klare Angebote. Deutsch und Englisch.",
        en: "Clean rooms. Clear quotes. German and English.",
        prs: "اتاق‌های پاک. پیشنهاد روشن. آلمانی و انگلیسی.",
        fa: "فضاهای تمیز. پیشنهاد روشن. آلمانی و انگلیسی.",
      },
      p: {
        de: "Eine Seite, die Leistung und Gebiet nennt und zur Anfrage führt. Kein erfundenes Team, keine Fake-Bewertungen.",
        en: "A page that names the work and the area, then leads to an enquiry. No invented team, no fake reviews.",
        prs: "صفحه‌ای که کار و ساحه را می‌گوید و به درخواست می‌برد. بدون تیم ساختگی، بدون نظر جعلی.",
        fa: "صفحه‌ای که کار و محدوده را می‌گوید و به درخواست می‌برد. بدون تیم ساختگی، بدون نظر جعلی.",
      },
      cta: { de: "Angebot anfragen", en: "Request a quote", prs: "درخواست قیمت", fa: "درخواست قیمت" },
    },
    sections: [
      {
        id: "services",
        title: { de: "Leistungen", en: "Services", prs: "خدمات", fa: "خدمات" },
        kind: "cards",
        items: [
          {
            title: { de: "Büro", en: "Office", prs: "دفتر", fa: "دفتر" },
            text: {
              de: "Unterhaltsreinigung nach Feierabend.",
              en: "Regular cleaning after hours.",
              prs: "نظافت منظم پس از کار.",
              fa: "نظافت منظم پس از کار.",
            },
          },
          {
            title: { de: "Praxis", en: "Practice", prs: "کلینیک", fa: "مطب" },
            text: {
              de: "Wartezimmer und Flächen, die sichtbar sauber sein müssen.",
              en: "Waiting rooms and surfaces that have to look clean.",
              prs: "اتاق انتظار و سطح‌هایی که باید پاک دیده شوند.",
              fa: "اتاق انتظار و سطوحی که باید تمیز دیده شوند.",
            },
          },
          {
            title: { de: "Treppenhaus & Fenster", en: "Stairwell & windows", prs: "راه زینه و کلکین", fa: "راه‌پله و پنجره" },
            text: {
              de: "Turnus nach Vereinbarung.",
              en: "On an agreed schedule.",
              prs: "به برنامهٔ توافق‌شده.",
              fa: "طبق برنامه توافق‌شده.",
            },
          },
        ],
      },
      {
        id: "area",
        title: { de: "Einsatzgebiet", en: "Coverage", prs: "ساحهٔ کار", fa: "محدوده کار" },
        kind: "cards",
        items: [
          {
            title: { de: "Lokal", en: "Local", prs: "محلی", fa: "محلی" },
            text: {
              de: "Stadt und nahes Umland — in der Demo ohne erfundene Ortsteilliste.",
              en: "The city and nearby area — this demo skips an invented district list.",
              prs: "شهر و اطراف نزدیک — در این نمونه فهرست ساختگی محله نیست.",
              fa: "شهر و اطراف نزدیک — در این نمونه فهرست ساختگی محله نیست.",
            },
          },
          {
            title: { de: "Anfrage", en: "Enquiry", prs: "درخواست", fa: "درخواست" },
            text: {
              de: "WhatsApp oder Formular. Die Demo sendet an Peivando.",
              en: "WhatsApp or a form. This demo sends to Peivando.",
              prs: "واتس‌اپ یا فورم. این نمونه به پیوندو می‌فرستد.",
              fa: "واتساپ یا فرم. این نمونه به پیوندو می‌فرستد.",
            },
          },
        ],
      },
    ],
  },
};
