import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import HomepageFeatures from "../components/HomepageFeatures";
import styles from "./styles.module.css";

function HomepageHeader() {
  return (
    <header className={`hero hero--primary ${styles["heroBanner"]}`}>
      <div className="container">
        <img src={useBaseUrl("img/logo.png")} width="200em" />
        <h1 className="hero__title">
          <Translate>H-Group Conventions</Translate>
        </h1>
        <p className="hero__subtitle">
          {translate({
            id: "subtitle.before",
            description: "Part of website subtitle before the Hanabi word",
            message: "Strategies for ",
          })}
          <a
            id="landing-page-hanabi-link"
            href="https://boardgamegeek.com/boardgame/98778/hanabi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Translate>Hanabi</Translate>
          </a>
          {translate({
            id: "subtitle.after",
            description: "Part of website subtitle after the Hanabi word",
            message: ", a cooperative card game of logic and reasoning.",
          })}
        </p>
        <div className={styles["buttons"]}>
          <Link
            className={`button button--outline button--secondary button--lg ${styles["getStarted"]}`}
            to={useBaseUrl("about")}
          >
            <Translate description="The enter button at home page">
              Learn More
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Home(): React.JSX.Element {
  return (
    <Layout
      title={translate({ message: "Home" })}
      description={translate({
        message:
          "Strategies for Hanabi, a cooperative card game of logic and reasoning",
      })}
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

export default Home;
