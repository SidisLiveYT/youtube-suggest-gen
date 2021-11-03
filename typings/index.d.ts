import { FilterOptions } from './instances'
import { relatedVideo } from 'ytdl-core'

export function suggestions (
  YTQuery: String,
  Limit?: String | Number | undefined,
  Filter?: FilterOptions
): Promise<relatedVideo[] | relatedVideo | undefined> | undefined
