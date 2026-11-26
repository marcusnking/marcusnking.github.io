# Personal website

A three-page academic site (home, publications, CV) for GitHub Pages, built
from a single design: warm paper, oxblood ink, Cormorant for text,
JetBrains Mono for metadata, and an inclined-disk "map of content" on the
homepage. GitHub builds it automatically with Jekyll; there is nothing to
compile yourself.

## Publish it

1. Create a repository named **`<username>.github.io`** and push these files
   to its `main` branch. (Any other name works too; see step 3.)
2. In the repository, open **Settings → Pages**, set *Source* to
   *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. Edit `_config.yml`: set `url` to `https://<username>.github.io`. If the
   repository is *not* named `<username>.github.io`, also set
   `baseurl: "/<repository-name>"`.

The site is live at the URL shown on the Pages settings screen a minute or two
after each push.

## Where everything lives

| To change | Edit |
| --- | --- |
| Name, affiliation, email, footer | `_config.yml` → `author:` |
| The ABOUT paragraph | `index.md` (plain Markdown below the front matter) |
| RECOGNITIONS rows | `_data/recognitions.yml` |
| Homepage diagram: links, positions, disk tilt | `_data/moc.yml` |
| LinkedIn / Scholar / ORCID / ADS / arXiv URLs | `_data/links.yml` (used everywhere by key) |
| Header navigation | `_data/nav.yml` |
| Publications | `_data/publications.yml` |
| Pubs page title, profile links, intro note | `pubs.md` |
| CV file | replace `assets/cv/cv.pdf` (same name), set `updated:` in `cv.md` |
| Colours, fonts, overall size, spacing | `assets/css/site.css` → `:root` block at the top |
| Page structure | `_layouts/` (one file per page type) and `_includes/` |

Every data file has comments at the top explaining its fields.

### Publications

Each entry in `_data/publications.yml` takes `title`, `authors`, `venue`,
`year`, and optionally `status`, `note`, `links` and `bibtex`. Entries are
grouped by year, newest first; non-numeric years such as `submitted` or
`in prep` go to the top. Your name (`author.pub_name` in `_config.yml`) is
set in a heavier weight wherever it appears in an author list. Give arXiv ids
in quotes (`arxiv: "2601.01234"`) so YAML keeps them as text.

### The homepage diagram

The diagram is a disk seen at an angle. Each link is a marker standing on the
disk, placed with `r` (0 = centre, 1 = outer ring) and `angle` (degrees
counter-clockwise in the plane of the disk). Rings sit at multiples of 1/6,
and markers look best on a ring. The disk itself is set by `radius`,
`axis_ratio` (b/a: 1 is face-on, smaller is more inclined),
`position_angle`, `rings`, `spokes` and `spoke_offset`. To add a link, add a
node; to remove one, delete it. The defaults reproduce the original artboard
exactly.

### Size and colour

All measurements in `site.css` are artboard pixels multiplied by `--u`.
`--scale: 1` reproduces the 1366 × 768 design pixel for pixel; the default
`1.3` is the same layout enlarged for screen reading, and phones use `1.36`.
Change `--paper`, `--ink` and `--accent` to recolour the site.

## Preview locally (optional)

With Ruby installed:

```sh
bundle install
bundle exec jekyll serve
```

and open <http://localhost:4000>. Data files and pages reload on save;
restart after editing `_config.yml`.

## Notes

- Fonts are self-hosted in `assets/fonts/` (SIL Open Font License), so the
  site makes no requests to Google or other third parties.
- The CV page draws the PDF with PDF.js (`assets/vendor/pdfjs/`, Apache 2.0),
  which is loaded only on that page. Without JavaScript it falls back to the
  browser's own PDF viewer. The page links to the PDF for download either way.
- The email address is shown as `name [at] domain [dot] edu`; the copy button
  next to it puts the real address on the clipboard.
