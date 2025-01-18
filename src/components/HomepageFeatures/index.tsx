import Translate, { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

interface FeatureItem {
  num: number;
  title: string;
  iconName: string;
  description: React.JSX.Element;
  link: string;
}

// eslint-disable-next-line complete/require-capital-const-assertions, complete/require-capital-read-only
const FeatureList: FeatureItem[] = [
  {
    num: 1,
    title: translate({ message: "Beginner's Guide" }),
    iconName: "baby",
    description: (
      <>
        <Translate>Start here to learn the fundamentals.</Translate>
      </>
    ),
    link: "beginner",
  },
  {
    num: 2,
    title: translate({ message: "Learning Path" }),
    iconName: "school",
    description: (
      <>
        <Translate>Learn our strategies gradually, level by level.</Translate>
      </>
    ),
    link: "learning-path",
  },
  {
    num: 3,
    title: translate({ message: "Reference Document" }),
    iconName: "list-ul",
    description: (
      <>
        <Translate>Look up something specific.</Translate>
      </>
    ),
    link: "reference",
  },
];

function Feature({ num, title, iconName, description, link }: FeatureItem) {
  return (
    <div className={`col col--4 ${styles["feature"]}`}>
      <div className="text--center">
        <br />
        <a href={useBaseUrl(link)}>
          <span className="fa-stack fa-3x">
            <div
              className={`fa fa-circle fa-stack-2x ${styles[`circle-accent${num}`]}`}
            ></div>
            <div className={`fa fa-${iconName} fa-stack-1x fa-inverse`}></div>
          </span>
        </a>
        <br />
        <br />
      </div>
      <h3 className="text--center">
        <a href={useBaseUrl(link)}>{title}</a>
      </h3>
      <p className="text--center">{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles["features"]}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
