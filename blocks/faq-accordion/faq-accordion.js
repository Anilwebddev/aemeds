import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const [firstRow, ...otherRows] = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.className = 'faq-accordion-wrapper';

  // LEFT: Image or fallback
  const left = document.createElement('div');
  left.className = 'faq-image';

  const imageCell = firstRow.children[0];
  const pic = imageCell.querySelector('picture');
  const img = imageCell.querySelector('img');
  const para = imageCell.querySelector('p');

  if (pic) {
    left.append(pic);
  } else if (img) {
    left.append(createOptimizedPicture(img.src, img.alt));
  } else if (para && para.textContent.toLowerCase().includes('insert')) {
    // Fallback if someone typed "Insert image here..."
    const fallback = document.createElement('p');
    fallback.textContent = para.textContent;
    fallback.style.color = 'red';
    fallback.style.fontWeight = 'bold';
    left.append(fallback);
  } else {
    left.textContent = '⚠️ No image found. Please use Word → Insert → Picture.';
    left.style.color = 'red';
    left.style.padding = '1rem';
  }

  // RIGHT: FAQ accordion
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
