import { Request, Response } from 'express';
interface RequestQuery {
  query: string;
  source_language: string; //Can also create enum for specific languages like en,fr,te etc.
  destination_language: string; //Can also create enum for specific languages like en,fr,te etc.
}
import Translation from '../model/translation';
import dotenv from 'dotenv';
dotenv.config();
const googleTranslateUrl = process.env.GOOGLE_TRANSLATE_URL; // Google Translate URL with API Key
import axios, { AxiosError } from 'axios';
export const translateFn = async (
  req: Request<{}, {}, {}, RequestQuery>,
  res: Response
) => {
  try {
    const { query, source_language, destination_language } = req.query;
    const word = await Translation.findOne({
      word: query,
      source_language,
      destination_language,
    });
    if (word) {
      res.status(200).json({ translation: word.translation });
    } else {
      try {
        //Using Rapid API Google Translate API Structure
        const { data } = await axios.post(googleTranslateUrl, {
          q: query,
          source: source_language,
          target: destination_language,
        });
        const translatedWord = data.data.translations[0].translatedText;
        res.status(200).json({ translation: translatedWord });
      } catch (e) {
        const err = e as AxiosError;
        res.status(400).send(err.message);
      }
    }
  } catch (e) {
    res.sendStatus(400);
  }
};
