import React from 'react';

function LeftSide() {
  return (
    <section id="left-side" className="logical" role="complementary">
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
            Developper mainly in React. I continue to keep an eye on all the new techs and awesome products emerging all
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
            {"Today I've many new tabs extensions but I only use one. I want to choose / activate, organise or display"}
            multiple new tabs at a time.
          </p>
        </div>
      </div>
    </section>
  );
}

export default LeftSide;
