import { makeUseAxios } from "axios-hooks";
import Axios from "axios";

export default function useAxios() {
  return makeUseAxios({
    axios: Axios.create({
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  })
}