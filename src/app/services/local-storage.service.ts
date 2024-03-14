import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getData(key: string) {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        return null;
      }
      JSON.parse(serializedData);
      return JSON.parse(serializedData);
    } catch (error) {
      throw new Error('Error retrieving data from localStorage');
    }
  }

  saveData(key: string, data: unknown, rewrite: boolean): void {
    try {
      let processedData = data;
      if (Array.isArray(processedData) && !rewrite) {
        const storedData = this.getData(key);
        if (Array.isArray(storedData)) {
          processedData = [...storedData, ...processedData];
        }
      }
      localStorage.setItem(key, JSON.stringify(processedData));
    } catch (error) {
      throw new Error('Error saving data to localStorage');
    }
  }

  removeItemsFromStoredArray<T>(key: string, filterCallback: (item: T) => boolean) {
    try {
      const parsedData = this.getData(key) as T[];
      this.saveData(key, parsedData.filter(filterCallback), true);
    } catch (error) {
      throw new Error('Error removing data from localStorage');
    }
  }
}
