# Sprawdzony Ekspert Kredytowy — paczka pod GitHub Pages

Czysta, statyczna strona gotowa do wdrożenia na **GitHub Pages**. Zero build-stepu, zero zależności po stronie serwera.

## Struktura

```
github-pages/
├── index.html                  # cała strona
├── style.css                   # design system + responsywność
├── script.js                   # nawigacja, FAQ, formularz, tabs
├── calc-widget.js              # kalkulator harmonogramu
├── bank-compare-widget.js      # porównywarka 6 banków
├── refi-widget.js              # kalkulator refinansowania
├── assets/                     # logo, zdjęcia zespołu, polityka
├── .nojekyll                   # wyłącza Jekylla na GH Pages
└── README.md                   # ten plik
```

## Wdrożenie krok po kroku

### Wariant A — repozytorium dedykowane

1. Utwórz nowe repozytorium na GitHubie, np. `sprawdzony-ekspert-kredytowy`.
2. Skopiuj zawartość folderu `github-pages/` do repo:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<user>/sprawdzony-ekspert-kredytowy.git
   git push -u origin main
   ```
3. W repo → **Settings** → **Pages** → **Source: Deploy from branch** → **Branch: main / (root)** → **Save**.
4. Po ~1 min strona będzie pod `https://<user>.github.io/sprawdzony-ekspert-kredytowy/`.

### Wariant B — pod własną domeną (`sprawdzonyekspertkredytowy.pl`)

1. Powtórz kroki 1–3 z wariantu A.
2. W folderze projektu dodaj plik `CNAME` z jedną linią: `sprawdzonyekspertkredytowy.pl`
3. W panelu domeny ustaw rekordy DNS:
   - `A` → `185.199.108.153`
   - `A` → `185.199.109.153`
   - `A` → `185.199.110.153`
   - `A` → `185.199.111.153`
   - `CNAME www` → `<user>.github.io`
4. W **Settings → Pages** wpisz domenę w polu **Custom domain**.
5. Zaznacz **Enforce HTTPS** (po ~10 min Let's Encrypt wygeneruje certyfikat).

### Wariant C — `user.github.io` (główna strona użytkownika)

Jeśli chcesz, żeby ta strona była pod adresem `<user>.github.io` (bez sufiksu repo):

1. Repo musi się nazywać dokładnie `<user>.github.io`
2. Push do `main` — strona dostępna natychmiast pod `https://<user>.github.io/`

## Formularz kontaktowy

Działa od razu przez **FormSubmit.co** — wysyła na `kontakt@sprawdzonyekspertkredytowy.pl`.

**Pierwsze uruchomienie:** po pierwszym wysłaniu z prawdziwego adresu, na skrzynkę przyjdzie mail aktywacyjny od FormSubmit. Kliknij link, żeby kolejne zapytania trafiały bezpośrednio do skrzynki.

## Co warto wiedzieć

- **`.nojekyll`** — pusty plik mówiący GitHub Pages, żeby nie próbował przetworzyć strony przez Jekyll. Zostaw go.
- **Fonty Google** (Playfair Display, DM Sans) ładują się z CDN. Jeśli RODO wymaga self-host, pobierz `.woff2` i podmień import w `style.css`.
- **Mapa** w sekcji Kontakt to schematyczna SVG. Jeśli wolisz prawdziwą — zamień `<div class="sek-map">…</div>` na `<iframe>` z Google Maps Embed.
- **Polityka prywatności** w PDF (`assets/polityka-prywatnosci.pdf`). Link otwiera nową kartę.

## Edycja treści

Wszystkie sekcje są w `index.html`. Najczęstsze edycje:

| Co | Gdzie |
|---|---|
| Telefon, e-mail, adres | sekcja Kontakt + nawigacja + footer (szukaj `509 361 982`, `kontakt@`) |
| Liczby na pasku zaufania | `class="sek-trust-grid"` (2 500+, 22, 14, 5.0/5) |
| Opinie klientów | `<article class="sek-review">` w sekcji `#reviews` |
| Zespół (zdjęcia, biogramy, telefony) | sekcja `#team` |
| Treść hero | sekcja `#home`, h1 + lead |
| FAQ | `<div class="sek-faq-item">` w sekcji FAQ |

## Co dalej

- Podpięcie **Google Analytics**: wklej snippet GA4 przed `</head>` w `index.html`
- **Google Maps** zamiast schematycznej mapki: vide wyżej
- **Calendly** zamiast formularza FormSubmit: zamień `<form id="contact-form">…</form>` na wbudowany widget Calendly
- **Blog** / podstrony: utwórz dodatkowe pliki HTML w katalogu głównym (np. `blog.html`, `polityka.html`) — GitHub Pages obsłuży je automatycznie
