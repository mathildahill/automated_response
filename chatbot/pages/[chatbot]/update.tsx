import Layout from '@/components/layout'; 
import { Button} from 'govuk-react';
import { PromptView } from '@/types/prompt_refine';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef} from 'react';
import { Message } from '@/types/chat';

type AdjustStatusType = {
  inputQuery: boolean
  tone: boolean,
  audience: boolean,
  contextualInfo: boolean
};

type AdjustKey = keyof AdjustStatusType;

const PromptAdjuster = () => {
  const [adjustStatus, setAdjustStatus] = useState({inputQuery:true, tone: false, audience: false, contextualInfo: false });
  const [text, setText] = useState({inputQuery: '', tone: '', audience: '', contextualInfo: '' });
  const [savedStatus, setSavedStatus] = useState({inputQuery:false, tone: false, audience: false, contextualInfo: false });
  const [data, setData] = useState<PromptView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageState, setMessageState] = useState<Message>({message: '', isStreaming: false });

  const router = useRouter();
  const {chatbot} = router.query;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const fetchData = async () => {
    const res = await fetch('http://localhost:8000/prompt_view');
    const json = await res.json();
    setData(json);
  }; 

  useEffect(() => {
    textAreaRef.current && (textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight);
  }, [messageState]);

  async function handleSubmit(){
    // only insert into payload values which have been saved
    let payload = {}

    payload = {...payload, ChatbotMeta: Number(chatbot)}

    if (!savedStatus.inputQuery || text.inputQuery === '') {
      alert('Please input a query');
      return;
    } else{
      payload = {...payload, input_query: text.inputQuery}
    }

    setLoading(true);
    
    if(savedStatus.tone){
      payload = {...payload, tone: text.tone}
    }

    if(savedStatus.audience){
      payload = {...payload, audience: text.audience}
    }

    if(savedStatus.contextualInfo){
      payload = {...payload, contextual_information: text.contextualInfo}
    }

    let pending = '';

    try{

    const res = await fetch('http://localhost:8000/chatbot-item' , {
      method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = await res.body;

    if(!data){
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done){
      const {value, done: doneReading} = await reader.read()
      done = doneReading;
      const chunkValue = decoder.decode(value);
      if (chunkValue.startsWith('{"sourceDocuments":')) {
        setMessageState((prevState) => {
            return {
                ...prevState, 
                sourceDocs: JSON.parse(chunkValue).sourceDocuments
            };
        });
    } else{
        pending += chunkValue;
        setMessageState((prevState) => {
          return {...prevState, message: pending};
        });
    }
  }
    setLoading(false);
  
  } catch(error) {
    setLoading(false)
    setError('An error occurred while fetching the data. Please try again.');
  }

  }



  useEffect(() => {
    fetchData();
  }, []);

  
  const handleAdjustClick = (name: AdjustKey) => {
    setAdjustStatus(prevState => ({ ...prevState, [name]: !prevState[name] }));
  };

  const handleInputChange = (e :any) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const handleSave = (name: keyof typeof text) => {
    // Implement the logic to save the `text` state.
    setSavedStatus(prevState => ({ ...prevState, [name]: true }));
  };

  const handleUndo = (name: keyof typeof text) => {
    setSavedStatus(prevState => ({...prevState, [name]: false}));
    setText(prevState => ({...prevState, [name]: ''}));
  };

  return (
    <Layout>
        <div>
          <h1 className="govuk-heading-xl">
            {data?.title}
          </h1>
          <p className="govuk-body">
            {data?.description}
          </p>
        </div>
        <div className='govuk-form-group'>
        <fieldset className='govuk-fieldset'>
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                <h1 className="govuk-fieldset__heading">
                  Please input your query below
                </h1>
                </legend>
        </fieldset> {adjustStatus.inputQuery && (
        <div>
          {savedStatus.inputQuery ? (
          <>
          <p>Response saved</p>
          <Button onClick={() => handleUndo('inputQuery')}>Undo</Button></>
          ) : (
          <>
          <textarea className="govuk-textarea" name="inputQuery" value={text.inputQuery} onChange={handleInputChange} style={{height: '250px'}}/>
          <Button onClick={() => handleSave('inputQuery')}>Save</Button>
          </>
          )}
          </div>
          )}
           </div>
        <fieldset className="govuk-fieldset" aria-describedby="checkboxes-hint">
          <div className="govuk-form-group">
            <fieldset className="govuk-fieldset">
               <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                <h1 className="govuk-fieldset__heading">
                  {data?.tone[0]}
                </h1>
                </legend>
                <div id="changed-name-hint" className="govuk-hint"> 
                {data?.tone[1]}
                </div>
                <div className="govuk-radios govuk-radios--inline">
                  <div className="govuk-radios__item">
                    <input id="tone-yes" className="govuk-radios__input" name="tone" type="radio" value="Yes" checked={adjustStatus.tone} onChange={() => handleAdjustClick('tone')}/>
                    <label className="govuk-label govuk-radios__label" htmlFor="tone-yes">Yes</label>
                  </div>
                  <div className="govuk-radios__item">
                    <input  id="tone-no" className="govuk-radios__input" name="tone" type="radio" value="No" checked={!adjustStatus.tone}  onChange={() => handleAdjustClick('tone')}/>
                    <label className="govuk-label govuk-radios__label" htmlFor="tone-no">No</label>
                  </div>
                </div>
                </fieldset> {adjustStatus.tone && (
                <div>
                  {savedStatus.tone ? (
                  <>
                  <p>Response saved</p>
                  <Button onClick={() => handleUndo('tone')}>Undo</Button>
                  </>
                  ) : (
                  <>
                  <textarea className="govuk-textarea" name="tone" value={text.tone} onChange={handleInputChange} style={{height: '250px'}}/>
                  <Button onClick={() => handleSave('tone')}>Save</Button>
                  </>
                  )}
                  </div>)}
                </div>
            <div className="govuk-form-group">
              <fieldset className="govuk-fieldset">
                <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                  <h1 className="govuk-fieldset__heading">
                    {data?.audience[0]}
                  </h1>
                </legend>
                <div id="changed-name-hint" className="govuk-hint"> 
                {data?.audience[1]}
                </div>
              <div className="govuk-radios govuk-radios--inline">
                  <div className="govuk-radios__item">
                    <input id="audience-yes" className="govuk-radios__input" name="audience"  type="radio" value="Yes" checked={adjustStatus.audience} 
                    onChange={() => handleAdjustClick('audience')}/>
                    <label className="govuk-label govuk-radios__label" htmlFor="audience-yes">Yes</label>
                  </div>
                <div className="govuk-radios__item">
                     <input id="audience-no" className="govuk-radios__input" name="audience" type="radio" value="No" checked={!adjustStatus.audience} 
                    onChange={() => handleAdjustClick('audience')}/>
                    <label className="govuk-label govuk-radios__label" htmlFor="audience-no">No</label>
                </div>
              </div>
           </fieldset>{adjustStatus.audience && (
           <div>
            {savedStatus.audience ? (
            <>
            <p>Response saved</p>
            <Button onClick={() => handleUndo('audience')}>Undo</Button>
            </>
            ) : (
            <>
            <textarea className="govuk-textarea" name="audience" value={text.audience} onChange={handleInputChange} style={{height: '250px'}}/>
            <Button onClick={() => handleSave('audience')}>Save</Button>
            </>
            )}
            </div>
            )}

              </div>
              <div className="govuk-form-group">
                <fieldset className="govuk-fieldset">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                    <h1 className="govuk-fieldset__heading">
                      {data?.contextual_information[0]}</h1>
                  </legend>
                  <div id="changed-name-hint" className="govuk-hint"> 
                  {data?.contextual_information[1]}
                  </div>
                  <div className="govuk-radios govuk-radios--inline">
                    <div className="govuk-radios__item">
                      <input id="contextualInfo-yes" className="govuk-radios__input" name="contextualInfo" type="radio" value="Yes" checked={adjustStatus.contextualInfo} 
                      onChange={() => handleAdjustClick('contextualInfo')}/>
                      <label className="govuk-label govuk-radios__label" htmlFor="contextualInfo-yes">Yes</label>
                    </div>
                    <div className="govuk-radios__item">
                      <input 
                      id="contextualInfo-no"
                      className="govuk-radios__input"
                      name="contextualInfo" 
                      type="radio" 
                      value="No" 
                      checked={!adjustStatus.contextualInfo} 
                      onChange={() => handleAdjustClick('contextualInfo')}/>
                      <label className="govuk-label govuk-radios__label" htmlFor="contextualInfo-no">No</label></div>
                  </div>
                </fieldset>
                {adjustStatus.contextualInfo && (
                <div>
                  {savedStatus.contextualInfo ? (
                  <>
                  <p>Response saved</p>
                  <Button onClick={() => handleUndo('contextualInfo')}>Undo</Button>
                  </>
                  ) : (
                  <>
                  <textarea className="govuk-textarea" name="contextualInfo" value={text.contextualInfo} onChange={handleInputChange} style={{height: '250px'}}/>
                  <Button onClick={() => handleSave('contextualInfo')}>Save</Button>
                  </>
                  )}</div>)}
                  
                  </div>
              </fieldset>
              <div className="govuk-button-group">
                <Button onClick={handleSubmit} className="govuk-button">
                   Generate Response
                </Button>
              </div>

              <div className="govuk-form-group"> {/* Apply GDS form group styling */}
              <textarea className="govuk-textarea" ref={textAreaRef} value={messageState.message} style={{height: '250px'}}></textarea>
            </div>
              

                </Layout>
                );
}

export default PromptAdjuster;