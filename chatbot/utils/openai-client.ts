import { OpenAI } from 'langchain/llms';

//if (!process.env.OPENAI_API_KEY) {
//  throw new Error('Missing OpenAI Credentials');
//}

export const openai = new OpenAI({
  temperature: 0,
  openAIApiKey:'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'
  //openAIApiKey: process.env.OPENAI_API_KEY
});

