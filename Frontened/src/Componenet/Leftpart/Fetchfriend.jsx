
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchFriend() {
  const [friend, setAllFriend] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(false);

  const showFriend = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/alluser");
      console.log(response.data)
      if (response && response.data) {
        setAllFriend(response.data); // Set the fetched data
      } else {
        console.log("Unsuccessful in fetching friends");
      }
    } catch (error) {
      console.log("Error in fetching friends", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    showFriend();
  },[]);

  // Instead of returning JSX, return the state variables
  return { friend, loading };
}
