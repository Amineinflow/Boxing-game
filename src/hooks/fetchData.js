const API_URL = "http://10.13.15.167:8000"
const PATH = API_URL + "/fighter"

export const getFighters = async () => {
  return await fetch("http://10.13.15.167:8000/fighter")
}
