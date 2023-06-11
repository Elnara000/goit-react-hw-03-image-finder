import { LineWave } from 'react-loader-spinner';
import './Loader.css';
export default function Loader() {
  return (
    <div className="loader">
      <LineWave
        height="100"
        width="100"
        color="#3f51b5"
        ariaLabel="line-wave"
        visible={true}
        // middleLineColor="#8f4f5f"
      />
    </div>
  );
}
