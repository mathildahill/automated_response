import React from 'react';
import Link from 'next/link';
import 'govuk-frontend/govuk/all.scss';
import Layout from '@/components/layout';

const MyPage = () => {
  return (
    <Layout>
    <div className="govuk-grid-column-two-thirds">
    <h2 aria-live="polite" aria-atomic="true" className="govuk-heading-xl" data-testid="total-results">
  Please select a chatbot</h2>
  <ul className="govuk-list" id="searchResults" data-testid="publicationsList">
    <li className="PublicationSummary_container__K7t9w govuk-!-margin-top-4">
      <h3 className="govuk-!-margin-bottom-2">
        <Link
        href="/schoolbriefing" className="govuk-link">School Meals chatbot
        </Link>
        
      </h3>
      <p>
        A chatbot to answer queries relating to school meals which is based on the school meals briefing pack. This chatbot can be used to respond to standard lines relating to school meals.
      </p>
    </li>
    <li className="PublicationSummary_container__K7t9w govuk-!-margin-top-4">
      <h3 className="govuk-!-margin-bottom-2">
        <Link
        href="/periodProducts" className="govuk-link">Period products chatbot
        </Link>
        
      </h3>
      <p>
        A chatbot to answer queries relating to the period products scheme which responses are based on the period products briefing pack.
      </p>
    </li>

    </ul>
    </div>
    </Layout>
  );
}

export default MyPage;



