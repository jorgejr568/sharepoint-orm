import axios, { AxiosInstance } from 'axios'
import { IConfig } from '../protocols'

export function ClientFactory(config: IConfig): AxiosInstance {
  return axios.create({})
}
