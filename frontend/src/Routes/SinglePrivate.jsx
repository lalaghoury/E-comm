import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import { useSelector } from "react-redux";

async function checkAuthorship(auth, type, id) {
  if (!auth?.token) {
    return false;
  }
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  const response = await axios.get(`/api/${type}/${id}/authorship`);
  return response.data.author;
}

export function SinglePrivate({ Component, type, ...props }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const id = useParams()[`${type}_id`];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const author = await checkAuthorship(auth, type, id);
        setIsAuthor(author);
      } catch (error) {
        console.error(`Error checking authorship for ${type}:`, error);
        setIsAuthor(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [auth?.token, id, type]);

  if (loading) return <h2>Loading...</h2>;

  return isAuthor ? <Component {...props} /> : <PageNotFound />;
}
