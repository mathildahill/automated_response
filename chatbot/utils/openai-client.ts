import { OpenAI } from 'langchain/llms';

//if (!process.env.OPENAI_API_KEY) {
//  throw new Error('Missing OpenAI Credentials');
//}

export const openai = new OpenAI({
  temperature: 0,
  openAIApiKey:'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'
  //openAIApiKey: process.env.OPENAI_API_KEY
});

