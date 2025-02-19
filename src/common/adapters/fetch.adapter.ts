import { Injectable } from '@nestjs/common';
import { HTTPAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class FetchAdapter implements HTTPAdapter {
  private fetch = fetch;

  async get<T>(url: string): Promise<T> {
    try {
      const response = await this.fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      return response.json();
    } catch (error) {
      this.handleError(error);
    }
  }

  async post<T>(url: string, data: T): Promise<T> {
    try {
      const response = await this.fetch(url, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json();
    } catch (error) {
      this.handleError(error);
    }
  }

  async patch<T>(url: string, data: T): Promise<T> {
    try {
      const response = await this.fetch(url, {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json();
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const response = await this.fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      return response.json();
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: any) {
    throw new Error(`[Unknown Error] ${error.message}`);
  }
}
