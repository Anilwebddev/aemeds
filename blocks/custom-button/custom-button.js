import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-button-wrapper';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'custom-button';

    const link = cells[0].querySelector('a');
    if (link) {
      link.classList.add('custom-button-link');

      // If there's an icon in the second column
      if (cells[1]) {
        const iconHTML = cells[1].innerHTML.trim();
        const iconDiv = document.createElement('div');
        iconDiv.className = 'custom-button-icon';
        iconDiv.innerHTML = iconHTML;
        link.append(iconDiv);
      }

      btnWrapper.append(link);
    }

    wrapper.append(btnWrapper);
  });

  block.textContent = '';
  block.append(wrapper);

  decorateIcons(block);
}
