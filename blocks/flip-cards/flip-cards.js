import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const section = block.closest('.section');

  // ✅ Section-level AOS animation
  const animationMeta = section?.dataset?.animation;
  if (animationMeta) {
    section.setAttribute('data-aos', animationMeta);
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'flip-cards-wrapper';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const card = document.createElement('div');
    card.className = 'flip-card';

    const cardInner = document.createElement('div');
    cardInner.className = 'flip-card-inner';

    // ✅ Front
    const front = document.createElement('div');
    front.className = 'flip-card-front';

    const picture = cells[0]?.querySelector('picture');
    if (picture) {
      const optimized = createOptimizedPicture(
        picture.querySelector('img')?.src || '',
        picture.querySelector('img')?.alt || '',
        false,
        [{ width: '750' }]
      );
      front.append(optimized);
    }

    // ✅ Split text content from second cell into <p> tags
    const frontText = cells[1]?.textContent?.trim();
    if (frontText) {
      frontText.split('\n').forEach((line) => {
        if (line.trim()) {
          const p = document.createElement('p');
          p.textContent = line.trim();
          front.append(p);
        }
      });
    }

    // ✅ Back
    const back = document.createElement('div');
    back.className = 'flip-card-back';
    const backText = cells[2]?.innerHTML.trim();
    if (backText) {
      back.innerHTML = backText;
    }

    cardInner.append(front, back);
    card.append(cardInner);
    wrapper.append(card);
  });

  block.textContent = '';
  block.append(wrapper);
}
