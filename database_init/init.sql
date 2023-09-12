CREATE TABLE ChatbotView (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    description VARCHAR,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE ChatbotItem(
    id SERIAL Primary KEY,
    tone VARCHAR(250) DEFAULT 'Informative and finish off on a positive note',
    audience VARCHAR(250) DEFAULT 'Adults',
    contextual_information VARCHAR(2000),
    input_query VARCHAR,
    chatbot_meta_id INTEGER REFERENCES ChatbotView(id)
);

CREATE TABLE PromptView (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    description VARCHAR,
    tone VARCHAR[],
    audience VARCHAR[],
    contextual_information VARCHAR[]
);

INSERT INTO ChatbotView(name, description, is_active)
VALUES(
    'School Meals Chatbot',
    'A chatbot to answer queries relating to school meals which is based on the school meals briefing pack. 
    This chatbot can be used to respond to standard lines relating to school meals.',
    TRUE
);

INSERT INTO ChatbotView(name, description, is_active)
VALUES(
    'Period Products Chatbot',
    'A chatbot to answer queries relating to period products based on the period products briefing pack. 
    This chatbot can be used to respond to standard lines relating to period products.',
    TRUE
);

INSERT INTO PromptView (title, description, tone, audience, contextual_information)
VALUES(
    'Input Modification',
    'Here please input the query into the response automator.  This section also allows users to add additional information 
    into the response automator. If there are any additional contextual details that should be included in the response, 
    but are not covered in the official briefing materials, please specify them as required below. 
    Additionally, if a different tone or a different audience from normal required, please add it where prompted below.',
    ARRAY['Would you like to adjust the response tone?','The tone currently is informative and ends on a positive note'],
    ARRAY['Would you like to adjust the response audience?','The respondent is assumed to be an adult'],
    ARRAY['Would you like to add contextual information?','Currently no context is provided']
);