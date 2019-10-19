import test from "ava";
import sinon from "sinon";
import h from "vhtml";
import scoped from "./index";
import * as utils from "./utils";
/** @jsx h */

const styled = scoped(h);

const ListItem = text => <li>{text}</li>;

const ListItemContainer = styled(ListItem)`
  padding: 10px;
`;

const terrestrialPlanets = ["Mercury", "Venus", "Earth", "Mars"];
const jovianPlanets = ["Jupiter", "Saturn", "Uranus", "Neptune"];

const App = (data = terrestrialPlanets) => (
  <section className="app-root">
    <ListItemContainer>
      <h1 id="welcome-heading">Hi!</h1>
    </ListItemContainer>

    <p>Here is a list of {data.length} planets:</p>
  </section>
);

test("scoped.generateID is callable", t => {
  t.true(scoped.generateID instanceof Function);
});

test("scoped.generateID returns different classes for each render in production env", t => {
  // const utilsMock = sinon.mock(utils);
  // utilsMock.expects("isTestEnvironment").returns(false);
  // stub(utils, "isTestEnvironment").returns(false);

  utils.isTestEnvironment = () => false;

  const firstRender = App();
  const secondRender = App();

  t.not(firstRender, secondRender);
});

// test("scoped.generateID returns different ids for each render in development env", t => {
//   process.env.NODE_ENV = "development";
//   t.true(scoped.generateID instanceof Function);
// });

test("scoped.generateID returns the same ids when DOM nodes remains untouched in test env", t => {
  const firstRender = App();
  const secondRender = App();

  t.is(firstRender, secondRender);
});
