import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'retro-card-list';

  [...block.children].forEach((row) => {
    const cells = [...row.children];

    const li = document.createElement('li');
    li.className = 'retro-card';

    // ✅ Get animation value from 2nd column
    const animationValue = cells[1]?.textContent?.trim();
    if (animationValue) {
      li.setAttribute('data-aos', animationValue);
    }

    const a = document.createElement('a');
    a.href = cells[0].querySelector('a')?.href || '#';
    a.className = 'retro-card__link';
    a.setAttribute('target', '_blank');

    // Move all children of first cell into anchor
    while (cells[0].firstElementChild) {
      a.append(cells[0].firstElementChild);
    }

    // Add image and content classes
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

  // Optimize images
  ul.querySelectorAll('picture > img').forEach((img) =>
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])
    )
  );

  block.textContent = '';
  block.append(ul);
}
