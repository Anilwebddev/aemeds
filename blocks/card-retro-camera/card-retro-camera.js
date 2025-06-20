import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'retro-card-list';

  const section = block.closest('.section');

  // ✅ Check metadata applied by AEM
const animationMeta = section?.dataset?.animation;

if (animationMeta) {
  section.setAttribute('data-aos', animationMeta); // ✅ Apply AOS
}


  [...block.children].forEach((row) => {
    const cells = [...row.children];

    const li = document.createElement('li');
    li.className = 'retro-card';

    // ✅ Card-level animation from 3rd column (if available)
    const animationValue = cells[2]?.textContent?.trim();
    if (animationValue) {
      li.setAttribute('data-aos', animationValue);
    }

    // Anchor from first cell
    const anchor = cells[0].querySelector('a');
    const a = document.createElement('a');
    a.href = anchor?.href || '#';
    a.className = 'retro-card__link';
    a.setAttribute('target', '_blank');

    // Build image div from 1st cell
    if (cells[0]) {
      const imageDiv = document.createElement('div');
      imageDiv.className = 'retro-card__image';
      while (cells[0].firstElementChild) {
        imageDiv.append(cells[0].firstElementChild);
      }
      a.append(imageDiv);
    }

    // Build content div from 2nd cell
    if (cells[1]) {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'retro-card__content';
      while (cells[1].firstElementChild) {
        contentDiv.append(cells[1].firstElementChild);
      }

      if (!contentDiv.hasChildNodes() && cells[1].textContent.trim()) {
        contentDiv.textContent = cells[1].textContent.trim();
      }

      a.append(contentDiv);
    }

    li.append(a);
    ul.append(li);
  });

  // ✅ Optimize images
  ul.querySelectorAll('picture > img').forEach((img) =>
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])
    )
  );

  block.textContent = '';
  block.append(ul);
}
