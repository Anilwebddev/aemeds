import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const section = block.closest('.section');

  // ✅ Apply section-level animation if defined via metadata
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

    // ✅ Front of card
    const front = document.createElement('div');
    front.className = 'flip-card-front';

    const picture = cells[0]?.querySelector('picture');
    const frontText = cells[1]?.innerHTML.trim();

    if (picture) {
      const optimized = createOptimizedPicture(
        picture.querySelector('img')?.src || '',
        picture.querySelector('img')?.alt || '',
        false,
        [{ width: '750' }]
      );
      front.append(optimized);
    }

    if (frontText) {
      // First <p>
      const p1 = document.createElement('p');
      p1.innerHTML = frontText;
      front.append(p1);

      // Second <p>
      const p2 = document.createElement('p');
      p2.textContent = 'More details'; // ← You can update this with dynamic data if needed
      front.append(p2);
    }

    // ✅ Back of card
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
