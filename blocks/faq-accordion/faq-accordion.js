import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const [firstRow, ...otherRows] = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.className = 'faq-accordion-wrapper';

  // Left: Image (from first column of first row)
  const left = document.createElement('div');
  left.className = 'faq-image';

  const imageCell = firstRow.children[0];

  // ✅ FIX: find picture inside any depth, like <p><picture></picture></p>
  const pic = imageCell.querySelector('picture');
  const img = imageCell.querySelector('img');

  if (pic) {
    left.append(pic);
  } else if (img) {
    left.append(createOptimizedPicture(img.src, img.alt));
  } else {
    // fallback: copy all contents from imageCell (to see if anything's there)
    left.innerHTML = imageCell.innerHTML;
  }

  // Right: Accordion content
  const right = document.createElement('div');
  right.className = 'faq-accordion';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (!cells[1] || !cells[2]) return;

    const item = document.createElement('div');
    item.className = 'faq-item';

    const question = document.createElement('button');
    question.className = 'faq-question';
    question.textContent = cells[1].textContent;
    question.setAttribute('aria-expanded', 'false');

    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    answer.innerHTML = cells[2].innerHTML;

    question.addEventListener('click', () => {
      const expanded = question.getAttribute('aria-expanded') === 'true';
      question.setAttribute('aria-expanded', !expanded);
      answer.style.display = expanded ? 'none' : 'block';
    });

    item.append(question, answer);
    right.append(item);
  });

  wrapper.append(left, right);
  block.textContent = '';
  block.append(wrapper);
}
