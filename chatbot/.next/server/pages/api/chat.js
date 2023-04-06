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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PINECONE_INDEX_NAME\": () => (/* binding */ PINECONE_INDEX_NAME)\n/* harmony export */ });\n/**\n * Change the index and namespace to your own\n */ const PINECONE_INDEX_NAME = \"edtech\";\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9jb25maWcvcGluZWNvbmUudHMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztDQUVDLEdBRUQsTUFBTUEsc0JBQXNCO0FBRUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0Ym90Ly4vY29uZmlnL3BpbmVjb25lLnRzPzZmMDkiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDaGFuZ2UgdGhlIGluZGV4IGFuZCBuYW1lc3BhY2UgdG8geW91ciBvd25cbiAqL1xuXG5jb25zdCBQSU5FQ09ORV9JTkRFWF9OQU1FID0gJ2VkdGVjaCc7XG5cbmV4cG9ydHsgUElORUNPTkVfSU5ERVhfTkFNRX07Il0sIm5hbWVzIjpbIlBJTkVDT05FX0lOREVYX05BTUUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./config/pinecone.ts\n");

/***/ }),

/***/ "(api)/./pages/api/chat.ts":
/*!***************************!*\
  !*** ./pages/api/chat.ts ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! langchain/embeddings */ \"langchain/embeddings\");\n/* harmony import */ var langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! langchain/vectorstores */ \"langchain/vectorstores\");\n/* harmony import */ var _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/pinecone-client */ \"(api)/./utils/pinecone-client.ts\");\n/* harmony import */ var _utils_makechain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/makechain */ \"(api)/./utils/makechain.ts\");\n/* harmony import */ var _config_pinecone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/config/pinecone */ \"(api)/./config/pinecone.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__, _utils_makechain__WEBPACK_IMPORTED_MODULE_3__]);\n([langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__, _utils_makechain__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\nasync function handler(req, res) {\n    const { question , history  } = req.body;\n    if (!question) {\n        return res.status(400).json({\n            message: \"No question in the request\"\n        });\n    }\n    // OpenAI recommends replacing newlines with spaces for best results\n    const sanitizedQuestion = question.trim().replaceAll(\"\\n\", \" \");\n    const index = _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__.pinecone.Index(_config_pinecone__WEBPACK_IMPORTED_MODULE_4__.PINECONE_INDEX_NAME);\n    /* create vectorstore*/ const vectorStore = await langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__.PineconeStore.fromExistingIndex(index, new langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__.OpenAIEmbeddings({\n        openAIApiKey: \"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\"\n    }), \"text\");\n    res.writeHead(200, {\n        \"Content-Type\": \"text/event-stream\",\n        \"Cache-Control\": \"no-cache, no-transform\",\n        Connection: \"keep-alive\"\n    });\n    const sendData = (data)=>{\n        res.write(`data: ${data}\\n\\n`);\n    };\n    sendData(JSON.stringify({\n        data: \"\"\n    }));\n    //create chain\n    const chain = (0,_utils_makechain__WEBPACK_IMPORTED_MODULE_3__.makeChain)(vectorStore, (token)=>{\n        sendData(JSON.stringify({\n            data: token\n        }));\n    });\n    try {\n        //Ask a question\n        const response = await chain.call({\n            question: sanitizedQuestion,\n            chat_history: history || []\n        });\n        console.log(\"response\", response);\n        sendData(JSON.stringify({\n            sourceDocs: response.sourceDocuments\n        }));\n    } catch (error) {\n        console.log(\"error\", error);\n    } finally{\n        sendData(\"[DONE]\");\n        res.end();\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY2hhdC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDd0Q7QUFDRDtBQUNKO0FBQ0w7QUFDUztBQUd4QyxlQUFlSyxRQUMxQkMsR0FBbUIsRUFDbkJDLEdBQW9CLEVBQ3BCO0lBQ0EsTUFBTSxFQUFFQyxTQUFRLEVBQUVDLFFBQU8sRUFBRSxHQUFHSCxJQUFJSSxJQUFJO0lBRXRDLElBQUksQ0FBQ0YsVUFBVTtRQUNiLE9BQU9ELElBQUlJLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUE2QjtJQUN0RSxDQUFDO0lBQ0Qsb0VBQW9FO0lBQ3BFLE1BQU1DLG9CQUFvQk4sU0FBU08sSUFBSSxHQUFHQyxVQUFVLENBQUMsTUFBTTtJQUUzRCxNQUFNQyxRQUFRZixrRUFBYyxDQUFDRSxpRUFBbUJBO0lBRWhELHFCQUFxQixHQUNyQixNQUFNZSxjQUFjLE1BQU1sQixtRkFBK0IsQ0FDdkRnQixPQUNBLElBQUlqQixrRUFBZ0JBLENBQUM7UUFBQ3FCLGNBQWE7SUFBcUQsSUFDeEY7SUFJRmQsSUFBSWUsU0FBUyxDQUFDLEtBQUs7UUFDakIsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQkMsWUFBWTtJQUNkO0lBRUEsTUFBTUMsV0FBVyxDQUFDQyxPQUFpQjtRQUNqQ2xCLElBQUltQixLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUVELEtBQUssSUFBSSxDQUFDO0lBQy9CO0lBRUFELFNBQVNHLEtBQUtDLFNBQVMsQ0FBQztRQUFFSCxNQUFNO0lBQUc7SUFFbkMsY0FBYztJQUNkLE1BQU1JLFFBQVExQiwyREFBU0EsQ0FBQ2dCLGFBQWEsQ0FBQ1csUUFBa0I7UUFDdEROLFNBQVNHLEtBQUtDLFNBQVMsQ0FBQztZQUFFSCxNQUFNSztRQUFNO0lBQ3hDO0lBRUEsSUFBSTtRQUNGLGdCQUFnQjtRQUNoQixNQUFNQyxXQUFXLE1BQU1GLE1BQU1HLElBQUksQ0FBQztZQUNoQ3hCLFVBQVVNO1lBQ1ZtQixjQUFjeEIsV0FBVyxFQUFFO1FBQzdCO1FBRUF5QixRQUFRQyxHQUFHLENBQUMsWUFBWUo7UUFDeEJQLFNBQVNHLEtBQUtDLFNBQVMsQ0FBQztZQUFFUSxZQUFZTCxTQUFTTSxlQUFlO1FBQUM7SUFDakUsRUFBRSxPQUFPQyxPQUFPO1FBQ2RKLFFBQVFDLEdBQUcsQ0FBQyxTQUFTRztJQUN2QixTQUFVO1FBQ1JkLFNBQVM7UUFDVGpCLElBQUlnQyxHQUFHO0lBQ1Q7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hhdGJvdC8uL3BhZ2VzL2FwaS9jaGF0LnRzP2M1NzciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlfSBmcm9tIFwibmV4dFwiO1xuaW1wb3J0IHsgT3BlbkFJRW1iZWRkaW5ncyB9IGZyb20gXCJsYW5nY2hhaW4vZW1iZWRkaW5nc1wiO1xuaW1wb3J0IHsgUGluZWNvbmVTdG9yZSB9IGZyb20gXCJsYW5nY2hhaW4vdmVjdG9yc3RvcmVzXCI7IFxuaW1wb3J0IHsgcGluZWNvbmUgfSBmcm9tIFwiQC91dGlscy9waW5lY29uZS1jbGllbnRcIjtcbmltcG9ydCB7IG1ha2VDaGFpbiB9IGZyb20gXCJAL3V0aWxzL21ha2VjaGFpblwiO1xuaW1wb3J0IHsgUElORUNPTkVfSU5ERVhfTkFNRX0gZnJvbSBcIkAvY29uZmlnL3BpbmVjb25lXCI7XG5pbXBvcnQgeyBJbXBvcnQgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoXG4gICAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcbiAgICByZXM6IE5leHRBcGlSZXNwb25zZSxcbiAgKSB7XG4gICAgY29uc3QgeyBxdWVzdGlvbiwgaGlzdG9yeSB9ID0gcmVxLmJvZHk7XG4gIFxuICAgIGlmICghcXVlc3Rpb24pIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6ICdObyBxdWVzdGlvbiBpbiB0aGUgcmVxdWVzdCcgfSk7XG4gICAgfVxuICAgIC8vIE9wZW5BSSByZWNvbW1lbmRzIHJlcGxhY2luZyBuZXdsaW5lcyB3aXRoIHNwYWNlcyBmb3IgYmVzdCByZXN1bHRzXG4gICAgY29uc3Qgc2FuaXRpemVkUXVlc3Rpb24gPSBxdWVzdGlvbi50cmltKCkucmVwbGFjZUFsbCgnXFxuJywgJyAnKTtcbiAgXG4gICAgY29uc3QgaW5kZXggPSBwaW5lY29uZS5JbmRleChQSU5FQ09ORV9JTkRFWF9OQU1FKTtcbiAgXG4gICAgLyogY3JlYXRlIHZlY3RvcnN0b3JlKi9cbiAgICBjb25zdCB2ZWN0b3JTdG9yZSA9IGF3YWl0IFBpbmVjb25lU3RvcmUuZnJvbUV4aXN0aW5nSW5kZXgoXG4gICAgICBpbmRleCxcbiAgICAgIG5ldyBPcGVuQUlFbWJlZGRpbmdzKHtvcGVuQUlBcGlLZXk6J3NrLUJ2Zm9OMnhscTRIUldMR2Rjc2dwVDNCbGJrRkppa1g4WG9nU3U5WEQ3Qm5vZDhXdyd9KSxcbiAgICAgICd0ZXh0JyxcbiAgICAgIC8vUElORUNPTkVfTkFNRVNQQUNFLCAvL29wdGlvbmFsXG4gICAgKTtcbiAgXG4gICAgcmVzLndyaXRlSGVhZCgyMDAsIHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9ldmVudC1zdHJlYW0nLFxuICAgICAgJ0NhY2hlLUNvbnRyb2wnOiAnbm8tY2FjaGUsIG5vLXRyYW5zZm9ybScsXG4gICAgICBDb25uZWN0aW9uOiAna2VlcC1hbGl2ZScsXG4gICAgfSk7XG4gIFxuICAgIGNvbnN0IHNlbmREYXRhID0gKGRhdGE6IHN0cmluZykgPT4ge1xuICAgICAgcmVzLndyaXRlKGBkYXRhOiAke2RhdGF9XFxuXFxuYCk7XG4gICAgfTtcbiAgXG4gICAgc2VuZERhdGEoSlNPTi5zdHJpbmdpZnkoeyBkYXRhOiAnJyB9KSk7XG4gIFxuICAgIC8vY3JlYXRlIGNoYWluXG4gICAgY29uc3QgY2hhaW4gPSBtYWtlQ2hhaW4odmVjdG9yU3RvcmUsICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICBzZW5kRGF0YShKU09OLnN0cmluZ2lmeSh7IGRhdGE6IHRva2VuIH0pKTtcbiAgICB9KTtcbiAgXG4gICAgdHJ5IHtcbiAgICAgIC8vQXNrIGEgcXVlc3Rpb25cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2hhaW4uY2FsbCh7XG4gICAgICAgIHF1ZXN0aW9uOiBzYW5pdGl6ZWRRdWVzdGlvbixcbiAgICAgICAgY2hhdF9oaXN0b3J5OiBoaXN0b3J5IHx8IFtdLFxuICAgICAgfSk7XG4gIFxuICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgICAgc2VuZERhdGEoSlNPTi5zdHJpbmdpZnkoeyBzb3VyY2VEb2NzOiByZXNwb25zZS5zb3VyY2VEb2N1bWVudHMgfSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlcnJvcik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNlbmREYXRhKCdbRE9ORV0nKTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9XG4gIH1cblxuIl0sIm5hbWVzIjpbIk9wZW5BSUVtYmVkZGluZ3MiLCJQaW5lY29uZVN0b3JlIiwicGluZWNvbmUiLCJtYWtlQ2hhaW4iLCJQSU5FQ09ORV9JTkRFWF9OQU1FIiwiaGFuZGxlciIsInJlcSIsInJlcyIsInF1ZXN0aW9uIiwiaGlzdG9yeSIsImJvZHkiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsInNhbml0aXplZFF1ZXN0aW9uIiwidHJpbSIsInJlcGxhY2VBbGwiLCJpbmRleCIsIkluZGV4IiwidmVjdG9yU3RvcmUiLCJmcm9tRXhpc3RpbmdJbmRleCIsIm9wZW5BSUFwaUtleSIsIndyaXRlSGVhZCIsIkNvbm5lY3Rpb24iLCJzZW5kRGF0YSIsImRhdGEiLCJ3cml0ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjaGFpbiIsInRva2VuIiwicmVzcG9uc2UiLCJjYWxsIiwiY2hhdF9oaXN0b3J5IiwiY29uc29sZSIsImxvZyIsInNvdXJjZURvY3MiLCJzb3VyY2VEb2N1bWVudHMiLCJlcnJvciIsImVuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/chat.ts\n");

/***/ }),

/***/ "(api)/./utils/makechain.ts":
/*!****************************!*\
  !*** ./utils/makechain.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeChain\": () => (/* binding */ makeChain)\n/* harmony export */ });\n/* harmony import */ var langchain_llms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! langchain/llms */ \"langchain/llms\");\n/* harmony import */ var langchain_chains__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! langchain/chains */ \"langchain/chains\");\n/* harmony import */ var langchain_prompts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! langchain/prompts */ \"langchain/prompts\");\n/* harmony import */ var langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! langchain/callbacks */ \"langchain/callbacks\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_llms__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__, langchain_prompts__WEBPACK_IMPORTED_MODULE_2__, langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__]);\n([langchain_llms__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__, langchain_prompts__WEBPACK_IMPORTED_MODULE_2__, langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\nconst CONDENSE_PROMPT = langchain_prompts__WEBPACK_IMPORTED_MODULE_2__.PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.\nChat History:\n{chat_history}\nFollow Up Input: {question}\nStandalone question:`);\nconst QA_PROMPT = langchain_prompts__WEBPACK_IMPORTED_MODULE_2__.PromptTemplate.fromTemplate(`You are an AI assistant providing helpful on education documents. You are given the following extracted parts of a long document and a question. Provide a conversational answer based on the context provided.\n  You should only provide hyperlinks that reference the context below. Do NOT make up hyperlinks.\n  If the question is not related to the context, you must not answer the question and instead say Sorry this is not related to the question. It is very important \n  you only provide information relevant to the document.\n  Question: {question}\n  =========\n  {context}\n  =========\n  Answer in Markdown:`);\nconst makeChain = (vectorstore, onTokenStream)=>{\n    const question = new langchain_chains__WEBPACK_IMPORTED_MODULE_1__.LLMChain({\n        llm: new langchain_llms__WEBPACK_IMPORTED_MODULE_0__.OpenAIChat({\n            temperature: 0,\n            openAIApiKey: \"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\"\n        }),\n        prompt: CONDENSE_PROMPT\n    });\n    const docChain = (0,langchain_chains__WEBPACK_IMPORTED_MODULE_1__.loadQAChain)(new langchain_llms__WEBPACK_IMPORTED_MODULE_0__.OpenAIChat({\n        openAIApiKey: \"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\",\n        temperature: 0,\n        modelName: \"gpt-4\",\n        streaming: Boolean(onTokenStream),\n        callbackManager: onTokenStream ? langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__.CallbackManager.fromHandlers({\n            async handleLLMNewToken (token) {\n                onTokenStream(token);\n                console.log(token);\n            }\n        }) : undefined\n    }), {\n        prompt: QA_PROMPT\n    });\n    return new langchain_chains__WEBPACK_IMPORTED_MODULE_1__.ChatVectorDBQAChain({\n        vectorstore,\n        combineDocumentsChain: docChain,\n        questionGeneratorChain: question,\n        returnSourceDocuments: true,\n        k: 2\n    });\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9tYWtlY2hhaW4udHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBNEM7QUFDaUM7QUFFMUI7QUFDRztBQUV0RCxNQUFNTSxrQkFBb0JGLDBFQUEyQixDQUFDLENBQUM7Ozs7b0JBSW5DLENBQUM7QUFFckIsTUFBTUksWUFBWUosMEVBQTJCLENBQ3pDLENBQUM7Ozs7Ozs7O3FCQVFnQixDQUFDO0FBR2YsTUFBTUssWUFBWSxDQUNyQkMsYUFDQUMsZ0JBQ0M7SUFDRCxNQUFNQyxXQUFXLElBQUlYLHNEQUFRQSxDQUFDO1FBQzFCWSxLQUFLLElBQUliLHNEQUFVQSxDQUFDO1lBQUNjLGFBQWE7WUFDbENDLGNBQWM7UUFBcUQ7UUFDbkVDLFFBQVFWO0lBQ1o7SUFDQSxNQUFNVyxXQUFXZCw2REFBV0EsQ0FDeEIsSUFBSUgsc0RBQVVBLENBQUM7UUFDYmUsY0FBYztRQUNaRCxhQUFhO1FBQ25CSSxXQUFXO1FBQ1hDLFdBQVdDLFFBQVFUO1FBQ25CVSxpQkFBaUJWLGdCQUNiTiw2RUFBNEIsQ0FBQztZQUMzQixNQUFNa0IsbUJBQWtCQyxLQUFLLEVBQUU7Z0JBQzdCYixjQUFjYTtnQkFDZEMsUUFBUUMsR0FBRyxDQUFDRjtZQUNkO1FBQ0osS0FDRUcsU0FBUztJQUNYLElBQ0o7UUFBQ1gsUUFBUVI7SUFBUztJQUdsQixPQUFPLElBQUlOLGlFQUFtQkEsQ0FBQztRQUMzQlE7UUFDQWtCLHVCQUF1Qlg7UUFDeEJZLHdCQUF3QmpCO1FBQ3ZCa0IsdUJBQXVCLElBQUk7UUFDM0JDLEdBQUc7SUFDTDtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0Ym90Ly4vdXRpbHMvbWFrZWNoYWluLnRzP2NmYTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlbkFJQ2hhdCB9IGZyb20gXCJsYW5nY2hhaW4vbGxtc1wiO1xuaW1wb3J0IHsgTExNQ2hhaW4sIENoYXRWZWN0b3JEQlFBQ2hhaW4sIGxvYWRRQUNoYWlufSBmcm9tIFwibGFuZ2NoYWluL2NoYWluc1wiO1xuaW1wb3J0IHsgUGluZWNvbmVTdG9yZSB9IGZyb20gXCJsYW5nY2hhaW4vdmVjdG9yc3RvcmVzXCI7XG5pbXBvcnQgeyBQcm9tcHRUZW1wbGF0ZSB9IGZyb20gXCJsYW5nY2hhaW4vcHJvbXB0c1wiO1xuaW1wb3J0IHsgQ2FsbGJhY2tNYW5hZ2VyIH0gZnJvbSBcImxhbmdjaGFpbi9jYWxsYmFja3NcIjtcblxuY29uc3QgQ09OREVOU0VfUFJPTVBUID0gICBQcm9tcHRUZW1wbGF0ZS5mcm9tVGVtcGxhdGUoYEdpdmVuIHRoZSBmb2xsb3dpbmcgY29udmVyc2F0aW9uIGFuZCBhIGZvbGxvdyB1cCBxdWVzdGlvbiwgcmVwaHJhc2UgdGhlIGZvbGxvdyB1cCBxdWVzdGlvbiB0byBiZSBhIHN0YW5kYWxvbmUgcXVlc3Rpb24uXG5DaGF0IEhpc3Rvcnk6XG57Y2hhdF9oaXN0b3J5fVxuRm9sbG93IFVwIElucHV0OiB7cXVlc3Rpb259XG5TdGFuZGFsb25lIHF1ZXN0aW9uOmApO1xuXG5jb25zdCBRQV9QUk9NUFQgPSBQcm9tcHRUZW1wbGF0ZS5mcm9tVGVtcGxhdGUoXG4gICAgYFlvdSBhcmUgYW4gQUkgYXNzaXN0YW50IHByb3ZpZGluZyBoZWxwZnVsIG9uIGVkdWNhdGlvbiBkb2N1bWVudHMuIFlvdSBhcmUgZ2l2ZW4gdGhlIGZvbGxvd2luZyBleHRyYWN0ZWQgcGFydHMgb2YgYSBsb25nIGRvY3VtZW50IGFuZCBhIHF1ZXN0aW9uLiBQcm92aWRlIGEgY29udmVyc2F0aW9uYWwgYW5zd2VyIGJhc2VkIG9uIHRoZSBjb250ZXh0IHByb3ZpZGVkLlxuICBZb3Ugc2hvdWxkIG9ubHkgcHJvdmlkZSBoeXBlcmxpbmtzIHRoYXQgcmVmZXJlbmNlIHRoZSBjb250ZXh0IGJlbG93LiBEbyBOT1QgbWFrZSB1cCBoeXBlcmxpbmtzLlxuICBJZiB0aGUgcXVlc3Rpb24gaXMgbm90IHJlbGF0ZWQgdG8gdGhlIGNvbnRleHQsIHlvdSBtdXN0IG5vdCBhbnN3ZXIgdGhlIHF1ZXN0aW9uIGFuZCBpbnN0ZWFkIHNheSBTb3JyeSB0aGlzIGlzIG5vdCByZWxhdGVkIHRvIHRoZSBxdWVzdGlvbi4gSXQgaXMgdmVyeSBpbXBvcnRhbnQgXG4gIHlvdSBvbmx5IHByb3ZpZGUgaW5mb3JtYXRpb24gcmVsZXZhbnQgdG8gdGhlIGRvY3VtZW50LlxuICBRdWVzdGlvbjoge3F1ZXN0aW9ufVxuICA9PT09PT09PT1cbiAge2NvbnRleHR9XG4gID09PT09PT09PVxuICBBbnN3ZXIgaW4gTWFya2Rvd246YCxcbiAgKTtcblxuZXhwb3J0IGNvbnN0IG1ha2VDaGFpbiA9IChcbiAgICB2ZWN0b3JzdG9yZTogUGluZWNvbmVTdG9yZSxcbiAgICBvblRva2VuU3RyZWFtPzogKHRva2VuOiBzdHJpbmcpID0+IHZvaWQsXG4pID0+IHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBMTE1DaGFpbih7XG4gICAgICAgIGxsbTogbmV3IE9wZW5BSUNoYXQoe3RlbXBlcmF0dXJlOiAwLFxuICAgICAgICBvcGVuQUlBcGlLZXk6ICdzay1CdmZvTjJ4bHE0SFJXTEdkY3NncFQzQmxia0ZKaWtYOFhvZ1N1OVhEN0Jub2Q4V3cnfSksXG4gICAgICAgIHByb21wdDogQ09OREVOU0VfUFJPTVBULFxuICAgIH0pO1xuICAgIGNvbnN0IGRvY0NoYWluID0gbG9hZFFBQ2hhaW4oXG4gICAgICAgIG5ldyBPcGVuQUlDaGF0KHtcbiAgICAgICAgICBvcGVuQUlBcGlLZXk6ICdzay1CdmZvTjJ4bHE0SFJXTEdkY3NncFQzQmxia0ZKaWtYOFhvZ1N1OVhEN0Jub2Q4V3cnLFxuICAgICAgICAgICAgdGVtcGVyYXR1cmU6IDAsXG4gICAgICBtb2RlbE5hbWU6ICdncHQtNCcsIFxuICAgICAgc3RyZWFtaW5nOiBCb29sZWFuKG9uVG9rZW5TdHJlYW0pLFxuICAgICAgY2FsbGJhY2tNYW5hZ2VyOiBvblRva2VuU3RyZWFtXG4gICAgICAgID8gQ2FsbGJhY2tNYW5hZ2VyLmZyb21IYW5kbGVycyh7XG4gICAgICAgICAgICBhc3luYyBoYW5kbGVMTE1OZXdUb2tlbih0b2tlbikge1xuICAgICAgICAgICAgICBvblRva2VuU3RyZWFtKHRva2VuKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codG9rZW4pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgfSksXG4gICAge3Byb21wdDogUUFfUFJPTVBUfVxuICAgICk7XG5cbiAgICByZXR1cm4gbmV3IENoYXRWZWN0b3JEQlFBQ2hhaW4oe1xuICAgICAgICB2ZWN0b3JzdG9yZSxcbiAgICAgICAgY29tYmluZURvY3VtZW50c0NoYWluOiBkb2NDaGFpbixcbiAgICAgICBxdWVzdGlvbkdlbmVyYXRvckNoYWluOiBxdWVzdGlvbixcbiAgICAgICAgcmV0dXJuU291cmNlRG9jdW1lbnRzOiB0cnVlLFxuICAgICAgICBrOiAyLCAvL251bWJlciBvZiBzb3VyY2UgZG9jdW1lbnRzIHRvIHJldHVyblxuICAgICAgfSk7XG4gICAgfTtcbiAgICAiXSwibmFtZXMiOlsiT3BlbkFJQ2hhdCIsIkxMTUNoYWluIiwiQ2hhdFZlY3RvckRCUUFDaGFpbiIsImxvYWRRQUNoYWluIiwiUHJvbXB0VGVtcGxhdGUiLCJDYWxsYmFja01hbmFnZXIiLCJDT05ERU5TRV9QUk9NUFQiLCJmcm9tVGVtcGxhdGUiLCJRQV9QUk9NUFQiLCJtYWtlQ2hhaW4iLCJ2ZWN0b3JzdG9yZSIsIm9uVG9rZW5TdHJlYW0iLCJxdWVzdGlvbiIsImxsbSIsInRlbXBlcmF0dXJlIiwib3BlbkFJQXBpS2V5IiwicHJvbXB0IiwiZG9jQ2hhaW4iLCJtb2RlbE5hbWUiLCJzdHJlYW1pbmciLCJCb29sZWFuIiwiY2FsbGJhY2tNYW5hZ2VyIiwiZnJvbUhhbmRsZXJzIiwiaGFuZGxlTExNTmV3VG9rZW4iLCJ0b2tlbiIsImNvbnNvbGUiLCJsb2ciLCJ1bmRlZmluZWQiLCJjb21iaW5lRG9jdW1lbnRzQ2hhaW4iLCJxdWVzdGlvbkdlbmVyYXRvckNoYWluIiwicmV0dXJuU291cmNlRG9jdW1lbnRzIiwiayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./utils/makechain.ts\n");

/***/ }),

/***/ "(api)/./utils/pinecone-client.ts":
/*!**********************************!*\
  !*** ./utils/pinecone-client.ts ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"pinecone\": () => (/* binding */ pinecone)\n/* harmony export */ });\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pinecone-database/pinecone */ \"@pinecone-database/pinecone\");\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__);\n\nconsole.log(process.env.PINECONE_ENVIRONMENT);\nif (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {\n    throw new Error(\"Pinecone environment or api key vars missing\");\n}\nasync function initPinecone() {\n    try {\n        const pinecone = new _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__.PineconeClient();\n        await pinecone.init({\n            environment: process.env.PINECONE_ENVIRONMENT ?? \"\",\n            apiKey: process.env.PINECONE_API_KEY ?? \"\"\n        });\n        return pinecone;\n    } catch (error) {\n        console.log(\"error\", error);\n        throw new Error(\"Failed to initialize Pinecone Client\");\n    }\n}\nconst pinecone = await initPinecone();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9waW5lY29uZS1jbGllbnQudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUE2RDtBQUU3REMsUUFBUUMsR0FBRyxDQUFDQyxRQUFRQyxHQUFHLENBQUNDLG9CQUFvQjtBQUM1QyxJQUFJLENBQUNGLFFBQVFDLEdBQUcsQ0FBQ0Msb0JBQW9CLElBQUksQ0FBQ0YsUUFBUUMsR0FBRyxDQUFDRSxnQkFBZ0IsRUFBRTtJQUN0RSxNQUFNLElBQUlDLE1BQU0sZ0RBQWdEO0FBQ2xFLENBQUM7QUFFRCxlQUFlQyxlQUFlO0lBQzVCLElBQUk7UUFDRixNQUFNQyxXQUFXLElBQUlULHVFQUFjQTtRQUVuQyxNQUFNUyxTQUFTQyxJQUFJLENBQUM7WUFDbEJDLGFBQWFSLFFBQVFDLEdBQUcsQ0FBQ0Msb0JBQW9CLElBQUk7WUFDakRPLFFBQVFULFFBQVFDLEdBQUcsQ0FBQ0UsZ0JBQWdCLElBQUk7UUFDMUM7UUFFQSxPQUFPRztJQUNULEVBQUUsT0FBT0ksT0FBTztRQUNkWixRQUFRQyxHQUFHLENBQUMsU0FBU1c7UUFDckIsTUFBTSxJQUFJTixNQUFNLHdDQUF3QztJQUMxRDtBQUNGO0FBRU8sTUFBTUUsV0FBVyxNQUFNRCxlQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hhdGJvdC8uL3V0aWxzL3BpbmVjb25lLWNsaWVudC50cz9kZjM0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpbmVjb25lQ2xpZW50IH0gZnJvbSAnQHBpbmVjb25lLWRhdGFiYXNlL3BpbmVjb25lJztcblxuY29uc29sZS5sb2cocHJvY2Vzcy5lbnYuUElORUNPTkVfRU5WSVJPTk1FTlQpO1xuaWYgKCFwcm9jZXNzLmVudi5QSU5FQ09ORV9FTlZJUk9OTUVOVCB8fCAhcHJvY2Vzcy5lbnYuUElORUNPTkVfQVBJX0tFWSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1BpbmVjb25lIGVudmlyb25tZW50IG9yIGFwaSBrZXkgdmFycyBtaXNzaW5nJyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXRQaW5lY29uZSgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwaW5lY29uZSA9IG5ldyBQaW5lY29uZUNsaWVudCgpO1xuXG4gICAgYXdhaXQgcGluZWNvbmUuaW5pdCh7XG4gICAgICBlbnZpcm9ubWVudDogcHJvY2Vzcy5lbnYuUElORUNPTkVfRU5WSVJPTk1FTlQgPz8gJycsIC8vdGhpcyBpcyBpbiB0aGUgZGFzaGJvYXJkXG4gICAgICBhcGlLZXk6IHByb2Nlc3MuZW52LlBJTkVDT05FX0FQSV9LRVkgPz8gJycsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGluZWNvbmU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyb3IpO1xuICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGluaXRpYWxpemUgUGluZWNvbmUgQ2xpZW50Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHBpbmVjb25lID0gYXdhaXQgaW5pdFBpbmVjb25lKCk7XG4iXSwibmFtZXMiOlsiUGluZWNvbmVDbGllbnQiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsImVudiIsIlBJTkVDT05FX0VOVklST05NRU5UIiwiUElORUNPTkVfQVBJX0tFWSIsIkVycm9yIiwiaW5pdFBpbmVjb25lIiwicGluZWNvbmUiLCJpbml0IiwiZW52aXJvbm1lbnQiLCJhcGlLZXkiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./utils/pinecone-client.ts\n");

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