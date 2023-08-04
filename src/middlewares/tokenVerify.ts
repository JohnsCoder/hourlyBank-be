import jwToken from "../utils/jwToken";

export default (bearearToken: String) => {
  const token = bearearToken.split(" ")[1];
  try {
    return jwToken.Verify(token);
  } catch (err) {
    throw err;
  }
};
