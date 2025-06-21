import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-button-wrapper';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'custom-button';

    const anchor = cells[0]?.querySelector('a');
    if (anchor) {
      const button = anchor.cloneNode(true);
      button.classList.add('custom-button-link');

      // Convert markdown image to real <img>
      if (cells[1]) {
        const iconText = cells[1].textContent?.trim();

        const match = iconText.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          const img = document.createElement('img');
          img.src = match[2]; // the image path
          img.alt = match[1] || ''; // alt text

          const iconWrapper = document.createElement('span');
          iconWrapper.className = 'custom-button-icon';
          iconWrapper.appendChild(img);

          button.appendChild(iconWrapper);
        }
      }

      btnWrapper.appendChild(button);
    }

    wrapper.appendChild(btnWrapper);
  });

  block.textContent = '';
  block.appendChild(wrapper);

  decorateIcons(block);
}
