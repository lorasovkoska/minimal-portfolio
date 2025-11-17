import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { config } from '@/sanity/config'

export const client = createClient(config)

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => {
  return builder.image(source)
}

