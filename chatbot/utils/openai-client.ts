import { OpenAI } from 'langchain/llms';

//if (!process.env.OPENAI_API_KEY) {
//  throw new Error('Missing OpenAI Credentials');
//}

export const openai = new OpenAI({
  temperature: 0,
  openAIApiKey:'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'
  //openAIApiKey: process.env.OPENAI_API_KEY
});

