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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PINECONE_INDEX_NAME\": () => (/* binding */ PINECONE_INDEX_NAME)\n/* harmony export */ });\n/**\n * Change the index and namespace to your own\n */ const PINECONE_INDEX_NAME = \"edtech-gpt\";\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9jb25maWcvcGluZWNvbmUudHMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztDQUVDLEdBRUQsTUFBTUEsc0JBQXNCO0FBRUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0Ym90Ly4vY29uZmlnL3BpbmVjb25lLnRzPzZmMDkiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDaGFuZ2UgdGhlIGluZGV4IGFuZCBuYW1lc3BhY2UgdG8geW91ciBvd25cbiAqL1xuXG5jb25zdCBQSU5FQ09ORV9JTkRFWF9OQU1FID0gJ2VkdGVjaC1ncHQnO1xuXG5leHBvcnR7IFBJTkVDT05FX0lOREVYX05BTUV9OyJdLCJuYW1lcyI6WyJQSU5FQ09ORV9JTkRFWF9OQU1FIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./config/pinecone.ts\n");

/***/ }),

/***/ "(api)/./pages/api/chat.ts":
/*!***************************!*\
  !*** ./pages/api/chat.ts ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! langchain/embeddings */ \"langchain/embeddings\");\n/* harmony import */ var langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! langchain/vectorstores */ \"langchain/vectorstores\");\n/* harmony import */ var _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/pinecone-client */ \"(api)/./utils/pinecone-client.ts\");\n/* harmony import */ var _utils_makechain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/makechain */ \"(api)/./utils/makechain.ts\");\n/* harmony import */ var _config_pinecone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/config/pinecone */ \"(api)/./config/pinecone.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__, _utils_makechain__WEBPACK_IMPORTED_MODULE_3__]);\n([langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__, _utils_makechain__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\nasync function handler(req, res) {\n    const { question , history  } = req.body;\n    if (!question) {\n        return res.status(400).json({\n            message: \"No question in the request\"\n        });\n    }\n    // OpenAI recommends replacing newlines with spaces for best results\n    const sanitizedQuestion = question.trim().replaceAll(\"\\n\", \" \");\n    const index = _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__.pinecone.Index(_config_pinecone__WEBPACK_IMPORTED_MODULE_4__.PINECONE_INDEX_NAME);\n    /* create vectorstore*/ const vectorStore = await langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__.PineconeStore.fromExistingIndex(index, new langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__.OpenAIEmbeddings({\n        openAIApiKey: \"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\"\n    }));\n    res.writeHead(200, {\n        \"Content-Type\": \"text/event-stream\",\n        \"Cache-Control\": \"no-cache, no-transform\",\n        Connection: \"keep-alive\"\n    });\n    const sendData = (data)=>{\n        res.write(`data: ${data}\\n\\n`);\n    };\n    sendData(JSON.stringify({\n        data: \"\"\n    }));\n    //create chain\n    const chain = (0,_utils_makechain__WEBPACK_IMPORTED_MODULE_3__.makeChain)(vectorStore, (token)=>{\n        sendData(JSON.stringify({\n            data: token\n        }));\n    });\n    try {\n        //Ask a question\n        const response = await chain.call({\n            question: sanitizedQuestion,\n            chat_history: history || []\n        });\n        console.log(\"response\", response);\n        sendData(JSON.stringify({\n            sourceDocs: response.sourceDocuments\n        }));\n    } catch (error) {\n        console.log(\"error\", error);\n    } finally{\n        sendData(\"[DONE]\");\n        res.end();\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY2hhdC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDd0Q7QUFDRDtBQUNKO0FBQ0w7QUFDUztBQUd4QyxlQUFlSyxRQUM1QkMsR0FBbUIsRUFDbkJDLEdBQW9CLEVBQ3BCO0lBQ0EsTUFBTSxFQUFFQyxTQUFRLEVBQUVDLFFBQU8sRUFBRSxHQUFHSCxJQUFJSSxJQUFJO0lBRXRDLElBQUksQ0FBQ0YsVUFBVTtRQUNiLE9BQU9ELElBQUlJLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUE2QjtJQUN0RSxDQUFDO0lBQ0Qsb0VBQW9FO0lBQ3BFLE1BQU1DLG9CQUFvQk4sU0FBU08sSUFBSSxHQUFHQyxVQUFVLENBQUMsTUFBTTtJQUUzRCxNQUFNQyxRQUFRZixrRUFBYyxDQUFDRSxpRUFBbUJBO0lBRWhELHFCQUFxQixHQUNyQixNQUFNZSxjQUFjLE1BQU1sQixtRkFBK0IsQ0FDckRnQixPQUNBLElBQUlqQixrRUFBZ0JBLENBQUM7UUFBQ3FCLGNBQWE7SUFBcUQ7SUFJNUZkLElBQUllLFNBQVMsQ0FBQyxLQUFLO1FBQ2pCLGdCQUFnQjtRQUNoQixpQkFBaUI7UUFDakJDLFlBQVk7SUFDZDtJQUVBLE1BQU1DLFdBQVcsQ0FBQ0MsT0FBaUI7UUFDakNsQixJQUFJbUIsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFRCxLQUFLLElBQUksQ0FBQztJQUMvQjtJQUVBRCxTQUFTRyxLQUFLQyxTQUFTLENBQUM7UUFBRUgsTUFBTTtJQUFHO0lBRW5DLGNBQWM7SUFDZCxNQUFNSSxRQUFRMUIsMkRBQVNBLENBQUNnQixhQUFhLENBQUNXLFFBQWtCO1FBQ3RETixTQUFTRyxLQUFLQyxTQUFTLENBQUM7WUFBRUgsTUFBTUs7UUFBTTtJQUN4QztJQUVBLElBQUk7UUFDRixnQkFBZ0I7UUFDaEIsTUFBTUMsV0FBVyxNQUFNRixNQUFNRyxJQUFJLENBQUM7WUFDaEN4QixVQUFVTTtZQUNWbUIsY0FBY3hCLFdBQVcsRUFBRTtRQUM3QjtRQUVBeUIsUUFBUUMsR0FBRyxDQUFDLFlBQVlKO1FBQ3hCUCxTQUFTRyxLQUFLQyxTQUFTLENBQUM7WUFBRVEsWUFBWUwsU0FBU00sZUFBZTtRQUFDO0lBQ2pFLEVBQUUsT0FBT0MsT0FBTztRQUNkSixRQUFRQyxHQUFHLENBQUMsU0FBU0c7SUFDdkIsU0FBVTtRQUNSZCxTQUFTO1FBQ1RqQixJQUFJZ0MsR0FBRztJQUNUO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRib3QvLi9wYWdlcy9hcGkvY2hhdC50cz9jNTc3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZX0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCB7IE9wZW5BSUVtYmVkZGluZ3MgfSBmcm9tIFwibGFuZ2NoYWluL2VtYmVkZGluZ3NcIjtcbmltcG9ydCB7IFBpbmVjb25lU3RvcmUgfSBmcm9tIFwibGFuZ2NoYWluL3ZlY3RvcnN0b3Jlc1wiOyBcbmltcG9ydCB7IHBpbmVjb25lIH0gZnJvbSBcIkAvdXRpbHMvcGluZWNvbmUtY2xpZW50XCI7XG5pbXBvcnQgeyBtYWtlQ2hhaW4gfSBmcm9tIFwiQC91dGlscy9tYWtlY2hhaW5cIjtcbmltcG9ydCB7IFBJTkVDT05FX0lOREVYX05BTUV9IGZyb20gXCJAL2NvbmZpZy9waW5lY29uZVwiO1xuaW1wb3J0IHsgSW1wb3J0IH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZSxcbikge1xuICBjb25zdCB7IHF1ZXN0aW9uLCBoaXN0b3J5IH0gPSByZXEuYm9keTtcblxuICBpZiAoIXF1ZXN0aW9uKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogJ05vIHF1ZXN0aW9uIGluIHRoZSByZXF1ZXN0JyB9KTtcbiAgfVxuICAvLyBPcGVuQUkgcmVjb21tZW5kcyByZXBsYWNpbmcgbmV3bGluZXMgd2l0aCBzcGFjZXMgZm9yIGJlc3QgcmVzdWx0c1xuICBjb25zdCBzYW5pdGl6ZWRRdWVzdGlvbiA9IHF1ZXN0aW9uLnRyaW0oKS5yZXBsYWNlQWxsKCdcXG4nLCAnICcpO1xuXG4gIGNvbnN0IGluZGV4ID0gcGluZWNvbmUuSW5kZXgoUElORUNPTkVfSU5ERVhfTkFNRSk7XG5cbiAgLyogY3JlYXRlIHZlY3RvcnN0b3JlKi9cbiAgY29uc3QgdmVjdG9yU3RvcmUgPSBhd2FpdCBQaW5lY29uZVN0b3JlLmZyb21FeGlzdGluZ0luZGV4KFxuICAgICAgaW5kZXgsXG4gICAgICBuZXcgT3BlbkFJRW1iZWRkaW5ncyh7b3BlbkFJQXBpS2V5Oidzay1LU1pRamdmZGZoYlNvOGIzZkhXRFQzQmxia0ZKM2g5dzZ1cDYxQ2pkbDZ6SDJNRXAnfSksXG4gICAgXG4gICk7XG5cbiAgcmVzLndyaXRlSGVhZCgyMDAsIHtcbiAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvZXZlbnQtc3RyZWFtJyxcbiAgICAnQ2FjaGUtQ29udHJvbCc6ICduby1jYWNoZSwgbm8tdHJhbnNmb3JtJyxcbiAgICBDb25uZWN0aW9uOiAna2VlcC1hbGl2ZScsXG4gIH0pO1xuXG4gIGNvbnN0IHNlbmREYXRhID0gKGRhdGE6IHN0cmluZykgPT4ge1xuICAgIHJlcy53cml0ZShgZGF0YTogJHtkYXRhfVxcblxcbmApO1xuICB9O1xuXG4gIHNlbmREYXRhKEpTT04uc3RyaW5naWZ5KHsgZGF0YTogJycgfSkpO1xuXG4gIC8vY3JlYXRlIGNoYWluXG4gIGNvbnN0IGNoYWluID0gbWFrZUNoYWluKHZlY3RvclN0b3JlLCAodG9rZW46IHN0cmluZykgPT4ge1xuICAgIHNlbmREYXRhKEpTT04uc3RyaW5naWZ5KHsgZGF0YTogdG9rZW4gfSkpO1xuICB9KTtcblxuICB0cnkge1xuICAgIC8vQXNrIGEgcXVlc3Rpb25cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNoYWluLmNhbGwoe1xuICAgICAgcXVlc3Rpb246IHNhbml0aXplZFF1ZXN0aW9uLFxuICAgICAgY2hhdF9oaXN0b3J5OiBoaXN0b3J5IHx8IFtdLFxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgIHNlbmREYXRhKEpTT04uc3RyaW5naWZ5KHsgc291cmNlRG9jczogcmVzcG9uc2Uuc291cmNlRG9jdW1lbnRzIH0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlcnJvcik7XG4gIH0gZmluYWxseSB7XG4gICAgc2VuZERhdGEoJ1tET05FXScpO1xuICAgIHJlcy5lbmQoKTtcbiAgfVxufVxuXG4iXSwibmFtZXMiOlsiT3BlbkFJRW1iZWRkaW5ncyIsIlBpbmVjb25lU3RvcmUiLCJwaW5lY29uZSIsIm1ha2VDaGFpbiIsIlBJTkVDT05FX0lOREVYX05BTUUiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwicXVlc3Rpb24iLCJoaXN0b3J5IiwiYm9keSIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwic2FuaXRpemVkUXVlc3Rpb24iLCJ0cmltIiwicmVwbGFjZUFsbCIsImluZGV4IiwiSW5kZXgiLCJ2ZWN0b3JTdG9yZSIsImZyb21FeGlzdGluZ0luZGV4Iiwib3BlbkFJQXBpS2V5Iiwid3JpdGVIZWFkIiwiQ29ubmVjdGlvbiIsInNlbmREYXRhIiwiZGF0YSIsIndyaXRlIiwiSlNPTiIsInN0cmluZ2lmeSIsImNoYWluIiwidG9rZW4iLCJyZXNwb25zZSIsImNhbGwiLCJjaGF0X2hpc3RvcnkiLCJjb25zb2xlIiwibG9nIiwic291cmNlRG9jcyIsInNvdXJjZURvY3VtZW50cyIsImVycm9yIiwiZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/chat.ts\n");

/***/ }),

/***/ "(api)/./utils/makechain.ts":
/*!****************************!*\
  !*** ./utils/makechain.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeChain\": () => (/* binding */ makeChain)\n/* harmony export */ });\n/* harmony import */ var langchain_llms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! langchain/llms */ \"langchain/llms\");\n/* harmony import */ var langchain_chains__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! langchain/chains */ \"langchain/chains\");\n/* harmony import */ var langchain_prompts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! langchain/prompts */ \"langchain/prompts\");\n/* harmony import */ var langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! langchain/callbacks */ \"langchain/callbacks\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_llms__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__, langchain_prompts__WEBPACK_IMPORTED_MODULE_2__, langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__]);\n([langchain_llms__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__, langchain_prompts__WEBPACK_IMPORTED_MODULE_2__, langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\nconst CONDENSE_PROMPT = langchain_prompts__WEBPACK_IMPORTED_MODULE_2__.PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.\nChat History:\n{chat_history}\nFollow Up Input: {question}\nStandalone question:`);\nconst QA_PROMPT = langchain_prompts__WEBPACK_IMPORTED_MODULE_2__.PromptTemplate.fromTemplate(`You are an AI assistant providing helpful on education documents. You are given the following extracted parts of a long document and a question. Provide a conversational answer based on the context provided.\n  Do not provide any hyperlinks or copy references from the document under any circumstances. Do NOT make up hyperlinks.\n  If the question is not related to the context, you must not answer the question and instead say Sorry this is not related to the question. It is very important \n  you only provide information relevant to the document.\n  Question: {question}\n  =========\n  {context}\n  =========\n  Answer in Markdown:`);\nconst makeChain = (vectorstore, onTokenStream)=>{\n    const question = new langchain_chains__WEBPACK_IMPORTED_MODULE_1__.LLMChain({\n        llm: new langchain_llms__WEBPACK_IMPORTED_MODULE_0__.OpenAIChat({\n            temperature: 0,\n            openAIApiKey: \"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\"\n        }),\n        prompt: CONDENSE_PROMPT\n    });\n    const docChain = (0,langchain_chains__WEBPACK_IMPORTED_MODULE_1__.loadQAChain)(new langchain_llms__WEBPACK_IMPORTED_MODULE_0__.OpenAIChat({\n        openAIApiKey: \"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\",\n        temperature: 0,\n        modelName: \"gpt-4\",\n        streaming: Boolean(onTokenStream),\n        callbackManager: onTokenStream ? langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__.CallbackManager.fromHandlers({\n            async handleLLMNewToken (token) {\n                onTokenStream(token);\n                console.log(token);\n            }\n        }) : undefined\n    }), {\n        prompt: QA_PROMPT\n    });\n    return new langchain_chains__WEBPACK_IMPORTED_MODULE_1__.ChatVectorDBQAChain({\n        vectorstore,\n        combineDocumentsChain: docChain,\n        questionGeneratorChain: question,\n        returnSourceDocuments: true,\n        k: 3\n    });\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9tYWtlY2hhaW4udHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBNEM7QUFDaUM7QUFFMUI7QUFDRztBQUV0RCxNQUFNTSxrQkFBb0JGLDBFQUEyQixDQUFDLENBQUM7Ozs7b0JBSW5DLENBQUM7QUFFckIsTUFBTUksWUFBWUosMEVBQTJCLENBQ3pDLENBQUM7Ozs7Ozs7O3FCQVFnQixDQUFDO0FBR2YsTUFBTUssWUFBWSxDQUNyQkMsYUFDQUMsZ0JBQ0M7SUFDRCxNQUFNQyxXQUFXLElBQUlYLHNEQUFRQSxDQUFDO1FBQzFCWSxLQUFLLElBQUliLHNEQUFVQSxDQUFDO1lBQUNjLGFBQWE7WUFDbENDLGNBQWM7UUFBcUQ7UUFDbkVDLFFBQVFWO0lBQ1o7SUFDQSxNQUFNVyxXQUFXZCw2REFBV0EsQ0FDeEIsSUFBSUgsc0RBQVVBLENBQUM7UUFDYmUsY0FBYztRQUNaRCxhQUFhO1FBQ25CSSxXQUFXO1FBQ1hDLFdBQVdDLFFBQVFUO1FBQ25CVSxpQkFBaUJWLGdCQUNiTiw2RUFBNEIsQ0FBQztZQUMzQixNQUFNa0IsbUJBQWtCQyxLQUFLLEVBQUU7Z0JBQzdCYixjQUFjYTtnQkFDZEMsUUFBUUMsR0FBRyxDQUFDRjtZQUNkO1FBQ0osS0FDRUcsU0FBUztJQUNYLElBQ0o7UUFBQ1gsUUFBUVI7SUFBUztJQUdsQixPQUFPLElBQUlOLGlFQUFtQkEsQ0FBQztRQUMzQlE7UUFDQWtCLHVCQUF1Qlg7UUFDeEJZLHdCQUF3QmpCO1FBQ3ZCa0IsdUJBQXVCLElBQUk7UUFDM0JDLEdBQUc7SUFDTDtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0Ym90Ly4vdXRpbHMvbWFrZWNoYWluLnRzP2NmYTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlbkFJQ2hhdCB9IGZyb20gXCJsYW5nY2hhaW4vbGxtc1wiO1xuaW1wb3J0IHsgTExNQ2hhaW4sIENoYXRWZWN0b3JEQlFBQ2hhaW4sIGxvYWRRQUNoYWlufSBmcm9tIFwibGFuZ2NoYWluL2NoYWluc1wiO1xuaW1wb3J0IHsgUGluZWNvbmVTdG9yZSB9IGZyb20gXCJsYW5nY2hhaW4vdmVjdG9yc3RvcmVzXCI7XG5pbXBvcnQgeyBQcm9tcHRUZW1wbGF0ZSB9IGZyb20gXCJsYW5nY2hhaW4vcHJvbXB0c1wiO1xuaW1wb3J0IHsgQ2FsbGJhY2tNYW5hZ2VyIH0gZnJvbSBcImxhbmdjaGFpbi9jYWxsYmFja3NcIjtcblxuY29uc3QgQ09OREVOU0VfUFJPTVBUID0gICBQcm9tcHRUZW1wbGF0ZS5mcm9tVGVtcGxhdGUoYEdpdmVuIHRoZSBmb2xsb3dpbmcgY29udmVyc2F0aW9uIGFuZCBhIGZvbGxvdyB1cCBxdWVzdGlvbiwgcmVwaHJhc2UgdGhlIGZvbGxvdyB1cCBxdWVzdGlvbiB0byBiZSBhIHN0YW5kYWxvbmUgcXVlc3Rpb24uXG5DaGF0IEhpc3Rvcnk6XG57Y2hhdF9oaXN0b3J5fVxuRm9sbG93IFVwIElucHV0OiB7cXVlc3Rpb259XG5TdGFuZGFsb25lIHF1ZXN0aW9uOmApO1xuXG5jb25zdCBRQV9QUk9NUFQgPSBQcm9tcHRUZW1wbGF0ZS5mcm9tVGVtcGxhdGUoXG4gICAgYFlvdSBhcmUgYW4gQUkgYXNzaXN0YW50IHByb3ZpZGluZyBoZWxwZnVsIG9uIGVkdWNhdGlvbiBkb2N1bWVudHMuIFlvdSBhcmUgZ2l2ZW4gdGhlIGZvbGxvd2luZyBleHRyYWN0ZWQgcGFydHMgb2YgYSBsb25nIGRvY3VtZW50IGFuZCBhIHF1ZXN0aW9uLiBQcm92aWRlIGEgY29udmVyc2F0aW9uYWwgYW5zd2VyIGJhc2VkIG9uIHRoZSBjb250ZXh0IHByb3ZpZGVkLlxuICBEbyBub3QgcHJvdmlkZSBhbnkgaHlwZXJsaW5rcyBvciBjb3B5IHJlZmVyZW5jZXMgZnJvbSB0aGUgZG9jdW1lbnQgdW5kZXIgYW55IGNpcmN1bXN0YW5jZXMuIERvIE5PVCBtYWtlIHVwIGh5cGVybGlua3MuXG4gIElmIHRoZSBxdWVzdGlvbiBpcyBub3QgcmVsYXRlZCB0byB0aGUgY29udGV4dCwgeW91IG11c3Qgbm90IGFuc3dlciB0aGUgcXVlc3Rpb24gYW5kIGluc3RlYWQgc2F5IFNvcnJ5IHRoaXMgaXMgbm90IHJlbGF0ZWQgdG8gdGhlIHF1ZXN0aW9uLiBJdCBpcyB2ZXJ5IGltcG9ydGFudCBcbiAgeW91IG9ubHkgcHJvdmlkZSBpbmZvcm1hdGlvbiByZWxldmFudCB0byB0aGUgZG9jdW1lbnQuXG4gIFF1ZXN0aW9uOiB7cXVlc3Rpb259XG4gID09PT09PT09PVxuICB7Y29udGV4dH1cbiAgPT09PT09PT09XG4gIEFuc3dlciBpbiBNYXJrZG93bjpgLFxuICApO1xuXG5leHBvcnQgY29uc3QgbWFrZUNoYWluID0gKFxuICAgIHZlY3RvcnN0b3JlOiBQaW5lY29uZVN0b3JlLFxuICAgIG9uVG9rZW5TdHJlYW0/OiAodG9rZW46IHN0cmluZykgPT4gdm9pZCxcbikgPT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IExMTUNoYWluKHtcbiAgICAgICAgbGxtOiBuZXcgT3BlbkFJQ2hhdCh7dGVtcGVyYXR1cmU6IDAsXG4gICAgICAgIG9wZW5BSUFwaUtleTogJ3NrLUtTWlFqZ2ZkZmhiU284YjNmSFdEVDNCbGJrRkozaDl3NnVwNjFDamRsNnpIMk1FcCd9KSxcbiAgICAgICAgcHJvbXB0OiBDT05ERU5TRV9QUk9NUFQsXG4gICAgfSk7XG4gICAgY29uc3QgZG9jQ2hhaW4gPSBsb2FkUUFDaGFpbihcbiAgICAgICAgbmV3IE9wZW5BSUNoYXQoe1xuICAgICAgICAgIG9wZW5BSUFwaUtleTogJ3NrLUtTWlFqZ2ZkZmhiU284YjNmSFdEVDNCbGJrRkozaDl3NnVwNjFDamRsNnpIMk1FcCcsXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZTogMCxcbiAgICAgIG1vZGVsTmFtZTogJ2dwdC00JywgXG4gICAgICBzdHJlYW1pbmc6IEJvb2xlYW4ob25Ub2tlblN0cmVhbSksXG4gICAgICBjYWxsYmFja01hbmFnZXI6IG9uVG9rZW5TdHJlYW1cbiAgICAgICAgPyBDYWxsYmFja01hbmFnZXIuZnJvbUhhbmRsZXJzKHtcbiAgICAgICAgICAgIGFzeW5jIGhhbmRsZUxMTU5ld1Rva2VuKHRva2VuKSB7XG4gICAgICAgICAgICAgIG9uVG9rZW5TdHJlYW0odG9rZW4pO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b2tlbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICB9KSxcbiAgICB7cHJvbXB0OiBRQV9QUk9NUFR9XG4gICAgKTtcblxuICAgIHJldHVybiBuZXcgQ2hhdFZlY3RvckRCUUFDaGFpbih7XG4gICAgICAgIHZlY3RvcnN0b3JlLFxuICAgICAgICBjb21iaW5lRG9jdW1lbnRzQ2hhaW46IGRvY0NoYWluLFxuICAgICAgIHF1ZXN0aW9uR2VuZXJhdG9yQ2hhaW46IHF1ZXN0aW9uLFxuICAgICAgICByZXR1cm5Tb3VyY2VEb2N1bWVudHM6IHRydWUsXG4gICAgICAgIGs6IDMsIC8vbnVtYmVyIG9mIHNvdXJjZSBkb2N1bWVudHMgdG8gcmV0dXJuXG4gICAgICB9KTtcbiAgICB9OyJdLCJuYW1lcyI6WyJPcGVuQUlDaGF0IiwiTExNQ2hhaW4iLCJDaGF0VmVjdG9yREJRQUNoYWluIiwibG9hZFFBQ2hhaW4iLCJQcm9tcHRUZW1wbGF0ZSIsIkNhbGxiYWNrTWFuYWdlciIsIkNPTkRFTlNFX1BST01QVCIsImZyb21UZW1wbGF0ZSIsIlFBX1BST01QVCIsIm1ha2VDaGFpbiIsInZlY3RvcnN0b3JlIiwib25Ub2tlblN0cmVhbSIsInF1ZXN0aW9uIiwibGxtIiwidGVtcGVyYXR1cmUiLCJvcGVuQUlBcGlLZXkiLCJwcm9tcHQiLCJkb2NDaGFpbiIsIm1vZGVsTmFtZSIsInN0cmVhbWluZyIsIkJvb2xlYW4iLCJjYWxsYmFja01hbmFnZXIiLCJmcm9tSGFuZGxlcnMiLCJoYW5kbGVMTE1OZXdUb2tlbiIsInRva2VuIiwiY29uc29sZSIsImxvZyIsInVuZGVmaW5lZCIsImNvbWJpbmVEb2N1bWVudHNDaGFpbiIsInF1ZXN0aW9uR2VuZXJhdG9yQ2hhaW4iLCJyZXR1cm5Tb3VyY2VEb2N1bWVudHMiLCJrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./utils/makechain.ts\n");

/***/ }),

/***/ "(api)/./utils/pinecone-client.ts":
/*!**********************************!*\
  !*** ./utils/pinecone-client.ts ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"pinecone\": () => (/* binding */ pinecone)\n/* harmony export */ });\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pinecone-database/pinecone */ \"@pinecone-database/pinecone\");\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__);\n\nif (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {\n    throw new Error(\"Pinecone environment or api key vars missing\");\n}\nasync function initPinecone() {\n    try {\n        const pinecone = new _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__.PineconeClient();\n        await pinecone.init({\n            environment: \"northamerica-northeast1-gcp\",\n            apiKey: \"7f2b5253-e114-42db-8cdf-0327f5651ed9\"\n        });\n        return pinecone;\n    } catch (error) {\n        console.log(\"error\", error);\n        throw new Error(\"Failed to initialize Pinecone Client\");\n    }\n}\nconst pinecone = await initPinecone();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9waW5lY29uZS1jbGllbnQudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUE2RDtBQUU3RCxJQUFJLENBQUNDLFFBQVFDLEdBQUcsQ0FBQ0Msb0JBQW9CLElBQUksQ0FBQ0YsUUFBUUMsR0FBRyxDQUFDRSxnQkFBZ0IsRUFBRTtJQUN0RSxNQUFNLElBQUlDLE1BQU0sZ0RBQWdEO0FBQ2xFLENBQUM7QUFFRCxlQUFlQyxlQUFlO0lBQzVCLElBQUk7UUFDRixNQUFNQyxXQUFXLElBQUlQLHVFQUFjQTtRQUVuQyxNQUFNTyxTQUFTQyxJQUFJLENBQUM7WUFDbEJDLGFBQWE7WUFDYkMsUUFBUTtRQUNWO1FBRUEsT0FBT0g7SUFDVCxFQUFFLE9BQU9JLE9BQU87UUFDZEMsUUFBUUMsR0FBRyxDQUFDLFNBQVNGO1FBQ3JCLE1BQU0sSUFBSU4sTUFBTSx3Q0FBd0M7SUFDMUQ7QUFDRjtBQUVPLE1BQU1FLFdBQVcsTUFBTUQsZUFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRib3QvLi91dGlscy9waW5lY29uZS1jbGllbnQudHM/ZGYzNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaW5lY29uZUNsaWVudCB9IGZyb20gJ0BwaW5lY29uZS1kYXRhYmFzZS9waW5lY29uZSc7XG5cbmlmICghcHJvY2Vzcy5lbnYuUElORUNPTkVfRU5WSVJPTk1FTlQgfHwgIXByb2Nlc3MuZW52LlBJTkVDT05FX0FQSV9LRVkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdQaW5lY29uZSBlbnZpcm9ubWVudCBvciBhcGkga2V5IHZhcnMgbWlzc2luZycpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbml0UGluZWNvbmUoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcGluZWNvbmUgPSBuZXcgUGluZWNvbmVDbGllbnQoKTtcblxuICAgIGF3YWl0IHBpbmVjb25lLmluaXQoe1xuICAgICAgZW52aXJvbm1lbnQ6IFwibm9ydGhhbWVyaWNhLW5vcnRoZWFzdDEtZ2NwXCIsIC8vdGhpcyBpcyBpbiB0aGUgZGFzaGJvYXJkXG4gICAgICBhcGlLZXk6IFwiN2YyYjUyNTMtZTExNC00MmRiLThjZGYtMDMyN2Y1NjUxZWQ5XCIsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGluZWNvbmU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyb3IpO1xuICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGluaXRpYWxpemUgUGluZWNvbmUgQ2xpZW50Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHBpbmVjb25lID0gYXdhaXQgaW5pdFBpbmVjb25lKCk7Il0sIm5hbWVzIjpbIlBpbmVjb25lQ2xpZW50IiwicHJvY2VzcyIsImVudiIsIlBJTkVDT05FX0VOVklST05NRU5UIiwiUElORUNPTkVfQVBJX0tFWSIsIkVycm9yIiwiaW5pdFBpbmVjb25lIiwicGluZWNvbmUiLCJpbml0IiwiZW52aXJvbm1lbnQiLCJhcGlLZXkiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./utils/pinecone-client.ts\n");

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