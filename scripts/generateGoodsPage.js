import { getData } from './getData.js';
import userData from './userData.js';


export default function generateGoodsPage() {
    const mainHeader = document.querySelector('.main-header');

    function generateCards(data) {
        const goodsList = document.querySelector('.goods-list');

        goodsList.textContent = '';
        if (!data.length) {
            const goods = document.querySelector('.goods');
            goods.textContent = (location.search === '?wishlist') ?
                'Ваш список желаний пуст' :
                'К сожалению по вашему запросу ничего не найдено';
        }

        data.forEach(item => {
            const { count, description, id, img, price, name } = item;

            goodsList.insertAdjacentHTML('afterbegin', `
            <li class="goods-list__item">
            <a class="goods-item__link" href="card.html#${id}">
                <article class="goods-item">
                    <div class="goods-item__img">
                        <img src="${img[0]}" alt="${name}"
                            ${img[1] ? `data-second-image=${img[1]}` : ''}>
                    </div>

                    ${count >= 6 ? '<p class="goods-item__new">Новинка</p>' :
                    ''}
                    
                    ${!count ? '<p class="goods-item__not-available">Нет в наличии</p>' :
                    ''}
                    
                    <h3 class="goods-item__header">${name}</h3>
                    <p class="goods-item__description">${description}</p>
                    <p class="goods-item__price">
                        <span class="goods-item__price-value">${price}</span>
                        <span class="goods-item__currency"> ₽</span>
                    </p>

                    ${!count ? '' :
                    `<button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="${id}"></button>`}
                    
                </article>
            </a>
        </li>
            `);

        });

        goodsList.addEventListener('click', e => {
            const btnAddCard = e.target.closest('.btn-add-card');
    
            if (btnAddCard) {
                e.preventDefault();
                userData.cartList = btnAddCard.dataset.idd;
                console.log(userData.cartList);
            }
        });
    }


    if (location.pathname.includes('goods') && location.search) {
        const search = decodeURI(location.search);
        const prop = search.split('=')[0].substring(1);
        const value = search.split('=')[1];

        if (prop === 's') {
            getData.search(value, generateCards);
            mainHeader.textContent = `Поиск: ${value}`;

        } else if (prop === 'wishlist') {
            getData.wishList(userData.wishList, generateCards);
            mainHeader.textContent = `Список желаний:`;

        } else if (prop === 'cat' || prop === 'subcat') {
            getData.category(prop, value, generateCards);
            mainHeader.textContent = value;
        }
    }

    
}

