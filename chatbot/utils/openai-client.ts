import { OpenAI } from 'langchain/llms';

//if (!process.env.OPENAI_API_KEY) {
//  throw new Error('Missing OpenAI Credentials');
//}

export const openai = new OpenAI({
  temperature: 0,
  openAIApiKey:'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'
  //openAIApiKey: process.env.OPENAI_API_KEY
});

