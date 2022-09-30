import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it("should degrade by 1 day", function () {
    const quality = 10;
    const sellIn = 10;

    const gildedRose = new GildedRose([new Item("foo", sellIn, quality)]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality - 1);
  });

  it("should degrade by 1 after a day has passed", function () {
    const quality = 10;
    const sellIn = 0;

    const gildedRose = new GildedRose([new Item("foo", sellIn, quality)]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality - 2);
  });

  it("should degrade by 2 after 2 days sellIn has passed", function () {
    const quality = 10;
    const sellIn = 3;

    const gildedRose = new GildedRose([new Item("foo", sellIn, quality)]);
    let items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();

    expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality - 2);
  });

  it("should degrade by 5 after sellIn has passed by 3 days", function () {
    const quality = 10;
    const sellIn = 1;

    const gildedRose = new GildedRose([new Item("foo", sellIn, quality)]);
    let items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();

    expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality - (1 + 2 + 2));
  });

  it("should degrade to a negative value X days had passed", function () {
    const quality = 1;
    const sellIn = 3;

    const gildedRose = new GildedRose([new Item("foo", sellIn, quality)]);
    let items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();

    expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(0);
  });

  it("should degrade to 0 after sellIn has passed", function () {
    const quality = 0;
    const sellIn = -1;

    const gildedRose = new GildedRose([new Item("foo", sellIn, quality)]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality);
  });

  it("Bried should upgrade quality with selliing positive", function () {
    const quality = 10;
    const sellIn = 10;

    const gildedRose = new GildedRose([new Item("Aged Brie", sellIn, quality)]);
    const items = gildedRose.updateQuality();

    //expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality + 1);
  });

  it("Bried should upgrade quality x2 with selliing negative", function () {
    const quality = 10;
    const sellIn = 0;

    const gildedRose = new GildedRose([new Item("Aged Brie", sellIn, quality)]);
    const items = gildedRose.updateQuality();

    //expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality + 2);
  });

  it("Bried not shouldn't pass 50", function () {
    const quality = 50;
    const sellIn = 0;

    const gildedRose = new GildedRose([new Item("Aged Brie", sellIn, quality)]);
    const items = gildedRose.updateQuality();

    //expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality);
  });

  it("Sulfure doesn't change", function () {
    const quality = 50;
    const sellIn = 0;

    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", sellIn, quality),
    ]);
    const items = gildedRose.updateQuality();

    //expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality);
    expect(items[0].sellIn).toEqual(sellIn);
  });

  it("Sulfure doesn't change with sellIn Positive", function () {
    const quality = 50;
    const sellIn = 2;

    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", sellIn, quality),
    ]);
    const items = gildedRose.updateQuality();

    //expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality);
    expect(items[0].sellIn).toEqual(sellIn);
  });

  it("Sulfure doesn't change with sellIn Positive", function () {
    const quality = 50;
    const sellIn = 2;

    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", sellIn, quality),
    ]);
    const items = gildedRose.updateQuality();

    //expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality);
    expect(items[0].sellIn).toEqual(sellIn);
  });

  it("Backstage increment +1  with selliing > 10", function () {
    const quality = 10;
    const sellIn = 12;

    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality),
    ]);
    const items = gildedRose.updateQuality();

    //expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality + 1);
  });

  it("Backstage increment +2  with selliing <= 10 and > 5", function () {
    const quality = 10;
    const sellIn = 10;

    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality),
    ]);
    const items = gildedRose.updateQuality();

    //expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality + 2);
  });

  it("Backstage increment +3  with selliing <= 5 and > 0", function () {
    const quality = 10;
    const sellIn = 5;

    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality),
    ]);
    const items = gildedRose.updateQuality();

    //expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(quality + 3);
  });

  it("Backstage quality goes to 0 with selliing  <= 0", function () {
    const quality = 50;
    const sellIn = 0;

    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality),
    ]);
    const items = gildedRose.updateQuality();

    //expect(items[0].name).toEqual("foo");
    expect(items[0].quality).toEqual(0);
  });

  it("Backstage not shouldn't pass 50", function () {
    const quality = 50;
    const sellIn = 10;

    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toEqual(quality);
  });
});
