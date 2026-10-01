Hello, this is my home page :)

## Updating the CV

Replace `files/Mengting_Ai_CV.pdf` with the new PDF and keep the filename unchanged. The public CV URL and every link on the site will continue to work after the update is pushed to `main`.

## NIRVANA project page

The project page is in `projects/nirvana/` and linked from the Projects index.
It is a static HTML/CSS/JavaScript page with no build step or runtime dependencies.
The public path is `/mengtingai/projects/nirvana/` after deployment through the
repository's existing GitHub Pages setup.

- `index.html`: paper overview, method, results, resources, and citation.
- `style.css`: responsive dark/yellow styling with neutral section backgrounds.
- `script.js`: result comparisons, original-figure viewer, and BibTeX copying.
- `assets/`: original figures, official logos, and the conference poster.

The figures are included without changes. Results are transcribed from the
paper's Llama3.1-8B table; sparsity means target pruning sparsity. Both before-
and after-LoRA comparisons are available at 20% and 50%. Logo provenance is in
`projects/nirvana/assets/logo-sources.json`.

When updating the poster, replace `assets/NIRVANA_COLM_2026_Poster.pdf` and its
`assets/poster-preview.png` thumbnail together. Keep the paths unchanged.

The project page also celebrates the band's 2026 MTV Video Vanguard Award,
with a link to the official announcement and a Spotify embed of "Smells Like
Teen Spirit". Playback is user initiated. The poster includes a Website QR
code pointing to the public project-page URL above.
