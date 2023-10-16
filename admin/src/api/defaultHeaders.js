export const defaultHeaders = (isSignedIn) => {
  if (isSignedIn) {
    return {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  }

  return {};
}