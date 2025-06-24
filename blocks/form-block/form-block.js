import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const section = block.closest('.section');

  const wrapper = document.createElement('div');
  wrapper.className = 'contact-two-col';

  const leftCol = document.createElement('div');
  leftCol.className = 'contact-left';

  const rightCol = document.createElement('div');
  rightCol.className = 'contact-right';

  const rows = [...block.children];
  const col1 = [...rows[0].children[0].children]; // left col (heading, p, maybe image)
  const col2 = [...rows[0].children[1].children]; // right col (form fields)

  // Optional image from col1[0] if it's a <picture>
  const maybePicture = col1[0]?.querySelector('picture');
  if (maybePicture) {
    const img = maybePicture.querySelector('img');
    if (img) {
      const optimizedImg = createOptimizedPicture(
        img.src,
        img.alt || '',
        false,
        [{ width: '750' }]
      );
      leftCol.append(optimizedImg);
    }
    col1.shift(); // remove picture from text items
  }

  // Left Column: Subtitle, Heading, Description
  if (col1.length > 0) {
    const subtitle = document.createElement('p');
    subtitle.className = 'contact-subtitle';
    subtitle.textContent = col1[0]?.textContent;

    const heading = document.createElement('h2');
    heading.textContent = col1[1]?.textContent;

    const desc = document.createElement('p');
    desc.textContent = col1[2]?.textContent;

    leftCol.append(subtitle, heading, desc);
  }

  // Right Column: Form
  const form = document.createElement('form');
  form.className = 'contact-form';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = col2[0]?.textContent || 'your name';
  nameInput.required = true;

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = col2[1]?.textContent || 'your email';
  emailInput.required = true;

  const msgInput = document.createElement('textarea');
  msgInput.placeholder = col2[2]?.textContent || 'your message';
  msgInput.required = true;

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = col2[3]?.textContent || 'Submit';

  form.append(nameInput, emailInput, msgInput, submitBtn);
  rightCol.append(form);

  // ✅ Form validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = msgInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Optional: submit form logic here
    alert('Form submitted successfully!');

    // Clear form
    form.reset();
  });

  wrapper.append(leftCol, rightCol);
  block.textContent = '';
  block.append(wrapper);
}
