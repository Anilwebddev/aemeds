import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-button-wrapper';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'custom-button';

    // Get link from first column
    const link = cells[0]?.querySelector('a');
    if (link) {
      const button = link.cloneNode(true); // Avoid modifying the original DOM
      button.classList.add('custom-button-link');

      // Check for icon in second column
      if (cells[1] && cells[1].textContent.trim()) {
        const icon = cells[1].querySelector('img, svg') || cells[1].textContent.trim();
        const iconDiv = document.createElement('span');
        iconDiv.className = 'custom-button-icon';

        if (typeof icon === 'string') {
          iconDiv.innerHTML = icon; // emoji or SVG string
        } else {
          iconDiv.append(icon.cloneNode(true)); // actual <img> or <svg>
        }

        button.append(iconDiv);
      }

      btnWrapper.append(button);
      wrapper.append(btnWrapper);
    }
  });

  block.textContent = '';
  block.append(wrapper);

  // Parses icon markdown (like :arrow-right:) and replaces with actual SVG
  decorateIcons(block);
}
