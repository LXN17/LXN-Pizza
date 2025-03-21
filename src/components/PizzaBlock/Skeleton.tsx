import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="140" r="140" />
    <rect x="0" y="296" rx="10" ry="10" width="280" height="45" />
    <rect x="0" y="345" rx="10" ry="10" width="280" height="67" />
    <rect x="5" y="416" rx="10" ry="10" width="100" height="45" />
    <rect x="175" y="416" rx="9" ry="9" width="100" height="45" />
  </ContentLoader>
);

export default Skeleton;
