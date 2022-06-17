import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class FilesService {
  findOne(sku: string): Promise<{ sku: string; qty: number }> {
    console.log(sku);
    const transactions = this.getTransactionsFromJsonFile(
      './transactions.json',
      sku,
    );
    const stocks = this.getStockFromJsonFile('./stock.json', sku);
    if (!stocks && !transactions) {
      // throw new Error('Not enough stock');
      return Promise.reject('Not enough stock');
    }
    return Promise.resolve({ sku, qty: stocks?.stock - transactions });
  }

  getStockFromJsonFile(fileName: string, sku: string) {
    const jsonFile = readFileSync(fileName, 'utf8');
    const jsonData = JSON.parse(jsonFile);
    return jsonData.filter((item) => {
      return item.sku === sku;
    })[0];
  }
  getTransactionsFromJsonFile(fileName: string, sku: string) {
    const jsonFile = readFileSync(fileName, 'utf8');
    const jsonData = JSON.parse(jsonFile);
    const trans = jsonData.filter((item) => item.sku === sku);
    const totalQty = trans.reduce((pv, cv) => {
      return cv.type == 'order' ? pv + cv.qty : pv - cv.qty;
    }, 0);
    return totalQty;
  }
}
