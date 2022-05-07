import { loadingScreenDiv, loadingScreenText } from './style-loading-screen';

function LoadingScreen() {
  return(
    <div className="page-content" style={loadingScreenDiv}>
      <h1 style={loadingScreenText}>
      Loading ...
      </h1>
    </div>
  );
}

export default LoadingScreen;
