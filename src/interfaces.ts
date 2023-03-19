/* eslint-disable @typescript-eslint/no-unused-vars */

interface IProduct {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly discountPercentage: number;
  readonly rating: number;
  readonly stock: number;
  readonly brand: string;
  readonly category: string;
  readonly thumbnail: string;
  readonly images: string[];
}

interface IAppData {
  readonly products: IProduct[];
  readonly categories: string[];
  readonly brands: string[];
  readonly total?: number;
  readonly skip?: number;
  readonly limit?: number;
}
