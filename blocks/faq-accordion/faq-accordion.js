import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'faq-accordion-wrapper';

  const [firstRow, ...otherRows] = [...block.children];

  // LEFT: Try to extract image from first row, first cell (even inside <p>)
  const left = document.createElement('div');
  left.className = 'faq-image';

  const imageCell = firstRow.children[0];
  let img = imageCell.querySelector('img');

  // If image is wrapped inside a <p>, try to find it
  if (!img) {
    const p = imageCell.querySelector('p');
    if (p) img = p.querySelector('img');
  }

  // If image found, append as optimized picture
  if (img) {
    left.append(createOptimizedPicture(img.src, img.alt));
  }

  // RIGHT: Accordion logic
  const right = document.createElement('div');
  right.className = 'faq-accordion';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (!cells[1] || !cells[2]) return;

    const item = document.createElement('div');
    item.className = 'faq-item';

    const question = document.createElement('button');
    question.className = 'faq-question';
    question.textContent = cells[1].textContent.trim();
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
