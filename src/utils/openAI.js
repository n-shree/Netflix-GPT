import OpenAI from 'openai';
import { OpenAI_GPT_Key } from './constants';

const client = new OpenAI({
  apiKey: OpenAI_GPT_Key, // This is the default and can be omitted
  dangerouslyAllowBrowser:true
});
export default client