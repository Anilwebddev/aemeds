import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'retro-card-list';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'retro-card';

    const anchor = row.querySelector('a');
    const href = anchor ? anchor.href : '#';

    const a = document.createElement('a');
    a.href = href;
    a.className = 'retro-card__link';
    a.setAttribute('target', '_blank');

    // Move children into anchor
    while (row.firstElementChild) {
      a.append(row.firstElementChild);
    }

    [...a.children].forEach((div) => {
      if (div.querySelector('picture')) {
        div.className = 'retro-card__image';
      } else {
        div.className = 'retro-card__content';
      }
    });

    li.append(a);
    ul.append(li);
  });

  // Optimize all images
  ul.querySelectorAll('picture > img').forEach((img) =>
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])
    )
  );

  block.textContent = '';
  block.append(ul);
}
