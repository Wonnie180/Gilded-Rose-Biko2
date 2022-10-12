export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  maxQuality: number = 50;

  legendaryItems: string[] = ["Sulfuras, Hand of Ragnaros"];
  agedItems: string[] = ["Aged Brie"];
  specialAgedItems: string[] = ["Backstage passes to a TAFKAL80ETC concert"];
  specialAgedItemsDatesPrices: {} = {
    "Backstage passes to a TAFKAL80ETC concert": {
      Dates: [5, 10],
      Prices: [3, 2, 1],
    },
  };
  conjuredItems: string[] = ["Conjured Mana Cake"];

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  isNormalItem(item: Item): boolean {
    return !(
      this.isLegendaryItem(item) ||
      this.isItemThatAges(item) ||
      this.isSpecialItemThatAges(item)
    );
  }

  isQualityPositive(item: Item): boolean {
    return item.quality > 0;
  }

  isQualityMaxed(item: Item): boolean {
    return item.quality >= this.maxQuality;
  }

  hasPassedSellIn(item: Item): boolean {
    return item.sellIn < 0;
  }

  isLegendaryItem(item: Item): boolean {
    return this.legendaryItems.indexOf(item.name) !== -1;
  }

  isItemThatAges(item: Item): boolean {
    return this.agedItems.indexOf(item.name) !== -1;
  }

  isSpecialItemThatAges(item: Item): boolean {
    return this.specialAgedItems.indexOf(item.name) !== -1;
  }

  isConjuredItem(item: Item): boolean {
    return this.conjuredItems.indexOf(item.name) !== -1;
  }

  updateQualityNormalItem(item: Item) {
    if (this.isQualityPositive(item)) {
      if (this.hasPassedSellIn(item)) item.quality -= 2;
      else item.quality -= 1;
    }
  }

  updateQualityAgedItem(item: Item) {
    if (!this.isQualityMaxed(item)) {
      if (this.hasPassedSellIn(item)) item.quality += 2;
      else item.quality += 1;
    }
  }

  updateQualitySpecialAgedItem(item: Item) {
    if (this.hasPassedSellIn(item)) {
      item.quality = 0;
    } else {
      if (!this.isQualityMaxed(item)) {
        const DatesPrices = this.specialAgedItemsDatesPrices[item.name];
        if (item.sellIn <= DatesPrices.Dates[0]) {
          item.quality += DatesPrices.Prices[0];
        } else if (item.sellIn <= DatesPrices.Dates[1]) {
          item.quality += DatesPrices.Prices[1];
        } else {
          item.quality += DatesPrices.Prices[2];
        }
      }
    }
  }

  updateQualityConjuredItem(item: Item) {
    this.updateQualityNormalItem(item);
    this.updateQualityNormalItem(item);
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (this.isNormalItem(item)) {
        this.updateQualityNormalItem(item);
      } else if (this.isItemThatAges(item)) {
        this.updateQualityAgedItem(item);
      } else if (this.isSpecialItemThatAges(item)) {
        this.updateQualitySpecialAgedItem(item);
      } else if (this.isConjuredItem(item)) {
        this.updateQualityConjuredItem(item);
      }
      if (!this.isLegendaryItem(item)) item.sellIn -= 1;
    });

    return this.items;
  }
}
