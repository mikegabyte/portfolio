// Wraps each grapheme in a span (Vietnamese diacritics stay intact),
// keeping words in nowrap spans so lines never break mid-word.
export function splitChars(el: HTMLElement): NodeListOf<HTMLElement> {
  const seg =
    'Segmenter' in Intl ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;
  const graphemes = (s: string) => (seg ? [...seg.segment(s)].map((x) => x.segment) : [...s]);
  const walk = (node: Node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const part of (child.textContent ?? '').split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.append(document.createTextNode(' '));
            continue;
          }
          const word = document.createElement('span');
          word.className = 'split-word';
          for (const ch of graphemes(part)) {
            const c = document.createElement('span');
            c.className = 'split-char';
            c.textContent = ch;
            word.append(c);
          }
          frag.append(word);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(el);
  return el.querySelectorAll('.split-char');
}
