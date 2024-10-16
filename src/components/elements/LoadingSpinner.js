import { Oval } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#fed700"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="yellow"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default LoadingSpinner;
