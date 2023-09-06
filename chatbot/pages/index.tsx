import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout';
import {Chatbot} from '@/types/chatbot';

export async function getServerSideProps() {
  const res = await fetch('http://0.0.0.0:8000/api/chatbots');
  const data: Chatbot[] = await res.json();
  

  const chatbots: Record<string, Chatbot> = data.reduce((acc, chatbot) => {
    return {
      ...acc,
      [chatbot.id]: chatbot,
    };
  }, {});

  return { props: { chatbots } };
}

type MyPageProps = {
  chatbots: Record<string, Chatbot>;
};

const MyPage: React.FC<MyPageProps> = ({chatbots}) => {
  return (
    <Layout>
      <div className="govuk-grid-column-two-thirds">
        <h2 aria-live="polite" aria-atomic="true" className="govuk-heading-xl" data-testid="total-results">
          Please select a chatbot
        </h2>
        <ul className="govuk-list" id="searchResults" data-testid="publicationsList">
          {Object.values(chatbots).map((chatbot, i) => (
            <li key={i} className="PublicationSummary_container__K7t9w govuk-!-margin-top-4">
              <h3 className="govuk-!-margin-bottom-2">
                <Link href={`/${chatbot.id}/update`} className="govuk-link">{chatbot.name}</Link>
              </h3>
              <p>{chatbot.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default MyPage;




