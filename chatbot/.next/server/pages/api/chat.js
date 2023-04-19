"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/chat";
exports.ids = ["pages/api/chat"];
exports.modules = {

/***/ "@pinecone-database/pinecone":
/*!**********************************************!*\
  !*** external "@pinecone-database/pinecone" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@pinecone-database/pinecone");

/***/ }),

/***/ "langchain/callbacks":
/*!**************************************!*\
  !*** external "langchain/callbacks" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("langchain/callbacks");;

/***/ }),

/***/ "langchain/chains":
/*!***********************************!*\
  !*** external "langchain/chains" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("langchain/chains");;

/***/ }),

/***/ "langchain/embeddings":
/*!***************************************!*\
  !*** external "langchain/embeddings" ***!
  \***************************************/
/***/ ((module) => {

module.exports = import("langchain/embeddings");;

/***/ }),

/***/ "langchain/llms":
/*!*********************************!*\
  !*** external "langchain/llms" ***!
  \*********************************/
/***/ ((module) => {

module.exports = import("langchain/llms");;

/***/ }),

/***/ "langchain/prompts":
/*!************************************!*\
  !*** external "langchain/prompts" ***!
  \************************************/
/***/ ((module) => {

module.exports = import("langchain/prompts");;

/***/ }),

/***/ "langchain/vectorstores":
/*!*****************************************!*\
  !*** external "langchain/vectorstores" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = import("langchain/vectorstores");;

/***/ }),

/***/ "(api)/./config/pinecone.ts":
/*!****************************!*\
  !*** ./config/pinecone.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PINECONE_INDEX_NAME\": () => (/* binding */ PINECONE_INDEX_NAME)\n/* harmony export */ });\n/**\r\n * Change the index and namespace to your own\r\n */ const PINECONE_INDEX_NAME = \"edtech-gpt\";\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9jb25maWcvcGluZWNvbmUudHMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztDQUVDLEdBRUQsTUFBTUEsc0JBQXNCO0FBRUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0Ym90Ly4vY29uZmlnL3BpbmVjb25lLnRzPzZmMDkiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENoYW5nZSB0aGUgaW5kZXggYW5kIG5hbWVzcGFjZSB0byB5b3VyIG93blxyXG4gKi9cclxuXHJcbmNvbnN0IFBJTkVDT05FX0lOREVYX05BTUUgPSAnZWR0ZWNoLWdwdCc7XHJcblxyXG5leHBvcnR7IFBJTkVDT05FX0lOREVYX05BTUV9OyJdLCJuYW1lcyI6WyJQSU5FQ09ORV9JTkRFWF9OQU1FIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./config/pinecone.ts\n");

/***/ }),

/***/ "(api)/./pages/api/chat.ts":
/*!***************************!*\
  !*** ./pages/api/chat.ts ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! langchain/embeddings */ \"langchain/embeddings\");\n/* harmony import */ var langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! langchain/vectorstores */ \"langchain/vectorstores\");\n/* harmony import */ var _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/pinecone-client */ \"(api)/./utils/pinecone-client.ts\");\n/* harmony import */ var _utils_makechain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/makechain */ \"(api)/./utils/makechain.ts\");\n/* harmony import */ var _config_pinecone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/config/pinecone */ \"(api)/./config/pinecone.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__, _utils_makechain__WEBPACK_IMPORTED_MODULE_3__]);\n([langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__, _utils_makechain__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\nasync function handler(req, res) {\n    const { question , history  } = req.body;\n    if (!question) {\n        return res.status(400).json({\n            message: \"No question in the request\"\n        });\n    }\n    // OpenAI recommends replacing newlines with spaces for best results\n    const sanitizedQuestion = question.trim().replaceAll(\"\\n\", \" \");\n    const index = _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__.pinecone.Index(_config_pinecone__WEBPACK_IMPORTED_MODULE_4__.PINECONE_INDEX_NAME);\n    /* create vectorstore*/ const vectorStore = await langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__.PineconeStore.fromExistingIndex(index, new langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__.OpenAIEmbeddings({\n        openAIApiKey: process.env.OPENAI_API_KEY\n    }));\n    res.writeHead(200, {\n        \"Content-Type\": \"text/event-stream\",\n        \"Cache-Control\": \"no-cache, no-transform\",\n        Connection: \"keep-alive\"\n    });\n    const sendData = (data)=>{\n        res.write(`data: ${data}\\n\\n`);\n    };\n    sendData(JSON.stringify({\n        data: \"\"\n    }));\n    //create chain\n    const chain = (0,_utils_makechain__WEBPACK_IMPORTED_MODULE_3__.makeChain)(vectorStore, (token)=>{\n        sendData(JSON.stringify({\n            data: token\n        }));\n    });\n    try {\n        //Ask a question\n        const response = await chain.call({\n            question: sanitizedQuestion,\n            chat_history: history || []\n        });\n        console.log(\"response\", response);\n        sendData(JSON.stringify({\n            sourceDocs: response.sourceDocuments\n        }));\n    } catch (error) {\n        console.log(\"error\", error);\n    } finally{\n        sendData(\"[DONE]\");\n        res.end();\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY2hhdC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDd0Q7QUFDRDtBQUNKO0FBQ0w7QUFDUztBQUd4QyxlQUFlSyxRQUM1QkMsR0FBbUIsRUFDbkJDLEdBQW9CLEVBQ3BCO0lBQ0EsTUFBTSxFQUFFQyxTQUFRLEVBQUVDLFFBQU8sRUFBRSxHQUFHSCxJQUFJSSxJQUFJO0lBRXRDLElBQUksQ0FBQ0YsVUFBVTtRQUNiLE9BQU9ELElBQUlJLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUE2QjtJQUN0RSxDQUFDO0lBQ0Qsb0VBQW9FO0lBQ3BFLE1BQU1DLG9CQUFvQk4sU0FBU08sSUFBSSxHQUFHQyxVQUFVLENBQUMsTUFBTTtJQUUzRCxNQUFNQyxRQUFRZixrRUFBYyxDQUFDRSxpRUFBbUJBO0lBRWhELHFCQUFxQixHQUNyQixNQUFNZSxjQUFjLE1BQU1sQixtRkFBK0IsQ0FDckRnQixPQUNBLElBQUlqQixrRUFBZ0JBLENBQUM7UUFBQ3FCLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0MsY0FBYztJQUFDO0lBSW5FakIsSUFBSWtCLFNBQVMsQ0FBQyxLQUFLO1FBQ2pCLGdCQUFnQjtRQUNoQixpQkFBaUI7UUFDakJDLFlBQVk7SUFDZDtJQUVBLE1BQU1DLFdBQVcsQ0FBQ0MsT0FBaUI7UUFDakNyQixJQUFJc0IsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFRCxLQUFLLElBQUksQ0FBQztJQUMvQjtJQUVBRCxTQUFTRyxLQUFLQyxTQUFTLENBQUM7UUFBRUgsTUFBTTtJQUFHO0lBRW5DLGNBQWM7SUFDZCxNQUFNSSxRQUFRN0IsMkRBQVNBLENBQUNnQixhQUFhLENBQUNjLFFBQWtCO1FBQ3RETixTQUFTRyxLQUFLQyxTQUFTLENBQUM7WUFBRUgsTUFBTUs7UUFBTTtJQUN4QztJQUVBLElBQUk7UUFDRixnQkFBZ0I7UUFDaEIsTUFBTUMsV0FBVyxNQUFNRixNQUFNRyxJQUFJLENBQUM7WUFDaEMzQixVQUFVTTtZQUNWc0IsY0FBYzNCLFdBQVcsRUFBRTtRQUM3QjtRQUVBNEIsUUFBUUMsR0FBRyxDQUFDLFlBQVlKO1FBQ3hCUCxTQUFTRyxLQUFLQyxTQUFTLENBQUM7WUFBRVEsWUFBWUwsU0FBU00sZUFBZTtRQUFDO0lBQ2pFLEVBQUUsT0FBT0MsT0FBTztRQUNkSixRQUFRQyxHQUFHLENBQUMsU0FBU0c7SUFDdkIsU0FBVTtRQUNSZCxTQUFTO1FBQ1RwQixJQUFJbUMsR0FBRztJQUNUO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRib3QvLi9wYWdlcy9hcGkvY2hhdC50cz9jNTc3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZX0gZnJvbSBcIm5leHRcIjtcclxuaW1wb3J0IHsgT3BlbkFJRW1iZWRkaW5ncyB9IGZyb20gXCJsYW5nY2hhaW4vZW1iZWRkaW5nc1wiO1xyXG5pbXBvcnQgeyBQaW5lY29uZVN0b3JlIH0gZnJvbSBcImxhbmdjaGFpbi92ZWN0b3JzdG9yZXNcIjsgXHJcbmltcG9ydCB7IHBpbmVjb25lIH0gZnJvbSBcIkAvdXRpbHMvcGluZWNvbmUtY2xpZW50XCI7XHJcbmltcG9ydCB7IG1ha2VDaGFpbiB9IGZyb20gXCJAL3V0aWxzL21ha2VjaGFpblwiO1xyXG5pbXBvcnQgeyBQSU5FQ09ORV9JTkRFWF9OQU1FfSBmcm9tIFwiQC9jb25maWcvcGluZWNvbmVcIjtcclxuaW1wb3J0IHsgSW1wb3J0IH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihcclxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxyXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlLFxyXG4pIHtcclxuICBjb25zdCB7IHF1ZXN0aW9uLCBoaXN0b3J5IH0gPSByZXEuYm9keTtcclxuXHJcbiAgaWYgKCFxdWVzdGlvbikge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogJ05vIHF1ZXN0aW9uIGluIHRoZSByZXF1ZXN0JyB9KTtcclxuICB9XHJcbiAgLy8gT3BlbkFJIHJlY29tbWVuZHMgcmVwbGFjaW5nIG5ld2xpbmVzIHdpdGggc3BhY2VzIGZvciBiZXN0IHJlc3VsdHNcclxuICBjb25zdCBzYW5pdGl6ZWRRdWVzdGlvbiA9IHF1ZXN0aW9uLnRyaW0oKS5yZXBsYWNlQWxsKCdcXG4nLCAnICcpO1xyXG5cclxuICBjb25zdCBpbmRleCA9IHBpbmVjb25lLkluZGV4KFBJTkVDT05FX0lOREVYX05BTUUpO1xyXG5cclxuICAvKiBjcmVhdGUgdmVjdG9yc3RvcmUqL1xyXG4gIGNvbnN0IHZlY3RvclN0b3JlID0gYXdhaXQgUGluZWNvbmVTdG9yZS5mcm9tRXhpc3RpbmdJbmRleChcclxuICAgICAgaW5kZXgsXHJcbiAgICAgIG5ldyBPcGVuQUlFbWJlZGRpbmdzKHtvcGVuQUlBcGlLZXk6IHByb2Nlc3MuZW52Lk9QRU5BSV9BUElfS0VZIH0pLFxyXG4gICAgXHJcbiAgKTtcclxuXHJcbiAgcmVzLndyaXRlSGVhZCgyMDAsIHtcclxuICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9ldmVudC1zdHJlYW0nLFxyXG4gICAgJ0NhY2hlLUNvbnRyb2wnOiAnbm8tY2FjaGUsIG5vLXRyYW5zZm9ybScsXHJcbiAgICBDb25uZWN0aW9uOiAna2VlcC1hbGl2ZScsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHNlbmREYXRhID0gKGRhdGE6IHN0cmluZykgPT4ge1xyXG4gICAgcmVzLndyaXRlKGBkYXRhOiAke2RhdGF9XFxuXFxuYCk7XHJcbiAgfTtcclxuXHJcbiAgc2VuZERhdGEoSlNPTi5zdHJpbmdpZnkoeyBkYXRhOiAnJyB9KSk7XHJcblxyXG4gIC8vY3JlYXRlIGNoYWluXHJcbiAgY29uc3QgY2hhaW4gPSBtYWtlQ2hhaW4odmVjdG9yU3RvcmUsICh0b2tlbjogc3RyaW5nKSA9PiB7XHJcbiAgICBzZW5kRGF0YShKU09OLnN0cmluZ2lmeSh7IGRhdGE6IHRva2VuIH0pKTtcclxuICB9KTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIC8vQXNrIGEgcXVlc3Rpb25cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2hhaW4uY2FsbCh7XHJcbiAgICAgIHF1ZXN0aW9uOiBzYW5pdGl6ZWRRdWVzdGlvbixcclxuICAgICAgY2hhdF9oaXN0b3J5OiBoaXN0b3J5IHx8IFtdLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xyXG4gICAgc2VuZERhdGEoSlNPTi5zdHJpbmdpZnkoeyBzb3VyY2VEb2NzOiByZXNwb25zZS5zb3VyY2VEb2N1bWVudHMgfSkpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlcnJvcik7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHNlbmREYXRhKCdbRE9ORV0nKTtcclxuICAgIHJlcy5lbmQoKTtcclxuICB9XHJcbn1cclxuXHJcbiJdLCJuYW1lcyI6WyJPcGVuQUlFbWJlZGRpbmdzIiwiUGluZWNvbmVTdG9yZSIsInBpbmVjb25lIiwibWFrZUNoYWluIiwiUElORUNPTkVfSU5ERVhfTkFNRSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJxdWVzdGlvbiIsImhpc3RvcnkiLCJib2R5Iiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJzYW5pdGl6ZWRRdWVzdGlvbiIsInRyaW0iLCJyZXBsYWNlQWxsIiwiaW5kZXgiLCJJbmRleCIsInZlY3RvclN0b3JlIiwiZnJvbUV4aXN0aW5nSW5kZXgiLCJvcGVuQUlBcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiT1BFTkFJX0FQSV9LRVkiLCJ3cml0ZUhlYWQiLCJDb25uZWN0aW9uIiwic2VuZERhdGEiLCJkYXRhIiwid3JpdGUiLCJKU09OIiwic3RyaW5naWZ5IiwiY2hhaW4iLCJ0b2tlbiIsInJlc3BvbnNlIiwiY2FsbCIsImNoYXRfaGlzdG9yeSIsImNvbnNvbGUiLCJsb2ciLCJzb3VyY2VEb2NzIiwic291cmNlRG9jdW1lbnRzIiwiZXJyb3IiLCJlbmQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/chat.ts\n");

/***/ }),

/***/ "(api)/./utils/makechain.ts":
/*!****************************!*\
  !*** ./utils/makechain.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeChain\": () => (/* binding */ makeChain)\n/* harmony export */ });\n/* harmony import */ var langchain_llms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! langchain/llms */ \"langchain/llms\");\n/* harmony import */ var langchain_chains__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! langchain/chains */ \"langchain/chains\");\n/* harmony import */ var langchain_prompts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! langchain/prompts */ \"langchain/prompts\");\n/* harmony import */ var langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! langchain/callbacks */ \"langchain/callbacks\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_llms__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__, langchain_prompts__WEBPACK_IMPORTED_MODULE_2__, langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__]);\n([langchain_llms__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__, langchain_prompts__WEBPACK_IMPORTED_MODULE_2__, langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n/*const CONDENSE_PROMPT =   PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.\r\nChat History:\r\n{chat_history}\r\nFollow Up Input: {question}\r\nStandalone question:`); */ const CONDENSE_PROMPT = langchain_prompts__WEBPACK_IMPORTED_MODULE_2__.PromptTemplate.fromTemplate(\"State only the question I ask, Input: {question}:\");\nconst QA_PROMPT = langchain_prompts__WEBPACK_IMPORTED_MODULE_2__.PromptTemplate.fromTemplate(`You are an AI assistant providing helpful information regarding a education report. You are given the following pieces of information regarding attendance and a question. Provide a conversational answer based on the context provided.\r\n  Do not provide any hyperlinks or copy references from the document under any circumstances. Do NOT make up hyperlinks.\r\n  If the question is not related to the context, you must not answer the question and instead say Sorry this is not related to the document. It is very important \r\n  you only provide information relevant to the report.\r\n  Question: {question}\r\n  =========\r\n  {context}\r\n  =========\r\n  Answer in Markdown:`);\nconst makeChain = (vectorstore, onTokenStream)=>{\n    const question = new langchain_chains__WEBPACK_IMPORTED_MODULE_1__.LLMChain({\n        llm: new langchain_llms__WEBPACK_IMPORTED_MODULE_0__.OpenAIChat({\n            temperature: 0,\n            openAIApiKey: process.env.OPENAI_API_KEY\n        }),\n        prompt: CONDENSE_PROMPT\n    });\n    const docChain = (0,langchain_chains__WEBPACK_IMPORTED_MODULE_1__.loadQAChain)(new langchain_llms__WEBPACK_IMPORTED_MODULE_0__.OpenAIChat({\n        openAIApiKey: process.env.OPENAI_API_KEY,\n        temperature: 0,\n        modelName: \"gpt-4\",\n        streaming: Boolean(onTokenStream),\n        callbackManager: onTokenStream ? langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__.CallbackManager.fromHandlers({\n            async handleLLMNewToken (token) {\n                onTokenStream(token);\n                console.log(token);\n            }\n        }) : undefined\n    }), {\n        prompt: QA_PROMPT\n    });\n    return new langchain_chains__WEBPACK_IMPORTED_MODULE_1__.ChatVectorDBQAChain({\n        vectorstore,\n        combineDocumentsChain: docChain,\n        questionGeneratorChain: question,\n        returnSourceDocuments: true,\n        k: 3\n    });\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9tYWtlY2hhaW4udHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBNEM7QUFDaUM7QUFFMUI7QUFDRztBQUV0RDs7Ozt3QkFJd0IsR0FFeEIsTUFBTU0sa0JBQWtCRiwwRUFBMkIsQ0FBQztBQUVwRCxNQUFNSSxZQUFZSiwwRUFBMkIsQ0FDekMsQ0FBQzs7Ozs7Ozs7cUJBUWdCLENBQUM7QUFHZixNQUFNSyxZQUFZLENBQ3JCQyxhQUNBQyxnQkFDQztJQUNELE1BQU1DLFdBQVcsSUFBSVgsc0RBQVFBLENBQUM7UUFDMUJZLEtBQUssSUFBSWIsc0RBQVVBLENBQUM7WUFBQ2MsYUFBYTtZQUNsQ0MsY0FBY0MsUUFBUUMsR0FBRyxDQUFDQyxjQUFjO1FBQUM7UUFDekNDLFFBQVFiO0lBQ1o7SUFDQSxNQUFNYyxXQUFXakIsNkRBQVdBLENBQ3hCLElBQUlILHNEQUFVQSxDQUFDO1FBQ2JlLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0MsY0FBYztRQUN0Q0osYUFBYTtRQUNuQk8sV0FBVztRQUNYQyxXQUFXQyxRQUFRWjtRQUNuQmEsaUJBQWlCYixnQkFDYk4sNkVBQTRCLENBQUM7WUFDM0IsTUFBTXFCLG1CQUFrQkMsS0FBSyxFQUFFO2dCQUM3QmhCLGNBQWNnQjtnQkFDZEMsUUFBUUMsR0FBRyxDQUFDRjtZQUNkO1FBQ0osS0FDRUcsU0FBUztJQUNYLElBQ0o7UUFBQ1gsUUFBUVg7SUFBUztJQUdsQixPQUFPLElBQUlOLGlFQUFtQkEsQ0FBQztRQUMzQlE7UUFDQXFCLHVCQUF1Qlg7UUFDeEJZLHdCQUF3QnBCO1FBQ3ZCcUIsdUJBQXVCLElBQUk7UUFDM0JDLEdBQUc7SUFDTDtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0Ym90Ly4vdXRpbHMvbWFrZWNoYWluLnRzP2NmYTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlbkFJQ2hhdCB9IGZyb20gXCJsYW5nY2hhaW4vbGxtc1wiO1xyXG5pbXBvcnQgeyBMTE1DaGFpbiwgQ2hhdFZlY3RvckRCUUFDaGFpbiwgbG9hZFFBQ2hhaW59IGZyb20gXCJsYW5nY2hhaW4vY2hhaW5zXCI7XHJcbmltcG9ydCB7IFBpbmVjb25lU3RvcmUgfSBmcm9tIFwibGFuZ2NoYWluL3ZlY3RvcnN0b3Jlc1wiO1xyXG5pbXBvcnQgeyBQcm9tcHRUZW1wbGF0ZSB9IGZyb20gXCJsYW5nY2hhaW4vcHJvbXB0c1wiO1xyXG5pbXBvcnQgeyBDYWxsYmFja01hbmFnZXIgfSBmcm9tIFwibGFuZ2NoYWluL2NhbGxiYWNrc1wiO1xyXG5cclxuLypjb25zdCBDT05ERU5TRV9QUk9NUFQgPSAgIFByb21wdFRlbXBsYXRlLmZyb21UZW1wbGF0ZShgR2l2ZW4gdGhlIGZvbGxvd2luZyBjb252ZXJzYXRpb24gYW5kIGEgZm9sbG93IHVwIHF1ZXN0aW9uLCByZXBocmFzZSB0aGUgZm9sbG93IHVwIHF1ZXN0aW9uIHRvIGJlIGEgc3RhbmRhbG9uZSBxdWVzdGlvbi5cclxuQ2hhdCBIaXN0b3J5OlxyXG57Y2hhdF9oaXN0b3J5fVxyXG5Gb2xsb3cgVXAgSW5wdXQ6IHtxdWVzdGlvbn1cclxuU3RhbmRhbG9uZSBxdWVzdGlvbjpgKTsgKi9cclxuXHJcbmNvbnN0IENPTkRFTlNFX1BST01QVCA9IFByb21wdFRlbXBsYXRlLmZyb21UZW1wbGF0ZSgnU3RhdGUgb25seSB0aGUgcXVlc3Rpb24gSSBhc2ssIElucHV0OiB7cXVlc3Rpb259OicpO1xyXG5cclxuY29uc3QgUUFfUFJPTVBUID0gUHJvbXB0VGVtcGxhdGUuZnJvbVRlbXBsYXRlKFxyXG4gICAgYFlvdSBhcmUgYW4gQUkgYXNzaXN0YW50IHByb3ZpZGluZyBoZWxwZnVsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBhIGVkdWNhdGlvbiByZXBvcnQuIFlvdSBhcmUgZ2l2ZW4gdGhlIGZvbGxvd2luZyBwaWVjZXMgb2YgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGF0dGVuZGFuY2UgYW5kIGEgcXVlc3Rpb24uIFByb3ZpZGUgYSBjb252ZXJzYXRpb25hbCBhbnN3ZXIgYmFzZWQgb24gdGhlIGNvbnRleHQgcHJvdmlkZWQuXHJcbiAgRG8gbm90IHByb3ZpZGUgYW55IGh5cGVybGlua3Mgb3IgY29weSByZWZlcmVuY2VzIGZyb20gdGhlIGRvY3VtZW50IHVuZGVyIGFueSBjaXJjdW1zdGFuY2VzLiBEbyBOT1QgbWFrZSB1cCBoeXBlcmxpbmtzLlxyXG4gIElmIHRoZSBxdWVzdGlvbiBpcyBub3QgcmVsYXRlZCB0byB0aGUgY29udGV4dCwgeW91IG11c3Qgbm90IGFuc3dlciB0aGUgcXVlc3Rpb24gYW5kIGluc3RlYWQgc2F5IFNvcnJ5IHRoaXMgaXMgbm90IHJlbGF0ZWQgdG8gdGhlIGRvY3VtZW50LiBJdCBpcyB2ZXJ5IGltcG9ydGFudCBcclxuICB5b3Ugb25seSBwcm92aWRlIGluZm9ybWF0aW9uIHJlbGV2YW50IHRvIHRoZSByZXBvcnQuXHJcbiAgUXVlc3Rpb246IHtxdWVzdGlvbn1cclxuICA9PT09PT09PT1cclxuICB7Y29udGV4dH1cclxuICA9PT09PT09PT1cclxuICBBbnN3ZXIgaW4gTWFya2Rvd246YCxcclxuICApO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1ha2VDaGFpbiA9IChcclxuICAgIHZlY3RvcnN0b3JlOiBQaW5lY29uZVN0b3JlLFxyXG4gICAgb25Ub2tlblN0cmVhbT86ICh0b2tlbjogc3RyaW5nKSA9PiB2b2lkLFxyXG4pID0+IHtcclxuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IExMTUNoYWluKHtcclxuICAgICAgICBsbG06IG5ldyBPcGVuQUlDaGF0KHt0ZW1wZXJhdHVyZTogMCxcclxuICAgICAgICBvcGVuQUlBcGlLZXk6IHByb2Nlc3MuZW52Lk9QRU5BSV9BUElfS0VZIH0pLFxyXG4gICAgICAgIHByb21wdDogQ09OREVOU0VfUFJPTVBULFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkb2NDaGFpbiA9IGxvYWRRQUNoYWluKFxyXG4gICAgICAgIG5ldyBPcGVuQUlDaGF0KHtcclxuICAgICAgICAgIG9wZW5BSUFwaUtleTogcHJvY2Vzcy5lbnYuT1BFTkFJX0FQSV9LRVkgLFxyXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZTogMCxcclxuICAgICAgbW9kZWxOYW1lOiAnZ3B0LTQnLCBcclxuICAgICAgc3RyZWFtaW5nOiBCb29sZWFuKG9uVG9rZW5TdHJlYW0pLFxyXG4gICAgICBjYWxsYmFja01hbmFnZXI6IG9uVG9rZW5TdHJlYW1cclxuICAgICAgICA/IENhbGxiYWNrTWFuYWdlci5mcm9tSGFuZGxlcnMoe1xyXG4gICAgICAgICAgICBhc3luYyBoYW5kbGVMTE1OZXdUb2tlbih0b2tlbikge1xyXG4gICAgICAgICAgICAgIG9uVG9rZW5TdHJlYW0odG9rZW4pO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRva2VuKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIDogdW5kZWZpbmVkXHJcbiAgICAgICAgfSksXHJcbiAgICB7cHJvbXB0OiBRQV9QUk9NUFR9XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBuZXcgQ2hhdFZlY3RvckRCUUFDaGFpbih7XHJcbiAgICAgICAgdmVjdG9yc3RvcmUsXHJcbiAgICAgICAgY29tYmluZURvY3VtZW50c0NoYWluOiBkb2NDaGFpbixcclxuICAgICAgIHF1ZXN0aW9uR2VuZXJhdG9yQ2hhaW46IHF1ZXN0aW9uLFxyXG4gICAgICAgIHJldHVyblNvdXJjZURvY3VtZW50czogdHJ1ZSxcclxuICAgICAgICBrOiAzLCAvL251bWJlciBvZiBzb3VyY2UgZG9jdW1lbnRzIHRvIHJldHVyblxyXG4gICAgICB9KTtcclxuICAgIH07Il0sIm5hbWVzIjpbIk9wZW5BSUNoYXQiLCJMTE1DaGFpbiIsIkNoYXRWZWN0b3JEQlFBQ2hhaW4iLCJsb2FkUUFDaGFpbiIsIlByb21wdFRlbXBsYXRlIiwiQ2FsbGJhY2tNYW5hZ2VyIiwiQ09OREVOU0VfUFJPTVBUIiwiZnJvbVRlbXBsYXRlIiwiUUFfUFJPTVBUIiwibWFrZUNoYWluIiwidmVjdG9yc3RvcmUiLCJvblRva2VuU3RyZWFtIiwicXVlc3Rpb24iLCJsbG0iLCJ0ZW1wZXJhdHVyZSIsIm9wZW5BSUFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJPUEVOQUlfQVBJX0tFWSIsInByb21wdCIsImRvY0NoYWluIiwibW9kZWxOYW1lIiwic3RyZWFtaW5nIiwiQm9vbGVhbiIsImNhbGxiYWNrTWFuYWdlciIsImZyb21IYW5kbGVycyIsImhhbmRsZUxMTU5ld1Rva2VuIiwidG9rZW4iLCJjb25zb2xlIiwibG9nIiwidW5kZWZpbmVkIiwiY29tYmluZURvY3VtZW50c0NoYWluIiwicXVlc3Rpb25HZW5lcmF0b3JDaGFpbiIsInJldHVyblNvdXJjZURvY3VtZW50cyIsImsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./utils/makechain.ts\n");

/***/ }),

/***/ "(api)/./utils/pinecone-client.ts":
/*!**********************************!*\
  !*** ./utils/pinecone-client.ts ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"pinecone\": () => (/* binding */ pinecone)\n/* harmony export */ });\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pinecone-database/pinecone */ \"@pinecone-database/pinecone\");\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__);\n\nif (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {\n    throw new Error(\"Pinecone environment or api key vars missing\");\n}\nasync function initPinecone() {\n    try {\n        const pinecone = new _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__.PineconeClient();\n        await pinecone.init({\n            environment: \"northamerica-northeast1-gcp\",\n            apiKey: \"7f2b5253-e114-42db-8cdf-0327f5651ed9\"\n        });\n        return pinecone;\n    } catch (error) {\n        console.log(\"error\", error);\n        throw new Error(\"Failed to initialize Pinecone Client\");\n    }\n}\nconst pinecone = await initPinecone();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9waW5lY29uZS1jbGllbnQudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUE2RDtBQUU3RCxJQUFJLENBQUNDLFFBQVFDLEdBQUcsQ0FBQ0Msb0JBQW9CLElBQUksQ0FBQ0YsUUFBUUMsR0FBRyxDQUFDRSxnQkFBZ0IsRUFBRTtJQUN0RSxNQUFNLElBQUlDLE1BQU0sZ0RBQWdEO0FBQ2xFLENBQUM7QUFFRCxlQUFlQyxlQUFlO0lBQzVCLElBQUk7UUFDRixNQUFNQyxXQUFXLElBQUlQLHVFQUFjQTtRQUVuQyxNQUFNTyxTQUFTQyxJQUFJLENBQUM7WUFDbEJDLGFBQWE7WUFDYkMsUUFBTztRQUNUO1FBRUEsT0FBT0g7SUFDVCxFQUFFLE9BQU9JLE9BQU87UUFDZEMsUUFBUUMsR0FBRyxDQUFDLFNBQVNGO1FBQ3JCLE1BQU0sSUFBSU4sTUFBTSx3Q0FBd0M7SUFDMUQ7QUFDRjtBQUVPLE1BQU1FLFdBQVcsTUFBTUQsZUFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRib3QvLi91dGlscy9waW5lY29uZS1jbGllbnQudHM/ZGYzNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaW5lY29uZUNsaWVudCB9IGZyb20gJ0BwaW5lY29uZS1kYXRhYmFzZS9waW5lY29uZSc7XHJcblxyXG5pZiAoIXByb2Nlc3MuZW52LlBJTkVDT05FX0VOVklST05NRU5UIHx8ICFwcm9jZXNzLmVudi5QSU5FQ09ORV9BUElfS0VZKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKCdQaW5lY29uZSBlbnZpcm9ubWVudCBvciBhcGkga2V5IHZhcnMgbWlzc2luZycpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbml0UGluZWNvbmUoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHBpbmVjb25lID0gbmV3IFBpbmVjb25lQ2xpZW50KCk7XHJcblxyXG4gICAgYXdhaXQgcGluZWNvbmUuaW5pdCh7XHJcbiAgICAgIGVudmlyb25tZW50OiBcIm5vcnRoYW1lcmljYS1ub3J0aGVhc3QxLWdjcFwiICwgLy90aGlzIGlzIGluIHRoZSBkYXNoYm9hcmRcclxuICAgICAgYXBpS2V5Oic3ZjJiNTI1My1lMTE0LTQyZGItOGNkZi0wMzI3ZjU2NTFlZDknLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHBpbmVjb25lO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlcnJvcik7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBpbml0aWFsaXplIFBpbmVjb25lIENsaWVudCcpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHBpbmVjb25lID0gYXdhaXQgaW5pdFBpbmVjb25lKCk7Il0sIm5hbWVzIjpbIlBpbmVjb25lQ2xpZW50IiwicHJvY2VzcyIsImVudiIsIlBJTkVDT05FX0VOVklST05NRU5UIiwiUElORUNPTkVfQVBJX0tFWSIsIkVycm9yIiwiaW5pdFBpbmVjb25lIiwicGluZWNvbmUiLCJpbml0IiwiZW52aXJvbm1lbnQiLCJhcGlLZXkiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./utils/pinecone-client.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/chat.ts"));
module.exports = __webpack_exports__;

})();