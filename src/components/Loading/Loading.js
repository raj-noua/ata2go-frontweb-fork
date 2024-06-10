import React    from "react";
import               "./Loading.css";
import { Puff } from "react-loader-spinner";
const Loading = () => {
  return (
    <div>
      <div className="loading-style">
        <Puff
          height="80"
          width="80"
          radius={1}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loading;
