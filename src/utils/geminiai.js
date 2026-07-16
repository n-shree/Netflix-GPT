import {GoogleGenAI} from '@google/genai';
import { Gemnai_key} from './constants';

const ai = new GoogleGenAI({
  apiKey: Gemnai_key, // This is the default and can be omitted
});
export default ai