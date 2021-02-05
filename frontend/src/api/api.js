import axios from "axios";
const BASE_URL = "http://localhost:8000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class SharebnbApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    // const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      // let message = err.response.data.error.message;
      // throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`api/users/${username}`);
    return res.user;
  }

  /** Get listings */

  static async getListings() {
    let res = await this.request("api/listings");
    return res;
  }

  /** Get details on a company by handle. */

  static async getListing(listing_id) {
    let res = await this.request(`api/listings/${listing_id}`);
    return res;
  }

  /** Add a listing */

  static async addListing(user_id, {location, price_per_hour, price_per_day, price_per_month, description, max_guests, title, listing_type, image_file}) {
    return await this.request('api/listings', { payload: {user: user_id, address: location, price_per_hour, price_per_day, price_per_month, description, max_guests, title, listing_type}, file: image_file}, "post")
  }

  /** Book a listing */

  static async bookListing(user_id, listing_id, {num_guests, price_type, start_time, end_time}) {
    return await this.request(`api/booking/`, {payload: {guest: user_id, listing_id, num_guests, price_type, start_time, end_time}}, "post");
  }

  // /** Get token for login from username, password. */

  // static async login(data) {
  //   let res = await this.request(`auth/token`, data, "post");
  //   return res.token;
  // }

  // /** Signup for site. */

  // static async signup(data) {
  //   let res = await this.request(`auth/register`, data, "post");
  //   return res.token;
  // }

  // /** Save user profile page. */

  // static async saveProfile(username, data) {
  //   let res = await this.request(`users/${username}`, data, "patch");
  //   return res.user;
  // }
}


export default SharebnbApi;
