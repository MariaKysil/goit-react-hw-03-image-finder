import errorImage from './error.jpg';

export const ErrorView = ({ message }) => {
  return (
    <div role="alert">
      <img src={errorImage} alt="sad cat" width="240" />
      <p>{message}</p>
    </div>
  );
};
