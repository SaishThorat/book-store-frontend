import AppContext from "./CreateContextApi";

const ContextApi = (props) => {

  return (
    <AppContext.Provider >{props.children}</AppContext.Provider>
  );
};
export default ContextApi;
