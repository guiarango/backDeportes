import { Injectable } from '@nestjs/common';
import { HTTPAdapter } from '../interfaces/http-adapter.interface';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

@Injectable()
export class AxiosAdapter implements HTTPAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(url: string, options?: Record<string, any>): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axios.get(url, {
        ...options,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post<T>(
    url: string,
    data: T,
    options?: Record<string, any>,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axios.post(url, data, {
        ...options,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async patch<T>(
    url: string,
    data: T,
    options?: Record<string, any>,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axios.patch(url, data, {
        ...options,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete<T>(url: string, options?: Record<string, any>): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axios.delete(url, {
        ...options,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `[Axios Error] ${error.response?.status} - ${error.response?.data ?? error.message}`,
      );
    }
    throw new Error(`[Unknown Error] ${error.message}`);
  }
}
