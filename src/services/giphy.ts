import axios from 'axios';
import {Gif} from '../models/Models';

const API_KEY = 'tl4aR9xjFRLaH8q50O7DRwgMDzDsxgww';

const TRENDING_END_POINT = 'https://api.giphy.com/v1/gifs/trending';

const PAGE_SIZE = 20;

export const fetchGifs = async (pageNumber: number) => {
  try {
    const response = await axios.get(TRENDING_END_POINT, {
      params: {
        api_key: API_KEY,
        limit: PAGE_SIZE,
        offset: pageNumber * PAGE_SIZE,
      },
    });

    return response.data.data.map((gif: any) => {
      let gifObject: Gif = {
        id: gif.id,
        createdBy: gif.username,
        title: gif.title,
        largeGifUrl: gif.images.fixed_height.url,
        smallGifUrl: gif.images.fixed_height_small.url,
      };
      return gifObject;
    }) as Gif[];
  } catch (error) {
    console.log(error);
  }
};
