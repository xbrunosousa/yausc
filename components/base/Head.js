import React from 'react';
import NextHead from 'next/head';
import { string } from 'prop-types';
import './../../assets/scss/index.scss';

const defaultDescription = 'Free URL Shortener builded with React.JS / Next.JS';
const defaultOGURL = '';
const defaultOGImage = '';

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <meta name="author" content="Bruno Vinícius, mail@brunosousa.dev" />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
    />
    <link rel="manifest" href="/manifest.json" />
    <title>{props.title || ''}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicons/apple-touch-icon.png"
    />
    >
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicons/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicons/favicon-16x16.png"
    />
    <link rel="manifest" href="/favicons/site.webmanifest" />
    <link rel="icon" href="/favicons/favicon.ico" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default Head;
