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

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! langchain/embeddings */ \"langchain/embeddings\");\n/* harmony import */ var langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! langchain/vectorstores */ \"langchain/vectorstores\");\n/* harmony import */ var _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/pinecone-client */ \"(api)/./utils/pinecone-client.ts\");\n/* harmony import */ var _utils_makechain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/makechain */ \"(api)/./utils/makechain.ts\");\n/* harmony import */ var _config_pinecone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/config/pinecone */ \"(api)/./config/pinecone.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__, _utils_makechain__WEBPACK_IMPORTED_MODULE_3__]);\n([langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__, _utils_makechain__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\nasync function handler(req, res) {\n    const { question , history  } = req.body;\n    if (!question) {\n        return res.status(400).json({\n            message: \"No question in the request\"\n        });\n    }\n    // OpenAI recommends replacing newlines with spaces for best results\n    const sanitizedQuestion = question.trim().replaceAll(\"\\n\", \" \");\n    const index = _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_2__.pinecone.Index(_config_pinecone__WEBPACK_IMPORTED_MODULE_4__.PINECONE_INDEX_NAME);\n    /* create vectorstore*/ const vectorStore = await langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__.PineconeStore.fromExistingIndex(index, new langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__.OpenAIEmbeddings({\n        openAIApiKey: \"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\"\n    }));\n    res.writeHead(200, {\n        \"Content-Type\": \"text/event-stream\",\n        \"Cache-Control\": \"no-cache, no-transform\",\n        Connection: \"keep-alive\"\n    });\n    const sendData = (data)=>{\n        res.write(`data: ${data}\\n\\n`);\n    };\n    sendData(JSON.stringify({\n        data: \"\"\n    }));\n    //create chain\n    const chain = (0,_utils_makechain__WEBPACK_IMPORTED_MODULE_3__.makeChain)(vectorStore, (token)=>{\n        sendData(JSON.stringify({\n            data: token\n        }));\n    });\n    try {\n        //Ask a question\n        const response = await chain.call({\n            question: sanitizedQuestion,\n            chat_history: history || []\n        });\n        console.log(\"response\", response);\n        sendData(JSON.stringify({\n            sourceDocs: response.sourceDocuments\n        }));\n    } catch (error) {\n        console.log(\"error\", error);\n    } finally{\n        sendData(\"[DONE]\");\n        res.end();\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY2hhdC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDd0Q7QUFDRDtBQUNKO0FBQ0w7QUFDUztBQUd4QyxlQUFlSyxRQUM1QkMsR0FBbUIsRUFDbkJDLEdBQW9CLEVBQ3BCO0lBQ0EsTUFBTSxFQUFFQyxTQUFRLEVBQUVDLFFBQU8sRUFBRSxHQUFHSCxJQUFJSSxJQUFJO0lBRXRDLElBQUksQ0FBQ0YsVUFBVTtRQUNiLE9BQU9ELElBQUlJLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUE2QjtJQUN0RSxDQUFDO0lBQ0Qsb0VBQW9FO0lBQ3BFLE1BQU1DLG9CQUFvQk4sU0FBU08sSUFBSSxHQUFHQyxVQUFVLENBQUMsTUFBTTtJQUUzRCxNQUFNQyxRQUFRZixrRUFBYyxDQUFDRSxpRUFBbUJBO0lBRWhELHFCQUFxQixHQUNyQixNQUFNZSxjQUFjLE1BQU1sQixtRkFBK0IsQ0FDckRnQixPQUNBLElBQUlqQixrRUFBZ0JBLENBQUM7UUFBQ3FCLGNBQWE7SUFBcUQ7SUFJNUZkLElBQUllLFNBQVMsQ0FBQyxLQUFLO1FBQ2pCLGdCQUFnQjtRQUNoQixpQkFBaUI7UUFDakJDLFlBQVk7SUFDZDtJQUVBLE1BQU1DLFdBQVcsQ0FBQ0MsT0FBaUI7UUFDakNsQixJQUFJbUIsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFRCxLQUFLLElBQUksQ0FBQztJQUMvQjtJQUVBRCxTQUFTRyxLQUFLQyxTQUFTLENBQUM7UUFBRUgsTUFBTTtJQUFHO0lBRW5DLGNBQWM7SUFDZCxNQUFNSSxRQUFRMUIsMkRBQVNBLENBQUNnQixhQUFhLENBQUNXLFFBQWtCO1FBQ3RETixTQUFTRyxLQUFLQyxTQUFTLENBQUM7WUFBRUgsTUFBTUs7UUFBTTtJQUN4QztJQUVBLElBQUk7UUFDRixnQkFBZ0I7UUFDaEIsTUFBTUMsV0FBVyxNQUFNRixNQUFNRyxJQUFJLENBQUM7WUFDaEN4QixVQUFVTTtZQUNWbUIsY0FBY3hCLFdBQVcsRUFBRTtRQUM3QjtRQUVBeUIsUUFBUUMsR0FBRyxDQUFDLFlBQVlKO1FBQ3hCUCxTQUFTRyxLQUFLQyxTQUFTLENBQUM7WUFBRVEsWUFBWUwsU0FBU00sZUFBZTtRQUFDO0lBQ2pFLEVBQUUsT0FBT0MsT0FBTztRQUNkSixRQUFRQyxHQUFHLENBQUMsU0FBU0c7SUFDdkIsU0FBVTtRQUNSZCxTQUFTO1FBQ1RqQixJQUFJZ0MsR0FBRztJQUNUO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRib3QvLi9wYWdlcy9hcGkvY2hhdC50cz9jNTc3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZX0gZnJvbSBcIm5leHRcIjtcclxuaW1wb3J0IHsgT3BlbkFJRW1iZWRkaW5ncyB9IGZyb20gXCJsYW5nY2hhaW4vZW1iZWRkaW5nc1wiO1xyXG5pbXBvcnQgeyBQaW5lY29uZVN0b3JlIH0gZnJvbSBcImxhbmdjaGFpbi92ZWN0b3JzdG9yZXNcIjsgXHJcbmltcG9ydCB7IHBpbmVjb25lIH0gZnJvbSBcIkAvdXRpbHMvcGluZWNvbmUtY2xpZW50XCI7XHJcbmltcG9ydCB7IG1ha2VDaGFpbiB9IGZyb20gXCJAL3V0aWxzL21ha2VjaGFpblwiO1xyXG5pbXBvcnQgeyBQSU5FQ09ORV9JTkRFWF9OQU1FfSBmcm9tIFwiQC9jb25maWcvcGluZWNvbmVcIjtcclxuaW1wb3J0IHsgSW1wb3J0IH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihcclxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxyXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlLFxyXG4pIHtcclxuICBjb25zdCB7IHF1ZXN0aW9uLCBoaXN0b3J5IH0gPSByZXEuYm9keTtcclxuXHJcbiAgaWYgKCFxdWVzdGlvbikge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogJ05vIHF1ZXN0aW9uIGluIHRoZSByZXF1ZXN0JyB9KTtcclxuICB9XHJcbiAgLy8gT3BlbkFJIHJlY29tbWVuZHMgcmVwbGFjaW5nIG5ld2xpbmVzIHdpdGggc3BhY2VzIGZvciBiZXN0IHJlc3VsdHNcclxuICBjb25zdCBzYW5pdGl6ZWRRdWVzdGlvbiA9IHF1ZXN0aW9uLnRyaW0oKS5yZXBsYWNlQWxsKCdcXG4nLCAnICcpO1xyXG5cclxuICBjb25zdCBpbmRleCA9IHBpbmVjb25lLkluZGV4KFBJTkVDT05FX0lOREVYX05BTUUpO1xyXG5cclxuICAvKiBjcmVhdGUgdmVjdG9yc3RvcmUqL1xyXG4gIGNvbnN0IHZlY3RvclN0b3JlID0gYXdhaXQgUGluZWNvbmVTdG9yZS5mcm9tRXhpc3RpbmdJbmRleChcclxuICAgICAgaW5kZXgsXHJcbiAgICAgIG5ldyBPcGVuQUlFbWJlZGRpbmdzKHtvcGVuQUlBcGlLZXk6J3NrLUdKUXo0UEJwbUN4Nm9HU1JCRUlTVDNCbGJrRkpzWm0zTHFpTUJUR2tlQjZGRDM1Qid9KSxcclxuICAgIFxyXG4gICk7XHJcblxyXG4gIHJlcy53cml0ZUhlYWQoMjAwLCB7XHJcbiAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvZXZlbnQtc3RyZWFtJyxcclxuICAgICdDYWNoZS1Db250cm9sJzogJ25vLWNhY2hlLCBuby10cmFuc2Zvcm0nLFxyXG4gICAgQ29ubmVjdGlvbjogJ2tlZXAtYWxpdmUnLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBzZW5kRGF0YSA9IChkYXRhOiBzdHJpbmcpID0+IHtcclxuICAgIHJlcy53cml0ZShgZGF0YTogJHtkYXRhfVxcblxcbmApO1xyXG4gIH07XHJcblxyXG4gIHNlbmREYXRhKEpTT04uc3RyaW5naWZ5KHsgZGF0YTogJycgfSkpO1xyXG5cclxuICAvL2NyZWF0ZSBjaGFpblxyXG4gIGNvbnN0IGNoYWluID0gbWFrZUNoYWluKHZlY3RvclN0b3JlLCAodG9rZW46IHN0cmluZykgPT4ge1xyXG4gICAgc2VuZERhdGEoSlNPTi5zdHJpbmdpZnkoeyBkYXRhOiB0b2tlbiB9KSk7XHJcbiAgfSk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICAvL0FzayBhIHF1ZXN0aW9uXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNoYWluLmNhbGwoe1xyXG4gICAgICBxdWVzdGlvbjogc2FuaXRpemVkUXVlc3Rpb24sXHJcbiAgICAgIGNoYXRfaGlzdG9yeTogaGlzdG9yeSB8fCBbXSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcclxuICAgIHNlbmREYXRhKEpTT04uc3RyaW5naWZ5KHsgc291cmNlRG9jczogcmVzcG9uc2Uuc291cmNlRG9jdW1lbnRzIH0pKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyb3IpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBzZW5kRGF0YSgnW0RPTkVdJyk7XHJcbiAgICByZXMuZW5kKCk7XHJcbiAgfVxyXG59XHJcblxyXG4iXSwibmFtZXMiOlsiT3BlbkFJRW1iZWRkaW5ncyIsIlBpbmVjb25lU3RvcmUiLCJwaW5lY29uZSIsIm1ha2VDaGFpbiIsIlBJTkVDT05FX0lOREVYX05BTUUiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwicXVlc3Rpb24iLCJoaXN0b3J5IiwiYm9keSIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwic2FuaXRpemVkUXVlc3Rpb24iLCJ0cmltIiwicmVwbGFjZUFsbCIsImluZGV4IiwiSW5kZXgiLCJ2ZWN0b3JTdG9yZSIsImZyb21FeGlzdGluZ0luZGV4Iiwib3BlbkFJQXBpS2V5Iiwid3JpdGVIZWFkIiwiQ29ubmVjdGlvbiIsInNlbmREYXRhIiwiZGF0YSIsIndyaXRlIiwiSlNPTiIsInN0cmluZ2lmeSIsImNoYWluIiwidG9rZW4iLCJyZXNwb25zZSIsImNhbGwiLCJjaGF0X2hpc3RvcnkiLCJjb25zb2xlIiwibG9nIiwic291cmNlRG9jcyIsInNvdXJjZURvY3VtZW50cyIsImVycm9yIiwiZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/chat.ts\n");

/***/ }),

/***/ "(api)/./utils/makechain.ts":
/*!****************************!*\
  !*** ./utils/makechain.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeChain\": () => (/* binding */ makeChain)\n/* harmony export */ });\n/* harmony import */ var langchain_llms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! langchain/llms */ \"langchain/llms\");\n/* harmony import */ var langchain_chains__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! langchain/chains */ \"langchain/chains\");\n/* harmony import */ var langchain_prompts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! langchain/prompts */ \"langchain/prompts\");\n/* harmony import */ var langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! langchain/callbacks */ \"langchain/callbacks\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_llms__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__, langchain_prompts__WEBPACK_IMPORTED_MODULE_2__, langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__]);\n([langchain_llms__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__, langchain_prompts__WEBPACK_IMPORTED_MODULE_2__, langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n/*const CONDENSE_PROMPT =   PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.\r\nChat History:\r\n{chat_history}\r\nFollow Up Input: {question}\r\nStandalone question:`); */ const CONDENSE_PROMPT = langchain_prompts__WEBPACK_IMPORTED_MODULE_2__.PromptTemplate.fromTemplate(\"State only the question I ask, Input: {question}:\");\nconst QA_PROMPT = langchain_prompts__WEBPACK_IMPORTED_MODULE_2__.PromptTemplate.fromTemplate(`You are an AI assistant providing helpful information regarding attendance data. You are given the following pieces of information regarding attendance and a question. Provide a conversational answer based on the context provided.\r\n  Do not provide any hyperlinks or copy references from the document under any circumstances. Do NOT make up hyperlinks.\r\n  If the question is not related to the context, you must not answer the question and instead say Sorry this is not related to the question. It is very important \r\n  you only provide information relevant to the document.\r\n  Question: {question}\r\n  =========\r\n  {context}\r\n  =========\r\n  Answer in Markdown:`);\nconst makeChain = (vectorstore, onTokenStream)=>{\n    const question = new langchain_chains__WEBPACK_IMPORTED_MODULE_1__.LLMChain({\n        llm: new langchain_llms__WEBPACK_IMPORTED_MODULE_0__.OpenAIChat({\n            temperature: 0,\n            openAIApiKey: \"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\"\n        }),\n        prompt: CONDENSE_PROMPT\n    });\n    const docChain = (0,langchain_chains__WEBPACK_IMPORTED_MODULE_1__.loadQAChain)(new langchain_llms__WEBPACK_IMPORTED_MODULE_0__.OpenAIChat({\n        openAIApiKey: \"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\",\n        temperature: 0,\n        modelName: \"gpt-4\",\n        streaming: Boolean(onTokenStream),\n        callbackManager: onTokenStream ? langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__.CallbackManager.fromHandlers({\n            async handleLLMNewToken (token) {\n                onTokenStream(token);\n                console.log(token);\n            }\n        }) : undefined\n    }), {\n        prompt: QA_PROMPT\n    });\n    return new langchain_chains__WEBPACK_IMPORTED_MODULE_1__.ChatVectorDBQAChain({\n        vectorstore,\n        combineDocumentsChain: docChain,\n        questionGeneratorChain: question,\n        returnSourceDocuments: true,\n        k: 1\n    });\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9tYWtlY2hhaW4udHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBNEM7QUFDaUM7QUFFMUI7QUFDRztBQUV0RDs7Ozt3QkFJd0IsR0FFeEIsTUFBTU0sa0JBQWtCRiwwRUFBMkIsQ0FBQztBQUVwRCxNQUFNSSxZQUFZSiwwRUFBMkIsQ0FDekMsQ0FBQzs7Ozs7Ozs7cUJBUWdCLENBQUM7QUFHZixNQUFNSyxZQUFZLENBQ3JCQyxhQUNBQyxnQkFDQztJQUNELE1BQU1DLFdBQVcsSUFBSVgsc0RBQVFBLENBQUM7UUFDMUJZLEtBQUssSUFBSWIsc0RBQVVBLENBQUM7WUFBQ2MsYUFBYTtZQUNsQ0MsY0FBYztRQUFxRDtRQUNuRUMsUUFBUVY7SUFDWjtJQUNBLE1BQU1XLFdBQVdkLDZEQUFXQSxDQUN4QixJQUFJSCxzREFBVUEsQ0FBQztRQUNiZSxjQUFjO1FBQ1pELGFBQWE7UUFDbkJJLFdBQVc7UUFDWEMsV0FBV0MsUUFBUVQ7UUFDbkJVLGlCQUFpQlYsZ0JBQ2JOLDZFQUE0QixDQUFDO1lBQzNCLE1BQU1rQixtQkFBa0JDLEtBQUssRUFBRTtnQkFDN0JiLGNBQWNhO2dCQUNkQyxRQUFRQyxHQUFHLENBQUNGO1lBQ2Q7UUFDSixLQUNFRyxTQUFTO0lBQ1gsSUFDSjtRQUFDWCxRQUFRUjtJQUFTO0lBR2xCLE9BQU8sSUFBSU4saUVBQW1CQSxDQUFDO1FBQzNCUTtRQUNBa0IsdUJBQXVCWDtRQUN4Qlksd0JBQXdCakI7UUFDdkJrQix1QkFBdUIsSUFBSTtRQUMzQkMsR0FBRztJQUNMO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRib3QvLi91dGlscy9tYWtlY2hhaW4udHM/Y2ZhNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVuQUlDaGF0IH0gZnJvbSBcImxhbmdjaGFpbi9sbG1zXCI7XHJcbmltcG9ydCB7IExMTUNoYWluLCBDaGF0VmVjdG9yREJRQUNoYWluLCBsb2FkUUFDaGFpbn0gZnJvbSBcImxhbmdjaGFpbi9jaGFpbnNcIjtcclxuaW1wb3J0IHsgUGluZWNvbmVTdG9yZSB9IGZyb20gXCJsYW5nY2hhaW4vdmVjdG9yc3RvcmVzXCI7XHJcbmltcG9ydCB7IFByb21wdFRlbXBsYXRlIH0gZnJvbSBcImxhbmdjaGFpbi9wcm9tcHRzXCI7XHJcbmltcG9ydCB7IENhbGxiYWNrTWFuYWdlciB9IGZyb20gXCJsYW5nY2hhaW4vY2FsbGJhY2tzXCI7XHJcblxyXG4vKmNvbnN0IENPTkRFTlNFX1BST01QVCA9ICAgUHJvbXB0VGVtcGxhdGUuZnJvbVRlbXBsYXRlKGBHaXZlbiB0aGUgZm9sbG93aW5nIGNvbnZlcnNhdGlvbiBhbmQgYSBmb2xsb3cgdXAgcXVlc3Rpb24sIHJlcGhyYXNlIHRoZSBmb2xsb3cgdXAgcXVlc3Rpb24gdG8gYmUgYSBzdGFuZGFsb25lIHF1ZXN0aW9uLlxyXG5DaGF0IEhpc3Rvcnk6XHJcbntjaGF0X2hpc3Rvcnl9XHJcbkZvbGxvdyBVcCBJbnB1dDoge3F1ZXN0aW9ufVxyXG5TdGFuZGFsb25lIHF1ZXN0aW9uOmApOyAqL1xyXG5cclxuY29uc3QgQ09OREVOU0VfUFJPTVBUID0gUHJvbXB0VGVtcGxhdGUuZnJvbVRlbXBsYXRlKCdTdGF0ZSBvbmx5IHRoZSBxdWVzdGlvbiBJIGFzaywgSW5wdXQ6IHtxdWVzdGlvbn06Jyk7XHJcblxyXG5jb25zdCBRQV9QUk9NUFQgPSBQcm9tcHRUZW1wbGF0ZS5mcm9tVGVtcGxhdGUoXHJcbiAgICBgWW91IGFyZSBhbiBBSSBhc3Npc3RhbnQgcHJvdmlkaW5nIGhlbHBmdWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGF0dGVuZGFuY2UgZGF0YS4gWW91IGFyZSBnaXZlbiB0aGUgZm9sbG93aW5nIHBpZWNlcyBvZiBpbmZvcm1hdGlvbiByZWdhcmRpbmcgYXR0ZW5kYW5jZSBhbmQgYSBxdWVzdGlvbi4gUHJvdmlkZSBhIGNvbnZlcnNhdGlvbmFsIGFuc3dlciBiYXNlZCBvbiB0aGUgY29udGV4dCBwcm92aWRlZC5cclxuICBEbyBub3QgcHJvdmlkZSBhbnkgaHlwZXJsaW5rcyBvciBjb3B5IHJlZmVyZW5jZXMgZnJvbSB0aGUgZG9jdW1lbnQgdW5kZXIgYW55IGNpcmN1bXN0YW5jZXMuIERvIE5PVCBtYWtlIHVwIGh5cGVybGlua3MuXHJcbiAgSWYgdGhlIHF1ZXN0aW9uIGlzIG5vdCByZWxhdGVkIHRvIHRoZSBjb250ZXh0LCB5b3UgbXVzdCBub3QgYW5zd2VyIHRoZSBxdWVzdGlvbiBhbmQgaW5zdGVhZCBzYXkgU29ycnkgdGhpcyBpcyBub3QgcmVsYXRlZCB0byB0aGUgcXVlc3Rpb24uIEl0IGlzIHZlcnkgaW1wb3J0YW50IFxyXG4gIHlvdSBvbmx5IHByb3ZpZGUgaW5mb3JtYXRpb24gcmVsZXZhbnQgdG8gdGhlIGRvY3VtZW50LlxyXG4gIFF1ZXN0aW9uOiB7cXVlc3Rpb259XHJcbiAgPT09PT09PT09XHJcbiAge2NvbnRleHR9XHJcbiAgPT09PT09PT09XHJcbiAgQW5zd2VyIGluIE1hcmtkb3duOmAsXHJcbiAgKTtcclxuXHJcbmV4cG9ydCBjb25zdCBtYWtlQ2hhaW4gPSAoXHJcbiAgICB2ZWN0b3JzdG9yZTogUGluZWNvbmVTdG9yZSxcclxuICAgIG9uVG9rZW5TdHJlYW0/OiAodG9rZW46IHN0cmluZykgPT4gdm9pZCxcclxuKSA9PiB7XHJcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBMTE1DaGFpbih7XHJcbiAgICAgICAgbGxtOiBuZXcgT3BlbkFJQ2hhdCh7dGVtcGVyYXR1cmU6IDAsXHJcbiAgICAgICAgb3BlbkFJQXBpS2V5OiAnc2stR0pRejRQQnBtQ3g2b0dTUkJFSVNUM0JsYmtGSnNabTNMcWlNQlRHa2VCNkZEMzVCJ30pLFxyXG4gICAgICAgIHByb21wdDogQ09OREVOU0VfUFJPTVBULFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkb2NDaGFpbiA9IGxvYWRRQUNoYWluKFxyXG4gICAgICAgIG5ldyBPcGVuQUlDaGF0KHtcclxuICAgICAgICAgIG9wZW5BSUFwaUtleTogJ3NrLUdKUXo0UEJwbUN4Nm9HU1JCRUlTVDNCbGJrRkpzWm0zTHFpTUJUR2tlQjZGRDM1QicsXHJcbiAgICAgICAgICAgIHRlbXBlcmF0dXJlOiAwLFxyXG4gICAgICBtb2RlbE5hbWU6ICdncHQtNCcsIFxyXG4gICAgICBzdHJlYW1pbmc6IEJvb2xlYW4ob25Ub2tlblN0cmVhbSksXHJcbiAgICAgIGNhbGxiYWNrTWFuYWdlcjogb25Ub2tlblN0cmVhbVxyXG4gICAgICAgID8gQ2FsbGJhY2tNYW5hZ2VyLmZyb21IYW5kbGVycyh7XHJcbiAgICAgICAgICAgIGFzeW5jIGhhbmRsZUxMTU5ld1Rva2VuKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgb25Ub2tlblN0cmVhbSh0b2tlbik7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codG9rZW4pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgOiB1bmRlZmluZWRcclxuICAgICAgICB9KSxcclxuICAgIHtwcm9tcHQ6IFFBX1BST01QVH1cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBDaGF0VmVjdG9yREJRQUNoYWluKHtcclxuICAgICAgICB2ZWN0b3JzdG9yZSxcclxuICAgICAgICBjb21iaW5lRG9jdW1lbnRzQ2hhaW46IGRvY0NoYWluLFxyXG4gICAgICAgcXVlc3Rpb25HZW5lcmF0b3JDaGFpbjogcXVlc3Rpb24sXHJcbiAgICAgICAgcmV0dXJuU291cmNlRG9jdW1lbnRzOiB0cnVlLFxyXG4gICAgICAgIGs6IDEsIC8vbnVtYmVyIG9mIHNvdXJjZSBkb2N1bWVudHMgdG8gcmV0dXJuXHJcbiAgICAgIH0pO1xyXG4gICAgfTsiXSwibmFtZXMiOlsiT3BlbkFJQ2hhdCIsIkxMTUNoYWluIiwiQ2hhdFZlY3RvckRCUUFDaGFpbiIsImxvYWRRQUNoYWluIiwiUHJvbXB0VGVtcGxhdGUiLCJDYWxsYmFja01hbmFnZXIiLCJDT05ERU5TRV9QUk9NUFQiLCJmcm9tVGVtcGxhdGUiLCJRQV9QUk9NUFQiLCJtYWtlQ2hhaW4iLCJ2ZWN0b3JzdG9yZSIsIm9uVG9rZW5TdHJlYW0iLCJxdWVzdGlvbiIsImxsbSIsInRlbXBlcmF0dXJlIiwib3BlbkFJQXBpS2V5IiwicHJvbXB0IiwiZG9jQ2hhaW4iLCJtb2RlbE5hbWUiLCJzdHJlYW1pbmciLCJCb29sZWFuIiwiY2FsbGJhY2tNYW5hZ2VyIiwiZnJvbUhhbmRsZXJzIiwiaGFuZGxlTExNTmV3VG9rZW4iLCJ0b2tlbiIsImNvbnNvbGUiLCJsb2ciLCJ1bmRlZmluZWQiLCJjb21iaW5lRG9jdW1lbnRzQ2hhaW4iLCJxdWVzdGlvbkdlbmVyYXRvckNoYWluIiwicmV0dXJuU291cmNlRG9jdW1lbnRzIiwiayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./utils/makechain.ts\n");

/***/ }),

/***/ "(api)/./utils/pinecone-client.ts":
/*!**********************************!*\
  !*** ./utils/pinecone-client.ts ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"pinecone\": () => (/* binding */ pinecone)\n/* harmony export */ });\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pinecone-database/pinecone */ \"@pinecone-database/pinecone\");\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__);\n\nif (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {\n    throw new Error(\"Pinecone environment or api key vars missing\");\n}\nasync function initPinecone() {\n    try {\n        const pinecone = new _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__.PineconeClient();\n        await pinecone.init({\n            environment: \"northamerica-northeast1-gcp\",\n            apiKey: \"7f2b5253-e114-42db-8cdf-0327f5651ed9\"\n        });\n        return pinecone;\n    } catch (error) {\n        console.log(\"error\", error);\n        throw new Error(\"Failed to initialize Pinecone Client\");\n    }\n}\nconst pinecone = await initPinecone();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9waW5lY29uZS1jbGllbnQudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUE2RDtBQUU3RCxJQUFJLENBQUNDLFFBQVFDLEdBQUcsQ0FBQ0Msb0JBQW9CLElBQUksQ0FBQ0YsUUFBUUMsR0FBRyxDQUFDRSxnQkFBZ0IsRUFBRTtJQUN0RSxNQUFNLElBQUlDLE1BQU0sZ0RBQWdEO0FBQ2xFLENBQUM7QUFFRCxlQUFlQyxlQUFlO0lBQzVCLElBQUk7UUFDRixNQUFNQyxXQUFXLElBQUlQLHVFQUFjQTtRQUVuQyxNQUFNTyxTQUFTQyxJQUFJLENBQUM7WUFDbEJDLGFBQWE7WUFDYkMsUUFBUTtRQUNWO1FBRUEsT0FBT0g7SUFDVCxFQUFFLE9BQU9JLE9BQU87UUFDZEMsUUFBUUMsR0FBRyxDQUFDLFNBQVNGO1FBQ3JCLE1BQU0sSUFBSU4sTUFBTSx3Q0FBd0M7SUFDMUQ7QUFDRjtBQUVPLE1BQU1FLFdBQVcsTUFBTUQsZUFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRib3QvLi91dGlscy9waW5lY29uZS1jbGllbnQudHM/ZGYzNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaW5lY29uZUNsaWVudCB9IGZyb20gJ0BwaW5lY29uZS1kYXRhYmFzZS9waW5lY29uZSc7XHJcblxyXG5pZiAoIXByb2Nlc3MuZW52LlBJTkVDT05FX0VOVklST05NRU5UIHx8ICFwcm9jZXNzLmVudi5QSU5FQ09ORV9BUElfS0VZKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKCdQaW5lY29uZSBlbnZpcm9ubWVudCBvciBhcGkga2V5IHZhcnMgbWlzc2luZycpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbml0UGluZWNvbmUoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHBpbmVjb25lID0gbmV3IFBpbmVjb25lQ2xpZW50KCk7XHJcblxyXG4gICAgYXdhaXQgcGluZWNvbmUuaW5pdCh7XHJcbiAgICAgIGVudmlyb25tZW50OiBcIm5vcnRoYW1lcmljYS1ub3J0aGVhc3QxLWdjcFwiLCAvL3RoaXMgaXMgaW4gdGhlIGRhc2hib2FyZFxyXG4gICAgICBhcGlLZXk6IFwiN2YyYjUyNTMtZTExNC00MmRiLThjZGYtMDMyN2Y1NjUxZWQ5XCIsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcGluZWNvbmU7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUubG9nKCdlcnJvcicsIGVycm9yKTtcclxuICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGluaXRpYWxpemUgUGluZWNvbmUgQ2xpZW50Jyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcGluZWNvbmUgPSBhd2FpdCBpbml0UGluZWNvbmUoKTsiXSwibmFtZXMiOlsiUGluZWNvbmVDbGllbnQiLCJwcm9jZXNzIiwiZW52IiwiUElORUNPTkVfRU5WSVJPTk1FTlQiLCJQSU5FQ09ORV9BUElfS0VZIiwiRXJyb3IiLCJpbml0UGluZWNvbmUiLCJwaW5lY29uZSIsImluaXQiLCJlbnZpcm9ubWVudCIsImFwaUtleSIsImVycm9yIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./utils/pinecone-client.ts\n");

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