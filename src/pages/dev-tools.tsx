import React from 'react';

export function getStaticProps() {
  return {
    props: { notFound: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' }
  }
}

const DevToolsHomePage = () => {
  return (
    <h1>Dev Tools Home Page</h1>
  )
}

export default DevToolsHomePage;
