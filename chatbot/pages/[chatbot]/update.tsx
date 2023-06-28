import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout'; 
import { Button } from 'govuk-react';
import { PromptView } from '@/types/prompt_refine';

type AdjustStatusType = {
  tone: boolean,
  audience: boolean,
  contextualInfo: boolean
};

type AdjustKey = keyof AdjustStatusType;

const PromptAdjuster = () => {
  const [adjustStatus, setAdjustStatus] = useState({ tone: false, audience: false, contextualInfo: false });
  const [text, setText] = useState({ tone: '', audience: '', contextualInfo: '' });
  const [savedStatus, setSavedStatus] = useState({ tone: false, audience: false, contextualInfo: false });
  const [data, setData] = useState<PromptView | null>(null);

  const fetchData = async () => {
    const res = await fetch('http://localhost:8000/prompt_view');
    const json = await res.json();
    setData(json);
  }; 

  async function handleSubmit(){
    const res = await fetch('http://localhost:8000/chatbot-item' , {
      method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tone: text.tone,
          audience: text.audience,
          contextual_information: text.contextualInfo
        })
    })

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
        <fieldset className="govuk-fieldset" aria-describedby="checkboxes-hint">
          <div id="checkboxes-hint" className="govuk-hint">
            Decide the fields to adjust
          </div>
          <div className="input-group">
            <Button onClick={() => handleAdjustClick('tone')}>{data?.tone[0]}</Button>
            {adjustStatus.tone && (
              <div>
                {savedStatus.tone ? <p>Response saved</p> : (
                  <>
                    <input className="govuk-input" name="tone" type="text" value={text.tone} onChange={handleInputChange} />
                    <Button onClick={() => handleSave('tone')}>Save</Button>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="input-group">
            <Button onClick={() => handleAdjustClick('audience')}>{data?.audience[0]}</Button>
            {adjustStatus.audience && (
              <div>
                {savedStatus.audience ? <p>Response saved</p> : (
                  <>
                    <input className="govuk-input" name="audience" type="text" value={text.audience} onChange={handleInputChange} />
                    <Button onClick={() => handleSave('audience')}>Save</Button>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="input-group">
            <Button onClick={() => handleAdjustClick('contextualInfo')}>{data?.contextual_information[0]}</Button>
            {adjustStatus.contextualInfo && (
              <div>
                {savedStatus.contextualInfo ? <p>Response saved</p> : (
                  <>
                    <input className="govuk-input" name="contextualInfo" type="text" value={text.contextualInfo} onChange={handleInputChange} />
                    <Button onClick={() => handleSave('contextualInfo')}>Save</Button>
                  </>
                )}
              </div>
            )}
          </div>
        </fieldset>
        <div className="govuk-button-group">
          <Button onClick={handleSubmit} className="govuk-button">
            Submit
          </Button>
        </div>
    </Layout>
  );
}

export default PromptAdjuster;



function fetchData() {
  throw new Error('Function not implemented.');
}

