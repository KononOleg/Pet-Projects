import './Winners.scss';
import { Basecomponent } from '../../shared/BaseComponent/BaseComponent';
import { store } from '../../shared/store';
import { Button } from '../../shared/Button/Button';
import { getWinners } from '../../shared/api';
import { CarImage } from '../../сomponents/Car/CarImage/CarImage';
import { IWinners } from '../../shared/interfaces/IWinners';

export class Winners extends Basecomponent {
  private winnersTitle: Basecomponent = new Basecomponent('h2', ['title']);

  private page: Basecomponent = new Basecomponent('h3', ['subtitle']);

  private winnersTable: Basecomponent = new Basecomponent('div', ['winnersTable']);

  private nameColumn: Basecomponent = new Basecomponent('div', ['tableTitle']);

  private numberColumn: Basecomponent = new Basecomponent('div', ['tableTitle']);

  private carColumn: Basecomponent = new Basecomponent('div', ['tableTitle']);

  private winsColumn: Basecomponent = new Basecomponent('div', ['tableTitle', 'tableSortTitle']);

  private timeColumn: Basecomponent = new Basecomponent('div', ['tableTitle', 'tableSortTitle']);

  private pagination: Basecomponent = new Basecomponent('div', ['pagin']);

  private nextPage: Button = new Button('next', 'controlButton');

  private prevPage: Button = new Button('prev', 'controlButton');

  constructor() {
    super('div', ['Winners']);

    this.element.append(this.winnersTitle.element);
    this.element.appendChild(this.page.element);
    this.element.appendChild(this.winnersTable.element);

    this.numberColumn.element.innerHTML = 'Number';
    this.carColumn.element.innerHTML = 'Car';
    this.nameColumn.element.innerHTML = 'Name';
    this.winsColumn.element.innerHTML = 'Wins';
    this.timeColumn.element.innerHTML = 'Best time (seconds)';

    this.element.append(this.pagination.element);
    this.pagination.element.append(this.prevPage.element);
    this.pagination.element.append(this.nextPage.element);

    this.winsColumn.element.addEventListener('mousedown', () => {
      this.setOrderBy('wins');
      this.timeColumn.element.classList.remove('tableSort');
      this.winsColumn.element.classList.toggle('tableSort');
    });
    this.timeColumn.element.addEventListener('mousedown', () => {
      this.setOrderBy('time');
      this.winsColumn.element.classList.remove('tableSort');
      this.timeColumn.element.classList.toggle('tableSort');
    });

    this.prevPage.element.addEventListener('mousedown', () => {
      store.winnersPage--;
      this.updateStateWinners();
    });

    this.nextPage.element.addEventListener('mousedown', () => {
      store.winnersPage++;
      this.updateStateWinners();
    });
  }

  updateStateWinners = async (): Promise<void> => {
    const WINNERS_ON_PAGE = 10;
    const FIRST_PAGE = 1;
    const { items, count } = await getWinners({ page: store.winnersPage, sort: store.sortBy, order: store.sortOrder });
    store.winners = items;
    store.winnersCount = Number(count);
    this.winnersTable.element.innerHTML = `${store.winners
      .map(
        (item: IWinners, index: number) => `<div class="tableItem">${index + 1}</div>
          ${new CarImage(item.car.color, 'carWinnerImage').element.outerHTML} 
          <div class="tableItem">${item.car.name}</div>
    <div class="tableItem">${item.wins}</div>
    <div class="tableItem">${item.time}</div>`,
      )
      .join('')}`;
    this.winnersTable.element.prepend(this.timeColumn.element);
    this.winnersTable.element.prepend(this.winsColumn.element);
    this.winnersTable.element.prepend(this.nameColumn.element);
    this.winnersTable.element.prepend(this.carColumn.element);
    this.winnersTable.element.prepend(this.numberColumn.element);

    this.winnersTitle.element.innerHTML = `Winners (${store.winnersCount})`;
    this.page.element.innerHTML = `Page #${store.winnersPage}`;
    if (store.winnersPage * WINNERS_ON_PAGE < store.winnersCount) {
      this.nextPage.element.disabled = false;
    } else {
      this.nextPage.element.disabled = true;
    }
    if (store.winnersPage > FIRST_PAGE) {
      this.prevPage.element.disabled = false;
    } else {
      this.prevPage.element.disabled = true;
    }
  };

  setOrderBy = async (sortBy: string): Promise<void> => {
    const ASCENDING_ORDER = 'asc';
    const DESCENDING_ORDER = 'desc';
    store.sortOrder = store.sortOrder === ASCENDING_ORDER ? DESCENDING_ORDER : ASCENDING_ORDER;
    store.sortBy = sortBy;

    await this.updateStateWinners();
  };
}
