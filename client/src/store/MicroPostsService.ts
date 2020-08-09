import axios from "axios";
import auth0Client from "./AuthService";

const url = `${process.env.VUE_APP_REST_API_BASE_URL}/micro-posts/`;

export type Data = { createdAt: any; text: string; _id: string };

class MicroPostsService {
  static async getMicroPosts(): Promise<Data[]> {
    return axios
      .get(url)
      .then((response) => {
        console.log(response);
        const unparsedData = response.data;
        const data = unparsedData.map((microPost: any) => {
          return {
            ...microPost,
            createdAt: new Date(microPost.createdAt),
          };
        });

        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static insertMicroPost(text: string) {
    return axios.post(
      url,
      {
        text,
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getAccessToken()}` },
      }
    );
  }
}

export default MicroPostsService;
