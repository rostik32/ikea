import { getData } from './getData.js';
import generateSubCatalog from './generateSubCatalog.js';

function catalog() {
    const updateSubCatalog = generateSubCatalog();
    const btnBurger = document.querySelector('.btn-burger');
    const catalog = document.querySelector('.catalog');
    const catalogBtnClose = document.querySelector('.catalog-btn');
    const subCatalog = document.querySelector('.subcatalog');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.insertAdjacentElement('beforeend', overlay);



    btnBurger.addEventListener('click', openMenu);
    catalogBtnClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    catalog.addEventListener('click', openSubMenu);
    subCatalog.addEventListener('click', (event) => {
        const btnReturn = event.target.closest('.btn-return');

        if (btnReturn) closeSubMenu();
    });

    function openMenu() {
        catalog.classList.add('open');
        overlay.classList.add('active');
    }

    function closeMenu() {
        closeSubMenu();
        catalog.classList.remove('open');
        overlay.classList.remove('active');
    }

    function openSubMenu(event) {
        event.preventDefault();
        const target = event.target;
        const listItem = target.closest('.catalog-list__item');

        if (listItem) {
            getData.subCatalog(target.textContent, (data) => {
                updateSubCatalog(target.textContent, data);
                subCatalog.classList.add('subopen');
            });
        }
    }

    function closeSubMenu() {
        subCatalog.classList.remove('subopen');
    }
}

export default catalog;