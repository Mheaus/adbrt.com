import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const LeftSideContainer = styled.aside`
  background: white;
  height: 100%;
  overflow: auto;
  width: 0;
  transition: all 0.5s;

  &.fade-appear-done {
    width: 35%;
  }

  & > * {
    padding: 0 1.25rem;
    transition: opacity 0.75s;
  }

  & ._display-welcome {
    position: absolute;
    z-index: 300;
    top: 0.75rem;
    left: 0;
    opacity: 0.4;
    text-transform: capitalize;
  }

  & ._display-welcome:hover {
    opacity: 0.7;
  }

  & .__contenainer-about {
    padding-top: 3rem;
  }

  & ._tag {
    color: #0079df;
    font-size: 1.25rem;
    text-transform: capitalize;
    margin-bottom: 1rem;
    font-weight: 400;
  }

  & ._content {
    padding: 0 0 0.25rem 0.5rem;
  }

  & .__news {
    margin-top: 1.5rem;
  }

  & .__news ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  & .__news ._item {
    margin-top: 1rem;
  }

  & .__news ._item p {
    margin-left: -0.25rem;
    opacity: 0.5;
  }

  & .__news ._item a {
    font-style: italic;
    color: var(--secondary);
    color: #a1c6ea;
  }

  & .__news ._item span {
    font-style: italic;
    font-size: 0.9;
    font-weight: lighter;
    opacity: 0.5;
  }

  & .__tech-list-container {
    margin: 3rem 0.25rem;
  }

  .__tech-list-container ._list-label {
    font-size: 1rem;
    color: #0079df;
  }

  .__tech-list-container .__tech-list {
    list-style-type: none;
    margin: 0.75rem 0;
    padding-left: 1rem;
    line-height: 1.75rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .__tech-list-container .__tech-list li {
    cursor: pointer;
    max-width: 12rem;
  }

  .__tech-list-container .__tech-list li svg {
    margin-right: 0.5rem;
    color: #bbd1ea;
  }

  .__tech-list-container .__tech-list li span {
    opacity: 0.9;
  }

  & .__projects {
    display: flex;
    flex-wrap: wrap;
  }

  & .__projects ._tag {
    min-width: 100%;
  }

  .__projects .__project {
    padding: 1rem 0.5rem;
    margin: 0.5rem 0;
    width: 100%;
    background: #fafafa;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }

  .__projects .__project ._title {
    color: var(--primary);
    color: #0079df;
    opacity: 0.7;
  }

  .__projects .__project ._title ._progression {
    margin: 0 1rem;
    font-style: italic;
    color: var(--secondary);
    color: #a1c6ea;
  }

  .__projects .__project ._description {
    margin: 0.5rem 0.25rem;
    font-size: 0.75rem;
    opacity: 0.75;
  }
`;

function LeftSide() {
  return (
    <CSSTransition appear classNames="fade" in timeout={0}>
      <LeftSideContainer id="left-side" className="logical" role="complementary">
        <a href="#welcome-back" className="_display-welcome -display-n-sm">
          <i className="far fa-caret-square-left" />
          <span>back</span>
        </a>
        <div className="__contenainer-about -fadeUp">
          <h2 className="_tag">about me</h2>
          <p className="_content">In May 2017, I began to work at TimeOne as a Front Web Developper.</p>
          <p className="_content">
            {"Since September 2017, I'm a Freelance FullStack Developper working mostly Front-Side."}
          </p>
          <p className="_content">
            {"I care a lot about Design in my products and I think it's probably the main key to every product success"}
            beyond language sometimes. So my main focus is actually to focus on the Front Dev in addition to my Backend
            skills.
          </p>
        </div>
        <div className="__news -fadeUp">
          <h2 className="_tag">News</h2>
          <ul>
            <li className="_content _item">
              <p>05/2018 - </p>I now work at <a href="https://www.timeonegroup.com/">@TimeOneGroup</a> as a Junior Front
              Developper mainly in React. I continue to keep an eye on all the new techs and awesome products emerging
              all
              {"days and I'll soon display some realy cool projects and works on this profile page!"}
              <span> - I hope and promise</span>
            </li>
            <li className="_content _item">
              <p>02/2018 - </p>
              {"I'm actually working on two serious apps. I'm planning to create one with Hyperloop."}
            </li>
          </ul>
        </div>
        <div className="__tech-list-container -fadeUp">
          <h3 className="_list-label">I&apos;m currently working with :</h3>
          <ul className="__tech-list">
            <li>
              <i className="fa fa-caret-right" />
              <span>Sketch</span>
            </li>
            <li>
              <i className="fa fa-caret-right" />
              <span>React</span>
            </li>
            <li>
              <i className="fa fa-caret-right" />
              <span>Styled Components</span>
            </li>
            <li>
              <i className="fa fa-caret-right" />
              <span>Chrome</span>
            </li>
            <li>
              <i className="fa fa-caret-right" />
              <span>Atom</span>
            </li>
            <li>
              <i className="fa fa-caret-right" />
              <span>Javascript</span>
            </li>
            <li>
              <i className="fa fa-caret-right" />
              <span>Ruby</span>
            </li>
            <li>
              <i className="fa fa-caret-right" />
              <span>Ruby on Rails</span>
            </li>
          </ul>
        </div>
        <div className="__projects">
          <h2 className="_tag">Projects</h2>
          <div className="__project">
            <p className="_title">
              Bookmarks Sharing System
              <span className="_progression">project-only</span>
            </p>
            <p className="_description">
              I want to create a way to easely share a list of personal bookmarks in a website or anything.
            </p>
          </div>
          <div className="__project">
            <p className="_title">
              Chrome Extension for Managing New Tabs Extensions
              <span className="_progression">project-only</span>
            </p>
            <p className="_description">
              {
                "Today I've many new tabs extensions but I only use one. I want to choose / activate, organise or display"
              }
              multiple new tabs at a time.
            </p>
          </div>
        </div>
      </LeftSideContainer>
    </CSSTransition>
  );
}

export default LeftSide;
