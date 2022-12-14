import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from 'styled-components';
import { lighttheme, darktheme } from './theme';
import { isLightAtom } from "./atoms";
import { useRecoilValue } from "recoil";

const GlobalStyle = createGlobalStyle`
<style> @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap'); </style>
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  *{
    box-sizing: border-box;
  }
  body {
    line-height: 1;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${props=>props.theme.bgColor};
    color: ${props=>props.theme.textColor};
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;

function App() {
  const isDark = useRecoilValue(isLightAtom);

  return (
    <>
    <ThemeProvider theme={isDark ? lighttheme : darktheme}>
      <GlobalStyle />
        <Header />
        <Outlet />
        <Footer />
      <ReactQueryDevtools initialIsOpen={true}/>
    </ThemeProvider>
    </>
  );
}

export default App;
